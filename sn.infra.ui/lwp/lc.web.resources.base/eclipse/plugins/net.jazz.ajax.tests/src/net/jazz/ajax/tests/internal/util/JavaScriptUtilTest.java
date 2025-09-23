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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.tests.AbstractTest;

import org.dojotoolkit.shrinksafe.ReplacedTokens;

import org.junit.BeforeClass;
import org.junit.Test;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeObject;

@SuppressWarnings("nls")
public class JavaScriptUtilTest extends AbstractTest
{
  static String INTERNAL_MINIFY_UNCOMPRESSED;

  static String INTERNAL_MINIFY;

  @BeforeClass
  public static void loadScripts() throws Exception
  {
    INTERNAL_MINIFY_UNCOMPRESSED = readFile("/net/jazz/ajax/tests/resources/testinternalminify.uncompressed.js");

    INTERNAL_MINIFY = readFile("/net/jazz/ajax/tests/resources/testinternalminify.js");
  }

  @Test
  public final void testEval()
  {
    NativeObject object = JavaScriptUtil.eval("({foo:'bar',baz: 1})");
    assertNotNull(object);
    String string = JavaScriptUtil.eval("'rhino'");
    assertNotNull(string);
    assertEquals("rhino", string);
    NativeArray array = JavaScriptUtil.eval("[1, 2, 3, 4]");
    assertNotNull(array);
    Double number = JavaScriptUtil.eval("12345");
    assertNotNull(number);
    assertEquals((Double) 12345.0, number);
  }

  @Test
  public final void testMinify() throws Exception
  {
    String minified = JavaScriptUtil.minify(INTERNAL_MINIFY_UNCOMPRESSED);
    assertNotNull(minified);
    assertEquals(INTERNAL_MINIFY, minified);
  }

  @Test
  public final void testInternalMinify() throws Exception
  {
    List<ReplacedTokens> tokens = new ArrayList<ReplacedTokens>();
    String minified = JavaScriptUtil.internalMinify(INTERNAL_MINIFY_UNCOMPRESSED, tokens);
    assertNotNull(minified);
    assertNotNull(tokens);
    List<String> keys = new ArrayList<String>();
    for (ReplacedTokens replaced : tokens)
    {
      Map<String, String> replacements = replaced.getReplacements();
      for (String key : replacements.keySet())
        if (!keys.contains(key))
          keys.add(key);
    }
    assertEquals(3, keys.size());
    assertTrue(keys.contains("abracadabra"));
    assertTrue(keys.contains("hocuspocus"));
    assertTrue(keys.contains("internal"));
    assertEquals(INTERNAL_MINIFY, minified);
  }

  @Test
  public final void testConvertNativeObject()
  {
    NativeObject object = JavaScriptUtil.eval("({foo:'bar',baz: 1})");
    Map<String, Object> result = JavaScriptUtil.convert(object);
    assertNotNull(result);
    assertNotNull(result.keySet());
    assertNotNull(result.values());
    assertEquals(2, result.keySet().size());
    assertEquals(2, result.values().size());
    assertTrue(result.values().contains("bar"));
    assertTrue(result.values().contains((Double) 1.0));
    assertEquals("bar", result.get("foo"));
    assertEquals((Double) 1.0, result.get("baz"));
  }

  @Test
  public final void testConvertNativeArray()
  {
    NativeArray array = JavaScriptUtil.eval("[1, 2, 3, 4, undefined, 'hello', function(){return 1;}]");
    List<Object> result = JavaScriptUtil.convert(array);
    assertNotNull(result);
    assertEquals(7, result.size());
    assertEquals(1.0, result.get(0));
    assertEquals(2.0, result.get(1));
    assertEquals(3.0, result.get(2));
    assertEquals(4.0, result.get(3));
    assertEquals("<undefined>", result.get(4));
    assertEquals("hello", result.get(5));
    // TODO: InterpretedFunction is not visible
    // assertTrue(result.get(6) instanceof org.mozilla.javascript.internal.InterpretedFunction);
  }

}
