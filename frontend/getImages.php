<?php
    $files = scandir ( "../img/slideshow");
    $shortFiles = array();
    foreach($files as $file){
        if($file == ".." || $file == "."){
            continue;
        }
        if(!(substr( $file, 0, 3 ) == "big")){
            continue;
        }
        $file_name = substr($file, 3);
        $file_prop_name = substr($file_name,0, strrpos($file_name,"."));
        $file_prop = new SplFileObject("../img/slideshow/".$file_prop_name.".prop");
        $comment = "";
        while (!$file_prop->eof()) {
            $line = $file_prop->fgets();
            if(substr($line,0,11) == "Description"){
                $comment = rtrim(substr($line, trim(strpos($line,"=")+1)));
                break;
            }
        }

        array_push($shortFiles,array($file_name => $comment));

    }
    $ret = array(
        "size" => count($shortFiles),
        "files" => $shortFiles,

    );

    echo json_encode($ret);