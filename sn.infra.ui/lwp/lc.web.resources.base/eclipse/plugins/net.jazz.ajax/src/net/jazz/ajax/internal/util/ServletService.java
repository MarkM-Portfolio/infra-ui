/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
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

import java.util.Dictionary;

import javax.servlet.Servlet;

import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;

import net.jazz.ajax.internal.util.OSGiServices.Runner;

public class ServletService {
	public static void registerServlet(final String path, final Servlet servlet) {
		OSGiServices.runWithService(HttpService.class, new Runner<HttpService>() {
			public void run(HttpService service) throws Exception {
				try {
					service.registerServlet(path, servlet, null, null);
				} catch (NamespaceException e) {
				}
			}

			@Override
			public void shutdown() throws Exception {
				// TODO Auto-generated method stub
				
			}
		});
	}
	
	// ADDED
	public static void registerServlet(final String path, final Servlet servlet, final Dictionary initparams) {
		OSGiServices.runWithService(HttpService.class, new Runner<HttpService>() {
			public void run(HttpService service) throws Exception {
				try {
					service.registerServlet(path, servlet, initparams, null);
				} catch (NamespaceException e) {
				}
			}

			@Override
			public void shutdown() throws Exception {
				// TODO Auto-generated method stub
				
			}
		});
	}	

	// ADDED
	public static void registerServlet(final String path, final Servlet servlet, final Dictionary initparams, final boolean replaceExisting) {
		OSGiServices.runWithService(HttpService.class, new Runner<HttpService>() {
			public void run(HttpService service) throws Exception {
				try {
					service.registerServlet(path, servlet, initparams, null);
				} catch (NamespaceException e) {
					if (replaceExisting) { 
						service.unregister(path);
						service.registerServlet(path, servlet, initparams, null);
					}
				}
			}

			@Override
			public void shutdown() throws Exception {
				// TODO Auto-generated method stub
				
			}
		});
	}	

	public static void unregisterServlet(final String path) {
		OSGiServices.runWithService(HttpService.class, new Runner<HttpService>() {
			public void run(HttpService service) throws Exception {
				service.unregister(path);
			}

			@Override
			public void shutdown() throws Exception {
				// TODO Auto-generated method stub
				
			}
		});
	}
}
