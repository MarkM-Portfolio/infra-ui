/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Interface that supports the mentions feature in rich text
 * <p>
 * The interface provides attributes used to support the mentions feature,
 * allowing the attributes to be mixed in or supplied by the implementing class.
 * <p>
 * If the mentions feature is enabled in the BasicTextBox then textbox this
 * class should be mixed in.
 * 
 * @mixin lconn.core.lcTextArea.mixins.mentions
 */

dojo.provide("lconn.core.lcTextArea.mixins.Mentions");

dojo.require("dojox.html.entities");
dojo.require("lconn.core.util.text");

(function() {

   function encodeContent(data) {
      var encMentionsRegex = dojox.html.entities.encode('<span.*class="vcard".*>.?<(span|a).*class="fn.*>.*<\/(span|a)>.?<span.*>.*<\/span>.?<\/span>');
      var decodeMention = function(match) {
         return dojox.html.entities.decode(match);
      };
      data = dojox.html.entities.encode(data);
      return data.replace(new RegExp(encMentionsRegex, 'gim'), decodeMention);
   }

   lconn.core.lcTextArea.mixins.Mentions = {
      getDataMentions : function(node) {
         // textContent not supported by IE8 using innerText instead
         var nameNode = dojo.query("a.fn", node)[0],
            name = nameNode ? nameNode.textContent || nameNode.innerText : '',
            hasSymbol = name.indexOf('@') == 0,
            displayName = hasSymbol ? name.substring(1, name.length) : name,
            userIdNode = dojo.query('.x-lconn-userid', node)[0],
            userId = userIdNode ? userIdNode.textContent || userIdNode.innerText : '';

         return {
            'displayName' : dojox.html.entities.decode(displayName),
            'userId' : userId,
            'type' : 'PersonMentions',
            'hasSymbol' : hasSymbol
         };
      },

      /**
       * builds and returns plainText microformatted mention
       */
      getRTEPlainMention : function(node) {
         var userInfo = this.getDataMentions(node);
         return '@{{' + userInfo.userId + '|' + userInfo.displayName + (userInfo.hasSymbol ? '|notify' : '') + '}}';
      },

      /**
       * properly formats and returns the value to be set into the editor
       */
      formatSetValue : function(value, encoded) {
         // replace the double quotes with single ones around the data-mentions
         // so it can be set on the editor
         value = value.replace(/data-mentions="(\{.*?\})"/gi, "data-mentions='$1'");
         // htmlify the content
         return lconn.core.util.text.htmlify(encoded ? value : encodeContent(value));
      },

      /**
       * Properly formats and returns the value of the editor
       */
      formatGetValue : function(value) {
         // removes the <br> added by CKeditor for FF before each end of <p>
         value = value.replace(/<br[^>]*>(<\/p>)/gi, '$1');
         // removes the outher <p> wrapper
         value = value.replace(/<p[^>]*>(.*)<\/p>/, '$1');
         // replaces end of lines with \n
         value = value.replace(/<\/p><p[^>]*>|<br[^>]*>/gi, '\n');
         // removes nbsp
         value = value.replace(/\u200b/gi, '');
         var valueNode = dojo.toDom('<div>' + value + '</div>');
         var plainText = "";
         if (valueNode && valueNode.childNodes) {
            dojo.forEach(valueNode.childNodes, function(entry) {
               // CCM libraries support returning the mentions
               // @{{uid|displayName|notify}}
               if (entry.nodeName == "SPAN" && entry.className == "vcard") {
                  plainText += this.getRTEPlainMention(entry);
               }
               else if (entry.nodeType == 1) { // HTML node
                  plainText += entry.nodeName == 'A' ? (dojo.isFF ? entry.innerHTML : entry.innerText)
                        : entry.outerHTML;
               }
               else if (entry.data) {
                  plainText += entry.data;
               }
            }, this);
         }
         else if (valueNode && valueNode.data) {
            plainText += valueNode.data;
         }
         return plainText;
      }
   };

})();
