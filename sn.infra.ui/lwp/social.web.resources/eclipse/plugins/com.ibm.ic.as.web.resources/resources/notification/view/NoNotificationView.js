/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo/_base/declare",
	"dojo/i18n!ic-as/nls/activitystream",
	"dojo/text!./templates/NoNotificationView.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dojo/has",
	"dojo/dom-class",
	"dojo/text!../icons/bee_large.svg"
], function (declare, i18nactivitystream, template, _Templated, _Widget, has, domClass, beeSvg) {

	/**
	 * Displayed when no content is available
	 * @author scrawford
	 */
	
	var NoNotificationView = declare([_Widget, _Templated],
	{		
		templateString: template,
	
	    strings: i18nactivitystream,
	    
	    postCreate: function(){
	        this.inherited(arguments);
		}
	});
	return NoNotificationView;
});