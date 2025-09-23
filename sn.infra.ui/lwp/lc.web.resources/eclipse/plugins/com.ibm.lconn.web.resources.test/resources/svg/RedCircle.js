/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.svg.RedCircle");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

/**
 * This is a proof of concept of inlining SVG graphics into a Dijit template.
 * <ol>
 * <li>The aggregator inlines the SVG file and the HTML template requested with
 * the <code>dojo.moduleUrl()</code> API</li>
 * <li>The dijit loads the template and replaces the placeholder with the SVG
 * contents</li>
 * </ul>
 * Note that the placeholder has an exclamation mark ${!svg} cause it must not
 * be escaped to be safe in an attribute value.
 * 
 * @class lconn.test.svg.RedCircle
 * @extends dijit._Widget
 * @extends dijit._Templated
 */
dojo.declare("lconn.test.svg.RedCircle", [dijit._Widget, dijit._Templated],
      /** @lends lconn.test.svg.RedCircle.prototype */ {
   templatePath: dojo.moduleUrl("lconn.test", "svg/red-circle.html"),
   svgTemplate: {
      /*
       * This is a hack: Jazz will resolve and inline via <code>dojo.cache()</code>
       * any resource linked with the signature <code>templatePath:
       * dojo.moduleUrl()</code>
       */
      templatePath: dojo.moduleUrl("lconn.test", "svg/red-circle.svg"),
   },
   postMixInProperties: function() {
      this.svg = dojo.cache("lconn.test", "svg/red-circle.svg");
   }
});
