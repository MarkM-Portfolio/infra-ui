/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.web.resources.auto.oauth;

import static org.testng.Assert.assertNotNull;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.BeforeMethod;

import com.ibm.ic.web.resources.auto.AbstractBaseTest;

public abstract class AbstractOAuthTest extends AbstractBaseTest
{

  public AbstractOAuthTest()
  {
    super();
  }

  public void navigateToOAuthIndex()
  {
    WebElement link = driver.findElement(By.linkText("OAuth support"));
    assertNotNull(link);
    link.click();
  }

  public abstract void navigateToTestPage();

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    navigateToIndex();
    navigateToOAuthIndex();
    navigateToTestPage();
  }

}