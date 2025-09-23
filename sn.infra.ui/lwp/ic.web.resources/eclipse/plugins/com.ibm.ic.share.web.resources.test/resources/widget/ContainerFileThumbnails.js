/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dijit/_WidgetsInTemplateMixin",
   "ic-share/widget/FileThumbnail",
   "dojo/text!./templates/ContainerFileThumbnails.html",
   "dojo/domReady!"
], function(declare, lang, array, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, fileThumbnail, template) {

   /**
    * A container widget to display the thumbnail widgets.
    * @author Davide Riso <davide.riso@ie.ibm.com> 
    * @class ic-share-test.widget.ContainerFileThumbnails
    */
   return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], /** @lends ic-share-test.widget.ContainerFileThumbnails.prototype */ {  

      /** html template of the widget */ 
      templateString: template,

      /** Set some static data to test the FileThumbnail widget. */
      postCreate: function() {
         this.inherited(arguments);
         var testData = [
            {
               fileId: 1,
               fileName:"Summer 2014 planning meeting.odp",
               fileType:"doc",
               fileAuthor:"Lisa Smith",
               fileDatePublished:"2014-01-07T17:18:32.555Z",
               fileModifier:"Osvaldo Esposito",
               fileDateModified:"2014-01-07T17:18:32.555Z",
               filePinned: true,
               fileVisibilityLocking: 'lockedByMe',
               fileDraft: 'draftReview',
               filePath: '', // URL_FILE_PATH
               fileImagePath: '../../com.ibm.lconn.core.styles.test/grid/doc2.png', // URL_FILE_IMAGE_PATH
               actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}]
            },
            {
               fileId: 2,
               fileName:"MyDocument.odt",
               fileType:"odt",
               fileAuthor:"Amy Jones50",
               fileDatePublished:"2011-02-08T17:19:11.765Z",
               fileModifier:"Otto Mann",
               fileDateModified:"2011-02-08T17:19:11.765Z",
               filePinned: true,
               fileVisibilityLocking: 'locked',
               fileDraft: 'draftReview',
               filePath: '', // URL_FILE_PATH
               fileImagePath: '../../com.ibm.lconn.core.styles.test/grid/doc1.jpg', // URL_FILE_IMAGE_PATH
               actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}]
            },
            {
               fileId: 3,
               fileName:"Sunset on the Lake.jpg",
               fileType:"odt",
               fileAuthor:"Amy Jones52",
               fileDatePublished:"2011-02-08T17:19:11.765Z",
               fileModifier:"Otto Mann",
               fileDateModified:"2011-02-08T17:19:11.765Z",
               filePinned: true,
               fileVisibilityLocking: 'sharedExternally',
               fileDraft: 'draft',
               filePath: '', // URL_FILE_PATH
               fileImagePath: '../../com.ibm.lconn.core.styles.test/grid/image3.jpg', // URL_FILE_IMAGE_PATH
               actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}]
            },
            {
               fileId: 4,
               fileName:"otherName.zip",
               fileType:"",
               fileAuthor:"Sophia Loren",
               fileDatePublished:"2014-01-07T17:18:32.555Z",
               fileModifier:"Otto Mann",
               fileDateModified:"2014-01-08T17:19:11.765Z",
               filePinned: false,
               fileVisibilityLocking: 'sharedCommunity',
               filePath: '', // URL_FILE_PATH
               actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}]
            }
         ];
         array.forEach(testData, function(widgetData, i){
            lang.mixin(widgetData, {role: "listitem", index: i+1}); // required for a11y
            var newChild = new fileThumbnail({value: widgetData});
            this.domNode.appendChild(newChild.domNode);
         }, this);
      }
   });
});
