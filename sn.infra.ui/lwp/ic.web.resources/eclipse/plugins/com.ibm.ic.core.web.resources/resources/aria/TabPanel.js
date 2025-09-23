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

define([
   "dojo/_base/kernel",
   "ic-ui/aria/TabPanel"
], function (kernel, CoreUITabPanel) {

   /**
    * This class is just a proxy for ic-ui/aria/TabPanel
    * 
    * @see coreui.aria.TabPanel
    *  
    */
   kernel.deprecated("ic-core/aria/TabPanel", "Use ic-ui/aria/TabPanel instead", "5.0");

   return CoreUITabPanel;
});
