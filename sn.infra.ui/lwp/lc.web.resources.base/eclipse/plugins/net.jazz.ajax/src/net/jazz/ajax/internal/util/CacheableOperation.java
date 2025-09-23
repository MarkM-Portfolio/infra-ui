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

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;


public abstract class CacheableOperation<TResult> {
	
	public static CacheableOperation<StringBuffer> fetchResource(URL url) {
		String protocol = url.getProtocol();
		if (protocol.equals("file"))
			return new FetchFileOperation(url.getPath());
		if (protocol.equals("jar"))
			return new FetchImmutableResource(url);
		return new FetchProxiedResource(url);
	}
	
	public final TResult execute() {
		try {
			return Cache.execute(this, null).getResult();
		} catch (IOException e) {
			throw new RuntimeException(e); //TODO
		}
	}
	
	public boolean isStillValid(CacheableResult<TResult> previous) throws IOException {
		return false;
	}
	
	public static OperationException wrap(Throwable t) {
		return new OperationException(t);
	}
	
	public abstract CacheableResult<TResult> getResult(CacheCondition condition) throws IOException;
	
	static class FetchFileOperation extends CacheableOperation<StringBuffer> {
		File file;
		
		public FetchFileOperation(String path) {
			file = new File(path);
		}
		
		// CHANGED
		public CacheableResult<StringBuffer> getResult(CacheCondition condition) throws IOException {
			StringBuffer data = null;
			CacheWindow cacheability = new CacheWindow(file.lastModified(), CacheConfiguration.getFileClientCache(), CacheConfiguration.getFileFreshness());
			if (!condition.acceptsConditionally(cacheability)) {
				data = Util.stringBuffer(new FileInputStream(file));
			}
			return new CacheableResult(cacheability, data);
		}
	}
	
	static class FetchImmutableResource extends CacheableOperation<StringBuffer> {
		URL url;
		FetchImmutableResource(URL url) {
			this.url = url;
		}
		
		// CHANGED
		@Override public CacheableResult getResult(CacheCondition condition) throws IOException {
			StringBuffer data = null;
			URLConnection connection = url.openConnection();
			CacheWindow cacheability = new CacheWindow(connection.getLastModified(), CacheConfiguration.getImmutableFileClientCache(), CacheConfiguration.getImmutableFileFreshness());
			if (!condition.acceptsConditionally(cacheability)) {
				data = Util.stringBuffer(connection.getInputStream());
			}
			return new CacheableResult(cacheability, data);
		}
	}
	
	static class FetchProxiedResource extends CacheableOperation<StringBuffer> {
		URL url;
		FetchProxiedResource(URL url) {
			this.url = url;
		}
		public CacheableResult getResult(CacheCondition condition) throws IOException {
			//TODO
			throw new RuntimeException("Not implemented");
		}
	}

}
