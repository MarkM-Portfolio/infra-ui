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

import static org.junit.Assert.*;

import net.jazz.ajax.internal.AjaxFramework;

import org.junit.Before;
import org.junit.Test;

import static net.jazz.ajax.internal.util.CacheConfiguration.*;

public class CacheConfigurationTest
{
  private static final Integer ONE_MONTH = 3600 * 24 * 30;

  @Before
  public final void resetSettings()
  {
    resetFactorySettings();
  }

  @Test
  public final void testResetFactorySettings()
  {
    setAggregateResourceFreshness(-1);
    setAggregateResourceClientCache(-1);
    setFileFreshness(-1);
    setFileClientCache(-1);
    setImmutableFileClientCache(-1);
    setImmutableFileFreshness(-1);
    setAggregateResourceWithETagFreshness(-1);
    setAggregateResourceWithETagClientCache(-1);
    setDirectResourceWithETagFreshness(-1);
    setDirectResourceWithETagClientCache(-1);
    setDirectResourceFreshness(-1);
    setDirectResourceClientCache(-1);

    resetFactorySettings();

    assertEquals(3, getAggregateResourceFreshness());
    assertEquals(0, getAggregateResourceClientCache());
    assertEquals(2, getFileFreshness());
    assertEquals(0, getFileClientCache());
    assertEquals(2, getImmutableFileFreshness());
    assertEquals(3600, getImmutableFileClientCache());
    assertEquals(0, getAggregateResourceWithETagFreshness());
    assertEquals((int) ONE_MONTH, getAggregateResourceWithETagClientCache());
    assertEquals(0, getDirectResourceWithETagFreshness());
    assertEquals((int) ONE_MONTH, getDirectResourceWithETagClientCache());
    assertEquals(0, getDirectResourceFreshness());
    assertEquals(AjaxFramework.DEV_MODE ? 20 : 600, getDirectResourceClientCache());
  }

  @Test
  public final void testAggregateResourceFreshness()
  {
    setAggregateResourceFreshness(2);
    assertEquals(2, getAggregateResourceFreshness());
    setAggregateResourceFreshness(-1);
    assertEquals(-1, getAggregateResourceFreshness());
  }

  @Test
  public final void testAggregateResourceClientCache()
  {
    setAggregateResourceClientCache(2);
    assertEquals(2, getAggregateResourceClientCache());
    setAggregateResourceClientCache(-1);
    assertEquals(-1, getAggregateResourceClientCache());
  }

  @Test
  public final void testImmutableFileFreshness()
  {
    setImmutableFileFreshness(2);
    assertEquals(2, getImmutableFileFreshness());
    setImmutableFileFreshness(-1);
    assertEquals(-1, getImmutableFileFreshness());
  }

  @Test
  public final void testImmutableFileClientCache()
  {
    setImmutableFileClientCache(2);
    assertEquals(2, getImmutableFileClientCache());
    setImmutableFileClientCache(-1);
    assertEquals(-1, getImmutableFileClientCache());
  }

  @Test
  public final void testFileFreshness()
  {
    setFileFreshness(2);
    assertEquals(2, getFileFreshness());
    setFileFreshness(-1);
    assertEquals(-1, getFileFreshness());
  }

  @Test
  public final void testFileClientCache()
  {
    setFileClientCache(2);
    assertEquals(2, getFileClientCache());
    setFileClientCache(-1);
    assertEquals(-1, getFileClientCache());
  }

  @Test
  public final void testAggregateResourceWithETagFreshness()
  {
    setAggregateResourceWithETagFreshness(2);
    assertEquals(2, getAggregateResourceWithETagFreshness());
    setAggregateResourceWithETagFreshness(-1);
    assertEquals(-1, getAggregateResourceWithETagFreshness());
  }

  @Test
  public final void testAggregateResourceWithETagClientCache()
  {
    setAggregateResourceWithETagClientCache(2);
    assertEquals(2, getAggregateResourceWithETagClientCache());
    setAggregateResourceWithETagClientCache(-1);
    assertEquals(-1, getAggregateResourceWithETagClientCache());
  }

  @Test
  public final void testDirectResourceWithETagFreshness()
  {
    setDirectResourceWithETagFreshness(2);
    assertEquals(2, getDirectResourceWithETagFreshness());
    setDirectResourceWithETagFreshness(-1);
    assertEquals(-1, getDirectResourceWithETagFreshness());
  }

  @Test
  public final void testDirectResourceWithETagClientCache()
  {
    setDirectResourceWithETagClientCache(2);
    assertEquals(2, getDirectResourceWithETagClientCache());
    setDirectResourceWithETagClientCache(-1);
    assertEquals(-1, getDirectResourceWithETagClientCache());
  }

  @Test
  public final void testDirectResourceFreshness()
  {
    setDirectResourceFreshness(2);
    assertEquals(2, getDirectResourceFreshness());
    setDirectResourceFreshness(-1);
    assertEquals(-1, getDirectResourceFreshness());
  }

  @Test
  public final void testDirectResourceClientCache()
  {
    setDirectResourceClientCache(2);
    assertEquals(2, getDirectResourceClientCache());
    setDirectResourceClientCache(-1);
    assertEquals(-1, getDirectResourceClientCache());
  }

  @Test
  /**
   * @see net.jazz.ajax.tests.internal.util.CacheTest
   */
  public final void testSetCacheCapacity()
  {
  }

}
