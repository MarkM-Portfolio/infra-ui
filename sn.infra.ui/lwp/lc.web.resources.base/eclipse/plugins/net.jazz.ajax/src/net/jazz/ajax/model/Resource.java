/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2017                                    */
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
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import org.apache.http.protocol.HTTP;
import org.eclipse.core.runtime.Assert;

import com.ibm.team.jfs.app.distributed.DistributedOperationException;
import com.ibm.team.jfs.app.distributed.IDistributedMap;
import com.ibm.team.jfs.app.distributed.IDistributedMap.Serializer;
import com.ibm.team.jfs.app.distributed.IDistributedValue;
import com.ibm.team.jfs.app.distributed.IntegerValueSerializer;
import com.ibm.team.jfs.app.distributed.LongValueSerializer;
import com.ibm.team.jfs.app.distributed.StringValueSerializer;

import com.ibm.lconn.core.config.VersionStamp;

import net.jazz.ajax.internal.AjaxFramework;
import net.jazz.ajax.internal.util.MultiValueMap;

public class Resource {
	
	static final MultiValueMap<Key, Dependency, List<Dependency>> BINDINGS = MultiValueMap.using(new HashMap(), ArrayList.class);
	static final char[] CHARS = {
		'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
		'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
		'0','1','2','3','4','5','6','7','8','9'};
	static IDistributedValue<Integer, DistributedOperationException> nextId;
	static IDistributedMap<String, Key, DistributedOperationException> KEYS_BY_TINYID;
	static IDistributedMap<Key, String, DistributedOperationException> TINYIDS_BY_KEY;
	static final int RADIX = CHARS.length;
	static final Map<Key, Resource> RESOURCES = new ConcurrentHashMap(16, 0.75f, 1);
	static final Map<Key, Provider<ResourceProvider>> PROVIDERS = new ConcurrentHashMap(16, 0.75f, 1);
	static Long STARTUP;
	static String STARTUP_ETAG;
	static final Object TINY = new Object();
	
	// CHANGED:
	public static long internalGetStartup() {
		if (STARTUP == null) {
//			try {
//				IDistributedValue<Long, DistributedOperationException> value =
//					AjaxFramework.getDistributedDataService().getValueHolder(
//							Resource.class.getName() + ".startup", new LongValueSerializer());
//				value.compareAndSet(null, System.currentTimeMillis());
//				STARTUP = value.get();
//			} catch (DistributedOperationException e) {
//				throw new RuntimeException(e);
//			}
			VersionStamp stamp = VersionStamp.getInstance();
			if (stamp != null)
				STARTUP = stamp.getDate().getTime();
			else
				STARTUP = System.currentTimeMillis();
		}
		return STARTUP;
	}
	
	/**
	 * Returns a hashed string encoding the server startup time.  To keep the string small, the encoded
	 * value is the number of seconds since May 1st, 2012.
	 * @return server startup hash tag
	 */
	public static String internalGetStartupETag() {
		if (STARTUP_ETAG == null) {
//			long MAY_2012 = new GregorianCalendar(2012, 4, 1).getTimeInMillis();
//			long secondsSince = (internalGetStartup() - MAY_2012) / 1000;
//			STARTUP_ETAG = hashString(secondsSince);
			STARTUP_ETAG = VersionStamp.INSTANCE.toString();
		}
		return STARTUP_ETAG;
	}
	
	public static final Object WRITELOCK = new Object();
	
	final List<Dependency> dependencies = new CopyOnWriteArrayList<Dependency>();
	final Key key;
	volatile String tinyID;
	
	Resource(){
		key = null;
	}
	
	// CHANGED: set to public
	public Resource(Type<?> type, String id) {
		key = new Key(type, id);
	}
	
	public synchronized void addDependency(Dependency dependency) {
		int index = dependencies.size();
		//Make sure non-CSS dependencies come before CSS dependencies
		if (dependency.type != StyleSheet.TYPE)
			while (index > 0 && dependencies.get(index - 1).type == StyleSheet.TYPE)
				index--;
		dependencies.add(index, dependency);
	}
	
