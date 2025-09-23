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

package com.ibm.lconn.personcard.web.resources;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

import com.ibm.lconn.personcard.web.resources.internal.CardImplementationBinding;

public class Activator implements BundleActivator
{
  private CardImplementationBinding binding = new CardImplementationBinding();

  public void start(BundleContext context) throws Exception
  {
    binding.register();
  }

  public void stop(BundleContext context) throws Exception
  {
    binding.unregister();
  }
}
