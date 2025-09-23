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
	"dojo/_base/declare",
	"./_Helper"
], function (declare, _Helper) {

	/**
	 * ARIA helper class that implements the Tab Panel pattern.
	 * See {@link http://www.w3.org/TR/wai-aria-practices/#tabpanel|WAI-ARIA 1.0 Authoring Practices} for more details.
	 * 
	 * <h3>Usage</h3>
	 * Instantiate by passing the container node with role='tablist' as first argument.
	 * Second argument is a dictionary of mix-in properties
	 * 
	 * <h3>Behavior</h3>
	 * The tab panel is a single tab stop. Focus is given to the active tab first, then use arrow keys to move focus to other tabs.
	 * Tabs are activated as they're focused.
	 * 
	 * @see {coreui.aria._Helper}
	 * @class ic-ui.aria.TabPanel
	 * @extends ic-ui.aria._Helper 
	 */
	var TabPanel = declare("com.ibm.oneui.aria.TabPanel", _Helper, /** @lends ic-ui.aria.TabPanel.prototype */ {
	   /** WAI role of the container node to which the helper will be attached. Will throw exception if source node doesn't have this role */
	   containerRole: "tablist",
	   /** WAI role of active items that are descendants of the source node */
	   itemRole: "tab",
	   /**
	    * Assigns focus to next item, generally as a result of a key event
	    * @override Activates the focused item as per tab panel requirements
	    */
	   focusNextItem: function() {
	      var si = this.selIdx;
	      this.inherited(arguments);
	      this._selectItem(si);
	   },
	   /**
	    * Assigns focus to previous item, generally as a result of a key event
	    * @override Activates the focused item as per tab panel requirements
	    */
	   focusPrevItem: function() {
	      var si = this.selIdx;
	      this.inherited(arguments);
	      this._selectItem(si);
	   },
	   /**
	    * Calculates index of next item that will receive focus, then if different
	    * from current one, moves current one out of tabbing order, pushes new one in,
	    * focuses and activates it, and reassigns value of selIdx
	    * @private
	    * @param {Number} si Desired selected index
	    */
	   _selectItem: function(si) {
	      var ai = this.allItems;
	      if (si != this.selIdx) {
	         dijit.setWaiState(ai[si], "selected", "false");
	         dijit.setWaiState(ai[this.selIdx], "selected", "true");
	         this._activate(ai[this.selIdx]);
	      }
	   },
	   /**
	    * Return true if the tab is selected
	    * @private
	    * @param {Object} item The tab
	    */
	   _isSelected: function(item) {
	      return dijit.getWaiState(item, "selected") === "true";
	   },
	   /**
	    * Activates an item by firing a click event
	    * @private
	    * @param {Object} item The tab
	    */
	   _activate: function(item) {
	      try {
	         if (document.createEvent) {
	            var evt = document.createEvent("HTMLEvents");
	            evt.initEvent("click", false, true);
	            item.dispatchEvent(evt);
	         } else { // IE
	            item.fireEvent("onclick");
	         } 
	      } catch (e) {
	         console.error([this.declaredClass, ": ", e].join(""));
	      }
	   }
	});
	return TabPanel;
});
