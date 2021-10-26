var url_current = document.location.href; 
var url_current = url_current.replace(/\/$/, "");// Supprimons l'éventuel dernier slash de l'URL
end_url = url_current.substring (url_current.lastIndexOf( "/" )+1 );// https://mysite.com/allforone/main.php ==> main.php

if (end_url == 'main.php'){
	// window.onload = function() {
		// window.addEventListener("DOMContentLoaded", (event) => { // wait document full loaded
		// document.getElementById("bt_record").style.display = "none";
		
		// function bt_record_show(fn){	// Show/Hide button record
		// 	// clog(fn, 'show record');
		// 	// test = document.getElementById("bt_record").style.display;
		// 	// clog(test, 'ID');
		// 	if (fn == 'show') { document.getElementById("bt_record").style.display = "block";}
		// 	if (fn == 'hide') { 
			// 		console.log('ici');
			// 		document.getElementById("bt_record").style.display = "none"; }
			// }
			// bt_record_show('hide');
    // };
	// });

	
	// document.getElementById("editor").style.width = "310px";
	// window.onload = function () {
		// clog(end_url,'end_url');
		// width_cke = document.getElementById('cke').offsetwidth;
		// height_cke = document.getElementById('editor').offsetHeight; 
		// height_cke = document.getElementById('cke').offsetHeight; 
		// height_cke = document.getElementById('main').offsetHeight; 
		// console.log(width_cke + ' - ' + Height_cke);
		// clog(height_cke,'Height_cke');
		// document.getElementById('editor').style.maxheight = height_cke+'px';
		// let cke_hauteur = document.getElementsByClassName('right_cke')[0].offsetHeight;
		// console.log(cke_hauteur + '-');

		// editor.resize( '100', '550', true )
		// document.getElementsByClassName("ck-editor__editable")[0].style.Height = cke_hauteur+'px';
		// document.getElementsByClassName("ck-editor__editable")[0].style.minHeight = cke_hauteur+'px';
		// document.getElementsByClassName("ck-editor__editable")[0].style.maxHeight = cke_hauteur+'px';

		// document.getElementsByClassName("ck-editor__editable")[0].style.Height = '500px';
		// document.getElementsByClassName("ck-editor__editable")[0].style.minHeight = '500px';
		// document.getElementsByClassName("ck-editor__editable")[0].style.maxHeight = '500px';
		// document.getElementById("editor").style.Height = '500px';
		// document.getElementById("editor").style.minHeight = '500px';
		// document.getElementById("editor").style.maxHeight = '500px';

		// $('<style type="text/css" scoped>.ck-editor .ck-editor__editable {min-height: 500px !important;}</style>').insertAfter($ref);

		// document.getElementsByClassName(".ck-editor__editable").style.maxHeight = '100px';
		// document.getElementById('editor').style.maxHeight = '100px';
		// document.getElementById("page-wrapper").style.minHeight = screen.height - 10  +"px";
	// }
	// document.getElementsByClassName("ck-editor__editable").style.display = "none";
	// document.getElementsByClassName("cke").style.display = "block";
	// document.getElementsByClassName("view_del")[0].style.display = "none";
	
	// document.getElementsByClassName(".ck-editor__editable").style.minheight = '100px';
	// document.getElementsByClassName(".ck-editor__editable").style.maxheight = '100px';
	// }
	// var hauteur_CKEditeur = window.innerHeight - 95
	// document.getElementById('editor').style.height = hauteur_CKEditeur+'px';
	
		/* min-height: calc(100vh - var(--height_tm) - 45px); */
		/* max-height: calc(100vh - var(--height_tm) - 45px); */
	
	// document.getElementsByClassName(".ck-editor__editable").style.minheight = '100px';
	// document.getElementsByClassName(".ck-editor__editable").style.maxheight = '100px';
	// document.getElementById('editor').style.maxheight = '400px';
	// document.getElementById('editor').style.maxHeight = '400px';
	
	// document.getElementById("editor").style.zIndex = "-1"; 
	// put CKE in background for view topmenu
	





	//  open panel left  
	// document.getElementById("panel").style.width = "310px";
	// document.getElementById("main").style.marginLeft = "310px";
	
	// main_width = document.getElementById('main').offsetWidth; // fonctionne pas retourne la largeur de la page
	// panel_width = document.getElementById('panel').offsetWidth;
	// cke_and_panel_width = main_width - 310;
	// document.getElementById("cke").style.width = cke_and_panel_width +'px';
	// document.getElementById("menu_top").style.width = cke_and_panel_width +'px';

	// Special - CSS - on hover .panel_title and .tm_panel_open change background (not possible in css)
	$('.panel_title').hover(function() {
		$('.panel_title').css('transition', '0s').css('background-color', '#E6994C');
		$('.tm_panel_open').css('transition', '0s').css('background-color', '#E6994C');
	},function() {  // on mouseout, reset the background colour
		$('.panel_title').css('background-color', '#00796B');
		$('.tm_panel_open').css('background-color', '#00796B');
	});

	$('.tm_panel_open').hover(function() {
		$('.panel_title').css('transition', '0s').css('background-color', '#E6994C');
		$('.tm_panel_open').css('transition', '0s').css('background-color', '#E6994C');
	},function() {  // on mouseout, reset the background colour
		$('.panel_title').css('background-color', '#00796B');
		$('.tm_panel_open').css('background-color', '#00796B');
	});


	function sidebar_open_close() {
        let panel_largeur = document.getElementsByClassName('panel')[0].offsetWidth;
        // let cke_hauteur = document.getElementsByClassName('right_cke')[0].offsetHeight;
        // let cke_largeur = document.getElementsByClassName('right_cke')[0].offsetWidth;

        if (panel_largeur == 0){
            document.getElementsByClassName('main')[0].style.gridTemplateColumns = '310px 1fr';
            document.getElementsByClassName('panel')[0].style.visibility = 'visible';
            document.getElementsByClassName('panel')[1].style.visibility = 'visible';
        }else{
            document.getElementsByClassName('main')[0].style.gridTemplateColumns = '0px 1fr';
            document.getElementsByClassName('panel')[0].style.visibility = 'hidden';
            document.getElementsByClassName('panel')[1].style.visibility = 'hidden';
        }
		// document.getElementById("menu_top").style.width = cke_and_panel_width +'px';
		// document.getElementById("editor").style.marginLeft = "310px";
    }

	function menu_document_edit(fn){ 			// topmenu edit document
		if (!fn || fn.length == 0) { // Toggle
			// if ((document.getElementById("menu_document_edit").innerText) == 'Modifier') { fn = 'write'; }
			if ((document.getElementById("menu_document_edit").innerText) == txt_menu_edit) { fn = 'write'; }
			else { fn = 'read'; }
		}

		// on demand
		if (fn == 'read'){
			// clog(document.getElementById("elfauto1"),'ici');

			if (document.getElementById("elfauto1") && document.getElementById("elfauto1").style.display != "none") { // if windows elfinder exist and closed
				show_message("Fermer d'abord le gestionnaire de fichier", 'warning');
				fn = '';
				return;
			}
			document.getElementById("tm_status").innerHTML = txt_mode_read;
			document.getElementById("tm_status").classList.remove("tm_mode_write");
			document.getElementById("menu_document_edit").innerHTML = txt_menu_edit;
			editor.isReadOnly = true;
			isDirty = false;
			bt_record_show('hide');
			$("#tree").fancytree("enable");
			context_menu = 'enable';
			// show_message('Lecture seule activé', 'info');
		}
		
		if (fn == 'write'){
			if (cke_title_ini === '.Help'){
				show_message('unauthorized edition', 'warning');
				return;
			}
	
			document.getElementById("menu_document_edit").innerHTML = txt_menu_no_record;
			document.getElementById("tm_status").classList.add("tm_mode_write");
			document.getElementById("tm_status").innerHTML = txt_mode_read;
			isDirty = false;
			editor.isReadOnly = false;
			bt_record_show('hide');
			$("#tree").fancytree("disable");
			context_menu = 'disable';
			// show_message('Edition activé', 'info');
		}
		fn = '';
	}
	
	// function record_before() { 				// check if user editing document (use => if (record_before() == "no_record") { return; } // if the document is being edited, warning and block.)
	// 	if (document.getElementById("tm_bt_record_cke").style.display == "block") {
	// 		show_message('Enregistrer le document avant !', 'warning');
	// 		return 'no_record';
	// 	}
	// }

	function bt_record_show(fn){	// Show/Hide button record
		
		if (fn === 'show') { document.getElementById("tm_bt_record_cke").disabled = false;  }
		if (fn === 'hide') { document.getElementById("tm_bt_record_cke").disabled = true;  }
		// if (fn === 'show') { document.getElementById("tm_bt_record_cke").style.display = "block";}
		// if (fn === 'hide') { document.getElementById("tm_bt_record_cke").style.display = "none"; }
	}

	function bt_record() {				// LOGICAL TEST ON THE CKEDITOR TITLE IF OK SENDING POST TO THE SERVER 
		// { 
			titlePlugin = editor.plugins.get( 'Title' );
			titre = titlePlugin.getTitle();
			name_checked = check_name_file_folder(titre)
			if (name_checked === 'error') {	return; }
		// };

		menu_document_edit('read');
		bt_record_show('hide');
		
		// console.log (name_checked + '===' + node_last);

		if (name_checked === node_last){
			tree_node_action = 'no change';
			request_ajax('write_file',node_path_parent + '/' + name_checked, editor.getData());
		}else{
			// tree_node_action = 'rename';
			tree_node_action ='';
			request_ajax('rename_file_folder','file' + '-'  + node_path_parent + '/' + node_last + '-' + node_path_parent + '/' + name_checked, editor.getData());
		}
		
		// document.getElementById('CK_TITRE_FOR_POST').value = titre; // on mets les donnees du titre de CKE dans un textarea avant l'envoi POST
		// document.getElementById('CK_FULL_FOR_POST').value = editor.getData(); // on mets les donnees du contenu de CKE dans un textarea avant l'envoi POST
		// document.forms["form_cke"].submit();
	}
}

