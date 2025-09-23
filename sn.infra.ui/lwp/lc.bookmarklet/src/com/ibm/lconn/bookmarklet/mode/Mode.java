/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2008, 2012                                   *
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */

package com.ibm.lconn.bookmarklet.mode;

import java.util.Enumeration;
import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.PageContext;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.config.AbstractConfigurationHandler;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.exception.AtomServiceException;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.bookmarklet.util.XmlUtil;
import com.ibm.lconn.config.ConnectionsConfiguration;
import com.ibm.lconn.core.util.ResourceBundleHelper;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public abstract class Mode {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	protected static ResourceBundleHelper _logresources = BookmarkletUIResourceHelper
			.getLogResourceHelper();

	private static final Log LOG = LogFactory.getLog(Mode.class);

	protected static boolean dogearEnabled = false;

	protected static String dogearServiceUrl;

	protected static boolean communitiesEnabled = false;

	protected static String communitiesServiceUrl;

	protected static boolean blogsEnabled = false;

	protected static String blogsServiceUrl;

	protected static boolean activitiesEnabled = false;

	protected static String activitiesServiceUrl;
	
	protected PageContext pageContext;

	protected static AbstractConfigurationHandler configurationHandler = null;

	static {
		try {
				ConnectionsConfiguration cfg = new ConnectionsConfiguration();
				dogearEnabled =cfg.isDogearEnabled();
				dogearServiceUrl = cfg.getDogearServiceUrl();
				
				communitiesEnabled = cfg.isCommunitiesEnabled();
				communitiesServiceUrl = cfg.getCommunitiesServiceUrl();
				
				blogsEnabled = cfg.isBlogsEnabled();
				blogsServiceUrl = cfg.getBlogsServiceUrl();
				
				activitiesEnabled = cfg.isActivitiesEnabled();
				activitiesServiceUrl = cfg.getActivitiesServiceUrl();
				if (dogearServiceUrl!=null && dogearServiceUrl.endsWith("/")) {
					dogearServiceUrl = dogearServiceUrl.substring(0, dogearServiceUrl.length() - 1);
				}
				if (communitiesServiceUrl != null && communitiesServiceUrl.endsWith("/")) {
					communitiesServiceUrl = communitiesServiceUrl.substring(0, communitiesServiceUrl.length() - 1);
				}
				if (blogsServiceUrl!=null && blogsServiceUrl.endsWith("/")) {
					blogsServiceUrl = blogsServiceUrl.substring(0, blogsServiceUrl.length() - 1);
				}
				if (activitiesServiceUrl!=null && activitiesServiceUrl.endsWith("/")) {
					activitiesServiceUrl = activitiesServiceUrl.substring(0, activitiesServiceUrl.length() - 1);
				}
			}
		catch (VenturaConfigException vce) {
			LOG.error(_logresources.getString("error.connections.init"), vce);
		}

		/**
		 * 
		 * This class is used to init the path used to call atom apis
		 * 
		 * @author Raja (wanghek@cn.ibm.com)
		 * 
		 */
		class ConnectionsConfigurationHandler extends
				AbstractConfigurationHandler {

			private ResourceBundleHelper resources = new ResourceBundleHelper(
					"AtomPathConfig", Mode.class.getClassLoader());

			private Hashtable<String, String> config = new Hashtable<String, String>();

			private ConnectionsConfigurationHandler() {
				super();
				config.put("ActivitiesBookmarkService.url",
								activitiesServiceUrl
										+ resources
												.getString("ActivitiesBookmarkService.url"));
				config.put("CommunitiesBookmarkService.url",
								communitiesServiceUrl
										+ resources
												.getString("CommunitiesBookmarkService.url"));
				config.put("CommunitiesFeedService.url",
						communitiesServiceUrl
								+ resources
										.getString("CommunitiesFeedService.url"));	
				
				config.put("dogear.bookmark.publishing.url",
								dogearServiceUrl
										+ resources
												.getString("dogear.bookmark.publishing.url"));
				config.put("dogear.bookmark.service.url", dogearServiceUrl
						+ resources.getString("dogear.bookmark.service.url"));
				config.put("dogear.bookmark.count.url", dogearServiceUrl
						+ resources.getString("dogear.bookmark.count.url"));
				config.put("dogear.tag.service.url", dogearServiceUrl
						+ resources.getString("dogear.tag.service.url"));
				config.put("ActivitiesService.url", activitiesServiceUrl
						+ resources.getString("ActivitiesService.url"));
				config.put("CommunitiesService.url", communitiesServiceUrl
						+ resources.getString("CommunitiesService.url"));
				config.put("OwnerCommunitiesService.url", communitiesServiceUrl
						+ resources.getString("OwnerCommunitiesService.url"));
				config.put("blogs.retrieving.url", blogsServiceUrl + resources.getString("blogs.retrieving.url"));
				config.put("relatedCommunitiesFeed.publish.url", 
						communitiesServiceUrl + "/recomm" + resources.getString("relatedCommunitiesFeed.publish.url"));
			}

			@Override
			public Enumeration<String> getKeys() {
				return config.keys();
			}

			@Override
			protected Object handleGetObject(String key) {
				return config.get(key);
			}

		}
		configurationHandler = new ConnectionsConfigurationHandler();
	}

	public Mode(HttpServletRequest request, HttpServletResponse response) {
		this.request = request;
		this.response = response;
	}

	public String getParam(String key) {
		String tmp = request.getParameter(key);
		return tmp == null ? tmp : XmlUtil.clean(tmp.trim());
	}
	
	public String[] getParamValues(String key) {
		return request.getParameterValues(key);
	}
	
	
	protected HttpServletRequest request;
	protected HttpServletResponse response;

	public abstract Object perform()throws AtomServiceException, IRISyntaxException;
	
	public boolean isEditBookmark(){
		return getParam(Constants.link_id) != null;
	}
	
	public boolean validateURL(String url) throws AtomServiceException{
		return true;
	}
	/**
	 * fetch request headers and pass them to ServiceData to implement single
	 * sign-on
	 * 
	 * @param request
	 * @param data
	 * @return
	 */
	public ServiceData handleAuthantication(HttpServletRequest request,
			ServiceData data) {
//		Cookie[] cookies = request.getCookies();
//		if (cookies == null || cookies.length == 0)
//			return data;
//
//		for (int i = 0; i < cookies.length; i++) {
//			if (cookies[i].getName().equals(Constants.cookieLtpaToken)) {
//				data.addCookie(Constants.cookieLtpaToken, cookies[i].getValue());
//			} else if (cookies[i].getName().equals(Constants.cookieLtpaToken2)) {
//				data.addCookie(Constants.cookieLtpaToken2, cookies[i].getValue());
//			} else if (cookies[i].getName().equals("SMSESSION")){
//				data.addCookie("SMSESSION", cookies[i].getValue());
//			}else if (cookies[i].getName().equals("iPlanetDirectoryPro")) {
//				data.addCookie("iPlanetDirectoryPro", cookies[i].getValue());
//			} else if (cookies[i].getName().equals("AMAuthCookie")) {
//				data.addCookie("AMAuthCookie", cookies[i].getValue());
//			}
//		}
		data.setCookieString(request.getHeader("Cookie"));
		
		return data;
	}
	
	public interface Constants {
		public static final String url = "url";
		public static final String title = "title";
		public static final String description = "verbiage";
		public static final String tags = "tags";
		public static final String version = "ver";
//		public static final String addToOthers = "addToOthers";
		public static final String addToCommunities = "addToCommunities";
		public static final String addToActivities = "addToActivities";
		public static final String addToBlogs = "addToBlogs";
		public static final String showDogearOnly = "showDogearOnly";
		
		public static final String delete = "delete";
		public static final String link_id = "link_id";
		public static final String constantUrl = "constantUrl";
		public static final String privateDogear = "privateDogear";
		public static final String addToDogear = "addtodogear";

		public static final String cookieLtpaToken2 = "LtpaToken2";
		public static final String cookieLtpaToken = "LtpaToken";
		public static final String tagSeparator = " ";

		public static final String descriptionForActivities = "verbiageForActivities";
		public static final String activityID = "activityUuid";
		public static final String privateActivityBookmark = "privateActivityBookmark";
		
		
		public static final String descriptionForCommunities = "verbiageForCommunities";
		public static final String importantCommuBookmark = "importantCommuBookmark";
		public static final String communityID = "communityUuid";
		
		public static final String descriptionForBlogs = "verbiageForBlogs";
		public static final String blogID = "blogUuid";
//		public static final String prefixForURL = "prefixForURL";
	}

	public PageContext getPageContext() {
		return pageContext;
	}

	public void setPageContext(PageContext pageContext) {
		this.pageContext = pageContext;
	}
	
	public boolean getUsePlainTextEditor(){
		VenturaConfigurationHelper vchelper = VenturaConfigurationHelper.Factory.getInstance();
		return (!vchelper.getUseRichTextEditorInBookmarklet() || "yes".equals(request.getParameter("plaintext")));
	}
}
