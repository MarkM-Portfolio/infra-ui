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

package net.jazz.ajax.tests.internal.util;

import static org.junit.Assert.*;
import net.jazz.ajax.tests.internal.Activator;
import net.jazz.ajax.internal.util.OSGiServices;
import net.jazz.ajax.internal.util.OSGiServices.Runner;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.osgi.framework.ServiceRegistration;

public class OSGiServicesTest
{
  ServiceRegistration registration = null;

  static boolean called = false;

  static boolean replaced = false;

  @Before
  public void reset()
  {
    called = false;
    replaced = false;
  }

  @After
  public void unregister()
  {
    if (registration != null)
    {
      try
      {
        registration.unregister();
      }
      catch (Throwable t)
      {
      }
      registration = null;
    }
  }

  @Test
  public void testRunWithServiceQueued() throws Exception
  {
    // 1. instantiate service listener
    final MockServiceListener serviceListener = new MockServiceListener();

    // 2. register runner for MockService. The service is not available yet, so the
    OSGiServices.runWithService(MockService.class, new Runner<MockService>()
    {
      @Override
      public void run(MockService service) throws Exception
      {
        service.call();
        serviceListener.finished();
      }

      @Override
      public void shutdown() throws Exception
      {
        // TODO Auto-generated method stub

      }
    });

    // 3. register service
    registration = Activator.context.registerService(MockService.class.getName(), new MockServiceImpl(), null);

    // 4. wait for service to become available
    synchronized (serviceListener)
    {
      serviceListener.wait(2000);
    }

    // 5. verify the service method was called
    assertTrue(called);
  }

  @Test
  public void testRunWithService() throws Exception
  {
    // 1. instantiate service listener
    final MockServiceListener serviceListener = new MockServiceListener();

    // 2. register service
    registration = Activator.context.registerService(MockService.class.getName(), new MockServiceImpl(), null);

    // 3. register runner for MockService
    OSGiServices.runWithService(MockService.class, new Runner<MockService>()
    {
      @Override
      public void run(MockService service) throws Exception
      {
        service.call();
        serviceListener.finished();
      }

      @Override
      public void shutdown() throws Exception
      {
        // TODO Auto-generated method stub

      }
    });

    // 4. wait for service to become available
    synchronized (serviceListener)
    {
      serviceListener.wait(2000);
    }

    // 5. verify the service method was called
    assertTrue(called);
  }

  @Test
  public void testReplaceService() throws Exception
  {
    // 1. instantiate service listener
    final MockServiceListener serviceListener = new MockServiceListener();

    // 2. register runner for MockService
    OSGiServices.runWithService(MockService.class, new Runner<MockService>()
    {
      @Override
      public void run(MockService service) throws Exception
      {
        service.call();
        serviceListener.finished();
      }

      @Override
      public void shutdown() throws Exception
      {
      }
    });

    // 3. register service
    registration = Activator.context.registerService(MockService.class.getName(), new MockServiceImpl(), null);

    // 4. wait for service to become available
    synchronized (serviceListener)
    {
      serviceListener.wait(2000);
    }

    // 5. verify the service method was called
    assertTrue(called);

    registration.unregister();

    // 6. register another service
    registration = Activator.context.registerService(MockService.class.getName(), new MockServiceImplOther(), null);

    // 7. wait for service to become available
    synchronized (serviceListener)
    {
      serviceListener.wait(2000);
    }

    // 8. verify the service was replaced
    assertTrue(replaced);
  }

  @Test
  public void testShutdownService() throws Exception
  {
    // 1. instantiate service listener
    final MockServiceListener serviceListener = new MockServiceListener();

    // 2. register runner for MockService
    OSGiServices.runWithService(MockService.class, new Runner<MockService>()
    {
      @Override
      public void run(MockService service) throws Exception
      {
      }

      @Override
      public void shutdown() throws Exception
      {
        called = true;
        serviceListener.finished();
      }
    });

    // 3. register service
    registration = Activator.context.registerService(MockService.class.getName(), new MockServiceImpl(), null);

    // 4. unregister service
    registration.unregister();

    // 5. wait for service to become available
    synchronized (serviceListener)
    {
      serviceListener.wait(2000);
    }

    // 6. verify the service method was called
    assertTrue(called);
  }

  /*
   * Helper objects
   */

  interface MockService
  {
    public void call();
  }

  static class MockServiceImpl implements MockService
  {
    public void call()
    {
      called = true;
    }
  }

  static class MockServiceImplOther implements MockService
  {
    public void call()
    {
      replaced = true;
    }
  }

  static class MockServiceListener
  {
    public void finished()
    {
      synchronized (this)
      {
        notifyAll();
      }
    }
  }
}
