/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
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

import java.io.IOException;
import java.lang.InstantiationException;
import java.lang.Runnable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.FutureTask;


public class Cache {
	
	// CHANGED
	static volatile Map<CacheableOperation, CacheableResult<?>> cache;
	
	static final TraceSupport LOGGER;
	static final boolean TRACE;
	static private int MAX_THREADS = 50; // limit the impact of trying to asynchronously analyze size of ResourceGraphs
	static private int threadCount = 0;
	static final ExecutorService executorService = Executors.newCachedThreadPool();
 	
	// Don't cache results greater than 10M
	static final long MAX_CACHE_SIZE = 10*1024*1024;
	
	static {
		// CHANGED
		LOGGER = TraceSupport.create(Cache.class.getName());
		TRACE = LOGGER.isTracing();
		// ADDED
		resizeCapacity(256);
	}
	
	
	// ADDED
	public static void terminat(){
		executorService.shutdownNow();
	}

	
	// ADDED
	@SuppressWarnings("serial")
	public static void resizeCapacity(final int capacity) {
		cache = Collections.synchronizedMap(new LinkedHashMap(capacity * 2,
				0.5f, true) {
			protected boolean removeEldestEntry(Map.Entry eldest) {
				return size() >= capacity;
			}
		});
	}
	
	// ADDED
	public static int getSize() {
		return cache.size();
	}
	
	
	// CHANGED: use the added async addToCache method 
	public static <TResult> CacheableResult<TResult> execute(CacheableOperation<TResult> operation, CacheCondition condition) throws IOException {
		if (condition == null)
			condition = new CacheCondition();
		CacheableResult previous = cache.get(operation);
		CacheableResult<TResult> newResult;

		boolean isConditional = condition.lastModified > 0;
		if (previous != null) {
			if (condition.acceptsFreshness(previous.cacheability)) {
				if (TRACE)
					LOGGER.trace("HIT: ", operation.toString());
				newResult = previous;
			} else {
				if (operation.isStillValid(previous)) {
					if (TRACE)
						LOGGER.trace("HIT-RENEWED: ", operation.toString());
					previous.cacheability.renew();
					newResult = previous;
				} else {
					if (TRACE)
						LOGGER.trace("REVALIDATING: ", operation.toString());
					newResult = operation.getResult(previous.getConditional());
					if (newResult.notModified()) {
						if (TRACE)
							LOGGER.trace("RENEWED: ", operation.toString());
						previous.cacheability.renew(newResult.cacheability);
						newResult = previous;
					} else if (newResult.isCacheable()) {
						if (TRACE)
							LOGGER.trace("UPDATED: ", operation.toString());
						addToCache(operation, newResult);
						//cache.put(operation, newResult);
					} else {
						if (TRACE)
							LOGGER.trace("REMOVED: ", operation.toString());
						cache.remove(operation);
					}
				}
			}
		} else {
			if (TRACE)
				LOGGER.trace("MISS: ", operation.toString());
			newResult = operation.getResult(condition);
		}
		
		if (newResult.isCacheable()) {
			addToCache(operation, newResult);
			//cache.put(operation, newResult);
			if (isConditional && condition.acceptsConditionally(newResult.cacheability))
				newResult = new CacheableResult(newResult.cacheability, null);
		}
		return newResult;
	}


	/**
	 * ADDED: Do the addition to the cache in an async style as the eval of whether it is too big for in-memory caching 
	 * may take too long, e.g. deep graphs for dojo AMD modules
	 */
	public static Future addToCache(final CacheableOperation<?> operation,
			final CacheableResult<?> newResult) {
		FutureTask future = null;
		if (false) {
		//if (Cache.threadCount < Cache.MAX_THREADS) {
			synchronized (Cache.class) {
				Cache.threadCount++;
			}
			future = new FutureTask(new Runnable() {
				public void run() {
					if (isObjectSmallerThan(newResult, MAX_CACHE_SIZE)) {
						cache.put(operation, newResult);
					}
					synchronized (Cache.class) {
						Cache.threadCount--;
					}
					return;
				}}, null);
			executorService.execute(future);
		} else {
			cache.put(operation, newResult);
		}
			
		return future;
	}

