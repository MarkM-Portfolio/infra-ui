/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.web.resources.test.customresources;

import static org.junit.Assert.*;

import java.io.File;
import java.net.URL;

import org.junit.Test;
import com.ibm.lconn.core.web.resources.internal.CustomResources;

@SuppressWarnings("nls")
public class CustomResourcesTest extends AbstractCustomizationTest
{
  CustomResources cs;

  @Test
  public void testConstruct()
  {
    cs = new CustomResources();
    assertNotNull(cs);
  }

  @Test
  public void testGetDojoModuleUrl() throws Exception
  {
    cs = new CustomResources();

    // Note that getDojoModuleUrl(String) doesn't check existence of requested resources
    URL theURL = cs.getDojoModuleUrl("lconn.foo");
    assertEquals(jsFile("lconn.foo").toURI().toURL(), theURL);

    theURL = cs.getDojoModuleUrl("lconn.bar");
    assertEquals(jsFile("lconn.bar").toURI().toURL(), theURL);
  }

  @Test
  public void testGetDojoModuleUrlNull() throws Exception
  {
    cs = new CustomResources();
    // Edge case
    assertNull(cs.getDojoModuleUrl(null));
  }

  @Test
  public void testStyleSheetUrl() throws Exception
  {
    cs = new CustomResources();

    // Normal CSS files are looked up with the full resource path under the <CONNECTIONS_CUSTOMIZATION_PATH>/themes directory
    final String TEST_CSS = "com.ibm.lconn.core.styles.test/path/to/styles.css";

    deleteCustomCSSFile(TEST_CSS);
    // getStyleSheetUrl returns null if the file doesn't exist
    URL theURL = cs.getStyleSheetUrl(TEST_CSS);
    assertNull(theURL);

    // getStyleSheetUrl will return a URL if the file exists
    createCustomCSSFile(TEST_CSS);
    theURL = cs.getStyleSheetUrl(TEST_CSS);
    assertEquals(cssFile(TEST_CSS).toURI().toURL(), theURL);
    deleteCustomCSSFile(TEST_CSS);

    // Ensure getStyleSheetUrl returns null after the file is deleted
    theURL = cs.getStyleSheetUrl(TEST_CSS);
    assertNull(theURL);

    // gen4 styles receive a different treatment to allow customers to override them in the same way as resources provided by
    // OneUIExtendedWebBundle
    final String GEN4_CSS = "com.ibm.social.gen4.theme/css/defaultTheme/defaultTheme.css";
    // The above stylesheet path is translated to a path like the following
    final String GEN4_CSS_TRANS = "gen4Theme/defaultTheme.css";

    // getStyleSheetUrl returns null if the file doesn't exist
    theURL = cs.getStyleSheetUrl(GEN4_CSS);
    assertNull(theURL);

    // getStyleSheetUrl will return a URL if the file exists
    createCustomCSSFile(GEN4_CSS_TRANS);
    theURL = cs.getStyleSheetUrl(GEN4_CSS);
    assertEquals(cssFile(GEN4_CSS_TRANS).toURI().toURL(), theURL);
    deleteCustomCSSFile(GEN4_CSS_TRANS);

    // Ensure getStyleSheetUrl returns null after the file is deleted
    theURL = cs.getStyleSheetUrl(GEN4_CSS);
    assertNull(theURL);
  }

  @Test
  public void testStyleSheetUrlNull() throws Exception
  {
    cs = new CustomResources();
    // Edge case
    assertNull(cs.getStyleSheetUrl(null));
  }

  @Test
  public void testGetMessageBundleUrl() throws Exception
  {
    cs = new CustomResources();

    final String MESSAGE = "lconn.messages";

    deleteCustomBundle(MESSAGE);
    // URL must be null if the resource doesn't exist
    URL theURL = cs.getMessageBundleUrl(MESSAGE + PROPERTIES_EXTENSION);
    assertNull(theURL);

    createCustomBundle(MESSAGE);
    theURL = cs.getMessageBundleUrl(MESSAGE + PROPERTIES_EXTENSION);
    assertEquals(bundleFile(MESSAGE).toURI().toURL(), theURL);
    deleteCustomBundle(MESSAGE);

    // URL must be null if the resource is deleted
    theURL = cs.getMessageBundleUrl(MESSAGE + PROPERTIES_EXTENSION);
    assertNull(theURL);
  }

  @Test
  public void testMessageBundleUrlNull() throws Exception
  {
    cs = new CustomResources();
    // Edge case
    assertNull(cs.getMessageBundleUrl(null));
  }

  @Test
  public void testSimpleResourceUrl() throws Exception
  {
    cs = new CustomResources();

    final String PATH_TXT = "path/to/some/file.txt";
    // Note that getSimpleResourceUrl(String) doesn't check existence of requested resources
    URL theURL = cs.getSimpleResourceUrl(PATH_TXT);
    assertEquals(new File(customJavascriptDir + File.separator + PATH_TXT).toURI().toURL(), theURL);

    final String PATH_IMG = "path/to/an/image.png";
    theURL = cs.getSimpleResourceUrl(PATH_IMG);
    assertEquals(new File(customJavascriptDir + File.separator + PATH_IMG).toURI().toURL(), theURL);
  }

  @Test
  public void testSimpleResourceUrlNull() throws Exception
  {
    cs = new CustomResources();
    // Edge case
    assertNull(cs.getSimpleResourceUrl(null));
  }

  @Test
  public void testSimpleResourceUrlSecurityConstraint()
  {
    // This test ensures that no resources outside the customization directory can be accessed
    cs = new CustomResources();
    for (String path : new String[] { "../../../../../htpasswd", "../../.htaccess",
        "../../../../../../../../../../../../../Windows/System32/drivers/etc/hosts" })
    {
      boolean thrown = false;
      try
      {
        cs.getSimpleResourceUrl(path);
      }
      catch (Throwable t)
      {
        thrown = true;
      }
      assertTrue(thrown);
    }
  }
}
