/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.mocks;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Dictionary;
import java.util.Enumeration;
import java.util.Map;

import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.BundleException;
import org.osgi.framework.ServiceReference;
import org.osgi.framework.Version;

@SuppressWarnings("nls")
public class TestBundle implements Bundle
{
  protected String base;

  protected String resource;

  public TestBundle(String base, String resource)
  {
    this.base = base;
    this.resource = resource;
  }

  public Enumeration findEntries(String arg0, String arg1, boolean arg2)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public BundleContext getBundleContext()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public long getBundleId()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public URL getEntry(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Enumeration getEntryPaths(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Dictionary getHeaders()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Dictionary getHeaders(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public long getLastModified()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public String getLocation()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public ServiceReference[] getRegisteredServices()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public URL getResource(String arg0)
  {
    try
    {
      if (arg0.equals(base + "/" + resource))
        return new File(base + "/" + resource).toURI().toURL();
      return null;
    }
    catch (Throwable t)
    {
    }
    return null;
  }

  public Enumeration getResources(String arg0) throws IOException
  {
    // TODO Auto-generated method stub
    return null;
  }

  public ServiceReference[] getServicesInUse()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Map getSignerCertificates(int arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public int getState()
  {
    // TODO Auto-generated method stub
    return 0;
  }

  public String getSymbolicName()
  {
    return "net.jazz.ajax.tests";
  }

  public Version getVersion()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public boolean hasPermission(Object arg0)
  {
    // TODO Auto-generated method stub
    return false;
  }

  public Class loadClass(String arg0) throws ClassNotFoundException
  {
    // TODO Auto-generated method stub
    return null;
  }

  public void start() throws BundleException
  {
    // TODO Auto-generated method stub

  }

  public void start(int arg0) throws BundleException
  {
    // TODO Auto-generated method stub

  }

  public void stop() throws BundleException
  {
    // TODO Auto-generated method stub

  }

  public void stop(int arg0) throws BundleException
  {
    // TODO Auto-generated method stub

  }

  public void uninstall() throws BundleException
  {
    // TODO Auto-generated method stub

  }

  public void update() throws BundleException
  {
    // TODO Auto-generated method stub

  }

  public void update(InputStream arg0) throws BundleException
  {
    // TODO Auto-generated method stub

  }

}