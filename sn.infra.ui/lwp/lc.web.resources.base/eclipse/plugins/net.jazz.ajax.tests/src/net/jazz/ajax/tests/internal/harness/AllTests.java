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
package net.jazz.ajax.tests.internal.harness;

import junit.framework.Test;
import junit.framework.TestSuite;

public class AllTests extends TestSuite {
	public static Test suite() {
		TestSuite suite = new TestSuite();
		suite.addTest(new DohTestSuite());
		suite.addTest(new RobotTestSuite());
		suite.addTest(new RobotXTestSuite());
		return suite;
	}
}
