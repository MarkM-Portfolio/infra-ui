/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.model;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.osgi.framework.Bundle;

public abstract class AbstractGeneratedDojoMessageBundle extends Resource {

	public static enum Level {NONE, ONE, ALL};

	protected static final Locale DEFAULT_LOCALE = new Locale("");

	protected final String webBundle;

	protected final Bundle osgiBundle;

	protected final Level level;

	final Map<Locale, AbstractLocalizedContent> cache = Collections
			.synchronizedMap(new HashMap<Locale, AbstractLocalizedContent>());

	public AbstractGeneratedDojoMessageBundle(String webBundle, String id,
			Bundle osgiBundle, Level multiLevel) {
		super(DojoMessageBundle.TYPE, id);
		this.webBundle = webBundle;
		this.osgiBundle = osgiBundle;
		this.level = multiLevel;
	}

	public String getFullPath() {
		String result = webBundle + '/';
		result += getId().substring(result.length());
		return result;
	}

	@Override
	public void getState(RenderContext context, State state) {
		getClosestContentForLocale(context.locale).getState(state);
	}

	@Override
	public boolean internalRefresh(RenderContext context) {
		AbstractLocalizedContent content = getClosestContentForLocale(context.locale);
		return content.internalRefresh();
	}

	@Override
	public void write(Appendable output, RenderContext context)
			throws IOException {
		getClosestContentForLocale(context.locale).write(output, context);
	}

	public AbstractLocalizedContent getClosestContentForLocale(Locale locale) {
		Locale closestLocale = getClosestLocaleForContent(locale);
		AbstractLocalizedContent content = cache.get(closestLocale);
		if (content == null) {
			content = createContent(closestLocale);
			cache.put(closestLocale, content);
		}
		return content;
	}

	abstract protected AbstractLocalizedContent createContent(Locale locale);

	abstract public boolean hasContentForLocale(Locale locale);

	protected Locale getClosestLocaleForContent(Locale locale) {
		Locale newLocale = locale;
		if (newLocale.getVariant().length() > 0) {
			if (hasContentForLocale(newLocale))
				return newLocale;
			newLocale = new Locale(locale.getLanguage(), locale.getCountry());
		}
		if (newLocale.getCountry().length() > 0) {
			if (hasContentForLocale(newLocale))
				return newLocale;
			newLocale = new Locale(locale.getLanguage());
		}
		if (hasContentForLocale(newLocale))
			return newLocale;
		
		if (newLocale.getLanguage().equalsIgnoreCase("nb")) {
			Locale replacedLocale = new Locale("no");
			if (hasContentForLocale(replacedLocale))
				return newLocale;
		}
		
		newLocale = DEFAULT_LOCALE;
		if (hasContentForLocale(newLocale))
			return newLocale;
		return null;
	}

	protected abstract class AbstractLocalizedContent {
		protected volatile String content;

		protected final String localeModule;

		protected AbstractLocalizedContent(Locale locale) {
			if (locale != null) {
				// ADDED
				String language = locale.getLanguage();
				String country = locale.getCountry().toLowerCase(Locale.ENGLISH);

				// For "he": modify Java locale settings to match Dojo settings. We can not make it in RenderContext.java as java will internally convert "he" to "iw" when new Locale().
				if ("iw".equals(language))
					language = "he";
				else if ("in".equals(language))
					language = "id";
				else if ("sr_latn".equals(language))
					language = "sr";
				
				if (country.length() > 0) {
					localeModule = getId() + '.' + language + '_' + country;
				}
				else if (language.length() > 0)
					localeModule = getId() + '.' + language;
				else
					localeModule = getId() + ".ROOT";
			}
			else
				localeModule = getId() + ".ROOT";
		}

		abstract protected boolean internalRefresh();

		abstract protected void getState(State state);

		public String getContent() throws IOException {
			if (content != null)
				return content;
			StringWriter writer = new StringWriter();
			writer.write("dojo.provide(\"" + getId() + "\")._built=true;\n");  //$NON-NLS-1$//$NON-NLS-2$
			writer.write("dojo.provide(\"" + localeModule + "\");\n"); //$NON-NLS-1$ //$NON-NLS-2$
			writer.write(localeModule + "="); //$NON-NLS-1$
			serialize(writer);
			writer.write(";\n"); //$NON-NLS-1$
			return content = writer.toString();
		}

		abstract protected void serialize(Writer writer) throws IOException;

		protected void write(Appendable output, RenderContext context) throws IOException {
			output.append(getContent());
		}
	}

	protected class EmptyLocalizedContent extends AbstractLocalizedContent {
		public EmptyLocalizedContent(Locale locale) {
			super(locale);
		}

		protected void serialize(Writer writer) throws IOException {
			writer.write("{}");
		}

		protected boolean internalRefresh() {
			return false;
		}

		protected void getState(State state) {
		}
	};
}