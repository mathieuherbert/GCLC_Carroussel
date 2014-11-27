<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Simple dummy webpage to hack">
    <meta name="author" content="Green Code Lab Challenge">

    <title>Green Code Lab Challenge 2014 sample webpage</title>

    <script type="text/javascript" src="../js/jquery.js"></script>
</head>


<?php
    if(isset($_FILES["upload"]["tmp_name"])){
        echo json_encode($_FILES["upload"]);

    list($width, $height) = getimagesize($_FILES["upload"]["tmp_name"]);
    $newWidth1 = 900;
    $newWidth2 = 320;

    $newHeight1 = 320;
    $newHeight2 = 128;

    $thumb1 = imagecreatetruecolor($newWidth1, $newHeight1);
    $thumb2 = imagecreatetruecolor($newWidth2, $newHeight2);

    $source = imagecreatefromjpeg($_FILES["upload"]["tmp_name"]);

    imagecopyresized($thumb1, $source, 0, 0, 0, 0, $newWidth1, $newHeight1, $width, $height);
    imagecopyresized($thumb2, $source, 0, 0, 0, 0, $newWidth2, $newHeight2, $width, $height);
       echo "../img/slideshow/big".$_FILES["upload"]["name"];
    imagejpeg($thumb1,"../img/slideshow/big".$_FILES["upload"]["name"]);
    imagejpeg( $thumb2,"../img/slideshow/small".$_FILES["upload"]["name"]);

    $file = fopen ("../img/slideshow/".substr($_FILES["upload"]["name"],0,strrpos($_FILES["upload"]["name"],".")).".prop", "a");

    fwrite($file, "Description=".htmlspecialchars($_POST["comment"]));
    fclose($file);





}else{
        ?>
            <body>
            <form enctype="multipart/form-data" action="upload.php" method="post">
                    <input type="text" name="comment"/>
                    <input type="file" name="upload"/>
                    <input type="submit" value="send"/>
                </form>

            </body>

        </html>
<?php
    }


