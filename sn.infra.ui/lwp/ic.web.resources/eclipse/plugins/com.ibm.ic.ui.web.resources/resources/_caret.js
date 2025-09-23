/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/lang",
        "dojo/_base/window",
        "dojo/dom",
        "dojo/focus",
        "dojo/has"
], function(dojo, lang, windowModule, dom, focusUtil, has) {

   if (!lang.getObject("dijit.form.ComboBoxMixin")) {
      var obj = lang.getObject("dijit.form.ComboBoxMixin.prototype", true);
      /**
       * Adapted from dijit.form.ComboBox.
       */
      obj._getCaretPos = function(/* DomNode */element) {
         // khtml 3.5.2 has selection* methods as does webkit nightlies from
         // 2005-06-22
         var pos = 0;
         if (typeof (element.selectionStart) == "number") {
            // FIXME: this is totally borked on Moz < 1.3. Any recourse?
            pos = element.selectionStart;
         }
         else if (has("ie")) {
            // in the case of a mouse click in a popup being handled,
            // then the dojo.doc.selection is not the textarea, but the popup
            // var r = dojo.doc.selection.createRange();
            // hack to get IE 6 to play nice. What a POS browser.
            var tr = windowModule.doc.selection.createRange().duplicate();
            var ntr = element.createTextRange();
            tr.move("character", 0);
            ntr.move("character", 0);
            try {
               // If control doesnt have focus, you get an exception.
               // Seems to happen on reverse-tab, but can also happen on tab
               // (seems to be a race condition - only happens sometimes).
               // There appears to be no workaround for this - googled for quite
               // a while.
               ntr.setEndPoint("EndToEnd", tr);
               pos = String(ntr.text).replace(/\r/g, "").length;
            }
            catch (ignore) {
               // If focus has shifted, 0 is fine for caret pos.
            }
         }
         return pos;
      };
   }

   /**
    * Reused from dijit.form.TextBox - needs to be separate module
    */
   if (!dijit.selectInputText) {
      dijit.selectInputText = function(/* DomNode */element, /* Number? */start, /* Number? */stop) {
         // summary:
         // Select text in the input element argument, from start (default 0),
         // to stop (default end).

         // TODO: use functions in _editor/selection.js?
         var _window = dojo.global;
         var _document = windowModule.doc;
         element = dom.byId(element);
         if (isNaN(start)) {
            start = 0;
         }
         if (isNaN(stop)) {
            stop = element.value ? element.value.length : 0;
         }
         focusUtil.focus(element);
         if (_document.selection && windowModule.body().createTextRange) { // IE
            if (element.createTextRange) {
               var range = element.createTextRange();
               range.collapse(true);
               range.moveStart("character", -99999); // move to 0
               range.moveStart("character", start); // delta from 0 is the
               // correct position
               range.moveEnd("character", stop - start);
               range.select();
            }
         }
         else if (_window.getSelection) {
            if (element.setSelectionRange) {
               element.setSelectionRange(start, stop);
            }
         }
      };
   }
   return {};
});
