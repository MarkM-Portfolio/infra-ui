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

package net.jazz.ajax.tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.WebBundle;
import net.jazz.ajax.model.RenderContext.Mode;

import org.apache.commons.io.IOUtils;
import org.junit.After;
import org.junit.BeforeClass;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Undefined;

@SuppressWarnings("nls")
public abstract class AbstractTest
{
  protected Resource r, s, t, u, v, w, x, y, z;

  protected static final RenderContext CONTEXT_STANDARD = RenderContext.forState("this doesn't matter", Locale.ENGLISH, Mode.STANDARD);

  protected static final RenderContext CONTEXT_USA_STANDARD = RenderContext.forState("it ain't important", Locale.US, Mode.STANDARD);

  protected static final RenderContext CONTEXT_DEBUG = RenderContext.forState("this doesn't matter", Locale.ENGLISH, Mode.DEBUG);

  protected static final RenderContext CONTEXT_NO_MINIFY = RenderContext.forState("this doesn't matter", Locale.ENGLISH, Mode.NO_MINIFY);

  protected static final RenderContext CONTEXT_FRENCH_NO_MINIFY = RenderContext.forState("ceci n'est pas importante", Locale.FRENCH,
      Mode.NO_MINIFY);

  protected static final RenderContext CONTEXT_IRISH = RenderContext.forState("fáilte", new Locale("ga"), Mode.STANDARD);

  protected static List<Resource> EXCLUDES;

  protected static WebBundle lconnBundle, ictestBundle;

  protected static Resource DOJO;

  protected static Resource AMD;

  @BeforeClass
  public static void registerWebBundles()
  {
    lconnBundle = registerWebBundle(lconnBundle, "lconn");
    ictestBundle = registerWebBundle(ictestBundle, "ictest");

    if (EXCLUDES == null)
    {
      AMD = new JavaScriptResource(AbstractTest.class.getResource("/net/jazz/ajax/tests/resources/amd.js"),
          "net.jazz.ajax.core.internal.amd").register();
      // FIXME: dojo/main is resolved as dojo.main
      try
      {
        DOJO = Resource.resolve("dojo.main");
      }
      catch (Throwable t)
      {
        if (DOJO == null)
          DOJO = new JavaScriptResource(AbstractTest.class.getResource("/net/jazz/ajax/tests/resources/dojo.js"), "dojo.main").register();
      }
      EXCLUDES = Collections.singletonList(DOJO);
    }
  }

  @After
  public void unregister()
  {
    for (Resource i : new Resource[] { r, s, t, u, v, w, x, y, z })
      try
      {
        i.unregister();
      }
      catch (Throwable e)
      {
        // Fine to ignore resources never register()ed
      }
  }

  protected boolean assertDeepEquals(NativeObject obj1, NativeObject obj2)
  {
    return toMap(obj1).equals(toMap(obj2));
  }

  protected Map<String, Object> toMap(NativeObject object)
  {
    Object[] ids = object.getIds();
    Map<String, Object> result = new HashMap<String, Object>(ids.length);
    for (Object id : ids)
    {
      Object prop;
      String key = id.toString();
      if (id instanceof Integer)
        prop = NativeObject.getProperty(object, (Integer) id);
      else
        prop = NativeObject.getProperty(object, key);
      if (prop instanceof String)
        result.put(key, (String) prop);
      // ADDED: Catch Undefined before other NativeObject's
      else if (prop == Undefined.instance)
        result.put(key, "<undefined>");
      // else if (prop instanceof NativeObject)
      // result.put(key, convert((NativeObject) prop));
      // else if (prop instanceof NativeArray)
      // result.put(key, convert((NativeArray)prop));
      // ADDED
      else if (prop instanceof Double)
        result.put(key, (Double) prop);
    }
    return result;
  }

  protected String toLiteralObject(String string, String preamble)
  {
    assertTrue(string.startsWith(preamble));
    StringBuffer buffer = new StringBuffer(string);
    buffer.delete(0, preamble.length()).delete(buffer.lastIndexOf(";"), buffer.length());
    if (buffer.charAt(0) == '{')
      buffer.insert(0, "(");
    if (buffer.charAt(buffer.length() - 1) == '}')
      buffer.append(")");
    return buffer.toString();
  }

  protected <T> void assertListEquals(Collection<T> list1, Collection<T> list2)
  {
    assertEquals(list1.size(), list2.size());
    for (T el : list1)
      assertTrue(list2.contains(el));

  }

  protected String toLiteralObject(StringBuffer buffer)
  {
    final String PREAMBLE = "\n;define(\"dojo/i18n!lconn/nls/messages\", ";
    assertTrue(buffer.toString().startsWith(PREAMBLE));
    return buffer.delete(0, PREAMBLE.length()).delete(buffer.lastIndexOf(";"), buffer.length()).insert(0, "(").toString();
  }

  protected static String readFile(String filename) throws IOException
  {
    InputStream is = AbstractTest.class.getResourceAsStream(filename);
    if (is == null)
      throw new IOException("Missing file: " + filename);
    return IOUtils.toString(is, "utf-8");
  }

  protected static String readFile(URL fileURL) throws IOException
  {
    InputStream is = fileURL.openStream();
    if (is == null)
      throw new IOException("Missing file: " + fileURL);
    return IOUtils.toString(is, "utf-8");
  }

  private static WebBundle registerWebBundle(WebBundle existing, String alias)
  {
    if (existing != null)
      return existing;
    // TODO: mock
    WebBundle bundle = new WebBundle(alias)
    {
      @Override
      public URL getEntry(String id, String extension)
      {
        if (id.equals("ictest/nls/bar") && extension.equals(".js") || id.equals("ictest/nls/en/bar") && extension.equals(".js"))
          return getClass().getResource("/net/jazz/ajax/tests/resources/ictest_nls_bar.js");
        if (id.equals("lconn/nls/en/messages") && extension.equals(".js") || id.equals("lconn/nls/messages") && extension.equals(".js")
            || id.equals("lconn.nls.messages") && extension.equals(".js"))
          return getClass().getResource("/net/jazz/ajax/tests/resources/messages_en.js");
        if (id.equals("lconn.nls.fr.messages") && extension.equals(".js"))
          return getClass().getResource("/net/jazz/ajax/tests/resources/messages_fr.js");
        if (id.equals("lconn.nls.en-us.messages") && extension.equals(".js"))
          return getClass().getResource("/net/jazz/ajax/tests/resources/messages_en_us.js");
        if (id.equals("lconn.nls.undefined") && extension.equals(".js"))
          return getClass().getResource("/net/jazz/ajax/tests/resources/messages_undefined.js");
        return null;
      }

      @Override
      public URL getEntry(String relPath)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource bundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource createMessageBundleResource(Type<T> type, String id)
      {
        DojoMessageBundle result = new DojoMessageBundle(this, id);
        result.register();
        return result;
      }
    };
    bundle.register();
    return bundle;
  }
}