	public boolean equals(Object other) {
		if (!(other instanceof Resource))
			return false;
		return ((Resource)other).key.equals(key);
	}

	public synchronized Collection<Dependency> getDependencies() {
		return dependencies;
	}
	
	public String getFullPath() {
		WebBundle bundle = WebBundle.bundleMatching(getId());
		String result = bundle.getId() + '/';
		result += getId().substring(result.length());
		return result;
	}

	public String getId() {
		return key.id;
	}
	
	public final State getState(RenderContext context) {
		State result = new State();
		getState(context, result);
		return result;
	}
	
	public void getState(RenderContext context, State state) {
		state.merge(internalGetStartup());
	}

	// CHANGED
	public synchronized String getTinyId() {
		if (tinyID == null)
			// CHANGED: don't generate tiny ids
			//tinyID = getTinyId(key);
			//return tinyID;
			synchronized (TINY) {
				// ADDED: experimental id optimization, better API needed
				tinyID = ResourceOptimization.suggestedIds.get(key);
				if (tinyID != null)
					return tinyID;
			}
		// CHANGED
		//return tinyID;
		return key.id/* + '.' + key.type.name*/;
	}
	
	/**
	 * Returns <code>null</code> or a resource type.
	 * @return <code>null</code> or the type of the resource
	 */
	public Type<?> getType() {
		return key.type;
	}
	
	public int hashCode() {
		return key.hashCode();
	}
	
	/**
	 * Refreshes the dependencies, content, and timestamp for this resource.
	 * <p>
	 * <b>WARNING:</b> this method is internal to the framework
	 */
	public boolean internalRefresh(RenderContext context) {
		return false;
	}
	
	public final boolean isDynamic() {
		return internalIsDynamic();
	}
	
	boolean internalIsDynamic() {
		return true;
	}

	Key key() {
		return key;
	}
	
	// CHANGED: return this
	public Resource register() {
		Key key = key();
		synchronized (WRITELOCK) {
			if (RESOURCES.containsKey(key)) return RESOURCES.get(key);
				//throw new RuntimeException(getType().name + " with ID \"" + getId() + "\" already exists");
			RESOURCES.put(key, this);
			Collection<Dependency> bindings = BINDINGS.get(key);
			if (bindings != null)
				for (Dependency d : bindings)
					addDependency(d);
		}
		return this;
	}
	
	public synchronized void removeDependency(Dependency dependency) {
		if (!dependencies.remove(dependency))
			throw new RuntimeException("Attempt to remove non-existent dependency: " + dependency);
	}
	
	public void unregister() {
		Key key = key();
		synchronized (WRITELOCK) {
			if (RESOURCES.get(key) != this)
				throw new RuntimeException(getType().name + " with ID \"" + getId() + "\" is not registered");
			RESOURCES.remove(key);
		}
	}
	
	public String toString() {
		return getType().name + " \"" + getId() + "\"";
	}
	
	public void write(Appendable output, RenderContext context) throws IOException {}
	
	// CHANGED: use versionstamp as etag
	static String addEtag(String path, URL url) {
		return path + "?etag=" + VersionStamp.getInstance().toString();
	}
	
	public static void createBinding(Key key, Dependency dependency) {
		synchronized (WRITELOCK) {
			Resource resource = RESOURCES.get(key);
			if (resource != null)
				resource.addDependency(dependency);
			BINDINGS.addValue(key, dependency);
		}
	}
	
	public static void deleteBinding(Key key, Dependency dependency) {
		synchronized (WRITELOCK) {
			Resource resource = RESOURCES.get(key);
			if (resource != null)
				resource.removeDependency(dependency);
			BINDINGS.removeValue(key, dependency);
		}
	}
	
	// ADDED:
	public static boolean hasBindings(Key key) {
		return BINDINGS.containsKey(key);
	}
	
	// ADDED:
	public static boolean hasBinding(Key key, Dependency dependency) {
		return hasBindings(key) && BINDINGS.get(key).contains(dependency);
	}
	
