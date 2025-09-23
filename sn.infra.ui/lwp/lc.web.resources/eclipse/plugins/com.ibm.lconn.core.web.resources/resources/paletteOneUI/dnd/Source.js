/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.paletteOneUI.dnd.Source");
dojo.provide("lconn.dboard.dnd.Source"); //FIXME: Remove all references to this old name and refactor to new package
dojo.require("lconn.core.dnd.Source");

dojo.declare("lconn.dboard.dnd.Source", lconn.core.dnd.Source, {

   flagNotHide: false,
   isPalette: false,

   checkAcceptance: function(source, nodes) {
      // summary: overriden to add support for our palette
      if (this.isPalette) return false;
      else return lconn.dboard.dnd.Source.superclass.checkAcceptance.apply(this, arguments);
   },

   onDndDrop: function( /* dojo.dnd.Source */ source, /* DOM Node array*/ nodes, /* Boolean */ copy) {
      // summary: Overriden method to add support for the palette
      // description: If the dragged item has the class "paletteItem":
      //            - the event "/lconn/dboard/dropPaletteItem" is published 
      //               with the params [dragged item node, dropIndicator node, destination container node]
      //               The dropIndicator node can be used to determine the location where to insert a new node for instance
      //            - the dnd operation is cancelled
      //            For all the other elements:
      //            - the event "/lconn/dboard/dnd/drop" is published 
      //               with the params [source container node, destination container node, dragged item node]
      if (this.containerState == "Over" && dojo.hasClass(nodes[0], "paletteItem")) {
         // palette item dropped on this container
         dojo.publish("/lconn/dboard/dropPaletteItem", [nodes[0], this.dropIndicator, this.node]);
         this.deleteDropIndicator();
         lconn.core.dnd.Source.superclass.onDndCancel.call(this);
      } else {
         // palette item dropped on another target container ==> set a flag to avoid the item to be displayed in onDndCancel()
         if (dojo.hasClass(nodes[0], "paletteItem")) this.flagNotHide = true;

         // some processing needed before calling the parent method
         var oldCurrent = this.current;
         this.current = this.dropIndicator;
         lconn.dboard.dnd.Source.superclass.onDndDrop.apply(this, arguments);

         this.flagNotHide = false;
         this.current = oldCurrent;

         // drop any other element (not a palette item)
         if (this.containerState == "Over") dojo.publish("/lconn/dboard/dnd/drop", [source.node, this.node, nodes[0]]);
      }

      // reenable selection as the dnd operation is done
      dojo.body().onselectstart = null;
      dojo.body().unselectable = "off";

      // SPR #DMCE79MCDA reset can drop flag
      dojo.dnd.manager().canDropFlag = false;
   }
});
