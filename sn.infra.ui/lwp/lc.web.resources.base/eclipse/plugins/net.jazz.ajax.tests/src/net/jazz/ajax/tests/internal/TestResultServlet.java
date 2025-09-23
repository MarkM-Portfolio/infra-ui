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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.sistdase.json.JSONSerializer;

import java.util.Iterator;

public class TestResultServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String TEXT_JSON = "text/json"; //$NON-NLS-1$
	
	private static final Map<String, TestResultData> testResultMap = Collections.synchronizedMap(new HashMap<String, TestResultData>());
	private static final Map<String, TestGroup> testGroupMap = Collections.synchronizedMap(new HashMap<String, TestGroup>());
	private static final Object lock = new Object();

	protected void doGet(HttpServletRequest request, HttpServletResponse response)	throws ServletException, IOException {
		String command = request.getPathInfo().substring(1);
		Map<String, Object> group = new HashMap<String, Object>();
		if (command.equals("results")) {
			TestGroup testGroup = testGroupMap.get(request.getParameter("group"));
			if (testGroup != null) {
				String key = request.getParameter("key");
				if (testGroup.state == Constants.TEST_CASE_FINISHED) {
					List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
					group.put("results", results);
					group.put("id", testGroup.id);
					group.put("success", Boolean.valueOf(testGroup.success));
					group.put("state", Integer.valueOf(testGroup.state));
					if (testGroup.browserStateMap.get(key) != null) {
						group.put("browserState", testGroup.browserStateMap.get(key));
					} else {
						group.put("browserState", Constants.TEST_CASE_UNREGISTERED);
					}
					List<String> testList = testGroup.tests;
					for (Iterator<String> itr = testList.iterator(); itr.hasNext();) {
						Map<String, Object> result = new HashMap<String, Object>();
						String id = (String)itr.next();
						TestResultData testResultData = testResultMap.get(id + ":" + request.getParameter("key"));
						if (testResultData != null) {
							result.put("id", testResultData.id);
							result.put("group", testResultData.group);
							result.put("success", Boolean.valueOf(testResultData.success));
							result.put("state", Integer.valueOf(testResultData.state));
							List<String> debugArray = new ArrayList<String>();
							for (Iterator<String> itr2 = testResultData.debug.iterator(); itr2.hasNext();) {
								String msg = itr2.next();
								debugArray.add(msg);
							}
							result.put("debug", debugArray);
						}
						results.add(result);
					}
				} else {
					group.put("results", new ArrayList<Map<String, Object>>());
					group.put("id", request.getParameter("group"));
					group.put("success", Boolean.FALSE);
					group.put("state", testGroup.state);
					if (testGroup.browserStateMap.get(key) != null) {
						group.put("browserState", testGroup.browserStateMap.get(key));
					} else {
						group.put("browserState", Constants.TEST_CASE_UNREGISTERED);
					}
				}
			}
			else {
				group.put("results", new ArrayList<Map<String, Object>>());
				group.put("id", request.getParameter("group"));
				group.put("success", Boolean.FALSE);
				group.put("state", Integer.valueOf(Constants.TEST_CASE_UNREGISTERED));
				group.put("browserState", Integer.valueOf(Constants.TEST_CASE_UNREGISTERED));
			}
		} else if (command.equals("clearResults")) {
			TestGroup testGroup = testGroupMap.get(request.getParameter("group"));
			List<String> testList = testGroup.tests;
			for (String curTestId : testList) {
				testResultMap.remove(curTestId);
			}
			testGroupMap.remove(request.getParameter("group"));
			testGroup.state = Constants.TEST_CASE_UNREGISTERED;
		}
		response.setContentType(TEXT_JSON);
		JSONSerializer.serialize(response.getWriter(), group, true);
	}

	/*
	 * We have no control over the order in which dojo.doh state transitions are received for test cases and test groups.
	 * For example, we need to consider the possibility that a testStart might be received before a registerTest
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response)	throws ServletException, IOException {
		String[] segments = getSegments(request.getPathInfo());
		String command = segments[0];
		synchronized (lock) {
			if (command.equals("registerTest")) {
				// make sure the group has been initialized
				String groupName = request.getParameter("group");
				TestGroup testGroup = (TestGroup)testGroupMap.get(groupName);
				if (testGroup == null) {
					testGroup = createTestGroup(groupName);
				}
				if (!testGroup.tests.contains(segments[1])) {
					testGroup.tests.add(segments[1]);
				}
				
				// check if the test result data has been initialized
				TestResultData testResultData = testResultMap.get(segments[1] + ":" + request.getParameter("key"));
				if (testResultData == null) {
					testResultData = createTestResult(segments[1], request.getParameter("key"));
					testResultData.state = Constants.TEST_CASE_REGISTERED;
				}
				testResultData.group = groupName;
				testResultMap.put(testResultData.id + ":" + testResultData.browser, testResultData);
			} else if (command.equals("testStart")) {
				TestResultData testResultData = testResultMap.get(segments[1] + ":" + request.getParameter("key"));
				if (testResultData == null) {
					testResultData = createTestResult(segments[1], request.getParameter("key"));
					testResultData.state = Constants.TEST_CASE_STARTED;
				} else if (testResultData.state != Constants.TEST_CASE_FINISHED) {
					testResultData.state = Constants.TEST_CASE_STARTED;
				}
			} else if (command.equals("testFinish")) {
				TestResultData testResultData = testResultMap.get(segments[1] + ":" + request.getParameter("key"));
				if (testResultData == null) {
					testResultData = createTestResult(segments[1], request.getParameter("key"));
				}
				testResultData.success = Boolean.valueOf(request.getParameter("success"));
				testResultData.state = Constants.TEST_CASE_FINISHED;
			} else if (command.equals("groupStart")) {
				TestGroup testGroup = (TestGroup)testGroupMap.get(segments[1]);
				String key = request.getParameter("key");
				Integer numTesters = Integer.parseInt(request.getParameter("numTesters"));
				if (testGroup == null) {
					testGroup = createTestGroup(segments[1]);
					testGroup.state = Constants.TEST_CASE_STARTED;
				} else if (testGroup.state != Constants.TEST_CASE_FINISHED) {
					testGroup.state = Constants.TEST_CASE_STARTED;
				}
				testGroup.numTesters = numTesters;
				if (testGroup.browserStateMap.get(key) == null || testGroup.browserStateMap.get(key) != Constants.TEST_CASE_FINISHED) {
					testGroup.browserStateMap.put(key, Constants.TEST_CASE_STARTED);
				}
			} else if (command.equals("groupFinish")) {
				TestGroup testGroup = (TestGroup)testGroupMap.get(segments[1]);
				String key = request.getParameter("key");
				if (testGroup == null) {
					testGroup = createTestGroup(segments[1]);
				}
				// can change group success status from true to false, but not the other way around
				if (testGroup.success) {
					testGroup.success = Boolean.valueOf(request.getParameter("success"));
				}
				testGroup.browserStateMap.put(key, Constants.TEST_CASE_FINISHED);
				int finished = 0;
				for (String curKey : testGroup.browserStateMap.keySet()) {
					if (testGroup.browserStateMap.get(curKey).equals(Constants.TEST_CASE_FINISHED)) {
						finished++;
					}
				}
				if (testGroup.numTesters.equals(finished)) {
					testGroup.state = Constants.TEST_CASE_FINISHED;
				}
			}
		}
		
		response.setContentType(TEXT_JSON);
		Map<String, String> status = new HashMap<String, String>();
		status.put("status", "complete");
		JSONSerializer.serialize(response.getWriter(), status, true);
	}
	
	private TestGroup createTestGroup(String id) {
		TestGroup testGroup = new TestGroup();
		testGroup.id = id;
		testGroup.tests = new ArrayList<String>();
		testGroupMap.put(id, testGroup);
		return testGroup;
	}
	
	private TestResultData createTestResult(String id, String browser) {
		TestResultData testResultData = new TestResultData();
		testResultData.id = id;
		testResultData.browser = browser;
		testResultData.debug = new ArrayList<String>();
		testResultMap.put(testResultData.id + ":" + testResultData.browser, testResultData);
		return testResultData;
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)	throws ServletException, IOException {
		String[] segments = getSegments(request.getPathInfo());
		String command = segments[0];
		if (command.equals("debug")) {
			TestResultData testResultData = (TestResultData) testResultMap.get(segments[1] + ":" + request.getParameter("key"));
			if (testResultData != null) {
				testResultData.debug.add(request.getParameter("msg"));
			}
		}
		response.setContentType(TEXT_JSON);
		Map<String, String> status = new HashMap<String, String>();
		status.put("status", "complete");
		JSONSerializer.serialize(response.getWriter(), status, true);
	}
	
	private static String[] getSegments(String pathInfo) {
		String[] segments = null;
		
		StringTokenizer st = new StringTokenizer(pathInfo, "/");
		segments = new String[st.countTokens()];
		int i = 0;
		while (st.hasMoreTokens()) {
			segments[i++] = st.nextToken();
		}
		return segments;
	}
	
	class TestResultData {
		public String id = null;
		public String group = null;
		public boolean success = false;
		public List<String> debug = null;
		public int state = Constants.TEST_CASE_UNREGISTERED;
		public String browser = null;
	}
	
	class TestGroup {
		public String id = null;
		public List<String> tests = null;
		public Map<String, Integer> browserStateMap = new HashMap<String, Integer>();
		public boolean success = true;
		public int state = Constants.TEST_CASE_UNREGISTERED;
		public Integer numTesters = null;
	}
}
