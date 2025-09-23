/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles.model;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.util.Constants;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundleDependency;

public class StandardTheme extends PackagedTheme
{
  private static String getExtensibleResourcePath(String id, OneUIVersion version, String segment)
  {
    return Constants.BUNDLE_ID_PREFIX + version + "/" + id + "Theme/" + segment; //$NON-NLS-1$//$NON-NLS-2$
  }

  private static String getExtensibleResourceId(String id, OneUIVersion version, String segment, boolean isRTL)
  {
    return getExtensibleResourcePath(id, version, segment) + Constants.suffix(isRTL);
  }

  private Resource dynamicPackage = null;

  private Resource dynamicPackageRtl = null;

  public StandardTheme(String themeId, OneUIVersion version)
  {
    super(themeId, version, getExtensibleResourceId(themeId, version, Constants.packageName(version), false), getExtensibleResourceId(
        themeId, version, Constants.packageName(version), true), getExtensibleResourcePath(themeId, version, getApplicationSegment(themeId)));
  }
  
  private static String getApplicationSegment(String themeId) {
	  
	  if ("hikari".equalsIgnoreCase(themeId) || "default".equalsIgnoreCase(themeId)) {		  
		  return "applications/"; 
	  }
	  
	  return "css/base/applications/";
  }

  @Override
  public <T extends Resource> T resolve(boolean isRTL)
  {
    T r = super.resolve(isRTL);
    if (r == null)
      r = (T) getOrCreate(isRTL);
    return r;
  }

  @Override
  public void unregister()
  {
    synchronized (this)
    {
      if (dynamicPackageRtl != null)
        dynamicPackageRtl.unregister();
      if (dynamicPackage != null)
        dynamicPackage.unregister();
      dynamicPackage = dynamicPackageRtl = null;
    }
    super.unregister();
  }

  protected Resource getOrCreate(boolean isRTL)
  {
    synchronized (this)
    {
      Resource r = isRTL ? dynamicPackageRtl : dynamicPackage;
      if (r == null)
      {
        WebBundleDependency depends = new WebBundleDependency(StyleSheet.TYPE, getExtensibleResourceId(themeId, version, themeId + "Theme",
            isRTL));
        if (depends.resolve() != null)
        {
          r = new VirtualStyleSheetResource(getId() + "_virtual_" + (isRTL ? "rtl" : "ltr"));
          r.addDependency(depends);
          for (String dependency : DEPENDENCIES)
            r.addDependency(new WebBundleDependency(StyleSheet.TYPE, getExtensibleResourceId(themeId, version, dependency, isRTL)));

          r.register();

          if (isRTL)
            dynamicPackageRtl = r;
          else
            dynamicPackage = r;
        }
      }
      return r;
    }
  }

}
