/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
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

import java.awt.Rectangle;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.eclipse.core.runtime.Assert;

import com.ibm.team.jfs.app.distributed.DistributedOperationException;
import com.ibm.team.jfs.app.distributed.IDistributedMap.Serializer;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.DistributedMap;
import net.jazz.ajax.internal.util.TraceSupport;

public class Sprite extends Resource {
	
	public static final Type<Sprite> TYPE = Type.create("sprite");
	static final TraceSupport LOG = TraceSupport.create("net.jazz.ajax/Sprites");
	
	final List<URL> images = new ArrayList();
	final Collection<StyleSheet> referrers = new HashSet();
	final Lock readLock;
	final Lock writeLock;
	static final DistributedMap<String, List<URL>> LAYOUTS = DistributedMap.create(Sprite.class.getName() + ".layouts", new URLListSerializer());
	SpriteLayout layout;
	
	Sprite(String id) {
		super(TYPE, id);
		ReadWriteLock lock = new ReentrantReadWriteLock();
		readLock = lock.readLock();
		writeLock = lock.writeLock();
	}
	
	public void addImage(URL url, StyleSheet styleSheet) {
		writeLock.lock();
		StyleSheet notify[];
		try {
			referrers.add(styleSheet);
			if (images.contains(url))
				return;
			layout = null;
			images.add(url);
			notify = referrers.toArray(new StyleSheet[referrers.size()]);
		} finally {
			writeLock.unlock();
		}
		//Tell other StyleSheets, which may have cached the sprite's old etag
		for (StyleSheet referrer : notify)
			if (referrer != styleSheet)
				referrer.handleSpriteChanged();
	}
	
	private SpriteLayout getLayout() {
		readLock.lock();
		try {
			if (layout == null)
				try {
					if (images.isEmpty())
						return null;
					layout = new SpriteLayout(images);
					LAYOUTS.putIfAbsent(getLayoutKey(layout.state.getETag()),
							new ArrayList(images) /* WORKAROUND to defect 197998 */);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			return layout;
		} finally {
			readLock.unlock();
		}
	}
	
	private SpriteLayout getLayout(String etag) throws IOException {
		SpriteLayout result = getLayout();
		if (result != null && result.state.getETag().equals(etag))
			return result;
		LOG.trace("Recreating an older layout");
		List<URL> urls = LAYOUTS.get(getLayoutKey(etag));
		if (urls == null)
			return null;
		result = new SpriteLayout(urls);
		Assert.isTrue(result.state.getETag().equals(etag));
		return result;
	}
	
	private String getLayoutKey(String etag) {
		return getId() + ", " + etag;
	}
	
	public void getState(RenderContext context, State state) {
		state.mergeETag(getLayout().state.etag);
	}
	
	public void writeCSS(URL url, StringBuilder output) {
		SpriteLayout layout = getLayout();
		Rectangle rect = layout.getRectangle(url);
		if (rect == null)
			throw new RuntimeException("Unable to find a Rectangle for " + url + " in the Sprite containing the entries: " + layout.urlToRect);
		output.append("background-image: url(\"../..");
		output.append(AjaxFramework.SPRITE_ROOT);
		output.append(getId());
		output.append("?etag=" + layout.state.getETag());
		output.append("\");\n" +
				"background-position: -");
		output.append(rect.x);
		output.append("px -");
		output.append(rect.y);
		output.append("px;\n" +
				"width: ");
		output.append(rect.width);
		output.append("px;\n" +
				"height: ");
		output.append(rect.height);
		output.append("px");
	}

	public static Sprite byId(String id) {
		Sprite result = Resource.resolve(TYPE, id);
		if (result == null)
			synchronized (WRITELOCK) {
				result = Resource.resolve(TYPE, id);
				if (result == null) {
					result = new Sprite(id);
					result.register();
				}
			}
		return result;
	}
	
	public static SpriteLayout getLayout(String id, String etag) throws IOException {
		Sprite sprite = Resource.resolve(TYPE, id);
		if (sprite == null)
			sprite = new Sprite(id);
		return sprite.getLayout(etag);
	}
	
	@SuppressWarnings("serial")
	static class URLEntry implements Serializable {
		final String bundleId;
		final String path;
		URLEntry(URL url) {
			bundleId = url.getHost();
			path = url.getPath();
		}
		URL getURL() throws MalformedURLException {
			return new URL("portablebundleresource", bundleId, -1, path, new BundleResourceStreamHandler());
		}
	}
	
	static class URLListSerializer implements Serializer<List<URL>, byte[]>{
		public List<URL> deserialize(byte[] bytes) throws DistributedOperationException {
			try {
				ObjectInputStream input = new ObjectInputStream(new ByteArrayInputStream(bytes));
				List<URLEntry> entries = (List<URLEntry>) input.readObject();
				List<URL> result = new ArrayList(entries.size());
				for (URLEntry entry : entries)
					result.add(entry.getURL());
				return result;
			} catch (Exception e) {
				throw new DistributedOperationException("The serialized object failed to be deserialized.", e); //$NON-NLS-1$
			}
		}
		public byte[] serialize(List<URL> input) throws DistributedOperationException {
			List<URLEntry> entries = new ArrayList(input.size());
			for (URL url : input)
				entries.add(new URLEntry(url));
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			try {
				ObjectOutputStream oOutput = new ObjectOutputStream(output);
				oOutput.writeObject(entries);
				return output.toByteArray();
			} catch (Exception e) {
				throw new DistributedOperationException("The serializable object failed to be serialized.", e); //$NON-NLS-1$
			}		
		}
	}
}
