/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("lconn.core.DialogUtil");
dojo.requireLocalization("com.ibm.social.incontext", "socialInContextCoreStrings");
dojo.require("dojox.html.entities");
dojo.require("lconn.core.globalization.bidiUtil");

com.ibm.social.incontext.util.html = {

   getDirectionCode: function() {
      // Return the unicode control char for &rlm; when in RTL-mode
      // This character is inserted in front of neutral characters, like "X" or ","
      // when they should be displayed in RTL mode (for example, when they are used as item 
      // separators or filter close links
      return dojo._isBodyLtr() ? "" : "\u200F";
   },

   destroyWidgets: function(el) {
      if (el && el.nodeType != 11) {
         var list = dojo.query('[widgetId]', el).map(dijit.byNode);
         dojo.forEach(list, function(w) {if (w) w.destroyRecursive();});
      }
   },
   removeChildren: function(el) {
      com.ibm.social.incontext.util.html.destroyWidgets(el);
      while (el.firstChild) el.removeChild(el.firstChild);
   },

   isEvent: function(e) {
      return (e && (typeof e.target != "undefined" || typeof e.bubbles != "undefined"));
   },
   
   append: function(el, contents) {
      var d = document;
      if (dojo.isArray(contents))
         for (var i=0; i<contents.length; i++) {
            var c = contents[i];
            el.appendChild( (typeof c == "string") ? d.createTextNode(c) : c);
         }
      else 
         el.appendChild( (typeof contents == "string") ? d.createTextNode(contents) : contents);
   },
   
   createTable: function(d, content) {
      var table = d.createElement("table");
      table.cellPadding = table.cellSpacing = 0;
      var tbody = d.createElement("tbody");
      var tr = d.createElement("tr");
      var td = d.createElement("td");
      if (content) td.appendChild(content);
      tr.appendChild(td);
      tbody.appendChild(tr);
      table.appendChild(tbody);
      return table;
   },
   
   countCells: function(tr, findTd) {
      var td = tr.firstChild;
      var c = 0;
      while (td) {
         if (findTd == td)
            break;
         if (td.nodeName.toLowerCase() == "td")
            c += (dojo.attr(td, "colSpan") || 1);
         td = td.nextSibling;
      }
      return c;
   },

   formatFilename: function(s) {
      // This has to be a no-op when we are in LTR mode
      // In theory, we could do the same thing in any mode, but the default LTR-language Windows install
      // is missing the fonts needed to use Unicode control characters in the browser title bar and tooltips
      if(dojo._isBodyLtr())
         return com.ibm.social.incontext.util.html.encodeMultiSpaces(s);

      // Force filenames to LTR mode using Unicode control characters
      // See http://www.w3.org/TR/i18n-html-tech-bidi/#ri20060623.095429759 for details
      return "\u202A" + com.ibm.social.incontext.util.html.encodeMultiSpaces(s) + "\u202C";
   },
   
   encodeHtmlAttribute: function(s) {
      return com.ibm.social.incontext.util.html.encodeHtml(s).replace(/\"/g,"&quot;");
   },

   encodeHtml: function(s) {
      if (!s) return "";
      var e = com.ibm.social.incontext.util.html._encoder;
      if (!e) e = com.ibm.social.incontext.util.html._encoder = dojo.doc.createElement("div");
      e.innerHTML = "";
      e.appendChild(dojo.doc.createTextNode(s));
      return e.innerHTML;
   },

   decodeHtml:function(s) {
      if(!s) return "";
      var e = com.ibm.social.incontext.util.html._decoder;
      if (!e) e = com.ibm.social.incontext.util.html._decoder = dojo.create("div");
         e.innerHTML = s;

      return dojo.isIE ? e.innerText: e.textContent;
   },

   getFrameDocument: function(frame) {
      var frameDocument;
      if ( frame )
         try {
            if (dojo.isIE || dojo.isSafari > 2) {
               frameDocument = frame.contentWindow.document;
            } else if (dojo.isSafari) {
               frameDocument = frame.document;
            } else { //  if(d.isMozilla){
               frameDocument = frame.contentWindow.document;
            }
         } catch (e) {}
      return frameDocument;
   },
   
   UNICODE_SPACE: /[\s\u3000]/g,
   UNICODE_DOUBLE_SPACE: /[\s\u3000]{2}/g,
   encodeSpaces: function(s) {
      if(!s) return s;
      return s.replace(com.ibm.social.incontext.util.html.UNICODE_SPACE, "\u00a0");
   },
   encodeMultiSpaces: function(s) {
      if(!s) return s;
      return s.replace(com.ibm.social.incontext.util.html.UNICODE_DOUBLE_SPACE, " \u00a0");
   },
   
   htmlText: function(el) {
      if (!el)
         return null;
      var a = [];
      for (var j=0, c; c=el.childNodes[j]; j++)
         if (c.nodeType == 3)
            a.push(c.nodeValue);
      return a.length > 0 ? a.join("") : null;
   },
   
   SUBSTITUTION: /\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
   substitute: function(d, el, template, map, transform, thisObject) {
      var re = com.ibm.social.incontext.util.html.SUBSTITUTION;
      el = el || d.createDocumentFragment();
      var last = 0, r;
      while (r = re.exec(template)) {
         el.appendChild(d.createTextNode(template.substring(last,r.index)));
         last = r.index+r[0].length;
         var key = r[1];
         var format = r[2];
         var value = dojo.getObject(key,false,map);
         if (typeof value == "function")
            value = value.apply(thisObject || map, [key, format]);
         if(format){ value = dojo.getObject(format,false,thisObject)(value);}
         if(transform){ value = transform(value, key); }
         if (typeof value != "undefined" && value !== null) {
            if (value.nodeType > 0) {
               value.style.direction = lconn.core.globalization.bidiUtil.getTextDirection(value.textContent);
               value.dir = value.style.direction;
               value.style.textAlign = "inherit";
               el.appendChild(value);
            } else {
               value = lconn.core.globalization.bidiUtil.enforceTextDirection(value.toString());
               el.appendChild(d.createTextNode(value.toString()));
            }
         }
      }
      el.appendChild(d.createTextNode(template.substring(last)));
      return el;
   },
   
   /*createWrappableText: function(d, el, text, wrapThreshold) {
      text = text || "";
      wrapThreshold = wrapThreshold || 1;
   
      if (text.length <= wrapThreshold) {
         el.appendChild(d.createTextNode(text));
      }
      else {
         var dash = false;
         var safari = dojo.isSafari;
         var ff2 = dojo.isFF && Math.floor(dojo.isFF) == 2;
         
         for (var i=0; i < text.length; i += 1) {
            var c = text.substring(i, i + 1);
            var dash = c == '-';
   
            if (i != 0 && !wasDash && !dash) {
               if (ff2 || safari)
                 el.appendChild(d.createElement("wbr"));
               else
                 el.appendChild(d.createTextNode("\u00ad"));
            }
   
            var wasDash = dash;
            el.appendChild(d.createTextNode(c));
         }
      }
   },*/
   
   EMBEDDED_URL_PATTERN: /(^|[\s])(([a-zA-Z]+:\/\/|www\.|mailto:)[^\s]+)/i,
   URL_PUNCTUATION_BACKTRACK: /[\.,\!\-;\:\'\"]+$/,
   createTextNode: function(d, el, text, skipLineBreaks) {
      if (!text)
         return;
      text = dojo.trim(text);
      if (text.length > 0) {
         var sections = text.split("\u000A"), i;
         for(i=0; i < sections.length; i++) {
            var text = sections[i], match,backtrack;
            while (match = com.ibm.social.incontext.util.html.EMBEDDED_URL_PATTERN.exec(text)) {
               var previous = text.substring(0,match.index) + match[1];
   
               var baseHref = match[2];
               if (backtrack = com.ibm.social.incontext.util.html.URL_PUNCTUATION_BACKTRACK.exec(baseHref))
                  baseHref = baseHref.substring(0,backtrack.index);
               text = text.substring(previous.length+baseHref.length);
               
               var isWWW = (match[3] && match[3].toLowerCase() == "www.");
               var isMailto = (match[3] && match[3].toLowerCase() == "mailto:");
               var href = isWWW ? "http://"+baseHref : baseHref;
               if (isMailto)
                  baseHref = baseHref.substring(7);
               
               if (previous.length > 0)
                  com.ibm.social.incontext.util.text.breakString(previous, d, el, 15);
                  //el.appendChild(d.createTextNode(previous));

               var a = d.createElement("a");
                  a.href = href;
                  a.target = "_blank";
                  com.ibm.social.incontext.util.text.breakString(baseHref, d, a, 15);
                  //a.appendChild(d.createTextNode(baseHref));
               el.appendChild(a);            
            }
            if (text.length > 0)
               com.ibm.social.incontext.util.text.breakString(text, d, el, 15);
               //el.appendChild(d.createTextNode(text));
            if(i != (sections.length -1)) {
               el.appendChild(!skipLineBreaks ? d.createElement("br") : d.createTextNode(" "));
            }
         }
      }
   },
   
   generateiWidgetEnablerCodeIfRequired: function(content, doc) {
      if (content.indexOf("mm_iWidget") >-1) {
         console.log("update generateiWidgetEnablerCodeIfRequired for MM1.1");
      }
      return null;
   },
   
   evalScriptTag: function(tag) {
      if (tag.src) {
         var h = document.getElementsByTagName("head")[0];
         var script = document.createElement("SCRIPT");
            script.src = tag.src;
         h.appendChild(script);
      }
      else if (tag.text && tag.text.length > 0) {
         if (window.execScript)
            window.execScript(tag.text);
         else if (dojo.isSafari)
            window.setTimeout(tag.text,0);
         else
            eval.call(window, tag.text);
      }
   },
   
   xhtmlToHtml: function(d, xhtml, html, skipRoot, ids) {
      if (!xhtml)
         return;
      if (!skipRoot) {
         for (var i=0,a; a=xhtml.attributes[i]; i++) {
            var n = a.nodeName.toLowerCase();
            switch (n) {
               case "class":     html.className = a.nodeValue; break;
               case "colspan":   html.colSpan = a.nodeValue; break;
               case "style":     try{html.style.cssText = a.nodeValue;}catch(e){/*This is sometimes readonly*/} break;
               default:
                  if (n == "onclick" && dojo.isIE)
                     html.onclick = new Function(a.nodeValue); 
                  else
                     html.setAttribute(a.nodeName, a.nodeValue);
            }
         }
         if (html.id && ids)
            ids[html.id] = html;
      }
      var n = xhtml.nodeName.toLowerCase();
      for (var i=0,x; x=xhtml.childNodes[i]; i++) {
         switch (x.nodeType) {
            case 1:
               var e = d.createElement(x.nodeName);
               html.appendChild(e);
               com.ibm.social.incontext.util.html.xhtmlToHtml(d, x, e, false, ids);               
               break;
            case 3:
               switch(n) {
                  case "script":
                     if(dojo.isIE)
                        html.text = x.nodeValue;
                     else          
                        html.appendChild(d.createTextNode(x.nodeValue));
                     break;
                  case "style": // TODO: safari won't interpret <style> tags in the body
                     if(dojo.isIE)
                        html.styleSheet.cssText = x.nodeValue;
                     else
                        html.appendChild(d.createTextNode(x.nodeValue));
                     break;
                  default:
                     html.appendChild(d.createTextNode(x.nodeValue));
                     break;
               }
               break;
         }
      }
   },
   
   /**
    * An asynchronous alert that can be used by HTML components. Library utilizers may replace
    * this function with custom implementation at runtime.  Will be modal.
    */
   alert: function(msg) {
      alert(msg);
   },
   
   /**
    * An asynchronous confirmation that can be used by HTML components. Library utilizers may replace
    * this function with custom implementation at runtime.  Will be modal.
    */
   confirm: function(msg, onSuccess, onCancel) {
      var bool = confirm(msg);
      if (bool && onSuccess)
         onSuccess();
      else if (!bool && onCancel)
         onCancel();
   },
   showLoading: function(node, shouldShowLoadingTxt) {
      if (node) {
    	   var table = dojo.create("table", { className: "eeLoadingCtnr", role: "presentation" }, node);
    	      var tbody = dojo.create("tbody", { }, table);
    	         var tr = dojo.create("tr", { }, tbody);
    	            var td = dojo.create("td", { }, tr);
                     var div = dojo.create("div", {className: "lotusLoading" }, td);
                  td = dojo.create("td", { }, tr);
                     var span = dojo.create("span", {className: "lotusAltText"}, td);
                     span.appendChild(dojo.doc.createTextNode(dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings").GENERAL.LOADING));
                     
          	   if (shouldShowLoadingTxt) {
          		   dojo.addClass(span, "eeLoadingTxt");
         	      dojo.removeClass(span, "lotusAltText");
         	   }
          	   else {
                  var isA11y = this.isHighContrast();
                  if (isA11y)
                     dojo.removeClass(span, "lotusAltText"); //we want to show the alt text
          	   }
      }
   },
   /* In some cases, we need to know if we are in high contrast before dojo src code loads. */
   isHighContrast: function() {
      var isA11y = false;
      // from Dojo src
      // summary:
      //    Detects if we are in high-contrast mode or not

      // create div for testing if high contrast mode is on or images are turned off
      var div = dojo.create("div",{
         "aria-hidden": "true",
         role: "presentation",
         style:{
            cssText:'border: 1px solid;'
               + 'border-color:red green;'
               + 'position: absolute;'
               + 'height: 5px;'
               + 'top: -999px;'
               + 'background-image: url("' + (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")) + '");'
         }
      }, dojo.body());

      // test it
      var cs = dojo.getComputedStyle(div);
      if(cs){
         var bkImg = cs.backgroundImage;
         isA11y = (cs.borderTopColor == cs.borderRightColor) || (bkImg != null && (bkImg == "none" || bkImg == "url(invalid-url:)" ));
      }
      //dont use destroy as it can cause issues in IE8 in https causing mixed content error message
      if(div){
    	  div.outerHTML = "  ";
      }
      return isA11y;
   },
   processScripts: function(el, response) {
      var start, end, script, html;
      if(el && response) {
         start = response.indexOf("<script>");
         end = response.indexOf("</script>");
         if(end) {
            if(start) script = response.substring((start + 8), end);
            html = response.substring(end + 9, response.length);
            if(html) el.innerHTML = html;
            if(script) dojo.eval(script);
         }
      }
   },
    /**
     * Callback for the promptContentChangedDialog function
     *
     * @callback confirmCloseCallback
     * @param {boolean} confirmClose - 'true' if user clicked 'OK', 'false' if he clicked 'CANCEL'
     */

    /**
     * Displays a confirm dialog when a user has entered some text in a comment box and is trying to leave.
     * @param {function} confirmCloseCallback - function that will be invoked with the result of user's choice
     */
   promptContentChangedDialog: function(confirmCloseCallback){

       var _strings = dojo.i18n.getLocalization("com.ibm.social.incontext", "socialInContextCoreStrings").DIALOG;

       lconn.core.DialogUtil.prompt(_strings.CHANGED_CLOSE_TITLE, _strings.CHANGED_CLOSE_MESSAGE, _strings.OK, _strings.CANCEL, confirmCloseCallback);
   },

    /**
     * Removes links from users inside an HTML string.
     *
     * Usernames in Connections are normally linkified in A tags inside SPAN tags with the vcard class.
     * This method keeps the vcard spans but removes the links (A tags inside).
     *
     * @param {string} htmlString - The HTML string that contains linkified usernames
     * @returns {string} a new HTML string without links on usernames
     */
   removeProfileLinks: function(/* string */ htmlString){

        if(!htmlString){
            return null;
        }

        var dummyNode = dojo.create("div", {innerHTML: htmlString});

        dojo.query("span.vcard > a", dummyNode).forEach(function (node) {

            var text = com.ibm.social.incontext.util.html.htmlText(node);
            // reencode to prevent any XSS issues
            text = dojox.html.entities.encode(text);

            var newNode = dojo.create("span", {innerHTML: text});

            dojo.place(newNode, node, "replace");
        });

        return dummyNode.innerHTML;
   }
};
