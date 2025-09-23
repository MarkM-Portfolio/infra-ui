/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/dom-style",
		"dojo/on",
		"dojo/query",
		"ic-as/constants/events"
	], function (dojo, array, declare, lang, domAttr, domClass, domConstruct, domStyle, on, query, events) {
	
		/**
		 * Actions that will appear in every news item.
		 * 
		 * @author Robert Campion
		 */
		
		var NewsItemActions = declare("com.ibm.social.as.item.NewsItemActions", null,
		{
			// Dynamic actions list
			actions: [],
			
			postCreate: function(){
				this.inherited(arguments);
				
				// Display actions in the news item
				this.displayActions();
			},
			
			actionSortBy: function(left, right) {
				return left.ordinal - right.ordinal;
			},
			
			/**
			 * Display all enabled actions to the user.
			 */
			displayActions: function(){
				
				var numActions = 0;
				
				array.forEach(query(">li", this.actionListContainer), function(node){
					if(!domClass.contains(node, "lotusHidden") && !domClass.contains(node, "lotusRight")) {
						if(numActions == 0) {
							domClass.add(node, "lotusFirst");
						}
						numActions++;
					}
				});		
				
				var isFirst = (numActions == 0);
				
				
				// Fragment landing node we first add the li's to (saves reflow time)
				var fragment = document.createDocumentFragment();
				
				// call on the news items own action list
				this.displayNewsItemActions(fragment, isFirst);
				
				isFirst = isFirst &&  (fragment.childElementCount == 0);
				
				// sort this.actions by action ordinal
				this.actions.sort(this.actionSortBy);
				// Iterate through all the actions available
				for(var a = 0, len = this.actions.length, count = 0; a < len; a++){
					//set a flag so we know actions exist
					this.hasNewsActions = true;
					isFirst = !this.renderAction(this.actions[a], fragment, isFirst) && isFirst;
				}
				
				if((numActions + fragment.childNodes.length) > 3) {
					var hiddenDiv = domConstruct.create("ul", {"class":"lotusInlinelist"});
					
					// roll our own loop because IE8 can't slice DOM collections
					var lastNode = fragment.childNodes[2-numActions];
					while(lastNode.nextSibling) {
						domAttr.set(lastNode.nextSibling.firstChild, "aria-hidden", "true");
		                domAttr.set(lastNode.nextSibling.firstChild, "tabindex", "-1");
		                domAttr.remove(lastNode.nextSibling.firstChild, "role", "button");
						domConstruct.place(lastNode.nextSibling, hiddenDiv); // move to the hidden div
					}
					domConstruct.place(hiddenDiv, domConstruct.create("li", {"class":"preHorizontalWipe moreActions"}, fragment));
					domClass.remove(this.actionMoreLink, "lotusHidden");
		            if (!this.actionMoreLink.id){
		                this.actionMoreLink.id = "actionMoreLink_"+new Date().getTime();
		            }
				}
				
				// Add the fragment with actions to the container
				domConstruct.place(fragment, this.actionMoreLink, "before");
				fragment = null;
			},
			
			showMoreActions: function(){
				domClass.add(this.actionMoreLink, "lotusHidden");
				var hiddenElems = this.actionMoreLink.previousSibling;
				domClass.add(hiddenElems, "horizontalWipeIn");
				var fixWidth = function(){
					domClass.remove(hiddenElems, "preHorizontalWipe horizontalWipeIn");
				};
				
				window.setTimeout(fixWidth, this.getTransitionDuration(hiddenElems)); // more reliable than transitionend
			
				array.forEach(query("a[aria-hidden='true']", hiddenElems), function(node){
					domAttr.set(node, "aria-hidden", "false");
		            domAttr.set(node, "role", "button");
				});
		
		        topic.publish(events.SHOWMORECLICKED, {recommendationsNode: this.actionMoreLink});
			},
			
			getTransitionDuration: function(elem) {
				var duration = domStyle.get(elem, "transition-duration") || 
				domStyle.get(elem, "OTransitionDuration") ||
				domStyle.get(elem, "-webkit-transition-duration") ||
				domStyle.get(elem, "MozTransitionDuration") || "200ms"; // default
				
				if(duration.indexOf("ms")>-1) {
					duration = parseFloat(duration);
				} else if(duration.indexOf("s")>-1) {
					duration = parseFloat(duration) * 1000;
				} else {
					duration = 0;
				}
				return duration + 20; // add a small delay to be certain the transition is complete
			},
			
			/**
			 * Render an individual Action link based on the action object
			 * and whether or not this is the first action in the list.
			 */
			renderAction: function(action, fragment, isFirst){
				// if isActionDisplayed is not defined, we assume the action link should be displayed
				var display = !!action.isActionDisplayed ? action.isActionDisplayed(this.newsData) : true;
				
				// Check whether or not a specific URL is provided
				var actionHref = (action.actionUrl) ? action.actionUrl : "javascript:;";
				var isJavascriptHref = !!action.actionUrl ? false : true;
				
				// If this action is not disabled
				if(!action.disabled && display){
					// Create the list item. Set up as an live region so the user is notified about
					// any changes to the action text e.g Save this -> Saved
					
					var li = this[action.name + "ItemNode"] = domConstruct.create("li", {
						className: (isFirst ? "lotusFirst" : ""),
						"aria-live": "assertive",
						"aria-relevant": "all"
					}, fragment);
					
					// Catch any error that may happen due to an action not being removed.
					try {
						//Following two lines are included to ensure that the browser does
						//not wrap any action links in the middle. Converting to &nbsp; 
						//makes the string not wrap. The addition of boundary spaces to the
						//start and end ensure a break will occur in the right place.
						//Working ok in FF3.6,11, Chrome, IE7,9
						var actionTextSpaceConverted = action.text.split(' ').join('&nbsp;');
						// Create the action link and append to the li
						this[action.name + "LinkNode"] = domConstruct.create("a", {
							href: actionHref,
							innerHTML: actionTextSpaceConverted,
							role: "button",
							target: (isJavascriptHref ? "_self" : this.linkTarget)
						}, li);
						
						if(isJavascriptHref)
							this[action.name + "onClickConnection"] = this.own(on(this[action.name + "LinkNode"], "click", action.callback));
						
						li = null;
					} catch (e) {
						console.error("Error linking action: " + action.name);
						return false;
					}
				}
				else{
					return false;
				}
				return true;
			},
			
			/**
			 * When displaying Actions call back to this News item for its's
			 * list of openSocial/actionLinks and render the links appropriately
			 */
			displayNewsItemActions: function(fragment, isFirst){
				var actionLinks = this.newsData.getActionLinks();
				if(actionLinks){
					array.forEach(actionLinks, lang.hitch(this, function(item, index){
					   var action = {
							name: "newsAction"+index,
							text: item.caption,
							actionUrl: item.target,
							ordinal: 100
					   };
					   this.renderAction(action, fragment, isFirst);
					   isFirst = false;
					}));
				}
				
			},	
			
			addAction: function(action){
				//Check if the extension already exists
				//TODO: can be removed when extension unload is completed
				for(var a in this.actions){
					if(action.name === this.actions[a].name){	
						return;
					}
				}
				
				this.actions.push(action);
			},
			
			removeAction: function(actionName){
				for(var a = 0, len = this.actions.length; a < len; a++){
					var action = this.actions[a];
					if(action && action.name === actionName){
						this.actions.splice(a, 1);
					}
				}
			},
			
			/**
			 * Change a property's value.
			 * @param actionName {String} identifier
			 * @param actionProp {String} property name
			 * @param actionValue {Object} value to change property to
			 */
			changeActionPropValue: function(actionName, actionProp, actionValue){
				for(var a = 0, len = this.actions.length; a < len; a++){
					var action = this.actions[a];
					if(action.name === actionName){
						action[actionProp] = actionValue;
					}
				}
			},
			
			/**
			 * Enable an action based on its name.
			 * @param actionName {String} identifier
			 */
			enableAction: function(actionName){
				this.changeActionPropValue(actionName, "disabled", false);
			},
			
			/**
			 * Disable an action based on its name.
			 * @param actionName
			 */
			disableAction: function(actionName){
				this.changeActionPropValue(actionName, "disabled", true);
			},
			
			disableSingleActionUI: function(actionName) {
				var actionLinkNode = this[actionName + "LinkNode"];
				if(actionLinkNode) {
					domClass.add(actionLinkNode.parentElement, "activityStreamActionInactive");
					domAttr.set(actionLinkNode, "aria-disabled", "true");
					domAttr.set(actionLinkNode, "href", "javascript:void(0)");
					if (this[actionName + "onClickConnection"]) {
						this.disconnect(this[actionName + "onClickConnection"]);
					}
				}
			},
			
			isActionEnabled: function(actionName){
				for(var a = 0, len = this.actions.length; a < len; a++){
					var action = this.actions[a];
					if(action && action.name === actionName){
						return !action.disabled && ( !!action.isActionDisplayed ? action.isActionDisplayed(this.newsData) : true ); 
					}
				}
				
				return false;
			},
			
			uninitialize: function(){
				this.actions = null;
				domConstruct.destroy(this.actionListContainer);
				this.inherited(arguments);
			}
		});
		
		return NewsItemActions;
	});
