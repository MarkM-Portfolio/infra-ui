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

import net.jazz.ajax.model.Provider;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.model.Resource.Type;
import net.jazz.ajax.model.ResourceProvider;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.Test;
import static org.junit.Assert.*;

@SuppressWarnings({ "rawtypes", "nls" })
public class ResourceProviderTest extends AbstractTest
{
  boolean provided = false;

  final static Type FOO_TYPE = Type.create("foo");

  final static String RESOURCE_ID = "foo.provided";

  @Test
  public void testProvide()
  {
    // 1. instantiate a provider of a resource provider
    Provider<ResourceProvider> provider = new Provider<ResourceProvider>()
    {
      public ResourceProvider get()
      {
        ResourceProvider p = new ResourceProvider()
        {
          @Override
          public Resource provide(String id)
          {
            provided = true;
            return new Resource(FOO_TYPE, RESOURCE_ID);
          }
        };
        return p;

      }
    };
    // 2. register the provider with the framework for its resource id
    Resource.registerProvider(provider, new Key(FOO_TYPE, RESOURCE_ID));
    // 3. resolve the provider's resource id
    r = Resource.resolve(FOO_TYPE, RESOURCE_ID);
    // 4. verify the resource is not null
    assertNotNull(r);
    // 5. verify the resource was provided
    assertTrue(provided);

    // 6. reset the flag and resolve again
    provided = false;
    s = Resource.resolve(FOO_TYPE, RESOURCE_ID);
    assertNotNull(s);
    // 7. verify the resource was not provided again
    assertFalse(provided);
  }
}
