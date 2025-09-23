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

import java.util.Iterator;
import java.util.List;

import javax.xml.namespace.QName;

import org.apache.abdera.model.Category;
import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Link;
import org.apache.abdera.parser.stax.FOMEntry;

public class AtomEntryObject extends FOMEntry implements ModelObject{
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	public AtomEntryObject(Entry entry) {
		this.setTitle(entry.getTitle());
		this.setContent(entry.getContent());
		this.setSummary(entry.getSummary());
				
		List<Category> cgs = entry.getCategories();
		Iterator<Category> itcgs = cgs.iterator();
		while(itcgs.hasNext()) {
			Category cg = itcgs.next();
			this.addCategory(cg);
		}
		
		List<Link> lks = entry.getLinks();
		Iterator<Link> itlks = lks.iterator();
		while(itlks.hasNext()) {
			Link lk = itlks.next();
			this.addLink((Link)lk.clone());
		}
		
		List<QName> qns = entry.getAttributes();
		Iterator<QName> itqns = qns.iterator();
		while(itqns.hasNext()) {
			QName qn = itqns.next();
			this.setAttributeValue(qn, entry.getAttributeValue(qn));
		}
	}
	
	public String getTitleWithSlashes(){
		String titleWithSlashes = getTitle();
		if (titleWithSlashes != null){
			titleWithSlashes = titleWithSlashes.replace("'", "\\\'");
			titleWithSlashes = titleWithSlashes.replace("\"", "\\\\\"");
		}
		return titleWithSlashes;
	}
}
