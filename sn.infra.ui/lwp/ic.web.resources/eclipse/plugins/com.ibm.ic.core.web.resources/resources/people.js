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

define([], function () {

/*
	 * This module is linked at runtime to modules that provide standard Connections behavior for people.
	 * Applications that render HTML and need person card or sametime awareness should prereq this module.
	 * <p>
	 * For example: either com.ibm.lconn.personcard.standard (new business card)
	 * or com.ibm.lconn.personcard.legacy (old business card) is added as an implicit dependency 
	 * depending on configuration.
	 * @namespace ic-core.people
	 */
	
	return lconn.core.people;
});
