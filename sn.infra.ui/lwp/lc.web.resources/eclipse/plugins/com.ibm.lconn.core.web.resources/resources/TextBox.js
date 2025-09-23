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

dojo.provide("lconn.core.TextBox");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.core.globalization.bidiUtil");

/**
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
 * @class lconn.core.TextBox
 * @extends dijit._Widget
 * @extends dijit._Templated
 */
dojo.declare("lconn.core.TextBox", [dijit._Widget, dijit._Templated], /** @lends lconn.core.TextBox.prototype */
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
            dojo.addClass(this.textbox, "lotusInactive");
            this.textbox.value = this.shadowText;
        }
        
        if(this.name) {
            this.hiddenbox.name = this.name;
        }
        if(this.title){
            this.textbox.title = this.title;
        }
        
        lconn.core.globalization.bidiUtil.inputRTLProcessing(this.textbox);
        this.connect(this.textbox, 'onkeyup', function(){
           lconn.core.globalization.bidiUtil.inputRTLProcessing(this.textbox);
        });
        if(dojo.isMoz || dojo.isOpera){
           this.connect(this.textbox, 'oninput', function(){
              lconn.core.globalization.bidiUtil.inputRTLProcessing(this.textbox);
           });
        }
    },
    
    textBoxBlur: function() {
        if(this.textbox.value.length === 0) {
            dojo.addClass(this.textbox, "lotusInactive");
            this.shadowTextOn = true;
            this.textbox.value = this.shadowText;
            this.hiddenbox.value = '';
        } else {
        	dojo.removeClass(this.textbox, "lotusInactive");
            this.hiddenbox.value = this.textbox.value;
            this.shadowTextOn = false;
        }
    },
    
    textBoxFocus: function() {
        if(this.shadowTextOn) {
            this.shadowTextOn = false;
            this.textbox.value = '';
            this.hiddenbox.value = '';
            dojo.removeClass(this.textbox, "lotusInactive");
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
       lconn.core.globalization.bidiUtil.inputRTLProcessing(this.textbox);
    },
    
    clearValue: function() {
       this.setValue("");
    }
});

/** 
 * Provides a text box with a default value that will be shown in shadow text
 * until the user begins typing in the control.  On focus, the default text
 * is selected so typing will overwrite it by default.
 * @class lconn.core.DefaultValueTextbox
 * @extends dijit._Widget
 * @extends dijit._Templated
 */
dojo.declare("lconn.core.DefaultValueTextbox", [dijit._Widget, dijit._Templated], /** @lends lconn.core.DefaultValueTextbox.prototype */ {
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
        if (dojo.hasClass(this.domNode, "lotusInactive")) {
            window.setTimeout("dojo.byId('"+this.id+"').select()", 0);
        }
    },

    _onChange: function _onChange(event) {
        dojo.removeClass(this.domNode, "lotusInactive");
        this.dirty=true;
    }
});
