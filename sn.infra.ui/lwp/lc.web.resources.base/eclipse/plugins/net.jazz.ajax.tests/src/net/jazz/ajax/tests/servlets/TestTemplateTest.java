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

package net.jazz.ajax.tests.servlets;

import static org.junit.Assert.*;

import net.jazz.ajax.servlets.TestTemplate;
import net.jazz.ajax.tests.AbstractTest;
import net.jazz.ajax.tests.mocks.TestContext;
import net.jazz.ajax.tests.mocks.TestRequest;
import net.jazz.ajax.tests.mocks.TestResponse;

import org.junit.Test;

@SuppressWarnings("nls")
public class TestTemplateTest extends AbstractTest
{
  @Test
  public final void testDoMakeHTML() throws Exception
  {
    TestRequest request = new TestRequest();
    request.setServletPath("");
    TestResponse response = new TestResponse();
    TestContext context = new TestContext();
    context.setMimeType("text/html");

    TestTemplate.doMakeHTML(r, request, response, context, getClass().getResource("/net/jazz/ajax/tests/resources/template.html"), null);

    String actual = response.getResponseText();
    String expected = readFile("/net/jazz/ajax/tests/resources/template.output.html");
    assertEquals(expected, actual);
  }
}
