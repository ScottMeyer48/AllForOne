<?php
	if(session_status() != 2) {	session_start(); } else { header('Location: deco.php'); } // (2 = session active) if don't active session
	if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {header('Location: deco.php');} // redirection si pas de session ouverte
	if (time() > $_SESSION['expire']) {	header('Location: deco.php');
	}else {
		$user = $_SESSION['username'];
		$_SESSION['expire'] = time() + (60 * 60); // Ending a session in 60 minutes from the starting time. (In minutes : (30 * 60) -- In days : (n * 24 * 60 * 60 ) n = no of days)
	}

	// Get Folder Parent ,  /volume1/web/allforone/admin => /volume1/web/allforone
	// $path_array = explode('/', __DIR__); // put path to array
	// $path_shortcut_array = array_slice($path_array,0,(count($path_array)-1)); // rebuild array path without the last 
	// $path_base = implode("/", $path_shortcut_array); // rebuild with '/'

	// $file_open = 'datausers/PERSONNAL/Demo/test';

	require_once 'addon/lite/Lite.php'; // Load library for file ini
	$ini_site = new Config_Lite('admin/config.ini'); // Load ini site
	$ini_txt = new Config_Lite('translate/' . $ini_site['config']['language'] . '.ini'); // load ini translate
    $ini_user = new Config_Lite('admin/users_cfg/' . $_SESSION['username'] . '_cfg.ini'); // Load ini user 
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <!--  charset="iso-8859-1" -->
	<meta name="robots" content="noindex, nofollow"> <!-- no referencement - private usage -->
	<title><?php echo ($ini_txt['site']['site_name']);?></title>
	<link rel="icon" type="image/svg" href="picture/<?php echo $ini_site['skin']['logo'];?>" />
	<!-- <meta Set-Cookie: SID=31d4d96e407aad42; SameSite=Strict> -->

	<!-- REQUIS -->
	<script src="addon/jquery/jquery-3.5.1.min.js"></script>
	<script src="addon/jquery/jquery-ui-1.12.1.min.js"></script>
	<script src="addon/ckeditor5/build/ckeditor.js"></script>  <!-- CK EDITOR 5 - DON'T EDIT THIS -->

	<!-- ELFINDER -->
	<script src="addon/elFinder/js/elfinder.min.js"></script>  <!-- J'ai modifié pour creer les liens des fichiers en https, pas encore trouvé la solution pour les cookies -->
    <link rel="stylesheet" type="text/css" href="addon/elFinder/css/jquery-ui.min.css"/> 
	
	<!-- FANCY TREE -->
	<link  href="addon/fancytree/skin-lion/ui.fancytree.css" rel="stylesheet" type="text/css">
	<script src="addon/fancytree/jquery.fancytree.js" type="text/javascript"></script>

    <!-- STYLES CSS -->
	<link rel="stylesheet" type="text/css" href="css/site.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/site_grid.css"> -->
	<link rel="stylesheet" type="text/css" href="css/ckeditor.css"> 
	<link rel="stylesheet" type="text/css" href="css/fancytree.css"> 
	<link rel="stylesheet" type="text/css" href="css/top_menu.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/site_menu_left.css"> -->
	<!-- <link rel="stylesheet" type="text/css" href="css/site_admin.css"> -->
</head>
<body>

