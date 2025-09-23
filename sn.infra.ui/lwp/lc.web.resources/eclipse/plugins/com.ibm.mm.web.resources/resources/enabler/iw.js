/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw");

dojo.require("com.ibm.mm.enabler.aggregation.javascript");
dojo.require("com.ibm.mm.enabler.utilities");
dojo.require("com.ibm.mm.enabler.iw.iContextImpl");
dojo.require("com.ibm.mm.enabler.iw.ItemSetImpl");
dojo.require("com.ibm.mm.enabler.iw.eventImpl");
dojo.require("com.ibm.mm.enabler.iw.services");
dojo.require("com.ibm.mm.enabler.iw.internalservices");
dojo.require("com.ibm.mm.enabler.iw.utils");
dojo.require("com.ibm.mm.enabler.iw.payloadDef");  
dojo.require("dojo.i18n");
dojo.requireLocalization("com.ibm.mm.enabler","iwStr", null, "de,en,es,fr,it,ROOT,ja,ko,pt-br,zh,zh-tw");
dojo.requireLocalization("com.ibm.mm.enabler","iwMessages", null, "de,en,es,fr,it,ROOT,ja,ko,pt-br,zh,zh-tw");


dojo.declare("com.ibm.mm.enabler.iWidgetWrapperDefaultImpl",null,  {
     constructor: function (widgetSpan,id) { 
        this._internalIbmModes = com.ibm.mm.enabler.iw.ItemSet._internalIbmModes;

        //parsing microformat
        this.rootElement = widgetSpan;
        if (typeof (id) != "undefined" && id != null ) {
            this.id = id;
        }
        else {
            this.id = widgetSpan.getAttribute("id");
        }
		this.simpleWidgetEvents = {};
        this.loaded = false;
        this.widgetAttributes = null; // defer creation
        this.widgetItemSets = null;   // defer creation to getWidgetItemSet or getItemSets
        this.xmlRetrievedHandler = dojo.subscribe( "/enabler/widgetXmlRetrieved/" + this.id,this,"handleWidgetInfoRetrieved");
        this.eventServiceHandler = dojo.subscribe( "/enabler/eventService/" + this.id,this,"handleEvent");
        this.ns = widgetSpan.className.substr(0,3);
        this.inlineMessageHandler = dojo.subscribe("/enabler/inlineMessage/"+this.id,this,"_handleInlineMessage");
        this.windowManager = {}; // an associative array of window entities, key is windowid(for release1,it's mode);
                                 // value is simple json object: {id:"edit",root:rootElement,active:false}
        this.iwStr = dojo.i18n.getLocalization("com.ibm.mm.enabler", "iwStr"); 
        this.iwMessages = dojo.i18n.getLocalization("com.ibm.mm.enabler", "iwMessages"); 
    },
    getWidgetInstance:function(){
      if (typeof this.widgetInstance != "undefined" || this.widgetInstance != null) return this.widgetInstance;
      this.widgetInstance = new com.ibm.mm.enabler.iWidgetInstanceStandard(this.rootElement,this.id);
      return this.widgetInstance;
     }, 
    _resourceBaseURL: new dojo.moduleUrl("com.ibm.mm.enabler","iw/"),
    _jsHandler: com.ibm.mm.enabler.aggregation.javascript.JAVASCRIPT_HANDLER,
    _setLoading: function(){
        var tempDiv = document.createElement( "div" );
        tempDiv.className = this.ns+"content";
        if (ibmConfig && ibmConfig.loadingHTML) {
            tempDiv.innerHTML = ibmConfig.loadingHTML;
        }
        else{
      	  tempDiv.innerHTML = "<img src='" + dijit._Widget.prototype._blankGif + "'" + " class='lotusLoading' alt='" + this.iwStr.LOAD + "' />&nbsp;"+this.iwStr.LOAD;
        }
        this.rootElement.appendChild(tempDiv); 
      },
    _handleInlineMessage:function(type,message,details){
        var nodes =  [];
        com.ibm.mm.enabler.iw.utils.findElementByAttribute("class",this.ns+"content",this.rootElement,nodes,false);
        var aNode = nodes[0];
        aNode.innerHTML = "";
        com.ibm.mm.enabler.debug.logInlineMessage(aNode,type,message,details);
    },
    loadWidgetDefinition: function(){
        com.ibm.mm.enabler.debug.entry("iWidget.loadWidgetDefinition");
        var widgetSpan = this.rootElement;
        if (this.loaded) {
			return false;
		} 
       
        this._setLoading();
        if (this.getWidgetInstance().widgetXMLUrl !== null) {
			var iWidgetService = new com.ibm.mm.enabler.iw.services.widgetLoadService();
			iWidgetService.getWidgetXML(this.getWidgetInstance().widgetXMLUrl, this.id);
		}
		else {
			return false;
		} // no io is involved
        com.ibm.mm.enabler.debug.entry("iWidget.loadWidgetDefinition",true);
        return true;		
	}, 
	render: function(){	  
        com.ibm.mm.enabler.debug.entry("iWidget.render");
        this.prepare();
        this.loadWidgetDefinition();
		com.ibm.mm.enabler.debug.exit("iWidget.render");
	}, 
    prepare: function(){
        com.ibm.mm.enabler.debug.entry("iWidget.prepare");
        variableName = "_"+this.id+"_"+"iContext";
        dojo.global[variableName]= new com.ibm.mm.enabler.iw.iContextImpl(this.id,this.ns);
        com.ibm.mm.enabler.debug.exit("iWidget.prepare");
    },
	_updateMarkup: function(mode,contentDiv){
        com.ibm.mm.enabler.debug.entry("iWidget._updateMarkup");
        var wInfo = this.widgetDef;

        var markup = wInfo.getMarkupByMode(mode);
        if (mode == iwConstants.mode_view) {
            if (this.widgetDef.getAllowInstanceContent()) {
                var temp = this.getWidgetInstance().getDefaultViewContent();
                if (temp && temp !== null) {
					markup = temp;
				}
            }
        }
        if (typeof markup == "undefined" || markup === null) {
            var error = dojo.string.substitute(this.iwMessages.E_IWIDGETDEF_CONTENTNOTAVAILABLE_1, [mode]);  
            com.ibm.mm.enabler.debug.info("iWidget._updateMarkup",error);
            return false;
        }
        //parse the mark and replace iContext with _widgetid_iContext
        var updatedMarkup = this._prepareMarkup(markup);
        
        //append all the nodes to a temporary div element
        var tempDIV = document.createElement( "DIV" );
        tempDIV.innerHTML = updatedMarkup;
       					
        // find the script elements
		var scriptElems = tempDIV.getElementsByTagName( "script" );
		if ( scriptElems !== null ) {
			// iterate over script elements and attach an id attribute ,
            // this is necessary so if there's document.write, it got over written
            // otherwise you will get a blank page!
			for ( var i = 0; i < scriptElems.length; i++ ) {
					var scriptElem = scriptElems[i];

					// include an id if there is none so far
					// (needed to lookup script in original DOM later on)
					var id = scriptElem.getAttribute( "id" );
					if (id === null || id == "" ) {
						scriptElem.setAttribute( "id", "_scr#" + i );
					}
			}
		}
		// update the DOM before executing the scripts
		// (the scripts might rely on elements in the DOM)
		//var contentDiv = this.rootElement.lastChild;
        dojo.addClass(contentDiv,mode);       
        contentDiv.innerHTML = tempDIV.innerHTML;
         
        //destroy tempDiv
        com.ibm.mm.enabler.dom.destroyNode( tempDIV );
        
        com.ibm.mm.enabler.debug.exit("iWidget._updateMarkup");
        return true;
	},
    _prepareMarkup: function(markup){
         com.ibm.mm.enabler.debug.entry("iWidget._prepareMarkup");
         var oldMarkup = markup.replace(/_IWID_/g,"_"+this.id+"_");
         //?= is javascript 1.5 feature
         var finalMarkup = oldMarkup.replace(/iContext(?=\.|\s|\(|\))/g,"_"+this.id+"_iContext");
         com.ibm.mm.enabler.debug.exit("iWidget._updateMarkup",finalMarkup);
         return finalMarkup;
    },
	destroy: function () {
	      dojo.unsubscribe(this.xmlRetrievedHandler);
          dojo.unsubscribe( this.eventServiceHandler);
          dojo.unsubscribe(this.inlineMessageHandler);
          //delete dojo.global["_"+this.id+"_"+"iContext"];   //doesn't work on IE7, can't delete from global context
          dojo.global["_"+this.id+"_"+"iContext"] = null;     
          
          //remove wires as subscriber and publisher
          var arr = this.wires;
          var eventSvr = serviceManager.getService("eventService");
          if (typeof arr != "undefined" && arr != null){
              for (var i=0;i<arr.length;i++){
                  var aWire = arr[i];
                  eventSvr.unSubscribeWire(aWire["SourceWidget"],aWire["SourceEvent"],this.id,aWire["TargetEvent"]);             
              }
          }
          eventSvr.unSubscribeWidgetWires(this.id);            	
 	},
	handleWidgetInfoRetrieved:function(/*{}*/wInfo){
        com.ibm.mm.enabler.debug.entry("iWidget.handleWidgetInfoRetrieved");

		this.widgetDef = wInfo;  //save widget definition 
		//this.loadWidgetInstance
        this.update();        
        this.onLoad();        
        //this.executeCallbackQueue();
        com.ibm.mm.enabler.debug.exit("iWidget.handleWidgetInfoRetrieved",this.id);
	},
	update:function(){ 
		this._initialize();

		var contentDiv = this.rootElement.lastChild;
        this._updateMarkup(this.currentMode,contentDiv); 

        this._loadWidgetSharedResource();
        this._createiScope();
        //contentDiv = this.rootElement?
        this._evalScripts(contentDiv);
        this.windowManager[this.currentMode] ={id:this.currentMode,root:contentDiv,active:true,external:false};   
	},	
    _initialize:function(){
        com.ibm.mm.enabler.debug.entry("iWidget._initialize");
        var lang = this.widgetDef.getDefaultLanguage();
        if (typeof lang != "undefined" && lang != null) {
            this.defaultLanguage = lang;
        }
        else{
            this.defaultLanguage = "en";
        }

        var aMode  = this._getDefaultMode();
        if (aMode == null) aMode = iwConstants.mode_view;
        this.currentMode = aMode;
       
        //initialize publishedEvents and handledEvents
        this.getPublishedEvents();
        this.getHandledEvents();
        
        //register wires
        this.getWires();
        com.ibm.mm.enabler.debug.exit("iWidget._initialize"); 
    },
	_evalScripts:function(contentDiv){
        var scriptElems = contentDiv.getElementsByTagName( "script" ); 
        for ( var i=0; i<scriptElems.length; i++) {
            this._jsHandler.handle( scriptElems[i] );
        }
  	},
   onLoad:function(){ 
        this._handleEventInternal(com.ibm.mm.enabler.iw.iEvents.Constants.onLoad); 
        this._handleEventInternal("on"+this.currentMode);
        this.loaded = true;    
        dojo.publish( "/enabler/widgetLoaded/" + this.id);
   },   
   _getSimpleEventHandler:function(/*String*/eventName){
       com.ibm.mm.enabler.debug.entry("iWidget._getSimpleEventHandler",eventName);
       if ( this.simpleWidgetEvents  && this.simpleWidgetEvents[eventName])  return this.simpleWidgetEvents[eventName];
       var handler = this.widgetDef.getWidgetEvents()[eventName];
       if ( handler == null) handler = eventName;
       
       var scope = this._getHandlerScope(handler);
       var handlerObj = null;
       if (scope != null) {
           handlerObj = dojo.hitch(scope,handler);
           this.simpleWidgetEvents[eventName]= handlerObj;
       }
       else if ( handler.indexOf("on") == 0){
    	   //get Uppercase event like onedit --> onEdit
    	   var newhandler = "on"+handler.substr(2,1).toUpperCase()+handler.substr(3);
    	   if (newhandler != handler){
    		   scope = this._getHandlerScope(newhandler);
    		   if(scope != null){
    			   handlerObj = dojo.hitch(scope,newhandler);
    	           this.simpleWidgetEvents[eventName]= handlerObj;    			   
    		   }   
    	   }    	   
       }	   
       com.ibm.mm.enabler.debug.exit("iWidget._getSimpleEventHandler",handlerObj);
       return handlerObj;       
   },
   _getHandlerScope:function(/*fn*/handler){
        com.ibm.mm.enabler.debug.entry("iWidget._getHandlerScope",handler);

       //returns a global function or scope object
       var fn = dojo.global["_"+this.id+"_"+handler];
       if (typeof (fn) == "undefined")
       {
           widgetScope = dojo.global["_"+this.id+"_iContext"].iScope();
           if (widgetScope && widgetScope[handler])
           fn = widgetScope;                
       } 
       if (typeof fn == "undefined" || fn == null ) fn = dojo.global[handler];
       if (typeof fn == "undefined" || fn == null ) return null;
       else{
           com.ibm.mm.enabler.debug.exit("iWidget._getHandlerScope",fn);
           return fn;
       }
    },
   handleEvent: function(eventName,iEvent){

       if (typeof eventName == "undefined" || eventName == null) return false;
       //handle onModeChanged event
       if (eventName == com.ibm.mm.enabler.iw.iEvents.Constants.onModeChanged) {
            return this._handleModeChange(iEvent);
       }
       if (eventName == "onNewWire") {
           return this._handleNewWire(iEvent);
       }
       if (eventName == "onRemoveWire") {
           return this._handleRemoveWire(iEvent);
       }
       return this._handleEventInternal(eventName,iEvent);       
   },   
   _handleNewWire:function(iEvent){
        var payload = iEvent.payload;
        var eventName = payload.sourceEvent;  //check if there's onNewWire defined in iEventDescription

        var event = this.publishedEvents[eventName];
        if (typeof event != "undefined" && event != null) {
            var handler = event[0].getOnNewWire();
            if ( handler != null) {
                var scope = this._getHandlerScope(handler);
                if (scope != null && dojo.isFunction(scope)){
                    scope(iEvent);
                } 
                else if (scope != null && dojo.isObject(scope))
                {
                    scope[handler](iEvent);
                }
                return true;
            }
        } 
        return false;
   },
   _handleRemoveWire:function(iEvent){
        var payload = iEvent.payload;
        var eventName = payload.targetEvent;   // check if there's onRemoveWire defined in iEventDescription
        var event = this.handledEvents[eventName];
        if (typeof event != "undefined" && event != null) {
           var handler = event[0].getOnRemoveWire();
           if ( handler != null) {
               var scope = this._getHandlerScope(handler);
               if (scope != null && dojo.isFunction(scope)){
                   scope(iEvent);
               } 
               else if (scope != null && dojo.isObject(scope))
               {
                   scope[handler](iEvent);
               }
               return true;
           }
        } 
       return false; 
   },
   _handleModeChange:function(iEvent){
        var isHandled = false;
        var oldMode = this.currentMode;

        var payload = iEvent.payload;
        if (typeof payload == "undefined" || payload == null ) return false;  
        if (dojo.isString(payload)) payload = dojo.fromJson(payload);
        if (typeof payload == "undefined" || payload == null ) return false;  
        var newMode = payload.newMode;
        if (typeof newMode == "undefined" )  newMode = null;
        var newRoot = payload.rootElementId;
        if (typeof newRoot == "undefined" ) newRoot = null;

        // support one active mode only, thus don't support this operation
        if (newMode!= null && newMode == this.currentMode) return false;
        if (newMode == null) return false;
        
        var external = false;
        if(newRoot != null) external = true;  
        var updatedNewRoot = newRoot;

        var oldWindow = this.windowManager[newMode];
        var isWindowAvailable = false;
        if (typeof oldWindow != "undefined" && oldWindow !== null){
            var oldRoot = oldWindow.root;
            if (!oldWindow.external && oldRoot != null && newRoot === null) {
                updatedNewRoot = oldRoot;
                isWindowAvailable = true;
                isHandled = true;
                //how to verify a node doesn't exist anymore?
                 // turn on this window
                 dojo.style(oldRoot,"display","");

                 //this.currentMode = newMode;
                //this._handleOnModeEvent(newMode); //so iWidget could refresh data
                //isHandled = true;
             }
        }
        //create new window and update markup
        if(!isWindowAvailable){
            if (updatedNewRoot === null){
                var tempDiv = document.createElement( "div" );
                tempDiv.className = this.ns+"content";
                this.rootElement.appendChild(tempDiv);
                updatedNewRoot = this.rootElement.lastChild;
            }
            isHandled = this._updateMarkup(newMode,updatedNewRoot); 
        }        
        if (isHandled) {
             //hide current view 
            var currentWindow = this.windowManager[this.currentMode];
            var currentRoot = currentWindow.root;
                if (currentWindow.external ) {
                    dojo.style(currentRoot,"display","none");//todo, destroy external window?
                    this.windowManager[this.currentMode] = null;
                }
                else if (newRoot != null) {   //if the newRoot is provided, don't hide current window. leave builder to do this.
                    currentWindow.active = false;
                }
                else{
                    currentWindow.active = false;
                    dojo.style(currentRoot,"display","none");
                }  
            
            //change current mode
            this.currentMode = newMode;

            //  save/reset new window
            this.windowManager[newMode] ={id:newMode,root:updatedNewRoot,active:true,external:external};   
    
            if (!isWindowAvailable ) {this._evalScripts(updatedNewRoot);}
            this._handleOnModeEvent(newMode);
        }
        if(isHandled){
            serviceManager.getService("eventService").publishEvent(com.ibm.mm.enabler.iw.iEvents.Constants.modeChanged,[this.id,oldMode,newMode]);
        }

        return isHandled;
   },
    _handleOnModeEvent:function(mode){
        var isHandled = false;
        //handle event
        var eventName = "on"+mode;
        var eventHandler = this._getSimpleEventHandler(eventName);
        if (eventHandler !== null ) {
            eventHandler();
            isHandled = true;
        }
        return isHandled;
   },
   _handleEventInternal: function(/*String*/eventName,iEvent){      
       com.ibm.mm.enabler.debug.entry("iWidget._handleEventInternal",eventName,iEvent);
       if (typeof eventName == "undefined" || eventName === null) return false;

       var isHandled = false;
       var handlerFn = null;
     	    
       if (eventName.indexOf("on")===0) 
       {
           var eventHandler = this._getSimpleEventHandler(eventName);
           if (eventHandler!==null) handlerFn = eventHandler;           
       }
       if (handlerFn === null) {             
           handlerFn = this.getPublicEventHandler(eventName); 
       } 
       if (handlerFn !== null ){
           com.ibm.mm.enabler.debug.log("iWidget._handleEventInternal","handlerFn:",handlerFn);
           if(iEvent != "undefined" && iEvent !== null) handlerFn(iEvent);  
           else handlerFn();
           isHandled = true;
       }   
       com.ibm.mm.enabler.debug.exit("iWidget._handleEventInternal",isHandled);
       return isHandled;
   },
   getPublicEventHandler:function(/*String*/eventName)
   {   
       com.ibm.mm.enabler.debug.entry("iWidget.getPublicEventHandler",eventName);
       if (this.getHandledEvents() == null) {
           return null;
       }
       var eventDesc = this.getHandledEvents()[eventName];
       if (!eventDesc) return null;
       var handlerFn = eventDesc[0].handlingFn;
       if (handlerFn != null) {
           var scope = this._getHandlerScope(handlerFn);
           var handlerObj = null;
           if (scope != null) {
               handlerObj = dojo.hitch(scope,handlerFn);
           }
       }
       com.ibm.mm.enabler.debug.exit("iWidget._getPublicEventHandler",handlerObj);
       return handlerObj;       
   },
   getParent:function(){
        if (!this.parent)
        this.parent = com.ibm.mm.enabler.iw.utils.getWidgetParent(this.id);
        return this.parent;
   },
   getWidgetAttributes: function(){
        //Summary: returns an ManagedItemSet which provides access to the iWidget's customization attributes. 
        //          The returned ManagedItemSet will be teh same as getItemSet(iContext.constants.itemset.ATTRIBUTES).
        //          returns empty set if there's no ItemSet.Return null if iWidget customization attributes is not
        //          supported
        if ( typeof (this.widgetAttributes) == "undefined" || this.widgetAttributes == null ){
            var service = serviceManager.getService("persistentAttributesFactoryService");
            this.widgetAttributes = service.createPersistentAttributes(this);
            
            this._loadWidgetAttributes();
        }
        return this.widgetAttributes;
    },  
    _loadDefWidgetAttributes: function(){
            //load attributes from widget XML
       // <(iw-|mm_)itemSet name="" uri="" onItemSetChanged="">
       //   <(iw-|mm_)item name="" type="" value="" description="" readOnly="false"/>
       // </(iw-|mm_)itemSet>
       com.ibm.mm.enabler.debug.entry("iWidget:_loadDefWidgetAttributes");
       if (typeof (this.widgetDef) != "undefined" ) {
           var attributes = this.widgetDef.getAttributes();
           if (typeof attributes != "undefined" && attributes != null) {
               var items = attributes.items;
               if (typeof items != "undefined" && items != null) {
               //var attNames = attributes.getAllNames();
                  for (var i in items) {
                   var anItem = items[i];
                   if (typeof anItem != "undefined" && anItem != null) {
                       var attName = anItem.id;
                       var value = anItem.value;
                       var isReadOnly = anItem.readOnly;
                       this.widgetAttributes._internal().setItemValue(attName,value,isReadOnly, this._internalIbmModes.xml);
                   }
                  }
 
               }
           }
       }
       com.ibm.mm.enabler.debug.exit("iWidget:_loadDefWidgetAttributes");
    },
    /* this can be used to support <span id="" zipcode="27511" contentURI="foo">*/
    _loadWidgetInstanceAttributesFromRootElement: function(){
       com.ibm.mm.enabler.debug.entry("iWidget._loadWidgetInstanceAttributesFromRootElement");
       var attributes = this.rootElement.attributes;
       for (var i=0; i<attributes.length;i++) {
           var att = attributes[i];
           var value = this.rootElement.getAttribute(att.name);
            if ( typeof value != "undefined" && value != null && value != "") {
               this.widgetAttributes._internal().setItemValue(att.name,value,false, this._internalIbmModes.microformat);
               com.ibm.mm.enabler.debug.log("iWidget._loadWidgetInstanceAttributesFromRootElement", "name:"+att.name+" value:"+value);
           }
       } 
       com.ibm.mm.enabler.debug.exit("iWidget._loadWidgetInstanceAttributesFromRootElement");
    },
    getWidgetItemSet:function(/*String*/name){
        if ( typeof (this.widgetItemSets) == "undefined" || this.widgetItemSets == null ){
            this._loadItemSets();
        }
        var rtnVal =  this.widgetItemSets[name];
        if (typeof rtnVal == "undefined" ) 
        {rtnVal = new com.ibm.mm.enabler.iw.DefaultItemSetImpl(parent,name);
            this.widgetItemSets[name] = rtnVal;
        }    
        return rtnVal;
    },

    _loadWidgetDefItemSets: function(){
     com.ibm.mm.enabler.debug.entry("iWidget._loadWidgetDefItemSets");
     if (typeof (this.widgetDef) != "undefined" ) {
         var names = this.widgetDef.getAllItemSetNames();
         for ( var i = 0 ; i < names.length ; i++ ){
             var name = names[i];
             var itemSetWrapper = this.widgetDef.getItemSet(name);
             var anItemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl(parent,itemSetWrapper.name,itemSetWrapper.onItemSetChanged,null,itemSetWrapper.isPrivate);
             var items = itemSetWrapper.items;
             for (var j in items) {
                 var anItem = items[j];
                 anItemSet.setItemValue(anItem.id,anItem.value,anItem.isReadOnly);
             }
             this.widgetItemSets[name] = anItemSet; 
         }
     }
     com.ibm.mm.enabler.debug.exit("iWidget._loadWidgetDefItemSets");
   },
    _loadWidgetSharedResource: function(){
        var resources = this.widgetDef.getResources();
        com.ibm.mm.enabler.debug.entry("iWidget._loadWidgetSharedResource",resources);
        if (typeof resources != "undefined" && resources != null){
            for (var i in resources){
                var resource = resources[i];
                var name = resource[iwConstants.RESOURCE.id];
                var uri = resource[iwConstants.RESOURCE.src];
                var mimeType = resource[iwConstants.RESOURCE.mimetype];
                var callback = resource[iwConstants.RESOURCE.callback];
                if (typeof mimeType == "undefined" || mimeType == null){
                    mimeType = "text/plain";
                }
                if (typeof uri != "undefined" && uri != null){
                    serviceManager.getService("loadService").loadResource(this.id,null,uri,callback,mimeType);
                }
             }
        }
        com.ibm.mm.enabler.debug.exit("iWidget._loadWidgetSharedResource");
    },
    _createiScope:function(){
        //create scope object
        var iScope = this.widgetDef.getIScope();
        com.ibm.mm.enabler.debug.entry("iWidget._createiScope",iScope);

        if (typeof iScope != undefined  && iScope != null)
        {
            try{
                this.iScope = eval("new "+iScope+"();");
                }
            catch(err){             
                com.ibm.mm.enabler.debug.log("iWidget._createiScope","iScope"+iScope,"Error",err);
            }                
        }         
        if (typeof this.iScope == "undefined" || this.iScope == null)
            this.iScope = {};
        
        dojo.global["_"+this.id+"_iContext"].scope = this.iScope;  
        this.iScope.iContext =  dojo.global["_"+this.id+"_iContext"]; 
    },
    getIDescriptor:function()
    {
         if (this.iDescriptor) {
             return this.iDescriptor;
         }
         //read only for now
         this.iDescriptor = new com.ibm.mm.enabler.iw.iDescriptor(this.id,this.widgetDef.getiDescriptor(),this.getWidgetInstance().getiDescriptor());
         return this.iDescriptor;
    },
    getPublishedEvents: function()
    {
        com.ibm.mm.enabler.debug.entry("com.ibm.mm.enabler.iWidgetWrapperStandardImpl.getPublishedEvents");
        if( !this.publishedEvents ){
            this.publishedEvents = this.widgetDef.getPublishedEvents();
        }
        com.ibm.mm.enabler.debug.exit("iWidget.getPublishedEvents",this.publishedEvents);
        return this.publishedEvents;       
    },
    getHandledEvents:function()
    {    //return an array of event handler for this event
        //for each event, getEventDescription from widgetDef and widgetInstance
        com.ibm.mm.enabler.debug.entry("iWidget.getHandledEvents");
        if( !this.handledEvents ){
            this.handledEvents = this.widgetDef.getHandledEvents();
        } 
        com.ibm.mm.enabler.debug.exit("iWidget.getHandledEvents",this.handledEvents);
        return this.handledEvents;       
    },
    _loadWidgetAttributes: function(){
         com.ibm.mm.enabler.debug.entry("iWidget:_loadWidgetAttributes");

       this._loadDefWidgetAttributes();
        var instanceAtt = this.getWidgetInstance().getWidgetAttributes();
        if (instanceAtt != null) {
             for (var i in instanceAtt) {
                var name = i;
                var value = instanceAtt[name].defaultValue; 
                value = value.replace(/&lt;/gi, "<");
                value = value.replace(/&gt;/gi, ">");
                value = value.replace(/&amp;/gi, "&");
                this.widgetAttributes._internal().setItemValue(name,value,false, this._internalIbmModes.microformat);
            }
        }
        com.ibm.mm.enabler.debug.exit("iWidget:_loadWidgetAttributes");
    },
    _loadItemSets: function(){
         //load only once
         com.ibm.mm.enabler.debug.entry("iWidget._loadItemSets");
         this.widgetItemSets = {};
         // load previously parsed xml format ItemSets
         this._loadWidgetDefItemSets();

         //load itemsets from microformat defined on the html
         var instanceItemSets = this.getWidgetInstance().getItemSets();
         if (instanceItemSets != null) {

             for (var i in instanceItemSets) {
                 if (i == iwConstants.ATTRIBUTES || i == iwConstants.USERPROFILE || i == iwConstants.IDESCRIPTOR) {
                     continue;
                 }
                 var instanceItemSet = instanceItemSets[i];
                 var aItemSet = this.widgetItemSets[i];
                 if (typeof aItemSet == "undefined" || aItemSet == null) {
                        aItemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl(this,i);
                        this.widgetItemSets[i] = aItemSet;
                 }

                 for (var j in instanceItemSet) {
                     var itemName = j;
                     var itemValue = instanceItemSet[itemName]["defaultValue"];
                     this.widgetItemSets[i].setItemValue(itemName,itemValue,false);
                 }
             }

         }  
         com.ibm.mm.enabler.debug.exit("iWidget._loadItemSets");
      },
      _getDefaultMode:function(){
           var instanceIDescriptor = this.getWidgetInstance().getiDescriptor();
           if (typeof instanceIDescriptor != "undefined" && instanceIDescriptor != null) {
               var instanceItem = instanceIDescriptor[iwConstants.iDescriptorItems.mode];
               if (typeof instanceItem != "undefined" ||  instanceItem != null) 
                return instanceItem.defaultValue; 
           }
           var defIDescriptor =  this.widgetDef.getiDescriptor();
           var defItem = null;
           if (typeof defIDescriptor != "undefined" && defIDescriptor != null) {
              defItem = defIDescriptor[iwConstants.iDescriptorItems.mode];
              if (typeof defItem == "undefined")  defItem = null;
           }
           return defItem; 
      },
      getWires:function(){
    	  if (typeof (this.wires) == "undefined"  || this.wires === null)
    	  {
    		  this.wires = this.getWidgetInstance().getWires();   
    	      for (var i=0;i<this.wires.length;i++)
    	      {
    	            var aWire = this.wires[i];        
    	            serviceManager.getService("eventService").subscribeWire(aWire.SourceWidget,aWire.SourceEvent,this.id,aWire.TargetEvent);
    	      }
    	  }	
    	  return this.wires;
      }	  
});

