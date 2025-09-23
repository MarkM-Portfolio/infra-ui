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

package com.ibm.lconn.core.styles.test.customresources;

import static org.junit.Assert.*;

import java.io.File;
import java.io.FileWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Collections;

import net.jazz.ajax.servlets.ResourceGraph;

import org.junit.Test;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.ApplicationThemeStyleSheet;

@SuppressWarnings("nls")
public class ApplicationThemeCustomizationTest extends AbstractStyleCustomizationTest
{
  @Test
  public void testCustomApplicationStylesActivities() throws Exception
  {
    testCustomApplicationStylesInternal("activities");
  }

  @Test
  public void testCustomApplicationStylesBlogs() throws Exception
  {
    testCustomApplicationStylesInternal("blogs");
  }

  @Test
  public void testCustomApplicationStylesBookmarks() throws Exception
  {
    testCustomApplicationStylesInternal("bookmarks");
  }

  @Test
  public void testCustomApplicationStylesCommunities() throws Exception
  {
    testCustomApplicationStylesInternal("communities");
  }

  @Test
  public void testCustomApplicationStylesForums() throws Exception
  {
    testCustomApplicationStylesInternal("forums");
  }

  @Test
  public void testCustomApplicationStylesFiles() throws Exception
  {
    testCustomApplicationStylesInternal("files");
  }

  @Test
  public void testCustomApplicationStylesHomepage() throws Exception
  {
    testCustomApplicationStylesInternal("homepage");
  }

  @Test
  public void testCustomApplicationStylesMetrics() throws Exception
  {
    testCustomApplicationStylesInternal("metrics");
  }

  @Test
  public void testCustomApplicationStylesModeration() throws Exception
  {
    testCustomApplicationStylesInternal("moderation");
  }

  @Test
  public void testCustomApplicationStylesNews() throws Exception
  {
    testCustomApplicationStylesInternal("news");
  }

  @Test
  public void testCustomApplicationStylesProfiles() throws Exception
  {
    testCustomApplicationStylesInternal("blogs");
  }

  @Test
  public void testCustomApplicationStylesSearch() throws Exception
  {
    testCustomApplicationStylesInternal("search");
  }

  @Test
  public void testCustomApplicationStylesWikis() throws Exception
  {
    testCustomApplicationStylesInternal("wikis");
  }

  /**
   * Internal test machinery. Being most of these tests repetitive, it's useful to write them in a modular way
   * 
   * @param application
   * @throws Exception
   */
  private void testCustomApplicationStylesInternal(String application) throws Exception
  {
    for (String themeId : new String[] { GEN4, DEFAULT, RED })
      for (boolean isRTL : RTL_VALUES)
      {
        makeCustomApplicationStylesheets(themeId, application, isRTL);

        ApplicationThemeStyleSheet styleSheet = ApplicationThemeStyleSheet.forApplicationTheme(application, themeId, OneUIVersion.oneui3,
            isRTL);
        if (styleSheet.hasResources())
        {
          ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, styleSheet.getResources(), Collections.EMPTY_LIST);

          Writer writer = new StringWriter();
          g.writeCSS(writer, CONTEXT_STANDARD);

          assertTrue(writer.toString().contains(customBaseApplicationRule(application, isRTL)));
          assertTrue(writer.toString().contains(customApplicationThemeRule(themeId, application, isRTL)));
        }
        deleteCustomApplicationStylesheets(themeId, application, isRTL);
      }
  }

  private void makeCustomApplicationStylesheets(String themeId, String application, boolean isRTL) throws Exception
  {
    File baseStylesheetDir = new File(baseApplicationDirname(application));
    baseStylesheetDir.mkdirs();

    File baseStylesheet = new File(baseApplicationDirname(application) + File.separator + filename(application, isRTL));
    FileWriter fw = new FileWriter(baseStylesheet);
    fw.write(customBaseApplicationRule(application, isRTL));
    fw.flush();
    fw.close();

    File themeStylesheetDir = new File(applicationThemeDirname(themeId, application));
    themeStylesheetDir.mkdirs();

    File themeStylesheet = new File(applicationThemeDirname(themeId, application) + File.separator + filename(application, isRTL));
    fw = new FileWriter(themeStylesheet);
    fw.write(customApplicationThemeRule(themeId, application, isRTL));
    fw.flush();
    fw.close();
  }

  private void deleteCustomApplicationStylesheets(String themeId, String application, boolean isRTL) throws Exception
  {
    File baseStylesheet = new File(baseApplicationDirname(application) + File.separator + filename(application, isRTL));
    baseStylesheet.delete();

    File themeStylesheet = new File(applicationThemeDirname(themeId, application) + File.separator + filename(application, isRTL));
    themeStylesheet.delete();
  }

}
