/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo",
   "dojo/_base/array",
   "dojo/_base/lang",
   "dojo/_base/window",
   "dojo/dom-attr",
   "dojo/dom-geometry",
   "dojo/has",
   "dojo/query",
   "dojo/string",
   "dojo/topic",
   "lconn/core/globalization/bidiUtil"
], function (dojo, array, lang, windowModule, domAttr, domGeometry, has, query, string, topic, bidiUtil) {

   var htmlUtil = {

      getDirectionCode: function() {
         // Return the unicode control char for &rlm; when in RTL-mode
         // This character is inserted in front of neutral characters, like "X" or ","
         // when they should be displayed in RTL mode (for example, when they are used as item
         // separators or filter close links
         return domGeometry.isBodyLtr() ? "" : "\u200F";
      },

      destroyWidgets: function(el) {
         if (el && el.nodeType != 11) {
            var list = query('[widgetId]', el).map(dijit.byNode);
            array.forEach(list, function(w) {if (w) w.destroyRecursive();});
         }
      },
      removeChildren: function(el) {
         if (!el) return;
         this.destroyWidgets(el);
         while (el.firstChild) el.removeChild(el.firstChild);
      },

      isEvent: function(e) {
         return (e && (typeof e.target != "undefined" || typeof e.bubbles != "undefined"));
      },

      append: function(el, contents) {
         var d = document;
         if (lang.isArray(contents))
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
               c += (domAttr.get(td, "colSpan") || 1);
            td = td.nextSibling;
         }
         return c;
      },

      formatFilename: function(s) {
         // This has to be a no-op when we are in LTR mode
         // In theory, we could do the same thing in any mode, but the default LTR-language Windows install
         // is missing the fonts needed to use Unicode control characters in the browser title bar and tooltips
         if(dojo._isBodyLtr())
            return this.encodeMultiSpaces(s);

         // Force filenames to LTR mode using Unicode control characters
         // See http://www.w3.org/TR/i18n-html-tech-bidi/#ri20060623.095429759 for details
         return "\u202A" + this.encodeMultiSpaces(s) + "\u202C";
      },

      /**
       * Write a string to the DOM such that there are the maximum number of sequential non-breakable (by the browser) characters is
       * breakLength (defaults to 10).
       */
      breakString: function(s, d, el, breakLength) {
         if (!s)
            return;
         breakLength = breakLength || 10;
         var b = new RegExp("[^\\s]{"+(breakLength+1)+"}", "g");
         var r;
         var start=0,end;
         if (has("ie") || has("webkit"))
            while (r = b.exec(s)) {
               end = --b.lastIndex;

               // If the terminating character is a high surrogate, increment the end to grab the low surrogate
               var code = s.charCodeAt(end-1);
               if (code >= 55296 && code < 56192)
                  end++;
               //fix for PMR 04794,999,856, Thailand string 'à¸„à¸³' is recognized as 2 characters in javascript
               if (code == 3588)
                  end++;
               //fix for IC 91730, when splitting R2 characters, do so in groups of three
               for (var i=0; i < s.length - 2; i++) {
                  if (s.charCodeAt(i) == 3619 && s.charCodeAt(i+1) == 3639 && s.charCodeAt(i+2) == 3656) {
                     end = 9;
                     break;
                  } else {
                     el.appendChild(d.createElement("wbr"));
                  }
               }
               el.appendChild(d.createTextNode(s.substring(start, end)));
               start = end;
            }
         else
            while (r = b.exec(s)) {
               end = --b.lastIndex;

               // If the terminating character is a high surrogate, increment the end to grab the low surrogate
               var code = s.charCodeAt(end-1);
               if (code >= 55296 && code < 56192)
                  end++;
               //fix for PMR 04794,999,856, Thailand character 'à¸„à¸³' is recognized as 2 characters in javascript
               if (code == 3588)
                  end++;
               //fix for IC 91730, when splitting R2 characters, do so in groups of three
               for (var i=0; i < s.length - 2; i++) {
                  if (s.charCodeAt(i) == 3619 && s.charCodeAt(i+1) == 3639 && s.charCodeAt(i+2) == 3656) {
                     end = 9; //Instead of end = 10. This allows the substring to break at the end of the
                           //group of 3 unicodes required to make an R2 character.
                     break;
                  } else {
                     el.appendChild(d.createElement("wbr"));
                  }
               }
               el.appendChild(d.createTextNode(s.substring(start, end)+"\u200B"));
               start = end;
            }
         el.appendChild(d.createTextNode(s.substring(end)));
         return el;
      },

      encodeHtmlAttribute: function(s) {
         return this.encodeHtml(s).replace(/\"/g,"&quot;");
      },

      encodeHtml: function(s) {
         if (!s) return "";
         var e = this._encoder;
         if (!e) e = this._encoder = windowModule.doc.createElement("div");
         e.innerHTML = "";
         e.appendChild(windowModule.doc.createTextNode(s));
         return e.innerHTML;
      },

      decodeHtml: function(s) {
         if (!s) return "";
         var e = this._encoder;
         if (!e) e = this._encoder = windowModule.doc.createElement("div");
         e.innerHTML = s;
         return e.lastChild.nodeValue;
      },

      getFrameDocument: function(frame) {
         var frameDocument;
         if (frame) {
            try {
               if (has("ie") || has("safari") > 2) {
                  frameDocument = frame.contentWindow.document;
               } else if (has("safari")) {
                  frameDocument = frame.document;
               } else { //  if(d.isMozilla){
                  frameDocument = frame.contentWindow.document;
               }
            } catch (e) {}
         }
         return frameDocument;
      },

      UNICODE_SPACE: /[\s\u3000]/g,
      UNICODE_DOUBLE_SPACE: /[\s\u3000]{2}/g,
      encodeSpaces: function(s) {
         if(!s) return s;
         return s.replace(this.UNICODE_SPACE, "\u00a0");
      },
      encodeMultiSpaces: function(s) {
         if(!s) return s;
         return s.replace(this.UNICODE_DOUBLE_SPACE, " \u00a0");
      },

      htmlText: function(el) {
         if (!el)
            return null;
         var a = [];
         for (var j=0; c=el.childNodes[j]; j++)
            if (c.nodeType == 3)
               a.push(c.nodeValue);
         return a.length > 0 ? a.join("") : null;
      },

      SUBSTITUTION: /\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
      substitute: function(d, el, template, map, transform, thisObject, sub) {
         var re = sub || this.SUBSTITUTION;
         el = el || d.createDocumentFragment();
         var last = 0;
         while (r = re.exec(template)) {
            el.appendChild(d.createTextNode(template.substring(last,r.index)));
            last = r.index+r[0].length;
            var key = r[1];
            var format = r[2];
            var value = lang.getObject(key,false,map);
            if (typeof value == "function")
               value = value.apply(thisObject || map, [key, format]);
            if(format){ value = lang.getObject(format,false,thisObject)(value);}
            if(transform){ value = transform(value, key); }
            if (typeof value != "undefined" && value != null) {
              if (value.nodeType > 0) {
                 value.style.direction = bidiUtil.getTextDirection(value.textContent);
                 value.dir = value.style.direction;
                 value.style.textAlign = "inherit";
                 el.appendChild(value);
              } else {
                 value = bidiUtil.enforceTextDirection(value.toString());
                 el.appendChild(d.createTextNode(value.toString()));
              }
            }
         }
         el.appendChild(d.createTextNode(template.substring(last)));
         return el;
      },

      EMBEDDED_URL_PATTERN: /(^|[\s])(([a-zA-Z]+:\/\/|www\.|mailto:)[^\s]+)/i,
      URL_PUNCTUATION_BACKTRACK: /[\.,\!;\:\'\"]+$/,
      createTextNode: function(d, el, text, skipLineBreaks) {
         if (!text)
            return;
         text = lang.trim(text);
         if (text.length > 0) {
            var sections = text.split("\u000A");
            array.forEach(sections, lang.hitch(this, function(text, i, arr) {
               var match,backtrack;
               while (match = this.EMBEDDED_URL_PATTERN.exec(text)) {
                  var previous = text.substring(0,match.index) + match[1];

                  var baseHref = match[2];
                  if (backtrack = this.URL_PUNCTUATION_BACKTRACK.exec(baseHref))
                     baseHref = baseHref.substring(0,backtrack.index);
                  text = text.substring(previous.length+baseHref.length);

                  var isWWW = (match[3] && match[3].toLowerCase() == "www.");
                  var isMailto = (match[3] && match[3].toLowerCase() == "mailto:");
                  var href = isWWW ? "http://"+baseHref : baseHref;
                  if (isMailto)
                     baseHref = baseHref.substring(7);

                  if (previous.length > 0)
                     this.breakString(previous, d, el, 15);
                     //el.appendChild(d.createTextNode(previous));

                  var a = d.createElement("a");
                     a.href = href;
                     this.breakString(baseHref, d, a, 15);
                     //a.appendChild(d.createTextNode(baseHref));
                  el.appendChild(a);
               }
               if (text.length > 0)
                  this.breakString(text, d, el, 15);
                  //el.appendChild(d.createTextNode(text));
               if (i < arr.length - 1)
                  el.appendChild(!skipLineBreaks ? d.createElement("br") : d.createTextNode(" "));
            }));
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
            else if (has("safari"))
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
                     if (n == "onclick" && has("ie"))
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
                  this.xhtmlToHtml(d, x, e, false, ids);
                  break;
               case 3:
                  switch(n) {
                     case "script":
                        if(has("ie"))
                           html.text = x.nodeValue;
                        else
                           html.appendChild(d.createTextNode(x.nodeValue));
                        break;
                     case "style": // TODO: safari won't interpret <style> tags in the body
                        if(has("ie"))
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

      /**
       * Checks that the current browser supports feeds before opening a link
       */
      checkFeedSubscription: function(msg, url, e) {
         // TODO: augment this list
         if (has("safari") < 2 || has("chrome")) {
            if (e)
               e.preventDefault(), e.stopPropagation();
            htmlUtil.confirm(msg, function() {
               window.location = url;
            });
         }
      },

      /**
       * Highlights all occurrences of tokens of key into the string passed as
       * first argument. Uses the &lt;b&gt; tag unless another tag is specified
       * as third argument.
       * 
       * @param {String}
       *           string The string to highlight
       * @param {String}
       *           key A string of search tokens
       * @param {Boolean}
       *           [encode] Set to true if you want an encoded result
       * @param {String}
       *           [tag] A tag name to use to highlight
       * @returns The highlighted string
       */
      highlight : function(string, key, encode, tag) {
         var haystack = string.toLowerCase();
         var needles = key.toLowerCase();
         tag = tag || "b";
         var fn = encode ? this.encodeHtml : function(s){return s};

         var startIdx = 0;
         var match = null;

         // Originally changed from Files:
         // Changed algorithm to highlight matches that are not substring (i.e. typing "derek carr"
         // does not highlight the "carr" in "DEREK W. CARR" because of the "W."). Also appending
         // to an array and then calling join is more efficient than string concatenation.
         var keySegments = needles.split(/\s/);
         var sbf = [];

         for (var i = 0; i < keySegments.length; i++) {
            var s = keySegments[i];
            var match = haystack.indexOf(s, startIdx);
            if (match != -1) {
               sbf.push(fn(string.substring(startIdx, match)));
               sbf.push("<" + tag + ">");
               sbf.push(fn(string.substring(match, match + s.length)));
               sbf.push("</" + tag + ">");
               startIdx = match + s.length;
            }
         }
         sbf.push(fn(string.substring(startIdx)));

         return sbf.join("");
      }
   };

   return htmlUtil;
});
