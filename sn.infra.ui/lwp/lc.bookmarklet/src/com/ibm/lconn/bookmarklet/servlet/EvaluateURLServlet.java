/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.servlet;

import java.io.IOException;
import java.net.URI;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class EvaluateURLServlet extends HttpServlet {
	
	private static final Log LOG = LogFactory.getLog(EvaluateURLServlet.class);

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String url = request.getParameter("url");
		
		if(url != null)
		{
			url = url.trim();
		}
		
		try
		{
			URI u = new URI(url.replaceAll("\\||\\{|\\}", "_"));
			
			if(! url.startsWith("file:"))
			{
				url = null;
				if(u.toString().matches("(\\b(https?|ftp|file):\\/\\/)?[-A-Za-z0-9+&@#\\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\\/%=~_|]"))
				{
					url = u.toString();
				}
			}
			
			if(url != null)
			{
				request.setAttribute("result", Boolean.TRUE);
			}
			else
			{
				request.setAttribute("result", Boolean.FALSE);
			}
			
		}
		catch(Exception e)
		{
			LOG.error("Invalid url: " + url);
			request.setAttribute("result", Boolean.FALSE);
		}
		
		getServletContext().getRequestDispatcher("/jsp/evaluateURL.jsp").forward(request, response);
	}

}
