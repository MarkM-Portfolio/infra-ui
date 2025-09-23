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

package net.jazz.ajax.tests.suite;

import net.jazz.ajax.tests.functional.*;
import net.jazz.ajax.tests.internal.ResourceOverrideTest;
import net.jazz.ajax.tests.internal.util.*;
import net.jazz.ajax.tests.model.*;
import net.jazz.ajax.tests.servlets.*;

import org.junit.runners.Suite;
import org.junit.runner.RunWith;

@RunWith(Suite.class)
@Suite.SuiteClasses({
    /*
     * Models
     */
    BindingTest.class,
    CoreResourcesTest.class,
    DependencyTest.class,
    DojoI18nTest.class,
    DojoModuleTest.class,
    DojoTemplateTest.class,
    DojoTextTest.class,
    DojoMessageBundleTest.class,
    GeneratedDojoMessageBundleTest.class,
    GeneratedJavaScriptResourceTest.class,
    JavaScriptModuleTest.class,
    JavaScriptResourceTest.class,
    OSGiWebBundleTest.class,
    RenderContextTest.class,
    ResourceOptimizationTest.class,
    ResourceProviderTest.class,
    ResourceTest.class,
    StyleSheetTest.class,
    WebBundleTest.class,
    /*
     * Internal
     */
    ResourceOverrideTest.class,
    /*
     * Util
     */
    CacheConditionTest.class,
    CacheConfigurationTest.class,
    CacheTest.class,
    CacheWindowTest.class,
    ContentEncodingTest.class,
    JavaScriptUtilTest.class,
    LocaleUtilTest.class,
    MasterTemplateTest.class,
    OSGiServicesTest.class,
    UtilTest.class,
    ServletServiceTest.class,
    ServletUtilTest.class,
    /*
     * Servlets
     */
    ResourceGraphTest.class,
    ResourceGraphOperationTest.class,
    TestTemplateTest.class,
    /*
     * Functional
     */
    CustomResourcesTest.class,
    MessageBundleProviderTest.class,
    RequireDojoMessageBundleTest.class,
})
public class AllTests
{
}