/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
        "dojo/topic",
        "dojo/has",
        "dojo/string",
        "dojo/keys",
        "dojo/dom-construct",
        "dojo/query",
        "dojo/_base/array",
        "dojo/_base/lang",
        "ic-core/config",
        "ic-core/config/properties",
        "dojo/text!ic-core/widget/urlPreview/templates/urlDetect.html",
], function(topic, has, string, keys, domConstruct, query, array, lang, config, properties, template) {

   /**
    * CKEditor plugin for URL Detection
    * 
    * @namespace ic-ui.ckeditor.plugins.urlDetect
    */
   var plugin = {};
   /*
    * The name of this plugin
    */
   var name = 'urlDetect';

   /**
    * @function getName
    * @memberof ic-ui.ckeditor.plugins.urlDetect
    * @returns name of this plugin
    */
   plugin.getName = function() {
      return name;
   };

   /**
    * @function isEnabled
    * @memberof ic-ui.ckeditor.plugins.urlDetect
    * @returns true if the plugin is enabled
    */
   plugin.isEnabled = function() {
      return !(properties['com.ibm.lconn.core.web.ckeditor.urlDetect.enabled'] === 'false');
   };

   /**
    * Dynamically adds a CKEditor plugin that enables the typying of URLs
    * 
    * @function addPlugin
    * @memberof ic-ui.ckeditor.plugins.urlDetect
    */
   plugin.addPlugin = function() {
      if (lang.exists("CKEDITOR.plugins.registered") && CKEDITOR.plugins.registered[name]) {
         return;
      }
      var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
      var templatePath = template;
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
         if (has('chrome')) {
            var prevNode = node && node.getPrevious();
            //removeZWS(node.getNext());
            var nextNode = node && node.getNext();
         }
         //var prevNode = node.getPrevious();
         //removeZWS(node.getNext());
         //var nextNode = node.getNext();
         range.deleteContents();
         // Chrome Fix: url was the last node...
         if (!nextNode && has('chrome')) {
            insertNBSP(prevNode);
         }
         range.select();
      }

      CKEDITOR.plugins.add(name, {
         init : function(editor) {

            function createTopic(data) {
               // Send the topic...
               topic.publish("lconn/core/ckeditor/url/entered", [ {
                  url : data,
                  editor : editor
               } ]);
            }

            function replaceURLnode(evt){
               var range = evt.editor.getSelection().getRanges()[0];
               if (has('ie') == 8) {
                  var htmlNode = string.substitute(this.templatePath, {
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
               if ((has('ie') || isIE11) && range.collapsed) {
                  if (range.startContainer.type == CKEDITOR.NODE_ELEMENT && range.endContainer.getName() == 'p') {
                     node = range.endContainer.getLast();
                     while (node && !isURLNode(node)) {
                        node = node.getPrevious();
                     }
                  }
                  else if (range.startContainer.type == CKEDITOR.NODE_TEXT && range.endOffset == '1' && isURLNode(range.endContainer.getPrevious())) {
                     node = range.endContainer.getPrevious();
                  }
                  if (node) {
                     node.remove();
                  }
               }
               // General use case...
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
                  case keys.BACKSPACE:
                  case keys.DELETE:
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
                  domHTML = domConstruct.toDom('<div>' + html + '</div>');
                  // checking the nodeName because CKEditor sets the type=html even if we are pasting plain text
                  listOfLinks = query('a[href]', domHTML.nodeName == "#document-fragment" || 'A' ? domHTML : '');

                  array.forEach(listOfLinks, function(current) {
                     // make sure we are not in a mention span
                     if (current.parentElement && (!current.parentElement.classList || (current.parentElement.classList && !current.parentElement.classList.contains('vcard')))) {
                        link = string.substitute(this.templatePath, {
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
                   * Handles afterCommandExec event to enable url preview and publishes the event
                   */
                  editor.on("afterCommandExec", onAfterCommandExec);
                  /*
                   * Priority '999' (lowest one so it will be the last one executed)
                   */
                  editor.on("paste", onPaste, this, null, 999);
                  /*
                   * Handles keydown (IE)/ keyup(!IE) events
                   */
                  editor.document.on(has('ie') || isIE11 ? 'keydown' : 'keyup', onKey);
               }
            });
         }
      });
   };

   return plugin;
});
