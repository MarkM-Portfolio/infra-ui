/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2007, 2012                                    
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */
package com.ibm.lconn.atom.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Feed;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.data.BookmarkServiceData;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.model.CommunitiesObject;
import com.ibm.lconn.atom.model.ModelObject;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;

public class CommunitiesService extends ConnectionsService {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private boolean hasNextPage = false;
	private String nextPageUrl = null;

	private String COMMUNITIES_URL = ServiceConfiguration
			.getString("CommunitiesService.url"); 
	private String OWNER_COMMUNITIES_URL = ServiceConfiguration
	.getString("OwnerCommunitiesService.url");

	private Log _logger = LogFactory.getLog(CommunitiesService.class);

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
			.getLogResourceHelper();

	@Override
	public Entry buildEntry(Entry entry, ServiceData data)
			throws IRISyntaxException {
		if (_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: buildEntry, data:")
					.append(data.toString()));
		}
		BookmarkServiceData bsd = (BookmarkServiceData) data;
		entry.setTitle(bsd.getTitle());
		entry.setContent(bsd.getComments());
		entry
				.addCategory(
						"http://www.ibm.com/xmlns/prod/sn/type", "bookmark", "bookmark"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		Iterator<String> it = bsd.getTags().iterator();
		if (bsd.isImportant()) {
			entry
					.addCategory(
							"http://www.ibm.com/xmlns/prod/sn/flags", "important", "important"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		}
		while (it.hasNext()) {
			entry.addCategory(it.next());
		}
		entry.addLink(bsd.getUrl());
		_logger.debug("exit: buildEntry");
		return entry;
	}

	@Override
	public String getPublishingUrl(ServiceData data) {
		if (_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: getServiceUrl, data:")
					.append(data.toString()));
		}
		String url = COMMUNITIES_URL
				+ ((BookmarkServiceData) data).getOwnerId();
		if (_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("getServiceUrl: url is")
					.append(url));
		}
		_logger.debug("exit: getServiceUrl");
		return url;
	}

	@Override
	public String getAllObjectsUrl(ServiceData data) {
		if (data.isOwnerCommunities()) {
			return OWNER_COMMUNITIES_URL;
		} else {
		    return COMMUNITIES_URL;
		}
	}

	@Override
	public ArrayList<ModelObject> parseEntries(Document doc)throws IRISyntaxException  {
		if (doc == null) return null;
		Feed feed = (Feed) doc.getRoot();
		if(feed.getLink("next") != null) {
			hasNextPage = true;
			nextPageUrl = feed.getLink("next").getHref().toString();
		}else {
			hasNextPage = false;
		}
		List<Entry> entries = feed.getEntries();
		Iterator<Entry> it = entries.iterator();
		ArrayList<ModelObject> rstList = new ArrayList();
		while (it.hasNext()) {
			Entry entry = it.next();
			CommunitiesObject obj = new CommunitiesObject(entry);
			rstList.add(obj);
		}
		return rstList;
	}

	public boolean hasNextPage(){
		return hasNextPage;
	}
	
	public String getNextPageUrl(){
		return nextPageUrl;
	}
	
	@Override
	public String getObjectsCountUrl(ServiceData data) {
		// TODO Auto-generated method stub
		return null;
	}

}
