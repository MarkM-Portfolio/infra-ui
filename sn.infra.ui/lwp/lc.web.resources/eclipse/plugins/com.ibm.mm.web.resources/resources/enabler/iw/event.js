/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.event");


dojo.declare("com.ibm.mm.enabler.iw.iEvent",null,
{	constructor:function () {
    //summary: iEvent; it carries various pieces of information when an event flows at runtime
    /*name: The name of the event.
    //type: The type of any payload. If this is set to null, no information is being provided. 
    //payload: The data, if any, being provided by the source of the event.
    //source: The iWidget supplied name for the source iWidget.*/                 
    },
    name:/*String*/"",
    type:/*String*/"",
    payload:/*object*/null,
    source:/*String*/""
});

dojo.declare("com.ibm.mm.enabler.iw.iEventDescription",null,{

    constructor:function () {
    //summary: iEventDescription; it contains various pieces of information describing an event.
    /*name: The name of the event
    //handlingFn: This provides the name of a callback function with the following signature and no return value.
    //        function(ievent,/optional/handlerAttributes)
    //type: The type of any payload. If this is set to null, no information is being provided.
    //aliases: Optional.If there are other events known to be semantically equivalent, this array provides that information as a hint to the underlying system, which might expose it to the user.*/
     },
    name:/*String*/"",
    type:/*String*/"",//type: The type of any payload. If this is set to null, no information is being provided.
    aliases:/*String[]*/null,
    handlingFn:/*String*/"",
    getDescription:function(/*String*/locale){
        //summary: it returns a user-oriented description (markup allowed) of the event in the requested locale. If no locale is supplied, the default locale of the iWidget is used (with "en" being the default iWidget locale). The description is likely to be displayed when a user is wiring event flow between iWidgets.
        return null; //String @Return the description of a given locale,if no locale is privided, then the default locale of the iWidget is used.
    },
    setOnRemoveWire:function(/*String*/handler){
        //summary: it sets the name of a callback function when this event is removed from a wire
        //handler: name of the callback function       
    },
    getOnRemoveWire:function(){
        //summary: it returns the name of a callback function when this event is removed from a wire
         return null;//String @Return the name of the callback function when this event is removed from a wire        
    },
    setOnNewWire:function(/*String*/handler){
        //summary: it sets the name of a callback function when this event is wired with another event
        //handler: name of the callback function        
    },
    getOnNewWire:function(){
         //summary: it returns the name of a callback function when this event is wired with another event
         return null;//String @Return the name of the callback function when this event is wired with another event        
     }
});

dojo.declare("com.ibm.mm.enabler.iw.iEvents",null,
{
    constructor:function () {
    //summary: iEvents; module used for event distribution
    },
    publishEvent:function(/*String*/eventName,payload,payloadType){
        //summary: deprecated, it distributes an event
        //eventName: name of the event that needs to be distributed
        //payloadType: optional,type of the payload
        //payload: optional,object of the payload that needs to be distributed together with the event    
    },
    fireEvent:function(/*String*/eventName,/*String*/payloadType,/*object*/payload){
        //summary: This method informs the iContext to distribute an event with proper payload and payload type
        //eventName: name of the event that needs to be distributed
        //payloadType: optional,type of the payload
        //payload: optional,object of the payload that needs to be distributed together with the event     
    } 
});

dojo.declare("com.ibm.mm.enabler.iw.iEventsConstants",null,
{   constructor:function(){
//Summary: iEventsConstants; it defines constants for  various predefined iEvents.
    },
    onLoad:/*String*/"onLoad", 
    onUnLoad:/*String*/"onUnload",
    onModeChanged:/*String*/"onModeChanged",
    onItemSetChanged:/*String*/"onItemSetChanged",
    unloadWidget:/*String*/"/enabler/unloadWidget",
	unSubscribeWire:/*String*/"/enabler/unSubscribeWire",
    modeChanged:/*String*/"modeChanged"
});
