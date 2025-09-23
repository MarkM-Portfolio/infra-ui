/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.web.resources.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class TestUploadEndpointServlet extends HttpServlet
{
  private static final long serialVersionUID = 1L;

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    if (!ServletFileUpload.isMultipartContent(request))
    {
      response.sendError(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }
    else
    {
      try
      {
        StringBuilder builder = new StringBuilder(200);
        builder.append("<html><body><textarea>{");

        int status = 200;
        Map<String, List<String>> params = new LinkedHashMap<String, List<String>>(5);

        FileItem file = null;

        ServletFileUpload upload = new ServletFileUpload(new DiskFileItemFactory());

        @SuppressWarnings("unchecked")
        List<FileItem> items = upload.parseRequest(request);

        for (FileItem item : items)
        {
          if (item.isFormField())
          {
            if (!params.containsKey(item.getFieldName()))
            {
              params.put(item.getFieldName(), new ArrayList<String>());
            }

            params.get(item.getFieldName()).add(item.getString());
          }
          else
          {
            file = item;
            if (item.getName().toLowerCase(Locale.ENGLISH).contains("error"))
            {
              status = 400;
            }
          }
        }

        builder.append("'status':").append(status).append(",'params':{");
        for (Map.Entry<String, List<String>> entry : params.entrySet())
        {
          String key = entry.getKey();
          List<String> vals = entry.getValue();

          builder.append("'").append(escape(key)).append("':[");
          for (String val : vals)
          {
            builder.append("'").append(escape(val)).append("',");
          }

          builder.deleteCharAt(builder.length() - 1).append("],");
        }

        builder.deleteCharAt(builder.length() - 1).append("},'file':{'size':").append(file.getSize()).append(", 'name':'");
        builder.append(escape(file.getName())).append("'}}</textarea></body></html>");

        response.getWriter().write(builder.toString());
        response.flushBuffer();
      }
      catch (FileUploadException e)
      {
        throw new ServletException(e);
      }
    }
  }

  // this is a test method. it is only a test method. it should NEVER be used in production. for production escaping, use a JSON library
  // like prereqs.sn/json4j.
  private String escape(String unescaped)
  {
    if (unescaped == null || unescaped.length() == 0)
    {
      return unescaped;
    }
    
    String escaped = unescaped.replace("'", "\\'");
    escaped = escaped.replace("\"", "\\\"");
    
    return escaped;
  }
}
