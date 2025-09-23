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

package net.jazz.ajax.tests.model;

import static org.junit.Assert.*;

import java.util.Locale;

import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.RenderContext.LocaleOverride;
import net.jazz.ajax.model.RenderContext.Mode;
import net.jazz.ajax.tests.mocks.TestRequest;

import org.junit.Test;

import com.ibm.lconn.core.config.services.Services;

@SuppressWarnings("nls")
public class RenderContextTest
{

  @Test
  public final void testHashCode()
  {
    RenderContext r1 = RenderContext.forState("a", Locale.ENGLISH, Mode.STANDARD);
    assertEquals(Locale.ENGLISH.hashCode() ^ "a".hashCode(), r1.hashCode());
  }

  @Test
  public final void testMembers()
  {
    RenderContext r1 = RenderContext.forState("a", Locale.ENGLISH, Mode.STANDARD);
    assertEquals("a", r1.base);
    assertEquals(Locale.ENGLISH, r1.locale);
    assertEquals(Mode.STANDARD, r1.mode);
    assertEquals(LocaleOverride.TRUE, r1.localeOverride);

    RenderContext r2 = RenderContext.forState("a", Locale.ENGLISH, Mode.NO_MINIFY);
    assertEquals("a", r2.base);
    assertEquals(Locale.ENGLISH, r2.locale);
    assertEquals(Mode.NO_MINIFY, r2.mode);
    assertEquals(LocaleOverride.TRUE, r2.localeOverride);

    RenderContext r3 = RenderContext.forState("a", Locale.FRENCH, Mode.STANDARD);
    assertEquals("a", r3.base);
    assertEquals(Locale.FRENCH, r3.locale);
    assertEquals(Mode.STANDARD, r3.mode);
    assertEquals(LocaleOverride.TRUE, r3.localeOverride);

    RenderContext r4 = RenderContext.forState("b", Locale.ENGLISH, Mode.STANDARD);
    assertEquals("b", r4.base);
    assertEquals(Locale.ENGLISH, r4.locale);
    assertEquals(Mode.STANDARD, r4.mode);
    assertEquals(LocaleOverride.TRUE, r4.localeOverride);
  }

  @Test
  public final void testEqualsObject()
  {
    RenderContext r1 = RenderContext.forState("a", Locale.ENGLISH, Mode.STANDARD);
    RenderContext r2 = RenderContext.forState("a", Locale.ENGLISH, Mode.NO_MINIFY);
    RenderContext r3 = RenderContext.forState("a", Locale.FRENCH, Mode.STANDARD);
    RenderContext r4 = RenderContext.forState("b", Locale.ENGLISH, Mode.STANDARD);
    // Objects equal to self
    assertTrue(r1.equals(r1));
    assertTrue(r2.equals(r2));
    assertTrue(r3.equals(r3));
    assertTrue(r4.equals(r4));
    // Objects differs
    assertFalse(r1.equals(r2));
    assertFalse(r1.equals(r3));
    assertFalse(r1.equals(r4));
    assertFalse(r2.equals(r3));
    assertFalse(r2.equals(r4));
    assertFalse(r3.equals(r4));
    // Order doesn't matter
    assertFalse(r4.equals(r1));
    assertFalse(r4.equals(r2));
    assertFalse(r4.equals(r3));
    assertFalse(r3.equals(r1));
    assertFalse(r3.equals(r2));
    assertFalse(r2.equals(r1));
    // Objects differ from other class
    assertFalse(r1.equals(new Object()));
    assertFalse(r2.equals(new Integer(1)));
    assertFalse(r3.equals(new Locale("en")));
    assertFalse(r4.equals(new StringBuilder()));   
    
  }

  @Test
  public final void testForRequest()
  {
    TestRequest request = new TestRequest();
    request.setServletPath("/foo");
    request.setLocale(Locale.ITALIAN);
    RenderContext r1 = RenderContext.forRequest(request);
    assertNotNull(r1);
    assertEquals("/foo", r1.base);
    assertEquals(Locale.ITALIAN, r1.locale);
    
    request = new TestRequest();    
    request.setServletPath("/bar");
    request.setLocale(Locale.ENGLISH);
    request.setParameter("xdloader", "true");
    RenderContext r4 = RenderContext.forRequest(request);
    assertNotNull(r4);
    assertEquals(true, r4.includeXDloader);

    request = new TestRequest();
    request.setServletPath("/foo");
    request.setLocale(Locale.FRENCH);
    request.setParameter("_proxyURL", "bar");
    RenderContext r2 = RenderContext.forRequest(request);
    assertNotNull(r2);
    assertEquals(Services.COMMON_PATH, r2.base);
    assertEquals(Locale.FRENCH, r2.locale);

    request = new TestRequest();
    request.setServletPath("/bar");
    request.setLocale(Locale.GERMAN);
    request.setSecure(true);
    request.setParameter("_proxyURL", "bar");
    RenderContext r3 = RenderContext.forRequest(request);
    assertNotNull(r3);
    assertEquals(Services.COMMON_PATH_SECURE, r3.base);
    assertEquals(Locale.GERMAN, r3.locale);    
  }

  @Test
  public final void testForState()
  {
    RenderContext r1 = RenderContext.forState("a", Locale.ENGLISH, Mode.STANDARD);
    assertNotNull(r1);
    assertEquals("a", r1.base);
    assertEquals(Locale.ENGLISH, r1.locale);
    assertEquals(Mode.STANDARD, r1.mode);
  }

}
