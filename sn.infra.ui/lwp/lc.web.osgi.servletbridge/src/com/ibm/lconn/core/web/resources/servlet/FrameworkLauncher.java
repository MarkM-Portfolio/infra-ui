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

package com.ibm.lconn.core.web.resources.servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.jar.Attributes;
import java.util.jar.Manifest;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.management.InstanceNotFoundException;
import javax.management.MBeanException;
import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;
import javax.management.ReflectionException;

import com.ibm.websphere.management.AdminService;
import com.ibm.websphere.management.AdminServiceFactory;

public class FrameworkLauncher extends org.eclipse.equinox.servletbridge.FrameworkLauncher
{
  private static final int LIMIT_TOTAL_SEARCH_DIRECTORIES = 10000;

  private static final String JAR_EXTENSION = ".jar";

  private static final String LINK_EXTENSION = ".link";

  private static final Logger log = Logger.getLogger(FrameworkLauncher.class.getName());

  private static final String CONFIG_INI = "configuration/config.ini";

  private static final String BUNDLES_INFO = "configuration/org.eclipse.equinox.simpleconfigurator/bundles.info";

  private static final String BUNDLES_TEMPLATE = "configuration/bundles.info.template";

  @Override
  public synchronized void deploy()
  {
    // super.deploy();

    if (platformDirectory != null)
    {
      context.log("Framework is already deployed"); //$NON-NLS-1$
      return;
    }

    File servletTemp = (File) context.getAttribute("javax.servlet.context.tempdir"); //$NON-NLS-1$
    platformDirectory = new File(servletTemp, "eclipse"); //$NON-NLS-1$
    if (!platformDirectory.exists())
    {
      platformDirectory.mkdirs();
    }

    copyResource(resourceBase + "configuration/", new File(platformDirectory, "configuration")); //$NON-NLS-1$ //$NON-NLS-2$
    copyResource(resourceBase + "features/", new File(platformDirectory, "features")); //$NON-NLS-1$ //$NON-NLS-2$
    File plugins = new File(platformDirectory, "plugins"); //$NON-NLS-1$
    plugins.mkdirs();
    //copyResource(resourceBase + "plugins/", plugins); //$NON-NLS-1$
    copyResource(resourceBase + "p2/", new File(platformDirectory, "p2")); //$NON-NLS-1$ //$NON-NLS-2$
    deployExtensionBundle(plugins);
    copyResource(resourceBase + ".eclipseproduct", new File(platformDirectory, ".eclipseproduct")); //$NON-NLS-1$ //$NON-NLS-2$    

    File configIniFile = new File(getPlatformDirectory(), CONFIG_INI);
    copyIfNewer(getResourceFile(CONFIG_INI), configIniFile);

    List<File> searchDirectories = new LinkedList<File>();
    searchDirectories.add(getResourceFile("plugins"));
    if (log.isLoggable(Level.FINE))
      log.logp(Level.FINE, FrameworkLauncher.class.getName(), "deploy", "Searching installed directory {0}", searchDirectories.get(0));
    searchDirectories.add(new File(getPlatformDirectory(), "plugins"));
    if (log.isLoggable(Level.FINE))
      log.logp(Level.FINE, FrameworkLauncher.class.getName(), "deploy", "Searching deployed directory {0}", searchDirectories.get(1));

    File provisionDirectory = expandVariableToFile("CONNECTIONS_PROVISION_PATH", "webresources");
    if (provisionDirectory != null && provisionDirectory.isDirectory())
    {
      if (log.isLoggable(Level.FINE))
        log.logp(Level.FINE, FrameworkLauncher.class.getName(), "deploy", "Searching web resource provisioning directory {0}",
            provisionDirectory);
      searchDirectories.add(provisionDirectory);
    }
    else
    {
      if (log.isLoggable(Level.FINE))
        log.logp(Level.FINE, FrameworkLauncher.class.getName(), "deploy",
            "No webresources provision directory found.  Searching directory {0}", provisionDirectory);
    }

    File customizationDirectory = expandVariableToFile("CONNECTIONS_CUSTOMIZATION_PATH", "plugins/webresources");
    if (customizationDirectory != null && customizationDirectory.isDirectory())
    {
      if (log.isLoggable(Level.FINE))
        log.logp(Level.FINE, FrameworkLauncher.class.getName(), "deploy", "Searching customization plugins directory {0}",
            customizationDirectory);
      searchDirectories.add(customizationDirectory);
    }

    AtomicBoolean forceDevelopment = new AtomicBoolean(false);
    generateBundleInfo(searchDirectories, forceDevelopment);

    if (forceDevelopment.get())
      setOsgiDevelopmentMode(configIniFile);
  }

