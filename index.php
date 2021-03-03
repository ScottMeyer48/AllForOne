<?php
session_start();
if(isset($_POST['username']) && isset($_POST['password']))
{
	$username = htmlspecialchars($_POST['username']); 
	$password = htmlspecialchars($_POST['password']);
	if($username !== "" && $password !== "") {
		if ( $username == 'Peter' && $password == 'zzz'){
			$_SESSION['username'] = $username;
			$_SESSION['start'] = time(); // Taking now logged in time.
            $_SESSION['expire'] = $_SESSION['start'] + (60 * 60); // Ending a session in 60 minutes from the starting time. (In minutes : (30 * 60) -- In days : (n * 24 * 60 * 60 ) n = no of days)
			header('Location: main.php');
		}
		else{
			echo('<script>var connection = "fail";</script>');
		}
	}
}
?>

<html>
<head>
<meta charset="utf-8">
<link rel="icon" type="image/svg" href="picture/musketeer_portrait.svg" />

	<style>
		body{
			background: #333;
			/* background: #67BE4B; */
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
			/* background-color: #53af57; */
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
			/* background-color: #B2E5B4; */
			background-color: #E6994C;
			/* color: white; */
			/* color: #53af57; */
			border: 1px solid black;
			/* border: 1px solid #53af57; */
		}

		.bt_disabled{
			pointer-events: none;
			opacity: 0.4;
		}

		h1{text-align: center;}

	</style>
</head>
<!-- height="100px" width="100px" -->
<body>

	<div id="container">
	<div><img class="logo_welcome" src="picture/musketeer_portrait.svg" height="100px" width="100px"></div>
		<form action="index.php" method="POST" id="form_login">
			<h1>All For One</h1>
			
			<label><b>Nom d'utilisateur</b></label>
			<input type="text" placeholder="Entrer le nom d'utilisateur" id="user" name="username" onkeypress="enter_pressed(event)" required>

			<label><b>Mot de passe</b></label>
			<input type="password" placeholder="Entrer le mot de passe" id="pass" name="password" onkeypress="enter_pressed(event)" required>

			<input type="button" id='bt_login' class="bt_login" onclick="bt_submit()" value="Connection">
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
				document.getElementById('info').innerHTML = 'Remplissez les champs utilisateur et mot de passe';
			}
			else{
				document.getElementById("bt_login").disabled = true;
				document.getElementById("bt_login").classList.add('bt_disabled');
				document.forms["form_login"].submit();
			}
		}
		if (typeof connection !== "undefined"){
			if (connection == "fail") {
				document.getElementById('info').innerHTML = 'Vérifiez le nom utilisateur / mot de passe';
			} 
		}
	</script>

</body>
</html>