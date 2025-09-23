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

package com.ibm.lconn.core.web.resources.nls;

import net.jazz.ajax.model.GeneratedDojoMessageBundle;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.web.resources.Activator;

public class GlobalizationBundle extends ResourceProvider
{
  private static class UI extends GeneratedDojoMessageBundle
  {
    public UI(String id)
    {
      super("lconn.core", id, "com/ibm/lconn/core/strings/globalization.properties", Activator.getContext().getBundle(), Level.ALL);
    }

    protected boolean exclude(String key)
    {
      return false;
    }
  }

  public Resource provide(String id)
  {
    return new UI(id);
  }
}
