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

package net.jazz.ajax.tests.servlets;

import static org.junit.Assert.*;

import java.io.StringWriter;
import java.io.Writer;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.jazz.ajax.model.DojoI18n;
import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.DojoTemplate;
import net.jazz.ajax.model.DojoText;
import net.jazz.ajax.model.JavaScriptModule;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.tests.AbstractTest;
import net.jazz.ajax.tests.mocks.TestRequest;

import org.junit.Test;

@SuppressWarnings("nls")
public class ResourceGraphTest extends AbstractTest
{

  @Test
  public final void testResourceGraphRenderContextCollectionOfResourceResourceGraph()
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.bar");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    ResourceGraph h = new ResourceGraph(CONTEXT_STANDARD, includes, g);
    assertNotNull(h);
  }

  @Test
  public final void testResourceGraphRenderContextCollectionOfResourceCollectionOfResource()
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    assertNotNull(g);
  }

  @Test
  public final void testContains()
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    assertTrue(g.contains(r));
    assertTrue(g.contains(s));
    assertFalse(g.contains(DOJO));
  }

  @Test
  public final void testGetJavaScriptURIs()
  {
    Pattern INCLUDE_PATTERN = Pattern.compile(".*include=([^~]+)~.*&.*exclude=([^~]+)~.*");

    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    List<String> uris = g.getJavaScriptURIs();
    assertEquals(1, uris.size());
    assertTrue(uris.get(0).startsWith(CONTEXT_STANDARD.base));
    Matcher m = INCLUDE_PATTERN.matcher(uris.get(0));
    assertTrue(m.find());
    assertEquals("lconn.foo", m.group(1));
    assertEquals("dojo.main", m.group(2));

    ResourceGraph h = new ResourceGraph(CONTEXT_NO_MINIFY, includes, excludes);
    uris = h.getJavaScriptURIs();
    assertEquals(1, uris.size());
    assertTrue(uris.get(0).startsWith(CONTEXT_NO_MINIFY.base));
    m = INCLUDE_PATTERN.matcher(uris.get(0));
    assertTrue(m.find());
    assertEquals("lconn.foo", m.group(1));
    assertEquals("dojo.main", m.group(2));

    ResourceGraph i = new ResourceGraph(CONTEXT_DEBUG, includes, excludes);
    uris = i.getJavaScriptURIs();
    assertEquals(2, uris.size());
    assertTrue(uris.get(0).startsWith(CONTEXT_DEBUG.base));
    m = INCLUDE_PATTERN.matcher(uris.get(0));
    assertFalse(m.find());
    m = INCLUDE_PATTERN.matcher(uris.get(1));
    assertFalse(m.find());
  }

  @Test
  public final void testGetStyleSheetURIs()
  {
    // TODO:
  }

  @Test
  public final void testGetETag()
  {
    // TODO:
  }

  @Test
  public final void testGetIncludes()
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.bar");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    assertEquals(includes, g.getIncludes());

    ResourceGraph h = new ResourceGraph(CONTEXT_STANDARD, includes, g);
    assertEquals(includes, h.getIncludes());
  }

  @Test
  public final void testGetJavascriptResources()
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    Collection<Resource> resources = g.getJavascriptResources();
    assertTrue(resources.contains(r));
    assertTrue(resources.contains(s));
    assertFalse(resources.contains(DOJO));

    includes = Resource.resolveAll("lconn.bar");

    ResourceGraph h = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    resources = h.getJavascriptResources();
    assertFalse(resources.contains(r));
    assertTrue(resources.contains(s));
    assertFalse(resources.contains(DOJO));
  }
  
  @Test
  public final void testGetXDloaderResource(){
	  r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
	  s = new DojoModule(getClass().getResource("/net/jazz/ajax/xdloader.js"), "net.jazz.ajax.xdloader").register();
	  
	  List<Resource> includes = Resource.resolveAll("lconn.foo");
	  List<Resource> excludes = Resource.resolveAll("dojo.main");
	  
	  ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
	  Collection<Resource> resources = g.getJavascriptResources();
	  assertFalse(resources.contains(s));
	  
	  TestRequest request = new TestRequest();
	  request.setParameter("xdloader", "true");
	  RenderContext r1 = RenderContext.forRequest(request);
	  ResourceGraph h = new ResourceGraph(r1, includes, excludes);
	  Collection<Resource> resources2 = h.getJavascriptResources();
	  assertTrue(resources2.contains(s));
  }

  @Test
  public final void testGetLastModified()
  {
    // TODO:
  }

  @Test
  public final void testGetProblems()
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);
    Collection<CharSequence> problems = g.getProblems();
    assertEquals(1, problems.size());
    Iterator<CharSequence> iter = problems.iterator();
    assertEquals("Resource js \"lconn.foo\" has an unresolved dependency on: lconn.bar.js", iter.next());
  }

  @Test
  public final void testIsStillValid()
  {
    // TODO:
  }

  @Test
  public final void testWriteCSS() throws Exception
  {
    r = new StyleSheet("imports.css", getClass().getResource("/net/jazz/ajax/tests/resources/imports.css")).register();
    s = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css")).register();
    t = new StyleSheet("foo.css", getClass().getResource("/net/jazz/ajax/tests/resources/foo.css")).register();

    String expected = readFile("/net/jazz/ajax/tests/resources/imports.minified.css");

    List<Resource> includes = Resource.resolveAll("imports.css");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    Writer writer = new StringWriter();
    g.writeCSS(writer, CONTEXT_STANDARD);
    assertEquals(expected, writer.toString());
  }

  @Test
  public final void testWriteJavascript() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    String expected = readFile("/net/jazz/ajax/tests/resources/lconn.foo.aggregated.js");
    assertEquals(expected, writer.toString());
  }

  @Test
  public final void testWriteJavascriptTags() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);

    StringBuilder buffer = new StringBuilder();
    g.writeJavascriptTags(buffer);

    assertTrue(buffer.length() > 0);
    assertTrue(buffer.toString().toLowerCase().startsWith("<script "));
    List<String> uris = g.getJavaScriptURIs();
    for (String uri : uris)
      assertTrue(buffer.toString().contains(uri));
  }

  @Test
  public final void testGetJavaScriptURIsDebugMode() throws Exception
  {
    // DojoModule
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    assertEquals(CONTEXT_DEBUG.base + "/web/_debug/js/lconn.foo.js?debug=true", ResourceGraph.getResourceURLDebug(CONTEXT_DEBUG, r)
        .toString());

    // JavaScriptModule
    s = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnbar.js"), "lconn/bar").register();
    assertEquals(CONTEXT_DEBUG.base + "/web/_debug/js/lconn/bar.js?debug=true", ResourceGraph.getResourceURLDebug(CONTEXT_DEBUG, s)
        .toString());

    // DojoI18n
    t = DojoI18n.newDependency("lconn/nls/messages").resolve();
    assertEquals(CONTEXT_DEBUG.base + "/web/_debug/js/dojo/i18n!lconn/nls/messages.js?debug=true",
        ResourceGraph.getResourceURLDebug(CONTEXT_DEBUG, t).toString());

    // DojoText
    u = new DojoText(getClass().getResource("/net/jazz/ajax/tests/resources/text.txt"), "dojo/text!text.txt");
    assertEquals(CONTEXT_DEBUG.base + "/web/_debug/js/dojo/text!text.txt.js?debug=true", ResourceGraph
        .getResourceURLDebug(CONTEXT_DEBUG, u).toString());

    // Recycle resources - don't do this at home
    unregister();

    // DojoTemplate
    r = new DojoTemplate(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.html"), "lconn.widget/template.html")
        .register();
    assertNull(ResourceGraph.getResourceURLDebug(CONTEXT_DEBUG, r));

    // DojoMessageBundle
    s = new DojoMessageBundle(lconnBundle, "lconn.nls.messages");
    assertEquals(CONTEXT_DEBUG.base + "/web/_debug/messageBundle/lconn.nls.messages.js?debug=true",
        ResourceGraph.getResourceURLDebug(CONTEXT_DEBUG, s).toString());

    // Only valid in debug mode
    boolean thrown = false;
    try
    {
      ResourceGraph.getResourceURLDebug(CONTEXT_STANDARD, s).toString();
    }
    catch (Throwable t)
    {
      thrown = true;
    }
    finally
    {
      assertTrue(thrown);
    }
  }
}
