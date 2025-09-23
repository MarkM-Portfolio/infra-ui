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

package com.ibm.lconn.personcard.web.resources.internal;

import java.util.logging.Level;
import java.util.logging.Logger;

import net.jazz.ajax.model.Binding;
import net.jazz.ajax.model.Dependency;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.ExtensionDependency;
import net.jazz.ajax.model.Resource.Key;

import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.ServiceNotFoundException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class CardImplementationBinding
{
  private static final Logger LOGGER = Logger.getLogger(CardImplementationBinding.class.getName());

  private static final Key MODULE_ENABLER = new Key(DojoModule.TYPE, "lconn.core.people"); //$NON-NLS-1$

  private static final Dependency BINDING_LEGACY = new ExtensionDependency(DojoModule.TYPE, "com.ibm.lconn.personcard.legacy"); //$NON-NLS-1$

  private static final Dependency BINDING_STANDARD = new ExtensionDependency(DojoModule.TYPE, "com.ibm.lconn.personcard.standard"); //$NON-NLS-1$

  private static final String PERSON_CARD_ENABLED_PROPERTY = "com.ibm.lconn.personcard.enable"; //$NON-NLS-1$

  private static final Object OFF = "off"; //$NON-NLS-1$

  private static final Object STANDARD = "standard"; //$NON-NLS-1$

  private Binding active;

  private BindingType bindingType;

  private boolean enabled;

  public static enum BindingType {
    STANDARD, LEGACY;
  }

  public CardImplementationBinding()
  {
    init();
  }

  private void init()
  {
    try
    {
      VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();
      VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();

      String cardMode = helper.getGenericProperties().getProperty(PERSON_CARD_ENABLED_PROPERTY);

      enabled = false;
      try
      {
        enabled = provider.isServiceEnabled(ServiceReferenceUtil.Service.PROFILES) && !(OFF.equals(cardMode));
      }
      catch (ServiceNotFoundException e)
      {
      }

      bindingType = STANDARD.equals(cardMode) ? BindingType.STANDARD : BindingType.LEGACY;
    }
    catch (Exception e)
    {
      LOGGER.log(Level.SEVERE, "Unable to initialize person card binding", e); //$NON-NLS-1$
    }
  }

  public void register()
  {
    if (active != null)
    {
      LOGGER.log(Level.FINE, "Person card binding already registered"); //$NON-NLS-1$
      return;
    }
    active = null;
    if (enabled)
    {
      boolean useStandard = BindingType.STANDARD.equals(bindingType);
      LOGGER.log(Level.FINE, "Using standard person card: {0}", new Object[] { useStandard }); //$NON-NLS-1$
      active = new Binding(MODULE_ENABLER, useStandard ? BINDING_STANDARD : BINDING_LEGACY);
      active.bind();
    }
    else
      LOGGER.log(Level.FINE, "Person card is disabled"); //$NON-NLS-1$
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
