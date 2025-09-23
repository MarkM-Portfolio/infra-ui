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

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.After;
import org.junit.Test;

import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.JavaScriptModule;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceOptimization;
import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class ResourceOptimizationTest extends AbstractTest
{

  @After
  public void resetLayers()
  {
    ResourceOptimization.resetLayers();
  }

  @Test
  public void testAddSuggestedLayers() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    t = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    Map<String, String> map = new HashMap<String, String>();
    map.put("lconn.foo", "lconn.bar");

    ResourceOptimization.addSuggestedLayers(map);

    List<Resource> list = new ArrayList<Resource>();
    list.add(r);
    assertTrue(ResourceOptimization.suggestLayers(list).contains(t));

    list = new ArrayList<Resource>();
    list.add(t);
    assertFalse(ResourceOptimization.suggestLayers(list).contains(r));

    list = new ArrayList<Resource>();
    list.add(t);
    // FIXME: a layer should return itself
    assertFalse(ResourceOptimization.suggestLayers(list).contains(t));
  }

  @Test
  public void testAddSuggestedLayersAMD() throws Exception
  {
    r = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnfoo.js"), "lconn/foo").register();
    t = new JavaScriptModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconnbar.js"), "lconn/bar").register();

    Map<String, String> map = new HashMap<String, String>();
    map.put("lconn/foo", "lconn/bar");

    ResourceOptimization.addSuggestedLayers(map);

    List<Resource> list = new ArrayList<Resource>();
    list.add(r);
    assertTrue(ResourceOptimization.suggestLayers(list).contains(t));

    list = new ArrayList<Resource>();
    list.add(t);
    assertFalse(ResourceOptimization.suggestLayers(list).contains(r));

    list = new ArrayList<Resource>();
    list.add(t);
    // FIXME: a layer should return itself
    assertFalse(ResourceOptimization.suggestLayers(list).contains(t));
  }
}
