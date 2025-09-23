/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-construct",
   "dojo/text!./templates/RevokeInstructions.html",
   "dijit/_Templated",
   "dijit/_Widget",
   "ic-core/util/html"
], function (declare, lang, domConstruct, template, _Templated, _Widget, html) {

   /**
    * Displays instructions to revoke an authorization.
    * Implementors must mix in the following properties:
    * <pre>
    *     strings: {
    *        blurb: "The text of the instructions, with a placeholder for the link text, like this: {0}.",
    *        link:  "The text of the link",
    *        link_title: "The title of the link"
    *     },
    *     url: "http://example.com/path/to/resource"
    * </pre>
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @class
    * @name ic-oauth.widget.RevokeInstructions
    * @extends dijit._Widget
    * @extends dijit._Templated
    */
   var RevokeInstructions = declare("lconn.oauth.widget.RevokeInstructions", [ _Widget, _Templated ], /** @lends ic-oauth.widget.RevokeInstructions.prototype */ {
      templateString: template,
      strings: {
            blurb:      "",
            link:       "",
            link_title: ""
      },
      url: null,
   
      /**
       * Updates the widget with instructions
       * @param {Object} [opt] Options
       */
      update: function(opt) {
         lang.mixin(this, opt);
         this.blurbNode.innerHTML = "";
         
         var d = document;
         var o = this;
         // core.util.html.substitute require placeholder starting with "$" by default, like "${0}"
         // but the placeholder of oauth resource strings is like "{0}", and we have no chance to update resource file for 4.0
         // so define SUBSTITUTION template for oauth string replacement
         var SUBSTITUTION = /\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g;
     
         html.substitute(document, this.blurbNode, this.strings.blurb, {
            0: function() {
               var a = domConstruct.create("a", {
                  href: o.url,
                  title: o.strings.link_title,
                  target: "_blank"
               }, null, this);
               a.appendChild(d.createTextNode(o.strings.link));
               return a;
            }
         }, null, null, SUBSTITUTION);
      }
   });
   return RevokeInstructions;
});
