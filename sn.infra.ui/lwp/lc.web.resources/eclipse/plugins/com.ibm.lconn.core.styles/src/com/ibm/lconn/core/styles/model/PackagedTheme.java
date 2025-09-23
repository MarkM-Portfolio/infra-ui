/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles.model;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.util.Constants;

import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundleDependency;

public class PackagedTheme extends Theme
{
  private final WebBundleDependency ltr;

  private final WebBundleDependency rtl;

  private final String applicationPath;

  private String bundleId;

  protected static String[] DEPENDENCIES = new String[] { Constants.DOJO_THEME, Constants.CONNECTIONS_THEME, Constants.CUSTOM };

  public PackagedTheme(String id, OneUIVersion version, String resource, String resourceRtl, String applicationPath)
  {
    super(id, version);
    this.ltr = new WebBundleDependency(StyleSheet.TYPE, resource);
    this.rtl = new WebBundleDependency(StyleSheet.TYPE, resourceRtl);
    this.applicationPath = applicationPath;
  }

  public PackagedTheme(String id, OneUIVersion version, String resource, String resourceRtl, String applicationPath, String bundleId)
  {
    this(id, version, resource, resourceRtl, applicationPath);
    this.bundleId = bundleId;
  }

  @Override
  public <T extends Resource> T resolve(boolean isRTL)
  {
    T r = null;
    if (isRTL)
      r = rtl.resolve();
    if (r == null)
      r = ltr.resolve();
    if (r != null)
      synchronized (this)
      {
        for (String name : DEPENDENCIES)
          r.addDependency(getDependency(name, isRTL));
      }
    return r;
  }

  @Override
  public <T extends Resource> T resolveApplication(String id, boolean isRTL)
  {
    if (applicationPath != null)
      return new WebBundleDependency(StyleSheet.TYPE, applicationPath + id + Constants.extension(isRTL)).resolve();
    return null;
  }

  private Dependency getDependency(String dependency, boolean isRTL)
  {
    // TODO:
    // return new WebBundleDependency(StyleSheet.TYPE, (bundleId != null ? bundleId + "/" : "") + "css/" + themeId + "Theme/" + dependency
    return new WebBundleDependency(StyleSheet.TYPE, (bundleId != null ? bundleId + "/" : "") + "css/defaultTheme/" + dependency
        + Constants.extension(isRTL));
  }
}
