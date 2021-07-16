function menu_cke_edition(){ 			// CKEditor Active Edition and edit label MenuTop 
	if ((document.getElementById("menu_cke_edition").innerText) == 'Modifier') { // enter mode editing document
		document.getElementById("menu_cke_edition").innerHTML = "Quitter la modification sans enregistrer";
		editor.isReadOnly = false;
		show_message('Edition activé', 'info')
	}else{ // exit mode editing document
		if (document.getElementById("elfauto1") && document.getElementById("elfauto1").style.display != "none") { // if windows elfinder exist and closed
			show_message("Fermer d'abord le gestionnaire de fichier", 'warning');
			return;
		}
	
		document.getElementById("menu_cke_edition").innerHTML = "Modifier";
		editor.isReadOnly = true;
		isDirty = false;
		show_record('bt_record_cke', 'hide');
		show_message('Lecture seule activé', 'info');
	}
}

function record_before() { 				// check if user editing document (use => if (record_before() == "no_record") { return; } // if the document is being edited, warning and block.)
	if (document.getElementById("bt_record_cke").style.display == "block") {
		show_message('Enregistrer le document avant !', 'warning');
		return 'no_record';
	}
}

function TEST1() {
	isDirty = false;

	// isDirty = false;
	// show_record('bt_record_cke','hide')
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

