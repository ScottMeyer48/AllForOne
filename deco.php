<?php
session_start();

// Get Folder Parent ,  /volume1/web/allforone/admin => /volume1/web/allforone
// $path_array = explode('/', __DIR__); // put path to array
// $path_shortcut_array = array_slice($path_array,0,(count($path_array)-1)); // rebuild array path without the last 
// $path_base = implode("/", $path_shortcut_array); // rebuild with '/'

// LOG HISTORY
$now = time();
file_put_contents(__DIR__ . '/admin/log_connection.txt',chr(13) . date('Y/m/d H:i:s', $now) . ' - ' . getUserIpAddr() . ' - log off - ' . $_SESSION['username'], FILE_APPEND);
$now = '';

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

session_unset();
unset($_SESSION);
unset($_COOKIE);
session_destroy();
session_write_close();
setcookie(session_name(),'',0,'/');
// session_regenerate_id(true);
header ('Location: index.php');
exit;
?>