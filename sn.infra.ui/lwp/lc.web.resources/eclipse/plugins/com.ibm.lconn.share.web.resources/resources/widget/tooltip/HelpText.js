/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tooltip.HelpText");
dojo.require("lconn.share.widget.tooltip.DialogBase");

dojo.declare("lconn.share.widget.tooltip.HelpText", lconn.share.widget.tooltip.DialogBase, {
   autofocus: false,
   label: "Loading...",
   //labelClose: "Close", // Provided by subclasses that want a close button
   width: 200,
   maxWidth: 400,
   ioArgs: {auth: {preventReload: true}, handleAs: "json", noStatus:true},
   renderHtml: function(response, ioArgs) {
      var d = document;
      var el = d.createElement("div");
         el.className = "lotusHelp";
         var w = this.width + Math.min(Math.max(0, (response.message.length-200)/125), 1) * (this.maxWidth - this.width);
         el.style.width = w+"px";
         var div = d.createElement("div");
            div.className = "lotusInfoBox";
            dijit.setWaiRole(div, "document");

            var closeLink;
            if (this.labelClose) {
               var closeParent = d.createElement("div");
                  closeParent.className = "lotusRight";
                  closeLink = this.closeLink = d.createElement("a");
                     closeLink.title = this.labelClose;
                     dijit.setWaiState(closeLink, "label", this.labelClose);
                     closeLink.className = "lotusDelete";
                     closeLink.href = "javascript:;";
                     
                     // Depends on lconn.share.widget.TooltipDialog.onTooltipClick() to close dialog
                     // this.connect(closeLink, "onclick", "onCancel");
                     dijit.setWaiRole(closeLink,"button");            
                     
                     var img = d.createElement("img");
                        img.src = dojo.config.blankGif;
                        img.setAttribute("alt", this.labelClose);
                        dijit.setWaiRole(img, "presentation");
                     closeLink.appendChild(img);
            
                     var span = d.createElement("span");
                        span.className = "lotusAltText";
                        span.appendChild(d.createTextNode("X"));
                     closeLink.appendChild(span);
                  closeParent.appendChild(closeLink);
               div.appendChild(closeParent);
            }
         
            if (response.message) {
               var contentDiv = document.createElement("div");
                  if (closeLink) {
                     contentDiv.id = this.id + "_content";
                     contentDiv.className = "lotusHelpHeader";
                     dijit.setWaiState(closeLink, "describedBy", contentDiv.id);
                  }
               
                  if (response.title) {
                     var h3 = d.createElement("h3");
                        //due to the location of the popup in the DOM, there are no headings above it in the hierarchy, so it's a "h1" semantically
                        //CSS assumes it's a h3 however
                        dijit.setWaiRole(h3, "heading");
                        dijit.setWaiState(h3, "level", "1");
                        h3.appendChild(d.createTextNode(response.title));
                        div.appendChild(h3);
                  }
                  var p = d.createElement("p");
                     p.appendChild(d.createTextNode(response.message));
                  contentDiv.appendChild(p);
                  
               div.appendChild(contentDiv);
            }
            else
               div.appendChild(d.createTextNode(this.msgEmpty));
         el.appendChild(div);
      return el;
   }
});

