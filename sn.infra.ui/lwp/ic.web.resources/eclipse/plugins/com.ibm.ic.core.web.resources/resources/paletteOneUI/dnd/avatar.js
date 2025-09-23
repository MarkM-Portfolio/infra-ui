define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dnd/Avatar",
	"dojo/dnd/common",
	"dojo/dom-class",
	"dojo/i18n",
	"dojo/i18n!ic-core/paletteOneUI/nls/dndAvatar",
	"dojo/string"
], function (dojo, declare, windowModule, Avatar, common, domClass, i18n, i18ndndAvatar, string) {

	/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */
	
	 //FIXME: Remove all references to this old name and refactor to new package
	// avatar displayed when the user is re-arranging the layout of the dashboard
	var avatar = declare("lconn.dboard.dnd.avatar", Avatar, {
	   // summary: avatar displayed when the user is re-arranging the layout of the dashboard / homepage
	   // description: our avatar is just a clone of the source node that should look exactly the same
	   //      except for the opacity (50%)
	   _bodyNode: null,
	   _titleNode: null,
	   _draggedWidgetData: null,
	   _isPaletteItem: null,
	   _resourceBundle: null,
	
	   construct: function() {
	
	      this._resourceBundle = i18ndndAvatar;
	
	      if (this.manager.nodes.length) {
	         this._isPaletteItem = domClass.contains(this.manager.nodes[0], "paletteItem");
	
	         var source = this.manager.source;
	         this._draggedWidgetData = source.getItem(this.manager.nodes[0].id).data;
	
	         this.node = windowModule.doc.createElement("div");
	         domClass.add(this.node, "idbc");
	
	         this._titleNode = windowModule.doc.createElement("div");
	         domClass.add(this._titleNode, "idbt");
	         if (this._isPaletteItem) this._titleNode.innerHTML = string.substitute(this._resourceBundle.TITLE_CREATE_WIDGET, [this._draggedWidgetData]); // "Creating " + this._draggedWidgetData + " widget";
	         else this._titleNode.innerHTML = string.substitute(this._resourceBundle.TITLE_MOVE_WIDGET, [this._draggedWidgetData]); // "Moving " + this._draggedWidgetData + " widget";
	         this._bodyNode = windowModule.doc.createElement("div");
	         domClass.add(this._bodyNode, "idbi");
	
	         this.node.appendChild(this._titleNode);
	         this.node.appendChild(this._bodyNode);
	
	         this.node.style.position = "absolute";
	         this.node.style.zIndex = 1999;
	
	         this.update();
	
	      }
	   },
	
	   update: function() {
	      var cannotDropIconUrl = require.toUrl("ic-core/paletteOneUI/dnd/cannotDrop.gif").toString();
	      var canDropIconUrl = require.toUrl("ic-core/paletteOneUI/dnd/okDrop.gif").toString();
	
	      if (this._isPaletteItem) {
	         if (this.manager.canDropFlag) {
	            var img = "<img src='" + canDropIconUrl + "'></img>";
	            this._bodyNode.innerHTML = img + " " + string.substitute(this._resourceBundle.ADD_WIDGET, [this._draggedWidgetData]); //" Release mouse to add " + this._draggedWidgetData + " widget to the page";
	         } else {
	            var img = "<img src='" + cannotDropIconUrl + "'></img>";
	            this._bodyNode.innerHTML = img + " " + string.substitute(this._resourceBundle.CANNOT_ADD_WIDGET, [this._draggedWidgetData]);
	         }
	      } else {
	         if (this.manager.canDropFlag) {
	            var img = "<img src='" + canDropIconUrl + "'></img>";
	            this._bodyNode.innerHTML = img + " " + string.substitute(this._resourceBundle.MOVE_WIDGET, [this._draggedWidgetData]);
	         } else {
	            var img = "<img src='" + cannotDropIconUrl + "'></img>";
	            this._bodyNode.innerHTML = img + " " + string.substitute(this._resourceBundle.CANNOT_DROP_WIDGET, [this._draggedWidgetData]);
	         }
	      }
	   }
	});
	
	return avatar;
});
