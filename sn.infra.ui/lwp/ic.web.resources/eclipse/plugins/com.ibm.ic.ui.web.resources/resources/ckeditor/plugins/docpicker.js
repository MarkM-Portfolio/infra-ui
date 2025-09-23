/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
define([
        "dojo",
        "dojo/string",
        "dojo/i18n",
        "dojo/_base/lang",
        "dojo/i18n!ic-core/nls/strings",
        "../../DialogUtil",
        "ic-core/config",
        "ic-core/config/services"// ,
// "ic-core/filepicker",
// "ic-core/filesutil",
// "ic-core/util/html"
], function(dojo, string, i18n, lang, i18nstrings, DialogUtil, config, services, filepicker, filesutil, html) {

   /**
    * Common CKEditor plugins
    * 
    * @namespace ic-ui.ckeditor.plugins
    */

   /**
    * CKEditor plugin that inserts links to Files using the File Picker dialog
    * 
    * @namespace ic-ui.ckeditor.plugins.docpicker
    */
   var nls = i18nstrings;
   var currentSource = null;
   var communityId = null;
   var communityName = null;
   var isInACommunity = false;
   var isPublicCommunity = false;

   /**
    * The name of this plugin
    */
   var name = 'icdocpicker';

   var docpicker = {};

   /**
    * Returns the name of this plugin
    * 
    * @function getName
    * @memberof ic-ui.ckeditor.plugins.docpicker
    */
   docpicker.getName = function() {
      return name;
   };

   /**
    * Returns true if this plugin is enabled
    * 
    * @function isEnabled
    * @memberof ic-ui.ckeditor.plugins.docpicker
    * @returns true if the plugin is enabled
    */
   docpicker.isEnabled = function() {
      return services.files || services.ecm_files;
   };

   /**
    * Dynamically adds a CKEditor plugin that triggers the File Picker dialog.
    * 
    * @function addPlugin
    * @memberof ic-ui.ckeditor.plugins.docpicker
    */
   docpicker.addPlugin = function() {
      if (CKEDITOR && CKEDITOR.plugins && CKEDITOR.plugins.registered && CKEDITOR.plugins.registered[name]) {
         return;
      }

      CKEDITOR.plugins.add(name, {
         init : function(editor) {

            editor.ui.addButton('LinkToFiles', {
               label : nls.rs_docpicker_label,
               command : 'linkToFiles'
            });

            editor.addCommand('linkToFiles', {
               exec : function(editor) {

                  var community = lang.getObject("lconn.communities.bizCard.core.community");
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
                     var communityType = community.communityType;

                     if (communityType === "private") {
                        isPublicCommunity = false;
                     }

                     isInACommunity = true;

                     filepicker.open({
                        useCompact : true,
                        title : nls.rs_docpicker_title,
                        showVisibility : true,
                        filesService : services.files,
                        onSave : lang.hitch(docpicker, docpicker.onSave, editor),
                        onClose : lang.hitch(docpicker, docpicker.onClose, editor),
                        onSourceChange : function(source) {
                           currentSource = source.id;
                        },
                        repository : {
                           type : "community",
                           communityId : communityId,
                           communityName : communityName,
                           isPublic : isPublicCommunity
                        },
                        shareableOnly : true,
                        publicOnly : isPublicCommunity,
                        externalOnly : !!community.externalAllowed,
                        showExternal : !!community.isMultiTenantMode,
                        communityFilesType : "all"
                     });

                  }
                  else {
                     isInACommunity = false;

                     filepicker.open({
                        useCompact : true,
                        title : nls.rs_docpicker_title,
                        showVisibility : true,
                        filesService : services.files,
                        onSave : lang.hitch(docpicker, docpicker.onSave, editor),
                        onClose : lang.hitch(docpicker, docpicker.onClose, editor),
                        onSourceChange : function(source) {
                           currentSource = source.id;
                        },
                        shareableOnly : true
                     });
                  }
               }
            });
         }
      });
   };

   /**
    * Callback for the File Picker dialog's <code>onClose</code> method.
    * 
    * @function onClose
    * @memberof ic-ui.ckeditor.plugins.docpicker
    */
   docpicker.onClose = function(editor) {
      if (editor) {
         editor.focus();
      }
   };

   /**
    * Callback for the File Picker dialog's <code>onSave</code> method.
    * 
    * @function onSave
    * @memberof ic-ui.ckeditor.plugins.docpicker
    */
   docpicker.onSave = function(editor, files) {
      /*
       * If the user selects files not shared with this community, files must be
       * shared first.
       */
      if (isInACommunity && currentSource != "currentcommunity" && communityId && files.length > 0) {
         filesutil.shareWithCommunity({
            file : files,
            community : [ communityId
            ],
            callback : lang.hitch(this, this.handleShareWithComplete, editor, files),
            visibility : isPublicCommunity ? "public" : null
         });
         return;
      }

      /*
       * Otherwise, just link to the files Note: we need to ensure all the data
       * has been returned before inserting the links into CKEditor. IC 128523 /
       * OCS 141998: Panasonic - Unable to download a file from a link to file
       * in Forums topic
       */
      setTimeout(function() {
         docpicker.insertLinksToCKEditor(editor, files);
      }, 600);

   };

   /**
    * Ensures the files can be shared with the Community first and then inserts
    * the links into CKEditor.
    * 
    * @function handleShareWithComplete
    * @memberof ic-ui.ckeditor.plugins.docpicker
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

      if (msg) {
         DialogUtil.alert(nls.rs_sharefile_error_title, msg);
      }
      else {
         this.insertLinksToCKEditor(editor, files);
      }
   };

   /**
    * Insert the links to download and view details on the files into the
    * editor.
    * 
    * @function insertLinksToCKEditor
    * @memberof ic-ui.ckeditor.plugins.docpicker
    */
   docpicker.insertLinksToCKEditor = function(editor, files) {
      var i, l, el, doc = editor.document, file, url, img, str, sep, bar, txt;

      for (i = 0, l = files.length; i < l; i++) {
         file = files[i];
         // Add link to download file
         url = file.getUrlDownload();
         el = new CKEDITOR.dom.element('a', doc);
         el.setAttribute("href", (!url || 0 === url.length) ? "href://" : url);
         el.setAttribute("title", string.substitute(nls.rs_docpicker_download_title, [ html.formatFilename(file.getName())
         ]));
         el.setAttribute('data-cke-saved-href', (!url || 0 === url.length) ? "href://" : url);
         el.setAttribute("target", "_blank");

         // Add metadata
         el.setAttribute("_ic_source", "files");
         el.setAttribute("_ic_files_uuid", file.getId());

         // Add icon
         img = new CKEDITOR.dom.element('img', doc);
         img.setAttribute("src", dojo.config.blankGif);
         img.setAttribute("class", "lconn-ftype16 lconn-ftype16-" + file.getExtension());
         img.setAttribute("aria-hidden", "true");
         img.appendTo(el);

         // Add text
         str = new CKEDITOR.dom.element('strong', doc);
         str.appendTo(el);

         txt = new CKEDITOR.dom.text(html.formatFilename(file.getName()), doc);
         txt.appendTo(str);

         editor.insertElement(el);

         // Add separator
         sep = new CKEDITOR.dom.element('span', doc);
         sep.setAttribute("class", "lotusDivider");
         sep.setAttribute("aria-hidden", "true");
         sep.setAttribute("role", "img");

         // Add text
         bar = new CKEDITOR.dom.text('|', doc);
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
         el.setAttribute("title", string.substitute(nls.rs_docpicker_viewdetails_title, [ html.formatFilename(file.getName())
         ]));
         el.setAttribute('data-cke-saved-href', (!url || 0 === url.length) ? "href://" : url);
         el.setAttribute("target", "_blank");

         // Add text
         txt = new CKEDITOR.dom.text(nls.rs_docpicker_viewdetails_text, doc);
         txt.appendTo(el);

         editor.insertElement(el);
      }
   };

   return docpicker;
});
