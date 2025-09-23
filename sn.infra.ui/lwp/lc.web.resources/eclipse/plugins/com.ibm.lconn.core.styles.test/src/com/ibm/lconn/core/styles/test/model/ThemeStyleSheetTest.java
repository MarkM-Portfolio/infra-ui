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

package com.ibm.lconn.core.styles.test.model;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Type;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.ThemeStyleSheet;
import com.ibm.lconn.core.styles.test.AbstractTest;

public class ThemeStyleSheetTest extends AbstractTest
{
  private final static String CLASS_NAME = ThemeStyleSheetTest.class.getName();

  @Test
  public void testForTheme()
  {
    Resource.Type type = Type.forName(CLASS_NAME);
    if (type == null)
      type = Type.create(CLASS_NAME);

    r = new Resource(type, "theme");
    s = new Resource(type, "application");

    // Note the ThemeStyleSheet only contains the theme resource, not the application resource
    List<Resource> themeResource = new ArrayList<Resource>();
    themeResource.add(r);

    t = getTheme(VANILLA, OneUIVersion.oneui3, r, s);
    t.register();

    ThemeStyleSheet tss = ThemeStyleSheet.forTheme(VANILLA, OneUIVersion.oneui3, false);

    assertTrue(tss.hasResources());
    assertListEquals(themeResource, tss.getResources());
  }
}
