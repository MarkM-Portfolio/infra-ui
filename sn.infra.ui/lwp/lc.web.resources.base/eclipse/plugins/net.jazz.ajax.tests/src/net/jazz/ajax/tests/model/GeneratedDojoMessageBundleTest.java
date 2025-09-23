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

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.net.URL;
import java.util.Dictionary;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.model.AbstractGeneratedDojoMessageBundle;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.GeneratedDojoMessageBundle;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.servlets.ResourceGraphOperation;
import net.jazz.ajax.tests.AbstractTest;

import static org.junit.Assert.*;

import org.junit.Test;
import org.mozilla.javascript.NativeObject;
import org.osgi.framework.BundleContext;
import org.osgi.framework.BundleException;
import org.osgi.framework.ServiceReference;
import org.osgi.framework.Version;

@SuppressWarnings("nls")
public class GeneratedDojoMessageBundleTest extends AbstractTest
{
  @Test
  public void testGenerateNested() throws Exception
  {
    // 1. Create a generated dojo message bundle; this is equivalent to the declaration in the plugin descriptor:
    // <dojoResourceModule package="lconn" name="widgets" nested="true" file="/net/jazz/ajax/tests/resources/widgets.properties" />
    r = new GeneratedDojoMessageBundle("lconn", "lconn.nls.widgets", "/net/jazz/ajax/tests/resources/widgets.properties", new MockBundle(
        "/net/jazz/ajax/tests/resources/widgets.properties"), AbstractGeneratedDojoMessageBundle.Level.ALL).register();

    // 2. Create a dojo module that requires the generated message bundle
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widgets.js"), "lconn.widgets").register();

    // 3. Generate the resource graph
    List<Resource> includes = Resource.resolveAll("lconn.widgets");
    List<Resource> excludes = Resource.resolveAll("dojo.main");
    ResourceGraphOperation operation = new ResourceGraphOperation(CONTEXT_STANDARD, includes, excludes);

    ResourceGraph graph = operation.execute();

    StringWriter writer = new StringWriter();
    graph.writeJavascript(writer, CONTEXT_STANDARD);

    // 4. Verify
    String[] lines = writer.toString().split("\\n");
    assertEquals("dojo.provide(\"lconn.nls.widgets\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.widgets.en\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.widgets.en="));
    assertNotNull(actual);

    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/widgets_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public void testGenerateFlat() throws Exception
  {
    // 1. Create a generated dojo message bundle; this is equivalent to the declaration in the plugin descriptor:
    // <dojoResourceModule package="lconn" name="widgets" nested="false" file="/net/jazz/ajax/tests/resources/widgets.properties" />
    r = new GeneratedDojoMessageBundle("lconn", "lconn.nls.widgets", "/net/jazz/ajax/tests/resources/widgets.properties", new MockBundle(
        "/net/jazz/ajax/tests/resources/widgets.properties"), AbstractGeneratedDojoMessageBundle.Level.NONE).register();

    // 2. Create a dojo module that requires the generated message bundle
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widgets.js"), "lconn.widgets").register();

    // 3. Generate the resource graph
    List<Resource> includes = Resource.resolveAll("lconn.widgets");
    List<Resource> excludes = Resource.resolveAll("dojo.main");
    ResourceGraphOperation operation = new ResourceGraphOperation(CONTEXT_STANDARD, includes, excludes);

    ResourceGraph graph = operation.execute();

    StringWriter writer = new StringWriter();
    graph.writeJavascript(writer, CONTEXT_STANDARD);

    // 4. Verify
    String[] lines = writer.toString().split("\\n");
    assertEquals("dojo.provide(\"lconn.nls.widgets\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.widgets.en\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.widgets.en="));
    assertNotNull(actual);

    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/widgets_en.flat.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  @Test
  public void testGenerateNonExisting() throws Exception
  {
    // 1. Create a generated dojo message bundle; this is equivalent to the declaration in the plugin descriptor:
    // <dojoResourceModule package="lconn.core" name="widgets" file="/com/ibm/lconn/widgets/resources/ui_resources.properties" />
    r = new GeneratedDojoMessageBundle("lconn", "lconn.nls.widgets", "/net/jazz/ajax/tests/resources/idonotexist.properties",
        new MockBundle("/net/jazz/ajax/tests/resources/idonotexist.properties"), AbstractGeneratedDojoMessageBundle.Level.ALL).register();

    // 2. Create a dojo module that requires the generated message bundle
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widgets.js"), "lconn.widgets").register();

    // 3. Generate the resource graph
    List<Resource> includes = Resource.resolveAll("lconn.widgets");
    List<Resource> excludes = Resource.resolveAll(new String[] { "dojo.main", "net.jazz.ajax.core.internal.amd" });
    ResourceGraphOperation operation = new ResourceGraphOperation(CONTEXT_STANDARD, includes, excludes);

    // Note we need to request a different operation to avoid hitting the cache
    ResourceGraph graph = operation.execute();

    StringWriter writer = new StringWriter();
    graph.writeJavascript(writer, CONTEXT_STANDARD);

    // 4. Verify
    String[] lines = writer.toString().split("\\n");
    assertEquals("dojo.provide(\"lconn.nls.widgets\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.widgets.ROOT\");", lines[1]);
    assertEquals("lconn.nls.widgets.ROOT=null;", lines[2]);
  }

