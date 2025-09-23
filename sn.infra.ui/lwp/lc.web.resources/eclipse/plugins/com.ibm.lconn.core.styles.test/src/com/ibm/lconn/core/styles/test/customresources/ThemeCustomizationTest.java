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
import com.ibm.lconn.core.styles.model.ThemeStyleSheet;

public class ThemeCustomizationTest extends AbstractStyleCustomizationTest
{
  @Test
  public void testCustomDefaultTheme() throws Exception
  {
    testCustomThemeInternal(DEFAULT);
  }

  @Test
  public void testCustomRedTheme() throws Exception
  {
    testCustomThemeInternal(RED);
  }

  @Test
  public void testCustomBlueTheme() throws Exception
  {
    testCustomThemeInternal(BLUE);
  }

  @Test
  public void testCustomGreenTheme() throws Exception
  {
    testCustomThemeInternal(GREEN);
  }

  @Test
  public void testCustomOrangeTheme() throws Exception
  {
    testCustomThemeInternal(ORANGE);
  }

  @Test
  public void testCustomSilverTheme() throws Exception
  {
    testCustomThemeInternal(SILVER);
  }

  @Test
  public void testCustomOnyxTheme() throws Exception
  {
    testCustomThemeInternal(ONYX);
  }

  @Test
  public void testCustomCoffeeTheme() throws Exception
  {
    testCustomThemeInternal(GOLD);
  }

  @Test
  public void testCustomGen4Theme() throws Exception
  {
    testCustomThemeInternal(GEN4);
  }

  @Test
  public void testCustomHikariTheme() throws Exception
  {
    testCustomThemeInternal(HIKARI);
  }

  /**
   * Internal test machinery. Being most of these tests repetitive, it's useful to write them in a modular way
   * 
   * @param themeId
   * @throws Exception
   */
  private void testCustomThemeInternal(String themeId) throws Exception
  {
    for (boolean isRTL : RTL_VALUES)
    {
      makeCustomThemeStylesheets(themeId, isRTL);

      ThemeStyleSheet styleSheet = ThemeStyleSheet.forTheme(themeId, OneUIVersion.oneui3, isRTL);
      if (styleSheet.hasResources())
      {
        ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, styleSheet.getResources(), Collections.EMPTY_LIST);

        Writer writer = new StringWriter();
        g.writeCSS(writer, CONTEXT_STANDARD);

        assertTrue(writer.toString().contains(customThemeRule(themeId, isRTL)));
      }
      deleteCustomThemeStylesheets(themeId, isRTL);
    }
  }

  private void makeCustomThemeStylesheets(String themeId, boolean isRTL) throws Exception
  {
    File themeDir = new File(themeDirname(themeId));
    themeDir.mkdirs();

    File themeStylesheet = new File(themeDirname(themeId) + File.separator + filename(themeName(themeId), isRTL));
    FileWriter fw = new FileWriter(themeStylesheet);
    fw.write(customThemeRule(themeId, isRTL));
    fw.flush();
    fw.close();

    File customStylesheet = new File(themeDirname(themeId) + File.separator + filename(CUSTOM, isRTL));
    fw = new FileWriter(customStylesheet);
    fw.write(customRule(CUSTOM, isRTL));
    fw.flush();
    fw.close();
  }

  private void deleteCustomThemeStylesheets(String themeId, boolean isRTL) throws Exception
  {
    File themeStylesheet = new File(themeDirname(themeId) + File.separator + filename(themeName(themeId), isRTL));
    themeStylesheet.delete();

    File customStylesheet = new File(themeDirname(themeId) + File.separator + filename(CUSTOM, isRTL));
    customStylesheet.delete();
  }

}
