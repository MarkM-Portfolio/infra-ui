/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.bookmarklet.util;

import java.io.UnsupportedEncodingException;

import com.ibm.icu.lang.UCharacter;
import com.ibm.icu.text.UCharacterIterator;

public class TextUtilities {
	public static String stripNonPrintableCharacters(String s) {
		if(s == null) {
			return null;
		}

		StringBuffer resultBuf = new StringBuffer();

		UCharacterIterator iter = UCharacterIterator.getInstance(s);
		int next = iter.nextCodePoint();
		while (next != UCharacterIterator.DONE) {
			if (UCharacter.isPrintable(next)) {
				resultBuf.append(UCharacter.toString(next));
			}
			next = iter.nextCodePoint();
		}

		return resultBuf.toString();
	}
	
	/**
     * To detect the max availabe UTF-8 char number by given bytes limit
     * It's used to fit into column size which is defined by bytes not chars
     * @param s
     * @param max
     * @return
     */
    public static int getMaxUTF8CharCount(String s, int max) {
        int allowed = 0;
        for (int i=0; i<=s.length(); i++){
            try {
                int length = s.substring(0, i).getBytes("utf-8").length;
                if ( length > max){
                    return allowed;
                } else {
                    allowed = i;
                }
            } catch (UnsupportedEncodingException e) {
                return s.length();
            }
       }
        return s.length();
    }
}
