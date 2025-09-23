/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dojotoolkit.shrinksafe.DebugData;
import org.dojotoolkit.shrinksafe.ReplacedTokens;

import net.jazz.ajax.internal.util.CacheCondition;
import net.jazz.ajax.internal.util.URIUtil;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

public class JavascriptDebugOperation {

	final Map<String, Object> exception;
	final RenderContext context;
	Map<String, DebugResourceGraph> graphMap = new HashMap();
	List<Frame> frames = new ArrayList();

	JavascriptDebugOperation(Map<String, Object> exception, HttpServletRequest request) {
		this.exception = exception;
		this.context = RenderContext.forRequest(request);
	}

	String getResult() throws IOException {
		StringBuilder result = new StringBuilder();
		String message = (String) exception.get("message");
		String filename = (String) exception.get("url");
		long line = (Long) exception.get("line");
		String token = message.substring(0, message.indexOf(" "));
		Frame messageFrame = new Frame(filename, line, token);
		decode(messageFrame);
		result.append(message);
		if (messageFrame.token != token)
			result.append("(\"" + token + "\" was \"" + messageFrame.token + "\")");
		result.append("\n");
		
		List<Map<String, Object>> jsonStack = (List) exception.get("stack");
		if (jsonStack != null)
			for (Map<String, Object> frame : jsonStack) {
				if (!frame.containsKey("line"))
					continue;
				filename = (String) frame.get("url");
				line = (Long)frame.get("line");
				token = (String)frame.get("token");
				frames.add(new Frame(filename, line, token));
			}
		for (Frame frame : frames) {
			decode(frame);
			frame.write(result);
		}
		return result.toString();
	}
	
	void decode(Frame frame) {
		DebugResource resource = frame.graph.getResource(frame.line);
		if (resource != null)
			resource.decodeFrame(frame);
	}

	DebugResourceGraph graph(String filename) throws IOException {
		DebugResourceGraph result = graphMap.get(filename);
		if (result == null) {
			result = new DebugResourceGraph(filename, context);
			graphMap.put(filename, result);
		}
		return result;
	}
	
	static class DebugResource {
		int lineStart, lineEnd;
		JavaScriptResource resource;
		List<ReplacedTokens> replacedTokens;

		DebugResource(int lineStart, int lineEnd, JavaScriptResource resource) {
			this.lineStart = lineStart;
			this.lineEnd = lineEnd;
			this.resource = resource;
		}
		
		void decodeFrame(Frame frame) {
			frame.filename = resource.getFullPath();
			int line = frame.line - lineStart - 1;
			for (ReplacedTokens replacedTokens : getReplacedTokens()) {
				DebugData debug = replacedTokens.getDebugData();
				if (debug.compressedStart > line || line > debug.compressedEnd)
					continue;
				if (frame.token != null) {
					Map<String, String> replacements = replacedTokens.getReplacements();
					for (String key : replacements.keySet()) {
						if (replacements.get(key).equals(frame.token)) {
							frame.token = key;
							frame.rangeStart = debug.start;
							frame.rangeEnd = debug.end;
						}
					}
				} else {
					//Is the DebugData's range narrower than the previously assigned range?
					if (debug.start > frame.rangeStart || debug.end < frame.rangeEnd) {
						frame.rangeStart = debug.start;
						frame.rangeEnd = debug.end;
					}
				}
			}
		}

		List<ReplacedTokens> getReplacedTokens() {
			if (replacedTokens == null)
				replacedTokens = resource.internalReplacedTokens();
			return replacedTokens;
		}

		boolean contains(int line) {
			return lineStart <= line && line < lineEnd;
		}
	}
	
	static class DebugResourceGraph {
		ResourceGraph graph;
		List<DebugResource> debuggableResources = new ArrayList();

		DebugResourceGraph(String filename, RenderContext context) throws IOException {
			String inc = URIUtil.queryParam(filename, "include");
			String exc = URIUtil.queryParam(filename, "exclude");
			List<Resource> includes = Resource.resolveAll(inc.split(ResourceGraph.DELIMETER));
			List<Resource> excludes = Collections.EMPTY_LIST;
			if (exc != null)
				excludes = Resource.resolveAll(exc.split(ResourceGraph.DELIMETER));
			graph = new ResourceGraphOperation(context, includes, excludes).getResult(new CacheCondition()).getResult();
			
			NullAppendable counter = new NullAppendable();
			for (Resource resource : graph.getJavascriptResources()) {
				int offset = counter.lineCount;
				resource.write(counter, graph.context);
				if (resource instanceof JavaScriptResource)
					debuggableResources.add(new DebugResource(
							offset, counter.lineCount, (JavaScriptResource) resource));
			}
		}

		DebugResource getResource(int line) {
			for (DebugResource resource : debuggableResources)
				if (resource.contains(line))
					return resource;
			return null;
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

	class Frame {
		final DebugResourceGraph graph;
		final int line;
		String token, filename;
		int rangeStart, rangeEnd = Integer.MAX_VALUE;
		
		Frame(String filename, long line, String token) throws IOException {
			this.filename = filename;
			this.graph = graph(filename);
			this.line = (int) line;
			if (token.length() > 0)
				this.token = token;
		}

		void write(StringBuilder result) {
			if (token != null) {
				result.append(token);
			}
			result.append("()@");
			result.append(filename);
			result.append('[');
			result.append(rangeStart);
			result.append('-');
			result.append(rangeEnd);
			result.append("]\n");
		}
	}
	
}
