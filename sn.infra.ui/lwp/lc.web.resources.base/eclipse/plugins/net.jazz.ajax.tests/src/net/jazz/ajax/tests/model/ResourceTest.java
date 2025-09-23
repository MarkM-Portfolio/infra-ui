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

import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.JavaScriptModule;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.State;
import net.jazz.ajax.model.Resource.Type;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.tests.AbstractTest;

import static org.junit.Assert.*;
import org.junit.Test;

import com.ibm.lconn.core.config.VersionStamp;

@SuppressWarnings("nls")
public class ResourceTest extends AbstractTest
{
  @Test
  public void testConstruct() throws Exception
  {
    Type<Resource> blip = Type.create("blip");
    Resource r = new Resource(blip, "baz");
    assertNotNull(r);
  }

  // @Test
  // FIXME: .resolve() requires tiny IDs if not resolving a resource of type JavaScriptResource.TYPE
  public void testResolve() throws Exception
  {
    Type<Resource> bar = Type.create("bar");
    // FIXME: need a . or a / to avoid hitting tiny IDs
    Resource r = new Resource(bar, "foo.bar");
    r.register();
    Resource s = Resource.resolve("foo.bar");
    assertEquals(r, s);
  }

  @Test
  public void testResolveDojoModule() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = Resource.resolve("lconn.foo");
    assertEquals(r, s);
  }

  @Test
  public void testResolveJavaScriptModule() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnfoo.js"), "lconn/foo").register();
    s = Resource.resolve("lconn/foo");
    assertEquals(r, s);
  }

  @Test
  public void testNoJSExtension() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    boolean thrown = false;
    try
    {
      s = Resource.resolve("lconn.foo.js");
    }
    catch (Throwable t)
    {
      thrown = true;
    }
    assertTrue(thrown);
  }

  @Test
  public void testResolveStyleSheet() throws Exception
  {
    r = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css")).register();
    s = Resource.resolve("bar.css");
    assertEquals(r, s);
  }

  @Test
  public void testStateGetEtag() throws Exception
  {
    State s1 = new State();
    assertEquals(VersionStamp.getInstance().toString(), s1.getETag());
  }
}
