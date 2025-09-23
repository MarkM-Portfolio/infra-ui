/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles.test.extensions;

import static org.junit.Assert.*;

import java.io.StringWriter;
import java.io.Writer;
import java.util.Collections;
import java.util.List;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.servlets.ResourceGraph;

import org.junit.Test;

import com.ibm.lconn.core.styles.test.AbstractTest;

@SuppressWarnings("nls")
public class CSSBindingTest extends AbstractTest
{
  @Test
  public final void testBindingWithoutCSSExtension() throws Exception
  {
    List<Resource> includes = Resource.resolveAll("com.ibm.lconn.core.styles.oneui3/base/package3.css");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    Writer writer = new StringWriter();
    g.writeCSS(writer, CONTEXT_STANDARD);
    assertTrue(writer.toString().contains(".customRule"));
  }

  @Test
  public final void testBindingWithCSSExtension() throws Exception
  {
    List<Resource> includes = Resource.resolveAll("com.ibm.lconn.core.styles/base/connectionsCore.css");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, Collections.EMPTY_LIST);

    Writer writer = new StringWriter();
    g.writeCSS(writer, CONTEXT_STANDARD);
    assertTrue(writer.toString().contains(".otherRule"));
    assertTrue(writer.toString().contains("#otherRule2"));
  }
}
