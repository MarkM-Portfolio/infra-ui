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

package net.jazz.ajax.tests.internal.util;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Dictionary;
import java.util.Hashtable;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.ServletService;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;

import org.junit.After;
import org.junit.Test;

@SuppressWarnings("nls")
public class ServletServiceTest
{

  final static String PATH = "/test/paid";

  final static String URI = "http://localhost:" + System.getProperty("org.osgi.service.http.port", "54250") + PATH;

  @After
  public final void unregisterServlet()
  {
    ServletService.unregisterServlet(PATH);
  }

  @Test
  public final void testRegisterServletStringServlet() throws Exception
  {
    // TODO:
    ServletService.registerServlet(PATH, new TestServlet());

    HttpClient client = new HttpClient();
    HttpMethod method = new GetMethod(URI);
    int status = client.executeMethod(method);
    assertEquals(HttpServletResponse.SC_PAYMENT_REQUIRED, status);
  }

  @Test
  public final void testRegisterServletStringServletDictionary() throws Exception
  {
    // TODO:
    Dictionary<String, String> dictionary = new Hashtable<String, String>();
    dictionary.put("foo", "BAR");
    dictionary.put("baz", "123");

    TestServlet servlet = new TestServlet();
    ServletService.registerServlet(PATH, servlet, dictionary);
    assertEquals("BAR", servlet.foo);
    assertEquals("123", servlet.baz);

    HttpClient client = new HttpClient();
    HttpMethod method = new GetMethod(URI);
    int status = client.executeMethod(method);
    assertEquals(HttpServletResponse.SC_PAYMENT_REQUIRED, status);
  }

  @Test
  public final void testRegisterServletStringServletDictionaryBoolean()
  {
    // TODO
  }

  @Test
  public final void testUnregisterServlet()
  {
    // TODO
  }

  @SuppressWarnings("serial")
  class TestServlet extends HttpServlet
  {
    public String foo;

    public String baz;

    @Override
    public void init(ServletConfig config) throws ServletException
    {
      foo = config.getInitParameter("foo");
      baz = config.getInitParameter("baz");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
      response.sendError(HttpServletResponse.SC_PAYMENT_REQUIRED, "Payment required");
    }
  }
}
