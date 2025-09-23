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

package com.ibm.lconn.web.resources.test.personcard;

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

import com.ibm.lconn.personcard.web.resources.internal.CardImplementationBinding;
import com.ibm.lconn.personcard.web.resources.internal.CardImplementationBinding.BindingType;

@SuppressWarnings("nls")
public class CardImplementationBindingTest extends AbstractTest
{

  private final static String MODULE_ENABLER = "lconn.core.people";

  private static final String BINDING_LEGACY_ID = "com.ibm.lconn.personcard.legacy";

  private static final String BINDING_LEGACY_PROVIDE = "dojo.provide(\"" + BINDING_LEGACY_ID + "\");";

  private static final Resource BINDING_LEGACY = Resource.resolve(BINDING_LEGACY_ID);

  private static final String BINDING_STANDARD_ID = "com.ibm.lconn.personcard.standard";

  private static final String BINDING_STANDARD_PROVIDE = "dojo.provide(\"" + BINDING_STANDARD_ID + "\");";

  private static final Resource BINDING_STANDARD = Resource.resolve(BINDING_STANDARD_ID);

  CardImplementationBinding cib;

  @Before
  public final void ensureNoBinding()
  {
    try
    {
      Resource.deleteBinding(new Key(DojoModule.TYPE, MODULE_ENABLER), new ExtensionDependency(DojoModule.TYPE, BINDING_LEGACY_ID));
      Resource.deleteBinding(new Key(DojoModule.TYPE, MODULE_ENABLER), new ExtensionDependency(DojoModule.TYPE, BINDING_STANDARD_ID));
    }
    catch (Throwable t)
    {
    }
  }

  @After
  public final void unregisterBinding()
  {
    cib.unregister();
  }

  @Test
  public final void testConstruct() throws Exception
  {
    cib = new CardImplementationBinding();
    assertNotNull(cib);
  }

  @Test
  public final void testEnabled()
  {
    cib = new CardImplementationBinding();

    for (boolean enabled : new boolean[] { true, false })
    {
      cib.setEnabled(enabled);
      assertEquals(enabled, cib.isEnabled());
    }
  }

  @Test
  public final void testBindingType()
  {
    cib = new CardImplementationBinding();

    for (BindingType type : BindingType.values())
    {
      cib.setBindingType(type);
      assertEquals(type, cib.getBindingType());
    }
  }

  @Test
  public final void testRegisterDisabled() throws Exception
  {
    cib = new CardImplementationBinding();
    cib.setEnabled(false);
    cib.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_LEGACY));
    assertFalse(g.contains(BINDING_STANDARD));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_LEGACY_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_STANDARD_PROVIDE));
  }

  @Test
  public final void testRegisterStandard() throws Exception
  {
    cib = new CardImplementationBinding();
    cib.setEnabled(true);
    cib.setBindingType(BindingType.STANDARD);
    cib.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_LEGACY));
    assertTrue(g.contains(BINDING_STANDARD));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_LEGACY_PROVIDE));
    assertTrue(writer.toString().contains(BINDING_STANDARD_PROVIDE));
  }

  @Test
  public final void testRegisterLegacy() throws Exception
  {
    cib = new CardImplementationBinding();
    cib.setEnabled(true);
    cib.setBindingType(BindingType.LEGACY);
    cib.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertTrue(g.contains(BINDING_LEGACY));
    assertFalse(g.contains(BINDING_STANDARD));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertTrue(writer.toString().contains(BINDING_LEGACY_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_STANDARD_PROVIDE));
  }

  @Test
  public final void testUnregisterStandard() throws Exception
  {
    cib = new CardImplementationBinding();
    cib.setEnabled(true);
    cib.setBindingType(BindingType.STANDARD);
    cib.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_LEGACY));
    assertTrue(g.contains(BINDING_STANDARD));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_LEGACY_PROVIDE));
    assertTrue(writer.toString().contains(BINDING_STANDARD_PROVIDE));

    cib.unregister();

    r = Resource.resolve(MODULE_ENABLER);
    g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_LEGACY));
    assertFalse(g.contains(BINDING_STANDARD));

    writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_LEGACY_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_STANDARD_PROVIDE));
  }

  @Test
  public final void testUnregisterLegacy() throws Exception
  {
    cib = new CardImplementationBinding();
    cib.setEnabled(true);
    cib.setBindingType(BindingType.LEGACY);
    cib.register();

    r = Resource.resolve(MODULE_ENABLER);
    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertTrue(g.contains(BINDING_LEGACY));
    assertFalse(g.contains(BINDING_STANDARD));

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertTrue(writer.toString().contains(BINDING_LEGACY_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_STANDARD_PROVIDE));

    cib.unregister();

    r = Resource.resolve(MODULE_ENABLER);
    g = new ResourceGraph(CONTEXT_STANDARD, Collections.singletonList(r), Collections.EMPTY_LIST);

    assertTrue(g.contains(r));
    assertFalse(g.contains(BINDING_LEGACY));
    assertFalse(g.contains(BINDING_STANDARD));

    writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    assertTrue(writer.toString().contains(MODULE_ENABLER));
    assertFalse(writer.toString().contains(BINDING_LEGACY_PROVIDE));
    assertFalse(writer.toString().contains(BINDING_STANDARD_PROVIDE));
  }
}
