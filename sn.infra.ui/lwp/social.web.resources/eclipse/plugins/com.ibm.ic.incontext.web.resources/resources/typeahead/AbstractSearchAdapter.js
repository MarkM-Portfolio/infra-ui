/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/on"
], function (declare, lang, aspect, on) {

	//Overwrite _getStore, canCreate, _createTypeAhead, _getDefaultTypeAheadOpt to get a customized search adapter
	
	var AbstractSearchAdapter = declare('com.ibm.social.incontext.typeahead.AbstractSearchAdapter', null, {
	   store: {},
	   
	   canCreate: function() {
	      return false;
	   },
	   
	   _getStore: function(type){
	      return null;
	   },
	   
	   _createTypeAhead: function(input, opt){
	      return null;
	   },
	   
	   _getDefaultTypeAheadOpt: function(){
	      return {};
	   },
	   
	   getStore: function(type){
	      var type = type || "default";
	      if(this.store[type]) 
	         return this.store[type];
	      var store = this.store[type] = this._getStore(type);
	      return store;
	   },
	   
	   createTypeAhead: function(input, typeAheadOpt, opt) {
	      var tOpt = lang.mixin({}, this._getDefaultTypeAheadOpt(), typeAheadOpt);
	      opt = opt || {};
	      var type = opt.allowExternal? "external": opt.type;
	      if(opt.activeOnly)
	         type = type + "_activeOnly";
	      tOpt.store = this.getStore(type);
	      return this._createTypeAhead(input, tOpt, opt);
	   },
	   
	   getSelected: function(typeAhead, args) {
	      // Try getting the item directly from the typeahead first
	      var item = typeAhead.item;
	
	      // If the typeahead doesn't have the item, get it from the selection event
	      if (!item && args && args[0]) {
	         var arg0 = args[0];
	
	         // could be the domNode that was selected, get the item from it
	         if (arg0.item)
	            item = arg0.item;
	            
	         // could be the item itself
	         if(!item && arg0.id && arg0.title)
	            item = arg0;
	      }
	
	      if (item && !item.emptyMsg)
	         return item;
	      return null;
	   },
	   connectOnSelect: function(typeAhead, obj, method){
	      if(typeAhead.onSelect)  // onSelect works in Connections 3.0 / Dojo 1.4.1
	         on(typeAhead, "Select", lang.hitch(obj, method));
	      else if(typeAhead._doSelect)  // _doSelect works in Connections 2.5 / Dojo 1.2.3
	         aspect.after(typeAhead, "_doSelect", lang.hitch(obj, method), true);
	   },
	   
	   changeTypeAheadOpts: function(typeahead, opt) {
	      // this is really only used in live but needs to be available on both adapters
	   },
	   
	   isExternalItem: function(app, item){
	      return false;
	   },
	   
	   doSelectUser: function(typeahead) {
	   	// really only used by live
	   },
	   
	   // child classes should return true if they want an external "add" button that will allow them to click and enter mid-search
	   showAddButton: function() {
	      return false;
	   }
	});
	
	return AbstractSearchAdapter;
});
