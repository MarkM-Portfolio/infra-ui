/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.internal;

import static org.junit.Assert.*;

import java.net.URL;

import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.model.ResourceOverrideService;
import net.jazz.ajax.tests.AbstractTest;

import org.osgi.framework.ServiceRegistration;

import org.junit.Test;

@SuppressWarnings("nls")
public class ResourceOverrideTest extends AbstractTest
{
  static final String ANYTHING = "anything";

  static final URL URL1;
  static
  {
    URL url = null;
    try
    {
      url = new URL("http://localhost");
    }
    catch (Throwable t)
    {
    }
    finally
    {
      URL1 = url;
    }
  }

  @Test
  public final void testGetService()
  {
    ResourceOverrideService service = ResourceOverride.getService();
    assertNotNull(service);
    assertNull(service.getDojoModuleUrl(ANYTHING));
    assertNull(service.getMessageBundleUrl(ANYTHING));
    assertNull(service.getSimpleResourceUrl(ANYTHING));
    assertNull(service.getStyleSheetUrl(ANYTHING));
  }

  @Test
  public final void testRegisterService()
  {
    ServiceRegistration registration = Activator.context.registerService(ResourceOverrideService.class.getName(),
        new TestResourceOverrideService(), null);

    ResourceOverrideService service = ResourceOverride.getService();
    assertNotNull(service);
    assertEquals(URL1, service.getDojoModuleUrl(ANYTHING));
    assertEquals(URL1, service.getMessageBundleUrl(ANYTHING));
    assertEquals(URL1, service.getSimpleResourceUrl(ANYTHING));
    assertEquals(URL1, service.getStyleSheetUrl(ANYTHING));

    registration.unregister();
  }

  @Test
  public final void testUnregisterService() throws Exception
  {
    ServiceRegistration registration = Activator.context.registerService(ResourceOverrideService.class.getName(),
        new TestResourceOverrideService(), null);

    registration.unregister();

    ResourceOverrideService service = ResourceOverride.getService();
    assertNotNull(service);
    assertNull(service.getDojoModuleUrl(ANYTHING));
    assertNull(service.getMessageBundleUrl(ANYTHING));
    assertNull(service.getSimpleResourceUrl(ANYTHING));
    assertNull(service.getStyleSheetUrl(ANYTHING));
  }

  class TestResourceOverrideService implements ResourceOverrideService
  {
    public URL getDojoModuleUrl(String id)
    {
      return URL1;
    }

    public URL getMessageBundleUrl(String bundleName)
    {
      return URL1;
    }

    public URL getStyleSheetUrl(String styleSheet)
    {
      return URL1;
    }

    public URL getSimpleResourceUrl(String path)
    {
      return URL1;
    }

  }
}
