/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.web.resources.test.model;

import static org.junit.Assert.*;

import java.io.StringWriter;
import java.text.DateFormat;
import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.ibm.ic.core.web.resources.map.ConfigurationMapResource;
import com.ibm.sistdase.json.JSONSerializer;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.tests.AbstractTest;

import org.junit.Test;

@SuppressWarnings("nls")
public class ConfigurationMapResourceTest extends AbstractTest
{
  @Test
  public final void testConstruct()
  {
    r = new ConfigurationMapResource("ic.test.map")
    {
      @Override
      protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
      {
        // TODO Auto-generated method stub
        return null;
      }
    };

    assertNotNull(r);
  }

  @Test
  public final void testResolve()
  {
    r = new ConfigurationMapResource("ic.test.map")
    {
      @Override
      protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
      {
        // TODO Auto-generated method stub
        return null;
      }
    }.register();

    s = Resource.resolve("ic.test.map");

    assertEquals(r, s);
  }

  @Test
  public final void testSerialize() throws Exception
  {
    StringWriter sb = new StringWriter();
    Map<String, Object> config = new HashMap<String, Object>();
    // Integer
    config.put("Integer", 1);
    // Double
    config.put("Double", 2.0);
    // String
    config.put("String", "value");
    // List<String>
    config.put("List<String>", Arrays.asList(new String[] { "value1", "value2" }));
    JSONSerializer.serialize(sb, config, true);

    String expected = readFile(getClass().getResource("/com/ibm/ic/web/resources/test/resources/configurationmap.txt"));
    assertEquals(expected, sb.toString());
  }

  @Test
  public final void testCreateConfigurationMap() throws Exception
  {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("a", new Integer(1));
    map.put("b", "c");
    r = new TestConfigurationMapResource("ic.test.map", map).register();

    long now;
    synchronized (this)
    {
      r.internalRefresh(CONTEXT_STANDARD);
      now = System.currentTimeMillis();
    }
    String dateStr = DateFormat.getInstance().format(new Date(now));
    String template = readFile(getClass().getResource("/com/ibm/ic/web/resources/test/resources/ic.test.map.compressed.txt"));

    String expected;
    StringBuffer buffer = new StringBuffer();

    expected = MessageFormat.format(template, dateStr, r.getClass().getName());
    r.write(buffer, CONTEXT_NO_MINIFY);
    assertEquals(expected, buffer.toString());

    buffer.delete(0, buffer.length());

    expected = readFile(getClass().getResource("/com/ibm/ic/web/resources/test/resources/ic.test.map.minified.js"));
    r.write(buffer, CONTEXT_STANDARD);
    assertEquals(expected, buffer.toString());
  }

  class TestConfigurationMapResource extends ConfigurationMapResource
  {
    private Map<String, Object> map;

    public TestConfigurationMapResource(String id, Map<String, Object> map)
    {
      super(id);
      this.map = map;
    }

    @Override
    protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
    {
      return map;
    }

  }
}
