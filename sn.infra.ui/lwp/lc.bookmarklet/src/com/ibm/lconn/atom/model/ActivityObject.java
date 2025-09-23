/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2007, 2015                                    
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

public class ActivityObject extends AtomEntryObject {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

	private final String PRIORITY_SCHEMA = "http://www.ibm.com/xmlns/prod/sn/priority";

	private static final Log LOG = LogFactory.getLog(ActivityObject.class);

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
			.getLogResourceHelper();

	private ActivityPriority priority = ActivityPriority.NORMAL;

	private String dueDate;

	private List<String> tags = new ArrayList<String>();

	private String activityId;

	public enum ActivityPriority {
		NORMAL,
		MEDIUM,
		HIGH
	};

	public ActivityObject(Entry entry) throws IRISyntaxException {
		super(entry);
		try {
			List<Category> ctgs = this.getCategories(PRIORITY_SCHEMA);
			if (ctgs.size() != 0)
				this.priority = ActivityPriority.valueOf(ctgs.get(0).getLabel()
						.toUpperCase());

			ctgs = this.getCategories(null);
			Iterator<Category> itctg = ctgs.iterator();
			while (itctg.hasNext()) {
				Category ctg = itctg.next();
				tags.add(ctg.getTerm());
			}
		} catch (IRISyntaxException e) {
			LOG.error(_logresources.getString("error.connections.entry.parse"), e);
			throw e;
		}
		Element child = entry.getFirstChild(new QName(
				"http://www.ibm.com/xmlns/prod/sn", "duedate", "sn"));
		if (child != null) {
			dueDate = child.getText();
		}
		child = entry.getFirstChild(new QName(
				"http://www.ibm.com/xmlns/prod/sn", "activity", "sn"));
		if (child != null) {
			activityId = child.getText();
		}
	}

	public String getActivityId() {
		return activityId;
	}

	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public ActivityPriority getPriority() {
		return priority;
	}

	public void setPriority(ActivityPriority priority) {
		this.priority = priority;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

}
