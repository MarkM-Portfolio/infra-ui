/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2007, 2013                                    
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

import org.apache.abdera.Abdera;
import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.data.BlogsEntryData;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.model.BlogObject;
import com.ibm.lconn.atom.model.ModelObject;
import com.ibm.lconn.bookmarklet.util.TextUtilities;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class BlogsService extends ConnectionsService {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private static final String BLOGS_RETRIEVING_URL = ServiceConfiguration.getString("blogs.retrieving.url");

	private static final String NAMESPACE = "http://www.w3.org/2005/Atom";
	private static final String SNX_NAMESPACE = "http://www.ibm.com/xmlns/prod/sn";
	
	private Log _logger = LogFactory.getLog(BlogsService.class);
	@Override
	public Entry buildEntry(Entry entry, ServiceData data)
			throws IRISyntaxException {
		if(_logger.isDebugEnabled()) {
			_logger.debug(new StringBuilder("entry: buildEntry, data:").append(data.toString()));
		}
		BlogsEntryData bed = (BlogsEntryData)data;
		String title = bed.getTitle();
		if (title == null) title = "";
		title = TextUtilities.stripNonPrintableCharacters(title);
		title = StringUtils.left(title, TextUtilities.getMaxUTF8CharCount(title, 255));
		entry.setTitle(title);
		entry.setContent(bed.getBody());
		Element content = entry.getFirstChild(new QName("http://www.w3.org/2005/Atom", "content"));
		if (VenturaConfigurationHelper.Factory.getInstance().getUseRichTextEditorInBookmarklet()){
			content.setAttributeValue("type", "html");
		}else {
			content.setAttributeValue("type", "text");
		}
		entry.declareNS("http://www.ibm.com/xmlns/prod/sn", "snx");
		entry.declareNS("http://purl.org/atom/app#", "app");
		List tags = bed.getTags();
		if (tags!=null && tags.size()>0) {
			for(int i=0;i<tags.size();i++) {
				entry.addCategory((String)tags.get(i));
			}
		}
		if(_logger.isDebugEnabled()) {
			_logger.debug("finished building BlogsEntry");
		}
		return entry;
	}

	@Override
	public String getAllObjectsUrl(ServiceData data) {
		// TODO Auto-generated method stub
		return BLOGS_RETRIEVING_URL;
	}

	@Override
	public String getObjectsCountUrl(ServiceData data) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPublishingUrl(ServiceData data) {
		BlogsEntryData bed = (BlogsEntryData)data;
		return bed.getOwner();
	}

	@Override
	public ArrayList<ModelObject> parseEntries(Document doc) throws IRISyntaxException{
		if (doc == null) return null;
		Element root = doc.getRoot();
		Element blog = root.getFirstChild(new QName("http://www.w3.org/2007/app", "workspace"));
		ArrayList<ModelObject> rtn = new ArrayList<ModelObject>();
		while(blog != null) {
			Entry entry = new Abdera().getFactory().newEntry();
			Element title = blog.getFirstChild(new QName(SNX_NAMESPACE, "blogLabel", "snx"));
			Element ideablogElement = blog.getFirstChild(new QName(NAMESPACE, "category", "atom"));
			if(ideablogElement != null){
				String term = ideablogElement.getAttributeValue("term");
				if("ideation".equalsIgnoreCase(term)){
					Element frozenElement = ideablogElement.getNextSibling();
					String frozen = "";
					if(frozenElement != null){
						frozen = frozenElement.getAttributeValue("term");
					}
					if("closed".equals(frozen) || "frozen".equals(frozen)){
						blog = blog.getNextSibling();
						continue;
					}
				}
			}
			Element collection = blog.getFirstChild(new QName("http://www.w3.org/2007/app", "collection"));
			String posturl = "";
			while(collection != null) {
				String href = collection.getAttributeValue("href");
				if (href !=null && href.endsWith("entries")) {
					posturl = href;
					entry.addLink("collection", posturl);
					entry.setTitle(title.getText());
					rtn.add(new BlogObject(entry));
					break;
				}else {
					collection = collection.getNextSibling(new QName("collection"));
				}
			}
			blog = blog.getNextSibling();
		}
		return rtn;
	}
}