	// CHANGED: resolve .css files
	public static Resource resolve(String uri) {
		Assert.isTrue(!uri.endsWith(".js"), "the suffix \".js\" is no longer used");
		Resource result = null;
		if (uri.endsWith(".css")) {
			result = new WebBundleDependency(StyleSheet.TYPE, uri).resolve();
		} else if (uri.contains(".") || uri.contains("/")) {
			if (uri.startsWith("dojo/i18n!")) //TODO make this unnecessary
				result = DojoI18n.newDependency(uri.substring(10)).resolve();
			else
				result = new WebBundleDependency(JavaScriptModule.TYPE, uri).resolve();
		} else {
			try {
				Key key = getKeysByTinyId().get(uri);
				Assert.isNotNull(key, "Unknown resource ID: " + uri);
				result = new WebBundleDependency(key.type, key.id).resolve();
			} catch (DistributedOperationException e) {
				throw new RuntimeException("Error accessing distributed data", e);
			}
		}
		if (result == null)
			throw new IllegalArgumentException("Resource does not exist: " + uri);
		return result;
	}
	
	// ADDED
	public static void registerProvider(Provider<ResourceProvider> provider, Key key)
	{
		Resource.PROVIDERS.put(key, provider);
	}
	
	public static <T extends Resource> T resolve(Type type, String id) {
		Key key = new Key(type, id);
		Resource result = RESOURCES.get(key);
		if (result == null && PROVIDERS.containsKey(key)) {
			synchronized (WRITELOCK) {
				result = RESOURCES.get(key);
				if (result == null) {
					result = PROVIDERS.get(key).get().provide(id);
					result.register();
				}
			}
		}
		return (T) result;
	}
	
	public static List<Resource> resolveAll(String... uris) {
		if (uris.length == 0)
			return Collections.EMPTY_LIST;
		List<Resource> result = new ArrayList();
		for (String uri : uris){
			try{
				result.add(resolve(uri));
			}catch(IllegalArgumentException e){
				if (!uri.endsWith(".css"))
					throw e;
			}
		}
		return result;
	}
	
	static synchronized IDistributedMap<String, Key, DistributedOperationException> getKeysByTinyId() {
		if (KEYS_BY_TINYID == null) {
			try {
				if (KEYS_BY_TINYID == null)
					KEYS_BY_TINYID = AjaxFramework.getDistributedDataService()
							.getMap(Resource.class.getName() + ".keysByTinyId", new KeyValueSerializer());
			} catch (DistributedOperationException e) {
				throw new RuntimeException("Error accessing distributed data", e);
			}
		}
		return KEYS_BY_TINYID;
	}
	
	static synchronized String getTinyId(Key key) {
		try {
			// check if already a tinyId for this key
			IDistributedMap<Key, String, DistributedOperationException> tinyIdsByKey = getTinyIdsByKey();
			String tinyId = tinyIdsByKey.get(key);
			if (tinyId == null) {
				// no tinyId; generate one and populate the maps
				if (nextId == null)
					nextId = AjaxFramework.getDistributedDataService()
							.getValueHolder(Resource.class.getName() + ".nextId", new IntegerValueSerializer());
				// claim a new tinyId
				while (true) {
					Integer oldValue = nextId.get();
					int nextIdValue = (oldValue == null) ? 0 : oldValue; // treat initial null value as 0
					if (nextId.compareAndSet(oldValue, nextIdValue + 1)) {
						tinyId = hashString(nextIdValue);
						break;
					}
				}
				// populate the main map
				String existingValue = tinyIdsByKey.putIfAbsent(key, tinyId);
				if (existingValue != null) {
					tinyId = existingValue;
				}
			}
			getKeysByTinyId().putIfAbsent(tinyId, key);
			return tinyId;
		}
		catch (DistributedOperationException e) {
			throw new RuntimeException("Error accessing distributed data", e);
		}
	}
	
	static synchronized IDistributedMap<Key, String, DistributedOperationException> getTinyIdsByKey() {
		if (TINYIDS_BY_KEY == null) {
			try {
				if (TINYIDS_BY_KEY == null)
					TINYIDS_BY_KEY = AjaxFramework.getDistributedDataService()
							.getMap(Resource.class.getName() + ".tinyIdsByKey", new KeySerializer(), new StringValueSerializer());
			} catch (DistributedOperationException e) {
				throw new RuntimeException("Error accessing distributed data", e);
			}
		}
		return TINYIDS_BY_KEY;
	}
	
