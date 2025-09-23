/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
	define([
		"dojo/_base/array",
		"dojo/_base/declare"
	], function (array, declare) {
	
		/*
		 * Simple utility for handling an array that is never destroyed/replaced
		 * using dojo.connect to listen to additions and removals.
		 */
		var EventedArray = declare("com.ibm.social.as.util.EventedArray", [], {
			
			arr: null,
			isUpdating: false,
			
			constructor: function(arr){
				this.arr = arr || [];
			},
			
			add: function(item, index){
				/* add an item, index is optional*/
				this.notUpdating();
				index = typeof index !== "undefined" ? index : this.arr.length;
				this.arr.splice(index, 0, item);
			},
			
			remove: function(item){
				this.notUpdating();
				if(array.indexOf(this.arr, item)!==-1) {
					this.arr.splice(array.indexOf(this.arr, item), 1);
				}
			},
			
			replaceWith: function(newArr){
				this.notUpdating();
				// roll our own loop to avoid splice problems
				var len = this.arr.length;
				while(len--){
					if(array.indexOf(newArr, this.arr[len])===-1) {
						this.remove(this.arr[len]);
					}
				}
				
				array.forEach(newArr, function(item, index){
					if(array.indexOf(this.arr, item)===-1) {
						this.add(item, index);
					}
				}, this);
			},
			
			setUpdating: function(){
				/*
				 * signals to any listeners that the array is being updated and appropriate UI should be displayed
				 * until add/remove are triggered
				 */
				this.isUpdating=true;
			},
			
			notUpdating: function(){
				this.isUpdating=false;
			},
			
			getArray: function(){
				return this.arr;
			}
		});
		return EventedArray;
	});
