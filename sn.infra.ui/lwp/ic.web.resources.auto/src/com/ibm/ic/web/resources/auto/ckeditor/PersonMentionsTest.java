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

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

@SuppressWarnings("nls")
public class PersonMentionsTest extends AbstractCKEditorTest
{

  @Override
  public void navigateToTestPage()
  {
    WebElement link = driver.findElement(By.linkText("Dynamic loader"));
    assertNotNull(link);
    link.click();
  }

  @Test(groups = { "eclipse", /* "amd", */"ckeditor", "functional" })
  public void testTyping()
  {

  }

}
