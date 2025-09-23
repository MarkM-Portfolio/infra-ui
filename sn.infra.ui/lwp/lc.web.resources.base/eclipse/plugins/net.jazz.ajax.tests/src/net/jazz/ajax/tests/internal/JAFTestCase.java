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
package net.jazz.ajax.tests.internal;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.jazz.ajax.tests.AbstractJAFTestSuite;

import com.ibm.sistdase.json.JSONParser;

import junit.framework.TestCase;

public class JAFTestCase extends TestCase {

	private AbstractJAFTestSuite parent;
	private String testModule;
	private Long timeout;
	private Long runningTime;
	private static final Long SLEEP_TIME = 1000L;			// check for results every second
	private static final Long DEFAULT_TIMEOUT = 60000L;		// timeout after 30 seconds by default
	
	public JAFTestCase(String testName, String testModule) {
		this(testName, testModule, null, DEFAULT_TIMEOUT);
	}
	
	public JAFTestCase(String testName, String testModule, Long timeout) {
		this(testName, testModule, null, timeout);
	}
	
	public JAFTestCase(String testName, String testModule, AbstractJAFTestSuite parent) {
		this(testName, testModule, parent, DEFAULT_TIMEOUT);
	}
	
	public JAFTestCase(String testName, String testModule, AbstractJAFTestSuite parent, Long timeout) {
		super(testName);
		this.testModule = testModule;
		this.parent = parent;
		this.timeout = timeout;
	}
	
	@SuppressWarnings("unchecked")
	protected void runTest() throws Exception {
		JAFTestRunner.instance().runTest(testModule);
		runningTime = 0L;
        boolean complete = false;
        InputStream is = null;
        Map<String, Boolean> browserTestComplete = new HashMap<String, Boolean>();
        List<String> hostBrowserKeys = JAFTestRunner.instance().getHostBrowserKeys();
        if (hostBrowserKeys.size() == 0) {
        	fail("No test clients found: unable to run the test");
        }
        for (String curBrowser : hostBrowserKeys) {
        	browserTestComplete.put(curBrowser, false);
        }
        
        Map<String, List<String>> failureMap = new HashMap<String, List<String>>();
        while (!complete) {
        	complete = true;
        	for (String curKey : hostBrowserKeys) {
        		if (!browserTestComplete.get(curKey)) {
		            try {
		                URL resultsURL = new URL(Constants.getServerURLPrefix() + "_testResults/results?group="+testModule+"&key="+URLEncoder.encode(curKey, "UTF-8"));
		                is = resultsURL.openStream();
		                Map<String, Object> group = (Map<String, Object>)JSONParser.parse(new BufferedReader(new InputStreamReader(is)));
		                int groupstate = ((Long)group.get("state")).intValue();
		                int browserState = ((Long)group.get("browserState")).intValue();
		                if (browserState == Constants.TEST_CASE_FINISHED) {
		                	JAFTestRunner.instance().testComplete(curKey);
		                }
		                if (groupstate == Constants.TEST_CASE_FINISHED) {
		                    browserTestComplete.put(curKey, true);
		                    boolean success = ((Boolean)group.get("success")).booleanValue();
		                    if (!success) {
		                    	List<Map<String, Object>> results = (List<Map<String, Object>>)group.get("results");
		                    	for (Map<String, Object> result : results) {
		                    		// filter out test results 
		                    		if (!result.get("id").equals(getName())) {
		                    			continue;
		                    		}
		                    		if (!(Boolean)result.get("success")) {
		                    			if (!failureMap.containsKey(result.get("id"))) {
		                    				failureMap.put((String)result.get("id"), new ArrayList<String>());
		                    			}
		                    			failureMap.get(result.get("id")).add(curKey);
		                    		}
		                    	}
		                    }
		                } else {
		                	complete = false;
		                }
		            } catch (IOException e) {
		            	for (String key : hostBrowserKeys) {
		            		JAFTestRunner.instance().testComplete(key);
		            	}
		                throw e;
		            }
		            finally {
		                if (is != null) {try {is.close();}catch(IOException e){}}
		            }
        		}
        	}
        	if (!complete) {
        		if (runningTime >= timeout) {
        			List<String> keysTimedOut = new ArrayList<String>();
        			for (String key : hostBrowserKeys) {
        				if (!browserTestComplete.get(key)) {
        					JAFTestRunner.instance().testComplete(key);
        					keysTimedOut.add(key);
        				}
        			}
        			String timedOutString = "[ ";
        			for (int i=0; i < keysTimedOut.size(); i++) {
        				if (i > 0) {
        					timedOutString += ", ";
        				}
        				timedOutString += keysTimedOut.get(i);
        			}
        			timedOutString += " ]";
        			fail("The test timed out waiting for a result from " + timedOutString);
        		}
	        	try {
	                Thread.sleep(SLEEP_TIME);
	                runningTime += SLEEP_TIME;
	            } catch (InterruptedException e) {
	                e.printStackTrace();
	            }
        	}
        }
        
        if (failureMap.size() > 0) {
        	String failMsg = "\n      " + getName() + " failed in [ ";
        	Iterator<String> i = failureMap.get(getName()).iterator();
    		failMsg += i.next();
    		while (i.hasNext()) {
    			failMsg += ", " + i.next();
    		}
    		failMsg += " ]";
        	failMsg += "\nDetails at " + Constants.getServerURLPrefix() + "_test?testModule=" + testModule;
        	fail(failMsg);
        }
	}
	
	protected void tearDown() {
		if (this.parent == null) {
			// Remove the test results from the servlet
	        try {
	        	URL clearResultsURL = new URL(Constants.getServerURLPrefix() + "_testResults/clearResults?group=" + testModule);
	        	clearResultsURL.openStream();
	        } catch (MalformedURLException e) {
	        } catch (IOException e) {
	        }
		} else {
			this.parent.testComplete();
		}
	}
}
