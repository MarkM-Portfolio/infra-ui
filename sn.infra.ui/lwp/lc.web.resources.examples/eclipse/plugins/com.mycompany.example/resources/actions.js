/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


/*
 * This module defines and registers a custom action in Files.  The action shows up as the last action
 * for a file as "My action".
 */
dojo.provide("com.mycompany.example.actions");

/*
 * Only require modules that you need to invoke directly.  Use the module binding to ensure
 * that you are loaded after another module.
 */
dojo.require("lconn.core.uiextensions");
dojo.require("lconn.share.action.Action");

/*
 * All actions must implement the methods defined in lconn.share.action.Action. Different parts of the application may 
 * not call some methods - check the action scope to see which methods may safely be ignored.
 */
dojo.declare("MyExampleAction", [lconn.share.action.Action], {
   name: "My action", 
   tooltip: "My example tooltip", 
   execute: function(file, opt) {
      alert("This is an action on the file '"+file.getName()+"'");
   }
});

/*
 * Register a function that will be called when the actions for a file are loaded.
 */
lconn.core.uiextensions.add(
   "lconn/files/actions/file", 

   /*
    * This function will be called whenever the Files application requests the set of actions for a file. The actions 
    * array will contain the list of all the default actions - use the standard array operations like push, pop, slice, 
    * or un-shift to add and remove actions.  The example below adds our custom action to the end of the list.
    */
   function(actions, id, app, scene) {
      actions.push(new MyExampleAction());
   }
);