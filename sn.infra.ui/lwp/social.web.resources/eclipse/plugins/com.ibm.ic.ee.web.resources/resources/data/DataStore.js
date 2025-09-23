/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/xhr",
	"ic-incontext/util/dom",
	"ic-incontext/util/uri"
], function (dojo, arrayModule, declare, lang, dom, uri) {

	var DataStore = declare("com.ibm.social.ee.data.DataStore", null, {
	   
	   timeout: 0,
	   defaultStart: 1,
	   defaultCount: 10,
	   features: {'dojo/data/api/Read': true,'dojo/data/api/Write': true}, //Default is to support read and write, extending classes may choose to not support Write
	   /**
	    * parameters may include the following:
	    *  - url(* required): The feed url
	    */
	   constructor: function (params) {
	      lang.mixin(this, params);
	      this.dirtyItems = [];
	   },
	   
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   getValue: function ( item, attribute, defaultValue) {
	      if (item) {
	         var attributeValue = item.getAttribute(attribute);
	         if (typeof attributeValue == 'undefined' || attributeValue === null) {
	            attributeValue = defaultValue;
	         }
	         return attributeValue;
	      } 
	      else { 
	         return null;
	      }
	   },
	
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   getValues: function (item, attribute) {
	      var value = this.getValue(item, attribute);
	      if (value) {
	         return [ value ];
	      } 
	      else {
	         return [];
	      }
	   },
	
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   getAttributes: function (/* item */ item) {
	      var array = item.getAttributes();
	      return array;
	   },
	
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   hasAttribute: function ( item, attribute) {
	      return item.hasAttribute(attribute);
	   },
	
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   containsValue: function (item, attribute, value) {
	      return arrayModule.indexOf(item.getValues(item,attribute), value) != -1;
	   },
	
	   isItem: function (something) {
	      return (something !== null && (typeof something.getAttribute == "function" || (something.ds && something.ds.isNew)));
	   },
	
	   isItemLoaded: function (something) {
	      return something.isFullyLoaded; // Items may be partially loaded
	   },
	
	   //DO NOT OVERRIDE, extending classes should instead override _fetch
	   fetch: function (kw){
	      var request = kw;
	      if (!request.abort)//have to do a mixin in here so that request maintains the proper scope
	         request = lang.mixin(request, {abort: lang.hitch(this, this.abortRequest, request)});
	      if (this.currentTimerConnection)
	         this.currentTimerConnection.remove();
	      this._fetch(request);      
	      return request;
	   },
	   
	   _fetch: function(request) {
	      var sync = request.sync ? true : false;
	      var url = request.url ? request.url : this.url;
	      var opts = {
	         url: url,
	         sync: sync,
	         handleAs: this.getFetchHandleAs(),
	         timeout: this.timeout,
	         handle: lang.hitch(this, this.handleGet, lang.hitch(this, this.dataLoaded, request), lang.hitch(this, this.dataError, request)),
	         preventCache: true
	      };        
	      request.httpReq = this.net.get(opts);        
	   },      
	   
	   getFetchHandleAs: function() {
	      return "xml";
	   },
	   
	   //All functions in extending classes which return a request to the caller must set request.httpReq
	   abortRequest: function (request) {
	      request.httpReq.cancel();
	   },
	
	   getFeatures: function () {
	      return this.features;
	   },
	
	   close: function (request) {
	      // No-op
	   },
	
	   //Extending classes can choose to override this function
	   getLabel: function (/* item */ item) {    
	      //    summary:
	      //        Method to inspect the item and return a user-readable 'label' for the item
	      //        that provides a general/adequate description of what the item is. 
	      //
	      //    description:
	      //        Method to inspect the item and return a user-readable 'label' for the item
	      //        that provides a general/adequate description of what the item is.  In general
	      //        most labels will be a specific attribute value or collection of the attribute
	      //        values that combine to label the item in some manner.  For example for an item
	      //        that represents a person it may return the label as:  "firstname lastlame" where
	      //        the firstname and lastname are attributes on the item.  If the store is unable 
	      //        to determine an adequate human readable label, it should return undefined.  Users that wish
	      //        to customize how a store instance labels items should replace the getLabel() function on 
	      //        their instance of the store, or extend the store and replace the function in 
	      //        the extension class.
	      //
	      //    item:
	      //        The item to return the label for.
	      //
	      //    returns: 
	      //        A user-readable string representing the item or undefined if no user-readable label can 
	      //        be generated.  
	      return undefined;
	   },
	
	   //Extending classes can choose to override this function
	   getLabelAttributes: function (/* item */ item) {
	      //    summary:
	      //        Method to inspect the item and return an array of what attributes of the item were used 
	      //        to generate its label, if any.
	      //
	      //    description:
	      //        Method to inspect the item and return an array of what attributes of the item were used 
	      //        to generate its label, if any.  This function is to assist UI developers in knowing what
	      //        attributes can be ignored out of the attributes an item has when displaying it, in cases
	      //        where the UI is using the label as an overall identifer should they wish to hide 
	      //        redundant information.
	      //
	      //    item:
	      //        The item to return the list of label attributes for.
	      //
	      //    returns: 
	      //        An array of attribute names that were used to generate the label, or null if public attributes 
	      //        were not used to generate the label.
	      return null;
	   },
	   
	   deleteItem: function (/* item */ item) {
	      //    summary:
	      //        Deletes an item from the store.
	      //
	      //    item: 
	      //        The item to delete.
	      //
	      //    exceptions:
	      //        Throws an exception if the argument *item* is not an item 
	      //        (if store.isItem(item) returns false).
	      //    examples:
	      //        var success = store.deleteItem(kermit);
	      if (!this.isItem(item)){
	         throw "Not an item"; //throw will not be reached       
	      }
	      if(!item.ds.isDirty)
	         this.dirtyItems.push(item);
	      item.ds.isDeleted = true;
	      item.ds.isDirty = true;
	      item.ds.isNew = false;
	      return true;
	   },
	   
	   setValue: function (/* item */ item, /* string */ attribute, /* almost anything */ value) {
	      //    summary:
	      //        Sets the value of an attribute on an item.
	      //        Replaces any previous value or values.
	      //
	      //    item:
	      //        The item to modify.
	      //    attribute:
	      //        The attribute of the item to change represented as a string name.
	      //    value:
	      //        The value to assign to the item.
	      //
	      //    exceptions:
	      //        Throws an exception if *item* is not an item, or if *attribute*
	      //        is neither an attribute object or a string.
	      //        Throws an exception if *value* is undefined.
	      //    examples:
	      //        var success = store.set(kermit, "color", "green");
	      if (!this.isItem(item))
	         throw "Not an item";
	      if (typeof attribute != "string")
	         throw "Attribute not a string";
	      if (typeof value == "undefined")
	         throw "Value undefined";
	      if(!item.ds.isDirty)
	         this.dirtyItems.push(item);
	      item.ds.isDirty = true;
	      this._setValue(attribute, value, item.ds.attributes);
	      return true;
	   },
	   
	   _setValue: function (attribute, value, map) {
	      map[attribute] = value;
	   },
	   
	   setValues: function (/* item */ item, /* string */ attribute, /* array */ values) {
	      //    summary:
	      //        Adds each value in the *values* array as a value of the given
	      //        attribute on the given item.
	      //        Replaces any previous value or values.
	      //        Calling store.setValues(x, y, []) (with *values* as an empty array) has
	      //        the same effect as calling store.unsetAttribute(x, y).
	      //
	      //    item:
	      //        The item to modify.
	      //    attribute:
	      //        The attribute of the item to change represented as a string name.
	      //    values:
	      //        An array of values to assign to the attribute..
	      //
	      //    exceptions:
	      //        Throws an exception if *values* is not an array, if *item* is not an
	      //        item, or if *attribute* is neither an attribute object or a string.
	      //    examples:
	      //        var success = store.setValues(kermit, "color", ["green", "aqua"]);
	      //        success = store.setValues(kermit, "color", []);
	      //        if (success) {assert(!store.hasAttribute(kermit, "color"));}
	      if (!this.isItem(item))
	         throw "Not an item";
	      if (typeof attribute != "string")
	         throw "Attribute not a string";
	      if (!values || !values.length)
	         throw "Values not an array";
	      if (values.length === 0)
	         item.ds.attributes[attribute] = null;
	      else {
	         item.ds.attributes[attribute] = values;
	      }
	      if(!item.ds.isDirty)
	         this.dirtyItems.push(item);
	      item.ds.isDirty = true;
	   },
	   
	   unsetAttribute: function (/* item */ item, /* string */ attribute) {
	      //    summary:
	      //        Deletes all the values of an attribute on an item.
	      //
	      //    item:
	      //        The item to modify.
	      //    attribute:
	      //        The attribute of the item to unset represented as a string.
	      //
	      //    exceptions:
	      //        Throws an exception if *item* is not an item, or if *attribute*
	      //        is neither an attribute object or a string.
	      //    examples:
	      //        var success = store.unsetAttribute(kermit, "color");
	      //        if (success) {assert(!store.hasAttribute(kermit, "color"));}
	      if(!this.isItem(item))
	         throw "Not an item";
	      if(typeof attribute != "string")
	         throw "Attribute not a string";
	      item.ds.attributes[attribute] = null;
	      if(!item.ds.isDirty)
	         this.dirtyItems.push(item);
	      item.ds.isDirty = true;
	   },
	   
	   save: function (/* object */ keywordArgs) {
	      //    summary:
	      //        Saves to the server all the changes that have been made locally.
	      //        The save operation may take some time and is generally performed
	      //        in an asynchronous fashion.  The outcome of the save action is 
	      //        is passed into the set of supported callbacks for the save.
	      //   
	      //    keywordArgs:
	      //        {
	      //            onComplete: function
	      //            onError: function
	      //            scope: object
	      //        }
	      //
	      //    The *onComplete* parameter.
	      //        function();
	      //
	      //        If an onComplete callback function is provided, the callback function
	      //        will be called just once, after the save has completed.  No parameters
	      //        are generally passed to the onComplete.
	      //
	      //    The *onError* parameter.
	      //        function(errorData); 
	      //
	      //        If an onError callback function is provided, the callback function
	      //        will be called if there is any sort of error while attempting to
	      //        execute the save.  The onError function will be based one parameter, the
	      //        error.
	      //
	      //    The *scope* parameter.
	      //        If a scope object is provided, all of the callback function (
	      //        onComplete, onError, etc) will be invoked in the context of the scope
	      //        object.  In the body of the callback function, the value of the "this"
	      //        keyword will be the scope object.   If no scope object is provided,
	      //        the callback functions will be called in the context of kernel.global.  
	      //        For example, onComplete.call(scope) vs. 
	      //        onComplete.call(kernel.global)
	      //
	      //    returns:
	      //        Nothing.  Since the saves are generally asynchronous, there is 
	      //        no need to return anything.  All results are passed via callbacks.
	      //    examples:
	      //        store.save({onComplete: onSave});
	      //        store.save({scope: fooObj, onComplete: onSave, onError: saveFailed});
	      if(this.dirtyItems.length === 0) {
	         //nothing was dirty just call oncomplete
	         var scope = keywordArgs.scope ? keywordArgs.scope : window;
	         if(keywordArgs.onComplete)
	            keywordArgs.onComplete.call(scope);
	         return;
	      }
	      // otherwise we have dirty items so perform the requests
	      keywordArgs.requests = this.dirtyItems.length;
	      while(this.dirtyItems.length > 0) {
	         var item = this.dirtyItems.pop();
	         
	         if (item.ds.isDeleted)
	           this._deleteItem(item, keywordArgs);
	         else if (item.ds.isNew)
	           this._newItem(item, keywordArgs);
	         else
	           this._saveItem(item, keywordArgs);
	      }
	   },
	   
	   //Extending class must override and make necessary calls to keywordArgs.onError and keywordArgs.onComplete
	   _newItem: function (item, keywordArgs) {},
	   
	   //Extending class must override and make necessary calls to keywordArgs.onError and keywordArgs.onComplete
	   _deleteItem: function (item, keywordArgs) {},
	
	   //Extending class must override and make necessary calls to keywordArgs.onError and keywordArgs.onComplete
	   _saveItem: function (item, keywordArgs) {},
	   
	   //Extending class must override and make necessary calls to keywordArgs.onError and keywordArgs.onComplete
	   loadItem: function (item, keywordArgs) {},
	   
	   itemFromDocEl: function(el, base) {
	      return null;
	   },
	           
	   dataError: function (request, err, ioArgs) {        
	      if (err && err.dojoType == "timeout") {
	         err.code = "timeout";
	         err.type = "timeout";
	      }
	      else if (ioArgs && ioArgs.xhr && ioArgs.xhr.status == 404) {
	         err.code = "ItemNotFound";
	         err.type = "ItemNotFound";
	      }
	      else if (ioArgs && ioArgs.xhr && ioArgs.xhr.status == 401) {
	         err.code = "AccessDenied";
	         err.type = "AccessDenied";
	      }
	      if (request.onError) {
	         var target = (request.scope) ? request.scope : window;         
	         request.onError.call(target, err);
	      }
	   },
	   
	   handleGet: function(load, error, response, ioArgs) { 
	      if ((typeof response == "Error") || (response.name == "Error"))
	      {
	         // Take basic authentication timeout into consideration
	         // If response is still 200, then handle as successful response
	         if (response && response.dojoType == "timeout") {
	            if (ioArgs && ioArgs.xhr && ioArgs.xhr.status == 200) {
	               response = xhr._contentHandlers[ioArgs.handleAs](ioArgs.xhr);
	               load(response, ioArgs);
	            } 
	            else {
	               error(response, ioArgs);
	            }
	         }
	         else {
	            error(response, ioArgs);
	         }
	      }
	      else
	      {
	         load(response, ioArgs);
	      }
	   },   
	     
	   revert: function () {
	      //    summary:
	      //        Discards any unsaved changes.
	      //    description:
	      //        Discards any unsaved changes.
	      //
	      //    examples:
	      //        var success = store.revert();
	      while (this.dirtyItems.length > 0) {
	         this.dirtyItems[this.dirtyItems.length - 1].ds.isDirty = false;
	         this.dirtyItems[this.dirtyItems.length - 1].ds.isDeleted = false;
	         this.dirtyItems[this.dirtyItems.length - 1].ds.isNew = false;
	         this.dirtyItems[this.dirtyItems.length - 1].ds.attributes = {};
	         this.dirtyItems.pop();
	      }
	      return true;
	   },
	   
	   newItem: function (keywordArgs, parentInfo) {
	      if (typeof keywordArgs != "object")
	         throw "keywordArgs is not an object";
	      var newItem = this._createNewItem(keywordArgs, parentInfo);
	      if (newItem) {
	         newItem.ds = {attributes:keywordArgs};
	         newItem.ds.isNew = true;
	         newItem.ds.isDirty = true;
	         this.dirtyItems.push(newItem);
	         var category = keywordArgs.category;
	         if (category)
	            this.setValue(newItem, "category", category);
	      }      
	      return newItem;
	   },
	   
	   _createNewItem: function (keywordArgs, parentInfo) {
	      return {};
	   },
	
	   isDirty: function (/* item? */ item) {
	      //    summary:
	      //        Given an item, isDirty() returns true if the item has been modified 
	      //        since the last save().  If isDirty() is called with no *item* argument,  
	      //        then this method returns true if any item has been modified since
	      //        the last save().
	      //
	      //    item:
	      //        The item to check.
	      //
	      //    exceptions:
	      //        Throws an exception if isDirty() is passed an argument and the
	      //        argument is not an item.
	      //    examples:
	      //        var trueOrFalse = store.isDirty(kermit); // true if kermit is dirty
	      //        var trueOrFalse = store.isDirty();       // true if any item is dirty 
	      if (item) {
	         if (!this.isItem(item)) {
	            throw "Not an item";
	         }
	         return item.ds && item.ds.isDirty;
	      }
	      else
	         return this.dirtyItems.length > 0;
	   }
	});
	return DataStore;
});
