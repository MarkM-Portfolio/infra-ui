/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
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
package net.jazz.ajax.internal.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * A Map supporting multiple values per key, stored using a configurable {@link Collection}
 * type.  The Collection implementation must have a default constructor.
 */
public class MultiValueMap<K, V, C extends Collection<V>> {
	
	final Map<K, C> map;
	final Class<? extends C> type;
	
	public MultiValueMap() {
		this(new HashMap(), (Class<? extends C>) (Class)ArrayList.class);
	}

	
	public MultiValueMap(Map map, Class<? extends C> type) {
		this.map = map;
		this.type = type;
	}
	
	public void addAll(K key, Collection<? extends V> values) {
		getCollection(key).addAll(values);
	}
	
	public boolean addValue(K key, V value) {
		return getCollection(key).add(value);
	}
	
	private void cleanUp(K key) {
		if (getCollection(key).isEmpty())
			map.remove(key);
	}
	
	public boolean containsKey(K key) {
		return map.containsKey(key);
	}
	
	public C get(K key) {
		return map.get(key);
	}
	
	private C getCollection(K key) {
		try {
			C collection = map.get(key);
			if (collection == null) {
				collection = type.newInstance();
				map.put (key, collection);
			}
			return collection;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public Map<K, C> getMap() {
		return map;
	}
	
	public Collection<K> keySet() {
		return map.keySet();
	}
	
	public boolean removeAll(K key, Collection<? extends V> values) {
		if (!map.containsKey(key))
			return false;
		try {
			return getCollection(key).removeAll(values);
		} finally {
			cleanUp(key);
		}
	}
	
	public boolean removeValue(K key, V value) {
		if (!map.containsKey(key))
			return false;
		try {
			return getCollection(key).remove(value);
		} finally {
			cleanUp(key);
		}
	}
	
	public Collection<C> values() {
		return map.values();
	}

	public static <K, V, C extends Collection<V>> MultiValueMap<K, V, C> using(Map map, Class<? extends C> type) {
		return new MultiValueMap(map, type);
	}
	
}
