<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Simple dummy webpage to hack">
    <meta name="author" content="Green Code Lab Challenge">

    <title>Green Code Lab Challenge 2014 sample webpage</title>

    <!-- Bootstrap core CSS -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/bootstrap-theme.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
    <!-- This is a nice empty css. Feel free to override the theme! -->
    <link href="../css/gclc.css" rel="stylesheet">

    <script type="text/javascript" src="../js/jquery.js"></script>

</head>
<body>
<nav class="navbar glc-navbar navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <img src="../img/Filanthropes-compressed.jpg" width="45" style="float: left;"/>
            <img src="../img/logo.png" width="62" style="float: left;" />
            <a class="navbar-brand">GreenCodeLab Challenge 2014</a>
        </div>
    </div>
</nav>
<div class="jumbotron">
    <div class="container">
        <h1>Hello, world!</h1>
        <p>Welcome on board! This is your sample website. Fell free to add / correct what you want.
        <p>Please do not delete any sentence included in this webpage</p>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">

<?php
ini_set('display_errors', 'on');

if(isset($_FILES["upload"]["tmp_name"])){
    list($sourceWidth, $sourceHeight) = getimagesize($_FILES["upload"]["tmp_name"]);
    $optimalWidthBig = 900;
    $optimalWidthSmall = 320;

    $optimalHeightBig = 320;
    $optimalHeightSmall = 128;

    $fileWithoutExtension = substr($_FILES["upload"]["name"],0,strrpos($_FILES["upload"]["name"],"."));
    $extension = strtolower( substr($_FILES["upload"]["name"], strrpos($_FILES["upload"]["name"], ".") + 1, strlen($_FILES["upload"]["name"])) );

    if ( $extension == "jpg" || $extension == "jpeg" ) {
        $source = imagecreatefromjpeg($_FILES["upload"]["tmp_name"]);
    }
    else if ( $extension == "png" ) {
        $source = imagecreatefrompng($_FILES["upload"]["tmp_name"]);
    }
    else {
        echo "<h3 class='text-align'>Seul les jpg et png sont acceptés !</h3>";
    }

    $source_aspect_ratio = $sourceWidth / $sourceHeight;
    $thumbnail_aspect_ratio = $optimalWidthBig / $optimalHeightBig;

    if ($source_aspect_ratio < 1) {
        $proportionalChanges = $sourceHeight / $optimalHeightBig;

        $thumbnail_image_height_big = $optimalHeightBig;
        $thumbnail_image_width_big = $sourceWidth / $proportionalChanges;

        $thumbnail_image_width_small = (int) ($optimalWidthSmall * $source_aspect_ratio);
        $thumbnail_image_height_small = $optimalHeightSmall;
    } else {
        $proportionalChanges = $sourceHeight / $optimalHeightBig;

        $thumbnail_image_height_big = $sourceHeight / $proportionalChanges;
        $thumbnail_image_width_big = $optimalWidthBig;

        $thumbnail_image_width_small = $optimalWidthSmall;
        $thumbnail_image_height_small = (int) ($optimalHeightSmall / $source_aspect_ratio);
    }

    $thumb1 = imagecreatetruecolor($thumbnail_image_width_big, $thumbnail_image_height_big);
    $thumb2 = imagecreatetruecolor($thumbnail_image_width_small, $thumbnail_image_height_small);

    echo "---------------- ratio " . $thumbnail_aspect_ratio . " | wbigsource " . $sourceWidth . " | hbigsource " . $sourceHeight . " | wbigdest " . $thumbnail_image_width_big . " | hbigdest " . $thumbnail_image_height_big;

    imagecopyresized($thumb1, $source, 0, 0, 0, 0, $thumbnail_image_width_big, $thumbnail_image_height_big, $sourceWidth, $sourceHeight);
    imagecopyresized($thumb2, $source, 0, 0, 0, 0, $thumbnail_image_width_small, $thumbnail_image_height_small, $sourceWidth, $sourceHeight);

    imagejpeg($thumb1,"../img/slideshow/big".$fileWithoutExtension.'.jpg');
    imagejpeg( $thumb2,"../img/slideshow/small".$fileWithoutExtension.'.jpg');

    $file = fopen ("../img/slideshow/".$fileWithoutExtension.".prop", "w");

    fwrite($file, "Description=".htmlspecialchars($_POST["comment"]));
    fclose($file);

    echo "<h3 class='text-align'>Image ajoutée au caroussel \\o/</h3>";
} ?>
                    <div class="well well-lg">
                        <form role="form" enctype="multipart/form-data" action="upload.php" method="post">
                          <div class="form-group">
                            <label for="comment">Name :</label>
                            <input type="text" class="form-control" id="comment" name="comment">
                          </div>
                          <div class="form-group">
                            <label for="upload">File :</label>
                            <input type="file" class="form-control" id="upload" name="upload">
                          </div>
                          <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                    </div>
                    <a href="/8dffb9edbf/">Retourner &agrave; la page d'accueil</a>
                </div>
            </div>
        </div>
    </body>
</html>
