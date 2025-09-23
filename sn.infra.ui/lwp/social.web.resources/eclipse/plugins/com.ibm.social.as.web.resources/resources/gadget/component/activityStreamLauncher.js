/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
(function() {
   var LOAD_TIMEOUT = 80;
   
   
   function isSecure() {
      var scheme = (window.location.protocol || "http").replace(':','');
      return (scheme === "https");
   }
   
   function dialogSizeChanged(newSize) {
      if (newSize) {
         var iframe = document.getElementById(iframeId);
        
         var sizeInt = parseInt(newSize);
         if (!sizeInt) { return; }
         var size = parseInt(newSize) + 5;
         iframe.style.height = size + "px";
      }
   }
      
   function messageReceived(event) {
      // Make sure it's coming from a connections window
      if (event && event.origin) {      
        var dataParts = event.data.split("|");
        var msg = dataParts ? dataParts[0] : null;
        if (msg === "com/ibm/social/height_changed")
               dialogSizeChanged(dataParts[1]);
      }
   }
   
   function preloadActivityStream() {
	   launchIFrameContent();
   }
   
   function launchIFrameContent() {
      var shareboxUrl = "/connections/resources/activitystream?debug=dojo&asMaxWidth=600px&showSharebox=true&dynamicHeight=true";
      
      if (window.addEventListener)
         window.addEventListener("message", messageReceived, false);
      else
         window.attachEvent("onmessage", messageReceived);
      
      iframeId = "_sharebox_iframe";
      document.write("<iframe id=\"" + iframeId + "\" src=\"" + shareboxUrl + "\" scrolling=no style=\"min-width:600px; min-height:500px; border:none;\"></iframe>");
   }
   
   function init() {
      preloadActivityStream()
   }   
   init();
})();
