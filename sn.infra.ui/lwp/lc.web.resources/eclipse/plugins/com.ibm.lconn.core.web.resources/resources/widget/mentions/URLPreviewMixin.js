/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.mentions.URLPreviewMixin");

dojo.require("lconn.core.widget.mentions.URLMentionsNode");
dojo.require("lconn.core.widget.mentions.MentionsNode");

(function() {

   var URL_REGEX = /\b(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

   /**
    * Mixin that adds URL preview capability to a microblogging input field
    * 
    * @mixin lconn.core.widget.mentions.URLPreviewMixin
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   dojo.declare("lconn.core.widget.mentions.URLPreviewMixin", null, /** @lends lconn.core.widget.mentions.URLPreviewMixin.prototype */
   {
      /**
       * Disables URL preview detection
       * 
       * @type {boolean}
       */
      disableURLPreview : false,

      /**
       * Matches URLs in a string and returns the matches
       * 
       * @param {String}
       *           str The string to scan
       * @returns The return value of String.match()
       */
      matchURL : function(str) {
         return str.match(URL_REGEX);
      },

      /**
       * Detects URLs in a text node and replaces them with URL mention type nodes FIXME: it is unclear to me what this method does
       * 
       * @param {Node}
       *           textNode A text node to scan
       * @returns A text node where URLs are replaced with URL mention type nodes
       * @fires lconn/core/mentions/url/entered
       */
      detectURL : function(textNode) {
         var urlNode = textNode;
         if (!this.disableURLPreview && textNode && textNode.nodeType == 3 && this.textAreaNode != null && textNode.parentNode == this.textAreaNode) {
            var split = null;
            var curString = textNode.data;

            if (curString) {
               var matches = this.matchURL(curString);

               if (matches && matches.length > 0) {
                  for (i = 0; i < matches.length; i++) {
                     split = curString.split(matches[i], 2);
                     this.textAreaNode.insertBefore(document.createTextNode(split[0]), textNode);

                     var span = document.createElement("span");
                     span.id = this.textAreaNode.id + "_mentionsNode_" + this._idx;
                     this.textAreaNode.insertBefore(span, textNode);

                     urlMentionsNode = new lconn.core.widget.mentions.URLMentionsNode({
                        idx : this._idx
                     }, span.id);
                     urlMentionsNode.setValue(matches[i]);
                     urlMentionsNode.setComplete(true);
                     this._idx++;
                     this._trackedMentions.push(urlMentionsNode);
                     urlNode = urlMentionsNode.domNode;
                     curString = split[1];

                     if (i == matches.length - 1 && curString) {
                        this.textAreaNode.insertBefore(document.createTextNode(curString), textNode);
                     }
                  }
                  urlNode = textNode.previousSibling;
                  this.textAreaNode.removeChild(textNode);
                  // Publish the URLs after removing the duplicates (#117858)
                  for (i = 0; i < matches.length; i++) {
                     dojo.publish("lconn/core/mentions/url/entered", [ {
                        url : matches[i],
                        mentionsHelper : this
                     } ]);
                  }
               }
               else {
                  if (matches && matches[0]) {
                     var span = document.createElement("span");
                     span.id = this.textAreaNode.id + "_mentionsNode_" + this._idx;
                     this.textAreaNode.replaceChild(span, textNode);

                     urlNode = new lconn.core.widget.mentions.MentionsNode({
                        idx : this._idx
                     }, span.id);
                     urlNode.setValue(matches[0]);
                     this._idx++;
                     this._trackedMentions.push(urlNode);
                     urlNode = urlNode.domNode;
                  }
                  else {
                     urlNode = null;
                  }
               }
            }

            if (urlNode && urlNode != textNode) {
               var prevText, nextText = null;

               if (dojo.isWebKit || dojo.isIE) {
                  prevText = document.createTextNode('\u200B');
                  nextText = document.createTextNode('\u200B');
               }
               else {
                  prevText = document.createTextNode('');
                  nextText = document.createTextNode('');
               }

               if (!urlNode.previousSibling) {
                  this.textAreaNode.insertBefore(prevText, urlNode);
               }

               if (!urlNode.nextSibling) {
                  this.textAreaNode.insertBefore(nextText, urlNode.nextSibling);
                  urlNode = nextText;
               }
               else if (urlNode.nodeType != 3) {
                  urlNode = urlNode.nextSibling;
                  if (dojo.isWebKit || dojo.isIE) {
                     if (urlNode.nodeType == 3 && urlNode.data != '\u200B') {
                        urlNode.data = '\u200B';
                     }
                  }
               }
            }
         }
         return urlNode;
      },

      /**
       * Removes and destroys the URL preview widget from the microblogging input field
       */
      removeURLPreview : function() {
         if (this._urlPreview) {
            this._urlPreview.destroy();
            this._urlPreview = null;
         }
         if (this._urlPreviewNode) {
            this._urlPreviewNode.hasPreview = false;
            this._urlPreviewNode.previewNode = null;
            this._urlPreviewNode = null;
         }
      }
   });

})();
