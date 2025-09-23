/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.functional;

import java.io.File;
import java.net.URL;
import java.util.Locale;
import java.util.ResourceBundle;

import javax.servlet.ServletContext;

import org.junit.BeforeClass;
import org.junit.Test;
import org.mozilla.javascript.NativeObject;
import org.osgi.framework.ServiceRegistration;

import static org.junit.Assert.*;

import com.ibm.lconn.core.customization.AbstractCustomizationInitializer;
import com.ibm.lconn.core.customization.ApplicationCustomization;
import com.ibm.lconn.core.customization.Customization;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.DojoTemplate;
import net.jazz.ajax.model.ResourceOverrideService;
import net.jazz.ajax.tests.AbstractTest;
import net.jazz.ajax.tests.internal.Activator;
import net.jazz.ajax.tests.model.ResourceTest;

@SuppressWarnings("nls")
public class CustomResourcesTest extends AbstractTest
{
  private static MockCustomization mockInstance;

  @BeforeClass
  public static void setCustomizationInstance()
  {
    mockInstance = new MockCustomization();
    mockInstance.init();
  }

  @Test
  public void testOverrideDojoModule() throws Exception
  {
    // Multiple URLs; the first valid URL will be used
    r = new DojoModule(new URL[] { ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"),
        ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.bar.js") }, "lconn.foo");
    String expected = readFile("/net/jazz/ajax/tests/resources/lconn.foo.minified.js");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    // Multiple URLs; the first null URL will be skipped
    s = new DojoModule(new URL[] { null, ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"),
        ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.foo.js") }, "lconn.bar");
    expected = readFile("/net/jazz/ajax/tests/resources/lconn.bar.minified.js");
    buffer = new StringBuffer();
    s.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testOverrideDojoTemplate() throws Exception
  {
    // Multiple URLs; the first valid URL will be used
    r = new DojoTemplate(new URL[] { ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.html"),
        ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.bogus.html") }, "lconn.widget/template.html");
    String expected = readFile("/net/jazz/ajax/tests/resources/lconn.widget.template.minified.html");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());

    // Multiple URLs; the first null URL will be skipped
    s = new DojoTemplate(new URL[] { null, ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.html"),
        ResourceTest.class.getResource("/net/jazz/ajax/tests/resources/lconn.widget.template.bogus.html") }, "lconn.widget/template.html");
    expected = readFile("/net/jazz/ajax/tests/resources/lconn.widget.template.minified.html");
    buffer = new StringBuffer();
    s.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }

  @Test
  public void testOverrideDojoMessageBundle() throws Exception
  {
    ServiceRegistration registration = Activator.context.registerService(ResourceOverrideService.class.getName(),
        new MockResourceOverrideService(), null);

    r = new DojoMessageBundle(lconnBundle, "lconn.nls.messages");
    StringBuffer buffer = new StringBuffer();
    r.write(buffer, CONTEXT_NO_MINIFY);
    String[] lines = buffer.toString().split("\\n");
    assertEquals(3, lines.length);
    assertEquals("dojo.provide(\"lconn.nls.messages\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.messages.en\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.messages.en="));
    assertNotNull(actual);
    NativeObject expected = JavaScriptUtil.eval(readFile("/net/jazz/ajax/tests/resources/messages_en.overridden.minified.js"));
    assertNotNull(expected);
    assertDeepEquals(actual, expected);

    registration.unregister();
  }

  @Test
  public void testOverrideJavaScriptModule()
  {
    // TODO:
  }

  @Test
  public void testOverrideStyleSheet()
  {
    // TODO:
  }

  // TODO: move to sn.infra/base UI tests
  static class MockCustomization extends AbstractCustomizationInitializer implements Customization
  {
    public void init()
    {
      ApplicationCustomization.setInstance("", this);
    }

    public void unset()
    {
      // TODO:
    }

    public void replace(String string)
    {
      // TODO Auto-generated method stub

    }

    public boolean hasCustomFile(String relativePath)
    {
      // TODO Auto-generated method stub
      return false;
    }

    public File getCustomFile(String relativePath)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public File getFile(String relativePath, ServletContext servletContext)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public File[] getDirectories()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public File getJavascriptDirectory()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public File getThemeDirectory()
    {
      // TODO Auto-generated method stub
      return null;
    }

    public ResourceBundle getBundle(String bundleName, Locale locale)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public ResourceBundle getBundle(String bundleName, Locale locale, ClassLoader parentClassLoader)
    {
      // TODO Auto-generated method stub
      return null;
    }

    public URL getBundleUrl(String bundleName)
    {
      // TODO Auto-generated method stub
      return null;
    }
  }

  class MockResourceOverrideService implements ResourceOverrideService
  {
    public URL getDojoModuleUrl(String id)
    {
      return null;
    }

    public URL getMessageBundleUrl(String bundleName)
    {
      if (bundleName.equals("lconn.nls.messages.js"))
        return getClass().getResource("/net/jazz/ajax/tests/resources/messages_en.overridden.js");
      else if (bundleName.equals("lconn.nls.en.messages.js"))
        return getClass().getResource("/net/jazz/ajax/tests/resources/messages_en.overridden.js");
      return null;
    }

    public URL getStyleSheetUrl(String styleSheet)
    {
      return null;
    }

    public URL getSimpleResourceUrl(String path)
    {
      return null;
    }

  }
}
