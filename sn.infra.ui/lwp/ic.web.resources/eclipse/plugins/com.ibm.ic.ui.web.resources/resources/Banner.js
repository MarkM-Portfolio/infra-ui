/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/i18n!ic-core/nls/strings",
   "dojo/_base/declare",
   "dojo/i18n",
   "dojo/dom-class",
   "dojo/dom-attr",
   "dojo/_base/lang",
   "dojo/on",
   "dojo/text!./templates/Banner.html",
   "dojo/topic",
   "dijit/_Templated",
   "dijit/_Widget",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/header",
   "ic-core/help"
], function (dojo, i18nresources, declare, i18n, domClass, domAttr, lang, on, template, topic, _Templated, _Widget, config, services, header, helpModule/*, xdloader*/) {

   function _h(el) {
      if (el) {
         domClass.add(el, 'lotusHidden');
      }
   }
   function _u(el) {
      if (el) {
         domClass.remove(el, 'lotusHidden');
      }
   }

   /**
    * Connections banner
    * 
    * @class ic-ui.Banner
    * @extends dijit._Widget
    * @extends dijit._Templated
    */
   var Banner = declare("lconn.core.widget.Banner", [
         _Widget,
         _Templated
   ], /** @lends ic-ui.Banner.prototype */
   {
      strings : i18nresources,
      /**
       * @property {String} The current application
       */
      appName : 'homepage',
      templateString : template,
      widgetsInTemplate: true,
      // Maps menus to services
      menuServiceMap : {
         homepage : 'homepage',
         profiles : 'profiles',
         communities : 'communities',
         mail : 'connectionsmail',
         calendar : 'connectionsmail',
         help : 'help'
      },
      // Maps menus to mega menu servlets
      megaMenuMap : {
         profiles : 'people.jsp',
         communities : 'communities.jsp',
         apps : 'apps.jsp',
         mail : 'mail.jsp',
         calendar : 'calendar.jsp'
      },
      postCreate : function() {
         var menuSelected = false;
         for ( var key in this.menuServiceMap) {
            // Hide menus for services that are not enabled
            if (!services[this.menuServiceMap[key]])
               _h(this[key + 'Menu']);
            // Select menu for current app
            if (key === this.appName) {
               menuSelected = true;
               domClass.add(this[key + 'Menu'], 'lotusSelected');
            }
            else
               domClass.remove(this[key + 'Menu'], 'lotusSelected');
         }
         // If no app menu was selected, select the Apps menu
         if (!menuSelected)
            domClass.add(this.appsMenu, 'lotusSelected');

         // Attach mega menus event handlers
         for ( var key in this.megaMenuMap) {
            var menu = this[key + 'MenuLink'];
            domAttr.set(menu, 'src', this.megaMenuMap[key]);
            this.own(on(menu, 'onmouseover', lang.hitch(header, header.menuMouseover, menu)));
            this.own(on(menu, 'onfocus', lang.hitch(header, header.menuFocus, menu)));
            this.own(on(menu, 'onclick', lang.hitch(header, header.menuClick, menu)));
         }
         // Attach help menu event handler
         this.own(on(this.helpMenuLink, 'onclick', 'onHelp'));
         // Attach share button event handler
         this.own(on(this.shareMenuLink, 'onclick', 'onShare'));
      },
      /**
       * Invoked when the Share button is clicked, shows the global sharebox
       * dialog. Override this method to customize the behavior of the Share
       * button
       * 
       * @param {Event}
       *           e The mouse event
       */
      onShare : function(e) {
         e.preventDefault(), e.stopPropagation();
         // xdloader.load_async("com.ibm.social.sharebox.dialog", function()
         // {
         // com.ibm.social.sharebox.show();
         //         });
      },
      /**
       * Invoked when the Help menu is clicked, shows the product help. Override this method
       * to customize the behavior of the help menu. 
       * @param {Event} e The mouse event
       */
      onHelp : function(e) {
         e.preventDefault(), e.stopPropagation();
         helpModule.launchHelp();
      }
   });

   return Banner;
});
