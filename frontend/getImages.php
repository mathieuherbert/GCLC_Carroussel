<?php
    $files = scandir ( "../img/slideshow");




    $shortFiles = array();
    foreach($files as $file){
        if($file == ".." || $file == "."){
            continue;
        }
        if(!(substr( $file, 0, 3 ) == "big")){
            break;
        }
        array_push($shortFiles,substr($file, 3));

    }
    $ret = array(
        "size" => count($shortFiles),
        "files" => $shortFiles,

    );

    echo json_encode($ret);