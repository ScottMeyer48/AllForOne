<?php
$struct = listFolders();
echo json_encode($struct);

function listFolders($dir = __DIR__ . '/datausers/tree_ckeditor') {
    $dh = scandir($dir);
    
    $return = [];
    
    foreach ($dh as $folder) {
        if ($folder != '.' && $folder != '..') {
            
            // $ini = parse_ini_file("config.ini");
            // $url_site = $ini['site_url'];
            $Folder_data = "/datausers/tree_ckeditor";
            
            if (is_dir($dir . '/' . $folder)) { // it's a folder
                
                $full_path_absolu = glob($dir . '/*');
                $full_path_relatif = str_replace ( __DIR__ . $Folder_data, "" , $full_path_absolu);
                $index_path = 0; 
                foreach ($full_path_relatif as $full_path_folder) {
                    // echo "[$index_path] => $full_path_folder </br>";
                    $index_path++;
                }

                $return[] = array(
                    'title' => $folder,
                    'data-content' => $full_path_folder,
                    'folder' => true,
                    'expanded'=> true,
                    'children' => listFolders($dir . '/' . $folder, $key)
                );
            } else { // it's a file

                $full_path_absolu = glob($dir . '/*');
                $full_path_relatif = str_replace ( __DIR__ . $Folder_data, "" , $full_path_absolu);
                $index_path = 0; 
                foreach ($full_path_relatif as $full_path_folder) {
                    // echo "[$index_path] => $full_path_folder </br>";
                    $index_path++;
                }

                $return[] = [
                    'title' => $folder,
                    'data-content' => $full_path_folder,
                    'title' => $folder,
                    // 'title' => '<a href="' . $url_site . $Folder_data . $full_path_folder . '">' . $folder . '</a>',
                ];
            }
        }
    }
    return $return;
}
?>
