/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
      "dojo",
      "dojo/on",
      "dojo/has",
      "dojo/_base/window",
      "dojo/i18n",
      "dojo/dom",
      "dojo/i18n!ic-core/upload/nls/upload",
      "dojo/_base/lang",
      "dojo/dom-construct",
      "dojo/dom-class",
      "dojo/query",
      "ic-core/swfupload/SWFUpload"
],
   function(dojo, on, has, windowModule, i18n, dom, i18nupload, lang, domConstruct, domClass, query, SWFUploadModule) {

      var nls = i18nupload;

      var SWFUpload = SWFUploadModule;

      SWFUpload.a11y = {};

      SWFUpload.prototype.initSettings = (function(oldInitSettings) {
         return function() {

            if (lang.isFunction(oldInitSettings)) {
               oldInitSettings.call(this);
            }

            this.a11ySettings = {};

            this.a11ySettings.userKeyPress = this.settings.key_pressed;
            this.settings.key_pressed = SWFUpload.a11y.handleKeyPress;
         }
      })(SWFUpload.prototype.initSettings);

      SWFUpload.prototype.loadFlash = (function(oldLoadFlash) {
         return function() {
            if (lang.isFunction(oldLoadFlash)) {
               oldLoadFlash.call(this);
            }

            var movie = this.movieElement;
            if (movie) {
               domClass.add(movie, 'lconnInvisibleMovie');
               dojo.removeAttr(movie, "width");
               dojo.removeAttr(movie, "height");
               var parent = movie.parentNode;
               this.a11y_input = domConstruct.create('button', {
                  'type' : 'button',
                  'className' : 'lotusBtn lconnFocusHelper',
                  id : this.movieName + "_a11y"
               });
               this.a11y_input.appendChild(windowModule.doc.createTextNode(this.customSettings.htmlButtonText
                     || (has("webkit") ? nls.BUTTON_TEXT_WEBKIT : nls.BUTTON_TEXT)));
               parent.insertBefore(this.a11y_input, movie);

               on(this.a11y_input, "focus", lang.hitch(this, "focusMovie"));
            }
         }
      })(SWFUpload.prototype.loadFlash);

      SWFUpload.prototype.focusMovie = function() {
         var movie = this.getMovieElement();
         if (movie) {
            movie.tabIndex = 0;
            this.a11y_input.tabIndex = -1;
            dijit.focus(movie);
         }
      };

      SWFUpload.a11y.handleKeyPress = function(event) {
         if (event.keyCode == dojo.keys.TAB) {
            var containerNode = dom.byId(this.customSettings.containerNode) || windowModule.body();
            // get all focusable nodes
            var nodes = query("*", containerNode).filter(dijit.isTabNavigable);

            var i = -1;
            for (i = 0; i < nodes.length; ++i) {
               var n = nodes[i];
               if (n.id == this.movieName) {
                  break;
               }
            }

            var next = null;
            var counter = 0;
            while (next == null && counter < nodes.length) {
               if (event.shiftKey) {
                  next = i ? nodes[i - 1] : nodes[nodes.length - 1];
               }
               else {
                  next = (i == nodes.length - 1) ? nodes[0] : nodes[i + 1];
               }

               // avoid an infinite focus loop
               if (next.id == this.a11y_input.id) {
                  next = null;

                  if (event.shiftKey) {
                     i = i ? i - 1 : nodes.length - 1;
                  }
                  else {
                     i = (i == nodes.length - 1) ? 0 : i + 1;
                  }

                  ++counter;
               }
            }
            if (next)
               next.focus();
         }
         else {
            _simulateKeyEvent(this.a11y_input, event);
         }
      };

      var _simulateKeyEvent = function(targetNode, event) {
         var fauxEvent = null;

         if (has("ie")) {
            fauxEvent = windowModule.doc.createEventObject();
            fauxEvent.ctrlKey = event.ctrlKey;
            fauxEvent.altKey = event.altKey;
            fauxEvent.shiftKey = event.shiftKey;
            fauxEvent.metaKey = event.metaKey;
            fauxEvent.keyCode = event.keyCode;
            fauxEvent.charCode = event.charCode;

            targetNode.fireEvent("onkeypress", fauxEvent);
         }
         else {
            fauxEvent = windowModule.doc.createEvent("KeyboardEvent");

            var initFn = has("mozilla") ? fauxEvent.initKeyEvent : fauxEvent.initKeyboardEvent;
            initFn.call(fauxEvent,
               "keypress",
               true,
               true,
               dojo.global,
               event.ctrlKey,
               event.altKey,
               event.shiftKey,
               event.metaKey,
               event.keyCode,
               event.charCode);

            targetNode.dispatchEvent(fauxEvent);
         }
      };
      return SWFUpload.a11y;
   });
