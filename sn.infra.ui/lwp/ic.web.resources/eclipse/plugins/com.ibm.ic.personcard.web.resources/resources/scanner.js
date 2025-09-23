/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "dojo/dom-class",
      "dojo/on",
      "ic-ui/ResourceLink"
], function(lang, domClass, on, ResourceLink) {

   /**
    * Simple scanner class to ensure that people links are enabled for live
    * names. Requires that the link references an OSLC provider, or that a
    * provider has been registered with com.ibm.oneui.controls.ResourceLink that
    * will initialize the link. Provided as an example of a drop in replacement
    * for the Lotus Connections 3.0 person card. May require additional
    * functionality in more complicated integration scenarios.
    */

   var testableNodes = {
      a : 1,
      A : 1,
      img : 1,
      IMG : 1
   /*
    * span: 1, SPAN: 1
    */
   }

   require([ 'dojo/domReady!'
   ], function() {
      on(document.body, "mouseover", function(e) {
         var target = e.target;
         if (!testableNodes[target.nodeName] || target._scanned)
            return;
         target._scanned = true;
         if (domClass.contains(target, "lotusPerson")) {
            var w = add(target);
            w.popup._hover(e);
            return;
         }
         var parent = target.parentNode;
         if (parent && domClass.contains(parent, "lotusPerson")) {
            parent._scanned = true;
            var w = add(parent);
            w.popup._hover(e);
         }
      });
   });

   function scan(target, e) {}

   function add(el) {
      return new ResourceLink({}, el);
   }

   window.SemTagSvc = lang.mixin(window.SemTagSvc, {
      onTagChanged : add
   });
});
