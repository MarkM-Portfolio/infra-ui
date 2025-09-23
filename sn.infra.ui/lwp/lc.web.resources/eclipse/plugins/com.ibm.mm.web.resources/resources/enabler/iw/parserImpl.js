/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.parserImpl");
dojo.require("com.ibm.mm.enabler.xslt");

dojo.declare("com.ibm.mm.enabler.iw.parser.WidgetParser",null,  {
     parseWidgetDefinition: function(){   
         return null;
     }
});
dojo.declare("com.ibm.mm.enabler.iw.parser.legacyXMLParser",com.ibm.mm.enabler.iw.parser.WidgetParser,  {
    constructor:function(responseText){
        this.xmlStr = responseText;
    },
    namespaces: {
        "iw" : "http://www.ibm.com/iWidget"
    },
     parseWidgetDefinition: function(){  
         var xmlData = com.ibm.mm.enabler.xslt.loadXmlString(this.xmlStr);
         var markup = this.readMarkup( xmlData );	
         var itemSetsArr = this.readItemSets(xmlData);
         var uri = this.readContentURI(xmlData);
         var widgetEvents = this.readWidgetEvents(xmlData);
         var name = this.readName(xmlData);
         var iScope = this.readiScope(xmlData);
         var supportedModes = this.readSupportedModes(xmlData);
         var handledEvents = this.readPublicEvents(xmlData,"iw:handledEvents");
         var publishedEvents = this.readPublicEvents(xmlData,"iw:publishedEvents");
         var resources = this.readResources(xmlData);
         var payloadDefs = this.readPayloadDefs(xmlData);
         var iDescriptor = this.readIDescriptor(xmlData);
         return new com.ibm.mm.enabler.iw.WidgetDefinition(name,markup,iScope,itemSetsArr,widgetEvents,uri,supportedModes,publishedEvents,handledEvents,resources,payloadDefs,iDescriptor);
     },
     readMarkup: function ( /*XMLDocument*/xmlData ) {
                   com.ibm.mm.enabler.debug.entry( "legacyXMLParser.readMarkup", xmlData.text );
                   var contentsXPath = "/iw:iwidget/iw:content";
                   //we support html fragment only in iw:content
                   var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                   var defaultContent = "";					
                   if (nodes != null && nodes.length > 0) {
                       var rootNode =  nodes[0];
                       var child = rootNode.childNodes; 

                       for (var j=0; j<child.length; j++) {
                           var aNode = child[j];

                           //if this is CDATAsection   
                           if ( aNode.nodeType == 4 ) {
                               defaultContent = defaultContent.concat(aNode.nodeValue);
                           }
                           else if ( aNode.nodeType == 3 ){//textNode
                               defaultContent = defaultContent.concat(aNode.nodeValue);
                           }                           
                       }                          
                   }
                   com.ibm.mm.enabler.debug.exit("legacyXMLParser.readMarkup",defaultContent); 
                   return defaultContent;
               },
               readSupportedModes:function(/*XMLDocument*/xmlData){
                // read the iwidget's "supportedModes" attribute and store
                  // the string (no further parding here)
                  var root = xmlData.documentElement;
                    var modes = root.getAttribute("supportedModes");
                 // return null if not found
                    if (typeof modes == "undefined" || modes == null )return null;
                   return modes;                                                       
               },
               readItemSets: function ( /*XMLDocument*/xmlData ) {
                    com.ibm.mm.enabler.debug.entry("legacyXMLParser.readItemSets");

                    var itemSetsArr = {};
                    var contentsXPath = "/iw:iwidget/iw:itemSet";
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                    for (var i=0; i< nodes.length ;i++) {
                        var aNode =  nodes[i];
                        var name = aNode.getAttribute("name");
                        var onItemSetChanged = aNode.getAttribute("onItemSetChanged");

                        var itemSetWrapper = {name:name,onItemSetChanged:onItemSetChanged};
                        itemSetWrapper.items={};
                        var child = aNode.childNodes; 
                        for (var j=0; j<child.length; j++) {
                            var aItemNode = child[j];
                             if ( aItemNode.nodeType == 1) {
                                 var isReadOnly = aItemNode.getAttribute("readOnly");
                                 com.ibm.mm.enabler.debug.entry("legacyXMLParser.readItemSets found attribute name:"+aItemNode.getAttribute("name")+" value:"+aItemNode.getAttribute("value")); 
                                 var anItem = {id:aItemNode.getAttribute("name"),value:aItemNode.getAttribute("value"),readOnly:isReadOnly};
                                 itemSetWrapper.items[anItem.id] =anItem;
                             }
                        } 
                        itemSetsArr[name]=itemSetWrapper;
                    }
                    com.ibm.mm.enabler.debug.exit("legacyXMLParser.readItemSets");
                    return itemSetsArr;
               },
               readPayloadDefs: function ( /*XMLDocument*/xmlData ) {
                    com.ibm.mm.enabler.debug.entry("legacyXMLParser.readPayloadDefs");
                    var payloadDefsArr = {};
                    var contentsXPath = "/iw:iwidget/iw:payloadDef";
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                    for (var i=0; i< nodes.length ;i++) {
                        var aNode =  nodes[i];
                        var payloadDef = com.ibm.mm.enabler.iw.utils.getPayloadDef(aNode);                                                                                 
                        payloadDefsArr[payloadDef.name]=payloadDef;
                    }
                    com.ibm.mm.enabler.debug.exit("legacyXMLParser.readPayloadDef ",nodes.length+ " payloadDefs are saved "); 
                    return payloadDefsArr;
               },
               readName: function(/*XMLDocument*/xmlData){
                    var root = xmlData.documentElement;
                    var name = root.getAttribute("name");
                    if (typeof name == "undefined" || name == null ) return null;
                    return name;
               },
               //this attribute is a convenience for an extremely common iwidget attribute, if specifies a URI which the iwidget will use to fetch data or markup which it will present to the user
               readContentURI: function(/*XMLDocument*/xmlData){
                    var root = xmlData.documentElement;
                    var uri = root.getAttribute("contentURI");
                    if (typeof uri == "undefined" || uri == null ) return null;
                    return uri;
               },
               readiScope: function(/*XMLDocument*/xmlData){
                    var root = xmlData.documentElement;
                    var iScope = root.getAttribute("iScope");
                    if (typeof iScope == "undefined" || iScope == null ) return null;
                    return iScope;
               },
               readWidgetEvents: function(/*XMLDocument*/xmlData){
                   //read all teh onSth event
                   var root = xmlData.documentElement;
                   var widgetEvents = {};
                   var attributes = root.attributes;
                   for (var i=0;i<attributes.length;i++)
                   {
                      var event = attributes[i];

                      if (event.name.indexOf ("on") ==0)
                      {
                          var handler = event.value;
                          if (typeof handler != "undefined" && handler != null ) widgetEvents[event.name] = handler; 
                       }
                    }                      
                   return widgetEvents;                    
               },               
               readPublicEvents:function(/*XMLDocument*/xmlData,/*String*/eventType){
                    var contentsXPath = "/iw:iwidget/"+eventType;
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                    if (typeof nodes != "undefined" && nodes != null && nodes.length !=0 ){
                        var events = {};
                        var node = nodes[0];
                        var children = node.childNodes;
                        for (var j=0;j<children.length;j++){
                            var eventNode = children[j];
                            if ( eventNode.nodeType == 1) {
                            //todo. handle aliases
                            var iEventDescription=new com.ibm.mm.enabler.iw.iEventDescriptionImpl(eventNode.getAttribute("eventName"),eventNode.getAttribute("onEvent"),eventNode.getAttribute("payloadType"),eventNode.getAttribute("description"));
                            if (!events[eventNode.getAttribute("eventName")])events[eventNode.getAttribute("eventName")]=[];
                            events[eventNode.getAttribute("eventName")].push(iEventDescription); 
                            }                            
                        }                         
                    }
                    if (!events)return null;
                    return events;
                },
                readResources:function(/*XMLDocument*/xmlData){
                    var resourcePath = "/iw:iwidget/iw:resource";
                    var resources = [];
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(resourcePath, xmlData,this.namespaces);
                    if (typeof nodes != "undefined" && nodes != null && nodes.length !=0 ){
                        for (var i=0; i<nodes.length;i++){
                            var node = nodes[i];
                            var resource = {};
                            resource["name"] = node.getAttribute("resourceName");
                            resource["src"] = node.getAttribute("uri");
                            resource["version"] = node.getAttribute("version");
                            resource["callback"] = node.getAttribute("callback");     
                            resource["mimetype"] = node.getAttribute("mimetype");
                            resources[i]=resource;           
                        }                    
                    }
                    return resources;
                },
                readIDescriptor:function(/*XMLDocument*/xmlData){
                     //don't support this in legacy
                     return null;
                }

});

