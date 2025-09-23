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

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/
package net.jazz.ajax.tests.internal;

public class Constants {
	public static String SERVER_PROTOCOL = System.getProperty("server.protocol", "http");
    public static String SERVER_ADDRESS = System.getProperty("server.address", "localhost");
    public static String SERVER_PORT = System.getProperty("server.port", "8080");
    public static String SERVER_OPTIONAL_SUFFIX = System.getProperty("server.suffix", "");
    
    public static String SERVER_OPTIONAL_SUFFIX_FULL = SERVER_OPTIONAL_SUFFIX.equals("") ?
														"" : SERVER_OPTIONAL_SUFFIX + '/';    
    
    public static String SERVER_URL_PREFIX = SERVER_PROTOCOL +"://"+SERVER_ADDRESS+':'+SERVER_PORT+'/'+SERVER_OPTIONAL_SUFFIX_FULL;
    
	public static final int TEST_CASE_UNREGISTERED = 0;
	public static final int TEST_CASE_REGISTERED = 1;
	public static final int TEST_CASE_STARTED = 2;
	public static final int TEST_CASE_FINISHED = 3;
	
	public static String getServerURLPrefix() {
        String serverUriPrefix = System.getProperty("server.uri");
        if (serverUriPrefix != null) {
        	serverUriPrefix += "/";
        }
        else {
        	serverUriPrefix = Constants.SERVER_URL_PREFIX;
        }
        return serverUriPrefix;
	}
	
}
