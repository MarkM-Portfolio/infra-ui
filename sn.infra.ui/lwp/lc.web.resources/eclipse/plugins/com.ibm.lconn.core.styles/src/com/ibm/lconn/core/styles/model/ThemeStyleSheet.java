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


import net.jazz.ajax.model.Resource;

/**
 * Represents resources associated to a Connections Theme
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public class ThemeStyleSheet extends CompoundStyleSheet
{
  private ThemeStyleSheet(Resource theme)
  {
    resources = new ArrayList<Resource>(1);
    if (theme != null)
      resources.add(theme);
  }

  /**
   * Factory method that returns an instance of {@link ThemeStyleSheet}
   * 
   * @param themeId
   *          The id of the theme
   * @param version
   *          The version of OneUI
   * @param isRTL
   *          The directionality of the theme
   * @return an instance of the theme stylesheet
   */
  public static ThemeStyleSheet forTheme(String themeId, OneUIVersion version, boolean isRTL)
  {
    Theme theme = Theme.resolve(themeId, version);
    Resource r = theme.resolve(isRTL);
    if (r == null)
    {
      theme = Theme.resolve(Theme.DEFAULT_THEME_ID, version);
      r = theme.resolve(isRTL);
    }

    return new ThemeStyleSheet(r);
  }
}
