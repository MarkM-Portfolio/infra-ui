/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
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
package net.jazz.ajax;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.RegistryFactory;

import net.jazz.ajax.internal.util.MasterTemplate;
import net.jazz.ajax.internal.util.ParameterizedTemplate;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

/**
 * Currently this lazy loads the properties although the spec allows us to load them at startup. 
 *
 */


public class BootstrapProperties extends ResourceProvider
{
	private static final String EXTENSION_BOOSTRAP_PROPERTIES   = "net.jazz.ajax.bootstrapProperties";
	private static final String ATTRIBUTE_CLASS                 = "class";
	private static final String ATTRIBUTE_PRIORITY              = "priority";

	public static final String PROPERTY_FRONTSIDE_URL           = "com.ibm.team.server.frontsideUrl";
	public static final String PROPERTY_DISCOVERYSERVICE_URL    = "com.ibm.team.server.discoveryServiceUrl";
	public static final String PROPERTY_APP_NAME                = "com.ibm.team.server.appName";
	public static final String PROPERTY_APP_IDENTIFIER          = "com.ibm.team.server.appIdentifier";
	public static final String PROPERTY_APP_DESCRIPTION         = "com.ibm.team.server.appDescription";
	public static final String PROPERTY_APP_VERSION             = "com.ibm.team.server.appVersion";
	public static final String PROPERTY_APP_ICON                = "com.ibm.team.server.appIcon";
	
	private static final String DYNAMIC_MODULUE_ID = "net.jazz.ajax.BootstrapProperties";
	private static final int    DEFAULT_PRIORITY   = 0;

	
	private static volatile AbstractBootstrapProperties  iProps = null;
	private static final    Log                          LOG    = LogFactory.getLog(BootstrapProperties.class);
	private static volatile Object                       loadMutex = new Object();
	
	
	public static String getDiscoveryServiceUrl(String contextRoot){
		if (!isLoaded()) load();
		try{
			return iProps.getDiscoveryServiceUrl(contextRoot);
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get discovery service url", t);
		}
		
		return null;
	}

