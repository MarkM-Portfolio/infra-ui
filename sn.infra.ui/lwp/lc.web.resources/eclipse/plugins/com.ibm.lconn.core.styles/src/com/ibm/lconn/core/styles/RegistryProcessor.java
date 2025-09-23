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

package com.ibm.lconn.core.styles;

import net.jazz.ajax.model.Binding;
import net.jazz.ajax.model.ExtensionDependency;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.model.StyleSheet;
import net.jazz.ajax.model.WebBundle;

import net.jazz.ajax.internal.ExtensionPointProcessor;

import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.RegistryFactory;

import com.ibm.lconn.core.styles.model.PackagedTheme;
import com.ibm.lconn.core.styles.model.StandardTheme;
import com.ibm.lconn.core.styles.model.Theme;

public class RegistryProcessor
{
  public static void start()
  {
    IExtensionRegistry registry = RegistryFactory.getRegistry();

    new ExtensionPointProcessor<Theme>(registry, "com.ibm.lconn.core.styles.themes")
    {
      @Override
      protected void addExtension(IExtension extension)
      {
        for (IConfigurationElement element : extension.getConfigurationElements())
        {
          if (element.getName().equals("theme"))
          {
            Theme theme = null;
            String id = element.getAttribute("id");
            String resource = element.getAttribute("resource");
            OneUIVersion version = OneUIVersion.fromString(element.getAttribute("version"));
            if (resource != null)
            {
              String rtlResource = element.getAttribute("resource-rtl");
              String applicationPath = element.getAttribute("application-path");
              String bundleId = WebBundle.forBundleId(extension.getNamespaceIdentifier()).getId();

              theme = new PackagedTheme(id, version, makeAbsolute(bundleId, resource), makeAbsolute(bundleId, rtlResource), makeAbsolute(
                  bundleId, applicationPath), bundleId);
            }
            else
            {
              theme = new StandardTheme(id, version);
            }
            theme.register();
            contributions.addValue(extension, theme);
          }
        }
      }

      @Override
      protected void removeContribution(Theme theme)
      {
        theme.unregister();
      }
    };

    // ADDED: CSS bindings
    new ExtensionPointProcessor<Binding>(registry, "com.ibm.lconn.core.styles.cssBinding")
    {
      public void addConfigurationElement(IConfigurationElement element, IExtension extension)
      {
        if (element.getName().equals("cssBinding"))
        {
          String extensionStyleSheetId = ensureCSSExtension(element.getAttribute("bind"));
          String parentStyleSheetId = ensureCSSExtension(element.getAttribute("to"));
          Binding binding = new Binding(new Key(StyleSheet.TYPE, parentStyleSheetId), new ExtensionDependency(StyleSheet.TYPE,
              extensionStyleSheetId));
          contributions.addValue(extension, binding);
          Resource.createBinding(binding.key, binding.dependency);
        }
      }

      private String ensureCSSExtension(String attribute)
      {
        if (!attribute.endsWith(".css"))
          return attribute + ".css";
        return attribute;
      }

      @Override
      protected void removeContribution(Binding binding)
      {
        Resource.deleteBinding(binding.key, binding.dependency);
      }
    };
  }

  private static String makeAbsolute(String bundleId, String path)
  {
    if (path != null && path.startsWith("/"))
      return bundleId + path;
    return path;
  }
}
