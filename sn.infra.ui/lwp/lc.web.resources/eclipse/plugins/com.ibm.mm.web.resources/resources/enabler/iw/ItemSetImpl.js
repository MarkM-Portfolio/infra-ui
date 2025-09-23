/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.mm.enabler.iw.ItemSetImpl");
// dojo.require( "com.ibm.mm.enabler.model.internal" );
dojo.require("com.ibm.mm.enabler.iw.ItemSet");

dojo.declare("com.ibm.mm.enabler.iw.Item", null, {
            constructor:function(name,value,isReadOnly,descriptionId){        
                this.name = name;        
                this.value = value; 
                this.descriptionId = descriptionId;
                if (typeof isReadOnly == "undefined"  || isReadOnly == null) 
                    this.isReadOnly = false;
                else
                    this.isReadOnly = isReadOnly;   
            }
});  

dojo.declare("com.ibm.mm.enabler.iw.DefaultItemSetImpl", com.ibm.mm.enabler.iw.ItemSet, {    
            constructor:function(parent,name,onItemSetChanged,description,isPrivate){
				if(parent){
					this.parent = parent.id;
					this.scope = parent.iScope;
				}
                this.name = name;
                this.onItemSetChanged = onItemSetChanged;
                this.description = description;
                this.isPrivate = isPrivate;
                this.items = {};
                this.listeners = {};
                if (onItemSetChanged) {
                    this.listeners[onItemSetChanged] = onItemSetChanged;
                }
                this._debug = com.ibm.mm.enabler.debug;
            },
            addListener:function(/*obj*/fn){
                 this.listeners[fn.toString()] = fn;
            },
            removeListener:function(/*obj*/fn){
                 if (this.listeners[fn.toString()]) {
                     this.listeners[fn.toString()] = null;
                 }  
            },
            setItemValue: function( /*String*/ itemName, /*Object*/ value,/*boolean*/readOnly ){          
                 this._debug.log("ItemSet.setItemValue ","itemName:"+itemName,"value:"+value,"readOnly:"+readOnly);
                 if ( typeof value == "undefined") return null;

                 var isReadOnly = false;
                 if (!(typeof readOnly == "undefined" || readOnly == null)) isReadOnly = readOnly;
                    this._debug.log("ManagedItemSet.setItemValue","creating new Item ("+"itemName:"+itemName+" value:"+value+" readOnly:"+readOnly+")");

                    var item = new com.ibm.mm.enabler.iw.Item(itemName,value,isReadOnly);
                    if (this.items[itemName]){              
                        // replace the old one only if the old item is not readOnly
                        this._debug.log("ManagedItemSet.setItemValue","Itemset readOnly is "+ this.items[itemName].isReadOnly);
                        if ( this.items[itemName].isReadOnly == "true" ){                  
                            return null;     
                        }
                        else{ 
                            var payload = {itemSetName: this.name,changeType:"changedValue"}
                            payload.old = this.items[itemName].value;
                            payload["new"] = value;
                            var iEvent = new com.ibm.mm.enabler.iw.iEventImpl("onItemSetChanged",null,payload);
                            this.items[itemName] =item;  
                            this._handleOnItemSetChanged(iEvent);
                        }          
                    }          
                    else{         
                        var payload = {itemSetName: this.name,changeType:"newItem"}
                        payload["new"] = value;
                        var iEvent = new com.ibm.mm.enabler.iw.iEventImpl("onItemSetChanged",null,payload);
                        this.items[itemName] =item;  
                        this._handleOnItemSetChanged(iEvent);
                    }
                    return this;  
                },  
            getItemValue: function( /*String*/ itemName ){   
                 var anItem = this.items[itemName];
                 if (typeof anItem == "undefined" || anItem == null) return null;
                    var value = this.items[itemName].value;
                 if (typeof value == "undefined" || value == null) return null;         
                 return value;
            },   
            getAllNames: function (){
                 if (typeof this.items == "undefined" || this.items == null ) return null;         
                 var names = new Array();  
                 var aName;    
                 var i=0;    
                 for ( aName in this.items){              
                     names.push(aName);  
                     i=i+1;        
                 }  
                 if (i==0) return null; 
                 return names;
            },   
            removeItem: function(/*String*/itemName){          
                 if (this.items[itemName]){    
                     if ( this.items[itemName].isReadOnly && this.items[itemName].isReadOnly == "true" ){                  
                         return null;     
                     }
                     else if (this.items[itemName] == null)     
                         return null;                    
                }          
                 var payload = {itemSetName: this.name,changeType:"removedItem"};
                 payload.old = this.items[itemName].value;
                 var iEvent = new com.ibm.mm.enabler.iw.iEventImpl("onItemSetChanged",null,payload);
                 this.items[itemName] = null;  
                 this._handleOnItemSetChanged(iEvent);
                 return this;
            },
            clone: function (){

                 var newItemSet = new com.ibm.mm.enabler.iw.DefaultItemSetImpl(null,this.name);
                 var arr = this.items;  
                 var anItem;        
                 for (anItem in arr){   
                     var newItem = new com.ibm.mm.enabler.iw.Item();
                     newItem = dojo.mixin(newItem,this.items[anItem]);           
                     newItemSet.items[newItem.name] = newItem;         
                 }
                 return newItemSet;
            }, 
            isReadOnly: function(/*String*/itemName){
                 this._debug.entry("ManagedItemSet.isReadOnly", "itemName:"+itemName);
                var anItem = this.items[itemName];
                if (typeof anItem == "undefined" || anItem == null ) return false;
                return anItem.isReadOnly;         
            },
            getItemSetDescription:function(){
                 return null;
            },
            _handleOnItemSetChanged:function(iEvent){  
                 for (var i=0; i<this.listeners;i++) {
                     var fn = this.listeners[i];
                     if (fn != null && this.scope) {
                         dojo.hitch(this.scope,fn)(iEvent);
                     }
                 }
            }
});