dojo.declare("com.ibm.mm.enabler.iWidgetContainer",null,{	
	constructor:function () {         
        //subscribe to page changed event, thus it can got notified once
        //a page is updated   
		this.widgetArr = {}; //associate array since it provides direct access
	    this.eventService = serviceManager.getService("eventService");
        this.queryService = serviceManager.getService("queryService");
        //deprecated
        dojo.subscribe( "/enabler/pageChanged",this,"_unloadWidgets");    
        dojo.subscribe( "/enabler/widgetDeleted",this,"_unloadWidgets"); 
        dojo.subscribe( "/enabler/unloadWidget",this,"_unloadWidgets");   

        var img = document.createElement("img");
           img.src = dijit._Widget.prototype._blankGif;
           img.className = "lotusLoading";
        this.processAnim = img;
    },	
	createWidget: function(/*DomElment*/widgetSpan)
	{   
        com.ibm.mm.enabler.debug.entry("iWidgetContainer.createWidget",widgetSpan);
        /*if (widgetSpan.getAttribute("widgetStatus") !== null) {
			return;
		}*/
        
        // for now by design id is required attribute for each widget
        var id = widgetSpan.getAttribute("id");
        if (typeof(id) == "undefined") {
			return;
		}

        var oldWidget = this.widgetArr[id];
        // each fragment is uniquely identified by the widget id, thus we don't support different fragment that shares the same id
        // the old one will be deleted
 
        if (typeof oldWidget != "undefined" && oldWidget !== null) {
            var oldfragment = oldWidget.rootElement;
            if (oldfragment == widgetSpan) { //eg. switch skin
                return oldWidget;
            }
            else{
                this._unloadWidget(id);
            }
        }

        var aWidget = new com.ibm.mm.enabler.iWidgetWrapperDefaultImpl(widgetSpan,id);  
        this.widgetArr[id] = aWidget;
        com.ibm.mm.enabler.debug.exit("iWidgetContainer.createWidget",aWidget);
        return aWidget;  
	},
	renderWidget: function(/*Object*/iWidget)
	{
        if (typeof iWidget == "undefined") {
			return;
		}
        if (iWidget.loaded && iWidget.loaded == true) {
            return;
        }
        iWidget.render();
	},
    getWidgetById: function(/*String*/id)
    {
        com.ibm.mm.enabler.debug.entry("iWidgetContainer.getWidgetById",id);

        var widget = this.widgetArr[id];
        if (typeof widget != "undefined" ) {
            com.ibm.mm.enabler.debug.exit("iWidgetContainer.getWidgetById",widget);
            return widget;
        }
        return null;
    }, 
    _unloadWidgets: function(/*[]*/arr)
    {
        com.ibm.mm.enabler.debug.entry("iWidgetContainer._unloadWidgets");
         var aWidget;
        if (typeof arr != "undefined" || arr !== null)
        {
            if (dojo.isArray(arr)) {
                for (var i in arr){
                    aWidget = arr[i]; 
                    this._unloadWidget(aWidget);                      
                }  
                dojo.publish("/enabler/widgetsUnloaded"); 
            }
            else if (dojo.isString(arr)) {
                this._unloadWidget(arr);
            }
        }
     },
    _unloadWidget:function(aWidget)
    {
         if (typeof this.widgetArr[aWidget] != "undefined" && this.widgetArr[aWidget] !== null ) {
                var widgetwrapper = this.widgetArr[aWidget];
                if(widgetwrapper.loaded){
                    widgetwrapper.handleEvent(com.ibm.mm.enabler.iw.iEvents.Constants.onUnLoad);
                    widgetwrapper.destroy();
                    delete this.widgetArr[aWidget];
                 }
                 else{
   					widgetwrapper.destroy();
                    delete this.widgetArr[aWidget];  

                 }
          } 
    }
});
iWidgetContainer = new com.ibm.mm.enabler.iWidgetContainer();

