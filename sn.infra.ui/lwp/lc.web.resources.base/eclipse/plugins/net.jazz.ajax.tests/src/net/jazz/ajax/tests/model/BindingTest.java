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

import java.util.Collections;

import org.junit.After;
import org.junit.Test;

import static org.junit.Assert.*;

import net.jazz.ajax.model.Binding;
import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.ExtensionDependency;
import net.jazz.ajax.model.JavaScriptModule;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class BindingTest extends AbstractTest
{
  Binding b, c;

  Dependency d, e;

  @After
  public void unbind()
  {
    for (Binding k : new Binding[] { b, c })
      try
      {
        k.unbind();
      }
      catch (Throwable q)
      {
      }
  }

  @Test
  public void testBinding() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    d = new ExtensionDependency(DojoModule.TYPE, r.getId());
    b = new Binding(new Key(DojoModule.TYPE, s.getId()), d);
    Resource.createBinding(b.key, b.dependency);

    assertTrue(s.getDependencies().contains(d));
    // assertTrue(u.getDependencies().get(0).resolve().equals(t));

    ResourceGraph graph = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(s), EXCLUDES);
    assertTrue(graph.contains(r));
  }

  @Test
  public void testBindingAMD() throws Exception
  {
    t = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnfoo.js"), "lconn/foo").register();
    u = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnbar.js"), "lconn/bar").register();

    e = new ExtensionDependency(JavaScriptModule.TYPE, t.getId());
    c = new Binding(new Key(JavaScriptModule.TYPE, u.getId()), e);
    Resource.createBinding(c.key, c.dependency);

    assertTrue(u.getDependencies().contains(e));
    // assertTrue(u.getDependencies().get(0).resolve().equals(t));

    ResourceGraph graph = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(u), EXCLUDES);
    assertTrue(graph.contains(t));
  }
}
