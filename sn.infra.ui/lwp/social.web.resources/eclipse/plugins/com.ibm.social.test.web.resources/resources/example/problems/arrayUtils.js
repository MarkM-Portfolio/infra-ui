/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.homepage.tests.example.problems.arrayUtils");

com.ibm.social.test.example.problems.arrayUtils = {
	removeDuplicates : function(/* Array */arr){
		// returns new array with duplicates removed
		// does not alter original array
		var returnArr = [];
		dojo.forEach(arr, function(elem){
			if(!dojo.some(returnArr, function(addedElem){
				return this.isEqual(elem, addedElem);
			}, this)) {
				returnArr.push(elem);
			}
		}, this);
		return returnArr;
	},
	isEqual: function(val1, val2){
		return val1 == val2;
	}
};