/* Copyright IBM Corp. 2016  All Rights Reserved.             */
define(['dojo/_base/lang'], function(lang){
  /**
   * This module represents a Hopscotch tour object for
   * Files Guided tour.
   */
  var filesTour = lang.mixin(lang.getObject('lconn.test.icsTour.tours.guided.filesGT', true), {
    id : "guided-files",
    type : 'guidedTour',
    customRenderer : 'bubble_ess_default',
    bubbleWidth : 260,
    steps : [ {
      title : "Get organized!",
      content : "Files lets you store your documents and photos in the cloud so you can access and share them from anywhere.",
      target : "#lotusBanner",
      customData : {showArrow : "hide"},
      xOffset : 200,
      yOffset : 48,
      placement : "bottom"
    }, { 
      title : "Find or create a file",
      content : "Upload an existing file, or create a new document. Either way, your files are available for just you or for you to co-edit with others.",
      target : "#lconn_files_action_createitem_0",
      placement : "left"
    }, { 
      title : "Take action!",
      content : "Your file appears in your My Files list. You can tag, like, and pin files from here. You can also organize your files in folders and share with others.</br></br>Click a file to view and comment on it.",
      target : "#scene-title",
      placement : "right",
      yOffset : -40,
      xOffset : -8
    }, { 
      title : "Get the latest changes",
      content : "Install the Sync plug-in so you can be sure you have the latest version of files you add to the Sync folder. Whether you edit a file locally or others make changes, you\'ll always be up to date.",
      //JH: my best untested shot at a target for the Sync button. Connections needs to make this better!
      target : ".lotusMenuSection a[href*='filesync']",
      placement : "bottom"
    }, { 
      title : "Thanks for watching!",
      content : "Take this or other tours at any time from the Guided Tours option on the Help menu.",
      target : '#bsscom-helpMenu',
      placement : 'bottom',
      xOffset : -212,
      arrowOffset : 218,
      yOffset : -8
    } ],
  });
  return filesTour;
});
