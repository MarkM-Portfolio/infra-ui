/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
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

import javax.servlet.http.HttpServletResponse;

public class CacheableResult<TResult> {
	final TResult result;
	final CacheWindow cacheability;
	
	public CacheableResult(CacheWindow cacheability, TResult result) {
		this.cacheability = cacheability;
		this.result = result;
	}
	
	public synchronized void applyTo(HttpServletResponse response) {
		cacheability.applyTo(response);
		if (result == null)
			response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
	}
	
	public CacheWindow getCacheability() {
		return cacheability;
	}
	
	/**
	 * Returns a condition that can be used to get a new result only if it differs from this result.
	 * @return a CacheCondition
	 */
	public CacheCondition getConditional() {
		CacheCondition result = new CacheCondition();
		result.etag = cacheability.etag;
		result.lastModified = cacheability.lastModified;
		return result;
	}

	public TResult getResult() {
		return result;
	}

	public boolean isCacheable() {
		return result != null;
	}

	public final boolean notModified() {
		return result == null;
	}
}