dojo.declare("com.ibm.mm.enabler.iw.iDescriptor",com.ibm.mm.enabler.iw.ManagedItemSet,{
            constructor:function(widgetId,defiDescriptor,instanceiDescriptor){
                this.widgetId = widgetId;
                this.defiDescriptorItems = defiDescriptor;    //associative array
                this.instanceiDescriptorItems = instanceiDescriptor;   //associative array
            },
            getItemValue:function(/*string*/name){
                 var value=null;
                 if(typeof name != "undefined" && name != null && name == iwConstants.iDescriptorItems.mode){
                     var widgetWrapper = this._getWidgetWrapper();
                     if (widgetWrapper != null) {
                         value = widgetWrapper.currentMode;
                     }
                 }
                 else{
                     value = this._getItemValue(/*String*/name);
                 }
                 return value;
            },
            _getItemValue:function(/*String*/itemName){
                 if (this.defiDescriptorItems != null) {
                     var defItem = this.defiDescriptorItems[itemName];
                 }
                 if (this.instanceiDescriptorItems != null) {
                     var instanceItem = this.instanceiDescriptorItems[itemName].defaultValue;   
                 }
                      
                 if (typeof instanceItem != "undefined" ||  instanceItem != null) 
                 return instanceItem;

                 if (typeof defItem == "undefined")  defItem = null;
                 return defItem;
            },
            setItemValue:function(name,value,readOnly){
                 //readonly
                 return null;
            },
            isReadOnly:function(name){
                 return true;
            },
            _getWidgetWrapper:function(){
                 if (this.widgetId) {
                     var widget=iWidgetContainer.widgetArr[this.widgetId];
                     if ( widget && widget != null ) return widget;
                 }
                 return null;
            },
            removeItem:function(name){
                 return null;
            },
            getAllNames:function(){
                 var arr = {};
                 if (this.defiDescriptorItems != null) {
                     for (var i in this.defiDescriptorItems) {
                         arr[i] = true;
                     }
                 }
                 if (this.instanceiDescriptorItems != null) {
                     for (var j in this.instanceiDescriptorItems) {
                         arr[j] = true;
                     }
                 }
                 var nameArr = [];
                 for (var name in arr) {
                     nameArr.push(name);
                 }
                 return nameArr;
            },
            save:function(cb){
                 return null;
            },
            getItemSetDescription:function(){
                 return null;
            }
            //todo:clone
}); 

