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

package com.ibm.lconn.core.styles.test.model;

import static org.junit.Assert.*;

import java.io.File;
import java.net.URL;

import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.tests.mocks.TestBundle;

import org.junit.Before;
import org.junit.Test;
import org.osgi.framework.Bundle;

import com.ibm.lconn.core.styles.model.OneUIExtendedWebBundle;
import com.ibm.lconn.web.resources.test.customresources.AbstractCustomizationTest;

@SuppressWarnings("nls")
public class OneUIExtendedWebBundleTest extends AbstractCustomizationTest
{
  final static String STYLE_BASE = "styleBase";

  final static String BASE = "base";

  final static String ALIAS = "lconn.core.styles.test";

  final static String STYLE_RESOURCE = "style_resource.css";

  final static String BASE_RESOURCE = "base_resource.css";

  final static Bundle STYLE_BUNDLE = new TestBundle(STYLE_BASE, STYLE_RESOURCE);

  final static Bundle BUNDLE = new TestBundle(BASE, BASE_RESOURCE);

  private static final String BOGUS_RESOURCE = "bogus.css";

  private static final String CSS_EXTENSION = ".css";

  @Before
  public final void cleanup() throws Exception
  {
    // Cleanup
    deleteCustomCSSFile(BASE_RESOURCE);
    deleteCustomCSSFile(STYLE_RESOURCE);
  }

  @Test
  public final void testConstruct()
  {
    r = new OneUIExtendedWebBundle(STYLE_BUNDLE, STYLE_BASE, BUNDLE, ALIAS, BASE);
    assertNotNull(r);
  }

  @Test
  public final void testGetEntryString() throws Exception
  {
    r = new OneUIExtendedWebBundle(STYLE_BUNDLE, STYLE_BASE, BUNDLE, ALIAS, BASE);

    URL theURL = ((OneUIExtendedWebBundle) r).getEntry(File.separator + STYLE_RESOURCE);
    // The URL points to the style bundle
    assertEquals(new File(STYLE_BASE + File.separator + STYLE_RESOURCE).toURI().toURL(), theURL);

    theURL = ((OneUIExtendedWebBundle) r).getEntry(File.separator + BASE_RESOURCE);
    // The URL points to the base bundle
    assertEquals(new File(BASE + File.separator + BASE_RESOURCE).toURI().toURL(), theURL);

    theURL = ((OneUIExtendedWebBundle) r).getEntry(BOGUS_RESOURCE);
    // The URL is null
    assertNull(theURL);
  }

  @Test
  public final void testGetEntryCustomResource() throws Exception
  {
    r = new OneUIExtendedWebBundle(STYLE_BUNDLE, STYLE_BASE, BUNDLE, ALIAS, BASE);

    createCustomCSSFile(STYLE_RESOURCE);
    URL theURL = ((OneUIExtendedWebBundle) r).getEntry(File.separator + STYLE_RESOURCE);
    // The URL points to the customization directory
    assertEquals(new File(customThemesDir + File.separator + STYLE_RESOURCE).toURI().toURL(), theURL);
    deleteCustomCSSFile(STYLE_RESOURCE);

    theURL = ((OneUIExtendedWebBundle) r).getEntry(File.separator + STYLE_RESOURCE);
    // The URL points to the style bundle
    assertEquals(new File(STYLE_BASE + File.separator + STYLE_RESOURCE).toURI().toURL(), theURL);

    createCustomCSSFile(BASE_RESOURCE);
    theURL = ((OneUIExtendedWebBundle) r).getEntry(File.separator + BASE_RESOURCE);
    // The URL points to the customization directory
    assertEquals(new File(customThemesDir + File.separator + BASE_RESOURCE).toURI().toURL(), theURL);
    deleteCustomCSSFile(BASE_RESOURCE);

    theURL = ((OneUIExtendedWebBundle) r).getEntry(File.separator + BASE_RESOURCE);
    // The URL points to the base bundle
    assertEquals(new File(BASE + File.separator + BASE_RESOURCE).toURI().toURL(), theURL);
  }

  @Test
  public final void testGetEntryExtractPathExtension() throws Exception
  {
    r = new OneUIExtendedWebBundle(STYLE_BUNDLE, STYLE_BASE, BUNDLE, ALIAS, BASE);

    URL theURL = ((OneUIExtendedWebBundle) r).getEntry(ALIAS + File.separator + STYLE_RESOURCE, CSS_EXTENSION);
    // The URL points to the style bundle
    assertEquals(new File(STYLE_BASE + File.separator + STYLE_RESOURCE).toURI().toURL(), theURL);

    theURL = ((OneUIExtendedWebBundle) r).getEntry(ALIAS + File.separator + BASE_RESOURCE, CSS_EXTENSION);
    // The URL points to the base bundle
    assertEquals(new File(BASE + File.separator + BASE_RESOURCE).toURI().toURL(), theURL);

    theURL = ((OneUIExtendedWebBundle) r).getEntry(ALIAS + File.separator + BOGUS_RESOURCE, CSS_EXTENSION);
    // The URL is null
    assertNull(theURL);
  }

  @Test
  public final void testBundleResource() throws Exception
  {
    r = new OneUIExtendedWebBundle(STYLE_BUNDLE, STYLE_BASE, BUNDLE, ALIAS, BASE);

    // We need this resource to exist on the file system, as this is a fake bundle
    createCustomCSSFile(STYLE_RESOURCE);
    // Registers a new resource
    s = ((OneUIExtendedWebBundle) r).bundleResource(StyleSheet.TYPE, ALIAS + File.separator + STYLE_RESOURCE);
    assertNotNull(s);
    t = StyleSheet.newDependency(ALIAS + File.separator + STYLE_RESOURCE, false).resolve();
    assertEquals(t, s);

    // Call again, this time it won't be created
    u = ((OneUIExtendedWebBundle) r).bundleResource(StyleSheet.TYPE, ALIAS + File.separator + STYLE_RESOURCE);
    assertTrue(s == u);

    // Cleanup
    deleteCustomCSSFile(STYLE_RESOURCE);
  }
}
