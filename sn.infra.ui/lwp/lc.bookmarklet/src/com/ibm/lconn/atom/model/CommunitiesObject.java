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

public class CommunitiesObject extends AtomEntryObject {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

//	private CommunityType communityType = CommunityType.PUBLIC;

	private Log _logger = LogFactory.getLog(CommunitiesObject.class);

	private static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
			.getLogResourceHelper();

	private int memberCount = 0;

	private List<String> tags = new ArrayList<String>();

//	public enum CommunityType {
//		PUBLIC, PRIVATE
//	};

	private String communityId = "";

	public CommunitiesObject(Entry entry) throws IRISyntaxException{
		super(entry);
		try {
			List<Category> ctgs = this.getCategories(null);
			Iterator<Category> itctg = ctgs.iterator();
			while (itctg.hasNext()) {
				Category ctg = itctg.next();
				tags.add(ctg.getTerm());
			}
		} catch (IRISyntaxException e) {
			_logger.error(_logresources.getString("error.connections.entry.parse"), e);
			throw e;
		}
		Element child = entry.getFirstChild(new QName(
				"http://www.ibm.com/xmlns/prod/sn", "membercount", "sn"));
		if (child != null) {
			memberCount = Integer.decode(child.getText());
		}
//		child = entry.getFirstChild(new QName(
//				"http://www.ibm.com/xmlns/prod/sn", "communityType", "sn"));
//		if (child != null) {
//			communityType = CommunityType
//					.valueOf(child.getText().toUpperCase());
//		}
		String[] uriparts;
		uriparts = entry.getId().toString().split("=");
		if (uriparts.length > 1) {
			this.communityId = uriparts[1];
		} else {
			this.communityId = entry.getId().toString();
		}
	}

//	public CommunityType getCommunityType() {
//		return communityType;
//	}
//
//	public void setCommunityType(CommunityType communityType) {
//		this.communityType = communityType;
//	}

	public int getMemberCount() {
		return memberCount;
	}

	public void setMemberCount(int memberCount) {
		this.memberCount = memberCount;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public String getCommunityId() {
		return communityId;
	}

	public void setCommunityId(String communityId) {
		this.communityId = communityId;
	}

}
