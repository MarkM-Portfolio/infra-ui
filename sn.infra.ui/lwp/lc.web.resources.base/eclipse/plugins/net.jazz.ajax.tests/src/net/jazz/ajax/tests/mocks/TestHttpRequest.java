/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.tests.mocks;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpRequest;
import org.apache.http.ParseException;
import org.apache.http.ProtocolVersion;
import org.apache.http.RequestLine;
import org.apache.http.params.HttpParams;

public class TestHttpRequest implements HttpRequest
{
  private Map<String, List<String>> headers = new HashMap<String, List<String>>();

  public void addHeader(Header arg0)
  {
    // TODO Auto-generated method stub

  }

  public void addHeader(String arg0, String arg1)
  {
    // TODO Auto-generated method stub

  }

  public boolean containsHeader(String arg0)
  {
    // TODO Auto-generated method stub
    return false;
  }

  public Header[] getAllHeaders()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Header getFirstHeader(String name)
  {
    List l = findHeaders(name);
    if (l != null)
    {
      return new TestHeader(name, (String) l.get(0));
    }
    return null;
  }

  public Header[] getHeaders(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public Header getLastHeader(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public HttpParams getParams()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public ProtocolVersion getProtocolVersion()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public HeaderIterator headerIterator()
  {
    // TODO Auto-generated method stub
    return null;
  }

  public HeaderIterator headerIterator(String arg0)
  {
    // TODO Auto-generated method stub
    return null;
  }

  public void removeHeader(Header arg0)
  {
    // TODO Auto-generated method stub

  }

  public void removeHeaders(String arg0)
  {
    // TODO Auto-generated method stub

  }

  private List findHeaders(String name)
  {
    List ret = headers.get(name);
    if (ret != null)
      return ret;
    return null;
  }

  public void setHeader(Header arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setHeader(String name, String value)
  {
    // TODO Auto-generated method stub
    List l = findHeaders(name);
    if (l != null)
      ((ArrayList<String>) l).add(value);
    else
      headers.put(name, Collections.singletonList(value));
  }

  public void setHeaders(Header[] arg0)
  {
    // TODO Auto-generated method stub

  }

  public void setParams(HttpParams arg0)
  {
    // TODO Auto-generated method stub

  }

  public RequestLine getRequestLine()
  {
    // TODO Auto-generated method stub
    return null;
  }

  class TestHeader implements Header
  {
    String name;

    String value;

    public TestHeader(String name, String value)
    {
      this.name = name;
      this.value = value;
    }

    public String getValue()
    {
      return value;
    }

    public String getName()
    {
      return name;
    }

    public HeaderElement[] getElements() throws ParseException
    {
      // TODO Auto-generated method stub
      return null;
    }
  }
}
