/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/on",
	"dojo/topic",
	"dijit/Menu",
	"dijit/MenuItem",
	"dijit/_Widget"
], function (dojo, lang, Deferred, array, declare, domAttr, domClass, on, topic, Menu, MenuItem, _Widget) {

/*
	 * Widget that renders a Follow menu with a list of items, implementing the
	 * Follow UX.
	 * <p>
	 * The widget reacts to dojo topics published by the Communities bizcard when
	 * the user is following the community and enables or disables all component
	 * provided items. The bizcard will look for the menu by its id, which is fixed,
	 * and append an item to follow / unfollow the Community.
	 * <p>
	 * In applications with two levels of following, e.g. Activities, implementors
	 * will instantiate the widget by mixing in an array with a single element, that
	 * tells the widget how to follow / unfollow the container.
	 * <p>
	 * In applications with three levels of following, i.e. Wikis and Forums,
	 * implementors will instantiate the widget by passing an array of two items,
	 * the first related to the content, i.e. the page, the second related to the
	 * container, i.e. the wiki.
	 * <p>
	 * Communities bizcard will issue topics when community is followed or
	 * unfollowed. Items will be initialized as enabled, and will be optionally
	 * disabled when bizcard is loaded. If the user unfollows the community from the
	 * contained app, items will be re-enabled again.
	 * 
	 * <h2>Usage:</h2>
	 * 
	 * <ol>
	 * <li>
	 * 
	 * Create a OneUI dropdown button with this markup. It is responsibility of the
	 * owner to provide NLS resources for this markup, i.e. the title for the link,
	 * ARIA labels and the 'Following Actions' label. Note that OneUI requires that
	 * a space be added between the label and the dropdown arrow.
	 * 
	 * <pre>
	 * &lt;span class=&quot;lotusBtn&quot; role=&quot;button&quot; aria-haspopup=&quot;true&quot; aria-owns=&quot;followDropDownMenu&quot;&gt;
	 *    &lt;a href=&quot;javascript:;&quot; title=&quot;show menu&quot;&gt;
	 *       Following Actions
	 *       &lt;img class=&quot;lotusArrow lotusDropDownSprite&quot; src=&quot;images/blank.gif&quot; alt=&quot;&quot; aria-label=&quot;show menu&quot; /&gt;
	 *       &lt;span class=&quot;lotusAltText&quot;&gt; ▼&lt;/span&gt;
	 *    &lt;/a&gt;
	 * &lt;/span&gt;
	 * </pre>
	 * 
	 * </li>
	 * <li>
	 * 
	 * Create an array of items for actions in the menu, e.g. Wikis would create
	 * these for a use case where the user is following the wiki, and the action to
	 * follow the page must appear disabled.
	 * <p>
	 * See below for an explanation of required and optional properties of items of
	 * this array.
	 * 
	 * <pre>
	 * var items = [{
	 *    _strings: {
	 *       ON_LABEL: &quot;Stop Following this Page&quot;,
	 *       OFF_LABEL: &quot;Follow this Page&quot;,
	 *       DISABLED_LABEL: &quot;Wiki page updates are included with the wiki updates.&quot;
	 *    },
	 *    on: true,
	 *    enabled: false,
	 *    activate: function() { ... return deferred; },
	 *    deactivate: function() { ... return deferred; }
	 * },
	 * {
	 *    _strings: {
	 *       ON_LABEL: &quot;Stop Following this Wiki&quot;,
	 *       OFF_LABEL: &quot;Follow this Wiki&quot;,
	 *       DISABLED_LABEL: &quot;Wiki updates are included with the community updates.&quot;
	 *    },
	 *    on: true,
	 *    activate: function() { ... return deferred; },
	 *    deactivate: function() { ... return deferred; }
	 * }];
	 * </pre>
	 * 
	 * </li>
	 * <li>
	 * 
	 * Instantiate the FollowMenu widget attaching it to the &lt;a&gt; element
	 * created above
	 * 
	 * <pre>
	 * var followMenu = new FollowMenu({
	 *    items : items
	 * }, a);
	 * </pre>
	 * 
	 * </li>
	 * </ol>
	 * 
	 * <h2>Customization:</h2>
	 * 
	 * The widget offers you the chance to specify a custom wrapper class for action
	 * items other than {@link ic-core._FollowMenuItem}, should you implement
	 * functionality specific to your own application's framework.
	 * <p>
	 * Override the value of wrapperClass with the name of the Dojo class you want
	 * to use for wrappers. The wrapper class must implement all public properties
	 * and methods of {@link ic-core._FollowMenuItem}, i.e. those whose name
	 * doesn't start with an underscore ('_').
	 * 
	 * 
	 * <h2>Caveats:</h2>
	 * The widget assumes the items will appear in the menu from the lowest-level
	 * one to the highest-level one, as per UX designs.
	 * <p>
	 * This assumption is used in order to enable / disable actions related to items
	 * at a lower level. For implementors, this means that the item to follow
	 * content must be declared *before* the item to follow the container etc., i.e.
	 * the item to follow the page must appear in the list before the item to follow
	 * the wiki. If you do not comply with this requirement and pass action items in
	 * a random order things won't work as expected.
	 * <p>
	 * All error handling is delegated to implementors. The FollowMenu widget will
	 * simply call the activate() and deactivate() methods specified during
	 * instantiation, which are assumed to return dojo.Deferred's. It is your
	 * responsibility to handle error conditions and throw an exception from
	 * activate() / deactivate() if the action fails. The widget will restore the
	 * previous state of the item accordingly when the deferred fails or any of
	 * activate() / deactivate() raise an exception.
	 * <p>
	 * The widget must react to dojo topics published by the Communities bizcard,
	 * which will also look for the menu to append an item to follow / unfollow the
	 * community, therefore the FollowMenu must be instantiated before the bizcard.
	 * 
	 * @class ic-core.FollowMenu
	 * @author Claudio Procida <procidac@ie.ibm.com>
	 * 
	 */
	var FollowMenu = declare("lconn.core.FollowMenu", _Widget, /** @lends ic-core.FollowMenu.prototype */ {
	
	   /** Stores the return values of dojo.subscribe(), required for dojo.unsubscribe() */
	   _subscriptions: [],
	   /** Set to true to disable actions for contained items when following the community */
	   disableContained: false,
	   /** The menu will disable all component provided items when this topic is published */
	   FOLLOW_TOPIC: "lconn.comm.commFollowed",
	   /** The menu will enable all component provided items when this topic is published */
	   UNFOLLOW_TOPIC: "lconn.comm.commUnFollowed",
	   /** The menu will be assigned this id in order to be detected by the Communities bizcard */
	   menuId: "followDropDownMenu",
	
	   /**
	    * Instantiate the widget by mixing in an array of elements to initialize
	    * the list of actions in the menu.
	    * Elements must have the following structure:
	    */
	   items: [
	      /** @lends ic-core.FollowMenu.prototype.items */ {
	         /**
	          * Required members
	          */
	         _strings: {
	            /** Label displayed when the user is not following the item */
	            OFF_LABEL: "Follow this <Item>",
	            /** Label displayed when the user is following the item */
	            ON_LABEL: "Stop Following this <Item>",
	            /** Label displayed when the user is following the upper level item */
	            DISABLED_LABEL: "<Item> updates are included with the <Container> updates."
	         },
	         /** Is the item enabled? Set to true if container is not followed, false if container is followed */
	         enabled: true|false,
	
	         /**
	          * Executed when the item is activated, i.e. when the user decides to follow the item
	          * Must return a dojo.Deferred
	          */
	         activate: function() { return new Deferred(); },
	         /**
	          * Executed when the item is deactivated, i.e. when the user decides to unfollow the item
	          * Must return a dojo.Deferred
	          */
	         deactivate: function() { return new Deferred(); },
	
	         /**
	          * Optional members
	          */
	
	         /** Initial state of the item. Set to true if item is already followed, defaults to false */
	         on: true|false
	      }],
	   _menuItems: [],
	
	   /** Implementors can specify a different class for the opaque wrappers of items */
	   wrapperClass: "core._FollowMenuItem",
	
	   /** Set to false if you do not disable menuItems when following the container except community */
	   disableMenuItemsContained: true,
	
	   postMixInProperties: function(opts) {
	      /** Will throw an exception if items do not make sense */
	      this._validateItems();
	      /** Subscribe to community topic */
	      if (this.disableContained) {
	         this._subscriptions.push(topic.subscribe(this.FOLLOW_TOPIC, lang.hitch(this, this._handleFollowCommunityTopic)));
	         this._subscriptions.push(topic.subscribe(this.UNFOLLOW_TOPIC, lang.hitch(this, this._handleUnfollowCommunityTopic)));
	      }
	   },
	
	   buildRendering: function() {
	      var d = document;
	      this.domNode = this.srcNodeRef;
	
	      this.menu = new Menu({
	         id: this.menuId
	      });
	      domClass.add(this.menu.domNode, "lotusPlain");
	
	      array.forEach(this.items, lang.hitch(this, function(item, i) {
	         /** Construct opaque wrapper */
	         var constr = lang.getObject(this.wrapperClass);
	         var _item = new constr(item);
	
	         /** Build menu item */
	         var menuItem = new MenuItem({
	            label: _item.label,
	            _item: _item,
	            disabled: !_item.enabled
	         });
	         on(menuItem, "Click", lang.hitch(_item, _item.execute));
	         if (this.disableMenuItemsContained) {
	             on(_item, "Activate", lang.hitch(this, this._toggleMenuItems, false, i));
	             on(_item, "Deactivate", lang.hitch(this, this._toggleMenuItems, true, i));
	         }
	         if (_item.setMenuItem) {
	            _item.setMenuItem(menuItem);
	         }
	         this._menuItems.push(menuItem);
	
	         /** Add menu item to menu */
	         this.menu.addChild(menuItem);
	      }));
	
	      /** Append span with menu's widget-id to destroy (for Share framework) */
	      var span = this.domNode.appendChild(d.createElement("span"));
	      span.style.display = "none";
	      span.setAttribute("widgetid", this.menu.id);
	
	      on(this.domNode, "click", lang.partial(function(menu, a, e) {
	         try {
	            var opt = {
	                  orient: (dojo._isBodyLtr() ? {'BR':'TR', 'BL':'TL', 'TR':'BR','TL':'BL'} : {'BL':'TL', 'BR':'TR', 'TL':'BL', 'TR':'BR'})
	            };
	            menuUtility.openMenu(e, menu.id, a, opt);
	            e.preventDefault(), e.stopPropagation();
	         } catch (e) {
	            console.log(e);
	         }
	      }, this.menu, this.domNode));
	   },
	
	   destroy: function(preserveDom) {
	      /** Unsubscribe from community topic */
	      array.forEach(this._subscriptions, lang.hitch(dojo, dojo.unsubscribe));
	      this._subscriptions = [];
	      if (this.menu) this.menu.destroyRecursive(preserveDom);
	      this.menu = null;
	      this.inherited(arguments);
	   },
	
	   /**
	    * Handles the topic emitted by the community card when the user activates the Follow Community action
	    * @private
	    */
	   _handleFollowCommunityTopic: function(opts) {
	      this._handleCommunityTopic(false);
	   },
	   /**
	    * Handles the topic emitted by the community card when the user activates the Unfollow Community action
	    * @private
	    */
	   _handleUnfollowCommunityTopic: function(opts) {
	      this._handleCommunityTopic(true);
	   },
	   /**
	    * Handles the community topic. Internal implementation
	    * @private
	    */
	   _handleCommunityTopic: function(enabled) {
	      array.forEach(this._menuItems, lang.partial(function(enabled, menuItem) {
	         menuItem._item.setEnabled(enabled);
	      }, enabled));
	   },
	
	   _toggleMenuItems: function(enabled, n) {
	      array.forEach(this._menuItems, function(menuItem, i) {
	         /** Act upon items above the one that has been activated */
	         if (i >= n) return;
	         menuItem._item.setEnabled(enabled);
	      });
	   },
	
	   /**
	    * Validates items. Will throw an exception if items do not comply with the Follow UX spec, i.e.
	    * if the implementor has specified a list of items where the user is following the container and
	    * the action to follow content is not disabled.
	    */
	   _validateItems: function() {
	      var mustDisable = false;
	      for (var i = this.items.length - 1; i >= 0; i--) {
	         if (!mustDisable && this.items[i].on) {
	            mustDisable = true;
	            continue;
	         }
	         if (mustDisable && this.items[i].enabled) {
	            throw "Invalid items array. When following a container, the action to follow content must be disabled";
	         }
	      }
	   }
	});
	
	/**
	 * Private impl of opaque item wrapper for {@link ic-core.FollowMenu}
	 * If you need to specialize behavior, define your own class
	 * and set its name as _class property of the item (see above).
	 *
	 * @private
	 * @class ic-core._FollowMenuItem
	 */
	declare("lconn.core._FollowMenuItem", null, /** @lends ic-core._FollowMenuItem.prototype */ {
	   /** Default enabled */
	   enabled: true,
	   /** Menu item associated to this model item */
	   menuItem: null,
	
	   constructor: function(opts) {
	      dojo.safeMixin(this, opts || {});
	      this.label = this.enabled ?
	            this.isOn() ? this._strings.ON_LABEL : this._strings.OFF_LABEL : this._strings.DISABLED_LABEL;
	   },
	
	   /**
	    * Returns true if the item is toggled on
	    * @returns {boolean} true if the item is toggled on
	    */
	   isOn: function() {
	      return this.on;
	   },
	
	   /** Mix-in a concrete implementation of this method to follow the item */
	   activate: function() {
	      console.warn("Implementors must override activate()");
	      var deferred = new Deferred();
	      setTimeout(function(){deferred.callback();}, 100);
	      return deferred;
	   },
	
	   /** Mix-in a concrete implementation of this method to unfollow the item */
	   deactivate: function() {
	      console.warn("Implementors must override deactivate()");
	      var deferred = new Deferred();
	      setTimeout(function(){deferred.callback();}, 100);
	      return deferred;
	   },
	
	   /**
	    * Executes the associated action
	    * @param {Event} e The event
	    */
	   execute: function(e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      // No-op if disabled
	      if (!this.enabled) return;
	
	      try {
	         if (this.isOn()) {
	            var d = this.deactivate();
	            d.addCallback(lang.hitch(this, this.onDeactivate));
	            d.addErrback(lang.hitch(this, this.onerror));
	            this.on = false;
	         } else {
	            var d = this.activate();
	            d.addCallback(lang.hitch(this, this.onActivate));
	            d.addErrback(lang.hitch(this, this.onerror));
	            this.on = true;
	         }
	      } catch (e) {
	         console.error("core.FollowMenu: exception: " + e);
	      } finally {
	         this._updateLabel();
	      }
	   },
	
	   onerror: function() {
	      this.on = !this.on;
	      this._updateLabel();
	      this.onError();
	   },
	
	   onActivate: function() {},
	   onDeactivate: function() {},
	   onError: function() {},
	
	   setEnabled: function(enabled) {
	      this.enabled = enabled;
	      this._updateLabel();
	   },
	
	   /** Offers the item a chance to act upon or store a reference to the menu item */
	   setMenuItem: function(menuItem) {
	      this.menuItem = menuItem;
	      // this is probably redundant
	      this._updateLabel();
	   },
	
	   _updateLabel: function() {
	      this.label = this.enabled ?
	            this.isOn() ? this._strings.ON_LABEL : this._strings.OFF_LABEL : this._strings.DISABLED_LABEL;
	      if (this.menuItem) {
	         domAttr.set(this.menuItem, "label", this.label);
	         this.menuItem.set("disabled", !this.enabled);
	      }
	   }
	});
	
	return FollowMenu;
});
