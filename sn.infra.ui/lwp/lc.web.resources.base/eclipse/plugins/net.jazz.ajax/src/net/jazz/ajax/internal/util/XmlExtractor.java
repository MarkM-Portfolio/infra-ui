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

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.namespace.NamespaceContext;
import javax.xml.namespace.QName;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Attr;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@SuppressWarnings("unchecked")
public class XmlExtractor<TResult> {
	
	private static final XPathFactory factory = XPathFactory.newInstance();
	final XPathExpression expression;
	final QName type;
	
	protected XmlExtractor(String expression, QName type, NamespaceContext ... optionalContext) {
		this.type = type;
		this.expression = createExpression(expression, optionalContext);
	}
	
	protected XmlExtractor(XPathExpression expression, QName type) {
		this.type = type;
		this.expression = expression;
	}
	
	protected Object convert(Object intermediate) {
		return intermediate;
	}
	
	/**
	 * By default, the text content of the node is extracted and passed to {@link #convert(Object)}.
	 */
	protected Object convertNode(Node node) {
		return convert(node.getTextContent());
	}
	
	protected List convertNodeList(NodeList list) {
		List result = new ArrayList();
		for (int i = 0; i < list.getLength(); i++)
			result.add(convertNode(list.item(i)));
		return result;
	}
	
	public TResult extract(Node source) {
		return extract(source, null);
	}
	
	public TResult extract(Node source, TResult defaultVal) {
		try {
			Object rawResult;
			synchronized (expression) {
				rawResult = expression.evaluate(source, type);
			}
			if (type == XPathConstants.STRING && ((String)rawResult).length() == 0)
				rawResult = null;
			if (rawResult == null)
				return defaultVal;
			if (type == XPathConstants.NODESET)
				return (TResult) convertNodeList((NodeList)rawResult);
			if (type == XPathConstants.NODE)
				return (TResult) convertNode((Node)rawResult);
			return (TResult) convert(rawResult);
		} catch (XPathExpressionException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static XmlExtractor<Boolean> booleanExtractor(String expression, NamespaceContext ... optionalContext) {
		return new XmlExtractor<Boolean>(expression, XPathConstants.STRING) {
			protected Boolean convert(Object inter) {
				return Boolean.valueOf((String)inter);
			}
		};
	}
	
	public static XPathExpression createExpression(String expression, NamespaceContext ... optionalContext) {
		try {
			XPath xpath;
			synchronized (factory) {
				xpath = factory.newXPath();
			}
			if (optionalContext.length == 1)
				xpath.setNamespaceContext(optionalContext[0]);
			return xpath.compile(expression);
		} catch (XPathExpressionException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static XmlExtractor<Integer> integerExtractor(String expression, NamespaceContext ... optionalContext) {
		return new XmlExtractor(expression, XPathConstants.STRING, optionalContext) {
			protected Integer convert(Object inter) {
				return Integer.valueOf((String)inter);
			}
		};
	}
	
	public static <T extends Node> XmlExtractor<List<T>> multiNodeExtractor(String expression, NamespaceContext ... optionalContext) {
		return new NodeExtractor(expression, XPathConstants.NODESET, optionalContext);
	}
	
	public static XmlExtractor<List<String>> multiStringExtractor(String expression, NamespaceContext ... optionalContext) {
		return new XmlExtractor(expression, XPathConstants.NODESET, optionalContext);
	}
	
	public static XmlExtractor<List<URI>> multiUriExtractor(String expression, NamespaceContext ... context) {
		return new URIExtractor(expression, XPathConstants.NODESET, context);
	}
	
	public static <T extends Node> XmlExtractor<T> nodeExtractor(String expression, NamespaceContext ... optionalContext) {
		return new NodeExtractor(expression, XPathConstants.NODE, optionalContext);
	}
	
	public static XmlExtractor<String> stringExtractor(String expression, NamespaceContext ... optionalContext) {
		return new XmlExtractor(expression, XPathConstants.STRING, optionalContext);
	}
	
	public static XmlExtractor<URI> uriExtractor(String expression, NamespaceContext ... context) {
		return new URIExtractor(expression, XPathConstants.NODE, context);
	}
	
	static class NodeExtractor<T> extends XmlExtractor<T> {
		private NodeExtractor(String expression, QName type, NamespaceContext ... optionalContext) {
			super(expression, type, optionalContext);
		}
		
		protected Object convertNode(Node node) {
			return node;
		}
	}
	
	static class URIExtractor<T> extends XmlExtractor<T> {
		
		public URIExtractor(String expression, QName qname, NamespaceContext ... context) {
			super(expression, qname, context);
		}
		
		protected Object convertNode(Node node) {
			String value = node.getTextContent();
			if (value == null)
				return null;
			if (node instanceof Attr)
				node = ((Attr) node).getOwnerElement();
			String base = node.getBaseURI();
			try {
			if (base != null)
				return new URI(base).resolve(value);
			else
				return new URI(value);
			} catch (URISyntaxException exc) {
				throw new IllegalArgumentException(exc);
			}
		}
	}
	
}
