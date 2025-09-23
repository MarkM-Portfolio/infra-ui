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

package com.ibm.lconn.core.web.resources;

import java.util.Hashtable;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.jazz.ajax.internal.util.ServletService;
import net.jazz.ajax.model.ResourceOptimization;
import net.jazz.ajax.model.ResourceOverrideService;

import org.eclipse.core.runtime.Platform;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;

import com.ibm.lconn.core.proxy.LCProxyServlet;
import com.ibm.lconn.core.util.Build;
import com.ibm.lconn.core.web.resources.config.LayersConfig;
import com.ibm.lconn.core.web.resources.internal.CustomResources;
import com.ibm.lconn.core.web.resources.internal.RemoteScriptRequestHandler;
import com.ibm.lconn.core.web.resources.internal.SametimeAwarenessBinding;
import com.ibm.lconn.core.web.resources.internal.WebResourcesCacheConfig;
import com.ibm.lconn.core.web.resources.servlet.CustomizationInit;
import com.ibm.lconn.core.web.resources.servlet.RoleCheckServlet;
import com.ibm.lconn.core.web.resources.servlet.SystemTimeServlet;
import com.ibm.lconn.core.web.resources.servlet.TestUploadEndpointServlet;
import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

public class Activator implements BundleActivator
{
  private static final Logger LOGGER = Logger.getLogger(Activator.class.getName());

  private static final String PATH_AJAX_PROXY = "/ajaxProxy";

  private static final String PATH_CONNECTIONS_INIT = "/web/_connectionsinit";

  private static final String PATH_TEST_UPLOAD = "/web/test/upload";
  
  private static final String PATH_SYSTEM_TIME = "/web/systemTime";

  private static final String PATH_ROLE_CHECK = "/web/user/roles";

  private static BundleContext context;

  private static ServiceRegistration overrideService = null;

  private static SametimeAwarenessBinding sametimeBinding = new SametimeAwarenessBinding();

  private static RemoteScriptRequestHandler remoteHandler = new RemoteScriptRequestHandler();

  public static final boolean DEV_MODE;

  public static boolean isOsgiDevEnabled()
  {
    return Activator.getContext().getProperty("osgi.dev") != null;    
  }
  
  static {
    if ("true".equals(Platform.getDebugOption("net.jazz.ajax/ForceRuntimeMode")))
        DEV_MODE = false;
    else
        DEV_MODE = Platform.getBundle("com.ibm.team.server.embedded.jetty") != null;
  }
  
  public void start(BundleContext context) throws Exception
  {
    Activator.context = context;

    if (LOGGER.isLoggable(Level.FINE))
      LOGGER.logp(Level.FINE, Activator.class.getName(), "start", "Initializing bundle {0} [{0}_{1}]", new Object[] {
          context.getBundle().getSymbolicName(), Build.getCoreStream(), Build.getCoreBuild() });

    CustomizationInit customInit = new CustomizationInit();
    if (DEV_MODE)
      customInit.setServletContext(new MockContext());
    ServletService.registerServlet(PATH_CONNECTIONS_INIT, customInit);
    Hashtable<String, String> initParams = new Hashtable<String, String>();
    initParams.put("servicename", ServiceReferenceUtil.Service.WEBRESOURCES);
    ServletService.registerServlet(PATH_AJAX_PROXY, new LCProxyServlet(), initParams);
    ServletService.registerServlet(PATH_TEST_UPLOAD, new TestUploadEndpointServlet());
    ServletService.registerServlet(PATH_SYSTEM_TIME, new SystemTimeServlet());
    ServletService.registerServlet(PATH_ROLE_CHECK, new RoleCheckServlet());

    overrideService = context.registerService(ResourceOverrideService.class.getName(), new CustomResources(), null);

    WebResourcesCacheConfig.register();
    
    ResourceOptimization.addSuggestedLayers(LayersConfig.loadLayers());
    sametimeBinding.register();

    remoteHandler.register();
  }

  public void stop(BundleContext context) throws Exception
  {
    remoteHandler.unregister();

    sametimeBinding.unregister();

    overrideService.unregister();

    ServletService.unregisterServlet(PATH_SYSTEM_TIME);
    ServletService.unregisterServlet(PATH_CONNECTIONS_INIT);
    ServletService.unregisterServlet(PATH_AJAX_PROXY);
    ServletService.unregisterServlet(PATH_TEST_UPLOAD);

    Activator.context = null;
  }

  public static BundleContext getContext()
  {
    return context;
  }
}
