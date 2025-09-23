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

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundleDependency;

import org.junit.Test;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.PackagedTheme;
import com.ibm.lconn.core.styles.model.StandardTheme;
import com.ibm.lconn.core.styles.test.AbstractTest;

@SuppressWarnings("nls")
public class StandardThemeTest extends AbstractTest
{
  @Test
  public void testConstruct()
  {
    t = new StandardTheme(VANILLA, OneUIVersion.oneui3);
    assertNotNull(t);
  }

  @Test
  public void testResolve()
  {
    r = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, true)).register();
    s = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, false)).register();

    t = new StandardTheme(VANILLA, OneUIVersion.oneui3).register();

    u = ((StandardTheme) t).resolve(true);
    assertEquals(r, u);

    u = ((StandardTheme) t).resolve(false);
    assertEquals(s, u);
  }

  @Test
  public void testResolveLTROnly()
  {
    s = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, false)).register();

    t = new StandardTheme(VANILLA, OneUIVersion.oneui3).register();

    u = ((StandardTheme) t).resolve(true);
    assertEquals(s, u);

    u = ((StandardTheme) t).resolve(false);
    assertEquals(s, u);
  }

  @Test
  public void testResolveRTLOnly()
  {
    r = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, true)).register();

    t = new StandardTheme(VANILLA, OneUIVersion.oneui3).register();

    u = ((StandardTheme) t).resolve(true);
    assertEquals(r, u);

    u = ((StandardTheme) t).resolve(false);
    assertNull(u);
  }

  @Test
  public void testResolveDependenciesExisting()
  {
    r = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, true)).register();
    s = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, false)).register();

    t = new StandardTheme(VANILLA, OneUIVersion.oneui3).register();

    assertDependenciesEqual(r, (PackagedTheme) t, null, true);
    assertDependenciesEqual(s, (PackagedTheme) t, null, false);
  }

  @Test
  public void testResolveDependenciesVirtual()
  {
    r = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, VANILLA + "Theme", true)).register();
    s = new Resource(StyleSheet.TYPE, getStyleSheetName(VANILLA, OneUIVersion.oneui3, VANILLA + "Theme", false)).register();

    t = new StandardTheme(VANILLA, OneUIVersion.oneui3).register();

    assertVirtualDependenciesEqual(r, (PackagedTheme) t, VANILLA, OneUIVersion.oneui3, true);
    assertVirtualDependenciesEqual(s, (PackagedTheme) t, VANILLA, OneUIVersion.oneui3, false);
  }

  protected void assertVirtualDependenciesEqual(Resource expected, PackagedTheme theme, String themeId, OneUIVersion version, boolean isRTL)
  {
    final String[] DEPS = new String[] { "dojoTheme", "connectionsTheme", "custom" };

    Resource resolved = theme.resolve(isRTL);

    Resource virtual = new WebBundleDependency(StyleSheet.TYPE, getVirtualStyleSheetName(themeId, version, isRTL)).resolve();

    assertEquals(virtual, resolved);

    List<Dependency> dependencies = new ArrayList<Dependency>();
    for (String dep : DEPS)
    {
      dependencies.add(new WebBundleDependency(StyleSheet.TYPE, getDependency(dep, themeId, version, isRTL)));
    }
    dependencies.add(new WebBundleDependency(expected.getType(), expected.getId()));
    assertListEquals(virtual.getDependencies(), dependencies);
  }

  private String getDependency(String dependency, String themeId, OneUIVersion version, boolean isRTL)
  {
    return BUNDLE_ID_PREFIX + version.toString() + "/" + themeId + "Theme/" + dependency + (isRTL ? "RTL" : "");
  }

  private String getVirtualStyleSheetName(String themeId, OneUIVersion version, boolean isRTL)
  {
    return BUNDLE_ID_PREFIX + version.toString() + "/_themes/" + themeId + "_virtual_" + (isRTL ? "rtl" : "ltr");
  }

  private String getDirname(String themeId, OneUIVersion version)
  {
    return BUNDLE_ID_PREFIX + version.toString() + "/" + themeId + "Theme/";
  }

  private String getStyleSheetName(String themeId, OneUIVersion version, boolean isRTL)
  {
    return getStyleSheetName(themeId, version, version.equals(OneUIVersion.oneui2) ? "package2" : "package3", isRTL);
  }

  private String getStyleSheetName(String themeId, OneUIVersion version, String filename, boolean isRTL)
  {
    return getDirname(themeId, version) + filename + (isRTL ? "RTL" : "");
  }
}
