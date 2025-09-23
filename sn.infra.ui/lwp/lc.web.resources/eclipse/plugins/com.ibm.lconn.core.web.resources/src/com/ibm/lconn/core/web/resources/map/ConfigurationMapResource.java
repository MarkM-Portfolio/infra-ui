/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.web.resources.map;

import java.io.IOException;
import java.io.StringWriter;
import java.text.DateFormat;
import java.util.Date;
import java.util.Map;

import net.jazz.ajax.model.GeneratedJavaScriptResource;
import net.jazz.ajax.model.RenderContext;

import com.ibm.sistdase.json.JSONSerializer;

public abstract class ConfigurationMapResource extends GeneratedJavaScriptResource
{
  public ConfigurationMapResource(String id)
  {
    super(id);
  }

  public ConfigurationMapResource(Type<?> type, String id)
  {
    super(type, id);
  }

  abstract protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException;

  @Override
  protected CharSequence content(RenderContext context) throws IOException
  {
    Map<String, Object> config = createConfigurationMap(context);

    StringWriter sb = new StringWriter();
    sb.append("/* Generated at " + DateFormat.getInstance().format(new Date(getLastModified())) + " by ").append(this.getClass().getName())
        .append(" */\n");

    sb.append("dojo.mixin(dojo.provide(\"").append(getId()).append("\"), ");
    JSONSerializer.serialize(sb, config, true);
    sb.append(");\n");

    return sb.getBuffer();
  }

}