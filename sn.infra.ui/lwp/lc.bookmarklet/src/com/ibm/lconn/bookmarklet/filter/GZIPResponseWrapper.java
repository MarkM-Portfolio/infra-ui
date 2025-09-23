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

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;

public class GZIPResponseWrapper extends HttpServletResponseWrapper {
	protected HttpServletResponse response = null;
	protected ServletOutputStream stream = null;
	protected PrintWriter writer = null;
	private static final Log LOGGER = LogFactory.getLog( GZIPResponseWrapper.class);
	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper.getLogResourceHelper();
//	private OutputStream baos = null;

	public GZIPResponseWrapper(HttpServletResponse response/*, OutputStream baos*/) {
		super(response);
		this.response = response;
//		this.baos = baos;
	}

	public ServletOutputStream createOutputStream() throws IOException {
		return (new GZIPResponseStream(response/*, baos*/));
	}

	public void finishResponse() {
		try {
			if (writer != null) {
				writer.close();
			} else {
				if (stream != null) {
					stream.close();
				}
			}
		} catch (IOException e) {
			LOGGER.error(e.getLocalizedMessage(), e);
		}
	}

	public PrintWriter getWriter() throws IOException {
		if (writer != null) {
			return writer;
		}

		if (stream != null) {
			throw new IllegalStateException(_logresources.getString("error.responsewrapper.output.called"));
		}

		stream = createOutputStream();
		writer = new PrintWriter(new OutputStreamWriter(stream, "UTF-8"));
		return writer;
	}
	
	public void flushBuffer() throws IOException {
		stream.flush();
	}

	public ServletOutputStream getOutputStream() throws IOException {
		if (writer != null) {
			throw new IllegalStateException(_logresources.getString("error.responsewrapper.writer.called"));
		}

		if (stream == null)
			stream = createOutputStream();
		return stream;
	}
}
