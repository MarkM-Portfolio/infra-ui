/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide('lconn.test.widget.ContainerFileThumbnails');

dojo.require('dijit._WidgetBase');
dojo.require('dijit._TemplatedMixin');
dojo.require('dijit._WidgetsInTemplateMixin');
dojo.require('dojox.html.styles');
dojo.require('lconn.share.widget.FileThumbnail');
dojo.require('lconn.share.widget.FileListTopPanel');

/**
 * A container widget to display the thumbnail widgets.
 * @author Davide Riso <davide.riso@ie.ibm.com> 
 * @namespace lconn.test.widget.ContainerFileThumbnails
 */

dojo.declare("lconn.test.widget.ContainerFileThumbnails", [dijit._WidgetBase, dijit._TemplatedMixin, dijit._WidgetsInTemplateMixin], {

   /** html template of the widget */ 
   templatePath: dojo.moduleUrl("lconn.test", "widget/templates/ContainerFileThumbnails.html"), 
   
   buttons: [
      {
         label: 'Button 1', // NLS no required here, mockup test data
         callback: function(ids) {
            console.log('Button 1 - data: ' + ids);
            alert('Button 1 - data: ' + ids);
         }
      },
      {
         label: 'Button 2', // NLS no required here, mockup test data
         callback: function(ids) {
            console.log('Button 2 - data: ' + ids);
            alert('Button 2 - data: ' + ids);
         }
      },
      {
         label: 'Button 3', // NLS no required here, mockup test data
         callback: function(ids) {
            console.log('Button 3 - data: ' + ids);
            alert('Button 3 - data: ' + ids);
         }
      }
   ],   
   
   /** Set some static data to test the FileThumbnail widget. */
   postCreate: function() {
      this.inherited(arguments);
      
      // test css (used for the FileListTopPanel elements)
      dojox.html.insertCssRule('.fltp_checkbox', 'border: 2px solid blue;');
      dojox.html.insertCssRule('.fltp_label', 'font-weight: bold;color: blue;');
      dojox.html.insertCssRule('.fltp_buttons', 'margin: 5px; border: 1px solid red;');
      // the test css used for each button, see ContainerFileThumbnails.html
      dojox.html.insertCssRule('.testTheme', 'margin: 5px;color: blue;');
      
      // test data
      var testData = [
         {
            fileId: 111,
            fileName:"Summer 2014 planning meeting.mov",
            fileType:"mov",
            fileAuthor: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Richa Verma'},
            fileDatePublished:"2014-01-07T17:18:32.555Z",
            fileModifier: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Richa Verma'},
            fileDateModified:"2014-01-07T17:18:32.555Z",
            filePinned: true,
            fileVisibilityLocking: 'lockedByMe',
            fileDraft: 'draftReview',
            filePath: '', // URL_FILE_PATH
            fileImagePath: '../../com.ibm.lconn.core.styles/test/grid/doc2.png', // URL_FILE_IMAGE_PATH
            actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}]
         },
         {
            fileId: 222,
            fileName:"MyDocument.odt",
            fileType:"odt",
            fileAuthor: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Richa Verma'},
            fileDatePublished:"2013-02-03T11:19:11.765Z",
            fileModifier: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Richa Verma'},
            fileDateModified:"2013-02-03T11:19:11.765Z",
            filePinned: true,
            fileVisibilityLocking: 'locked',
            fileDraft: 'draftReview',
            filePath: '', // URL_FILE_PATH
            fileImagePath: '../../com.ibm.lconn.core.styles/test/grid/doc1.jpg', // URL_FILE_IMAGE_PATH
            actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}]
         },
         {
            fileId: 333,
            fileName:"Sunset on the Lake.jpg",
            fileType:"odt",
            fileAuthor: {id: '59e08b40-4ed5-1030-8e2c-b49baaea3358', name: 'Davide Riso'},
            fileDatePublished:"2014-03-05T17:19:11.765Z",
            fileModifier: {id: '59e08b40-4ed5-1030-8e2c-b49baaea3358', name: 'Davide Riso'},
            fileDateModified:"2014-03-05T17:19:11.765Z",
            filePinned: true,
            fileVisibilityLocking: 'sharedExternally',
            fileDraft: 'draft',
            filePath: '', // URL_FILE_PATH
            fileImagePath: '../../com.ibm.lconn.core.styles/test/grid/image3.jpg', // URL_FILE_IMAGE_PATH
            actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}]
         },
         {
            fileId: 444,
            fileName:"otherName.zip",
            fileType:"zip",
            fileAuthor: {id: '59e08b40-4ed5-1030-8e2c-b49baaea3358', name: 'Davide Riso'},
            fileDatePublished:"2013-03-07T17:18:32.555Z",
            fileModifier: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Richa Verma'},
            fileDateModified:"2014-03-08T17:19:11.765Z",
            filePinned: false,
            fileVisibilityLocking: 'sharedCommunity',
            filePath: '', // URL_FILE_PATH
            actionListValue: [{name:'Download',callback: function(){alert('Download');}},{name:'Preview',callback: function(){alert('Preview');}},{name:'Summary',callback: function(){alert('Summary');}}] 
         }
      ];

      dojo.forEach(testData, dojo.hitch(this, function(widgetData, i){
         dojo.mixin(widgetData, {role: "listitem", index: i+1}); // required for a11y
         var newChild = new lconn.share.widget.FileThumbnail({value: widgetData});         
         this.fileListTopPanel.addStateful(newChild, newChild.value.fileId);
         this.domNode.appendChild(newChild.domNode);
      }));
   }   
});
