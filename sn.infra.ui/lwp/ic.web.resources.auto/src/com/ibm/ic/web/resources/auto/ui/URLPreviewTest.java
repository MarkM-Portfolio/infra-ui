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

/**
 * Test case for URLPreview widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class URLPreviewTest extends AbstractUITest
{

  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("URL Preview"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEditablePlainText() throws Exception
  {
    validateWidget("pw1", true, true, -1, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEditableOneThumbnail() throws Exception
  {
    validateWidget("pw2", true, false, 1, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEditableTwoThumbnails() throws Exception
  {
    validateWidget("pw3", true, false, 2, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testEditableVideoPlayback() throws Exception
  {
    validateWidget("pw4", true, false, 1, true);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testReadOnlyPlainText() throws Exception
  {
    validateWidget("pw5", false, true, -1, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testReadOnlyThumbnail() throws Exception
  {
    validateWidget("pw6", false, false, 1, false);
  }

  @Test(groups = { "eclipse", "amd" })
  public void testReadOnlyVideoPlayback() throws Exception
  {
    validateWidget("pw7", false, false, 1, true);
  }

  private WebElement validateWidget(String id, boolean editable, boolean textOnly, int thumbnailsCount, boolean playbackEnabled)
  {
    // Obtain a reference to the widget
    WebElement widget = getWidget(id);
    if (editable)
    {
      // Obtain a reference to the close button
      WebElement closeBtn = widget.findElement(By.cssSelector("a.lconnPreviewClose"));
      // Verify it exists
      assertNotNull(closeBtn);
      // Verify it's visible
      assertFalse(closeBtn.getAttribute("class").contains("lconnPreviewHidden"));
    }
    // Obtain a reference to the preview thumbnail
    WebElement preview = widget.findElement(By.cssSelector("div.lconnPreviewLeft"));
    // Verify it exists
    assertNotNull(preview);
    if (textOnly)
    {
      // Verify it's hidden
      assertTrue(preview.getAttribute("class").contains("lconnPreviewHidden"));
    }
    else
    {
      // Verify it's visible
      assertFalse(preview.getAttribute("class").contains("lconnPreviewHidden"));
    }
    // Obtain a reference to the content
    WebElement content = widget.findElement(By.cssSelector("div.lconnPreviewContent"));
    // Verify it exists
    assertNotNull(content);
    // Content must never be hidden
    assertFalse(content.getAttribute("class").contains("lconnPreviewHidden"));
    // Obtain a reference to the footer
    WebElement footer = widget.findElement(By.cssSelector("div.lconnPreviewFooter"));
    // Verify it exists
    assertNotNull(footer);
    // Footer is only visible if there are thumbnails and the widget is in edit mode
    if (editable && !textOnly)
    {
      // Verify it's visible
      assertFalse(footer.getAttribute("class").contains("lconnPreviewHidden"));
    }
    else
    {
      // Verify it's hidden
      assertTrue(footer.getAttribute("class").contains("lconnPreviewHidden"));
    }
    // Obtain a reference to the image chooser
    WebElement chooser = widget.findElement(By.cssSelector("div.lconnPreviewImageChoose"));
    // The image chooser is only hidden when there is only one thumbnail. When there are no thumbnails, or the widget is in read-only mode,
    // the enclosing footer is hidden.
    if (thumbnailsCount == 1)
    {
      // Verify it's hidden
      assertTrue(chooser.getAttribute("class").contains("lconnPreviewHidden"));
    }
    else
    {
      // Verify it's visible
      assertFalse(chooser.getAttribute("class").contains("lconnPreviewHidden"));
    }
    return widget;
  }

  /**
   * Note this method gets the first widget found inside the element with the given id. This is required because some instances are created
   * asynchronously and we can't predict the order of instantiation.
   * 
   * @param id
   * @return
   */
  private WebElement getWidget(final String id)
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement widget = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.cssSelector("#" + id + ">div.lconnPreview"));
      }
    });

    assertNotNull(widget);
    return widget;
  }
}
