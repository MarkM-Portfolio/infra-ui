/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * File is responsible for loading iRuntimeBundle
 */
dojo.provide('com.ibm.lconn.gadget.resources.iRuntimeModule');

/* Deal with odd IE issues */
dojo.require('lconn.core.util.jsonCompat');
/* Must be required first */
dojo.require('com.ibm.lconn.gadget.services.people_container');
/*Pull in for ibm.connections.sharedialog feature*/
dojo.require('com.ibm.social.sharebox._dialog_utils');
/* Pull in iRuntime code */
//dojo.require('com.ibm.lconn.gadget.resources._iRuntimeModule_');
