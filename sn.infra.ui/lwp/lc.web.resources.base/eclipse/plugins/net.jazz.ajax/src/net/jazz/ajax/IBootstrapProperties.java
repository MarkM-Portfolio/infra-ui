/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
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
package net.jazz.ajax;

import java.util.Locale;

/**
 * THIS CLASS IS DEPRECIATED.
 * PLEASE EXTEND AbstractBootstrapProperties instead.
 */

public interface IBootstrapProperties {

	String getDiscoveryServiceUrl(String contextPath);

	String getApplicationName(Locale locale);

	String getFrontsideUrl();

}
