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


package com.ibm.lconn.atom;

import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import org.apache.abdera.Abdera;
import org.apache.abdera.factory.Factory;
import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Entry;
import org.apache.abdera.protocol.Response;
import org.apache.abdera.protocol.client.AbderaClient;
import org.apache.abdera.protocol.client.ClientResponse;
import org.apache.abdera.protocol.client.RequestOptions;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.URIException;
import org.apache.commons.httpclient.UsernamePasswordCredentials;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.atom.constrain.Constraint;
import com.ibm.lconn.atom.constrain.SearchTextOperator;
import com.ibm.lconn.atom.data.BookmarkServiceData;
import com.ibm.lconn.atom.data.ServiceData;
import com.ibm.lconn.atom.exception.APPServiceException;
import com.ibm.lconn.atom.exception.AtomServiceException;
import com.ibm.lconn.atom.exception.AtomServiceRuntimeException;
import com.ibm.lconn.atom.exception.DuplicateBookmarkException;
import com.ibm.lconn.atom.model.ModelObject;
import com.ibm.lconn.atom.service.ConnectionsService;
import com.ibm.lconn.atom.util.URLUtil;
import com.ibm.lconn.bookmarklet.resources.BookmarkletUIResourceHelper;
import com.ibm.lconn.bookmarklet.util.SecurityUtil;
import com.ibm.lconn.core.util.ResourceBundleHelper;

/**
 * This class encapsulates most operations on <b>IBM Connections Atom & APP
 * APIs</b>.
 * <p>
 * ConnectionsObjectHelper doesn't take resposibility on parsing Atom response
 * or building APP post request, which will be implemented in concret sub-class
 * of <code>ConnectionsService</code>
 * <p>
 * Each code fragment can have their own instance of the
 * ConnectionsObjectHelper, or you could share one instance of the
 * ConnectionsObjectHelper in your application.
 * <p>
 * At first, an instance of the ConnectionsObjectHelper will be initialized by
 * invoking {@link #getInstance()} or {@link #getInstance(HelperConfig)} method.
 * After this, either {@link #getObjects(ConnectionsService, ServiceData)} or
 * {@link #publish(ConnectionsService, ServiceData)} will be invoked to
 * communicate with remote services.
 * <p>
 * A typical invocation sequence is thus:<blockquote>
 * 
 * <pre>
 * ConnectionsObjectHelper helper = ConnectionsObjectHelper.getInstance();
 * ServiceData data = new ServiceData();
 * try {
 * 	ArrayList dogears = helper.getObjects(
 * 			ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data);
 * 	if (dogears.size() &lt; 0)
 * 		fail(&quot;dogears.size() &lt; 0&quot;);
 * } catch (AtomServiceException e) {
 * 	e.printStackTrace();
 * 	fail(e.getMessage());
 * }
 * </pre>
 * 
 * </blockquote>
 * <p>
 * For constrains, please refer to each service's comments or documents for
 * detail.
 * <p>
 * The implementation of this class is thread-safe.<br>
 * 
 * @author Alan Cui (cuicai@cn.ibm.com)
 * 
 */
public class ConnectionsObjectHelper {

	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;

	private static Abdera _abdera;

	private static Factory _factory;

	/**
	 * Initialize a ConnectionsObjectHelper instance with default configuration
	 * 
	 * @return An initialized ConnectionsObjectHelper instance.
	 */
	public static ConnectionsObjectHelper getInstance() {
		return new ConnectionsObjectHelper();
	}

	/**
	 * Initialize a ConnectionsObjectHelper instance with a specified
	 * configuration.
	 * 
	 * @param config
	 *            the configuration object. If the config is null, the default
	 *            configuration will be used.
	 * @return An initialized ConnectionsObjectHelper instance.
	 */
	public static ConnectionsObjectHelper getInstance(HelperConfig config) {
		return new ConnectionsObjectHelper(config);
	}

	private static final Log _logger = LogFactory.getLog(ConnectionsObjectHelper.class);
	private static final ResourceBundleHelper _logResources = BookmarkletUIResourceHelper.getLogResourceHelper();

