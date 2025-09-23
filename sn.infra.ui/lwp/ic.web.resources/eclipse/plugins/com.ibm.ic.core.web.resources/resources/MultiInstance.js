/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"ic-core/HTMLUtil",
	"ic-core/utilities"
], function (HTMLUtil, utilities) {

	/* author: Neil Schultz                                              */
	/* ***************************************************************** */
	lconn.core.MultiInstance = function()
	{
	    // Load widget
	    this.onView = function()
	    {    
	        var attributesItemSet = this.iContext.getiWidgetAttributes();
	
		    var widgetTitle = "Widget Name: "+ HTMLUtil.escapeText(attributesItemSet.getItemValue("computedWidgetTitle"))+"<br/>";
		    var value1 = "Value 1: "+HTMLUtil.escapeText(attributesItemSet.getItemValue("value1"))+"<br/>";
		    var value2 = "Value 2: "+HTMLUtil.escapeText(attributesItemSet.getItemValue("value2"))+"<br/>";
		    var value3 = "Value 3: "+HTMLUtil.escapeText(attributesItemSet.getItemValue("value3"))+"<br/>";
		    var componentId = "componentId:  "+HTMLUtil.escapeText(attributesItemSet.getItemValue("componentId"))+"<br/>";
		    this.iContext.getElementById("multiInstanceWidgetContainer").innerHTML = widgetTitle + value1 + value2 + value3 + componentId;   
	    }				
	
	
	    
		// Display UI
	    this.showNewItemsUI = function (controlObj)
		{
			utilities.show(this.iContext.getElementById("newItemsUI"));
		};
		
	    // Close Edit Mode
	    this.closeNewItemsUI = function (controlObj)
		{	
			this.switchToMode(this.iContext.constants.mode.VIEW);
		};
			
		// Switch widget modes
	    this.switchToMode = function(mode)
		{
			this.iContext.iEvents.fireEvent("onModeChanged", "", "{'newMode': '" + mode + "'}");
		};
			
	    // Save form fields
	    this.saveAttribute = function (controlObj)
		{                       
	        // Set the widget title
	        var form = this.iContext.getElementByClass("lotusForm")[0];
	        var attributesItemSet = this.iContext.getiWidgetAttributes();
	        attributesItemSet.setItemValue("widgetTitle",form.widgetTitle.value); 
	        
	        // Set values       
	        attributesItemSet.setItemValue("value1",form.value1.value);        
	        attributesItemSet.setItemValue("value2",form.value2.value);        
	        attributesItemSet.setItemValue("value3",form.value3.value);
	        attributesItemSet.setItemValue("componentId",form.componentId.value); 
	        attributesItemSet.save();                      
	    };
	    
	    this.saveAndClose = function (controlObj)
		{                       
	        // Set the widget title
	        this.saveAttribute(controlObj);                      
	        
	        // Close and reload widget
	        this.closeNewItemsUI(controlObj);
	    };    
	    
	    
	    this.onedit = function() {
	        var form = this.iContext.getElementByClass("lotusForm")[0];
	        var attributesItemSet = this.iContext.getiWidgetAttributes();
	        form.widgetTitle.value = attributesItemSet.getItemValue("computedWidgetTitle");
	        form.value1.value = attributesItemSet.getItemValue("value1");
	        form.value2.value      = attributesItemSet.getItemValue("value2");
	        form.value3.value      = attributesItemSet.getItemValue("value3");  
	        form.componentId.value = attributesItemSet.getItemValue("componentId"); 
	    };
	}
	
	return lconn.core.MultiInstance;
});
