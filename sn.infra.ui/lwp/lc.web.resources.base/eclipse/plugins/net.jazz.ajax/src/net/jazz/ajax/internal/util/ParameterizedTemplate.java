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

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class ParameterizedTemplate {

	Map<String, StringBuilder> sections = new HashMap();
	MasterTemplate template;

	ParameterizedTemplate(MasterTemplate template) {
		this.template = template;
	}
	
	public StringBuilder getParameter(String id) {
		StringBuilder result = sections.get(id);
		if (result == null)
			sections.put(id, result = new StringBuilder());
		return result;
	}

	public Collection<String> getParameters() {
		return template.parameters;
	}

	public String getResult() {
		return template.evaluate(this);
	}

}
