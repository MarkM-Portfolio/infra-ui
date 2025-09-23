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
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
dojo.provide("net.jazz.ajax.tests.util");

net.jazz.ajax.tests.util.dfdIs = function (dfd, expectedValue, actualValue) {
	if (expectedValue != actualValue) {
		dfd.errback("Failure: was expecting '" + expectedValue + "', but got '" + actualValue + "'");
		return false;
	}
	return true;
}

net.jazz.ajax.tests.util.dfdT = function (dfd, actualValue) {
	if (!actualValue) {
		dfd.errback("Failure: was expecting 'true', but got '" + actualValue + "'");
		return false;
	}
	return true;
}

net.jazz.ajax.tests.util.dfdF = function (dfd, actualValue) {
	if (actualValue) {
		dfd.errback("Failure: was expecting 'false', but got '" + actualValue + "'");
		return false;
	}
	return true;
}
