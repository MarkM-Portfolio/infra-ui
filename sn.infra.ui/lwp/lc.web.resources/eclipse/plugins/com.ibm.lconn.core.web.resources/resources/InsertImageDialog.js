/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
dojo.provide("lconn.core.InsertImageDialog");

dojo.require("lconn.core.TempTabbedDialog");
dojo.require("lconn.core.upload.provider.FlashFileProvider");
dojo.require("lconn.core.upload.FileField");
dojo.require("com.ibm.oneui.mediaGallery.Viewer");
dojo.require("lconn.test.ImageDataStore");
dojo.require("lconn.core.config");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.InsertImageDialogFile");

dojo.requireLocalization("lconn.core", "insertimagedialog");

var messages = dojo.i18n.getLocalization("lconn.core", "insertimagedialog");

/**
 * Common insert image dialog. Used by the rich text editor to browse images from a variety of sources.
 * 
 * @class lconn.core.InsertImageDialog
 * @extends dijit._Widget
 * @extends dijit._Templated
 */
dojo.declare("lconn.core.InsertImageDialog", [ dijit._Widget, dijit._Templated], /** @lends lconn.core.InsertImageDialog.prototype */ {
   widgetsInTemplate: true,
   parseOnLoad: true,

   messages: messages,
   templatePath: dojo.moduleUrl("lconn.core", "templates/InsertImageDialog.html"),
   _pickerInited : false,
   _lastPicked : null,

   _dialog : null,
   
   _manager: null,
   
   _images: [],
   
   _fromFilesList:[],

   
   /** file Upload parameters, should override on per component basis*/
   invalidCharacters: /[\\\/\:\*\?\<\>\|\"]/g,
   maxFileLength: 25,
   maxFileSize: 1048576000,
   extensions: ["bmp","jpg","png","gif"],
   
   allowRename: true,
   allowReplace: true,
   allowFlash: true,

   remoteFileExists: function(fileName) {
      var deferred = new dojo.Deferred();
      setTimeout(function() {
         deferred.callback({called: true});
      }, 500);
      
      deferred.addBoth(function() { return (/remote/i.test(fileName)); });
      
      return deferred;

   },
   /** file upload parameters end*/
   
   /** from files mixin options */
   allowedMimeTypes: null,
   /** from files mixin options end*/

   /** image library mixin, should be dojo datastore compatible */
   dataStore: null, 
   
   
   show: function(){
      this._dialog.show();
   },
   
   hide: function(){
      this._dialog.hide();
   },
   

   onTabChange : function(tab){
      this.currentTab = tab;
      
      if(this.libraryTab == tab){
         if(!this._pickerInited)
            this.initPicker();
      }
   },
   
   initPicker: function(){
      this.picker.reset();
      this._pickerInited = true;
   },
   
   _pickerSelect: function(item){
      this._lastPicked = item;
   },

   _createImageLibrary: function(){
      var store = {
         data : this.dataStore || new lconn.test.ImageDataStore({
            url : "testGallery.json"
         }),
         request : null,
         attributes : null
      };

      store.data.fetch = store.data.fetch || dojo.data.util.simpleFetch.fetch;

      this.picker = new com.ibm.oneui.mediaGallery.Viewer({
         store : store,
         selectable : true
      }, this.galleryContainer);

      dojo.connect(this.picker, "onItemChange", dojo.hitch(this, this._pickerSelect));
   },
   
   _createUpload: function(){
      this.filefield = new lconn.core.upload.FileField({
         id: "file",
         width: "100",
         inputName: "imageFileField",
         invalidCharacters: this.invalidCharacters,
         fileProvider: new lconn.core.upload.provider.FlashFileProvider(),
         maxFileLength: this.maxFileLength,
         maxFileSize: this.maxFileSize,
         extensions: this.extensions,

         allowRename: this.allowRename,
         allowReplace: this.allowReplace,
         allowFlash: this.allowFlash,

         remoteFileExists: this.remoteFileExists
      }, this.fileFieldContainer);

   },
   
   loadImageUrl: function(){
      var url = this.urlInput.value;
      this.previewImage.src = url;
      
      var handle = dojo.connect(this.previewImage, "onerror", this, function(){
         dojo.disconnect(handle);
         if(!this.previewImage.width){
             //TODO: should be an error 
            console.log("Image failed to load!");
         }
      })
   },
   
   onOk: function(){
      if(this.currentTab == this.urlTab){
         this.onImagesAvailable([{src:this.urlInput.value, alt: this.urlAlt.value}]);
         this.hide();
      }
      else if(this.currentTab == this.libraryTab){
         this.onImagesAvailable([{src:this.dataStore.getValue(this._lastPicked, "large"), alt: this.dataStore.getValue(this._lastPicked ,"desc")}]);
         this.hide();
      }
      else if(this.currentTab == this.uploadTab)
         this._doUpload();
      else if(this.currentTab == this.filesTab)
       this._fromFiles();
      
      return true;
   },
   /** should be overriden - returns the images when dialog work is complete, images parameter is of the type {url: String, alt: String}  */
   onImagesAvailable: function(images){
      
   },
   
   postCreate: function(){
      //TODO: Will probably need to be removed for new tabbed dialog class
      dojo.removeClass(this._dialog.domNode, "dijitContentPane");
      this._dialog.onSave = dojo.hitch(this, this.onOk);
      this._dialog.onTabChange = dojo.hitch(this, this.onTabChange);
      
      this._createUpload();
      this._createImageLibrary();

      this.currentTab = this.uploadTab;
   },
   
   _openPicker: function(){
      lconn.core.filepicker.open({
         title: messages.imagePickerTitle,
         externalOnly: false,
         publicOnly: false,
         shareableOnly: false,
         showVisibility: true,
         showExternal: true,
         useCompact: false,
         allowedMimeTypes: this.allowedMimeTypes,
         filesService: dojo.getObject("lconn.core.config.services.files"),
         onSave: dojo.hitch(this, this._filesPicked)
      });
   },
   
   _filesPicked: function(pickedFiles){
     var remove = function(f){
        var index = dojo.indexOf(this._fromFilesList, f);
        this._fromFilesList.splice(index,1);
     };
     
     dojo.forEach(pickedFiles, dojo.hitch(this, function(f){
        var fwid = new lconn.core.InsertImageDialogFile({file:f, remove:dojo.hitch(this,remove)});
        this._fromFilesList.push(fwid);
        this.fileList.appendChild(fwid.domNode);
     }));
   },
   
   _fromFiles: function(){
     var self = this;
     var imgs = dojo.map(this._fromFilesList, function(fwid){
        return {src:fwid.file.getUrlDownload(), alt:self.filesAlt.value || fwid.file.getName()};
     });
     this.onImagesAvailable(imgs);
     this.hide();
   },
   
   _doUpload: function(){
      var field = this.filefield;
      var files = field.getFileList().getUploadableFiles();
      if(!files.length)
         return;
      this.manager = field.createUploadManager(files);
      
      //TODO: Once full tabbed dialog is available need to update with progress bar
      dojo.connect(this.manager, 'onProgress', function(obj) {
      });
      
      dojo.connect(this.manager, 'onItemComplete', this, this._uploadComplete)
      this._uploadNext();
   },
   
   _uploadComplete: function(mgr, file, response, ioArgs){         
      this._images.push(this.onResponseReceived(response));
      if(this.manager.hasMore())
         this._uploadNext();
      else{
         this.onImagesAvailable(this._images);
         this.hide();
      }
   },
   
   _uploadNext: function () {
      if (this.manager.hasMore()) {
         this.manager.uploadNext(this.onFileUpload(this.manager.getNext(), dojo.byId("imageDescription").value, dojo.byId("uploadAlt").value));
      }
   },

   
   /**
    * Should be overriden on a per-component basis - should return args object compatible with dojo.io.iframe.send
    */
   onFileUpload: function(fileObject, description, alt){
      return {
         handleAs: 'html',
         url: netJazzAjaxConfig.base+"/web/test/upload",
         contentTypeHack: true,
         content: {
            description : description,
            alt : alt
         }
      };
   },
   
   /**
    * Should be overriden on a per-component basis - should take the response from dojo.io.iframe.send and return an object of the form
    * {src: "http://www.example.com/image.jpg", alt:"alternate text to be used as the image alt and title attributes"}
    */
   onResponseReceived: function(response){
      var ta = response.getElementsByTagName('textarea')[0];
      var responseObject = dojo.fromJson(ta.value);
      return {
         src: "bheinz.jpg",
         alt: responseObject.params.alt[0]
      };
   }
});

})();
