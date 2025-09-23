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

dojo.provide('lconn.core.widgetcontainer');

/**
 * The top level module for the base Connections widget container.  For now, this is a 
 * placeholder but would eventually be the mechanism by which other services consume
 * this feature.
 */
dojo.require('com.ibm.mm.enabler.services.ConfigService');
dojo.require('com.ibm.mm.enabler.iw');
dojo.require('com.ibm.mm.enabler.utilities');
dojo.require('com.ibm.mm.enabler.debug');
dojo.require('com.ibm.mm.livetext.serviceImpl');
dojo.require('com.ibm.mm.livetext.widgets');

dojo.require("lconn.core.dynamiciwidget");
