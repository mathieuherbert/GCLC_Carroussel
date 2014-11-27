var addEvent=function(){return document.addEventListener?function(a,c,d){if(a&&a.nodeName||a===window)a.addEventListener(c,d,!1);else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}:function(a,c,d){if(a&&a.nodeName||a===window)a.attachEvent("on"+c,function(){return d.call(a,window.event)});else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}}();



var indexImage=0;
var tabImages = new Array();
var tabProperties = new Array();
function loadImage(){
  if(0==1){
    $.get('frontend/getImages.php',function(data){
      obj = JSON.parse(data.toString());
    });
  }
  else{
    tabImages[0] = "Img1.gif";
    tabProperties[0] = "Prop 1";
    tabImages[1] = "Img2.gif";
    tabProperties[1] = "Prop 2";
  }
}

function integrateImage(){
  if(indexImage < tabImages.length){
    var imgName = (screen.width >= 750)?"big"+tabImages[indexImage] : "small"+tabImages[indexImage];
    if(indexImage == 0){
      //Ajout après le ul
      $("#slideshow ul").append("<li><img src='img/slideshow/"+imgName+"'></li>");
    }
    else{
      //Ajout après l'image précédente
      $("#slideshow ul li:last").after("<li><img src='img/slideshow/"+imgName+"'/></li>");
    }
    indexImage++;
    integrateImage();
  }
}


var responsiveEnhance = function(img, width, monitor) {
  if (img.length) {
    for (var i=0, len=img.length; i<len; i++) {
      responsiveEnhance(img[i], width, monitor);
    }
  } else {
    if (((' '+img.className+' ').replace(/[\n\t]/g, ' ').indexOf(' large ') == -1) && screen.width >= 750) {
      console.log(screen.width);
      var fullimg = new Image();
      addEvent(fullimg, 'load', function(e) {
        img.className += ' large';
        img.src = this.src;
      });
      fullimg.src = img.getAttribute('data-fullsrc');
    }
  }
  if (monitor != false) {
    addEvent(window, 'resize', function(e) {
      responsiveEnhance(img, width, false);
    });
    addEvent(img, 'load', function(e) {
      responsiveEnhance(img, width, false);
    });
  }
};
