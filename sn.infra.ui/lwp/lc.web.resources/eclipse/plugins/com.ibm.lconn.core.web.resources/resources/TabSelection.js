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

dojo.provide("lconn.core.TabSelection");

//FIXME: remove if unused
lconn.core.TabSelection.selectTab = function(tabSelected, contentLoader, parameters) 
{
	var tabsContainer = dojo.dom.getFirstAncestorByTag(tabSelected, 'ul');
	var tab = dojo.dom.getFirstChildElement(tabsContainer, 'li');
	
	var selectedLink = dojo.dom.getFirstChildElement(tabSelected, 'a');
	var indicator = dojo.dom.getFirstChildElement(selectedLink, 'img');
	dojo.html.show(indicator);
	
	do {
		dojo.html.removeClass(tab, 'selected');
		tab = dojo.dom.getNextSiblingElement(tab, 'li');
	} while (tab != undefined);
	
	dojo.html.setClass(tabSelected, 'selected');
	
	contentLoader(indicator, parameters);
}
