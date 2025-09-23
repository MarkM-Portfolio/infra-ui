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

import java.util.logging.Level;
import java.util.logging.Logger;

import net.jazz.ajax.model.Binding;
import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.ExtensionDependency;
import net.jazz.ajax.model.Resource.Key;

import org.apache.commons.configuration.Configuration;

import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.ConfigurationNotFoundException;
import com.ibm.ventura.internal.config.exception.ServiceNotFoundException;

public class SametimeAwarenessBinding
{
  private static final Logger LOGGER = Logger.getLogger(SametimeAwarenessBinding.class.getName());

  private static final Key MODULE_ENABLER = new Key(DojoModule.TYPE, "lconn.core.people"); //$NON-NLS-1$

  private static final Dependency BINDING_CONNECT = new ExtensionDependency(DojoModule.TYPE, "lconn.profiles.sametime.sametimeAwareness"); //$NON-NLS-1$

  private static final Dependency BINDING_PROXY = new ExtensionDependency(DojoModule.TYPE, "lconn.profiles.sametime.sametimeProxyAwareness"); //$NON-NLS-1$

  private static final String CONNECT_ENABLED_PROPERTY = "sametimeAwareness[@enabled]"; //$NON-NLS-1$

  private Binding active;

  private BindingType bindingType;

  private boolean enabled;

  public static enum BindingType {
    PROXY, CONNECT;
  }

  public SametimeAwarenessBinding()
  {
    init();
  }

  private void init()
  {
    try
    {
      VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();

      boolean connectEnabled = false;
      try
      {
        Configuration config = provider.getConfiguration(ServiceReferenceUtil.Service.PROFILES);
        connectEnabled = config.getBoolean(CONNECT_ENABLED_PROPERTY);
        if (connectEnabled)
          bindingType = BindingType.CONNECT;
      }
      catch (ConfigurationNotFoundException e)
      {
      }
      boolean proxyEnabled = false;
      try
      {
        proxyEnabled = provider.isServiceEnabled(ServiceReferenceUtil.Service.SAMETIME_PROXY);
        if (proxyEnabled)
          bindingType = BindingType.PROXY;
      }
      catch (ServiceNotFoundException e)
      {
      }
      enabled = connectEnabled || proxyEnabled;
    }
    catch (Exception e)
    {
      LOGGER.log(Level.SEVERE, "Unable to enable Sametime awareness", e); //$NON-NLS-1$
    }
  }

  public void register()
  {
    if (active != null)
    {
      LOGGER.log(Level.FINE, "Sametime awareness binding already registered"); //$NON-NLS-1$
      return;
    }
    if (enabled)
    {
      active = null;
      switch (bindingType)
        {
          case CONNECT :
            LOGGER.log(Level.FINE, "Using Sametime connect"); //$NON-NLS-1$
            active = new Binding(MODULE_ENABLER, BINDING_CONNECT);
            active.bind();
            break;
          case PROXY :
            LOGGER.log(Level.FINE, "Using Sametime proxy"); //$NON-NLS-1$
            active = new Binding(MODULE_ENABLER, BINDING_PROXY);
            active.bind();
            break;
          default:
            LOGGER.log(Level.FINE, "Invalid Sametime awareness configuration"); //$NON-NLS-1$
        }
    }
    else
      LOGGER.log(Level.FINE, "Sametime is disabled"); //$NON-NLS-1$
  }

  public void unregister()
  {
    if (active != null)
      active.unbind();
    active = null;
  }

  public void setBindingType(BindingType bindingType)
  {
    this.bindingType = bindingType;
  }

  public BindingType getBindingType()
  {
    return bindingType;
  }

  public void setEnabled(boolean enabled)
  {
    this.enabled = enabled;
  }

  public boolean isEnabled()
  {
    return enabled;
  }
}
