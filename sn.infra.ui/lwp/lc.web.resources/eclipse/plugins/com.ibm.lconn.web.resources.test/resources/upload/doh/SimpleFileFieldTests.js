/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.upload.doh.SimpleFileFieldTests");

dojo.require("doh.runner");
dojo.require("dijit._base.scroll");
dojo.require("lconn.core.upload.FileField");


(function() {
	
	var remoteCheck = function(fileName) {
		var dfd = new dojo.Deferred();
		
		// have a random 100 - 300 ms delay
		var timeout = 100 + (Math.random() * 200);
		
		dfd.addBoth(function() { return /remote/i.test(fileName); });
		setTimeout(function() { dfd.callback(); }, timeout);
		
		return dfd;
	};
	
	dojo.declare("lconn.test.upload.doh.FileFieldTestsFixture", null, {
		constructor: function(opts) {
			dojo.mixin(this, opts);
			
			if (!dojo.isFunction(this.testFunction)) {
				this.runTest = function() {
					doh.f(true, "You must pass a testFunction property that is a function!");
				}
			} else {
				
				var this_ = this;
				this.runTest = function runTest() {
					var d = new doh.Deferred();
					this_.testFunction();		
					
					if (!this.isLast) {
						setTimeout(function() {
							// firing this makes the next test fire
							d.callback(true); 
						}, 1);
					} else {
						var button = dojo.byId('finishButton');
						
						this_.sequence(function() {
							dijit.scrollIntoView(button);
						}, 1);
						
						var timeout = setTimeout(function() {
							d.callback(true);
						}, 999998);
						
						var connect = dojo.connect(button, 'onclick', function() {
							clearTimeout(timeout);
							dojo.disconnect(connect);
							d.callback(true);
						});
					}
					return d;
				};
			}
			
			this._time = 0;
			this._connects = [];
			this.timeout = 999999;
		},
		
		setUp: function() {		
			var srcNode = dojo.byId(this.getShortName());
			dijit.scrollIntoView(srcNode);
			
			var args = dojo.mixin({}, this);
			dojo.mixin(args, { remoteFileExists: remoteCheck, maxFileLength: 50 });
			this.widget = new lconn.core.upload.FileField(args, srcNode);
			
			var button = dojo.byId('finishButton');
			button.disabled = !this.isLast;
		},
			
		getShortName: function() {
			if (!this._shortName) {
				var idx = this.name.lastIndexOf("::");
				if (idx >= 0 && idx < this.name.length - 2) {
					this._shortName = this.name.substring(idx + 2);
				} else {
					this._shortName = this.name;
				}
			}
			
			return this._shortName;
		},
		
		connect: function() {
			var a = arguments;
			a[3] = a.length > 3 ? a[3]: undefined;	
			this._connects.push(dojo.connect(a[0], a[1], a[2], a[3]));
		},
		
		sequence: function(callback, timeout) {
			/*
			 * Using a cumulative timeout value for setTimeout calls gives the impression
			 * that each callback specified in this.sequence is called sequentially, because 
			 * setTimeouts can be run in parallel
			 */		
			this._time += Math.max(timeout, 1);
			setTimeout(callback, this._time);
		},
		
		tearDown: function() {
			dojo.forEach(this._connects, dojo.disconnect);
		}
	});
		
	var Fixture = lconn.test.upload.doh.FileFieldTestsFixture;
	
	doh.register("lconn.test.upload.doh.SimpleFileFieldTests", [
	   new Fixture({
		   name: "testAddFile",
		   testFunction: function() {
			   var this_ = this;
			   this.sequence(function() {
				   var list = this_.widget.getFileList();
				   var file = new lconn.core.upload.data.File({}, "myfilename.txt");
				   
				   list.addFiles([file]);
			   }, 1000);
		   }
	   }),
	   
	   new Fixture({
		   name: "testRemoveFile",		   
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   this.sequence(function() {
				   var file = new lconn.core.upload.data.File({}, "myfilename.txt");				   
				   list.addFiles([file]);
			   }, 1);
			   
			   this.sequence(function() {
				   list.removeFile(0); 
			   }, 1000);
		   }
	   }),
	   
	   new Fixture({
		   name: "testRename",
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   list.allowRename = true;
			   this.sequence(function() {
				   var file = new lconn.core.upload.data.File({}, "myfilename.txt");				   
				   list.addFiles([file]);
			   }, 1);
			   
			   this.sequence(function() {
				   var file = list.getFileByIndex(0);
				   file.setName("myNEWfilename.txt");
			   }, 500);
		   }
	   }),
	   
	   new Fixture({
		   name: "testRemoteDuplicateNoActions",
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   
			   
			   this.sequence(function() {
				   var file = new lconn.core.upload.data.File({}, "remoteDuplicate.txt");
				   list.addFiles([file]);
			   }, 1);
		   }
	   }),
	   
	   new Fixture({
		   name: "testRemoteDuplicateAllowReplace",
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   
			   list.allowReplace = true;
			   
			   this.sequence(function() {
				   var file = new lconn.core.upload.data.File({}, "remoteDuplicate.txt");
				   list.addFiles([file]);
			   }, 1);
			   
			   this.sequence(function() {
				   var file = list.getFileByIndex(0);
				   file.Actions.REPLACE.execute(file);
			   }, 1000);
		   }
	   }),
	   
	   new Fixture({
		   name: "testRemoteDuplicateAllowRename",
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   
			   list.allowRename = true;
			   
			   this.sequence(function() {
				   var file = new lconn.core.upload.data.File({}, "remoteDuplicate.txt");
				   list.addFiles([file]);
			   }, 1);
			   
			   var this_ = this;
			   var fileWidget = null;
			   this.sequence(function() {
				   var file = list.getFileByIndex(0);
				   file.Actions.RENAME.execute(file);
				   
				   fileWidget = this_.widget.getUIWidget()._findFileWidget(file);				   
			   }, 1000);
			   
			   this.sequence(function() {
				   if (fileWidget) {
					   fileWidget.nameInput.value = "validName";
					   fileWidget.nameInput.blur();
				   }
			   }, 500);
		   }
	   }),
	   
	   new Fixture({
		   name: "testRemoteDuplicateAllowBoth",
		   
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   
			   list.allowReplace = true;
			   list.allowRename = true;
			   
			   this.sequence(function() {
				   var file = new lconn.core.upload.data.File({}, "remoteDuplicate.txt");
				   list.addFiles([file]);
			   }, 1);
		   }
	   }),
	   
	   new Fixture({
		   name: "testInvalidCharacters",
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   list.allowRename = true;
			   
			   var file = null;
			   this.sequence(function() {
				   file = new lconn.core.upload.data.File({}, "i:nvalid.txt");
				   list.addFiles([file]);
				   
				   file = list.getFileByIndex(0);
			   }, 1);
			   
			   this.sequence(function() {
				   file.setName("inv>alid.txt");
			   }, 500);
			   
			   this.sequence(function() {
				   file.Actions.REPLACE_INVALID.execute(file);
			   }, 500);
			   
			   this.sequence(function() {
				   file.Actions.REVERT.execute(file);
			   }, 1000);
		   }
	   }),
	   
	   new Fixture({
		   name: "testLongFilename",
		   isLast: false,
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   list.allowRename = true;
			   list.maxFileLength = 40;
			   
			   var file = null;
			   this.sequence(function() {
				   file = new lconn.core.upload.data.File({}, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678.zip");
				   list.addFiles([file]);
				   
				   file = list.getFileByIndex(0);
			   }, 1);
			   
			   this.sequence(function() {
				   file.Actions.TRUNCATE.execute(file);
			   }, 1000);
		   }
	   }),
	   
	   new Fixture({
		   name: "testLongInvalidDuplicate",
		   isLast: false,
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   list.allowRename = true;
			   list.maxFileLength = 10;
			   
			   var file = null;
			   this.sequence(function() {
				   file = new lconn.core.upload.data.File({}, "remoteInvalid*.doc");
				   list.addFiles([file]);				  
			   }, 1);			   			   
		   }
	   }),
	   
	   new Fixture({
		   name: "testLongDBCS",
		   isLast: false,
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   list.allowRename = true;
			   list.maxFileLength = 10;
			   
			   var file = null;
			   this.sequence(function() {
				   file = new lconn.core.upload.data.File({}, "\u7e7c\u7e8c\u8655\u7406\u6a94\u6848.xls");
				   list.addFiles([file]);				   
			   }, 1);			   
		   }
	   }),
	   
	   new Fixture({
		   name: "testAllRTL",
		   isLast: false,
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   list.allowRename = true;
			   
			   var file = null;
			   this.sequence(function() {
				   file = new lconn.core.upload.data.File({}, "\u05e7\u05d1\u05e6\u05d9\u05dd");
				   list.addFiles([file]);				   				
			   }, 1);
			   
		   }
	   }),
	   
	   new Fixture({
		   name: "testMixedDir",
		   isLast: true,
		   testFunction: function() {
			   var list = this.widget.getFileList();
			   list.allowRename = true;
			   
			   var file = null;
			   this.sequence(function() {
				   file = new lconn.core.upload.data.File({}, "\u05e7\u05d1\u05e6\u05d9\u05dd.jpg");
				   list.addFiles([file]);				   				
			   }, 1);
			   
		   }
	   })
	]); 
})();
