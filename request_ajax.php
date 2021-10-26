<?php
if (session_status() != 2) { session_start(); } else { header('Location: deco.php'); } // (2 = session active) if don't active session
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {header('Location: deco.php');} // redirection si pas de session ouverte
if (time() > $_SESSION['expire']) { header('Location: deco.php');}

$fonction = isset($_POST['fonction']) ? $_POST['fonction'] : null;
$title = isset($_POST['title']) ? $_POST['title'] : null;
$content = isset($_POST['content']) ? $_POST['content'] : null;

// file_put_contents('zzz1.txt',$fonction . ' -avant- ' . $title . ' - ' . $content);
file_put_contents('zzz1.txt', chr(13) . '$fonction= '.$fonction . ' || $title= '.$title . ' || $content= '.$content, FILE_APPEND); // chr(13) = retour à la ligne

if (empty($fonction) || empty($title)) {
    $return_data['title'] = 'Fail';
    $return_data['fonction'] = 'Error';
    $return_data['return_info'] = 'server response, data not received (' . $fonction . ')';
    echo json_encode($return_data);
    return;
}

// Get Folder Parent ,  /volume1/web/allforone/admin => /volume1/web/allforone
// $path_array = explode('/', __DIR__); // put path to array
// $path_shortcut_array = array_slice($path_array,0,(count($path_array)-1)); // rebuild array path without the last 
// $path_base_string = implode("/", $path_shortcut_array); // rebuild with '/'

// Get last entry ,  volume1/fileorfolder1/fileorfolder2 => fileorfolder2
$path_array = explode('/', $title); 
$path_last_entry = $path_array[(count($path_array)-1)];
$name_array = explode('-', $title); // [0] file or folder [1] origin path name [2] destination path name 

if ($fonction === 'read'){
    // $title = str_replace('<','',$title); // just for prevent html injection
    // $title = str_replace('?','',$title); // just for prevent php injection

    $return_data['fonction'] = 'read';
    $return_data['content'] = file_get_contents(__DIR__ . '/datausers/' . $title, true);

    if ($return_data['content'] !== false) { // is not empty ? then ok good
        $return_data['title'] = 'Success';
        echo json_encode($return_data);
    }else{
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'problem read file server';
        echo json_encode($return_data);
    }
    free_mem();
    return;
}

if ($fonction === 'file_exist'){ 
    $return_data['fonction'] = 'file_exist';
    $target = __DIR__ . '/datausers/' . $title;

    if(file_exists($target)) {
        $return_data['title'] = 'exist';
        // file_put_contents('zzz2.txt',$fonction . ' -exist- ' . $title . ' - ' . $target);
        
        echo json_encode($return_data);
        free_mem();
        return;
    }else{
        // file_put_contents('zzz3.txt',$fonction . ' -exist pas- ' . $title . ' - ' . $target);
        $return_data['title'] = "not exist";
        echo json_encode($return_data);
        free_mem();
        return;
    }
}

if ($fonction === 'write_add_file'){
    $return_data['fonction'] = 'write_add_file';
    $target = __DIR__ . '/datausers/' . $title;

    if(is_dir($target) || file_exists($target)) {
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'This name already exists for a folder/file';
        echo json_encode($return_data);
        free_mem();
        return;
    }

    if (empty($content)) { $content ='<h1>' . $path_last_entry . '</h1>'; } 
    
    if (file_put_contents($target,$content) !== false) {
        // file_put_contents('test.txt','in --- ' . $target . ' --- ' . $content);
        $return_data['title'] = 'Success';
        $return_data['content'] = $path_last_entry;
        echo json_encode($return_data);
    }else{
        // file_put_contents('test.txt','out --- ' . $target . ' --- ' . $content);
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'problem write the file in the server';
        echo json_encode($return_data);
    }
    free_mem();
    return;
}

