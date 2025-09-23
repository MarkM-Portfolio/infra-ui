/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.functional;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.junit.Test;
import org.mozilla.javascript.NativeObject;

import com.ibm.sistdase.json.JSONSerializer;

import static org.junit.Assert.*;

import net.jazz.ajax.internal.util.JavaScriptUtil;
import net.jazz.ajax.model.AbstractGeneratedDojoMessageBundle;
import net.jazz.ajax.model.DojoMessageBundle;
import net.jazz.ajax.model.DojoModule;
import net.jazz.ajax.model.Provider;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;
import net.jazz.ajax.model.Resource.Key;
import net.jazz.ajax.servlets.ResourceGraph;
import net.jazz.ajax.servlets.ResourceGraphOperation;
import net.jazz.ajax.tests.AbstractTest;

@SuppressWarnings("nls")
public class MessageBundleProviderTest extends AbstractTest
{
  boolean provided = false;

  private static final Object MESSAGE_BUNDLE_VALUE = "bar";

  public static final String MESSAGE_BUNDLE_KEY = "foo";

  @Test
  public void testGenerateDojoMessageBundle() throws Exception
  {
    /**
     * This test comprises of several parts:
     * <ol>
     * <li>a provider is registered for a resource provider, which generates a message bundle; then,</li>
     * <li>a dojo module that requires the message bundle is registered; finally</li>
     * <li>the output of the resource graph including the dojo module is validated</li>
     * </ol>
     */
    Provider<ResourceProvider> provider = new Provider<ResourceProvider>()
    {
      public ResourceProvider get()
      {
        ResourceProvider p = new ResourceProvider()
        {
          @Override
          public Resource provide(String id)
          {
            provided = true;
            return new MessageBundle(id);
          }
        };
        return p;

      }
    };
    // 2. register the provider with the framework for its resource id
    Resource.registerProvider(provider, new Key(DojoMessageBundle.TYPE, "lconn.nls.generated"));
    // 3. resolve the provider's resource id
    r = new DojoModule(getClass().getResource("/net/jazz/ajax/tests/resources/lconn.generator.js"), "lconn.generator").register();
    // 4. verify the produced JS is correct
    List<Resource> includes = Resource.resolveAll("lconn.generator");
    List<Resource> excludes = Resource.resolveAll("dojo.main");
    ResourceGraphOperation operation = new ResourceGraphOperation(CONTEXT_STANDARD, includes, excludes);

    ResourceGraph graph = operation.execute();

    StringWriter writer = new StringWriter();
    graph.writeJavascript(writer, CONTEXT_STANDARD);

    String[] lines = writer.toString().split("\\n");
    assertEquals("dojo.provide(\"lconn.nls.generated\")._built=true;", lines[0]);
    assertEquals("dojo.provide(\"lconn.nls.generated.en\");", lines[1]);

    NativeObject actual = JavaScriptUtil.eval(toLiteralObject(lines[2], "lconn.nls.generated.en="));
    assertNotNull(actual);

    Map<String, Object> obj = toMap(actual);
    assertNotNull(obj);
    assertEquals(1, obj.keySet().size());
    assertTrue(obj.containsKey(MESSAGE_BUNDLE_KEY));
    assertEquals(MESSAGE_BUNDLE_VALUE, obj.get(MESSAGE_BUNDLE_KEY));

    // 5. verify the resource was provided
    assertTrue(provided);

  }

  private static class MessageBundle extends AbstractGeneratedDojoMessageBundle
  {

    public MessageBundle(String id)
    {
      super("lconn", id, null, Level.NONE);
    }

    @Override
    protected AbstractLocalizedContent createContent(Locale locale)
    {
      return new LocalizedContent(locale);
    }

    @Override
    public boolean hasContentForLocale(Locale locale)
    {
      return Locale.ENGLISH.equals(locale);
    }

    protected class LocalizedContent extends AbstractLocalizedContent
    {

      protected LocalizedContent(Locale locale)
      {
        super(locale);
        // TODO Auto-generated constructor stub
      }

      @Override
      protected boolean internalRefresh()
      {
        // TODO Auto-generated method stub
        return false;
      }

      @Override
      protected void getState(State state)
      {
        // TODO Auto-generated method stub

      }

      @Override
      protected void serialize(Writer writer) throws IOException
      {
        Map<String, Object> output = new HashMap<String, Object>();
        output.put(MESSAGE_BUNDLE_KEY, MESSAGE_BUNDLE_VALUE);
        JSONSerializer.serialize(writer, output);
      }

    }
  }
}
