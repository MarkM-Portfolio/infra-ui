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

package com.ibm.ic.web.resources.auto.ui;

import static org.testng.Assert.*;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.Test;

import com.google.common.base.Function;

/**
 * Test case for Feeds widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings({ "nls" })
public class FeedsTest extends AbstractUITest
{
  static class FeedModel
  {
    public String text;

    public String title;

    public String type;

    public String href;
  }

  static Map<String, List<FeedModel>> fixtures;

  static
  {
    ObjectMapper mapper = new ObjectMapper();

    try
    {
      /**
       * We can't use the File(URI) constructor cause the JSON file is placed in a JAR. This code:
       * 
       * <pre>
       * <code>
       * fixtures = mapper.readValue(new File(FeedsTest.class
       *    .getResource("/com/ibm/ic/web/resources/auto/ui/feeds.conf.json").toURI()),
       *    new TypeReference<Map<String, List<FeedModel>>>()
       * {
       * });
       * </code>
       * </pre>
       * 
       * would yield the error:
       * 
       * <pre>
       * [testng] jar:file:/path/to/ic.web.resources.auto.jar!/com/ibm/ic/web/resources/auto/ui/feeds.conf.json
       * [testng] java.lang.IllegalArgumentException: URI is not hierarchical
       * </pre>
       */
      InputStream is = FeedsTest.class.getResourceAsStream("/com/ibm/ic/web/resources/auto/ui/feeds.conf.json");
      fixtures = mapper.readValue(stringBuilder(is).toString(), new TypeReference<Map<String, List<FeedModel>>>()
      {
      });
    }
    catch (Exception e)
    {
      System.out.println(e);
    }
  }

  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Feeds"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testSingle() throws Exception
  {
    int i = 0;
    for (FeedModel item : fixtures.get("single"))
    {
      validate(item, i++);
    }
  }

  @Test(groups = { "eclipse", "amd" })
  public void testMultiple() throws Exception
  {
    int i = 0;
    for (FeedModel item : fixtures.get("multiple"))
    {
      validate(item, i++);
    }
  }

  private void validate(FeedModel item, int i)
  {
    WebElement link = getFeedLink(item.text);
    assertNotNull(link);
    if (i == 0)
    {
      assertTrue(link.getAttribute("class").contains("lotusFeed"));
    }

    link = getLinkElement(item.href);
    assertNotNull(link);
    assertEquals(item.title, link.getAttribute("title"));
    assertEquals(item.type, link.getAttribute("type"));
  }

  private WebElement getFeedLink(final String label)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement link = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        List<WebElement> links = driver.findElements(By.cssSelector("div.lotusFeeds a.lotusAction"));
        for (WebElement link : links)
          if (label.equals(link.getText()))
            return link;
        throw new NoSuchElementException(label);
      }
    });

    assertNotNull(link);
    return link;
  }

  private WebElement getLinkElement(final String href)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement link = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.cssSelector("link[rel=alternate][href='" + href + "']"));
      }
    });

    assertNotNull(link);
    return link;
  }

  private static StringBuilder stringBuilder(InputStream input)
  {
    try
    {
      Reader reader;
      try
      {
        reader = new InputStreamReader(input, "utf-8");
      }
      catch (UnsupportedEncodingException e)
      {
        throw new RuntimeException(e);
      }
      StringBuilder result = new StringBuilder();
      char buffer[] = new char[4096];
      int length;
      try
      {
        while ((length = reader.read(buffer)) > 0)
          result.append(buffer, 0, length);
        reader.close();
        return result;
      }
      catch (Exception e)
      {
        throw new RuntimeException(e);
      }
    }
    finally
    {
      try
      {
        input.close();
      }
      catch (Exception e)
      {
      }
    }
  }
}
