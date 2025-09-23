/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles.model;

import java.util.ArrayList;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.util.Constants;


import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundleDependency;

/**
 * Represents resources associated to a theme stylesheet of a Connections application
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public class ApplicationThemeStyleSheet extends CompoundStyleSheet
{
  private ApplicationThemeStyleSheet(Resource resource, Resource base)
  {
    resources = new ArrayList<Resource>();
    if (base != null)
      resources.add(base);
    if (resource != null)
      resources.add(resource);
  }

  /**
   * Factory method that returns an instance of {@link ApplicationThemeStyleSheet}
   * 
   * @param service
   *          The application
   * @param themeId
   *          The id of the theme
   * @param version
   *          The version of OneUI
   * @param isRTL
   *          The directionality of the theme
   * @return an instance of the application theme stylesheet
   */
  public static ApplicationThemeStyleSheet forApplicationTheme(String service, String themeId, OneUIVersion version, boolean isRTL)
  {
    Theme theme = Theme.resolve(themeId, version);

    String bundle = Constants.BUNDLE_ID_PREFIX + version;
    String baseId = bundle + "/base/applications/" + service + (isRTL ? "RTL" : "");

    Resource base = new WebBundleDependency(StyleSheet.TYPE, baseId).resolve();
    Resource resource = theme.resolveApplication(service, isRTL);

    return new ApplicationThemeStyleSheet(resource, base);
  }
}
