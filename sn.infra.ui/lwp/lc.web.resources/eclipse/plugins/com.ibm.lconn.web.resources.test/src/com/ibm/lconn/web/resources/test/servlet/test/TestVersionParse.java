/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.web.resources.test.servlet.test;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import junit.framework.TestCase;

public class TestVersionParse extends TestCase
{
  private static Pattern versionDetect = Pattern.compile("[_\\-](\\d+)\\.(\\d+)\\.(\\d+)(\\.([\\d\\w\\-]+))?$");

  protected void assertHasVersion(String input, int high, int med, int low, String qualifier)
  {
    Matcher m = versionDetect.matcher(input);
    if (!m.find() || m.start() == 0)
      fail("Input <"+input+"> has no version identifier");

    assertEquals(high, Integer.parseInt(m.group(1)));
    assertEquals(med, Integer.parseInt(m.group(2)));
    assertEquals(low, Integer.parseInt(m.group(3)));
    
    assertEquals(qualifier, m.group(5));
  }
  
  protected void assertHasNoVersion(String input)
  {
    Matcher m = versionDetect.matcher(input);
    if (m.find() && m.start() > 0)
      fail("Input <"+input+"> located version identifier at "+m.start());
  }  
  
  public void testNotVersion()
  {
    assertHasNoVersion("a");
    assertHasNoVersion("a.b.c");
    assertHasNoVersion("a.b.c_");
    assertHasNoVersion("a.b.c_1");
    assertHasNoVersion("a.b.c_1");
    assertHasNoVersion("a.b.c_1.0");
    assertHasNoVersion("a_1");
    assertHasNoVersion("a_1.0");
    assertHasNoVersion("a_1.0.a");
    assertHasNoVersion("a_1.0.1.");
    assertHasNoVersion("_1.0.1");
  }
  
  public void testVersion()
  {
    assertHasVersion("a_0.0.0", 0, 0, 0, null);
    assertHasVersion("a_1.0.1", 1, 0, 1, null);
    assertHasVersion("a_1.0.1.v", 1, 0, 1, "v");

    assertHasVersion("a_1.b_1.0.1.a1_2", 1, 0, 1, "a1_2");
    assertHasVersion("a_1.b__1.0.1.a1_2", 1, 0, 1, "a1_2");
    assertHasVersion("a_1.b-1.0.1.a1_2", 1, 0, 1, "a1_2");
    
  }
  
    
  
  public void testRealExamples()
  {
    assertHasVersion("com.ibm.team.server.embedded.jetty_1.0.1.v20101012_1938", 1, 0, 1, "v20101012_1938");
    assertHasVersion("org.mortbay.jetty.server.source_6.1.23.v201004211559", 6, 1, 23, "v201004211559");
    assertHasVersion("org.eclipse.osgi.source_3.5.2.R35x_v20100126", 3, 5, 2, "R35x_v20100126");
    assertHasVersion("com.ibm.ajax.auth.web.resources_1.0.0.20111128-1050", 1, 0, 0, "20111128-1050");
    assertHasVersion("org.eclipse.equinox.simpleconfigurator.source_1.0.101.R35x_v20090807-1100", 1, 0, 101, "R35x_v20090807-1100");
    assertHasVersion("com.ibm.langware.v5.dic.en_US_7.2.0.201107220540", 7, 2, 0, "201107220540");
    assertHasNoVersion("org.eclipse.osgi.source");
    assertHasNoVersion("junit");
  }  
}
