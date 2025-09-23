/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.common.admintasks.mbean;

import static java.util.logging.Level.FINER;
import static java.util.logging.Level.SEVERE;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

import javax.management.JMException;
import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.ObjectName;

import com.ibm.lconn.common.admintasks.mbean.MBeanFactory.MBeanInfo;
import com.ibm.lconn.core.as.resources.ServerAPIResources;

/**
 * Class to be used to register MBeans with the server. 
 * 
 * @author tonycal3@ie.ibm.com
 */
public class MBeanRegister
{
	private static String CLASS_NAME = MBeanRegister.class.getName();
	private static Logger logger = Logger.getLogger(CLASS_NAME);

	/**
	 * Method that is called by a servlet initializer to register the MBeans with the Server. 
	 */
	public static void registerMBeans()
	{
		if (logger.isLoggable(FINER))
		{
			logger.entering(CLASS_NAME, "registerMBeans");
		}

		ObjectName objName = null;
		try
		{
			MBeanServer mbs = getMBeanServer();

			List<MBeanInfo> mBeans = MBeanFactory.INSTANCE.getMBeanObjects();

			if (logger.isLoggable(FINER))
			{
				logger.logp(FINER, CLASS_NAME, "registerMBeans", "MBeans: {0}", mBeans);
			}

			Iterator<MBeanInfo> mBeanIter = mBeans.listIterator();

			while (mBeanIter.hasNext())
			{
				MBeanFactory.MBeanInfo currBeanInfo = (MBeanFactory.MBeanInfo) mBeanIter.next();
				String strObjName = currBeanInfo.getBeanName();
				objName = new ObjectName(strObjName);
				try
				{
					if (mbs.isRegistered(objName))
					{
						if (logger.isLoggable(FINER))
						{
							logger.logp(FINER,
										CLASS_NAME,
										"registerMBeans",
										"Attempting to remove old mbean: {0}",
										objName);
						}
						mbs.unregisterMBean(objName);
					}
				} catch (javax.management.InstanceNotFoundException e)
				{
					// ignore, no previously registered bean
					if (logger.isLoggable(FINER))
					{
						logger.logp(FINER,
									CLASS_NAME,
									"registerMBeans",
									"javax.management.InstanceNotFoundException: {0}",
									e.getMessage());
					}
				}
				mbs.registerMBean(currBeanInfo.getBeanInstance(), objName);
				if (logger.isLoggable(FINER))
				{
					logger.logp(FINER, CLASS_NAME, "registerMBeans", "registered: {0}", objName);
				}
			}
		} catch (JMException jmxe)
		{
			String message = ServerAPIResources.getLogString("mbean.registration.error", (Object[]) null);
			if (logger.isLoggable(SEVERE))
				logger.logp(SEVERE, CLASS_NAME, "registerMBeans", message, jmxe);
		}

		if (logger.isLoggable(FINER)) logger.exiting(CLASS_NAME, "registerMBeans");
	}

	/**
	 * Method to be called on shutdown of the server to unregister the mbeans. 
	 */
	public static void unregisterMBeans()
	{
		if (logger.isLoggable(FINER))
		{
			logger.entering(CLASS_NAME, "unregisterMBeans");
		}

		ObjectName objName = null;

		try
		{
			MBeanServer mbs = getMBeanServer();
			List<MBeanInfo> mBeans = MBeanFactory.INSTANCE.getMBeanObjects();
			Iterator<MBeanInfo> mBeanIter = mBeans.listIterator();

			while (mBeanIter.hasNext())
			{
				MBeanFactory.MBeanInfo currBeanInfo = (MBeanFactory.MBeanInfo) mBeanIter.next();
				objName = new ObjectName(currBeanInfo.getBeanName());
				try
				{
					if (mbs.isRegistered(objName))
						mbs.unregisterMBean(objName);
					
				} catch (javax.management.InstanceNotFoundException e)
				{
					if (logger.isLoggable(FINER))
					{
						logger.logp(FINER,
									CLASS_NAME,
									"unregisterMBeans",
									"javax.management.InstanceNotFoundException: {0}",
									e.getMessage());
					}
				}
			}
		} catch (JMException jmxe)
		{
			String message = ServerAPIResources.getLogString("mbean.unregister.error", (Object[]) null);

			if (logger.isLoggable(SEVERE))
				logger.logp(SEVERE, CLASS_NAME, "unregisterMBeans", message, jmxe);
		}

	}

	/**
	 * Method to return information that relates to the MBean server. 
	 * 
	 * @return An MBeanServer instance. 
	 */
	private static MBeanServer getMBeanServer()
	{
		if (logger.isLoggable(FINER))
			logger.entering(CLASS_NAME, "getMBeanServer");

		MBeanServer mbs = null;
		@SuppressWarnings("unchecked")
		List<MBeanServer> mbservers = MBeanServerFactory.findMBeanServer(null);
		if (mbservers.size() > 0)
			mbs = ((MBeanServer) mbservers.get(0));
		else
		{
			String message = ServerAPIResources.getLogString("mbean.server.location.error", (Object[]) null);
			if (logger.isLoggable(SEVERE))
				logger.logp(SEVERE, CLASS_NAME, "getMBeanServer", message);
		}

		if (logger.isLoggable(FINER))
			logger.exiting(CLASS_NAME, "getMBeanServer", mbs);
		
		return mbs;
	}
}
