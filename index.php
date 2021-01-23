<?php
	session_start();
	$_SESSION['s_first_name'] = 'firstname ';
	$_SESSION['s_last_name'] = 'lastname';
	$_SESSION['s_edition'] = 'No';
	$Fichier = 'datausers/fichier.txt';
	// print_r($_GET);	    // affiche toutes les variables GET
	// print_r($_POST);	    // affiche toutes les variables POST
	$ini = parse_ini_file("admin/config.ini");
	if ($ini['Language'] == "fr-fr"){$txt = parse_ini_file("translate/fr-fr.ini");}
	if ($ini['Language'] == "en-en"){$txt = parse_ini_file("translate/en-en.ini");}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <!--  charset="iso-8859-1" -->
	<meta name="robots" content="noindex, nofollow"> <!-- no referencement - private usage -->
	<title><?php echo ($txt['site_name']);?></title>
	<link rel="icon" type="image/svg" href="picture/musketeer_portrait.svg" />

	<!-- REQUIS -->
	<script src="addon/jquery/jquery-3.5.1.min.js"></script>
	<script src="addon/jquery/jquery-ui-1.12.1.min.js"></script>

	<!-- CK EDITOR 5 - INLINE -->
	<script src="addon/ckeditor5/build/ckeditor.js"></script>
	<!-- <script>$(document).ready(() => {$.getScript("addon/ckeditor5/ckeditor_build.js");});</script> // Problem with "editor.isReadOnly = true" --> 

	<!-- ELFINDER -->
    <script src="addon/elFinder/js/elfinder.min.js"></script>
	
	<!-- FANCY TREE -->
	<link  href="addon/fancytree/skin-lion/ui.fancytree.css" rel="stylesheet" type="text/css">
	<script src="addon/fancytree/jquery.fancytree.js" type="text/javascript"></script>

    <!-- STYLES CSS -->
    <link rel="stylesheet" type="text/css" href="addon/css/jquery-ui.min/jquery-ui.min.css"/> <!-- ELFINDER -->
	<link rel="stylesheet" type="text/css" href="addon/css/fancy_tree.css"> 
	<link rel="stylesheet" type="text/css" href="addon/css/ckeditor.css">
	<link rel="stylesheet" type="text/css" href="addon/css/left_menu_sidebar.css">
	<link rel="stylesheet" type="text/css" href="addon/css/top_menu.css">
	<link rel="stylesheet" type="text/css" href="addon/css/page_html.css">

    <!-- SCRIPTS -->
	<script type="text/javascript" src="addon/js/script_head.js"></script>
	<script>
		var cke_title_limit = <?php echo($ini['cke_title_limit']); ?>
	</script>
</head>
<body>
<div id="mySidebar" class="sidebar">  <!-- PANEL LEFT --><!-- LEFT MENU --> 
	<div class="lm lm_titre" onclick="sidebar_open_close()"><?php echo ($txt['tree_title']);?></div>    
	<table border="0" width="100%" style="background-color: black">
		<tr>
			<th colspan="3"> <div class="lm lm_info_creer"><img src="picture/down-arrow.svg" height="10px" width="10px"> &nbsp;&nbsp;&nbsp; creer &nbsp;&nbsp;&nbsp; <img src="picture/down-arrow.svg" height="10px" width="10px"></div> </th>
			<th></th>
		</tr>
		<tr>
			<td rowspan="2"> <div class="lm lm_default"><a onclick="TREE1_ADD_FILE()">Fichier</a></div> </td>
			<td rowspan="2"> <div class="lm lm_default"><a onclick="TREE1_ADD_FOLDER()">Dossier</a></div> </td>
			<td rowspan="2"> <div class="lm lm_default"><a onclick="TREE1_ADD_FOLDER_ENFANT()">Sous-dossier</a></div> </td>
			<td><div class="lm lm_supp"> <a onclick="TREE1_ADD_FOLDER_ENFANT()" >Supprimer</a> </div> </td>
		</tr>
		<tr>
			<td><div class="lm lm_undo" id="lm_bt_undo"> <a onclick="TREE1_ADD_FOLDER_ENFANT()" > Undo</a> </div> </td>
		</tr>
	</table>
	<div id="tree"></div>  <!-- HERE - ARBRE - FANCY TREE  --> 
</div> 

