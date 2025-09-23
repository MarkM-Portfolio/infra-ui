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
public class ButtonFactoryTest extends AbstractUITest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Button Factory"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testButton() throws Exception
  {
    // Get a reference to the plain button
    WebElement button = getButton("div#b1 button");
    assertEquals("Button", button.getText());
  }

  @Test(groups = { "eclipse", "amd" })
  public void testButtonDisabled() throws Exception
  {
    // Get a reference to the plain button
    WebElement button = getButton("div#b2 button");
    assertTrue(button.getAttribute("class").contains("lotusBtnDisabled"));
    assertEquals("Button", button.getText());
  }

  @Test(groups = { "eclipse", "amd" })
  public void testButtonSpecial() throws Exception
  {
    // Get a reference to the plain button
    WebElement button = getButton("div#b3 button");
    assertTrue(button.getAttribute("class").contains("lotusBtnSpecial"));
    assertEquals("Special Button", button.getText());
  }

  @Test(groups = { "eclipse", "amd" })
  public void testMenuButton() throws Exception
  {
    // Get a reference to the plain button
    WebElement button = getButton("div#b4 button");
    // Note there's a space after the label
    assertEquals("Menu Button ", button.getText());

    validateDropDownArrow(button);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testMenuButtonDisabled() throws Exception
  {
    // Get a reference to the plain button
    WebElement button = getButton("div#b5 button");
    assertTrue(button.getAttribute("class").contains("lotusBtnDisabled"));
    // Note there's a space after the label
    assertEquals("Menu Button ", button.getText());

    validateDropDownArrow(button);
  }

  private WebElement getButton(final String selector)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement button = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.cssSelector(selector));
      }
    });
    assertNotNull(button);
    assertTrue(button.getAttribute("class").contains("lotusBtn"));
    return button;
  }

  private void validateDropDownArrow(WebElement button)
  {
    // Validate dropdown arrow
    WebElement arrow = button.findElement(By.tagName("img"));
    assertTrue(arrow.getAttribute("class").contains("lotusDropDownSprite"));
    assertTrue(arrow.getAttribute("class").contains("lotusArrow"));

    // Accessibility
    WebElement a11y = button.findElement(By.tagName("span"));
    assertEquals("lotusAltText", a11y.getAttribute("class"));
    // TODO: HC mode
    // Invisible elements can't be read
    // assertEquals("&#x25bc;", a11y.getText());
  }
}
