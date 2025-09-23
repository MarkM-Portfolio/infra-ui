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

import static org.junit.Assert.*;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.Test;
import org.mozilla.javascript.NativeObject;

@SuppressWarnings("nls")
public class DojoMessageBundleTest extends AbstractTest
{
  @Test
  public final void testGetFullPath()
  {
    r = new DojoMessageBundle(lconnBundle, "lconn.nls.messages");
    String fullPath = r.getFullPath();
    assertEquals("lconn/nls.messages", fullPath);
  }

  @Test
  public final void testWrite() throws Exception
  {
    r = new DojoMessageBundle(lconnBundle, "lconn.nls.messages");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_NO_MINIFY);
    String[] lines = buffer.toString().split("\\n");
    assertEquals(3, lines.length);
    assertEquals("dojo.provide(\"lconn.nls.messages\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.messages.en\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.messages.en="));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public final void testWriteUndefined() throws Exception
  {
    r = new DojoMessageBundle(lconnBundle, "lconn.nls.undefined");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_NO_MINIFY);
    String[] lines = buffer.toString().split("\\n");
    assertEquals(3, lines.length);
    assertEquals("dojo.provide(\"lconn.nls.undefined\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.undefined.en\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.undefined.en="));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_undefined.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public final void testConstruct()
  {
    r = new DojoMessageBundle(lconnBundle, "lconn.nls.messages");
    assertNotNull(r);
  }

  @Test
  public final void testGetLocalizedContent() throws Exception
  {
    r = new DojoMessageBundle(lconnBundle, "lconn.nls.messages");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_FRENCH_NO_MINIFY);
    String[] lines = buffer.toString().split("\\n");
    assertEquals(3, lines.length);
    assertEquals("dojo.provide(\"lconn.nls.messages\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.messages.fr\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.messages.fr="));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_fr.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_USA_STANDARD);
    lines = buffer.toString().split("\\n");
    assertEquals(3, lines.length);
    assertEquals("dojo.provide(\"lconn.nls.messages\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.messages.en_us\");", lines[1]);

    actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.messages.en_us="));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en_us.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public final void testGetLocalizedContentUnsupportedLocale() throws Exception
  {
    r = new DojoMessageBundle(lconnBundle, "lconn.nls.messages");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_IRISH);
    String[] lines = buffer.toString().split("\\n");
    assertEquals(3, lines.length);
    assertEquals("dojo.provide(\"lconn.nls.messages\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.messages.ga\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.messages.ga="));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }
}
