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

package com.ibm.example.web.resources;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

public class Activator implements BundleActivator
{

  private static BundleContext context;

  static BundleContext getContext()
  {
    return context;
  }

  public void start(BundleContext bundleContext) throws Exception
  {
    // TODO: run your custom bundle initialization here
    Activator.context = bundleContext;
  }

  public void stop(BundleContext bundleContext) throws Exception
  {
    // TODO: run your custom bundle cleanup here
    Activator.context = null;
  }

}
