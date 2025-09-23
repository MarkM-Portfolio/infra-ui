define([
   "../ConnectionsFileViewer",
   "dojo/_base/lang",
   "../util/url"
], function(ConnectionsFileViewer, lang, url){
   var auth = lang.getObject("lconn.core.auth");
   if(auth) {
      auth.setAuthCheck(function () {
         return true;
      });
   }

   var filesContext = document.getElementById("filesContext");
   var fileId = filesContext? filesContext.getAttribute("fileid") : "";
   var context = filesContext? filesContext.getAttribute("x-ibm-icfiles-context") : "";
   ConnectionsFileViewer.openFromId(fileId, {
      tornOff: false,
      preventLoginRedirect: true,
      loadCurrentUser: true,
      isIframePage: true,
      shareLink: {
         url: window.location.pathname,
         context: context
      },
      openedFromFileViewerEverywhere: true
   }).then(function (viewer) {
      console.log(viewer);
   }, function (error) {
      console.log(error);
   });
});