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

import static org.testng.Assert.assertNotNull;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.BeforeMethod;

import com.ibm.ic.web.resources.auto.AbstractBaseTest;

@SuppressWarnings("nls")
public abstract class AbstractARIATest extends AbstractBaseTest
{

  public AbstractARIATest()
  {
    super();
  }

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    navigateToIndex();
    navigateToARIAIndex();
    navigateToTestPage();
  }

  private void navigateToARIAIndex()
  {
    WebElement link = driver.findElement(By.linkText("ARIA helpers"));
    assertNotNull(link);
    link.click();
  }

  public abstract void navigateToTestPage();

}