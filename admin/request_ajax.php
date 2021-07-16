<?php
if(session_status() != 2) {	session_start(); } else { header('Location: deco.php'); } // (2 = session active) if don't active session
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {header('Location: deco.php');} // redirection si pas de session ouverte
if (time() > $_SESSION['expire']) {
    session_destroy();
    header('Location: deco.php');
}
$fonction = isset($_POST['fonction']) ? $_POST['fonction'] : null;
$title = isset($_POST['title']) ? $_POST['title'] : null;
$content = isset($_POST['content']) ? $_POST['content'] : null;

if (empty($fonction) || empty($title || $fonction !=='read' || $fonction !=='write_file' || $fonction !=='write_folder' || $fonction !=='tree' || $fonction !=='delete' )) {
    $return_data['return_info'] = 'Fail';
    $return_data['fonction'] = 'Error';
    $return_data['title'] = 'server response, data not received (' . $fonction . ')';
    echo json_encode($return_data);
    return;
}

// Get Folder Parent ,  /volume1/web/allforone/admin => /volume1/web/allforone
$path_array = explode('/', __DIR__); // put path to array
$path_shortcut_array = array_slice($path_array,0,(count($path_array)-1)); // rebuild array path without the last 
$path_base_string = implode("/", $path_shortcut_array); // rebuild with '/'

// Get last entry ,  volume1/fileorfolder1/fileorfolder2 => fileorfolder2
$title_array = explode('/', $title); 
$title_explode_last_entry = $title_array[(count($title_array)-1)];

// file_put_contents('fichier.txt',$title . ' - ' . $title_explode_last_entry);

if ($fonction === 'read'){
    // $title = str_replace('<','',$title); // just for prevent html injection
    // $title = str_replace('?','',$title); // just for prevent php injection

    $return_data['fonction'] = 'read';
    $return_data['content'] = file_get_contents($path_base_string . '/datausers/' . $title, true);

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

if ($fonction === 'write_file'){
    $return_data['fonction'] = 'write_file';
    $target = $path_base_string . '/datausers/' . $title;

    if(is_dir($target)) {
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'This name already exists for a folder';
        echo json_encode($return_data);
        free_mem();
        return;
    }
    if (file_put_contents($target,'<h1>' . $title_explode_last_entry . '</h1><p>' . $content . '</p>') !== false) {
        $return_data['title'] = 'Success';
        $return_data['content'] = $title_explode_last_entry;
        echo json_encode($return_data);
    }else{
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'problem write the file in the server';
        echo json_encode($return_data);
    }
    free_mem();
    return;
}

if ($fonction === 'write_folder'){
    // $title = str_replace('<','',$title); // just for prevent html injection
    // $title = str_replace('?','',$title); // just for prevent php injection
    $target = $path_base_string . '/datausers/' . $title;
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
        $return_data['content'] = $title_explode_last_entry;
        echo json_encode($return_data);
    }else{
        $return_data['title'] = 'Fail';
        $return_data['return_info'] = 'problem write the folder in the server';
        echo json_encode($return_data);
    }
    free_mem();
    return;
}

if ($fonction === 'delete'){
    // $title = str_replace('<','',$title); // just for prevent html injection
    // $title = str_replace('?','',$title); // just for prevent php injection

    $return_data['fonction'] = 'delete';
    $target = $path_base_string . '/datausers/' . $title;

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
        $return_data['fonction'] = 'tree';
        $return_data['title'] = 'tree authentication problem';
        echo json_encode($return_data);
        return;
    }
    echo json_encode(listFolders($title, $path_base_string . '/datausers')); // $title = name user
    return ;
}

function free_mem() {
    $target=$fonction=$title_explode_last_entry=$path_base_string=$title=$return_data=$path_user=$dh=$dir=$name_user=$path_array=$path_shortcut_array=$item=$key='';
}

function listFolders($path_user, $dir) {
    $dh = scandir($dir);
    $name_user = $path_user;
    $return_data = [];

    if (strpos($dir, "/datausers/PERSONNAL") !== false){ // PERSONNAL found !
        $path_array = explode('/', __DIR__);
        $path_shortcut_array = array_slice($path_array,0,(count($path_array)-1));
        $path_base_string = implode("/", $path_shortcut_array);
        
        if ($dir === $path_base_string . '/datausers/PERSONNAL') {  
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