// INTERNAL PRIVATE CLASS - do NOT use directly
// Use PersistentAttributes instead
dojo.declare("com.ibm.mm.enabler.iw.InternalPersistentAttributesToPreferenceModelAdapter", com.ibm.mm.enabler.iw.ManagedItemSet, {
    //Provides an the ItemSet interface to to the preference subsystem
    constructor: function(widget, serverless) {
        this.xmlItems = {};
        this.microformatItems = {};

        this.serverless = (serverless == true);

        this.modes = com.ibm.mm.enabler.iw.ItemSet._internalIbmModes;
        this.widget = widget; 

/*
        if (this.serverless)
            return;
            
        this.personalNodeName = this._getHackOid(widget.id, "p_"); 
        this.instanceNodeName = this._getHackOid(widget.id, "i_");
        this.definitionNodeName = this._getHackOid(widget.getWidgetInstance().widgetXMLUrl, "d_");

        this._init();
*/        
    },
    
    
    setItemValue: function( itemName, value, readOnly, _mode){ 
        value = value ? value : "";

        value = "" + value;  // TODO: Need to change to json object

        // TODO: find out whether the fact this needs to be done is a bug
        if (typeof readOnly == "string")
            readOnly = (readOnly.toLowerCase() == "true");
        else
            readOnly = (readOnly == true);

        if (this.serverless) {
            var mode = this._getMode(_mode);
            if (mode != this.modes.xml && mode != this.modes.microformat)
                return null; 

            var xmlItem = this.xmlItems[itemName];
            if (xmlItem && xmlItem.readOnly)
                return null;
            if (mode == this.modes.xml) {
                this.xmlItems[itemName] = {value: value, readOnly: readOnly};
                return this;
            }

            var mfItem = this.microformatItems[itemName];
            if (mfItem && mfItem.readOnly)
                return null;
            this.microformatItems[itemName] = {value: value, readOnly: readOnly};
            return (this);
        }

        return null;
/*
        var items = this._getItems(_mode, false)            
        if (items) {
            var item = items[itemName];
            if (item && item.readOnly)
                return null;    
            items[itemName] = {value: value, readOnly: readOnly};
            return this;
        }
        
        var prefSet = this._getPrefSet(_mode, false);
        var prefNode = prefSet.getPreference(itemName);
        if (prefNode) {
            if (prefNode.isReadOnly())
                return null;     
        }
        else {
            prefNode = prefSet.create({ type : "PreferenceNode", name : itemName});
            prefSet.insert(prefNode);
        }
        
        value = encodeURIComponent(value);
        
        // TODO: remove workaround prefNode.setValues([]) when for bug in pref system is fixed
        if (value == "")
            prefNode.setValues([])
        else
            prefNode.setValue(value);
            
        prefNode.setReadOnly(readOnly);
        this._dirtyPrefSets(_mode);  // TODO: after following bug in pref model is fixed, <-- this can be removed
                                     // Bug 492: Peformance Enhancement for Attributes ItemSet -- reduce hierarchy recalcuations 
        return this;
*/          
    }, 

    getItemValue: function(itemName, _mode, _merge){
        if (this.serverless) {
            var mode = this._getMode(_mode);
            if (mode != this.modes.xml && mode != this.modes.microformat)
                return null; 

            if (_merge == undefined)
                _merge = true;

            var xmlItem = this.xmlItems[itemName];
            var mfItem = this.microformatItems[itemName];
            if (mode == this.modes.xml) {
                if (!xmlItem)
                    return null;
                return xmlItem.value;
            }
            
            if (_merge && xmlItem && (xmlItem.readOnly || (!mfItem))) 
                    return xmlItem.value;

            if (!mfItem)
                    return null;

            var value = mfItem.value;
            return value;
        }

        return null;
/*
        var items = this._getItems(_mode, _merge)            
        if (items) {
            var item = items[itemName];
            if (item)
                return item.value;
            return null;
        }

        var prefSet = this._getPrefSet(_mode, _merge);
        
        var prefNode = prefSet.getPreference(itemName);
        if (!prefNode)
            return null;
        var value = prefNode.getValue();
        value = decodeURIComponent(value);
        return value;
*/        
    }, 

    getAllNames: function (_mode, _merge){
        if (this.serverless) {
            var mode = this._getMode(_mode);
            if (mode != this.modes.xml && mode != this.modes.microformat)
                return null; 
            if (_merge == undefined)
                _merge = true;
            
            if (!_merge) {
                if (mode == this.modes.xml)
                    return this._getNamesArray(this.xmlItems);
                    
                return this._getNamesArray(this.microformatItems);
            }
                
            var mergedItems = {};
            var name;
            for (name in this.xmlItems) {
                mergedItems[name] = true;
            }
            for (name in this.microformatItems) {
                mergedItems[name] = true;
            }
            return this._getNamesArray(mergedItems);
        }

        return null;
/*        
        var i=0;
        var names = new Array();  

        var prefSet = this._getPrefSet(_mode, _merge);
        prefSet.setCursorPosition(0);
        while (prefSet.hasNext()) {
            var node = prefSet.next();
            names.push(node.getName());
            i++;
         }  
         if (i==0)
             return null; 
         return names;
*/         
    },

    removeItem: function(itemName, _mode){          
        if (this.serverless) {
            var mode = this._getMode(_mode);
            if (mode != this.modes.microformat)
                return null;
            if (this.microformatItems[itemName])
                delete this.microformatItems[itemName];
            return this;    
        } 
        
        return null;
/*
        var prefSet = this._getPrefSet(_mode, false);
        var node = prefSet.getPreference(itemName);
        
        if (node) {
            prefSet.remove(node);
            this._dirtyPrefSets(_mode);  // TODO: after performance bug in pref model is fixed, this can be removed
        }
        
        return this;
*/        
    },

    clone: function (){
        // TODO: Not sure what to do here
        return null;
    }, 

    isReadOnly: function(/*String*/itemName, _mode, _merge){
        if (this.serverless) {
            var mode = this._getMode(_mode);
            if (mode != this.modes.xml && mode != this.modes.microformat)
                return false; 

            if (_merge == undefined)
                _merge = true;

            var xmlItem = this.xmlItems[itemName];
            var mfItem = this.microformatItems[itemName];
            if (mode == this.mode.xml) {
                if (!xmlItem)
                    return false;
                return xmlItem.readOnly;
            }

            if (_merge && xmlItem && (xmlItem.readOnly || (!mfItem))) 
                    return xmlItem.readOnly;

            if (!mfItem)
                    return false;

            return mfItem.readOnly;
        }

        return null;
/*        
        var prefSet = this._getPrefSet(_mode, _merge);
        var prefNode = prefSet.getPreference(itemName);
        if (!prefNode)
            return false;
        return prefNode.isReadOnly();
*/        
    },

    save: function(callbackfn){
        if (this.serverless)
            this._saveMicroformat();
        else
            return null;
 /*
            this.pm.commit().start();
            // TODO: when error handling is available, should use it
*/        
        this.reload();
        
        if (callbackfn)
            callbackfn();
            
        return(this);
    },

    reload: function(){
        if (this.serverless)
            return this;

        return null;
/*            
        this.personalNode = null;
        this.instanceNode = null;
        this.definitionNode = null;
        this.personalPrefSet = null;
        this.instancePrefSet = null;
        this.definitionPrefSet = null;
        this.personalHierPrefSet = null;
        this.instanceHierPrefSet = null;
        this.definitionHierPrefSet = null;
        this._init();
        return (this);
*/        
    },
        
    _getNamesArray: function (items){
        var i=0;
        var names = new Array();  
        var name;

        for (name in items) {
            names.push(name);
            i++;
        }

        if (i==0)
            return null;
                
        return names;
    },

    _saveMicroformat: function(){
        var attributeItemSets;
        var i;
        var ns = this.widget.ns;
        var root = this.widget.rootElement;
        attributeItemSets = dojo.query('span.' + ns + 'ItemSet[title="' + iwConstants.ATTRIBUTES + '"]', root);
        for (i = 0; i < attributeItemSets.length; i++) {
            var itemSet = attributeItemSets[i];
            if (root == itemSet.parentNode)
                root.removeChild(itemSet);
        }
        
        var newItemSet = document.createElement("span");
        newItemSet.className = ns + 'ItemSet';
        newItemSet.title = iwConstants.ATTRIBUTES;
		newItemSet.style.display = "none";
		newItemSet.style.visibility="hidden";
        root.appendChild(newItemSet);

        var names = this.getAllNames(this.modes.microformat, false);
        if (!names)
            return;
            
        for (i = 0; i < names.length; i++) {
            var itemName = names[i];
            var itemValue = this.getItemValue(itemName, this.modes.microformat, false);
            var newItem = document.createElement("a");
            newItem.className = ns + 'Item';
            newItem.style.visibility = "hidden";
			newItem.style.display="none"
            newItem.href = "#" + itemName;
            newItem.appendChild(document.createTextNode(itemValue));
            newItemSet.appendChild(newItem);          
        }
    },
    
    _setMode: function(mode){
        //TODO: make obsolete when real mode support is available
        this._mode = mode;
    },
        
    _getMode: function(_mode){
        if (_mode)
            return _mode;
            
        //TODO: hook to real mode support when it is available
        if (!this._mode)
            this._mode = this.modes.microformat;
        return this._mode; 
    }
});

