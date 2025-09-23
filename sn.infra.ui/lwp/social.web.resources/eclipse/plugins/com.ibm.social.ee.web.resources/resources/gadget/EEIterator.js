/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.EEIterator");
dojo.require("com.ibm.oneui.controls.ItemIterator");

/*
 * Example iterator implementation
 */
dojo.declare("com.ibm.social.ee.gadget.EEIterator", com.ibm.oneui.controls.ItemIterator, {
   reset: function(items) {
      this._position = 0;
      this._items = items;
   },
   transform: function(item) {
      //Make every fifth item a deferred
      if ((this._position %5 == 4) && item.deferred === undefined) {
         var timer;
         var dfd = item.deferred = new dojo.Deferred(function() {clearTimeout(timer);});
         timer = setTimeout(function() {
            dfd.callback({title: item.activityObj.appTitle,
                eventHtml: item.eventHtml,
                around: dojo.byId(item.around),
                activityObj: item.activityObj,
                gadgetXmlUrl: item.gadgetXmlUrl
         });
         }, 2000);
      }
      else {
         item = {title: item.activityObj.appTitle,
            around: dojo.byId(item.around),
            activityObj: item.activityObj,
            gadgetXmlUrl: item.gadgetXmlUrl,
            eventHtml: item.eventHtml,
            isPublic: item.isPublic,
            isLoggedIn: item.isLoggedIn
         };
      }
      return item;
   }
});