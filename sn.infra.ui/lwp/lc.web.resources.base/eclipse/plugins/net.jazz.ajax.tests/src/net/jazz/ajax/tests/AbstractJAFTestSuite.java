/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/
package net.jazz.ajax.tests;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import junit.framework.TestCase;
import junit.framework.TestSuite;
import net.jazz.ajax.tests.internal.Constants;
import net.jazz.ajax.tests.internal.JAFTestCase;
import net.jazz.ajax.tests.internal.TestModuleParser;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public abstract class AbstractJAFTestSuite extends TestSuite {
	private static Log logger = LogFactory.getLog(AbstractJAFTestSuite.class);
	
	private int completedTests = 0;
	private String testModule;
	
	private static final String TEST_JS_PREFIX = Constants.getServerURLPrefix() + "web/";
	private static final String TEST_JS_SUFFIX = ".js";
	private static final String HEADER_CONTENT_TYPE = "content-type";
	private static final String CT_TEXT_JAVASCRIPT = "text/javascript";
	private static final long DEFAULT_SUITE_TIMEOUT = 60000L;	
	
	public AbstractJAFTestSuite(String testModule) {
		this(testModule, true);
	}
	
	public AbstractJAFTestSuite(String testModule, Boolean performIntrospection) {
		super(testModule);
		this.testModule = testModule;
		if (performIntrospection) {
			registerTests();
			if (this.testCount() == 0) {
				this.addTest(new TestCase("TestCaseIntrospection") {
					public void runTest() {
						fail("Unable to introspect test cases for this test module");
					}
				});
			}
		}
	}
	
	public void testComplete() {
		if (++completedTests == testCount()) {
			// Remove the test results from the servlet
	        try {
	        	URL clearResultsURL = new URL(Constants.getServerURLPrefix() + "_testResults/clearResults?group=" + testModule);
	        	clearResultsURL.openStream();
	        } catch (MalformedURLException e) {
	        } catch (IOException e) {
	        }
		}
	}
	
	private void registerTests() {
		String jsString = getTestModuleJS();
		TestModuleParser parser = new TestModuleParser();
		parser.parse(jsString);
		String[] testCases = parser.getTestCases();
		long overallTestTimeout = TestModuleParser.getAggregateTimeout() + DEFAULT_SUITE_TIMEOUT;		
		for (String curTest : testCases) {
			//  Even though we'd like to be able to set the timeout for each subtest to
			//  be the timeout as defined in the test case, the reality of the situation
			//  is that the a test will only report back once it is complete (all of its
			//  subtests are done).  So, the time we wait for a timeout has to be the 
			//  summation of each individual subtest timeout values which will be the 
			//  maximum amount of time a full test could potentially run.
			addTest(new JAFTestCase(curTest, getName(), this, overallTestTimeout));
		}
	}
	
	private String getTestModuleJS() {
		StringBuffer jsStringBuffer = new StringBuffer();
		String[] pathParts = testModule.split("\\.");
		for (int i=1; i < pathParts.length; i++) {
			String urlPart = new String();
			for (int j=0; j < pathParts.length; j++) {
				if (j > 0) {
					urlPart += j < i ? "." : "/";
				}
				urlPart += pathParts[j];
			}
			try {
				URL url = new URL(TEST_JS_PREFIX + urlPart + TEST_JS_SUFFIX);
				System.out.println("Checking url : " + url.toString());
				URLConnection urlConn = url.openConnection();
				if (!isJavascript(urlConn.getHeaderField(HEADER_CONTENT_TYPE))) {
					continue;
				}
				InputStream is = urlConn.getInputStream();
				BufferedReader br = new BufferedReader(new InputStreamReader(is));
				char[] buffer = new char[4096];
				int numBytes;
				while ((numBytes = br.read(buffer, 0, 4096)) != -1) {
					jsStringBuffer.append(buffer, 0, numBytes);
				}
				
				break;
			} catch (MalformedURLException e) {
			} catch (IOException e) { }
		}
		if (jsStringBuffer.length() == 0) {
			logger.warn("Unable to find JavaScript source for test module " + testModule + " under " + TEST_JS_PREFIX);
		}
		return jsStringBuffer.toString();
	}
	
	private boolean isJavascript(String contentType) {
		if ( contentType == null ) return false;
		if ( contentType.indexOf(CT_TEXT_JAVASCRIPT) != -1) return true;
		if ( contentType.indexOf("application/x-javascript") != -1 ) return true;
		return false;
	}
}
