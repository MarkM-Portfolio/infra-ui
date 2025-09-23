/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-mm/enabler/iw/ItemSet"
], function (declare, ItemSet) {

	declare("com.ibm.mm.enabler.iw.services.persistentAttributesFactoryService",null,  {
	    createPersistentAttributes: function(widget)  {
	        return new com.ibm.mm.enabler.iw.PersistentAttributes(widget, false);
	    }
	});
	
	return com.ibm.mm.enabler.iw.persistentAttributesFactoryService;
});
