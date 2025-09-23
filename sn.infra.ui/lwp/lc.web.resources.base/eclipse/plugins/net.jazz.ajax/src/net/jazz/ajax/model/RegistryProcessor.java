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


import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.Platform;

import net.jazz.ajax.internal.ExtensionPointProcessor;
import net.jazz.ajax.internal.registry.Registry;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.model.AbstractGeneratedDojoMessageBundle.Level;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.resource.IResourceLoaderStatusHandler;

public class RegistryProcessor {
	
	static final TraceSupport LOGGER = ExtensionPointProcessor.LOGGER;
	
	public static void start() {
		Object token = LOGGER.startBenchmark("Initial Registry Processing");
		IExtensionRegistry registry = Registry.instance();
		
		ExtensionRegistryResource.hook(registry);
		
		new ExtensionPointProcessor<OSGiWebBundle>(registry, "net.jazz.ajax.webBundles") {
			@Override protected void addExtension(IExtension extension) {
				String bundleId = extension.getNamespaceIdentifier();
				String alias = bundleId;
				String resources = null;
				for (IConfigurationElement element : extension.getConfigurationElements()) {
					if (element.getName().equals("alias"))
						alias = element.getAttribute("value");
					else if (element.getName().equals("resource"))
						resources = element.getAttribute("base-name");
				}
				OSGiWebBundle bundle = new OSGiWebBundle(Platform.getBundle(bundleId), alias, resources);
				bundle.register();
				contributions.addValue(extension, bundle);
			}
			@Override
			protected void removeContribution(OSGiWebBundle bundle) {
				bundle.unregister();
			}
			
			protected void startup() {
				BundleScanner.enable();
			}
		};

		new ExtensionPointProcessor<AjaxModule>(registry, "net.jazz.ajax.ajaxModules") {
			protected void addConfigurationElement(IConfigurationElement element, IExtension extension) {
				if (element.getName().equals("ajaxModule")) {
					String id = element.getAttribute("id");
					String alias = element.getAttribute("alias");
					if (alias == null)
						alias = "/_ajax-modules/" + id;
					String widgetClass = element.getAttribute("widgetClass");
					String icon = element.getAttribute("icon");
					if (icon != null)
						icon = WebBundle.forBundleId(extension.getNamespaceIdentifier()).getId() + icon;
					AjaxModule module = new AjaxModule(id, alias, widgetClass, icon);
					contributions.addValue(extension, module);
					module.register();
				}
			}
			@Override
			protected void removeContribution(AjaxModule ajaxModule) {
				ajaxModule.unregister();
			}
		};

		new ExtensionPointProcessor<AjaxApplication>(registry, "net.jazz.ajax.applications") {
			public void addConfigurationElement(IConfigurationElement element, IExtension extension) {
				if (element.getName().equals("application")) {
					String id = element.getAttribute("id");
					String alias = element.getAttribute("alias");
					String widgetClass = element.getAttribute("jsclass");
					String icon = element.getAttribute("icon");
					if (icon != null)
						icon = WebBundle.forBundleId(extension.getNamespaceIdentifier()).getId() + icon;
					Provider<IResourceLoaderStatusHandler> handler = null;
					if (element.getAttribute("statusHandler") != null)
						handler = ExecutableExtension.create(element, "statusHandler");
					if (id == null) {
						id = extension.getUniqueIdentifier();
						LOGGER.warn("net.jazz.ajax.applications: @id attribute not found on <application> element. " +
								"Using the extension's unique identifier as the id: ", id);
					}
					AjaxApplication application = new AjaxApplication(id, alias, widgetClass, icon, handler);
					String priority = element.getAttribute("internalPriority");
					if (priority != null)
						application.internalSetPriority(Integer.parseInt(priority));
					contributions.addValue(extension, application);
					application.register();
				}
			}
			@Override
			protected void removeContribution(AjaxApplication ajaxApplication) {
				ajaxApplication.unregister();
			}
		};

		new ExtensionPointProcessor<AjaxApplicationPage>(registry, "net.jazz.ajax.pages") {
			// CHANGED: set to protected
			protected void addConfigurationElement(IConfigurationElement element, IExtension extension) {
				if (element.getName().equals("page")) {
					String id = element.getAttribute("id");
					AjaxApplicationPage page = new AjaxApplicationPage(id, element);
					contributions.addValue(extension, page);
					page.register();
				}
			}
			@Override
			protected void removeContribution(AjaxApplicationPage page) {
				page.unregister();
			}
		};
		
		new ExtensionPointProcessor(registry, "net.jazz.ajax.applicationPageBindings") {
			protected void addConfigurationElement(IConfigurationElement element, IExtension extension) {
				if(element.getName().equals("application")) {
					String application = element.getAttribute("id");
					for (IConfigurationElement page : element.getChildren("page"))
						AjaxApplication.createPageBinding(application, page.getAttribute("id"));
				}
			}
		};
				
		new ExtensionPointProcessor<Key>(registry, "net.jazz.ajax.dojoModules") {
			protected void addConfigurationElement(IConfigurationElement element, IExtension extension) {
				if (element.getName().equals("dojoModule"))
					for (String id : element.getAttribute("id").split(",")) {
						Key key = new Key(JavaScriptResource.TYPE, id);
						Provider<ResourceProvider> provider = ExecutableExtension.create(element, "provider");
						Resource.PROVIDERS.put(key, provider);
						contributions.addValue(extension, key);
					}
			}
			protected void removeContribution(Key key) {
				//TODO
			}
		};
		
		// ADDED: Dojo resource modules
		new ExtensionPointProcessor<Resource>(registry, "net.jazz.ajax.dojoResourceModules") {
			protected void addConfigurationElement(IConfigurationElement element, IExtension extension) {
				if (element.getName().equals("dojoResourceModule")) {
					String packageName = element.getAttribute("package");
					String name = element.getAttribute("name");
					String fileName = element.getAttribute("file");
					Level nesting = Boolean.parseBoolean(element.getAttribute("nested")) ? Level.ALL : Level.NONE;

					WebBundle webBundle = WebBundle.forBundleId(extension.getNamespaceIdentifier());
					if (!(webBundle instanceof OSGiWebBundle)) {
						LOGGER.error("A WebBundle must be defined in plug-in\"",
								extension.getNamespaceIdentifier(),
								"\" and be an OSGiWebBundle in order to define a Dojo resource module.");
						return;
					}
					
					Resource resource = new GeneratedDojoMessageBundle(packageName, packageName + ".nls." + name, fileName, ((OSGiWebBundle)webBundle).bundle, nesting);
					contributions.addValue(extension, resource);
					resource.register();
				}
			}
			protected void removeContribution(Resource r) {
				r.unregister();
			}
		};

		// ADDED: Module bindings
		new ExtensionPointProcessor<Binding>(registry, "net.jazz.ajax.dojoModuleBinding") {
			public void addConfigurationElement(IConfigurationElement element, IExtension extension) {
				if (element.getName().equals("dojoModuleBinding")) {
					String extensionModuleId = element.getAttribute("bind");
					String parentModuleId = element.getAttribute("to");
					Binding binding = new Binding(
							new Key(DojoModule.TYPE, parentModuleId),
							new ExtensionDependency(DojoModule.TYPE, extensionModuleId));
					contributions.addValue(extension, binding);
					Resource.createBinding(binding.key, binding.dependency);
				}
			}

			@Override
			protected void removeContribution(Binding binding) {
				Resource.deleteBinding(binding.key, binding.dependency);
			}
		};
		
		new ExtensionPointProcessor<Binding>(registry, "net.jazz.ajax.cssBindingSets") {
			// CHANGED: set to protected
			protected void addExtension(IExtension extension) {
				/*
				 * We assume that the WebBundle extensions are processed before
				 * any CSS bindings. If we relax this, we could always fall back
				 * to finding.
				 */
				WebBundle webBundle = WebBundle.forBundleId(extension.getNamespaceIdentifier());
				if (webBundle == null) {
					LOGGER.error("A WebBundle must be defined in plug-in\"",
							extension.getNamespaceIdentifier(),
							"\" in order to define a CSS binding set");
					return;
				}
				String bundleId = webBundle.getId();
				for (IConfigurationElement element : extension.getConfigurationElements()) {
					if (element.getName().equals("cssBindingSet")) {
						String base = element.getAttribute("path");
						if (base == null)
							base = "";
						for (IConfigurationElement commonCSS : element.getChildren("cssCommonModule")) {
							String path = commonCSS.getAttribute("path");
							if (path == null) {
								LOGGER.error("<cssCommonModule> element missing required @path attribute in plug-in: ", extension.getNamespaceIdentifier());
								continue;
							}
							Binding binding = new Binding(
									new Key(JavaScriptResource.TYPE, bundleId + WebBundle.BOOTSTRAP),
									StyleSheet.newDependency(bundleId + base + path, false));
							contributions.addValue(extension, binding);
							Resource.createBinding(binding.key, binding.dependency);
						}
						for (IConfigurationElement cssBinding : element.getChildren("cssBinding")) {
							String jsModule = cssBinding.getAttribute("jsModule");
							if (jsModule == null) {
								LOGGER.error("<cssBinding> element missing required @path attribute in plug-in: ", extension.getNamespaceIdentifier());
								continue;
							}
							Key jsKey = new Key(JavaScriptResource.TYPE, jsModule);
							for (IConfigurationElement cssModule : cssBinding.getChildren("cssModule")) {
								String path = cssModule.getAttribute("path");
								if (path == null)
									path = cssModule.getAttribute("url");
								else
									path = bundleId + base + path;
								if (path == null) {
									LOGGER.error("<cssModule> element missing required @path attribute in plug-in: ", extension.getNamespaceIdentifier());
								} else {
									Binding binding = new Binding(jsKey,
											StyleSheet.newDependency(path, false));
									contributions.addValue(extension, binding);
									Resource.createBinding(binding.key, binding.dependency);
								}									
							}
						}
					}
				}
			}
			protected void removeContribution(Binding binding) {
				Resource.deleteBinding(binding.key, binding.dependency);
			}
		};
		LOGGER.endBenchmark(token);
	}
}

class ExecutableExtension<Type> implements Provider<Type> {
	
	final IConfigurationElement element;
	final String attribute;
	Type result;
	
	public ExecutableExtension(IConfigurationElement element, String attribute) {
		this.element = element;
		this.attribute = attribute;
	}
	
	public static <Type> ExecutableExtension<Type> create(IConfigurationElement element, String attribute) {
		return new ExecutableExtension<Type>(element, attribute);
	}
	
	public synchronized Type get() {
		if (result == null)
			try {
				result = (Type) element.createExecutableExtension(attribute);
			} catch (CoreException e) {
				throw new RuntimeException(e);
			}
		return result;
	}
}

// REMOVED
//class Binding {
//	final Key key;
//	final Dependency dependency;
//	Binding(Key key, Dependency dependency) {
//		this.key = key;
//		this.dependency = dependency;
//	}
//}