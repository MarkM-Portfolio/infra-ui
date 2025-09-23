/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("lconn.core.widget.HoverHelp")
   dojo.require("com.ibm.oneui.controls.HoverHelp");
      
   
   dojo.requireLocalization("com.ibm.oneui.controls", "HoverPopup");
   var messages = dojo.i18n.getLocalization("com.ibm.oneui.controls", "HoverPopup");
   
   dojo.declare("lconn.core.widget.HoverHelp", [com.ibm.oneui.controls.HoverHelp], {   
      isEnabled: function(){
         if(typeof(this.help) == "function"){
            if(!this.fetchingHelp){
               this.fetchingHelp = true;
               this.help(dojo.hitch(this, function(fetchedMessage){
                  this.fetchingHelp = false;
                  this.help = fetchedMessage;
                  this.openWithFocus();
               }));
            }
            return false;
         }
         return true;
      },
      
      createContents: function() {
         var div = dojo.create("div", {});
         if (this.title)
            dojo.create("h1", {className: "lotusPopupHeader"}, div).appendChild(document.createTextNode(this.title));
         var hNode = (typeof(this.help) === "string")? document.createTextNode(this.help) : this.help
         dojo.create("p", {className: "lotusFirst"}, div).appendChild(hNode);
         return div;
      }
   });
   
   
   /* Utility method for creating an accessible help tooltip and optionally the link and icon it is attached to. 
    * Parameters
    * a: an optional A element to attach to, if one is not passed an A element will be created and returned
    * heading: An optional heading for the tool tip, must be a string
    * message: The body of the message, can be a string, a domnode or a function that takes a callback parameter for async loading of message
    * strings: Deprecated, no longer necessary
    * preserveLink: if true help popup will be attached to the passed in A element, but the element will not be modified in any other way - if false (the default) all content will be replaced  
    */
   lconn.core.widget.HoverHelp.createHelpLink = function(/* DomNode? */a, /* String? */ heading, /* String | DomNode | Function */ message, /* Object */ strings, /* Boolean */ preserveLink) {
      var d = document;

      a = a || d.createElement("a");
      a.title = messages.help;
      preserveLink = preserveLink || false;
      
      if (!preserveLink) {
         if(a.childNodes.length > 0)
            while(a.firstChild)
               a.removeChild(a.firstChild);
               
         a.href = "javascript:;";
         var img = d.createElement("IMG");
            img.className = "lconnSprite lconnSprite-iconHelp16";
            img.src = dijit._Widget.prototype._blankGif;
            img.setAttribute("alt", messages.help);
         a.appendChild(img);
         
         var altSpan = d.createElement("span");
            altSpan.className = "lotusAltText";
            altSpan.appendChild(d.createTextNode("?"));
         a.appendChild(altSpan);
      }

      new lconn.core.widget.HoverHelp(
      {
         around : a,
         title : heading? heading: null,
         help : message
      });
      
      return a;
   };
})();
