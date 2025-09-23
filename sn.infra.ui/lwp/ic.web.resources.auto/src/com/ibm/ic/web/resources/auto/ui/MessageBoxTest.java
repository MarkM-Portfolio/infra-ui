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

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import static org.testng.Assert.*;

import org.testng.annotations.Test;

import com.google.common.base.Function;

/**
 * Test case for MessageBox widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class MessageBoxTest extends AbstractUITest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Message Box"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testErrorMessage() throws Exception
  {
    // Get a reference to the message box
    WebElement mb = getMessageBox("com_ibm_oneui_controls_MessageBox_0");
    // Verify the icon has the correct class
    verifyIconHasClass(mb, "lotusIconMsgError");
  }

  @Test(groups = { "eclipse", "amd" })
  public void testWarningMessage() throws Exception
  {
    // Get a reference to the message box
    WebElement mb = getMessageBox("com_ibm_oneui_controls_MessageBox_1");
    // Verify the icon has the correct class
    verifyIconHasClass(mb, "lotusIconMsgWarning");
  }

  @Test(groups = { "eclipse", "amd" })
  public void testInfoMessage() throws Exception
  {
    // Get a reference to the message box
    WebElement mb = getMessageBox("com_ibm_oneui_controls_MessageBox_2");
    // Verify the icon has the correct class
    verifyIconHasClass(mb, "lotusIconMsgInfo");
  }

  @Test(groups = { "eclipse", "amd" })
  public void testSuccessMessage() throws Exception
  {
    // Get a reference to the message box
    WebElement mb = getMessageBox("com_ibm_oneui_controls_MessageBox_3");
    // Verify the icon has the correct class
    verifyIconHasClass(mb, "lotusIconMsgSuccess");
  }

  @Test(groups = { "eclipse", "amd" })
  public void testSharedExternallyMessage() throws Exception
  {
    // Get a reference to the message box
    WebElement mb = getMessageBox("com_ibm_oneui_controls_MessageBox_4");
    // Verify the icon has the correct class
    verifyIconHasClass(mb, "lconnIconMsgSharedExternal");
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testCloseMessage() throws Exception
  {
    // Get a reference to the message box
    WebElement mb = getMessageBox("com_ibm_oneui_controls_MessageBox_5");
    // Close the message box
    clickCloseButton(mb);
    boolean found = true;
    try
    {
      // Get a reference to the message box again
      mb = getMessageBox("com_ibm_oneui_controls_MessageBox_5");
      // Verify the message box was destroyed
    }
    catch (Throwable t)
    {
      found = false;
    }
    assertFalse(found);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testShowMoreMessage() throws Exception
  {
    // Get a reference to the message box
    WebElement mb = getMessageBox("com_ibm_oneui_controls_MessageBox_6");
    // Click the show more link
    clickShowMoreLink(mb);
    // Verify more info is displayed
    // TODO:
  }

  private void verifyIconHasClass(WebElement mb, String clazz)
  {
    WebElement img = mb.findElement(By.cssSelector("img.lotusIcon"));
    assertTrue(img.getAttribute("class").contains(clazz));
  }

  private WebElement getMessageBox(final String id)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement mb = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.id(id));
      }
    });

    assertNotNull(mb);
    return mb;
  }

  private void clickShowMoreLink(final WebElement parent)
  {
    WebElement button = parent.findElement(By.linkText("Show More"));
    assertNotNull(button);
    button.click();
  }

  private void clickCloseButton(final WebElement parent)
  {
    WebElement button = parent.findElement(By.cssSelector("a.lotusDelete"));
    assertNotNull(button);
    button.click();
  }
}