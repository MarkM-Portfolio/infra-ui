/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.web.resources.test.customresources;

import static org.junit.Assert.*;
import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.model.DojoI18n;

import org.junit.Test;
import org.mozilla.javascript.NativeObject;

@SuppressWarnings("nls")
public class CustomDojoI18nTest extends AbstractCustomizationTest
{
  @Test
  public void testOverrideDojoI18nBuiltIn() throws Exception
  {
    final String PREAMBLE = "\n;define(\"dojo/i18n!lconn.test/test/nls/colors\", ";

    // Ensure there's no custom resource in the customization directory
    deleteCustomJavascriptModule("lconn.test.test.nls.colors");

    // Resolve a built-in DojoI18n module
    r = DojoI18n.newDependency("lconn.test/test/nls/colors").resolve();
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(buffer.toString(), PREAMBLE));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.nls.colors.minified.js")));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_NO_MINIFY);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer.toString(), PREAMBLE));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.nls.colors.compressed.js")));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    createCustomJavaScriptModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.nls.colors.custom.js"),
        "lconn.test.test.nls.colors");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * This time the output will change, because the resource was created with
     * net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_STANDARD);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer.toString(), PREAMBLE));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.nls.colors.custom.minified.js")));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_NO_MINIFY);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer.toString(), PREAMBLE));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.nls.colors.custom.compressed.js")));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    deleteCustomJavascriptModule("lconn.test.test.nls.colors");

    /*
     * Verify that after deleting the custom resources and calling net.jazz.ajax.model.Resource.internalRefresh(RenderContext) the original
     * file is restored
     */
    r.internalRefresh(CONTEXT_STANDARD);

    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_STANDARD);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer.toString(), PREAMBLE));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.nls.colors.minified.js")));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_NO_MINIFY);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer.toString(), PREAMBLE));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.nls.colors.compressed.js")));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public void testOverrideDojoI18nProgrammatic() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomJavascriptModule("lconn.nls.messages");

    r = DojoI18n.newDependency("lconn/nls/messages").resolve();
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(buffer));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_NO_MINIFY);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    createCustomJavaScriptModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/messages_en.custom.js"),
        "lconn.nls.messages");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * Note we expect the output to be still the original file, because the resource was created programmatically. Custom resources are only
     * available to modules created using net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_STANDARD);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    buffer.delete(0, buffer.length());

    r.write(buffer, CONTEXT_NO_MINIFY);
    actual = JavaScriptUtil.eval(toLiteralObject(buffer));
    assertNotNull(actual);
    expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.compressed.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    deleteCustomJavascriptModule("lconn.nls.messages");
  }
}
