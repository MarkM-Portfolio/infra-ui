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

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.ibm.ic.web.resources.auto.legacy.AbstractLegacyTest;

/**
 * Test case for DialogUtil widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class DialogUtilTest extends AbstractLegacyTest
{
  private com.ibm.ic.web.resources.auto.ui.DialogUtilTest amdTest;

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    get(testHost + "/web/lconn.test/core/DialogUtil.html?render=test");

    amdTest = new com.ibm.ic.web.resources.auto.ui.DialogUtilTest();
    // Share the driver with the AMD test case
    amdTest.setDriver(driver);
  }

  @AfterMethod(groups = { "eclipse", "_current_" })
  public void teardown()
  {
    super.teardown();
    amdTest.teardown();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testAlertOK() throws Exception
  {
    amdTest.testAlertOK();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testAlertClose() throws Exception
  {
    amdTest.testAlertClose();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testPromptAccept() throws Exception
  {
    amdTest.testPromptAccept();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testPromptDeny() throws Exception
  {
    amdTest.testPromptDeny();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testPromptClose() throws Exception
  {
    amdTest.testPromptClose();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testPopupFormOK() throws Exception
  {
    amdTest.testPopupFormOK();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testPopupFormCancel() throws Exception
  {
    amdTest.testPopupFormCancel();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testPopupFormClose() throws Exception
  {
    amdTest.testPopupFormClose();
  }
}