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

dojo.provide("com.ibm.social.hikari.theme.bootstrap");
dojo.require("lconn.core.theme");
/**
 * Bootstraps the Hikari theme on the client side
 * <p>
 * This module performs initialization required to bootstrap the Hikari theme
 * on the client side.
 * 
 * @namespace com.ibm.social.hikari.theme.bootstrap
 */
(function(theme) {
   if (theme.getCurrentThemeId() === "hikari") {
      console.log('hello world');
   }
}(lconn.core.theme));
