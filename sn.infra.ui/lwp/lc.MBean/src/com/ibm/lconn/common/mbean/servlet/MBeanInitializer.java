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

package com.ibm.lconn.common.mbean.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.ibm.lconn.common.admintasks.mbean.MBeanFactory;
import com.ibm.lconn.common.admintasks.mbean.MBeanRegister;

/**
 * The purpose of this class is to call into the MBeanRegister class to initialize and register the various mbeans 
 * when the common ear has initialised (indirectly through servlet initialization). It should also unregister those 
 * beans on when the ear is stopped. (indirectly through servlet context destruction)
 * 
 * @author tonycal3@ie.ibm.com 
 */
public class MBeanInitializer implements ServletContextListener
{
	@Override
	public void contextDestroyed(ServletContextEvent arg0)
	{
		MBeanRegister.unregisterMBeans();
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0)
	{
		MBeanFactory.INSTANCE.initializeMBeans();
		MBeanRegister.registerMBeans();
		
	}

}