	public static String getDiscoveryServiceUrl(HttpServletRequest request){
		try{ 
			URL url = new URL(request.getScheme(), request.getServerName(), request.getServerPort(), request.getContextPath());
			return getDiscoveryServiceUrl(url.toExternalForm());
		}
		catch (MalformedURLException mue){
			logException("Unable to create URL from request", mue);
			return getDiscoveryServiceUrl();
		} catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get discovery service url", t);
			return getDiscoveryServiceUrl();
		}
	}

	/**
	 * uses the getFrontsideUrl() as the context root for the call to 
	 * getDiscoveryService();
	 * @return
	 */
	// CHANGED
	public static String getDiscoveryServiceUrl(){
		if (!isLoaded()) load();
		try{
			String frontsideURL = getFrontsideUrl();
			if (frontsideURL==null) {
				// ADDED: change debug() to info()
				LOG.info("getDiscoveryServiceUrl : no frontsideUrl");
				return null;
			}
			else{
				return iProps.getDiscoveryServiceUrl(frontsideURL);
			}
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get discovery service url", t);
		}
		
		return null;
	}

	public static String getFrontsideUrl(){
		if (!isLoaded()) load();
		try{
			return iProps.getFrontsideUrl();
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get front side url",t);
		}
		return null;
	}
	
	public static String getApplicationName(Locale locale){
		if (!isLoaded()) load();
		try{
			return iProps.getApplicationName(locale);
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get application name",t);
		}
		return null;
	}

	public static String getApplicationIconUrl(){
		if (!isLoaded()) load();
		try{
			return iProps.getApplicationIconUrl();
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get application icon url",t);
		}
		return null;
	}

	public static String getApplicationDescription(Locale locale){
		if (!isLoaded()) load();
		try{
			return iProps.getApplicationDescription(locale);
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get application description", t);
		}
		return null;
	}

	public static String getApplicationVersion(Locale locale){
		if (!isLoaded()) load();
		try{
			return iProps.getApplicationVersion(locale);
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get application version", t);
		}
		return null;
	}

	public static String getApplicationIdentifier(){
		if (!isLoaded()) load();
		try{
			return iProps.getApplicationIdentifier();
		}catch (ThreadDeath t) {
			throw t;
		}catch (Throwable t) {
			logException("Unable to get application idenitifer", t);

		}
		return null;
	}

	private static boolean isLoaded () {return iProps!=null;}
	
	private static void load(){
		synchronized (loadMutex){
			try{
				if (isLoaded()) return;
				
				IConfigurationElement[] elements = RegistryFactory.getRegistry().getConfigurationElementsFor(EXTENSION_BOOSTRAP_PROPERTIES);

				if (elements.length==0)
				{
					LOG.warn("NO BOOTSTRAP PROPERTIES FOUND");
					LOG.warn("   these must specfified for each application");
					LOG.warn("   see: https://jazz.net/wiki/bin/view/Main/BootStrapProperties");
					LOG.warn("   looking for boostrap properties in system properties.");
					return;
				}
				
				boolean multipleHighest = false;
				int     highestPriority = Integer.MIN_VALUE;
				
				for (int i=0; i<elements.length; i++){
					int priority = getPriority(elements[i]);
					
					if (priority>=highestPriority){
						iProps = (AbstractBootstrapProperties)elements[i].createExecutableExtension(ATTRIBUTE_CLASS);
						multipleHighest = (priority==highestPriority);
						highestPriority = priority;
					}
				}
				
				if (multipleHighest){
					LOG.warn("More than one "+EXTENSION_BOOSTRAP_PROPERTIES+" registered. Choosing an arbitrary extension.");
				}	
				LOG.debug("Boostrap properties: id:"+elements[0].getAttribute("id") + "  class: "+elements[0].getAttribute("class"));
			}catch (ThreadDeath t) {
				throw t;
			}catch (Throwable t) {
				logException("Error loading bootstrap properties", t);
			}finally{
				if (iProps==null)		
					iProps = new AbstractBootstrapProperties() {};
			}
		}
	}
	
	private static int getPriority(IConfigurationElement element){
		try{
			String value = element.getAttribute(ATTRIBUTE_PRIORITY);
			if (value == null) return DEFAULT_PRIORITY;
			return Integer.parseInt(value);
		} catch (RuntimeException re)
		{
			logException("Unable to get application priority", re);
		}
		return DEFAULT_PRIORITY;
	}
	
	// CHANGED
	private static void logException(String message, Throwable t) {
		// ADDED: change debug() to warn() + info()
		LOG.warn(message + ": " + t.getLocalizedMessage()); //$NON-NLS-1$
		LOG.info(message, t);
	}
	
	/**
	 * the following handles the JavaScript version of the bootstrap properties.
	 */
	
	@Override
	public Resource provide(String id) {
		if (!DYNAMIC_MODULUE_ID.equals(id)){
			LOG.error("Attempt to create unknown dynamic module:"+DYNAMIC_MODULUE_ID);
			throw new RuntimeException("Attempt to create unknown dynamic module:"+DYNAMIC_MODULUE_ID);
		}
		return new BootstrapPropertiesModule();
	}

	private static class BootstrapPropertiesModule extends Resource {

		private static final String TEMPLATE_PARAM_FRONTSIDE_URL         = "frontsideUrl";
		private static final String TEMPLATE_PARAM_DISCOVERYSERVICE_URL  = "discoveryServiceUrl";
		private static final String TEMPLATE_PARAM_APP_NAME              = "appName";
		private static final String TEMPLATE_PARAM_APP_IDENTIFIER        = "appIdentifier";
		private static final String TEMPLATE_PARAM_APP_DESCRIPTION       = "appDescription";
		private static final String TEMPLATE_PARAM_APP_VERSION           = "appVersion";

		
		private static final MasterTemplate TEMPLATE = new MasterTemplate(BootstrapPropertiesModule.class.getResourceAsStream("BootstrapPropertiesTemplate.txt"));
		
		public BootstrapPropertiesModule() {
			super(JavaScriptResource.TYPE, DYNAMIC_MODULUE_ID);
		}
		
		@SuppressWarnings("deprecation")
		public void write(Appendable output, RenderContext context) throws IOException {
			ParameterizedTemplate template = TEMPLATE.newInstance();
			
			setParameter(template, TEMPLATE_PARAM_DISCOVERYSERVICE_URL, getDiscoveryServiceUrl(context.request));
			setParameter(template, TEMPLATE_PARAM_FRONTSIDE_URL,        getFrontsideUrl());
			setParameter(template, TEMPLATE_PARAM_APP_NAME,             getApplicationName(context.locale));
			setParameter(template, TEMPLATE_PARAM_APP_IDENTIFIER,       getApplicationIdentifier());
			setParameter(template, TEMPLATE_PARAM_APP_DESCRIPTION,      getApplicationDescription(context.locale));
			setParameter(template, TEMPLATE_PARAM_APP_VERSION,          getApplicationVersion(context.locale));
			
  			output.append(template.getResult());
		}
		
		private static void setParameter(ParameterizedTemplate template, String parameter, String value){
			if (value==null) value = "null";
			else value = "\""+value+"\"";
			template.getParameter(parameter).append(value);
		}
	}
}

