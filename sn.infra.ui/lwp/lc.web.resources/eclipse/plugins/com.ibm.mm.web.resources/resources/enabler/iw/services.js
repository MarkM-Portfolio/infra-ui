/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.enabler.iw.services");

dojo.require("com.ibm.mm.enabler.services.ConfigService");
dojo.require("com.ibm.mm.enabler.iw.event");
dojo.require("com.ibm.mm.enabler.iw.widgetImpl");
dojo.require("dojox.uuid.Uuid"); 
dojo.require("dojox.uuid.generateTimeBasedUuid");
dojo.require("com.ibm.mm.enabler.utilities");
dojo.require("com.ibm.mm.enabler.xpath");
dojo.require("com.ibm.mm.enabler.iw.parser");
dojo.require("dojo.string");

dojo.declare("com.ibm.mm.enabler.iw.services.iWidgetFragmentService",null,  {
	
	createItem:function(itemName,defaultValue,defaultLang,ns){
		if (typeof ns == "undefined" || ns == null) ns = "mm_";
		var item= document.createElement("a");
		dojo.addClass(item, ns+iwConstants.CSSCLASS_INSTANCE.iwItem);
		dojo.style(item, "visibility", "hidden");
		dojo.style(item,"display", "none");     
	      
		item.setAttribute("href","#"+itemName);
		if (defaultLang) item.setAttribute("lang",defaultLang);
		if (defaultValue && !defaultLang) item.innerHTML = defaultValue;		
		return item;			
	},	
    createItemSet:function(itemSetName,ns){
		if (typeof ns == "undefined" || ns == null) ns = "mm_";
		var param = document.createElement("span");
        dojo.addClass(param, ns+iwConstants.CSSCLASS_INSTANCE.iwItemSet);
        param.setAttribute("title",itemSetName);
        dojo.style(param, "visibility", "hidden");
		dojo.style(param,"display", "none");     
        return param;	
	},
    createWidgetDefRef:function(widgetDefUrl,ns){
		if (typeof ns == "undefined" || ns == null) ns = "mm_";
		var aTag=document.createElement("a");
		dojo.addClass(aTag,ns+iwConstants.CSSCLASS_INSTANCE.iwDefinition);
		aTag.setAttribute("href",widgetDefUrl);
		dojo.style(aTag, "visibility", "hidden");
		dojo.style(aTag,"display", "none");     
	    return aTag;
	},
	getItemSet:function(iwidgetId,name,ns){
		if (typeof ns == "undefined" || ns == null) ns = "mm_";
		var rc = null;
		var widgetSpan = dojo.byId(iwidgetId);
		var itemsets = dojo.query("."+ns+iwConstants.CSSCLASS_INSTANCE.iwItemSet,widgetSpan);
		for (var i=0; i<itemsets.length; i++){
			var anItemSet = itemsets[i];
			var title = anItemSet.getAttribute("title");
			if (name == title) { rc = anItemSet; break; }
			
		}
		return rc;
	},	
	getItem:function(parent,name,ns){
		if (typeof ns == "undefined" || ns == null) ns = "mm_";
		var rc = null;
		var items = dojo.query("."+ns+iwConstants.CSSCLASS_INSTANCE.iwItem,parent);
		for (var i=0;i<items.length; i++){
			var anItem = items[i];
			var title = this.getKeyFromHref(anItem);
			if (title != null && title == name ) { rc = anItem; break;}
		}	
		return rc;
	},
	getItems:function(parent,ns){
		if (typeof ns == "undefined" || ns == null) ns = "mm_";
		var items = dojo.query("."+ns+iwConstants.CSSCLASS_INSTANCE.iwItem,parent);
		if (typeof items == "undefined" || items == null || items.length == 0) items = null;
		return items;
	},	
    getWidgetDefRef:function(iwidgetId,ns){
		if (typeof ns == "undefined" || ns == null) ns = "mm_";
		var rc = null;
		var widgetSpan = dojo.byId(iwidgetId);
		var def = dojo.query("."+ns+iwConstants.CSSCLASS_INSTANCE.iwDefinition, widgetSpan)[0];
		var ref =  def.getAttribute("href");
		if (typeof ref != "undefined" && ref != null) rc = ref;
		return rc;
	},
	getKeyFromHref:function(node){
		var hrefValue = node.getAttribute("href");
		if(hrefValue==null) return null;
		var pos=hrefValue.indexOf("#")
		if(pos<0) return null;
		return hrefValue.substring(pos + 1);
	}  
});

dojo.declare("com.ibm.mm.enabler.iw.services.persistentAttributesFactoryService",null,  {
    createPersistentAttributes: function(widget)  {
        return new com.ibm.mm.enabler.iw.PersistentAttributes(widget, true);
    }
});

