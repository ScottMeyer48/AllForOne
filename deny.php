<?php
	require_once 'addon/lite/Lite.php'; // Load library for file ini
	$ini_site = new Config_Lite('admin/config.ini'); // Load ini site
	$ini_txt = new Config_Lite('translate/' . $ini_site['config']['Language'] . '.ini'); // load ini translate
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo ($ini_txt['site_name']);?></title>
	<link rel="icon" type="image/svg" href="picture/<?php echo $ini_site['skin']['logo'];?>" />
	<link rel="icon" type="image/svg" href="picture/musketeer_portrait.svg" />

	<style>
		body{
			background: #333;
			font-family: sans-serif, Arial, Verdana, "Trebuchet MS", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		}

		.logo_welcome{
			padding: 10 10 10 10;
			margin: 30 auto 0 20;
			height: 100px;
			width: 100px;
			display: block;
			margin-left: auto;
			margin-right: auto;
		}

		.img_warning {
			text-align: center;
			height: 50px;
			width: 50px;
		}

		#container{
			display: block;
			margin-left: auto;
			margin-right: auto;
			width:500px;
		}

		form {
			width:100%;
			width:500px;
			padding: 30px;
			border: 1px solid #f1f1f1;
			background: #fff;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
			text-align: center;
		}
		h1{text-align: center;}

	</style>
</head>
<body>

	<div id="container">
		<div><img class="logo_welcome" src="picture/musketeer_portrait.svg"></div>
		<form >
			<h1>All For One</h1>
			<img class="img_warning" src="picture/warning.svg">
			</br>
			<label><b>Suite à 3 échecs, vous n'est plus autorisé à vous connecter</b></label>

			<label><b>Contactez votre administrateur</b></label>

		</form>
	</div>
</body>
</html>