define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on"
], function (array, declare, lang, on) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	/**
	 * Manages uploading files
	 * 
	 * @class ic-core.upload.util.UploadManager
	 */
	var UploadManager = declare("lconn.core.upload.util.UploadManager", null, /** @lends ic-core.upload.util.UploadManager.prototype */ {
		
		constructor: function(fileArray, controller) {
			this.fileArray = fileArray;
			this.controller = controller;
			this.checkProgress = controller.checkProgress;
			this.checkProgressInterval = controller.checkProgressInterval || 10000;
			
			this.currentFile = null;
			
			this._completedFiles = [];
			
			this._connects = [];
			
			this._totalSize = 0;
			this._totalBytes = 0;
			
			for (var i = 0; i < this.fileArray.length; ++i) {
				if (this.fileArray[i].isSizeAvailable()) {
					this._totalSize += this.fileArray[i].getSize();
				} else {
					this._totalSize = this._totalBytes = -1;
					break;
				}
			}
	
			this._connects.push(on(this.controller.fileList, "PropertyChange", lang.hitch(this, function(file, name, oldVal, newVal) {
			   var currentFile = this.currentFile;
				if (file && file == currentFile) {
					if (name == "valid") {
						if (newVal == false && currentFile.uploadDfd) {
							currentFile.uploadDfd.cancel();
							currentFile.uploadDfd = null;
						}
					}
					else if (name == "bytesComplete" || name == "size") {
						var totalBytes = this._totalBytes;
						if (name == "bytesComplete") {
							var totalBytes = this._totalBytes + newVal;
						} else {
							var totalBytes = this._totalBytes;
						}
						this._onProgress(file, totalBytes);
					}
				}
			})));
			
			this.controller.setEnabled(false);
			array.forEach(this.fileArray, function(file) { 
			   file.setEnabled(false);
			   file.setUploadState(file.UploadStates.QUEUED); 
			});				
		},
		
		_onProgress: function(file, totalBytes) {
			var pct = 0;
			var cFiles = this._completedFiles.length;
			var totalFiles = cFiles + this.fileArray.length;
			if (this.currentFile)
				totalFiles += 1;
	
			if (this._totalSize < 1) {
				if (file && file.isSizeAvailable() && file.getSize() > 0 && file.getBytesComplete() > 0) {
					pct = Math.floor((100 / totalFiles) * (cFiles + (file.getBytesComplete() / file.getSize())));
		 		} else {
		 			pct = Math.floor((100 / totalFiles) * cFiles);
		 		}
			} else {
				pct = Math.floor(100 * (totalBytes / this._totalSize));
		    }
			
			if (this.hasMore()) {
				pct = Math.min(99, pct);
			}
			
			var obj = {
				file: file,
				totalBytesComplete: totalBytes,
				totalBytes: this._totalSize,
				percentComplete: pct
			};
			
			this.onProgress(obj);
		},
		
		/**
		 * @return true if there are files yet to be uploaded 
		 */
		hasMore: function() {
			return this.fileArray.length > 0;
		},
		
		/**
		 * @return the file that is currently being uploaded
		 */
		getCurrentFile: function() {
			return this.currentFile;
		},
		
		/**
		 * @return the next file in the list (without modifying the list)
		 */
		getNext: function() {
			return this.fileArray[0];
		},
		
		/**
		 * Uploads the next file in the list
		 * 
		 * @param ioArgs the upload params. See dojo.io.iframe.send for format of ioArgs
		 * @return a deferred which can be attached to. 
		 */
		uploadNext: function(ioArgs) {
			if (this.hasMore()) {
				var file = this.currentFile = this.fileArray.shift();
				
				this.controller.cancelRemoteCheck(file);
				
				file.setUploadState(file.UploadStates.IN_PROGRESS);
				this.onItemStart(this, file);
				
				var args = lang.mixin({}, ioArgs); // cloning to avoid modifying users' args	
				var dfd = this.controller.getFileProvider().uploadFile(this, file, args);
				
				this.currentFile.uploadDfd = dfd;
				
				dfd.addBoth(lang.hitch(this, function(response, ioArgs) {
					this._completedFiles.push(file);
					this.currentFile = null;
					
					clearTimeout(this.checkProgressTimer);
					this.checkProgressTimer = null;
					
					if (this.currentProgressCheck && this.currentProgressCheck.fired == -1)
						this.currentProgressCheck.cancel();
					this.currentProgressCheck = null;
	
					if (file.isSizeAvailable()) {
						this._totalBytes += file.getSize();
					}
					// do not pass a file here. if file size is available on the client side (i.e. from HTML5 or flash), we already have the
					// total size, and the file is not needed. if we do not know the total size up front, this will ensure that on complete,
					// we only have the percent complete of the first n files and no more
					try {
						this._onProgress(null, this._totalBytes);				
					} catch (e) {
						console.error("Error updating upload progress", e);
					}
	
					if (!this.hasMore()) {
						this.cancel();
					}
				}));
				
				dfd.addCallback(lang.hitch(this, function(response, ioArgs) {
					file.setUploadState(file.UploadStates.UPLOADED);
					file.setEnabled(false);
					
					try {
						this.onItemComplete(this, file, response, ioArgs);
					} catch (e) {
						console.error("Error sending onItemComplete event", e);
					}
				}));
				
				dfd.addErrback(lang.hitch(this, function(error, ioArgs) {							
					file.setUploadState(file.UploadStates.READY);
					file.setEnabled(true);
					this.onItemError(this, file, error, ioArgs);
				}));
				
				return dfd;
			}
					
			return null;
		},
		
		/**
		 * stops the current upload
		 */
		cancel: function() {
			if (this.fileArray.length > 0) {
				array.forEach(this.fileArray, function(file) { file.setEnabled(true); file.setUploadState(file.UploadStates.READY); }, this);
				this.fileArray = [];				
			}
			
			// cancel the current upload if one exists
			var currentFile = this.currentFile;
			if (currentFile && currentFile.uploadDfd) {
				currentFile.uploadDfd.cancel();
				currentFile.uploadDfd = null;
			}
			
			this.currentFile = null;
			
			// this will only enable files in the list that were not uploaded to allow them to be modified so they can be
			// uploaded again
			this.controller.setEnabled(true);
			
			this.stopProgressCheck();
			array.forEach(this._connects, dojo.disconnect);
		},
		
		stopProgressCheck: function() {
			if (this.checkProgressTimer) {
				clearTimeout(this.checkProgressTimer);
				this.checkProgressTimer = null;
			}
	   
			if (this.currentProgressCheck && this.currentProgressCheck.fired == -1)
				this.currentProgressCheck.cancel();
			this.currentProgressCheck = null;
		},
		
		retry: function(file) {
			var idx = array.indexOf(this._completedFiles, file);
			if (idx != -1) {
				this.fileArray.unshift(file);
			}				
		},
		
		checkAndUpdateQueue: function() {
			var newArray = array.filter(this.controller.getFileList().getAllFiles(), function(file) {
				var state = file.getUploadState();
				var states = file.UploadStates;
				if (((state == states.READY) || (state == states.QUEUED)) && file.isValid()) {
					return (array.indexOf(this.fileArray, file) == -1); 
				}
				
				return false;
			}, this);
					
			array.forEach(newArray, function(file) {
				file.setUploadState(file.UploadStates.QUEUED);
				file.setEnabled(false);
				this.fileArray.push(file);
			}, this);		
		},
		
		/******************** CONNECTS **********************/
	
		/**
		 * a callback that provides progress updates about the current file. Available data in the object:
		 * {
		 * 	file: the file being updated,
		 * 	totalBytesComplete: the total number of bytes complete in the whole list,
		 * 	totalBytes: the total size of the list,
		 * 	percentComplete: how complete the total list upload is
		 * }
		 * 
		 * use file.getSize and file.getBytesComplete to get info about the current file progress
		 */
		onProgress: function(obj) {},
		
		/**
		 * called just before the item's upload begins
		 * @param manager this manager
		 * @param file the current file
		 */
		onItemStart: function(manager, file) {},
		
		/**
		 * called just after the item's upload completes. This method should call manager.uploadNext to upload the next 
		 * file in the list (assuming manager.hasMore() returns true)
		 * 
		 * @param manager this manager
		 * @param file the current file
		 * @param response the response from the server
		 * @param ioArgs the args used to send to the server
		 */
		onItemComplete: function(manager, file, response, ioArgs) {},
		
		/**
		 * called if an error occurs during upload
		 * @param manager this manager
		 * @param file the current file
		 * @param error the server error
		 * @param ioArgs the args used to send to the server
		 */
		onItemError: function(manager, file, error, ioArgs) {}
	});
	return UploadManager;
});
