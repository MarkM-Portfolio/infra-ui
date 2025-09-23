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

package net.jazz.ajax.tests.model;

import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.tests.AbstractTest;

import static org.junit.Assert.*;

import org.junit.Test;

@SuppressWarnings("nls")
public class JavaScriptResourceTest extends AbstractTest
{
  @Test
  public void testConstruct() throws Exception
  {
    r = new JavaScriptResource(getClass().getResource("/net/jazz/ajax/tests/resources/bar.js"), "foo.bar");
    assertNotNull(r);
  }

  @Test
  public void testResolve() throws Exception
  {
    r = new JavaScriptResource(getClass().getResource("/net/jazz/ajax/tests/resources/bar.js"), "foo.bar").register();
    s = Resource.resolve("foo.bar");
    assertEquals(r, s);

    t = new JavaScriptResource(getClass().getResource("/net/jazz/ajax/tests/resources/math.js"), "foo.math").register();
    u = Resource.resolve("foo.math");
    assertEquals(t, u);
  }

  @Test
  public void testWrite() throws Exception
  {
    r = new JavaScriptResource(getClass().getResource("/net/jazz/ajax/tests/resources/bar.js"), "foo.bar").register();
    String expected = readFile("/net/jazz/ajax/tests/resources/bar.compressed.js");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    t = new JavaScriptResource(getClass().getResource("/net/jazz/ajax/tests/resources/math.js"), "foo.math").register();
    expected = readFile("/net/jazz/ajax/tests/resources/math.compressed.js");
    t.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testMinify() throws Exception
  {
    r = new JavaScriptResource(getClass().getResource("/net/jazz/ajax/tests/resources/bar.js"), "foo.bar").register();
    String expected = readFile("/net/jazz/ajax/tests/resources/bar.minified.js");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    t = new JavaScriptResource(getClass().getResource("/net/jazz/ajax/tests/resources/math.js"), "foo.math").register();
    expected = readFile("/net/jazz/ajax/tests/resources/math.minified.js");
    buffer = new StringBuffer();
    t.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }
}
