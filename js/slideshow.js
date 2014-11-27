$(document).ready(function(){
  function test(){

    var $slideshow =  $('#slideshow'), // on cible le bloc du slideshow
                      $img = $('#slideshow img'), // on cible les images contenues dans le slideshow
                      $span = $('#comments span')// on cible les span contenues dans le slideshow
                      indexImg = $img.length - 1, // on définit l'index du dernier élément
                      i = 0, // on initialise un compteur
                      $currentImg = $img.eq(i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)
                      $currentSpan = $span.eq(i);

    $img.css('display', 'none'); // on cache les images
    $currentImg.css('display', 'block'); // on affiche seulement l'image courante

    $('#next').mouseover(function(){
      if(indexImg < (tabImages.length-1) && i == indexImg){
        integrateImage();
        $img = $('#slideshow img');
        $span = $('#comments span');
        indexImg = $img.length-1;
        $("#numImgCurrent").text(i+1);
      }
    });

    $('#next').click(function(){ // image suivante

      i++; // on incrémente le compteur

      if( i <= indexImg ){
        $img.css('display', 'none'); // on cache les images
        $span.css('display', 'none');
        $currentImg = $img.eq(i); // on définit la nouvelle image
        $currentSpan = $span.eq(i);
        $currentImg.css('display', 'block'); // puis on l'affiche
        $currentSpan.css('display', 'block');
        $("#numImgCurrent").text(i+1);
      }
      else{
        i = indexImg;
      }

    });


    console.log($('#slideshow'));
    // $('#slideshow').swipeRight(function() {
    //
    //   i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"
    //
    //   if( i >= 0 ){
    //     $img.css('display', 'none');
    //     $currentImg = $img.eq(i);
    //     $currentImg.css('display', 'block');
    //   }
    //   else{
    //     i = 0;
    //   }
    //
    // });
    //
    // $('#slideshow').swipeLeft(function(){
    //   i++; // on incrémente le compteur
    //
    //   if( i <= indexImg ){
    //     $img.css('display', 'none'); // on cache les images
    //     $currentImg = $img.eq(i); // on définit la nouvelle image
    //     $currentImg.css('display', 'block'); // puis on l'affiche
    //   }
    //   else {
    //     i = indexImg;
    //   }
    //
    // });

    $('#prev').click(function(){ // image précédente

      i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"

      if( i >= 0 ){
        $img.css('display', 'none'); // on cache les images
        $span.css('display', 'none');
        $currentImg = $img.eq(i); // on définit la nouvelle image
        $currentSpan = $span.eq(i);
        $currentImg.css('display', 'block'); // puis on l'affiche
        $currentSpan.css('display', 'block');
        $("#numImgCurrent").text(i+1);
      }
      else{
        i = 0;
      }

    });

    function slideImg(){
      setTimeout(function(){
        if(indexImg < (tabImages.length-1)){
          integrateImage();
          $img = $('#slideshow img');
          $span = $('#comments span');
          indexImg = $img.length-1;
        }
      },2500);
      setTimeout(function(){ // on utilise une fonction anonyme


        if(i < indexImg){ // si le compteur est inférieur au dernier index
          i++; // on l'incrémente
        }
        else{ // sinon, on le remet à 0 (première image)
          i = 0;
        }

        $img.css('display', 'none'); // on cache les images
        $span.css('display', 'none');
        $currentImg = $img.eq(i); // on définit la nouvelle image
        $currentSpan = $span.eq(i);
        $currentImg.css('display', 'block'); // puis on l'affiche
        $currentSpan.css('display', 'block');
        $("#numImgCurrent").text(i+1);

        slideImg(); // on oublie pas de relancer la fonction à la fin


      }, 3000); // on définit l'intervalle à 7000 millisecondes (7s)
    }

    slideImg(); // enfin, on lance la fonction une première fois
  }
  loadImage();
  integrateImage();
  test();
});
