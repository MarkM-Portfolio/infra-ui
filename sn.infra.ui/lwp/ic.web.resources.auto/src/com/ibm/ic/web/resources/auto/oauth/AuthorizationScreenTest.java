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

package com.ibm.ic.web.resources.auto.oauth;

import static org.testng.Assert.*;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.Test;

import com.google.common.base.Function;

@SuppressWarnings("nls")
public class AuthorizationScreenTest extends AbstractOAuthTest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Authorization Screen"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd", "oauth" })
  public void testValidate()
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    // Validate the app name is displayed
    WebElement name = waitForElement(wait, By.id("clientName"));
    assertEquals("ACME App", name.getText());

    // Validate there's a header
    WebElement header = waitForElement(wait, By.id("authTitle"));
    assertEquals("Access Request", header.getText());

    // Validate there's a blurb
    WebElement authBlurb = driver.findElement(By.id("authBlurb"));
    assertTrue(authBlurb.getText().endsWith(
        "is requesting access to your IBM Connections information, including all of your content in Connections."));

    WebElement authBtn = driver.findElement(By.id("authBtn"));
    assertEquals("Grant Access", authBtn.getAttribute("value"));

    WebElement denyBtn = driver.findElement(By.id("denyBtn"));
    assertEquals("Deny Access", denyBtn.getAttribute("value"));
  }

  @Test(groups = { "eclipse", "amd", "oauth", "functional" })
  public void testAuthorize()
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(TimeoutException.class);

    WebElement authBtn = waitForElement(wait, By.id("authBtn"));
    authBtn.click();

    WebElement message = getMessage();
    assertEquals(message.getAttribute("class"), "lotusMessage2 lotusSuccess");

    Wait<WebDriver> waitForAlert = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.SECONDS).ignoring(NoAlertPresentException.class);

    verifyAlert(waitForAlert, "Authorized");
  }

  @Test(groups = { "eclipse", "amd", "oauth", "functional" })
  public void testDeny()
  {
    Wait<WebDriver> waitForBtn = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement denyBtn = waitForElement(waitForBtn, By.id("denyBtn"));
    denyBtn.click();

    Wait<WebDriver> waitForHeader = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    // Validate the header changed
    waitForHeader.until(new Function<WebDriver, Boolean>()
    {
      public Boolean apply(WebDriver driver)
      {
        WebElement el = driver.findElement(By.id("authTitle"));
        return "Access Denied".equals(el.getText());
      }
    });

    // Validate there's a blurb
    WebElement authBlurb = driver.findElement(By.id("authBlurb"));
    assertTrue(authBlurb.getText().startsWith("You've denied"));
    assertTrue(authBlurb.getText().endsWith("access to interact with your IBM Connections account."));

  }

  private WebElement getMessage()
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement message = waitForElement(wait, By.cssSelector("div.lotusMessage2"));

    assertNotNull(message);
    return message;
  }
}
