/* Copyright IBM Corp. 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tree.dnd.Avatar");

dojo.require("dojo.dnd.Avatar");

dojo.declare("lconn.share.widget.tree.dnd.Avatar", dojo.dnd.Avatar, {
   construct: function() {
      if (this.manager.nodes.length) {
         var node = this.manager.source.anchor.parentNode;
         var Node = dijit.byId( this.manager.source.anchor.parentNode.id );
         var d = dojo.doc.createElement("div");
         d.id = "treeAvatar";
         dojo.addClass(d, "filesTreeDropAvatar");
         dojo.addClass(d, "dojoDndAvatar");
         dojo.style(d, {
            position: "absolute",
            zIndex: 1999,
            margin: "0px" // to avoid dojo.marginBox() problems with table's margins
         });

         if( Node ) {
           var img = dojo.query("img",Node.iconDiv).length? dojo.query("img",Node.iconDiv)[0] : null;
           if( img ) dojo.place( dojo.clone( img ), d, "first"); 
         }
         dojo.place( "<span class='bidiAware'>"+(Node? " "+Node.getTitle( ) : " ???")+"</span>", d, "append");

         this.node = d;
         this.update();
      }
   }
});