	private ArrayList<Constraint> _constraints = new ArrayList<Constraint>();

	private SearchTextOperator _operator = null;

	private HelperConfig _config = null;

	private ConnectionsObjectHelper() {
		if (_abdera == null || _factory == null) {
			init();
		}
	}

	private ConnectionsObjectHelper(HelperConfig config) {
		if (_abdera == null || _factory == null) {
			init();
		}
		_config = config;
	}

	/**
	 * This method is used toggether with
	 * {@link #getObjects(ConnectionsService, ServiceData)}, or
	 * {@link #getObjects(ConnectionsService, ServiceData, int)} to limit the
	 * range of the objects which are being fetched or counted.
	 * <p>
	 * As an <code>ArrayList</code> is used to store all the constraints, this
	 * method is synchronized explicitly on the <code>ArrayList</code> object
	 * <code>_constraints</code>.
	 * 
	 * @param constraint
	 *            A constraint object, usually it is created by some field.
	 * @return The ConnectionsObjectHelper itself.
	 * @throws AtomServiceRuntimeException
	 *             If constrain is null.
	 * 
	 */

	public ConnectionsObjectHelper addConstraint(Constraint constraint)
			throws AtomServiceRuntimeException {
		if (constraint == null) {
			throw new AtomServiceRuntimeException(
					_logResources.getString("error.constraint.empty"));
		}
		synchronized (_constraints) {
			this._constraints.add(constraint);
		}
		return this;
	}


	/**
	 * This method will fetch a number of remote objects represented in Atom
	 * into an ArrayList. All the remote object will be paged into several pages
	 * in remote system, and this method only fetch the objects in the first
	 * page.
	 * <p>
	 * If need to specify which page to fetch on the fly, use
	 * {@link #getObjects(ConnectionsService, ServiceData, int)} instead.
	 * <p>
	 * Usually, this method will be combined with
	 * {@link #addConstraint(Constraint)} to limit the range of objects. A
	 * Typical example is:
	 * 
	 * <pre>
	 * ArrayList dogears = helper.addConstraint(DogearBookmarkService.TAG.in(&quot;os&quot;))
	 * 		.addConstraint(DogearBookmarkService.EMAIL.equals(&quot;cuicai@cn.ibm.com&quot;))
	 * 		.getObjects(ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data);
	 * </pre>
	 * 
	 * or in another style:
	 * 
	 * <pre>
	 * helper.addConstraint(DogearBookmarkService.TAGS.includes(&quot;cygwin&quot;));
	 * helper.addConstraint(DogearBookmarkService.EMAIL.equals(&quot;cuicai@cn.ibm.com&quot;));
	 * ArrayList dogears = helper.getObjects(
	 * 		ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data);
	 * </pre>
	 * 
	 * @param service
	 *            ConnectionsService object, indicates the type of the objects.
	 * @param data
	 *            Some meta data including login data and so on.
	 * 
	 * @return A list of objects
	 * 
	 * @throws AtomServiceException
	 * @throws IRISyntaxException 
	 * 
	 * @see #getObjects(ConnectionsService, ServiceData, int)
	 * @see #addConstraint(Constraint)
	 * 
	 */

	public ArrayList<ModelObject> getObjects(ConnectionsService service,
			ServiceData data) throws AtomServiceException, IRISyntaxException {
		return getObjects(service, data, 1);
	}

