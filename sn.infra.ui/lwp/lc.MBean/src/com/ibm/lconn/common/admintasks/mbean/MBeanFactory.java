/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.common.admintasks.mbean;

import static java.util.logging.Level.FINER;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ibm.ventura.internal.service.admin.was.WASAdminService;

/**
 * Class to initialize mbeans and setup required data. 
 * 
 * @author tonycal3@ie.ibm.com
 */
public class MBeanFactory
{
	private static String CLASS_NAME = 		MBeanFactory.class.getName();
	private static Logger logger = 			Logger.getLogger(CLASS_NAME);

	private List<MBeanInfo> mBeanObjects = 	new ArrayList<MBeanInfo>();
	private final String domainName = 		WASAdminService.getDefaultDomain();
	private final String cellName = 		WASAdminService.getCellName();
	private final String nodeName = 		WASAdminService.getNodeName();
	private final String processName = 		WASAdminService.getProcessName();
	
	private final static String LOTUS_CONNECTIONS = ",type=LotusConnections";
	private final static String PROCESS = ",process=";
	private final static String NODE = ",node=";
	private final static String NAME = ":name=";
	private final static String CELL = ",cell=";

	public static final MBeanFactory INSTANCE = new MBeanFactory();

	public void initializeMBeans()
	{
		if (logger.isLoggable(FINER))
		{
			logger.logp(FINER,
						CLASS_NAME,
						"MBeanFactory",
						"Domain: {0}, cellName: {1}, nodeName: {2}, processName: {3}",
						new Object[] { domainName, cellName, nodeName, processName });
		}

		createMBean("ConnectionsConfigService", new ConnectionsConfigService());

	}

	public void createMBean(String taskName, IServiceMBean serviceMBean)
	{
		if (logger.isLoggable(FINER)) logger.entering(CLASS_NAME, "MBeanFactory", new Object[] { taskName,
				serviceMBean });

		serviceMBean.init();
		StringBuffer beanName = new StringBuffer(domainName);
		{
			// e.g. Format = WebSphere:name=HighwayService,type=LotusConnections,cell=ocs_cell,node=ocs_app_node_acdmgr,process=serverS
			beanName.append(NAME).append(taskName);
			beanName.append(LOTUS_CONNECTIONS);
			beanName.append(CELL).append(cellName);
			beanName.append(NODE).append(nodeName);
			beanName.append(PROCESS).append(processName);
		}
		
		mBeanObjects.add(new MBeanInfo(beanName.toString(), serviceMBean));
	}

	/**
	 * @return Returns a list of mbean objects.
	 */
	public List<MBeanInfo> getMBeanObjects()
	{
		if (logger.isLoggable(FINER))
		{
			logger.entering(CLASS_NAME, "getMBeanObjects");
			logger.exiting(CLASS_NAME, "getMBeanObjects", mBeanObjects);
		}
		
		return mBeanObjects;
	}

	/**
	 * Convenience class to save bean information.
	 */
	public static class MBeanInfo
	{
		public String _beanName = null;
		public Object _beanInstance = null;

		public MBeanInfo(String beanName, Object beanInstance)
		{
			_beanName = beanName;
			_beanInstance = beanInstance;
		}

		public String getBeanName()
		{
			if (logger.isLoggable(FINER))
			{
				logger.entering(CLASS_NAME, "getBeanName");
				logger.exiting(CLASS_NAME, "getBeanName", _beanName);
			}
			return _beanName;
		}

		public Object getBeanInstance()
		{
			if (logger.isLoggable(FINER))
			{
				logger.entering(CLASS_NAME, "getBeanInstance");
				logger.exiting(CLASS_NAME, "getBeanInstance", _beanInstance);
			}
			return _beanInstance;
		}

		public String toString()
		{
			return _beanName + " - " + _beanInstance;
		}
	}
}
