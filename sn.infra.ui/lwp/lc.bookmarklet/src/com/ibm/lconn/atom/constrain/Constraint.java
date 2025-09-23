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
package com.ibm.lconn.atom.constrain;

/**
 * <code>Constraint</code> defines a condition which can be used to find or
 * count objects. As all the operations through Atom should be performed via
 * HTTP GET url, each implementation class should implement the formatURL method
 * to represent its condition in url
 * 
 * @author Alan Cui (cuicai@cn.ibm.com)
 * 
 */
public interface Constraint {

	/**
	 * Represent this constraint in the url. Each implementation class should
	 * take responsibility to rebuild the url according to its own logical. For
	 * example, this constraint can be reprensented in the query part of the
	 * url.
	 * 
	 * @param url
	 *            The url used to rebuild from.
	 * @return A new rebuilt url
	 * @throws Exception
	 *             Any error occurred.
	 */
	public String formatURL(String url) throws Exception;

}