function show_message(message, style) { 	// SNACKBAR MESSAGE (INFO - SUCCESS - WARNING)
	if (style == 'info') {style_message = ' ';}
	if (style == 'success') {style_message = ' ';}
	if (style == 'warning') {style_message = ' ';}

	document.getElementById('message_block').innerHTML = style_message + message;
	var x = document.getElementById("message_block");
	x.className = "show " + style;

	setTimeout(function() {x.className = x.className.replace("show", "");}, 3800); // After 4 seconds, remove the show class from DIV
}

function escape($valeur)	// echo 'Bienvenue ' . escape($prenom) . ' ' . escape($nom) . ' !';
{
    // Convertit les caractères spéciaux en entités HTML
    return htmlspecialchars($valeur, ENT_QUOTES, 'UTF-8', false);
}

function check_name_file_folder(name_checked) {
	if (typeof name_checked === 'undefined' || !name_checked ) { return 'error'; }
	name_checked = name_checked.replace(/&nbsp;\s/g, "");// delete html space from CK Editor
	name_checked = name_checked.replace(/&nbsp;/g, "");	 // delete html space from CK Editor
	
	// REGEX first [autorised] second [forbidden] include to forbidden but not say ASCII code
	here_cara_interdit = name_checked.match(/[^a-z,0-9,\-,\_,\s]|[\²|\`|\é|\~|\"|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\è|\ç|\à|\°|\t|\¨|\£|\¤|\µ|\ù|\§]/ig); 

	if (name_checked.length > cke_title_limit || !name_checked || here_cara_interdit) {    // si c'est plus grand que OU vide OU il y a un ou plusieurs espace
		if (here_cara_interdit){
			show_message('Ces caractéres sont interdit : ' + here_cara_interdit, 'warning');
			return 'error';
		} else {
			show_message('Le nom doit être renseigné et limité à ' + cke_title_limit + ' caractères', 'warning');
			return 'error';
		}
	};
  	return name_checked; // return valid name 
}

//////////////  TEST  ////////////

function TEST1() {
	$.ui.fancytree.getTree("#tree").activateKey('_5');

	// let left_tree_height = document.getElementsByClassName('left_tree')[0].offsetHeight;
	// let left_tree_width = document.getElementsByClassName('left_tree')[0].offsetWidth;
	// position_ = getPosition('mask');
	// console.log(left_tree_height + ' - ' + position.y);

	// document.getElementById("mask").style.height = '500 px';
	// document.getElementById("mask").style.width = '500 px';

	// $("#mask").height(left_tree_height+'px');
	// $("#mask").width(left_tree_width+'px');

	// document.getElementById("mask").style.Height = left_tree_height+'px';
	// document.getElementById("mask").style.Width = left_tree_width+'px';
	// document.getElementsByClassName("mask")[0].style.Height = left_tree_height+'px';
	// document.getElementsByClassName("mask")[0].style.Width = left_tree_width+'px';
	// document.getElementsByClassName("mask")[0].style.display = "block";

	// if( $("#tree").fancytree("option", "disabled") ){
		// $("#tree").fancytree("enable");
		// $("#btnDisable").text("Disable");
	// }else{
		// $("#tree").fancytree("disable");
		// $("#btnDisable").text("Enable");
	// }



	// isDirty = false;
	// $.ui.fancytree.getTree("#tree").activateKey(node_key_actual);

	// isDirty = false;
	// bt_record_show('tm_bt_record_cke','hide')
	// console.log(Array.from( editor.ui.componentFactory.names() ))
	// console.log(isDirty)

	// if (isDirty = 'false'){
	// 	console.log('ok')
	// }else
	// 	console.log('non')
}

function RECUP_TITRE() {				// TEST 
	titlePlugin = editor.plugins.get( 'Title' );
	Titre = titlePlugin.getTitle();
	// document.getElementById('Information').value = Titre;
	show_message(Titre, 'info');
}

////////////// FOR DEBUG ////////////

function clog(v,i) { // v= name varaible to test  i=var name text or your information to situate in script 
	switch (typeof v) {
		case 'null':
		case 'undefined':
			console.log(">>> " + i + " = " + v + " <= cette variable n'est pas défini ou NULL");break
		case 'boolean':
		case 'number':
		case 'string':
			console.log(">>> " + i + ` = ` + typeof v + ` || value = ` + v);break
		case 'object':
			console.log(">>> " + i);
			console.table(v);break
		default:
			console.log(`erreur : ` + i);
	}
}
