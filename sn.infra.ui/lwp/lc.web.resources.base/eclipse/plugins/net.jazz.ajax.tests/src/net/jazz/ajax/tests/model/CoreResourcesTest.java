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

import net.jazz.ajax.model.CoreResources;
import net.jazz.ajax.model.JavaScriptModule;
import net.jazz.ajax.model.Provider;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.model.ResourceProvider;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.Test;
import static org.junit.Assert.*;

@SuppressWarnings("nls")
public class CoreResourcesTest extends AbstractTest
{

  boolean provided = false;

  final static String RESOURCE_ID = "dojo.fx";

  @Test
  public void testProvide()
  {
    // 0. make sure the resource is not registered already
    r = Resource.resolve(JavaScriptModule.TYPE, RESOURCE_ID);
    if (r != null)
      r.unregister();
    // 1. instantiate a provider of a resource provider
    Provider<ResourceProvider> provider = new Provider<ResourceProvider>()
    {
      public ResourceProvider get()
      {
        return new CoreResourcesInstrumented();
      }
    };
    // 2. register the provider with the framework for its resource id
    Resource.registerProvider(provider, new Key(JavaScriptModule.TYPE, RESOURCE_ID));
    // 3. resolve the provider's resource id
    r = Resource.resolve(JavaScriptModule.TYPE, RESOURCE_ID);
    // 4. verify the resource is not null
    assertNotNull(r);
    // 5. verify the resource was provided
    assertTrue(provided);

    // 6. reset the flag and resolve again
    provided = false;
    s = Resource.resolve(JavaScriptModule.TYPE, RESOURCE_ID);
    assertNotNull(s);
    // 7. verify the resource was not provided again
    assertFalse(provided);
  }

  class CoreResourcesInstrumented extends CoreResources
  {
    public Resource provide(String id)
    {
      provided = true;
      return super.provide(id);
    }
  }
}
