/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "ic-core/util/text",
   "dojox/html/entities",
   "dojo/query",
   "dojo/dom-construct",
   "dojo/_base/array",
   "dojo/has"
], function (textUtils, entities, query, domConstruct, array, has) {

   function encodeContent(data) {
      var encMentionsRegex = entities.encode('<span.*class="vcard".*>.?<(span|a).*class="fn.*>.*<\/(span|a)>.?<span.*>.*<\/span>.?<\/span>');
      var decodeMention = function(match) {
         return entities.decode(match);
      };
      data = entities.encode(data);
      return data.replace(new RegExp(encMentionsRegex, 'gim'), decodeMention);
   }

   /**
    * @namespace ic-core.lcTextArea.mixins
    */
   return /** @lends ic-core.lcTextArea.mixins.Mentions */ {

      getDataMentions : function(node) {
         // textContent not supported by IE8 using innerText instead
         var nameNode = query("a.fn", node)[0],
            name = nameNode ? nameNode.textContent || nameNode.innerText : '',
            hasSymbol = name.indexOf('@') == 0,
            displayName = hasSymbol ? name.substring(1, name.length) : name,
            userIdNode = query('.x-lconn-userid', node)[0],
            userId = userIdNode ? userIdNode.textContent || userIdNode.innerText : '';

         return {
            'displayName': entities.decode(displayName),
            'userId': userId,
            'type': 'PersonMentions',
            'hasSymbol': hasSymbol
         };
      },

      /**
       * builds and returns plainText microformatted mention
       */
      getRTEPlainMention : function(node){
         var userInfo = this.getDataMentions(node);
         return '@{{' + userInfo.userId + '|' + userInfo.displayName + (userInfo.hasSymbol ? '|notify' : '') + '}}';
      },

      /**
       * properly formats and returns the value to be set into the editor
       */
      formatSetValue : function(value, encoded) {
         // replace the double quotes with single ones around the data-mentions so it can be set on the editor
         value = value.replace(/data-mentions="(\{.*?\})"/gi, "data-mentions='$1'");
         // htmlify the content
         return textUtils.htmlify(encoded ? value : encodeContent(value));
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
         // removes zero width spaces
         value = value.replace(/\u200b/gi, '');
         var valueNode = domConstruct.toDom('<div>' + value + '</div>');
         var plainText = "";
         if (valueNode && valueNode.childNodes) {
            array.forEach(valueNode.childNodes, function(entry) {
               // CCM libraries support returning the mentions @{{uid|displayName|notify}}
               if (entry.nodeName == "SPAN" && entry.className == "vcard") {
                  plainText += this.getRTEPlainMention(entry);
               }
               else if (entry.nodeType == 1) { // HTML node
                  plainText += entry.nodeName == 'A' ? (has('ff') ? entry.innerHTML : entry.innerText) : entry.outerHTML;
               }
               else if (entry.data) {
                  plainText += entry.data;
               }
            }, this);
         }
         else if (valueNode && valueNode.data) {
            plainText += valueNode.data;
         }
         // remove invisible spaces
         return plainText;
      }
   };
});
