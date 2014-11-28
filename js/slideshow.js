

function swapSlides(id){
  i = id;
  window.clearTimeout(timeOutSlide);
  timeOutSlide = setTimeout(function(){ // on utilise une fonction anonyme
    funcTimeOutSlide();
  }, 3000);
  fullMajImages();

}

function swapOver(id){
  majOverImages();
}

function fullMajImages(){
  $img.css("opacity","0");
  $img.css('display', 'none');
  $span.css('display', 'none');
  $currentImg = $img.eq(i); // on définit la nouvelle image
  $currentSpan = $span.eq(i);
  var random = Math.floor(Math.random() * (2 - 0)) + 0;
  if(random == 0){
    setTimeout(function(){
      $currentImg.css("opacity","1");
    },100);
  }
  else{
    $currentImg.css("opacity","1");
    $currentImg.addClass("animated");
    $currentImg.addClass("zoomIn");
    setTimeout(function(){
      $currentImg.removeClass("animated");
      $currentImg.removeClass("zoomIn");
    },1000);
  }

  $currentImg.css('display', 'block'); // puis on l'affiche
  $currentSpan.css('display', 'block');
  $currentPuce = $puce.eq(i);
  $puce.removeClass("selected");
  $currentPuce.addClass("selected");
  $("#numImgCurrent").text(i+1);
}

function majOverImages(rigth){
  if(rigth){
    integrateImage();
    $img = $('#slides img');
    $span = $('#comments span');
    indexImg = $img.length-1;
    $("#numImgCurrent").text(i+1);
  }
  else{
    integrateImage(tabImages.length);
    $img = $('#slides img');
    $span = $('#comments span');
    indexImg = $img.length-1;
    $("#numImgCurrent").text(i+1);
  }
}

function funcTimeOutSlide(){
  if(isPlaying){
    timeOutSlide = setTimeout(function(){ // on utilise une fonction anonyme
      addSlide();
      i = (i<indexImg)?i+1:0;

      fullMajImages();

      funcTimeOutSlide(); // on oublie pas de relancer la fonction à la fin

      // if(indexImg < (tabImages.length-1)){
      //   funcTimeOutAddSlide();
      // }
    }, 3000); // on définit l'intervalle à 7000 millisecondes (7s)ss
  }
}
function addSlide(){
    integrateImage();
    $img = $('#slides img');
    $span = $('#comments span');
    indexImg = $img.length-1;
}

function next(){
  i++; // on incrémente le compteur
  window.clearTimeout(timeOutSlide);
  funcTimeOutSlide();
  if( i > indexImg ){
    i = 0;
  }
  if(indexImg < (tabImages.length-1) && i == indexImg){
    majOverImages();
  }
  fullMajImages();

}

function play(){
  if($("#playButton").attr("class") === "playButton"){
    $("#playButton").attr("class","pauseButton");
    timeOutSlide = setTimeout(function(){ // on utilise une fonction anonyme
      funcTimeOutSlide();
    }, 3000);
    isPlaying = true;
  }
  else{
    $("#playButton").attr("class","playButton");
    window.clearTimeout(timeOutSlide);
    isPlaying = false;
  }
}

function prev(){
  i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"
  window.clearTimeout(timeOutSlide);
  funcTimeOutSlide();
  if( i < 0 ){
    i = indexImg;
  }
  fullMajImages();
}

function detectswipe(el) {
  swipe_det = new Object();
  swipe_det.sX = 0;
  swipe_det.sY = 0;
  swipe_det.eX = 0;
  swipe_det.eY = 0;
  var min_x = 20;  //min x swipe for horizontal swipe
  var max_y = 50;  //max y difference for horizontal swipe
  ele = document.getElementById("slideshow");
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX;
    swipe_det.sY = t.screenY;
  },false);
  ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX;
    swipe_det.eY = t.screenY;
  },false);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
      if(swipe_det.eX > swipe_det.sX) prev();
      else next();
    }

  },false);
}