dojo.declare("com.ibm.mm.enabler.iw.services.eventService",null,  {
    constructor:function(){
        this.wires = {};
    }, 
   	subscribeWire: function (/*String*/sourceWidget,/*String*/sourceEvent,/*String*/targetWidget,/*String*/targetEvent) {
        com.ibm.mm.enabler.debug.entry("eventService.subscribeWire", "source:"+sourceWidget+" sourceEvent:"+sourceEvent+" targetWidget:"+targetWidget+" targetEvent:"+targetEvent);
        if (typeof sourceWidget == "undefined" || sourceWidget === null) {
			return false;
		}
        if (typeof sourceEvent == "undefined" || sourceEvent === null) {
			return false;
		}
        if (typeof targetWidget == "undefined" || targetWidget === null) {
			return false;
		}
        if (typeof targetEvent == "undefined" || targetEvent === null) {
			return false;
		}
        
        var rc = true;
        if (typeof(this.wires[sourceWidget]) == "undefined" || this.wires[sourceWidget] === null) {
			this.wires[sourceWidget] = {};
		}
        if (typeof(this.wires[sourceWidget][sourceEvent]) == "undefined" || this.wires[sourceWidget][sourceEvent] === null) {
			this.wires[sourceWidget][sourceEvent] = {};
		}
        var subscribingEvents = this.wires[sourceWidget][sourceEvent][targetWidget];
        if (typeof subscribingEvents == "undefined" || subscribingEvents === null) {
			this.wires[sourceWidget][sourceEvent][targetWidget] = [];
		}
		else {
			if (com.ibm.mm.enabler.utilities.inStringArray(targetEvent, subscribingEvents)){ 
				rc = false; //wire exists already
				}                    
		}        
        if (rc) {
			this.wires[sourceWidget][sourceEvent][targetWidget].push(targetEvent);
		}

        //notify source iWidget  -- onNewWire
        var payload = {};
        payload.targetWidget = targetWidget;
        payload.sourceEvent = sourceEvent;
        payload.sourceWidget = sourceWidget;
        payload.targetEvent = targetEvent;
        serviceManager.getService("eventService").fireEvent(sourceWidget,"onNewWire",payload);     
        com.ibm.mm.enabler.debug.exit("eventService.subscribeWire","wire is added "+this.wires[sourceWidget][sourceEvent][targetWidget].length );
        return rc;
    },
    publishWire: function(/*String*/sourceWidget,/*String*/sourceEvent,/*object*/payload,/*String*/payloadType){
        //allow widget to fire a event
        com.ibm.mm.enabler.debug.entry("eventService.publishWire", "source:"+sourceWidget+" sourceEvent:"+sourceEvent+" payload:"+payload+" payloadType:"+payloadType);
        
        if (typeof sourceWidget == "undefined" || sourceWidget === null) {
			return false;
		}
        if (typeof sourceEvent == "undefined" || sourceEvent === null) {
			return false;
		}
        var awidget = this.wires[sourceWidget];
        if (typeof(awidget) == "undefined" || awidget === null) {
			return false;
		}
        var targets = awidget[sourceEvent];
        if (typeof (targets) == "undefined" || targets === null){
            return false;
        }   
        var targetWidget;   
        for (targetWidget in targets){
            com.ibm.mm.enabler.debug.log("eventService.publishWire targetWidget:"+targetWidget);
            var events = targets[targetWidget];
            for (var i=0;i<events.length;i++){
                this.fireEvent(targetWidget,events[i],payload,payloadType,sourceWidget);
            }    
        }
        return true;
     },
     unSubscribeWidgetWires: function(sourceWidget){
         //remove all the Wires that's subscribing this Widget's publish events
         if (typeof this.wires[sourceWidget] != "undefined") {
		 	var widgetWireObj = this.wires[sourceWidget];
		 }  

         if (typeof(widgetWireObj) == "undefined" || widgetWireObj === null) {
		 	return false;
		 }
		  
		  //create JSON object for each array that's deleted
		 var arr = [];
         for (var sourceEvent in widgetWireObj) {
             var targetWireObj = widgetWireObj[sourceEvent];
			 if (typeof targetWireObj != "undefined" && targetWireObj !== null){
			 	for (var targetWidget in targetWireObj){
					var targetEvents = targetWireObj[targetWidget];
					if (typeof targetEvents != "undefined" && targetEvents !== null){
						for (var i in targetEvents) {
							var payload = {
								sourceWidget: sourceWidget,
								sourceEvent: sourceEvent,
								targetWidget: targetWidget,
								targetEvent: targetEvents[i]
							};
							arr.push(payload);
							//onRemoveWire-- notify target widget
							serviceManager.getService("eventService").fireEvent(targetWidget, "onRemoveWire", payload);
						} 
					}
				}
			 }
         }
		 if (arr.length !== 0) {
		 	this.publishEvent(com.ibm.mm.enabler.iw.iEvents.Constants.unSubscribeWire, {
		 		wires: arr
		 	});
		 }
		 this.wires[sourceWidget] = null;
     },
     unSubscribeWire: function(sourceWidget,sourceEvent,targetWidget,targetEvent){
         if (typeof sourceWidget == "undefined" || sourceWidget === null) {
		 	return false;
		 }
         if (typeof sourceEvent == "undefined" || sourceEvent === null) {
		 	return false;
		 }
         if (typeof targetWidget == "undefined" || targetWidget === null) {
		 	return false;
		 }
         if (typeof targetEvent == "undefined" || targetEvent === null) {
		 	return false;
		 }
          
         var widgetWireObj = this.wires[sourceWidget];
         if (typeof(widgetWireObj) == "undefined" || widgetWireObj === null) {
		 	return false;
		 }
         
         if (widgetWireObj[sourceEvent]) {
		 	var targetWidgets = widgetWireObj[sourceEvent];
		 }
		 else {
		 	return false;
		 }
          
         var subscribedEvents = this.wires[sourceWidget][sourceEvent][targetWidget];
         if (typeof subscribedEvents != "undefined" && subscribedEvents !== null) {
		 	for (var i = 0; i < subscribedEvents.length; i++) {
		 		if (targetEvent == subscribedEvents[i]) {
		 			subscribedEvents.splice(i, 1);
		 			
		 			//onRemoveWire-- notify target widget
						var payload = {};
						payload.targetWidget = targetWidget;
						payload.targetEvent = targetEvent;
						payload.sourceWidget = sourceWidget;
						payload.sourceEvent = sourceEvent;
						serviceManager.getService("eventService").fireEvent(targetWidget, "onRemoveWire", payload);
						this.publishEvent(com.ibm.mm.enabler.iw.iEvents.Constants.unSubscribeWire, {
							wires: [payload]
						});
					}
				}
				return true;
			}
			else {
				return false;
			}    
     },
     addWire: function(sourceWidget,sourceEvent,targetWidget,targetEvent ){

          com.ibm.mm.enabler.debug.entry("eventService.addWire", "source:"+sourceWidget+" sourceEvent:"+sourceEvent+" targetWidget:"+targetWidget+" targetEvent:"+targetEvent);
          if (typeof sourceWidget == "undefined" || sourceWidget === null) {
		  	return false;
		  }
          if (typeof sourceEvent == "undefined" || sourceEvent === null) {
		  	return false;
		  }
          if (typeof targetWidget == "undefined" || targetWidget === null) {
		  	return false;
		  }
          if (typeof targetEvent == "undefined" || targetEvent === null) {
		  	return false;
		  }
          
          //update js object and subscribe wire
          var rc = this.subscribeWire(sourceWidget,sourceEvent,targetWidget,targetEvent);
          if (rc)
          {
              var widget = iWidgetContainer.getWidgetById(targetWidget);
              if (typeof widget != "undefined" && widget !== null)
              {
                  var aWire = {};
                  aWire.SourceWidget = sourceWidget;
                  aWire.SourceEvent = sourceEvent;
                  aWire.TargetEvent = targetEvent;
                  if (typeof widget.wires == "undefined") {
				  	widget.wires = [];
				  }
                  widget.wires.push(aWire);                  
              }            
          }
          return rc;
      },
      removeWire: function(sourceWidget,sourceEvent,targetWidget,targetEvent){

          com.ibm.mm.enabler.debug.entry("eventService.removeWire", "source:"+sourceWidget+" sourceEvent:"+sourceEvent+" targetWidget:"+targetWidget+" targetEvent:"+targetEvent);
          if (typeof sourceWidget == "undefined" || sourceWidget === null) {
		  	return false;
		  }
          if (typeof sourceEvent == "undefined" || sourceEvent === null) {
		  	return false;
		  }
          if (typeof targetWidget == "undefined" || targetWidget === null) {
		  	return false;
		  }
          if (typeof targetEvent == "undefined" || targetEvent === null) {
		  	return false;
		  }
          
           var rc = this.unSubscribeWire(sourceWidget,sourceEvent,targetWidget,targetEvent);
           if (rc){
               var widget = iWidgetContainer.getWidgetById(targetWidget);
               if (typeof widget != "undefined" && widget !== null)
               {
                  var arr = widget.wires;
                  if (typeof arr != "undefined" && arr !== null){
                      for (var i=0;i<arr.length;i++){
                          var aWire = arr[i];
                          if ( aWire.SourceWidget == sourceWidget && aWire.SourceEvent == sourceEvent && aWire.TargetEvent == targetEvent)
                          {
                              arr.splice(i,1);
                              rc = true;
                              break;
                          }
                      }
                  }         
              }               
           } 
           return rc;         
      },
      fireEvent: function(targetWidget,targetEvent,payload,payloadType,sourceWidget){

         com.ibm.mm.enabler.debug.entry("eventService.fireEvent", "sourceWidget:"+sourceWidget+" targetWidget:"+targetWidget+" targetEvent:"+targetEvent+" payload:"+payload+" payloadType:"+payloadType);
        //allows a third party to fire a event in a target widget
         var aEvent = new com.ibm.mm.enabler.iw.iEventImpl(targetEvent,payloadType,payload,sourceWidget);    
         var data = [];
         data[0]= targetEvent;
         data[1]=aEvent;
         
         //need to make sure  the widget is loaded
         var widget = iWidgetContainer.getWidgetById(targetWidget);
		 if (typeof widget != "undefined" && widget !== null && typeof widget.loaded != "undefined" && widget.loaded == true) {
             //publish event only when it's loaded 
             com.ibm.mm.enabler.debug.log("eventService.fireEvent", "targetWidget is loaded");
             //dojo.publish("/enabler/eventService/"+targetWidget,data);
             dojo.publish("/enabler/eventService/"+targetWidget,[targetEvent, aEvent]);
         }
         else{    
             com.ibm.mm.enabler.debug.log("eventService.fireEvent", "targetWidget is not loaded");
             var eventHolder = new com.ibm.mm.enabler.iw.eventHolder(targetWidget,data);
             eventHolder.handler = dojo.subscribe("/enabler/widgetLoaded/" + targetWidget,eventHolder,"handleLoaded");
         }

      },	
      //support pagechanged event and widget deleted event
      publishEvent: function(sourceEvent,payload){
           com.ibm.mm.enabler.debug.entry("eventService.publishEvent"," sourceEvent:"+sourceEvent);
           if (typeof sourceEvent == "undefined" || sourceEvent === null) {
		   	return;
		   }
           if (typeof payload == "undefined" || payload === null) {
		   	dojo.publish(sourceEvent);
		   }

           var args= [];
           if (dojo.isArray(payload))
           { 
               args = payload;
           }    
           else{
               args.push(payload);
           }
           //dojo.publish(sourceEvent,args);
           dojo.publish(sourceEvent,[payload]); 
      },	
      subscribeEvent:function(event,object,handlerFn){
          dojo.subscribe(event,object,handlerFn);          
      }    	
});

