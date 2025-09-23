/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
define([
	"ic-communities/bizCard/bizCard",
	"ic-profiles/bizCard/bizCard",
	"ic-profiles/sametime/sametimeAwareness",
	"ic-profiles/sametime/sametimeProxyAwareness"
], function (communitiesBizCardBizCard, bizCard, sametimeAwareness, sametimeProxyAwareness) {

	
	/**
	 * Loads and initializes the business card in external mode.
	 * 
	 * This module must be included prior to page load.
	 */
	
	return com.ibm.lconn.personcard.external;
});