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

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
//CHANGED
//import org.apache.log4j.Level;
//import org.apache.log4j.Logger;
import org.eclipse.core.runtime.Platform;

//CHANGED
//import net.jazz.ajax.internal.AjaxFramework;

public class TraceSupport {
	
	static ThreadLocal<StringBuilder> indentation = new ThreadLocal<StringBuilder>() {
		protected StringBuilder initialValue() {
			return new StringBuilder();
		}
	};
	
	final String id;
	final Log log;
	Map<Object, Long> timers = Collections.synchronizedMap(new HashMap());
	
	// CHANGED
	private TraceSupport(String id) {
		this.id = id;
		log = LogFactory.getLog(id);
//		Logger logger = Logger.getLogger(id);
//		boolean enabled = "true".equals(Platform.getDebugOption(id));
//		final int current = logger.getEffectiveLevel().toInt();
//		int level = current;
//		if (enabled) {
//			Level debugLevel = Level.toLevel(
//					Platform.getDebugOption(id + ".level"),
//					Level.TRACE);
//			level = Math.min(current, debugLevel.toInt());
//		}
//		if (AjaxFramework.DEV_MODE)
//			level = Math.min(level, Level.WARN_INT);
//		if (level != current)
//			logger.setLevel(Level.toLevel(level));
	}
	
	public void checkpoint(Object token, CharSequence info) {
		if (!isTracing())
			return;
		try {
			long ellapsed = System.currentTimeMillis() - timers.get(token);
			trace("Ellapsed time: ", Long.toString(ellapsed), "ms: ", info);
		} catch (Throwable t) {
			t.printStackTrace();
		}
	}

	public void endBenchmark(Object token, long... optExpected) {
		if (!isTracing())
			return;
		long ellapsed = System.currentTimeMillis() - timers.remove(token);
		pop();
		if (optExpected.length == 1 && ellapsed > optExpected[0]) {
			trace("***Performance target exceeded***");
			trace("  Ellapsed time: ",
					Long.toString(ellapsed),
					" > ",
					Long.toString(optExpected[0]));
		} else
			trace("Ellapsed time: ", Long.toString(ellapsed), "ms - ", token.toString());
	}
	
	public void error(CharSequence... info) {
		if (info.length == 1)
			log.error(info[0]);
		else
			log.error(buildMessage(info).toString());
	}
	
	public void error(Throwable t, CharSequence... info) {
		if (info.length == 1)
			log.error(info[0], t);
		else
			log.error(buildMessage(info).toString(), t);
	}
	
	public int intValue(String string, int i) {
		String value = Platform.getDebugOption(id + '.' + string);
		if (value == null)
			return i;
		return Integer.parseInt(value);
	}
	
	public boolean isTracing() {
		return log.isTraceEnabled();
	}
	
	public void pop(CharSequence... info) {
		if (!isTracing())
			return;
		indentation.get().delete(0, 1);
		trace(info);
	}
	
	public void push(CharSequence... info) {
		if (!isTracing())
			return;
		trace(info);
		indentation.get().append('\t');
	}
	
	public Object startBenchmark(CharSequence ... info) {
		if (!isTracing())
			return null;
		final StringBuilder message = buildMessage(info);
		Object token = new Object() {
			public String toString() {
				return message.toString();
			}
		};
		push("Starting benchmark: ", message);
		timers.put(token, System.currentTimeMillis());
		return token;
	}

	// CHANGED: abort early if not tracing
	public void trace(CharSequence... info) {
		if (info.length == 0 || !isTracing())
			return;
		StringBuilder message = buildMessage(info);
		message.insert(0, indentation.get());
		log.trace(message);
	}
	
	// ADDED
	public void trace(Throwable t, CharSequence... info) {
		if (!isTracing())
			return;
		else if (info.length == 1)
			log.trace(info[0], t);
		else
			log.trace(buildMessage(info).toString(), t);
	}
	
	public void warn(CharSequence... info) {
		warn(null, info);
	}
	
	public void warn(Throwable t, CharSequence... info) {
		if (info.length == 1)
			log.warn(info[0], t);
		else
			log.warn(buildMessage(info), t);
	}

	static StringBuilder buildMessage(CharSequence... info) {
		StringBuilder message = new StringBuilder();
		for (CharSequence sequence : info)
			message.append(sequence);
		return message;
	}

	public static TraceSupport create(String id) {
		return new TraceSupport(id);
	}

	static String debugOption(String key, String defaultValue) {
		String result = Platform.getDebugOption(key);
		if (result == null)
			result = defaultValue;
		return result;
	}

}