dojo.declare("com.ibm.mm.enabler.iw.parser.standardXMLParser",com.ibm.mm.enabler.iw.parser.WidgetParser,  {
    constructor:function(responseText){
        this.xmlStr = responseText;
    },
    namespaces: {
        "iw" : "http://www.ibm.com/xmlns/prod/iWidget"
    },
    reservedAttributes:{
        iScope:"iScope",
        supportedModes:"supportedModes",
        id:"id",
        allowInstanceContent:"allowInstanceContent",
        lang:"language",
        "xmlns:iw":"xmlns:iw"      
    },
     parseWidgetDefinition: function(){  
         var xmlData = com.ibm.mm.enabler.xslt.loadXmlString(this.xmlStr);
         var widgetDef = this.readRootElement(xmlData);  
         widgetDef.markup = this.readMarkup( xmlData );  
         widgetDef.itemSetsArr = this.readItemSets(xmlData);
         widgetDef.handledEvents = this.readPublicEvents(xmlData,"handled");
         widgetDef.publishedEvents = this.readPublicEvents(xmlData,"published");
         widgetDef.resources = this.readResources(xmlData);
         widgetDef.payloadDefs = this.readPayloadDefs(xmlData);
         widgetDef.eventDescriptions = this.readEventDescriptions(xmlData);
         return new com.ibm.mm.enabler.iw.standardWidgetDefinition(widgetDef);
     },
     readRootElement:function( /*XMLDocument*/xmlData ) {
          var widgetDef = {};
           var root = xmlData.documentElement;
           var modes = root.getAttribute("supportedModes");
           // return null if not found
           if (typeof modes == "undefined" || modes == null )modes="view";
           widgetDef.supportedModes = modes;  

           var name = root.getAttribute("id");
           if (typeof name == "undefined" || name == null ) name=null;
           widgetDef.id = name;
           widgetDef.name = name;

           var temp = root.getAttribute("allowInstanceContent");
           var allowInstanceContent = false;
           if (typeof temp != "undefined" && temp != null  && temp == "true") allowInstanceContent=true ;
           widgetDef.allowInstanceContent = allowInstanceContent;  

           var lang = root.getAttribute("language");
           if (typeof lang == "undefined" || lang == null ) lang="en";
           widgetDef.lang=lang;

           var widgetEvents = {};   
           var attributes = root.attributes;
           for (var i=0;i<attributes.length;i++)
           {
                var event = attributes[i];
                if (event.name.indexOf ("on") ==0)
                {
                    var handler = event.value;
                    if (typeof handler != "undefined" && handler != null ) widgetEvents[event.name] = handler; 
                 }
           } 
           widgetDef.widgetEvents = widgetEvents;

           var iScope = root.getAttribute("iScope");
           if (typeof iScope == "undefined" || iScope == null ) iScope=null;
           widgetDef.iScope = iScope;

           var iDescriptorItems = iwConstants.iDescriptorItems;
           var iDescriptor = {};
           for (var i in iDescriptorItems) {
               var name = iDescriptorItems[i];
               var value = root.getAttribute(name);
               iDescriptor[name] = value;
           }
           widgetDef.iDescriptor = iDescriptor;

           var simpleAttributes = {};
           var attributes = root.attributes;
           for (var i=0;i<attributes.length;i++)
           {
                var att = attributes[i];
                if (att.name.indexOf ("on") !=0 && !iwConstants.iDescriptorItems[att.name] && !this.reservedAttributes[att.name])
                {
                    var value = att.value;
                    if (typeof value != "undefined" && value != null ) simpleAttributes[att.name] = value; 
                 }
           } 
           widgetDef.simpleAttributes = simpleAttributes;
           return widgetDef;
     },
     readMarkup: function ( /*XMLDocument*/xmlData ) {
                   com.ibm.mm.enabler.debug.entry( "standardXMLParser.readMarkup", xmlData.text );
                   var contentsXPath = "/iw:iwidget/iw:content";
                   //we support html fragment only in iw:content
                   var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                   var contents = {};
                   var defaultContent = "";	 
                   var mode = null;
                   if (nodes != null && nodes.length > 0) {
                       for (var i=0;i<nodes.length;i++) {
                           var rootNode =  nodes[i];
                           var child = rootNode.childNodes; 
                           
                           for (var j=0; j<child.length; j++) {
                               var aNode = child[j];

                               //if this is CDATAsection   
                               if ( aNode.nodeType == 4 ) {
                                   defaultContent = defaultContent.concat(aNode.nodeValue);
                               }
                               else if ( aNode.nodeType == 3 ){//textNode
                                   defaultContent = defaultContent.concat(aNode.nodeValue);
                               }                           
                           }
                           mode = rootNode.getAttribute("mode");
                           if (typeof mode == "undefined" || mode == null) {
                               mode = "view";      //assign default mode
                               break;
                           }
                           contents[mode] = defaultContent;
                           defaultContent = "";
                       }
                   }
                   com.ibm.mm.enabler.debug.exit("standardXMLParser.readMarkup",contents); 
                   return contents;
               },
               readItemSets: function ( /*XMLDocument*/xmlData ) {
                    com.ibm.mm.enabler.debug.entry("standardXMLParser.readItemSets");

                    var itemSetsArr = {};
                    var contentsXPath = "/iw:iwidget/iw:itemSet";
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                    for (var i=0; i< nodes.length ;i++) {
                        var aNode =  nodes[i];
                        var name = aNode.getAttribute("id");
                        var onItemSetChanged = aNode.getAttribute("onItemSetChanged");
                        var temp = aNode.getAttribute("private");
                        var isPrivate = false;
                        if (typeof temp != "undefined" && temp != null && temp =="true") {
                            isPrivate = true;
                        }

                        var descriptionRef = aNode.getAttribute("description");

                        var itemSetWrapper = {name:name,onItemSetChanged:onItemSetChanged,isPrivate:isPrivate};
                        itemSetWrapper.items = {};
                        
                        var child = aNode.childNodes; 
                        for (var j=0; j<child.length; j++) {
                            var aItemNode = child[j];
                             if ( aItemNode.nodeType == 1) {
                                 var isReadOnly = aItemNode.getAttribute("readOnly");
                                 com.ibm.mm.enabler.debug.entry("standardXMLParser.readItemSets found attribute name:"+aItemNode.getAttribute("name")+" value:"+aItemNode.getAttribute("value")); 
                                 if (typeof isReadOnly != "undefined" && isReadOnly != null && isReadOnly=="true") {
                                     isReadOnly = true;
                                 }
                                 else isReadOnly = false;
                                 var id = aItemNode.getAttribute("id");
                                 var value = aItemNode.getAttribute("value");
                                 var anItem = {id:id,value:value,readOnly:isReadOnly};
                                 itemSetWrapper.items[id]=anItem;
                             }
                        } 
                        itemSetsArr[name]=itemSetWrapper;
                    }
                    com.ibm.mm.enabler.debug.exit("standardXMLParser.readItemSets");
                    return itemSetsArr;
               },
               readPayloadDefs: function ( /*XMLDocument*/xmlData ) {
                    com.ibm.mm.enabler.debug.entry("standardXMLParser.readPayloadDefs");
                    var payloadDefsArr = {};
                    var contentsXPath = "/iw:iwidget/iw:payloadDef";
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                    for (var i=0; i< nodes.length ;i++) {
                        var aNode =  nodes[i];
                        var payloadDef = com.ibm.mm.enabler.iw.utils.getPayloadDef(aNode);                                                                                 
                        payloadDefsArr[payloadDef.name]=payloadDef;
                    }
                    com.ibm.mm.enabler.debug.exit("standardXMLParser.readPayloadDef ",nodes.length+ " payloadDefs are saved "); 
                    return payloadDefsArr;
               },
               readPublicEvents:function(/*XMLDocument*/xmlData,/*String*/eventType){
                    var contentsXPath = "/iw:iwidget/iw:event[@"+eventType+"]";
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(contentsXPath, xmlData,this.namespaces);
                    if (typeof nodes != "undefined" && nodes != null && nodes.length !=0 ){
                        var events = {};
                        for (var j=0;j<nodes.length;j++){
                            var eventNode = nodes[j];
                            if ( eventNode.nodeType == 1) {
                            //todo. handler attributes
                            var iEvent={};
                            iEvent.id = eventNode.getAttribute("id");
                            var description =eventNode.getAttribute("eventDescName");
                            if (typeof description == "undefined" || description == null) {
                                description = eventNode.getAttribute("description");  
                            }
                            iEvent.description = description;                            
                            iEvent.onEvent = eventNode.getAttribute("onEvent"); 
                            iEvent.onNewWire = eventNode.getAttribute("onNewWire");
                            iEvent.onRemoveWire = eventNode.getAttribute("onRemoveWire");
                            // if (!events[iEventDescription.id]) events[iEventDescription.id] = [];
                             //events[iEventDescription.id].push(iEventDescription); 
                            events[iEvent.id] = iEvent;
                            }                            
                        }                         
                    }
                    if (!events)return {};
                    return events;
                },
                readResources:function(/*XMLDocument*/xmlData){
                    var resourcePath = "/iw:iwidget/iw:resource";
                    var resources = [];
                    var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(resourcePath, xmlData,this.namespaces);
                    if (typeof nodes != "undefined" && nodes != null && nodes.length !=0 ){
                        for (var i=0; i<nodes.length;i++){
                            var node = nodes[i];
                            var resource = {};
                            resource[iwConstants.RESOURCE.id] = node.getAttribute("id");
							var src = node.getAttribute("src");
							if (typeof src == "undefined" || src == null) src = node.getAttribute("uri");
                            resource[iwConstants.RESOURCE.src] = src;
                            resource[iwConstants.RESOURCE.version] = node.getAttribute("version");
                            resource[iwConstants.RESOURCE.callback] = node.getAttribute("callback");     
                            resource[iwConstants.RESOURCE.mimetype] = node.getAttribute("mimeType");
                            resources[i]=resource;           
                        }                    
                    }
                    return resources;
                },
                readEventDescriptions:function(/*XMLDocument*/xmlData){
                     var eventDescriptionpath="iw:iwidget/iw:eventDescription";
                     var eventDescriptions = {};
                     var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(eventDescriptionpath, xmlData,this.namespaces);
                     if (typeof nodes != "undefined" && nodes != null && nodes.length !=0 ){
                       for (var i=0; i<nodes.length;i++){
                           var node = nodes[i];
                           var eventDescription = {};
                           var id =  node.getAttribute("id");   
                           eventDescription["id"] = id;
                           eventDescription["payloadType"] = node.getAttribute("payloadType");
                           eventDescription["description"] = node.getAttribute("description");
                           eventDescription["descriptionURI"] = node.getAttribute("descriptionURI");     
                           eventDescription["lang"] = node.getAttribute("lang");
                           eventDescription["aliases"] = node.getAttribute("aliases");
                           eventDescription["descriptions"]={};
                           var children = node.childNodes;
                           for (var j=0;j<children.length;j++) {
                               var aNode = children[j];
                               if ( aNode.nodeType == 1) {
                                   var temp = {};
                                   temp["lang"] = aNode.getAttribute("lang");
                                   temp["description"] = aNode.getAttribute("description");
                                   temp["title"] = aNode.getAttribute("title");
                                   temp["descriptionURI"] = aNode.getAttribute("descriptionURI");
                                   eventDescription["descriptions"][aNode.getAttribute("lang")] = temp; 
                                }
                           } 
                           eventDescriptions[id]=eventDescription;           
                       }                    
                     } 
                     return eventDescriptions;
                }
});
