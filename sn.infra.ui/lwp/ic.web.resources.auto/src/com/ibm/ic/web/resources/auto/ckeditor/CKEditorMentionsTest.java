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

package com.ibm.ic.web.resources.auto.ckeditor;

import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertTrue;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

@SuppressWarnings("nls")
public class CKEditorMentionsTest extends AbstractCKEditorTest
{
  private static WebElement ckeTextArea;

  @Override
  public void navigateToTestPage()
  {
    clickLink("CKEditor Mentions loader");
  }

  @BeforeMethod(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions", "before" })
  private void switchToCKEditor()
  {
    driver.switchTo().defaultContent();
    WebDriverWait wait = new WebDriverWait(driver, 5); // 5 seconds
    wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("cke_frame"));
    ckeTextArea = driver.findElement(By.tagName("body"));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It makes sure that mentions are activated in the basic situations")
  public void testActivationOfMention()
  {
    // Add an '@' at the start
    ckeTextArea.sendKeys("@");
    // - Verify the mentions is activated -
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    // Add an '@' after some plain text and a space
    ckeTextArea.sendKeys("some text before ", "@");
    // - Verify the mentions is activated -
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    // Add plain text and an '@' with no space between
    ckeTextArea.sendKeys("no space before the", "@");
    // - Verify the mentions is NOT activated -
    assertTrue(!isMentionsActive(ckeTextArea));
  }

  //defect 143635
  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It makes sure that a mentions won't be acivated when an email address is typed")
  public void testFalseActivation()
  {
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    ckeTextArea.sendKeys("amy jones1@janet.iris.com");
    assertTrue(!isMentionsActive(ckeTextArea));
  }
  
  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions"},
      description = "It completes a mention and then removes it by using backspace")
  public void deleteWithOneKeyStroke()
  {
    createMention("@am", ckeTextArea);
    assertTrue(isMentionsCompleted(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsCompleted(ckeTextArea));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It makes sure that mentions are still working after completing one")
  public void testActivationAfterCompletion()
  {
    // Test #1: Complete mention + delete it + '@'
    createMention("@am", ckeTextArea);
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);

    // Test #2: Complete mention + ' @' + remove '@'
    createMention("@am", ckeTextArea);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(" @");
    // - Verify the mentions is activated -
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));

    // Test #3: Complete mention + ' text @' + remove '@' + type '@'
    ckeTextArea.sendKeys(" some random text @");
    // - Verify the mentions is activated -
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    ckeTextArea.sendKeys("@");
    assertTrue(!isMentionsActive(ckeTextArea));

    // Test #4: empty editor + type ' @'
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys(Keys.DELETE);
    ckeTextArea.sendKeys(" @");
    assertTrue(isMentionsActive(ckeTextArea));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests that mentions can be activated at the beginning of a new line after pressing Enter")
  public void testActivationNewLine()
  {
    // Test #1
    createMention("@am", ckeTextArea);
    ckeTextArea.sendKeys(" some random text ");
    createMention("@am", ckeTextArea);
    ckeTextArea.sendKeys(" ENDOFLINE");
    ckeTextArea.sendKeys(Keys.ENTER);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys("@");
    // - Verify the mentions is activated -
    assertTrue(isMentionsActive(ckeTextArea));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions"}, description = "It tests that mentions can be activated at the beginning of a new line after pressing Enter")
  public void testActivationBeforeText()
  {
    ckeTextArea.sendKeys(" some random text");
    ckeTextArea.sendKeys(Keys.HOME);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys("@");
    // - Verify the mentions is activated -
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    ckeTextArea.sendKeys(Keys.END);
    ckeTextArea.sendKeys(" ");
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE, Keys.ARROW_LEFT, Keys.ARROW_LEFT, Keys.SPACE, Keys.SPACE, Keys.ARROW_LEFT);
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests that the TA is displayed after 2 characters + it closes when clicking outside the CKEditor + "
      + "user can click back on the editor and resume the same mention")
  public void testDisplayOfTypeahead()
  {
    ckeTextArea.sendKeys("@a");
    assertTrue(!isTypeaheadDisplayed());
    ckeTextArea.sendKeys("m");
    assertTrue(isTypeaheadDisplayed());
    clickOutsideCKE();
    WebElement typeahead = driver.switchTo().defaultContent().findElement(By.className("dijitComboBoxMenuPopup"));
    WebDriverWait wait = new WebDriverWait(driver, 5); // 5 seconds
    // wait for the TA to disappear after clicking outside the CKE area
    wait.until(ExpectedConditions.not(ExpectedConditions.visibilityOf(typeahead)));
    // return the drive to the CKE frame
    switchToCKEditor();
    ckeTextArea.click();
    assertTrue(!isTypeaheadDisplayed());
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys("y");
    assertTrue(isTypeaheadDisplayed());
  }
  
  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests deleting uncompleted")
  public void testDeleteUncompletedMentions()
  {
    //Test deleting a uncompleting mentions before the type ahead
    ckeTextArea.sendKeys("@a");
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    ckeTextArea.sendKeys("Test");
    assertTrue(!mentionsHighlighting());
    
    ckeTextArea.clear();
    ckeTextArea.sendKeys("@a");
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys("Test");
    assertTrue(!mentionsHighlighting());
    
    //Test deleting a uncompleted mentions once the typeahead is out
    ckeTextArea.clear();
    ckeTextArea.sendKeys("@amy");
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys(Keys.SPACE);
    assertTrue(!isTypeaheadDisplayed());
    assertTrue(!mentionsHighlighting());
    assertTrue(ckeTextArea.getText().equals(" "));
    
    ckeTextArea.clear();
    ckeTextArea.sendKeys("@amy");
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys("Test");
    assertTrue(!isTypeaheadDisplayed());
    assertTrue(!mentionsHighlighting());
    assertTrue(ckeTextArea.getText().equals("Test"));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests the Backspace and Delete keys")
  public void testDeleteAndBackspace()
  {
    // Actions actions = new Actions(driver);

    createMention("@am", ckeTextArea);
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsCompleted(ckeTextArea));
    createMention("@am", ckeTextArea);
    ckeTextArea.sendKeys(Keys.HOME, Keys.DELETE);
    assertTrue(!isMentionsCompleted(ckeTextArea));
    createMention("some text and a @amy", ckeTextArea);
    createMention(" second mention @amy", ckeTextArea);
    createMention(" 3rd mention @amy", ckeTextArea);
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsCompleted(ckeTextArea));
    createMention("some text and a @amy", ckeTextArea);
    createMention(" second mention @amy", ckeTextArea);
    createMention(" 3rd mention @amy", ckeTextArea);
    ckeTextArea.sendKeys(Keys.CONTROL + "a");
    ckeTextArea.sendKeys(Keys.DELETE);
    assertTrue(!isMentionsCompleted(ckeTextArea));

