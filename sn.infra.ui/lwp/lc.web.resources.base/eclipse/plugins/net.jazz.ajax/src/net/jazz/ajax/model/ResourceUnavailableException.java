/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
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

package net.jazz.ajax.model;

// ADDED
public class ResourceUnavailableException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ResourceUnavailableException() {
	}

	public ResourceUnavailableException(String message) {
		super(message);
	}

	public ResourceUnavailableException(Throwable cause) {
		super(cause);
	}

	public ResourceUnavailableException(String message, Throwable cause) {
		super(message, cause);
	}

}
