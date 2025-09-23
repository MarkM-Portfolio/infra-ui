/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/has",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/globalization/bidiUtil"
], function (declare, domClass, has, _Templated, _Widget, bidiUtil) {

/*
	 * This is just an input box that features the ability to have "shadow text".
	 * Shadow text is text which appears in an input box if the box is empty.
	 * Another hidden input is used to actually hold the data which will be submitted with the form.
	 * <p>
	 * Parameters accepted:
	 * value: the initial value for the text box
	 * shadowText: the shadow text string (required)
	 * name: the name for the input field, so the server can access the field value
	 * title: the textbox title attribute
	 * <p>
	 * Create a CSS rule for .shadowText if you want it to look good (like italics and gray)
	 * @class ic-core.TextBox
	 * @extends dijit._Widget
	 * @extends dijit._Templated
	 */
	var TextBox = declare("lconn.core.TextBox", [_Widget, _Templated], /** @lends ic-core.TextBox.prototype */
	{
	    shadowText: '',     //Text that appears grayed if the text box is empty and blurred
	    shadowTextOn: true,
	    name: '',   //The submitted name of the text box
	    textBoxClass: '',   //A class to add to the text box
	    templateString: '<span><input type="text" class="${textBoxClass}" dojoAttachPoint="textbox" /><input type="hidden" value="" dojoAttachPoint="hiddenbox" /></span>',
	
	    postCreate: function() {
	        this.connect(this.textbox,'onfocus', "textBoxFocus");
	        this.connect(this.textbox,'onblur', "textBoxBlur");
	        this.connect(this.textbox,'onclick', "textBoxClick");
	        this.textbox.name = this.id + "_textbox";
	        
	        if(this.value) {
	            this.textbox.value = this.value;
	            this.hiddenbox.value = this.value;
	            this.shadowTextOn = false;
	        }
	        else {
	            domClass.add(this.textbox, "lotusInactive");
	            this.textbox.value = this.shadowText;
	        }
	        
	        if(this.name) {
	            this.hiddenbox.name = this.name;
	        }
	        if(this.title){
	            this.textbox.title = this.title;
	        }
	        
	        bidiUtil.inputRTLProcessing(this.textbox);
	        this.connect(this.textbox, 'onkeyup', function(){
	           bidiUtil.inputRTLProcessing(this.textbox);
	        });
	        if(has("moz") || has("opera")){
	           this.connect(this.textbox, 'oninput', function(){
	              bidiUtil.inputRTLProcessing(this.textbox);
	           });
	        }
	    },
	    
	    textBoxBlur: function() {
	        if(this.textbox.value.length === 0) {
	            domClass.add(this.textbox, "lotusInactive");
	            this.shadowTextOn = true;
	            this.textbox.value = this.shadowText;
	            this.hiddenbox.value = '';
	        } else {
	        	domClass.remove(this.textbox, "lotusInactive");
	            this.hiddenbox.value = this.textbox.value;
	            this.shadowTextOn = false;
	        }
	    },
	    
	    textBoxFocus: function() {
	        if(this.shadowTextOn) {
	            this.shadowTextOn = false;
	            this.textbox.value = '';
	            this.hiddenbox.value = '';
	            domClass.remove(this.textbox, "lotusInactive");
	            this.textbox.focus();
	        }
	    },
	    
	    //If you click on a textbox and the Focus is not the curret textbox change focus to the current textbox
	    textBoxClick: function(){
	        if(document.activeElement != this.textbox){
	            this.textbox.focus();
	        }
	    },
	    
	    //Call this if you want to get the value without blurring the text box
	    setHiddenValue: function() {
	        if ( this.shadowTextOn ) {
	            this.hiddenbox.value = '';
	        } else {
	            this.hiddenbox.value = this.textbox.value;
	        }
	    },
	    
	    focus: function() {
	        this.textbox.focus();
	    },
	    
	    getValue: function() {
	        return this.hiddenbox.value;
	    },
	    
	    setValue: function(value) {
	       this.textbox.value = value;
	       if (document.activeElement !== this.textbox){
	          this.textBoxBlur();
	       }
	       bidiUtil.inputRTLProcessing(this.textbox);
	    },
	    
	    clearValue: function() {
	       this.setValue("");
	    }
	});
	
	/** 
	 * Provides a text box with a default value that will be shown in shadow text
	 * until the user begins typing in the control.  On focus, the default text
	 * is selected so typing will overwrite it by default.
	 * @class ic-core.DefaultValueTextbox
	 * @extends dijit._Widget
	 * @extends dijit._Templated
	 */
	declare("lconn.core.DefaultValueTextbox", [_Widget, _Templated], /** @lends ic-core.DefaultValueTextbox.prototype */ {
	    templateString: '<input class="lotusInactive" type="text" name="${name}" value="${defaultValue}" dojoAttachEvent="onfocus:_onFocus, onkeypress:_onChange, onchange:_onChange"></input></div>',
	
	    name: '',
	    defaultValue: '',
	    
	    /** Give focus to this widget */
	    setFocus: function setFocus() {
	        window.setTimeout("dijit.focus('"+this.id+"')", 0);
	    },
	
	    /** Get if the form has been modified */
	    isDirty: function isDirty() {
	        return this.dirty;
	    },
	    /*Select the textbox on focus*/
	    _onFocus: function _onFocus(event) {
	        if (domClass.contains(this.domNode, "lotusInactive")) {
	            window.setTimeout("dojo.byId('"+this.id+"').select()", 0);
	        }
	    },
	
	    _onChange: function _onChange(event) {
	        domClass.remove(this.domNode, "lotusInactive");
	        this.dirty=true;
	    }
	});
	
	return TextBox;
});
