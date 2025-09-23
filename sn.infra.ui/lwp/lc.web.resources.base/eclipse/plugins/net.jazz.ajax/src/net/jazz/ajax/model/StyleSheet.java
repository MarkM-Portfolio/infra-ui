/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.model;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.io.LineNumberReader;
import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.EmptyStackException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.http.protocol.HTTP;

import org.eclipse.core.runtime.Assert;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.TraceSupport;
import net.jazz.ajax.internal.util.Util;

import com.ibm.lconn.core.config.StylesheetConfig;
import com.ibm.lconn.core.config.StylesheetConfig;
import com.ibm.lconn.core.config.VersionStamp;
import com.ibm.lconn.core.config.services.Services;

public class StyleSheet extends TextResource {

	// ADDED: changed from "stylesheet" to "css" to match convention from JS - allows resource
	// lookups by stylesheet ID
	public static final Type<StyleSheet> TYPE = Type.create("css");
	
	// CHANGED
	static final TraceSupport LOGGER = TraceSupport.create(StyleSheet.class.getName());
	// ADDED
	static final Pattern CSS_COMMENT = Pattern.compile("/\\*(.)*?\\*/", Pattern.DOTALL);
	static final Pattern CSS_COMMENT_LINE = Pattern.compile("//.*$", Pattern.MULTILINE);
	static final Pattern CSS_EMPTY_LINES = Pattern.compile("(\\s*(\\n|\\r\\n)+)+", Pattern.MULTILINE);
	static final Pattern CSS_EXTRA_WHITESPACE = Pattern.compile("^\\s+", Pattern.MULTILINE);
	static final Pattern CSS_IMPORT = Pattern.compile("@import\\s+(?:url\\(?)?([\"']?)([^\1)]+)\\s*\\1[)]?[;]?(?:\\s*$)?", Pattern.MULTILINE);
	static final Pattern URL_PATTERN = Pattern.compile("(?:^\\s*/\\*\\s*jazz-sprite\\s*:\\s*(.+?)\\s*;\\s*\\*/\\s*background-image\\s*:\\s*)?" +
			"(url\\(['\"]?(.+?)['\"]?\\))", Pattern.MULTILINE);
	static final Pattern SPRITE = Pattern.compile("^\\s*/\\*\\s*jazz-sprite\\s*:\\s*(.+?)\\s*;\\s*\\*/(?:\\s*background-image\\s*:\\s*" +
			"url\\(['\"]?(.+?)['\"]?\\))?", Pattern.MULTILINE);
	
	// ADDED:
	static final String URL_PROXY_PATH = StylesheetConfig.getProxyPath();
	static final Map<String, String> URL_IGNORED_PATHS = StylesheetConfig.getIgnoredPaths();

	URI uri;
	String text;
	boolean rewritten;
	int rules;
	
	// ADDED
	List<CharSequence> fragments;
	List<CharSequence> urls;
	List<String> imports;
	
	// ADDED
	boolean modified;
	List<CharSequence> allFragments; // all stuff including comments
	List<CharSequence> allUrls;
	List<String> allImports;
	
	// CHANGED
	public StyleSheet(String id, URL source) {
		this(id, new URL[] { source });
	}
	
	// ADDED
	public StyleSheet(String id, URL[] sources) {
		super(TYPE, sources, id);
	}

	URL bundleUrl(String path) {
		WebBundle bundle = WebBundle.bundleMatching(path);
		// ADDED
		if (bundle == null)
			return null;
		return bundle.getEntry(path.substring(bundle.getId().length()));
	}
	
	// ADDED
	public int getSelectorsCount() {
		return rules;
	}

