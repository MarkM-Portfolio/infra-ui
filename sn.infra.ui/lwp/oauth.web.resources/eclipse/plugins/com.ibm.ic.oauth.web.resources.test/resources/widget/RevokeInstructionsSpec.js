/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-oauth/widget/RevokeInstructions",
   "dojo/dom-construct",
   "ic-core/util/html"
], function (RevokeInstructions, domConstruct, htmlUtil) {

   /**
    * Jasmine spec for RevokeInstructions widget
    * @module ic-oauth-test.widget.RevokeInstructionsSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the RevokeInstructions widget", function() {
      var widget, STRINGS = {
            link: 'A link',
            blurb: 'Some text ${0}',
            link_title: 'Link title'
      }, URL = 'https://www.ibm.com';
      function getBlurb(url, strings) {
         var SUBSTITUTION = /\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g;
         var div = domConstruct.create('div');
         htmlUtil.substitute(document, div, strings.blurb, {
            0: function() {
               var a = domConstruct.create("a", {
                  href: url,
                  title: strings.link_title,
                  target: "_blank"
               }, null, this);
               a.appendChild(document.createTextNode(strings.link));
               return a;
            }
         }, null, null, SUBSTITUTION);
         return div.innerHTML;
      }
      beforeEach(function(){
         widget = new RevokeInstructions();
      });
      describe("prototype", function() {
         it('implements the expected methods', function() {
            expect(widget.update).toEqual(jasmine.any(Function));
         });
         it('has the expected properties', function() {
            expect(widget.url).toBeDefined();
            expect(widget.strings).toBeDefined();
         });
      });
      describe("update() method", function() {
         it('doesn\'t throw when called without arguments', function() {
            expect(function(){widget.update();}).not.toThrow();
         });
         it('updates the view when called with arguments', function() {
            widget.update({
               url : URL,
               strings : STRINGS
            });
            expect(widget.blurbNode.innerHTML.indexOf(STRINGS.link)).not.toBe(-1);
            expect(widget.blurbNode.innerHTML.indexOf(STRINGS.link_title)).not.toBe(-1);
            expect(widget.blurbNode.innerHTML).toBe(getBlurb(URL, STRINGS));
         });
      });
   });
});
