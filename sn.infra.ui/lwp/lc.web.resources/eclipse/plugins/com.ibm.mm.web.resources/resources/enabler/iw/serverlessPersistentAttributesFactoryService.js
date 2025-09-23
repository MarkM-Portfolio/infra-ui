/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.enabler.iw.serverlessPersistentAttributesFactoryService");
dojo.provide("com.ibm.mm.enabler.iw.persistentAttributesFactoryService");

dojo.require("com.ibm.mm.enabler.iw.ItemSet");

dojo.declare("com.ibm.mm.enabler.iw.services.persistentAttributesFactoryService",null,  {
    createPersistentAttributes: function(widget)  {
        return new com.ibm.mm.enabler.iw.PersistentAttributes(widget, true /*serverless*/);
    }
});
