/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.core.web.resources.servlet;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

/**
 * @author Michael Ahern (michael.ahern@ie.ibm.com)
 *
 */
public class ScriptExtractor {
	
	final static SAXParserFactory factory = SAXParserFactory.newInstance();
	static {
		factory.setValidating(false);
		factory.setNamespaceAware(false);
	}
	
	private final static class Handler extends DefaultHandler {
		private final List<String> scripts = new ArrayList<String>();
		
		public void startElement(
			String uri, String localName,String qName, 
			Attributes attributes) throws SAXException 
		{
			if ("script".equals(qName)) {
				scripts.add(attributes.getValue("src"));
			}
		}

		public final List<String> getScripts() {
			return scripts;
		}
	}
 
	/**
	 * Extract the script data and convert into a JSON array of []
	 * 
	 * @param content
	 * @return
	 * @throws IOException
	 */
	public static List<String> extractTags(String content) throws IOException {
		try {
			content = content.replaceAll("&", "&amp;");
			
			//System.err.println("++++++" + content);
			
			final SAXParser parser = factory.newSAXParser();
			final Handler handler = new Handler();
			parser.parse(new InputSource(new StringReader(content)), handler);
			
			//System.err.println("%%%%% " + handler.getScripts());
			
			return handler.getScripts();
		} catch (IOException e) {
			throw e;
		} catch (Exception e) {
			throw new IOException(e);
		}
	}

}
