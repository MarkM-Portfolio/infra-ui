define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/i18n",
	"dojo/i18n!ic-core/upload/nls/upload",
	"dojo/string",
	"ic-core/util/html",
	"ic-core/util/text"
], function (dojo, array, declare, lang, i18n, i18nupload, string, html, text) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	/**
	 * @class ic-core.upload.data.File
	 */
	var File = declare("lconn.core.upload.data.File", null, /** @lends ic-core.upload.data.File.prototype */ {
	
	   UploadStates: {
	      "READY": 0,
	      "QUEUED": 1,
	      "IN_PROGRESS": 2,
	      "UPLOADED": 3
	   },
	
	   StatusKeys: {
	      "IS_DUPLICATE": "IsDuplicate",
	      "INVALID_NAME_CHARS": "NameInvalidChars",
	      "INVALID_NAME_LENGTH": "NameInvalidLength",
	      "INVALID_FILE_SIZE": "InvalidSize",
	      "RENAMED": "FileRenamed",
	      "IS_VIDEO": "IsVideo"
	   },
	
	   StatusLevels: {
	      "INFO": 0,
	      "WARNING": 1,
	      "ERROR": 2
	   },
	
	   Actions: {
	      RENAME: {
	         setFocus: false,
	         execute: function(file) {
	            if (file.getOwningList().isRenameAllowed())
	               file.getOwningList().startRename(file);
	         }
	      },
	
	      REPLACE_INVALID: {
	         execute: function(file) {
	            if (file.getOwningList().isRenameAllowed()) {
	               var regex = file.getOwningList().getInvalidCharacters();
	
	               if (regex) {
	                  var name = file.getName();
	                  name = name.replace(regex, "_");
	                  file.setName(name);
	               }
	            }
	         }
	      },
	
	      TRUNCATE: {
	         execute: function(file) {
	            if (file.getOwningList().isRenameAllowed()) {
	               var ext = file.getExtension();
	               var name = text.trimExtension(file.getName());
	
	               name = file.shortenFilename(name, ext, file.getOwningList().getMaxFilenameLength());
	
	               var newName = name.name;
	               if (ext && string.trim(ext).length > 0)
	                  newName += "." + ext;
	
	               file.setName(newName);
	            }
	         }
	      },
	
	      REVERT: {
	         execute: function(file) {
	            if (file.getOwningList().isRenameAllowed()) {
	               file.setName(file.getOriginalFileName());
	            }
	         }
	      },
	
	      REPLACE: {
	         execute: function(file) {
	            if (file.getOwningList().isReplaceAllowed())
	               file.setReplacing(true);
	         }
	      },
	
	      UNDO_REPLACE: {
	         execute: function(file) {
	            if (file.getOwningList().isReplaceAllowed())
	               file.setReplacing(false);
	         }
	      },
	
	      REMOVE: {
	         setFocus: false,
	         execute: function(file) {
	            file.getOwningList().removeFileById(file.getId());
	         }
	      }
	   },
	
	   constructor : function(fileObject, name, fileList) {
	      this._fileObject = fileObject;
	
	      this._id = this._fileObject.id || this._generateId();
	
	      if (fileList) {
	         this._fileList = fileList;
	      }
	
	      this._state = this.UploadStates.READY;
	
	      this._statuses = [];
	      this._statusIndex = {};
	
	      this._originalName = name;
	      // If the original file had no extension or was a "dotfile", allow editing the full filename
	      var extension = this.getExtension();
	      this._originalName = text.trimExtension(name) + (extension ? "." + extension : "");
	      this._canEditFullName = !extension || (extension.length + 1 >= name.length);
	
	      this._isRemoteDuplicate = undefined;
	      this._isLocalDuplicate = false;
	      this._isEnabled = true;
	      this._isReplacing = false;
	      this._hasInvalidChars = false;
	      this._hasInvalidNameLength = false;
	      this._hasInvalidFileSize = false;
	
	      this._bytesComplete = -1;
	      this.invalidCount = 0;
	
	      this.nls = i18nupload;
	
	      this._initActions();
	   },
	
	   _initActions: function() {
	      this.Actions.RENAME.name = this.nls.ACTIONS_RENAME;
	      this.Actions.REPLACE_INVALID.name = this.nls.ACTIONS_REPLACE_INVALID;
	      this.Actions.TRUNCATE.name = this.nls.ACTIONS_TRUNCATE;
	      this.Actions.REVERT.name = this.nls.ACTIONS_REVERT;
	      this.Actions.UNDO_REPLACE.name = this.nls.ACTIONS_UNDO;
	      this.Actions.REPLACE.name = this.nls.ACTIONS_REPLACE;
	      this.Actions.REMOVE.name = this.nls.ACTIONS_REMOVE;
	   },
	
	   /**
	    * @return native file object (HTML file object or Flash file object)
	    */
	   getObject : function() {
	      return this._fileObject;
	   },
	
	   /**
	    * @return the file list this belongs to
	    */
	   getOwningList: function() {
	      return this._fileList;
	   },
	
	   /**
	    * @return the file id
	    */
	   getId : function() {
	      return this._id;
	   },
	
	   /**
	    * @return whether or not the browser can determine the size of this file
	    */
	   isSizeAvailable: function() {
	      return !isNaN(this._size) && this._size >= 0;
	   },
	
	   /**
	    * @param size the size of this file in bytes
	    */
	   setSize : function(size) {
	      var oldVal = this._size;
	
	      this._size = size;
	
	      if (this._fileList && (oldVal != this._size)) {
	         this._fileList.onPropertyChange(this, "size", oldVal, this._size);
	         var error = this.validateSize();
	         if (error) {
	            var status = {
	               id: this.StatusKeys.INVALID_FILE_SIZE,
	               level: this.StatusLevels.ERROR,
	               message: error.message,
	               preventUpload: true,
	               actions: [ this.Actions.REMOVE ]
	            };
	            this.setStatus(status);
	         }
	      }
	   },
	
	   /**
	    * @return the size of the file, or -1 if the size is not discoverable
	    */
	   getSize : function() {
	      if (!this.isSizeAvailable()) {
	         return -1;
	      }
	
	      return this._size;
	   },
	
	   /**
	    * @return the number of bytes that have been uploaded so far
	    */
	   getBytesComplete: function() {
	      return this._bytesComplete;
	   },
	
	   /**
	    * @param bc the number of bytes that have been uploaded so far
	    */
	   setBytesComplete: function(bc) {
	      var oldVal = this._bytesComplete;
	
	      this._bytesComplete = bc;
	
	      if (this._fileList && (oldVal != this._bytesComplete)) {
	         this._fileList.onPropertyChange(this, "bytesComplete", oldVal, this._bytesComplete);
	      }
	   },
	
	   /**
	    * @return true if a file exists on the server with this name
	    */
	   isRemoteDuplicate: function() {
	      return this._isRemoteDuplicate;
	   },
	
	   clearRemoteDuplicate: function() {
	      this.setRemoteDuplicate(undefined);
	   },
	
	   /**
	    * @param isRemoteDupe sets whether or not there is a file on the server with the same name as this file
	    */
	   setRemoteDuplicate: function(isRemoteDupe) {
	      var oldVal = this._isRemoteDuplicate;
	
	      this._isRemoteDuplicate = isRemoteDupe;
	
	      if (this._isRemoteDuplicate && typeof this._isRemoteDuplicate == "object" && this._isRemoteDuplicate.nestedFolder) {
	         var isMultiRemoteDuplicate = this._isRemoteDuplicate.isMultiRemoteDuplicate; 
	         if (this._fileList) {
	            this.isMultiRemoteDuplicate = isMultiRemoteDuplicate;
	         }
	      } else {
	         if (this._fileList) {
	            this.isMultiRemoteDuplicate = false;
	         }
	      }
	      
	      if (this._fileList && oldVal != this._isRemoteDuplicate) {
	
	         // only call the update if the value has changed, regardless of the force flag
	         if (oldVal != this._isRemoteDuplicate) {
	            this._fileList.onPropertyChange(this, "isRemoteDuplicate", oldVal, this._isRemoteDuplicate);
	         }
	
	         this._updateDuplicateStatus();
	      }
	   },
	
	   /**
	    * @return true if there is another file in the list of the files to be uploaded with the same name as this file
	    */
	   isLocalDuplicate: function() {
	      return this._isLocalDuplicate;
	   },
	
	   /**
	    * @param isLocalDupe sets whether or not there is another file in the list of the files to be uploaded with the same name as this file
	    */
	   //here
	   setLocalDuplicate: function(isLocalDupe) {
	      var oldVal = !!this._isLocalDuplicate;
	
	      this._isLocalDuplicate = !!isLocalDupe;
	
	      if (this._fileList && (oldVal != this._isLocalDuplicate)) {
	         this._fileList.onPropertyChange(this, "isLocalDuplicate", oldVal, this._isLocalDuplicate);
	
	         this._updateDuplicateStatus();
	      }
	   },
	
	   /**
	    * @return true if this file name has any invalid characters
	    */
	   hasInvalidChars: function() {
	      return !!this._hasInvalidChars;
	   },
	
	   /**
	    * @param hasInvalidChars sets whether or not this file name has any invalid characters
	    */
	   setHasInvalidChars: function(hasInvalidChars) {
	      var oldVal = !!this._hasInvalidChars;
	
	      this._hasInvalidChars = !!hasInvalidChars;
	      if (this._fileList && (oldVal != this._hasInvalidChars)) {
	         this._fileList.onPropertyChange(this, "hasInvalidChars", oldVal, this._hasInvalidChars);
	
	         if (this._hasInvalidChars) {
	            var status = {
	               id: this.StatusKeys.INVALID_NAME_CHARS,
	               level: this.StatusLevels.ERROR,
	               message: this.nls.STATUS_INVALID_CHARS,
	               preventUpload: true,
	               actions: this._fileList.isRenameAllowed() ? [ this.Actions.RENAME, this.Actions.REPLACE_INVALID ] : []
	            };
	
	            this.setStatus(status);
	         } else {
	            this.clearStatus(this.StatusKeys.INVALID_NAME_CHARS);
	         }
	      }
	   },
	
	   /**
	    * @return whether or not the file name is longer than allowed
	    */
	   isFilenameTooLong: function() {
	      return !!this._hasInvalidNameLength;
	   },
	
	   /**
	    * @param isTooLong set whether or not the file name is longer than allowed
	    */
	   setFilenameTooLong: function(isTooLong) {
	      var oldVal = !!this._hasInvalidNameLength;
	
	      this._hasInvalidNameLength = !!isTooLong;
	      if (this._fileList && (oldVal != this._hasInvalidNameLength)) {
	         this._fileList.onPropertyChange(this, "isFilenameTooLong", oldVal, this._hasInvalidNameLength);
	
	         if (this._hasInvalidNameLength) {
	            var status = {
	               id: this.StatusKeys.INVALID_NAME_LENGTH,
	               level: this.StatusLevels.ERROR,
	               message: string.substitute(this.nls.STATUS_NAME_TOO_LONG, [this._fileList.getMaxFilenameLength()]),
	               preventUpload: true,
	               actions: this._fileList.isRenameAllowed() ? [ this.Actions.RENAME, this.Actions.TRUNCATE ] : []
	            };
	
	            this.setStatus(status);
	         } else {
	            this.clearStatus(this.StatusKeys.INVALID_NAME_LENGTH);
	         }
	      }
	   },
	
	   setExtensionVideo: function(isVideo) {
	      if (this._fileList){
	         this._fileList.onPropertyChange(this, "isExtensionVideo");
	         var status = {
	             id: this.StatusKeys.IS_VIDEO,
	             level: this.StatusLevels.WARNING,
	             message: this.nls.STATUS_TO_PREVIEW,
	             preventUpload: false
	         };
	         this.setStatus(status);
	      }
	   },
	
	   /**
	    * @return true if the user should be able to modify the entire filename, including any extension
	    */
	   canEditFullName: function() {
	      return this._canEditFullName;
	   },
	
	   /**
	    * @return the name of the file as reported by the browser when the file was selected
	    */
	   getOriginalFileName : function() {
	      return this._originalName;
	   },
	
	   /**
	    * @return the name of the file (either edited, if it ha been edited, or the original name)
	    */
	   getName : function() {
	      return this._editedName || this.getOriginalFileName();
	   },
	
	   /**
	    * @param editedName the new name
	    */
	   setName : function(editedName) {
	      var oldName = this.getName();
	
	      this._editedName = editedName;
	      delete this._extension;
	
	      if (this._fileList && (oldName != editedName)) {
	         this._fileList.onPropertyChange(this, "name", oldName, editedName);
	
	         if (editedName != this.getOriginalFileName()) {
	            var status = {
	               id: this.StatusKeys.RENAMED,
	               level: this.StatusLevels.INFO,
	               message: string.substitute(this.nls.STATUS_RENAMED, [html.formatFilename(this._shortenDisplayName(this.getOriginalFileName()))]),
	               actions: [ this.Actions.REVERT ]
	            };
	
	            this.setStatus(status);
	         } else {
	            this.clearStatus(this.StatusKeys.RENAMED);
	         }
	
	         this._fileList.validateDuplicates(oldName);
	
	         this.clearRemoteDuplicate();
	         this.validateName();
	      }
	   },
	
	   /**
	    * @return whether the file is enabled or not
	    */
	   isEnabled: function() {
	      return (this._isEnabled !== false);
	   },
	
	   /**
	    * @param isEnabled whether the file is enabled or not
	    */
	   setEnabled: function(isEnabled) {
	      var oldValue = this._isEnabled;
	
	      this._isEnabled = !!isEnabled;
	
	      if (this._fileList)
	         this._fileList.onPropertyChange(this, "enabled", oldValue, this._isEnabled);
	   },
	
	   /**
	    * @return the file extension
	    */
	   getExtension : function() {
	      if (typeof this._extension == 'undefined') {
	         var name = this.getName();
	         this._extension = text.getExtension(name);
	      }
	
	      return this._extension.toLowerCase();
	   },
	
	   /**
	    * @return whether or not the file is being replaced on the server
	    */
	   isReplacing: function() {
	      return !!this._isReplacing;
	   },
	
	   /**
	    * @param replacing whether or not the file is being replaced on the server
	    */
	   setReplacing: function(replacing) {
	      var oldVal = this._isReplacing;
	
	      this._isReplacing = replacing;
	
	      if (this._fileList && (oldVal != this._isReplacing)) {
	         this._fileList.onPropertyChange(this, "replacing", oldVal, this._isReplacing);
	
	         // avoid an event here
	         this._updateDuplicateStatus();
	
	         this._fileList.onListChanged(this._fileList);
	      }
	   },
	
	   /**
	    * @param kwArgs the status object:
	    * 	- id
	    * 	- message: the display text
	    * 	- preventUpload: if true, the file cannot be uploaded
	    */
	   setStatus: function(kwArgs) {
	      var index = this._statuses.length;
	
	      var idx = this._statusIndex[kwArgs.id];
	      if (idx || idx === 0)
	         index = idx;
	
	      var oldCount = this.invalidCount;
	      var isNew = (index == this._statuses.length);
	
	      if (!isNew) {
	         var oldStatus = this._statuses[index];
	      }
	
	      this._statuses[index] = kwArgs;
	      this._statusIndex[kwArgs.id] = index;
	
	      var delta = 0;
	      if (isNew) {
	         delta = kwArgs.preventUpload ? 1 : 0;
	      } else {
	         if (oldStatus.preventUpload) {
	            delta = kwArgs.preventUpload ? 0 : -1;
	         } else {
	            delta = kwArgs.preventUpload ? 1 : 0;
	         }
	      }
	
	      this._changeInvalidCount(delta);
	
	      if (this._fileList) {
	         this._fileList.onSetStatus(this, kwArgs);
	      }
	   },
	
	   /**
	    * @param id clears the status if this id removes
	    */
	   clearStatus: function(id) {
	      var index = this._statusIndex[id];
	      if ((typeof index != 'undefined') && (index >= 0 && index < this._statuses.length)) {
	         var oldStatus = this._statuses.splice(index, 1);
	         oldStatus = oldStatus[0];
	
	         delete this._statusIndex[id];
	
	         // adjust all indices after the one that was deleted.
	         for (var i = index; i < this._statuses.length; ++i) {
	            var s = this._statuses[i];
	            var id = s.id;
	
	            this._statusIndex[id] = i;
	         }
	
	         this._changeInvalidCount(oldStatus.preventUpload ? -1 : 0);
	
	         if (this._fileList) {
	            this._fileList.onClearStatus(this, oldStatus);
	         }
	      }
	   },
	
	   _changeInvalidCount: function(delta) {
	      if (delta != 0) {
	         var oldCount = this.invalidCount;
	         this.invalidCount += delta;
	
	         this.invalidCount = Math.max(0, this.invalidCount);
	
	         if (this._fileList && !!oldCount != !!this.invalidCount) {
	            this._fileList.onPropertyChange(this, "valid", oldCount==0, this.invalidCount==0);
	            this._fileList.onListChanged(this._fileList);
	         }
	      }
	   },
	
	   /**
	    * @return the list of statuses
	    */
	   getStatuses: function() {
	      return this._statuses;
	   },
	
	   /**
	    * @return the current upload state (see UploadStates)
	    */
	   getUploadState: function() {
	      return this._state || this.UploadStates.READY;
	   },
	
	   /**
	    * @param state the current upload state (see UploadStates)
	    */
	   setUploadState: function(state) {
	      var oldVal = this._state;
	
	      this._state = state;
	      if (this._fileList && (oldVal != this._state)) {
	         this._fileList.onPropertyChange(this, "uploadState", oldVal, this._state);
	      }
	   },
	
	   /**
	    * @return whether or not the file can be uploaded
	    */
	   canUpload: function() {
	      var _canUpload = this.isEnabled() && ((this._state == this.UploadStates.READY) || (this._state == this.UploadStates.QUEUED));
	
	      if (_canUpload) {
	         _canUpload = this.isValid();
	      }
	
	      return _canUpload;
	   },
	
	   /**
	    * @return true if there are no statuses with preventUpload = true
	    */
	   isValid: function() {
	      var _canUpload = array.every(this._statuses, function(status) { return !status.preventUpload; });
	      return _canUpload;
	   },
	
	   _generateId : function() {
	      return dijit.getUniqueId("lconnUpload");
	   },
	
	   validateSize: function() {
	      var error = null;
	
	      // No file list yet... the size will be validated when it is added to the list
	      if (!this._fileList)
	         return null;
	      var max = this._fileList.getMaxFileSize();
	      var size = this.getSize();
	      if (size >= 0 && max > 0) {
	         if (size > max) {
	            var fmtSize = text.formatSize(this.nls, size);
	            var fmtMax = text.formatSize(this.nls, max);
	            error = {
	               message: string.substitute(this.nls.ERROR_TOO_BIG, [ this.getName(), fmtSize, fmtMax ])
	            };
	         }
	      }
	
	      return error;
	   },
	
	   validateExtension: function() {
	      var error = null;
	
	      var extObj = this._fileList.getAllowedExtensions();
	      if (extObj) {
	         var ext = this.getExtension().toLowerCase();
	         if (extObj.allowed) {
	            if (array.indexOf(extObj.allowed, ext) == -1) {
	               error = { message : string.substitute(this.nls.ERROR_BAD_EXT_WHITELIST, [this.getName(), this.getExtension()])};
	            }
	         } else if (extObj.prohibited) {
	            if (array.indexOf(extObj.prohibited, ext) != -1) {
	               error = { message : string.substitute(this.nls.ERROR_BAD_EXT_BLACKLIST, [this.getName(), this.getExtension()])};
	            }
	         }
	      }
	
	      return error;
	   },
	
	   validateName: function() {
	      var name = this.getName();
	      var ext = this.getExtension().toLowerCase();
	      var doDupeCheck = true;
	      var previewEnabled = (this._fileList.previewEnabled) ? this._fileList.previewEnabled : false;
	      var invalidCharsRE = this.getOwningList().getInvalidCharacters();
	      if (lang.isFunction(invalidCharsRE.test) && invalidCharsRE.test(name)) {
	         this.setHasInvalidChars(true);
	         doDupeCheck = false;
	      } else {
	         this.setHasInvalidChars(false);
	      }
	
	      var maxNameLength = this.getOwningList().getMaxFilenameLength();
	      var len = text.getByteLength(name);
	      if (maxNameLength > 0 && len > maxNameLength) {
	         this.setFilenameTooLong(true);
	         doDupeCheck = false;
	         fileExtensionCheck = false;
	      } else {
	         this.setFilenameTooLong(false);
	      }
	
	      if(previewEnabled){
	         var previewConfig = this._fileList.previewConfig;
	         if (previewConfig != null && typeof previewConfig != 'undefined') {
	            var validVideoExts = previewConfig.validVideoExts.split(",");
	            for (var i = 0; i < validVideoExts.length ; i++){
	               if (ext == validVideoExts[i])
	                  this.setExtensionVideo(true);
	            }  
	         }
	      }
	      if (doDupeCheck)
	         this._fileList.validateDuplicates(name);
	      else
	         this._updateDuplicateStatus();
	   },
	
	   validateRemoteDuplicate: function() {
	      if (this.isLocalDuplicate() || this._isRemoteDuplicate != undefined)
	         return;
	
	      if (lang.isFunction(this.getOwningList().remoteFileExists)) {
	         if (this._pendingRemoteCheck) {
	            this._pendingRemoteCheck.cancel();
	         }
	
	         var name = this.getName();
	         var deferred = this._pendingRemoteCheck = this.getOwningList().remoteFileExists(name);
	
	         var checks = this.getOwningList()._pendingRemoteChecks;
	         checks.push(deferred);
	
	         deferred.addBoth(lang.hitch(this, function() {
	            var idx = array.indexOf(checks, deferred);
	            if (idx != -1)
	               checks.splice(idx, 1);
	
	            this._pendingRemoteCheck = null;
	         }));
	
	         deferred.addCallback(lang.hitch(this, function(result) {
	            this.setRemoteDuplicate(result);
	         }));
	      }
	   },
	
	   _shortenDisplayName: function(name) {
	      if (!lang.isString(name) || name.length <= 38)
	         return name;
	
	      return name.substring(0, 20) + "..." + name.substring(name.length - 15);
	   },
	
	   _updateDuplicateStatus: function() {
	      if (this.isFilenameTooLong() || this.hasInvalidChars())
	         this.clearStatus(this.StatusKeys.IS_DUPLICATE);
	      else if (this.isLocalDuplicate())
	         this._setLocalDuplicateStatus();
	      else if (this.isRemoteDuplicate())
	         this._setRemoteDuplicateStatus();
	      else
	         this.clearStatus(this.StatusKeys.IS_DUPLICATE);
	   },
	
	
	   _setLocalDuplicateStatus: function() {
	      var status = {
	         id: this.StatusKeys.IS_DUPLICATE,
	         level: this._fileList.areDuplicatesAllowed() ? this.StatusLevels.WARNING : this.StatusLevels.ERROR,
	         message: this.nls.STATUS_LOCAL_DUPLICATE,
	         preventUpload: !this._fileList.areDuplicatesAllowed(),
	         actions: this._fileList.isRenameAllowed() ? [ this.Actions.RENAME ] : []
	      };
	      this.setStatus(status);
	   },
	
	   _setReplacingStatus: function() {
	      var status = {
	         id: this.StatusKeys.IS_DUPLICATE,
	         level: this.StatusLevels.INFO,
	         message: this.nls.STATUS_REPLACE,
	         preventUpload: false,
	         actions: [ this.Actions.UNDO_REPLACE ]
	      };
	      this.setStatus(status);
	   },
	
	   _setRemoteDuplicateStatus: function() {
	      var msg = null;
	      if (this._isRemoteDuplicate && typeof this._isRemoteDuplicate == "object" && this._isRemoteDuplicate.nestedFolder) {
	         var msgPre = "";
	         if (this._isRemoteDuplicate.context && this._isRemoteDuplicate.context == "collection") {
	            msgPre = this.nls.STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_COLLECTION;
	         } else {
	            msgPre = this.nls.STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_GLOBAL;
	         }
	         var msgAction = this._isRemoteDuplicate.isMultiRemoteDuplicate ? this.nls.STATUS_REMOTE_DUPLICATE_RENAME_ACTION : this.nls.STATUS_REMOTE_DUPLICATE_RENAME_AND_REPLACE_ACTION;
	         var remoteFileName = this._isRemoteDuplicate.fileName;
	         var msgReplace = {
	               message: dojo.string.substitute(msgPre, [ remoteFileName ])
	         };
	         msg = msgReplace.message + msgAction;
	      } else {
	         msg = this._isRemoteDuplicate.community? this.nls.STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY: this.nls.STATUS_REMOTE_DUPLICATE_RENAME;
	      }
	      
	      var status = {
	         id: this.StatusKeys.IS_DUPLICATE,
	         level: this.StatusLevels.WARNING,
	         message: msg,
	         preventUpload: false,
	         disableActionInline: true,
	         actions: []
	      };
	      
	      if (this._fileList.isRenameAllowed()) {
	         this.Actions.RENAME.name = this.nls.ACTIONS_RENAME_LONG;
	         status.actions.push(this.Actions.RENAME);
	      }
	      this.setStatus(status);
	      if (this._fileList.isReplaceAllowed()) {
	         this.Actions.REPLACE.execute(this);
	      }
	   },
	
	   shortenFilename: function(name, ext, maxLength) {
	      name = name || "";
	      ext = ext || "";
	
	      var bytesName = text.getByteLength(name);
	      var bytesExt = text.getByteLength(ext);
	
	      if (maxLength < 1 || !maxLength) {
	        maxLength = 252;
	      }
	
	      var dot = "";
	      var bytesDot = 0;
	      if (bytesExt > 0) {
	         // Save room for the connecting dot if we have an extension
	         dot = ".";
	         bytesDot = 1;
	      }
	
	      var bytesForName = maxLength - bytesExt - bytesDot;
	      if (bytesForName <= 0) {
	         // No room for the name at all
	         name = "";
	
	         // Have to trim the extension... this is extreme
	         var bytesForExt = maxLength - bytesDot;
	         ext = text.trimToByteLength(ext, bytesForExt);
	      }
	      else
	         name = text.trimToByteLength(name, bytesForName);
	
	      return {
	         filename: name + dot + ext,
	         name: name,
	         ext: ext
	      };
	   }
	});
	return File;
});
