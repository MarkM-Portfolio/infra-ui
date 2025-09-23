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

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import static org.testng.Assert.*;

import org.testng.annotations.Test;

@SuppressWarnings("nls")
public class WidgetsTest extends AbstractOAuthTest
{
  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Revoke Instructions"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd", "oauth" })
  public void testRevokeInstructions()
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement link = waitForElement(wait, By.cssSelector("#revoke_instructions a"));

    assertNotNull(link);
    assertEquals("Application Access", link.getText());
    assertEquals("Application Access", link.getAttribute("title"));
    assertEquals("_blank", link.getAttribute("target"));

    WebElement widget = driver.findElement(By.id("revoke_instructions"));
    assertNotNull(widget);
    assertEquals(
        "You can revoke access at any time through Connections Settings > Application Access. Connections may periodically ask you to re-authorize.",
        widget.getText());
  }

  @Test(groups = { "eclipse", "amd", "oauth" })
  public void testApplicationList()
  {
    WebElement list = driver.findElement(By.id("list"));
    assertNotNull(list);

    String[] APPS = { "SBTK Gadget", "iNotes Gadget", "IBM Connections EE Gadget", "Sales Connect Gadget" };
    List<WebElement> rows = list.findElements(By.tagName("tr"));
    assertNotNull(rows);
    for (int i = 0; i < rows.size(); i++)
    {
      WebElement row = rows.get(i);
      if (i == 0)
        assertTrue(row.getAttribute("class").contains("lotusFirst"));
      if (i % 2 == 1)
        assertTrue(row.getAttribute("class").contains("lotusAltRow"));
      if (i == rows.size() - 1)
        assertTrue(row.getAttribute("class").contains("lotusLast"));
      validateRow(row, APPS[i]);
    }
  }

  @Test(groups = { "eclipse", "amd", "oauth", "functional" })
  public void testRevokeTokenLink()
  {
    validateRevokeTokenLink("div#revoke_action a");
  }

  public void testRevokeTokenDialog()
  {
    validateRevokeTokenLink("div#revoke_action a").click();

    validateRevokeTokenDialog(getDialog());
  }

  @Test(groups = { "eclipse", "amd", "oauth", "functional" })
  public void testRevokeTokenOK()
  {
    validateRevokeTokenLink("div#revoke_action a").click();

    WebElement dialog = getDialog();
    WebElement okButton = dialog.findElement(By.cssSelector("input.lotusFormButton.submit"));
    assertNotNull(okButton);
    okButton.click();

    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "oauth", "functional" })
  public void testRevokeTokenCancel()
  {
    validateRevokeTokenLink("div#revoke_action a").click();

    WebElement dialog = getDialog();
    WebElement cancelButton = dialog.findElement(By.cssSelector("input.lotusFormButton.cancel"));
    assertNotNull(cancelButton);
    cancelButton.click();

    assertHidden(dialog);
  }

  @Test(groups = { "eclipse", "amd", "oauth", "functional" })
  public void testRevokeTokenClose()
  {
    WebElement revokeLink = validateRevokeTokenLink("div#revoke_action a");
    revokeLink.click();

    WebElement dialog = getDialog();
    WebElement closeButton = dialog.findElement(By.cssSelector("a.lotusDialogClose"));
    assertNotNull(closeButton);
    closeButton.click();

    assertHidden(dialog);
  }

  private WebElement validateRevokeTokenLink(String selector)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement revokeLink = waitForElement(wait, By.cssSelector(selector));

    assertNotNull(revokeLink);
    return revokeLink;
  }

  private void validateRevokeTokenDialog(WebElement dialog)
  {
    WebElement header = dialog.findElement(By.cssSelector("div.lotusDialogHeader h1"));
    assertNotNull(header);
    assertEquals("Revoke Access", header.getText());

    WebElement closeButton = dialog.findElement(By.cssSelector("a.lotusDialogClose"));
    assertNotNull(closeButton);

    WebElement content = dialog.findElement(By.cssSelector("div.lotusDialogContent"));
    assertNotNull(content);
    assertEquals("Revoke this application's access to your IBM Connections information?", content.getText());

    WebElement footer = dialog.findElement(By.cssSelector("div.lotusDialogFooter"));
    assertNotNull(footer);

    List<WebElement> buttons = footer.findElements(By.cssSelector("input.lotusFormButton"));
    assertNotNull(buttons);
    assertEquals(2, buttons.size());

    String[] LABELS = { "OK", "Cancel" };
    for (int i = 0; i < buttons.size(); i++)
      assertEquals(LABELS[i], buttons.get(i).getAttribute("value"));
  }

  private void validateRow(WebElement row, String appName)
  {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    assertNotNull(cells);
    assertEquals(4, cells.size());
    assertEquals(appName, cells.get(0).getText());

    WebElement actionLink = cells.get(3).findElement(By.tagName("a"));
    assertNotNull(actionLink);
    assertEquals("Revoke", actionLink.getText());
    String title = "Revoke access to application " + appName;
    assertEquals(title, actionLink.getAttribute("title"));
    assertEquals(title, actionLink.getAttribute("aria-label"));

    actionLink.click();

    validateRevokeTokenDialog(getDialog());
  }
}
