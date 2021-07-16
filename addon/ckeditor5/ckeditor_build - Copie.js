var isDirty = false;
// let editor;

// var hauteur_CKEditeur = window.innerHeight - 95
// document.getElementById('editor').style.height = hauteur_CKEditeur+'px';
document.getElementById('editor').style.maxHeight = '400px';

// document.getElementById("editor").style.zIndex = "-1"; 
// put CKE in background for view topmenu

// elfinder folder hash of the destination folder to be uploaded in this CKeditor 5
const uploadTargetHash = 'l1_Lw';

// elFinder connector URL
const connectorUrl = 'addon/elFinder/php/connector.minimal.php';

ClassicEditor
.create( document.querySelector( '.editor' ), {
	
	toolbar: {
		items: [
			'heading',
			'fontSize',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontColor',
			'fontBackgroundColor',
			'alignment',
			'removeFormat',
			'|',
			'undo',
			'redo',
			'|',
			'blockQuote',
			'todoList',
			'bulletedList',
			'numberedList',
			'horizontalLine',
			'indent',
			'outdent',
			'|',
			'link',
			'imageUpload',
			'insertTable',
			'imageInsert',
			// 'mediaEmbed',
			'|',
			'codeBlock',
			'CKFinder'
		]
	},
	language: 'fr',
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	},
	image: {
		// resizeUnit: 'px',
		styles: [
			'alignLeft', 'alignCenter', 'alignRight'
		],

		toolbar: [
			'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
			'|',
			'imageResize:original',
			// 'imageResize:50',
			// 'imageResize:75',
			// '|',
			// 'linkImage'
		]
	},
	// mediaEmbed: {
	// 	removeProviders: [ 'instagram', 'twitter', 'googleMaps', 'flickr', 'facebook' ]
	// },
	// licenseKey: '',
	
} )
.then( newEditor  => {
	editor = newEditor ; // Sortir les donnees dans la variable
	editor.isReadOnly = true;

	editor.model.document.on( 'change:data', () => {
		isDirty = true;

		// config.baseFloatZIndex = 100001;
		// document.getElementById("BT_submit").disabled = false;
		// document.getElementById('Information').value = ' ';

		show_record('bt_record_cke','show')

		// updateStatus( editor );
	} );

	// editor.execCommand( 'maximize' );
	
	// handleStatusChanges( editor );

	// handleSaveButton( editor );
	// handleBeforeunload( editor );
	
	// displayStatus(editor);
	// return editor = editor.getData();

	{   // ******** ELFINDER - DEBUT ******** 
		const ckf = editor.commands.get('ckfinder'),
		fileRepo = editor.plugins.get('FileRepository'),
		ntf = editor.plugins.get('Notification'),
		i18 = editor.locale.t,
		// Insert images to editor window
		insertImages = urls => {
			const imgCmd = editor.commands.get('imageUpload');
			if (!imgCmd.isEnabled) {
				ntf.showWarning(i18('Could not insert image at the current position.'), {
					title: i18('Inserting image failed'),
					namespace: 'ckfinder'
				});
				return;
			}
			editor.execute('imageInsert', { source: urls });
		},
		// To get elFinder instance
		getfm = open => {
			return new Promise((resolve, reject) => {
				// Execute when the elFinder instance is created
				const done = () => {
					if (open) {
						// request to open folder specify
						if (!Object.keys(_fm.files()).length) {
							// when initial request
							_fm.one('open', () => {
								_fm.file(open)? resolve(_fm) : reject(_fm, 'errFolderNotFound');
							});
						} else {
							// elFinder has already been initialized
							new Promise((res, rej) => {
								if (_fm.file(open)) {
									res();
								} else {
									// To acquire target folder information
									_fm.request({cmd: 'parents', target: open}).done(e =>{
										_fm.file(open)? res() : rej();
									}).fail(() => {
										rej();
									});
								}
							}).then(() => {
								// Open folder after folder information is acquired
								_fm.exec('open', open).done(() => {
									resolve(_fm);
								}).fail(err => {
									reject(_fm, err? err : 'errFolderNotFound');
								});
							}).catch((err) => {
								reject(_fm, err? err : 'errFolderNotFound');
							});
						}
					} else {
						// show elFinder manager only
						resolve(_fm);
					}
				};

				// Check elFinder instance
				if (_fm) {
					// elFinder instance has already been created
					done();
				} else {
					// To create elFinder instance
					_fm = $('<div/>').dialogelfinder({
						// dialog title
						title : 'File Manager',
						// connector URL
						url : connectorUrl,
						// start folder setting
						startPathHash : open? open : void(0),
						// Set to do not use browser history to un-use location.hash
						useBrowserHistory : false,
						// Disable auto open
						autoOpen : false,
						// elFinder dialog width
						width : '80%',
						// set getfile command options
						commandsOptions : {
							getfile: {
								oncomplete : 'close',
								multiple : true
							}
						},
						// Insert in CKEditor when choosing files
						getFileCallback : (files, fm) => {
							let imgs = [];
							fm.getUI('cwd').trigger('unselectall');
							$.each(files, function(i, f) {
								if (f && f.mime.match(/^image\//i)) {
									imgs.push(fm.convAbsUrl(f.url));
								} else {
									editor.execute('link', fm.convAbsUrl(f.url));
								}
							});
							if (imgs.length) {
								insertImages(imgs);
							}
						}
					}).elfinder('instance');
					done();
				}
			});
		};

		// elFinder instance
		let _fm;

		if (ckf) {
			// Take over ckfinder execute()
			ckf.execute = () => {
				getfm().then(fm => {
					fm.getUI().dialogelfinder('open');
				});
			};
		}

		// Make uploader
		const uploder = function(loader) {
			let upload = function(file, resolve, reject) {
				getfm(uploadTargetHash).then(fm => {
					let fmNode = fm.getUI();
					fmNode.dialogelfinder('open');
					fm.exec('upload', {files: [file], target: uploadTargetHash}, void(0), uploadTargetHash)
						.done(data => {
							if (data.added && data.added.length) {
								fm.url(data.added[0].hash, { async: true }).done(function(url) {
									resolve({
										'default': fm.convAbsUrl(url)
									});
									fmNode.dialogelfinder('close');
								}).fail(function() {
									reject('errFileNotFound');
								});
							} else {
								reject(fm.i18n(data.error? data.error : 'errUpload'));
								fmNode.dialogelfinder('close');
							}
						})
						.fail(err => {
							const error = fm.parseError(err);
							reject(fm.i18n(error? (error === 'userabort'? 'errAbort' : error) : 'errUploadNoFiles'));
						});
				}).catch((fm, err) => {
					const error = fm.parseError(err);
					reject(fm.i18n(error? (error === 'userabort'? 'errAbort' : error) : 'errUploadNoFiles'));
				});
			};

			this.upload = function() {
				return new Promise(function(resolve, reject) {
					if (loader.file instanceof Promise || (loader.file && typeof loader.file.then === 'function')) {
						loader.file.then(function(file) {
							upload(file, resolve, reject);
						});
					} else {
						upload(loader.file, resolve, reject);
					}
				});
			};
			this.abort = function() {
				_fm && _fm.getUI().trigger('uploadabort');
			};
		};

		// Set up image uploader
		fileRepo.createUploadAdapter = loader => {
			return new uploder(loader);
		};
	}   // ******** ELFINDER - FIN ******** 
	
})
.catch( error => {
	console.error( 'Oops, something went wrong!' );
	console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
	console.warn( 'Build id: 1rposzow4q8u-qpmk0ss61p48' );
	console.error( error );
} );


function post_server() {// LOGICAL TEST ON THE CKEDITOR TITLE IF OK SENDING POST TO THE SERVER 
	{   
		titlePlugin = editor.plugins.get( 'Title' );
		titre = titlePlugin.getTitle();
		titre = titre.replace(/&nbsp;/g, "");	// Supprimer les "touches espaces" HTML (CKE génére un espace HTML lors du premier espace si il n'y a pas de cara ou au deuxiéme espace)

		if (titre.length > cke_title_limit || titre == "" || titre.match(/[\s]/gi)) {    // si c'est plus grand que OU vide OU il y a un ou plusieurs espace
			if (titre.length > cke_title_limit)	{  
				show_message('Erreur, le \"nom de titre\" doit être renseigné et limité à ' + cke_title_limit + ' caractères', 'warning');
				return;
			} else if (titre.match(/[^\s]/gi)) { // Si il y a autre chose que des espaces, on ne fait rien le script continu (REGEX)
			} else { // sinon il y a uniquement plusieurs espaces ou vide ou trop de caracteres
				show_message('Erreur, le \"nom de titre\" doit être renseigné et limité à ' + cke_title_limit + ' caractères', 'warning');
				return;
			};
		};

		var here_cara_interdit = titre.match(/[^a-z,0-9,[\s]/gi); // autorise uniquement lettre + chiffre + espace (REGEX)

		if (here_cara_interdit) { 		// si il y a quelque chose dans la variable
			alert('Erreur dans le titre, merci de ne pas utiliser ces caractères :' + here_cara_interdit);
			return;
		}; 
	};

	document.getElementById('CK_TITRE_FOR_POST').value = titre; // on mets les donnees du titre de CKE dans un textarea avant l'envoi POST
	document.getElementById('CK_FULL_FOR_POST').value = editor.getData(); // on mets les donnees du contenu de CKE dans un textarea avant l'envoi POST
	document.forms["form_cke"].submit();
}


// function handleStatusChanges( editor ) {

//     editor.model.document.on( 'change:data', () => {
//         isDirty = true;
        
//         document.getElementById("submit").disabled = false;
//         document.getElementById('Information').value = ' ';
//     } );
// }

// CKEDITOR.replace("editor", { 
// 	on : {
// 	  // maximize the editor on startup
// 	  'instanceReady' : function( evt ) {
// 		evt.editor.resize("100%", $(".cke").height());
// 	  }
// 	}
//   });