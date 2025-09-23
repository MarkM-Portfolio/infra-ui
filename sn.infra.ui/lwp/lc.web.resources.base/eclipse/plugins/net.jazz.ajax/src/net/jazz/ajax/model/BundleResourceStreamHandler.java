/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2014                                    */
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

package net.jazz.ajax.model;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;

import org.eclipse.core.runtime.Platform;

public class BundleResourceStreamHandler extends URLStreamHandler {
	protected URLConnection openConnection(URL url) throws IOException {
		return Platform.getBundle(url.getHost())
				.getResource(url.getPath())
				.openConnection();
	}
	
	protected int hashCode(URL url) {
		return url.getHost().hashCode() + url.getPath().hashCode() * 37;
	}
	
	protected boolean equals(URL left, URL right) {
		return (left.getPath() == null && right.getPath() == null || left.getPath().equals(right.getPath()))
				&& (left.getHost() == null && right.getHost() == null || left.getHost().equals(right.getHost()));
	}
}
