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

package net.jazz.ajax.internal;

import java.util.Dictionary;
import java.util.Hashtable;

import org.eclipse.core.runtime.Plugin;
import org.eclipse.osgi.service.urlconversion.URLConverter;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;

import net.jazz.ajax.internal.util.Cache;

public class Activator extends Plugin {

	static Activator instance;
	ServiceRegistration urlConverter;
	
	public void start(final BundleContext context) throws Exception {
		instance = this;
		super.start(context);
		Dictionary props = new Hashtable();
		props.put("protocol", "portablebundleresource");
		urlConverter = context.registerService(URLConverter.class.getName(), new BundleResourceURLConverter(), props);
	}
	
	public void stop(BundleContext context) throws Exception {
		if (urlConverter != null)
			urlConverter.unregister();
		instance = null;
		Cache.terminat();
		super.stop(context);
	}
	
	public static Activator instance() {
		return instance;
	}
}
