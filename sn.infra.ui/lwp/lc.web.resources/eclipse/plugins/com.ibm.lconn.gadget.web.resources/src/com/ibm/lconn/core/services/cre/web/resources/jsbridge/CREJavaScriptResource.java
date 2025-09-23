/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.services.cre.web.resources.jsbridge;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;

import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;

import com.ibm.lconn.core.services.cre.core.jsbridge.AbstractJSBridge.JSBundle;
import com.ibm.lconn.core.services.cre.core.jsbridge.BridgeHttpClient;

public class CREJavaScriptResource extends Resource {

	// default value
	private JSBundle identifier = JSBundle.IRUNTIME;
	
	public CREJavaScriptResource(String id) {
		this(JavaScriptResource.TYPE, id);
	}

	public CREJavaScriptResource(Type<?> type, String id) {
		super(type, id);
	}

	private volatile long lastModified;

	private volatile String minified;

	@Override
	public void getState(RenderContext context, State state)
	{
		state.merge(lastModified);
	}

	/**
	 * TODO make this thread-safe
	 */
	@Override
	public boolean internalRefresh(RenderContext context)
	{
		try
		{
			long now = System.currentTimeMillis();
			if (lastModified == 0 || isOutOfDate(now))
			{
				lastModified = now;
				load(content());
				// FIXME:
				return true;
			}
			// FIXME:
			return false;
		}
		catch (IOException e)
		{
			throw new RuntimeException(e);
		}
	}

	protected void load(CharSequence content)
	{
		minified = content.toString();
	}

	/**
	 * Default implementation is that contents are only generated once. 
	 */
	protected boolean isOutOfDate(long now)
	{
		return false;
	}

	/**
	 * @return The time the content was last generated, or 0 if it has never been generated
	 */
	final protected long getLastModified()
	{
		return lastModified;
	}
	
	
	/**
	 * 
	 * @return
	 */
	public JSBundle getIdentifier() {
		return identifier;
	}

	/**
	 * 
	 * @param identifier
	 */
	public void setIdentifier(JSBundle identifier) {
		this.identifier = identifier;
	}

	/**
	 * Override to allow for debug mode.  Use normal flow otherwise
	 */
	@Override
	public void write(Appendable output, RenderContext context) throws IOException
	{
		switch (context.mode)
		{
		case NO_MINIFY :
			output.append("\n;");
		case DEBUG:
			output.append(content(true));
			output.append("\n");
			break;
		case STANDARD :
			output.append("\n;");
			output.append(minified);
			output.append("\n");
			break;
		}
	}	
	
	/*
	 * (non-Javadoc)
	 * @see net.jazz.ajax.model.GeneratedJavaScriptResource#content()
	 */
	protected CharSequence content() throws IOException {
		return content(false);
	}
	
	private CharSequence content(final boolean debugMode) throws IOException {
		final StringBuilder sb = new StringBuilder();
		sb.append("/* Generated at " + DateFormat.getInstance().format(new Date(getLastModified())) + " by ").append(this.getClass().getName()).append(" */\n");
				
		final StringBuilder next = sb.append("dojo.provide('").append(getId()).append("');\n\n");
		
		BridgeHttpClient.getContentLayer(getRelJSUrl(debugMode), next);
		
		String str = sb.toString();
		
		return str;
	}

	/**
	 * Get the relative URL for downloading the layer JS
	 * @return
	 */
	private String getRelJSUrl(final boolean debugMode) {
		switch (identifier) {
			case IRUNTIME:
				return "/gadgets/js/cre.iruntime:cre.iwidget.event:cre.wire:cre.iwidget:cre.iwidget.itemset:"
					+ "cre.util.stringify:cre.service.event:cre.osgadget:"
					+ "core:container:rpc:pubsub-2:views:embedded-experiences:open-views:selection:inline:actions:viewenhancements:shared-script-frame:"
					+ "cre.service.people:ibm.connections.sharedialog:com.ibm.connections.sharedialog:"
					+ "ibm.connections.ee:com.ibm.connections.ee:shindig.sha1:"
					+ "open-views.js?c=1&debug=" + (debugMode ? "1" : "0");
			default:
				throw new RuntimeException("Unknown identifier value: " + identifier);
		}
	}

	
	
}
