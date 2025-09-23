/* Copyright IBM Corp. 2014, 2018  All Rights Reserved.              */

dojo.provide('lconn.share.widget.BackToTopButton');

dojo.require('lconn.core.svg.svgHelper');
dojo.require('dijit._Widget');

dojo.declare("lconn.share.widget.BackToTopButton", [dijit._Widget], {
   defaultPosition: 150,

   constructor: function(opt) {
      dojo.mixin(this, opt);
   },
   
   buildRendering: function() {
      this.inherited(arguments);
      var d = document;
      var backToTopButton = this.link = d.createElement('a');
         backToTopButton.title = this.text;
         dojo.addClass(backToTopButton, "lconnBackToTop");
         lconn.core.svg.svgHelper.loadIcon(backToTopButton, "backToTopIcon");
         backToTopButton.onclick = dojo.hitch(this, "scrollToTop");
         
     this.domNode.appendChild(backToTopButton);
     this.domNode.addEventListener("scroll", dojo.hitch(this, "checkScroll"));
   },
   
   scrollToTop: function(e) {
      dojo.stopEvent(e);
      this.domNode.scrollTop = 0;
   },
   
   checkScroll: function() {
      var p = this.position || this.defaultPosition;
      if(this.domNode.scrollTop > p) {
         dojo.addClass(this.link, "lconnScrollBack");
      }
      else {
         dojo.removeClass(this.link, "lconnScrollBack");
      }
   }
});