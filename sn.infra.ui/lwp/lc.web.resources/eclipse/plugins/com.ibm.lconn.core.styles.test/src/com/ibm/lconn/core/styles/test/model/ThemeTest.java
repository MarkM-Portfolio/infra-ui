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

import net.jazz.ajax.model.Resource;

import org.junit.Test;

import com.ibm.lconn.core.styles.OneUIVersion;
import com.ibm.lconn.core.styles.model.Theme;
import com.ibm.lconn.core.styles.test.AbstractTest;

public class ThemeTest extends AbstractTest
{

  @Test
  public final void testConstruct()
  {
    Theme theme = new Theme("basic", OneUIVersion.oneui3)
    {
      @Override
      public Resource resolveApplication(String id, boolean isRTL)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public Resource resolve(boolean isRTL)
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertNotNull(theme);
  }

  @Test
  public final void testResolve()
  {
    Theme theme = getTheme("vanilla", OneUIVersion.oneui2);
    assertNull(theme.resolve(true));
    assertNull(theme.resolve(false));
  }

  @Test
  public final void testResolveApplication()
  {
    Theme theme = getTheme("indigo", OneUIVersion.oneui2);
    assertNull(theme.resolveApplication("wikis", true));
    assertNull(theme.resolveApplication("blogs", false));
  }

}
