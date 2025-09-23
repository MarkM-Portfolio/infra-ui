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

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

import org.osgi.framework.Bundle;

import com.ibm.lconn.core.customization.ApplicationCustomization;
import com.ibm.lconn.core.styles.util.Constants;

import net.jazz.ajax.internal.util.Util;
import net.jazz.ajax.model.OSGiWebBundle;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;

/**
 * Expose a web bundle that layers the following locations in order to serve resources:
 * <ol>
 * <li>Connections theme customization directory (CONNECTIONS_CUSTOMIZATION_PATH\themes)
 * <li>Style resource location (styleBundle + styleBase)
 * <li>OneUI style resource location (bundle + base)
 * </ol>
 * 
 * Presents those layers as a homogeneous namespace.
 */
public class OneUIExtendedWebBundle extends OSGiWebBundle
{
  private Bundle styleBundle;

  private String styleBase;

  public OneUIExtendedWebBundle(Bundle styleBundle, String styleBase, Bundle bundle, String alias, String base)
  {
    super(bundle, alias, base);
    this.styleBundle = styleBundle;
    this.styleBase = styleBase;
  }

  @Override
  protected URL getResource(String path)
  {
    // Check customization path.
    URL customResource = getCustomResource(path, true);
    if (customResource != null)
      return customResource;

    // Check style bundle
    URL resource = styleBundle.getResource(styleBase + path);
    if (resource != null)
      return resource;

    // Check source bundle
    return bundle.getResource(base + path);
  }

  protected URL getCustomResource(String path, boolean ifExists)
  {
    File customizationDirectory = ApplicationCustomization.getInstance().getThemeDirectory();
    if (customizationDirectory != null)
    {
      File override = new File(customizationDirectory, path);
      try
      {
        if (!ifExists || override.exists())
          return override.toURI().toURL();
      }
      catch (MalformedURLException e)
      {
        throw new RuntimeException(e);
      }
    }
    return null;
  }

  @Override
  protected Resource createStyleSheet(String id)
  {
    String extension = Constants.CSS_EXTENSION;
    String path = extractPath(id, extension) + extension;
    URL styleResource = styleBundle.getResource(styleBase + path);
    URL baseResource = bundle.getResource(base + path);
    boolean mustExist = (styleResource == null && baseResource == null);
    URL[] urls = Util.getURLs(getCustomResource(path, mustExist), styleResource, baseResource);
    if (urls == null)
      return null;

    Resource resource = new StyleSheet(id, urls);
    resource.register();
    return resource;
  }
}
