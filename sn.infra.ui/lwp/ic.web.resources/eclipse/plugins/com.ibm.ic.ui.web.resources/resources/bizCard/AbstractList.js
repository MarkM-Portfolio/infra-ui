/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
define([
   "dojo/_base/declare",
   "dojo/dom-construct",
   "dojo/html",
   "dojo/request/xhr",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/dom-attr",
   "dojo/on",
   "dijit/a11yclick",
   "dijit/_WidgetBase"
], function(declare, domConstruct, html, xhr, lang, array, domAttr, on, a11yclick, _WidgetBase) {

   /**
    * abstractList widget for TextList and IconList widgets.
    * @author Orlando De Mauro <orlando.demauro@ie.ibm.com> 
    * @class ic-ui.bizCard.AbstractList
    */
   return declare([_WidgetBase], /** @lends ic-ui.bizCard.AbstractList.prototype */ {
      
      /** the anchor tag created */
      anchor:null,
      
      /** the anchor tag created */
      ul:null,
      
      /** the list with the data */
      list: null,

      /** Set-up */
      postCreate: function() {
         this.inherited(arguments);
         if(this.list){
            this.update(this.list);
         }
      },
      
      /** Update the List with new data */
      update:function(data) {
         domConstruct.empty(this.domNode);
         this.list=data;
            if(this.list){
               this.ul = domConstruct.create("ul", null, this.domNode);
               array.forEach(this.list, function(item, i){
                  this.checkType(i,this.list[i].type);
               },this);
            }
      },

      /** Create the anchor */
      createLink:function(inner, link, domNode) {
         return domConstruct.create("a", { href: link, innerHTML: inner }, domNode);       
      },
      
      /** Check if link or toggle and create the anchor */
      checkType:function(i,type) {
         var li=null;
         if(type==="link"){
            li = domConstruct.create("li", null, this.ul);
            this.createList(this.list[i],i,li);
         }
         else if (type==="toggle"){
            li = domConstruct.create("li", null, this.ul);
            this.createToggle(this.list[i],i,li);
         }
      },
      
      /** Set the anchor if link type */
      createList:function(item,i,domNode) {
         this.anchor = this.createLink(item.text,item.linkUrl,domNode);
         if (item.target){
            domAttr.set(this.anchor, 'target', item.target);
         }
      },
      
      /** Manage the ajax call for toggles */
      ajaxCall:function(i,evt){
         var link=null;
         if(this.list[i].status){
            link = this.list[i].urlStatusTrue;
         }
         else{
            link = this.list[i].urlStatusFalse;
         }
         
         xhr(link, {
            handleAs: "json"
               }).then(lang.hitch(this,lang.partial(this.switchToggle,this.list[i], i,evt.target)));
      },
      
      /** Set the anchor if toggle type */
      createToggle:function(item,i,domNode) {
         if(item.status){
            this.anchor = this.createLink(item.textStatusTrue, "javascript:;",domNode);
         }
         else{
            this.anchor = this.createLink(item.textStatusFalse, "javascript:;",domNode);
         }
         this.own(on(this.anchor, a11yclick, lang.hitch(this,lang.partial(this.ajaxCall, i))));
      },
     
      /** manage the switch of the toggle */
      switchToggle:function(item, i,target,res){
         if(res.response) {
            if(item.status){
               html.set(target,item.textStatusFalse);
            }
            else{
               html.set(target,item.textStatusTrue);
            }
            this.list[i].status=!this.list[i].status;
         }
      }
   });
});
