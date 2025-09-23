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
package com.ibm.lconn.bookmarklet.filter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;

public class GZIPResponseStream extends ServletOutputStream{
	protected ByteArrayOutputStream byteArrayOutputStream = null;
	protected GZIPOutputStream gzipStream = null;
	protected boolean isStreamClosed = false;
	protected HttpServletResponse response = null;
	protected ServletOutputStream output = null;
//	private OutputStream cache = null;
	
	private static final Log LOGGER = LogFactory.getLog( GZIPResponseStream.class);
	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper.getLogResourceHelper();
	  
	public GZIPResponseStream(HttpServletResponse response/*, OutputStream cache*/) throws IOException{
		super();
//		this.cache = cache;
	    isStreamClosed = false;
	    this.response = response;
	    this.output = response.getOutputStream();
	    byteArrayOutputStream = new ByteArrayOutputStream();
	    gzipStream = new GZIPOutputStream(byteArrayOutputStream);
	}

	@Override
	public void write(int b) throws IOException {
		if (isStreamClosed){
			throw new IOException(_logresources.getString("error.stream.closed"));
		}
		gzipStream.write((byte)b);
//		cache.write((byte)b);
	}
	
	public void write(byte b[]) throws IOException {
		write(b, 0, b.length);
	}
	
	public void write(byte b[], int off, int len) throws IOException {
		if (isStreamClosed) {
			throw new IOException(_logresources.getString("error.stream.closed"));
		}
		gzipStream.write(b, off, len);
//		cache.write(b, off, len);
	}
	
	public boolean closed() {
		return isStreamClosed;
	}
	
	public void close() throws IOException {
		if (isStreamClosed) {
			throw new IOException(_logresources.getString("error.stream.closed"));
		}
		gzipStream.finish();

		byte[] bytes = byteArrayOutputStream.toByteArray();
//		cache.write(bytes);
//		cache.flush();
		response.addHeader("Content-Length", "" + bytes.length);
		response.addHeader("Content-Encoding", "gzip");
		output.write(bytes);
		output.flush();
		output.close();
		gzipStream.close();
		byteArrayOutputStream.close();
		isStreamClosed = true;
	}
	
	public void flush() throws IOException {
		if (isStreamClosed) {
			throw new IOException(_logresources.getString("error.stream.flush"));
		}
		gzipStream.flush();
	}
}
