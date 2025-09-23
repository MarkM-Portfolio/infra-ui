/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.mycompany.example.SimpleWidget");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("com.mycompany.example.SimpleWidget", [dijit._Widget, dijit._Templated], {
	/* 
	 * The first part of the Dojo module path must match the base package for this plugin.
	 * In this case, it's 'com.mycompany.example'.
	 */
	templatePath: dojo.moduleUrl("com.mycompany.example", "templates/widget.html")
});