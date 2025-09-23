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

package com.ibm.ic.web.resources.auto;

import static org.testng.Assert.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.StringTokenizer;
import java.util.concurrent.TimeUnit;

import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.junit.Rule;
import org.junit.rules.MethodRule;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
//import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.google.common.base.Function;

/**
 * Abstract base test case
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
@SuppressWarnings("nls")
public class AbstractBaseTest
{
  final static String DRIVER_CLASS_PROPERTY_NAME = "test.driver";

  final static String HOST_PROPERTY_NAME = "test.host";

  final static String WAIT_TIMEOUT_PROPERTY_NAME = "testng.wait.timeout";

  final static String POLL_INTERVAL_PROPERTY_NAME = "testng.poll.interval";

  static int WAIT_TIMEOUT = 10;

  static int POLL_TIMER = 100;

  protected WebDriver driver;

  protected static String testHost;

  protected static String driverClass;

  protected static int waitTimeout = WAIT_TIMEOUT;

  protected static int pollInterval = POLL_TIMER;

  static
  {
    testHost = System.getProperty("test.host");
    if (testHost == null)
    {
      testHost = "http://localhost:52450";
    }
    System.out.println("Using test host: " + testHost);

    driverClass = System.getProperty("test.driver");
    if (driverClass == null)
    {
      driverClass = "org.openqa.selenium.htmlunit.HtmlUnitDriver";
    }
    System.out.println("Using test driver: " + driverClass);

    if (System.getProperty(WAIT_TIMEOUT_PROPERTY_NAME) != null)
    {
      waitTimeout = Integer.parseInt(System.getProperty(WAIT_TIMEOUT_PROPERTY_NAME));
      System.out.println("Using custom wait timeout: " + waitTimeout);
    }
    if (System.getProperty(POLL_INTERVAL_PROPERTY_NAME) != null)
    {
      pollInterval = Integer.parseInt(System.getProperty(POLL_INTERVAL_PROPERTY_NAME));
      System.out.println("Using custom poll interval: " + pollInterval);
    }
  }

  @Rule
  public ScreenshotTestRule screenshotTestRule = new ScreenshotTestRule();

  @BeforeMethod(groups = { "eclipse", "_current_" })
  public void setup()
  {
    driver = getDriver();
    /*
     * turn off annoying htmlunit warnings
     * 
     * @see http://stackoverflow.com/questions/17436855/htmlunit-tons-of-obsolete-content-and-cant-create-objects-warnings-on-getpage
     */
    java.util.logging.Logger.getLogger("com.gargoylesoftware").setLevel(java.util.logging.Level.OFF);
  }

  @AfterMethod(groups = { "eclipse", "_current_" })
  public void dumpSourceOnFailure(ITestResult testResult) throws IOException
  {
    if (testResult.getStatus() == ITestResult.FAILURE)
    {
      JavascriptExecutor js = (JavascriptExecutor) driver;
      String source = (String) js.executeScript("return document.documentElement.outerHTML;");
      // TODO: print to file
      System.out.println(source);
    }
  }

  public void setDriver(WebDriver driver)
  {
    this.driver = driver;
  }

  // @SuppressWarnings({ "rawtypes", "unchecked" })
  private WebDriver getDriver()
  {
    // WebDriver ret = null;
    // try
    // {
    // Class clazz = Class.forName(driverClass);
    // if (clazz.getConstructor(Boolean.class) != null)
    // ret = (WebDriver) clazz.getConstructor(Boolean.class).newInstance(true);
    // else
    // ret = (WebDriver) clazz.newInstance();
    // }
    // catch (Throwable t)
    // {
    // fail("Can't find test driver class: " + driverClass);
    // }
    // return ret;
    // return new HtmlUnitDriver(true);
    HtmlUnitDriver driver = new HtmlUnitDriver(BrowserVersion.FIREFOX_24);
    driver.setJavascriptEnabled(true);
    return driver;
    // return new FirefoxDriver();
  }

  @AfterMethod(groups = { "eclipse", "_current_" })
  public void teardown()
  {
    driver.quit();
  }

  public void navigateToIndex()
  {
    get(testHost + "/web/ic-test/index.html?render=test");
  }

  protected String getCssValue(WebElement el, String name)
  {
    String styles = el.getAttribute("style");
    if (styles == null)
      return null;
    StringTokenizer st = new StringTokenizer(styles, ";");
    while (st.hasMoreTokens())
    {
      String tok = st.nextToken().trim();
      StringTokenizer st2 = new StringTokenizer(tok, ":");
      String tok2 = st2.nextToken().trim();
      if (name.equals(tok2))
        return st2.nextToken().trim();
    }
    return null;
  }

  protected void assertHidden(final WebElement el)
  {
    // Wait for hide animation to complete
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    boolean hidden = wait.until(new Function<WebDriver, Boolean>()
    {
      public Boolean apply(WebDriver driver)
      {
        return "none".equals(getCssValue(el, "display"));
      }
    });
    assertTrue(hidden);
  }

  protected void assertVisible(final WebElement el)
  {
    // Wait for hide animation to complete
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    boolean hidden = wait.until(new Function<WebDriver, Boolean>()
    {
      public Boolean apply(WebDriver driver)
      {
        return !"none".equals(getCssValue(el, "display"));
      }
    });
    assertTrue(hidden);
  }

  protected void clickLink(String linkLabel)
  {
    // wait up to 10 seconds for page loading
    driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
    WebDriverWait wait = new WebDriverWait(driver, 5); // 5 seconds
    wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.linkText(linkLabel))));
    WebElement link = driver.findElement(By.linkText(linkLabel));
    assertNotNull(link);
    link.click();
  }

  protected WebElement waitForElement(Wait<WebDriver> wait, final By selector)
  {
    return wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        return driver.findElement(selector);
      }
    });
  }

  protected void verifyAlert(Wait<WebDriver> waitForAlert, String alertText)
  {
    if (driver instanceof HtmlUnitDriver)
    {
      System.out.println("HtmlUnitDriver doesn't support TargetLocator.alert()");
      return;
    }
    try
    {
      Alert alert = waitForAlert.until(new Function<WebDriver, Alert>()
      {
        public Alert apply(WebDriver driver)
        {
          Alert alert = driver.switchTo().alert();
          return alert;
        }
      });
      assertEquals(alertText, alert.getText());
      alert.dismiss();
    }
    catch (Throwable t)
    {
      System.out.println(t);
    }
  }

  protected WebElement getDialog()
  {
    Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(waitTimeout, TimeUnit.SECONDS)
        .pollingEvery(pollInterval, TimeUnit.MILLISECONDS).ignoring(NoSuchElementException.class);

    WebElement dialog = wait.until(new Function<WebDriver, WebElement>()
    {
      public WebElement apply(WebDriver driver)
      {
        WebElement ret = driver.findElement(By.cssSelector("div.dijitDialog"));
        if (ret.isDisplayed())
          return ret;
        else
          return null;
      }
    });

    assertNotNull(dialog);
    return dialog;
  }

  protected void get(String url)
  {
    System.out.println("Requesting " + url);
    driver.get(url);
  }

  /*
   * See http://junit.org/javadoc/latest/org/junit/Rule.html
   */
  class ScreenshotTestRule implements MethodRule
  {
    public Statement apply(final Statement statement, final FrameworkMethod frameworkMethod, final Object o)
    {
      return new Statement()
      {
        @Override
        public void evaluate() throws Throwable
        {
          try
          {
            statement.evaluate();
          }
          catch (Throwable t)
          {
            captureScreenshot(frameworkMethod.getName());
            throw t; // Rethrow to allow the failure to be reported to JUnit
          }
        }

        public void captureScreenshot(String fileName)
        {
          try
          {
            new File("screenshots").mkdirs(); // Ensure directory is there
            FileOutputStream out = new FileOutputStream("screenshot-" + fileName + ".png");
            out.write(((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES));
            out.close();
          }
          catch (Exception e)
          {
            // No need to crash the tests if the screenshot fails
          }
        }
      };
    }
  }
}
