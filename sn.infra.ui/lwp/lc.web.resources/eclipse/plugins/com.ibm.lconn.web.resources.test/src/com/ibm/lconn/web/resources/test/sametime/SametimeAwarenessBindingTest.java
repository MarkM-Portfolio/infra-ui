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

package com.ibm.lconn.web.resources.test.sametime;

import static org.junit.Assert.*;

import java.io.StringWriter;
import java.io.Writer;
import java.util.Collections;

import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.ExtensionDependency;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.ibm.lconn.core.web.resources.internal.SametimeAwarenessBinding;
import com.ibm.lconn.core.web.resources.internal.SametimeAwarenessBinding.BindingType;

@SuppressWarnings("nls")
public class SametimeAwarenessBindingTest extends AbstractTest
{
  private final static String MODULE_ENABLER = "lconn.core.people";

  private static final String BINDING_CONNECT_ID = "lconn.profiles.sametime.sametimeAwareness";

  private static final String BINDING_CONNECT_PROVIDE = "dojo.provide(\"" + BINDING_CONNECT_ID + "\");";

  private static final Resource BINDING_CONNECT = Resource.resolve(BINDING_CONNECT_ID);

  private static final String BINDING_PROXY_ID = "lconn.profiles.sametime.sametimeProxyAwareness";

  private static final String BINDING_PROXY_PROVIDE = "dojo.provide(\"" + BINDING_PROXY_ID + "\");";

  private static final Resource BINDING_PROXY = Resource.resolve(BINDING_PROXY_ID);

  SametimeAwarenessBinding sab;

  @Before
  public final void ensureNoBinding()
  {
    for (String id : new String[] { BINDING_CONNECT_ID, BINDING_PROXY_ID })
      try
      {
        Resource.deleteBinding(new Key(DojoModule.TYPE, MODULE_ENABLER), new ExtensionDependency(DojoModule.TYPE, id));
      }
      catch (Throwable t)
      {
      }
  }

  @After
  public final void unregisterBinding()
  {
    sab.unregister();
  }

  @Test
  public final void testConstruct() throws Exception
  {
    sab = new SametimeAwarenessBinding();
    assertNotNull(sab);
  }

  @Test
  public final void testEnabled()
  {
    sab = new SametimeAwarenessBinding();

    for (boolean enabled : new boolean[] { true, false })
    {
      sab.setEnabled(enabled);
      assertEquals(enabled, sab.isEnabled());
    }
  }

  @Test
  public final void testBindingType()
  {
    sab = new SametimeAwarenessBinding();

    for (BindingType type : BindingType.values())
    {
      sab.setBindingType(type);
      assertEquals(type, sab.getBindingType());
    }
  }

  @Test
  public final void testRegisterDisabled() throws Exception
  {
    sab = new SametimeAwarenessBinding();
    sab.setEnabled(false);
    sab.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_CONNECT));
    assertFalse(g.contains(BINDING_PROXY));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_CONNECT_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_PROXY_PROVIDE));
  }

  @Test
  public final void testRegisterProxy() throws Exception
  {
    sab = new SametimeAwarenessBinding();
    sab.setEnabled(true);
    sab.setBindingType(BindingType.PROXY);
    sab.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_CONNECT));
    assertTrue(g.contains(BINDING_PROXY));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_CONNECT_PROVIDE));
    assertTrue(writer.toString().contains(BINDING_PROXY_PROVIDE));
  }

  @Test
  public final void testRegisterConnect() throws Exception
  {
    sab = new SametimeAwarenessBinding();
    sab.setEnabled(true);
    sab.setBindingType(BindingType.CONNECT);
    sab.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertTrue(g.contains(BINDING_CONNECT));
    assertFalse(g.contains(BINDING_PROXY));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertTrue(writer.toString().contains(BINDING_CONNECT_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_PROXY_PROVIDE));
  }

  @Test
  public final void testUnregisterProxy() throws Exception
  {
    sab = new SametimeAwarenessBinding();
    sab.setEnabled(true);
    sab.setBindingType(BindingType.PROXY);
    sab.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_CONNECT));
    assertTrue(g.contains(BINDING_PROXY));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_CONNECT_PROVIDE));
    assertTrue(writer.toString().contains(BINDING_PROXY_PROVIDE));

    sab.unregister();

    r = Resource.resolve(MODULE_ENABLER);
    g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_CONNECT));
    assertFalse(g.contains(BINDING_PROXY));

    writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_CONNECT_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_PROXY_PROVIDE));
  }

  @Test
  public final void testUnregisterConnect() throws Exception
  {
    sab = new SametimeAwarenessBinding();
    sab.setEnabled(true);
    sab.setBindingType(BindingType.CONNECT);
    sab.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertTrue(g.contains(BINDING_CONNECT));
    assertFalse(g.contains(BINDING_PROXY));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertTrue(writer.toString().contains(BINDING_CONNECT_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_PROXY_PROVIDE));

    sab.unregister();

    r = Resource.resolve(MODULE_ENABLER);
    g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_CONNECT));
    assertFalse(g.contains(BINDING_PROXY));

    writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_CONNECT_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_PROXY_PROVIDE));
  }
}
