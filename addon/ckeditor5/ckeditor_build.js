var isDirty = false;
// let editor;

var hauteur_CKEditeur = window.innerHeight - 95
document.getElementById('editor').style.height = hauteur_CKEditeur + 'px';

// document.getElementById("editor").style.zIndex = "-1"; 
// put CKE in background for view topmenu

// elfinder folder hash of the destination folder to be uploaded in this CKeditor 5
const uploadTargetHash = 'l1_Lw';

// elFinder connector URL
const connectorUrl = 'addon/elFinder/php/connector.minimal.php';

InlineEditor
    .create( document.querySelector( '.editor' ), {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'strikethrough',
                'underline',
                'fontBackgroundColor',
                'fontColor',
                'fontSize',
                'alignment',
                'undo',
                'redo',
                'link',
                'removeFormat',
                '|',
                'indent',
                'outdent',
                'horizontalLine',
                'blockQuote',
                'bulletedList',
                'numberedList',
                'todoList',
                'pageBreak',
                '|',
                'imageUpload',
                'imageInsert',
                'insertTable',
                'mediaEmbed',
                'link',
                'codeBlock',
                'CKFinder',
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
                '|',
                'linkImage'
            ]
        },

        // autosave: {
        //     save( editor ) {
        //         return saveData( editor.getData() );
        //     }
        // }
        // autosave: {
        //     waitingTime: 5000, // in ms
        //     save( editor ) {}
        // },
    } )
    .then( newEditor  => {
        editor = newEditor ; // Sortir les donnees dans la variable

        editor.model.document.on( 'change:data', () => {
            isDirty = true;
            // config.baseFloatZIndex = 100001;
            // document.getElementById("BT_submit").disabled = false;
            // document.getElementById('Information').value = ' ';

            show_record('bt_record_cke','show')

            // updateStatus( editor );
        } );
        
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
        console.warn( 'Build id: mxvdrcn6mbr3-ncc11fu3sged' );
        console.error( error );
    } );

    // editor.isReadOnly = true;
// Assuming there is a <button id="submit">Submit</button> in your application.
// document.querySelector( '#submit' ).addEventListener( 'click', () => {
	// const editorData = editor.getData();

	// ...
// } );

// // Handle clicking the "Save" button by sending the data to a
// // fake HTTP server (emulated here with setTimeout()).
// function handleSaveButton( editor ) {
//     const saveButton = document.querySelector( '#save' );
//     const pendingActions = editor.plugins.get( 'PendingActions' );

//     saveButton.addEventListener( 'click', evt => {
//         const data = editor.getData();

//         // Register the action of saving the data as a "pending action".
//         // All asynchronous actions related to the editor are tracked like this,
//         // so later on you only need to check `pendingActions.hasAny` to check
//         // whether the editor is busy or not.
//         const action = pendingActions.add( 'Saving changes' );

//         evt.preventDefault();

//         // Save the data to a fake HTTP server.
//         setTimeout( () => {
//             pendingActions.remove( action );

//             // Reset isDirty only if the data did not change in the meantime.
//             if ( data == editor.getData() ) {
//                 isDirty = false;
//             }

//             updateStatus( editor );
//         }, HTTP_SERVER_LAG );
//     } );
// }


// // Listen to new changes (to enable the "Save" button) and to
// // pending actions (to show the spinner animation when the editor is busy).
function handleStatusChanges( editor ) {
    // editor.plugins.get( 'PendingActions' ).on( 'change:hasAny', () => updateStatus( editor ) );

    editor.model.document.on( 'change:data', () => {
        isDirty = true;
        
        document.getElementById("submit").disabled = false;
        document.getElementById('Information').value = ' ';
        // updateStatus( editor );
    } );
}

// // If the user tries to leave the page before the data is saved, ask
// // them whether they are sure they want to proceed.
// function handleBeforeunload( editor ) {
//     const pendingActions = editor.plugins.get( 'PendingActions' );

//     window.addEventListener( 'beforeunload', evt => {
//         if ( pendingActions.hasAny ) {
//             evt.preventDefault();
//         }
//     } );
// }

// function updateStatus( editor ) {
//     const saveButton = document.querySelector( '#save' );

//     // Disables the "Save" button when the data on the server is up to date.
//     if ( isDirty ) {
//         saveButton.classList.add( 'active' );
//     } else {
//         saveButton.classList.remove( 'active' );
//     }

//     // Shows the spinner animation.
//     if ( editor.plugins.get( 'PendingActions' ).hasAny ) {
//         saveButton.classList.add( 'saving' );
//     } else {
//         saveButton.classList.remove( 'saving' );
//     }
// }

// function saveData( data ) {
//     return new Promise( resolve => {
//         setTimeout( () => {
//             console.log( 'Saved', data );

//             resolve();
//         }, HTTP_SERVER_LAG );
//     } );
// }

//----------------------------------------------
// function displayStatus(editor) {
//     const pendingActions = editor.plugins.get( 'PendingActions' );
//     const statusIndicator = document.querySelector( '#snippet-autosave-status' );

//     pendingActions.on('change:hasAny', (evt, propertyName, newValue) => {
//         if (newValue) {
//             statusIndicator.classList.add('busy');
//         } else {
//             statusIndicator.classList.remove('busy');
//         }
//     });
// }