/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.bean.IdeationBlogIdea");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.bean.BlogEntry");

/* Loads data from a IdeationBlogIdea Feed*/
(function(){
	var du = com.ibm.social.incontext.util.dom;
	dojo.declare("com.ibm.social.ee.bean.IdeationBlogIdea", [com.ibm.social.ee.bean.BlogEntry], {
		getGraduated: function() {
			if (!("graduated" in this)) {
				var category = du.getChildElementMatchingAttributeNS(this.e, "category", du.ATOM_NAMESPACE, "term", null, "graduated");
				this.graduated = category !== null;
			}
			return this.graduated; 
		}
	});
})();