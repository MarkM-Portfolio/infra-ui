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

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.SimpleTimeZone;

import net.jazz.ajax.internal.util.CacheCondition;
import net.jazz.ajax.internal.util.CacheWindow;

import net.jazz.ajax.tests.mocks.TestHttpRequest;
import net.jazz.ajax.tests.mocks.TestRequest;

import org.junit.Test;

@SuppressWarnings("nls")
public class CacheConditionTest
{
  final static String IF_MODIFIED_SINCE = "If-Modified-Since";

  final static String IF_NONE_MATCH = "If-None-Match";

  @Test
  public final void testCacheCondition()
  {
    CacheCondition c = new CacheCondition();
    assertNotNull(c);
  }

  @Test
  public final void testAcceptsConditionally() throws Exception
  {
    long now = System.currentTimeMillis();

    // Same lastModified, no etag
    TestRequest testRequest = new TestRequest();
    CacheWindow w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_MODIFIED_SINCE, new Date(w.getLastModified()).toString());
    CacheCondition c = CacheCondition.create(testRequest);
    assertTrue(c.acceptsConditionally(w));

    // Same lastModified, same etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_MODIFIED_SINCE, new Date(w.getLastModified()).toString());
    testRequest.setHeaders(IF_NONE_MATCH, "abcd");
    c = CacheCondition.create(testRequest);
    assertTrue(c.acceptsConditionally(w));

    // Same lastModified, different etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_MODIFIED_SINCE, new Date(w.getLastModified()).toString());
    testRequest.setHeaders(IF_NONE_MATCH, "efgh");
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsConditionally(w));

    // lastModified == -1, same etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_NONE_MATCH, "abcd");
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsConditionally(w));

    // lastModified == -1, different etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_NONE_MATCH, "efgh");
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsConditionally(w));

    // lastModified == -1, no etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsConditionally(w));

    Thread.sleep(1000);

    // Different lastModified, same etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_MODIFIED_SINCE, new Date().toString());
    testRequest.setHeaders(IF_NONE_MATCH, "abcd");
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsConditionally(w));

    // Different lastModified, different etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_MODIFIED_SINCE, new Date().toString());
    testRequest.setHeaders(IF_NONE_MATCH, "efgh");
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsConditionally(w));

    // Different lastModified, no etag
    testRequest = new TestRequest();
    w = new CacheWindow(now, 2, 3, "abcd");
    testRequest.setHeaders(IF_MODIFIED_SINCE, new Date().toString());
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsConditionally(w));
  }

  /*
   * FIXME: this test relies on timestamps generated when objects are instantiated, and will fail if interrupted, e.g. with a breakpoint,
   * before the marker HERE is reached.
   */
  @Test
  public final void testAcceptsFreshness() throws Exception
  {
    int TS1 = 1, TS2 = 2, TS3 = 3;

    CacheWindow w1 = new CacheWindow(-1, -1, TS1);
    CacheWindow w2 = new CacheWindow(-1, -1, TS2);
    CacheWindow w3 = new CacheWindow(-1, -1, TS3);
    String CACHE_CONTROL = MessageFormat.format("max-age={0}", TS2);

    // freshFor == maxAge
    // w.timestamp + age * 1000 >= timestamp
    TestRequest testRequest = new TestRequest();
    testRequest.setHeaders("Cache-Control", CACHE_CONTROL);
    CacheCondition c = CacheCondition.create(testRequest);
    assertTrue(c.acceptsFreshness(w2));

    // freshFor < maxAge
    // w.timestamp + age * 1000 >= timestamp
    testRequest = new TestRequest();
    testRequest.setHeaders("Cache-Control", CACHE_CONTROL);
    c = CacheCondition.create(testRequest);
    assertTrue(c.acceptsFreshness(w1));

    // freshFor > maxAge
    // w.timestamp + age * 1000 >= timestamp
    testRequest = new TestRequest();
    testRequest.setHeaders("Cache-Control", CACHE_CONTROL);
    c = CacheCondition.create(testRequest);
    assertTrue(c.acceptsFreshness(w3));

    // HERE
    // Wait > 3s to let CacheWindows expire
    Thread.sleep(3001);

    // freshFor == maxAge
    // w.timestamp + age * 1000 < timestamp
    testRequest = new TestRequest();
    testRequest.setHeaders("Cache-Control", CACHE_CONTROL);
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsFreshness(w2));

    // freshFor < maxAge
    // w.timestamp + age * 1000 < timestamp
    testRequest = new TestRequest();
    testRequest.setHeaders("Cache-Control", CACHE_CONTROL);
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsFreshness(w1));

    // freshFor > maxAge
    // w.timestamp + age * 1000 < timestamp
    testRequest = new TestRequest();
    testRequest.setHeaders("Cache-Control", "max-age=2592000");
    c = CacheCondition.create(testRequest);
    assertFalse(c.acceptsFreshness(w3));
  }

  @Test
  public final void testApplyTo()
  {
    Date now = new Date();
    String NOW = now.toString();
    SimpleDateFormat df = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", Locale.ENGLISH);
    df.setTimeZone(new SimpleTimeZone(0, "GMT"));
    String NOW_RFC822 = df.format(now);

    // Same lastModified, no etag
    TestRequest testRequest = new TestRequest();
    testRequest.setHeaders(IF_MODIFIED_SINCE, NOW);
    CacheCondition c = CacheCondition.create(testRequest);

    TestHttpRequest testHttpRequest = new TestHttpRequest();
    c.applyTo(testHttpRequest);
    assertEquals(NOW_RFC822, testHttpRequest.getFirstHeader(IF_MODIFIED_SINCE).getValue());
  }

  @Test
  public final void testIfNewerThan()
  {
    // TODO: method is protected
  }

  @Test
  public final void testToString()
  {
    // TODO:
  }

  @Test
  public final void testCreate()
  {
    // Same lastModified, no etag
    TestRequest testRequest = new TestRequest();
    CacheCondition c = CacheCondition.create(testRequest);
    assertNotNull(c);
  }
}
