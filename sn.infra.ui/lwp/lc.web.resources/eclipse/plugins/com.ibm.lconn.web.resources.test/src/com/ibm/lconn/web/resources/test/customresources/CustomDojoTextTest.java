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

import static org.junit.Assert.*;
import net.jazz.ajax.model.DojoText;

import org.junit.Test;

@SuppressWarnings("nls")
public class CustomDojoTextTest extends AbstractCustomizationTest
{
  @Test
  public void testOverrideDojoTextBuiltIn() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomTextfile("lconn.test/test/templates/Menu.html");

    // This time we resolve a module provided by this bundle, which should be customizable no problem
    r = DojoText.newDependency("lconn.test/test/templates/Menu.html").resolve();
    String expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.menu.minified.html"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.menu.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    createCustomTextfile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.menu.custom.html"),
        "lconn.test/test/templates/Menu.html");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * This time the output will change, because the resource was created with
     * net.jazz.ajax.model.OSGiWebBundle.createJavaScriptModule(String)
     */
    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.menu.custom.minified.html"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.menu.custom.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomTextfile("lconn.test/test/templates/Menu.html");

    /*
     * Verify that after deleting the custom resources and calling net.jazz.ajax.model.Resource.internalRefresh(RenderContext) the original
     * file is restored
     */
    r.internalRefresh(CONTEXT_STANDARD);

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.menu.minified.html"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/lconn.test.test.templates.menu.compressed.html"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testOverrideDojoTextProgrammatic() throws Exception
  {
    // Ensure there's no custom resource in the customization directory
    deleteCustomTextfile("foo.txt");

    r = new DojoText(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.txt"), "foo.txt").register();
    String expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.minified.txt"));
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.compressed.txt"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    createCustomTextfile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.custom.txt"), "foo.txt");

    r.internalRefresh(CONTEXT_STANDARD);

    /*
     * Note we expect the output to be still the original file, because the resource was created programmatically. Custom resources are only
     * available to modules created using the {@link DojoText(URL[], id)} constructor
     */
    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.minified.txt"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/lconn/web/resources/test/resources/foo.compressed.txt"));
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    deleteCustomTextfile("foo.txt");
  }
}
