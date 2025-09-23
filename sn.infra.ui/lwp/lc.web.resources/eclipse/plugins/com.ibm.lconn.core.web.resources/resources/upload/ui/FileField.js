/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.upload.ui.FileField");

dojo.require("dojo.i18n");
dojo.require("dojo.string");

dojo.require("dijit._Widget");
dojo.require("dijit._Container");

dojo.require("lconn.core.utilities");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.upload.ui.File");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.requireLocalization("lconn.core.upload", "upload");

dojo.declare("lconn.core.upload.ui.FileField", [ dijit._Widget, dijit._Container ], {
	 currentLength: 0,
	 
    postMixInProperties: function() {
        this.nls = dojo.i18n.getLocalization("lconn.core.upload", "upload");
        this._listeners = [];        
        
        this.allowMultiple = !!this.controller.allowMultiple;
        this.requiredField = !!this.controller.requiredField;
    },
    
    buildRendering: function() {
    	this.inherited(arguments);
    	var containerNode = this.containerNode = dojo.create('div');
    	containerNode.style.padding = "2px";
    	this.inputContainer = dojo.create('span', { 'className': 'lconnUploadContainer'});
    	this.domNode.appendChild(this.containerNode);
    	this.domNode.appendChild(this.inputContainer);
    },
    
    startup: function() {
    	this._buildInput();
    	this._buildTable();
    	this._started = true;
    },
    
    destroy: function() {
    	dojo.forEach(this._listeners, dojo.disconnect);
    	if (this.currentInput && dojo.isFunction(this.currentInput.destroy))
    		this.currentInput.destroy();
    	
    	this.inherited(arguments);
    }, 

    isAllowMultipleFiles: function() {
    	return !!this.allowMultiple;
    },

    isRequiredField: function() {
       return !!this.requiredField;
    },

    updateInputVisibility: function() {
    	var count = this.controller.fileList.count();
    	var show = (this.isAllowMultipleFiles() || count == 0);
    	    	
    	dojo.style(this.inputContainer, "display", show ? "" : "none");
		lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
    },
    
    _buildInput: function() {
    	if (this.currentInput && this.currentInput.destroy)
    		this.currentInput.destroy(); 
    	
    	var inputWidget = this.currentInput = this.controller.getFileProvider().buildInput(this, this.controller.label);
    	
    	this.inputContainer.innerHTML = '';
    	this.inputContainer.appendChild(inputWidget.domNode);
    	
    	dojo.addClass(this.domNode, "lconnFileInput");   
        
        if (this.isAllowMultipleFiles()) {
        	dojo.addClass(this.domNode, "lconnUploadMultiple")
        }
    },
    	          
    _buildTable: function() {
    	dojo.forEach(this.controller.fileList.getAllFiles(), this._addRow, this);    		
    },
    	    
    _addRow: function(file) {
    	var id = this.id + "_" + file.getId();
    	var widget = new lconn.core.upload.ui.File({
    		id: id,
    		file: file, 
    		container: this 
    	});
    	
    	this.addChild(widget);
    	
    	dojo.style(this.containerNode, "display", "");    	
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
       if (dojo.isFunction(focuser)) {
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
    
    // Callbacks for container
    onStartRename: function(file) {},
    onEndRename: function(file) {},
    
    /**
     * This is called when the layout of FileField changes, e.g. adding/removing a row.
     * @param isShrinking Indicate whether FileField is shrinking.
     */
    onLayout: function(isShrinking) {}
}); 
