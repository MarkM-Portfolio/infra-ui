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

package com.ibm.lconn.core.styles.test;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundleDependency;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.PackagedTheme;
import com.ibm.lconn.core.styles.model.Theme;

@SuppressWarnings("nls")
public class AbstractTest extends net.jazz.ajax.tests.AbstractTest
{
  protected final static String VANILLA = "vanilla";

  protected final static String LTR_CSS = "ltr.css";

  protected final static String RTL_CSS = "rtl.css";

  protected final static String APPLICATION_PATH = "applications/";

  protected static final String BUNDLE_ID_PREFIX = "com.ibm.lconn.core.styles.";

  protected Theme getTheme(String themeId, OneUIVersion version)
  {
    return new Theme(themeId, version)
    {
      @Override
      public Resource resolveApplication(String id, boolean isRTL)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public Resource resolve(boolean isRTL)
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
  }

  protected Theme getTheme(String themeId, OneUIVersion version, final Resource resolved, final Resource resolvedApplication)
  {
    return new Theme(themeId, version)
    {
      @Override
      public Resource resolveApplication(String id, boolean isRTL)
      {
        // TODO Auto-generated method stub
        return resolvedApplication;
      }

      @Override
      public Resource resolve(boolean isRTL)
      {
        // TODO Auto-generated method stub
        return resolved;
      }
    };
  }

  // @BeforeClass
  // public static void allowFrameworkToStartup() throws Exception
  // {
  // // Allow the registry processors to scan and index resources
  // Thread.sleep(5000);
  // }
  // @BeforeClass
  // public static void setCustomizationInstance()
  // {
  // setInstance
  // }

  protected void assertDependenciesEqual(Resource expected, PackagedTheme theme, String bundleId, boolean isRTL)
  {
    final String[] DEPS = new String[] { "dojoTheme", "connectionsTheme", "custom" };

    Resource resolved = theme.resolve(isRTL);

    assertEquals(expected, resolved);
    List<Dependency> dependencies = new ArrayList<Dependency>();
    for (String dep : DEPS)
    {
      dependencies.add(new WebBundleDependency(StyleSheet.TYPE, getDependency(bundleId, dep, isRTL)));
    }
    assertListEquals(expected.getDependencies(), dependencies);

  }

  protected String getDependency(String bundleId, String dependency, boolean isRTL)
  {
    return (bundleId != null ? bundleId + "/" : "") + "css/defaultTheme/" + dependency + (isRTL ? "RTL.css" : ".css");
  }
}
