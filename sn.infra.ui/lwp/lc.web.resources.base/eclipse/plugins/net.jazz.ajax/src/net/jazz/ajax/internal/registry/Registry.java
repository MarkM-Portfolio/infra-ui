/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
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

package net.jazz.ajax.internal.registry;

import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.xml.parsers.SAXParserFactory;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.runtime.RegistryFactory;
import org.eclipse.core.runtime.spi.RegistryContributor;
import org.eclipse.core.runtime.spi.RegistryStrategy;
import org.osgi.framework.Bundle;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.TraceSupport;

public class Registry {
	
	static final TraceSupport LOGGER = TraceSupport.create(Registry.class.getName());
	static final IExtensionRegistry EXTENSION_REGISTRY = RegistryFactory
			.createRegistry(new ClientLocalizingRegistryStrategy(), null, null);
	
	public static IExtensionRegistry instance() {
		return EXTENSION_REGISTRY;
	}
	
	public static String translate(IConfigurationElement element, String value, Locale locale) {
		if (value == null || !value.startsWith("%"))
			return value;
		value = value.substring(1);

		IConfigurationElement parent = element;
		while (parent.getParent() instanceof IConfigurationElement)
			parent = (IConfigurationElement) parent.getParent();
		IExtension extension = (IExtension) parent.getParent();
		Bundle bundle = Platform.getBundle(extension.getNamespaceIdentifier());
		try {
			return AjaxFramework.bundleLocalization().getLocalization(bundle, locale.toString()).getString(value);
		} catch (Exception e) {
			LOGGER.error("Unable to translate \"", value,
					"\" in bundle: \"", bundle.getSymbolicName() + "\"");
			return "%" + value;
		}
	}
}

class ClientLocalizingRegistryStrategy extends RegistryStrategy {
	private final RegistryStrategy delegate;

	public ClientLocalizingRegistryStrategy() {
		super(null, null);
		delegate = RegistryFactory.createOSGiStrategy(null, null, null);
	}
	public boolean cacheLazyLoading() {
		return delegate.cacheLazyLoading();
	}
	public boolean cacheUse() {
		return delegate.cacheUse();
	}
	public Object createExecutableExtension(RegistryContributor contributor, String className, String overridenContributorName) throws CoreException {
		return delegate.createExecutableExtension(contributor, className, overridenContributorName);
	}
	public boolean debug() {
		return delegate.debug();
	}
	public boolean debugRegistryEvents() {
		return delegate.debugRegistryEvents();
	}
	public long getContainerTimestamp() {
		return delegate.getContainerTimestamp();
	}
	public long getContributionsTimestamp() {
		return delegate.getContributionsTimestamp();
	}
	public SAXParserFactory getXMLParser() {
		return delegate.getXMLParser();
	}
	public void log(IStatus status) {
		delegate.log(status);
	}
	@SuppressWarnings("deprecation")
	public void onStart(IExtensionRegistry registry) {
		delegate.onStart(registry);
	}
	public void onStart(IExtensionRegistry registry, boolean loadedFromCache) {
		delegate.onStart(registry, loadedFromCache);
	}
	public void onStop(IExtensionRegistry registry) {
		delegate.onStop(registry);
	}
	public void scheduleChangeEvent(Object[] listeners, Map deltas, Object registry) {
		delegate.scheduleChangeEvent(listeners, deltas, registry);
	}
	public String translate(String key, ResourceBundle resources) {
		return key;
	}
}