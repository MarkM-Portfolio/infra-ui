/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.widget.RevokeInstructions");
dojo.require("lconn.core.util.html");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

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
 * @name lconn.oauth.widget.RevokeInstructions
 * @extends dijit._Widget
 * @extends dijit._Templated
 */
dojo.declare("lconn.oauth.widget.RevokeInstructions", [ dijit._Widget, dijit._Templated ], /** @lends lconn.oauth.widget.RevokeInstructions.prototype */ {
   templatePath: dojo.moduleUrl("lconn.oauth", "widget/templates/RevokeInstructions.html"),
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
      dojo.mixin(this, opt);
      this.blurbNode.innerHTML = "";
      
      var d = document;
      var o = this;
      // lconn.core.util.html.substitute require placeholder starting with "$" by default, like "${0}"
      // but the placeholder of oauth resource strings is like "{0}", and we have no chance to update resource file for 4.0
      // so define SUBSTITUTION template for oauth string replacement
      var SUBSTITUTION = /\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g;
  
      lconn.core.util.html.substitute(document, this.blurbNode, this.strings.blurb, {
         0: function() {
            var a = dojo.create("a", {
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
