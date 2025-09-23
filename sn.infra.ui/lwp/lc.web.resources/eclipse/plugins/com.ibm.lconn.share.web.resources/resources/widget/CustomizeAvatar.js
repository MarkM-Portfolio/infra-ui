/**Copyright IBM Corp. 2016  All Rights Reserved.
 * 
 */
dojo.provide("lconn.share.widget.CustomizeAvatar");
dojo.require("dojo.dnd.Avatar");


dojo.declare("lconn.share.widget.CustomizeAvatar", dojo.dnd.Avatar, {
   construct: function() {
      if (this.manager.nodes.length) {
         var source = this.manager.source;
         var d = document;
         var node = d.createElement("div");
         dojo.addClass(node, "qkrDropAvatar");
         dojo.style(node, {
            position: "absolute",
            zIndex: 1999,
            margin: "0px" // to avoid dojo.marginBox() problems with table's margins
         });
         var Item = source._normalizedCreator(source.getItem(this.manager.nodes[0].id, true), "avatar").node;
         
         var badge = d.createElement("div");
            badge.className = "DropAvatarBadge";
            badge.appendChild(d.createElement("div"));
            badge.firstChild.appendChild(d.createTextNode(this.manager.nodes.length));
         node.appendChild(badge);
            var container = d.createElement("div");
            container.className = "DropAvatarContainer topPostion";
            container.appendChild(Item);
         node.appendChild(container);
          
         if(this.manager.nodes.length > 1) {
            var overlap = d.createElement("div")
            overlap.className = "DropAvatarContainer bottomPosition";
            node.appendChild(overlap);
            dojo.addClass(container, "border");
         }


         this.node = node;
      }
   },

   update: function() {}
});