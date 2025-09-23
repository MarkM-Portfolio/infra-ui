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

dojo.provide("com.ibm.social.ee.widget.HtmlJsonEELoader");

dojo.require("com.ibm.social.ee.widget.EELoader");

dojo.declare("com.ibm.social.ee.widget.HtmlJsonEELoader", com.ibm.social.ee.widget.EELoader, {
   allowNotificationDisplay: true,
   // Must be implemented by subclass
   setupGadgetUI: function(data, prefix) { this._notImplemented("setupGadgetUI"); },
   
   onDataLoaded: function (data, ioRequest) {
      var div = dojo.create("div", { style: { display: "none"} }, this.domNode);
      div.innerHTML = data;
      var jsonData = null;
      var prefix = null;
      var scope = this;
      dojo.query("textarea.data", this.domNode).forEach (function (node) {
         var value = scope.decodeJsonData ? decodeURIComponent(node.value) : node.value;
         jsonData = dojo.fromJson(value);
         prefix = dojo.attr(node, "prefix");
      });
      this.setupGadgetUI(jsonData, prefix);
      this.hideLoading();
      if(this.allowNotificationDisplay) {
         this.displayNotification();
      }
      div.style.display = "";
      this.onLoaded();
   }   
});