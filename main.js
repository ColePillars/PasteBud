//Saves Paste
function formSubmit() {
  var fileName = document.getElementById("myForm").elements[0].value;
  var fileContents = document.getElementById("myForm").elements[1].value;
  var date = new Date();
  date.setTime(date.getTime()+(10*365*24*60*60*1000));
  document.cookie = fileName + "=" + fileContents + "; expires=" + date.toGMTString();
  return false;
}

//Loads previous past file name and data
function loadPaste() {
  var option = document.getElementById("myForm2").elements[0].value;
  var data = accessCookie(option);
  document.getElementById("myForm").elements[0].value = option;
  document.getElementById("myForm").elements[1].value = data;
  return false;
}

//Retreives data of paste from cookie
function accessCookie(cookieName) {
  var name = cookieName + "=";
  var allCookieArray = document.cookie.split(';');
  for(var i=0; i<allCookieArray.length; i++)
  {
    var temp = allCookieArray[i].trim();
    if (temp.indexOf(name)==0)
    return temp.substring(name.length,temp.length);
  }
  return "";
}

//Adds current pastes to drop down
function addOptions() {
  var x = document.getElementById("mySelect");
  var cookiearray = document.cookie.split(';');
  for(var i=0; i<cookiearray.length; i++) {
    var option = document.createElement("option");
    option.text = cookiearray[i].split('=')[0];
    x.add(option);
  }
  return false();
}
