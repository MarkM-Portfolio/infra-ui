/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


package com.ibm.lconn.bookmarklet.bean;

import java.util.List;
import java.util.regex.Pattern;

import com.ibm.lconn.atom.model.DogearObject;
import com.ibm.lconn.atom.model.ModelObject;

public class FormBean {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private String title;
	private String verbiage;
	private String url;
	private String tagsDisplayed;
	private String link_id;
	private List<String> tags;
	private boolean privateFlag;
	
	private List<ModelObject> activities;
	private List<ModelObject> communities;
	private List<ModelObject> blogs;
	
	private List<String> errors;
	
	
	public List<String> getErrors() {
		return errors;
	}
	public void setErrors(List<String> errors) {
		this.errors = errors;
	}
	public List<ModelObject> getActivities() {
		return activities;
	}
	public void setActivities(List<ModelObject> activites) {
		this.activities = activites;
	}
	public List<ModelObject> getBlogs() {
		return blogs;
	}
	public void setBlogs(List<ModelObject> blogs) {
		this.blogs = blogs;
	}
	public List<ModelObject> getCommunities() {
		return communities;
	}
	public void setCommunities(List<ModelObject> communities) {
		this.communities = communities;
	}
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	public String getTagsDisplayed() {
		return tagsDisplayed;
	}
	public void setTagsDisplayed(String tagsDisplayed) {
		this.tagsDisplayed = tagsDisplayed;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getVerbiage() {
		return verbiage;
	}
	public void setVerbiage(String verbiage) {
		this.verbiage = verbiage;
	}
	public String getLinkId() {
		return link_id;
	}
	public void setLinkId(String link_id) {
		this.link_id = link_id;
	}
	public boolean getPrivateFlag() {
		return privateFlag;
	}
	public void setPrivateFlag(boolean isPrivate) {
		this.privateFlag = isPrivate;
	}
	
}
