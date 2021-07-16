var url_current = document.location.href; 
var url_current = url_current.replace(/\/$/, "");// Supprimons l'éventuel dernier slash de l'URL
end_url = url_current.substring (url_current.lastIndexOf( "/" )+1 );// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante

if (end_url == 'main.php'){
	$(document).ready(() => {  				// QUAND LA PAGE EST CHARGER -- open panel left  
		document.getElementById("panel").style.width = "310px";
		document.getElementById("main").style.marginLeft = "310px";
	});
	
	$(document).ready(function() {			// Special - CSS - on hover .panel_title and .garde change background (not possible in css)
		$('.panel_title').hover(function() {
			$('.panel_title').css('transition', '0s').css('background-color', '#E6994C');
			$('.garde').css('transition', '0s').css('background-color', '#E6994C');
		},function() {  // on mouseout, reset the background colour
			$('.panel_title').css('background-color', '#00796B');
			$('.garde').css('background-color', '#00796B');
		});
	
		$('.garde').hover(function() {
			$('.panel_title').css('transition', '0s').css('background-color', '#E6994C');
			$('.garde').css('transition', '0s').css('background-color', '#E6994C');
		},function() {  // on mouseout, reset the background colour
			$('.panel_title').css('background-color', '#00796B');
			$('.garde').css('background-color', '#00796B');
		});
	});

	function sidebar_open_close() {			// SIDEBAR - OPEN/CLOSE 
		var sidebar_largeur = document.getElementById('panel').offsetWidth;
		if (sidebar_largeur == 0) { 
			document.getElementById("panel").style.width = "310px";
			document.getElementById("main").style.marginLeft = "310px";
			// document.getElementById("editor").style.marginLeft = "310px";
			// document.getElementsByClassName("ck-editor__editable").style.marginLeft = "310px";
		}else{
			// document.getElementsByClassName("ck-editor__editable").style.width = "100%";
			document.getElementById("panel").style.width = "0";
			document.getElementById("main").style.marginLeft = "0";
			// document.getElementById("cke").style.marginLeft = "0";
			// document.getElementById("editor").style.width = "100%";
		}
	
		// var sidebar_largeur = document.getElementById('mySidebar').offsetWidth;
		// document.getElementById("panel_title").style.transition = "0.5s";
		// if (sidebar_largeur == 0) { 
		// 	document.getElementById("mySidebar").style.width = "310px";
		// 	document.getElementById("panel_title").style.width = "310px";
		// 	document.getElementById("main").style.marginLeft = "310px";
		// }else{
		// 	document.getElementById("mySidebar").style.width = "0";
		// 	document.getElementById("panel_title").style.width = "0";
		// 	document.getElementById("main").style.marginLeft = "0";
		// }
	}
	
	function show_record(name_bt,order){	// Show/Hide button record
		if (name_bt == 'bt_record_cke' && order == 'show'){
			document.getElementById("bt_record_cke").style.display = "block"; // Show button
		} 
		if (name_bt == 'bt_record_cke' && order == 'hide'){
			document.getElementById("bt_record_cke").style.display = "none"; // Hide button
		} 
	}

	function post_server() {// LOGICAL TEST ON THE CKEDITOR TITLE IF OK SENDING POST TO THE SERVER 
		{   
			titlePlugin = editor.plugins.get( 'Title' );
			titre = titlePlugin.getTitle();
	
			name_checked = check_name_file_folder(titre)
			if (name_checked === 'error') {	return; }
		};
	
		document.getElementById('CK_TITRE_FOR_POST').value = titre; // on mets les donnees du titre de CKE dans un textarea avant l'envoi POST
		document.getElementById('CK_FULL_FOR_POST').value = editor.getData(); // on mets les donnees du contenu de CKE dans un textarea avant l'envoi POST
		document.forms["form_cke"].submit();
	}
}

function show_message(message, style) { // SNACKBAR MESSAGE (INFO - SUCCESS - WARNING)
	if (style == 'info') {style_message = ' ';} 	
	if (style == 'success') {style_message = ' ';} 	
	if (style == 'warning') {style_message = ' ';} 	

	document.getElementById('message_block').innerHTML = style_message + message;
	var x = document.getElementById("message_block");
	x.className = "show " + style;

	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3800); // After 4 seconds, remove the show class from DIV
}


function escape($valeur)	// echo 'Bienvenue ' . escape($prenom) . ' ' . escape($nom) . ' !';
{
    // Convertit les caractères spéciaux en entités HTML
    return htmlspecialchars($valeur, ENT_QUOTES, 'UTF-8', false);
}

function check_name_file_folder(name_checked) {
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
