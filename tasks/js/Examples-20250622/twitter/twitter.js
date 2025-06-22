var textarea = document.getElementById('text');
var remaining = document.getElementById('characters-remaining');

textarea.onkeypress = function(e) {
  var r = 140 - textarea.value.length;
  remaining.innerHTML = r;
  if(r <= 0) {
    return false;
  }
};