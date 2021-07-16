<?php
	 	// // DEBUG         // http://www.bradkent.com/php/debug    et   https://github.com/bkdotcom/PHPDebugConsole
		// require 'debug_php/Debug/Debug.php';   
		// $debug = new \bdk\Debug(array(
		// 	'collect' => true,
		// 	'output' => true,
		// ));
		// $debug->alert('toto');
		// $debug->log('hello world');

	if(session_status() != 2) {	session_start(); } else { header('Location: admin/deco.php'); } // (2 = session active) if don't active session
	if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {header('Location: admin/deco.php');} // redirection si pas de session ouverte
	if (time() > $_SESSION['expire']) {
		session_destroy();
		header('Location: admin/deco.php');
	}else {
		$user = $_SESSION['username'];
		$_SESSION['expire'] = time() + (60 * 60); // Ending a session in 60 minutes from the starting time. (In minutes : (30 * 60) -- In days : (n * 24 * 60 * 60 ) n = no of days)
	}		 
	// echo($user);
	// $_SESSION['s_first_name'] = 'firstname ';
	// $_SESSION['s_last_name'] = 'lastname';
	// $_SESSION['s_edition'] = 'No';
	$file_open = 'datausers/PERSONNAL/Demo/test';


	require_once 'addon/lite/Lite.php'; // Load library for file ini
	$cfg_site = new Config_Lite('admin/config.ini'); // Load site configuration
	$txt = new Config_Lite('translate/' . $cfg_site['config']['Language'] . '.ini'); // load translate dialogue
	// usage :
	// echo $cfg_site['skin']['logo'];
	// echo $txt['site']['site_name'];

	// console_log($txt['site']['logo_open_title']);
	function console_log($output, $with_script_tags = true) {
		$js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
	');';
		if ($with_script_tags) {
			$js_code = '<script>' . $js_code . '</script>';
		}
		echo $js_code;
	}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <!--  charset="iso-8859-1" -->
	<meta name="robots" content="noindex, nofollow"> <!-- no referencement - private usage -->
	<title><?php echo ($txt['site_name']);?></title>
	<link rel="icon" type="image/svg" href="picture/<?php echo $cfg_site['skin']['logo'];?>" />
	<!-- <meta Set-Cookie: SID=31d4d96e407aad42; SameSite=Strict> -->

	<!-- REQUIS -->
	<script src="addon/jquery/jquery-3.5.1.min.js"></script>
	<script src="addon/jquery/jquery-ui-1.12.1.min.js"></script>

	<!-- CK EDITOR 5 - CLASSIC -->
	<script src="addon/ckeditor5/build/ckeditor.js"></script>  <!-- DON'T EDIT THIS -->
	<!-- SEE SETTING CKEDITOR LOAD LOWER -> "addon/ckeditor5/ckeditor_build.js" -->
	<!-- <script>$(document).ready(() => {$.getScript("addon/ckeditor5/ckeditor_build.js");});</script>   -->
	<!-- <script>$("editor").ready(() => {$.getScript("addon/ckeditor5/ckeditor_build.js");});</script>   -->

	<!-- ELFINDER -->
    <script src="addon/elFinder/js/elfinder.min.js"></script>  <!-- J'ai modifié pour creer les liens des fichiers en https, pas encore trouvé la solution pour les cookies -->
	
	<!-- FANCY TREE -->
	<link  href="addon/fancytree/skin-lion/ui.fancytree.css" rel="stylesheet" type="text/css">
	<script src="addon/fancytree/jquery.fancytree.js" type="text/javascript"></script>

    <!-- STYLES CSS -->
    <link rel="stylesheet" type="text/css" href="addon/elFinder/css/jquery-ui.min.css"/> 

	<link rel="stylesheet" type="text/css" href="css/site_style_base.css">
	<link rel="stylesheet" type="text/css" href="css/site_grid.css">
	<link rel="stylesheet" type="text/css" href="css/ckeditor.css"> 
	<link rel="stylesheet" type="text/css" href="css/fancytree.css"> 
	<link rel="stylesheet" type="text/css" href="css/top_menu.css">

	<!-- <link rel="stylesheet" type="text/css" href="css/site_menu_left.css"> -->
	<!-- <link rel="stylesheet" type="text/css" href="css/site_admin.css"> -->

    <!-- SCRIPTS -->
	<!-- <script type="text/javascript" src="js/script_head.js"></script>  -->
	<script type="text/javascript" src="js/site.js"></script>  				<!-- 3 -->
	<script type="text/javascript" src="js/fancytree.js"></script> 			<!-- 1 -->
	<script type="text/javascript" src="js/top_menu.js"></script> 			<!-- 2 -->
	<script type="text/javascript" src="js/contextual_menu.js"></script> 	<!-- 4 -->

	<?echo "<script> username='" . $_SESSION['username'] . "';</script>";?> <!-- SPECIAL - report username pour use to fancytree.js -->

	<script>
		var cke_title_limit = <?php echo $cfg_site['ck_editor']['cke_title_limit']; ?>
	</script>
