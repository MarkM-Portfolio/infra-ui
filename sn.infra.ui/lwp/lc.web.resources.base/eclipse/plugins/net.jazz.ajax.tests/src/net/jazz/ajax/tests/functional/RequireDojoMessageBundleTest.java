/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.functional;

import static org.junit.Assert.*;

import java.io.StringWriter;
import java.io.Writer;
import java.util.List;

import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.Test;

@SuppressWarnings("nls")
public class RequireDojoMessageBundleTest extends AbstractTest
{
  @Test
  public void testRequireDojoMessageBundle() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/requiremessagebundle.js"), "lconn.test.requiremessagebundle")
        .register();

    List<Resource> includes = Resource.resolveAll("lconn.test.requiremessagebundle");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    String actual = writer.toString();
    assertTrue(actual.contains("dojo.provide(\"lconn.nls.messages\")._built=true;"));
    assertTrue(actual.contains("dojo.provide(\"lconn.nls.messages.en\");"));
  }

  @Test
  public void testRequireDojoI18n() throws Exception
  {
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/requiredojoi18n.js"), "lconn.test.requiredojoi18n")
        .register();

    List<Resource> includes = Resource.resolveAll("lconn.test.requiredojoi18n");
    List<Resource> excludes = Resource.resolveAll("dojo.main");

    ResourceGraph g = new ResourceGraph(CONTEXT_STANDARD, includes, excludes);

    Writer writer = new StringWriter();
    g.writeJavascript(writer, CONTEXT_STANDARD);

    String actual = writer.toString();
    assertTrue(actual.contains(";define(\"dojo/i18n!ictest/nls/bar\", {"));

  }

  @Test
  public void testRequireDojoMessageBundleAMD() throws Exception
  {

  }

  @Test
  public void testRequireDojoI18nAMD() throws Exception
  {

  }
}
