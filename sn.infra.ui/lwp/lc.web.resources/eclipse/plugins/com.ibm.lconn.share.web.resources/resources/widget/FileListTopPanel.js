/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
   
dojo.provide('lconn.share.widget.FileListTopPanel');

dojo.require('dijit._WidgetBase');
dojo.require('dijit._TemplatedMixin');
dojo.require('dijit._WidgetsInTemplateMixin');
dojo.require('dijit.form.CheckBox');
dojo.require('dijit.form.Button');
dojo.require('dojo.Stateful');
dojo.require('dojox.mvc.StatefulArray');

/**
  * A widget to display the panel just above the list of the files, for example above the grid view.
  * <p>
  * Usage (see "lconn.share.widget.ContainerFileThumbnails" for an example):
  *
  * provide the following properties:
  *  - labelCheckbox: the label which appears next to the checkbox
  *  - flag: the flag field (of the Stateful object) which we need to watch 
  *  - buttons: array of objects containing the "label" field (label of the button) and the "callback" field (the onClick callback function)
  *  - buttonsCssClass: the CSS class applied to every dijit.form.Button
  *  
  * Example:
  * <pre>
  * <div>
  *    <div data-dojo-attach-point="fileListTopPanel" data-dojo-type="lconn.share.widget.FileListTopPanel"
  *        data-dojo-props="labelCheckbox: 'select all', flag: 'selected', buttons: this.buttons, buttonsCssClass: 'testTheme'"></div>
  *    <div data-dojo-attach-point="containerNode"></div>
  * </div>
  * </pre>
  * </p>
  * 
  * @author Davide Riso <davide.riso@ie.ibm.com> 
  * @namespace lconn.share.widget.FileListTopPanel
  */

dojo.declare("lconn.share.widget.FileListTopPanel", [dijit._WidgetBase, dijit._TemplatedMixin, dijit._WidgetsInTemplateMixin], {

   /** html template of the widget */ 
   templatePath: dojo.moduleUrl("lconn.share", "widget/templates/FileListTopPanel.html"),
   
   /** the label which appears next to the checkbox */
   labelCheckbox: null, // TODO verify RTL support
   /** the flag field (of the Stateful object) which we need to watch */
   flag: null,
   /** array of objects containing the "label" field (label of the button) and the "callback" field (the onClick callback function) */
   buttons: null,
   /** the CSS class applied to every dijit.form.Button */
   buttonsCssClass: null,
   
   /** list of items containing the flag to observe */
   items: null,
   /** dojox.mvc.StatefulArray containing the IDs of the selected items */
   selectedIds: null,
   /** handle of the watch of selectedIds */
   handleSelectedIds: null,
   /** handle of the watch of the flag of each Stateful item */
   handleItems: null,
   /** array of the buttons which should be enabled/disabled */
   buttonArray: null,   
   
   /** Set-up */
   postCreate: function() {
      this.inherited(arguments);
      
      // reset all the fields
      this.items = [];
      this.selectedIds = new dojox.mvc.StatefulArray([]);
      this.handleSelectedIds = null;
      this.handleItems = [];
      this.buttonArray = [];

      // fix for the dijit checkbox visibility
      // TODO verify if it's advisable to move this on the "CSS-customization" side
      dojo.setStyle(this.fltp_checkbox.domNode.firstElementChild, 'opacity', '1');
      
      // to maintain the current context
      var that = this;
      
      // selectAll/deselectAll
      this.fltp_checkbox.onChange = function() {
         dojo.forEach(that.items, function(item){
            if (item[that.flag] !== this.checked) {
               item.set(that.flag, this.checked);
            }
         }, this);
      };

      // generate the buttons
      dojo.forEach(this.buttons, dojo.hitch(this, function(button){
         var buttonObj = new dijit.form.Button({
            label: button.label,
            disabled: true,
            'class': this.buttonsCssClass,
            type: 'button',
            onClick: function(){
               // pass the list of selected IDs as argument
               button.callback(that.selectedIds);
            }
         });
         
         // startup as it has been created programmatically
         buttonObj.startup();
         
         // add the button to the DOM
         this.fltp_buttons.appendChild(buttonObj.domNode);
         
         // add the button to the array
         this.buttonArray.push(buttonObj);
      }));

      // Watch the array containing the IDs and enable/disable the buttons when required
      that.handleSelectedIds = that.selectedIds.watchElements(function(index, removals, adds) {
         if (this.length === 1 && removals.length === 0) {
            // the first selection
            dojo.forEach(that.buttonArray, function(button){
               button.set('disabled', false);
            });
         }
         if (this.length === 0 && adds.length === 0) {
            // nothing is selected anymore
            dojo.forEach(that.buttonArray, function(button){
               button.set('disabled', true);
            });
         }
      });
   },
   
   /**  Method used during the loop of creation of the Stateful object which contains the flag to watch
    *   Add the Stateful object to the array 'items' and "watch" the flag
    *   @param {Object} stateful - the Stateful object
    *   @param {number} id - the unique field of the Stateful object
    *   */
   addStateful: function(stateful, id) {
      // save (in an array) the handle returned for each watch
      var that = this;
      that.handleItems.push(
         stateful.watch(that.flag, function(){
            if (this.get(that.flag)) {
               // add the id to the array
               that.selectedIds.push(id);
            }
            else {
               // remove the id from the array
               that.selectedIds.splice(that.selectedIds.indexOf(id),1);
            } 
         })
      );
      // add the Stateful Object to the list of items
      that.items.push(stateful);
   },
   
   /** Clean-up */
   destroy: function() {
      if (this.handleSelectedIds) {
         this.handleSelectedIds.unwatch();
      }
      for(var handle = null; handle = (this.handleItems || []).pop();) {
         this.unwatch();
      }
   }
});
