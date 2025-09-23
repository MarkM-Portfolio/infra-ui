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

import net.jazz.ajax.model.DojoModule;

import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class DojoModuleTest extends AbstractTest
{
  @Test
  public void testConstruct() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo");
    assertNotNull(r);
  }

  @Test
  public void testMinify() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    String expected = readFile("/net/jazz/ajax/tests/resources/lconn.foo.minified.js");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    t = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();
    expected = readFile("/net/jazz/ajax/tests/resources/lconn.bar.minified.js");
    buffer = new StringBuffer();
    t.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

  }
}
