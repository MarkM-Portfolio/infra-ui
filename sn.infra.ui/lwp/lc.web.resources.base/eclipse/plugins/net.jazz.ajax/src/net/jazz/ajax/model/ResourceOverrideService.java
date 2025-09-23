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

package net.jazz.ajax.model;

import java.net.URL;

public interface ResourceOverrideService
{
  /**
   * @param id
   *          The identifier of a Dojo module
   * @return A URL for a resource that would override the specific Dojo module ID.
   */
  URL getDojoModuleUrl(String id);

  /**
   * @param bundleName
   *          The unique name of a particular string bundle, like 'com/ibm/lconn/core/strings/templates.properties', or
   *          'lconn.core.nls.strings.js'
   * @return A URL for a resource that would override the specific message bundle
   */
  URL getMessageBundleUrl(String bundleName);

  /**
   * @param styleSheet
   *          The unique name of a particular stylesheet, like 'com/ibm/lconn/core/styles/base/applications/activities.css'
   * @return A URL for a resource that would override the specific stylesheet
   */
  URL getStyleSheetUrl(String styleSheet);

  /**
   * 
   * @param path
   *          a path to a simple resource such as an HTML file, an image, or any other resource.
   * @return A URL for a resource that may or may not exist
   */
  URL getSimpleResourceUrl(String path);
}
