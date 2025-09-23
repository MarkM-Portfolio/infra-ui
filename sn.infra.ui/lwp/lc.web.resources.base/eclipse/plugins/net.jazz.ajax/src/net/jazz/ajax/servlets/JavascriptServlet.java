/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
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

package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.sistdase.json.JSONParser;
import com.ibm.sistdase.json.JSONSerializer;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.NLSMessages;
import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

public class JavascriptServlet extends AbstractResourceServlet {
	private static final String CLASS = JavascriptServlet.class.getName();
	private static final Logger log = Logger.getLogger(CLASS);
	static final long serialVersionUID = 1L;

	// CHANGED
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String, Object> exception = (Map<String, Object>) JSONParser.parse(request.getReader());
		Map<String, Object> result = new HashMap();
		String message = new JavascriptDebugOperation(exception, request).getResult();
		result.put("message", message);
		response.setContentType("text/json");
		Writer writer = ServletUtil.negotiateWriter(request, response);
		try {
			JSONSerializer.serialize(writer, result);
		} catch (IOException e) {
			// ADDED
			log.logp(Level.FINEST, CLASS, e.getClass().toString(), e.getStackTrace().toString());
		} catch (Exception e){
			e.printStackTrace();
		} finally {
			writer.close();
		}
	}
	
	@Override
	public String getContentType() {
		return "text/javascript";
	}
	
	@Override
	public void init() throws ServletException {
		try {
			AjaxFramework.setContextPath(getServletContext().getContextPath());
		} catch (Exception e) {
			AjaxFramework.log(e);
		}
	}
	
	@Override void serverRestarted(HttpServletRequest request, HttpServletResponse response) {
		try {
			Writer output = response.getWriter();
			output.write("alert(\"");
			output.write(NLSMessages.getMessage("message.restart", request.getLocale()).replace("\"", "\\\""));
			output.write("\");jazz.core.loader._serverRestarted=true;");
		} catch (IOException e) {
			throw new UnloggedException(e);
		}
	}
	
	// CHANGED
	@Override
	void write(Writer output, ResourceGraph graph, RenderContext context) throws IOException {
		if (graph.getProblems().isEmpty()) {
			graph.writeJavascript(output, context);
		} else {
			output.write("alert('");
			output.write(graph.getProblems().toString());
			output.write("');");
		}
	}
	
	static class NullAppendable implements Appendable {
		public int lineCount = 0;
		char last= 0;

		public Appendable append(CharSequence csq) throws IOException {
			return append(csq, 0, csq.length());
		}
		public Appendable append(char c) throws IOException {
			if ((c == '\n' && last != '\r') || c == '\r')
				lineCount++;
			last = c;
			return this;
		}
		public Appendable append(CharSequence csq, int start, int end) throws IOException {
			for (int i = start; i < end; i++)
				append(csq.charAt(i));
			return this;
		}
	}
}