	static String hashString(long value) {
		if (value < 0)
			value = -value;
		StringBuilder result = new StringBuilder();
		do {
			result.insert(0, CHARS[(int) (value % RADIX)]);
			value /= RADIX;
		} while (value != 0);
		return result.toString();
	}
		
	public static class Key {
		final String id;
		final Type<?> type;
		
		public Key(Type<?> type, String id){
			this.type = type;
			this.id = id;
		}

		public boolean equals(Object obj) {
			if (obj instanceof Key) {
				Key key = (Key) obj;
				return type == key.type && key.id.equals(id);
			}
			return false;
		}
		
		public int hashCode() {
			return type.hashCode() ^ id.hashCode();
		}
	}
	
	/*
	 * Serializes Keys into Strings. The format is "<len>:<typeName><id>", where len is the number of
	 * characters in the type name. For example, if the typeName is "ajaxApplication" and the id is
	 * "com.ibm.foo", then the serialized form is "15:ajaxApplicationcom.ibm.foo". This format imposes
	 * no restrictions on the content of the key.
	 */
	public static class KeySerializer implements Serializer<Key, String> {
		private static final char DELIMITER = ':';
		public Key deserialize(String serialized) throws DistributedOperationException {
			int index = serialized.indexOf(DELIMITER);
			int len = Integer.parseInt(serialized.substring(0, index++));
			return new Key(Type.forName(serialized.substring(index, index + len)), serialized.substring(index + len));
		}
		public String serialize(Key key) throws DistributedOperationException {
			return String.valueOf(key.type.name.length()) + DELIMITER + key.type.name + key.id;
		}
	}
	
	/*
	 * Serializes Keys into byte arrays. Uses the String serializer above and converts
	 * the Strings to UTF-8 bytes.
	 */
	public static class KeyValueSerializer implements Serializer<Key, byte[]> {
		private KeySerializer keySerializer = new KeySerializer();
		public Key deserialize(byte[] bytes) throws DistributedOperationException {
			try {
				return keySerializer.deserialize(new String(bytes, HTTP.UTF_8));
			}
			catch (UnsupportedEncodingException e) {
				throw new RuntimeException(e);
			}
		}
		public byte[] serialize(Key key) throws DistributedOperationException {
			try {
				return keySerializer.serialize(key).getBytes(HTTP.UTF_8);
			}
			catch (UnsupportedEncodingException e) {
				throw new RuntimeException(e);
			}
		}
	}
	
	public static class State {
		public long lastModified;
		public long etag;
		
		public boolean equals(Object obj) {
			if (obj instanceof State) {
				State other = (State) obj;
				return other.etag == etag
						&& other.lastModified == lastModified;
			}
			return false;
		}
		public void merge(State other) {
			lastModified = Math.max(lastModified, other.lastModified);
			mergeETag(other.etag);
		}
		public void merge(long timestamp) {
			lastModified = Math.max(lastModified, timestamp);
			etag += timestamp;
		}
		public void mergeETag(long value) {
			etag += value;
		}
		public String toString() {
			return "State etag=\"" + etag + "\" lastModified=\"" + lastModified + "\"";
		}
		// CHANGED: use version stamp
		public String getETag() {
			return VersionStamp.INSTANCE.toString(); // hashString(etag);
		}
	}
	
	public static class Type<T extends Resource> {
		static final Map<String, Type<?>> TYPES = new HashMap();
		
		public final String name;
		
		Type(String name) {
			this.name = name;
		}
		
		// CHANGED: made public
		public static <T extends Resource> Type<T> create(String name) {
			synchronized (TYPES) {
				Assert.isTrue(!TYPES.containsKey(name));
				Type result = new Type(name);
				TYPES.put(name, result);
				return result;
			}
		}
		
		public static Type forName(String name) {
			return TYPES.get(name);
		}
	}

}
