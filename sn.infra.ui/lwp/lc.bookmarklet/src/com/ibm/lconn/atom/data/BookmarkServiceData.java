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
package com.ibm.lconn.atom.data;

import java.util.ArrayList;


public class BookmarkServiceData extends ServiceData {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private String _ownerId;
	
	private ArrayList<String> _tags = new ArrayList();;
	
	private String _url; 
	
	private String _comments;
	
	private String _title;
	
	private boolean _private = false;
	
	private boolean _important = false;

	public String getOwnerId() {
		return _ownerId;
	}
	
	public void setOwnerId(String id) {
		this._ownerId = id;
	}



	public String getUrl() {
		return _url;
	}
	
	public void setUrl(String url) {
		this._url = url;
	}


	public String getComments() {
		return _comments;
	}
	
	public void setComments(String comments) {
		this._comments = comments;
	}


	public String getTitle() {
		return _title;
	}

	public void setTitle(String title) {
		this._title = title;
	}

	
	public void addTag(String tag) {
		_tags.add(tag);
	}
	
	public ArrayList<String> getTags() {
		return _tags;
	}

	public boolean isImportant() {
		return _important;
	}

	public void setImportant(boolean _important) {
		this._important = _important;
	}

	public boolean isPrivate() {
		return _private;
	}

	public void setPrivate(boolean _private) {
		this._private = _private;
	}

}
