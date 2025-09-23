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

package com.ibm.ic.web.resources.auto.legacy.oneui;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.ibm.ic.web.resources.auto.legacy.AbstractLegacyTest;

/**
 * Test case for Feeds widget
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class FeedsTest extends AbstractLegacyTest
{
  private com.ibm.ic.web.resources.auto.ui.FeedsTest amdTest;

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    get(testHost + "/web/com.ibm.oneui.test/controls/feeds.html?render=test");

    amdTest = new com.ibm.ic.web.resources.auto.ui.FeedsTest();
    // Share the driver with the AMD test case
    amdTest.setDriver(driver);
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testSingle() throws Exception
  {
    amdTest.testSingle();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testMultiple() throws Exception
  {
    amdTest.testMultiple();
  }
}