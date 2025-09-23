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

import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundleDependency;

import org.junit.Test;

import com.ibm.lconn.core.styles.model.VirtualStyleSheetResource;
import com.ibm.lconn.core.styles.test.AbstractTest;

@SuppressWarnings("nls")
public class VirtualStyleSheetResourceTest extends AbstractTest
{
  @Test
  public final void testConstruct()
  {
    r = new VirtualStyleSheetResource("foo.bar");
    assertNotNull(r);
  }

  @Test
  public final void testResolve()
  {
    r = new VirtualStyleSheetResource("foo.bar").register();

    s = new WebBundleDependency(StyleSheet.TYPE, "foo.bar").resolve();
    assertEquals(r, s);
  }
}
