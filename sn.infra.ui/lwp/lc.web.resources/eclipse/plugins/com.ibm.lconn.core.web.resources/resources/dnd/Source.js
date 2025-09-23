/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.dnd.Source");
dojo.require("dojo.dnd.Source");

dojo.declare("lconn.core.dnd.Source", dojo.dnd.Source, {
	// summary: Custom dnd source to add several features to the default dojo 1.0.2 dnd system
    // description: The added features are:
	//				- Drop indicator (like Netvibes or iGoogle)
	//  			- Drag handle. Dojo 0.9 does not support drag handles. 
	//       A dnd item can be dragged just be selecting any part of it. It is not convenient in the case of 
	//	     the dashboard, as the widgets should only be draggable by selecting the title bar of the widget. 
	//		 Therefore, we had to implement a mechanism to deal with drag handle. Care has be made to implement 
	//       a generic drag handle system (that could potentially be used in another application)
    // 				
	//	author: Vincent Burckhardt (vincent.burckhardt@ie.ibm.com)
	
	isCursorNorthNode: function(/* DOM Node */ node,/* Event */ evt){
		// summary: Calculate the location of the mouse cursor relative to the gravity center of node
		// returns: boolean. True if mouse cursor is north from gravity center of the passed node	
		
		var coords = dojo.coords(node, true);
		var absY = node.offsetHeight;
		
		return ((evt.pageY - coords.y) < (absY / 2));		
	},	
	
	_children: null,
	
	_changeState: function(type, newState){
		// summary: Overriden to remove operations on CSS classes. 
		//		We don't use this feature and it is very slow under IE7 (lags) when the dnd container contains a lot of DOM nodes
		var state  = type.toLowerCase() + "State";		
		this[state] = newState;
	},
	
	_addItemClass: function(node, type){
		// summary: Overriden to remove operations on CSS classes. 
		//		We don't use this feature and it is very slow under IE7 (lags) when the dnd container contains a lot of DOM nodes
		
	},
	_removeItemClass: function(node, type){
		// summary: Overriden to remove operations on CSS classes. 
		//		We don't use this feature and it is very slow under IE7 (lags) when the dnd container contains a lot of DOM nodes
		
	},
	
	getInsertPosition: function(e){	
		// summary: Calculate the location where to insert the drop indicator depending on the current mouse cursor position
		// description: The position is calculated as follows:
		//    				- if the cursor is over a node in a dnd source container, 
		//						a node reference is returned as the first item of the result array
		//    				- if there is no node in a dnd source container under the mouse cursor,
		//						 the first item of the result array is null
		//    				- some additional handling had to be done to ignore the drop indicator 
		//						 (it is a node in a dnd source container by definition!)
		//    				- the "before" boolean is determined by computing the position of the mouse cursor 
		// 						  relative to the gravity center of the underneath DOM node.
		// returns: Array of 2 elements [DOM node, boolean before]
		// 		 For instance [nodeX, true] means that the drop indicator node should be inserted 
		//		 before "nodeX" in the parent container. 	
		//		 Returns [null, false] if no location was found	==> error
		
		
		// init
		var pos = -1 ;
		var before = false;
		
		// this._children contains all the node in the source
		// this._children is initilized by onDndStart()
		// however, during the drag operation, the dragged source widget is hidden (optimizations)
		// so we have to search for only the displayed nodes/widgets to calculate the location
		var displayedChildren = [];				
		for(var i=0; i<this._children.length; i++){			
			if (this._children[i].style.display != "none")
				displayedChildren.push(this._children[i]);
		}
			
		// start searching for the right location
		var lastIndex = displayedChildren.length - 1;			
		if (displayedChildren.length > 0){
			// north to the first node?				
			if (this.isCursorNorthNode(displayedChildren[0], e)){				
				pos = 0;
				before = true;
			}
			// south to the last node?
			else if (!this.isCursorNorthNode(displayedChildren[lastIndex], e)){
				//console.log("south last");
				pos = lastIndex;
				before = false;
			}
			// otherwise search for the right location
			else {
				for(var i=0; i < lastIndex; i++){
					// between two nodes
					if (!this.isCursorNorthNode(displayedChildren[i], e)
						&& this.isCursorNorthNode(displayedChildren[i+1], e)){
							pos = i;
							before = false;
							break;
						}
				}				
			}	
			return [displayedChildren[pos], before];			
		}
		else{
			return [null, false];
		}		
	},	
		
	placeIndicator: function(/* DOM Node */ node,/* Boolean */ before) {		
		// summary: Inserts drop indicator at the specified location
		// description: Insert the dropIndicator before (true) or after (false) the specified DOM node.
		//				The parameters usually come from getInsertPosition.
		//				If node is null, the drop indicator is placed as the first element of this container
		
		if (this.dropIndicator && this.dropIndicator.parentNode)
			this.dropIndicator.parentNode.removeChild(this.dropIndicator);
							
		if (node == null){				
			this.node.appendChild(this.dropIndicator);
		}
		else{
			// insert before node
			if (before){
				node.parentNode.insertBefore(this.dropIndicator, node);
			}
			else{ 
				// insert after node
				if (node.parentNode.lastChild == node)
					this.node.appendChild(this.dropIndicator);
				else
					node.parentNode.insertBefore(this.dropIndicator, node.nextSibling);
			}
		}			
	},
	
	createDropIndicator: function(){	
		// summary: Creates the dropIndicator DOM node (div) and set this.dropIndicator with a reference to this node
		// description: Creates an empty DOM div node, sets the borders and height/width
		//		according to the size of the dragged item and stores the reference of the node in the dropIndicator proprety. 
		// returns: nothing (this.dropIndicator is set)
				
		var width = 7;
		this.dropIndicator = document.createElement("div");
		// TODO : use css instead
		this.dropIndicator.style.borderWidth = "2px";				
		this.dropIndicator.style.borderColor = "gray";			
		this.dropIndicator.style.borderStyle = "dashed";
		this.dropIndicator.style.cursor = "default";		
							
		// height of the source		
		// dojo.dnd.manager().avatar.node is the dragged widget (our avatar has the same size as the source widget)					
		this.dropIndicator.style.height = dojo.marginBox(dojo.dnd.manager().avatar.node).h + "px";				
		// width of the destination table cell				
		this.dropIndicator.style.width = dojo.marginBox(this.node).w - width + "px";
	},	
	
	onDndStart: function(/* dojo.dnd.Source */source,/* DOM Node */ nodes,/* Boolean */ copy){
		// summary: Overriden method to init some of our variables used during the drag operation	
		
		// disable selection while dragging
		dojo.body().onselectstart = function() {
        return false;
    	};
    	dojo.body().unselectable = "on";
		
		lconn.core.dnd.Source.superclass.onDndStart.apply(this, arguments);
		
		// init cache used by onMouseMove
		this._children = dojo.query("> .dojoDndItem", this.parent);
		
		// init threshold 
		this.threshold = 5;
		
		// hide dragged source node/widget		
		nodes[0].style.display = "none";
	},
	
	onMouseDown: function(/* Event */ e){
		// summary: Overriden method to deal with our curstom drag handler
		// description: Cancel the dnd operation if:
		//				1. the underneath node has a drag handler
		//				and 2. the mouse if not over the drag handler
		
		if(!this.current){ return; }
		
		// don't initiate drag operation if the user did not select the drag handle
		var handle = dojo.query(".ibmDndDragHandle", this.current);		
		if (handle.length){			
			if (e.target != handle[0]){
				dojo.publish("/dnd/cancel");
				//dojo.stopEvent(e);
				return;
			}
		}		
		lconn.core.dnd.Source.superclass.onMouseDown.apply(this, arguments);	
	},
	
	onMouseOver: function(/* Event */e){
		// summary: Overriden method to add the "ibmDndDragHandleOver" CSS class 
		//     to the drag handle node when the mouse is over the node
		// description: This is useful to set a specific CSS style to the drag handles (mouse cross for example)
		//		This operation is only done when the user is not dragging a node		
		
		lconn.core.dnd.Source.superclass.onMouseOver.apply(this, arguments);
		
		if (!this.isDragging){
			var handle = dojo.query(".ibmDndDragHandle", this.current);		
			if (handle.length){			
				if (e.target == handle[0]){
					dojo.addClass(e.target, "ibmDndDragHandleOver");
				}
			}	
		}		
	},
	
	onMouseOut: function(/* Event */ e){
		// summary: Overriden method to remove the "ibmDndDragHandleOver" CSS class when needed
		// description: see onMouseOver() description
		
		lconn.core.dnd.Source.superclass.onMouseOut.apply(this, arguments);
		
		var handle = dojo.query(".ibmDndDragHandle", this.current);		
		if (handle.length){			
			if (e.target == handle[0]){
				dojo.removeClass(e.target, "ibmDndDragHandleOver");
			}
		}		
	},	
	
	
	onDndDrop: function(/* dojo.dnd.Source */ source,/* DOM Node array*/ nodes,/* Boolean */ copy){	
		// summary: Overriden method
		// description: - the event "/lconn/core/dnd/drop" is published 
		//				with the params [source container node, destination container node, dragged item node]
			
		// some processing needed before calling the parent method
		var oldCurrent = this.current;
		this.current = this.dropIndicator;
		lconn.core.dnd.Source.superclass.onDndDrop.apply(this, arguments);			
			
		this.current = oldCurrent;
			
		// drop any other element
		if (this.containerState == "Over")
			dojo.publish("/lconn/core/dnd/drop", [source.node, this.node, nodes[0]]);
		
		
		// reenable selection as the dnd operation is done
		dojo.body().onselectstart = null;
    	dojo.body().unselectable = "off";
		
		// SPR #DMCE79MCDA reset can drop flag			
		dojo.dnd.manager().canDropFlag = false;
	},
	
	insertNodes: function(addSelected, data, before, anchor){
		// summary: Overriden method to force to display newly inserted nodes
	
		if(data.length){
			for (var i=0; i<data.length; i++)
				data[i].style.display = "";
		}		
		lconn.core.dnd.Source.superclass.insertNodes.apply(this, arguments);
	},
	
	deleteDropIndicator: function(){
		// summary: Reinit this.dropIndicator
		if (this.dropIndicator && this.dropIndicator.parentNode){
			this.dropIndicator.parentNode.removeChild(this.dropIndicator);
			this.dropIndicator = null;
		}		
		
		this.pos = null;
	},
	
	onDndCancel: function(){	
		// summary: Overriden method to force the dropped node to be displayed
					
		this.deleteDropIndicator();		
		
		if (!this.flagNotHide){
			var m = dojo.dnd.manager();
		
			for(var i=0; i<m.nodes.length; i++)
				m.nodes[i].style.display = "block";
		}
			
		// SPR #DMCE79MCDA reset can drop flag			
		dojo.dnd.manager().canDropFlag = false;	
	
		lconn.core.dnd.Source.superclass.onDndCancel.call(this);		
	},
		
	onOutEvent: function(){
		// summary: Overriden method to init some of our variables when the mouse goes over this container
				
		this.deleteDropIndicator();
		this.flag = true;
		
		lconn.core.dnd.Source.superclass.onOutEvent.call(this);
	},
	
	pos: null,	
	threshold: null,
	mutex: 0,	
	
	onMouseMove: function(/* Event */ e){		
		if (this.mutex != 0) return;
		if(this.isDragging && this.targetState == "Disabled"){ return; }
		dojo.dnd.Source.superclass.onMouseMove.call(this, e);
		var m = dojo.dnd.manager();
		
		
		if(!this.isDragging){
			if(this.mouseDown && this.isSource &&
					(Math.abs(e.pageX - this._lastX) > this.delay || Math.abs(e.pageY - this._lastY) > this.delay)){
				var nodes = this.getSelectedNodes();
				if(nodes.length){
					m.startDrag(this, nodes, this.copyState(dojo.isCopyKey(e), true));
					this.flag = true;	
				}
			}			
		}		
		
		if (this.isDragging) {
		
			// add our threshold for optimizations			
			this.threshold++;
			if (this.threshold >= 5) {
			
				// ok very wierd bug, seems like the firefox javascript engine is not thread safe
				// best we can do 
				
				try {
				
					this.mutex++;
					
					var before = false;
					if (this.current) {
						if (!this.targetBox || this.targetAnchor != this.current) {
							this.targetBox = {
								xy: dojo.coords(this.current, true),
								w: this.current.offsetWidth,
								h: this.current.offsetHeight,
								id: this.current.id
							};
						}
						if (this.horizontal) {
							before = (e.pageX - this.targetBox.xy.x) < (this.targetBox.w / 2);
						}
						else {
							before = (e.pageY - this.targetBox.xy.y) < (this.targetBox.h / 2);
						}
					}
					
					// ADDED drop indicator support	
					// mostly optimizations here so that we only insert a new drop indicator when needed
					if ((e.target != this.dropIndicator))// && ((e.target != this.node || this.flag))){	
					{
						var pos = this.getInsertPosition(e);
						if (!this.pos || pos[0] != this.pos[0] || pos[1] != this.pos[1]) {
							this.deleteDropIndicator();
							this.createDropIndicator();
							
							this.placeIndicator(pos[0], pos[1]);
							this.pos = pos;
						}
					}
					// END ADDED
					
					if (this.current != this.targetAnchor || before != this.before) {
						this._markTargetAnchor(before);
						m.canDrop(!this.current || m.source != this || !(this.current.id in this.selection));
					}
					
				} 
				catch (e) {
				}
				finally {
					this.threshold = 0;
					this.mutex--;
				}
				
			}
		}
		
	}	
});
