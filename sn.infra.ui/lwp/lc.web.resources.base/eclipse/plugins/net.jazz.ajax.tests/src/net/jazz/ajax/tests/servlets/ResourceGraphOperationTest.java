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

package net.jazz.ajax.tests.servlets;

import static org.junit.Assert.*;

import java.util.Collections;
import java.util.List;

import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.servlets.ResourceGraphOperation;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.Test;

@SuppressWarnings("nls")
public class ResourceGraphOperationTest extends AbstractTest
{
  @Test
  public void testExecuteCSS() throws Exception
  {
    r = new StyleSheet("imports.css", getClass().getResource("/net/jazz/ajax/tests/resources/imports.css")).register();
    s = new StyleSheet("bar.css", getClass().getResource("/net/jazz/ajax/tests/resources/bar.css")).register();
    t = new StyleSheet("foo.css", getClass().getResource("/net/jazz/ajax/tests/resources/foo.css")).register();

    List<Resource> includes = Resource.resolveAll("imports.css");
    @SuppressWarnings("unchecked")
    ResourceGraphOperation operation = new ResourceGraphOperation(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    ResourceGraph graph = operation.execute();
    assertNotNull(graph);
  }

  @Test
  public void testExecuteJavaScript() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.foo.js"), "lconn.foo").register();
    s = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.bar.js"), "lconn.bar").register();

    List<Resource> includes = Resource.resolveAll("lconn.foo");
    List<Resource> excludes = Resource.resolveAll("dojo.main");
    ResourceGraphOperation operation = new ResourceGraphOperation(CONTEXT_STANDARD, includes, excludes);

    ResourceGraph graph = operation.execute();
    assertNotNull(graph);
  }

}
