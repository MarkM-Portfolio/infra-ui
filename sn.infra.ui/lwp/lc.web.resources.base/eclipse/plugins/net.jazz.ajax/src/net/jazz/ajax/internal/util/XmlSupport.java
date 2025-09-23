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

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class XmlSupport {
	
	static final DocumentBuilderFactory FACTORY;
	
	static {
		FACTORY = DocumentBuilderFactory.newInstance();
		FACTORY.setValidating(false);
		FACTORY.setExpandEntityReferences(false);
		FACTORY.setNamespaceAware(true);
		FACTORY.setCoalescing(true);
	}
	
	static class EmptyEntityResolver implements EntityResolver {
		static final EmptyEntityResolver INSTANCE = new EmptyEntityResolver();
		public InputSource resolveEntity(String publicId, String systemId) throws SAXException, IOException {
			return new InputSource(new StringReader(""));
		}
	}
	
	public static Document parse(InputSource source) throws SAXException, IOException {
		try {
			DocumentBuilder builder = FACTORY.newDocumentBuilder();
			builder.setEntityResolver(EmptyEntityResolver.INSTANCE);
			return builder.parse(source);
		} catch (ParserConfigurationException e) {
			// TODO should never happen, but should be logged
			throw new RuntimeException(e);
		}
	}
	
	public static Document parse(InputStream stream, String ... optionalDocumentURI) throws SAXException, IOException {
		String baseURI = null;
		if (optionalDocumentURI.length == 1)
			baseURI = optionalDocumentURI[0];
		else if (optionalDocumentURI.length > 1)
			throw new IllegalArgumentException("Too many strings given for the Document URI");
		try {
			DocumentBuilder builder = FACTORY.newDocumentBuilder();
			builder.setEntityResolver(EmptyEntityResolver.INSTANCE);
			return builder.parse(stream, baseURI);
		} catch (ParserConfigurationException e) {
			// TODO should never happen, but should be logged
			throw new RuntimeException(e);
		}
	}

}
