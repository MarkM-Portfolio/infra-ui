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

package com.ibm.lconn.web.resources.test.customresources;

import static org.junit.Assert.assertEquals;

import java.net.URL;

import net.jazz.ajax.servlets.TestTemplate;
import net.jazz.ajax.tests.AbstractTest;
import net.jazz.ajax.tests.mocks.TestContext;
import net.jazz.ajax.tests.mocks.TestRequest;
import net.jazz.ajax.tests.mocks.TestResponse;

import org.junit.Test;

@SuppressWarnings("nls")
public class CustomTestTemplateTest extends AbstractCustomizationTest
{
  final String TEMPLATE_HTML = "template.html";
  
  final URL ORIGINAL_RESOURCE = AbstractTest.class.getResource("/net/jazz/ajax/tests/resources/template.html");

  final String ORIGINAL_RESOURCE_OUTPUT_PATH = "/net/jazz/ajax/tests/resources/template.output.html";

  final URL CUSTOM_RESOURCE = getClass().getResource("/com/ibm/lconn/web/resources/test/resources/template.custom.html");

  final URL CUSTOM_RESOURCE_OUTPUT = getClass().getResource("/com/ibm/lconn/web/resources/test/resources/template.custom.output.html");

  @Test
  public final void testOverrideTestTemplate() throws Exception
  {
    deleteCustomTextfile(TEMPLATE_HTML);

    TestRequest request = new TestRequest();
    request.setServletPath("");
    TestResponse response = new TestResponse();
    TestContext context = new TestContext();
    context.setMimeType("text/html");

    TestTemplate.doMakeHTML(r, request, response, context, ORIGINAL_RESOURCE, TEMPLATE_HTML);

    String actual = response.getResponseText();
    String expected = readFile(ORIGINAL_RESOURCE_OUTPUT_PATH);
    assertEquals(expected, actual);

    createCustomTextfile(CUSTOM_RESOURCE, TEMPLATE_HTML);

    request = new TestRequest();
    request.setServletPath("");
    response = new TestResponse();
    context = new TestContext();
    context.setMimeType("text/html");

    TestTemplate.doMakeHTML(r, request, response, context, ORIGINAL_RESOURCE, TEMPLATE_HTML);

    actual = response.getResponseText();
    expected = readFile(CUSTOM_RESOURCE_OUTPUT);
    assertEquals(expected, actual);

    deleteCustomTextfile(TEMPLATE_HTML);

    request = new TestRequest();
    request.setServletPath("");
    response = new TestResponse();
    context = new TestContext();
    context.setMimeType("text/html");

    TestTemplate.doMakeHTML(r, request, response, context, ORIGINAL_RESOURCE, TEMPLATE_HTML);

    actual = response.getResponseText();
    expected = readFile(ORIGINAL_RESOURCE_OUTPUT_PATH);
    assertEquals(expected, actual);
  }
}
