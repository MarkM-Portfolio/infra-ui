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

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class MasterTemplate {
	
	static final Pattern PATTERN = Pattern.compile("(?://)?\\$\\{([a-zA-Z_0-9.]+)\\}");

	String file;
	List<CharSequence> fragments;
	List<String> parameters;
	
	public MasterTemplate(CharSequence content) {
		loadTemplate(content);
	}

	public MasterTemplate(InputStream resource) {
		this(Util.stringBuffer(resource));
	}

	String evaluate(ParameterizedTemplate context) {
		//For now, we re-load the template on every evaluation
		StringBuilder result = new StringBuilder();
		int size = fragments.size();
		for (int i = 0; i < size; i++) {
			result.append(fragments.get(i));
			if (i < size - 1)
				result.append(context.sections.get(parameters.get(i)));
		}
		return result.toString();
	}
	
	private void loadTemplate(CharSequence template) {
		fragments = new ArrayList();
		parameters = new ArrayList();
		Matcher m = PATTERN.matcher(template);
		
		int left = 0, right;
		boolean matched;
		do {
			/**
			 * Stop at either the beginning of the next match, or the end of the file.
			 */
			if (matched = m.find())
				right = m.start();
			else
				right = template.length();
			
			/**
			 * Add the current fragment
			 */
			fragments.add(template.subSequence(left, right));
			
			/**
			 * If found, add the matched parameter and advance for the next fragment.
			 */
			if (matched) {
				parameters.add(m.group(1));
				left = m.end();
			}
		} while (matched);
	}

	public ParameterizedTemplate newInstance() {
		return new ParameterizedTemplate(this);
	}
	
}