/*    
    _getHackID: function(idText, prefix){
        var id;
        var strippedText = idText.replace(/\W+/g, "");
        var len = strippedText.length;
        if (len >= 34)
            id = prefix + strippedText.slice(-34)
        else
            id = "__________________________________".slice(0, 34 - len) + prefix + strippedText;
            
        id = "id:" + id;
        return id;
    },

    _init: function() {
        if (this.serverless)
            return;

        // TODO: try with empty user
        this.pm = new com.ibm.mm.enabler.model.internal.PreferenceModelImpl("user");
        
        // TODO:  when lookup strategy is implemented use it
        // Bug 491: Peformance Enhancement for Attributes ItemSet -- reduce server hits
         
        // TODO:  what can be in uri, can I use / or colons or other characters

        this.personalNode = this.pm.find(this.personalNodeName).start();
        this.instanceNode = this.pm.find(this.instanceNodeName).start();
        this.definitionNode = this.pm.find(this.definitionNodeName).start();
        
        if (!this.definitionNode) {
            this.definitionNode = this.pm.create({id : this.definitionNodeName}); 
            this.pm.insert(this.definitionNode, null);
        }
            
        if (!this.instanceNode) {
            this.instanceNode = this.pm.create({id : this.instanceNodeName}); 
            this.pm.insert(this.instanceNode, this.definitionNode);
        }
        
        if (!this.personalNode) {
            this.personalNode = this.pm.create({id : this.personalNodeName}); 
            this.pm.insert(this.personalNode, this.instanceNode);
        }
            
        // TODO: when error handling is available, should use it
    },

    _initializeInstancePreferencesFromMicroformat: function(){
        var instancePreferences = dojo.query("span.com_ibm_attributes_internalInstancePreferences", this.widget.rootElement);
        for (var i = 0; i < instancePreferences.length; i++) {
            var itemSet = instancePreferences[i];
            var items = dojo.query("a.com_ibm_attributes_internalInstancePreference", itemSet);
            for (var j = 0; j < items.length; j++) {
                var item = items[j];
                var itemValue = decodeURIComponent(item.innerHTML);
                var itemName = null;
                var index = item.href.indexOf ("#");
                if (index != -1) {
                    itemName = item.href.substring(index+1);
                }
                if (itemName) {
                    if (itemName.indexOf("ro" == 2)) {
                        this.setItemValue(itemName.substring(2),itemValue,true, this.modes.microformat);
                    } else if (itemName.indexOf("rw" == 2)) {
                        this.setItemValue(href.substring(2),itemValue,false, this.modes.microformat);
                    }
                }
            }
        }
    },

    _saveInstancePreferencesToMicroformat: function(){
        var i;
        var instancePreferences = dojo.query("span.com_ibm_attributes_internalInstancePreferences", this.widget.rootElement);
        for (i = 0; i < instancePreferences.length; i++) {
            var itemSet = instancePreferences[i];
            itemSet.parentNode.removeChild(itemSet);
        }
        var newItemSet = document.createElement("span");
        newItemSet.className = "com_ibm_attributes_internalInstancePreferences";
        this.widget.rootElement.appendChild(newItemSet);

        var names = this.getAllNames(this.modes.microformat, false);
        if (!names)
            return;
            
        for (i = 0; i < names.length; i++) {
            var itemName = names[i];
            var itemValue = encodeURIComponent(this.getItemValue(itemName, this.modes.microformat, false));
            var readOnly = this.isReadOnly(itemName, this.modes.microformat, false);
            var newItem = document.createElement("a");
            newItem.className = "com_ibm_attributes_internalInstancePreference";
            newItem.setAttribute("style", "visibility:hidden");
            newItem.href = "#" + (readOnly ? "ro" : "rw") + itemName;
            newItem.innerHTML = itemValue;
            newItemSet.appendChild(newItem);          
        }
    },

    _getItems: function(mode, merge){
        if (merge == undefined || merge)
            return null;
            
        if (!mode)
            mode = this._getMode();
            
        var items = null;
        
        if(mode == this.modes.xml)
            items = this.xmlItems;
        else if (mode == this.modes.microformat)
            items = this.microformatItems;
            
        return items;
    },
            
    _preLevelItemsHook: function(level){
        if (level == "ADMIN")
            return this.xmlItems;
        if (level == "INSTANCE")  
            return this.microformatItems;
    },
    
    _getPrefSet: function(mode, merge){
        if (!mode)
            mode = this._getMode();

        if(mode == this.modes.xml)
            mode = this.modes.configure;
        else if (mode == this.modes.microformat)
            mode = this.modes.microformat;

        if (merge == undefined)
            merge = true;

        if (mode == this.modes.configure) {
            if (merge) {
                if (!this.definitionHierPrefSet)
                    this.definitionHierPrefSet = this.pm.getHierarchyPreferenceSetModel(this.definitionNode, this);
                prefSet = this.definitionHierPrefSet;
            } else {
                if (!this.definitionPrefSet)
                    this.definitionPrefSet = this.pm.getPreferenceSetModel(this.definitionNode);
                prefSet = this.definitionPrefSet;
            }
        }

        else if (mode == this.modes.microformat) {
            if (merge) {
                if (!this.instanceHierPrefSet)
                    this.instanceHierPrefSet = this.pm.getHierarchyPreferenceSetModel(this.instanceNode, this);
                prefSet = this.instanceHierPrefSet;
            } else {
                if (!this.instancePrefSet)
                    this.instancePrefSet = this.pm.getPreferenceSetModel(this.instanceNode);
                prefSet = this.instancePrefSet;
            }
        }
        else {
            if (merge) {
                if (!this.personalHierPrefSet)
                    this.personalHierPrefSet = this.pm.getHierarchyPreferenceSetModel(this.personalNode, this);
                prefSet = this.personalHierPrefSet;
            } else {
                if (!this.personalPrefSet)
                    this.personalPrefSet = this.pm.getPreferenceSetModel(this.personalNode);
                prefSet = this.personalPrefSet;
            }
        }

        return prefSet;
    },
        
    _dirtyPrefSets: function (mode){
        if (!mode)
            mode = this._getMode();
        if (mode == this.modes.configure) {
            this.definitionHierPrefSet = null;
            this.instanceHierPrefSet = null;
            this.personalHierPrefSet = null;
        }
        else if (mode == this.modes.microformat) {
            this.instanceHierPrefSet = null;
            this.personalHierPrefSet = null;
        }
        else {
            this.personalHierPrefSet = null;
        }
    }
});
*/    