    /**
     * ADDED
     * @author Rich Thompson (mailto:richt2@us.ibm.com)
     * Does an estimate on the memory consumed by the supplied Object aborting the evaluation
     * when the supplied limit is reached. There are no defaults for either parameter.
     * Note: This only considers each class once ... under-estimates when two fields use the same class
     * but avoids infinite loops
     */
    public static boolean isObjectSmallerThan(final Object obj, long limit) {
    	ArrayList pendingReview = new ArrayList(100);
    	ArrayList alreadyReviewed = new ArrayList(100);
    	pendingReview.add(obj);
    	long size = 0L;
    	long start = 0L;
    	
    	if (TRACE) 
    		start = (new Date()).getTime();
    	    	
    	// loop while we don't have an answer, haven't taken too long and still have more to examine
    	while ( (size < limit) && (!pendingReview.isEmpty()) ) {
    		Object consider = pendingReview.get(0); // get first element
    		Class clazz = (consider == null ? null : consider.getClass());
    		boolean addToAlreadyReviewed = false;
    		if (consider != null && !alreadyReviewed.contains(consider) && !alreadyReviewed.contains(clazz)) {
    			String cName = clazz.getName();
    			if (cName.startsWith("[L"))
    				cName = cName.substring(2);
    			if (cName.startsWith("java.lang.reflect.") || cName.startsWith("java.lang.annotation.") 
    					|| cName.equals("java.lang.Class") || cName.equals("java.security.Principal") || cName.equals("java.lang.Package")
    					|| cName.startsWith("sun.reflect.") || cName.startsWith("org.eclipse.osgi.") ) {
    				size += 128; // reasonable estimate andt avoids the looping due to walking into certain classes
    				addToAlreadyReviewed = true;
    			} else {
		    		//if (TRACE)
		    		//	LOGGER.trace("size = " + size + "; considering " + cName);
		    		try {
			    		if (clazz.isPrimitive()) {	// reasonable estimate as they likely all round to 8 bytes
			   				size += 8;
			    		} else if (clazz == String.class) {	
			    			String str = (String)consider;
			    			int dblByte = (str.codePointCount(0, str.length()) > 0 ) ? 2 : 1;
			   				size += (dblByte * str.length());
			    		} else if (clazz.isArray()) {
			    			try {
			    				List l = Arrays.asList(consider);
			    				Iterator it = l.iterator();
			    				while (it.hasNext()) {
			    					Object ob = it.next();
			    					if (ob != null && !alreadyReviewed.contains(ob)) {
					    	    	    //LOGGER.trace("Adding " + ob.getClass().getName());
					    	    	    pendingReview.add(ob); // the value of the actual field
			    					}
			    				}
			    			} catch (Exception e) { }
			    		} else if (Class.forName("java.lang.Iterable").isAssignableFrom(clazz)) {	
			    			Iterator it = ((java.lang.Iterable) consider).iterator();
			    			while (it.hasNext()) {
			    				Object ob = it.next();
			    				if (ob != null && !alreadyReviewed.contains(ob)) {
			    					//LOGGER.trace("Adding " + ob.getClass().getName());
			    					pendingReview.add(ob); // the value of the actual field
			    				}
			    			}
			    		} else if (Class.forName("java.util.Map").isAssignableFrom(clazz)) {	
			    			Iterator it = ((java.util.Map) consider).values().iterator();
			    			while (it.hasNext()) {
			    				Object ob = it.next();
			    				if (ob != null && !alreadyReviewed.contains(ob)) {
			    					//LOGGER.trace("Adding " + ob.getClass().getName());
			    					pendingReview.add(ob); // the value of the actual field
			    				}
			    			}
			    		} else {
			    			// assume a 16 byte overhead for the object itself
			    			size += 16;
		    				addToAlreadyReviewed = true;
			    			try { // look for embedded objects
			    				Class[] dc = clazz.getDeclaredClasses();
			    				for (int i=0; i<dc.length; i++) {
			    					Object ob = dc[i];
			    					if (ob != null && !alreadyReviewed.contains(ob)) {
					    	    	    //LOGGER.trace("Adding " + ob.getClass().getName());
					    	    	    pendingReview.add(ob); // the value of the actual field
			    					}
			    				}
			    				Field[] df = clazz.getFields(); // public fields
			    				//if (TRACE)
			    	    		//	LOGGER.trace("Adding " + df.length + " declared fields");
			    				for (int i=0; i<df.length; i++) {
			    					Object ob = df[i].get(consider);
			    					if (ob != null && !alreadyReviewed.contains(ob)) {
					    	    	    //LOGGER.trace("Adding " + ob.getClass().getName());
					    	    	    pendingReview.add(ob); // the value of the actual field
			    					}
			    				}
			    				Method[] dm = clazz.getMethods();
			    				//if (TRACE)
			    	    		//	LOGGER.trace("Examining " + dm.length + " methods");
			    				for (int i=0; i<dm.length; i++) {
			    					String mName = dm[i].getName();
			    					if (mName.startsWith("get")) { // leverage getter methods as means to expose private fields
			    						//if (TRACE)
			    			    		//	LOGGER.trace("Examining " + mName);
				    					Class[] pTypes = dm[i].getParameterTypes();
				    					ArrayList<Object> args = new ArrayList<Object>();
				    					for (int j=0; j<pTypes.length; j++) {
				    						if (pTypes[j] == boolean.class) {
				    							args.add(Boolean.FALSE);
				    						} else if (pTypes[j] == char.class) {
					    						args.add(new String());
				    						} else if (pTypes[j] == int.class || clazz == float.class || clazz == short.class || clazz == long.class || clazz == double.class) {
				    							args.add(0);
				    						} else {
				    							Object param = null;
				    							try {
				    								param = pTypes[j].newInstance();
				    							} catch (Exception inExc) {
				    								//if (TRACE)
				    					    		//	LOGGER.trace("Exception caught: " + inExc.getMessage());
				    							}
				    							args.add(param);
				    						}
				    					}
				    					try {
					    					Object ret = dm[i].invoke(consider, args.toArray());
					    					if (ret != null && !alreadyReviewed.contains(ret)) {
					    						//if (TRACE)
					    			    			//LOGGER.trace("Adding " + ret.getClass().getName());
					    						pendingReview.add(ret); // the value of the actual field
					    					}
				    					} catch (Exception exp) {
				    						//if (TRACE)
				    			    		//	LOGGER.trace("Exception caught: " + exp.getMessage());
				    					}
			    					}
			    				}
			    			} catch (SecurityException secEx) {
			    				//if (TRACE)
			    	    		//	LOGGER.error(secEx, "isObjectSmallerThan", "Exception: ");
			    			} catch (IllegalAccessException iaEx) {
			    				//if (TRACE)
			    	    		//	LOGGER.error(iaEx, "isObjectSmallerThan", "Exception: ");
			    			}
			    		}
		    		} catch (Exception ex) {
	    				//if (TRACE)
	    	    		//	LOGGER.error(ex, "isObjectSmallerThan", "Exception: ");
		    		}	
	    		}
    		}
    		pendingReview.remove(consider);
    		if (addToAlreadyReviewed) {
				alreadyReviewed.add(consider);
    		}	
    	}
    	if (TRACE) {
    		long now = (new Date()).getTime();
    		LOGGER.trace("Estimated size >= " + size + "; limit = " + limit + "; estimate took " + (now - start) + " ms");
    	}	
    	return size < limit;
    }

}
