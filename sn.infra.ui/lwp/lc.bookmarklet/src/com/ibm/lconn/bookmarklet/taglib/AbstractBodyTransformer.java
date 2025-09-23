/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.bookmarklet.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.Copyright;

abstract public class AbstractBodyTransformer extends BodyTagSupport
{
	private final static String COPYRIGHT = Copyright.SHORT;
	
	static public final Log LOG = LogFactory.getLog(AbstractBodyTransformer.class);

	@Override
	public int doAfterBody() throws JspException
	{
		LOG.debug("enter");
		try
		{
			BodyContent bc = getBodyContent();
			if (LOG.isDebugEnabled())
				LOG.debug("Body content is " + bc);
			bc.getEnclosingWriter().print(transform(bc.getString()));
		}
		catch (Exception e)
		{
			throw new JspException("Error: " + e.getMessage());
		}
		LOG.debug("exit");
		return SKIP_BODY;
	}

	abstract protected String transform(String s) throws JspException;

}
