<?php
	session_start();
	if (!isset($_SESSION['username'])) {header('Location: deco.php');} // redirection si pas de session ouverte
	if (empty($_SESSION['username'])) {header('Location: deco.php');} // redirection si pas de session ouverte
	$now = time(); // Checking the time now when home page starts.
	if ($now > $_SESSION['expire']) {
		session_destroy();
		header('Location: deco.php');
	}		 
	$user = $_SESSION['username'];
	// echo($user);
	// $_SESSION['s_first_name'] = 'firstname ';
	// $_SESSION['s_last_name'] = 'lastname';
	// $_SESSION['s_edition'] = 'No';
	$Fichier = 'datausers/fichier.txt';
	// print_r($_SESSION);
	// print_r($_GET);	    // affiche toutes les variables GET
	// print_r($_POST);	    // affiche toutes les variables POST
	$ini = parse_ini_file("admin/config.ini");
	// $ini_user = parse_ini_file("admin/config_" . $user . ".ini");
	if ($ini['Language'] == "fr-fr"){$txt = parse_ini_file("translate/fr-fr.ini");}
	if ($ini['Language'] == "en-en"){$txt = parse_ini_file("translate/en-en.ini");}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <!--  charset="iso-8859-1" -->
	<meta name="robots" content="noindex, nofollow"> <!-- no referencement - private usage -->
	<title><?php echo ($txt['site_name']);?></title>
	<link rel="icon" type="image/svg" href="picture/<?php echo($ini['logo']);?>" />
	<!-- <link rel="icon" type="image/svg" href="picture/musketeer_portrait.svg" /> -->

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
    <link rel="stylesheet" type="text/css" href="addon/elFinder/css/jquery-ui.min.css"/> 

	<link rel="stylesheet" type="text/css" href="css/site_style_base.css">
	<link rel="stylesheet" type="text/css" href="css/site_grid.css">
	<link rel="stylesheet" type="text/css" href="css/add_ck_editor.css"> 
	<link rel="stylesheet" type="text/css" href="css/add_fancy_tree.css"> 
	<link rel="stylesheet" type="text/css" href="css/site_menu_top.css">

	<!-- <link rel="stylesheet" type="text/css" href="css/site_menu_left.css"> -->
	<!-- <link rel="stylesheet" type="text/css" href="css/site_admin.css"> -->

    <!-- SCRIPTS -->
	<!-- <script type="text/javascript" src="js/script_head.js"></script>  -->
	<script type="text/javascript" src="js/add_fancytree.js"></script>
	<script type="text/javascript" src="js/add_ckeditor.js"></script> 
	<script type="text/javascript" src="js/site.js"></script> 
	<script type="text/javascript" src="js/mod_contextual_menu.js"></script> 

	<script>
		var obj_contextual_menu = 'tree'; // use with mod_contextual_menu.js
		var cke_title_limit = <?php echo($ini['cke_title_limit']); ?>
	</script>
</head>
<body>

<div class="panel" id="panel">
	<div class="panel_title" id="panel_title" onclick="sidebar_open_close()" title="<?php echo($txt['logo_open_title']);?>"> <?php echo ($txt['tree_title']);?> </div>
	<div class="tree" id="tree" onmousedown="right_click(this,event)"></div> 
</div>

<div class="main" id="main">
	<div class="topmenu">
		<a class="garde" onclick="sidebar_open_close()"> <img class="tm_img_size" src="picture/<?php echo($ini['logo_open']);?>" title="<?php echo($txt['logo_open_title']);?>"></a>
		<a class="tm_logo" href="<?php echo($ini['site_url'] . "/main.php");?>" target=""> <img class="tm_img_size" src="picture/<?php echo($ini['logo']);?>" title="<?php echo($txt['site_name']);?>"></a>
		<div class="dropdown">
			<button class="dropbtn" >Edition du document <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
			<div class="dropdown-content" >
				<a href="#" id="menu_cke_edition" onclick="menu_cke_edition()">Modifier</a>
				<!-- <a href="#" >Supprimer</a> -->
				<a href="#" >Historique</a>
			</div>
		</div> 
		<div class="dropdown">
			<button class="dropbtn" >Profil: <?php echo ($user);?> <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
			<div class="dropdown-content" >
				<a href="#">Modifier</a>
				<?php if ($_SESSION['username'] = 'aaa'){echo "<a href='admin.php'>Admin</a>";} ?>
				<a href="deco.php">Déconnection</a>
			</div>
		</div> 
		<div class="dropdown">
			<button class="dropbtn" > Plus <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
			<div class="dropdown-content" >
				<a href="#">Améliorer</a>
				<a href="#">Aide</a>
				<a href="#">A propos</a>
			</div>
		</div> 
		<!-- <a onclick="show_message((editor.getData()), 'info')">get1</a> -->
		<!-- <a onclick="show_message('test', 'info')">MsgBox</a> -->
		<!-- <a onclick="TEST1()">test</a> -->
		<!-- <a style="cursor:help" onclick="show_record('bt_record_cke','show')">show record</a> -->
		<!-- <a style="cursor:help" onclick="show_record('bt_record_cke','hide')">hide record</a> -->
		<a id="bt_record_cke"  style="display: none;" class="bt_record" onclick="post_server()">Enregistrer</a> <!-- here Button record -->
		<textarea id="Information" rows="1" placeholder="Peter.Pan(ThisDocument,read) Chuck.Norris(OtherDocument,write) Harry.Potter(BigDocument,read)"></textarea>
		<!-- <br>
		<br>
		123 -->
	</div>
	<!-- <div>
	</div> -->
	<div class="cke">
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
		<!-- <br> -->
		<!-- <br> -->
		<form action="main.php" method="post" id="form_cke">
			<textarea name="CK_FULL_FOR_POST" id="CK_FULL_FOR_POST" hidden data-sample-short ></textarea> <!-- TIPS CKE5 Ballon n'accepte pas un textarea qui est indispensable pour la method_post -->
			<textarea name="CK_TITRE_FOR_POST" id="CK_TITRE_FOR_POST" hidden data-sample-short ></textarea> <!-- TIPS CKE5 Ballon n'accepte pas un textarea qui est indispensable pour la method_post -->
		</form> 
		<div class="editor" name="editor" id="editor" > <?php echo $Contenu; ?> </div> 	<!-- HERE - CKEDITOR  -->
		
		<!-- CKEDITOR PARAMETRES -->
		<script type="text/javascript" src="addon/ckeditor5/ckeditor_build.js"></script>
		<script type="text/javascript"> editor.isReadOnly = true;</script>
	</div>
</div>

<div id="message_block"> </div>
<div class=context_menu id=context_menu>
	<a class="contextual_menu" onclick="TREE1_ADD_FILE()">Créer un fichier</a>
	<a class="contextual_menu" onclick="TREE1_ADD_FOLDER()">Créer un dossier</a>
	<a class="contextual_menu" onclick="TREE1_ADD_FOLDER_CHILD()">Créer un sous-dossier</a>
	<a class="contextual_menu" onclick="TREE1_DELETE_NODE()">Supprimer</a>
	<a class="contextual_menu" onclick="TREE_GET_1()">test get</a>
</div>
</body>
</html>