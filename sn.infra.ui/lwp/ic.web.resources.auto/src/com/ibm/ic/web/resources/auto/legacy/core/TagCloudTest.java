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

import org.openqa.selenium.WebElement;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.ibm.ic.web.resources.auto.legacy.AbstractLegacyTest;

public class TagCloudTest extends AbstractLegacyTest
{
  private com.ibm.ic.web.resources.auto.ui.TagCloudTest amdTest;

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    get(testHost + "/web/lconn.test/tagcloud/tagcloud.html?render=test");

    amdTest = new com.ibm.ic.web.resources.auto.ui.TagCloudTest();
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
  public void testCloudDeclarative() throws Exception
  {
    amdTest.testCloudDeclarative();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testListDeclarative() throws Exception
  {
    amdTest.testListDeclarative();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testFindTagDeclarative() throws Exception
  {
    amdTest.testFindTagDeclarative();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testCloudProgrammatic() throws Exception
  {
    amdTest.testCloudProgrammatic();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testListProgrammatic() throws Exception
  {
    amdTest.testListProgrammatic();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testFindTagProgrammatic() throws Exception
  {
    amdTest.testFindTagProgrammatic();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testCloudWithDuplicatesProgrammatic() throws Exception
  {
    amdTest.testCloudWithDuplicatesProgrammatic();
  }

  @Test(groups = { "eclipse", "legacy", "functional" })
  public void testListWithDuplicatesProgrammatic() throws Exception
  {
    amdTest.testListWithDuplicatesProgrammatic();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testEmptyProgrammatic() throws Exception
  {
    amdTest.testEmptyProgrammatic();
  }

  @Test(groups = { "eclipse", "legacy" })
  public void testErrorProgrammatic() throws Exception
  {
    amdTest.testErrorProgrammatic();
  }
}
