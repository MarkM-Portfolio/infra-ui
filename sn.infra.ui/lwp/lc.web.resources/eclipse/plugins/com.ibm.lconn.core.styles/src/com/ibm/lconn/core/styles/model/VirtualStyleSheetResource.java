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

package com.ibm.lconn.core.styles.model;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.StyleSheet;

public class VirtualStyleSheetResource extends Resource
{
  public VirtualStyleSheetResource(String id)
  {
    super(StyleSheet.TYPE, id);
  }
}
