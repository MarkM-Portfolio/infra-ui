/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/json",
	"ic-mm/enabler/debug",
	"ic-mm/enabler/iw/widget"
], function (declare, lang, dom, JSON, debug, widgetModule) {

	declare("com.ibm.mm.enabler.iw.iWidgetWrapperImpl",com.ibm.mm.enabler.iw.iWidgetWrapper,{
		 constructor:function(id){
	    	// summary: iWidgetWrapper; interface defines methods that administrative iWidget can retrieve information of another iWidget
		    // like metadata,events,wires,payload
		    this.id = id;
		},
		getiWidgetMetadata:function(){
		//summary:This method returns an object that contains iDescriptor items as defined by iWidget spec
	    //in v1.1, it simply contains default title and icon
			return new com.ibm.mm.enabler.iw.iWidgetMetadataImpl(this.id);
		},
		getInstanceAttributes:function(){
			var widget = iWidgetContainer.getWidgetById(this.id);
		     if (typeof widget == "undefined" || widget === null) {
			   	return null;
			 }
	
	         widget.getWidgetInstance().loadItemSets(); 
		 	var instanceAttributes = widget.getWidgetInstance().getWidgetAttributes();
		 	var attItemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl();
	        for (var j in instanceAttributes) {
	            var itemName = j;
	            var itemValue = instanceAttributes[itemName]["defaultValue"];
	            attItemSet.setItemValue(itemName,itemValue,false);
	        }
	        return attItemSet;		
		}	
	});
	
	//in future, iWidgetMetadataImpl should implement com.ibm.mm.enabler.Deferred interface to support asynchronous action
	//for example, need to get title from fragment feed
	declare("com.ibm.mm.enabler.iw.iWidgetMetadataImpl",com.ibm.mm.enabler.iw.iWidgetMetadata,{
	    constructor:function(id){
	        // summary: iWidgetMetadata; interface defines 
			this._id = id;
			this._items = {}; //each item is saved as a json object {isDirty:false;detail:{itemName:"title",defaultValue:"defaultValue",defaultLang:"lang",localizedValue:[],isDirty:false}}
			this._debug = debug;
		},
		getItemValue:function(itemName){
			if (typeof itemName == "undefined" || itemName === null) return null;
			if (!this.CONSTANTS[itemName]) return null;
			var internalWrapper = this._getInternalIWidgetWrapper();
			if (internalWrapper === null) return null;
			
			var data = this._items[itemName];
			if (typeof data == "undefined" || data === null) 
			{		if (! this._loadData(itemName)) return null;
				data = this._items[itemName];
			}	
			if (data["detail"] != "undefined" && data["detail"] != null && data["detail"]["defaultValue"] != "undefined" && data["detail"]["defaultValue"] != null  ) {
				return data.detail.defaultValue;
			}	
			else return null;
		},
		setItemValue:function(itemName, value){
			if (typeof itemName == "undefined" || itemName == null || typeof value=="undefined" || value === null) return null;
			if (!this.CONSTANTS[itemName]) return null;
			
			var data = this._items[itemName];
			if (typeof data == "undefined" || data === null)
			{ 
				this._loadData(itemName);
			}
			this._items[itemName].isDirty = true;
			this._items[itemName].detail.defaultValue = value;	
		},
		save:function(){
			//need to persist  html markup
			var instanceData = this._getInternalIWidgetWrapper().getWidgetInstance().getiDescriptor();
			for (var item in this._items){
				var anItem = this._items[item];
				if (anItem.isDirty || anItem.isDirty == true){
					anItem.isDirty = false;
					this._updateMarkup(anItem.detail);
				}	
			}
		},
		_getInternalIWidgetWrapper:function(){
			if (typeof (this._internalWidgetWrapper) == "undefined" || this._internalWidgetWrapper === null) 
			{	
			 var widget = iWidgetContainer.getWidgetById(this._id);
		     if (typeof widget == "undefined" || widget === null) {
			   	return null;
			 }
			 this._internalWidgetWrapper = widget;
			} 
			return this._internalWidgetWrapper;
		},
		_loadData:function(itemName){
			var rc = false;
			var anItem = {};
			var instanceData = this._getInternalIWidgetWrapper().getWidgetInstance().getiDescriptor();
			if (instanceData != null && typeof (instanceData[itemName]) != "undefined" && instanceData[itemName]!=null){
				var anItemStr = JSON.stringify(instanceData[itemName]);
				anItem.isDirty = true;
				anItem.detail = JSON.parse(anItemStr);
				rc = true;
			}
			else{
				anItem.detail = {};
				anItem.detail.itemName = itemName;
				anItem.isDirty = false;
			}
			this._items[itemName] = anItem; // empty item is data is not available
			return rc;
		},
		_updateMarkup:function(details){
			var itemName = details.itemName;
			//var defaultLang = details.defaultLang;
			var defaultValue = details.defaultValue;
			//var localizedValue = details.localizedValue;
			
			var fragmentService = serviceManager.getService("iWidgetFragmentService");
			var iDescriptor = fragmentService.getItemSet(this._id,iwConstants.IDESCRIPTOR);
			if (iDescriptor == null){
				var node = fragmentService.createItemSet(iwConstants.IDESCRIPTOR);
				var widgetNode = dom.byId(this._id);
				widgetNode.insertBefore(node,widgetNode.firstChild.nextSibling);
				iDescriptor = fragmentService.getItemSet(this._id,iwConstants.IDESCRIPTOR);			
			}	
			var anItem = fragmentService.getItem(iDescriptor,itemName);
			if (anItem == null){
				var node = fragmentService.createItem(itemName,defaultValue);
				iDescriptor.appendChild(node);
			}else{
				anItem.innerHTML = defaultValue;
			}
			//refresh the cache when markup is updated
			this._getInternalIWidgetWrapper().getWidgetInstance().loadItemSets();
			
		}	
	});
	
	declare( "com.ibm.mm.enabler.iw.WidgetStub",null,
	{
	              constructor:function(aWidget) {
				  // summary: WidgetStub; interface defines methods that administrative iWidget can use to get information from another iWidget
	
	                this.id = aWidget.id;
	                this.wires = aWidget.getWires();
	                
	                this.publishedEvents = aWidget.getPublishedEvents();
	                this.handledEvents = aWidget.getHandledEvents();
	                this.payloadDefs = aWidget.widgetDef.getPayloadDefs();
	                this.supportedModes = aWidget.widgetDef.getSupportedModes();
	     		  },
	              getPublishedEventsNames:function(){
				  	 //summary:This method returns an array names of iwidget published events 
	       
	                   if (!this.publishedEvents) return null;
	                   var eventNames = [];
	                   var aEventName;
	                   for ( aEventName in this.publishedEvents) {
	                        eventNames.push(aEventName);
	                   }
	                   if (eventNames.length == 0) return null;
	                   return eventNames; /*Object @return null or an array of published events names*/
	              },
	              getHandledEventsNames:function(){
				  	 //summary:This method returns an array names of iwidget handled events 
	       
	                  if (!this.handledEvents) return null;
	                  var eventNames = [];
	                  var aEventName;
	                  for ( aEventName in this.handledEvents) {
	                       eventNames.push(aEventName);
	                  } 
	                  if (eventNames.length == 0) return null;
	                  return eventNames;/*Object @return null or an array of handled events names*/
	              },
	              getPublishedEvent:function(/*String*/eventName){
				  	 //summary:This method returns an eventdescription  of the specified published event 
	                   if (!this.publishedEvents) return null;
	                   return this.publishedEvents[eventName];/*Object @return null or an eventdescription of the specified published event*/
	
	              },
	              getHandledEvent:function(/*String*/eventName){
				  	//summary:This method returns an eventdescription  of the specified handled event 
	                    if (!this.handledEvents) return null;
	                   return this.handledEvents[eventName];/*Object @return null or an eventdescription of the specified handled event*/
			      },
	              getPayloadDefs:function(){
				  	//summary:This method returns an array of payloaddef that's defined in this iwidget
	                   return this.payloadDefs;
	              },
	              getPayloadDef:function(name){
				  	//summary:This method returns null or the specified payloadDef                
	                  var payloadDef = this.payloadDefs[name];
	                  if (typeof payloadDef == "undefined") return null;
	                  return payloadDef;          
	              },
	              getPayloadDefNames:function(){
				  	//summary:This method returns null or an array of payloaddef names
	                  var arr = [];
	                  var a;
	                  for (a in this.payloadDefs){
	                      arr.push(a);                      
	                  }
	                  if (arr.length == 0) return null;
	                  return arr;
	              },
	              getWires:function(){
				  	//summary:This method returns null or an array of wires that's defined in this iWidget
					//		  each array item is an json object and is in following format: 
	                //        {SourceWidget:sth,SourceEvent:sth,TargetEvent:sth}
	                  var arr = this.wires;
	                  if (typeof arr == "undefined" ) {
	                      arr = null;
	                  } else if (arr.length && arr.length == 0) {
	                      arr = null;
	                  }
	                  return arr;  
	              },
	              getSupportedModes:function(){
				  	//summary:This method returns null or an array of supportedmodes			
	                  return this.supportedModes;
	              }
	});
	
	declare( "com.ibm.mm.enabler.iw.WidgetDefinition",null, 
	{
	              constructor:function( /*object*/name, /*String*/markup,/*String*/iScope,/*object[]*/itemSetsArr,/*object*/widgetEvents,/*String*/uri,/*[]*/supportedModes,/*[]*/publishedEvents,/*[]*/handledEvents ,/*[]*/resources,/*[]*/payloadDefs,iDescriptor) {
	                var arg1 = name;
	                //todo:fix me
	                if (lang.isString(arg1)){				
				        this.name = name;
					    this.markup = markup;
	                    this.iScope = iScope;
	                    this.itemSetsArr = itemSetsArr;
	                    this.uri = uri;
	                    this.widgetEvents = widgetEvents;	
	                    this.publishedEvents = publishedEvents;
	                    this.handledEvents = handledEvents;	
	                    this.supportedModes = supportedModes;
	                    this.resources = resources;
	                    this.payloadDefs = payloadDefs;
	                    this.iDescriptor = iDescriptor;
	                }
	                else{
	                    this.name = arg1["name"];
	                    this.markup = arg1["markup"];
	                    
	                    this.metaData = arg1["metaData"];
	                    this.events = arg1["events"];
	                    this.itemSets = arg1["itemSets"];
	                    this.resources = arg1["resources"];
	                    this.payloadDefs = arg1["payloadDefs"];
	                    this.iScope = this.metaData["iScope"];
	                    this.supportedModes = this.metaData["supportedModes"];
	                    this.uri = this.metaData["contentURI"];
	                    
	                    var anEvent;
	                    this.widgetEvents = {};
	                    for (anEvent in this.metaData){
	                       
	                        if (anEvent.indexOf("on") == 0)
	                        {
	                            this.widgetEvents[anEvent]=this.metaData[anEvent];
	                        }
	                    }
	                    var publishedEventsData = arg1["events"]["publishedEvents"];
	                    this.publishedEvents = {};
	                    this.handledEvents = {};
	                    var anEventName;
	                    for (anEventName in publishedEventsData){
	                        var anEvent = publishedEventsData[anEventName];
	                        var iEventDescription=new com.ibm.mm.enabler.iw.iEventDescriptionImpl(anEvent.eventName,anEvent.payloadType,anEvent.description,anEvent.onEvent);
	                        if (!this.publishedEvents[anEventName]) this.publishedEvents[anEventName]=[];
	                             this.publishedEvents[anEventName].push(iEventDescription);          
	                    }      
	                    
	                    var handledEventsData = arg1["events"]["handledEvents"];   
	                    for (anEventName in handledEventsData){
	                        var anEvent = handledEventsData[anEventName];
	                        var iEventDescription=new com.ibm.mm.enabler.iw.iEventDescriptionImpl(anEvent.eventName,anEvent.payloadType,anEvent.description,anEvent.onEvent);
	                        if (!this.handledEvents[anEventName]) this.handledEvents[anEventName]=[];
	                             this.handledEvents[anEventName].push(iEventDescription);          
	                    }
	                    
	                    var anItemSetName;
	                    this.itemSetsArr = {};
	                    for (anItemSetName in arg1["itemSets"]){
	                        var anItemSetData = arg1["itemSets"][anItemSetName];
	                        if (anItemSetName =="attributes"){
	                            var anItemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl(anItemSetData.name,anItemSetData.onItemSetChanged);
	                        }
	                        else{
	                            var anItemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl(anItemSetData.name,anItemSetData.onItemSetChanged);
	                        }
	                        //set data to the internal data field("items") in ItemSet
	                        anItemSet["itemLists"]["items"]= anItemSetData["itemLists"];
	                        this.itemSetsArr[anItemSetName]=anItemSet;
	                    }
	                }
				  },   
	              getPublishedEvents:function(){
	                   return this.publishedEvents;
	              },
	              getHandledEvents:function(){
	                   return this.handledEvents;
	              },
	              getAttributes:function()
	              {
	                  //var itemSetWrapper = {name:name,onItemSetChanged:onItemSetChanged,isPrivate:isPrivate};
	             //      itemSetWrapper.items = [];
	             //var anItem = {id:id,value:value,readOnly:isReadOnly};  
	                  var attributes = this.itemSetsArr["attributes"];
	                  if (typeof attributes == "undefined" || attributes == null) attributes={name:"attributes",items:{}};
	                  
	                  if ( typeof (this.uri) != "undefined" && attributes != null) 
	                          attributes.items["contentURI"] = {id:"contentURI",value:this.uri,readOnly:false};
	                  if ( typeof (this.supportedModes ) != "undefined" && attributes != null)
	                          attributes.items["supportedModes"] = {id:"supportedModes",value:this.uri,readOnly:false};
	                   return attributes;
	              },
	              getAllItemSetNames:function(){
	                  var names = new Array();
	                  if ( typeof (this.itemSetsArr) == "undefined" || this.itemSetsArr == null ){
	                      return names;
	                  }
	                  var i = 0;
	                  for (itemName in this.itemSetsArr)
	                  {
	                      var itemSetWrapper = this.itemSetsArr[itemName];
	                      if (typeof (itemSetWrapper) != "undefined") {
	                          names[i] = itemSetWrapper.name;
	                      }
	                      i++;
	                  }
	                  return names;
	              },
	              getItemSet:function(/*String*/name){
	                  if ( name == "attributes") return this.getAttributes();
	                   var itemSetWrapper = this.itemSetsArr[name];
	                   if (typeof (itemSetWrapper) != "undefined") {
	                       return itemSetWrapper;
	                   }
	                   return null;
	              },
	               getPublishedEventsNames:function(){
	                  if (!this.publishedEvents) return null;
	                   var eventNames = [];
	                   var aEventName;
	                   for ( aEventName in this.publishedEvents) {
	                        eventNames.push(aEventName);
	                   }
	                   return eventNames;
	              },
	              getHandledEventsNames:function(){
	                  if (!this.handledEvents) return null;
	                  var eventNames = [];
	                  var aEventName;
	                  for ( aEventName in this.handledEvents) {
	                       eventNames.push(aEventName);
	                  } 
	                  return eventNames;
	              },
	              getPublishedEvent:function(/*String*/eventName){
	                   if (!this.publishedEvents) return null;
	                   //return an array of iEventDescription
	                   return this.publishedEvents[eventName];
	              },
	              getHandledEvent:function(/*String*/eventName){
	                    if (!this.handledEvents) return null;
	                   //return an array of iEventDescription
	                   return this.handledEvents[eventName];
	              },
	              getWidgetName:function(){
	                  return this.name;                  
	              },
	              getPayloadDefs:function(){
	                return this.payloadDefs;
	              },
	              getPayloadDef:function(name){
	                  var payloadDef = this.payloadDefs[name];
	                  if (typeof payloadDef == "undefined") return null;
	                  return payloadDef;          
	              },
	              getPayloadDefNames:function(){
	                  var arr = [];
	                  var a;
	                  for (a in this.payloadDefs){
	                      arr.push(a);                      
	                  }
	                  return arr;
	              },
	              getSupportedModes:function(){
	                   var temp = this.supportedModes;
	                   if (typeof temp == "undefined" || temp == null) {
	                       return null;
	                   }
	                   var arr = temp.split(" ");
	                   return arr;
	              },
	              getiDescriptor:function(){
	                   return null;
	              },
	              getMarkupByMode:function(mode){
	                   return this.markup;
	              },
	              getWidgetEvents:function(){
	                   return this.widgetEvents;
	              },
	              getIScope:function(){
	                   return this.iScope;
	              },
	              getResources:function(){
	                   return this.resources;
	              },
	              getDefaultLanguage:function(){
	                   return "en";
	              },
	              getMarkup:function(){
	                   return this.markup;
	              },
	              getAllowInstanceContent:function(){
	                   return false;
	              }
	});
	
	declare( "com.ibm.mm.enabler.iw.standardWidgetDefinition",null, 
	{
	              constructor:function(/*/object*/widgetDef){
	                   this.widgetDef= widgetDef;
	              },
	              getAllowInstanceContent:function(){
	                 return this.widgetDef.allowInstanceContent;
	              },
	              getResources:function(){
	                   return this.widgetDef.resources;
	              },
	              getIScope:function(){
	                   return this.widgetDef.iScope;
	              },
	              getWidgetEvents:function(){
	                   return this.widgetDef.widgetEvents;
	              },
	              getMarkupByMode:function(mode){
	                   if (typeof this.widgetDef.markup != "undefined" && this.widgetDef.markup != null) {
	                       if(!mode) mode="view";
	                       var temp = this.widgetDef.markup[mode];
	                       return temp;
	                   }
	                   else 
	                       return null;
	              },
	              getAttributes:function()
	              {
	                  var itemSetWrapper = this.widgetDef.itemSetsArr[iwConstants.ATTRIBUTES];
	                  if (typeof itemSetWrapper == "undefined" || itemSetWrapper == null) 
	                  {
	                      itemSetWrapper = {name:iwConstants.ATTRIBUTES};
	                      itemSetWrapper.items = {};
	                  }
	                  itemSetWrapper.isPrivate = true;
	                   var simpleAttributes = this.widgetDef.simpleAttributes;
	
	                   if (typeof simpleAttributes != "undefined" && simpleAttributes != null) {
	                       for (var i in simpleAttributes) {
	                           var value = simpleAttributes[i];
	                           if (typeof value != "undefined" && value != null) {
	                               if (!itemSetWrapper.items[i]) {
	                                   itemSetWrapper.items[i] = {id:i,value:value,readOnly:false};
	                               }
	                           }
	                       }
	                   }
	                   return itemSetWrapper;
	              },
	              getAllItemSetNames:function(){
	                  var names = new Array();
	                  if ( typeof (this.widgetDef.itemSetsArr) == "undefined" || this.widgetDef.itemSetsArr == null ){
	                      return names;
	                  }
	                  var i = 0;
	                  for (itemName in this.widgetDef.itemSetsArr)
	                  {
	                      var itemSetWrapper = this.widgetDef.itemSetsArr[itemName];
	                      if (typeof (itemSetWrapper) != "undefined" && itemName != iwConstants.ATTRIBUTES) {
	                          names[i] = itemSetWrapper.name;
	                          i++;
	                      }
	                  }
	                  return names;
	              },
	              getItemSet:function(/*String*/name){
	                  if ( name == "attributes") return this.getAttributes();
	
	                  var itemSetWrapper = this.widgetDef.itemSetsArr[name];
	                  if (typeof itemSetWrapper == "undefined" || itemSetWrapper == null) return null;
	
	                 //var anItemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl(itemSetWrapper.name,itemSetWrapper.onItemSetChanged,null,itemSetWrapper.isPrivate);
	                 //var items = itemSetWrapper.items;
	                 //for (var i=0;i<items.length;i++) {
	                 //    var anItem = items[i];
	                 //    anItemSet.setItemValue(anItem.id,anItem.value,anItem.isReadOnly);
	                 //}
	                 //return anItemSet;
	                  return itemSetWrapper;
	              },
	              getPublishedEventsNames:function(){
	                  if (!this.widgetDef.publishedEvents) return [];
	                   var eventNames = [];
	                   var aEventName;
	                   for ( aEventName in this.widgetDef.publishedEvents) {
	                        eventNames.push(aEventName);
	                   }
	                   return eventNames;
	              },
	              getHandledEventsNames:function(){
	                  if (!this.widgetDef.handledEvents) return [];
	                  var eventNames = [];
	                  var aEventName;
	                  for ( aEventName in this.widgetDef.handledEvents) {
	                       eventNames.push(aEventName);
	                  } 
	                  return eventNames;
	              },
	              getPublishedEvent:function(/*String*/eventName){
	                   if (!this.widgetDef.publishedEvents) return null;
	                   //return an object of iEventDescription
	                   var data = this.widgetDef.publishedEvents[eventName];
	                   var event=null;
	                   if (typeof data != "undefined" || data != null) {
	                       var descriptionId = data.description;
	                       var description = null;
	                       if (typeof descriptionId != "undefined" && descriptionId != null){
	                           description = this._getEventDescription(descriptionId);
	                           if (description != null){
	                               var defaultLang = description.lang;
	                               if (typeof defaultLang == "undefined" || defaultLang == null) {
	                                   defaultLang = this.getDefaultLanguage();
	                                   if (typeof defaultLang == "undefined" || defaultLang == null) {
	                                   defaultLang = "en";
	                                   }
	                               }
	                      	    }
	                       }
	                       
	                       if(description != null){
	                           event = new com.ibm.mm.enabler.iw.iEventDescriptionImpl(eventName,data.onEvent,description.payloadType,description.description,description.aliases,defaultLang,description.descriptions);
	                       }
	                       else{
	                          event = new com.ibm.mm.enabler.iw.iEventDescriptionImpl(eventName,data.onEvent);
	                       }
	                       if(data.onRemoveWire) event.setOnRemoveWire(data.onRemoveWire);
	                       if(data.onNewWire) event.setOnNewWire(data.onNewWire); 
	                   }
	                   return event;
	              },
	              getHandledEvent:function(/*String*/eventName){
	                   if (!this.widgetDef.handledEvents) return null;
	                   var data = this.widgetDef.handledEvents[eventName];
	                   var event=null;
	                   if (typeof data != "undefined" || data != null) {
	                       var descriptionId = data.description;
	                       var description = null;
	                       if (typeof descriptionId != "undefined" && descriptionId != null){
	                           description = this._getEventDescription(descriptionId);
	                           if (description != null){
	                               var defaultLang = description.lang;
	                               if (typeof defaultLang == "undefined" || defaultLang == null) {
	                                   defaultLang = this.getDefaultLanguage();
	                                   if (typeof defaultLang == "undefined" || defaultLang == null) {
	                                   defaultLang = "en";
	                                   }
	                               }
	                      	    }
	                       }
	
	                       if(description != null){
	                           event = new com.ibm.mm.enabler.iw.iEventDescriptionImpl(eventName,data.onEvent,description.payloadType,description.description,description.aliases,defaultLang,description.descriptions);
	                       }
	                       else{
	                          event = new com.ibm.mm.enabler.iw.iEventDescriptionImpl(eventName,data.onEvent);
	                       } 
	                       if(data.onRemoveWire) event.setOnRemoveWire(data.onRemoveWire);
	                       if(data.onNewWire) event.setOnNewWire(data.onNewWire); 
	                   }
	                   return event;
	              },
	              getWidgetId:function(){
	                  return this.widgetDef.id;                  
	              },
	              getWidgetName:function(){
	                   return this.widgetDef.id;
	              },
	              getPayloadDefs:function(){
	                   return this.widgetDef.payloadDefs;
	              },
	              getPayloadDef:function(name){
	                  var payloadDef = this.widgetDef.payloadDefs[name];
	                  if (typeof payloadDef == "undefined") return null;
	                  return payloadDef;          
	              },
	              getPayloadDefNames:function(){
	                  var arr = [];
	                  var a;
	                  for (a in this.widgetDef.payloadDefs){
	                      arr.push(a);                      
	                  }
	                  return arr;
	              },
	              getSupportedModes:function(){
	                   var temp = this.widgetDef.supportedModes;
	                   if (typeof temp == "undefined" || temp == null) {
	                       return null;
	                   }
	                   var arr = temp.split(" ");
	                   return arr;
	              },
	              getiDescriptor:function(){
	                   return this.widgetDef.iDescriptor;
	              },
	              _getEventDescription:function(id){
	                   var eventDescription=null;
	                   if (typeof this.widgetDef.eventDescriptions != "undefined" || this.widgetDef.eventDescriptions != null) {
	                       eventDescription = this.widgetDef.eventDescriptions[id];
	                   }
	                   return eventDescription; 
	              },
	              getPublishedEvents:function(){
	                var publishedEvents = {};
	                var publishedEventsNames = this.getPublishedEventsNames();
	                for (var i=0;i<publishedEventsNames.length;i++) {
	                    var publishedEventName = publishedEventsNames[i];
	                    var eventDescription = this.getPublishedEvent(publishedEventName);
	                    if (eventDescription != null) {
	                        publishedEvents[publishedEventName] = [eventDescription]; //todo, remove array
	                    }
	                }
	                return publishedEvents;  
	              },
	              getHandledEvents:function(){
	                   var handledEvents = {};
	                   var handledEventsNames = this.getHandledEventsNames();
	                   for (var i=0;i<handledEventsNames.length;i++) {
	                       var handledEventName = handledEventsNames[i];
	                       var eventDescription = this.getHandledEvent(handledEventName);
	                       if (eventDescription != null) {
	                           handledEvents[handledEventName] = [eventDescription]; //todo, remove array
	                       }
	                   }
	                   return handledEvents;
	              },
	              getDefaultLanguage:function(){
	                   return this.widgetDef.lang;
	              },
	              getMarkup:function(){
	                   return this.widgetDef.markup;
	              }
	});
	
	return com.ibm.mm.enabler.iw.widgetImpl;
});
