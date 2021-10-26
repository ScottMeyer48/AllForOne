<?php
// if(session_status() == 2) {header('Location: main.php');} // (2 = session active) if don't active session

// session_start();
// if(session_status() === '2') { header('Location: main.php');}
// if(session_status() === '2' || $_SESSION['username'] = 'tfsdfsdoto') { header('Location: main.php');}
// if($_SESSION['username'] = 'tfsdfsdoto') 
// { 
// 	echo  'TROUVE';
// 	header('Location: main.php');
// }else{
// 	echo  'NON TROUVE';
// }

// if(session_status() === PHP_SESSION_ACTIVE || $_SESSION['username'] = 'toto') { header('Location: main.php');}
// try_banish('add');
require_once 'addon/lite/Lite.php'; // Load library for file ini
$ini_site = new Config_Lite('admin/config.ini'); // Load ini site
$ini_db_users = new Config_Lite('admin/db_users.ini'); // load ini DB Users
$ini_txt = new Config_Lite('translate/' . $ini_site['config']['language'] . '.ini'); // load ini translate
// echo($ini_txt['first_page_index']['name_user']);
// echo($ini_txt);
// echo $ini_site['config']['language'];

$ip_client = getUserIpAddr();
try_banish($ip_client,'');

if(isset($_POST['username']) && isset($_POST['password'])) {
	$username = htmlspecialchars($_POST['username']); 
	$password = htmlspecialchars($_POST['password']); // RICHARD - Lors de la création du mot de passe mettre un REGEX pas de '&"<>

	if ($ini_db_users['password'][$username]){ // if user found
		if ($ini_db_users['password'][$username] === $password){
			session_destroy();
			session_start();
			$_SESSION['username'] = $username;

			if (isset($ini_db_users['privilege'][$username])) {
				$_SESSION['privilege'] = $ini_db_users['privilege'][$username];
			}else {
				$_SESSION['privilege'] = 'Users';
			}
			$ini_db_users = '';

			// LOG HISTORY
			$now = time();
			file_put_contents(__DIR__ . '/admin/log_connection.txt',chr(13) . date('Y/m/d H:i:s', $now) . ' - ' . $ip_client . ' - log on - ' . $_SESSION['username'], FILE_APPEND);
			$now = '';

			$_SESSION['start'] = time(); // Taking now logged in time.
			$_SESSION['expire'] = $_SESSION['start'] + (60 * 60); // Ending a session in 60 minutes from the starting time. (In minutes : (30 * 60) -- In days : (n * 24 * 60 * 60 ) n = no of days)
			try_banish($ip_client, 'del');
			header('Location: main.php');
		}else {
			
			echo('<script>var connection = "fail";</script>');
			try_banish($ip_client, 'add');
		}
	}else {
		echo('<script>var connection = "fail";</script>');
		try_banish($ip_client, 'add');
	}
}

function free_mem() {
    $ini_db_users=$ini_txt=$ip_client=$now=$username=$password=$ini_site='';
}

function try_banish($ip_client, $p){
	if ($p == "add") {
		file_put_contents(__DIR__ . '/admin/log_banish.txt',chr(13) . $ip_client , FILE_APPEND);
		try_banish($ip_client, '');
	}elseif ($p == "del") {
		$ip_list = str_replace($ip_client, "", $ip_list);
		file_put_contents(__DIR__ . '/admin/log_banish.txt', $ip_list);
	}else {
		$ip_list = file_get_contents(__DIR__ . '/admin/log_banish.txt', true);
	
		if (substr_count($ip_list, $ip_client) >= '3') {
			header('Location: deny.php');
		}
	}
}

function getUserIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
?>

<html>
<head>
<meta charset="utf-8">
<link rel="icon" type="image/svg" href="picture/musketeer_portrait.svg" />
	<style>
		body{
			background: #333;
			font-family: sans-serif, Arial, Verdana, "Trebuchet MS", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			margin: 0 0
		}

		.logo_welcome{
			padding: 10 10 10 10;
			width:100%;
			display: block;
			margin: 30 auto 0 20;
		}

		#container{
			width:500px;
			margin:0 auto;
			margin-top:5%;
		}

		form {
			width:100%;
			padding: 30px;
			border: 1px solid #f1f1f1;
			background: #fff;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
		}
		#container h1{
			width: 38%;
			margin: 0 auto;
			padding-bottom: 10px;
		}

		input[type=text], input[type=password] {
			width: 100%;
			padding: 12px 20px;
			margin: 8px 0;
			display: inline-block;
			border: 1px solid #ccc;
			box-sizing: border-box;
		}
		input[type=text]:focus, input[type=password]:focus, .bt_login:hover {
			box-shadow:0 8px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)
		}

		.bt_login {
			background-color: #00796B;
			color: white;
			padding: 14px 20px;
			margin: 6px 0;
			border: 1px solid #00796B;
			cursor: pointer;
			width: 100%;
			font-weight: bold;
			font-size: 16px;
		}

		.bt_login:hover {
			background-color: #E6994C;
			border: 1px solid black;
		}

		.bt_disabled{
			pointer-events: none;
			opacity: 0.4;
		}

		h1{text-align: center;}

	</style>
</head>
<body>

	<div id="container">
		<div><img class="logo_welcome" src="picture/musketeer_portrait.svg" height="100px" width="100px"></div>
		<form action="index.php" method="POST" id="form_login">
			<h1>All For One</h1>
			<div style="text-align: center"> and one for all ! </div>
			</br>
			
			<label><b><?php echo ($ini_txt['first_page_index']['name_user']);?></b></label>
			<input type="text" placeholder="<?php echo ($ini_txt['first_page_index']['name_user_placeholder']);?>" id="user" name="username" onkeypress="enter_pressed(event)" required>

			<label><b><?php echo ($ini_txt['first_page_index']['password']);?></b></label>
			<input type="password" placeholder="<?php echo ($ini_txt['first_page_index']['password_placeholder']);?>" id="pass" name="password" onkeypress="enter_pressed(event)" required>

			<input type="button" id='bt_login' class="bt_login" onclick="bt_submit()" value="<?php echo ($ini_txt['first_page_index']['connection']);?>">
			<div style="color: red;  font-weight: bold; text-align: center;" id='info'> </div>
			<?php
			if(isset($_GET['erreur'])){
				$err = $_GET['erreur'];
				if($err==1 || $err==2){
					echo "<p style='color:red'>Utilisateur ou mot de passe incorrect</p>";
				}
			}
			?>
		</form>
	</div>

	<script>
		function enter_pressed(e) {
			if (e.keyCode == 13) { bt_submit(); }
		}

		function bt_submit() {
			if (document.getElementById('user').value == "" || document.getElementById('pass').value == ""){
				document.getElementById('info').innerHTML = '<?php echo ($ini_txt['first_page_index']['empty']);?>';
			}
			else{
				document.getElementById("bt_login").disabled = true;
				document.getElementById("bt_login").classList.add('bt_disabled');
				document.forms["form_login"].submit();
			}
		}
		if (typeof connection !== "undefined"){
			if (connection == "fail") {
				document.getElementById('info').innerHTML = '<?php echo ($ini_txt['first_page_index']['bad_authentication']);?>';
			} 
		}
	</script>

<?php free_mem() ?>

</body>
</html>