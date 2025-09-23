/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.social.as.util.EventedArray");

/*
 * Simple utility for handling an array that is never destroyed/replaced
 * using dojo.connect to listen to additions and removals.
 */
dojo.declare("com.ibm.social.as.util.EventedArray", [], {
	
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
		if(dojo.indexOf(this.arr, item)!==-1) {
			this.arr.splice(dojo.indexOf(this.arr, item), 1);
		}
	},
	
	replaceWith: function(newArr){
		this.notUpdating();
		// roll our own loop to avoid splice problems
		var len = this.arr.length;
		while(len--){
			if(dojo.indexOf(newArr, this.arr[len])===-1) {
				this.remove(this.arr[len]);
			}
		}
		
		dojo.forEach(newArr, function(item, index){
			if(dojo.indexOf(this.arr, item)===-1) {
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
