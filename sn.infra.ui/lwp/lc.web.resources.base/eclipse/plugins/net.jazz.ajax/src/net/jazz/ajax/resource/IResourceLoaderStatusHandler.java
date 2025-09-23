/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2005, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp. 
 *******************************************************************************/
package net.jazz.ajax.resource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Provides a mechanism for Ajax resource loaders like Ajax applications and
 * Ajax modules to determine whether the resource should load normally, or
 * should be vetoed to allow alternate behavior such as a redirect or a not
 * found response.
 * 
 * PROVISIONAL: This API is considered provisional and may be changed or removed in the
 * future with minimal or no warning.
 */
public interface IResourceLoaderStatusHandler {
	
	/**
	 * Check the state of the incoming HttpServletRequest and outgoing
	 * HttpServletResponse. If the status handler implementation returns
	 * <code>true</code>, the Ajax server side processor will cease to load the
	 * Ajax resource and will immediately process the current state of the
	 * response.
	 * <p>
	 * If the implementer intends to return <code>true</code> and cancel normal
	 * loading, it should modify the HTTP servlet response in such a way that
	 * the user encounters a useful response such as a redirect to another URL
	 * that can be processed or a 'not found' response indicating a bad URL.
	 * </p>
	 * 
	 * @param request the incoming HTTP servlet request
	 * @param response the outgoing HTTP servlet response
	 * @return <code>true</code> to cancel normal resource loading,
	 *  <code>false</code> to continue normal resource loading.
	 */
	boolean checkStatus(HttpServletRequest request, HttpServletResponse response);
}
