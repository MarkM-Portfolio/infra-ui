/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2012                                    */
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

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.FunctionObject;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

public class TestModuleParser {
	private static final String PARSER_INSTANCE = "ParserInstance";
	private List<String> testCases = new ArrayList<String>();
	
	//  Variable to store the sum of all of the individual test timeouts.
	private static long aggregateTimeout = 0;	
	
	public TestModuleParser() {
	}
	
	public void parse(String jsString) {
		aggregateTimeout = 0;
		testCases = new ArrayList<String>();
		Context ctx = Context.enter();
		ScriptableObject scope = ctx.initStandardObjects();
		updateScope(scope);
		ctx.evaluateString(scope, jsString, "testModule.js", 1, null);
	}
	
	public String[] getTestCases() {
		return testCases.toArray(new String[testCases.size()]);
	}
	
	public void addTestCase(String testName) {
		testCases.add(testName);
	}
	
	private void updateScope(ScriptableObject scope) {
		scope.associateValue(PARSER_INSTANCE, this);
		setupDojo(scope);
		setupDoh(scope);
	}
	
	private void setupDojo(ScriptableObject scope) {
		ScriptableObject dojo = getScriptableObj();
		try {
			Method createNS = TestModuleParser.class.getDeclaredMethod("createNS", new Class[]{Context.class, Scriptable.class, Object[].class, Function.class});
			FunctionObject f1 = new FunctionObject("provide", createNS, scope);
			dojo.defineProperty("provide", f1, ScriptableObject.DONTENUM);
			FunctionObject f2 = new FunctionObject("require", createNS, scope);
			dojo.defineProperty("require", f2, ScriptableObject.DONTENUM);
			
			Method stub = TestModuleParser.class.getDeclaredMethod("stub", new Class[]{Context.class, Scriptable.class, Object[].class, Function.class});
			FunctionObject moduleUrl = new FunctionObject("moduleUrl", stub, scope);
			dojo.defineProperty("moduleUrl", moduleUrl, ScriptableObject.DONTENUM);
			
			Method dojoDeclare = TestModuleParser.class.getDeclaredMethod("dojoDeclare", new Class[]{Context.class, Scriptable.class, Object[].class, Function.class});
			FunctionObject f3 = new FunctionObject("declare", dojoDeclare, scope);
			dojo.defineProperty("declare", f3, ScriptableObject.DONTENUM);
		} catch (NoSuchMethodException e) {
		} catch (SecurityException e) { }
		scope.defineProperty("dojo", dojo, ScriptableObject.DONTENUM);
	}
	
	private void setupDoh(ScriptableObject scope) {
		ScriptableObject doh = getScriptableObj();
		try {
			Method register = TestModuleParser.class.getDeclaredMethod("register", new Class[]{String.class, NativeArray.class});
			FunctionObject registerFunc = new FunctionObject("register", register, scope);
			doh.defineProperty("register", registerFunc, ScriptableObject.DONTENUM);
			Method registerTest = TestModuleParser.class.getDeclaredMethod("registerTest", new Class[]{String.class, NativeObject.class});
			FunctionObject registerTestFunc = new FunctionObject("registerTest", registerTest, scope);
			doh.defineProperty("registerTest", registerTestFunc, ScriptableObject.DONTENUM);
			Method registerTests = TestModuleParser.class.getDeclaredMethod("registerTests", new Class[]{String.class, NativeArray.class});
			FunctionObject registerTestsFunc = new FunctionObject("registerTests", registerTests, scope);
			doh.defineProperty("registerTests", registerTestsFunc, ScriptableObject.DONTENUM);
			Method stub = TestModuleParser.class.getDeclaredMethod("stub", new Class[]{Context.class, Scriptable.class, Object[].class, Function.class});
			FunctionObject runFunc = new FunctionObject("run", stub, scope);
			doh.defineProperty("run", runFunc, ScriptableObject.DONTENUM);
		} catch (NoSuchMethodException e) {
		} catch (SecurityException e) { }
		scope.defineProperty("doh", doh, ScriptableObject.DONTENUM);
	}
	
	public static void createNS(Context cx, Scriptable thisObj, Object[] args, Function funObj) {
		ScriptableObject scope = (ScriptableObject)funObj.getParentScope();
		if (args.length == 1) {
			createNS(scope, args[0].toString());
		}
	}
	
	private static void createNS(ScriptableObject scope, String ns) {
		ScriptableObject curObj = scope;
		String[] nsParts = ns.split("\\.");
		for (String curPart : nsParts) {
			if (ScriptableObject.getProperty(curObj, curPart) == Scriptable.NOT_FOUND) {
				ScriptableObject newObj = new NativeObject();
				curObj.defineProperty(curPart, newObj, ScriptableObject.DONTENUM);
				newObj.defineProperty("__NAME", curPart, ScriptableObject.DONTENUM);
				curObj = newObj;				
			} else {
				curObj = (ScriptableObject)ScriptableObject.getProperty(curObj, curPart);
			}
		}
	}
	
	public static void dojoDeclare(Context cx, Scriptable thisObj, Object[] args, Function funObj) {
		ScriptableObject scope = (ScriptableObject)funObj.getParentScope();
		if (args.length == 3) {
			boolean isTestModule = false;
			NativeArray superClasses = (NativeArray)args[1];
			NativeObject objDef = (NativeObject)args[2];
			for (int i=0; i < superClasses.getLength(); i++) {
				ScriptableObject curSuper = (ScriptableObject)superClasses.get(i, superClasses);
				if (ScriptableObject.getProperty(curSuper, "__NAME").toString().indexOf("SimpleTestRunner") != -1) {
					isTestModule = true;
					continue;
				}
			}
			if (isTestModule) {
				Function registerTests = (Function)ScriptableObject.getProperty(objDef, "registerTests");
				if (registerTests != null) {
					ScriptableObject registerTestsThis = getScriptableObj();
					registerTests.call(cx, scope, registerTestsThis, new Object[]{});
				}
			}
		}
	}
	
	public static Object register(String module, NativeArray testCases) {
		for (int i=0; i < testCases.getLength(); i++) {
			addTestToSuite((NativeObject)testCases.get(i, null), (ScriptableObject)testCases.getParentScope());
		}
		return new Object();
	}
	
	public static Object registerTest(String group, NativeObject testCase) {
		addTestToSuite(testCase, (ScriptableObject)testCase.getParentScope());
		return new Object();
	}
	
	public static Object registerTests(String group, NativeArray testCases) {
		for (int i=0; i < testCases.getLength(); i++) {
			addTestToSuite((NativeObject)testCases.get(i, null), (ScriptableObject)testCases.getParentScope());
		}
		return new Object();
	}
	
	public static void stub(Context cx, Scriptable thisObj, Object[] args, Function funObj) {}
	
	public static void addTestToSuite(NativeObject testObj, ScriptableObject scope) {
		String testName = (String)testObj.get("name", null);
		//  Its unlikely that a test will have an undefined timeout, but its
		//  worth checking here just to be safe
		int thisTestDeclaredTimeout = (testObj.has("timeout", null)) ? (Integer)testObj.get("timeout", null): 0;		
		aggregateTimeout += thisTestDeclaredTimeout;		
		TestModuleParser curParser = (TestModuleParser)scope.getAssociatedValue(PARSER_INSTANCE);
		curParser.addTestCase(testName);
	}
	
	private static ScriptableObject getScriptableObj() {
		return new ScriptableObject() {
			private static final long serialVersionUID = 1L;
			public String getClassName() {
				return null;
			}
		};
	}
	
	public static long getAggregateTimeout(){
		return  aggregateTimeout;
	}	
}