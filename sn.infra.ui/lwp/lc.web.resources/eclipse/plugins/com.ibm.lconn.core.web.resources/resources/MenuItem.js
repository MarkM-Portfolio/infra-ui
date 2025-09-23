/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * The lconn.core.MenuItem widget is exactly like the dijit.MenuItem, except that it
 * modifies the template to allow passing in an icon path. dijit.MenuItem is restricted
 * in that you can only specify an iconClass, a css class which must already have the
 * icon path (background-image) hard-coded. If the icon path is only known at run-time,
 * then an icon class is not feasible and this widget may be used.
 */

dojo.provide("lconn.core.MenuItem");

dojo.require("dijit.Menu");

(function(declare, MenuItem) {
   // Widget declaration
   var w = {};

   // iconSrc should be passed in on initialization
   w.iconSrc = '';

   w.postCreate = function() {
      this.inherited("postCreate", arguments);

      if (this.iconSrc != '') {
         this.iconNode.src = this.iconSrc;
      }
   };

   declare("lconn.core.MenuItem", [ MenuItem
   ], w);

}(dojo.declare, dijit.MenuItem));
