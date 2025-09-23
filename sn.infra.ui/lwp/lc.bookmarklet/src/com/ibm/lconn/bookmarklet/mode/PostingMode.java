/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.mode;

import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.hrl.utils.HTMLParse.HTMLParse;
import com.ibm.lconn.atom.ConnectionsObjectHelper;
import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.data.BlogsEntryData;
import com.ibm.lconn.atom.data.BookmarkServiceData;
import com.ibm.lconn.atom.exception.APPServiceException;
import com.ibm.lconn.atom.exception.AtomServiceException;
import com.ibm.lconn.atom.exception.DuplicateBookmarkException;
import com.ibm.lconn.atom.model.DogearObject;
import com.ibm.lconn.atom.service.ConnectionsService;
import com.ibm.lconn.atom.service.DogearBookmarkService;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.bookmarklet.util.HtmlUtil;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class PostingMode extends Mode {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private static final Log LOG = LogFactory.getLog(PostingMode.class);
	private static final ResourceBundleHelper _logResources = BookmarkletUIResourceHelper.getLogResourceHelper();
	public PostingMode(HttpServletRequest request, HttpServletResponse response) {
		super(request, response);
	}

	@Override
	public Object perform() throws AtomServiceException{
		new ConnectionsCollector().save();
		return "success";
	}

	public boolean validateURL(String url) throws AtomServiceException{
		ServiceConfiguration.setHandler(configurationHandler);
		ConnectionsObjectHelper invoker = ConnectionsObjectHelper.getInstance();
		BookmarkServiceData data = new BookmarkServiceData();
		handleAuthantication(request, data);
		data.setTitle(getParam(Constants.title));
		String tempUrl = getParam(Constants.url);
		if (tempUrl.indexOf("://")<0) {
			tempUrl = "http://" + tempUrl;
		}
		data.setUrl(tempUrl);
		
		String link_id = getParam(Constants.link_id);
		try{
			invoker.addConstraint(DogearBookmarkService.URL.equals(tempUrl));
			List bookmarks = invoker.getObjects(ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data);
			if (bookmarks!=null && bookmarks.size()>0){
				DogearObject bookmark = (DogearObject)bookmarks.get(0);
				if (bookmark.getBookmarkID().equals(link_id)){
					return false;
				}else{
					return true;
				}
			}
			return false;
		}catch(Exception e){
			LOG.error(_logResources.getString("error.post.dogear.check"), e);
			throw new AtomServiceException(_logResources.getString("error.post.dogear.check"));
		}
	}
	/**
	 * post the bookmark via Atom protocol
	 * 
	 * 
	 * @author Raja (wanghek@cn.ibm.com)
	 * 
	 */
	class ConnectionsCollector {
		/**
		 * save bookmark to dogear/communities/activites via atom
		 * 
		 * 
		 * @throws APPServiceException
		 * @throws AtomServiceException
		 */
		public void save() throws APPServiceException, AtomServiceException {
			ServiceConfiguration.setHandler(configurationHandler);

			ConnectionsObjectHelper invoker = ConnectionsObjectHelper
					.getInstance();
			boolean hasError = false;
			DuplicateBookmarkException duplicateBookmarkEx = null;
			int errorCount = 0;
			StringBuffer errorMessage = new StringBuffer();
			try {
				saveToDogear(invoker);
			}catch(Exception e) {
				LOG.error(_logResources.getString("error.post.dogear"), e);
				errorMessage.append(e.getMessage() + " \n");
				hasError = true;
				errorCount++;
			}
			try {
			// add bookmark to Communities
				saveToCommunities(invoker);
			} catch (DuplicateBookmarkException e) {
			    hasError = true;
				errorCount++;
				duplicateBookmarkEx = e;
				errorMessage.append(e.getMessage() + "\n");
			}catch(Exception e) {
				LOG.error(_logResources.getString("error.post.communities"), e);
				errorMessage.append(e.getMessage() + "\n");
				hasError = true;
				errorCount++;
			}
			try {
			// add bookmark to Activities
				saveToActivities(invoker);
			}catch(Exception e) {
				LOG.error(_logResources.getString("error.post.activities"), e);
				errorMessage.append(e.getMessage() + "\n");
				hasError = true;
				errorCount++;
			}
			try {
			// add entry(entries) to Blogs
				saveToBlogs(invoker);
			}catch(Exception e) {
				LOG.error(_logResources.getString("error.post.blogs"), e);
				errorMessage.append(e.getMessage() + "\n");
				hasError = true;
				errorCount++;
			}
			if (hasError) {
				request.setAttribute("errorMessage", errorMessage);
				if(errorCount == 1 && duplicateBookmarkEx != null) {
				   throw duplicateBookmarkEx;
				}
				throw new APPServiceException("Error occured while saving the bookmark");
			}
			if ("true".equals(getParam("closeme")) && "true".equals(getParam("inframe"))) {
				String url = getParam(Constants.constantUrl);
				/**
				 * if no protocal provided in the url, by default add 'http://'
				 */
				while (url.startsWith("/")) {
					url = url.substring(1);
				}
				if (url.indexOf("://") <= 0) {
					if (url.indexOf("://") < 0) {
						url = "http://" + url;
					}else {
						url = "http" + url;
					}
				}
				request.setAttribute("goback", url);
			}
		}

		private void saveToActivities(ConnectionsObjectHelper invoker) throws APPServiceException {
			String[] activityUuids = getParamValues(Constants.activityID);
			if (LOG.isDebugEnabled()){
				LOG.debug("activity selected: " + (activityUuids == null? null:(activityUuids.length>0? activityUuids[0]: "empty activities array")));
			}
			if (activitiesEnabled && activityUuids != null && activityUuids.length>0) {
				BookmarkServiceData data = new BookmarkServiceData();
				handleAuthantication(request, data);
				data.setTitle(getParam(Constants.title));
				String tempUrl = getParam(Constants.url);
				if (tempUrl.indexOf("://")<0) {
					tempUrl = "http://" + tempUrl;
				}
				data.setUrl(tempUrl);
				String messageWrapText = "";
				data.setUseHTML(true);
				if (!VenturaConfigurationHelper.Factory.getInstance().getUseRichTextEditorInBookmarklet()){
					messageWrapText = String.valueOf((char)13);
					data.setUseHTML(false);
				}
				data.setComments(getParam(Constants.description) + messageWrapText + getParam(Constants.descriptionForActivities));
				String tags = getParam(Constants.tags);
				if (tags != null && !tags.trim().equals("")) {
					StringTokenizer t = new StringTokenizer(tags, " \n\r\f\t,\u3000");
					while (t.hasMoreTokens())
						data.addTag(t.nextToken());
				}
				data.setPrivate("true".equals(getParam(Constants.privateActivityBookmark)));
				boolean hasError = false;
				for (int i = 0; i < activityUuids.length; i++) {
					try {
						data.setOwnerId(activityUuids[i].trim());
						invoker.publish(
								ConnectionsService.ACTIVITIES_BOOKMARK_SERVICE,
								data);
					}catch(Exception e) {
						hasError = true;
						LOG.error(_logResources.getString("error.post.activities"), e);
					}
				}
				if (hasError) {
					throw new APPServiceException(_logResources.getString("error.post.activities"));
				}
			}
		}

		private void saveToCommunities(ConnectionsObjectHelper invoker) throws APPServiceException, DuplicateBookmarkException {
			String [] communityUuids = getParamValues(Constants.communityID);
			if (LOG.isDebugEnabled()){
				LOG.debug("communities selected: " + (communityUuids == null? null:(communityUuids.length>0? communityUuids[0]: "empty communities array")));
			}
			
			if (communitiesEnabled && communityUuids != null && communityUuids.length>0) {
				BookmarkServiceData data = new BookmarkServiceData();
				handleAuthantication(request, data);
				data.setTitle(getParam(Constants.title));
				String tempUrl = getParam(Constants.url);
				if (tempUrl.indexOf("://")<0) {
					tempUrl = "http://" + tempUrl;
				}
				data.setUrl(tempUrl);
				if (VenturaConfigurationHelper.Factory.getInstance().getUseRichTextEditorInBookmarklet()){
					String comments = getParam(Constants.description) + "\n" + getParam(Constants.descriptionForCommunities);
					comments = comments.replaceAll("<.*?>", "");
					HTMLParse parser = new HTMLParse(new StringBuffer(comments));
					data.setComments(parser.getText());
				}else {
					data.setComments(getParam(Constants.description) + "\n" + getParam(Constants.descriptionForCommunities));
				}
				data.setImportant("true".equals(getParam(Constants.importantCommuBookmark)));
				
				String tags = getParam(Constants.tags);
				if (tags != null && !tags.trim().equals("")) {
					StringTokenizer t = new StringTokenizer(tags, " \n\r\f\t,\u3000");
					while (t.hasMoreTokens())
						data.addTag(t.nextToken());
				}
				boolean hasError = false;
				boolean duplicate = false;
				DuplicateBookmarkException ex = null;
				for (int i = 0; i < communityUuids.length; i++) {
					try {
						data.setOwnerId(communityUuids[i].trim());
						boolean isPostFeed = "/postFeed".equals(request.getServletPath()) || "/postFeedAjax".equals(request.getServletPath());
						if (isPostFeed){
							invoker.publish(
									ConnectionsService.COMMUNITIES_FEED_SERVICE,
									data);
						}else {
							invoker.publish(
									ConnectionsService.COMMUNITIES_BOOKMARK_SERVICE,
									data);
						}
					}catch(DuplicateBookmarkException e){
						request.setAttribute("duplicateBookmark", new Boolean(true));
						hasError = true;
						duplicate = true;
						ex = e;
						LOG.error(e.getMessage());
					}
					catch(Exception e) {
						hasError = true;
						LOG.error(_logResources.getString("error.post.communities"), e);
					}
				}
				if (hasError) {
					if (duplicate){
						throw ex;
					}else{
						throw new APPServiceException(_logResources.getString("error.post.communities"));
					}
				}
			}
		}

		private void saveToDogear(ConnectionsObjectHelper invoker) throws APPServiceException, AtomServiceException {
			if (dogearEnabled) {
				//save to dogear if selected
				BookmarkServiceData data = new BookmarkServiceData();
				handleAuthantication(request, data);
				String link_id = getParam(Constants.link_id);
				if (LOG.isDebugEnabled()){
					LOG.debug("link_id = " + link_id);
				}
				boolean hasError = false;
				if (request.getParameter(Constants.addToDogear) != null
						&& !"".equals(request.getParameter(Constants.addToDogear)) 
						&& !"false".equals(request.getParameter(Constants.addToDogear))) {
					data.setTitle(getParam(Constants.title));
					String tempUrl = getParam(Constants.url);
					if (tempUrl.indexOf("://")<0) {
						tempUrl = "http://" + tempUrl;
					}
					data.setUrl(tempUrl);
					if (VenturaConfigurationHelper.Factory.getInstance().getUseRichTextEditorInBookmarklet()){
						data.setUseHTML(true);
					}else {
						data.setUseHTML(false);
					}
					data.setComments(getParam(Constants.description));
					data.setPrivate("true"
							.equals(getParam(Constants.privateDogear)));

					String tags = getParam(Constants.tags);
					if (tags != null && !tags.trim().equals("")) {
						StringTokenizer t = new StringTokenizer(tags, " \n\r\f\t,\u3000");
						while (t.hasMoreTokens())
							data.addTag(t.nextToken());
					}
					if (link_id == null) { // new bookmark
						if (LOG.isDebugEnabled()) {
							LOG.debug("publish new dogear");
						}
						try {
							invoker.publish(
									ConnectionsService.DOGEAR_BOOKMARK_SERVICE,
									data);
						} catch (Exception e) {
							hasError = true;
							LOG.error(_logResources.getString("error.post.dogear"), e);
							throw new APPServiceException(_logResources
									.getString("error.post.dogear"));
						}
					} else { // edit existing bookmark
						if (LOG.isDebugEnabled()) {
							LOG.debug("update existing bookmark");
						}
						try {
							invoker.addConstraint(DogearBookmarkService.URL
									.equals(getParam(Constants.constantUrl)));
							invoker.update(
									ConnectionsService.DOGEAR_BOOKMARK_SERVICE,
									data);
						} catch (Exception e) {
							hasError = true;
							LOG.error(_logResources
									.getString("error.update.dogear"), e);
							throw new APPServiceException(_logResources
									.getString("error.update.dogear"));
						}
					}
				}else if (request.getParameter(Constants.delete) != null && link_id != null 
								&& link_id.equals(request.getParameter(Constants.delete))) { // delete a bookmark
					data.setUrl(getParam(Constants.constantUrl));
					if (LOG.isDebugEnabled()){
						LOG.debug("delete existing bookmark");
					}
					try{
						invoker.addConstraint(DogearBookmarkService.URL.equals(getParam(Constants.constantUrl)));
						invoker.delete(ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data);
					}catch(Exception e){
						hasError = true;
						LOG.error(_logResources.getString("error.delete.dogear"), e);
						throw new APPServiceException(_logResources.getString("error.delete.dogear"));
					}
				}
			}
		}
		
		private void saveToBlogs(ConnectionsObjectHelper invoker) throws APPServiceException, AtomServiceException {
			if (blogsEnabled) {
				BlogsEntryData data = new BlogsEntryData();
				handleAuthantication(request, data);
				String[] blogTitles = getParamValues(Constants.blogID);
				if(LOG.isDebugEnabled()){
					LOG.debug("blogs selected: " + (blogTitles == null? null: (blogTitles.length>0?blogTitles[0]:"empty blogs array")));
				}
				if (blogTitles != null && blogTitles.length>0) {
					data.setTitle(getParam(Constants.title));
					String tempUrl = getParam(Constants.url);
					if (tempUrl.indexOf("://")<0) {
						tempUrl = "http://" + tempUrl;
					}
//					data.setUrl(tempUrl);
					data.setBody(getParam(Constants.description) + 
							"<br />" + 
							BookmarkletUIResourceHelper.getResourceHelper(request.getLocale()).getString("post.toblogs.content", 
									"<a href=\"" + tempUrl + "\" target=\"blank\">" + HtmlUtil.encodeHtml(getParam(Constants.title)) + "</a>") + 
							"<br />" + 
							getParam(Constants.descriptionForBlogs));
					String tags = getParam(Constants.tags);
					if (tags != null && !tags.trim().equals("")) {
						StringTokenizer t = new StringTokenizer(tags, " \n\r\f\t,\u3000");
						while (t.hasMoreTokens())
							data.addTag(t.nextToken());
					}
					boolean hasError = false;
					for(int i=0;i<blogTitles.length;i++) {
						try {
							data.setOwner(blogTitles[i].trim());
							invoker.publish(ConnectionsService.BLOGS__SERVICE, data);
						}catch(Exception e) {
							hasError = true;
							LOG.error(_logResources.getString("error.post.blogs"), e);
						}
					}
					if (hasError) {
						throw new APPServiceException(_logResources.getString("error.post.blogs"));
					}
				}
			}
		}
	}
}
