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

package com.ibm.lconn.core.web.resources.internal;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.servlets.LayeredResources;
import net.jazz.ajax.servlets.ResourceGraph;

import com.ibm.lconn.core.web.resources.remote.DebugMode;
import com.ibm.lconn.core.web.resources.remote.RemoteJavaScript;
import com.ibm.lconn.core.web.resources.remote.ResourceUnavailableException;
import com.ibm.lconn.core.web.resources.remote.ScriptRequest;
import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

import com.ibm.tk.rproxysvc.spi.TKRemoteServiceInstance;
import com.ibm.tk.rproxysvc.spi.TKRemoteServiceRegistry;

/**
 * Export the implementation of the RemoteJavaScript EJB. Other applications may make calls into
 * this application context in order to generate links to script resources.
 */
public class RemoteScriptRequestHandler implements RemoteJavaScript
{
  private static final Logger LOGGER = Logger.getLogger(RemoteScriptRequestHandler.class.getName());

  private TKRemoteServiceInstance<RemoteJavaScript> instance;

  public String getScriptTags(final ScriptRequest request) throws ResourceUnavailableException
  {
    ClassLoader original = Thread.currentThread().getContextClassLoader();
    try
    {
      Thread.currentThread().setContextClassLoader(RemoteScriptRequestHandler.class.getClassLoader());

      if (LOGGER.isLoggable(Level.FINE))
        LOGGER.logp(Level.FINE, RemoteScriptRequestHandler.class.getName(), "getScriptTags",
            "Handling request for script for Javascript: {0}", Arrays.asList(request.getIncludes()));

      RenderContext.Mode mode = convertDebugMode(request.getDebugMode());
      Locale locale = request.getLocale();
      if (locale == null)
        locale = Locale.ENGLISH;

      if (request.getProxyUrl() == null)
        throw new IllegalArgumentException("A base proxy URL must be specified for serving resources via the remote script EJB");
      if (request.getIncludes() == null)
        throw new IllegalArgumentException("One or more resources must be included");

      RenderContext context = RenderContext.forState(request.getProxyUrl(), locale, mode);

      List<Resource> includes;
      List<Resource> excludes;
      try
      {
        includes = new ArrayList<Resource>(request.getIncludes().length);
        for (String include : request.getIncludes())
          if (include != null)
            includes.add(Resource.resolve(include));

        if (request.getExcludes() != null)
        {
          excludes = new ArrayList<Resource>(request.getExcludes().length);
          for (String exclude : request.getExcludes())
            if (exclude != null)
              excludes.add(Resource.resolve(exclude));
        }
        else
          excludes = Collections.emptyList();

      }
      catch (IllegalArgumentException e)
      {
        throw new ResourceUnavailableException("One or more of the requested resources are not available", e);
      }

      List<String> includedIds = new ArrayList<String>(6);
      List<ResourceGraph> graphs = LayeredResources.calculateLayers(context, includes, excludes, includedIds);

      StringWriter w = new StringWriter(300);
      try
      {
        if (request.isAsHtml())
          LayeredResources.writeScriptTags(context, graphs, includedIds, w);
        else
          LayeredResources.writeScriptCallback(context, graphs, includedIds, w);
      }
      catch (IOException e)
      {
        throw new ResourceUnavailableException("Unable to generate script tag", e);
      }
      return w.toString();
    }
    finally
    {
      Thread.currentThread().setContextClassLoader(original);
    }
  }

  public boolean isRemoteServiceAvailable()
  {
    return true;
  }

  protected RenderContext.Mode convertDebugMode(DebugMode debugMode)
  {
    RenderContext.Mode mode = RenderContext.Mode.STANDARD;
    if (debugMode != null)
      switch (debugMode)
        {
          case dojo :
            mode = RenderContext.Mode.NO_MINIFY;
            break;
          case full :
            mode = RenderContext.Mode.DEBUG;
            break;
        }
    return mode;
  }

  public void register()
  {
    try
    {
      instance = new TKRemoteServiceInstance<RemoteJavaScript>(RemoteJavaScript.class, this, ServiceReferenceUtil.Service.WEBRESOURCES);
      TKRemoteServiceRegistry.registerService(instance);
      LOGGER.logp(Level.FINE, RemoteScriptRequestHandler.class.getName(), "register",
          "Registered implementation of remote script service with EJB");
    }
    catch (Throwable e)
    {
      // TODO: translate as generic error and log exception
      LOGGER.log(Level.WARNING,
          "The remote script service could not be initialized.  Other applications will not have access to web resources.", e);
    }

    // TKRemoteServiceRegistry.registerService(TKRemoteServiceInstance<RemoteJavaScript> this);
    // OSGiServices.runWithService(IJNDIService.class, new OSGiServices.Runner<IJNDIService>()
    // {
    // public void run(IJNDIService service)
    // {
    // try
    // {
    // Context initialContext = service.getInitialContext();
    //
    // // Do a simple test on the remote EJB to see whether it is available (may not be needed)
    // try
    // {
    // Object o = initialContext.lookup("com.ibm.lconn.core.web.resources.remote.RemoteJavaScript");
    // RemoteJavaScript remoteInterface = (RemoteJavaScript) PortableRemoteObject.narrow(o,
    // RemoteJavaScript.class);
    // LOGGER.logp(Level.FINE, RemoteScriptRequestHandler.class.getName(), "register",
    // "Remote EJB for script requests is available",
    // remoteInterface);
    // }
    // catch (Throwable e)
    // {
    // LOGGER.logp(Level.FINE, RemoteScriptRequestHandler.class.getName(), "register",
    // "Remote EJB for script requests is not available", e.getMessage());
    // if (LOGGER.isLoggable(Level.FINEST))
    // LOGGER.logp(Level.FINEST, RemoteScriptRequestHandler.class.getName(), "register",
    // "Naming exception", e);
    // }
    //
    // try
    // {
    // Object o =
    // initialContext.lookup("ejblocal:com.ibm.lconn.core.web.resources.remote.HostService");
    // hostService = (HostService) PortableRemoteObject.narrow(o, HostService.class);
    // hostService.setService(RemoteScriptRequestHandler.this);
    //
    // LOGGER.logp(Level.FINE, RemoteScriptRequestHandler.class.getName(), "register",
    // "Registered implementation of remote script service with EJB");
    // }
    // catch (NameNotFoundException e)
    // {
    // // TODO: translate
    // LOGGER.log(Level.WARNING,
    // "The remote web resource EJB is not available.  Other applications will not have access to script resources.",
    // e.getMessage());
    // if (!AjaxFramework.DEV_MODE)
    // LOGGER.logp(Level.WARNING, RemoteScriptRequestHandler.class.getName(), "register",
    // "Naming exception", e);
    // }
    // }
    // catch (Throwable e)
    // {
    // // TODO: translate as generic error and log exception
    // LOGGER.log(Level.WARNING,
    // "The remote script EJB could not be initialized.  Other applications will not have access to web resources.",
    // e);
    // }
    // }
    // });
  }

  public void unregister()
  {
    try
    {
      if (instance != null)
        TKRemoteServiceRegistry.registerService(instance);
      instance = null;
    }
    catch (RuntimeException e)
    {
      // TODO: translate as generic error and log exception
      LOGGER.logp(Level.WARNING, RemoteScriptRequestHandler.class.getName(), "unregister", "Unable to disable the remote script EJB", e);
    }
  }
}
