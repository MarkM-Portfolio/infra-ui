/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.internal.util;

import static org.junit.Assert.*;

import java.io.OutputStream;
import java.util.zip.GZIPOutputStream;

import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.tests.mocks.TestRequest;
import net.jazz.ajax.tests.mocks.TestResponse;

import org.junit.Before;
import org.junit.Test;

@SuppressWarnings("nls")
public class ServletUtilTest
{
  TestRequest request;

  TestResponse response;

  @Before
  public final void setup()
  {
    request = new TestRequest();
    response = new TestResponse();
  }

  @Test
  public final void testNegotiateOutputStreamNoAcceptEncoding() throws Exception
  {
    OutputStream os = ServletUtil.negotiateOutputStream(request, response);
    assertFalse(os.getClass().equals(GZIPOutputStream.class));
  }

  @Test
  public final void testNegotiateOutputStreamAcceptEncodingGZIP() throws Exception
  {
    request.setHeaders("Accept-Encoding", "gzip");
    OutputStream os = ServletUtil.negotiateOutputStream(request, response);
    assertTrue(os.getClass().equals(GZIPOutputStream.class));
  }

  @Test
  public final void testNegotiateOutputStreamAcceptEncodingPack200() throws Exception
  {
    request.setHeaders("Accept-Encoding", "pack200-gzip");
    OutputStream os = ServletUtil.negotiateOutputStream(request, response);
    assertFalse(os.getClass().equals(GZIPOutputStream.class));
    assertTrue(response.headers.contains("Content-Encoding:pack200-gzip"));
  }

}
