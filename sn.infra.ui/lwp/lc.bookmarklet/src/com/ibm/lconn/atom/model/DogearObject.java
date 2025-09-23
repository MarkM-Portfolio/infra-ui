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

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.namespace.QName;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Category;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.core.util.ResourceBundleHelper;

public class DogearObject extends AtomEntryObject {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private static final String PRIVATE_SCHEMA = "http://www.ibm.com/xmlns/prod/sn/flags";
	private static final Log LOG = LogFactory.getLog(DogearObject.class);
	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
	.getLogResourceHelper();
	private List<String> tags =  new ArrayList<String>();
	
	private boolean _private;
	private String id;
	private String title;
	private String verbiage;
	private String tagDisplayed;
	
	
	public String getTagDisplayed() {
		return tagDisplayed;
	}

	public DogearObject(Entry entry) throws IRISyntaxException{
		super(entry);
		try {
			List<Category> ctgs = this.getCategories(null);
			Iterator<Category> itctg = ctgs.iterator();
			while(itctg.hasNext()) {
				Category ctg = itctg.next();
				tags.add(ctg.getTerm());
			}
			ctgs = this.getCategories(PRIVATE_SCHEMA);
			if(ctgs.size() != 0)
				this._private = ctgs.get(0).getTerm().toUpperCase().equalsIgnoreCase("private");
			
//			Element child = entry.getFirstChild(new QName("id"));
//			if(child != null) {
				String text = entry.getId().toString();
				id = text.substring(text.indexOf("link:") + 5);
//			}
//			child = entry.getFirstChild(new QName("title"));
//			if (child != null) {
				title = entry.getTitle();
//			}
//			child = entry.getFirstChild(new QName("content"));
//			if (child != null) {
				verbiage = entry.getContent();
				verbiage = verbiage.trim();
				verbiage = verbiage.substring("<div><p>".length(), verbiage.length() - "</div></p>".length()).trim();
//			}
//			child = entry.getFirstChild(new QName("tagDisplayed"));
//			if(child != null) {
//				tagDisplayed = child.getText();
//			}
			if (tagDisplayed == null) {
				if (tags != null&& tags.size()>0) {
					tagDisplayed = (String)tags.get(0);
					for(int i=1;i<tags.size();i++) {
						tagDisplayed += " " + (String)tags.get(i);
					}
				}
			}
		} catch (IRISyntaxException e) {
			LOG.error(_logresources.getString("error.connections.entry.parse"), e);
			throw e;
		}
	}

	public String getBookmarkID() {
		return id;
	}
	
	public boolean isPrivate() {
		return _private;
	}

	public String getTitle() {
		return title;
	}

	public String getVerbiage() {
		return verbiage;
	}

	public List getTags() {
		return tags;
	}
}