dojo.declare("com.ibm.mm.enabler.iw.services.queryService",null,{
    
	getiWidgetWrapperById:function(id){
		var widget = iWidgetContainer.getWidgetById(id);
		if (typeof widget == "undefined" || widget === null) {
			return null;
		}
		return new com.ibm.mm.enabler.iw.iWidgetWrapperImpl(id); 
    },
    getWidgetById: function(id,obj,cb){
        com.ibm.mm.enabler.debug.entry("queryService.getWidgetById","id:",id,"obj:",obj,"cb",cb);
   
       var widget = iWidgetContainer.getWidgetById(id);
       if (typeof widget == "undefined" || widget === null) {
	   	return null;
	   }
       if (widget.loaded)
       {
           com.ibm.mm.enabler.debug.log("queryService.getWidgetById", "widget is loaded");
           if ( typeof obj != "undefined" && typeof cb != "undefined")
           {
               obj[cb](new com.ibm.mm.enabler.iw.WidgetStub(widget));
           }
           else{
               return new com.ibm.mm.enabler.iw.WidgetStub(widget);
           }
       }
       else{

           com.ibm.mm.enabler.debug.log("queryService.getWidgetById", "widget is  not loaded");
               if ( typeof obj != "undefined" && typeof cb != "undefined"){
                   var eventHolder = {};
                   eventHolder.widget = widget;
                   eventHolder.obj = obj;
                   eventHolder.cb = cb;
                   eventHolder.handleLoaded = function(){
                   this.obj[this.cb](new com.ibm.mm.enabler.iw.WidgetStub(this.widget));               
                   };
               dojo.subscribe("/enabler/widgetLoaded/" + id,eventHolder,"handleLoaded");
               }
               else{
                   //return new com.ibm.mm.enabler.iw.WidgetStub(widget);
				   return null;
               }
       }
    },	
    getWidgetsByDefUrl:function(url){
       com.ibm.mm.enabler.debug.entry("queryService.getWidgetsByDefUrl", "url:",url);
       var arr=[];
       for(id in iWidgetContainer.widgetArr){
            var widget=iWidgetContainer.widgetArr[id];
            if ( widget && widget !== null ) { 
            var xmlURL=widget.getWidgetInstance().widgetXMLUrl; 
            if (typeof xmlURL != "undefined" && xmlURL !== null && url == xmlURL) {
				arr.push(id);
			}
            }
       }  

       com.ibm.mm.enabler.debug.exit("queryService.getWidgetsByDefUrl", arr);
       return arr;      
    }   
});

