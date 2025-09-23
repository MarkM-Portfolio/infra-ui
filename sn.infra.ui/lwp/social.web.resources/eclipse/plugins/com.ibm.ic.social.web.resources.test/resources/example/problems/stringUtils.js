/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
	"dojo/_base/array"
], function (array) {

	com.ibm.social.test.example.problems.stringUtils = {
		add : function(/*String */ nums){
			var splitters = [",", "\n"], customSplitters,
				regout = nums.match(/^\/\/([^\n]*)\n([\s\S]*)$/);
			if(regout) {
				customSplitters = regout[1];
				if(customSplitters.length>1) {
					splitters = splitters.concat(customSplitters.substring(1, customSplitters.length-1).split("]["));
				}
				else {
					splitters.push(customSplitters);
				}
				nums = regout[2];
			}
			nums = this.splitOnAll([nums], splitters);
			var sum = 0;
			var errorNums = [];
			array.forEach(nums, function(num){
				num = +num;
				if(num<0) {
					errorNums.push(num);
				} else if(num>1000) {
					num = 0;
				}
				sum += num;
			});
			if(errorNums.length>0) {
				throw {"message":"negative numbers are not allowed. problem numbers : " + errorNums};
			}
			return sum;
		},
		splitOnAll: function(strArray, splitters){
			var splitter;
			while (splitter = splitters.pop()) {
				strArray = this.flattenArray(
				array.map(strArray, function(str){
					return str.split(splitter);
				}));
			}
			return strArray;
		},
		flattenArray: function(arr, accumulator) {
			accumulator = accumulator || [];
			array.forEach(arr, function(elem){
				if(elem instanceof Array) {
					this.flattenArray(elem, accumulator);
				} else {
					accumulator.push(elem);
				}
			}, this);
			return accumulator;
		}
	};
	return com.ibm.social.test.example.problems.stringUtils;
});