  protected void setOsgiDevelopmentMode(File configIniFile)
  {
    InputStream is = null;
    OutputStream os = null;
    Properties p = new Properties();
    try
    {
      is = new FileInputStream(configIniFile);
      p.load(is);
      is.close();

      os = new FileOutputStream(configIniFile);
      p.setProperty("osgi.dev", "/bin");
      p.store(os, "Updated by FrameworkLauncher to set osgi.dev=/bin during deployment");

      if (log.isLoggable(Level.SEVERE))
        log.logp(Level.SEVERE, FrameworkLauncher.class.getName(), "setOsgiDevelopmentMode",
            "Development mode was forced in a link file, updating config.ini");
    }
    catch (IOException e)
    {
      if (log.isLoggable(Level.SEVERE))
        log.logp(Level.SEVERE, FrameworkLauncher.class.getName(), "setOsgiDevelopmentMode",
            "Unable update config.ini into dev mode, if this is a production environment you should disable development mode.", e);
    }
    finally
    {
      closeQuietly(is);
      closeQuietly(os);
    }
  }

  /**
   * buildInitialPropertyMap create the initial set of properties from the contents of launch.ini and for a few other properties necessary
   * to launch defaults are supplied if not provided. The value '@null' will set the map value to null.
   * 
   * @return a map containing the initial properties
   */
  @Override
  protected Map buildInitialPropertyMap()
  {
    Map initialPropertyMap = new HashMap();
    Properties launchProperties = loadProperties(resourceBase + LAUNCH_INI);
    for (Iterator it = launchProperties.entrySet().iterator(); it.hasNext();)
    {
      Map.Entry entry = (Map.Entry) it.next();
      String key = (String) entry.getKey();
      String value = (String) entry.getValue();
      if (key.endsWith("*")) { //$NON-NLS-1$
        if (value.equals(NULL_IDENTIFIER))
        {
          clearPrefixedSystemProperties(key.substring(0, key.length() - 1), initialPropertyMap);
        }
      }
      else if (value.equals(NULL_IDENTIFIER))
        initialPropertyMap.put(key, null);
      else
        initialPropertyMap.put(entry.getKey(), entry.getValue());
    }

    try
    {
      // install.area if not specified
      if (initialPropertyMap.get(OSGI_INSTALL_AREA) == null)
        initialPropertyMap.put(OSGI_INSTALL_AREA, getResourceFile("/").toURL().toExternalForm());

      // configuration.area if not specified
      if (initialPropertyMap.get(OSGI_CONFIGURATION_AREA) == null)
      {
        File configurationDirectory = new File(platformDirectory, "configuration"); //$NON-NLS-1$
        if (!configurationDirectory.exists())
        {
          configurationDirectory.mkdirs();
        }
        initialPropertyMap.put(OSGI_CONFIGURATION_AREA, configurationDirectory.toURL().toExternalForm());
      }

      // instance.area if not specified
      if (initialPropertyMap.get(OSGI_INSTANCE_AREA) == null)
      {
        File workspaceDirectory = new File(platformDirectory, "workspace"); //$NON-NLS-1$
        if (!workspaceDirectory.exists())
        {
          workspaceDirectory.mkdirs();
        }
        initialPropertyMap.put(OSGI_INSTANCE_AREA, workspaceDirectory.toURL().toExternalForm());
      }

      // osgi.framework if not specified
      if (initialPropertyMap.get(OSGI_FRAMEWORK) == null)
      {
        // search for osgi.framework in osgi.install.area
        String installArea = (String) initialPropertyMap.get(OSGI_INSTALL_AREA);

        // only support file type URLs for install area
        if (installArea.startsWith(FILE_SCHEME))
          installArea = installArea.substring(FILE_SCHEME.length());

        String path = new File(installArea, "plugins").toString(); //$NON-NLS-1$
        path = searchFor(FRAMEWORK_BUNDLE_NAME, path);
        if (path == null)
          throw new RuntimeException("Could not find framework"); //$NON-NLS-1$

        initialPropertyMap.put(OSGI_FRAMEWORK, new File(path).toURL().toExternalForm());
      }
    }
    catch (MalformedURLException e)
    {
      throw new RuntimeException("Error establishing location"); //$NON-NLS-1$
    }

    return initialPropertyMap;
  }

