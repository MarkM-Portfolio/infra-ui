define([
	"dojo/_base/declare",
	"ic-ee/widget/BlogEntryLoader"
], function (declare, BlogEntryLoader) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2012                                          */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var IdeationBlogIdeaLoader = declare("com.ibm.social.ee.widget.IdeationBlogIdeaLoader", BlogEntryLoader, {
	   gadgetClass: "com.ibm.social.ee.gadget.IdeationBlogIdea"
	});
	return IdeationBlogIdeaLoader;
});