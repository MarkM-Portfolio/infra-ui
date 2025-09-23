/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/query",
	"dojo/topic"
], function (dojo, lang, dom, domAttr, domClass, query, topic) {

	(function() {
		/**
		 * This class manages tab transitions for the person card and handles initializing the tabs as necessary.
		 * 
		 * It requires as input the following JS objects from the window:
		 * 
		 * 	userInfo: 
		 * 		an object containing info about the current person, passed to each tab
		 *  contentChanged: 
		 *  	a function to invoke when content on the page has changed (when the physical 
		 *  	dimensions of the page have changed).
		 *  contentChanging: 
		 *  	a function to invoke prior to changing the content on the page.  Gives slightly 
		 *  	better visuals by hiding scroll bars until after a resize
		 *  setWindowCloseable: 
		 *  	a function invoked to indicate that the window should not be allowed to close
		 *  
		 */
			
		var tabs = [];
		var context = {
			contentChanged: window.contentChanged,
			contentChanging: window.contentChanging,
			setCloseable: window.setWindowCloseable,
			user: window.userInfo 
		};
		var selectedTab;
		
		function addTab(el) {
			var impl = domAttr.get(el, "dojoType");
			if (impl) {
				var tab = {
					id: el.id,
					impl: impl,
					linkNode: el
				};
				tabs.push(tab);
			}
		}
		
		function changeTab(id) {
			var tab;
			for (var i=0,l=tabs.length; i<l; i++) {
				var nextTab = tabs[i];
				if (id == nextTab.id) {
					tab = nextTab;
					break;
				}
			}
					
			if (!tab)
				return;
			context.contentChanging();
			var widget = tab.widget;
			if (!widget) {
				var node = dom.byId("extra-info");
				var f = lang.getObject(tab.impl);
				widget = tab.widget = new f({
						id: ("tab_"+id),
						context: context,
						config: (window.tabConfig || {})[id]
					});
				tab.containerNode = node.appendChild(widget.domNode);
			}
			if (selectedTab) {
				selectedTab.containerNode.style.display = "none";
				domClass.remove(selectedTab.linkNode, "link-selected");
				var oldWidget = selectedTab.widget;
				if (oldWidget.onInactive) oldWidget.onInactive();
			}
			selectedTab = tab;
			domClass.add(selectedTab.linkNode, "link-selected");
			selectedTab.containerNode.style.display = "";
			if (widget.onActive) widget.onActive();
			context.contentChanged();
		}
		
		query(".person-actions A").forEach(addTab);
		topic.subscribe("/card/section/change", changeTab);
		dojo.addOnLoad(function() {
			var args = window._actArgs;
			window._actArgs = null;
			if (args) {
				var el = dom.byId(args[0]);
				if (el) {
					var img = el.firstChild;
					if (img._oldClassName)
						img.className = img._oldClassName;
				}
				changeTab.apply(null, args);
			}
		});
	})();
	return com.ibm.social.personcard.tabs;
});
