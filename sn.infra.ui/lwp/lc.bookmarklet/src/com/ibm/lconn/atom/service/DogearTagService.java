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

import javax.xml.namespace.QName;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Category;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Entry;
import org.apache.abdera.parser.stax.FOMCategories;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.constrain.Expression;
import com.ibm.lconn.atom.data.BookmarkServiceData;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.model.DogearTagObject;
import com.ibm.lconn.atom.model.ModelObject;

public class DogearTagService extends ConnectionsService {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private final String DOGEAR_TAG_PUBLISHING_URL = ServiceConfiguration.getString("dogear.tag.publishing.url"); //$NON-NLS-1$

	private final String DOGEAR_TAG_SERVICE_URL = ServiceConfiguration.getString("dogear.tag.service.url"); //$NON-NLS-1$

	private Log _logger = LogFactory.getLog(DogearTagService.class);

	/**
	 * 
	 */
	public static final Expression URL = new Expression("url");


	/**
	 * 
	 */
	public static final Expression NETWORK = new Expression("network");

	/**
	 * 
	 */
	//public static final Expression SEARCHTEXT = new Expression("searchText");

	/**
	 * 
	 */
	//public static final Expression SEARCH = new Expression("search");

	/**
	 * 
	 */
	public static final Expression TAGS = new Expression("tag");

	@Override
	public Entry buildEntry(Entry entry, ServiceData data)
			throws IRISyntaxException {
		/*
		 * if(_logger.isTraceEnabled()) { _logger.trace(new
		 * StringBuilder("entry: buildEntry, data:").append(data.toString()));
		 * //$NON-NLS-1$ } BookmarkServiceData bsd = (BookmarkServiceData)data;
		 * entry.setTitle(bsd.getTitle()); entry.setContent(bsd.getComments());
		 * entry.addCategory("http://www.ibm.com/xmlns/prod/sn/type",
		 * "bookmark", "bookmark"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		 * Iterator<String> it = bsd.getTags().iterator(); while(it.hasNext()) {
		 * entry.addCategory(it.next()); } entry.addLink(bsd.getUrl());
		 * if(bsd.isPrivate()) {
		 * entry.addCategory("http://www.ibm.com/xmlns/prod/sn/flags",
		 * "private", "private"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ }
		 * _logger.trace("exit: buildEntry"); //$NON-NLS-1$
		 */return null;
	}

	@Override
	public String getPublishingUrl(ServiceData data) {
		if (_logger.isDebugEnabled()) {
			_logger
					.debug(new StringBuilder("entry: getServiceUrl, data:").append(data.toString())); //$NON-NLS-1$
		}
		String url = DOGEAR_TAG_PUBLISHING_URL
				+ ((BookmarkServiceData) data).getOwnerId();
		if (_logger.isDebugEnabled()) {
			_logger
					.debug(new StringBuilder("getServiceUrl: url is").append(url)); //$NON-NLS-1$
		}
		_logger.debug("exit: getServiceUrl"); //$NON-NLS-1$
		return url;
	}

	@Override
	public String getAllObjectsUrl(ServiceData data) {
		if (_logger.isDebugEnabled()) {
			_logger
					.debug(new StringBuilder("entry: getAllObjectsUrl, data:").append(data.toString())); //$NON-NLS-1$
		}
		String url = DOGEAR_TAG_SERVICE_URL;// + data.getUserName();
		if (_logger.isDebugEnabled()) {
			_logger
					.debug(new StringBuilder("getAllObjectsUrl: url is").append(url)); //$NON-NLS-1$
		}
		_logger.debug("exit: getAllObjectsUrl"); //$NON-NLS-1$
		return url;
	}

	@Override
	public ArrayList<ModelObject> parseEntries(Document doc) {
		if (doc == null) return null;
		FOMCategories categories = (FOMCategories) doc.getRoot();
		List<Category> tags = categories.getCategories();
		Iterator<Category> it = tags.iterator();
		ArrayList<ModelObject> rstList = new ArrayList();
		while (it.hasNext()) {
			Category tag = it.next();
			DogearTagObject obj = new DogearTagObject(tag.getTerm(), Integer.parseInt(tag
					.getAttributeValue(new QName(
							"http://www.ibm.com/xmlns/prod/sn", "frequency",
							"snx"))));
			rstList.add(obj);
		}
		return rstList;
	}

	@Override
	public String getObjectsCountUrl(ServiceData data) {
		// TODO Auto-generated method stub
		return null;
	}

}