  @Test
  public void testGenerateUnsupportedLocale() throws Exception
  {
    // 1. Create a generated dojo message bundle; this is equivalent to the declaration in the plugin descriptor:
    // <dojoResourceModule package="lconn.core" name="widgets" file="/com/ibm/lconn/widgets/resources/ui_resources.properties" />
    r = new GeneratedDojoMessageBundle("lconn", "lconn.nls.widgets", "/net/jazz/ajax/tests/resources/widgets.properties", new MockBundle(
        "/net/jazz/ajax/tests/resources/widgets.properties", true), AbstractGeneratedDojoMessageBundle.Level.ALL).register();

    // 2. Create a dojo module that requires the generated message bundle
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.widgets.js"), "lconn.widgets").register();

    // 3. Generate the resource graph with an unsupported locale
    List<Resource> includes = Resource.resolveAll("lconn.widgets");
    List<Resource> excludes = Resource.resolveAll("dojo.main");
    ResourceGraphOperation operation = new ResourceGraphOperation(CONTEXT_IRISH, includes, excludes);

    ResourceGraph graph = operation.execute();

    StringWriter writer = new StringWriter();
    graph.writeJavascript(writer, CONTEXT_IRISH);

    // 4. Verify
    String[] lines = writer.toString().split("\\n");
    assertEquals("dojo.provide(\"lconn.nls.widgets\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.widgets.ROOT\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.widgets.ROOT="));
    assertNotNull(actual);

    // Strings should be the English ones
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/widgets_en.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);
  }

  class MockBundle implements org.osgi.framework.Bundle
  {
    private String properties;

    private boolean strictLocaleCheck = false;

    public MockBundle(String properties)
    {
      this.properties = properties;
    }

    public MockBundle(String properties, boolean strictLocaleCheck)
    {
      this(properties);
      this.strictLocaleCheck = strictLocaleCheck;
    }

    public Enumeration findEntries(String arg0, String arg1, boolean arg2)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public BundleContext getBundleContext()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public long getBundleId()
    {
      // TODO Auto-generated method stub
      return 0;
    }

    public URL getEntry(String arg0)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public Enumeration getEntryPaths(String arg0)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public Dictionary getHeaders()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public Dictionary getHeaders(String arg0)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public long getLastModified()
    {
      // TODO Auto-generated method stub
      return 0;
    }

    public String getLocation()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public ServiceReference[] getRegisteredServices()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public URL getResource(String arg0)
    {
      if (!strictLocaleCheck || properties.equals(arg0))
        return getClass().getResource(properties);
      return null;
    }

    public Enumeration getResources(String arg0) throws IOException
    {
      // TODO Auto-generated method stub
      return null;
    }

    public ServiceReference[] getServicesInUse()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public Map getSignerCertificates(int arg0)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public int getState()
    {
      // TODO Auto-generated method stub
      return 0;
    }

    public String getSymbolicName()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public Version getVersion()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public boolean hasPermission(Object arg0)
    {
      // TODO Auto-generated method stub
      return false;
    }

    public Class loadClass(String arg0) throws ClassNotFoundException
    {
      // TODO Auto-generated method stub
      return null;
    }

    public void start() throws BundleException
    {
      // TODO Auto-generated method stub

    }

    public void start(int arg0) throws BundleException
    {
      // TODO Auto-generated method stub

    }

    public void stop() throws BundleException
    {
      // TODO Auto-generated method stub

    }

    public void stop(int arg0) throws BundleException
    {
      // TODO Auto-generated method stub

    }

    public void uninstall() throws BundleException
    {
      // TODO Auto-generated method stub

    }

    public void update() throws BundleException
    {
      // TODO Auto-generated method stub

    }

    public void update(InputStream arg0) throws BundleException
    {
      // TODO Auto-generated method stub

    }

  }
}
