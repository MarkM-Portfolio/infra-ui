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

package net.jazz.ajax.tests.model;

import static org.junit.Assert.*;

import java.io.File;
import java.net.URL;

import net.jazz.ajax.model.BundleResourceStreamHandler;
import net.jazz.ajax.model.OSGiWebBundle;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Type;
import net.jazz.ajax.tests.AbstractTest;
import net.jazz.ajax.tests.mocks.TestBundle;

import org.junit.Test;
import org.osgi.framework.Bundle;

@SuppressWarnings("nls")
public class OSGiWebBundleTest extends AbstractTest
{
  final static String ALIAS_WITH_DOT = "alias.with.dot";

  final static String ALIAS_WITH_SLASH = "alias/with/slash";

  private static final String PATH_TO_RESOURCES = "/path/to/resources";

  final static String RESOURCE_TXT = "resource.txt";

  final static String RESOURCE = "resource";

  final static String TXT = "txt";

  final static String DOT_TXT = "." + TXT;

  final static String BASE = "com.example.foo/";

  final static Bundle BUNDLE = new TestBundle(PATH_TO_RESOURCES, RESOURCE_TXT);

  private static final String PORTABLE_BUNDLE_RESOURCE = "portablebundleresource";

  @Test
  public final void testRegister()
  {
    r = new OSGiWebBundle(BUNDLE, ALIAS_WITH_DOT, PATH_TO_RESOURCES).register();
    s = Resource.resolve(OSGiWebBundle.TYPE, ALIAS_WITH_DOT);
    assertEquals(s, r);
  }

  @Test
  public final void testUnregister()
  {
    r = new OSGiWebBundle(BUNDLE, ALIAS_WITH_DOT, PATH_TO_RESOURCES).register();
    s = Resource.resolve(OSGiWebBundle.TYPE, ALIAS_WITH_DOT);
    assertEquals(s, r);

    r.unregister();
    t = Resource.resolve(OSGiWebBundle.TYPE, ALIAS_WITH_DOT);
    assertNull(t);
  }

  @Test
  public final void testGetEntryString() throws Exception
  {
    r = new OSGiWebBundle(BUNDLE, ALIAS_WITH_DOT, PATH_TO_RESOURCES).register();
    URL actual = ((OSGiWebBundle) r).getEntry("/" + RESOURCE_TXT);
    URL expected = new URL(PORTABLE_BUNDLE_RESOURCE, BUNDLE.getSymbolicName(), -1, PATH_TO_RESOURCES + File.separator + RESOURCE_TXT,
        new BundleResourceStreamHandler());
    assertEquals(expected, actual);
  }

  @Test
  public final void testGetEntryStringString() throws Exception
  {
    r = new OSGiWebBundle(BUNDLE, ALIAS_WITH_DOT, PATH_TO_RESOURCES).register();
    URL actual = ((OSGiWebBundle) r).getEntry(ALIAS_WITH_DOT + File.separator + RESOURCE, DOT_TXT);
    URL expected = new URL(PORTABLE_BUNDLE_RESOURCE, BUNDLE.getSymbolicName(), -1, PATH_TO_RESOURCES + File.separator + RESOURCE_TXT,
        new BundleResourceStreamHandler());
    assertEquals(expected, actual);
  }

  @Test
  public final void testBundleResource()
  {
    r = new OSGiWebBundle(BUNDLE, ALIAS_WITH_DOT, PATH_TO_RESOURCES).register();

    // Resources of type text can't be created
    s = ((OSGiWebBundle) r).bundleResource(Type.create(TXT), ALIAS_WITH_DOT + File.separator + RESOURCE);
    assertNull(s);

    // Resources must start with bundle symbolic name or alias
    boolean thrown = false;
    try
    {
      t = ((OSGiWebBundle) r).bundleResource(Type.create(TXT), "foo.bar" + File.separator + RESOURCE);
    }
    catch (Throwable t)
    {
      thrown = true;
    }
    assertTrue(thrown);
  }

  @Test
  public final void testGetAlias()
  {
    r = new OSGiWebBundle(BUNDLE, ALIAS_WITH_DOT, PATH_TO_RESOURCES);
    assertEquals(ALIAS_WITH_DOT, ((OSGiWebBundle) r).getAlias());

    s = new OSGiWebBundle(BUNDLE, ALIAS_WITH_SLASH, PATH_TO_RESOURCES);
    assertEquals(ALIAS_WITH_SLASH, ((OSGiWebBundle) s).getAlias());
  }

}