if ($fonction === 'write_file'){
    $return_data['fonction'] = 'write_file';
    $target = __DIR__ . '/datausers/' . $title;

    if(is_dir($target) || file_exists($target)) {
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'This name already exists for a folder/file';
        echo json_encode($return_data);
        free_mem();
        return;
    }

    if (empty($content)) { $content ='<h1>' . $path_last_entry . '</h1>'; } 
    
    if (file_put_contents($target,$content) !== false) {
        // file_put_contents('test.txt','in --- ' . $target . ' --- ' . $content);
        $return_data['title'] = 'Success';
        $return_data['content'] = $path_last_entry;
        echo json_encode($return_data);
    }else{
        // file_put_contents('test.txt','out --- ' . $target . ' --- ' . $content);
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'problem write the file in the server';
        echo json_encode($return_data);
    }
    free_mem();
    return;
}

if ($fonction === 'rename_file_folder'){
    $return_data['fonction'] = 'rename_file_folder';

    $target = __DIR__ . '/datausers/';

    if (file_exists($target . $name_array[2])) { // if file or folder existe with this name
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'Name file/folder already existing';
        echo json_encode($return_data);
        free_mem();
        return;
    }

    if ($name_array[0] === 'file'){
        unlink($target . $name_array[1]);

        if (file_put_contents($target . $name_array[2],$content) !== false) {
            $return_data['title'] = 'Success';
            $return_data['content'] = $path_last_entry;
            echo json_encode($return_data);
        }else{
            $return_data['title'] = 'Fail';
            $return_data['return_info'] = 'problem write the file in the server';
            echo json_encode($return_data);
        }
    }

    if ($name_array[0] === 'folder'){
        // rmdir($target . $name_array[1]);
        rename($target . $name_array[1], $target . $name_array[2]);

        if(file_exists($target . $name_array[2])) { // check if error
            $return_data['title'] = 'Success';
            $return_data['content'] = $path_last_entry;
            echo json_encode($return_data);
        }else{
            $return_data['title'] = 'Fail';
            $return_data['return_info'] = 'problem write the folder in the server';
            echo json_encode($return_data);
        }
    }
    free_mem();
    return;
}

if ($fonction === 'write_folder'){
    // $title = str_replace('<','',$title); // just for prevent html injection
    // $title = str_replace('?','',$title); // just for prevent php injection
    $target = __DIR__ . '/datausers/' . $title;
    // unlink($target); // if is a file delete
    $return_data['fonction'] = 'write_folder';

    if(file_exists($target)) { // if file or folder existe with this name
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'Name file/folder already existing';
        echo json_encode($return_data);
        free_mem();
        return;
    }

    mkdir($target);
    if(file_exists($target)) { // check if error
        $return_data['title'] = 'Success';
        $return_data['content'] = $path_last_entry;
        echo json_encode($return_data);
    }else{
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'problem write the folder in the server';
        echo json_encode($return_data);
    }
    free_mem();
    return;
}

if ($fonction === 'write_cfg_user'){
    if ($_SESSION['username'] !== $title){ // verification right name user
        $return_data['return_info'] = 'Fail';
        $return_data['fonction'] = 'Parametres';
        $return_data['title'] = 'authentication problem';
        echo json_encode($return_data);
        return;
    }

    $target = __DIR__ . '/admin/users_cfg/' . $title . '_cfg.ini';
    
    require_once 'addon/lite/Lite.php'; // Load library INI 
    $ini_user = new Config_Lite($target, LOCK_EX); // open for writing
    $ini_user->set('Files', 'last_open', $content);
    $ini_user->save();
    
    $ini_user_check = new Config_Lite($target); // Load ini file
    
    if ($ini_user_check['Files']['last_open'] !== $content){
        $return_data['fonction'] = 'write_cfg_user';
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'the report on the last document used was not saved';
        echo json_encode($return_data);
        free_mem();
        return;
    }
    $return_data['fonction'] = 'write_cfg_user';
    $return_data['title'] = 'Success';
    echo json_encode($return_data);
    free_mem();
    return;
}

