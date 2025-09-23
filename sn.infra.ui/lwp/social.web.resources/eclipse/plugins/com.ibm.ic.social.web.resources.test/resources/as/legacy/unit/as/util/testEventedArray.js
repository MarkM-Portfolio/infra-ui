/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/array",
	"dojo/aspect",
	"ic-as/util/EventedArray",
	"ic-test/testUtil"
], function (array, aspect, EventedArray, testUtil) {

	/**
	 * Evented Array tests.
	 */
	
	testUtil.registerGroup("unit.as.util.testEventedArray",
		[
			{
				name: "testManipulate",
				description: "Testing the array can add and subtract items",
				evArr: null,
				setUp: function(){
					this.evArr = new EventedArray();
				},
				runTest: function(){
					doh.is([], this.evArr.getArray());
					
					this.evArr.add(1);
					this.evArr.add(2);
					this.evArr.add(3);
					
					doh.t(this.compareSets([1,2,3], this.evArr.getArray()));
					
					this.evArr.remove(2);
					
					doh.is([1,3], this.evArr.getArray());
					doh.t(this.compareSets([1,3], this.evArr.getArray()));
				}
			},
			{
				name: "testNonDestructiveReplace",
				description: "Testing the array can be replaced",
				evArr: null,
				setUp: function(){
					this.evArr = new EventedArray([1,2,3]);
				},
				runTest: function(){
					doh.t(this.compareSets([1,2,3], this.evArr.getArray()));
					
					var added = [], removed = [];
					
					this.own(aspect.after(this.evArr, "add", function(item){added.push(item);}, true));
					this.own(aspect.after(this.evArr, "remove", function(item){removed.push(item);}, true));
					
					this.evArr.replaceWith([3,4,5]);
					
					doh.t(this.compareSets([3,4,5], this.evArr.getArray()));
					
					doh.t(this.compareSets([4,5], added), "check 3 wasn't re-added");
					doh.t(this.compareSets([1,2], removed));
				}
			}
		],
		function setUpGroup(){},
		function tearDownGroup(){},
		null,
		{
			// utility function for comparing arrays while ignoring order
			compareSets: function(set1, set2){
				if(set1.length!==set2.length) {
					return false;
				}
				return array.every(set1, 
						function(item){
							return array.indexOf(set2, item)!==-1
						});
			}
		}
	);
	return com.ibm.social.test.unit.as.util.testEventedArray;
});
