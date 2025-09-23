/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.web.resources.test.servlet;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import java.util.logging.Logger;
import java.util.logging.Level;

public class Activator implements BundleActivator
{
  private static final String CLASS_NAME = Activator.class.getName();

  private static final Logger log = Logger.getLogger(CLASS_NAME);

  private static BundleContext context;

  static BundleContext getContext()
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "getContext()");
    }
    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "getContext()", context);
    }
    return context;
  }

  public void start(BundleContext bundleContext) throws Exception
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "start(BundleContext bundleContext)", bundleContext);
    }
    Activator.context = bundleContext;
    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "start(BundleContext bundleContext)");
    }
  }

  public void stop(BundleContext bundleContext) throws Exception
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "stop(BundleContext bundleContext)", bundleContext);
    }
    Activator.context = null;
    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "stop(BundleContext bundleContext)");
    }
  }
}
