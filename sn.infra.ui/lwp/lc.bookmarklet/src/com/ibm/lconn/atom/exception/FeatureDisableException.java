/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 *                                                                  *
 *                                                                  *
 * Copyright IBM Corp. 2012                                         *
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */
package com.ibm.lconn.atom.exception;

public class FeatureDisableException extends AtomServiceException {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	public FeatureDisableException(String string, Throwable e) {
		super(string ,e);
	}

	public FeatureDisableException(String string) {
		super(string);
	}

}