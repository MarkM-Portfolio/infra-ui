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

import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.tests.mocks.TestResponse;

import static org.junit.Assert.*;
import org.junit.Test;

@SuppressWarnings("nls")
public class CacheWindowTest
{
  @Test
  public void construct() throws Exception
  {
    CacheWindow w = new CacheWindow(12345L, 6789, 10);
    assertNotNull(w);
    // lastModified is moduloed 1000
    assertEquals(12000L, w.getLastModified());
    assertEquals(6789, w.getMaxAge());
    assertNull(w.getETag());

    w = new CacheWindow(6789L, 12345, 10, "abcde");
    assertNotNull(w);
    // lastModified is moduloed 1000
    assertEquals(6000L, w.getLastModified());
    assertEquals(12345, w.getMaxAge());
    assertEquals("abcde", w.getETag());
  }

  @Test
  public void renew() throws Exception
  {
    CacheWindow w = new CacheWindow(50000L, 0, 0);
    CacheWindow y = new CacheWindow(60000L, 0, 0);

    long t = w.getTimestamp();
    Thread.sleep(100);
    w.renew();
    assertTrue(t < w.getTimestamp());

    w.renew(y);
    assertEquals(y.getTimestamp(), w.getTimestamp());
  }

  @Test
  public void applyToResponse() throws Exception
  {
    CacheWindow w = new CacheWindow(60000L, 12345, 0, "fghij");
    TestResponse r = new TestResponse();
    w.applyTo(r);
    assertEquals(4, r.headers.size());
    long t = w.getTimestamp();
    assertTrue(r.headers.contains("Last-Modified:60000"));
    assertTrue(r.headers.contains("Expires:" + String.valueOf(t + 12345000)));
    assertTrue(r.headers.contains("Cache-Control:public, max-age=12345, s-maxage=12345"));
    assertTrue(r.headers.contains("ETag:\"fghij\""));

    CacheWindow y = new CacheWindow(50000L, 12345, 0, "fghij");
    TestResponse s = new TestResponse();
    y.applyTo(s, 200);
    assertEquals(200, s.status);
    assertEquals(4, s.headers.size());
    t = y.getTimestamp();
    assertTrue(s.headers.contains("Last-Modified:50000"));
    assertTrue(s.headers.contains("Expires:" + String.valueOf(t + 12345000)));
    assertTrue(s.headers.contains("Cache-Control:public, max-age=12345, s-maxage=12345"));
    assertTrue(s.headers.contains("ETag:\"fghij\""));
  }
}
