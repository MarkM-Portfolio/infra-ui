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

package com.ibm.lconn.web.resources.test.customresources;

import static org.junit.Assert.assertEquals;
import net.jazz.ajax.model.JavaScriptModule;
import net.jazz.ajax.model.Resource;

import org.junit.Test;

@SuppressWarnings("nls")
public class CustomJavaScriptModuleTest extends AbstractCustomizationTest
{
  @Test
  public void testOverrideJavascriptModuleBuiltIn() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomJavascriptModule("lconn.test.test.iframe");

    r = Resource.resolve("lconn.test/test/iframe");
    String expected = readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.iframe.compressed.js"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.iframe.minified.js"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    createCustomJavaScriptModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.iframe.custom.js"),
        "lconn.test/test/iframe");

    r.internalRefresh(CONTEXT_STANDARD);

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.iframe.custom.minified.js"));
    buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.iframe.custom.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomJavascriptModule("lconn.test.test.iframe");

    /*
     * Verify that after deleting the custom resources and calling net.jazz.ajax.model.Resource.internalRefresh(RenderContext) the original
     * file is restored
     */
    r.internalRefresh(CONTEXT_STANDARD);

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.iframe.minified.js"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.iframe.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testOverrideJavascriptModuleProgrammatic() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconntest.js"), "lconn/test").register();
    String expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconntest.minified.js"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconntest.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    createCustomJavaScriptModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconntest.custom.js"), "lconn.test");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * Note we expect the output to be still the original file, because the resource was created programmatically. Custom resources are only
     * available to modules created using net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconntest.minified.js"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconntest.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomJavascriptModule("lconn.test");
  }
}
