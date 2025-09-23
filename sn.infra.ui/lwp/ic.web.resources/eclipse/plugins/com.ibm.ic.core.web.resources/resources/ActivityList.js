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

define([
   "dojo",
   "dojo/_base/kernel",
   "dojo/_base/lang"
], function (dojo, kernel, lang) {

   kernel.deprecated("lconn.core.ActivityList", "Rename to an Activities specific bundle in 3.5, reduce size of code, and move into dynamic loading path", "3.5");

   var ActivityList = function() {
      var callback = dojo.hitch(this, function load() {
         if(lang.exists("lconn.act.CommunityActivityList")){
             lconn.act.CommunityActivityList(this);
             this.loadActivityList();
         }
      });

      this.onLoad = function onLoad() {
         if(!lang.exists("lconn.act.CommunityActivityList")){
            net.jazz.ajax.xdloader.load_async("lconn.act.CommunityActivityList", callback);
         } else {
            callback();
         }
      };
   };

   return ActivityList;
});
