/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.enabler.iw.utils");

dojo.require("com.ibm.mm.enabler.iw.payloadDef");
dojo.require("com.ibm.mm.enabler.utilities");

dojo.declare("com.ibm.mm.enabler.iw.utils",null,{

   widgetClassRE:new RegExp("(mm:|mm_|iw-)iWidget"),

   findElementByAttribute:function(/*String*/att,/*String*/value,/*DOMElement*/root,/*[]*/element,hasMultiple){
   
       var aRoot = root;
       if (!root.childNodes || root.childNodes == null) return false; 
       
        var childNodes = aRoot.childNodes;
        for (var i=0;i<childNodes.length;i++) {
            var child = childNodes[i];
            if (child.nodeType == 1) {
               
                var childClassName = child.className;
                if (childClassName.match(this.widgetClassRE)) return false;

                var childValue = child.getAttribute(att); 
                if ( att == "class" ) {
                    childValue = child.className;
                } 

                if (value == childValue ) {
                    element.push(child);
                    if (!hasMultiple)return true;
                }
                
                var rc=this.findElementByAttribute(att,value,child,element,hasMultiple);
                if (!hasMultiple && rc)  return rc;
                
            } 
        } 
        if (element.length !=0 ) return true;
        return false;        
   },  
   
   getClass:function(/*object*/node){
        var childValue = node.getAttribute("class");
        childValue = childValue?childValue:node.getAttribute("className");
        return childValue;
   },

   checkParentElement:function(/*Node*/selfNode, /*RegExp*/classToFind)
   {
	   if (selfNode) {
		   var dadNode = selfNode.parentNode;
		   if (dadNode) {
			   if (dadNode.className) {
				   if (dadNode.className.match(classToFind)) {
					   return dadNode.id;
				   }
			   }
			   return this.checkParentElement(dadNode, classToFind);
		   }
	   }
	   return null;
   },

   getWidgetParent:function(/*String*/id, /*RegExp*/classToFind)
   {
	   if (id==null) {
		   return null;
	   }	   
	   if (!classToFind) {
		   classToFind=this.widgetClassRE;
	   }
	   return this.checkParentElement(dojo.byId(id),classToFind);
   },

   getParents:function(/*widget*/widget,/*array*/arr)
   {
       var parent = widget.getParent();
       if (typeof parent != "undefined" && parent != null) {
           arr.push(parent);
           this.getParents(parent,arr);
       } 
       return;
   },
   getPayloadDef:function(aNode){
       var name = aNode.getAttribute("name");
       var payloadDef = new com.ibm.mm.enabler.iw.payloadDef(name);
       var attributes = aNode.attributes;
       //var attributesArr = [];
       for (var i=0;i<attributes.length;i++)
       {    
           var anAttribute = attributes[i];
           if (anAttribute.name != "name"){
              payloadDef.setAttribute(anAttribute.name,anAttribute.value);
           }   
       }
       var children = aNode.childNodes;
       for (var j=0;j<children.length;j++){
           var child = children[j];
           if ( child.nodeType == 1){
               var aChildPayloadDef = this.getPayloadDef(child);
               payloadDef.setChild(aChildPayloadDef.name,aChildPayloadDef);
           }
       }
       return payloadDef;
   }                      
});

com.ibm.mm.enabler.iw.utils = new com.ibm.mm.enabler.iw.utils();
