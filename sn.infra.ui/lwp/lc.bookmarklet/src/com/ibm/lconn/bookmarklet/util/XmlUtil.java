/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.util;

import com.ibm.icu.lang.UCharacter;
import com.ibm.icu.text.UCharacterIterator;
import com.ibm.lconn.bookmarklet.Copyright;

public class XmlUtil
{
	private final static String COPYRIGHT = Copyright.SHORT;
	
	private XmlUtil()
	{
		super();
	}

	public static String clean(String text)
	{
		if (text == null)
			return "";

		StringBuffer sb = new StringBuffer();
		
		UCharacterIterator iter = UCharacterIterator.getInstance(text);
		int next = iter.nextCodePoint();
		while (next != UCharacterIterator.DONE) {
			if (isXMLCharacter(next)) {
				sb.append(UCharacter.toString(next));
			}
			next = iter.nextCodePoint();
		}
		
		return sb.toString();
	}

	/**
	 * see http://www.w3.org/TR/2000/REC-xml-20001006#charsets
	 * 
	 *  "any Unicode character, excluding the surrogate blocks, 
	 *  FFFE, and FFFF."
	 *  Char 	   ::=    	#x9 | #xA | #xD | [#x20-#xD7FF] | 
	 *                      [#xE000-#xFFFD] | [#x10000-#x10FFFF]
	 */
	private static boolean isXMLCharacter(int c)
	{

		if (c == 0x9)
			return true;
		if (c == 0xA)
			return true;
		if (c == 0xD)
			return true;

		if (c < 0x20)
			return false;
		if (c <= 0xD7FF)
			return true;
		if (c < 0xE000)
			return false;
		if (c <= 0xFFFD)
			return true;
		if (c < 0x10000)
			return false;
		if (c <= 0x10FFFF)
			return true;

		return false;
	}

}
