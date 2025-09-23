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

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.internal;

import java.util.Collection;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionPoint;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.IRegistryEventListener;

import net.jazz.ajax.internal.util.MultiValueMap;
import net.jazz.ajax.internal.util.TraceSupport;

/**
 * Utility class for processing all Extensions contributed to a single Extension Point.  Sub-classes
 * can override methods to process each contributed {@link IExtension}, or each
 * {@link IConfigurationElement} within the extension.  Each processed contribution should be tracked
 * as an <code>TEntry</code> and stored in the {@link #contributions} map.
 * 
 * @param <TEntry> Type used to track each contributed unit
 */
public abstract class ExtensionPointProcessor<TEntry> implements IRegistryEventListener {
	
	public static final TraceSupport LOGGER = TraceSupport.create("net.jazz.ajax/ExtensionRegistry");
	
	/**
	 * Used to track the contributions from each extension.
	 */
	protected final MultiValueMap<IExtension, TEntry, Collection<TEntry>> contributions = new MultiValueMap();

	final String extensionPoint;
	
	public ExtensionPointProcessor(IExtensionRegistry registry, String extensionPoint) {
		this.extensionPoint = extensionPoint;
		registry.addListener(this, extensionPoint);
		IExtensionPoint point = registry.getExtensionPoint(extensionPoint);
		Assert.isNotNull(point);
		added(point.getExtensions());
		startup();
	}
	
	public final synchronized void added(IExtension[] extensions) {
		for (IExtension extension : extensions)
			try {
				if (LOGGER.isTracing())
					LOGGER.trace("Processing additions to extension point: " + extensionPoint + " from " + extension.getNamespaceIdentifier());
				addExtension(extension);
			} catch (Exception e) {
				LOGGER.error(e);
			}
	}
	
	protected void addExtension(IExtension extension) {
		for (IConfigurationElement element : extension.getConfigurationElements())
			try {
				addConfigurationElement(element, extension);
			} catch (Exception e) {
				LOGGER.error(e);
			}
	}
	
	protected void addConfigurationElement(IConfigurationElement element, IExtension extension) {}
	
	public final synchronized void removed(IExtension[] extensions) {
		for (IExtension extension : extensions)
			try {
				removeExtension(extension);
			} catch (Exception e) {
				LOGGER.error(e);
			}
	}
	
	protected void removeContribution(TEntry contribution) {}

	protected void removeExtension(IExtension extension) {
		if (contributions.containsKey(extension))
			for (TEntry entry : contributions.get(extension))
				removeContribution(entry);
	}
	
	/**
	 * Called after this processor has finished processing the initial extensions.
	 */
	protected void startup() {}
	
	public final void added(IExtensionPoint[] extensionPoints) {
		//N/A
	}
	
	public final void removed(IExtensionPoint[] extensionPoints) {
		//N/A
	}
}