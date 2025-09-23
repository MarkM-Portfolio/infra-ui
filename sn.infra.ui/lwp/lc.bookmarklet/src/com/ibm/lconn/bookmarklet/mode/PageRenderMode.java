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


package com.ibm.lconn.bookmarklet.mode;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.ConnectionsObjectHelper;
import com.ibm.lconn.atom.config.ServiceConfiguration;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.exception.AtomServiceException;
import com.ibm.lconn.atom.model.DogearObject;
import com.ibm.lconn.atom.service.ConnectionsService;
import com.ibm.lconn.atom.service.DogearBookmarkService;
import com.ibm.lconn.bookmarklet.bean.FormBean;

public class PageRenderMode extends Mode{
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private FormBean form = null;
	private static final Log LOG = LogFactory.getLog(PageRenderMode.class);

	public PageRenderMode(HttpServletRequest request, HttpServletResponse response) {
		super(request, response);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Object perform() throws AtomServiceException, IRISyntaxException {
		request.setAttribute("servletPath", request.getServletPath());
		request.setAttribute("version", getParam(Constants.version));
		
		String url = getParam(Constants.url);
		form = new FormBean();
		form.setUrl(url);
		form.setTitle(getParam(Constants.title));
		form.setVerbiage(getParam(Constants.description));
		form.setTagsDisplayed(getParam(Constants.tags));
		
		ServiceConfiguration.setHandler(configurationHandler);
		ConnectionsObjectHelper fetcher = ConnectionsObjectHelper.getInstance();
		boolean hasError = false;
		ArrayList errs = new ArrayList();
		
		ServiceData data = new ServiceData();
		data = handleAuthantication(request, data);
		/**
		 * if not add to other services, don't query the url from dogear
		 */
		if (!"true".equals(getParam(Constants.addToBlogs))
				&& !"true".equals(getParam(Constants.addToActivities))
				&& !"true".equals(getParam(Constants.addToCommunities))) {
			try {
				if (url != null && !"".equals(url)) {
					fetcher.addConstraint(DogearBookmarkService.URL.equals(url));
					getLinkFromDogear(fetcher, data);
					fetcher.reset();
				}
			}catch(Exception e) {
				LOG.error("error get link from Dogear", e);
				hasError = true;
			}
		}
		if (hasError) {
			request.setAttribute("errs", errs);
		}
		request.setAttribute("form", form);
		if (LOG.isDebugEnabled()){
			LOG.debug("dogearEnabled = " + dogearEnabled);
		}
		request.setAttribute("conflictWithExistingBookmark", getParam("conflictWithExistingBookmark"));
		request.setAttribute(Constants.addToCommunities, String.valueOf("true".equals(getParam(Constants.addToCommunities))));
		request.setAttribute(Constants.addToActivities, String.valueOf("true".equals(getParam(Constants.addToActivities))));
		request.setAttribute(Constants.addToBlogs, String.valueOf("true".equals(getParam(Constants.addToBlogs))));
		if ("true".equals(getParam(Constants.showDogearOnly))) {
			if (LOG.isDebugEnabled()){
				LOG.debug("edit or copy, show dogear tab only.");
			}
		}
		request.setAttribute(Constants.showDogearOnly, String.valueOf("true".equals(getParam(Constants.showDogearOnly))));
		
		request.setAttribute("inframe", getParam("inframe"));
		request.setAttribute("DogearEnabled", String.valueOf(dogearEnabled));
		request.setAttribute("DogearServiceUrl", dogearServiceUrl);
		if (LOG.isDebugEnabled()){
			LOG.debug("activitiesEnabled = " + activitiesEnabled);
		}
		request.setAttribute("ActivitiesEnabled", String.valueOf(activitiesEnabled));
		request.setAttribute("ActivitiesServiceUrl", activitiesServiceUrl);
		if (LOG.isDebugEnabled()){
			LOG.debug("communitiesEnabled = " + communitiesEnabled);
		}
		request.setAttribute("CommunitiesEnabled", String.valueOf(communitiesEnabled));
		request.setAttribute("CommunitiesServiceUrl", communitiesServiceUrl);
		if (LOG.isDebugEnabled()){
			LOG.debug("blogsEnabled = " + blogsEnabled);
		}
		request.setAttribute("BlogsEnabled", String.valueOf(blogsEnabled));
		request.setAttribute("BlogsServiceUrl", blogsServiceUrl);
		
		if (request.getLocale() != null){
			String locale = request.getLocale().toString().toLowerCase();
			Pattern p = Pattern.compile("[a-zA-z]{2}([\\-\\_][a-zA-z]{2}){0,2}+");
			if (!p.matcher(locale).matches()){
				locale = "en";
			}
			request.setAttribute("locale", request.getLocale().toString().toLowerCase());
			request.setAttribute("language", request.getLocale().getLanguage().toLowerCase());
		}
		
		if (getUsePlainTextEditor() || "yes".equals(request.getParameter("plaintext"))){
			request.setAttribute("plaintext", new Boolean(true));
		}
		
		return "success";
	}

	private void getLinkFromDogear(ConnectionsObjectHelper fetcher, ServiceData data)  throws AtomServiceException, IRISyntaxException{
		if (LOG.isDebugEnabled()){
			LOG.debug("get bookmarks from server ...");
		}
		if (dogearEnabled) {
			List existing = fetcher.getObjects(ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data);
			if (LOG.isDebugEnabled()){
				LOG.debug("bookmarks: alreadyExisting = " + (existing != null && existing.size()>0));
			}
			if(existing != null && existing.size() > 0) {
				DogearObject bookmark = (DogearObject)existing.get(0);
				form.setTitle(bookmark.getTitle());
				form.setTagsDisplayed(bookmark.getTagDisplayed());
				form.setVerbiage(bookmark.getVerbiage());
				form.setLinkId(bookmark.getBookmarkID());
				form.setPrivateFlag(bookmark.isPrivate());
			}
		}
		if (LOG.isDebugEnabled()){
			LOG.debug("end get bookmarks from server ...");
		}
	}

}
