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

import javax.xml.namespace.QName;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.constrain.Expression;
import com.ibm.lconn.atom.data.BookmarkServiceData;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.model.DogearObject;
import com.ibm.lconn.atom.model.ModelObject;
import com.ibm.lconn.bookmarklet.util.HtmlUtil;
import com.ibm.lconn.bookmarklet.util.TextUtilities;


public class DogearBookmarkService extends ConnectionsService {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private final String DOGEAR_BOOKMARK_PUBLISHING_URL = ServiceConfiguration.getString("dogear.bookmark.publishing.url");  //$NON-NLS-1$
	
	private final String DOGEAR_BOOKMARKS_SERVICE_URL = ServiceConfiguration.getString("dogear.bookmark.publishing.url"); //$NON-NLS-1$
	
	private final String DOGEAR_BOOKMARKS_COUNT_URL = ServiceConfiguration.getString("dogear.bookmark.count.url"); //$NON-NLS-1$
	
	private Log _logger = LogFactory.getLog(DogearBookmarkService.class);
	
	/**
	 * 
	 */
	public static final Expression URL = new Expression("url");
	
	/**
	 * 
	 */
	public static final Expression TAG = new Expression("any");
	
	/**
	 * 
	 */
	public static final Expression NETWORK  = new Expression("network");
	
	/**
	 * 
	 */
	public static final Expression SEARCHTEXT = new Expression("searchText");
	
	/**
	 * 
	 */
	public static final Expression SEARCH  = new Expression("search");
	
	/**
	 * 
	 */
	public static final Expression TAGS  = new Expression("tag");
	
	@Override
	public Entry buildEntry(Entry entry, ServiceData data) throws IRISyntaxException {
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: buildEntry, data:").append(data.toString())); //$NON-NLS-1$
		}
		BookmarkServiceData bsd = (BookmarkServiceData)data;
		String title = bsd.getTitle();
		if (title == null) title = "";
		title = TextUtilities.stripNonPrintableCharacters(title);
		title = StringUtils.left(title, TextUtilities.getMaxUTF8CharCount(title, 2048));
		entry.setTitle(title);
		entry.setContent(bsd.getComments().replace(String.valueOf((char)160), ""));
		Element content = entry.getContentElement();
		if (content!=null) {
			if (data.isUseHTML()){
				content.setAttributeValue("type", "html");
			}else {
				content.setAttributeValue("type", "text");
			}
		}
		entry.addCategory("http://www.ibm.com/xmlns/prod/sn/type", "bookmark", "bookmark"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		Iterator<String> it = bsd.getTags().iterator();
		while(it.hasNext()) {
			entry.addCategory(it.next());
		}
		entry.addLink(HtmlUtil.escapeUnsafeCharacters((bsd.getUrl())));
		if(bsd.isPrivate()) {
			entry.addCategory("http://www.ibm.com/xmlns/prod/sn/flags", "private", "private"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		}
		_logger.debug("exit: buildEntry"); //$NON-NLS-1$
		return entry;
	}

	@Override
	public String getPublishingUrl(ServiceData data) {
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: getServiceUrl, data:").append(data.toString())); //$NON-NLS-1$
		}
		String url = DOGEAR_BOOKMARK_PUBLISHING_URL;
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("getServiceUrl: url is").append(url)); //$NON-NLS-1$
		}
		_logger.debug("exit: getServiceUrl"); //$NON-NLS-1$
		return url;
	}

	@Override
	public String getAllObjectsUrl(ServiceData data) {
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: getAllObjectsUrl, data:").append(data.toString())); //$NON-NLS-1$
		}
		String url =  DOGEAR_BOOKMARKS_SERVICE_URL + "?lang=en_US";
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("getAllObjectsUrl: url is").append(url)); //$NON-NLS-1$
		}
		_logger.debug("exit: getAllObjectsUrl"); //$NON-NLS-1$
		return url;
	}

	@Override
	public ArrayList<ModelObject> parseEntries(Document doc) throws IRISyntaxException {
		if (doc == null) return null;
		Entry entry = (Entry) doc.getRoot();
		
		ArrayList<ModelObject> rstList = new ArrayList();
		rstList.add(new DogearObject(entry));
		
		return rstList;
	}

	@Override
	public String getObjectsCountUrl(ServiceData data) {
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: getObjectsCountUrl, data:").append(data.toString())); //$NON-NLS-1$
		}
		String url =  DOGEAR_BOOKMARKS_COUNT_URL + "?lang=en_US";
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("getObjectsCountUrl: url is").append(url)); //$NON-NLS-1$
		}
		_logger.debug("exit: getObjectsCountUrl"); //$NON-NLS-1$
		return url;
	}

}
