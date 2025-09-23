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
public class LikeTest extends AbstractUITest
{

  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Like widget"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testAnonymous() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_0", true, false, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testAnonymousNoPopup() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_1", true, true, false);
  }

  /**
   * Read only is the same as anonymous
   * 
   * @throws Exception
   */
  @Test(groups = { "eclipse", "amd" })
  public void testReadOnly() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_3", true, false, false);
  }

  /**
   * Read only, no popup is the same as anonymous, no popup
   * 
   * @throws Exception
   */
  @Test(groups = { "eclipse", "amd" })
  public void testReadOnlyNoPopup() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_4", true, true, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testReadOnlyLiked() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_5", true, false, true);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEditable() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_6", false, false, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEditableNoPopup() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_7", false, true, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEditableLiked() throws Exception
  {
    validateLikeWidget("com_ibm_oneui_controls_Like_8", false, false, true);
  }

  private WebElement getLikeWidget(final String id)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement widget = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.id(id));
      }
    });
    assertNotNull(widget);
    assertEquals("lotusLike", widget.getAttribute("class"));
    return widget;
  }

  private WebElement validateLikeWidget(String id, boolean anonymous, boolean noPopup, boolean liked)
  {
    // Obtain a reference to the Like widget
    WebElement widget = getLikeWidget(id);
    // Obtain a reference to the like icon
    WebElement icon = widget.findElement(By.tagName("img"));
    assertNotNull(icon);
    assertEquals("lotusIconLike", icon.getAttribute("class"));
    // Verify the link is not clickable
    WebElement count = widget.findElement(By.tagName("a"));
    assertNotNull(count);
    if (noPopup)
    {
      assertNull(count.getAttribute("href"));
      assertEquals("lotusLikeCount lotusDisabled", count.getAttribute("class"));
    }
    else
    {
      assertNotNull(count.getAttribute("href"));
      assertEquals("lotusLikeCount", count.getAttribute("class"));
    }
    if (!anonymous && liked)
    {
      // Verify there is no "You like this" description
      WebElement desc = widget.findElement(By.cssSelector("span.lotusLikeDescription"));
      assertNotNull(desc);
      assertEquals("You like this", desc.getText());
    }
    if (!anonymous)
    {
      // Verify there are no actions
      WebElement actions = widget.findElement(By.cssSelector("a.lotusLikeAction"));
      assertNotNull(actions);
      assertEquals("button", actions.getAttribute("role"));
      assertEquals(liked ? "Unlike" : "Like", actions.getText());
    }
    return widget;
  }
}
