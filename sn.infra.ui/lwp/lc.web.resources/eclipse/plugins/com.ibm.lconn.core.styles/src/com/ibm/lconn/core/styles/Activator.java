/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.AjaxFrameworkListener;
import net.jazz.ajax.internal.util.ServletService;
import net.jazz.ajax.model.WebBundle;

import org.osgi.framework.Bundle;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

import com.ibm.lconn.core.styles.model.OneUIExtendedWebBundle;
import com.ibm.lconn.core.styles.servlets.ApplicationThemeServlet;
import com.ibm.lconn.core.styles.servlets.ThemeServlet;

public class Activator implements BundleActivator, AjaxFrameworkListener
{
  private static BundleContext context;

  private WithBundleActivationListener<WebBundle> listener = new WithBundleActivationListener<WebBundle>()
  {
    {
      bundles.put("com.ibm.oneui.styles", null);
      bundles.put("com.ibm.oneui3.styles", null);
    }

    protected WebBundle init(String symbolicName, Bundle b)
    {
      WebBundle bundle = null;

      if ("com.ibm.oneui3.styles".equals(symbolicName))
        bundle = new OneUIExtendedWebBundle(context.getBundle(), "/resources", b, Activator.getContext().getBundle().getSymbolicName()
            + ".oneui3", "/resources/css");
      else if ("com.ibm.oneui.styles".equals(symbolicName))
        bundle = new OneUIExtendedWebBundle(context.getBundle(), "/resources", b, Activator.getContext().getBundle().getSymbolicName()
            + ".oneui2", "/resources/css");

      if (bundle != null)
        bundle.register();

      return bundle;
    }

    protected void finish(WebBundle bundle)
    {
      bundle.unregister();
    }
  };

  public void start(BundleContext context) throws Exception
  {
    Activator.context = context;
    ServletService.registerServlet("/web/_lconnappstyles", new ApplicationThemeServlet());
    ServletService.registerServlet("/web/_lconntheme", new ThemeServlet());

    AjaxFramework.addFrameworkListener(this);

    // Start the listener, then attempt to create all (ensure we don't miss a startup)
    context.addBundleListener(listener);
    listener.createAll();
  }

  public void stop(BundleContext context) throws Exception
  {
    context.removeBundleListener(listener);
    listener.removeAll();
    ServletService.unregisterServlet("/web/_lconntheme");
    ServletService.unregisterServlet("/web/_lconnappstyles");
    Activator.context = null;
  }

  static BundleContext getContext()
  {
    return context;
  }

  public void frameworkActivated(AjaxFramework fwk)
  {
    RegistryProcessor.start();
  }
}
