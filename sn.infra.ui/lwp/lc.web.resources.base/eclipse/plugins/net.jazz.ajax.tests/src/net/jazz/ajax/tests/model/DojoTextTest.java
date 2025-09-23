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

package net.jazz.ajax.tests.model;

import java.net.URL;
import java.util.Locale;

import org.junit.Test;
import static org.junit.Assert.*;

import net.jazz.ajax.model.DojoText;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.RenderContext.Mode;
import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class DojoTextTest extends AbstractTest
{
  @Test
  public void testConstruct() throws Exception
  {
    r = new DojoText(getClass().getResource("/net/jazz/ajax/tests/resources/text.txt"), "dojo/text!text.txt");
    assertNotNull(r);
  }

  @Test
  public void testResolve() throws Exception
  {
    r = new DojoText(getClass().getResource("/net/jazz/ajax/tests/resources/text.txt"), "dojo/text!text.txt").register();
    s = DojoText.newDependency("text.txt").resolve();
    assertEquals(r, s);
  }

  @Test
  public void testWrite() throws Exception
  {
    r = new DojoText(getClass().getResource("/net/jazz/ajax/tests/resources/text.txt"), "dojo/text!text.txt").register();
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, RenderContext.forState("this doesn't matter", Locale.ENGLISH, Mode.NO_MINIFY));
    String expected = readFile("/net/jazz/ajax/tests/resources/text.compressed.txt");
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testMinify() throws Exception
  {
    r = new DojoText(getClass().getResource("/net/jazz/ajax/tests/resources/text.txt"), "dojo/text!text.txt").register();
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, RenderContext.forState("this doesn't matter", Locale.ENGLISH, Mode.STANDARD));
    String expected = readFile("/net/jazz/ajax/tests/resources/text.minified.txt");
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testMissingResource() throws Exception
  {
    boolean thrown = false;
    try
    {
      URL fakeURL = new URL("bundleresource://12345/net/jazz/ajax/tests/resources/text.txt");
      r = new DojoText(fakeURL, "dojo/text!idonotexist.txt");
    }
    catch (RuntimeException e)
    {
      thrown = true;
    }
    assertTrue(thrown);

    thrown = false;
    try
    {
      s = DojoText.newDependency("idonotexist.txt").resolve();
      assertNull(s);
    }
    catch (IllegalArgumentException e)
    {
      thrown = true;
    }
    assertFalse(thrown);
  }
}
