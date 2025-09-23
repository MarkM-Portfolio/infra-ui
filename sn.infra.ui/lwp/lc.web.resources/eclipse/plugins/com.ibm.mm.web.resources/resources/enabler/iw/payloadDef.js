/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.enabler.iw.payloadDef");
dojo.require("com.ibm.mm.enabler.utilities");

dojo.declare("com.ibm.mm.enabler.iw.payloadDef", null, 
{
    constructor:function(name,type,defaultValue,description,attributes) {
        this.name = name;
        this.attributes = attributes;
        if (typeof (this.attributes) == "undefined" || this.attributes == null ) {
            this.attributes = {};
        }

        if (typeof type != "undefined" && type != null ) 
            this.attributes["type"] = type;
        if (typeof defaultValue != "undefined" && defaultValue != null ) 
           this.attributes["defaultValue"] = defaultValue;
        if (typeof description != "undefined" && description != null ) 
                   this.attributes["description"] = description;

        this.attributeNames = [];
        this.attributeNames.push("type");
        this.attributeNames.push("defaultValue");
        this.attributeNames.push("description");

        var aName;
        for (aName in attributes) {
            this.attributeNames.push(aName);
        }
        this.children = new com.ibm.mm.enabler.ArrayMap();/*an array of payloadDef*/
   },
   setAttribute:function(name,defaultValue){
        this.attributes[name] = defaultValue;
        if (typeof (this.attributeNames[name]) != "undefined"){
            this.attributeNames.push(name);
        }
   },
   getAttribute:function(name){
        var defaultValue =  this.attributes[name];
        if (typeof defaultValue == "undefined") {
            defaultValue = null;
        }
        return defaultValue;
   },
   getAttributeNames:function(){
        this.attributeNames;
   },
   getChildren:function(){
        return this.children.values();
   },
   getChild:function(name){
        return this.children.get(name);
   },
   setChild:function(name,/*object*/payloadDef){
         this.children.put(name,payloadDef);
   },
   getChildrenNames:function(){
       this.children.keySet();
   },
   getName:function(){
        return this.name;
   },
   getType:function(){
        return this.attributes["type"];
   },
   getDefaultValue:function(){
           return this.attributes["defaultValue"];
   },
   getDescription:function(){
           return this.attributes["description"];
   }
});
