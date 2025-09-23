/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


package com.ibm.lconn.bookmarklet.resources;

import java.util.Locale;

import com.ibm.lconn.core.util.ResourceBundleHelper;


public class BookmarkletUIResourceHelper {

private static ResourceBundleHelper _loghelper;
	
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	public static ResourceBundleHelper getResourceHelper(Locale locale){

		//TODO: check that the IBM jvm caches the bundle instance and returns
		// the same one for the same language, otherwise add a map here.
		return new ResourceBundleHelper("com.ibm.lconn.bookmarklet.strings.ui", locale);		 
	}
	
	//Used for logging
	public static ResourceBundleHelper getLogResourceHelper(){
		if(_loghelper == null){
			//instantiate ResourceBundleHelper with classname
			_loghelper  = new ResourceBundleHelper("com.ibm.lconn.bookmarklet.resources.LogMessages", BookmarkletUIResourceHelper.class.getClassLoader());
		}
		return _loghelper;
	}
}
