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

package com.ibm.lconn.core.styles.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.ibm.lconn.core.styles.OneUIVersion;

@SuppressWarnings("nls")
public class OneUIVersionTest extends AbstractTest
{
  @Test
  public final void testToString()
  {
    assertEquals("oneui2", OneUIVersion.oneui2.toString());
    assertEquals("oneui3", OneUIVersion.oneui3.toString());
  }

  @Test
  public final void testFromString()
  {
    // The regular cases
    assertEquals(OneUIVersion.oneui2, OneUIVersion.fromString("oneui2"));
    assertEquals(OneUIVersion.oneui3, OneUIVersion.fromString("oneui3"));

    // Now the odd cases
    assertEquals(OneUIVersion.oneui3, OneUIVersion.fromString(null));
    assertEquals(OneUIVersion.oneui3, OneUIVersion.fromString(""));
    assertEquals(OneUIVersion.oneui3, OneUIVersion.fromString("foo"));
  }

}