  protected File getResourceFile(String path)
  {
    return new File(context.getRealPath(resourceBase + path));
  }

  protected void copyIfNewer(File sourceConfigIni, File configIni)
  {
    if (configIni.lastModified() < sourceConfigIni.lastModified() || configIni.length() != sourceConfigIni.length())
    {
      configIni.delete();
      copyResource(resourceBase + CONFIG_INI, configIni);
    }
  }

  protected void generateBundleInfo(List<File> searchDirectories, AtomicBoolean forceDevelopment)
  {
    File bundlesInfo = new File(getPlatformDirectory(), BUNDLES_INFO);
    File configDir = bundlesInfo.getParentFile();
    configDir.mkdirs();
    if (!configDir.isDirectory())
      throw new IllegalStateException("Configuration directory could not be created '" + configDir + "'.");
    List<BundleInfo> bundles = new ArrayList<BundleInfo>();
    try
    {
      bundles = SimpleConfiguratorUtils
          .readConfiguration(getResourceFile(BUNDLES_TEMPLATE).toURI().toURL(), getPlatformDirectory().toURI());
    }
    catch (MalformedURLException e)
    {
      throw new IllegalStateException(e);
    }
    catch (IOException e)
    {
      throw new IllegalStateException("Unable to read the bundle configuration file", e);
    }

    Set<String> excludedBundles = new HashSet<String>();
    Map<String, BundleInfo> installBundles = new HashMap<String, BundleInfo>();
    for (BundleInfo bundle : bundles)
      installBundles.put(bundle.getSymbolicName(), bundle);

    Set<File> searchedDirectories = new HashSet<File>();
    while (!searchDirectories.isEmpty())
    {
      File searchDirectory = searchDirectories.remove(0);
      if (searchedDirectories.contains(searchDirectory))
      {
        if (log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "searchDirectories", "Directory referenced multiple times {0}",
              searchDirectory);
        continue;
      }
      searchedDirectories.add(searchDirectory);
      if (searchedDirectories.size() > LIMIT_TOTAL_SEARCH_DIRECTORIES)
        throw new UnsupportedOperationException("Too many search directories ("+LIMIT_TOTAL_SEARCH_DIRECTORIES+"), possible infinite recursion");
      
      searchForBundles(searchDirectory, installBundles, searchDirectories, excludedBundles, forceDevelopment);
    }

    List<BundleInfo> sortedBundles = filterBundleList(installBundles, excludedBundles);

    OutputStream os = null;
    try
    {
      os = new FileOutputStream(bundlesInfo);
      SimpleConfiguratorUtils.writeConfiguration(sortedBundles, os);
    }
    catch (IOException e)
    {
      throw new IllegalStateException("Unable to write an updated bundle configuration file", e);
    }
    finally
    {
      closeQuietly(os);
    }
  }

  protected List<BundleInfo> filterBundleList(Map<String, BundleInfo> bundles, Set<String> excludedBundles)
  {
    List<BundleInfo> sortedBundles = new ArrayList<BundleInfo>(bundles.values());
    Collections.sort(sortedBundles, new Comparator<BundleInfo>()
    {
      public int compare(BundleInfo object1, BundleInfo object2)
      {
        return object1.getSymbolicName().compareTo(object2.getSymbolicName());
      }
    });

    for (Iterator<BundleInfo> iter = sortedBundles.iterator(); iter.hasNext();)
    {
      BundleInfo bundle = iter.next();
      if (excludedBundles.contains(bundle.getSymbolicName()))
      {
        if (log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "searchDirectories", "Bundle {0} has been excluded by a .link file",
              bundle.getSymbolicName());
        iter.remove();
      }
      else if (bundle.getVersion().trim().length() == 0)
      {
        if (log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "searchDirectories", "Bundle {0} has no version assigned",
              bundle.getSymbolicName());
        iter.remove();
      }
      else if (bundle.getVersion().trim().length() == 0)
      {
        if (log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "searchDirectories", "Bundle {0} has no location assigned",
              bundle.getLocation());
        iter.remove();
      }
      else if (bundle.getSymbolicName().endsWith(".source"))
      {
        if (log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "searchDirectories", "Bundle {0} is a source bundle",
              bundle.getLocation());
        iter.remove();
      }
      else
      {
        if (log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "searchDirectories", "Found bundle {0}_{1} at {2}",
              new Object[] { bundle.getSymbolicName(), bundle.getVersion(), bundle.getLocation() });
      }
    }

    return sortedBundles;
  }

