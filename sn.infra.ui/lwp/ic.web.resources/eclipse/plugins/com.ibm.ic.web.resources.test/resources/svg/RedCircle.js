/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   'dojo/_base/declare',
   'dijit/_WidgetBase',
   'dijit/_TemplatedMixin',
   'dojo/text!./red-circle.svg',
   'dojo/text!./red-circle.html'
   ], function(declare, _WidgetBase, _TemplatedMixin, svg, template) {

   /**
    * This is a proof of concept of inlining SVG graphics into a Dijit template.
    * <ol>
    * <li>The aggregator inlines the SVG file and the HTML template requested
    * with the <code>dojo/text!</code> plugin</li>
    * <li>The dijit loads the template and replaces the placeholder with the
    * SVG contents</li>
    * </ul>
    * Note that the placeholder has an exclamation mark ${!svg} cause it must
    * not be escaped to be safe in an attribute value.
    * 
    * @class ic-test.svg.RedCircle
    * @extends dijit/_WidgetBase
    * @extends dijit/_TemplatedMixin
    */
   return declare([_WidgetBase, _TemplatedMixin],
         /** @lends ic-test.svg.RedCircle.prototype */ {
      templateString: template,
      svg: svg
   });
});
