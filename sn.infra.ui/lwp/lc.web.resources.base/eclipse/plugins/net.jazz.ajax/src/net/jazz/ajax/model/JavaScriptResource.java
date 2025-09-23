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

package net.jazz.ajax.model;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dojotoolkit.shrinksafe.ReplacedTokens;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.internal.util.Util;

import org.mozilla.javascript.EvaluatorException;

public class JavaScriptResource extends TextResource {
	
	public static final Type<JavaScriptResource> TYPE = Type.create("js");
	volatile String minified;
	static final Pattern ANONYMOUS_OBJECT_FUNCTION = Pattern.compile("(([a-zA-Z_][a-zA-Z0-9_]*)\\s*:\\s*function)\\s*\\(");
	static final Pattern ANONYMOUS_ASSIGNED_FUNCTION = Pattern.compile("(\\.([a-zA-Z_][a-zA-Z0-9_]*)\\s*=\\s*function)\\s*\\(");
	static final boolean IMPLICIT_FUNCTION_NAMES = !Boolean.getBoolean("net.jazz.ajax.model.JavaScriptResource.noImplicitNames");
	
	public JavaScriptResource(URL url, String id) {
		super(TYPE, url, id);
	}
	
	// ADDED
	public JavaScriptResource(URL[] url, String id) {
		super(TYPE, url, id);
	}
	
	CharSequence fixRawContent(StringBuilder result) {
		return result;
	}
	
	public List<ReplacedTokens> internalReplacedTokens() {
		List<ReplacedTokens> result = new ArrayList();
		try {
			JavaScriptUtil.internalMinify(Util.stringBuffer(url.openStream()).toString(), result);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return result;
	}
	
	@Override
	// CHANGED: print Rhino evaluation error
	void load(StringBuilder content) {
		try {
			minified = JavaScriptUtil.minify(content.toString());
		} catch (EvaluatorException e) {
			String message = "Unable to minify " + getFullPath() + ", script error at [line "
			+ e.lineNumber() + ", column " + e.columnNumber() + "]: " + e.getMessage();
			throw new ResourceUnavailableException(message, e);
		}
	}

	public void write(Appendable output, RenderContext context) throws IOException {
		switch (context.mode) {
			case NO_MINIFY:
				output.append("\n;");
			case DEBUG:
				CharSequence content = fixRawContent(Util.stringBuilder(url.openStream()));
				if (IMPLICIT_FUNCTION_NAMES) {
					int left = 0, right = content.length(), counter = 0;
					StringBuilder buffer = new StringBuilder(right * 11 / 10); //110% of original size
					Matcher m, matchers[] = {ANONYMOUS_ASSIGNED_FUNCTION.matcher(content),
							ANONYMOUS_OBJECT_FUNCTION.matcher(content)};
					int position[] = {right, right};
					if (matchers[0].find())
						position[0] = matchers[0].start();
					if (matchers[1].find())
						position[1] = matchers[1].start();
					while (position[0] < right || position[1] < right) {
						int which = (position[0] < position[1]) ? 0 : 1;
						m = matchers[which];
						buffer.append(content, left, m.start());
						buffer.append(m.group(1) + ' ' + m.group(2) + "_$" + (counter++) + '(');
						left = m.end();
						position[which] = m.find() ? m.start() : right;
					}
					buffer.append(content, left, right);
					output.append(buffer);
				} else
					output.append(content);
				output.append("\n");
				break;
			case STANDARD:
				output.append("\n;");
				output.append(minified);
				output.append("\n");
				break;
		}
	}
	
}
