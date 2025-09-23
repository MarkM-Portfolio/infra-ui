/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Rights Reserved.
 * 
 * Note to U.S. Government Users Restricted Rights: Use, duplication or
*/
package net.jazz.ajax.model;

import java.io.IOException;

public class VirtualJavascriptResource extends Resource {
	
	public VirtualJavascriptResource(String id) {
		super(JavaScriptResource.TYPE, id);
	}
	
	public void write(Appendable output, RenderContext context) throws IOException {
		switch (context.mode) {
			case NO_MINIFY:
			case DEBUG:
			case STANDARD:
				output.append("\n;");
				output.append("\ndojo.provide(\"").append(getId()).append("\");");
				for (Dependency d : dependencies)
					if (JavaScriptResource.TYPE.equals(d.type))
						output.append("\ndojo.require(\"").append(d.id).append("\");");
				output.append("\n");
				break;
		}
	}

}
