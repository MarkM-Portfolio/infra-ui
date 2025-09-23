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

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Entry;

import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.model.ModelObject;

public abstract class ConnectionsService {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	/**
	 * 
	 */
	public final static ConnectionsService DOGEAR_BOOKMARK_SERVICE = new DogearBookmarkService();
	
	/**
	 * 
	 */
	public final static ConnectionsService DOGEAR_TAG_SERVICE = new DogearTagService();

	/**
	 * 
	 */
	public final static ConnectionsService COMMUNITIES_BOOKMARK_SERVICE = new CommunitiesBookmarkService();

	/**
	 * 
	 */
	public final static ConnectionsService COMMUNITIES_FEED_SERVICE = new CommunitiesFeedService();
	
	/**
	 * 
	 */
	public final static ConnectionsService ACTIVITIES_BOOKMARK_SERVICE = new ActivitiesBookmarkService();
	
	/**
	 * 
	 */
	public final static ConnectionsService ACTIVITIES__SERVICE = new ActivitiesService();
	
	/**
	 * 
	 */
	public final static ConnectionsService COMMUNITIES__SERVICE = new CommunitiesService();
	
	public final static ConnectionsService BLOGS__SERVICE = new BlogsService();

	/**
	 * @param entry
	 * @param data
	 * @return
	 * @throws IRISyntaxException
	 */
	public abstract Entry buildEntry(Entry entry, ServiceData data)
			throws IRISyntaxException;

	public abstract ArrayList<ModelObject> parseEntries(Document doc) throws IRISyntaxException;

	/**
	 * @param data
	 * @return
	 */
	public abstract String getPublishingUrl(ServiceData data);

	public abstract String getAllObjectsUrl(ServiceData data);
	
	public abstract String getObjectsCountUrl(ServiceData data);
	
	public boolean hasNextPage(){
		return false;
	}
	
	public String getNextPageUrl(){
		return null;
	}

}
