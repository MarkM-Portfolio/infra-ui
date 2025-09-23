/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.model;

import java.text.MessageFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.tests.AbstractTest;
import static org.junit.Assert.*;

import org.junit.Test;

import com.ibm.lconn.core.config.VersionStamp;

@SuppressWarnings("nls")
public class StyleSheetTest extends AbstractTest
{

  @Test
  public void testConstruct() throws Exception
  {
    s = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css"));
    assertNotNull(s);
  }

  @Test
  public void testResolve() throws Exception
  {
    r = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css")).register();
    s = StyleSheet.newDependency("bar.css", false).resolve();
    assertEquals(s, r);

    t = new StyleSheet("foo.css", getClass().getResource("/net/jazz/ajax/tests/resources/foo.css")).register();
    u = StyleSheet.newDependency("foo.css", false).resolve();
    assertEquals(u, t);
  }

  @Test
  public void testCountRules() throws Exception
  {
    r = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css")).register();
    assertEquals(2, ((StyleSheet) r).getSelectorsCount());

    s = new StyleSheet("foo.css", getClass().getResource("/net/jazz/ajax/tests/resources/foo.css")).register();
    assertEquals(16, ((StyleSheet) s).getSelectorsCount());
  }

  @Test
  public void testWrite() throws Exception
  {
    r = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css")).register();
    String expected = readFile("/net/jazz/ajax/tests/resources/bar.minified.css");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testAggregate() throws Exception
  {
    r = new StyleSheet("imports.css", getClass().getResource("/net/jazz/ajax/tests/resources/imports.css")).register();
    s = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css")).register();
    t = new StyleSheet("foo.css", getClass().getResource("/net/jazz/ajax/tests/resources/foo.css")).register();
    String expected = readFile("/net/jazz/ajax/tests/resources/imports.aggregated.css");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testMatchURLs()
  {
    match("@import \"foo.css\";  ");
    match("@import url(\"foo.css\");     ");
    match("@import url(foo.css); ");
    match("@import url('foo.css');");
    match("@import url('foo.css') print;");
    match("@import url('foo.css') projection, tv;");
  }

  public void match(String rule)
  {
    // Keep in sync with net.jazz.ajax.model.StyleSheet
    final Pattern CSS_IMPORT = Pattern.compile("@import\\s+(?:url\\(?)?([\"']?)([^\1)]+)\\s*\\1[)]?[;]?(?:\\s*$)?", Pattern.MULTILINE);
    Matcher m = CSS_IMPORT.matcher(rule);
    assertTrue(m.find());
    assertEquals(2, m.groupCount());
    assertEquals("foo.css", m.group(2));
  }

  @Test
  public void testRewriteURLs() throws Exception
  {
    String etag = VersionStamp.getInstance().toString();

    r = new StyleSheet("manyurls.css", getClass().getResource("/net/jazz/ajax/tests/resources/manyurls.css")).register();
    String expected = MessageFormat.format(readFile("/net/jazz/ajax/tests/resources/manyurls.minified.css"), AjaxFramework.WEB_ROOT, etag);
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }
}