	/**
	 * This method will fetch a number of remote objects represented in Atom
	 * into an ArrayList. All the remote object will be paged into several pages
	 * in remote system, and this method will fetch the objects in the page
	 * specified by the parameter <code>page</code>
	 * <p>
	 * Usually, this method will be combined with
	 * {@link #addConstraint(Constraint)} to limit the range of objects. A
	 * Typical example is:
	 * 
	 * <pre>
	 * ArrayList dogears = helper.addConstraint(DogearBookmarkService.TAG.in(&quot;os&quot;))
	 * 		.addConstraint(DogearBookmarkService.EMAIL.equals(&quot;cuicai@cn.ibm.com&quot;))
	 * 		.getObjects(ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data, 2);
	 * </pre>
	 * 
	 * or in another style:
	 * 
	 * <pre>
	 * helper.addConstraint(DogearBookmarkService.TAGS.includes(&quot;cygwin&quot;));
	 * helper.addConstraint(DogearBookmarkService.EMAIL.equals(&quot;cuicai@cn.ibm.com&quot;));
	 * ArrayList dogears = helper.getObjects(
	 * 		ConnectionsService.DOGEAR_BOOKMARK_SERVICE, data, 9);
	 * </pre>
	 * 
	 * @param service
	 *            ConnectionsService object, indicates the type of the objects.
	 * @param data
	 *            Some meta data including login data and so on.
	 * 
	 * @return A list of objects, if the <code>page</code> exceeds the total
	 *         page number, an empty list will be return
	 * 
	 * @throws AtomServiceException
	 * @throws IRISyntaxException 
	 * 
	 * @see #getObjects(ConnectionsService, ServiceData)
	 * @see #addConstraint(Constraint)
	 * 
	 */
	public ArrayList<ModelObject> getObjects(ConnectionsService service,
			ServiceData data, int page) throws AtomServiceException, IRISyntaxException {
		ArrayList rtn = new ArrayList();
		if (_logger.isTraceEnabled()) {
			_logger.trace(new StringBuilder("entry: getObjects, service:")
					.append(service.toString()).append(", data:").append(
							data.toString()).append(", page:").append(
							String.valueOf(page)));
		}
		Document doc = getDocument(service, data, page);
		rtn = service.parseEntries(doc);
		while (service.hasNextPage()) {
			page = page + 1;
			data.setNextPageUrl(service.getNextPageUrl());
			doc = getDocument(service, data, page);
			if (doc != null) rtn.addAll(service.parseEntries(doc));
		}
		return rtn;
	}

