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

import java.net.URL;
import java.util.Arrays;

import net.jazz.ajax.internal.util.Util;

import org.junit.Test;

@SuppressWarnings("nls")
public class UtilTest
{

  @Test
  public final void testJoin()
  {
    StringBuffer sb = new StringBuffer();
    Util.join(sb, ":", Arrays.asList("one", "two", "three"));
    assertEquals("one:two:three", sb.toString());
  }

  @Test
  public final void testParseTimeRFC2616()
  {
    // TODO:
  }

  @Test
  public final void testStringBuilderURLArray()
  {
    // TODO:
  }

  @Test
  public final void testStringBuilderURL()
  {
    // TODO:
  }

  @Test
  public final void testStringBuilderInputStream()
  {
    // TODO:
  }

  @Test
  public final void testGetLastModified()
  {
    // TODO:
  }

  @Test
  public final void testStringBuffer()
  {
    // TODO:
  }

  @Test
  public final void testGetURLs()
  {
    final URL[] u1 = new URL[] { null, getClass().getResource("") };
    URL[] ret = Util.getURLs(u1);
    for (int i = 0; i < u1.length; i++)
      assertEquals(u1[i], ret[i]);

    final URL[] u2 = new URL[] { null, null };
    assertNull(Util.getURLs(u2));
  }

  @Test
  public final void testGetURL()
  {
    final URL[] u1 = new URL[] { null, getClass().getResource("") };
    assertEquals(getClass().getResource(""), Util.getURL(u1));

    final URL[] u2 = new URL[] { null, null };
    assertNull(Util.getURL(u2));
  }

  @Test
  public final void testToPath()
  {
    // Does its job
    assertEquals("lconn/foo/bar/test.html", Util.toPath("lconn.foo.bar/test.html"));
    assertEquals("lconn/foo/bar/test.htm", Util.toPath("lconn.foo.bar/test.htm"));
    assertEquals("lconn/foo/bar/test.js", Util.toPath("lconn.foo.bar/test.js"));

    // Idempotence
    assertEquals("lconn/foo/bar/test.htm", Util.toPath("lconn/foo/bar/test.htm"));
    assertEquals("lconn/foo/bar/test.html", Util.toPath("lconn/foo/bar/test.html"));
    assertEquals("lconn/foo/bar/test.js", Util.toPath("lconn/foo/bar/test.js"));

    // Edge cases
    assertEquals("test.htm", Util.toPath("test.htm"));
    assertEquals("test.html", Util.toPath("test.html"));
    assertEquals("test.js", Util.toPath("test.js"));

    // Null
    assertNull(Util.toPath(null));
  }

}
