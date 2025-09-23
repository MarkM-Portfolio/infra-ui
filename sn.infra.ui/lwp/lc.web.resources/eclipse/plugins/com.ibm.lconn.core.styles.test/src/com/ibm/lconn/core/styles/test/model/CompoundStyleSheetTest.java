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

package com.ibm.lconn.core.styles.test.model;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Type;

import org.junit.Before;
import org.junit.Test;

import com.ibm.lconn.core.styles.model.CompoundStyleSheet;
import com.ibm.lconn.core.styles.test.AbstractTest;

@SuppressWarnings("nls")
public class CompoundStyleSheetTest extends AbstractTest
{
  private static List<Resource> THREE_RESOURCES;

  private static List<Resource> NO_RESOURCES;

  private static List<Resource> TWO_RESOURCES;

  private static final String CLASS_NAME = CompoundStyleSheetTest.class.getName();

  @Before
  public void registerResources()
  {
    Resource.Type type = Type.forName(CLASS_NAME);
    if (type == null)
      type = Type.create(CLASS_NAME);

    THREE_RESOURCES = new ArrayList<Resource>(3);
    THREE_RESOURCES.add(r = new Resource(type, "one"));
    THREE_RESOURCES.add(s = new Resource(type, "two"));
    THREE_RESOURCES.add(t = new Resource(type, "three"));

    TWO_RESOURCES = new ArrayList<Resource>(2);
    TWO_RESOURCES.add(u = new Resource(type, "four"));
    TWO_RESOURCES.add(v = new Resource(type, "five"));

    NO_RESOURCES = new ArrayList<Resource>();
  }

  @Test
  public final void testHasResources()
  {
    CompoundStyleSheet css;

    css = getInstance(THREE_RESOURCES);
    assertTrue(css.hasResources());

    css = getInstance(TWO_RESOURCES);
    assertTrue(css.hasResources());

    css = getInstance(NO_RESOURCES);
    assertFalse(css.hasResources());
  }

  @Test
  public final void testGetResources()
  {
    CompoundStyleSheet css;

    css = getInstance(THREE_RESOURCES);
    assertEquals(THREE_RESOURCES, css.getResources());

    css = getInstance(TWO_RESOURCES);
    assertEquals(TWO_RESOURCES, css.getResources());

    css = getInstance(NO_RESOURCES);
    assertEquals(NO_RESOURCES, css.getResources());
  }

  private CompoundStyleSheet getInstance(List<Resource> resources)
  {
    return new TestCompoundStyleSheet(resources);
  }

  class TestCompoundStyleSheet extends CompoundStyleSheet
  {
    public TestCompoundStyleSheet(List<Resource> resources)
    {
      this.resources = resources;
    }
  };
}
