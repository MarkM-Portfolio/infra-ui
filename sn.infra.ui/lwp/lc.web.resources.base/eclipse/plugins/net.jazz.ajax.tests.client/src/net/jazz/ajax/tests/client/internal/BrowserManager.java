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
package net.jazz.ajax.tests.client.internal;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * Interacts with the host operating system to launch, manipulate, and close web
 * browsers in which web UI tests will run. In the case where the test wishes to
 * run tests on multiple browsers, this class serializes each browser's launch /
 * run / close cycle so that each browser run has exclusive access to operating
 * system UI resources like the mouse cursor and the keyboard.
 * 
 * @since 1.0
 */
public class BrowserManager implements Runnable {
	private static final String PROP_BROWSER_LIST = "net.jazz.ajax.tests.client.browserList";
	private static final String BROWSER_IE = "ie";
	private static final String BROWSER_FF = "firefox";
	
	private final Map<String, Map<String, String>> browserMap = Collections.synchronizedMap(new HashMap<String, Map<String, String>>());
	private final BlockingQueue<String> pendingQueue = new LinkedBlockingQueue<String>();
	private final BlockingQueue<String> launchQueue = new ArrayBlockingQueue<String>(1);
	private final BlockingQueue<Process> processQueue = new ArrayBlockingQueue<Process>(1);
	
	private static BrowserManager instance = null;
	private static Thread instanceThread = null;
	
	public static BrowserManager instance() throws IOException {
		if (instance == null) {
			instance = new BrowserManager();
			instanceThread = new Thread(instance);
			instanceThread.start();
		}
		return instance;
	}
	
	private BrowserManager() throws IOException {
		String browsersProp = System.getProperty(PROP_BROWSER_LIST, "firefox");
		for (String curBrowser : browsersProp.split(",")) {
			String [] browserDetail = curBrowser.split(":");
			String id = browserDetail[0];
			String exec, version = null;
			if (browserDetail.length > 1) {
				exec = browserDetail[1];
				if (browserDetail.length > 2) {
					version = browserDetail[2];
				} else {
					version = "unknown";
				}
			} else {
				if (BROWSER_IE.equals(id)) {
					exec = getIEExecutable();
					try {
						version = getIEVersion();
					} catch (Exception e) {
						version = "unknown";
					}
				} else if (BROWSER_FF.equals(id)) {
					exec = getFirefoxExecutable();
					try {
						version = getFirefoxVersion();
					} catch (Exception e) {
						version = "unknown";
					}
				} else {
					throw new IOException ("Unknown browser id specified: \"" + id + "\"");
				}
			}
			Map<String, String> curMap = new HashMap<String, String>();
			curMap.put("exec", exec);
			curMap.put("version", version);
			browserMap.put(id, curMap);
		}
	}
	
	public void run() {
		while (true) {
			try {
				// Get the next browser executable that was requested
				String exec = pendingQueue.take();
				// Add the new browser executable to the launchQueue.  Since the size of launchQueue is 1,
				// this will block until the launchQueue is empty.  This ensures that only one browser is
				// launched at a time.
				launchQueue.put(exec);
				// Actually launch the browser and store the process in processQueue
				processQueue.put(Runtime.getRuntime().exec(exec));
			} catch (IOException e) {
			} catch (InterruptedException e) {
				break;
			}
		}
	}
	
	public Map<String, Map<String, String>> list() {
		return browserMap;
	}
	
	public void launch(String browser, String url) {
		String exec = getExecutable(browser, url);
		if (exec == null) {
			throw new IllegalArgumentException("Unknown browser key: " + browser);
		} else {
			pendingQueue.add(exec);
		}
	}
	
