/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * Loads and initializes the business card in legacy mode.
 * 
 * This module must be included prior to page load.
 */
dojo.provide("com.ibm.lconn.personcard.legacy");

dojo.require("lconn.profiles.bizCard.bizCard");

//internal comm bizcards have more functionality than external.  So load the internal one for the "legacy"
dojo.require("lconn.communities.bizCard.bizCard_internal");
