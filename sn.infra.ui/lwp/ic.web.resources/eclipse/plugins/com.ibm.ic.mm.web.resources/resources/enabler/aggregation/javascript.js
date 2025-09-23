/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/request"
], function(dojo, declare, lang, request) {

   function com_ibm_enabler_aggregation_javascript_globalEvalNonIE( /* String */javascript) {
      // summary: Evaluates a string of javascript in the global scope.
      // description: Calling eval.call( self, ... ); from within a JS object
      // apparently makes "this" point to the object from which the
      // eval call was made even though the scope is set using the "call"
      // function. Therefore we need to have this function
      // available in the global scope and not as a member variable on a JS
      // object.
      eval.call(self, javascript);
   }

   var Filter = declare("com.ibm.mm.enabler.aggregation.javascript.Filter", null, {
      // summary: Base interface for a filter. Each implementation must
      // implement
      // the doFilter function.
      // description: Passes the given event through to give the implementation
      // of
      // this filter a chance to alter or handle the event in some way.

      doFilter : function( /* String or HTMLElement */script) {
      // summary: Filter the given event.
      // description: Allows this filter to handle or alter the event. If this
      // function
      // returns true, processing is stopped and the event is considered
      // "handled".
      // script: the script block (string or HTMLElement)
      // dojo.unimplemented(
      // "com.ibm.mm.enabler.aggregation.JavascriptFilter.doFilter" );
      },
      evalGlobal : function( /* String */javascript) {
         // summary: Evaluates the given javascript in the global context.
         // javascript: a string of javascript to evaluate.
         if (window.execScript) {
            window.execScript(this._stripHTMLComments(javascript), "JavaScript");
         }
         else {
            // Using eval.call( window, javascript ) was apparently not really
            // eval'ing
            // in the global scope since 'this' was still referring to the
            // Filter object
            // and not the window object as it should have (or I think it should
            // have)...
            com_ibm_enabler_aggregation_javascript_globalEvalNonIE(javascript);
         }
      },
      _stripHTMLComments : function(str) {
         // summary: Strip all HTML comments from a script block.
         // description: Although HTML comments are allowed in a script block by
         // the browser
         // IE throws up whenever you try and eval a javascript string in the
         // global context
         // that has HTML comments in the string.
         com.ibm.mm.enabler.debug.entry("com.ibm.mm.enabler.aggregation.javascript.Filter._stripHTMLComments", str);

         var resultStr = "";
         var startIndex = str.indexOf("<!--");

         if (startIndex != -1) {
            resultStr = str.substring(0, startIndex);
         }
         else {
            resultStr = str;
         }

         while (startIndex >= 0) {
            var endIndex = str.indexOf("-->");
            if (endIndex < 0) {
               // no closing tag found for the comment, something's wrong
               throw new Error("Unclosed HTML comment found!!");
            }
            resultStr += str.substring(endIndex + 3);
            com.ibm.mm.enabler.debug.log("com.ibm.mm.enabler.aggregation.javascript.Filter._stripHTMLComments", "result str = " + resultStr);
            startIndex = str.indexOf("<!--", endIndex + 3);
         }

         com.ibm.mm.enabler.debug.exit("com.ibm.mm.enabler.aggregation.javascript.Filter._stripHTMLComments", resultStr);

         return resultStr;
      },
      prepareDocumentWrite : function(buffer) {
         // summary: Prepares support for document.write() and document.writeln
         // description: Overrides the original document.write() and
         // document.writeln()
         // functions with functions writing to the buffer
         com.ibm.mm.enabler.debug.entry("com.ibm.mm.enabler.aggregation.javascript.Filter.prepareDocumentWrite");
         var me = this;
         document.write = function() {
            me._documentWrite(buffer, document.write.arguments);
         };
         document.writeln = function(str) {
            me._documentWrite(buffer, document.writeln.arguments);
         };
         com.ibm.mm.enabler.debug.exit("com.ibm.mm.enabler.aggregation.javascript.Filter.prepareDocumentWrite");
      },
      _documentWrite : function(buffer, /* String[] */args) {
         // summary: Internal document.write() function writing to the given
         // buffer
         // description: Just appends the given String arguments to our buffer
         for (var i = 0; i < args.length; i++) {
            buffer.content += args[i];
         }
      },
      applyDocumentWrite : function( /* HTMLElement */script, buffer) {
         // summary: Injects the markup in the given buffer into the DOM
         // description: Looks up the script element in the original DOM
         // and injects the markup before that element
         com.ibm.mm.enabler.debug.entry("com.ibm.mm.enabler.aggregation.javascript.Filter.applyDocumentWrite", script, buffer.content);
         var cont = buffer.content;
         var id = script.getAttribute("id");
         var realScript = document.getElementById(id);
         if (cont != null && cont.length > 0) {
            var div = document.createElement("DIV");
            div.innerHTML = cont;
            var children = div.childNodes;
            if (children != null && children.length > 0) {
               // copy the nodes over into the DOM
               var pred = realScript;
               for (var i = 0; i < children.length;) {
                  var node = children[children.length - 1];
                  // we need to inject the markup before the script element
                  // to properly handle table updates
                  dojo.dom.insertBefore(node, pred);
                  pred = node;
               }
            }
            dojo.dom.destroyNode(div);
         }
         // remove id attribute if it is an internal id
         // if (typeof(id)!="undefined" && id!=null && id.indexOf("_scr#") == 0)
         // {
         // defect 187082 - IE doesn't like it when we remove the id from the
         // script element.
         // realScript.removeAttribute("id");
         // }
         com.ibm.mm.enabler.debug.exit("com.ibm.mm.enabler.aggregation.javascript.Filter.applyDocumentWrite");
      }
   });

   var ExternalScriptFilter = declare("com.ibm.mm.enabler.aggregation.javascript.ExternalScriptFilter", Filter, {
      doFilter : function( /* HTMLElement */script) {
         // summary: Filter the given event.
         // description: Allows this filter to handle or alter the event. If
         // this function
         // returns true, processing is stopped and the script is considered
         // "handled".
         // script: the script block (HTMLElement)

         var url = this._getScriptUrl(script);

         var handled = false;

         if (url) {
            // check if the AJAX proxy is enabled
            var proxyURL = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.PROXY_URL);
            if (proxyURL != null) {
               proxyURL += "/";
               url = this._rewriteURL(url, proxyURL);
            }
            // prepare buffer for document.write/ln
            var buffer = {
               content : ""
            };
            this.prepareDocumentWrite(buffer);
            this._loadExternalScript(url);
            // apply document.write/ln to DOM
            this.applyDocumentWrite(script, buffer);
            handled = true;
         }

         return handled;
      },
      _getScriptUrl : function( /* HTMLElement */script) {
         // summary: Retrieve the src attribute value of a script tag if it
         // exists.
         // returns: the url for the script tag or null if the script tag
         // doesn't specify a URL
         var url = null;

         if (script.getAttribute) {
            url = script.getAttribute("src");
         }
         else {
            var start = script.toLowerCase().indexOf("<script");
            var end = script.toLowerCase().indexOf(">");

            var scriptTagSubstr = script.substring(start, end);
            var srcIndex = scriptTagSubstr.toLowerCase().indexOf("src");

            if (srcIndex != -1) {
               // figure out whether it's a src='blah' or src="blah"
               var quoteIndex = scriptTagSubstr.indexOf("'", srcIndex);
               var dblQuoteIndex = scriptTagSubstr.indexOf('"', srcIndex);
               var markerChar = '"';
               var markerIndex = dblQuoteIndex;
               if (dblQuoteIndex == -1 || (quoteIndex != -1 && quoteIndex < dblQuoteIndex)) {
                  markerChar = "'";
                  markerIndex = quoteIndex;
               }
               var markerIndex2 = scriptTagSubstr.indexOf(markerChar, markerIndex + 1);
               url = scriptTagSubstr.substring(markerIndex + 1, markerIndex2);
            }
         }

         return url;
      },
      _loadExternalScript : function( /* String */url) {
         var me = this;
         request(url, {
            method : "GET",
            sync : true,
            handleAs : "text"
         }).then(function(data, ioArgs) {
            com.ibm.mm.enabler.debug.log("com.ibm.mm.enabler.aggregation.javascript.Filter._loadExternalScript", "Retrieved JS file: ", data);
            me.evalGlobal(data);
         });
      },
      _rewriteURL : function(/* String */targetUrl, /* String */proxyUrl) {
         var newURL = proxyUrl;
         var host = window.location.host;
         var protocol = window.location.protocol;

         // check if this is a proxy request:
         if (targetUrl.indexOf("://") < 0 || targetUrl.indexOf(protocol) == 0 && targetUrl.indexOf(host) == protocol.length + 2) {
            return targetUrl;
         }

         // Don't need to use proxy for css files
         var extension = (new com.ibm.mm.enabler.iw.services.loadService)._getExtension(targetUrl);
         if (extension !== null && extension === "css") {
            return targetUrl;
         }

         // rewrite
         if (targetUrl.indexOf("https") == 0)
            newURL += "https/";
         else
            newURL += "http/";

         newURL += targetUrl.substr(targetUrl.indexOf("://") + 3);
         return newURL;
      }
   });

   var InlineScriptFilter = declare("com.ibm.mm.enabler.aggregation.javascript.InlineScriptFilter", Filter, {
      doFilter : function( /* HTMLElement */script) {
         // summary: Filter the given event.
         // description: Allows this filter to handle or alter the script. If
         // this function
         // returns true, processing is stopped and the script is considered
         // "handled".
         // script: the script block (HTMLElement)

         var handled = false, tokenContents = "";

         if (!lang.isString(script)) {
            // Use innerHTML because IE doesn't correctly provide the
            // textContent for a script tag.
            tokenContents = script.innerHTML;
         }
         else {
            var firstIndex = scriptStr.indexOf(">");
            var lastIndex = scriptStr.lastIndexOf("<");
            var scriptStr = script;
            tokenContents = scriptStr.substring(firstIndex + 1, lastIndex);
         }

         com.ibm.mm.enabler.debug.log("com.ibm.mm.enabler.aggregation.javascript.InlineScriptFilter.doFilter",
            "Stripped HTML tags out: " + tokenContents,
            "processScriptArray");
         if (tokenContents) {
            // prepare buffer for document.write/ln
            var buffer = {
               content : ""
            };
            this.prepareDocumentWrite(buffer);
            // Eval the contents
            this.evalGlobal(tokenContents);
            handled = true;
            // apply document.write/ln to DOM
            this.applyDocumentWrite(script, buffer);
         }

         return handled;
      }
   });

   declare("com.ibm.mm.enabler.aggregation.javascript.FilterChain", null, {
      constructor : function() {
         this._filters = new Array();
      },
      // summary: Controls the registration and execution of the filters
      // associated
      // with this filter chain.

      addFilter : function(filter) {
         // summary: Register a filter at the end of the filter chain.
         // filter: the filter to append
         if (!this._filters) {
            this._filters = new Array();
         }
         this._filters.push(filter);
      },
      applyFilters : function(script) {
         // summary: Execute the filter chain.
         // description: Calls doFilter on every filter registered in this
         // filter chain
         // until all filters have been called or one of the filters returns
         // true.
         // e: the event object
         // returns: true if the event was handled, false if it was not
         var i = 0;
         var returnValue = false;
         while (i < this._filters.length && !returnValue) {
            returnValue = this._filters[i].doFilter(script);
            i = i + 1;
         }

         return returnValue; // Boolean
      }
   });

   var WidgetJavascriptHandler = declare("com.ibm.mm.enabler.aggregation.javascript.WidgetJavascriptHandler", null, {
      constructor : function() {
         this.filterChain = new com.ibm.mm.enabler.aggregation.javascript.FilterChain();
      },
      // summary: Examines all javascript included by a widget, modifies it if
      // necessary and evaluates it in the global context.
      // description: All script elements must be loaded manually since the
      // widget
      // markup is added asynchronously. This handler will evaluate a script
      // element in the global context or load an external script file if
      // necessary.

      handle : function(script) {
         // summary: Handles a script element added asynchronously.
         // script: the script element
         com.ibm.mm.enabler.debug.entry("WidgetJavascriptHandler.handle", script);

         var val = this.filterChain.applyFilters(script);

         com.ibm.mm.enabler.debug.exit("WidgetJavascriptHandler.handle");
      }
   });

   com.ibm.mm.enabler.aggregation.javascript.JAVASCRIPT_HANDLER = new WidgetJavascriptHandler();

   // Register the filters. The order registered is the order executed.
   com.ibm.mm.enabler.aggregation.javascript.JAVASCRIPT_HANDLER.filterChain.addFilter(new ExternalScriptFilter());
   com.ibm.mm.enabler.aggregation.javascript.JAVASCRIPT_HANDLER.filterChain.addFilter(new InlineScriptFilter());

   return com.ibm.mm.enabler.aggregation.javascript;
});
