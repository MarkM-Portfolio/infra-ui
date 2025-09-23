define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/query",
	"dojo/string",
	"dojo/topic",
	"ic-ee/config",
	"ic-ee/util/ContentManipulation",
	"ic-incontext/util/text"
], function (array, declare, lang, query, string, topic, configModule, ContentManipulation, text) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2014                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var _HTMLContentMixin = declare("com.ibm.social.ee.gadget._HTMLContentMixin", null, {
	   // Must be implemented by subclass
	   getHtmlContent: function() { },
	   getTitle: function() { },
	   getHtmlNode: function() { },
	   getImagesNode: function() { },
	   getConfig: function() { },
	   getReadMoreStrings: function() { },
	   getItemUrl: function () { },
	
	   initializeContent: function () {
	      cm = ContentManipulation;
	      var config = configModule.htmlContentParams;
	      var htmlContent = this.getHtmlContent();
	      var imageContainer = this.getImagesNode();
	      var contentArea = this.getHtmlNode();
	      var itemUrl = this.getItemUrl();
	      cm.generate_images(htmlContent, config.width, config.height, config.numImages, imageContainer, itemUrl, lang.hitch(this, this.onImagesLoaded));
	      if(htmlContent) {
	         contentArea.innerHTML = cm.generate_summary(htmlContent, config.numChar);
	         text.breakStringHTML(contentArea, 15);
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
	      var links = query("a", imageContainer);
	      var title = this.getTitle();
	      var strings = this.getReadMoreStrings();
	      array.forEach(links, function(link,index) {
	         link.title = (index + 1) + ": " + string.substitute(strings.readMore_tooltip, {"name": title});
	      });
	      this.onSizeChange();
		  topic.publish("com/ibm/social/ee/data/loaded");
	   }   
	});
	return _HTMLContentMixin;
});