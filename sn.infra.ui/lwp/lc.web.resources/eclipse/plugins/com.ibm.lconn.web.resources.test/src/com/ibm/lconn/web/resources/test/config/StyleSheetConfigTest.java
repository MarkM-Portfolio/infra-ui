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

package com.ibm.lconn.web.resources.test.config;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.ibm.lconn.core.config.StylesheetConfig;

@SuppressWarnings("nls")
public class StyleSheetConfigTest
{
  @Test
  public final void testIgnoredPaths()
  {
    StylesheetConfig.setIgnoredPaths(null);
    assertNull(StylesheetConfig.getIgnoredPaths());

    Map<String, String> paths = new HashMap<String, String>();
    paths.put("a", "b");
    paths.put("c", "d");
    StylesheetConfig.setIgnoredPaths(paths);
    assertEquals(paths, StylesheetConfig.getIgnoredPaths());
  }

  @Test
  public final void testProxyPath()
  {
    StylesheetConfig.setProxyPath(null);
    assertNull(StylesheetConfig.getProxyPath());

    String path = "path/to/css/proxy";
    StylesheetConfig.setProxyPath(path);
    assertEquals(path, StylesheetConfig.getProxyPath());
  }
}