function clientSideInclude(id, url) {
    var req = false;
    // For Safari, Firefox, and other non-MS browsers
    if (window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch (e) {
            req = false;
        }
    } else if (window.ActiveXObject) {
        // For Internet Explorer on Windows
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                req = false;
            }
        }
    }
    var element = document.getElementById(id);
    if (!element) {
        alert("Bad id " + id +
            "passed to clientSideInclude." +
            "You need a div or span element " +
            "with this id in your page.");
        return;
    }
    if (req) {
        // Synchronous request, wait till we have it all
        req.open('GET', url, false);
        req.send(null);
        element.innerHTML = req.responseText;
    } else {
        element.innerHTML =
            "Sorry, your browser does not support " +
                "XMLHTTPRequest objects. This page requires " +
                "Internet Explorer 5 or better for Windows, " +
                "or Firefox for any system, or Safari. Other " +
                "compatible browsers may also exist.";
    }
}






$(document).ready(function(){
  function test(){
     $typeScreen = screen.width >= 750 ;
     $slideshow =  $('#slideshow'); // on cible le bloc du slideshow
     $img = $('#slides img'); // on cible les images contenues dans le slideshow
     $span = $('#comments span');// on cible les span contenues dans le slideshow
     $puce = $('#puceSlides div');
     indexImg = $img.length - 1; // on définit l'index du dernier élément
     i = 0; // on initialise un compteur
     $currentImg = $img.eq(i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)
     $currentSpan = $span.eq(i);
     $currentPuce = $puce.eq(i);

    $img.css('display', 'none'); // on cache les images
    $currentImg.css('display', 'block'); // on affiche seulement l'image courante
    $puce.removeClass("selected");
    $currentPuce.addClass("selected");

    $('#next').mouseover(function(){
      if(indexImg < (tabImages.length-1) && i == indexImg){
        majOverImages(true);
      }
    });

    $('#prev').mouseover(function(){
      if(indexImg < (tabImages.length-1) && i == indexImg){
        majOverImages(false);
      }
    });

    detectswipe('slides');

}
    clientSideInclude("global", "twitter.html");
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  loadImage();
  integrateImage();
  test();
  funcTimeOutSlide();

});


isPlaying = true;
var indexImage=0;
var tabImages = new Array();
var tabProperties = new Array();
var files = new Array();
function loadImage(){
  var obj = JSON.parse($.ajax({
    type:"GET",
    url:"frontend/getImages.php",
    async:false
  }).responseText);
  if(obj["size"] == "0"){
    tabImages[0] = "img/default/"+((screen.width >= 750)?"big"+tabImages[indexImage] : "small")+Img1.jpg;
  }
  else{
    filesJSON = obj["files"];
    for(i = 0; i<filesJSON.length;i++){
      for(key in filesJSON[i]){
        tabImages[i] = "img/slideshow/"+((screen.width >= 750)?"big"+tabImages[indexImage] : "small")+key;
        console.log(  tabImages[i]);
        tabProperties[i] = filesJSON[i][key];
      }
  }
    $("#puceSlides").append("<div class='button' onmouseover='swapOver("+(i)+")' onclick='swapSlides("+(i)+")'>");
  }
  $("#numImgTotal").text(tabImages.length);
}

function integrateImage(){
  if(arguments[0] != undefined){

    for(var i = indexImage-1 ; i <= arguments[0];i++){
      integrateImage();
    }
    return;
  }

  if(indexImage < tabImages.length){
    //var imgName = (screen.width >= 750)?"big"+tabImages[indexImage] : "small"+tabImages[indexImage];
    if(indexImage == 0){
      //Ajout après le ul

      $("#slides").append("<li><img style='opacity:1;' src='"+tabImages[indexImage]+"' ></li>");
      $("#comments").append("<span>"+tabProperties[indexImage]+"</span>");
    }
    else{
      //Ajout après l'image suivantes

      $("#slides img:last").after("<li><img style='display:none' src='"+tabImages[indexImage]+"'/></li>");
      $("#comments span:last").after("<span style='display:none'>"+tabProperties[indexImage]+"</span>");
    }
    indexImage++;
  }
}