	/**
	 * @param service
	 * @param data
	 * @param page
	 * @return
	 * @throws AtomServiceException
	 */
	private Document getDocument(ConnectionsService service, ServiceData data, int page) throws AtomServiceException {
		// Initialize Abdera client
		AbderaClient client = new AbderaClient(_abdera);
		client.getHttpClientParams().setCookiePolicy("compatibility");
		// If user-password is set, add credentials to the Abdera client
		String url = service.getAllObjectsUrl(data);
		if (data.getUserName().length() != 0
				&& data.getPassword().length() != 0) {
			try {
				client.addCredentials(url, null,
						null, new UsernamePasswordCredentials(data
								.getUserName(), data.getPassword()));

			} catch (URISyntaxException e) {
				final String msg = _logResources.getString("error.add.credential", url);
				_logger.error(msg);
				throw new AtomServiceException(msg, e);

			}
		}

		RequestOptions ro = client.getDefaultRequestOptions();
		// if cookie string is set, add it to the request header
		if (data.getCookieString() != null
				&& data.getCookieString().length() > 0) {
			if (_logger.isDebugEnabled()) {
				_logger.debug(new StringBuilder(
						"Set cookie in the request header with string (")
						.append(data.getCookieString()).toString());
			}
			ro.setHeader("Cookie", data.getCookieString());
		}

		// If remote service is on SSL, accept all the certification.
		// Porbably, we could enable users to manage the certifications that can
		// be allowed, in that way, we have to build a TrustManager dynamically.
		//AbderaClient.registerTrustManager();

		// Format a url for requesting remote server
		// At first this url is fetched from service object, and then apply
		// Constraints on it. Finnally, searchTextOperator or page will be added
		// if exist.
		// new added by Peng Zhang
		// for owner communities. That API does not support page and ps.
		// it supports "results=10&start=10". I will use next page link from feed.

		if (data.isOwnerCommunities() && data.getNextPageUrl()!=null){
			url = data.getNextPageUrl();
			data.setNextPageUrl(null);
		} else {
			url = service.getAllObjectsUrl(data);
			if (_constraints.size() > 0) {
				if (_logger.isDebugEnabled()) {
					_logger.debug(new StringBuilder("There are ").append(
							_constraints.size()).append(
							" constraints should be applyed").toString());
				}
	
				Iterator<Constraint> it = _constraints.iterator();
				Constraint cst = null;
	
				try {
					while (it.hasNext()) {
						cst = it.next();
						url = cst.formatURL(url);
					}
				} catch (Exception e) {
					final String msg = _logResources.getString("error.apply.constraint");
					_logger.error(msg);
					throw new AtomServiceException(msg, e);
				}
			}
	
			try {
	
				if (_operator != null && _constraints.size() > 0) {
					url = _operator.formatURL(url);
				}
				if (_config != null && _config.getSearchTextOperator() != null
						&& _constraints.size() > 0) {
					url = _config.getSearchTextOperator().formatURL(url);
				}
	
				if (_config != null && _config.getPageSize() != 10) {
					url = URLUtil.addQueryParameter(url, "ps", String
							.valueOf(_config.getPageSize()));
				}
	
				if (page != 1) {
					url = URLUtil.addQueryParameter(url, "page", String.valueOf(page));
				}
			} catch (URIException e) {
				final String msg = _logResources.getString("error.add.parameter");
				_logger.error(msg);
				throw new AtomServiceException(msg, e);
			}
	
			if (_logger.isDebugEnabled()) {
				_logger.debug("About to get the remote document with URL:" + url);
			}
			url = url.indexOf("?") == -1? url+"?lang=en":url+"&lang=en";
		}
		
		url = SecurityUtil.processS2SUrl(url);
		if(_logger.isDebugEnabled()) {
			_logger.debug("fixed url is " + url);
		}
		
		ClientResponse response = null;
		try{
			response = client.get(url, ro);
		}catch(Exception e){
			_logger.error(_logResources.getString("error.url.getcontent", url));
			return null;
		}
		if(response.getStatus() == 302 || response.getStatus() == 301) {
			try {
				String reurl = response.getLocation().toString();
				if (data.getUserName().length() != 0
						&& data.getPassword().length() != 0) {
					try {
						client.addCredentials(reurl, null,
								null, new UsernamePasswordCredentials(data
										.getUserName(), data.getPassword()));
					} catch (URISyntaxException e) {
						final String msg = _logResources.getString("error.add.credential", service.getAllObjectsUrl(data));
						_logger.error(msg);
						throw new AtomServiceException(msg, e);
					}
				}
				reurl = SecurityUtil.processS2SUrl(reurl);
				response = client.get(reurl, ro);
			} catch (IRISyntaxException e) {
				final String msg = _logResources.getString("error.parse.redirect");
				_logger.error(msg);
				throw new AtomServiceException(msg, e);
			}
		}
		if(response.getStatus() == HttpStatus.SC_NOT_FOUND) return null;
		Document doc = response.getDocument();
		return doc;
	}

	private synchronized void init() {
		if (_abdera == null) {
			if (_logger.isDebugEnabled()){
				_logger.debug("Abdera is null, need to initialize it");
			}
			_abdera = new Abdera();

		}
		if (_factory == null) {
			if (_logger.isDebugEnabled()){
				_logger.debug("_factory is null, need to initialize it");
			}
			_factory = _abdera.getFactory();

		}
	}
	
	/**
	 * For each object, invoking this method will add an instance on the remote
	 * server through Atom Publishing Protocol.
	 * 
	 * 
	 * @param service
	 * @param data
	 * @throws AtomServiceException 
	 */
	public void update(ConnectionsService service, ServiceData data)
			throws AtomServiceException {
		if(this.getDocument(service, data, 1) != null) {
			editSingleEntry(service, data);
		}
	}
	
	
	/**
	 * For each object, invoking this method will add an instance on the remote
	 * server through Atom Publishing Protocol.
	 * 
	 * 
	 * @param service
	 * @param data
	 * @throws AtomServiceException 
	 */
	public void delete(ConnectionsService service, ServiceData data)
			throws AtomServiceException {
		if (this.getDocument(service, data, 1)!=null){
			deleteSingleEntry(service, data);
		}
	}