dojo.declare("com.ibm.mm.enabler.iw.PersistentAttributes",com.ibm.mm.enabler.iw.ManagedItemSet,{
    constructor: function(widgetDefinitionUrl, widgetInstanceId, serverless) {

        this._internalPersistentAttributesToPreferenceModelAdapter = 
                new com.ibm.mm.enabler.iw.InternalPersistentAttributesToPreferenceModelAdapter(
                        widgetDefinitionUrl, widgetInstanceId, serverless);
    },
    
    setItemValue: function(itemName, value, readOnly){
        return this._internal().setItemValue(itemName, value, readOnly);          
    }, 

    getItemValue: function(itemName){
        return this._internal().getItemValue(itemName);          
    }, 

    getAllNames: function (){
        return this._internal().getAllNames();          
    },

    removeItem: function(itemName){          
        return this._internal().removeItem(itemName);          
    },

    clone: function (){
        return this._internal().clone();          
    }, 

    isReadOnly: function(itemName, _mode, _merge){
        return this._internal().isReadOnly(itemName);          
    },

    save: function(callbackfn){
        return this._internal().save(callbackfn);          
    },
    
    _internal: function() {
        return this._internalPersistentAttributesToPreferenceModelAdapter;
    }

});

com.ibm.mm.enabler.iw.ItemSet._internalIbmModes = {
    view:"view",
    edit:"edit",
    edit_default:"edit_default",
    microformat:"com.ibm.microformat",
    configure:"configure",
    xml:"com.ibm.xml",
    help:"help"
};

dojo.declare("com.ibm.mm.enabler.iw.UserProfile",com.ibm.mm.enabler.iw.ManagedItemSet,{
            constructor:function(widgetId,user){
                this.widgetId = widgetId;
                this.user = user;
            },
            getItemValue:function(/*string*/name){
                 var value = this.user.getAttribute(name);
                 if(typeof value == "undefined") value = null;
                 return value;
            },
            setItemValue:function(name,value,readOnly){
                 //readonly
                 return null;
            },
            isReadOnly:function(name){
                 return true;
            },
            removeItem:function(name){
                 return null;
            },
            getAllNames:function(){
                 return this.user.getAttributeNames();
             },
            save:function(cb){
                 return null;
            },
            getItemSetDescription:function(){
                 return null;
            }
            //todo:clone
}); 
