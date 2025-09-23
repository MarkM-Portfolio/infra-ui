/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.util;

import java.text.SimpleDateFormat;
import java.util.MissingResourceException;

import com.ibm.lconn.core.util.ResourceBundleHelper;

public class Build {
	 /** Our resource bundle name */
    private final static String RESOURCE_BUNDLE_NAME = "com.ibm.lconn.bookmarklet.util.build";

    /** Use resource bundle helper to load resources */
    private static ResourceBundleHelper s_bundleHelper = loadResources();
   
    
    /** Formatted build date-time string */
    private static String s_buildDateString = null;
    
    /** Product version string */
    private static String s_productVersionString = null;

    /**
     * Private constructor
     */
    private Build() {
    }
    
    /**
     * Create resource bundle helper
     * @return ResourceBundleHelper
     */
    private static ResourceBundleHelper loadResources() {
        ResourceBundleHelper rbh = null;
        
        try {
            rbh = new ResourceBundleHelper(RESOURCE_BUNDLE_NAME, Build.class.getClassLoader());
        }
        catch (MissingResourceException mre) {
            /** Can't really use logger since it depends on resource bundle */
            System.err.println( "*** WARNING: Couldn't load build resource bundle. Build timestamp will be inaccurate ***" );
        }
        
        return rbh;
    }
        
    
    /**
     * Get the build datetime stamp
     * The format is "YYYYMMDDTHHMM", for example, "20020108T1322".
     */
    public static String getBuildStamp() {
        if (s_bundleHelper != null) {
            return s_bundleHelper.getString("str.dtstamp");
        }
        else {
            /** Something ridiculous to get some attention */
            return "19700101T0600";
        }
    }
    

    /**
     * Get the product name/version/build strng
     */
    public static String getProductVersionString() {
        if (s_productVersionString == null) {
            s_productVersionString = getBuildStamp();
        }
        return s_productVersionString;
    }
    
    public static String getBuildDateString() {
        if (s_buildDateString == null) {
            try {
                SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd'T'HHmm");
                s_buildDateString =  df.parse(getBuildStamp()).toString();
            }
            catch (java.text.ParseException pe) {
                s_buildDateString = getBuildStamp();
            }
        }
        return s_buildDateString;
    }
    
    /**
     * Get the complete build information formatted like:
     * "VERSION DATE, BUILDID"
     */
    public static String getBuildInfo() {
        StringBuffer sb = new StringBuffer(100);
        sb.append(Build.getBuildDateString());
        sb.append(", ");
        sb.append(Build.getBuildStamp());
        return sb.toString();
    }
    
    
    public static void main(String args[]) {
        System.out.println("Build string is: " + getBuildDateString());
        System.out.println("Product/version name is: " + getProductVersionString() );
    }

}
