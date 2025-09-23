/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.model;

import static org.junit.Assert.*;

import java.net.URL;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.WebBundle;
import net.jazz.ajax.tests.AbstractTest;

public class WebBundleTest extends AbstractTest
{

  private static final String BUNDLE_ID_WITH_DOTS = "dot.dot.dot";

  private static final String BUNDLE_ID_WITH_SLASHES = "slash/slash/slash";

  private static final String BUNDLE_ID_WITH_DOTS_AND_SLASHES = "dot.dot.dot/slash/slash";

  private static final String BUNDLE_ID_WITHOUT_DOTS_OR_SLASHES = "no-dots-or-slashes";

  private static final String PATH = "/path/to/resource";

  private Resource bundleWithDots, bundleWithSlashes, bundleWithDotsAndSlashes, bundleWithoutDotsOrSlashes;

  @Before
  public final void registerBundle()
  {
    bundleWithDots = new WebBundle(BUNDLE_ID_WITH_DOTS)
    {

      @Override
      public URL getEntry(String id, String extension)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public URL getEntry(String relPath)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource createMessageBundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource bundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }
    }.register();

    bundleWithSlashes = new WebBundle(BUNDLE_ID_WITH_SLASHES)
    {

      @Override
      public URL getEntry(String id, String extension)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public URL getEntry(String relPath)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource createMessageBundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource bundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }
    }.register();

    bundleWithDotsAndSlashes = new WebBundle(BUNDLE_ID_WITH_DOTS_AND_SLASHES)
    {

      @Override
      public URL getEntry(String id, String extension)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public URL getEntry(String relPath)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource createMessageBundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource bundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }
    }.register();

    bundleWithoutDotsOrSlashes = new WebBundle(BUNDLE_ID_WITHOUT_DOTS_OR_SLASHES)
    {

      @Override
      public URL getEntry(String id, String extension)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public URL getEntry(String relPath)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource createMessageBundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }

      @Override
      public <T extends Resource> Resource bundleResource(Type<T> type, String id)
      {
        // TODO Auto-generated method stub
        return null;
      }
    }.register();
  }

  @After
  public final void unregisterBundle()
  {
    bundleWithDots.unregister();
    bundleWithSlashes.unregister();
    bundleWithDotsAndSlashes.unregister();
    bundleWithoutDotsOrSlashes.unregister();
  }

  @Test
  public void testBundleMatching()
  {
    // Verify all sorts of bundle ids can be resolved successfully
    assertEquals(bundleWithDots, WebBundle.bundleMatching(BUNDLE_ID_WITH_DOTS.concat(PATH)));
    assertNotSame(bundleWithSlashes, WebBundle.bundleMatching(BUNDLE_ID_WITH_SLASHES.concat(PATH)));
    assertNotSame(bundleWithDotsAndSlashes, WebBundle.bundleMatching(BUNDLE_ID_WITH_DOTS_AND_SLASHES.concat(PATH)));
    assertEquals(bundleWithoutDotsOrSlashes, WebBundle.bundleMatching(BUNDLE_ID_WITHOUT_DOTS_OR_SLASHES.concat(PATH)));
  }

}
