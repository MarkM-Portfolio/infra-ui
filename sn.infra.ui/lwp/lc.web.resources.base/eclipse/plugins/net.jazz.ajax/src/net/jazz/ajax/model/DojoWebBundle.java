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

package net.jazz.ajax.model;

//import java.io.IOException;
//import java.net.URL;
//
//import net.jazz.ajax.internal.AjaxFramework;
//import net.jazz.ajax.internal.util.Util;
//
//import org.eclipse.core.runtime.Platform;

// ADDED: safe to remove?
public class DojoWebBundle /*extends OSGiWebBundle*/ {

//	public DojoWebBundle() {
//		super(Platform.getBundle("org.dojotoolkit.dojo"), "dojo", null);
//		
//		register();
//		
//		URL compressed = bundle.getResource("resources/dojo.js");
//		URL uncompressed = bundle.getResource("resources/dojo.js.uncompressed.js");
//		try {
//			new DojoModule(uncompressed, "dojo.dojo", Util.stringBuffer(compressed.openStream()).toString())
//					.register();
//			Resource.createBinding(new Key(JavaScriptResource.TYPE, "dojo" + WebBundle.BOOTSTRAP),
//					StyleSheet.newDependency(this, "dojo/resources/dojo.css", false));
//		} catch (IOException e) {
//			AjaxFramework.log(e);
//		}
//	}
}
