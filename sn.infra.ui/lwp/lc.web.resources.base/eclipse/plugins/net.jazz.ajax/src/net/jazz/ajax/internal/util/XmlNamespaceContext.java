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

import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.xml.namespace.NamespaceContext;

@SuppressWarnings("unchecked") 
public class XmlNamespaceContext implements NamespaceContext {
	
	Map<String, String> prefixToNS = new HashMap();
	Map<String, String> nsToPrefix =new HashMap();
	
	public XmlNamespaceContext(String ... data) {
		for (int i = 0; i < data.length; i += 2) {
			String prefix = data[i];
			String ns = data[i + 1];
			prefixToNS.put(prefix, ns);
			nsToPrefix.put(ns, prefix);
		}
	}
	
	public String getNamespaceURI(String prefix) {
		return prefixToNS.get(prefix);
	}
	
	public String getPrefix(String namespace) {
		return nsToPrefix.get(namespace);
	}
	
	public Iterable<String> getAllPrefixes() {
		return prefixToNS.keySet();
	}


	public Iterator getPrefixes(String namespace) {
		return Collections.singleton(nsToPrefix.get(namespace)).iterator();
	}

}
