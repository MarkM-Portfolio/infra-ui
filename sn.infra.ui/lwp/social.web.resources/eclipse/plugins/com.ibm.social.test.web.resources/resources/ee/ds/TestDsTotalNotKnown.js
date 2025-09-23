/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.ee.ds.TestDsTotalNotKnown");

dojo.declare("com.ibm.social.test.ee.ds.TestDsTotalNotKnown", null, {
   constructor: function (data) {
      this.data = data;
   },

   getValue: function(  /* item */ item, 
                  /* attribute-name-string */ attribute, 
                  /* value? */ defaultValue){
      return (attribute in item) ? item[attribute] : defaultValue;
   },

   getValues: function(/* item */ item,
                  /* attribute-name-string */ attribute){
      return [ this.getValue(item, attribute) ];
   },

   getAttributes: function(/* item */ item){      
      var attrs = [];
      if(item) {
         for (var x in item) {
            attrs.push(x);
         }
      }
      return attrs;
   },

   hasAttribute: function( /* item */ item,
                     /* attribute-name-string */ attribute){
      return attribute in item;
   },

   containsValue: function(/* item */ item,
                     /* attribute-name-string */ attribute, 
                     /* anything */ value){
      return dojo.indexOf(this.getValues(item, attribute), value) != -1;
   },

   isItem: function(/* anything */ something){
      if (something) return true;
      else return false;
   },

   isItemLoaded: function(/* anything */ something){
      return this.isItem(something);
   },

   loadItem: function(/* object */ keywordArgs){      
      if(!this.isItemLoaded(keywordArgs.item)){
         throw new Error('Unimplemented API: dojo.data.api.Read.loadItem');
      }
   },

   fetch: function(/* Object */ keywordArgs){
      var request = { };
      dojo.mixin(request, keywordArgs);
      request.abort = function () {
         throw new Error("Cannot abort request");
      };      
      
      var scope = keywordArgs.scope || dojo.global;  
      
      if (request.onBegin) {
         request.onBegin.call(scope, -1, request);
      }          
     
      var results = [];
      var count = request.count || 10;
      var start = request.start || 0;
      var descending = (request.sort && request.sort[0] && request.sort[0].descending);
      
      for (var i = 0; i < count; i++) {
         var ndx = descending ? this.data.length - start - i - 1 : (start + i);
         if (ndx >= 0 && ndx < this.data.length) {
            results.push(this.data[ndx]);
         }
      }
      
     if (request.onItem) {
         dojo.forEach(results, function (item) {
            request.onItem.call(scope, item, request);
         });
         if (request.onComplete)
            request.onComplete.call(scope, null, request);
      }
      else {
         if (request.onComplete)
            request.onComplete.call(scope, results, request);
      }
            
      return request; // an object conforming to the dojo.data.api.Request API
   },

   getFeatures: function(){      
      return {
         'dojo.data.api.Read': true
      };
   },

   close: function(/*dojo.data.api.Request || keywordArgs || null */ request){
      throw new Error('Unimplemented API: dojo.data.api.Read.close');
   },

   getLabel: function(/* item */ item){
      return item.name;
   },

   getLabelAttributes: function(/* item */ item){
      return ["name"];
   }   
   
});