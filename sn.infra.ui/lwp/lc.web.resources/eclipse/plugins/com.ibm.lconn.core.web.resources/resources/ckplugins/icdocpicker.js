/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

(function() {

/**
 * Common CKEditor plugins
 * @namespace lconn.core.ckplugins
 */
 
/**
 * CKEditor plugin that inserts links to Files using the File Picker dialog
 * @namespace lconn.core.ckplugins.icdocpicker
 */
var docpicker = dojo.provide("lconn.core.ckplugins.icdocpicker");

dojo.require("lconn.core.filepicker");
dojo.require("lconn.core.config.services");
dojo.requireLocalization("lconn.core", "strings");
dojo.require("lconn.core.filesutil");
dojo.require("lconn.core.DialogUtil");
dojo.require("lconn.core.util.html");
dojo.require("lconn.core.util.services");

var nls = dojo.i18n.getLocalization("lconn.core", "strings");
var currentSource = null;
var fileSharedSuccessfully = true;
var communityId = null;
var communityName = null;
var isInACommunity = false;
var isPublicCommunity = false;

/**
 * The name of this plugin
 */
var name = 'icdocpicker';

/** 
 * Returns the name of this plugin
 * @function getName
 * @memberof lconn.core.ckplugins.icdocpicker
 */
docpicker.getName = function() { return name; };

/**
 * Returns true if this plugin is enabled
 * @function isEnabled
 * @memberof lconn.core.ckplugins.icdocpicker
 * @returns true if the plugin is enabled
 */
docpicker.isEnabled = function() { return lconn.core.config.services.files || lconn.core.config.services.ecm_files; };

/** 
 * Dynamically adds a CKEditor plugin that triggers the File Picker dialog.
 * @function addPlugin
 * @memberof lconn.core.ckplugins.icdocpicker
 */
docpicker.addPlugin = function() {
   if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered && CKEDITOR.plugins.registered[name])
      return;
   
   docpicker._addPlugin();

   if (!lconn.share.util.configUtil.isFilesRemoved(lconn.core.auth.getUser()))
      return;
   
   CKEDITOR.on("instanceLoaded", function(evt) {
      console.log("[icdocpicker] instanceLoaded is received");

      // Disable 'linkToFiles' by default
      var commands = [];
      if (dojo.exists("editor.config.menus.link.commands", evt)) {
         commands = evt.editor.config.menus.link.commands;
      }

      var index = commands.indexOf("linkToFiles");
      if (index != -1)
          commands.splice(index, 1);
      
      lconn.core.util.services.isEnabled("files").then(function(result){
         if (result) {
            commands.push("linkToFiles");
         }
         var community = dojo.getObject("lconn.communities.bizCard.core.community");
         if(community) {
            docpicker._configPlugin(commands);
         }
         else {
            dojo.subscribe("lconn/communities/bizcard/community/set", function(){
               docpicker._configPlugin(commands);
            });
         }
      });
   });
}

docpicker._configPlugin = function(commands) {
   var community = dojo.getObject("lconn.communities.bizCard.core.community");
   var filesConfig = lconn.core.config.services.files;
   var baseFull = window.location.protocol.replace(":", "") == "https" ? filesConfig.secureUrl : filesConfig.url;
   var proxiedBaseFull = com.ibm.oneui.util.proxy(baseFull);
   var basePath = (baseFull == proxiedBaseFull) ? baseFull : proxiedBaseFull;
   var url = basePath + "/basic/api/communitycollection/" + community.uuid + "/entry";
   
   dojo.xhrGet({
      url: url,
      handleAs: "xml",
      load: function(response, ioArgs) {
         if(ioArgs.xhr.status == "200") {
            if(commands.indexOf("linkToFiles") < 0)
               commands.push("linkToFiles");
         }
      },
      error: function(response, ioArgs){
         if(ioArgs.xhr.status == "404") {
            var el = ioArgs.xhr.responseXML.documentElement || "";
            var errorCode = com.ibm.social.incontext.util.dom.getChildElementTextContentNS(el, "errorCode", com.ibm.social.incontext.util.dom.DOCUMENTS_ATOM_NAMESPACE);
            if(errorCode == "ServiceDisabled") {
               var index = commands.indexOf("linkToFiles");
               if(index > -1)
                  commands.splice(index, 1);
               return;
            }
            else 
               throw response;
         }
      }
   });
}

docpicker._addPlugin = function() {
   CKEDITOR.plugins.add(name, {
      init: function(editor) {
         editor.ui.addButton('LinkToFiles', {
            label: nls.rs_docpicker_label,
            command: 'linkToFiles'
         });
         editor.on('mode', function(ev){
            var linkToFiles = ev.editor.getCommand('linkToFiles');
            if( dojo.getObject("lconn.communities.bizCard.core.community") )
              linkToFiles.enable();
            else
              linkToFiles.disable(); 
         });
         editor.addCommand('linkToFiles', {
            exec: function(editor) {

               var community = dojo
                     .getObject("lconn.communities.bizCard.core.community");
               var isCommunityOwnedApp = false;
               isPublicCommunity = true;

               /*
                * linkToCommunityFilesEnabled is a flag that passed down from
                * the Community component to indicate we should not trigger
                * the ECM doc picker when the user creates a new
                * sub-community or a community. We don't have the community
                * ID or name before the community is created.
                */
               if (community != null && community.linkToCommunityFilesEnabled) {
                  communityId = community.uuid;
                  communityName = community.name;
                  isCommunityOwnedApp = true;
                  var communityType = community.communityType;

                  if (communityType === "private") {
                     isPublicCommunity = false;
                  }

                  isInACommunity = true;

                  var args = {
                        useCompact: true,
                        title: nls.rs_docpicker_title,
                        showVisibility: true,
                        filesService: lconn.core.config.services.files,
                        onSave: dojo
                              .hitch(docpicker, docpicker.onSave, editor),
                        onClose: dojo.hitch(docpicker, docpicker.onClose,
                              editor),
                        onSourceChange: function(source) {
                           currentSource = source.id;
                        },
                        repository: {
                           type: "community",
                           communityId: communityId,
                           communityName: communityName,
                           isPublic: isPublicCommunity
                        },
                        shareableOnly: true,
                        publicOnly: isPublicCommunity,
                        externalOnly: !!community.externalAllowed,
                        showExternal: !!community.isMultiTenantMode,
                        communityFilesType: "all"
                     };
                  
                  if (!lconn.share.util.configUtil.isFilesRemoved(lconn.core.auth.getUser())) {
                     lconn.core.filepicker.open(args);
                     return;
                  }
                  
                  lconn.core.util.services.isEnabled("files").then(function(result){
                     if (!result)
                        args.sourceSet = ["community"];
                     lconn.core.filepicker.open(args);
                   });
               }
               else {
                  isInACommunity = false;

                  lconn.core.filepicker.open({
                     useCompact: true,
                     title: nls.rs_docpicker_title,
                     showVisibility: true,
                     filesService: lconn.core.config.services.files,
                     onSave: dojo
                           .hitch(docpicker, docpicker.onSave, editor),
                     onClose: dojo.hitch(docpicker, docpicker.onClose,
                           editor),
                     onSourceChange: function(source) {
                        currentSource = source.id;
                     },
                     shareableOnly: true
                  });
               }
            }
         });
      }
   });
};

/**
 * Callback for the File Picker dialog's <code>onClose</code> method.
 * @function onClose
 * @memberof lconn.core.ckplugins.icdocpicker
 */
docpicker.onClose = function(editor) {
   if (editor)
      editor.focus();
}
/**
 * Callback for the File Picker dialog's <code>onSave</code> method.
 * @function onSave
 * @memberof lconn.core.ckplugins.icdocpicker
 */
docpicker.onSave = function(editor, files) {
   /*
    * If the user selects files not shared with this community, files must
    * be shared first.
    */
   if (isInACommunity && currentSource != "currentcommunity" && communityId
            && files.length > 0) {
         lconn.core.filesutil.shareWithCommunity({
            file: files,
            community: [ communityId ],
            callback: dojo.hitch(this, this.handleShareWithComplete, editor,
                  files),
            visibility: isPublicCommunity ? "public" : null
         });
         return;
   }
   /*
    * Otherwise, just link to the files
    * Note: we need to ensure all the data has been returned before inserting the links into CKEditor.
    * IC 128523 / OCS 141998: Panasonic - Unable to download a file from a link to file in Forums topic
    */
   setTimeout(function(){
      lconn.core.ckplugins.icdocpicker.insertLinksToCKEditor(editor, files);
   }, 600);
};

/**
 * Ensures the files can be shared with the Community first and then inserts the links into CKEditor.
 * @function handleShareWithComplete
 * @memberof lconn.core.ckplugins.icdocpicker
 */
docpicker.handleShareWithComplete = function(editor, files, response) {
   var code = response ? response.code : null, msg;

   if (code == "ConstraintViolation") {
      msg = nls.rs_sharefile_constraint_violation;
   }
   else if (code == "AccessDenied") {
      msg = nls.rs_sharefile_access_denied;
   }
   else if (code == "InvalidRequest") {
      msg = nls.rs_sharefile_invalid_request;
   }
   else if (code == "SharingIntentRestriction") {
      msg = nls.rs_sharefile_sharing_intent_restriction;
   }
   
   if (msg)
      lconn.core.DialogUtil.alert(nls.rs_sharefile_error_title, msg);
   else
      this.insertLinksToCKEditor(editor, files);
};

/**
 * Insert the links to download and view details on the files into the editor.
 * @function insertLinksToCKEditor
 * @memberof lconn.core.ckplugins.icdocpicker
 */
docpicker.insertLinksToCKEditor = function(editor, files) {
   var el;
   var doc = editor.document;
   
   for (var i = 0, l = files.length; i < l; i++) {
      var file = files[i];
      // Add link to download file
      var url = file.getUrlDownload();
      el = new CKEDITOR.dom.element('a', doc);
      el.setAttribute("href", (!url || 0 === url.length) ? "href://" : url);
      el.setAttribute("title", dojo.string.substitute(nls.rs_docpicker_download_title, [lconn.core.util.html.formatFilename(file.getName())]));
      el.setAttribute('data-cke-saved-href', (!url || 0 === url.length) ? "href://" : url);
      el.setAttribute("target", "_blank");
      
      // Add metadata
      el.setAttribute("_ic_source", "files");
      el.setAttribute("_ic_files_uuid", file.getId());
      
      // Add icon
      var img = new CKEDITOR.dom.element('img', doc);
      img.setAttribute("src", dojo.config.blankGif);
      img.setAttribute("class", "lconn-ftype16 lconn-ftype16-" + file.getExtension());
      img.setAttribute("aria-hidden", "true");
      img.appendTo(el);
      
      // Add text
      var str = new CKEDITOR.dom.element('strong', doc);
      str.appendTo(el);
      
      var txt = new CKEDITOR.dom.text(lconn.core.util.html.formatFilename(file.getName()), doc);
      txt.appendTo(str);
      
      editor.insertElement(el);
      
      // Add separator
      var sep = new CKEDITOR.dom.element('span', doc);
      sep.setAttribute("class", "lotusDivider");
      sep.setAttribute("aria-hidden", "true");
      sep.setAttribute("role", "img");
      
      // Add text
      var bar = new CKEDITOR.dom.text('|', doc);
      bar.appendTo(sep);
      
      editor.insertElement(sep);
      
      // Add link to file details
      if (currentSource == "currentcommunity") {
         url = file.getUrlVia();
      }
      else { // "myfiles", "mycomputer"
         url = file.getUrlAlternate();
      }
      
      el = new CKEDITOR.dom.element('a', doc);
      el.setAttribute("href", (!url || 0 === url.length) ? "href://" : url);
      el.setAttribute("title", dojo.string.substitute(nls.rs_docpicker_viewdetails_title, [lconn.core.util.html.formatFilename(file.getName())]));
      el.setAttribute('data-cke-saved-href', (!url || 0 === url.length) ? "href://" : url);
      el.setAttribute("target", "_blank");
      
      // Add text
      var txt = new CKEDITOR.dom.text(nls.rs_docpicker_viewdetails_text, doc);
      txt.appendTo(el);
      
      editor.insertElement(el);
   }
}

})();