	/**
	 * @param service
	 * @param data
	 * @param lk
	 * @throws APPServiceException
	 */
	private void editSingleEntry(ConnectionsService service, ServiceData data) throws APPServiceException {
		Entry entry = null;
		try {
			entry = service.buildEntry(_factory.newEntry(), data);
		} catch (IRISyntaxException e) {
			final String msg = _logResources.getString("error.build.entry");
			throw new APPServiceException(msg, e);
		}

		try {
			AbderaClient client = new AbderaClient(_abdera);
			String url = service.getPublishingUrl(data);
			client.getHttpClientParams().setCookiePolicy("compatibility");
			if (data.getUserName().length() != 0
					&& data.getPassword().length() != 0) {
				client.addCredentials(url, null,
						null, new UsernamePasswordCredentials(data
								.getUserName(), data.getPassword()));
			}
			RequestOptions ro = client.getDefaultRequestOptions();
			if (data.getCookieString() != null
					&& data.getCookieString().length() > 0) {
				if (_logger.isDebugEnabled()) {
					_logger.debug(new StringBuilder(
							"Set cookie in the request header with string (")
							.append(data.getCookieString()).toString());
				}
				ro.setHeader("Cookie", data.getCookieString());
			}
			
			//AbderaClient.registerTrustManager();
			
			Iterator<Constraint> it = _constraints.iterator();
			while (it.hasNext()) {
				Constraint cons = it.next();
				if(cons != null) {
					url = cons.formatURL(url);
				}
			}
			if (_operator != null) {
				url = _operator.formatURL(url);
			}
			url = SecurityUtil.processS2SUrl(url);
			if (_logger.isDebugEnabled()) {
				_logger.debug("edit entry url: " + url);
			}
			///TODO 
			/**
			 * Here I found when add an element to entry with namespace via Abdera API, xmlns="" will be created automatically
			 * And this attribute brings an issue that bookmarks can't be posted to Activities
			 * I failed to find out a way to remove it, so I do it here by String.replace
			 * 
			 */
			String entryXml = entry.toString().replaceAll("xmlns=\"\"", "");
			Response response = client.put(url,
					new ByteArrayInputStream(entryXml.getBytes("UTF-8")), ro);
			
			if (response.getStatus() == 302 || response.getStatus() == 301) {
				String reurl = response.getLocation().toString();
				if (data.getUserName().length() != 0
						&& data.getPassword().length() != 0) {
					client.addCredentials(reurl, null,
							null, new UsernamePasswordCredentials(data
									.getUserName(), data.getPassword()));
				}
				if (_logger.isDebugEnabled()) {
					_logger.debug("edit entry url(redirected): " + reurl);
				}
				reurl = SecurityUtil.processS2SUrl(reurl);
				response = client.put(reurl, new ByteArrayInputStream(entryXml.getBytes("utf-8")), ro);
			}
			
			if (response.getStatus() == 200) {
				_logger.debug("invoke: Invoked successfully");
			} else {
				final String msg = _logResources.getString("error.invoke.remote.api", url, String.valueOf(response.getStatus()));
				_logger.error(msg);
				throw new APPServiceException(msg);
			}
		} catch (Exception e) {
			final String msg = _logResources.getString("error.entry.edit", ((BookmarkServiceData)data).getUrl());
			_logger.error(msg);
			throw new APPServiceException(msg, e);
		} 
	}
	
