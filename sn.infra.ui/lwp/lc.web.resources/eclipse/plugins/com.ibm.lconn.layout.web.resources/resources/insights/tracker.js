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

dojo.provide("com.ibm.lconn.layout.insights.tracker");

dojo.require("ic-ui.layout.insights.tracker");

/**
 * Pluggable tracker for page insights
 * <p>
 * This tracker supports plugins that can register a callback using the
 * {@see #register} method. Plugin callbacks must accept an <code>event</code>
 * argument and a <code>type</code> object.
 * <p>
 * Note: It is important that no Sensitive Personal Information (SPI) is
 * funnelled into the page insight API. Please scrub your content before calling
 * this API.
 * 
 * @deprecated Use the AMD module ic-ui/layout/insights/tracker instead
 * @namespace com.ibm.lconn.layout.insights.tracker
 */

dojo.deprecated("com.ibm.lconn.layout.insights.tracker", "Use the AMD module ic-ui/layout/insights/tracker instead", "5.5");

/**
 * Button click action
 * 
 * @memberof com.ibm.lconn.layout.insights.tracker
 * @type {String}
 * @const
 */

/**
 * Form submit action
 * 
 * @memberof com.ibm.lconn.layout.insights.tracker
 * @type {String}
 * @const
 */

/**
 * Generic action
 * 
 * @memberof com.ibm.lconn.layout.insights.tracker
 * @type {String}
 * @const
 */

/**
 * Add an event through all registered plugins
 * 
 * @function track
 * @memberof com.ibm.lconn.layout.insights.tracker
 * @param {String}
 *           event The event type
 * @param {Object}
 *           data Metadata for the event
 */

/**
 * Register a plugin. Use a unique lowercase string for each plugin, e.g.
 * "coremetrics".
 * 
 * @function register
 * @memberof com.ibm.lconn.layout.insights.tracker
 * @param {String}
 *           name The plugin's name
 * @param {Function}
 *           callback The plugin's callback
 */
