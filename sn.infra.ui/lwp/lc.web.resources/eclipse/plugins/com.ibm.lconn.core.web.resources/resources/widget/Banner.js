/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

(function(){
dojo.provide("lconn.core.widget.Banner");

dojo.require("dijit._Templated");
dojo.require("dijit._Widget");

dojo.require("lconn.core.config.services");
dojo.require("lconn.core.header");
dojo.require("lconn.core.help");
dojo.require("net.jazz.ajax.xdloader");

dojo.require("lconn.search.searchPanel.SearchPaneManager");

dojo.requireLocalization('lconn.core', 'resources');

function _h(el) { if(el) { dojo.addClass(el, 'lotusHidden'); }}
function _u(el) { if(el) { dojo.removeClass(el, 'lotusHidden'); }}

/**
 * Connections banner
 * @class lconn.core.widget.Banner
 * @extends dijit._Widget
 * @extends dijit._Templated
 */
dojo.declare("lconn.core.widget.Banner", [dijit._Widget, dijit._Templated], /** @lends lconn.core.widget.Banner.prototype */ {
   strings: dojo.i18n.getLocalization('lconn.core', 'resources'),
   /**
    * @property {String} The current application
    */
   appName: 'homepage',
   widgetsInTemplate: true,
   templatePath: dojo.moduleUrl('lconn.core', 'widget/templates/Banner.html'),
   // Maps menus to services
   menuServiceMap: {
      homepage: 'homepage',
      profiles: 'profiles',
      communities: 'communities',
      mail: 'connectionsmail',
      calendar: 'connectionsmail',
      help: 'help'
   },
   // Maps menus to mega menu servlets
   megaMenuMap: {
      profiles: 'people.jsp',
      communities: 'communities.jsp',
      apps: 'apps.jsp',
      mail: 'mail.jsp',
      calendar: 'calendar.jsp'
   },
   postCreate: function() {
      var menuSelected = false;
      for (var key in this.menuServiceMap) {
         // Hide menus for services that are not enabled 
         if (!lconn.core.config.services[this.menuServiceMap[key]])
            _h(this[key+'Menu']);
         // Select menu for current app 
         if (key === this.appName) {
            menuSelected = true;
            dojo.addClass(this[key+'Menu'], 'lotusSelected');
         }
         else
            dojo.removeClass(this[key+'Menu'], 'lotusSelected');
      }
      // If no app menu was selected, select the Apps menu
      if (!menuSelected)
         dojo.addClass(this.appsMenu, 'lotusSelected');
      
      // Attach mega menus event handlers
      for (var key in this.megaMenuMap) {
         var menu = this[key+'MenuLink'];
         dojo.attr(menu, 'src', this.megaMenuMap[key]);
         this.connect(menu, 'onmouseover', dojo.hitch(lconn.core.header, lconn.core.header.menuMouseover, menu));
         this.connect(menu, 'onfocus', dojo.hitch(lconn.core.header, lconn.core.header.menuFocus, menu));
         this.connect(menu, 'onclick', dojo.hitch(lconn.core.header, lconn.core.header.menuClick, menu));
      }
      // Attach help menu event handler
      this.connect(this.helpMenuLink, 'onclick', 'onHelp');
      // Attach share button event handler
      this.connect(this.shareMenuLink, 'onclick', 'onShare');
   },
   /**
    * Invoked when the Share button is clicked, shows the global sharebox dialog. Override this
    * method to customize the behavior of the Share button
    * @param {Event} e The mouse event
    */
   onShare: function(e) {
      dojo.stopEvent(e);
      net.jazz.ajax.xdloader.load_async("com.ibm.social.sharebox.dialog", function() {
         com.ibm.social.sharebox.show();
      });
   },
   /**
    * Invoked when the Help menu is clicked, shows the product help. Override this method
    * to customize the behavior of the help menu. 
    * @param {Event} e The mouse event
    */
   onHelp: function(e) {
      dojo.stopEvent(e);
      lconn.core.help.launchHelp();
   }
});

})();
