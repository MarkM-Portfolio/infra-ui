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

import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Type;

import static org.junit.Assert.*;

import org.junit.Test;

@SuppressWarnings("nls")
public class DependencyTest
{
  @Test
  public void testConstruct() throws Exception
  {
    Dependency d = new Dependency(Type.create("dep1"), "dep1")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertNotNull(d);
  }

  @Test
  public void testGetId() throws Exception
  {
    Dependency d = new Dependency(Type.create("dep2"), "dep2")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertEquals("dep2", d.getId());
  }

  @Test
  public void testResolve() throws Exception
  {
    Dependency d = new Dependency(Type.create("dep3"), "dep3")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertNull(d.resolve());
  }

  @Test
  public void testIsDerived() throws Exception
  {
    Dependency d = new Dependency(Type.create("dep4"), "dep4")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertFalse(d.isDerived());
  }

  @Test
  public void testIsInverted() throws Exception
  {
    Dependency d = new Dependency(Type.create("dep5"), "dep5")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertFalse(d.isInverted());
  }

  @Test
  public void testToString() throws Exception
  {
    Dependency d = new Dependency(Type.create("dep6"), "dep6")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertEquals("dep6.dep6", d.toString());
  }

  @Test
  public void testEquals() throws Exception
  {
    Dependency d = new Dependency(Type.create("dep7"), "dep7")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    Type type8 = Type.create("dep8");
    Dependency e = new Dependency(type8, "dep8")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    Dependency f = new Dependency(type8, "dep8")
    {
      @Override
      public <T extends Resource> T resolve()
      {
        // TODO Auto-generated method stub
        return null;
      }
    };
    assertNotSame(d, e);
    assertNotSame(d, f);
    assertEquals(e, f);
  }
}
