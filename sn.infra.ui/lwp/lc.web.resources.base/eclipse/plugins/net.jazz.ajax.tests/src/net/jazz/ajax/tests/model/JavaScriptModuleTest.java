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

import net.jazz.ajax.model.JavaScriptModule;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.tests.AbstractTest;

import static org.junit.Assert.*;

import org.junit.Test;

@SuppressWarnings("nls")
public class JavaScriptModuleTest extends AbstractTest
{
  @Test
  public void testConstruct() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnfoo.js"), "lconn/foo");
    assertNotNull(r);
  }

  @Test
  public void testResolve() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnfoo.js"), "lconn/foo").register();
    s = Resource.resolve("lconn/foo");
    assertEquals(r, s);

    t = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnbar.js"), "lconn/bar").register();
    u = Resource.resolve("lconn/bar");
    assertEquals(t, u);
  }

  @Test
  public void testWrite() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnfoo.js"), "lconn/foo").register();
    String expected = readFile("/net/jazz/ajax/tests/resources/lconnfoo.compressed.js");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    t = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnbar.js"), "lconn/bar").register();
    expected = readFile("/net/jazz/ajax/tests/resources/lconnbar.compressed.js");
    t.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testMinify() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnfoo.js"), "lconn/foo").register();
    String expected = readFile("/net/jazz/ajax/tests/resources/lconnfoo.minified.js");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    t = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnbar.js"), "lconn/bar").register();
    expected = readFile("/net/jazz/ajax/tests/resources/lconnbar.minified.js");
    buffer = new StringBuffer();
    t.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }

  /*
   * Tests an issue in Jazz SDK 4.0.4 where a space between 'define' and the parens '()' caused the JavaScriptModule to fail parsing an AMD
   * module.
   */
  @Test
  public void testSpacesInDefine() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/spacesindefine.js"), "lconn/spacesindefine").register();
    String expected = readFile("/net/jazz/ajax/tests/resources/spacesindefine.minified.js");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }
  
  @Test
  public void testInstrumentedWithJSCover() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/instrumented_with_jscover.js"), "lconn/jscover").register();
    assertNotNull(r);
  }
}
