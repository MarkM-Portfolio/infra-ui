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

import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.core.runtime.Assert;

import net.jazz.ajax.internal.util.CacheCondition;
import net.jazz.ajax.internal.util.CacheWindow;
import net.jazz.ajax.model.Resource.State;

public class SpriteLayout {

	// The VERSION constant should be incremented when the sprite algorithm changes to ensure old etags are invalidated
	final static short VERSION = 1;
	// This constant controls how much padding should be placed between each image in the sprites
	final static short IMAGE_PADDING = 1;
	
	final Map<URL, Rectangle> urlToRect;
	final State state;
	final byte[] png;

	public SpriteLayout(List<URL> urls) throws IOException {
		Algorithm algorithm = new Algorithm(urls);
		algorithm.solve();
		this.urlToRect = algorithm.urlToRect;
		this.state = algorithm.state;
		this.png = algorithm.png;
	}

	public Rectangle getRectangle(URL url) {
		return urlToRect.get(url);
	}
	
	public byte[] getBytes() {
		return png;
	}
	
	public void writePNG(HttpServletRequest request, HttpServletResponse response) throws IOException {
		CacheWindow window = new CacheWindow(state.lastModified, 31556926, 31556926, state.getETag());
		window.applyTo(response);
		if (CacheCondition.create(request).acceptsConditionally(window)) {
			response.setStatus(304);
			return;
		}
		response.getOutputStream().write(png);
	}
	
	static class Algorithm {
		public final Map<URL, Rectangle> urlToRect = new HashMap();
		public final State state = new State();
		public byte[] png;
		private final List<URL> urls = new ArrayList();
		private final List<SpriteEntry> entries = new ArrayList();
		private final List<SpriteEntry> sorted = new ArrayList();
		int maxHeight, maxWidth;
		int totalArea;
		Block root;
		
		Algorithm(List<URL> urls) {
			this.urls.addAll(urls);
		}

		void solve() throws IOException {
			loadImages();
			initialize();
			pack();
			render();
		}

		/*
		 * Loads the Images from the URLs, extracting each image's content, dimensions, and modification time.
		 */
		void loadImages() throws IOException {
			state.merge(VERSION);
			for (URL url : urls) {
				SpriteEntry entry = new SpriteEntry(url);
				state.merge(entry.lastModified);
				maxWidth = Math.max(entry.rect.width, maxWidth);
				maxHeight = Math.max(entry.rect.height, maxHeight);
				totalArea += entry.rect.width * entry.rect.height;
				entries.add(entry);
				urlToRect.put(url, entry.rect);
			}
		}

		/*
		 * Creates the root Block for the algorithm, and sorts the rectangles from "largest" to "smallest".
		 */
		void initialize() {
			root = new Block(0, 0, maxWidth, maxHeight);
			sorted.addAll(entries);
			/**
			 * For the layout to always be the same regardless of the order in which images
			 * were discovered, the set of entries must be totally ordered.  Entries are sorted by:
			 * 1) max(width,height) in decreasing order
			 * 2) comparing the timestamps when 1) fails
			 * 3) comparing the URL paths when 2) fails
			 */
			Collections.sort(sorted, new Comparator<SpriteEntry>() {
				public int compare(SpriteEntry left, SpriteEntry right) {
					int result = right.maxDimenstion() - left.maxDimenstion();
					if (result == 0) {
						result = Long.valueOf(left.lastModified).compareTo(right.lastModified);
						if (result == 0) {
							result = left.url.getPath().compareTo(right.url.getPath());
							Assert.isTrue(result != 0, "Sprite generation is non-deterministic");
						}
					}
					return result;
				}
			});
			long hash = 0;
			for (SpriteEntry entry : sorted)
				hash = hash * 31 + entry.url.getPath().hashCode();
			state.mergeETag(hash);
		}

		void pack() {
			/*
			 * Try to place the current rectangle into an existing Block.
			 * If that fails, replace the root Block with a larger one containing the old root,
			 * the current Rectangle, and whatever is left over.
			 */
			for (SpriteEntry e : sorted) {
				if (!root.place(e.rect))
					root = root.grow(e.rect);
			}
			if (Sprite.LOG.isTracing())
				Sprite.LOG.trace("Sprite containing: " + urls.size() +
						" members packed with " + (100 * totalArea / (root.width * root.height)) + "% efficiency");
		}
		
		void render() throws IOException {
			BufferedImage image = new BufferedImage(root.width, root.height, BufferedImage.TYPE_INT_ARGB);
			Graphics2D graphics = (Graphics2D) image.getGraphics();
			for (SpriteEntry e : entries) {
				Rectangle r = e.rect;
				graphics.drawImage(e.image, r.x, r.y, null);
			}
			image.flush();
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			ImageIO.write(image, "png", output);
			png = output.toByteArray();
		}
	}
	
	static class SpriteEntry {
		final URL url;
		final BufferedImage image;
		final long lastModified;
		final Rectangle rect;
		
		public SpriteEntry(URL url) throws IOException {
			this.url = url;
			lastModified = url.openConnection().getLastModified();
			boolean useCache = ImageIO.getUseCache();
			ImageIO.setUseCache(false);
			image = ImageIO.read(url);
			ImageIO.setUseCache(useCache);
			rect = new Rectangle(0, 0, image.getWidth(), image.getHeight());
		}
		int maxDimenstion() {
			return Math.max(rect.width, rect.height);
		}
	}
	
	@SuppressWarnings("serial")
	static class Block extends Rectangle {
		Rectangle rect;
		Block down, right;

		Block(int x, int y, int width, int height) {
			super(x, y, width, height);
		}
		
		boolean place(Rectangle r) {
			if (width < r.width || height < r.height)
				return false;
			if (rect == null) {
				rect = r;
				r.x = x;
				r.y = y;
				down = new Block(x, y + r.height + IMAGE_PADDING, width, height - r.height - IMAGE_PADDING);
				right = new Block(x + r.width + IMAGE_PADDING, y, width - r.width - IMAGE_PADDING, r.height);
				return true;
			} else
				return right.place(r) || down.place(r);
		}
		
		Block grow(Rectangle r) {
			boolean growDown = width >= height + r.height;
			if (growDown) {
				Block result = new Block(0, 0, width, height + r.height + IMAGE_PADDING);
				result.down = this;
				result.rect = r;
				r.y = height + IMAGE_PADDING;
				result.right = new Block(r.width + IMAGE_PADDING, height + IMAGE_PADDING, width - r.width - IMAGE_PADDING, r.height);
				return result;
			} else {
				Block result = new Block(0, 0, width + r.width + IMAGE_PADDING, height);
				result.right = this;
				result.rect = r;
				r.x = width + IMAGE_PADDING;
				result.down = new Block(width + IMAGE_PADDING, r.height + IMAGE_PADDING, r.width, height - r.height - IMAGE_PADDING);
				return result;
			}
		}
	}
}