<div class="main">
    <div class="left_top panel" >
		<div class="panel_title" id="panel_title" onclick="sidebar_open_close()" title="<?php echo $ini_txt['site']['logo_open_title'];?>"> <?php echo $ini_txt['site']['tree_title'];?> </div>
    </div>
    <div class="left_tree panel">
		<div class="tree" id="tree" onmousedown="right_click(this,event)"></div> 
		<!-- <div class="mask" id="mask"> Masqué en édition </div> -->
    </div>  
    <div class="right_top_menu ">
		<div class="tm" id="menu_top">
			<div class="tm_body tm_def">
				<div class="tm_row tm_def">
					<div class="tm_cell tm_panel_open tm_def"> 
						<a class="tm_panel_open" onclick="sidebar_open_close()"> <img class="tm_img_size" src="picture/<?php echo $ini_site['skin']['logo_open'];?>" title="<?php echo $ini_txt['site']['logo_open_title'];?>"></a>
					</div>
					<div class="tm_cell tm_def"> 
						<a class="tm_logo" href="<?php echo $ini_site['config']['site_url'] . "/main.php";?>" target=""> <img class="tm_img_size" src="picture/<?php echo $ini_site['skin']['logo'];?>" title="<?php echo $ini_txt['site']['site_name'];?>"></a>
					</div>
					<div class="tm_cell tm_def"> 
						<div class="tm_dropdown">
							<button class="tm_dropbtn tm_def" ><?php echo $ini_txt['menu']['document'];?> <img class="tm_icon_size" src="picture/down-arrow.svg"></button>
							<div class="tm_dropdown_content" >
								<a id="menu_document_edit" onclick="menu_document_edit()"><?php echo $ini_txt['menu']['edit'];?></a>
								<a href="#"><?php echo $ini_txt['menu']['print'];?></a>
								<a href="#"><?php echo $ini_txt['menu']['encrypt'];?></a>
								<a href="#"><?php echo $ini_txt['menu']['historical'];?></a>
							</div>
						</div> 
					</div>
					<div class="tm_cell tm_def">
						<div class="tm_dropdown">
							<button class="tm_dropbtn tm_def" ><?php echo $ini_txt['menu']['profil'];?>: <?php echo ($user);?> <img class="tm_icon_size" src="picture/down-arrow.svg"></button>
							<div class="tm_dropdown_content" >
								<a href="#"><?php echo $ini_txt['menu']['profil_edit'];?></a>
								<?php if ($_SESSION['privilege'] == 'Admin') echo "<a href='admin.php'>" . $ini_txt['menu']['admin'] . "</a>";?>
								<a href="deco.php"><?php echo $ini_txt['menu']['deconnect'];?></a>
							</div>
						</div> 
					</div>
					<div class="tm_cell tm_def"> 
						<div class="tm_dropdown">
							<button class="tm_dropbtn tm_def" > <?php echo $ini_txt['menu']['more'];?> <img class="tm_icon_size" src="picture/down-arrow.svg"></button>
							<div class="tm_dropdown_content" >
								<a onclick="TEST1()">TEST1</a>
								<a href="#"><?php echo $ini_txt['menu']['improve'];?></a>
								<!-- <a href="#">Aide</a> -->
								<a href="#"><?php echo $ini_txt['menu']['about'];?></a>
							</div>
						</div> 
					</div>
					<div class="tm_cell tm_def">
						<div class="tm_status tm_def tm_mode_read" id="tm_status"><?php echo $ini_txt['status']['read'];?></div>
						<button disabled class="tm_status tm_def tm_bt_record " id="tm_bt_record_cke" onclick="bt_record()"><?php echo $ini_txt['status']['record'];?></button>
					</div>
						<div class="tm_cell tm_def ">
							<textarea  class="tm_area" id="Information" rows="2" placeholder="Peter.Pan(ThisDocument,read) Chuck.Norris(OtherDocument,write) Harry.Potter(BigDocument,read)"></textarea> 
					</div>
				</div>
			</div>
		</div>
	</div>
    <div class="right_cke">
		<div class="editor" name="editor" id="editor" > <?php echo $Contenu; ?> </div> 
    </div>
</div>

<div id="message_block"> </div>

<div class=context_menu id=context_menu>
	<a class="contextual_menu" onclick="tree_add_file()"><img class="contex_menu_img" src="picture/icon-file.gif" alt="Add file">&ensp; Créer un fichier</a>
	<a class="contextual_menu view_folder" onclick="tree_add_folder()"><img class="contex_menu_img" src="picture/icon-folder.gif" alt="Add folder">&ensp; Créer un dossier</a>
	<a class="contextual_menu view_del" onclick="tree_delete_node()"><img class="contex_menu_img" src="picture/icon-remove.svg" alt="Delete">&ensp; Supprimer</a>
	<!-- <a class="contextual_menu" onclick="TREE_GET_1()">test get</a> -->
</div>
</body>
	<script type="text/javascript" src="js/site.js"></script>
	<script type="text/javascript" src="js/fancytree.js"></script>
	<script type="text/javascript" src="js/contextual_menu.js"></script>
	<script type="text/javascript" src="addon/ckeditor5/ckeditor_build.js"></script>

	<script>
		username = "<?php echo $_SESSION['username'];?>"; 				// SPECIAL - report username use to fancytree.js
		last_open = "<?php echo $ini_user['Files']['last_open'];?>"; 	// SPECIAL - report Last open use to fancytree.js
		
		// SPECIAL - report for site.js
		txt_mode_read = "<?php echo $ini_txt['status']['read'];?>";
		txt_mode_write = "<?php echo $ini_txt['status']['write'];?>";
		txt_menu_document = "<?php echo $ini_txt['menu']['document'];?>";
		txt_menu_edit = "<?php echo $ini_txt['menu']['edit'];?>";
		txt_menu_no_record = "<?php echo $ini_txt['menu']['no_record'];?>";
		cke_title_limit = <?php echo $ini_site['ck_editor']['cke_title_limit'];?>;
	</script>
</html>