/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.lconn.layout.insights.NewRelic");
dojo.require("ic-ui.layout.insights.NewRelic");

/**
 * New Relic plugin for page insights instrumentation
 * 
 * @deprecated Use the AMD module ic-ui/layout/insights/NewRelic instead
 * @namespace com.ibm.lconn.layout.insights.NewRelic
 */

dojo.deprecated("com.ibm.lconn.layout.insights.NewRelic", "Use the AMD module ic-ui/layout/insights/NewRelic instead", "5.5");

/**
 * Name of this plugin
 * 
 * @memberof com.ibm.lconn.layout.insights.NewRelic
 * @type {String}
 */
/**
 * Signals a page event. The caller must pass an event name and optional
 * metadata
 * 
 * @memberof com.ibm.lconn.layout.insights.NewRelic
 * @function track
 * @param {String}
 *           event The event name
 * @param {Object}
 *           data The event metadata
 */

/**
 * Registers this plugin with the insights tracker
 * 
 * @memberof com.ibm.lconn.layout.insights.NewRelic
 * @function register
 * @memberof com.ibm.lconn.layout.insights.NewRelic
 */
