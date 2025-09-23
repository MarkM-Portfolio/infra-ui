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

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.Test;

import com.google.common.base.Function;

@SuppressWarnings("nls")
public class TagCloudTest extends AbstractUITest
{
  private static final List<String> TAGS = Arrays.asList("social-business", "ibm-connections", "smarter-workforce", "watson", "bigdata",
      "social-analytics", "cloud", "softlayer");

  private static final List<String> DUPLICATE_TAGS = Arrays.asList("smarter-workforce", "cloud");

  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Tag Cloud"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testCloudDeclarative() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc1");
    // Validate there are tags
    assertHasCloud(tc, TAGS);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testListDeclarative() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc1");
    // Click the List button
    clickListButton(tc);
    // Validate there are tags
    assertHasList(tc, TAGS);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testFindTagDeclarative() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc1");
  }

  @Test(groups = { "eclipse", "amd" })
  public void testCloudProgrammatic() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc2");
    // Validate there are tags
    assertHasCloud(tc, TAGS);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testListProgrammatic() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc2");
    // Click the List button
    clickListButton(tc);
    // Validate there are tags
    assertHasList(tc, TAGS);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testFindTagProgrammatic() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc2");
  }

  @Test(groups = { "eclipse", "amd" })
  public void testCloudWithDuplicatesProgrammatic() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc3");
    // Validate there are tags
    assertHasCloudWithDuplicates(tc, TAGS, DUPLICATE_TAGS);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testListWithDuplicatesProgrammatic() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc3");
    // Click the List button
    clickListButton(tc);
    // Validate there are tags
    assertHasListWithDuplicates(tc, TAGS, DUPLICATE_TAGS);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEmptyProgrammatic() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc4");
    // Validate message
    assertHasMessage(tc, "No tags yet");
  }

  @Test(groups = { "eclipse", "amd" })
  public void testErrorProgrammatic() throws Exception
  {
    // Get a reference to the tag cloud
    WebElement tc = getTagCloud("tc5");
    // Validate message
    assertHasMessage(tc, "There was an error");
  }

  private WebElement getTagCloud(final String id)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement tc = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.cssSelector("div[widgetid='" + id + "']"));
      }
    });

    assertNotNull(tc);
    return tc;
  }

  private void assertHasCloud(final WebElement tc, final List<String> tags)
  {
    assertHasCloudWithDuplicates(tc, tags, null);
  }

  private void assertHasCloudWithDuplicates(final WebElement tc, final List<String> tags, final List<String> duplicates)
  {
    assertHasCloudOrListWithDuplicates(tc, tags, duplicates, false);
  }

  private void assertHasList(final WebElement tc, final List<String> tags)
  {
    assertHasListWithDuplicates(tc, tags, null);
  }

  private void assertHasListWithDuplicates(final WebElement tc, final List<String> tags, final List<String> duplicates)
  {
    assertHasCloudOrListWithDuplicates(tc, tags, duplicates, true);
  }

  private void assertHasCloudOrListWithDuplicates(final WebElement tc, final List<String> tags, final List<String> duplicates,
      final boolean isList)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);
    wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        WebElement list = tc.findElement(By.cssSelector(isList ? "ul[role='listbox'].lotusList" : "ul[role='listbox']"));
        assertNotNull(list);
        List<WebElement> options = list.findElements(By.cssSelector("li a"));
        for (WebElement option : options)
        {
          assertNotNull(option);
          assertTrue(tags.contains(option.getText()));
        }
        return list;
      }
    });
  }

  private void assertHasMessage(final WebElement tc, final String message)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);
    wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        WebElement emptyElement = tc.findElement(By.cssSelector("div.lconnEmpty:not(.lotusHidden)"));
        assertNotNull(emptyElement);
        assertEquals(emptyElement.getText(), message);
        return emptyElement;
      }
    });
  }

  private void clickListButton(final WebElement tc)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class).ignoring(ElementNotVisibleException.class);
    wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        WebElement el = tc.findElement(By.linkText("List"));
        el.click();
        return el;
      }
    });
  }

}
