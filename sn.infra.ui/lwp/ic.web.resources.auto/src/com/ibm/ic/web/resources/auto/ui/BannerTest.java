/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.web.resources.auto.ui;

import static org.testng.Assert.assertNotNull;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.Test;

import com.google.common.base.Function;

public class BannerTest extends AbstractUITest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Banner"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testValidateWidget()
  {
    WebElement widget = getWidget("banner1");

    assertNotNull(widget.findElement(By.className("lotusBanner")));
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
        return driver.findElement(By.cssSelector("div[widgetid='" + id + "']"));
      }
    });
    assertNotNull(widget);
    assertVisible(widget);
    return widget;
  }
}