  private static Pattern VERSION_IDENTIFIER = Pattern.compile("[_\\-](\\d+)\\.(\\d+)\\.(\\d+)(\\.([\\d\\w\\-]+))?$");
  
  protected void searchForBundles(File directory, Map<String, BundleInfo> bundles, Collection<File> searchDirectories,
      Set<String> excludedBundles, AtomicBoolean forceDevelopment)
  {
    for (File file : directory.listFiles())
    {
      String candidateName = file.getName();
      URI location = file.toURI();
      boolean isDirectory = file.isDirectory();
      if (isDirectory)
      {
      }
      else
      {
        String lowerCaseName = candidateName.toLowerCase(Locale.ENGLISH);
        if (lowerCaseName.endsWith(JAR_EXTENSION))
          candidateName = candidateName.substring(0, candidateName.length() - 4);
        else if (lowerCaseName.endsWith(LINK_EXTENSION))
        {
          List<File> additionalDirectories = processLinkFile(file, excludedBundles, forceDevelopment);
          if (log.isLoggable(Level.FINE))
            for (File dir : additionalDirectories)
              log.logp(Level.FINE, FrameworkLauncher.class.getName(), "searchDirectories", "Adding directory {0} to search", dir);

          searchDirectories.addAll(additionalDirectories);
          continue;
        }
        else
          continue;
      }

      String symbolicName = null;
      String version = "";
      
      Matcher m = VERSION_IDENTIFIER.matcher(candidateName);
      if (m.find() && m.start() > 0) 
      {
        version = m.group(0).substring(1);
        symbolicName = candidateName.substring(0, m.start());
      }
      else
        symbolicName = candidateName;
      
//      int firstUnderscore = candidateName.indexOf('_');
//      int firstDash = candidateName.indexOf('-');
//      int versionSep = (firstUnderscore != -1) ? ((firstDash == -1 || firstUnderscore < firstDash) ? firstUnderscore : firstDash)
//          : firstUnderscore;
//      if (versionSep != -1)
//      {
//        symbolicName = candidateName.substring(0, versionSep);
//        version = candidateName.substring(versionSep + 1);
//      }
//      else
//        symbolicName = candidateName;

      InputStream is = null;
      try
      {
        is = new FileInputStream(new File(file, "META-INF/MANIFEST.MF"));
        if (isDirectory)
        {
          Attributes attr = new Manifest(is).getMainAttributes();
          
          if (version.length() == 0)
            version = attr.getValue("Bundle-Version");
          
          String newSymbolicName = attr.getValue("Bundle-SymbolicName");
          if (newSymbolicName != null)
          {
            int firstQualifier = newSymbolicName.indexOf(";");
            if (firstQualifier != -1)
              newSymbolicName = newSymbolicName.substring(0, firstQualifier).trim();
            symbolicName = newSymbolicName;
          }
        }
      }
      catch (FileNotFoundException e)
      {
      }
      catch (IOException e)
      {
        log.logp(Level.WARNING, FrameworkLauncher.class.getName(), "readLinkedDirectories",
            "Unable to read the bundle-version or bundle-symbolicname from the manifest for bundle " + file + ".  The bundle will not be loaded.", e);
      }
      finally
      {
        closeQuietly(is);
      }

      BundleInfo bundle = bundles.get(symbolicName);
      if (bundle == null)
      {
        bundle = new BundleInfo(symbolicName, version, location, 4, true);
        bundles.put(symbolicName, bundle);
      }
      else
        bundle.updateIfNewer(version, location);
    }
  }

