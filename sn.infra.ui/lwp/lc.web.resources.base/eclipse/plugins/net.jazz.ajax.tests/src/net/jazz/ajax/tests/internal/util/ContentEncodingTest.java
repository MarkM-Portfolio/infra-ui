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

import net.jazz.ajax.internal.util.ContentEncoding;
import net.jazz.ajax.tests.mocks.TestResponse;

import org.junit.Test;

@SuppressWarnings("nls")
public class ContentEncodingTest
{
  @Test
  public final void testEnum()
  {
    assertNotNull(ContentEncoding.gzip);
    assertNotNull(ContentEncoding.none);

    assertEquals("gzip", ContentEncoding.gzip.name());
    assertEquals("none", ContentEncoding.none.name());

    assertEquals(ContentEncoding.gzip, ContentEncoding.valueOf("gzip"));
    assertEquals(ContentEncoding.none, ContentEncoding.valueOf("none"));

    assertEquals(2, ContentEncoding.values().length);
  }

  @Test
  public final void testApplyTo()
  {
    TestResponse testResponse = new TestResponse();
    ContentEncoding.gzip.applyTo(testResponse);
    assertTrue(testResponse.headers.contains("Content-Encoding:gzip"));

    testResponse = new TestResponse();
    ContentEncoding.none.applyTo(testResponse);
    assertEquals(0, testResponse.headers.size());
  }
}
