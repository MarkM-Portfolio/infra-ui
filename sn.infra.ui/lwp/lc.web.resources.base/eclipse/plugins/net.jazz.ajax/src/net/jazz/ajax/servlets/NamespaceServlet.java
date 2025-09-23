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

package net.jazz.ajax.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.model.WebBundle;

@SuppressWarnings("serial")
public class NamespaceServlet extends HttpServlet {

	private String root;

	public NamespaceServlet(String root) {
		super();
		this.root = root;
	}

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String path = req.getPathInfo();
		if (path != null) {
			String id = root + path.replace('/', '.');
			WebBundle bundle = WebBundle.bundleMatching(id);
			if (bundle != null) {
				id = bundle.getId();
				if (root.equals(id))
					throw new ServletException("NamespaceServlet invoked for path '"+root+"', expected WebBundleServlet");
				
				path = path.substring(id.length() - root.length() + 1);
				String forwardPath = "/web/" + bundle.getId() + "/" + path;
				
				RequestDispatcher dispatcher = getServletContext()
						.getRequestDispatcher(forwardPath);
				
				if (dispatcher != null) {
					dispatcher.forward(req, resp);
					return;
				}
			}
		}

		resp.sendError(HttpServletResponse.SC_NOT_FOUND);
	}

}