dojo.declare("com.ibm.mm.enabler.iWidgetInstanceStandard",null,   {
    constructor:function(/*RootElement*/widgetSpan,/*String*/id){
        this.rootElement = widgetSpan;
        this.id = id;
        this.ns = widgetSpan.className.substr(0,3);

        var nodes=[];
        className=this.ns+"Definition";
        com.ibm.mm.enabler.iw.utils.findElementByAttribute("class",className,this.rootElement,nodes,false);

        var node = nodes[0];
        var url = node.getAttribute("href");
		if (typeof (url) != "undefined" && url !== null ){
               this.widgetXMLUrl = url;
        } 
    }, 
    getDefaultViewContent:function(){
         if (this.defaultViewContent) return this.defaultViewContent;
         var className = this.ns+"Content";
         var nodeList = dojo.query("span."+className,this.rootElement);
         if (typeof nodeList != "undefined" && nodeList !== null) {
             var node = nodeList[0];
         }
         if (node) {
		 	this.defaultViewContent = node.innerHTML;
		 	return this.defaultViewContent;
		 }
		 else {
		 	return null;
		 }
    },
    getWidgetEvents: function(){
        //simple events including all the predefined events and onSth. event
        if (this.widgetEvents) return this.widgetEvents;
            var widgetEvents = {};
            var attributes = this.rootElement.attributes;
            for (var i=0;i<attributes.length;i++)
            {
                var attribute = attributes[i];
                if (attribute.name !== null && attribute.name.indexOf("on")===0)
                {
                    var handler = this.rootElement.getAttribute(attribute.name);
                    if (typeof handler != "undefined" && handler !== null ) 
                    {
                        widgetEvents[attribute.name] = handler;
                        com.ibm.mm.enabler.debug.log("iWidgetInstance.getWidgetEvents","eventName:"+attribute.name+" handler:"+widgetEvents[attribute.name]);
                    }
                }
             }
             this.widgetEvents = widgetEvents;
         
          return this.widgetEvents;
    },   
    getWires:function(){
           var wires = [];
           var ns = this.ns;
           var className="ReceivedEvent";
           var nodes=[];
           com.ibm.mm.enabler.iw.utils.findElementByAttribute("class",ns+className,this.rootElement,nodes,true);
           var names = ["SourceWidget","SourceEvent","TargetEvent"];
           var classes = ["SourceEvent","TargetEvent"];
           for (var i=0;i<nodes.length;i++){
               var aNode = nodes[i];
               var aWire = {};
               var isValid = true;
               for (var j=0;j<2;j++){
                   var element=[];
                   com.ibm.mm.enabler.iw.utils.findElementByAttribute("class",ns+classes[j],aNode,element,false);
                   if (element.length == 0 ){ isValid = false; }
                   else{
                       if ( j==0 ) {
                           var temp = element[0].getAttribute("href");
                           if (typeof temp != "undefined" || temp != null) {
                             var index = temp.indexOf ("#");
                             if (index != -1) {
                                 temp=temp.substring(index+1);
                             }
                             aWire[names[0]] = temp;
                             aWire[names[1]] = element[0].innerHTML;
                            }
                       }
                       else{
                           aWire[names[2]] = element[0].innerHTML;                       
                       }
                   }                   
               }
               if (isValid) {
			   	wires.push(aWire);
			   }                
           } 
         return wires;        
    },
    getWidgetAttributes:function(){
         var attributes = this.getItemSets()[iwConstants.ATTRIBUTES];
         if (typeof attributes == "undefined") {
		 	attributes = null;
		 }
         return  attributes;
    },
    getiDescriptor:function(){    
        var iDescriptor = this.getItemSets()[iwConstants.IDESCRIPTOR];
        if (typeof iDescriptor == "undefined") {
			iDescriptor = null;
		}
        return  iDescriptor;  
    },
    getItemSets:function(){
         if (this.itemSets) {
		 	return this.itemSets;
		 }
         this.loadItemSets();
         return this.itemSets;
    },
    loadItemSets:function(){
    	delete this.itemSets;
        this.itemSets = {};
        var itemSetChildren = [];
        com.ibm.mm.enabler.iw.utils.findElementByAttribute("class",this.ns+"ItemSet",this.rootElement,itemSetChildren,true);
        if ( itemSetChildren.length > 0 ) {
            for (var i=0;i<itemSetChildren.length;i++) {
                var elem = itemSetChildren[i];
                var itemSetName = elem.getAttribute("title");
                if (typeof (itemSetName) != "undefined")    {
                    aItemSet = this.itemSets[itemSetName];
                    if (typeof aItemSet == "undefined" || aItemSet === null) {
                        //aItemSet = [];
                        this.itemSets[itemSetName] = {};
                    }
                    // now get the Item schildren and add them to aItemSet
                    var itemChildren =[];
                    com.ibm.mm.enabler.iw.utils.findElementByAttribute("class",this.ns+"Item",elem,itemChildren,true);
                    if (itemChildren.length !=0 ) {
                        for (var j=0; j<itemChildren.length;j++) {
                            var elem1 = itemChildren[j];
                            var anItem = this._loadLocalizedItem(elem1);
                            var itemName = anItem.itemName;
                            this.itemSets[itemSetName][itemName]=anItem;
                        }
                    }
                }
            }
        }
    },	
    _loadLocalizedItem:function(/*element*/elem1){
    	 //get itemName
    	 var item = {};
    	 var itemName = elem1.getAttribute("href");
         var index = itemName.indexOf ("#");
         if (index != -1) {
             itemName=itemName.substring(index+1);
         }
         item.itemName = itemName;
         
         //get default lang
         var lang = elem1.getAttribute("lang");
         if(typeof lang == "undefined") lang = null;
         if (lang != null) {
        	 item.defaultLang = lang;
         }	 
         
         //get default value, support text only, "value" will be the default value
         //<a class="iw-Item" lang="en" href="#title">value
         //<span class="iw-Value" lang="en">value</span>
         //<span class="iw-Value" lang="de">de_value</span>
         //</a>
         //"iw-Value" is not required for V1.1 anymore
         /*var childNodes = elem1.childNodes;
         for (var i=0;i<childNodes.length;i++) {
             var child = childNodes[i];
             if (child.nodeType == 1 && child.className = "iw-Value") {//break when element is found
            	 break;
             }
             if (child.nodeType == 3 || child.nodeType == 4 ){
            	 var tempStr = child.nodeValue;
            	 tempStr = tempStr.replace(/^\s+|\s+$/g, '') ;
            	 if (tempStr.length != 0) {
            		 var defaultValue = tempStr;
            	 }	 
            	 break;
             }	 
         }*/
         var defaultValue = elem1.innerHTML;
         if (typeof defaultValue != "undefined" || defaultValue != null) item.defaultValue = defaultValue;
         
         // save localized values
         /*var localizedValue = {};
         var empty = true;
         var nodeList = dojo.query("span."+"iw-Value",elem1);
         for (var j=0; j<nodeList.length; j++){
        	 var aNode = nodeList[j];
        	 var aLang = aNode.getAttribute("lang");
        	 if (typeof aLang != "undefined" && aLang != null){
        		 var value = aNode.innerHTML;
        		 localizedValue[aLang]=value;
        		 empty = false;
        		 if (aLang == item.defaultLang) item.defaultValue = value; 
        	 }
         }	
         if (!empty) item.localizedValue = localizedValue;*/
         
         com.ibm.mm.enabler.debug.exit("com.ibm.mm.enabler.iWidgetInstanceStandard._loadLocalizedItem","item:"+item);
         return item;         
    }	
});

