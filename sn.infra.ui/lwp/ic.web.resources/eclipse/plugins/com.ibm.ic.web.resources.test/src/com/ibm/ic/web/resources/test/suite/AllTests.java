/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.ic.web.resources.test.suite;

import org.junit.runners.Suite;
import org.junit.runner.RunWith;

//import com.ibm.ic.web.resources.test.config.*;
//import com.ibm.ic.web.resources.test.customresources.*;
import com.ibm.ic.web.resources.test.model.*;
import com.ibm.ic.web.resources.test.personcard.*;
//import com.ibm.ic.web.resources.test.sametime.SametimeAwarenessBindingTest;

@RunWith(Suite.class)
@Suite.SuiteClasses({
  /*
   * Config
   */
//  StyleSheetConfigTest.class,
  /*
   * Custom resources
   */
//  CustomDojoI18nTest.class,
//  CustomDojoModuleTest.class,
//  CustomDojoTemplateTest.class,
//  CustomDojoTextTest.class,
//  CustomJavaScriptModuleTest.class,
//  CustomResourcesTest.class,
//  CustomTestTemplateTest.class,
  /*
   * Model
   */
  ConfigurationMapResourceTest.class,
  /*
   * Person card
   */
  CardImplementationBindingTest.class,
  /*
   * Sametime awareness
   */
//  SametimeAwarenessBindingTest.class,
})
public class AllTests
{
}