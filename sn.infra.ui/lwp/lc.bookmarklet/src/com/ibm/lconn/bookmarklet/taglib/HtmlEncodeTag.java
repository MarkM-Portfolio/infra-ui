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

package com.ibm.lconn.bookmarklet.taglib;

import com.ibm.lconn.bookmarklet.Copyright;
import com.ibm.lconn.bookmarklet.util.HtmlUtil;

public class HtmlEncodeTag extends AbstractBodyTransformer
{
	private final static String COPYRIGHT = Copyright.SHORT;
	
	@Override
	protected String transform(String s)
	{
		return HtmlUtil.encodeHtml(s);
	}

}

