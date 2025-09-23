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
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.model.Sprite;
import net.jazz.ajax.model.SpriteLayout;

@SuppressWarnings("serial")
public class SpriteServlet extends LoggingHttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("image/png");
		String id = request.getPathInfo();
		String etag = request.getParameter("etag");
		if (id == null)
			writeError(response, "Missing ID");
		else if (etag == null)
			writeError(response, "Missing etag parameter");
		else {
			id = id.substring(1);
			SpriteLayout layout = Sprite.getLayout(id, etag);
			if (layout == null)
				writeError(response, "Unknown sprite or etag");
			else
				layout.writePNG(request, response);
		}
	}
	
	public void writeError(HttpServletResponse response, String reason) throws IOException {
		response.addHeader("X-sprite-error", String.valueOf(reason));
		InputStream input = getClass().getResourceAsStream("SpriteError.png");
		try {
			OutputStream output = response.getOutputStream();
			byte[] buffer = new byte[8192];
			int len;
			while((len = input.read(buffer)) != -1)
				output.write(buffer, 0, len);
		} finally {
			input.close();
		}
	}
}
