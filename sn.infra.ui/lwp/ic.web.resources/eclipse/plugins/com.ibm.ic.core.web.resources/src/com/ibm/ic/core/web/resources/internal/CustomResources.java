/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.core.web.resources.internal;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ibm.lconn.core.customization.ApplicationCustomization;

import net.jazz.ajax.model.ResourceOverrideService;

public class CustomResources implements ResourceOverrideService
{
  private static final String CSS_EXTENSION = ".css"; //$NON-NLS-1$

  private static final String JS_EXTENSION = ".js"; //$NON-NLS-1$

  private static final String GEN4_PATH_PREFIX = "com.ibm.social.gen4.theme/css/defaultTheme/"; //$NON-NLS-1$

  private static final String GEN4_PATH_OVERRIDE = "gen4Theme/"; //$NON-NLS-1$

  private static final String GEN4_APPLICATION_PATH_PREFIX = "com.ibm.social.gen4.theme/css/base/applications/"; //$NON-NLS-1$

  private static final String GEN4_APPLICATION_PATH_OVERRIDE = "gen4Theme/applications/"; //$NON-NLS-1$
  
  private static ConcurrentHashMap<String, String> customizationFiles = new ConcurrentHashMap<String, String>(); //Static variable for Cache
  
  private static ConcurrentHashMap<String, String> no_customizationFiles = new ConcurrentHashMap<String, String>(); //Static variable for Cache
  
  private final static String CLASS_NAME = CustomResources.class.getName();
  
  private static final Logger log = Logger.getLogger(CLASS_NAME);

  public CustomResources()
  {
  }

  public URL getDojoModuleUrl(String id)
  {
    if (id == null)
      return null;
    String relPath = id.replace('.', '/') + JS_EXTENSION;
    return getSimpleResourceUrl(relPath);
  }

  public URL getMessageBundleUrl(String bundleName)
  {
    if (bundleName == null)
      return null;
    return ApplicationCustomization.getInstance().getBundleUrl(bundleName);
  }

  public URL getStyleSheetUrl(String id)
  {
    if (id == null)
      return null;
    String path = id;
    if (!path.endsWith(CSS_EXTENSION))
      path = path + CSS_EXTENSION;
	  
	  String cssPath = customCssPath(path);
	  URL retVal = null;
	  
	  if(log.isLoggable(Level.FINEST))
      {
          log.finest("cssPath="+cssPath);
      }
	  
	  if (customizationFiles.containsKey(cssPath))
	  {
		  try {
			  if(log.isLoggable(Level.FINEST))
		      {
		          log.finest("found customizationFiles for cssPath="+cssPath+" url="+customizationFiles.get(cssPath));
		      }
			  retVal = new URL(customizationFiles.get(cssPath));
			  return retVal;
		  } catch (MalformedURLException ex) {
			  if (log.isLoggable(Level.FINEST))
		      {
		        log.throwing(CLASS_NAME, "getStyleSheetUrl", ex); //$NON-NLS-1$
		      }
		  }
	  }
	  
	  if (no_customizationFiles.containsKey(cssPath))
	  {
		  //we already checked this and did n't find custom one return null
		  if(log.isLoggable(Level.FINEST))
	      {
	          log.finest("found in no_customizationFiles for cssPath="+cssPath);
	      }
		  return null;
	  }
	  
    File customizationDirectory = ApplicationCustomization.getInstance().getThemeDirectory();
	  if (customizationDirectory != null)
	  {
		  File override = new File(customizationDirectory, customCssPath(path));
		  try
		  {
			  //not found entry in Cache check if Customization file exists
			  if (override.exists())
			  {
				  //customization file found add it to Cache
				  customizationFiles.put(cssPath, override.toURI().toURL().toString());
				  if(log.isLoggable(Level.FINEST))
			      {
			          log.finest("found customization for cssPath="+cssPath+" url="+override.toURI().toURL().toString());
			      }

				  // See http://docs.oracle.com/javase/7/docs/api/java/io/File.html#toURL%28%29
				  //
				  // file.toURL() does not automatically escape characters that are illegal in URLs. It is recommended that new code convert an
				  // abstract pathname into a URL by first converting it into a URI, via the toURI method, and then converting the URI into a URL
				  // via the URI.toURL method.
				  return override.toURI().toURL();
			  }
			  else
			  {
				  //no customization file found
				  no_customizationFiles.put(cssPath, cssPath);
				  if(log.isLoggable(Level.FINEST))
			      {
			          log.finest("no customization for cssPath="+cssPath);
			      }
			  }
		  }
		  catch (MalformedURLException e)
		  {
			  throw new RuntimeException(e);
		  }
	  }
    return null;
  }

  public URL getSimpleResourceUrl(String path)
  {
    if (path == null)
      return null;
    File javascriptDirectory = ApplicationCustomization.getInstance().getJavascriptDirectory();

    if (javascriptDirectory != null)
    {
      File file = new File(javascriptDirectory, path);
      try
      {
        // Check if the file is a child of the javascript customization directory
        if (file.getCanonicalPath().startsWith(javascriptDirectory.getCanonicalPath()))
        {
          // See http://docs.oracle.com/javase/7/docs/api/java/io/File.html#toURL%28%29
          //
          // file.toURL() does not automatically escape characters that are illegal in URLs. It is recommended that new code convert an
          // abstract pathname into a URL by first converting it into a URI, via the toURI method, and then converting the URI into a URL
          // via the URI.toURL method.
          return file.toURI().toURL();
        }
        else
        {
          throw new IllegalArgumentException("Path: " + file.getCanonicalPath() //$NON-NLS-1$
              + " is not a child of the Javascript customization directory: " + javascriptDirectory.getCanonicalPath()); //$NON-NLS-1$
        }
      }
      catch (MalformedURLException e)
      {
        throw new IllegalStateException(e);
      }
      catch (IOException e)
      {
        throw new IllegalStateException(e);
      }
    }
    return null;
  }

  /**
   * Returns a path that is suitable for the customization directory
   */
  private static String customCssPath(String path)
  {
    /*
     * Handle the gen4 bundle as a special case, and look for custom files in
     * <code>&lt;CONNECTIONS_CUSTOMIZATION_PATH&gt;/themes/gen4Theme/</code>. In the future we may want to declare a customization path in
     * the bundle.
     */
    if (path.startsWith(GEN4_PATH_PREFIX))
      return GEN4_PATH_OVERRIDE + path.substring(GEN4_PATH_PREFIX.length());
    if (path.startsWith(GEN4_APPLICATION_PATH_PREFIX))
      return GEN4_APPLICATION_PATH_OVERRIDE + path.substring(GEN4_APPLICATION_PATH_PREFIX.length());
    return path;
  }
}
