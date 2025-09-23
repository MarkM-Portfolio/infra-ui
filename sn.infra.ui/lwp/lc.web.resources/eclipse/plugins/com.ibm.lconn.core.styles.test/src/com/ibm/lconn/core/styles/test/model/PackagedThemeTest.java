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

package com.ibm.lconn.core.styles.test.model;


import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;

import org.junit.Test;
import static org.junit.Assert.*;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.PackagedTheme;
import com.ibm.lconn.core.styles.test.AbstractTest;

@SuppressWarnings("nls")
public class PackagedThemeTest extends AbstractTest
{
  private final static String BUNDLE_ID = "com.ibm.lconn.core.styles.test";

  @Test
  public void testConstruct()
  {
    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, APPLICATION_PATH);

    assertNotNull(t);
  }

  @Test
  public void testConstructWithBundleId()
  {
    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, APPLICATION_PATH, BUNDLE_ID);

    assertNotNull(t);
  }

  @Test
  public void testResolve()
  {
    r = new Resource(StyleSheet.TYPE, RTL_CSS).register();
    s = new Resource(StyleSheet.TYPE, LTR_CSS).register();

    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, APPLICATION_PATH).register();

    u = ((PackagedTheme) t).resolve(true);
    assertEquals(r, u);

    u = ((PackagedTheme) t).resolve(false);
    assertEquals(s, u);
  }

  @Test
  public void testResolveLTROnly()
  {
    s = new Resource(StyleSheet.TYPE, LTR_CSS).register();

    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, APPLICATION_PATH).register();

    u = ((PackagedTheme) t).resolve(true);
    assertEquals(s, u);

    u = ((PackagedTheme) t).resolve(false);
    assertEquals(s, u);
  }

  @Test
  public void testResolveRTLOnly()
  {
    r = new Resource(StyleSheet.TYPE, RTL_CSS).register();

    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, APPLICATION_PATH).register();

    u = ((PackagedTheme) t).resolve(true);
    assertEquals(r, u);

    u = ((PackagedTheme) t).resolve(false);
    // When there's no LTR resource, we just return null
    assertNull(u);
  }

  @Test
  public void testResolveDependencies()
  {
    r = new Resource(StyleSheet.TYPE, RTL_CSS).register();
    s = new Resource(StyleSheet.TYPE, LTR_CSS).register();

    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, APPLICATION_PATH, BUNDLE_ID).register();

    assertDependenciesEqual(r, (PackagedTheme) t, BUNDLE_ID, true);
    assertDependenciesEqual(s, (PackagedTheme) t, BUNDLE_ID, false);
  }

  @Test
  public void testResolveApplication()
  {
    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, APPLICATION_PATH).register();

    for (String application : new String[] { "activities", "homepage", "wikis" })
      for (boolean isRTL : new boolean[] { true, false })
      {
        u = new Resource(StyleSheet.TYPE, APPLICATION_PATH + application + (isRTL ? "RTL.css" : ".css")).register();

        assertEquals(u, ((PackagedTheme) t).resolveApplication(application, isRTL));

        u.unregister();
      }
  }

  @Test
  public void testResolveApplicationNullPath()
  {
    t = new PackagedTheme(VANILLA, OneUIVersion.oneui3, LTR_CSS, RTL_CSS, null).register();

    for (String application : new String[] { "activities", "homepage", "wikis" })
      for (boolean isRTL : new boolean[] { true, false })
      {
        assertNull(((PackagedTheme) t).resolveApplication(application, isRTL));
      }
  }
}