iwConstants = {
    mode_view:"view",
    mode_edit:"edit",
    mode_help:"help",
    ATTRIBUTES:"attributes",
    IDESCRIPTOR:"idescriptor",
    USERPROFILE:"userprofile",
    iDescriptorItems:{
        title:"title",
        name:"name",
        description:"description",
        defaultHeight:"defaultHeight",
        defaultWidth:"defaultWidth",
        locales:"locales",
        mode:"mode",
        size:"size",
        author:"author",
        email:"email",
        website:"website",
        version:"version",
        globalAttributes:"globalAttributes",
        icon:"icon"
    },
    CSSCLASS_INSTANCE:{
    	iwiWidget:"iWidget",
    	iwDefinition:"Definition",
    	iwHandler:"Handler",
    	iwItemDescription:"ItemDescription",
    	iwReadOnly:"ReadOnly",
    	iwItemSet:"ItemSet",
    	iwItemSetDescRef:"ItemSetDescRef",
    	iwResource:"Resource",
    	iwSrc:"iwSrc",
    	iwmime:"mime",
    	iwversion:"version",
    	iwcallback:"callback",
    	iwContent:"Content",
    	iwAllowInstanceContent:"AllowInstanceContent",
    	iwReceivedEvent:"ReceivedEvent",
    	iwSourceEvent:"SourceEvent",
    	iwTargetEvent:"TargetEvent",
    	iwItem:"Item",
    	iwValue:"Value"
    },
    RESOURCE:{
        src:"src",
        id:"id",
        mimetype:"mimetype",
        callback:"callback",
        version:"version"
    }
};
