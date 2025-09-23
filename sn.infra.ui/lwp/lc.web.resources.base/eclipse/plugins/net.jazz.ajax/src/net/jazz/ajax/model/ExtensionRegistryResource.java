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

package net.jazz.ajax.model;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionPoint;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.IRegistryEventListener;

import com.ibm.sistdase.json.JSONSerializer;
import com.ibm.team.jfs.app.distributed.DistributedOperationException;
import com.ibm.team.jfs.app.distributed.IDistributedValue;
import com.ibm.team.jfs.app.distributed.LongValueSerializer;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.TraceSupport;

public class ExtensionRegistryResource extends Resource {
	
	static final TraceSupport LOG = TraceSupport.create("net.jazz.ajax.service/model.ExtensionRegistryResource");
	static volatile ExtensionRegistryResource instance;
	Map<Locale, CharSequence> cache = new HashMap();
	IDistributedValue<Long, DistributedOperationException> lastModified;
	Long lastModifiedCached;
	
	ExtensionRegistryResource() {
		super(JavaScriptResource.TYPE, "net.jazz.ajax._extensionRegistryData");
		instance = this;
	}
	
	synchronized void clear() {
		if (cache.isEmpty())
			return;
		cache.clear();
		if (lastModifiedCached != null) {
			try {
				lastModified.compareAndSet(lastModifiedCached, null);
			} catch (DistributedOperationException e) {
				LOG.error(e, "Unable to clear the lastModified timestamp");
			}
			lastModifiedCached = null;
		}
	}
	
	synchronized long getLastModified() {
		if (lastModifiedCached == null) {
			try {
				if (lastModified == null)
					lastModified = AjaxFramework.getDistributedDataService()
							.getValueHolder(ExtensionRegistryResource.class.getName() + ".lastModified", new LongValueSerializer());
				lastModified.compareAndSet(null, System.currentTimeMillis()); //set Pessimistically
				lastModifiedCached = lastModified.get();
			} catch (DistributedOperationException e) {
				throw new RuntimeException("Error accessing distributed data", e);
			}
		}
		return lastModifiedCached;
	}
	
	@Override
	public void getState(RenderContext context, State state) {
		state.merge(getLastModified());
	}
	
	synchronized CharSequence getRegistry(Locale locale) throws IOException {
		CharSequence result = cache.get(locale);
		if (result != null)
			return result;
		StringWriter writer = new StringWriter();
		Map<IExtensionPoint, Object> map = new HashMap();
		for (WebBundle bundle : WebBundle.ID_MAP.values())
			bundle.internalContributeExtensionPoints(map, locale);
		List list = new ArrayList();
		for (Object entry : map.values())
			list.add(entry);
		writer.append("net.jazz.ajax._extensionRegistryData = ");
		JSONSerializer.serialize(writer, Collections.singletonMap("extensionPoints", list), false);
		//TODO remove this once the javascript code is no longer looking for it
		writer.append(";\nnet.jazz.ajax._translationVarData = {};\n");
		cache.put(locale, result = writer.toString());
		return result;
	}
	
	public void write(Appendable output, RenderContext context) throws IOException {
		output.append(getRegistry(context.locale));
	}
	
	static void dirty() {
		if (instance != null)
			instance.clear();
	}
	
	public static void hook(IExtensionRegistry registry) {
		registry.addListener(new IRegistryEventListener() {
			public void removed(IExtensionPoint[] extensionPoints) {
				ExtensionRegistryResource.dirty();
			}
			public void removed(IExtension[] extensions) {
				ExtensionRegistryResource.dirty();
			}
			public void added(IExtensionPoint[] extensionPoints) {
				ExtensionRegistryResource.dirty();
			}
			public void added(IExtension[] extensions) {
				ExtensionRegistryResource.dirty();
			}
		});
	}

	public static synchronized Resource internalInstance() {
		return new ExtensionRegistryResource();
	}

}
