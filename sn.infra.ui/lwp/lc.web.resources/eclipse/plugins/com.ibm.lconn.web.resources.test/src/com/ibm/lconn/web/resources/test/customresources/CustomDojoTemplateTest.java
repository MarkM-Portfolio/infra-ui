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

import net.jazz.ajax.model.DojoTemplate;

import org.junit.Test;

@SuppressWarnings("nls")
public class CustomDojoTemplateTest extends AbstractCustomizationTest
{
  @Test
  public void testOverrideDojoTemplateBuiltIn() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomTemplate("lconn.test", "test/templates/ComboBox.html");

    // This time we resolve a module provided by this bundle, which should be customizable no problem
    r = DojoTemplate.newDependency("lconn.test", "test/templates/ComboBox.html").resolve();
    String expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.combobox.minified.html"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.combobox.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    createCustomTemplate(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.combobox.custom.html"),
        "lconn.test", "test/templates/ComboBox.html");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * This time the output will change, because the resource was created with
     * net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.combobox.custom.minified.html"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource(
        "/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.combobox.custom.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomTemplate("lconn.test", "test/templates/ComboBox.html");

    /*
     * Verify that after deleting the custom resources and calling net.jazz.ajax.model.Resource.internalRefresh(RenderContext) the original
     * file is restored
     */
    r.internalRefresh(CONTEXT_STANDARD);

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.combobox.minified.html"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.combobox.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testOverrideDojoTemplateProgrammatic() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomTemplate("foo.bar", "baz.html");

    r = new DojoTemplate(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.baz.html"), "foo.bar/baz.html")
        .register();
    String expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.baz.minified.html"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.baz.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    createCustomTemplate(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.baz.custom.html"), "foo.bar",
        "baz.html");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * Note we expect the output to be still the original file, because the resource was created programmatically. Custom resources are only
     * available to modules created using net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.baz.minified.html"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.bar.baz.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomTemplate("foo.bar", "baz.html");
  }
}
