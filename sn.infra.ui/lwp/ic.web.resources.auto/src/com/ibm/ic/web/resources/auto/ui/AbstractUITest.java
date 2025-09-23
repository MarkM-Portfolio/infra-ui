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

import org.testng.annotations.BeforeMethod;

import com.ibm.ic.web.resources.auto.AbstractBaseTest;

/**
 * Abstract base UI test case
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public abstract class AbstractUITest extends AbstractBaseTest
{

  public AbstractUITest()
  {
    super();
  }

  public void navigateToUIIndex()
  {
    clickLink("Core UI widgets and utilities");
  }

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    super.setup();
    navigateToIndex();
    navigateToUIIndex();
    navigateToTestPage();
  }

  abstract public void navigateToTestPage();
}