	/**
	 * @param service
	 * @param data
	 * @throws APPServiceException
	 */
	private void deleteSingleEntry(ConnectionsService service, ServiceData data) throws APPServiceException {
		try {
			AbderaClient client = new AbderaClient(_abdera);
			String url = service.getPublishingUrl(data);
			client.getHttpClientParams().setCookiePolicy("compatibility");
			if (data.getUserName().length() != 0
					&& data.getPassword().length() != 0) {
				client.addCredentials(url, null,
						null, new UsernamePasswordCredentials(data
								.getUserName(), data.getPassword()));
			}
			RequestOptions ro = client.getDefaultRequestOptions();
			if (data.getCookieString() != null
					&& data.getCookieString().length() > 0) {
				if (_logger.isDebugEnabled()) {
					_logger.debug(new StringBuilder(
							"Set cookie in the request header with string (")
							.append(data.getCookieString()).toString());
				}
				ro.setHeader("Cookie", data.getCookieString());
			}
			
			//AbderaClient.registerTrustManager();

			Iterator<Constraint> it = _constraints.iterator();
			while (it.hasNext()) {
				Constraint cons = it.next();
				if(cons != null) {
					url = cons.formatURL(url);
				}
			}
			if (_operator != null) {
				url = _operator.formatURL(url);
			}
			url = SecurityUtil.processS2SUrl(url);
			if (_logger.isDebugEnabled()) {
				_logger.debug("delete entry url: " + url);
			}
			
			Response response = client.delete(url, ro);
			if(response.getStatus() == 301 || response.getStatus() == 302) {
				String reurl = response.getLocation().toString();
				if (data.getUserName().length() != 0
						&& data.getPassword().length() != 0) {
					client.addCredentials(reurl, null,
							null, new UsernamePasswordCredentials(data
									.getUserName(), data.getPassword()));
				}
				if (_logger.isDebugEnabled()) {
					_logger.debug("delete entry url(redirected): " + reurl);
				}
				reurl = SecurityUtil.processS2SUrl(reurl);
				response = client.delete(reurl, ro);
			}
			if (response.getStatus() == 204) {
				_logger.debug("invoke: Invoked successfully");
			} else {
				final String msg = _logResources.getString("error.invoke.remote.api", url, String.valueOf(response.getStatus()));
				_logger.error(msg);
				throw new APPServiceException(msg);
			}
		} catch (Exception e) {
			final String msg = _logResources.getString("error.entry.delete", ((BookmarkServiceData)data).getUrl());
			_logger.error(msg);
			throw new APPServiceException(msg, e);
		} 
	}
	

	/**
	 * For each object, invoking this method will add an instance on the remote
	 * server through Atom Publishing Protocol.
	 * 
	 * 
	 * @param service
	 * @param data
	 * @throws APPServiceException
	 */
	public void publish(ConnectionsService service, ServiceData data)
			throws Exception {
		if (_logger.isTraceEnabled()) {
			_logger.trace(new StringBuilder("entry: publish, service:").append(
					service.toString()).append(", data:").append(
					data.toString()));
		}
		Entry entry = null;
		
		try {
			entry = service.buildEntry(_factory.newEntry(), data);
		} catch (IRISyntaxException e) {
			final String msg = _logResources.getString("error.build.entry");
			throw new APPServiceException(msg, e);
		}

		try {
			AbderaClient client = new AbderaClient(_abdera);
			String url = service.getPublishingUrl(data);
			client.getHttpClientParams().setCookiePolicy("compatibility");
			if (data.getUserName().length() != 0
					&& data.getPassword().length() != 0) {
				client.addCredentials(url, null,
						null, new UsernamePasswordCredentials(data
								.getUserName(), data.getPassword()));
			}
			RequestOptions ro = client.getDefaultRequestOptions();
			
			if (data.getCookieString() != null
					&& data.getCookieString().length() > 0) {
				if (_logger.isDebugEnabled()) {
					_logger.debug(new StringBuilder(
							"Set cookie in the request header with string (")
							.append(data.getCookieString()).toString());
				}
				ro.setHeader("Cookie", data.getCookieString());
			}
			//AbderaClient.registerTrustManager();
			url = SecurityUtil.processS2SUrl(url);
			if (_logger.isDebugEnabled()) {
				_logger.debug("publish url: " + url);
			}
			entry.getDocument().setContentType("application/atom+xml");
			ro.setHeader("Content-Type", "application/atom+xml");
			
			///TODO 
			/**
			 * Here I found when add an element to entry with namespace via Abdera API, xmlns="" will be created automatically
			 * And this attribute brings an issue that bookmarks can't be posted to Activities
			 * I failed to find out a way to remove it, so I do it here by String.replace
			 * 
			 */
			String entryXml = entry.toString().replaceAll("xmlns=\"\"", "");
			if (_logger.isDebugEnabled()){
				_logger.debug("entry: \n" + entryXml);
			}
			
			Response response = client.post(url,
					new ByteArrayInputStream(entryXml.getBytes("utf-8")), ro);
			if (response.getStatus() == 302 || response.getStatus() == 301) {
				String reurl = response.getLocation().toString();
				if (data.getUserName().length() != 0
						&& data.getPassword().length() != 0) {
					client.addCredentials(reurl, null,
							null, new UsernamePasswordCredentials(data
									.getUserName(), data.getPassword()));
				}
				if (_logger.isDebugEnabled()) {
					_logger.debug("publish url(redirected): " + reurl);
				}
				reurl = SecurityUtil.processS2SUrl(reurl);
				response = client.post(reurl, new ByteArrayInputStream(entryXml.getBytes("utf-8")), ro);
			}
			if (response.getStatus() == 201) {
				if (_logger.isDebugEnabled()) {
					_logger.debug("invoke: Invoked successfully");
				}
			} else if (response.getStatus() == 409) {
				/**
				 * Only for Communities. 
				 * Now one cannot post duplicate bookmark to a community, otherwise he/she will get a http 409 error
				 * 
				 * Do nothing, ignore the error.
				 */
				if (_logger.isDebugEnabled()){
					_logger.debug("invoke: Bookmark already exists in selected community, do nothing..");
				}
				/**
				* Update for dfait, throw a DuplicateBookmarkException
				*
				*/
				throw new DuplicateBookmarkException("");
			}else {
				final String msg = _logResources.getString("error.invoke.remote.api", url, String.valueOf(response.getStatus()));
				_logger.error(msg);
				throw new APPServiceException(msg);
			}
		}catch (DuplicateBookmarkException e) {
			_logger.error(e.getMessage());
			throw e;
		} catch (Exception e) {
			final String msg = _logResources.getString("error.entry.publish");
			_logger.error(msg);
			throw new APPServiceException(msg, e);
		} 
		if (_logger.isTraceEnabled()) {
			_logger.trace("exit: publish");
		}
	}

