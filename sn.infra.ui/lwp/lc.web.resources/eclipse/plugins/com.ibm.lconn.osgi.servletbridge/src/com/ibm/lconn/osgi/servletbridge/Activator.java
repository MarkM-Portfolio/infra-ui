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

package com.ibm.lconn.osgi.servletbridge;

import java.util.logging.Level;
import java.util.logging.Logger;

import net.jazz.ajax.internal.util.ServletService;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

public class Activator implements BundleActivator
{
  private static final Logger LOGGER = Logger.getLogger(Activator.class.getName());

  private static final String PATH_BUNDLES_LIST = "/web/.bundles"; //$NON-NLS-1$

  private static BundleContext context;

  public void start(BundleContext context) throws Exception
  {
    Activator.context = context;

    if (LOGGER.isLoggable(Level.FINE))
      LOGGER.logp(Level.FINE, Activator.class.getName(), "start", "Initializing bundle {0} [{0}_{1}]", new Object[] { //$NON-NLS-1$//$NON-NLS-2$
          context.getBundle().getSymbolicName() });

    ServletService.registerServlet(PATH_BUNDLES_LIST, new InstalledBundlesServlet());
  }

  public void stop(BundleContext context) throws Exception
  {
    ServletService.unregisterServlet(PATH_BUNDLES_LIST);

    Activator.context = null;
  }

  public static BundleContext getContext()
  {
    return context;
  }
}
