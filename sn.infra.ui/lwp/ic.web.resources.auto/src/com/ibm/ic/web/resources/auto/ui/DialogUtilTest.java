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

package com.ibm.ic.web.resources.auto.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.testng.Assert.*;

import org.testng.annotations.Test;

/**
 * Test case for DialogUtil widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class DialogUtilTest extends AbstractUITest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Dialog utility"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testAlertOK() throws Exception
  {
    // Click the Alert link on the test page
    clickLink("Alert");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the OK button
    clickButton(dialog, "OK");
    // Verify the dialog was hidden
    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testAlertClose() throws Exception
  {
    // Click the Alert link on the test page
    clickLink("Alert");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the close button
    clickCloseButton(dialog);
    // Verify the dialog was hidden
    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testPromptAccept() throws Exception
  {
    // Click the Prompt link on the test page
    clickLink("Prompt");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the Accept button
    clickButton(dialog, "Accept");
    // Verify the dialog was hidden
    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testPromptDeny() throws Exception
  {
    // Click the Prompt link on the test page
    clickLink("Prompt");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the Deny button
    clickButton(dialog, "Deny");
    // Verify the dialog was hidden
    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testPromptClose() throws Exception
  {
    // Click the Prompt link on the test page
    clickLink("Prompt");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the close button
    clickCloseButton(dialog);
    // Verify the dialog was hidden
    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testPopupFormOK() throws Exception
  {
    // Click the Form link on the test page
    clickLink("Form");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the OK button
    clickButton(dialog, "OK");
    // Verify the dialog was hidden
    // Note: the OK button in popup form does nothing
    // assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testPopupFormCancel() throws Exception
  {
    // Click the Form link on the test page
    clickLink("Form");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the Cancel button
    clickButton(dialog, "Cancel");
    // Verify the dialog was hidden
    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testPopupFormClose() throws Exception
  {
    // Click the Form link on the test page
    clickLink("Form");
    // Get a reference to the dialog
    WebElement dialog = getDialog();
    // Click the close button
    clickCloseButton(dialog);
    // Verify the dialog was hidden
    assertHidden(dialog);
  }

  private void clickButton(final WebElement parent, String label)
  {
    WebElement button = parent.findElement(By.cssSelector("input[type=button][value='" + label + "'].lotusFormButton"));
    assertNotNull(button);
    button.click();
  }

  private void clickCloseButton(final WebElement parent)
  {
    WebElement button = parent.findElement(By.cssSelector("a.lotusDialogClose"));
    assertNotNull(button);
    button.click();
  }
}