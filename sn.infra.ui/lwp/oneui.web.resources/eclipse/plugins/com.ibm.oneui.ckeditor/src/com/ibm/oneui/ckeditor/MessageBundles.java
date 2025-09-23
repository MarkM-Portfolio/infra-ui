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

package com.ibm.oneui.ckeditor;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.io.Writer;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.internal.util.Util;
import net.jazz.ajax.model.AbstractGeneratedDojoMessageBundle;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

import org.apache.commons.io.IOUtils;
import org.osgi.framework.Bundle;

public class MessageBundles extends ResourceProvider
{

  private static class CKEditorLangBundle extends AbstractGeneratedDojoMessageBundle
  {
    private Map<Locale, URL> messages = new HashMap<Locale, URL>();

    public CKEditorLangBundle(String id)
    {
      super("com.ibm.oneui.ckeditor", id, Activator.getContext().getBundle(), Level.ALL);

      Bundle bundle = Activator.getContext().getBundle();
      Enumeration<URL> entries = bundle.findEntries("resources/editor/lang/", "*.js", false);
      while (entries.hasMoreElements())
      {
        URL entry = entries.nextElement();
        String name = entry.getPath().substring(entry.getPath().lastIndexOf('/') + 1);
        if (!name.startsWith("_"))
        {
          name = name.substring(0, name.length() - 3); // trim extension
          String[] names = name.split("-");
          String language = (names.length > 0) ? names[0] : "";
          String country = (names.length > 1) ? names[1] : "";
          String variant = (names.length > 2) ? names[2] : "";
          Locale locale = new Locale(language, country, variant);
          messages.put(locale, entry);
        }
      }

      if (messages.containsKey(Locale.ENGLISH))
        messages.put(new Locale(""), messages.remove(Locale.ENGLISH));
    }

    @Override
    protected AbstractLocalizedContent createContent(Locale locale)
    {
      return new LocalizedContent(locale);
    }

    @Override
    public boolean hasContentForLocale(Locale locale)
    {
      return messages.containsKey(locale);
    }

    protected class LocalizedContent extends AbstractLocalizedContent
    {
      final URL url;
      long timestamp = 0;

      public LocalizedContent(Locale locale)
      {
        super(locale);
        this.url = messages.get(locale);
      }

      protected boolean internalRefresh()
      {
        try
        {
          long time = 0;
          if (url != null)
            time = url.openConnection().getLastModified();
          if (timestamp != time)
            content = null;
          timestamp = time;
          // FIXME:
          return true;
        }
        catch (IOException e)
        {
          throw new RuntimeException(e);
        }
      }

      public String getContent() throws IOException
      {
        if (content != null)
          return content;
        
        StringWriter sw = new StringWriter();
        sw.write("dojo.provide(\"" + getId() + "\")._built=true;\n");
        sw.write("dojo.provide(\"" + localeModule + "\");\n");
        sw.write("if(typeof CKEDITOR === \"undefined\")CKEDITOR={lang:{}};\n");
        sw.write(localeModule + "=");
        sw.write(JavaScriptUtil.minify(Util.stringBuffer(url.openStream()).toString()));
        content = sw.toString();
        
        return content;
      }

      protected void getState(State state)
      {
        state.merge(timestamp);
      }

      protected void serialize(Writer writer) throws IOException
      {
      }
    }
  }

  public Resource provide(String id)
  {
    return new CKEditorLangBundle(id);
  }
}
