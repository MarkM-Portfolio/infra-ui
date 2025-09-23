/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles;

import java.util.HashMap;
import java.util.Map;

import org.osgi.framework.Bundle;
import org.osgi.framework.BundleEvent;
import org.osgi.framework.BundleException;
import org.osgi.framework.BundleListener;

/**
 * Only works with singleton bundles.
 * 
 * @param <T>
 */
public abstract class WithBundleActivationListener<T> implements BundleListener
{
  protected Map<String, T> bundles = new HashMap<String, T>();

  abstract protected T init(String symbolicName, Bundle b);

  abstract protected void finish(T object);

  /**
   * init() any bundles that are already loaded, and start() any bundles that are currently
   * RESOLVED.
   * 
   * @throws RuntimeException
   *           RESOLVED bundles will be start()'ed. If the bundle start throws an exception this
   *           method can throw. Override handleBundleStartException to change this behavior.
   */
  synchronized public void createAll()
  {
    for (String key : bundles.keySet())
      create(key, null);
  }

  synchronized public void removeAll()
  {
    for (String key : bundles.keySet())
      remove(key);
  }

  synchronized public void create(String symbolicName, Bundle b)
  {
    if (bundles.get(symbolicName) != null)
      return;

    if (b == null)
      b = getBundle(symbolicName);

    if (b != null)
    {
      if (BundleEvent.RESOLVED == b.getState())
      {
        try
        {
          b.start();
        }
        catch (BundleException e)
        {
          handleBundleStartException(b, e);
        }
      }

      T bundle = init(symbolicName, b);
      if (bundle != null)
        bundles.put(symbolicName, bundle);
    }
  }

  synchronized public void remove(String symbolicName)
  {
    if (bundles.containsKey(symbolicName))
    {
      T b = bundles.put(symbolicName, null);
      if (b != null)
        finish(b);
    }
  }

  synchronized public void bundleChanged(BundleEvent event)
  {
    if (bundles.containsKey(event.getBundle().getSymbolicName()))
    {
      switch (event.getType())
        {
          case BundleEvent.STARTED :
            create(event.getBundle().getSymbolicName(), event.getBundle());
            break;
          case BundleEvent.UNRESOLVED :
          case BundleEvent.UNINSTALLED :
          case BundleEvent.STOPPED :
            remove(event.getBundle().getSymbolicName());
            break;
        }
    }
  }

  protected Bundle getBundle(String symbolicName)
  {
    for (Bundle b : Activator.getContext().getBundles())
      if (symbolicName.equals(b.getSymbolicName()))
      {
        if (BundleEvent.STARTED == b.getState() || BundleEvent.RESOLVED == b.getState())
          return b;
        return null;
      }
    return null;
  }

  protected void handleBundleStartException(Bundle b, Throwable t)
  {
    throw new RuntimeException("Unable to start bundle " + b.getSymbolicName(), t);
  }
}