	// TODO: better support for rules
	int countRules(CharSequence content) {
		boolean inSingleQuotes = false;
		boolean inDoubleQuotes = false;
		boolean inComment = false;
		Stack<StringBuffer> stack = new Stack<StringBuffer>();
		stack.push(new StringBuffer());
		int ruleCount = 0;

		// CHANGED
		int i = 0;
		try {
			for (; i < content.length(); i++) {
				switch (content.charAt(i)) {
				case '{':
					if (!inDoubleQuotes && !inSingleQuotes && !inComment) {
						ruleCount++;
						StringBuffer currentSelector = (StringBuffer) stack.peek();
						for (int j = 0; j < currentSelector.length(); j++)
							if (currentSelector.charAt(j) == ',')
								ruleCount++;
						currentSelector.setLength(0);
						stack.push(new StringBuffer());
					}
					break;
				case '}':
					if (!inDoubleQuotes && !inSingleQuotes && !inComment)
						stack.pop();
					break;
				case '\'':
					if (!inComment) {
						if (i == 0 || content.charAt(i - 1) != '\\') {
							if (inSingleQuotes)
								inSingleQuotes = false;
							else
								inSingleQuotes = true;
						}
					}
					break;
				case '\"':
					if (!inComment) {
						if (i == 0 || content.charAt(i - 1) != '\\') {
							if (inDoubleQuotes)
								inDoubleQuotes = false;
							else
								inDoubleQuotes = true;
						}
					}
					break;
				case '*':
					if (i > 0 && content.charAt(i - 1) == '/')
						inComment = true;
					break;
				case '/':
					if (i > 0 && content.charAt(i - 1) == '*')
						inComment = false;
					break;
				default:
					if (!inDoubleQuotes && !inSingleQuotes && !inComment) {
						StringBuffer currentSelector = (StringBuffer) stack.peek();
						currentSelector.append(content.charAt(i));
					}
					break;
				}
			}
		} catch (EmptyStackException e) {
			LOGGER.trace("Incomplete rule while processing stylesheet ",
					getId(), " at position " + i);
		}

		return ruleCount;
	}
	
	String fixPath(String path) {
		if (path.startsWith("/"))
			path = path.substring(1);
		else if (path.startsWith("."))
			path = uri.resolve(path).toString();
		else {
			//TODO this is messed up!
			WebBundle bundle = WebBundle.bundleMatching(path);
			if (bundle != null && AjaxFramework.DEV_MODE) {
				LOGGER.warn("The CSS file ", getId(), " needs to be updated.  It is referencing the URL ", path,
						" incorrectly.  The URL must be changed to the correct absolute path by prepending '/' (or to the proper relative URL)");
			}
			if (bundle == null)
				path = uri.resolve(path).toString();
		}
		return path;
	}
	
	/*
	 * Called when a Sprite referenced by this StyleSheet has changed.  Since the sprite's
	 * etag and layout changed, this StyleSheet's text needs to be reprocessed.
	 */
	public void handleSpriteChanged() {
		synchronized (this) {
			if (!rewritten)
				return;
			Sprite.LOG.trace("Reprocessing StyleSheet ", getId(), " due to sprite changes");
			rewritten = false;
			lastModified = 0;
			internalRefresh(null);
		}
	}
	
	@Override
	void load(StringBuilder chars) {
		initializeBuffers();
		LOGGER.trace("Loading StyleSheet:", getId());
		synchronized (this) {
			uri = URI.create(getId());
			rules = countRules(chars);
			// ADDED: strip comments
			strip(chars, CSS_COMMENT, 0);
			strip(chars, CSS_COMMENT_LINE, 0);
			strip(chars, CSS_EXTRA_WHITESPACE, 0);
			strip(chars, CSS_EMPTY_LINES, 1);
			processImports(chars);
			addDependencies();
			chars = rewriteUrls(chars);
			modified = true;
			// ADDED /end
			//processImports(chars);
			processSprites(chars);
			rewritten = false;
			text = chars.toString();
		}
	}
	
	private void initializeBuffers() {
		fragments = new ArrayList<CharSequence>();
		urls = new ArrayList<CharSequence>();
		imports = new ArrayList<String>();
		
		allFragments = new ArrayList<CharSequence>();
		allUrls = new ArrayList<CharSequence>();
		allImports = new ArrayList<String>();
	}

	// ADDED
	void strip(StringBuilder content, Pattern pattern, int adjust) {
		Matcher m = pattern.matcher(content);
		int from = 0;
		while (m.find(from)) {
			from = m.start() + adjust;
			content.delete(m.start(), m.end() - adjust);
		}
	}
	
	// CHANGED
	void processImports(StringBuilder content) {
		imports.clear();
		Matcher m = CSS_IMPORT.matcher(content);
		int from = 0;
		while (m.find(from)) {
			String id = m.group(2);
			imports.add(id);
			content.delete(from = m.start(), m.end());
		}
	}
	
	// ADDED
	void addDependencies() {
		for (String item : imports) {
			try {
				String id = uri.resolve(new URI(item)).toString();
				if (id.startsWith("/"))
					id = id.substring(1);
				addDependency(newDependency(id, true));
			} catch (URISyntaxException e) {
				throw new RuntimeException(e);
			}
		}
	}
	
