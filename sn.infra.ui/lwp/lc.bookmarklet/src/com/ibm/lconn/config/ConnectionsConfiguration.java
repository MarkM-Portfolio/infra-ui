/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.config;

import java.util.Properties;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class ConnectionsConfiguration {
	private boolean dogearEnabled = false;
	private boolean communitiesEnabled = false;
	private boolean blogsEnabled = false;
	private boolean activitiesEnabled = false;
	private boolean bookmarkletEnabled = false;
	private boolean lotusLiveEnable = false;
	private boolean visitorModeEnabled = false;
	
	private String dogearServiceUrl;
	private String communitiesServiceUrl;
	private String blogsServiceUrl;
	private String activitiesServiceUrl;
	private String bookmarkletServiceUrl;
	private String bookmarkletServiceUrlSecure;
	
	private static final Log LOG = LogFactory.getLog(ConnectionsConfiguration.class);
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	
	public ConnectionsConfiguration() throws VenturaConfigException{
		VenturaConfigurationProvider vcp = VenturaConfigurationProvider.Factory.getInstance();
		dogearEnabled = vcp.isServiceEnabled(ServiceReferenceUtil.Service.BOOKMARKS);
		if (dogearEnabled){
			if (vcp.getInterServiceURL(ServiceReferenceUtil.Service.BOOKMARKS) != null){
				dogearServiceUrl = vcp.getInterServiceURL(ServiceReferenceUtil.Service.BOOKMARKS).toString();
			}else if (vcp.isSecureServiceEnables(ServiceReferenceUtil.Service.BOOKMARKS)){
				dogearServiceUrl = vcp.getSecureServiceURL(ServiceReferenceUtil.Service.BOOKMARKS).toString();
			}else {
				dogearServiceUrl = vcp.getServiceURL(ServiceReferenceUtil.Service.BOOKMARKS).toString();
			}
		}
		
		if (LOG.isDebugEnabled()){
			LOG.debug("dogearServiceUrl = " + dogearServiceUrl);
		}
		
		communitiesEnabled = vcp.isServiceEnabled(ServiceReferenceUtil.Service.COMMUNITIES);
		if (communitiesEnabled){
			if (vcp.getInterServiceURL(ServiceReferenceUtil.Service.COMMUNITIES) != null){
				communitiesServiceUrl = vcp.getInterServiceURL(ServiceReferenceUtil.Service.COMMUNITIES).toString();
			}else if (vcp.isSecureServiceEnables(ServiceReferenceUtil.Service.COMMUNITIES)){
				communitiesServiceUrl = vcp.getSecureServiceURL(ServiceReferenceUtil.Service.COMMUNITIES).toString();
			}else {
				communitiesServiceUrl = vcp.getServiceURL(ServiceReferenceUtil.Service.COMMUNITIES).toString();
			}
		}
		if (LOG.isDebugEnabled()){
			LOG.debug("communitiesServiceUrl = " + communitiesServiceUrl);
		}

		blogsEnabled = vcp.isServiceEnabled(ServiceReferenceUtil.Service.BLOGS);
		if (blogsEnabled){
			if (vcp.getInterServiceURL(ServiceReferenceUtil.Service.BLOGS) != null){
				blogsServiceUrl = vcp.getInterServiceURL(ServiceReferenceUtil.Service.BLOGS).toString();
			}else if (vcp.isSecureServiceEnables(ServiceReferenceUtil.Service.BLOGS)){
				blogsServiceUrl = vcp.getSecureServiceURL(ServiceReferenceUtil.Service.BLOGS).toString();
			}else {
				blogsServiceUrl = vcp.getServiceURL(ServiceReferenceUtil.Service.BLOGS).toString();
			}
		}
		if (LOG.isDebugEnabled()){
			LOG.debug("blogsServiceUrl = " + blogsServiceUrl);
		}

		activitiesEnabled = vcp.isServiceEnabled(ServiceReferenceUtil.Service.ACTIVITIES);
		if (activitiesEnabled){
			if (vcp.getInterServiceURL(ServiceReferenceUtil.Service.ACTIVITIES) != null){
				activitiesServiceUrl = vcp.getInterServiceURL(ServiceReferenceUtil.Service.ACTIVITIES).toString();
			}else if (vcp.isSecureServiceEnables(ServiceReferenceUtil.Service.ACTIVITIES)){
				activitiesServiceUrl = vcp.getSecureServiceURL(ServiceReferenceUtil.Service.ACTIVITIES).toString();
			}
			else {
				activitiesServiceUrl = vcp.getServiceURL(ServiceReferenceUtil.Service.ACTIVITIES).toString();
			}
		}
		if (LOG.isDebugEnabled()){
			LOG.debug("activitiesServiceUrl = " + activitiesServiceUrl);
		}
		
		bookmarkletEnabled = vcp.isServiceEnabled(ServiceReferenceUtil.Service.BOOKMARKLET);
		if (bookmarkletEnabled){
			if (vcp.isSecureServiceEnables(ServiceReferenceUtil.Service.BOOKMARKLET)){
				bookmarkletServiceUrlSecure = vcp.getSecureServiceURL(ServiceReferenceUtil.Service.BOOKMARKLET).toString();
			}
			bookmarkletServiceUrl = vcp.getServiceURL(ServiceReferenceUtil.Service.BOOKMARKLET).toString();
		}
		if (LOG.isDebugEnabled()){
			LOG.debug("bookmarkletServiceUrlSecure = " + bookmarkletServiceUrlSecure);
			LOG.debug("bookmarkletServiceUrl = " + bookmarkletServiceUrl);
		}	  
	    	
    	Properties properties = VenturaConfigurationHelper.Factory.getInstance().getGenericProperties();
    	if (!properties.isEmpty()) {
    		String property = properties.getProperty(VenturaConfigurationHelper.visitorModelEnabledKey);
    		if (null != property) {
    			visitorModeEnabled = Boolean.parseBoolean(property);
    		}
			
			property = properties.getProperty("LotusLive");
    		if (null != property) {
    			lotusLiveEnable = Boolean.parseBoolean(property);
				
				if (LOG.isDebugEnabled()){
					LOG.debug("lotusLiveEnable : " + lotusLiveEnable);
				}
    		}
    	}
	}

	public boolean isActivitiesEnabled() {
		return activitiesEnabled;
	}

	public String getActivitiesServiceUrl() {
		return activitiesServiceUrl;
	}

	public boolean isBlogsEnabled() {
		return blogsEnabled;
	}

	public String getBlogsServiceUrl() {
		return blogsServiceUrl;
	}


	public boolean isCommunitiesEnabled() {
		return communitiesEnabled;
	}

	public String getCommunitiesServiceUrl() {
		return communitiesServiceUrl;
	}

	public boolean isDogearEnabled() {
		return dogearEnabled;
	}

	public String getDogearServiceUrl() {
		return dogearServiceUrl;
	}
	
	public boolean isBookmarkletEnabled() {
		return bookmarkletEnabled;
	}

	public String getBookmarkletServiceUrl(boolean isSecure) {
		if(isSecure){
			return bookmarkletServiceUrlSecure;
		}else{
			return bookmarkletServiceUrl;
		}
	}
	
	public boolean isLotusLiveEnable(){
		return lotusLiveEnable;
	}
	public  boolean isVisitorModeEnabled() {
	  return visitorModeEnabled;
	}
}
