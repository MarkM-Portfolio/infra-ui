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

dojo.provide("com.ibm.social.ee.gadget._HTMLContentMixin");

dojo.require("com.ibm.social.ee.util.ContentManipulation");
dojo.require("com.ibm.social.incontext.util.text");

dojo.declare("com.ibm.social.ee.gadget._HTMLContentMixin", null, {
   // Must be implemented by subclass
   getHtmlContent: function() { },
   getTitle: function() { },
   getHtmlNode: function() { },
   getImagesNode: function() { },
   getConfig: function() { },
   getReadMoreStrings: function() { },
   getItemUrl: function () { },

   initializeContent: function () {
      cm = com.ibm.social.ee.util.ContentManipulation;
      var config = com.ibm.social.ee.config.htmlContentParams;
      var htmlContent = this.getHtmlContent();
      var imageContainer = this.getImagesNode();
      var contentArea = this.getHtmlNode();
      var itemUrl = this.getItemUrl();
      cm.generate_images(htmlContent, config.width, config.height, config.numImages, imageContainer, itemUrl, dojo.hitch(this, this.onImagesLoaded));
      if(htmlContent) {
         contentArea.innerHTML = cm.generate_summary(htmlContent, config.numChar);
         com.ibm.social.incontext.util.text.breakStringHTML(contentArea, 15);
      } else {
         contentArea.style.display = "none";
      }
      this.onSizeChange();
   },
   onImagesLoaded: function(numOfImagesLoaded) {
      var imageContainer = this.getImagesNode();
      if(numOfImagesLoaded === 0) {
         imageContainer.style.display = "none";
      }
      var links = dojo.query("a", imageContainer);
      var title = this.getTitle();
      var strings = this.getReadMoreStrings();
      dojo.forEach(links, function(link,index) {
         link.title = (index + 1) + ": " + dojo.string.substitute(strings.readMore_tooltip, {"name": title});
      });
      this.onSizeChange();
	  dojo.publish("com/ibm/social/ee/data/loaded");
   }   
});