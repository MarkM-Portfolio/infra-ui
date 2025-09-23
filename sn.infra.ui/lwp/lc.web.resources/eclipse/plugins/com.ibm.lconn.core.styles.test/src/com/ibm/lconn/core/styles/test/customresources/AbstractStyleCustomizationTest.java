/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles.test.customresources;

import java.io.File;

import com.ibm.lconn.web.resources.test.customresources.AbstractCustomizationTest;
import com.ibm.ventura.internal.config.VenturaConfigVariable;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;

@SuppressWarnings("nls")
public class AbstractStyleCustomizationTest extends AbstractCustomizationTest
{
  private static final String RTL_CSS = "RTL.css";

  private static final String LTR_CSS = ".css";

  protected static final Boolean[] RTL_VALUES = new Boolean[] { Boolean.TRUE, Boolean.FALSE };

  private static final String BASE = "base";

  protected static final String CUSTOM = "custom";

  protected static final String DEFAULT = "default";

  protected static final String GEN4 = "gen4";

  protected static final String HIKARI = "hikari";

  protected static final String RED = "red";

  protected static final String ONYX = "onyx";

  protected static final String BLUE = "blue";

  protected static final String GREEN = "green";

  protected static final String ORANGE = "orange";

  protected static final String SILVER = "silver";

  protected static final String GOLD = "gold";

  static File customThemesDir = null;

  static
  {
    try
    {
      VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
    }
    catch (VenturaConfigException e)
    {
    }
    VenturaConfigVariable variable = new VenturaConfigVariable();
    String customizationRoot = variable.resolve("${" + WAS_VARIABLE_CUSTOMIZATION_ROOT + "}");
    if (customizationRoot != null)
      customThemesDir = new File(customizationRoot + "/themes");
  }

  protected String baseApplicationDirname(String application) throws Exception
  {
    return applicationThemeDirname(BASE, application);
  }

  protected String applicationThemeDirname(String themeId, String application) throws Exception
  {
    return themeDirname(themeId) + File.separator + "applications";
  }

  protected String themeDirname(String themeId) throws Exception
  {
    return customThemesDir.getCanonicalPath() + File.separator + themeName(themeId);
  }

  protected String filename(String application, boolean isRTL)
  {
    if (themeName(GEN4).equals(application) || themeName(HIKARI).equals(application))
      application = themeName(DEFAULT);
    return application + (isRTL ? RTL_CSS : LTR_CSS);
  }

  protected String customBaseApplicationRule(String application, boolean isRTL)
  {
    return customApplicationThemeRule(BASE, application, isRTL);
  }

  protected String customThemeRule(String themeId, boolean isRTL)
  {
    return customRule(themeName(themeId), isRTL);
  }

  protected String customRule(String name, boolean isRTL)
  {
    return new StringBuilder(".").append(name).append(isRTL ? "_RTL" : "").append(" { }\n").toString();
  }

  protected String customApplicationThemeRule(String themeId, String application, boolean isRTL)
  {
    String themeName = BASE.equals(themeId) ? BASE : themeId + "Theme";
    return new StringBuilder(".").append(themeName).append("_").append(application).append(isRTL ? "_RTL" : "").append(" { }\n").toString();
  }

  protected String themeName(String themeId)
  {
    return BASE.equals(themeId) ? BASE : themeId + "Theme";
  }
}