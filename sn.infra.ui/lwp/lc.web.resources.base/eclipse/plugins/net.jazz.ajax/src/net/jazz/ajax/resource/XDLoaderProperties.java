/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
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

package net.jazz.ajax.resource;

import java.io.IOException;
import java.util.Locale;

import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.RenderContext.LocaleOverride;
import net.jazz.ajax.model.RenderContext.Mode;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;

public class XDLoaderProperties extends ResourceProvider {

    public Resource provide(String id) {
        return new ModuleResource(id);
    }

    private static class ModuleResource extends Resource {
        public ModuleResource(String id) {
            super(JavaScriptResource.TYPE, id);
        }

        public void write(Appendable output, RenderContext context)
                throws IOException {
            output.append("dojo.provide(\"")
                .append(getId())
                .append("\");dojo.mixin(dojo.getObject(\"net.jazz.ajax.config\",true),{loaded:[],base:\"")
                .append(context.base)
                .append("\"");

            StringBuilder params = new StringBuilder();
            if (context.locale.getLanguage().length() > 0)
                params.append("&lang="+context.locale.getLanguage().toLowerCase(Locale.ENGLISH));
            if (context.locale.getCountry().length() > 0)
                params.append("&country="+context.locale.getCountry().toLowerCase(Locale.ENGLISH));
            if (context.locale.getVariant().length() > 0)
                params.append("&variant="+context.locale.getVariant().toLowerCase(Locale.ENGLISH));
            if (context.mode == Mode.NO_MINIFY)
                params.append("&debug=dojo");
            else if (context.mode == Mode.DEBUG)
                params.append("&debug=true");
            if (context.localeOverride == LocaleOverride.FALSE)
                params.append("&_localeOverride=false");
            if (params.length() > 0)
                output.append(",params:\"").append(params.substring(1).replaceAll("[^\"]\"", "\"")).append("\"");
            
            output.append("},dojo.getObject(\"netJazzAjaxConfig\",true));");
        }
    }
}
