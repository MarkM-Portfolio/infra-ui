/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.mozilla.javascript.NativeObject;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.model.DojoI18n;
import net.jazz.ajax.model.Resource;

import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class DojoI18nTest extends AbstractTest
{
  @Test
  public void testConstruct() throws Exception
  {
    r = DojoI18n.newDependency("lconn/nls/messages").resolve();
    assertNotNull(r);
  }

  @Test
  public void testResolve() throws Exception
  {
    r = DojoI18n.newDependency("lconn/nls/messages").resolve();
    s = Resource.resolve("dojo/i18n!lconn/nls/messages");
    assertEquals(r, s);
  }

  @Test
  public void testWrite() throws Exception
  {
    r = DojoI18n.newDependency("lconn/nls/messages").resolve();
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_NO_MINIFY);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(buffer));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.compressed.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public void testMinify() throws Exception
  {
    r = DojoI18n.newDependency("lconn/nls/messages").resolve();
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(buffer));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public void testNonExisting() throws Exception
  {
    r = DojoI18n.newDependency("lconn/nls/foo").resolve();
    StringBuffer buffer = new StringBuffer();
    boolean thrown = false;
    try
    {
      r.write(buffer, CONTEXT_STANDARD);
    }
    catch (Throwable t)
    {
      thrown = true;
    }
    assertTrue(thrown);
  }
}
