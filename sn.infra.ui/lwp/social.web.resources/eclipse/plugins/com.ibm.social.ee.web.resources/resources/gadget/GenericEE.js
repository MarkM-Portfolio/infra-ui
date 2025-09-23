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

dojo.provide("com.ibm.social.ee.gadget.GenericEE");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.incontext.util.misc");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.html");

dojo.require("com.ibm.social.ee.gadget._EEGadgetWidget");
dojo.require("com.ibm.social.ee.gadget._HistoryMixin");

dojo.require("com.ibm.social.ee.track.generic");
dojo.require("lconn.core.globalization.bidiUtil");


(function(){

var g = com.ibm.social.ee.gadget;

dojo.declare("com.ibm.social.ee.gadget.GenericEE", 
     [g._EEGadgetWidget, 
      g._HistoryMixin], {
   templatePath: dojo.moduleUrl("com.ibm.social.ee", "gadget/templates/genericee.html"),

   context: null,
   
   loadData: function () {
      this.initializeUI();
      this.onLoaded();
   },
   
   postMixInProperties: function() {
      this.inherited(arguments);
      if (!this.context.itemUrl) {
         this.context.itemUrl = "javascript:;";
      }
      if (!this.context.iconUrl) {
         this.context.iconUrl = "";
      }
   },

   initializeUI: function () {
      this.inherited(arguments);
      this.setTitle();
      this.setContentData();      
      this.initializeHistoryTab();
      var dfd = this.initializeHistory(); dfd.addCallback(dojo.hitch(this, function() {
         this.onSizeChange();
      }));
      // Bidi support
 	 lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.titleNode.parentNode);
      this.notifyLoaded();
   },
   
   // History
   getHistoryTab: function() { return this.historyTabContainer; },
   getHistoryContainer: function() { return this.historyCtnr; },     
   getId: function() { return this.context.id; },
   
   notifyLoaded: function () {
      dojo.publish("social/ee/generic/load", [this.context, this.network, this.routes.oauth]);
   },
   _removeATags: function(htmlText){

      var container = dojo.create("div", {innerHTML: htmlText});

      dojo.query("a", container).forEach(function(node, index, arr) {
          var content = node.innerHTML;
          dojo.place(content, node, "replace");
      });

      return container.innerHTML;
   },

   setTitle: function() {
      var tooltipTitle = com.ibm.social.incontext.util.html.decodeHtml(this.context.title) || this.nls.generic.untitled;
      dojo.attr(this.titleNode, "title", dojo.string.substitute(this.nls.generic.titleTooltip, {app: tooltipTitle}));
      var title = this.context.title || this.context.eventTitle || this.nls.generic.untitled;
       title = this._removeATags(title);
      this.titleNode.innerHTML = title;
      com.ibm.social.incontext.util.text.breakStringHTML(this.titleNode);
      
      if (!this.context.iconUrl)
         this.iconNode.style.display = "none";
   },
   setContentData: function() {
      var htmlData = this.context.summary;
	   if(htmlData) {
         var ca = this.contentArea;
         var span = dojo.create("span");
             span.innerHTML = htmlData;
             dojo.query("a", span).attr("target", "_blank");
             com.ibm.social.incontext.util.text.breakStringHTML(span, 15);
         ca.appendChild(span);
         ca.style.display = "";
	   }
   }
});

})();