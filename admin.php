<?php
	if(session_status() != 2) {	session_start(); } else { header('Location: deco.php'); } // (2 = session active) if don't active session
	
	// session_start();
	if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {header('Location: deco.php');} // redirection si pas de session ouverte

	if (time() > $_SESSION['expire']) {
		session_destroy();
		header('Location: deco.php');
	}else {
		$user = $_SESSION['username'];
		$_SESSION['expire'] = time() + (60 * 60); // Ending a session in 60 minutes from the starting time. (In minutes : (30 * 60) -- In days : (n * 24 * 60 * 60 ) n = no of days)
	}	

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

    <!-- STYLES CSS -->
	<link rel="stylesheet" type="text/css" href="css/site_style_base.css">
	<link rel="stylesheet" type="text/css" href="css/top_menu.css">
	<link rel="stylesheet" type="text/css" href="css/site_admin.css">

    <!-- SCRIPTS -->
	<script type="text/javascript" src="js/site.js"></script>  				<!-- 3 -->
	<script type="text/javascript" src="js/mod_tab.js"></script>			<!-- 1 -->
	<script type="text/javascript" src="js/top_menu.js"></script> 			<!-- 2 -->
	<script type="text/javascript" src="js/contextual_menu.js"></script> 	<!-- 4 -->
</head>

<body>
<div class=context_menu id=context_menu>
	<a class="contextual_menu" onclick="user_edit()"><img src="picture/icon-edit.svg" alt="Folder" style="width:15px;height:15px;">&ensp; Modifier</a>
	<a class="contextual_menu" onclick="user_del()"><img src="picture/icon-remove.svg" alt="Folder" style="width:15px;height:15px;">&ensp; Supprimer</a>
	<a class="contextual_menu" onclick="user_del()"><img src="picture/icon-cadena.svg" alt="Folder" style="width:15px;height:15px;">&ensp; Réinitialiser le mot de passe ?</a>
</div>

<!-- <div id="main">   -->
	<div class="topmenu">  
		<a href="<?php echo($ini['site_url'] . "/main.php");?>" target="" style="padding: 0 0;"><img src="picture/<?php echo($ini['logo']);?>" height="<?php echo($ini['logo_size']);?>px" width="<?php echo($ini['logo_size']);?>px" title="<?php echo($txt['site_name']);?>"></a>
		<!-- <div class="dropdown">
			<button class="dropbtn" onclick="topmenu_dropdown(1)">Edition du document <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
			<div class="dropdown-content" id="myDropdown1">
				<a href="#" id="menu_cke_edition" onclick="menu_cke_edition()">Modifier</a>
				<a href="#" >Supprimer</a>
				<a href="#" >Historique</a>
			</div>
		</div>  -->
		<div class="dropdown">
			<button class="dropbtn" onclick="topmenu_dropdown(2)">Profil <?php echo ($user);?> <img src="picture/down-arrow.svg" height="10px" width="10px"></button>
			<div class="dropdown-content" id="myDropdown2">
				<a href="#">Modifier</a>
				<?php if ($user == 'Demo') echo "<a href='admin.php'>Admin</a>";?>
				<a href="deco.php">Déconnection</a>
			</div>
		</div> 
		<a>A propos</a>
	</div>
<!-- </div> -->

<div class="in_page">
	<h2 style="text-align: center;">Page Administration</h2>  
	<!-- <button class="continue" onclick="test()">Enregistrer</button> -->
	<!-- <p><input type="submit" value="Soummettre"></p> -->

	<form action="admin.php" method="post" id="form_adm">
	<fieldset>
		<legend>Créer/modifier une entrée :</legend>
		<table class="table_new" id="table_new">
			<tr>
				<th class="th_head_table">Nom</th>
				<th class="th_head_table">Prénom</th>
				<th class="th_head_table">Tél Portable</th>
				<th class="th_head_table">Mot de passe</th>
				<th class="th_head_table">email</th>
				<th class="th_head_table">Droit CKE</th>
				<th class="th_head_table">Droit elFinder</th>
				<th class="th_head_table">Compte</th>
				<th class="th_head_table"></th>
			</tr>
			<tr class="no_hover">
				<td><input style="text-align: center;" id="new_input1" type="text" value="kopk"></td>
				<td><input style="text-align: center;" id="new_input2" type="text" value="kopk"></td>
				<td><input style="text-align: center;" id="new_input3" type="text" value="kopk"></td>
				<td><input style="text-align: center;" id="new_input4" type="text" value="kopk"></td>
				<td><input style="text-align: center;" id="new_input5" type="text" value="kopk"></td>
				<td><input style="text-align: center;" id="new_input6" type="text" value="kopk"></td>
				<td><input style="text-align: center;" id="new_input7" type="text" value="kopk"></td>
				<td><input style="text-align: center;" id="new_input8" type="text" value="kopk"></td>
				<td><button type="submit">Enregistrer</button></td>
			</tr>
		</table>
	</fieldset>

	<fieldset>
		<legend id=title_list_users>Liste des utilisateurs :</legend>
		<?php
		function build_table($array){
			// start table
			$html = '<table class="myTable" id="myTable">';
			// Filter row
			$html .= '<tr>';
			$ii =0;
			foreach($array[0] as $key=>$value){
				$html .= '<th class="filter"><input type="text" style="text-align: center;" id="myInput' . $ii . '" onkeyup="table_filtre(' . $ii . ')" placeholder="Search..."></th>';
				$ii++;
			}
				$html .= '</tr>';
				
			// header row
			$html .= '<tr>';
			$ii =0;
			foreach($array[0] as $key=>$value){
				$html .= '<th class="curseur th_head_table" onclick="sortTable(' . $ii . ')">' . htmlspecialchars($key) . '</th>';
				$ii++;
			}
			$html .= '</tr>';

			// data rows
			foreach( $array as $key=>$value){
				$html .= '<tr class="tab_context_menu" onmousedown="right_click(this,event)">';
				foreach($value as $key2=>$value2){
					$html .= '<td>' . htmlspecialchars($value2) . '</td>';
				}
				$html .= '</tr>';
			}

			// finish table and return it 

			$html .= '</table>';
			return $html;
		}

		$array = array(
			array('Nom'=>'tom', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'roger', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'paul', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'frefre', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'cccc', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'tom', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'roger', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'paul', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'frefre', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'cccc', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
			array('Nom'=>'byuk', 'Prénom'=>'smith', 'Tél Portable'=>'07123456', 'Mot de passe'=>'tom@example.org', 'email'=>'example ltd', 'Droit CKE'=>'example ltd', 'Droit elFinder'=>'example ltd', 'Compte'=>'example ltd', 'Dernière connection'=>'example ltd', 'Dernier changement'=>'example ltd'),
		);

		echo build_table($array);
	?>
	</fieldset>
	</form>
</div>
</body>
</html>