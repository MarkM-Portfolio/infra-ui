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

package net.jazz.ajax.internal.util;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;

public class StreamUtil {
	
	public static void pipe(Reader input, Writer output) throws IOException {
		try {
			char[] buffer = new char[8192];
			int len;
			while ((len = input.read(buffer)) != -1)
				output.write(buffer, 0, len);
		} finally {
			try {input.close();}
			finally {output.close();}
		}
	}
	
	public static String toString(Reader reader) throws IOException {
		StringBuilder result = new StringBuilder();
		int count;
		char buffer[] = new char[512];
		do {
			count = reader.read(buffer);
			if (count > 0)
				result.append(buffer, 0, count);
		} while (count != -1);
		return result.toString();
	}

}
