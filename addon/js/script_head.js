$(document).ready(() => {   			// FancyTree - tree objet 
	$("#tree").fancytree({

		source: $.ajax({type: 'GET',
			url: 'load_tree_folder.php',
			data: 1,
			success: function(data) {
					return data
			},
			dataType:"json",
		}),

		// autoCollapse: true,
		quicksearch: true, // Navigate to next node by typing the first letters
		// tooltip: true, // Use title as tooltip (also a callback could be specified)
		clickFolderMode: 3,

		// click: function () {
		// 	// using default options
		// 	//Caching DOM element
		// 	// var $myTree = $("#tree").fancytree();
		// 	// Get the DynaTree object instance
		// 	// var tree = $myTree.fancytree("getTree");
		// 	var tree = $.ui.fancytree.getTree("#tree");

		// 	//Set my key
		// 	var key = "_3";
		// 	//Get the node
		// 	var node = tree.getNodeByKey(key);
		// 	//Get the custom data attribute associated to that node
		// 	var data = node.data;
		// 	//data is an object so, data.content will give you the value of the attribute
		// 	console.log(data.content);
		// },

		dblclick: function(event, data){
			var node = data.node;
				var data_convert = JSON.stringify(node.data); 	// convertir de JS en JSON
				// var data_convert = JSON.parse(data_convert);	// convertir de JSON en JS
				console.log(data_convert);
		},

		icon: function(event, data) {
			return !data.node.isTopLevel();
		},
	});
});

function TREE1_ADD_FILE() {				// FancyTree - Add Files 
	var tree = $.ui.fancytree.getTree("#tree");
	node = tree.getActiveNode();

	if (node){  // Si c'est différent de vide ou null
		newSibling = node.appendSibling({
			// imagePath: "addon/skin-lion/",
			title: "Nouveau fichier",
			folder: false,
			icon: "addon/skin-lion/icon_file.gif"
			// setSpanIcon(span, baseClass, icon)
		});
	};
}

function TREE1_ADD_FOLDER() { 			// FancyTree - Add Folder 
	var tree = $.ui.fancytree.getTree("#tree");
	node = tree.getActiveNode();

	if (node){  // Si c'est différent de vide ou null
		// newData = {title: "Nouveau Dossier"},
		newSibling = node.appendSibling({
		title: "Nouveau dossier",
		folder: true
		});
	};
}
	
function TREE1_ADD_FOLDER_ENFANT() { 	// FancyTree - Add Folder Children 
	// var rootNode = $.ui.fancytree.getTree("#tree").getRootNode();
	var tree = $.ui.fancytree.getTree("#tree");
	node = tree.getActiveNode();

	// var childNode = tree.addChildren({
	newSibling = node.addChildren({
		title: "Nouveau dossier",
		// tooltip: "This folder and all child nodes were added programmatically.",
		folder: true,
		// keyss = tree.getNodeByKey()
		// nodeee = $.ui.fancytree.getTree("#tree").getActiveNode()
	});
	// $.ui.fancytree.getTree("#tree").activateKey(nodeee);
	// data.tree.activateKey("Nouveau dossier")
	// document.getElementById('Information').value = nodeee;
	// $.ui.fancytree.getTree("#tree").activateKey("id4.3.2");
}

$(document).ready(() => {  				// QUAND LA PAGE EST CHARGER OUVRE LE PANNEAU A LATERAL ARBORESCENCE
	document.getElementById("mySidebar").style.width = "310px";
	document.getElementById("main").style.marginLeft = "310px";
});

function show_message(message, style) { // SNACKBAR MESSAGE (INFO - SUCCESS - WARNING)
	if (style == 'info') {style_message = ' ';} 	
	if (style == 'success') {style_message = ' ';} 	
	if (style == 'warning') {style_message = ' ';} 	

	document.getElementById('message_block').innerHTML = style_message + message;
	var x = document.getElementById("message_block");
	x.className = "show " + style;

	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800); // After 4 seconds, remove the show class from DIV
}

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

