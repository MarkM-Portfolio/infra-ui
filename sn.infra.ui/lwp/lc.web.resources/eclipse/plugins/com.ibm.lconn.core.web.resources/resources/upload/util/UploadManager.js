/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.upload.util.UploadManager");

/**
 * Manages uploading files
 * 
 * @class lconn.core.upload.util.UploadManager
 */
dojo.declare("lconn.core.upload.util.UploadManager", null, /** @lends lconn.core.upload.util.UploadManager.prototype */ {
	
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

		this._connects.push(dojo.connect(this.controller.fileList, "onPropertyChange", dojo.hitch(this, function(file, name, oldVal, newVal) {
		   var currentFile = this.currentFile;
				if (name == "valid") {
					if (newVal == false && currentFile.uploadDfd) {
						currentFile.uploadDfd.cancel();
						currentFile.uploadDfd = null;
					}
				}
				else if (name == "bytesComplete" || name == "size") {
					this._onProgress(file, newVal - oldVal);
				}
		})));
		
		this.controller.setEnabled(false);
		dojo.forEach(this.fileArray, function(file) { 
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
	
		this._totalBytes += totalBytes;
		console.debug("this._totalBytes=" + this._totalBytes);

		if (this._totalSize < 1) {
			if (file && file.isSizeAvailable() && file.getSize() > 0 && file.getBytesComplete() > 0) {
				pct = Math.floor((100 / totalFiles) * (cFiles + (file.getBytesComplete() / file.getSize())));
	 		} else {
	 			pct = Math.floor((100 / totalFiles) * cFiles);
	 		}
		} else {
			pct = Math.floor(100 * (this._totalBytes / this._totalSize));
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
	

	//
	// Temp codes to keep back compatibility. We should fefactor this code later.
	//
	_uploadFileDfdAddBoth: function (file, ioArgs, response) {
	   if (response.status == "200" && !response.contents || ioArgs  || response.partialUploaded)
	      return;

      this._completedFiles.push(file);
      this.currentFile = null;
      
      clearTimeout(this.checkProgressTimer);
      this.checkProgressTimer = null;
      
      if (this.currentProgressCheck && this.currentProgressCheck.fired == -1)
         this.currentProgressCheck.cancel();
      this.currentProgressCheck = null;

      if (!this.hasMore()) {
         this.cancel();
      }
   },


   _uploadFileDfdCallback: function (file, ioArgs, response) {
      if (response.status == "200" && !response.contents || ioArgs && response.partialUploaded) {
         return;
      }

      file.setUploadState(file.UploadStates.UPLOADED);
      file.setEnabled(false);

      try {
         this.onItemComplete(this, file, response, ioArgs);
      } catch (e) {
         console.error("Error sending onItemComplete event", e);
      }
   },

   _uploadFileDfdErrback: function (file, ioArgs, response) {
      file.setUploadState(file.UploadStates.READY);
      file.setEnabled(true);
      this.onItemError(this, file, response, ioArgs);
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

         var args = dojo.mixin(
               {
                  "addBoth": dojo.hitch(this, "_uploadFileDfdAddBoth", file, ioArgs),
                  "callback": dojo.hitch(this, "_uploadFileDfdCallback", file, ioArgs),
                  "errback": dojo.hitch(this, "_uploadFileDfdErrback", file, ioArgs)
               }, ioArgs); // cloning to avoid modifying users' args 

         var dfd = this.controller.getFileProvider().uploadFile(this, file, args);

         // TODO thee callbacks are better to be added to dfd where it is created.
         dfd.addBoth(args.addBoth);
         dfd.addCallback(args.callback);
         dfd.addErrback(args.errback);
	
			this.currentFile.uploadDfd = dfd;

			return dfd;
		}
				
		return null;
	},
	
	/**
	 * stops the current upload
	 */
	cancel: function() {
		if (this.fileArray.length > 0) {
			dojo.forEach(this.fileArray, function(file) { file.setEnabled(true); file.setUploadState(file.UploadStates.READY); }, this);
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
		dojo.forEach(this._connects, dojo.disconnect);
		this._totalBytes = 0;
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
		var idx = dojo.indexOf(this._completedFiles, file);
		if (idx != -1) {
			this.fileArray.unshift(file);
		}				
	},
	
	checkAndUpdateQueue: function() {
		var newArray = dojo.filter(this.controller.getFileList().getAllFiles(), function(file) {
			var state = file.getUploadState();
			var states = file.UploadStates;
			if (((state == states.READY) || (state == states.QUEUED)) && file.isValid()) {
				return (dojo.indexOf(this.fileArray, file) == -1); 
			}
			
			return false;
		}, this);
				
		dojo.forEach(newArray, function(file) {
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
