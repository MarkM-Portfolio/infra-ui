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

dojo.provide("lconn.test.jasmine.ckeditor.editLiveSpec");

dojo.require("lconn.core.ckeditorstatic");
dojo.requireLocalization("com.ibm.oneui.ckeditor", "lang");

/**
 * Jasmine spec that covers integration points used by Ephox EditLive!
 * <p>
 * Please keep updated to reflect the most up-to-date integration points. This
 * test case is essential to avoid breaking EditLive! integration with
 * Connections
 * 
 * @module lconn.test.jasmine.ckeditor.editLiveSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
describe('the com.ibm.oneui.ckeditor.lang NLS bundle', function() {
   it('is available', function() {
      var nls = dojo.i18n.getLocalization("com.ibm.oneui.ckeditor", "lang");
      expect(nls).not.toBeUndefined();
   });
});
