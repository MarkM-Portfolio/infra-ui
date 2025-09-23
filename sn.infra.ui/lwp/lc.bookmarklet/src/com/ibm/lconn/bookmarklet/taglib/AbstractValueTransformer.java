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
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.bookmarklet.Copyright;

abstract public class AbstractValueTransformer<T> extends BodyTagSupport
{
	private final static String COPYRIGHT = Copyright.SHORT;
	
	static public final Log LOG = LogFactory.getLog(AbstractValueTransformer.class);

	private T value;

	public void setValue(T value)
	{
		this.value = value;
	}

	public T getValue()
	{
		return value;
	}

	@Override
	public int doStartTag() throws JspException
	{
		LOG.debug("enter");
		try
		{
			T string = getValue();
			String transformed = transform(string);
			if (LOG.isDebugEnabled()) {
				if (string == null) {
					LOG.debug("<null> -> " + transformed);
				} else {
					LOG.debug(string + " -> " + transformed);
				}
			}
			pageContext.getOut().print(transformed);
		}
		catch (Exception e)
		{
			throw new JspException("Error: " + e.getMessage());
		}
		LOG.debug("exit");
		return SKIP_BODY;
	}

	abstract protected String transform(T s);

}
