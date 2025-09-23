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

import static org.testng.Assert.*;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

/**
 * Test case for Filters widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class FiltersTest extends AbstractUITest
{
  final private String[] LABELS = new String[] { "Andreas Berzat", "Dina Maroni", "Ed El-Amon" };

  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Filters"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", "amd" })
  public void testAvailable() throws Exception
  {
    // Click the link on the test page
    for (String label : LABELS)
      assertNotNull(getFilter(label));
  }

  @Test(groups = { "eclipse", "amd", "functional" })
  public void testDismiss() throws Exception
  {
    for (String label : LABELS)
    {
      // Obtain a reference to the filter
      WebElement filter = getFilter(label);
      assertNotNull(filter);
      // Click it
      filter.click();
      // Verify the filter was destroyed
      filter = getFilter(label);
      assertNull(filter);
    }
  }

  private WebElement getFilter(String label)
  {
    List<WebElement> filters = driver.findElements(By.cssSelector("a.lotusFilter"));
    for (WebElement filter : filters)
      if (label.equals(filter.getText()))
        return filter;
    return null;
  }
}