dojo.declare("com.ibm.mm.enabler.iw.services.ServiceManager",null,  {
     constructor:function(){
        this.serviceEntries= {};
        this.services = {};
        var aUrl;
           if (com.ibm.mm.enabler.services.CONFIG_SERVICE) {
               aUrl = com.ibm.mm.enabler.services.CONFIG_SERVICE.getPreferenceValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_ENABLER);
           }
           if (typeof aUrl == "undefined" || aUrl === null) {
               aUrl = "/mashupmaker";
           }

        //set default values
        this.serviceEntries["eventService"] = aUrl+"/js/com/ibm/enabler/iw/services.js";
        this.serviceEntries["queryService"] = aUrl+"/js/com/ibm/enabler/iw/services.js";
        this.serviceEntries["persistentAttributesFactoryService"]=aUrl+"/js/com/ibm/enabler/iw/services.js";  
        this.serviceEntries["iwidgetFragmentService"] = aUrl+"/js/com/ibm/enabler/iw/services.js"; 

        //allow overwritten if ibmConfig.loadServices is set
        if (typeof ibmConfig != "undefined" && ibmConfig != null && typeof ibmConfig.loadServices != "undefined" && ibmConfig.loadServices != null && ibmConfig.loadServices == true) {
                       aUrl = aUrl + this.serviceEntriesConfig;
            var me = this;
            var bindArgs = {
                url: aUrl,
                    load: function(data, ioArgs){
                         var jsonObj = dojo.fromJson(data);
                         var aServiceName;
                         var i=0;
                         for (aServiceName in jsonObj) {
                             me.serviceEntries[aServiceName] = jsonObj[aServiceName];
                             i++;
                         }
                },
                error:function(data,ioArgs){
                     com.ibm.mm.enabler.debug.error("com.ibm.mm.enabler.iw.services.ServiceManager","error loading data",data);
                }
            };
            dojo.xhrGet(bindArgs); 
        }
    },
    serviceEntriesConfig:"/js/com/ibm/enabler/iw/serviceEntries.json",
    serviceNS:"com.ibm.mm.enabler.iw.services.",
    setService:function(serviceName,serviceUrl){
        this.serviceEntries[serviceName] = serviceUrl;
    },
    removeService:function(serviceName){
        var service =  this.services[serviceName];
        var serviceJS = this.serviceEntries[serviceName];
        if (typeof service != "undefined" || service !== null ) {
            this.services[serviceName] = null;
        }
        if (typeof serviceJS != "undefined" || serviceJS !== null ) {
            this.serviceEntries[serviceName] = null;
        }
    },
    getService:function(serviceName){
        var service =  this.services[serviceName];
        var serviceJS = this.serviceEntries[serviceName];
        if ( typeof service == "undefined" || service === null ){
            // assume js is already loaded, create service object
            service = this._createService(serviceName);
            if (typeof service == "undefined" || service === null) {
                if (typeof serviceJS != "undefined" && serviceJS !== null) {
                    //load JS and create, service object
                    //load service js
                    this._loadScript(serviceJS);
                    service = this._createService(serviceName);
                    if ( typeof service != "undefined" && service !== null) {
                        this.services[serviceName] = service;
                    }
                }
            }
            else{
                this.services[serviceName] = service;
            } 
        }
        return this.services[serviceName];
    },
    _loadScript: function(script) {
			var scriptElem = document.createElement("script");
			scriptElem.src = script;
			document.body.insertBefore(scriptElem, document.body.firstChild);
	},
    _createService:function(serviceName)
    {
        var service;
        try{
             service = eval("new "+this.serviceNS+serviceName+"();");             
           }
           catch (err){
                com.ibm.mm.enabler.debug.log("services.getService"," failed to create service error detail: "+err.description);
           }
        return service;
    }
});
window.serviceManager = new com.ibm.mm.enabler.iw.services.ServiceManager();