	/**
	 * Call this method if you want to clear all the constraints applied to this
	 * object.
	 * <p>
	 * Also this method is synchronized on <code>_constraints</code>
	 */
	public void reset() {
		if (_logger.isTraceEnabled()) {
			_logger.trace("entry: reset");
		}
		synchronized (_constraints) {
			_constraints.clear();
		}
		_operator = null;
		if (_logger.isTraceEnabled()) {
			_logger.trace("exit: reset");
		}
	}

	/**
	 * Set the SearchTextOperator which will be used in
	 * {@link #getObjects(ConnectionsService, ServiceData)}, or
	 * {@link #getObjects(ConnectionsService, ServiceData, int)} toggether with
	 * some Lucene based full-text search which used in Lotus Conections.
	 * 
	 * @deprecated Use {@link #getInstance(HelperConfig)} to set this option
	 *             within <code>HelperConfig</code> instead.
	 * @param operator
	 *            Operator to indicate if those full text search parameter is
	 *            combined with OR or with AND.
	 * @return The ConnectionsObjectHelper itself.
	 * 
	 * 
	 */
	public ConnectionsObjectHelper setSearchTextOperator(
			SearchTextOperator operator) {
		this._operator = operator;
		return this;
	}

//	private String appendParametersToUrl(String url, ServiceData data) {
//		if(!data.getParameters().isEmpty()) {
//			StringBuilder sb = new StringBuilder(url);
//			if(sb.indexOf("?") == -1) {
//				sb.append("?");
//			} else if(sb.charAt(sb.length() - 1) != '&'){
//				sb.append("&");
//			}
//			Map<String, String> params = data.getParameters();
//			for(String name : params.keySet()) {
//				String value = params.get(name);
//				try {
//					sb.append(name).append("=").append(URLEncoder.encode(value, "utf-8"));
//				} catch (UnsupportedEncodingException e) {
//					// ignore
//				}
//				sb.append("&");
//			}
//			// remove the trailing &
//			sb.deleteCharAt(sb.length() - 1);
//			return sb.toString();
//		} else {
//			return url;
//		}
//	}
}
