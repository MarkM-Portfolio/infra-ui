/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.scenes.ApplicationList");

dojo.require("com.ibm.oneui.layout");
dojo.require("com.ibm.oneui.controls.Grid");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.require("lconn.oauth.scenes");
dojo.require("lconn.oauth.scenes.AbstractScene");
dojo.require("lconn.oauth.widget.ApplicationListGridRenderer");
dojo.require("lconn.oauth.action.RevokeToken");

dojo.require("lconn.core.config");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");

dojo.require("lconn.core.globalization.config");

(function(window, document) {

   var _ = lconn.oauth.scenes;

   /**
    * Filters and rolls up the list of clients.
    * Auto authorized clients are hidden by default, unless the URL param <code>autoAuth</code> is set to <code>true</code>.
    * Clients authorized several times appearing multiple times in the list are rolled up.
    * @function filterAndRollupClients
    * @memberof lconn.oauth.scenes.ApplicationList
    * @param {Scene} scene Scene
    * @param {Array} list List of clients
    * @private
    */
   function filterAndRollupClients(scene, list) {
      var _c = {}, r = dojo.filter(list, function(i) {
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

   dojo.declare("lconn.oauth.scenes.ApplicationList", lconn.oauth.scenes.AbstractScene, /** @lends lconn.oauth.scenes.ApplicationList.prototype */ {
      /**
       * Application List scene
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @constructs
       * @param {App} [app] Application instance
       * @extends lconn.oauth.scenes.AbstractScene
       */
      constructor: function(app) {
         this._sub = dojo.subscribe("lconn/oauth/action/completed", this, this._actionCompleted);
      },
      /**
       * Ends this scene
       */
      end: function() {
         this.inherited(arguments);
         dojo.unsubscribe(this._sub);
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
         var ln = dojo.create("div", {
            id: "list"
         }, _s.content);
         var gridRenderer = new lconn.oauth.widget.ApplicationListGridRenderer({
            getSortInfo: dojo.hitch(this, this.getSortInfo),
            nls: _a.nls.grid.applications,
            revokeAction: new lconn.oauth.action.RevokeToken(_a, _s, {})
         });
         var filterList = dojo.partial(filterAndRollupClients, _s);
         var list = _s.list = new com.ibm.oneui.controls.Grid({
            renderer: gridRenderer,
            url: _a.routes.getAuthzFeedServiceUrl(),
            _loadFromUrl: function() {
               dojo.xhrGet({
                  url: this.url,
                  handleAs: "json",
                  handle: dojo.hitch(this, function(r,i) {
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
                  })
               });
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
         var _u = lconn.core.config.services.news;
         if (_u && lconn.core.config.enableEmail) {
            ret.unshift({
                title: _n.applications.titlebar.tab1,
                href: lconn.core.url.getServiceUrl(_u).toString()
            });
         }
         var _d = lconn.core.config.services.deploymentConfig;
         if (_d && lconn.core.globalization.config.areSettingsEnabled()) {
            ret.push({
                title: _n.applications.titlebar.tab3,
                href: lconn.core.url.getServiceUrl(_d).toString() + '/settings/globalization'
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
       * Handles the event {@link event:lconn/oauth/action/completed} by rendering a message with the result and refreshing the list.
       * @private
       */
      _actionCompleted: function(obj) {
         if (dojo.isArray(obj.messages)) {
            dojo.forEach(obj.messages, dojo.hitch(this, this._renderMessage));
         }
         else {
            this._renderMessage(obj.messages);
         }
         this.list.refresh();
      }
   });
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
