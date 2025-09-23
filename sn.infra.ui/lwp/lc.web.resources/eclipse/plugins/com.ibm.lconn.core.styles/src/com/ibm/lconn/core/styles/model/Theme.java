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

import net.jazz.ajax.model.Resource;

public abstract class Theme extends Resource
{
  public static final String DEFAULT_THEME_ID = "default";

  private static final String TYPE_NAME = "com.ibm.lconn.core.styles.theme";

  private static final Type<Theme> TYPE;
  static
  {
    Type<Theme> type = Type.forName(TYPE_NAME);
    if (type == null)
      type = Type.create(TYPE_NAME);
    TYPE = type;
  }

  private static String getVirtualResourceId(String id, OneUIVersion version)
  {
    return Constants.BUNDLE_ID_PREFIX + version + "/_themes/" + id;
  }

  public synchronized static Theme resolve(String id, OneUIVersion version)
  {
    Theme theme = Resource.resolve(TYPE, getVirtualResourceId(id, version));
    if (theme == null)
    {
      // If a new theme has been created, check to see if it exists. Only register themes
      // that actually exist.
      theme = new StandardTheme(id, version);
      if (theme.resolve(true) != null || theme.resolve(false) != null)
        theme.register();
    }
    return theme;
  }

  final protected OneUIVersion version;

  final protected String themeId;

  public Theme(String themeId, OneUIVersion version)
  {
    super(TYPE, getVirtualResourceId(themeId, version));
    this.themeId = themeId;
    this.version = version;
  }

  abstract public <T extends Resource> T resolve(boolean isRTL);

  abstract public <T extends Resource> T resolveApplication(String id, boolean isRTL);
}
