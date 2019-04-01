//Saves paste in cookie
function savePaste() {
  var fileName = document.getElementById("pasteTitle").value;
  var fileContents = document.getElementById("pasteData").value;

  //Checks if paste exists
  var doesntExist = true;
  $("#dropdown a").each(function() {
    var fileName = document.getElementById("pasteTitle").value;
    if (this.text == fileName) { doesntExist = false; }
  });

  //Creates cookie if it doesnt exist
  if (doesntExist) {
    if (/^[a-zA-Z0-9_.-]{5,20}$/.test(fileName)) {
      //Creates cookie
      var date = new Date();
      date.setTime(date.getTime()+(10*365*24*60*60*1000));
      document.cookie = fileName + "=" + encodeURIComponent(fileContents) + "; expires=" + date.toGMTString();
      //Adds to dropdown
      if (doesntExist) { $("#dropdown").append( '<a class="dropdown-item" href="#" onclick="return loadPaste(\'' + fileName + '\');">' + fileName + '</a>' ); }
    }
    else {
      bootbox.alert("Your paste title must be between 5 and 20 alphanumeric characters!");
    }
  }

  //Checks to update if cookie exists and content is different
  else if (accessCookie(fileName) != fileContents) {
    bootbox.confirm({
      message: "Are you sure you want save over this paste?",
      callback: function(result){
        if (result) {
          //Updates cookie
          var date = new Date();
          date.setTime(date.getTime()+(10*365*24*60*60*1000));
          document.cookie = fileName + "=" + encodeURIComponent(fileContents) + "; expires=" + date.toGMTString();
        }
      }
    });
  }

  //Alerts content is the same
  else {
    bootbox.alert("Nothing was changed! Change something before you save!");
  }

  return false;
}

//Deletes cookie of paste
function deletePaste() {
  var doesntExist = true;
  $("#dropdown a").each(function() {
    var fileName = document.getElementById("pasteTitle").value;
    if (this.text == fileName) { doesntExist = false; }
  });
  if (doesntExist) {
    bootbox.alert("This paste does not currently exist!");
  }
  else {
    bootbox.confirm({
      message: "Are you sure you want to delete this paste? This cannot be undone!",
      callback: function(result){
        if (result) { document.cookie = document.getElementById("pasteTitle").value + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT'; window.location.reload(); }
      }
    });
  }
}

//Loads paste file name and data
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
    if (temp.indexOf(name)==0) { return decodeURIComponent(temp.substring(name.length,temp.length)); }
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
