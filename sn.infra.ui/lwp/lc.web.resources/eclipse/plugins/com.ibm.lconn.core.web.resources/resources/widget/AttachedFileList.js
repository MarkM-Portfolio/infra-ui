/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.AttachedFileList");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit._Container");
dojo.require("dijit.ProgressBar");
dojo.require("dojo.string");
dojo.require("dojo.i18n");
dojo.require("lconn.core.widget.AttachedFile");
dojo.require("lconn.core.ckplugins.icpublishBinaryData");

dojo.requireLocalization("lconn.core", "strings");

(function() {
   var nls = dojo.i18n.getLocalization("lconn.core", "strings");
   var index = 0;

   /**
    * Widget representing a file with filename and extension as a ICS UI Filter
    * component.
    * 
    * @class lconn.core.widget.AttachedFileList
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @extends dijit._Container
    * @author Cecilia Bollini <ceciliab@ie.ibm.com>
    */
   dojo.declare("lconn.core.widget.AttachedFileList", [ dijit._Widget,
         dijit._Templated, dijit._Container ], /** @lends lconn.core.widget.AttachedFileList.prototype */
   {

      /**
       * Strings used by this widget
       * 
       * @type {Object}
       */
      _strings : {
         remove_alt : nls.rs_attachedfile_remove_alt
      },

      /**
       * Template path
       * 
       * @type {String}
       */
      templatePath : dojo.moduleUrl("lconn.core",
            "widget/templates/AttachedFileList.html"),

      /**
       * File provider, handles the source of the file TODO:
       */
      fileProvider : null,

      /**
       * Storage manager, handles the upload of files TODO:
       */
      storageManager : null,
      
      /**
       * Storage progressBar for each file currently uploaded, it's kind of hashmap:
       */
      progressBar : {},

      postCreate : function() {
         this.inherited(arguments);
         this.subscribe(lconn.core.ckplugins.icpublishBinaryData.TOPIC, dojo
               .hitch(this, this.handleDataUri));
         
         this.subscribe(lconn.core.ckplugins.icpublishBinaryData.LOADING.DATA_AVAILABLE, dojo
               .hitch(this, this.updateProgressBar));
         
         this.subscribe(lconn.core.ckplugins.icpublishBinaryData.LOADING.UPLOAD_COMPLETE, dojo
               .hitch(this, this.hideProgressBar));

      },

      /**
       * Handles the pub sub notification emitted by the provider of the file
       * 
       * FIXME: should check if the fileProvider is the one we expect, or won't
       * work with multiple editors on a page
       * 
       * @param {Object}
       *           obj The topic of the notification
       */
      handleDataUri : function(obj) {
         if (obj && obj.filesArr) {
            dojo.forEach(obj.filesArr, dojo.hitch(this, function(img) {
               var filename = img.name
                     || dojo.string.substitute(nls.rs_attachedfile_filename,
                           [ ++index ]);

               if (img.type === "html" || !img.type) {
                  var m = img.data[0]
                        .match(/^src="data:image\/(.*);base64,(.*)"$/);
                  img.type = m[1];
               }

               var filesize = img.size || (img.data[0].length) / 1.370; 

               this.addChild(new lconn.core.widget.AttachedFile({
                  strings : {
                     title : filename,
                     remove_alt : this._strings.remove_alt
                  },
                  filename : filename,
                  size : filesize,
                  extension : img.type,
                  id : 'element' + img.id,
                  onClose : function() {
                     obj.deleteImagecb(img.id);
                  }
               }));
            }));
         }
      },
      /**
       * update the progressbar, overwrite to change the progressbar style
       * @param {Object} 
       *          status: evt.loaded / evt.total,
       *          id: fileId, multiple upload at time should be possible
       */
      updateProgressBar: function(progressObj) {
         console.log(dojo.getObject(progressObj.id, false, this.progressBar));
         if(! dojo.getObject(progressObj.id, false, this.progressBar) ) {
            var p = new dijit.ProgressBar({style: "width: 140px", id: progressObj.id}).placeAt(this.domNode);
            dojo.setObject(progressObj.id, p, this.progressBar); 
         }
         var thisProgressBar = dojo.getObject(progressObj.id, false, this.progressBar);
         thisProgressBar.set({value: progressObj.status});            
      },
      hideProgressBar: function(obj) {
         var thisProgressBar = dojo.getObject(obj.id, false, this.progressBar);
         if(thisProgressBar)
         thisProgressBar.destroy(); 
      }
      
      
      
   });

})();
