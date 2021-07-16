<?php
session_start();

// LOG HISTORY
$now = time();
file_put_contents(__DIR__ . '/admin/log_connection.txt',chr(13) . date('Y/m/d H:i:s', $now) . ' - log off - ' . $_SESSION['username'], FILE_APPEND);
$now = '';

session_unset();
unset($_SESSION);
unset($_COOKIE);
session_destroy();
session_write_close();
setcookie(session_name(),'',0,'/');
// session_regenerate_id(true);
header ('Location:index.php');
exit;
?>