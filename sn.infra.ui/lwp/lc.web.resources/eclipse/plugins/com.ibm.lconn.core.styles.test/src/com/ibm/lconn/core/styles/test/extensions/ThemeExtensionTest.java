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

package com.ibm.lconn.core.styles.test.extensions;

import static org.junit.Assert.*;

import java.io.StringWriter;
import java.io.Writer;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.servlets.ResourceGraph;

import org.junit.Before;
import org.junit.Test;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.Theme;
import com.ibm.lconn.core.styles.test.AbstractTest;

@SuppressWarnings("nls")
public class ThemeExtensionTest extends AbstractTest
{
  Theme theme;

  @Before
  public final void loadTheme()
  {
    theme = Theme.resolve("test_theme", OneUIVersion.oneui3);
  }

  @Test
  public final void testThemeLTR() throws Exception
  {
    List<Resource> includes = Arrays.asList(theme.resolve(false));

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    Writer writer = new StringWriter();
    g.writeCSS(writer, CONTEXT_STANDARD);
    assertTrue(writer.toString().contains(".theme"));
  }

  @Test
  public final void testThemeRTL() throws Exception
  {
    List<Resource> includes = Arrays.asList(theme.resolve(true));

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    Writer writer = new StringWriter();
    g.writeCSS(writer, CONTEXT_STANDARD);
    assertTrue(writer.toString().contains(".themeRTL"));
  }

  @Test
  public final void testApplicationLTR() throws Exception
  {
    List<Resource> includes = Arrays.asList(theme.resolveApplication("wikis", false));

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    Writer writer = new StringWriter();
    g.writeCSS(writer, CONTEXT_STANDARD);
    assertTrue(writer.toString().contains(".wikis"));
  }

  @Test
  public final void testApplicationRTL() throws Exception
  {
    List<Resource> includes = Arrays.asList(theme.resolveApplication("wikis", true));

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    Writer writer = new StringWriter();
    g.writeCSS(writer, CONTEXT_STANDARD);
    assertTrue(writer.toString().contains(".wikisRTL"));
  }
}
