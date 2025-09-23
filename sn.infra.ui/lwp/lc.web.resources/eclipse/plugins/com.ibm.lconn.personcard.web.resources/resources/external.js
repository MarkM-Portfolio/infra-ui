/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Loads and initializes the business card in external mode.
 * 
 * This module must be included prior to page load.
 */
dojo.provide("com.ibm.lconn.personcard.external");



//load some of the core features needed by bizcard
dojo.require("com.ibm.lconn.gadget.services.fake_handleRpcMethod");


//sametime integration
dojo.require("lconn.profiles.sametime.sametimeAwareness");
dojo.require("lconn.profiles.sametime.sametimeProxyAwareness");


//core bizcard
dojo.require("lconn.profiles.bizCard.bizCard");
dojo.require("lconn.communities.bizCard.bizCard");





