/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.internal.util;

import static org.junit.Assert.*;

import java.util.Locale;

import net.jazz.ajax.internal.util.LocaleUtil;

import org.junit.Test;

@SuppressWarnings("nls")
public class LocaleUtilTest
{
  final static Object[][] tests = new Object[][] { { "en", Locale.ENGLISH }, { "he", new Locale("iw") }, { "he", new Locale("he") },
      { "en-us", Locale.US }, { "en-gb", Locale.UK }, { "nb", new Locale("no") }, { "nb", new Locale("no") }, { "ja", Locale.JAPANESE },
      { "ja-jp", Locale.JAPAN }, { "id", new Locale("id") }, { "id", new Locale("in") }, };

  @Test
  public final void testFromDojoString()
  {
    for (Object[] test : tests)
      assertEquals((Locale) test[1], LocaleUtil.fromDojoString((String) test[0]));
    // Test null
    assertEquals(Locale.ENGLISH, LocaleUtil.fromDojoString(null));
  }

  @Test
  public final void testToDojoString()
  {
    StringBuilder buffer = new StringBuilder();
    for (Object[] test : tests)
    {
      LocaleUtil.toDojoString(buffer, (Locale) test[1]);
      assertEquals((String) test[0], buffer.toString());
      buffer.delete(0, buffer.length());
    }
    // Test null
    LocaleUtil.toDojoString(buffer, null);
    assertEquals("en", buffer.toString());
  }

  @Test
  public final void testInternalize()
  {
    Locale locale;
    for (String[] test : new String[][] { { "no", "nb" }, { "nb-no", "nb" } })
    {
      locale = LocaleUtil.internalize(test[0]);
      assertEquals(test[1], locale.toString());
    }
    // Test null
    locale = LocaleUtil.internalize(null);
    assertNull(locale);
  }
}
