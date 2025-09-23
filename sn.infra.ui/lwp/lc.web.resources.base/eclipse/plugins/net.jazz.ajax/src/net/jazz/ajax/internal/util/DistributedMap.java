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

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.internal.util;

import com.ibm.team.jfs.app.distributed.DistributedOperationException;
import com.ibm.team.jfs.app.distributed.IDistributedMap;
import com.ibm.team.jfs.app.distributed.IDistributedMap.Serializer;
import com.ibm.team.jfs.app.distributed.StringKeySerializer;

import net.jazz.ajax.internal.AjaxFramework;

public class DistributedMap<K,V> {
	
	final String mapId;
	final Serializer<K, String> keySerializer;
	final Serializer<V, byte[]> valueSerializer;
	IDistributedMap<K, V, DistributedOperationException> map;
	
	DistributedMap(String mapId, Serializer<V, byte[]> valueSerializer) {
		this.mapId = mapId;
		this.keySerializer = (Serializer<K, String>) new StringKeySerializer();
		this.valueSerializer = valueSerializer;
	}
	
	public V get(K key) {
		try {
			return map().get(key);
		} catch (DistributedOperationException e) {
			throw new RuntimeException(e);
		}
	}
	
	synchronized IDistributedMap<K, V, DistributedOperationException> map() {
		if (map == null) {
			try {
				map = AjaxFramework.getDistributedDataService().getMap(mapId, keySerializer, valueSerializer);
			} catch (DistributedOperationException e) {
				throw new RuntimeException(e);
			}
		}
		return map;
	}

	public void putIfAbsent(K k, V v) {
		try {
			map().putIfAbsent(k, v);
		} catch (DistributedOperationException e) {
			throw new RuntimeException(e);
		}
	}

	public static <V> DistributedMap<String, V> create(String mapId, Serializer<V, byte[]> serializer) {
		return new DistributedMap(mapId, serializer);
	}
}
