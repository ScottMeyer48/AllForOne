function menu_cke_edition(){ 			// CKEditor Active Edition and edit label MenuTop 
	if ((document.getElementById("menu_cke_edition").innerText) == 'Modifier') { 
		document.getElementById("menu_cke_edition").innerHTML = "Quitter la modification sans enregistrer";
		editor.isReadOnly = false;
		show_message('Edition activé', 'info')
	}else{
		document.getElementById("menu_cke_edition").innerHTML = "Modifier";
		editor.isReadOnly = true;
		show_record('bt_record_cke', 'hide')
		show_message('Lecture seule activé', 'info')
	}
}

function record_before() { 				// check if user editing document (use => if (record_before() == "no_record") { return; } // if the document is being edited, warning and block.)
	if (document.getElementById("bt_record_cke").style.display == "block") {
		show_message('Enregistrer le document avant !', 'warning');
		return 'no_record';
	}
}

function RECUP_TITRE() {				// TEST 
	titlePlugin = editor.plugins.get( 'Title' );
	Titre = titlePlugin.getTitle();
	// document.getElementById('Information').value = Titre;
	show_message(Titre, 'info');
}

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
		

		var test_cara_interdit = titre.match(/[^a-z,^0-9,^[\s]/gi); // autorise uniquement lettre + chiffre + espace (REGEX)

		if (test_cara_interdit) { 		// si il y a quelque chose dans la variable
			alert('Erreur dans le titre, merci de ne pas utiliser ces caractères :' + test_cara_interdit);
			return;
		}; 
	};

	document.getElementById('CK_TITRE_FOR_POST').value = titre; // on mets les donnees du titre de CKE dans un textarea avant l'envoi POST
	document.getElementById('CK_FULL_FOR_POST').value = editor.getData(); // on mets les donnees du contenu de CKE dans un textarea avant l'envoi POST
	document.forms["form_cke"].submit();
}

{/* <script type="text/javascript" src="addon/ckeditor5/ckeditor_build.js"></script>
<script type="text/javascript"> editor.isReadOnly = true;</script> */}

