/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide('lconn.test.widget.ContainerFolderLibraryThumbnails');

dojo.require('dijit._WidgetBase');
dojo.require('dijit._TemplatedMixin');
dojo.require('dijit._WidgetsInTemplateMixin');
dojo.require('lconn.share.widget.FileThumbnail');
dojo.require('lconn.share.widget.FolderThumbnail');

/**
 * A container widget to display the thumbnail widgets.
 * @author Davide Riso <davide.riso@ie.ibm.com> 
 * @class coretest.widget.ContainerFolderLibraryThumbnails
 */

dojo.declare("lconn.test.widget.ContainerFolderLibraryThumbnails", [dijit._WidgetBase, dijit._TemplatedMixin, dijit._WidgetsInTemplateMixin],
      /** @lends coretest.widget.ContainerFolderLibraryThumbnails.prototype */ {

   /** html template of the widget */ 
   templatePath: dojo.moduleUrl("lconn.test", "widget/templates/ContainerFolderLibraryThumbnails.html"), 
   
   /** Set some static data to test the FileThumbnail widget. */
   postCreate: function() {
      this.inherited(arguments);

      // test data folder
      var testDataFolder = [{
         fileName:'My Folder', // label of the folder
         fileAuthor: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Richa Verma'}, // object with ID and Name
         fileDatePublished:"2014-01-07T17:18:32.555Z",
         fileModifier: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Richa Verma'}, // object with ID and Name, in case it has not been modified, set the same data of the fileAuthor
         fileDateModified:'2014-01-07T17:18:32.555Z', // object with ID and Name, in case it has not been modified, set the same data of the fileDatePublished
         context: "library", // this value will be always "library" for CCM
         actionListValue: [ // list of callbacks for the actions. More info on the file "spec-ux-grid-view.odp"
             {name:'Open',callback: function(){alert('Open');}} // click anywhere on the widget will call it, click on the file name (back side) will call it
         ]
      },{
         fileName:'My Folder 2', // label of the folder
         fileAuthor: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Davide Riso'}, // object with ID and Name
         fileDatePublished:"2014-08-07T17:18:32.555Z",
         fileModifier: {id: 'ddb66560-e1d6-4579-9718-deb3b86ca1cf', name: 'Davide Riso'}, // object with ID and Name, in case it has not been modified, set the same data of the fileAuthor
         fileDateModified:'2014-08-07T17:18:32.555Z', // object with ID and Name, in case it has not been modified, set the same data of the fileDatePublished
         context: "library", // this value will be always "library" for CCM
         actionListValue: [ // list of callbacks for the actions. More info on the file "spec-ux-grid-view.odp"
             {name:'Open',callback: function(){alert('Open');}} // click anywhere on the widget will call it, click on the file name (back side) will call it
         ]
      }];

      // folder
      dojo.forEach(testDataFolder, dojo.hitch(this, function(widgetData, i){
         dojo.mixin(widgetData, {role: "listitem", index: i+1}); // required for a11y
         var newChildFolder = new lconn.share.widget.FolderThumbnail({value: widgetData});
         this.domNode.appendChild(newChildFolder.domNode);
      }));
   }   
});
