/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
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

package net.jazz.ajax.internal.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.osgi.framework.ServiceReference;
import org.osgi.util.tracker.ServiceTracker;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.ResourceOverride;

public class OSGiServices {
	
	static final Object LOCK = new Object();
	static final Map<Class, Object> services = new HashMap();
	static final Map<Class<?>, Tracker> trackers = new HashMap();
	static final Map<Class<?>, List> runners = new HashMap();
	
	// CHANGED:
	public static <TService> void runWithService(Class<TService> service, Runner<TService> runner) {
		TService instance;
		int i = 0;
		if (service.getClass().equals(ResourceOverride.class))
			i = 1;
		synchronized (LOCK) {
			List<Runner<TService>> r = runners.get(service);
			if (r == null) {
				r = new ArrayList<Runner<TService>>();
				r.add(runner);
			} else
				r.add(runner);
			runners.put(service, r);
			instance = (TService) services.get(service);
			if (instance == null) {
				Tracker<TService> tracker = trackers.get(service);
				if (tracker == null) {
					tracker = new Tracker(service);
					tracker.open();
					instance = tracker.getService();
				}
				if (instance == null) {
//					tracker.queue.add(runner);
//					trackers.put(service, tracker);
					return;
				}
			}
		}
		runWithService(instance, runner);
	}
	
	static <TService> void runWithService(TService instance, Runner<TService> runner) {
		try {
			runner.run(instance);
		} catch (Exception e) {
			runner.handleException(e);
		}
	}
	
	static <TService> void shutdownWithService(Object instance, Runner<TService> runner) {
		try {
			runner.shutdown();
		} catch (Exception e) {
			runner.handleException(e);
		}
	}

	
	static class Tracker<TService> extends ServiceTracker {
		
		List<Runner<TService>> queue = new ArrayList();
		final Class<TService> service;
		
		Tracker(Class<TService> service) {
			super(AjaxFramework.bundleContext(), service.getName(), null);
			this.service = service;
		}
		
		@Override
		public Object addingService(ServiceReference reference) {
			TService instance = (TService)super.addingService(reference);
			synchronized (LOCK) {
				services.put(service, instance);
//				trackers.remove(service);
//				for (Runner<TService> runner : queue)
//					runWithService(instance, runner);
//				queue.clear();
				List<Runner<TService>> list = runners.get(service);
				for (Runner<TService> runner : list)
					if (runner != null)
						runWithService((TService)instance, runner);
			}
			return instance;
		}
		
		// ADDED
		@Override
		public void modifiedService(ServiceReference reference, Object instance) {
			super.modifiedService(reference, instance);
//			synchronized (LOCK) {
//				services.put(service, instance);
//				List<Runner<TService>> list = runners.get(service);
//				for (Runner<TService> runner : list)
//					if (runner != null)
//						runWithService((TService)instance, runner);
//			}
		}
		
		// ADDED
		@Override
		public void removedService(ServiceReference reference, Object instance) {
			super.removedService(reference, instance);
			synchronized (LOCK) {
				services.remove(service);
				List<Runner<TService>> list = runners.get(service);
				for (Runner<TService> runner : list)
					if (runner != null)
						shutdownWithService(instance, runner);
			}
		}
		
		public TService getService() {
			return (TService) super.getService();
		}
		
	}
	
	public static abstract class Runner<TService> {
		public abstract void run(TService service) throws Exception;
		// ADDED:
		public abstract void shutdown() throws Exception;
		public void handleException(Exception e) {
			AjaxFramework.log(e);
		}
	}

}