  private void closeQuietly(InputStream is)
  {
    try
    {
      if (is != null)
        is.close();
    }
    catch (IOException e)
    {
    }
  }

  private void closeQuietly(OutputStream os)
  {
    try
    {
      if (os != null)
        os.close();
    }
    catch (IOException e)
    {
    }
  }

  private void closeQuietly(Reader r)
  {
    try
    {
      if (r != null)
        r.close();
    }
    catch (IOException e)
    {
    }
  }

  protected List<File> processLinkFile(File linkFile, Set<String> excludedBundles, AtomicBoolean forceDevelopment)
  {
    List<File> directories = Collections.emptyList();

    BufferedReader r = null;
    try
    {
      r = new BufferedReader(new FileReader(linkFile));
      for (String line = r.readLine(); line != null; line = r.readLine())
      {
        line = line.trim();

        if (line.startsWith("#exclude="))
        {
          String directive = line.substring("#exclude=".length());
          String[] bundles = directive.split(",");
          for (String bundle : bundles)
            excludedBundles.add(bundle.trim());
          continue;
        }
        if ("#development".equals(line))
        {
          forceDevelopment.set(true);
          continue;
        }
        
        // strip comments
        int indexOf = line.indexOf('#');
        if (indexOf != -1)
          line = line.substring(0, indexOf).trim();
        
        // ignore empty lines
        if (line.length() == 0)
          continue;        
        
        File link = new File(line);
        if (!link.isAbsolute())
          link = new File(linkFile.getParentFile(), line).getCanonicalFile();
        if (link.isDirectory())
        {
          if (directories.isEmpty())
            directories = new ArrayList<File>();
          directories.add(link);
        }
        else if (link.exists() && log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "readLinkedDirectories",
              "The path {0} in link file {1} points to a file, not a directory.", new Object[] { link, linkFile });
        else if (log.isLoggable(Level.FINE))
          log.logp(Level.FINE, FrameworkLauncher.class.getName(), "readLinkedDirectories", "The path {0} in link file {1} does not exist.",
              new Object[] { link, linkFile });
      }
    }
    catch (FileNotFoundException e)
    {
    }
    catch (IOException e)
    {
      log.logp(Level.WARNING, FrameworkLauncher.class.getName(), "readLinkedDirectories", "Unable to read from the link file " + linkFile
          + ".", e);
    }
    finally
    {
      closeQuietly(r);
    }
    return directories;
  }

  protected File expandVariableToFile(String name)
  {
    String value = expandWebSphereVariable(name);
    return (value != null) ? new File(value) : null;
  }

  protected File expandVariableToFile(String name, String path)
  {
    String value = expandWebSphereVariable(name);
    return (value != null) ? new File(value, path) : null;
  }

  protected String expandWebSphereVariable(String name)
  {
    String retVal = null;
    try
    {
      AdminService adminService = AdminServiceFactory.getAdminService();
      ObjectName queryName = new ObjectName("WebSphere:*,type=AdminOperations");
      Set objs = adminService.queryNames(queryName, null);
      if (!objs.isEmpty())
      {
        ObjectName thisObj = (ObjectName) objs.iterator().next();
        String opName = "expandVariable";
        String signature[] = { "java.lang.String" };
        String params[] = { "${" + name + "}" };
        retVal = (String) adminService.invoke(thisObj, opName, params, signature);
        if (retVal == null || retVal.trim().length() == 0)
          retVal = null;
      }
    }
    catch (MalformedObjectNameException e)
    {
      log.logp(Level.FINE, FrameworkLauncher.class.getName(), "expandWebSphereVariable", "Unable to expand variable", e);
    }
    catch (InstanceNotFoundException e)
    {
      log.logp(Level.FINE, FrameworkLauncher.class.getName(), "expandWebSphereVariable", "Unable to expand variable", e);
    }
    catch (MBeanException e)
    {
      log.logp(Level.FINE, FrameworkLauncher.class.getName(), "expandWebSphereVariable", "Unable to expand variable", e);
    }
    catch (ReflectionException e)
    {
      log.logp(Level.FINE, FrameworkLauncher.class.getName(), "expandWebSphereVariable", "Unable to expand variable", e);
    }
    return retVal;
  }
}
