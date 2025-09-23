/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
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

package net.jazz.ajax.internal;

import java.io.IOException;
import java.net.URL;

import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.Platform;
import org.eclipse.osgi.service.urlconversion.URLConverter;

public class BundleResourceURLConverter implements URLConverter {

	public URL toFileURL(URL url) throws IOException {
		return FileLocator.toFileURL(
				Platform.getBundle(url.getHost())
						.getResource(url.getPath()));
	}

	public URL resolve(URL url) throws IOException {
		return FileLocator.resolve(
			Platform.getBundle(url.getHost())
					.getResource(url.getPath()));
	}

}
