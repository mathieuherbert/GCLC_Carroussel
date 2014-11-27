#!/bin/sh

cd /home/login
ls /var/www/gclcimages/ > tempImagesSnapshot.txt

if diff imagesSnapshot.txt tempImagesSnapshot.txt > /dev/null ; then
	echo "### Pas de modifications ###"		
	rm tempImagesSnapshot.txt 
else
	rm /var/www/8dffb9edbf/img/slideshow/*

    mkdir temp
    cd temp

    mkdir 900
    mkdir 320

    cp /var/www/gclcimages/* .

    mogrify -format jpeg *.png
    rm *.png

    gm mogrify -resize 900x360\! -output-directory 900 *.jpg
    gm mogrify -resize 320x128\! -output-directory 320 *.jpg

    cp *.prop /var/www/8dffb9edbf/img/slideshow/

    cd 320
    rename 's//small/' *.jpg

    cd ../900
    rename 's//big/' *.jpg

    cd ..
    mv 320/* /var/www/8dffb9edbf/img/slideshow/
    mv 900/* /var/www/8dffb9edbf/img/slideshow/

    cd ..
    mv tempImagesSnapshot.txt imagesSnapshot.txt

    rm -r temp
fi