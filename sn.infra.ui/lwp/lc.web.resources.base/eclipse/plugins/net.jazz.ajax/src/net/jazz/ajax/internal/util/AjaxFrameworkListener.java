/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.internal.util;

import net.jazz.ajax.internal.AjaxFramework;

public interface AjaxFrameworkListener {
	/**
	 * Invoked when the framework has completed activation
	 * 
	 * @param fwk
	 *            The framework instance
	 */
	public void frameworkActivated(AjaxFramework fwk);
}
