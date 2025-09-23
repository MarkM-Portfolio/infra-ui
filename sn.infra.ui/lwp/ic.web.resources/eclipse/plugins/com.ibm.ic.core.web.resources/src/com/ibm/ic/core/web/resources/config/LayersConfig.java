/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.core.web.resources.config;

import java.util.Map;
import java.util.HashMap;
import java.util.Collections;
import java.util.ResourceBundle;

import java.util.logging.Level;
import java.util.logging.Logger;

public class LayersConfig
{
  private static String CLASS_NAME = LayersConfig.class.getName();

  private static Logger logger = Logger.getLogger(CLASS_NAME);

  private final static ResourceBundle BUNDLE;

  private final static String BUNDLE_NAME = "com.ibm.ic.core.web.resources.config.layers"; //$NON-NLS-1$

  private static Map<String, String> layers;

  static
  {
    BUNDLE = ResourceBundle.getBundle(BUNDLE_NAME);
  }

  public static Map<String, String> loadLayers()
  {
    if (logger.isLoggable(Level.FINER))
    {
      logger.entering(CLASS_NAME, "loadLayers"); //$NON-NLS-1$
    }

    if (layers == null)
    {
      layers = new HashMap<String, String>();
      for (String key : Collections.list(BUNDLE.getKeys()))
      {
        layers.put(key, BUNDLE.getString(key));
      }
    }

    if (logger.isLoggable(Level.FINER))
    {
      logger.exiting(CLASS_NAME, "loadLayers", layers); //$NON-NLS-1$
    }

    return layers;
  }
}