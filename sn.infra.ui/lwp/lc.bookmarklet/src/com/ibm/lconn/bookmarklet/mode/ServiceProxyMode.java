/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2008, 2013                                    
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */

package com.ibm.lconn.bookmarklet.mode;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.ConnectionsObjectHelper;
import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.exception.AtomServiceException;
import com.ibm.lconn.atom.service.ConnectionsService;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.lconn.core.web.cache.WebCacheUtil;

import com.ibm.lconn.core.web.util.services.ServiceReferenceUtil;

public class ServiceProxyMode extends Mode{
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	protected static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
	.getLogResourceHelper();

	private static final Log LOG = LogFactory.getLog(ServiceProxyMode.class);
	
	public ServiceProxyMode(HttpServletRequest request, HttpServletResponse response){
		super(request, response);
	}
	
	@Override
	public Object perform() throws AtomServiceException, IRISyntaxException {
		String service = request.getParameter("service");
		ServiceConfiguration.setHandler(configurationHandler);
		ConnectionsObjectHelper fetcher = ConnectionsObjectHelper.getInstance();
		
		ServiceData data = new ServiceData();
		data = handleAuthantication(request, data);
		
		List entries = null;
		if("ownerCommunities".equalsIgnoreCase(service)){
			data.setOwnerCommunities(true);
			entries = fetcher.getObjects(ConnectionsService.COMMUNITIES__SERVICE, data);
		} else if(ServiceReferenceUtil.Service.COMMUNITIES.equalsIgnoreCase(service)){
			entries = fetcher.getObjects(ConnectionsService.COMMUNITIES__SERVICE, data);
		}else if (ServiceReferenceUtil.Service.ACTIVITIES.equalsIgnoreCase(service)){
			entries = fetcher.getObjects(ConnectionsService.ACTIVITIES__SERVICE, data);
		}else if (ServiceReferenceUtil.Service.BLOGS.equalsIgnoreCase(service)){
			entries = fetcher.getObjects(ConnectionsService.BLOGS__SERVICE, data);
		}
		if (LOG.isTraceEnabled()){
			LOG.trace("Get entries of " + service + ", total entries are: " + entries);
		}
		setHttpResponseHeaders();
		return entries;
	}
	
	private void setHttpResponseHeaders(){
		response.setHeader("content-type", "text/html; charset=utf-8");
//		response.setHeader("pragma", "private");
//		response.setHeader("cache-control", "no-cache, no-store,must-revalidate, max-age=-1");
		WebCacheUtil.disableCaching(response);
	}
}