<div id="main">  
	<div class="topmenu"> <!-- TOP MENU  -->
		<a onclick="sidebar_open_close()" class="garde"><img src="picture/<?php echo($ini['logo_open']);?>" height="<?php echo($ini['logo_open_size']);?>px" width="<?php echo($ini['logo_open_size']);?>px" title="<?php echo($txt['logo_open_title']);?>"></a>
		<a href="<?php echo($ini['site_url'] . "/index.php");?>" target="" style="padding: 0 0"><img src="picture/<?php echo($ini['logo']);?>" height="<?php echo($ini['logo_size']);?>px" width="<?php echo($ini['logo_size']);?>px" title="<?php echo($txt['site_name']);?>"></a>
		<div class="dropdown">
			<button class="dropbtn" onclick="topmenu_dropdown(1)">Edition du document <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
			<div class="dropdown-content" id="myDropdown1">
				<a href="#" id="menu_cke_edition" onclick="menu_cke_edition()">Modifier</a>
				<a href="#" >Supprimer</a>
				<a href="#" >Historique</a>
				<!-- <a type="button" onclick="Modification()">Entrer en modification</a> -->
				<!-- <a href="#">Quitter la modification sans enregistrer</a> -->
			</div>
		</div> 
		<div class="dropdown">
			<button class="dropbtn" onclick="topmenu_dropdown(2)">Profil <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
			<div class="dropdown-content" id="myDropdown2">
				<a href="#">Modifier</a>
				<!-- <a >truc</a> -->
				<a href="">Déconnection</a>
			</div>
		</div> 
		<!-- <a onclick="show_message((editor.getData()), 'info')">get1</a> -->
		<a>A propos</a>
		<a onclick="show_message('test', 'info')">MsgBox</a>
		<a onclick="TREE_GET_2()">test</a>
		<!-- <a style="cursor:help" onclick="show_record('bt_record_cke','show')">show record</a> -->
		<!-- <a style="cursor:help" onclick="show_record('bt_record_cke','hide')">hide record</a> -->
		<a id="bt_record_cke"  style="display: none" class="bt_record" onclick="post_server()">Enregistrer</a> <!-- here Button record -->
		<textarea id="Information" rows="1" placeholder="Peter.Pan(ThisDocument,read) Chuck.Norris(OtherDocument,write) Harry.Potter(BigDocument,read)"></textarea>
	</div>
		<!-- <button type="button" onclick="Modification()">Modification</button> -->
		<!-- <button type="button" onclick="RECUP_TITRE()">CK5 récup Titre</button> -->
		<!-- <button onclick="show_message('www', 'warning')">Show Snackbar</button>(INFO - SUCCESS - WARNING) -->

	<div id="message_block"> </div>

	<?php
		{	// ENREGISTREMENT POST DU CONTENU DE CKEDITOR
			if (isset($_POST['CK_FULL_FOR_POST'])) { 							// Si il y a la variable POST dans l'URL 
				if (empty($_POST['CK_FULL_FOR_POST'])) {							// si c'est vide 
					unlink($Fichier);                  			// Supprime le fichier
					file_put_contents($Fichier,'');    			// écrit le fichier
					echo "<script> $(document).ready(() => {show_message('\"{$Fichier}\" a bien était supprimé !', 'success')}); </script>";
				}
				else { 													// Si "editor1" n'est pas vide  
					file_put_contents($Fichier,$_POST['CK_FULL_FOR_POST']); // remplace le contenu de "fichier.txt" par celui de "editor1"
					echo "<script> $(document).ready(() => {show_message('\"{$Fichier}\" a bien était enregistré !', 'success')}); </script>";
					// echo "<script> document.getElementById('Information').value = 'Fichier enregistré !'; </script>"; 
				}
			}
			// Lecture du fichier en prévision de l'injecter dans CKEDITOR - - - ATTENTION PEUT ETRE PREVOIR UNE PAUSE AVANT DE LIRE LE FICHIER ? en prévision de fichier lourde
			$Contenu = file_get_contents($Fichier, true); 			 
		};
	?>
	<br>
	<br>
	<form action="index.php" method="post" id="form_cke">
		<textarea name="CK_FULL_FOR_POST" id="CK_FULL_FOR_POST" hidden data-sample-short ></textarea> <!-- TIPS CKE5 Ballon n'accepte pas un textarea qui est indispensable pour la method_post -->
		<textarea name="CK_TITRE_FOR_POST" id="CK_TITRE_FOR_POST" hidden data-sample-short ></textarea> <!-- TIPS CKE5 Ballon n'accepte pas un textarea qui est indispensable pour la method_post -->
		<div class="editor" name="editor" id="editor" > <?php echo $Contenu; ?> </div> 	<!-- HERE - CKEDITOR  -->
	</form> 
	
	<!-- CKEDITOR PARAMETRES -->
	<script type="text/javascript" src="addon/ckeditor5/ckeditor_build.js"></script>
	<script type="text/javascript"> editor.isReadOnly = true;</script>
</div>
</body>
</html>