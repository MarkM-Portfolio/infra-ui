/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.oauth.web.resources;

import net.jazz.ajax.model.GeneratedDojoMessageBundle;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

public class MessageBundles extends ResourceProvider
{
  private static class UI extends GeneratedDojoMessageBundle
  {
    public UI(String id)
    {
      super("oauth", id, "com/ibm/lconn/oauth/strings/ui.properties", Activator.getContext().getBundle(), Level.ALL);
    }

    protected boolean exclude(String key)
    {
      return false;
    }
  }

  private static class Help extends GeneratedDojoMessageBundle
  {
    public Help(String id)
    {
      super("oauth", id, "com/ibm/lconn/oauth/strings/uihelp.properties", Activator.getContext().getBundle(), Level.ALL);
    }

    protected boolean include(String s)
    {
      return true;
    }
  }

  public Resource provide(String id)
  {
    if (id.endsWith(".ui"))
      return new UI(id);
    else if (id.endsWith(".uihelp"))
      return new Help(id);
    else
      throw new IllegalArgumentException("Id '" + id + "' has no bundle");
  }
}
