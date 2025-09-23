/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide( "com.ibm.mm.enabler.debug" );  
dojo.require( "com.ibm.mm.enabler.status" );

com.ibm.mm.enabler.debug.Constants = {
    MMLogging:"/mm/logging",
    MMStatusMsg:"/mm/statusMsg",
    MMTracing:"/mm/tracing",
    LOG:"log",
    INFO:"info",
    WARN:"warn",
    ERROR:"error"
};

com.ibm.mm.enabler.debug.log = function(/*string*/functionName) { 
//summary: writes a message to firebug console or publish the message.
//description: 
//		This can be used to write tracing statement to firebug console or publish to another page components
//      You may pass as many arguments you may like.
//functionName: function name with class, for example com.ibm.mm.enabler.iw.WidgetStub.getItemSet
    if (com.ibm.mm.enabler.debug.isLogging){ 
        if (arguments.length > 1) {
			arguments[0] = functionName + " --> ";
		}
        com.ibm.mm.enabler.debug._log(com.ibm.mm.enabler.debug.Constants.LOG,arguments);   
        com.ibm.mm.enabler.debug._publishTracing(com.ibm.mm.enabler.debug.Constants.LOG,arguments); 
    }
};

com.ibm.mm.enabler.debug.entry = function ( functionName ) {
//summary: writes a message to indicate function entry.
//description: 
//		This can be used to write a message to indicate it's a funciton entry
//      You may pass as many arguments you may like.
//functionName: function name within the class, for example com.ibm.mm.enabler.iw.WidgetStub.getItemSet    
    if (com.ibm.mm.enabler.debug.isLogging){ 
        if (arguments.length > 1) {
			arguments[0] = functionName + " --> Entry ";
		}
        com.ibm.mm.enabler.debug._log(com.ibm.mm.enabler.debug.Constants.LOG,arguments);   
        com.ibm.mm.enabler.debug._publishTracing(com.ibm.mm.enabler.debug.Constants.LOG,arguments);
    }
};

com.ibm.mm.enabler.debug.exit = function( functionName ) {
//summary: writes a message to indicate function exit
//description: 
//		This can be used to write a message to indicate function exit
//      You may pass as many arguments you may like.
//functionName: function name within the class, for example com.ibm.mm.enabler.iw.WidgetStub.getItemSet    
    if (com.ibm.mm.enabler.debug.isLogging){ 
        if (arguments.length > 1) {
			arguments[0] = functionName + " --> Exit ";
		}
        com.ibm.mm.enabler.debug._log(com.ibm.mm.enabler.debug.Constants.LOG,arguments);   
        com.ibm.mm.enabler.debug._publishTracing(com.ibm.mm.enabler.debug.Constants.LOG,arguments);
    }  
};

com.ibm.mm.enabler.debug.escapeXmlForHTMLDisplay = function( string ) {
	string = string.replace( /</g, "&lt;" );
	string = string.replace( />/g, "&gt;" );
	return string;
};

com.ibm.mm.enabler.debug.info = function(functionName) {
//summary: writes a message as "info"
//description: 
//		This can be used to write a message as "info"  to firebug console or publish to another page components
//      You may pass as many arguments you may like.
//functionName: function name within the class, for example com.ibm.mm.enabler.iw.WidgetStub.getItemSet    
    //removed by zhongqj@cn.ibm.com: if (com.ibm.mm.enabler.debug.isLogging){
	try{
        if (arguments.length > 1) {
			arguments[0] = functionName + " --> ";
		}  
        com.ibm.mm.enabler.debug._log(com.ibm.mm.enabler.debug.Constants.INFO,arguments);   
        com.ibm.mm.enabler.debug._publishLogging(com.ibm.mm.enabler.debug.Constants.INFO,arguments);
	} catch(e){}
    //removed by zhongqj@cn.ibm.com:}
};

