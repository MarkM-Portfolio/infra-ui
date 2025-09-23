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

package com.ibm.lconn.core.web.resources.nls;

import java.io.IOException;
import java.io.Writer;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.model.AbstractGeneratedDojoMessageBundle;
import net.jazz.ajax.model.GeneratedDojoMessageBundle;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import com.ibm.lconn.core.customization.ApplicationCustomization;
import com.ibm.lconn.core.web.error.ErrorPage;
import com.ibm.lconn.core.web.resources.Activator;
import com.ibm.lconn.core.web.util.resourcebundle.ResourcesConfig;
import com.ibm.sistdase.json.JSONSerializer;

public class MessageBundles extends ResourceProvider
{
  static final TraceSupport LOGGER = TraceSupport.create(MessageBundles.class.getName());

  private static class ExtensionResourcesMessageBundle extends AbstractGeneratedDojoMessageBundle
  {
    private Map<String, String> bundles;

    protected final GeneratedDojoMessageBundle defaultResources;

    public ExtensionResourcesMessageBundle(String id)
    {
      super("lconn.core", id, null, Level.NONE); //$NON-NLS-1$
      this.defaultResources = new GeneratedDojoMessageBundle("lconn.core", id, "com/ibm/lconn/widgets/resources/ui_widgets.properties", //$NON-NLS-1$ //$NON-NLS-2$
          Activator.getContext().getBundle(), Level.ONE);
      try
      {
        ResourcesConfig rsConfig = ResourcesConfig.instance();
        bundles = rsConfig.getBundleIdMap();
      }
      catch (Throwable t)
      {
        LOGGER.error(t, "Unable to create resources for the extension bundle"); //$NON-NLS-1$
        bundles = Collections.emptyMap();
      }
    }

    @Override
    protected AbstractLocalizedContent createContent(Locale locale)
    {
      if (locale == null)
        return new EmptyLocalizedContent(locale);
      GeneratedDojoMessageBundle.LocalizedContent defaultContent = (GeneratedDojoMessageBundle.LocalizedContent) this.defaultResources
          .getClosestContentForLocale(locale);
      return new LocalizedContent(locale, defaultContent);
    }

    @Override
    public boolean hasContentForLocale(Locale locale)
    {
      if (this.defaultResources.hasContentForLocale(locale))
        return true;

      for (Map.Entry<String, String> entry : bundles.entrySet())
      {
        try
        {
          Locale bundleLocale = getBundleLocale(locale);
          ResourceBundle b = ApplicationCustomization.getInstance().getBundle(entry.getValue(), bundleLocale);
          if (b != null)
          {
            if (bundleLocale.equals(b.getLocale()))
            {
              return true;
            }
          }
          else
          {
            LOGGER.warn("hasContentForLocale Error - locale: " + bundleLocale.toString() + " entryValue: " + entry.getValue()); //$NON-NLS-1$ //$NON-NLS-2$
          }
        }
        catch (MissingResourceException e)
        {
        }
      }
      return false;
    }

    private static Locale getBundleLocale(Locale locale)
    {
      if (locale != null && locale.getLanguage().equalsIgnoreCase("nb")) //$NON-NLS-1$
        return new Locale("no"); //$NON-NLS-1$
      return locale;
    }

    protected class LocalizedContent extends AbstractLocalizedContent
    {
      final Locale locale;

      final GeneratedDojoMessageBundle.LocalizedContent defaultResources;

      public LocalizedContent(Locale locale, GeneratedDojoMessageBundle.LocalizedContent defaultResources)
      {
        super(locale);
        this.locale = locale;
        this.defaultResources = defaultResources;
      }

      @Override
      protected boolean internalRefresh()
      {
        // Not implemented, connections configuration changes require restart
        return false;
      }

      @Override
      protected void getState(State state)
      {
        // Not implemented, connections configuration changes require restart
      }

      @Override
      protected void serialize(Writer writer) throws IOException
      {
        Map<String, Object> output = new HashMap<String, Object>();

        this.defaultResources.putAll(output);

        for (Map.Entry<String, String> entry : bundles.entrySet())
        {
          try
          {
            Locale bundleLocale = getBundleLocale(locale);
            ResourceBundle b = ApplicationCustomization.getInstance().getBundle(entry.getValue(), bundleLocale);
            if (b != null)
            {
              /*
               * FIXME: We are relaxing the constraint that widget bundle resources must match the base locale. This is not a great idea,
               * because it will cause fallback English language resources to be interleaved with localized resources, served and cached
               * within layered content.
               */
//              if (bundleLocale.equals(b.getLocale()))
//              {
                Map<String, String> map = new HashMap<String, String>();
                for (Enumeration<String> e = b.getKeys(); e.hasMoreElements();)
                {
                  String key = e.nextElement();
                  map.put(key, b.getString(key));
                }

                output.put(entry.getKey(), map);
//              }
            }
            else
            {
              LOGGER.warn("serialize Error - locale: " + bundleLocale.toString() + " entryValue: " + entry.getValue());
            }
          }
          catch (Exception e)
          {
            System.out.println("[serialize] exception: " + e);
            ErrorPage.report(e, null);
          }
        }
        JSONSerializer.serialize(writer, output);
      }
    }
  }

  public Resource provide(String id)
  {
    return new ExtensionResourcesMessageBundle(id);
  }
}
