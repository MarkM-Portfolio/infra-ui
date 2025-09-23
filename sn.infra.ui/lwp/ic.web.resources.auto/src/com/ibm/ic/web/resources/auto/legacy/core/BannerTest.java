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

package com.ibm.ic.web.resources.auto.legacy.core;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.ibm.ic.web.resources.auto.legacy.AbstractLegacyTest;

@SuppressWarnings("nls")
public class BannerTest extends AbstractLegacyTest
{
  private com.ibm.ic.web.resources.auto.ui.BannerTest amdTest;

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    get(testHost + "/web/lconn.test/widget/banner.html?render=test");

    amdTest = new com.ibm.ic.web.resources.auto.ui.BannerTest();
    // Share the driver with the AMD test case
    amdTest.setDriver(driver);
  }

  @AfterMethod(groups = { "eclipse", "_current_" })
  public void teardown()
  {
    super.teardown();
    amdTest.teardown();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testValidateWidget()
  {
    amdTest.testValidateWidget();
  }
}
