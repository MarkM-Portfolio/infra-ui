/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare"
], function (dojo, declare) {

	if(!dojo._hasResource["com.ibm.mm.enabler.iw.widget"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
	dojo._hasResource["com.ibm.mm.enabler.iw.widget"] = true;
	declare("com.ibm.mm.enabler.iw.iWidgetWrapper",null,{
		    constructor:function(id){
		     // summary: iWidgetWrapper; interface defines methods that administrative iWidget can use to retrieve information of another iWidget
		     // In future, need to add functions for events,wires,payloaddef.supportedModes 
		     // for events and payloaddef need to support "deferred" interface since it need to wait until widgets is fully loaded
			},
			getiWidgetMetadata:function(){
			 //summary:This method returns an object that contains iDescriptor items as defined by iWidget spec
		     //in v1.1, it simply contains default title and icon
			},
			getInstanceAttributes:function(){
			 //summary: This method returns an object that contains instance level attribute items	
			}	
	});
	
	declare("com.ibm.mm.enabler.iw.iWidgetMetadata",null,{
		CONSTANTS:{"title":"title","icon":"icon"},
	    constructor:function(id){
	     // summary: iWidgetMetadata; interface describes widget metadata such as title,icon
		},
		getItemValue:function(/*String*/ itemName){
		 //summary:This method returns an object that contains value for the required iDescriptor item
		 //in v1.1, it simply supports default title and icon
		 // getItemValue("title"); --> returns default title
		 // getItemValue("icon"); --> returns icon	
		 // return null if value can't be found	
		},
		setItemValue:function(/*String*/ itemName,/*object*/itemValue ){
			//summary:This method sets an value of an iDescriptor item
		},	
		save:function(){
			//summary: This method persists the data
		}	
	});
	
	}
	
	return com.ibm.mm.enabler.iw.widget;
});
