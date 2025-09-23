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

import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.Resource;

import org.junit.Test;

@SuppressWarnings("nls")
public class CustomDojoModuleTest extends AbstractCustomizationTest
{
  @Test
  public void testOverrideDojoModuleBuiltIn() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomJavascriptModule("lconn.test.test.ckeditor");

    // This time we resolve a module provided by this bundle, which should be customizable no problem
    r = Resource.resolve("lconn.test.test.ckeditor");
    String expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.ckeditor.minified.js"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.ckeditor.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    createCustomJavaScriptModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.ckeditor.custom.js"),
        "lconn.test.test.ckeditor");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * This time the output will change, because the resource was created with
     * net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.ckeditor.custom.minified.js"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass()
        .getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.ckeditor.custom.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomJavascriptModule("lconn.test.test.ckeditor");

    /*
     * Verify that after deleting the custom resources and calling net.jazz.ajax.model.Resource.internalRefresh(RenderContext) the original
     * file is restored
     */
    r.internalRefresh(CONTEXT_STANDARD);

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.ckeditor.minified.js"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.ckeditor.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testOverrideDojoModuleProgrammatic() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomJavascriptModule("foo.bar");

    r = new DojoModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.js"), "foo.bar").register();
    String expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.minified.js"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    createCustomJavaScriptModule(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.custom.js"), "foo.bar");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * Note we expect the output to be still the original file, because the resource was created programmatically. Custom resources are only
     * available to modules created using net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.minified.js"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.compressed.js"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomJavascriptModule("foo.bar");
  }
}
