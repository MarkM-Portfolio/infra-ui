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

package net.jazz.ajax.tests.internal.util;

import java.util.Collection;

import org.junit.Test;
import static org.junit.Assert.*;

import net.jazz.ajax.internal.util.MasterTemplate;
import net.jazz.ajax.internal.util.ParameterizedTemplate;
import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class MasterTemplateTest extends AbstractTest
{
  @Test
  public void testParameters() throws Exception
  {
    MasterTemplate m = new MasterTemplate(
        "<div id=\"${id}\" class=\"${class}\"><dl><dt>Type:</dt><dd>${type}</dd><dt>Length:</dt><dd>${length}</dd></dl></div>");
    ParameterizedTemplate t = m.newInstance();
    Collection<String> p = t.getParameters();
    assertEquals(4, p.size());
    assertTrue(p.contains("id"));
    assertTrue(p.contains("class"));
    assertTrue(p.contains("type"));
    assertTrue(p.contains("length"));
  }

  @Test
  public void testReplaceParameters() throws Exception
  {
    MasterTemplate m = new MasterTemplate(
        "<div id=\"${id}\" class=\"${class}\"><dl><dt>Type:</dt><dd>${type}</dd><dt>Length:</dt><dd>${length}</dd></dl></div>");
    ParameterizedTemplate t = m.newInstance();
    t.getParameter("id").append("foo");
    t.getParameter("class").append("bar");
    t.getParameter("type").append("battlestar");
    t.getParameter("length").append("3 light years");
    assertEquals("<div id=\"foo\" class=\"bar\"><dl><dt>Type:</dt><dd>battlestar</dd><dt>Length:</dt><dd>3 light years</dd></dl></div>",
        t.getResult());
  }
}
