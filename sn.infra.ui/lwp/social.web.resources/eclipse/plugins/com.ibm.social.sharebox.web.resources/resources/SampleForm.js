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

dojo.provide("com.ibm.social.sharebox.SampleForm");

dojo.declare("com.ibm.social.sharebox.SampleForm", [dijit._Widget], {
	buildRendering: function () {
		this.inherited(arguments);
		function t(e,s) { e.appendChild(dojo.doc.createTextNode(s)); }
		var div = dojo.create("div", { }, this.domNode);
		var h3 = dojo.create("h3", { }, div);
		t(h3, "Sample Sharebox Form");
		t(div, "Context: " + dojo.toJson(this.context));
		dojo.create("br", { }, div);
		t(div, "Params: " + dojo.toJson(this.params));   
	}	
});