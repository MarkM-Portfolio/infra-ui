/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.MenuUtility");

dojo.require("dijit._base.popup");
dojo.require("com.ibm.oneui.util.openAround");

dojo.declare("lconn.core.MenuUtility", null, {
	/*
	 * @param evt Event that triggered the menu. May be null as long as openedBy is passed
	 * @param menuId DOM id or dijit.Menu object
	 * @param openedBy Explicit DOM node to orient the menu around. If it is null or undefined, the event target will be used instead
	 * @param opt Map of other options controlling display. May be null or undefined.
	 */
	openMenu: function (evt, menuId, openedBy, opt) {
		dojo.deprecated("lconn.core.MenuUtility", "Use com.ibm.oneui.util.openAround", "3.5");
		if (evt)
			evt = dojo.fixEvent(evt);
		com.ibm.oneui.util.openAround(menuId, openedBy, opt, evt);
	},

	openMenuA11y: function (evt, menuId){
		dojo.deprecated("lconn.core.MenuUtility", "Use com.ibm.oneui.util.openAround, this is handled by standard onclick events", "3.5");
		// for keyboard a11y
		if (evt.keyCode == dojo.keys.ENTER){
			this.openMenu(evt, menuId);
		} 
	}});
 
// one instance per page
menuUtility = new lconn.core.MenuUtility();

// NEW: supports easy binding by callers - dojo.connect(a, "onclick", dojo.partial(lconn.core.menuUtility, menu));
lconn.core.MenuUtility.open = function(menuId, e) {
	dojo.deprecated("lconn.core.MenuUtility", "Use com.ibm.oneui.util.openAround", "3.5");
   menuUtility.openMenu(e, menuId);
}

/*
 * Open the menu oriented around the given DOM element
 * @param menuId DOM id or dijit.Menu object
 * @param openedBy Explicit DOM node to orient the menu around.
 * @param opt Map of other options controlling display. May be null or undefined.
 */
lconn.core.MenuUtility.openAround = function(menuId, openedBy, opt) {
	dojo.deprecated("lconn.core.MenuUtility", "Use com.ibm.oneui.util.openAround", "3.5");
   menuUtility.openMenu(null, menuId, openedBy, opt);
}

/*
 * Attach click and keypress listeners to the given link element.
 * @param menu dijit.Menu object to open
 * @param link DOM link element to attach click and keypress listeners to
 * @param handler Callback invoked when the link is clicked or down-arrow is pressed. If not defined, defaults to MenuUtility.openAround().
 * @param openOnSpace - (optional) to indicate that menu should also open on SPACE key (default: false)
 */
lconn.core.MenuUtility.attachListeners = function(menu, link, handler, openOnSpace) {
   //dojo.deprecated("lconn.core.MenuUtility", "Use com.ibm.social.layout.widget.ActionBar", "3.5");
   // Set up a default handler that makes sense
   var handler = handler || dojo.partial(lconn.core.MenuUtility.openAround, menu, link);

   // Hook up click events to show the menu
   dojo.connect(link, "onclick", handler);
   
   // Just before clicking, detect if the menu is currently open. If it is, set a flag so we can avoid immediately re-opening the menu.
   dojo.connect(link, "onmousedown", function() {
      menu.preventReopen = menu.isShowingNow || menu.wasShowing;
      menu.wasShowing = false;
   });
   
   // Hook up a keylistener to show the menu on down-arrow and space (if requested)
   dojo.connect(link, "onkeypress", function(e) {
      menu.wasShowing = menu.preventReopen = false;
      if ((e.charOrCode == dojo.keys.DOWN_ARROW)
          || (e.charCode == dojo.keys.SPACE && openOnSpace)) {
         dojo.stopEvent(e);
         handler();
      }
   });
   
   // Null out DOM reference to avoid memory leaks
   link = null;
};
