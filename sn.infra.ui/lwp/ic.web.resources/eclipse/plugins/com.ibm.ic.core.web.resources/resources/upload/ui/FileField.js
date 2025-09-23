define([
	"dojo",
	"dojo/_base/lang",
	"dojo/i18n",
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/_base/array",
	"dojo/dom-style",
	"dojo/i18n!ic-core/upload/nls/upload",
	"dojo/string",
	"dijit/_Container",
	"dijit/_Widget",
	"ic-core/globalization/bidiUtil",
	"ic-core/upload/ui/File",
	"ic-core/util/text",
	"ic-core/utilities"
], function (dojo, lang, i18n, declare, domConstruct, domClass, array, domStyle, i18nupload, string, _Container, _Widget, bidiUtil, File, text, utilities) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	var FileField = declare("lconn.core.upload.ui.FileField", [ _Widget, _Container ], {
		 currentLength: 0,
		 
	    postMixInProperties: function() {
	        this.nls = i18nupload;
	        this._listeners = [];        
	        
	        this.allowMultiple = !!this.controller.allowMultiple;
	    },
	    
	    buildRendering: function() {
	    	this.inherited(arguments);
	    	var containerNode = this.containerNode = domConstruct.create('div');
	    	containerNode.style.padding = "2px";
	    	this.inputContainer = domConstruct.create('span', { 'className': 'lconnUploadContainer'});
	    	this.domNode.appendChild(this.containerNode);
	    	this.domNode.appendChild(this.inputContainer);
	    },
	    
	    startup: function() {
	    	this._buildInput();
	    	this._buildTable();
	    	this._started = true;
	    },
	    
	    destroy: function() {
	    	array.forEach(this._listeners, dojo.disconnect);
	    	if (this.currentInput && lang.isFunction(this.currentInput.destroy))
	    		this.currentInput.destroy();
	    	
	    	this.inherited(arguments);
	    }, 
	    
	    isAllowMultipleFiles: function() {
	    	return !!this.allowMultiple;
	    },
	
	    updateInputVisibility: function() {
	    	var count = this.controller.fileList.count();
	    	var show = (this.isAllowMultipleFiles() || count == 0);
	    	    	
	    	domStyle.set(this.inputContainer, "display", show ? "" : "none");
			bidiUtil.enforceTextDirectionOnPage();
	    },
	    
	    _buildInput: function() {
	    	if (this.currentInput && this.currentInput.destroy)
	    		this.currentInput.destroy(); 
	    	
	    	var inputWidget = this.currentInput = this.controller.getFileProvider().buildInput(this, this.controller.label);
	    	
	    	this.inputContainer.innerHTML = '';
	    	this.inputContainer.appendChild(inputWidget.domNode);
	    	
	    	domClass.add(this.domNode, "lconnFileInput");   
	        
	        if (this.isAllowMultipleFiles()) {
	        	domClass.add(this.domNode, "lconnUploadMultiple")
	        }
	    },
	    	          
	    _buildTable: function() {
	    	array.forEach(this.controller.fileList.getAllFiles(), this._addRow, this);    		
	    },
	    	    
	    _addRow: function(file) {
	    	var id = this.id + "_" + file.getId();
	    	var widget = new File({
	    		id: id,
	    		file: file, 
	    		container: this 
	    	});
	    	
	    	this.addChild(widget);
	    	
	    	domStyle.set(this.containerNode, "display", "");    	
	    	this.updateInputVisibility();
	
	    	this.onLayout();
	    	widget.focus();
	    },
	    
	    _removeRow: function(file, idx) {
	    	var widget = this._findFileWidget(file);
	    	this.removeChild(widget);
	    	
	    	widget.destroyRecursive(false);
	    	    	
	    	this._focusFile(idx, 1) || this._focusFile(idx, -1);
	    	this.updateInputVisibility();
	    	
	    	this.setFocus();
	
	    	this.onLayout(true);
	    },
	    
	    setFocus: function(){
	       var provider = this.controller.getFileProvider();
	       var focuser = provider.getFocusNode();
	       // required for flash to build the movie
	       if (lang.isFunction(focuser)) {
	          focuser();
	       }else if(focuser)
	          dijit.focus(focuser);
	    },
	    
	    _handlePropertyChange: function(file, propertyName, oldValue, newValue) {
	    	if (oldValue != newValue) {
	    		var widget = this._findFileWidget(file);
	    		
	    		if (widget) {
	    			if (propertyName == "name") {
	    				widget.onNameChange(newValue);
	    			} else if (propertyName == "enabled") {
	    				widget.onEnabledChange(newValue);
	    				// Enabling/disabling can toggle status visibility, when the file is becoming disabled, the layout might shrink 
	    				this.onLayout(newValue == false);
	    			} else if (propertyName == "uploadState") {
	    				widget.onUploadStateChange(newValue);
	    			}
	    		}
	    	}
	    },
	    
	    _handleSetStatus: function(file, status) {
	    	var widget = this._findFileWidget(file);
			
			if (widget) {
				widget.setStatus(status);
				this.onLayout();
			}
		},

	    _handleClearStatus: function(file, status) {
	    	var widget = this._findFileWidget(file);
			
			if (widget) {
				widget.clearStatus(status);
				this.onLayout(true);
			}		
	    }, 
	    
	    _handleStartRename: function(file) {
	    	var widget = this._findFileWidget(file);
	    	
	    	if (widget) {
	    		widget.startRename();
	    	}
	    },
	    
	    _findFileWidget: function(file) {
	    	var id = this.id + "_" + file.getId();
	    	return dijit.byId(id);
	    },
	    
	    _focusFileWidget: function(focusFile) {
	    	if (focusFile)
	    		var focusWidget = this._findFileWidget(focusFile);
	    	
	    	if (focusWidget) {
	    		focusWidget.focus();
	    	} else {
	    		dijit.focus(this.domNode);
	    	}
	    },
	    
	    _focusFile: function(index, direction) {
	    	var children = this.getChildren() || [];
	    	var len = children.length;
	    	
	    	if (index >= len)
	    		index = len - 1;
	    	
	    	direction = (direction < 0) ? -1 : 1; 
	    	
	    	for (var i = index; i >= 0 && i < len; i += direction) {
	    		var child = children[i];
	    		var file = child.file;
	    		
	    		var state = null;
	    		if (file && file.isEnabled())
	    			state = file.getUploadState();
	    		
	    		if (state !== null) {
	    			var states = file.UploadStates;
	    			if (state == states.READY || state == states.QUEUED) {
	    				child.focus();
	    				return true;
	    			}
	    		}
	    	}
	    	
	    	return false;
	    },
	    
	    _focusLastFile: function() {
	       var list = this.controller.fileList;
	       var idx = list.count() - 1;
	       
	       this._focusFile(idx, 1) || this._focusFile(idx, -1);
	    },
	    
	    _focusFirstFileOfCurrentSelection: function() {
	       var list = this.controller.fileList;
	       var cl = this.currentLength;
	       this._focusFile(cl, 1) || this._focusFile(cl, -1);
	       this.currentLength = list.count();
	     },
	    
	    onStartRename: function(file) {},
	    onEndRename: function(file) {},
	    onLayout: function(isShrinking) {}
	}); 
	return FileField;
});
