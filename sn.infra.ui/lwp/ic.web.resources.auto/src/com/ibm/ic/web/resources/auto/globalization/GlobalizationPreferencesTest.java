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

package com.ibm.ic.web.resources.auto.globalization;

import static org.testng.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.google.common.base.Function;
import com.ibm.ic.web.resources.auto.AbstractBaseTest;

@SuppressWarnings("nls")
public class GlobalizationPreferencesTest extends AbstractBaseTest
{
  boolean legacy;

  public GlobalizationPreferencesTest()
  {
    this(false);
  }

  public GlobalizationPreferencesTest(boolean legacy)
  {
    this.legacy = legacy;
  }

  public void navigateToGlobalizationIndex()
  {
    WebElement link = driver.findElement(By.linkText("Globalization support"));
    assertNotNull(link);
    link.click();
  }

  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Globalization Preferences"));
    assertNotNull(link);
    link.click();
  }

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    navigateToIndex();
    navigateToGlobalizationIndex();
    navigateToTestPage();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testWithoutLanguage()
  {
    // Get a reference to the widget
    WebElement widget = getPreferencesForm("without_language");
    // Validate the widget
    validateWidget(widget, true, false, false, -1, true);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testWithLanguage()
  {
    // Get a reference to the widget
    WebElement widget = getPreferencesForm("with_language");
    // Validate the widget
    validateWidget(widget, true, true, false, -1);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testWithActions()
  {
    // Get a reference to the widget
    WebElement widget = getPreferencesForm("with_actions");
    // Validate the widget
    validateWidget(widget, true, true, true, 2);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testConditionalCalendar()
  {
    // Get a reference to the widget
    WebElement widget = getPreferencesForm("conditional_calendar");
    // Validate the widget
    validateWidget(widget, false, false, false, -1, false);
  }

  private void validateWidget(WebElement widget, boolean bidiEnabled, boolean languageEnabled, boolean hasActions, int actionsCount)
  {
    validateWidget(widget, bidiEnabled, languageEnabled, hasActions, actionsCount, true);
  }

  private void validateWidget(WebElement widget, boolean bidiEnabled, boolean languageEnabled, boolean hasActions, int actionsCount,
      boolean calendarIndependent)
  {
    WebElement languageField = widget.findElement(By.cssSelector("div.lotusFormField[" + attachPointAttr() + "='languageField']"));
    assertNotNull(languageField);
    if (languageEnabled)
    {
      // Verify there's a language field and label
      assertFalse(languageField.getAttribute("class").contains("lotusHidden"));
    }
    else
    {
      // Verify there's no language field and label
      assertTrue(languageField.getAttribute("class").contains("lotusHidden"));
    }

    // Verify there's a calendar field
    WebElement calendarField = widget.findElement(By.cssSelector("select[" + attachPointAttr() + "='calendarNode']"));
    assertNotNull(calendarField);
    if (calendarIndependent)
    {
      // Verify it's enabled by default
      assertNull(calendarField.getAttribute("disabled"));
    }
    else
    {
      // Verify it's not enabled by default
      assertNotNull(calendarField.getAttribute("disabled"));
    }

    // Verify there's a bidi checkbox
    WebElement bidiField = widget.findElement(By.cssSelector("input[" + attachPointAttr() + "='bidiNode']"));
    assertNotNull(bidiField);
    if (bidiEnabled)
    {
      // Verify it's checked by default
      assertNotNull(bidiField.getAttribute("checked"));
    }
    else
    {
      // Verify it's not checked by default
      assertNull(bidiField.getAttribute("checked"));
    }

    // Verify there's a text direction field
    WebElement textDirField = widget.findElement(By.cssSelector("select[" + attachPointAttr() + "='directionNode']"));
    assertNotNull(textDirField);
    if (bidiEnabled)
    {
      // Verify it's not disabled by default
      assertNull(textDirField.getAttribute("disabled"));
    }
    else
    {
      // Verify it's disabled by default
      assertNotNull(textDirField.getAttribute("disabled"));
    }

    // Verify there's a cancel button, disabled by default
    WebElement cancelBtn = widget.findElement(By.cssSelector("input.lotusBtn[" + attachPointAttr() + "='cancelButton']"));
    assertTrue(cancelBtn.getAttribute("class").contains("lotusBtnDisabled"));

    // Obtain a reference to the footer
    WebElement footerNode = widget.findElement(By.cssSelector("div.lotusFormFooter"));
    assertNotNull(footerNode);
    // Find actions
    List<WebElement> actions = footerNode.findElements(By.tagName("input"));
    if (hasActions)
    {
      // Validate the action buttons are all available
      assertEquals(actionsCount + 1, actions.size());
    }
    // Verify the cancel button is there
    assertTrue(actions.contains(cancelBtn));
  }

  private WebElement getPreferencesForm(final String id)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement form = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.cssSelector("form[widgetid='" + id + "']"));
      }
    });
    assertNotNull(form);
    return form;
  }

  private String attachPointAttr()
  {
    return legacy ? "dojoAttachPoint" : "data-dojo-attach-point";
  }
}
