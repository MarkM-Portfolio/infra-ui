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

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.Test;

import com.google.common.base.Function;

@SuppressWarnings("nls")
public class BrowseGroupsTest extends AbstractUITest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Browse Groups"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testValidateWidget()
  {
    WebElement widget = getWidget("bg1");

    // Verify there's a text field
    WebElement textField = widget.findElement(By.cssSelector("input[type='text']"));
    assertNotNull(textField);

    // Verify there's a lens button
    WebElement searchButton = widget.findElement(By.cssSelector("input[type='image']"));
    assertNotNull(searchButton);
    assertTrue(searchButton.getAttribute("class").contains("lotusSearchButton"));

    // Verify there's a label for accessibility
    WebElement searchButtonA11y = widget.findElement(By.cssSelector("a.lotusAltText"));
    assertNotNull(searchButtonA11y);
    // We can't get text from a hidden element
    // assertEquals("Find Groups", searchButtonA11y.getText());

    // Verify there's a list box
    WebElement groupList = getGroupList(widget, "bg1");
    WebElement list = groupList.findElement(By.tagName("ul"));
    assertNotNull(list);
    assertEquals("listbox", list.getAttribute("role"));
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testFindGroupsWithResults()
  {
    WebElement widget = getWidget("bg1");
    // Type some text in the text field
    WebElement textField = widget.findElement(By.cssSelector("input[type='text']"));
    textField.sendKeys("abc");
    // Click the search button
    WebElement searchButton = widget.findElement(By.cssSelector("input[type='image']"));
    searchButton.click();
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testFindGroupsNoResults()
  {
    WebElement widget = getWidget("bg2");
    // Type some text in the text field
    WebElement textField = widget.findElement(By.cssSelector("input[type='text']"));
    textField.sendKeys("abc");
    // Click the search button
    WebElement searchButton = widget.findElement(By.cssSelector("input[type='image']"));
    searchButton.click();
  }

  private WebElement getGroupList(WebElement widget, String id)
  {
    WebElement groupList = widget.findElement(By.id(id + "_groupList"));
    assertNotNull(groupList);
    return groupList;
  }

  private WebElement getWidget(final String id)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    // Validate list of people
    WebElement widget = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.id(id));
      }
    });
    assertNotNull(widget);
    assertVisible(widget);
    return widget;
  }
}
