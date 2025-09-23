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

package com.ibm.lconn.atom;

import com.ibm.lconn.atom.constrain.SearchTextOperator;

/**
 * 
 * This class specifies all the options needed when initializing a ConnectionsObjectHelper object.
 * 
 * @see ConnectionsObjectHelper
 * @author Alan Cui (cuicai@cn.ibm.com)
 *
 */
public class HelperConfig {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private int pageSize = 10;
	
	private SearchTextOperator operator = null;

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		if(pageSize > 0) {
			this.pageSize = pageSize;
		} else {
			this.pageSize = 10;
		}
	}

	public SearchTextOperator getSearchTextOperator() {
		return operator;
	}

	public void setSearchTextOperator(SearchTextOperator operator) {
		this.operator = operator;
	}

}
