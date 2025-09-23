/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.config;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.configuration.Configuration;

import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;

public class VersionStamp {

	private final static String CLASS_NAME = VersionStamp.class.getName();

	private final static String INNER_CLASS_NAME = Stamp.class.getName();

	private final static Logger log = Logger.getLogger(CLASS_NAME);

	private class Stamp {
		private String stampString = null;

		private Date stampDate = null;

		protected Stamp() {
			// use startup time
			Date now = new Date(_startupTimeMillis);
			stampString = VERFORMAT.format(now);
			stampDate = now;
		}

		protected Stamp(String verString) {
			try {
				if (verString == null || verString.length() <= 0) {
					log.log(Level.SEVERE, INNER_CLASS_NAME,
							"Invalid VersionStamp (null or empty), using startup time instead");
					Date now = new Date(_startupTimeMillis);
					stampString = VERFORMAT.format(now);
					stampDate = now;
				} else {
					stampDate = VERFORMAT.parse(verString);
					stampString = verString;
				}
			} catch (Exception e) {
				log.log(Level.SEVERE, CLASS_NAME, "Invalid VersionStamp "
						+ verString + ", using startup time instead");
				Date now = new Date(_startupTimeMillis);
				stampString = VERFORMAT.format(now);
				stampDate = now;
			}
		}

		protected Stamp(Date verDate) {
			stampString = VERFORMAT.format(verDate);
			stampDate = verDate;
		}

		public Date getDate() {
			return stampDate;
		}

		public String toString() {
			return stampString;
		}

	}

	private static DateFormat VERFORMAT = new SimpleDateFormat(
			"yyyyMMdd.HHmmss");
	{
		VERFORMAT.setTimeZone(TimeZone.getTimeZone("GMT"));
	}

	private long _startupTimeMillis = System.currentTimeMillis();

	public static VersionStamp INSTANCE = null;

	private static Stamp STAMP = null;

	private VersionStamp() {

		try {
			if (System.getProperty("was.install.root") == null) {
				log.logp(Level.FINEST, CLASS_NAME, "VersionStamp()",
						"Not running in WebSphere Application Server");
				STAMP = new Stamp();
				return;
			}

			VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory
					.getInstance();
			Configuration vConfig = provider.getGlobalConfiguration();
			String versionStamp = vConfig.getString("versionStamp[@value]");
			log.logp(Level.FINEST, CLASS_NAME, "VersionStamp()",
					"versionStamp: " + versionStamp);
			STAMP = new Stamp(versionStamp);
		} catch (Exception e) {
			if (log.isLoggable(Level.SEVERE)) {
				log.throwing(CLASS_NAME, "VersionStamp()", e);
			}
			STAMP = new Stamp();
		}
	}

	public static synchronized void init() {
		if (log.isLoggable(Level.FINER))
			log.entering(CLASS_NAME, "init()");

		INSTANCE = new VersionStamp();

		if (log.isLoggable(Level.FINER))
			log.exiting(CLASS_NAME, "init()");
	}

	public static VersionStamp getInstance() {
		if (null == INSTANCE)
			init();

		return INSTANCE;
	}

	public Date getDate() {
		if (log.isLoggable(Level.FINER))
			log.entering(CLASS_NAME, "getDate()");

		Date theDate = STAMP.getDate();

		if (log.isLoggable(Level.FINER))
			log.exiting(CLASS_NAME, "getDate()", theDate);
		return theDate;
	}

	public String toString() {
		if (log.isLoggable(Level.FINER))
			log.entering(CLASS_NAME, "toString()");

		String theString = STAMP.toString();

		if (log.isLoggable(Level.FINER))
			log.exiting(CLASS_NAME, "toString()", theString);
		return theString;
	}

}
