/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
dojo.provide("lconn.highway.dijit.MessageItem");
dojo.require("dijit._Widget");
dojo.requireLocalization("lconn.highway", "strings");
/**
 * Widget used to build a single message item
 * @author Bill Looby
 */

dojo.declare("lconn.highway.dijit.MessageItem", [dijit._Widget, dijit._Templated],
{	
	// Message item template
	templatePath: dojo.moduleUrl("lconn.highway", "templates/messageItem.html"),
	
	// The message content
	msgText: "",
	
	// The message type. "WARNING"|"ERROR"|"CONFIRM"|"INFO".
	msgType: null,
	
	// Whether contain a close button
	canClose: false,
	
	// Parameters in template
	msgClass: "",
	imgClass: "",
	typeAlt: "",
	closeAlt: "",
	role: "",
	msgStyle: "",
	
	/**
	 * Set the properties for every message type. 
	 * To mix the matched params to template
	 */
	constructor: function(obj) {
		console.log("Debug : MessageItem constructor");
		this.strings = dojo.i18n.getLocalization("lconn.highway", "strings");
		this.msgStyle=obj.msgStyle;
		this.WARNING = {
			type: "WARNING",
			msgClass: "lotusWarning",
			imgClass: "lconnIconMsgWarning",
			typeAlt: this.strings.msgWarningAlt,
			role: "alert"
		};
		this.ERROR = {
			type: "ERROR",
			msgClass: "",
			imgClass: "lotusIconMsgError",
			typeAlt: this.strings.msgErrorAlt,
			role: "alert"
		};
		this.CONFIRM = {
			type: "CONFIRM",
			msgClass: "lotusConfirm",
			imgClass: "lotusIconMsgSuccess",
			typeAlt: this.strings.msgConfirmAlt,
			role: "alert"
		};
		this.INFO = {
			type: "INFO",
			msgClass: "lotusInfo",
			imgClass: "lotusIconMsgInfo",
			typeAlt: this.strings.msgInfoAlt,
			role: "alert"
		};
		dojo.mixin(this,this[obj.msgType]);
	},
	/**
	 * Called after the widget is rendered in the UI.
	 * 	Render the message item  
	 */
	postCreate: function() {
		console.log("Debug : MessageItem postCreate");
		this.renderItem();
	},
	
	renderItem: function() {
		if(this.canClose){
			dojo.removeClass(this.closeBtn,"lotusHidden");
		}
	},
	
	/**
	 * 	Called when click the close button 'X'.
	 */
	clearItem: function(){
		this.destroyRecursive();
	}
});
