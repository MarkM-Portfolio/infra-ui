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
package com.ibm.lconn.atom.model;

import javax.xml.namespace.QName;

import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;

public class BlogObject extends AtomEntryObject {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private String blogTitle = null;
	private String entryPostUrl = null;
	public BlogObject(Entry entry) {
		super(entry);
		blogTitle = entry.getTitle();
		entryPostUrl = this.getLinks().get(0).getRel();
		
	}
	public String getBlogTitle() {
		return blogTitle;
	}
	public void setBlogTitle(String blogTitle) {
		this.blogTitle = blogTitle;
	}
	public String getEntryPostUrl() {
		return entryPostUrl;
	}
	public void setEntryPostUrl(String entryPostUrl) {
		this.entryPostUrl = entryPostUrl;
	}
	
}
