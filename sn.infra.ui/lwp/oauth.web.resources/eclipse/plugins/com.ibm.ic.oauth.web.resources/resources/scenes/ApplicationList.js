/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/array",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-construct",
   "dojo/request",
   "dojo/topic",
   "ic-ui/Grid",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/globalization/config",
   "ic-core/url",
   "../action/RevokeToken",
   "../scenes",
   "./AbstractScene",
   "../widget/ApplicationListGridRenderer"
], function (array, declare, lang, domConstruct, request, topic, Grid, config, services, coreGlobalizationConfig, urlModule, RevokeToken, scenes, AbstractScene, ApplicationListGridRenderer) {

   var _ = scenes;

   /**
    * Filters and rolls up the list of clients.
    * Auto authorized clients are hidden by default, unless the URL param <code>autoAuth</code> is set to <code>true</code>.
    * Clients authorized several times appearing multiple times in the list are rolled up.
    * @function filterAndRollupClients
    * @memberof ic-oauth.scenes.ApplicationList
    * @param {Scene} scene Scene
    * @param {Array} list List of clients
    * @private
    */
   function filterAndRollupClients(scene, list) {
      var _c = {}, r = array.filter(list, function(i) {
         // Filter out null elements, see CRE#30958
         if (i === null ||
               // Filter out authorization_code tokens
               i.subType === "authorization_code" ||
               // Filter out auto-authorized clients
               (i.autoAuthzCapable === true && !scene.params.autoAuth)) {
            return false;
         }
         var c = _c[i.clientId];
         // Synthesize a new property (we'll need this in a moment)
         i.expiresAt = i.createdAt + i.lifetimeSeconds * 1E3;
         if (c) {
            // Set createdAt to earliest among tokens for same client
            if (c.createdAt > i.createdAt) {
               c.createdAt = i.createdAt;
            }
            // Set lifetime to longest among tokens for same client
            if (c.expiresAt < i.expiresAt) {
               c.expiresAt = i.expiresAt;
               c.lifetimeSeconds = (c.expiresAt - c.createdAt) / 1E3;
            }
            // We don't want duplicates
            return false;
         }
         _c[i.clientId] = i;
         return true;
      });
      return r;
   }

   var ApplicationList = declare("lconn.oauth.scenes.ApplicationList", AbstractScene, /** @lends ic-oauth.scenes.ApplicationList.prototype */ {
      /**
       * Application List scene
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @constructs
       * @param {App} [app] Application instance
       * @extends ic-oauth.scenes.AbstractScene
       */
      constructor: function(app) {
         this._sub = topic.subscribe("ic-oauth/action/completed", lang.hitch(this, this._actionCompleted));
      },
      /**
       * Ends this scene
       */
      end: function() {
         this.inherited(arguments);
         this._sub.remove();
      },
      /**
       * Renders this scene
       */
      render: function() {
         var _a = this.app, _s = _a.scene;
         var _n = _a.nls.applications;
         _.applyConnectionsTemplate(_a, {cols: "C"});
         _.applyTitleBarTabs(_a, this.getTabs(), {a11y_navLabel: _n.a11y.titlebar_label, refreshPageAriaLabel: _n.lotusBar.refeshPageAriaLabel});
         _a.document.title = _n.windowtitle;
         _.applyHeader(_a, {
            heading: _n.heading,
            details: _n.details
         });

         // Create list
         var ln = domConstruct.create("div", {
            id: "list"
         }, _s.content);
         var gridRenderer = new ApplicationListGridRenderer({
            getSortInfo: lang.hitch(this, this.getSortInfo),
            nls: _a.nls.grid.applications,
            revokeAction: new RevokeToken(_a, _s, {})
         });
         var filterList = lang.partial(filterAndRollupClients, _s);
         var list = _s.list = new Grid({
            renderer: gridRenderer,
            url: _a.routes.getAuthzFeedServiceUrl(),
            _loadFromUrl: function() {
               request(this.url, {method: "GET", handleAs: "json" }).then(lang.hitch(this, function(r,i) {
                     if (r instanceof Error) {
                        var e = {
                           error: true,
                           message: _n.error
                        };
                        this._updateWithError(e);
                        return;
                     }
                     var f = filterList(r);
                     this.update({json: f, fromUrl: true});
                  }));
            }
         }, ln);
         list.update();
      },
      /**
       * Kicks off this scene
       */
      begin: function() {
         this.render();
      },
      /**
       * Returns a list of tabs for this scene's titlebar
       * @returns a list of tabs for this scene's titlebar
       */
      getTabs: function() {
         // TODO: centralize logic for Settings tabs
         var _a = this.app, _n = _a.nls;
         var ret = [{
            title: _n.applications.titlebar.tab2,
            href: "#",
            selected: true
         }];
         var _u = services.news;
         if (_u && config.enableEmail) {
            ret.unshift({
                title: _n.applications.titlebar.tab1,
                href: urlModule.getServiceUrl(_u).toString()
            });
            if(window.ui && typeof window.ui._check_ui_enabled === 'function' && window.ui._check_ui_enabled()) {
               ret.unshift({
                  title: _n.applications.titlebar.tab0,
                  href: urlModule.getServiceUrl(_u).toString() + '/defaulthomepage'
               });
            }
         }
         var _d = services.deploymentConfig;
         if (_d && coreGlobalizationConfig.areSettingsEnabled()) {
            ret.push({
                title: _n.applications.titlebar.tab3,
                href: urlModule.getServiceUrl(_d).toString() + '/settings/globalization'
            });
         }
         return ret;
      },
      /**
       * Returns sort info for this scene's list
       * @returns sort info for this scene's list
       */
      getSortInfo: function() {
        var _a = this.app, _s = _a.nls.sorts;
        return {
            list: [{title: _s.application_name},
                   {title: _s.authorization_date},
                   {title: _s.expiration_date},
                   {title: _s.action}]
        };
      },
      /**
       * Handles the event {@link event:ic-oauth/action/completed} by rendering a message with the result and refreshing the list.
       * @private
       */
      _actionCompleted: function(obj) {
         if (lang.isArray(obj.messages)) {
            array.forEach(obj.messages, lang.hitch(this, this._renderMessage));
         }
         else {
            this._renderMessage(obj.messages);
         }
         this.list.refresh();
      }
   });

   return ApplicationList;
});
