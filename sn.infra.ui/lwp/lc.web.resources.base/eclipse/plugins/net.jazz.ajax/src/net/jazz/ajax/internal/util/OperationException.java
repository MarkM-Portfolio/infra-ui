/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
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

package net.jazz.ajax.internal.util;

/**
 * Thrown when a {@link CacheableOperation} does not complete normally.  This can be used
 * to unexpected {@link RuntimeException}s from rare but expected exceptions (e.g., a remote
 * server not responding properly/timely).
 */
@SuppressWarnings("serial")
public class OperationException extends RuntimeException {

	public OperationException(Throwable t) {
		super(t);
	}

}
