/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.styles.model;

import java.util.List;

import net.jazz.ajax.model.Resource;

/**
 * Abstract class representing compound Connections style resources
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public abstract class CompoundStyleSheet
{

  protected List<Resource> resources;

  /**
   * Returns true if this stylesheet has at least an associated resource
   * 
   * @return true if this stylesheet has at least an associated resource
   */
  public boolean hasResources()
  {
    return resources.size() > 0;
  }

  /**
   * Returns a list of associated resources
   * 
   * @return a list of associated resources
   */
  public List<Resource> getResources()
  {
    return resources;
  }

}