/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.mocks;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

public class TestResponse implements HttpServletResponse
{

  public int status;

  public List<String> headers = new ArrayList<String>();

  private ServletOutputStream out = new ServletOutputStreamWrapper();

  public void flushBuffer() throws IOException
  {
    // TODO Auto-generated method stub

  }

  public Object getStatus()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getBufferSize()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public String getCharacterEncoding()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String getContentType()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Locale getLocale()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public ServletOutputStream getOutputStream() throws IOException
  {
    return out;
  }

  public PrintWriter getWriter() throws IOException
  {
    // TODO Auto-generated method stub
    return null;
  }

  public boolean isCommitted()
  {
    // TODO Auto-generated method stub
    return false;
  }

  public void reset()
  {
    // TODO Auto-generated method stub

  }

  public void resetBuffer()
  {
    // TODO Auto-generated method stub

  }

  public void setBufferSize(int arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setCharacterEncoding(String arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setContentLength(int arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setContentType(String arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setLocale(Locale arg0)
  {
    // TODO Auto-generated method stub

  }

  public void addCookie(Cookie arg0)
  {
    // TODO Auto-generated method stub

  }

  public void addDateHeader(String arg0, long arg1)
  {
    // TODO Auto-generated method stub

  }

  public void addHeader(String arg0, String arg1)
  {
    this.headers.add(arg0 + ":" + arg1);
  }

  public void addIntHeader(String arg0, int arg1)
  {
    // TODO Auto-generated method stub

  }

  public boolean containsHeader(String arg0)
  {
    // TODO Auto-generated method stub
    return false;
  }

  public String encodeRedirectURL(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String encodeRedirectUrl(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String encodeURL(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public String encodeUrl(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public void sendError(int arg0) throws IOException
  {
    // TODO Auto-generated method stub

  }

  public void sendError(int arg0, String arg1) throws IOException
  {
    // TODO Auto-generated method stub

  }

  public void sendRedirect(String arg0) throws IOException
  {
    // TODO Auto-generated method stub

  }

  public void setDateHeader(String arg0, long arg1)
  {
    this.headers.add(arg0 + ":" + String.valueOf(arg1));
  }

  public void setHeader(String arg0, String arg1)
  {
    this.headers.add(arg0 + ":" + arg1);
  }

  public void setIntHeader(String arg0, int arg1)
  {
    // TODO Auto-generated method stub

  }

  public void setStatus(int status)
  {
    this.status = status;
  }

  public void setStatus(int arg0, String arg1)
  {
    // TODO Auto-generated method stub

  }

  public String getResponseText()
  {
    return out.toString();
  }
}

class ServletOutputStreamWrapper extends ServletOutputStream
{
  private Writer writer = new StringWriter();

  @Override
  public void write(int c) throws IOException
  {
    writer.write(c);
  }

  @Override
  public void println(String s) throws IOException
  {
    writer.write(s + "\n");
  }

  public String toString()
  {
    return writer.toString();
  }
}