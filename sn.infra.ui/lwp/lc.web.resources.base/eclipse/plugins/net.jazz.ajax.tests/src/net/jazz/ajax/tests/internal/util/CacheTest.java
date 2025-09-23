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

package net.jazz.ajax.tests.internal.util;

import net.jazz.ajax.internal.util.Cache;

import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

public class CacheTest
{
  @Before
  @After
  public void resetCache() throws Exception
  {
    Cache.resizeCapacity(256);
  }

  @Test
  public void testResize() throws Exception
  {
    // Resizing should not affect the size of key-value mappings
    int size = Cache.getSize();
    Cache.resizeCapacity(128);
    assertEquals(size, Cache.getSize());
    Cache.resizeCapacity(1024);
    assertEquals(size, Cache.getSize());
  }
}
