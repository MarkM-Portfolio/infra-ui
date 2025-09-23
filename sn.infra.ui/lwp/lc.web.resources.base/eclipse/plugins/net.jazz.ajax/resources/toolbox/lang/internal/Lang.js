/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2005, 2014                                    */
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
dojo.provide("net.jazz.ajax.toolbox.lang.internal.Lang");

(function() {  // module container

/**
 * Raise an error if the specified is null.
 *
 * @param value		value to check
 * @param valueName	(optional) the name of this value to report at error time
 */
function checkNotNull(value, valueName) {
	if(value != null) { return; }
	
	if(valueName) {
		throw new Error(valueName + " cannot be null");
	}

	throw new Error("value cannot be null");
}

net.jazz.ajax.toolbox.lang.checkNotNull = checkNotNull;

/**
 * Raise an error if the specified string is not a non-empty string.
 * Raises an error if the specified value is null or not a string.
 * 
 * @param value		string to check
 * @param valueName	(optional) the name of this string to report at error time
 */
 function checkNotEmpty(value, valueName) {
 	if(!(dojo.trim(value).length == 0)) { return; }
 	
 	if(valueName) {
 		throw new Error(valueName + " must be a non-empty string.  Saw: " + value);
 	}
 	
 	throw new Error("value must be a non-empty string.  Saw: " + value);
 }
 
net.jazz.ajax.toolbox.lang.checkNotEmpty = checkNotEmpty;

})();