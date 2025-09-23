define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-core/upload/data/File"
], function (array, declare, lang, File) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	/**
	 * @class ic-core.upload.data.FileList
	 */
	var FileList = declare("lconn.core.upload.data.FileList", null, /** @lends ic-core.upload.data.FileList.prototype */ {
	   constructor: function(opts) {
	      lang.mixin(this, opts);
	      this._files = [];
	      this._indexMap = {};
	
	      this.invalidCharacters = this.invalidCharacters || /[\\\/\:\*\?\<\>\|\"]/g;
	      this.extensions = this._processExtensions(opts.extensions);
	
	      this._errors = [];
	
	      this._pendingRemoteChecks = [];
	
	      this.allowDuplicates = !!this.allowDuplicates;
	   },
	
	   _addFile: function(fileObject) {
	      var file = lang.mixin(lang.mixin({}, fileObject), {_fileList: this});
	
	      var error = file.validateSize();
	      if (!error) {
	         error = file.validateExtension();
	      }
	
	      if (error) {
	         this._errors.push(error);
	      } else {
	         this._indexMap[file.getId()] = this._files.length;
	         this._files.push(file);
	         this.onFileAdded(file);
	      }
	
	      return file;
	   },
	
	   /**
	    * @param fileArray an array of lconn.core.upload.data.File objects
	    */
	   addFiles: function(fileArray) {
	      if (!lang.isArray(fileArray)) {
	         fileArray = [ fileArray ];
	      }
	
	      fileArray = array.map(fileArray, this._addFile, this);
	
	      if (this._errors.length > 0) {
	         this.onAddFilesError(this._errors);
	         this._errors = [];
	      }
	
	      this.onListChanged(this);
	
	      array.forEach(fileArray, function(file) {
	         file.validateName();
	      });
	   },
	
	   /**
	    * @param id the id of the file to remove
	    */
	   removeFileById: function(id) {
	      var idx = this.getFileIndex(id);
	      if (idx != -1) {
	         this.removeFile(idx);
	      }
	   },
	
	   /**
	    * Reset the file list
	    */
	   reset: function(){
	      this._files = [];
	      this._indexMap = {};
	
	      this._errors = [];
	
	      this._pendingRemoteChecks = [];
	   },
	   /**
	    * @param index the position in the list of the file to be removed
	    */
	   removeFile: function(index) {
	      if (index >= 0 || index < this._files.length) {
	         var removedArr = this._files.splice(index, 1);
	         var removedObj = removedArr[0];
	
	         var idx = this._indexMap[removedObj.getId()];
	         if (idx || idx === 0) {
	            delete this._indexMap[removedObj.getId()];
	         }
	
	         // fix up all indices that are >= the removed indexx
	         for (var i = idx; i < this._files.length; ++i) {
	            this._indexMap[this._files[i].getId()] = i;
	         }
	
	         this.onFileRemoved(removedObj, index);
	         this.onListChanged(this);
	
	         var name = removedObj.getName();
	         this.validateDuplicates(name);
	      }
	   },
	
	   validateDuplicates: function(name) {
	      var nameList = array.filter(this.getUploadableFiles(true), function(file) {
	         return name == file.getName();
	      }, this);
	
	      var localsExist = nameList.length > 1;
	      array.forEach(nameList, function(file) {
	         file.setLocalDuplicate(localsExist);
	         file.validateRemoteDuplicate();
	      });
	   },
	
	   /**
	    * @return the max file size this list accepts, or -1 if no size limit is imposed
	    */
	   getMaxFileSize: function() {
	      if (!isNaN(this.maxFileSize) && (this.maxFileSize > 0) && (this.maxFileSize != Number.POSITIVE_INFINITY)) {
	         return this.maxFileSize;
	      }
	
	      return -1;
	   },
	
	   /**
	    * @return the regexp of invalid characters
	    */
	   getInvalidCharacters: function() {
	      /*
	       * reset lastIndex to 0 every time, or the reg exp likely won't work.
	       *  this allows reuse without having to go to the high expense of recreating a
	       *  new regexp every time.
	       */
	      this.invalidCharacters.lastIndex = 0;
	      return this.invalidCharacters;
	   },
	
	   /**
	    * @return the max length allowed of a file name
	    */
	   getMaxFilenameLength: function() {
	      return this.maxFileLength;
	   },
	
	   _setMaxFilenameLength: function(mfl) {
	      this.maxFileLength = mfl;
	   },
	
	   _setInvalidCharacters: function(ic) {
	      this.invalidCharacters = ic;
	   },
	
	   /**
	    * The object representing allowed / prohibited extensions. object format:
	    *    {
	    *       allowed: [ ],
	    *       prohibited: [ ]
	    *    }
	    */
	   getAllowedExtensions: function() {
	      return this.extensions;
	   },
	
	   /**
	    * @param the position in the list
	    * @return the lconn.core.upload.data.File
	    */
	   getFileByIndex: function(idx) {
	      return this._files[idx];
	   },
	
	   getFileIndex: function(fileId) {
	      var idx = this._indexMap[fileId];
	      if (typeof (idx) == 'undefined' || idx == null) {
	         return -1;
	      }
	
	      return idx;
	   },
	
	   /**
	    * @param the file id
	    * @return the lconn.core.upload.data.File
	    */
	   getFileById: function(id) {
	      var idx = this.getFileIndex(id);
	
	      if (idx == -1)
	         return null;
	
	      return this._files[idx];
	   },
	
	   /**
	    * @return the total size of all files in the list, or -1 if any one file is not discoverable
	    */
	   getTotalSize: function() {
	      var size = 0;
	      for (var i = 0; i < this._files.length; ++i) {
	         var file = this._files[i];
	         if (file.isSizeAvailable()) {
	            size += file.getSize();
	         } else {
	            return -1;
	         }
	      }
	
	      return size;
	   },
	
	   /**
	    * @return the length of the list
	    */
	   count: function() {
	      return this._files.length;
	   },
	
	   /**
	    * @return all files
	    */
	   getAllFiles: function() {
	      return this._files;
	   },
	
	   /**
	    * @return all files that can be uploaded
	    */
	   getUploadableFiles: function(skipValidation) {
	      var states = File.prototype.UploadStates;
	      return array.filter(this._files, function(file) {
	         var state = file.getUploadState();
	         return ((state == states.READY) || (state == states.QUEUED)) && (!!skipValidation || file.isValid());
	      }, this);
	   },
	
	   /**
	    * @return all files currently being uploaded (should only be a list of 1 file)
	    */
	   getInProgressFiles: function(skipValidation) {
	      var states = File.prototype.UploadStates;
	      return array.filter(this._files, function(file) {
	         var state = file.getUploadState();
	         return (state == states.IN_PROGRESS) && (!!skipValidation || file.isValid());
	      }, this);
	   },
	
	   /**
	    * @return all files that have already been uploaded
	    */
	   getUploadedFiles: function(skipValidation) {
	      var states = File.prototype.UploadStates;
	      return array.filter(this._files, function(file) {
	         var state = file.getUploadState();
	         return (state == states.UPLOADED);
	      }, this);
	   },
	
	   getInvalidFiles: function() {
	      return array.filter(this._files, function(file) { return !file.isValid(); });
	   },
	
	   isRenameAllowed: function() {
	      return !!this.allowRename;
	   },
	
	   isReplaceAllowed: function() {
	      return !!this.allowReplace;
	   },
	
	   areDuplicatesAllowed: function() {
	      return !!this.allowDuplicates;
	   },
	
	   _processExtensions: function(ext) {
	      var normalized = {};
	      if (ext && lang.isArray(ext.allowed)) {
	         normalized.allowed = array.map(ext.allowed, function(extension) {
	            if (extension.charAt(0) == '.') {
	               extension = extension.substring(1);
	            }
	
	            return extension.toLowerCase();
	         });
	      } else if (ext && lang.isArray(ext.prohibited)) {
	         normalized.prohibited = array.map(ext.prohibited, function(extension) {
	            if (extension.charAt(0) == '.') {
	               extension = extension.substring(1);
	            }
	
	            return extension.toLowerCase();
	         });
	      }
	
	      return normalized;
	   },
	
	   onListChanged: function(fileList) {},
	
	   /* Request to begin editing the given file. Should be acted on by a connecting UI */
	   startRename: function(file) {},
	
	   onFileAdded: function(file) {},
	   onFileRemoved: function(file, index) {},
	   onAddFilesError: function(errorArray) {},
	
	   onPropertyChange: function(file, propertyName, oldValue, newValue) {},
	   onSetStatus: function(file, status) {},
	   onClearStatus: function(file, status) {}
	});
	return FileList;
});