function sidebar_open_close() {			// SIDEBAR - OPEN/CLOSE 
	var sidebar_largeur = document.getElementById('mySidebar').offsetWidth;
	if (sidebar_largeur == 0) { 
		document.getElementById("mySidebar").style.width = "310px";
		document.getElementById("main").style.marginLeft = "310px";
	}else{
		document.getElementById("mySidebar").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
	}
}

{ // function topmenu_dropdown(num_dd)  // TOPMENU - SHOW/HIDE
	function topmenu_dropdown(num_dd) { 		// Si click sur un bouton TOP MENU
		for (i = 1; i < 3; i++) {
			if (i === num_dd){ 					// affiche le DropDown demandé
				document.getElementById("myDropdown" + i).classList.toggle("show");
			}else{								// ferme tout les autres DropDown
				document.getElementById("myDropdown" + i).classList.remove("show");
			}
		}
	}
	
	window.onclick = function(e) {				// Si click ailleurs sur la page
		if (!e.target.matches('.dropbtn')) {	// si le lieu du click n'est pas le menu
			if (document.getElementById("myDropdown1").classList.contains('show')) {
				myDropdown1.classList.remove('show');
			}
			if (document.getElementById("myDropdown2").classList.contains('show')) {
				myDropdown2.classList.remove('show');
			}
		}
	}
}

function show_record(name_bt,order){	// Show/Hide button record
	if (name_bt == 'bt_record_cke' && order == 'show'){
		document.getElementById("bt_record_cke").style.display = "block"; // Show button
	} 
	if (name_bt == 'bt_record_cke' && order == 'hide'){
		document.getElementById("bt_record_cke").style.display = "none"; // Hide button
	} 
}

function RECUP_TITRE() {				// TEST 
	titlePlugin = editor.plugins.get( 'Title' );
	Titre = titlePlugin.getTitle();
	// document.getElementById('Information').value = Titre;
	show_message(Titre, 'info');
}

function TREE_GET_1() { 				// TEST 
	// var testget;
	// var testget = $.ui.fancytree.getTree("#tree").generateFormElements();
	// // $.ui.fancytree.getTree("#tree").generateFormElements();
	// alert("POST data:\n" + jQuery.param($(testget).serializeArray()));
	// console.log(testget);


	// var sourceTree = $("#tree").fancytree("getTree");
	// // var testget = sourceTree.visit();
	// var testget = sourceTree.toDict();
	

	// OK FONCTIONNE - recupere tout l'arbre
	var tree = $.ui.fancytree.getTree("#tree");
		var d = tree.toDict(true);
		alert(JSON.stringify(d));
}

function RECHARGE() {					// TEST 
	var width = document.getElementById('mySidebar').offsetWidth;
	alert(width);

	// Reload the tree from previous `source` option
	// tree.reload().done(function(){
	//   alert("reloaded");
	// });
	// Optionally pass new `source`:
	//   tree.reload({
	//     // url: ...
	//     source: {url: "ajax-tree-fs.json"},   // RICHARD - NE FONCTION PAS

	//   }).done(function(){
	//     alert("reloaded");
	//   });
}

function TEST1() { 						// TEST 
	//  function(event, data){
					// var node = data.node;
					// FT.debug("activate: event=", event, ", data=", data);
					// if(!$.isEmptyObject(node.data)){
						// alert(node.data);
						// alert('123');
						// alert("custom node data: " + JSON.stringify(node.data));
					// }
					// alert('ici');
}

function TEST2() { 						// TEST 

	// document.getElementById('Information').value = test_cara_interdit;
	// document.getElementById('Information').value = titre;



	// Afficher les plugins en cours
	// document.write(Array.from(editor.ui.componentFactory.names()));

	// alert('fichier enregistrer');
	// alert($_POST['CK_FULL_FOR_POST']);

	// if (isset($_POST['CK_FULL_FOR_POST'])) {
	// 	if (empty($_POST['CK_FULL_FOR_POST'])) {							// si c'est vide 
	// 	}
	// 	else{
	// 		alert($_POST['CK_FULL_FOR_POST']);
	// 	}
	// }
	// var data = 'prout';
	// alert('coin ' + data + $_POST['editorData']);
}

{/* <script type="text/javascript" src="addon/ckeditor5/ckeditor_build.js"></script>
<script type="text/javascript"> editor.isReadOnly = true;</script> */}


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
