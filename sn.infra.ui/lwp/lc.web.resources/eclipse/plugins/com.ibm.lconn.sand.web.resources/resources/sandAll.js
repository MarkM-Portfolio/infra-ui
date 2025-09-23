/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// This looks stupid, but is crucial to the success of the build process
// Do not delete!
dojo.provide("lconn.sand.sandAll");

dojo.requireLocalization("lconn.sand", "ui");

//used for html templates
lconn.sand.sandAll.loadAllStringIntoObject = function(inputObject)
{
	var lcSandStrings =  dojo.i18n.getLocalization("lconn.sand", "ui");
	for (var i in lcSandStrings)
		inputObject[i] = lcSandStrings[i];
}
