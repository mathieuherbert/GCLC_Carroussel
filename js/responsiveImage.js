var addEvent=function(){return document.addEventListener?function(a,c,d){if(a&&a.nodeName||a===window)a.addEventListener(c,d,!1);else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}:function(a,c,d){if(a&&a.nodeName||a===window)a.attachEvent("on"+c,function(){return d.call(a,window.event)});else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}}();



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

  filesJSON = obj["files"];
  for(i = 0; i<filesJSON.length;i++){
    for(key in filesJSON[i]){
      tabImages[i] = key;
      tabProperties[i] = filesJSON[i][key];
    }
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
