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

import net.jazz.ajax.model.RenderContext;


public class StyleSheetServlet extends AbstractResourceServlet {
	static final long serialVersionUID = 1L;

	@Override
	public String getContentType() {
		return "text/css";
	}
	
	// CHANGED: write problems
	@Override
	void write(java.io.Writer output, ResourceGraph graph, RenderContext context) throws java.io.IOException {
//		if (!graph.getProblems().isEmpty()) {
//			output.write("/*");
//			output.write(graph.getProblems().toString());
//			output.write("*/");
//		}
//		else
			graph.writeCSS(output, context);
	}
	
	// ADDED
	@Override
	protected boolean isFatalError(ResourceGraph graph) {
		return false;
	}
}
