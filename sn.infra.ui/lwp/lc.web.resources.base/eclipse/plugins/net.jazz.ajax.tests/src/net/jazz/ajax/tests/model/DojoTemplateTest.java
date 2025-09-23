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

import static org.junit.Assert.*;

import org.junit.Test;

import net.jazz.ajax.model.DojoTemplate;
import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class DojoTemplateTest extends AbstractTest
{

  @Test
  public void testConstruct() throws Exception
  {
    r = new DojoTemplate(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.html"), "lconn.widget/template.html");
    assertNotNull(r);
  }

  @Test
  public void testResolve() throws Exception
  {
    r = new DojoTemplate(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.html"), "lconn.widget/template.html")
        .register();
    s = DojoTemplate.newDependency("lconn.widget", "template.html").resolve();
    assertEquals(r, s);
  }

  @Test
  public void testWrite() throws Exception
  {
    r = new DojoTemplate(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.html"), "lconn.widget/template.html");
    String expected = readFile("/net/jazz/ajax/tests/resources/lconn.widget.template.minified.html");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    // Minified templates are identical to unminified ones
    s = new DojoTemplate(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.html"), "lconn.widget/template.html");
    expected = readFile("/net/jazz/ajax/tests/resources/lconn.widget.template.minified.html");
    buffer = new StringBuffer();
    s.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());
  }
}