	void processSprites(CharSequence content) {
		Matcher m = SPRITE.matcher(content);
		while (m.find()) {
			if (m.group(2) == null) {
				logBadSprite(content, m.start());
				continue;
			}
			String path = fixPath(m.group(2));
			URL url = bundleUrl(path);
			if (url == null) {
				LOGGER.error("The CSS file \"", getId(), "\" refers to non-existant image at path \"", m.group(2), "\".");
				continue;
			}
			String id = m.group(1);
			Sprite sprite = Sprite.byId(id);
			sprite.addImage(url, this);
			addDependency(new WebBundleDependency(Sprite.TYPE, id, true));
		}
	}
	
	void logBadSprite(CharSequence content, int location) {
		int ln = -1;
		try {
			LineNumberReader lnr = new LineNumberReader(new StringReader(content.subSequence(0,location).toString()));
			lnr.skip(Long.MAX_VALUE);
			ln = lnr.getLineNumber()+1;
		} catch (IOException e) {
			// fail silently and don't print the line number
		}
		LOGGER.warn("jazz-sprite annotation found with no matching background-image at " + uri.toString() + (ln > -1 ? ":" + ln: ""));
	}
	
	/* We had a PMR <CR1 APPROVAL> PMR: 42619,122,000 - CSS URL rewriting (93662) opened by AT&T, where URLs to static resources (images) 
	 * in their Intranet CDN were rebased off Connections web resources, and returned 404s.  Unfortunately, this prevents custom resources \
	 * added through customization directory from being correctly addressed in custom CSS.  We decided to revert some the change to fix 
	 * PMR 65057,004,000 (IC work item 129759 Unable to customize the logo in Connections)
	 */
	// CHANGED: leave URLs that do not match bundles alone 
		StringBuilder rewriteUrls(CharSequence content) {
			Matcher m = URL_PATTERN.matcher(content);
			int left = 0, right = content.length();
			StringBuilder buffer = new StringBuilder(content.length() + 200);
			while (m.find()) {
				buffer.append(content, left, m.start());
				left = m.end();
				String path = fixPath(m.group(3));
				String group1 = m.group(1);
				URL url = bundleUrl(path);
				if (url == null)
					LOGGER.warn("The StyleSheet \"" + getId() + "\" references a missing image with the path: " + path);
				if (group1 != null && url != null) {
					String id = m.group(1);
					Sprite sprite = Sprite.byId(id);
					sprite.writeCSS(url, buffer);
				} else {
					buffer.append("url(\"");
					buffer.append(getContextPath());
					buffer.append(addEtag(path, url));
					buffer.append("\")");
				}
			}
			return buffer.append(content, left, right);
		}

	// ADDED
	private String getContextPath() {
		StringBuffer buffer = new StringBuffer(Services.CONTEXT_ROOT + AjaxFramework.WEB_ROOT);
		if (buffer.indexOf("/") != 0)
			buffer.insert(0, "/");
		return buffer.toString();
	}

	@Override
	public void write(Appendable output, RenderContext context) throws IOException {
		String result;
		synchronized (this) {
			if (!rewritten) {
				// FIXME:
				//rewriteUrls();
				rewritten = true;
			}
			result = text;
		}
		output.append(result);
	}
	
	// CHANGED: set to public
	public static Dependency newDependency(String id, boolean derived) {
		return new StyleSheetDependency(id, derived);
	}
	
	// ADDED
	public static Dependency newDependency(WebBundle webBundle, String id, boolean derived) {
		return new StyleSheetDependency(webBundle, id, derived);
	}
	
	static class Fragment {
		final boolean isUrl;
		final String content;
		
		public Fragment(String content, boolean isUrl) {
			this.isUrl = isUrl;
			this.content = content;
		}
	}

	static class StyleSheetDependency extends WebBundleDependency {
		final WebBundle webBundle;

		private StyleSheetDependency(String id, boolean derived) {
			super(TYPE, id, derived);
			webBundle = null;
			Assert.isTrue(!id.startsWith("/")); //TODO remove
		}
		
		public StyleSheetDependency(WebBundle webBundle, String id,
				boolean derived) {
			super(TYPE, id, derived);
			this.webBundle = webBundle;
		}

		public <T extends Resource> T resolve() {
			if (resource == null)
				synchronized (WRITELOCK) {
					String id = getId();
					Resource r = Resource.resolve(TYPE, id);
					if (r == null) {
						WebBundle bundle = WebBundle.bundleMatching(id);
						if (bundle == null)
							return null;
						r = bundle.bundleResource(TYPE, id);
					}
					resource = r;
				}
			return (T) resource;
		}
	}
}
