/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.upload.doh.FileList");

dojo.require("doh.runner");
dojo.require("lconn.core.upload.data.File");
dojo.require("lconn.core.upload.data.FileList");

dojo.declare("lconn.test.upload.doh.FileListFixture", null, {
	constructor: function(opts) {
		dojo.mixin(this, opts);
		
		if (!dojo.isFunction(this.testFunction)) {
			this.runTest = function() {
				doh.f(true, "You must pass a testFunction property that is a function!");
			}
		} else {
			var this_ = this;
			this.runTest = function runTest() {
				var dfd = new doh.Deferred();
				
				this_.testFunction();
				
				setTimeout(function() {
					dfd.callback(true);
				}, 1);
				
				return dfd;
			};
		}
		
		this._connects = [];
	},
	
	setUp: function() {
		this.fileList = new lconn.core.upload.data.FileList(this);
	},
	
	connect: function() {
		var a = arguments;
		a[3] = a.length > 3 ? a[3]: undefined;	
		this._connects.push(dojo.connect(a[0], a[1], a[2], a[3]));
	},
	
	tearDown: function() {
		dojo.forEach(this._connects, dojo.disconnect);
		this.fileList = null;
	}
});

(function() {
	
	var Fixture = lconn.test.upload.doh.FileListFixture;
	
	doh.register("lconn.test.upload.doh.FileList", [
	   new Fixture({
		   name: "testAddFile",
		   testFunction: function() {
			   var file = new lconn.core.upload.data.File({}, "myfilename.txt");
			   this.fileList.addFiles([file]);
			   
			   doh.is(1, this.fileList.count());
			   
			   var newFile = this.fileList.getFileByIndex(0);
			   doh.is(this.fileList, newFile.getOwningList());
			   doh.is("myfilename.txt", newFile.getName());
			   doh.is("txt", newFile.getExtension());
			   doh.t(newFile.isEnabled());
			   doh.f(newFile.hasInvalidChars());
		   }
	   }),
	   
	   new Fixture({
		   name: "testRemoveFile",		   
		   testFunction: function() {
			   var file = new lconn.core.upload.data.File({}, "myfilename.txt");
			   this.fileList.addFiles([file]);
			   
			   doh.is(1, this.fileList.count());
			   this.fileList.removeFile(0);
			   
			   doh.is(0, this.fileList.count());
		   }
	   }),
	   
	   new Fixture({
		   name: "testEvents",
		   testFunction: function() {
			   var propChanges = []; 
			   var statusChanges = [];
			   
			   var count = 0;
			   var changeCount = 0;
			   
			   this.connect(this.fileList, "onFileAdded", function() { ++count; });
			   this.connect(this.fileList, "onFileRemoved", function() { --count; });
			   this.connect(this.fileList, "onListChanged", function() { ++changeCount; });
			   this.connect(this.fileList, "onPropertyChange", function(file, property, oldV, newV) { propChanges.push(property); });
			   this.connect(this.fileList, "onSetStatus", function(f, status) { statusChanges.push(status.id); });
			   this.connect(this.fileList, "onClearStatus", function(f, status) { 
				  var idx = dojo.indexOf(statusChanges, status.id);
				  if (idx != -1) {
					  statusChanges.splice(idx, 1);
				  }
			   });
			   
			   var file = new lconn.core.upload.data.File({}, "myfilename.txt");
			   this.fileList.addFiles([file]);
			   
			   doh.is(1, count);
			   doh.is(1, changeCount);
			   
			   file = this.fileList.getFileByIndex(0);
			   file.setName("i&nvalidName.Txt>");
			   
			   doh.isNot(-1, dojo.indexOf(propChanges, "name"));
			   doh.isNot(-1, dojo.indexOf(propChanges, "hasInvalidChars"));
			   doh.is(2, propChanges.length);
			   doh.is(2, statusChanges.length);
			   
			   file.setName("validname.txt");
			   doh.is(4, propChanges.length);
			   doh.isNot(-1, dojo.indexOf(propChanges, "name", 2));
			   doh.isNot(-1, dojo.indexOf(propChanges, "hasInvalidChars", 2));
			   
			   doh.is(2, statusChanges.length);
			   
			   propChanges = [];
			   
			   this.fileList._setMaxFilenameLength(20);
			   file.setName("12345678901234567890.txt");
			   doh.is(2, propChanges.length);
			   doh.is(4, statusChanges.length);
			   
			   file.setName("1234567890.txt");
			   doh.is(4, propChanges.length);
			   doh.is(4, statusChanges.length);
			   
			   file.setName("124567890123456789>.txt");
			   doh.is(7, propChanges.length);
			   doh.is(7, statusChanges.length);
			   
			   file.setName("123456789>.txt");
			   doh.is(9, propChanges.length);
			   doh.is(7, statusChanges.length);
			   
			   file.setName("123456789.txt");
			   doh.is(11, propChanges.length);
			   doh.is(7, statusChanges.length);
			   
			   this.fileList._setMaxFilenameLength(0);
			   file.setName("123456789012345678912345678901234567890234567890.txt");
			   doh.is(12, propChanges.length);
			   doh.is(8, statusChanges.length);
			   
			   this.fileList.removeFile(0);
			   
			   doh.is(0, count);
			   doh.is(2, changeCount);			
		   }
	   })
	]); 
})();
