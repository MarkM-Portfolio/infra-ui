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

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundleDependency;
import net.jazz.ajax.model.Resource.Type;

import org.junit.Test;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.ApplicationThemeStyleSheet;
import com.ibm.lconn.core.styles.test.AbstractTest;

@SuppressWarnings("nls")
public class ApplicationThemeStyleSheetTest extends AbstractTest
{
  private final static String CLASS_NAME = ApplicationThemeStyleSheetTest.class.getName();

  @Test
  public void testForApplicationTheme()
  {
    Resource.Type type = Type.forName(CLASS_NAME);
    if (type == null)
      type = Type.create(CLASS_NAME);

    r = new Resource(type, "theme");
    s = new Resource(type, "application");

    // Note the ThemeStyleSheet only contains the application resource, not the theme resource
    List<Resource> appResources = new ArrayList<Resource>();
    appResources.add(s);

    t = getTheme(VANILLA, OneUIVersion.oneui3, r, s);
    t.register();

    for (String service : new String[] { "activities", "homepage", "wikis" })
      for (boolean isRTL : new boolean[] { true, false })
      {
        // the ApplicationThemeStyleSheet also yields the base application resource
        String bundle = BUNDLE_ID_PREFIX + OneUIVersion.oneui3.toString();
        String baseId = bundle + "/base/applications/" + service + (isRTL ? "RTL" : "");
        Resource base = new WebBundleDependency(StyleSheet.TYPE, baseId).resolve();
        // Note we're not using one of the disposable resources, this resource must stay registered
        appResources.add(base);

        ApplicationThemeStyleSheet atss = ApplicationThemeStyleSheet.forApplicationTheme(service, VANILLA, OneUIVersion.oneui3, isRTL);

        assertTrue(atss.hasResources());
        assertListEquals(appResources, atss.getResources());

        // Remove for next iteration
        appResources.remove(base);
      }
  }
}
