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

package com.ibm.lconn.bookmarklet;

/**
 * The <CODE>Copyright</CODE> class defines the short and long version of
 * the Dogear Copyright statement. Either one of these string has to be embedded
 * in each and every class file as shown in the example below:
 * 
 * <PRE>
 * public class Foo
 * {
 *   ...
 *   private final static String COPYRIGHT = com.ibm.dogear.Copyright.SHORT;
 *   ...
 * } 
 * </PRE>
 */
public class Copyright {

	private Copyright() { }
	
	public final static String YEARS = "2006, 2006";

    public final static String SHORT = "Licensed Materials - Property of IBM, Dogear v1.0, (C) Copyright IBM Corp. 2001, 2006 - All Rights reserved. US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.";

    public final static String LONG = SHORT;

    public final static String[] DISPLAY = {
            "Licensed Materials - Property of IBM",
            "Dogear v1.0",
            "(C) Copyright IBM Corp. 2006, 2006 - All Rights Reserved.",
            "US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp." };
}


    
