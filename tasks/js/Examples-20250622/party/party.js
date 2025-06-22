var background = document.getElementById('background');
var button = document.getElementById('party');
button.onclick = function() {
  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);
  background.style.background = 'rgb(' + red + ',' + green + ',' + blue + ')';
};