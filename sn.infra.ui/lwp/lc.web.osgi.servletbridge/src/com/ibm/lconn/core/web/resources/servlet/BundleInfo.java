/*******************************************************************************
 * Copyright (c) 2007, 2009 IBM Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: IBM Corporation - initial API and implementation
 ******************************************************************************/
package com.ibm.lconn.core.web.resources.servlet;

import java.net.URI;
import java.util.StringTokenizer;

/*
 * This object represents information of a bundle.
 */
public class BundleInfo
{
  public static final int NO_LEVEL = -1;

  private String symbolicName = null;

  private String version = null;

  private Object[] objectVersion = null;

  private URI location;

  private URI baseLocation;

  private boolean markedAsStarted = false;

  private int startLevel = NO_LEVEL;

  public BundleInfo(String symbolic, String version, URI location, int startLevel, boolean started)
  {
    this.symbolicName = symbolic;
    this.version = version;
    this.location = location;
    this.markedAsStarted = started;
    this.startLevel = startLevel;
  }
  
  public URI getLocation()
  {
    return location;
  }

  public int getStartLevel()
  {
    return startLevel;
  }

  public String getSymbolicName()
  {
    return symbolicName;
  }

  public String getVersion()
  {
    return version;
  }

  public boolean isMarkedAsStarted()
  {
    return markedAsStarted;
  }

  public URI getBaseLocation()
  {
    return baseLocation;
  }

  public void setBaseLocation(URI baseLocation)
  {
    this.baseLocation = baseLocation;
  }

  /*
   * (non-Javadoc)
   * 
   * @see java.lang.Object#toString()
   */
  public String toString()
  {
    StringBuffer buffer = new StringBuffer();
    buffer.append("BundleInfo("); //$NON-NLS-1$
    if (symbolicName != null)
      buffer.append(symbolicName);
    buffer.append(", "); //$NON-NLS-1$
    if (version != null)
      buffer.append(version);
    if (baseLocation != null)
    {
      buffer.append(", baseLocation="); //$NON-NLS-1$
      buffer.append(baseLocation);
    }
    buffer.append(", location="); //$NON-NLS-1$
    buffer.append(location);
    buffer.append(", startLevel="); //$NON-NLS-1$
    buffer.append(startLevel);
    buffer.append(", toBeStarted="); //$NON-NLS-1$
    buffer.append(markedAsStarted);
    buffer.append(')');
    return buffer.toString();
  }

  public int hashCode()
  {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((symbolicName == null) ? 0 : symbolicName.hashCode());
    result = prime * result + ((version == null) ? 0 : version.hashCode());
    return result;
  }

  public boolean equals(Object obj)
  {
    if (this == obj)
      return true;

    if (obj == null)
      return false;

    if (getClass() != obj.getClass())
      return false;

    BundleInfo other = (BundleInfo) obj;
    if (symbolicName == null)
    {
      if (other.symbolicName != null)
        return false;
    }
    else if (!symbolicName.equals(other.symbolicName))
      return false;

    if (version == null)
    {
      if (other.version != null)
        return false;
    }
    else if (!version.equals(other.version))
      return false;

    if (location == null || other.location == null)
      return true;

    // compare absolute location URIs
    URI absoluteLocation = baseLocation == null ? location : URIUtil.append(baseLocation, location.toString());
    URI otherAbsoluteLocation = other.baseLocation == null ? other.location : URIUtil.append(other.baseLocation, other.location.toString());
    return URIUtil.sameURI(absoluteLocation, otherAbsoluteLocation);
  }


  public void updateIfNewer(String version, URI location)
  {
    Object[] newObjectVersion = BundleInfo.getVersionElements(version);
    if (compareTo(getObjectVersion(), newObjectVersion) < 0)
    {
      this.location = location;
      this.version = version;
      this.objectVersion = newObjectVersion;
    }
    
  }
  
  protected Object[] getObjectVersion()
  {
    if (objectVersion == null && version != null)
      objectVersion = getVersionElements(version);
    return objectVersion;
  }

  /**
   * Compares version strings.
   * 
   * @param left
   * @param right
   * @return result of comparison, as integer; <code><0</code> if left < right; <code>0</code> if left == right; <code>>0</code> if left >
   *         right;
   */
  protected static int compareTo(Object[] left, Object[] right)
  {
    int result = ((Integer) left[0]).compareTo((Integer) right[0]); // compare major
    if (result != 0)
      return result;

    result = ((Integer) left[1]).compareTo((Integer) right[1]); // compare minor
    if (result != 0)
      return result;

    result = ((Integer) left[2]).compareTo((Integer) right[2]); // compare service
    if (result != 0)
      return result;

    return ((String) left[3]).compareTo((String) right[3]); // compare qualifier
  }
  
  /**
   * Do a quick parse of version identifier so its elements can be correctly compared. If we are unable to parse the full version, remaining
   * elements are initialized with suitable defaults.
   * 
   * @param version
   * @return an array of size 4; first three elements are of type Integer (representing major, minor and service) and the fourth element is
   *         of type String (representing qualifier). Note, that returning anything else will cause exceptions in the caller.
   */
  protected static Object[] getVersionElements(String version)
  {
    Object[] result = { new Integer(0), new Integer(0), new Integer(0), "" }; //$NON-NLS-1$
    StringTokenizer t = new StringTokenizer(version, "."); //$NON-NLS-1$
    String token;
    int i = 0;
    while (t.hasMoreTokens() && i < 4)
    {
      token = t.nextToken();
      if (i < 3)
      {
        // major, minor or service ... numeric values
        try
        {
          result[i++] = new Integer(token);
        }
        catch (Exception e)
        {
          // invalid number format - use default numbers (0) for the rest
          break;
        }
      }
      else
      {
        // qualifier ... string value
        result[i++] = token;
      }
    }
    return result;
  }
}
