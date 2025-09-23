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

package net.jazz.ajax.internal.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dojotoolkit.shrinksafe.Compressor;
import org.dojotoolkit.shrinksafe.ReplacedTokens;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ContextFactory;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.Undefined;

public class JavaScriptUtil {
	
	// ADDED
	private static final String UNDEFINED = "<undefined>"; //$NON-NLS-1$
	static final ContextFactory FACTORY = new ContextFactory();
	static Context context;
	static ScriptableObject scope;
	
	interface Callable<T> {
	    T call();
	}
	
	static <T> T runWithContext(Callable<T> callable) {
		synchronized (FACTORY) {
			if (context == null) {
				context = FACTORY.enterContext();
				context.setOptimizationLevel(-1);
				scope = context.initStandardObjects();
			} else
				FACTORY.enterContext(context);
			try {
				return callable.call();
			} finally {
				Context.exit();
			}
		}
	}
	
	public static <T> T eval(final String source) {
		return runWithContext(new Callable<T>(){
			public T call() {
				T ret = null;
				try {
					ret = (T) context.evaluateString(scope, source, "<cmd>", 1, null);
				} catch (Throwable t) {
					throw new RuntimeException(t);
				}
				return ret;
			}
		});
	}

	public static String minify(final String source) {
		return runWithContext(new Callable<String>(){
			public String call() {
				return Compressor.compressScript(source, 0, 1, true, (StringBuffer)null);
			}
		});
	}

	public static String internalMinify(final String source, final List<ReplacedTokens> tokens) {
		return runWithContext(new Callable<String>() {
			public String call() {
				return Compressor.compressScriptDebug(source, 0, 1, true, tokens);
			}
		});
	}

	// CHANGED: return literal <undefined> string
	public static Map<String, Object> convert(NativeObject object) {
		Object[] ids = object.getIds();
		Map result = new HashMap(ids.length);
		for (Object id : ids) {
			Object prop;
			String key = id.toString();
			if (id instanceof Integer)
				prop = NativeObject.getProperty(object, (Integer)id);
			else
				prop = NativeObject.getProperty(object, key);
			if (prop instanceof String)
				result.put(key, (String)prop);
			// ADDED: Catch Undefined before other NativeObject's
			else if (prop == Undefined.instance)
				result.put(key, UNDEFINED);
			else if (prop instanceof NativeObject)
				result.put(key, convert((NativeObject) prop));
			else if (prop instanceof NativeArray)
				result.put(key, convert((NativeArray)prop));
			// ADDED
			else if (prop instanceof Double)
				result.put(key, (Double)prop);
		}
		return result;
	}

	// CHANGED: return literal <undefined> string
	public static List<Object> convert(NativeArray array) {
		int size = (int) array.getLength();
		List result = new ArrayList(size);
		for (int i=0; i < size; i++) {
			Object property = ScriptableObject.getProperty(array, i);
			if (property == Undefined.instance)
				property = UNDEFINED;
			result.add(property);
		}
		return result;
	}

}
