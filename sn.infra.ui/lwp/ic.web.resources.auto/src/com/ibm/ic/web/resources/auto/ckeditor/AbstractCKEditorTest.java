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

import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.BeforeMethod;
import com.ibm.ic.web.resources.auto.AbstractBaseTest;

@SuppressWarnings("nls")
public abstract class AbstractCKEditorTest extends AbstractBaseTest
{
  public AbstractCKEditorTest()
  {
    super();
  }

  public void navigateToCKEditorIndex()
  {
    clickLink("CKEditor wrappers, plugins and utilities");
  }

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    setDriver(new FirefoxDriver());
    navigateToIndex();
    navigateToCKEditorIndex();
    navigateToTestPage();
  }

  public abstract void navigateToTestPage();

}