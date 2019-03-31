//Saves Paste
function savePaste() {
  //Creates Cookie
  var fileName = document.getElementById("pasteTitle").value;
  var fileContents = document.getElementById("pasteData").value;
  var date = new Date();
  date.setTime(date.getTime()+(10*365*24*60*60*1000));
  document.cookie = fileName + "=" + fileContents + "; expires=" + date.toGMTString();

  //Adds to Dropdown
  var doesntExist = true;
  $("#dropdown a").each(function() {
    var fileName = document.getElementById("pasteTitle").value;
    if (this.text == fileName) { doesntExist = false; }
  });
  if (doesntExist) { $("#dropdown").append( '<a class="dropdown-item" href="#" onclick="return loadPaste(\'' + fileName + '\');">' + fileName + '</a>' ); }
  return false;
}

//Loads previous paste file name and data
function loadPaste(pasteName) {
  var option = pasteName;
  var data = accessCookie(option);
  document.getElementById("pasteTitle").value = option;
  document.getElementById("pasteData").value = data;
  return false;
}

//Retreives data of paste from cookie
function accessCookie(cookieName) {
  var name = cookieName + "=";
  var allCookieArray = document.cookie.split(';');
  for (var i=0; i<allCookieArray.length; i++)
  {
    var temp = allCookieArray[i].trim();
    if (temp.indexOf(name)==0) { return temp.substring(name.length,temp.length); }
  }
  return "";
}

//Adds current pastes to drop down
function addOptions() {
  var x = document.getElementById("mySelect");
  var cookiearray = document.cookie.split(';');
  for (var i=0; i<cookiearray.length; i++) {
    var fileName = cookiearray[i].split('=')[0].trim();
    $("#dropdown").append('<a class="dropdown-item" href="#" onclick="return loadPaste(\'' + fileName + '\');">' + fileName + '</a>');
  }
  return false;
}