</head>
<body>

<div class="panel" id="panel">
	<div class="panel_title" id="panel_title" onclick="sidebar_open_close()" title="<?php echo $txt['site']['logo_open_title'];?>"> <?php echo $txt['site']['tree_title'];?> </div>
	<div class="tree" id="tree" onmousedown="right_click(this,event)"></div> 
</div>

<div class="main" id="main">
	<div class="topmenu">
		<a class="garde" onclick="sidebar_open_close()"> <img class="tm_img_size" src="picture/<?php echo $cfg_site['skin']['logo_open'];?>" title="<?php echo $txt['site']['logo_open_title'];?>"></a>
		<a class="tm_logo" href="<?php echo $cfg_site['config']['site_url'] . "/main.php";?>" target=""> <img class="tm_img_size" src="picture/<?php echo $cfg_site['skin']['logo'];?>" title="<?php echo $txt['site']['site_name'];?>"></a>
		<div class="dropdown">
			<button class="dropbtn" >Document <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
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
				<?php if ($user == 'Demo') echo "<a href='admin/admin.php'>Admin</a>";?>
				<a href="admin/deco.php">Déconnection</a>
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
		<a onclick="TEST1()">test</a>
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
						unlink($file_open);                  			// Supprime le fichier
						file_put_contents($file_open,'');    			// écrit le fichier
						echo "<script> $(document).ready(() => {show_message('\"{$file_open}\" a bien était supprimé !', 'success')}); </script>";
					}
					else { 													// Si "editor" n'est pas vide  
						file_put_contents($file_open,$_POST['CK_FULL_FOR_POST']); // remplace le contenu de "fichier.txt" par celui de "editor1"
						echo "<script> $(document).ready(() => {show_message('\"{$file_open}\" a bien était enregistré !', 'success')}); </script>";
						// echo "<script> document.getElementById('Information').value = 'Fichier enregistré !'; </script>"; 
					}
				}
				// Lecture du fichier en prévision de l'injecter dans CKEDITOR - - - ATTENTION PEUT ETRE PREVOIR UNE PAUSE AVANT DE LIRE LE FICHIER ? en prévision de fichier lourde
				$Contenu = file_get_contents($file_open, true);
			};
		?>
		<form action="main.php" method="post" id="form_cke">
			<textarea name="CK_FULL_FOR_POST" id="CK_FULL_FOR_POST" hidden data-sample-short ></textarea>
			<textarea name="CK_TITRE_FOR_POST" id="CK_TITRE_FOR_POST" hidden data-sample-short ></textarea>
		</form> 

		<div class="editor" name="editor" id="editor" > <?php echo $Contenu; ?> </div> 		<!-- CKEDITOR -->
		<script type="text/javascript" src="addon/ckeditor5/ckeditor_build.js"></script>	<!-- CKEDITOR SETTINGS -->
	</div>
</div>

<div id="message_block"> </div>

<div class=context_menu id=context_menu>
	<a class="contextual_menu " onclick="tree_add_file()"><img src="picture/icon-file.gif" alt="Folder" style="width:15px;height:15px;">&ensp; Créer un fichier</a>
	<a class="contextual_menu view_folder" onclick="tree_add_folder()"><img src="picture/icon-folder.gif" alt="Folder" style="width:15px;height:15px;">&ensp; Créer un dossier</a>
	<a class="contextual_menu view_del" onclick="tree_delete_node()"><img src="picture/icon-remove.svg" alt="Folder" style="width:15px;height:15px;">&ensp; Supprimer</a>
	<!-- <a class="contextual_menu" onclick="TREE_GET_1()">test get</a> -->
</div>
</body>
</html>