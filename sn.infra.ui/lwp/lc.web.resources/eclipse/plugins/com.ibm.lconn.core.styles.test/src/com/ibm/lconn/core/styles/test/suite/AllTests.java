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

package com.ibm.lconn.core.styles.test.suite;

import com.ibm.lconn.core.styles.test.*;
import com.ibm.lconn.core.styles.test.customresources.*;
import com.ibm.lconn.core.styles.test.extensions.*;
import com.ibm.lconn.core.styles.test.model.*;

import org.junit.runners.Suite;
import org.junit.runner.RunWith;

@RunWith(Suite.class)
@Suite.SuiteClasses({
    OneUIVersionTest.class,
  /*
   * Model
   */
    ApplicationThemeStyleSheetTest.class,
    CompoundStyleSheetTest.class,
    OneUIExtendedWebBundleTest.class,
    PackagedThemeTest.class,
    StandardThemeTest.class,
    ThemeStyleSheetTest.class,
    ThemeTest.class,
    VirtualStyleSheetResourceTest.class,
    /*
     * Custom resources
     */
    ApplicationThemeCustomizationTest.class,
    ThemeCustomizationTest.class,
    /*
     * Extension points
     */
    CSSBindingTest.class,
    ThemeExtensionTest.class,
})
public class AllTests
{
}