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

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

import static org.testng.Assert.*;

/**
 * Test case for InsertImageDialogTest widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class InsertImageDialogTest extends AbstractUITest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Insert Image Dialog"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testDialogOpens()
  {
    WebElement link = driver.findElement(By.linkText("Open Dialog"));
    assertNotNull(link);
    link.click();
    WebElement dialog = getDialog();
    WebElement el = dialog.findElement(By.cssSelector("h1.lotusHeading"));
    String title = el.getText();
    assertEquals(title, "Add Image");
  }
}