    /*
     * temporarily disable code that tests highlighting with the mouse // Add a mentions createMention("@am", ckeTextArea);
     * ckeTextArea.click(); // Highlight the mentions using the mouse actions.clickAndHold() .moveByOffset(-100, 0) .release()
     * .sendKeys(Keys.BACK_SPACE) .perform(); // Verify the mentions is deleted by pressing backspace ONCE
     * assertTrue(!isMentionsCompleted(ckeTextArea)); ckeTextArea.sendKeys(Keys.CONTROL + "a"); ckeTextArea.sendKeys(Keys.DELETE);
     * createMention("@am", ckeTextArea); ckeTextArea.click(); // Highlight the mentions using the mouse actions.clickAndHold()
     * .moveByOffset(-100, 0) .release() .sendKeys(Keys.DELETE) .perform(); // Verify the mentions is deleted by pressing delete ONCE
     * assertTrue(!isMentionsCompleted(ckeTextArea));
     */
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests the Escape key")
  public void testEscape()
  {
    ckeTextArea.sendKeys("@");
    ckeTextArea.sendKeys(Keys.ESCAPE);
    assertTrue(!isMentionsActive(ckeTextArea));
    // cancelling with the TA displayed
    ckeTextArea.sendKeys(" @am");
    ckeTextArea.sendKeys(Keys.ESCAPE);
    assertTrue(!isTypeaheadDisplayed());
    assertTrue(!isMentionsActive(ckeTextArea));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" },
      description = "A mention is cancelled if space key is pressed when no results found in the TA")
  public void testSpaceWithNoTAResults() throws InterruptedException
  {
    change2TANoResults();
    ckeTextArea.sendKeys("@am");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests the Enter key")
  public void testEnter()
  {
    // TA results not displayed yet = mention is cancelled
    ckeTextArea.sendKeys("@a");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.ENTER);
    assertTrue(!isMentionsActive(ckeTextArea));
    // It completes a mention
    ckeTextArea.sendKeys(" @amy");
    ckeTextArea.sendKeys(Keys.ARROW_DOWN);
    ckeTextArea.sendKeys(Keys.ENTER);
    String text = ckeTextArea.getText().toLowerCase();
    assertTrue(text.contains("@amy jones"));
    assertTrue(isMentionsCompleted(ckeTextArea));
    // verify the TA closes when the user is selected
    assertTrue(!isTypeaheadDisplayed());
  }
  
  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions"},
      description = "It tests the following use cause: Backspace + text + @ + backspace + enter + backspace + @")
  public void testActivationAfterEnterAndBackpace()
  {
    ckeTextArea.sendKeys("text @");
    assertTrue(isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));
    ckeTextArea.sendKeys(Keys.ENTER);
    //assertTrue(numberOfParagrahps(ckeTextArea)==2);
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    //assertTrue(numberOfParagrahps(ckeTextArea)==1);
    ckeTextArea.sendKeys("@");
    assertTrue(isMentionsActive(ckeTextArea));
    //assertTrue(numberOfParagrahps(ckeTextArea)==1);
    //((JavascriptExecutor) driver).executeScript("console.log(" + numberOfBR(ckeTextArea) + ")");
    //Thread.sleep(1000);
    //assertTrue(numberOfBR(ckeTextArea)==1);
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests the Right/Left arrow keys")
  public void testRightLeftArrows()
  {
    // textArea = bla bla @am
    ckeTextArea.sendKeys("bla bla @am");
    ckeTextArea.sendKeys(Keys.ARROW_RIGHT);
    ckeTextArea.sendKeys(Keys.ARROW_LEFT, Keys.ARROW_LEFT, Keys.ARROW_LEFT, Keys.ARROW_LEFT);
    ckeTextArea.sendKeys(Keys.ARROW_RIGHT, Keys.ARROW_RIGHT, Keys.ARROW_RIGHT, Keys.ARROW_RIGHT);
    // right/left arrow keys don't cancel the mention
    assertNotNull(driver.findElement(By.tagName("a")));
    assertTrue(isMentionsActive(ckeTextArea));
    // textArea = bla bla @amy
    ckeTextArea.sendKeys("y");
    assertTrue(ckeTextArea.getText().contains("bla bla @amy"));
    ckeTextArea.sendKeys(Keys.ARROW_LEFT);
    // textArea = bla bla @amSy
    ckeTextArea.sendKeys("S");
    assertTrue(isMentionsActive(ckeTextArea));
    assertTrue(ckeTextArea.getText().contains("bla bla @amSy"));
    // complete the mention and navigate using the arrow keys
    createMention("a", ckeTextArea);
    // - Verify the user can navigate over the mentions in one key press of the arrow -
    ckeTextArea.sendKeys(Keys.ARROW_LEFT);
    // delete and make sure that we are removing the mention
    ckeTextArea.sendKeys(Keys.DELETE);
    assertTrue(!isMentionsCompleted(ckeTextArea));
    createMention("@am", ckeTextArea);
    ckeTextArea.sendKeys(Keys.ARROW_LEFT, Keys.ARROW_RIGHT, Keys.BACK_SPACE);
    assertTrue(!isMentionsCompleted(ckeTextArea));
  }
  
  //Tests defect 142574 
  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It test that the cursor passes over mentions sucessfully")
  public void testCaretPosition()
  {
    createMention("@amy", ckeTextArea);
    assertTrue(isMentionsCompleted(ckeTextArea));
    
    ckeTextArea.sendKeys(Keys.ARROW_LEFT);
    ckeTextArea.sendKeys(Keys.ARROW_RIGHT);
    ckeTextArea.sendKeys(Keys.BACK_SPACE);
    assertTrue(!isMentionsActive(ckeTextArea));
  }
  
  //Tests defect 143844
  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests that you delete the newline when you press delete at the end of a line")
  public void testLineBreakDelete()
  {
    ckeTextArea.sendKeys("Line 1.");
    ckeTextArea.sendKeys(Keys.ENTER);
    ckeTextArea.sendKeys("Line 2.");
    //Place the cursor back on line 1
    ckeTextArea.sendKeys(Keys.chord(Keys.CONTROL, Keys.HOME));
    ckeTextArea.sendKeys(Keys.END);
    ckeTextArea.sendKeys(Keys.DELETE);
    assertTrue(ckeTextArea.getText().equals("Line 1.Line 2."));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests highlighting a mention with the keyboard")
  public void testHighlight()
  {
    Actions actions = new Actions(driver);

    /*
     * temporarily disable code that tests highlighting with the mouse createMention("bla bla @am", ckeTextArea); //ckeTextArea.click(); //
     * add some text, highlight using the mouse, and delete the selection actions.sendKeys(" text").click() .clickAndHold()
     * .moveByOffset(-150, 0) .release() .sendKeys(Keys.BACK_SPACE) .perform(); assertTrue(!isMentionsCompleted(ckeTextArea));
     * assertTrue(ckeTextArea.getText().contains("bla")); // clean the text in the editor CTRL + A ckeTextArea.sendKeys(Keys.CONTROL + "a");
     * ckeTextArea.sendKeys(Keys.DELETE); //assertTrue(textArea.getText().length() == 0);
     */
    // highlight the mention using shift + leftArrow and then delete it
    createMention("bla bla @amy", ckeTextArea);
    actions.sendKeys(" text", Keys.ARROW_LEFT, Keys.ARROW_LEFT).keyDown(Keys.SHIFT)
        .sendKeys(Keys.ARROW_LEFT, Keys.ARROW_LEFT, Keys.ARROW_LEFT, Keys.ARROW_LEFT).keyUp(Keys.SHIFT).sendKeys(Keys.BACK_SPACE).perform();
    assertTrue(!isMentionsCompleted(ckeTextArea));
    assertTrue(ckeTextArea.getText().contains("bla blaxt"));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests the selection of a TA option clicking with the mouse")
  public void testSelectTAOptionWithMouse()
  {
    // click on the TA area to select a user from the list
    ckeTextArea.sendKeys("@am");
    assertTrue(isTypeaheadDisplayed());

    driver.switchTo().defaultContent();
    driver.findElements(By.className("dijitMenuItem")).get(4).click();
    switchToCKEditor();

    assertTrue(isMentionsCompleted(ckeTextArea));
    // make sure the focus stays in the editor and we can type more text
    ckeTextArea.sendKeys(" bla bla");
    assertTrue(ckeTextArea.getText().contains("bla bla"));
  }

  @Test(groups = { "eclipse", "browser", "ckeditor", "functional", "mentions" }, description = "It tests that the mention is not cancelled or removed after clicking on a completed one")
  public void testClickOnACompletedMention()
  {
    createMention("@am", ckeTextArea);
    WebElement link = driver.findElement(By.className("vcard"));
    assertNotNull(link);
    link.click();
    // Mention is not cancelled when left clicked with the mouse
    assertTrue(isMentionsCompleted(ckeTextArea));
  }

  private void createMention(String text, WebElement textArea)
  {
    textArea.sendKeys(text);
    textArea.sendKeys(Keys.ARROW_DOWN);
    textArea.sendKeys(Keys.ENTER);
  }

  private boolean isMentionsActive(WebElement textArea)
  {
    String regex = "<(a|span) aria-labelledby=\"\\w+\">@.*<\\/(a|span)>";
    return findElementByRegex(textArea, regex);
  }

  private boolean isMentionsCompleted(WebElement textArea)
  {
    String regex = "<span class=\"x-lconn-userid\" style=\"display: none\">.*<\\/span>";
    return findElementByRegex(textArea, regex);
  }

  private boolean findElementByRegex(WebElement textArea, String regex)
  {
    Boolean result = false;
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(textArea.getAttribute("innerHTML"));
    while (matcher.find())
    {
      result = true;
      break;
    }
    return result;
  }

  private int numberOfParagrahps(WebElement textArea)
  {
    String regex = "(?=<p>.*</p>)";
    return numberOfResults(textArea, regex);
  }

  private int numberOfBR(WebElement textArea)
  {
    String regex = "<br>";
    return numberOfResults(textArea, regex);
  }

  private int numberOfResults(WebElement textArea, String regex)
  {
    //((JavascriptExecutor) driver).executeScript("console.log('>> numberOfResults <<')");
    //((JavascriptExecutor) driver).executeScript("console.log('   REGEX: " + regex + "')");
    int result = 0;
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(textArea.getAttribute("innerHTML"));
    //((JavascriptExecutor) driver).executeScript("console.log('   innerHTML: " + textArea.getAttribute("innerHTML") + "')");
    while (matcher.find())
    {
      //((JavascriptExecutor) driver).executeScript("console.log('      match FOUND!!...')");
      result++;
    }
    return result;
  }

  private boolean isTypeaheadDisplayed()
  {
    Boolean result;
    driver.switchTo().defaultContent();
    Boolean isNotPresent = driver.findElements(By.className("dijitComboBoxMenuPopup")).isEmpty();
    result = isNotPresent ? false : driver.findElement(By.className("dijitComboBoxMenuPopup")).isDisplayed();
    switchToCKEditor();
    return result;
  }
  
  private boolean mentionsHighlighting()
  {
    Boolean result;
    driver.switchTo().defaultContent();
    Boolean isNotPresent = driver.findElements(By.tagName("font")).isEmpty();
    result = isNotPresent ? false : driver.findElement(By.tagName("font")).isDisplayed();
    switchToCKEditor();
    return result;
  }

  private void clickOutsideCKE()
  {
    driver.switchTo().defaultContent();
    WebElement headerText = driver.findElement(By.tagName("h1"));
    headerText.click();
    switchToCKEditor();
  }

  private void change2TANoResults()
  {
    driver.switchTo().defaultContent();
    WebElement noResultsButton = driver.findElement(By.id("TANoResults"));
    noResultsButton.click();
    switchToCKEditor();
  }

  private void alertText(String text) throws InterruptedException
  {
    String a = driver.findElement(By.tagName("body")).getText();
    ((JavascriptExecutor) driver).executeScript("alert('" + text != null ? text : a + "')");
    Thread.sleep(10000);
  }

}
