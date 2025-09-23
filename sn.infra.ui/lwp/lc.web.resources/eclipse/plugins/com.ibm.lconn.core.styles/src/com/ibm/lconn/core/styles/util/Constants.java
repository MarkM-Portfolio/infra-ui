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
package com.ibm.lconn.core.styles.util;

import com.ibm.lconn.core.styles.OneUIVersion;

/**
 * Simple collection of style constants and methods to choose the right one based on context
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public class Constants
{
  public static final String BUNDLE_ID_PREFIX = "com.ibm.lconn.core.styles."; //$NON-NLS-1$

  public static final String CSS_EXTENSION = ".css";//$NON-NLS-1$

  public static final String RTL_CSS = "RTL.css";//$NON-NLS-1$

  public static final String LTR_CSS = ".css";//$NON-NLS-1$

  public static final String PACKAGE_ONEUI2_NAME = "package2"; //$NON-NLS-1$

  public static final String PACKAGE_ONEUI3_NAME = "package3"; //$NON-NLS-1$

  public static final String DOJO_THEME = "dojoTheme"; //$NON-NLS-1$

  public static final String CONNECTIONS_THEME = "connectionsTheme"; //$NON-NLS-1$

  public static final String CUSTOM = "custom"; //$NON-NLS-1$

  private static final String RTL = "RTL"; //$NON-NLS-1$

  public static String extension(boolean isRTL)
  {
    return isRTL ? RTL_CSS : LTR_CSS;
  }

  public static String suffix(boolean isRTL)
  {
    return isRTL ? RTL : "";
  }

  public static String packageName(OneUIVersion version)
  {
    return OneUIVersion.oneui2.equals(version) ? PACKAGE_ONEUI2_NAME : PACKAGE_ONEUI3_NAME;
  }
}
