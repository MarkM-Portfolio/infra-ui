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
 * Note to U.S. Government Users Restricted Rights:  
 * Use, duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp. 
 *******************************************************************************/
package net.jazz.ajax.internal;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.util.tracker.ServiceTracker;
import org.osgi.util.tracker.ServiceTrackerCustomizer;

public class ServiceManager
{
	private static final Log LOG = LogFactory.getLog(ServiceManager.class);

	private final BundleContext        context;
	private final List<ServiceTracker> trackers = new ArrayList<ServiceTracker>();
	
	public ServiceManager(BundleContext context){
		this.context = context;
	}

	public void close(){
		for (ServiceTracker tracker : trackers)	{
			tracker.close();
		}
		trackers.clear();
	}

	public <T> void addService(Class<T> C, ITracker<T> tracker){
		addService(C.getName(), tracker);
	}

	
	public <T> void addService(String name, ITracker<T> tracker){
		TrackerCustomizer<T> customizer = new TrackerCustomizer<T>(tracker, name);
		ServiceTracker servicetracker = new ServiceTracker(context, name, customizer);
		servicetracker.open();
		trackers.add(servicetracker);
	}
	
	
	public static interface ITracker<T>
	{
		void added(T service);
		void removed(T service);
	}
	
	private class  TrackerCustomizer<T> implements ServiceTrackerCustomizer {
		private final ITracker<T> tracker;
		private final String name;
		private T service = null;
		
		TrackerCustomizer(ITracker<T> tracker, String name){
			this.tracker 	= tracker;
			this.name 		= name;
			LOG.debug("Tracking service: "+name); //$NON-NLS-1$
		}
		
		@SuppressWarnings("unchecked")
		public T addingService(ServiceReference reference) {
			T service = (T)context.getService(reference);
			
			/*
			 * we only want one
			 */
			if (this.service == null)
			{
				this.service = service;
				tracker.added(service);
				LOG.debug("Service added: "+name); //$NON-NLS-1$
			}
			
			return service;
		}
		
		public void modifiedService(ServiceReference arg0, Object arg1) {
			// No-op
		}
		
		@SuppressWarnings("unchecked")
		public void removedService(ServiceReference reference, Object service) {
			if (this.service != service)
			{
				tracker.removed((T)service);
				this.service = null;
				LOG.debug("Service removed: "+name); //$NON-NLS-1$
			}
		}
	};

}