com.ibm.mm.enabler.debug.warn = function(functionName) {
//summary: writes a message as "warning"
//description: 
//		This can be used to write a message as "warning"  to firebug console or publish to another page components
//      You may pass as many arguments you may like.
//functionName: function name within the class, for example com.ibm.mm.enabler.iw.WidgetStub.getItemSet    
    //removed by zhongqj@cn.ibm.com:if (com.ibm.mm.enabler.debug.isLogging)  { 
        if (arguments.length > 1) {
			arguments[0] = functionName + " --> ";
		}  
        com.ibm.mm.enabler.debug._log(com.ibm.mm.enabler.debug.Constants.WARN,arguments);  
        com.ibm.mm.enabler.debug._publishLogging(com.ibm.mm.enabler.debug.Constants.WARN,arguments);
    //removed by zhongqj@cn.ibm.com:}
};
com.ibm.mm.enabler.debug.error = function(functionName) {
//summary: writes a message as "error"
//description: 
//		This can be used to write a message as "error"  to firebug console or publish to another page components
//      You may pass as many arguments you may like.
//functionName: function name within the class, for example com.ibm.mm.enabler.iw.WidgetStub.getItemSet    
    //removed by zhongqj@cn.ibm.com:if (com.ibm.mm.enabler.debug.isLogging) { 
        if (arguments.length > 1) {
			arguments[0] = functionName + " --> ";
		}  
        com.ibm.mm.enabler.debug._log(com.ibm.mm.enabler.debug.Constants.ERROR,arguments); 
        com.ibm.mm.enabler.debug._publishLogging(com.ibm.mm.enabler.debug.Constants.ERROR,arguments);
    //removed by zhongqj@cn.ibm.com:}
};
com.ibm.mm.enabler.debug._log = function(type,args) {
    if (com.ibm.mm.enabler.debug.isLogging)
    {   
        if (args.length >= 2 && dojo.isString(args[1])) {
            var arr = [];
            arr.push(args[0]+args[1]);
            for (var i=2;i<args.length;i++) {
                arr.push(args[i]);
            }
            console[type].apply(window.console,arr); 
        }
        else{
            console[type].apply(window.console,args);      
        } 
    }
};
com.ibm.mm.enabler.debug._publishTracing = function(type,args){
    if (typeof ibmConfig  != "undefined" && ibmConfig !== null && ibmConfig.allowPublishTracing === true) {
        var arguments = {};
        arguments.type = type;
        arguments.args = args;
        var temp = [];
        temp[0] = arguments;
        //dojo.publish(com.ibm.mm.enabler.debug.Constants.MMTracing,temp);
        dojo.publish(com.ibm.mm.enabler.debug.Constants.MMTracing,[arguments]);
    }
};
com.ibm.mm.enabler.debug._publishLogging = function(type,args){
    if (typeof ibmConfig  != "undefined" && ibmConfig !== null && ibmConfig.allowPublishLogging === true) {
        var arguments = {};
        arguments.type = type;
        //arguments.message = message;
        arguments.args = args;
        //arguments.details = details;
        var temp = [];
        temp[0] = arguments;
        //dojo.publish(com.ibm.mm.enabler.debug.Constants.MMLogging,temp);
        dojo.publish(com.ibm.mm.enabler.debug.Constants.MMLogging,[arguments]);
    }
};

if (typeof ibmConfig != "undefined" && ibmConfig !== null && ibmConfig.isDebug === true) {
	com.ibm.mm.enabler.debug.isLogging = true;
} else {
	com.ibm.mm.enabler.debug.isLogging = false;
}


com.ibm.mm.enabler.debug.logInlineMessage = function(containerNode,type,message,details,component){
//summary: writes a message to the page dom
//description: 
//		This can be used to write a message to the page dom.
//containerNode: dom element to which the message will be added 
//type: type of message such as "info","warn","error"
//message: message that need to be displayed
//details: detailed information such as exception details
//component: component that throws the message
    var statusMsg  = new com.ibm.mm.enabler.status.StatusMessage(type,message,details);
    if (containerNode) {
        statusMsg.render(containerNode);
    }
    com.ibm.mm.enabler.debug._publishStatusMsg(type,message,details,component);
};

com.ibm.mm.enabler.debug._publishStatusMsg = function(type,message,details,args,component){
    if (typeof ibmConfig  != "undefined" && ibmConfig !== null && ibmConfig.allowPublishStatusMsg === true) {
        var arguments = {};
        arguments.type = type;
        arguments.args = args;
        arguments.message = message;
        arguments.details = details;
        arguments.component = component;
        var temp = [];
        temp[0] = arguments;
        //dojo.publish(com.ibm.mm.enabler.debug.Constants.MMStatusMsg,temp);
        dojo.publish(com.ibm.mm.enabler.debug.Constants.MMStatusMsg,[arguments]);
    }
};