if ($fonction === 'delete'){
    // $title = str_replace('<','',$title); // just for prevent html injection
    // $title = str_replace('?','',$title); // just for prevent php injection

    $return_data['fonction'] = 'delete';
    $target = __DIR__ . '/datausers/' . $title;

    function delTree($dir) {
        $files = array_diff(scandir($dir), array('.','..'));
        foreach ($files as $file) {
        (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
        }
        return rmdir($dir);
    }

    if(file_exists($target)) {
        if (is_dir($target)) { // it's a folder
            delTree($target);
            if(file_exists($target)) { // check if error
                $return_data['title'] = 'Fail';
                $return_data['return_info'] = 'error, not deleted';
                echo json_encode($return_data);
            }else {
                $return_data['title'] = 'Success';
                // $return_data['title'] = 'error, not deleted';
                // RICHARD - Ecrire un log
                echo json_encode($return_data);
            }
    
        }else{ // it's a file
            unlink($target);
            if(file_exists($target)) {
                $return_data['title'] = 'Fail';
                $return_data['return_info'] = 'error, not deleted';
                echo json_encode($return_data);
            }else {
                $return_data['title'] = 'Success';
                // $return_data['title'] = 'error, not deleted';
                // RICHARD - Ecrire un log
                echo json_encode($return_data);
            }
        }
    }else {
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'Element to deleted not found';
        echo json_encode($return_data);
    }
    return;
}

if ($fonction === 'tree'){ 
    if ($_SESSION['username'] !== $title){ // verification right name user
        $return_data['return_info'] = 'Fail';
        $return_data['fonction'] = 'Parametres';
        $return_data['title'] = 'authentication problem';
        echo json_encode($return_data);
        return;
    }
    $target = __DIR__ . '/datausers/PERSONNAL/' . $title;
    
    if(!file_exists($target)) {
        mkdir($target);
    }

    echo json_encode(listFolders($title, __DIR__ . '/datausers')); // $title = name user
    return;
}

// if this code is executed, the function variable does not correspond to an existing function
$return_data['title'] = 'Fail';
$return_data['fonction'] = 'Error server';
$return_data['return_info'] = 'server response, data not received (' . $fonction . ')';
echo json_encode($return_data);
free_mem();

function free_mem() {
    $name_array=$target=$fonction=$path_last_entry=$title=$return_data=$path_user=$dh=$dir=$name_user=$path_array=$path_shortcut_array=$item=$key=$ini_user=$ini_user_check='';
}

function listFolders($path_user, $dir) {
    $dh = scandir($dir);
    $name_user = $path_user;
    $return_data = [];

    if (strpos($dir, "/datausers/PERSONNAL") !== false){ // PERSONNAL found !
        // $path_array = explode('/', __DIR__);
        // $path_shortcut_array = array_slice($path_array,0,(count($path_array)-1));
        // $path_base_string = implode("/", $path_shortcut_array);
        
        if ($dir === __DIR__ . '/datausers/PERSONNAL') {  
            foreach ($dh as $item) {
                if ($item != '.' && $item != '..') {
                    if ($item === $name_user){ // Take only a user
                        if (is_dir($dir . '/' . $item)) { // it's a folder
                            $return_data[] = array(
                                'title' => $item,
                                'folder' => true,
                                'expanded'=> true,
                                'children' => listFolders($name_user, $dir . '/' . $item, $key) 
                            );
                        } 
                    }
                }
            }
        }

        if (strpos($dir, "/datausers/PERSONNAL/" . $name_user) !== false){ // user found
            foreach ($dh as $item) {
                if ($item != '.' && $item != '..') {
                    if (is_dir($dir . '/' . $item)) { // it's a folder
                        $return_data[] = array(
                            'title' => $item,
                            'folder' => true,
                            'expanded'=> true,
                            'children' => listFolders($name_user, $dir . '/' . $item, $key) 
                        );
                    } else { // it's a file
                        $return_data[] = [
                            'title' => $item,
                        ];
                    }
                }
            }
        }
    } 
    else {
        foreach ($dh as $item) {
            if ($item != '.' && $item != '..') {
                if (is_dir($dir . '/' . $item)) { // it's a folder
                    $return_data[] = array(
                        'title' => $item,
                        'folder' => true,
                        'expanded'=> true,
                        'children' => listFolders($name_user, $dir . '/' . $item, $key)
                    );
                } else { // it's a file
                    $return_data[] = [
                        'title' => $item,
                    ];
                }
            }
        }
    }
    return $return_data;
}
?>
