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

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/
package net.jazz.ajax.tests.client.internal;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

/**
 * Listens for HTTP requests related to running web UI tests on installed web
 * browsers.
 */
public class BrowserClientServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String COMMAND_CLOSE = "/close";
	private static final String COMMAND_LAUNCH = "/launch";
	private static final String COMMAND_LIST = "/list";	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)	throws ServletException, IOException {
		String command = request.getPathInfo();
		if (command == null) {
			command = COMMAND_LIST;
		}
		if (COMMAND_LAUNCH.equals(command)) {
			BrowserManager.instance().launch(request.getParameter("browser"), request.getParameter("url"));
			response.getWriter().print("Success");
			response.getWriter().flush();
		} else if (COMMAND_CLOSE.equals(command)) {
			BrowserManager.instance().close(request.getParameter("browser"), request.getParameter("url"));
			response.getWriter().print("Success");
			response.getWriter().flush();
		} else if (COMMAND_LIST.equals(command)) {
			Map<String, Map<String, String>> browserMap = BrowserManager.instance().list();
			Document xmlDoc = new Document();
			Element browsers = new Element("browsers");
			for (String key : browserMap.keySet()) {
				Element browserElem = new Element("browser");
				browserElem.setAttribute("id", key);
				browserElem.setAttribute("version", browserMap.get(key).get("version"));
				browserElem.setAttribute("exec", browserMap.get(key).get("exec"));
				browsers.addContent(browserElem);
			}
			xmlDoc.setRootElement(browsers);
			response.setHeader("content-type", "application/xml");
			XMLOutputter xmlOut = new XMLOutputter(Format.getCompactFormat());
			xmlOut.output(xmlDoc, response.getWriter());
		} else {
			response.getWriter().print("Unknown command \"" + command + "\"");
			response.getWriter().flush();
		}
	}
}