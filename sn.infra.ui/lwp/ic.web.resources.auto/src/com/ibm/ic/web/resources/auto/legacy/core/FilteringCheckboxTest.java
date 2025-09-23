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

package com.ibm.ic.web.resources.auto.legacy.core;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import static org.testng.Assert.*;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.google.common.base.Function;
import com.ibm.ic.web.resources.auto.legacy.AbstractLegacyTest;

@SuppressWarnings("nls")
public class FilteringCheckboxTest extends AbstractLegacyTest
{
  private static final String[] PEOPLE = { "Allie Singh", "Dina Maroni", "Ed El-Amon" };

  private static final String[] GROUPS = { "Colleagues", "Contacts" };

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    get(testHost + "/web/lconn.test/core/filteringCheckbox.html?render=test");
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testSingleSelect()
  {
    validateFilteringCheckbox("fc1", false, PEOPLE, null);
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testSingleSelectFiltered()
  {
    validateFilteringCheckboxAndFilter("fc1", false);
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testSingleSelectGroups()
  {
    validateFilteringCheckbox("fc2", false, PEOPLE, GROUPS);
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testMultipleSelect()
  {
    validateFilteringCheckbox("fc3", true, PEOPLE, null);
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testMultipleSelectFiltered()
  {
    validateFilteringCheckboxAndFilter("fc3", true);
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testMultipleSelectGroups()
  {
    validateFilteringCheckbox("fc4", true, PEOPLE, GROUPS);
  }

  private WebElement validateFilteringCheckbox(String id, boolean multiple, String[] options, String[] groups)
  {
    WebElement widget = activateFilteringCheckbox(id);

    if (options != null)
    {
      // Validate there's a filter
      WebElement filter = widget.findElement(By.cssSelector("input[type='text']"));
      assertNotNull(filter);

      WebElement groupList = widget.findElement(By.tagName("select"));
      assertNotNull(groupList);
      // Validate there's a group list
      if (groups != null)
      {
        assertNotEquals("none", groupList.getCssValue("display"));
        List<WebElement> groupOptions = groupList.findElements(By.tagName("option"));
        assertNotNull(groupOptions);
        assertEquals(groupOptions.size(), groups.length);
        for (int i = 0; i < groupOptions.size(); i++)
          assertEquals(groupOptions.get(i).getText(), groups[i]);
      }
      else
      {
        assertEquals(groupList.getCssValue("display"), "none");
      }
      WebElement peopleList = widget.findElement(By.cssSelector("div.peopleList"));

      validateOptions(peopleList, options, multiple);

      List<WebElement> labels = peopleList.findElements(By.cssSelector("label.lotusCheckbox"));
      assertNotNull(labels);
      for (int i = 0; i < labels.size(); i++)
        assertEquals(labels.get(i).getText(), options[i]);
    }
    return widget;
  }

  private void validateFilteringCheckboxAndFilter(String id, boolean multiple)
  {
    WebElement widget = activateFilteringCheckbox(id);

    // Obtain a reference to the text field to filter
    WebElement filter = widget.findElement(By.cssSelector("input[type='text']"));
    // Obtain a reference to the container of options
    WebElement peopleList = widget.findElement(By.cssSelector("div.peopleList"));

    // Validate there's no match
    typeAndValidateOptions(widget, filter, "foo", null, multiple);

    // Validate partial match
    typeAndValidateOptions(widget, filter, "on", new String[] { PEOPLE[1], PEOPLE[2] }, multiple);

    // Validate exact match
    typeAndValidateOptions(widget, filter, PEOPLE[0], new String[] { PEOPLE[0] }, multiple);
  }

  private void typeAndValidateOptions(final WebElement widget, WebElement filter, String text, String[] filteredOptions, boolean multiple)
  {
    // Clear filter
    filter.clear();

    // Type text
    filter.sendKeys(text);
    // Validate text was entered
    assertEquals(filter.getAttribute("value"), text);

    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    // Wait till the list is ready
    final WebElement peopleList = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return widget.findElement(By.cssSelector("div.peopleList.lconnReady"));
      }
    });
    assertNotNull(peopleList);

    if (filteredOptions == null)
    {
      // We don't expect any match
      validateNoOptions(peopleList);
    }
    else
    {
      // Validate the options match what we expect
      validateOptions(peopleList, filteredOptions, multiple);
    }
  }

  private void validateOptions(WebElement peopleList, String[] options, boolean multiple)
  {
    List<WebElement> checkboxes;
    if (multiple)
    {
      checkboxes = peopleList.findElements(By.cssSelector("input[type='checkbox']"));
    }
    else
    {
      checkboxes = peopleList.findElements(By.cssSelector("input[type='radio']"));
    }
    assertNotNull(checkboxes);
    assertEquals(checkboxes.size(), options.length);
  }

  private void validateNoOptions(WebElement peopleList)
  {
    assertEquals(peopleList.getText(), "No Results found");
  }

  private WebElement activateFilteringCheckbox(final String id)
  {
    final WebElement widget = driver.findElement(By.id(id));
    assertNotNull(widget);

    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    // Validate list of people
    final WebElement peopleList = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(By.cssSelector("div#" + id + " div.peopleList"));
      }
    });
    assertNotNull(peopleList);

    WebElement loadButton = driver.findElement(By.xpath("//div[@id='" + id + "']/following-sibling::button[1]"));
    assertNotNull(loadButton);
    assertEquals(loadButton.getText(), "Load list");
    loadButton.click();

    wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS).pollingEvery(pollInterval, TimeUnit.MILLISECONDS)
        .ignoring(NoSuchElementException.class);

    // Wait till the div.peopleList is populated
    WebElement dummy = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return peopleList.findElement(By.tagName("div"));
      }
    });
    assertNotNull(dummy);
    return widget;
  }
}
