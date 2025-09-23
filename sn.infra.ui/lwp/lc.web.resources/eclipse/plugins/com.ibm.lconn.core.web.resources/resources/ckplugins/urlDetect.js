/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {

   /**
    * CKEditor plugin for URL Detection
    * 
    * @namespace lconn.core.ckplugins.urlDetect
    */
   var plugin = dojo.provide("lconn.core.ckplugins.urlDetect");

   dojo.require("lconn.core.config.properties");

   /**
    * The name of this plugin
    */
   var name = 'urlDetect';

   /**
    * @function getName
    * @memberof lconn.core.ckplugins.urlDetect
    * @returns name of this plugin
    */
   plugin.getName = function() {
      return name;
   };

   /**
    * @function isEnabled
    * @memberof lconn.core.ckplugins.urlDetect
    * @returns true if the plugin is enabled
    */
   plugin.isEnabled = function() {
      return !(lconn.core.config.properties['com.ibm.lconn.core.web.ckeditor.urlDetect.enabled'] === 'false');
   };

   /**
    * Dynamically adds a CKEditor plugin that enables the typying of URLs
    * 
    * @function addPlugin
    * @memberof lconn.core.ckplugins.urlDetect
    */
   plugin.addPlugin = function() {
      if (dojo.exists("CKEDITOR.plugins.registered") && CKEDITOR.plugins.registered[name]) {
         return;
      }
      var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
      var templatePath = dojo.moduleUrl("lconn.core", "widget/urlPreview/templates/urlDetect.html");
      var regexStr = "(^|\\s|>| *)" // the URL must be at the start of the string, or be preceded with a whitespace, or after a html tag.
         + "(" // capture to $2
         + "((https?|ftps?|news|mailto|notes):|www\\.|w3\\.)" // protocol, www or w3
         + "([\\w/\\#~:.?+=%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|&amp;)+?" // one or more valid chars take little as possible
         + ")"
         + "(?=" // lookahead for the end of the url
         + "[.:?\\),;!\\]'\"]*" // punct
         + "(?:[^\\w/\\#~:.?+=&%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]"// invalid character
         + "| " // non-breaking space entity
         + "|$)" // or end of string
         + ")";
      var urlRegexp = new RegExp(regexStr, 'gi');

      function moveCursorAfter(node, editor) {
         var range;
         if (node) {
            range = editor.createRange();
            range.setStartAfter(node);
            range.setEndAfter(node);
            range.select();
         }
         return range;
         /*
         if (node) {
            var range = editor.createRange();
            range.setStartAfter(node);
            range.setEndAfter(node);
            range.select();
         }
         //range.moveToPosition(node, CKEDITOR.POSITION_AFTER_END);
         //editor.getSelection().selectRanges([range]);
          */
      }

      function isURLNode(node) {
         var name = node && (node.type == CKEDITOR.NODE_ELEMENT) && node.getName();
         return name && (name == 'a') && node.getAttribute('type') == 'URLNode';
      }

      function removeZWS(node) {
         if (node && node.type == CKEDITOR.NODE_TEXT && node.getText() == '\u200b') {
            node.remove();
         }
      }

      function insertNBSP(node) {
         var txtInNode = node && node.getText();
         if (txtInNode && txtInNode.charAt(txtInNode.length - 1) == ' ') {
            node.setText(txtInNode.substring(0, txtInNode.length));
            CKEDITOR.dom.element.createFromHtml('&nbsp;').insertAfter(node)
         }
      }

      function deleteURLnode(range, node) {
         if (dojo.isChrome) {
            var prevNode = node && node.getPrevious();
            //removeZWS(node.getNext());
            var nextNode = node && node.getNext();
         }
         //var prevNode = node.getPrevious();
         //removeZWS(node.getNext());
         //var nextNode = node.getNext();
         range.deleteContents();
         // Chrome Fix: url was the last node...
         if (!nextNode && dojo.isChrome) {
            insertNBSP(prevNode);
         }
         range.select();
      }
      
      CKEDITOR.plugins.add(name, {
         init : function(editor) {

            function createTopic(data) {
               // Send the topic...
               dojo.publish("lconn/core/ckeditor/url/entered", [ {
                  url : data,
                  editor : editor
               } ]);
            }

            function replaceURLnode(evt){
               var range = evt.editor.getSelection().getRanges()[0];
               if (dojo.isIE == 8) {
                  var htmlNode = dojo.string.substitute(dojo.cache(templatePath), {
                     href : evt.data.commandData.href,
                     url : range.endContainer.getText()
                  });
                  CKEDITOR.dom.element.createFromHtml(htmlNode).insertAfter(range.endContainer);
                  range.deleteContents();
               }
               else {
                  //var zeroSpace = new CKEDITOR.dom.text('\u200b');
                  // Safari returns the text element of the <a>, we need to move up
                  var container = range.endContainer.type == CKEDITOR.NODE_TEXT ? range.endContainer.getParent() : range.endContainer; 
                  if (container.getAttribute('href') == evt.data.commandData.href) {
                     container.setAttribute('contenteditable', false);
                     container.setAttribute('type', 'URLNode');
                     //zeroSpace.insertAfter(range.endContainer);
                     //moveCursorAfter(zeroSpace, evt.editor);
                  }
               }
            }

            function findURLs(editor){
               var range = editor.getSelection().getRanges()[0],
                  node;
               // IE needs these workarounds when deleting one mention only
               if ((dojo.isIE || isIE11) && range.collapsed) {
                  if (range.startContainer.type == CKEDITOR.NODE_ELEMENT && range.endContainer.getName() == 'p') {
                     node = range.endContainer.getLast();
                     while (node && !isURLNode(node)) {
                        node = node.getPrevious();
                     }
                  }
                  //else if (range.startContainer.type == CKEDITOR.NODE_TEXT && range.endContainer.getText() == '\u00A0' && isURLNode(range.endContainer.getPrevious())) {
                  else if (range.startContainer.type == CKEDITOR.NODE_TEXT && range.endOffset == '1' && isURLNode(range.endContainer.getPrevious())) {
                     node = range.endContainer.getPrevious();
                  }
                  if (node) {
                     node.remove();
                  }
               }
               // General use case (FF, Chrome, ...)
               else {
                  var walker = new CKEDITOR.dom.walker(range);
                  while (node = walker.previous()) {
                     if (isURLNode(node)) {
                        deleteURLnode(range, node);
                     }
                  }
               }
            }

            function onKey(evt){
               switch (evt.data.getKey()) {
                  case dojo.keys.BACKSPACE:
                  case dojo.keys.DELETE:
                     findURLs(editor);
                     break;
                  default:
                     break;
               }
            }

            function onAfterCommandExec(evt){
               if (evt.data.name == 'insertLink') {
                  replaceURLnode(evt);
                  // Send the topic...
                  createTopic(evt.data.commandData.href);
               }
            }

            // Convert pasted URLs into HTML links. IE already converts pasted links.
            function onPaste(evt){
               var data = evt.data,
                  html = data.dataValue,
                  link = '',
                  domHTML = '',
                  listOfLinks = [],
                  sendTopic = true;

               if (evt.data.type == 'html' || evt.data.type == 'text') {
                  domHTML = dojo.toDom('<div>' + html + '</div>');
                  // checking the nodeName because CKEditor sets the type=html even if we are pasting plain text
                  listOfLinks = dojo.query('a[href]', domHTML.nodeName == "#document-fragment" || 'A' ? domHTML : '');

                  dojo.forEach(listOfLinks, function(current) {
                     // make sure we are not in a mention span
                     if (current.parentElement && (!current.parentElement.classList || (current.parentElement.classList && !current.parentElement.classList.contains('vcard')))) {
                        link = dojo.string.substitute(dojo.cache(templatePath), {
                           href : current.getAttribute('href'),
                           url : current.innerText || current.innerHTML
                        });
                        // send topic only once for the first URL found
                        if (sendTopic) {
                           createTopic(current.getAttribute('href'));
                           sendTopic = false;
                        }
                        html = html.replace(current.outerHTML, link + '\u200b');
                     }
                  });

               }

               data.dataValue = html;
            }

            editor.on("instanceReady", function(evt) {
               if (editor.mode === "wysiwyg") {
                  /*
                   * Handles afterCommandExec and paste events to enable url preview and publishes the event
                   */
                  editor.on("afterCommandExec", onAfterCommandExec);
                  /*
                   * Priority '999' (lowest one so it will be the last one executed)
                   */
                  editor.on("paste", onPaste, this, null, 999);
                  /*
                   * Handles keydown (IE)/ keyup(!IE) events
                   */
                  editor.document.on(dojo.isIE || isIE11 ? 'keydown' : 'keyup', onKey);
               }
            });
         }
      });

   };

})();
