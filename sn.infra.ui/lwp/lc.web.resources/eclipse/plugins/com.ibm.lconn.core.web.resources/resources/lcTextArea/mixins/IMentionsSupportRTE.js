/* Copyright IBM Corp. 2014, 2017  All Rights Reserved.              */

/**
 * Interface that supports the mentions feature in rich text
 * <p>
 * The interface provides attributes used to support the mentions feature,
 * allowing the attributes to be mixed in or supplied by the implementing class.
 * <p>
 * If the mentions feature is enabled in the BasicTextBox then textbox this
 * class should be mixed in.
 * 
 * @mixin lconn.core.lcTextArea.mixins.IMentionsSupportRTE
 */
dojo.provide("lconn.core.lcTextArea.mixins.IMentionsSupportRTE");

dojo.require("lconn.core.lcTextArea.mixins.Mentions");
dojo.require("dojox.html.entities");

(function() {
   function check() {
      if (!this._editor) {
         console.warn('IMentionsSupportRTE requires that the mixed-in class has an _editor member');
         return false;
      }
      return true;
   }

   function addNodeToArray(node, nodeArray) {
      var dataMentions;

      if (node.nodeType === 1 && node.className == 'vcard') {
         dataMentions = node.getAttribute('data-mentions');
         if (dataMentions) {
            nodeArray.push(dojo.fromJson(dataMentions));
         }
         else {
            nodeArray.push(lconn.core.lcTextArea.mixins.Mentions.getDataMentions(node));
         }
      }
      else {
         var nodeData = node.data || node.innerText || node.textContent;
         
         // fix defect 160459: Previous multiple lines combine after editing comment and adding more lines
         if (node.nodeName == 'BR') nodeData = '\n';
            
         if (nodeData && nodeData != "" && nodeData != '\u200B') {
            nodeArray.push({
               type : "text",
               value : nodeData.replace('\u200B', '').replace(/\u00A0/gi, ' ')
            });
         }
      }
   }

   dojo.declare("lconn.core.lcTextArea.mixins.IMentionsSupportRTE", null,
   /** @lends lconn.core.lcTextArea.mixins.IMentionsSupportRTE.prototype */
   {
      /**
       * Get the mentions that are contained in the text input.
       * <p>
       * This method mimics the behavior of
       * {@link lconn.core.widget.mentions.MentionsUtils#getTextAsJson}.
       * 
       * FIXME: this method does not do what it advertises. It returns a
       * representation of text nodes and mentions in the sequence they appear
       * in the text field.
       * 
       * @returns {Object} An object containing details of mentions.
       */
      getTrackedMentions : function() {
         if (!check.apply(this))
            return null;

         var dummy = dojo.toDom(this._editor.getData());
         var nodesArray = [];

         dojo.forEach(dummy.childNodes, function(line) {
            if (line.nodeName == 'P' || line.nodeName == 'BR') {
               dojo.forEach(line.childNodes, function(node) {
                  addNodeToArray(node, nodesArray);
               });
               // insert a new line at the end of each <p>
               nodesArray.push({
                  type : "html",
                  value : "\n"
               });
            }
            else {
               addNodeToArray(line, nodesArray);
            }
         });

         return {
            textData : nodesArray
         };
      },

      /**
       * cancels any mentions that was still active during a submission.
       */
      cancelActiveMentions : function() {
         if (this._editor && this._editor.plugins && this._editor.plugins.mentions) {
            this._editor.plugins.mentions.cancelActiveMentions(this._editor);
         }
      },

      /**
       * formats the html string properly for plainText formats
       */
      formatForPlaintext : function(str) {
         return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      },

      /**
       * Gets the contents of this text box.
       * 
       * @param {Boolean}
       *           will return the content of the textbox + mention in plain
       *           text @{{userID|displayName|shouldNotify}} if set to true
       * @returns {String} text contents of this text box.
       */
      getValue : function(plainTextOnly) {
         this.cancelActiveMentions();

         var value = "";
         if (this._editor && this._editor.document) {
            value = this._editor.document.getBody().getHtml();
         } else {
            return value;
         }

         // removes added CKE href property
         value = value.replace(/data-cke-saved-href=+"(?:[^\\"]+|\\.)*"/gi, '');
         if (plainTextOnly) {
            value = value.replace(/<p>(.*)<\/p>/, '$1');
            value = lconn.core.lcTextArea.mixins.Mentions.formatGetValue(value);
         }
         else {
            value = value.replace(/<p>(.*)<\/p>/, '$1');
            value = value.replace(/<br>/gi, '');
            value = value.replace(/<\/p><p>/gi, '<br>');
            value = value.replace(/^\s*/, "");
            value = value.replace(/&nbsp;/gi, ' ');
            value = dojox.html.entities.decode(value);
         }
         return value;
      },

      /**
       * Sets the contents of this text box.
       * 
       * @param {String}
       *           value Can be a mixture of plain text and mention microformat,
       *           both HTML or plain text.
       */
      setValue : function(value, plainTextOnly) {
         this.cancelActiveMentions();
         if (plainTextOnly) {
            value = this.formatForPlaintext(value);
         }
         value = value.replace(/data-cke-saved-href=+"(?:[^\\"]+|\\.)*"/gi, '');
         value = lconn.core.lcTextArea.mixins.Mentions.formatSetValue(value, plainTextOnly);
         if (this._editor && this._editor.document) {
            this._editor.document.getBody().setHtml(value);
            // Grab mentions <span> elements and re-attach the
            // bizCard
            var mentions = this._editor.document.$.querySelectorAll('span.vcard');
            if (dojo.exists("SemTagSvc")) {
               dojo.forEach(mentions, function(current) {
                  current.setAttribute('contenteditable', false);
                  SemTagSvc.parseDom(0, current);
               });
            }
         }
      }
   });

})();
