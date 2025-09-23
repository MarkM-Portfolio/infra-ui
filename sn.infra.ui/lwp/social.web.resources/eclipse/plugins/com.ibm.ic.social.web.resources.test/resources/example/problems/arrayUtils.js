/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array"
], function (array) {

	com.ibm.social.test.example.problems.arrayUtils = {
		removeDuplicates : function(/* Array */arr){
			// returns new array with duplicates removed
			// does not alter original array
			var returnArr = [];
			array.forEach(arr, function(elem){
				if(!array.some(returnArr, function(addedElem){
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
	return lconn.homepage.tests.example.problems.arrayUtils;
});
