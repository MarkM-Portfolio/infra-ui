/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
        "dojo",
        "dojo/_base/declare",
        "dojo/has",
        "dojo/_base/sniff",
        "lconn/core/DialogUtil",
        "lconn.box/util/loadScript"
], function(dj, djDeclare, djDialogUtil, djHas, djSniff, loadScript) {

  var filepicker =  djDeclare("lconn.box.ckeditor.filepicker",null, {
    boxSelectInstance:null,
    constructor: function(args) {
       if(args && args.clientId){
          this._config = {
             clientId: args.clientId,
             linkType: "shared",
             multiselect: "true"
          };
          
          if (djHas("ie") || djHas("trident")) {
             this._config.domain = "https://box.com";
          }

          this.init(args);
       }else{
          throw new Error('clientId is null');
       }
       
    },

    init:function(args){
        
        var that = this;
       
        loadScript('https://app.box.com/js/static/select.js', function(){
          that.boxSelectInstance = new BoxSelect(that._config);
            that.boxSelectInstance.success(function(response) {
              if(typeof args.success === 'function'){
                args.success(response);  
              }     
            });
            that.boxSelectInstance.cancel(function() {
              that.boxSelectInstance.closePopup();
              if(typeof args.cancel== 'function'){
                args.cancel();  
              }
            });
        })
        
    },
    
   open:function() {
       if(this.boxSelectInstance){
       this.boxSelectInstance.launchPopup();
      }else{
         throw new Error("no boxSelectInstance")
      }
    }
 
  });
  return filepicker;
});

