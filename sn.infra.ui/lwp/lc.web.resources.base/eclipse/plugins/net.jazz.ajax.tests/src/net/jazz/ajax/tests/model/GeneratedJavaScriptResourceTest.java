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

import java.io.IOException;

import net.jazz.ajax.model.GeneratedJavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.Test;

@SuppressWarnings("nls")
public class GeneratedJavaScriptResourceTest extends AbstractTest
{

  @Test
  public final void testGetStateRenderContextState()
  {
    r = getGeneratedJavaScriptResource("lconn.foo", "var a = 1;");

    Resource.State state = new Resource.State();
    assertEquals(0, state.lastModified);
    r.getState(CONTEXT_STANDARD, state);
    assertEquals(0, state.lastModified);

    r.internalRefresh(CONTEXT_STANDARD);
    r.getState(CONTEXT_STANDARD, state);
    assertTrue(state.lastModified > 0);
    assertTrue(state.lastModified <= System.currentTimeMillis());
  }

  @Test
  public final void testInternalRefresh() throws Exception
  {
    r = getGeneratedJavaScriptResource("lconn.foo", "dojo.provide('lconn.foo');dojo.declare('lconn.foo',null,{a:1});");

    // Must call internalRefresh at least once to load content. This will also set lastModified to System.currentTimeMillis()
    r.internalRefresh(CONTEXT_STANDARD);

    String expected = "\n;dojo.provide(\"lconn.foo\");\ndojo.declare(\"lconn.foo\",null,{a:1});\n\n";
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    ((TestGeneratedJavaScriptResource) r).setContent("alert('hello world!');");
    r.internalRefresh(CONTEXT_STANDARD);

    // Default implementation doesn't expire content
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }

  private GeneratedJavaScriptResource getGeneratedJavaScriptResource(String id, final String content)
  {
    TestGeneratedJavaScriptResource ret = new TestGeneratedJavaScriptResource(id);
    ret.setContent(content);
    return ret;
  }

  class TestGeneratedJavaScriptResource extends GeneratedJavaScriptResource
  {
    public TestGeneratedJavaScriptResource(String id)
    {
      super(id);
    }

    CharSequence content;

    @Override
    protected CharSequence content(RenderContext context) throws IOException
    {
      return content;
    }

    public void setContent(CharSequence content)
    {
      this.content = content;
    }
  }
}
