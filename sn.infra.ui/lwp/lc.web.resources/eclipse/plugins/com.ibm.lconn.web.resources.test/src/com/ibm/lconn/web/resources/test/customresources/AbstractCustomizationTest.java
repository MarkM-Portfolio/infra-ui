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

package com.ibm.lconn.web.resources.test.customresources;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.io.IOUtils;
import org.junit.Before;

import com.ibm.lconn.core.web.resources.internal.CustomResources;
import com.ibm.ventura.internal.config.VenturaConfigVariable;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.ResourceOverride;
import net.jazz.ajax.model.ResourceOverrideService;
import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class AbstractCustomizationTest extends AbstractTest
{
  protected static final String WAS_VARIABLE_CUSTOMIZATION_ROOT = "CONNECTIONS_CUSTOMIZATION_PATH";

  protected static final String JS_EXTENSION = ".js";

  protected static final String PROPERTIES_EXTENSION = ".properties";

  protected static File customJavascriptDir;

  protected static File customThemesDir;

  protected static File customStringsDir;

  static
  {
    try
    {
      VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
    }
    catch (VenturaConfigException e)
    {
    }
    VenturaConfigVariable variable = new VenturaConfigVariable();
    String customizationRoot = variable.resolve("${" + WAS_VARIABLE_CUSTOMIZATION_ROOT + "}");
    if (customizationRoot != null)
    {
      customJavascriptDir = getOrCreateDir(customizationRoot + "/javascript");
      customThemesDir = getOrCreateDir(customizationRoot + "/themes");
      customStringsDir = getOrCreateDir(customizationRoot + "/strings");
    }
  }

  @Before
  public void registerOverrideService()
  {
    // Make sure the ResourceOverride service is registered
    if (!ResourceOverride.getService().getClass().equals(CustomResources.class))
      AjaxFramework.bundleContext().registerService(ResourceOverrideService.class.getName(), new CustomResources(), null);
  }

  protected File jsFile(String moduleId)
  {
    return new File(customJavascriptDir + File.separator + moduleId.replace('.', File.separatorChar) + JS_EXTENSION);
  }

  protected File jsDir(String moduleId)
  {
    String path = customJavascriptDir + File.separator + moduleId.replace('.', File.separatorChar);
    path = path.substring(0, path.lastIndexOf(File.separatorChar));
    return new File(path);
  }

  protected void createCustomJavaScriptModule(URL resource, String moduleId) throws Exception
  {
    File customJSDir = jsDir(moduleId);
    customJSDir.mkdirs();

    File customJSFile = jsFile(moduleId);

    writeFile(resource, customJSFile);
  }

  private void writeFile(URL resource, File outFile)
  {
    final int size = 1024;
    OutputStream outStream = null;
    URLConnection urlConnection = null;
    InputStream is = null;
    try
    {
      byte[] buf;
      int read;
      outStream = new BufferedOutputStream(new FileOutputStream(outFile));

      urlConnection = resource.openConnection();
      is = urlConnection.getInputStream();
      buf = new byte[size];
      while ((read = is.read(buf)) != -1)
      {
        outStream.write(buf, 0, read);
      }
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
    finally
    {
      IOUtils.closeQuietly(is);
      IOUtils.closeQuietly(outStream);
    }

  }

  protected void deleteCustomJavascriptModule(String moduleId)
  {
    File customJSFile = jsFile(moduleId);
    if (customJSFile.exists())
      customJSFile.delete();
  }

  protected File cssFile(String stylesheet)
  {
    return new File(customThemesDir + File.separator + stylesheet);
  }

  protected void createCustomCSSFile(String stylesheet) throws Exception
  {
    File css = cssFile(stylesheet);
    css.getParentFile().mkdirs();
    css.createNewFile();
  }

  protected void deleteCustomCSSFile(String stylesheet) throws Exception
  {
    cssFile(stylesheet).delete();
  }

  protected File bundleFile(String bundle)
  {
    return new File(customStringsDir + File.separator + bundle + PROPERTIES_EXTENSION);
  }

  protected void createCustomBundle(String bundle) throws Exception
  {
    bundleFile(bundle).createNewFile();
  }

  protected void deleteCustomBundle(String bundle) throws Exception
  {
    bundleFile(bundle).delete();
  }

  protected void createCustomTemplate(URL resource, String modulePrefix, String path) throws Exception
  {
    File template = textFile(modulePrefix.replace('.', File.separatorChar) + File.separator + path);
    template.getParentFile().mkdirs();
    template.createNewFile();

    writeFile(resource, template);
  }

  private File textFile(String path)
  {
    return new File(customJavascriptDir + File.separator + path);
  }

  protected void deleteCustomTemplate(String modulePrefix, String path)
  {
    textFile(modulePrefix.replace('.', File.separatorChar) + File.separator + path).delete();
  }

  protected void createCustomTextfile(URL resource, String path) throws Exception
  {
    File textfile = textFile(path);
    textfile.getParentFile().mkdirs();
    textfile.createNewFile();

    writeFile(resource, textfile);
  }

  protected void deleteCustomTextfile(String path)
  {
    textFile(path).delete();
  }

  private static File getOrCreateDir(String path)
  {
    File dir = new File(path);
    if (!dir.exists())
      dir.mkdirs();
    return dir;
  }

}
