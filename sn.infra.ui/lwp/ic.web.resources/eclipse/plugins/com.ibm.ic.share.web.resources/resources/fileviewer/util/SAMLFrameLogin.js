/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/cookie"
], function (declare, cookie) {
   
   return declare([], {
      isLoggedIn : false,
      src: "/docs/app/doc",
      samlFrame: null,
      
      login : function(delay) {
         window.setTimeout(dojo.hitch(this, this.initSamlFrame), 1000 * delay);
         // preemptive saml check every 25 minutes
         window.setInterval(dojo.hitch(this, this.kickSamlCheck), 1000 * 60 * 25);
      },
      
      initSamlFrame: function() {
         console.log("Docs SAML Login executing...");
         var samlFrame = document.createElement("IFRAME");
         samlFrame.name = samlFrame.id = "preemptiveSamlFrame";
         samlFrame.style.top = "-9999px";
         samlFrame.style.width = samlFrame.style.height = "1px";
         samlFrame.style.display = "none";
         samlFrame.src = this.src;
         samlFrame.onload = dojo.hitch(this, this._onload);
         document.body.appendChild(samlFrame);
         this.samlFrame = samlFrame;         
      },
      haveDocsLTPA : function() {
         var ltpaflag = cookie("LTPADocsFlag");
         if(ltpaflag){
            return true;
         }
         return false;
      },
      kickSamlCheck : function() {
         this.samlFrame.src = this.src;
         if(this.haveDocsLTPA()){
            // delete immediate saml iframe if there is any
            this.removeImmediateSAMLFrame();
         }
      },
      
      removeImmediateSAMLFrame : function() {
         var node = dojo.byId("ImmediateSamlFrame");
         if(node)
         {
            document.body.removeChild(node);
         }
      },
     
      _onload : function() {
      
      }
   });
});