	public void close(String browser, String url) {
		// if (true ) return;
		String exec = getExecutable(browser, url);
		if (exec == null) {
			throw new IllegalArgumentException("Unknown browser key: " + browser);
		} else if (exec.equals(launchQueue.peek())) {
			try {
				if (System.getProperty("os.name").startsWith("Windows")) {
					processQueue.take().destroy();
				} else {
					// some flavors of Linux run the browser in a child process instead
					// of in the process handle that we have.  In this case, we need to
					// find the child processes and kill each one.
					Map<Integer, Integer> pidMapBefore = new HashMap<Integer, Integer>();
					Map<Integer, Integer> pidMapAfter = new HashMap<Integer, Integer>();
					String [] psCmd = {
							"/bin/sh",
							"-c",
							"ps -ef | grep " + exec.substring(0, exec.indexOf(" ")) + " | grep -v grep | sed 's/^[[:alnum:]]*[[:blank:]]*\\([[:digit:]]*\\)[[:blank:]]*\\([[:digit:]]*\\).*/\\1 \\2/g'"
					};
					try {
						// get a list of the browser processes and their parent processes
						Process ps = Runtime.getRuntime().exec(psCmd);
						BufferedReader r = new BufferedReader(new InputStreamReader(ps.getInputStream()));
						String curLine;
						while ((curLine = r.readLine()) != null) {
							String[] pids = curLine.split(" ");
							pidMapBefore.put(Integer.parseInt(pids[0]), Integer.parseInt(pids[1]));
						}
					} catch (IOException e) {}
					processQueue.take().destroy();
					try {
						Process ps = Runtime.getRuntime().exec(psCmd);
						BufferedReader r = new BufferedReader(new InputStreamReader(ps.getInputStream()));
						String curLine;
						while ((curLine = r.readLine()) != null) {
							String[] pids = curLine.split(" ");
							pidMapAfter.put(Integer.parseInt(pids[0]), Integer.parseInt(pids[1]));
						}
					} catch (IOException e) {}
					// figure out which process we killed and proceed to kill all its children
					Integer killed = null;
					for (Integer curPid : pidMapBefore.keySet()) {
						if (!pidMapAfter.containsKey(curPid)) {
							killed = curPid;
							break;
						}
					}
					if (killed != null) {
						// When the parent is killed, the child processes are re-parented, so
						// we need to use the pidMapBefore in order to get the correct PID relationships
						killChildProcesses(killed, pidMapBefore);
					}
				}
			} catch (InterruptedException e) {}
			try {
				launchQueue.take();
			} catch (InterruptedException e) {}
		} else {
			// if we get a request to close a browser that hasn't been opened yet, remove the launch from the queue
			pendingQueue.remove(exec);
		}
	}
	
	private void killChildProcesses(Integer parentPid, Map<Integer, Integer> pidMap) {
		for (Integer curPid : pidMap.keySet()) {
			if (parentPid.equals(pidMap.get(curPid))) {
				killChildProcesses(curPid, pidMap);
				try {
					Runtime.getRuntime().exec("kill -9 " + curPid);
				} catch (IOException e) {}
			}
		}
	}
	
	private String getExecutable(String browser, String url) {
		if (browserMap.containsKey(browser)) {
			return browserMap.get(browser).get("exec") + " " + url;
		} else {
			return null;
		}
	}
	
	private static String getIEExecutable() throws IOException {
		if (!System.getProperty("os.name").startsWith("Windows")) {
			throw new IOException("Unable to use IE browser on this operating system: " + System.getProperty("os.name"));
		}
		Process p = Runtime.getRuntime().exec("cmd /C dir \"\\Progra~1\\Internet Explorer\\iexplore.exe\"");
		BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
		boolean exists = true;
		String curLine;
		while ((curLine = r.readLine()) != null) {
			if (curLine.indexOf("File Not Found") >= 0) {
				exists = false;
			}
		}
		if (exists) {
			return "\\Progra~1\\Internet Explorer\\iexplore.exe";
		} else {
			throw new IOException("Unable to find firefox at \"\\Progra~1\\Internet Explorer\\iexplore.exe\"");
		}
	}
	
	private static String getIEVersion() throws IOException {
		if (!System.getProperty("os.name").startsWith("Windows")) {
			throw new IOException("Unable to use IE browser on this operating system: " + System.getProperty("os.name"));
		}
		Process p = Runtime.getRuntime().exec("reg query \"HKLM\\Software\\Microsoft\\Internet Explorer\" /v Version");
		BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
		String versionResponse = new String();
		String curLine;
		while ((curLine = r.readLine()) != null) {
			versionResponse += curLine;
		}
		return versionResponse.substring(versionResponse.indexOf("REG_SZ") + 6).trim();
	}
	
	private static String getFirefoxExecutable() throws IOException {
		if (System.getProperty("os.name").startsWith("Windows")) {
			Process p = Runtime.getRuntime().exec("cmd /C dir \"\\Progra~1\\Mozilla Firefox\\firefox.exe\"");
			BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
			boolean exists = true;
			String curLine;
			while ((curLine = r.readLine()) != null) {
				if (curLine.indexOf("File Not Found") >= 0) {
					exists = false;
				}
			}
			if (exists) {
				return "\"\\Progra~1\\Mozilla Firefox\\firefox.exe\"";
			} else {
				throw new IOException("Unable to find firefox at \"\\Progra~1\\Mozilla Firefox\\firefox.exe\"");
			}
		} else {
			Process p = Runtime.getRuntime().exec("which firefox");
			BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
			if (r.readLine() != null) {
				return "firefox";
			} else {
				throw new IOException("Unable to find firefox browser.");
			}
		}
	}
	
	private static String getFirefoxVersion() throws IOException {
		Process p = Runtime.getRuntime().exec(getFirefoxExecutable() + " -version");
		BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
		return r.readLine().trim();
	}
}
