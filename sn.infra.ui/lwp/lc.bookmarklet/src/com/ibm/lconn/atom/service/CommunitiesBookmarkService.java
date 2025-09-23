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
import java.util.List;

import javax.xml.namespace.QName;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Feed;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.data.BookmarkServiceData;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.model.ModelObject;
import com.ibm.lconn.bookmarklet.util.HtmlUtil;
import com.ibm.lconn.bookmarklet.util.TextUtilities;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;


public class CommunitiesBookmarkService extends ConnectionsService {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private String COMMUNITIES_URL = ServiceConfiguration.getString("CommunitiesBookmarkService.url"); //$NON-NLS-1$

	private Log _logger = LogFactory.getLog(CommunitiesBookmarkService.class);
	
	@Override
	public Entry buildEntry(Entry entry, ServiceData data) throws IRISyntaxException {
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: buildEntry, data:").append(data.toString()));
		}
		BookmarkServiceData bsd = (BookmarkServiceData)data;
		String title = bsd.getTitle();
		if (title == null) title = "";
		title = TextUtilities.stripNonPrintableCharacters(title);
		title = StringUtils.left(title, TextUtilities.getMaxUTF8CharCount(title, 2048));
		entry.setTitle(title);
		String comments = bsd.getComments();
		entry.setContent(comments);
		Element content = entry.getContentElement();
		if (content!=null) {
			content.setAttributeValue("type", "text");
		}
		entry.addCategory("http://www.ibm.com/xmlns/prod/sn/type", "bookmark", "bookmark"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		
		if(bsd.isImportant()) {
			entry.addCategory("http://www.ibm.com/xmlns/prod/sn/flags", "important", "important"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		}
		List tags = bsd.getTags();
		if (tags!=null && tags.size()>0) {
			for(int i=0;i<tags.size();i++) {
				entry.addCategory((String)tags.get(i));
			}
		}
		entry.addLink(HtmlUtil.escapeUnsafeCharacters(bsd.getUrl()));
		if(_logger.isDebugEnabled()) {
			_logger.debug("exit: buildEntry");
		}
		return entry;
	}

	@Override
	public String getPublishingUrl(ServiceData data) {
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: getServiceUrl, data:").append(data.toString()));
		}
		String url =   COMMUNITIES_URL + ((BookmarkServiceData)data).getOwnerId();
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("getServiceUrl: url is").append(url));
		}
		_logger.debug("exit: getServiceUrl");
		return url;
	}

	@Override
	public String getAllObjectsUrl(ServiceData data) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<ModelObject> parseEntries(Document doc) {
		if (doc == null) return null;
		Feed feed = (Feed) doc.getRoot();
		List<Entry> entries = feed.getEntries();
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getObjectsCountUrl(ServiceData data) {
		// TODO Auto-generated method stub
		return null;
	}

}
