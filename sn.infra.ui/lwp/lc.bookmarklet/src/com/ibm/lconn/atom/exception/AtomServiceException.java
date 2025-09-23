/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2007, 2012                                    
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */
package com.ibm.lconn.atom.exception;

public class AtomServiceException extends Exception {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	public AtomServiceException() {
		// TODO Auto-generated constructor stub
	}

	public AtomServiceException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public AtomServiceException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public AtomServiceException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

}
