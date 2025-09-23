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

package com.ibm.ic.web.resources.auto.aria;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import static org.testng.Assert.*;
import org.testng.annotations.Test;

@SuppressWarnings("nls")
public class TabPanelTest extends AbstractARIATest
{

  @Test(groups = { "eclipse", "amd", "aria", "functional" })
  public void testFocusIn()
  {
    WebElement link = driver.findElement(By.cssSelector("a#a1"));
    link.sendKeys(Keys.TAB);
    WebElement button = driver.findElement(By.cssSelector("div#tp1 button"));
    // assertTrue(button2 has focus?)
  }

  @Test(groups = { "eclipse", "amd", "aria", "functional" })
  public void testFocusOut()
  {
    WebElement button = driver.findElement(By.cssSelector("div#tp1 button"));
    button.sendKeys(Keys.TAB);
    WebElement button2 = driver.findElement(By.cssSelector("div#tp2 button"));
    // assertTrue(button2 has focus?)
  }

  @Test(groups = { "eclipse", "amd", "aria", "functional" })
  public void testArrowKeyRightCyclical()
  {
    List<WebElement> buttons = driver.findElements(By.cssSelector("div#tp1 button"));
    buttons.get(0).sendKeys(Keys.RIGHT);
    // assertTrue(buttons.get(1) has focus?)
    buttons.get(1).sendKeys(Keys.RIGHT);
    // assertTrue(buttons.get(2) has focus?)
    buttons.get(2).sendKeys(Keys.RIGHT);
    // assertTrue(buttons.get(0) has focus?)
  }

  @Test(groups = { "eclipse", "amd", "aria", "functional" })
  public void testArrowKeyLeftCyclical()
  {
    List<WebElement> buttons = driver.findElements(By.cssSelector("div#tp1 button"));
    buttons.get(0).sendKeys(Keys.LEFT);
    // assertTrue(buttons.get(2) has focus?)
    buttons.get(2).sendKeys(Keys.LEFT);
    // assertTrue(buttons.get(1) has focus?)
    buttons.get(1).sendKeys(Keys.LEFT);
    // assertTrue(buttons.get(0) has focus?)
  }

  @Test(groups = { "eclipse", "amd", "aria", "functional" })
  public void testArrowKeyRightAcyclical()
  {
    List<WebElement> buttons = driver.findElements(By.cssSelector("div#tp2 button"));
    buttons.get(0).sendKeys(Keys.RIGHT);
    // assertTrue(buttons.get(1) has focus?)
    buttons.get(1).sendKeys(Keys.RIGHT);
    // assertTrue(buttons.get(2) has focus?)
    buttons.get(2).sendKeys(Keys.RIGHT);
    // assertTrue(buttons.get(2) has focus?)
  }

  @Test(groups = { "eclipse", "amd", "aria", "functional" })
  public void testArrowKeyLeftAcyclical()
  {
    List<WebElement> buttons = driver.findElements(By.cssSelector("div#tp2 button"));
    buttons.get(2).sendKeys(Keys.LEFT);
    // assertTrue(buttons.get(1) has focus?)
    buttons.get(1).sendKeys(Keys.LEFT);
    // assertTrue(buttons.get(0) has focus?)
    buttons.get(0).sendKeys(Keys.LEFT);
    // assertTrue(buttons.get(0) has focus?)
  }

  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Tab Panel"));
    assertNotNull(link);
    link.click();
  }
}
