function swapSlides(id){
  i = id;
  fullMajImages();

}

function swapOver(id){
  majOverImages();
}

function fullMajImages(){
  $img.css('display', 'none'); // on cache les images
  $span.css('display', 'none');
  $currentImg = $img.eq(i); // on définit la nouvelle image
  $currentSpan = $span.eq(i);
  $currentImg.css('display', 'block'); // puis on l'affiche
  $currentSpan.css('display', 'block');
  $currentPuce = $puce.eq(i);
  $puce.attr("src","img/not-selected.png");
  $currentPuce.attr("src","img/selected.png");
  $("#numImgCurrent").text(i+1);
}

function majOverImages(){
  integrateImage();
  $img = $('#slides img');
  $span = $('#comments span');
  indexImg = $img.length-1;
  $("#numImgCurrent").text(i+1);
}

function funcTimeOutSlide(){
  i = (i<indexImg)?i+1:0;

  fullMajImages();

  slideImg(); // on oublie pas de relancer la fonction à la fin
}

function slideImg(){
  timeOutLoading = setTimeout(function(){
    if(indexImg < (tabImages.length-1)){
      integrateImage();
      $img = $('#slides img');
      $span = $('#comments span');
      indexImg = $img.length-1;
    }
  },2500);
  timeOutSlide = setTimeout(function(){ // on utilise une fonction anonyme
    funcTimeOutSlide();
  }, 3000); // on définit l'intervalle à 7000 millisecondes (7s)
}

function next(){
  i++; // on incrémente le compteur
  window.clearTimeout(timeOutSlide);
  timeOutSlide = setTimeout(function(){ // on utilise une fonction anonyme
    funcTimeOutSlide();
  }, 3000);
  if( i <= indexImg ){
    fullMajImages();
  }
  else{
    i = 0;
    fullMajImages();s
  }

}

function play(){
  if($("#playButton").attr("class") === "playButton"){
    $("#playButton").attr("class","pauseButton");
    timeOutSlide = setTimeout(function(){ // on utilise une fonction anonyme
      funcTimeOutSlide();
    }, 3000);
  }
  else{
    $("#playButton").attr("class","playButton");
    window.clearTimeout(timeOutSlide);
  }
}

function prev(){
  i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"
  window.clearTimeout(timeOutSlide);
  timeOutSlide = setTimeout(function(){ // on utilise une fonction anonyme
    funcTimeOutSlide();
  }, 3000);
  if( i >= 0 ){
    fullMajImages();
  }
  else{
    i = indexImg;
    fullMajImages();
  }

}

$(document).ready(function(){
  function test(){

     $slideshow =  $('#slideshow'); // on cible le bloc du slideshow
     $img = $('#slides img'); // on cible les images contenues dans le slideshow
     $span = $('#comments span');// on cible les span contenues dans le slideshow
     $puce = $('#puceSlides img');
     indexImg = $img.length - 1; // on définit l'index du dernier élément
     i = 0; // on initialise un compteur
     $currentImg = $img.eq(i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)
     $currentSpan = $span.eq(i);
     $currentPuce = $puce.eq(i);

    $img.css('display', 'none'); // on cache les images
    $currentImg.css('display', 'block'); // on affiche seulement l'image courante
    $puce.attr("src","img/not-selected.png");
    $currentPuce.attr("src","img/selected.png");

    $('#next').mouseover(function(){
      if(indexImg < (tabImages.length-1) && i == indexImg){
        majOverImages();
      }
    });

    $('#prev').mouseover(function(){
      if(indexImg < (tabImages.length-1) && i == indexImg){
        majOverImages();
      }
    });


}
  loadImage();
  integrateImage();
  test();
  slideImg();
});
