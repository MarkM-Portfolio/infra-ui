/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
define([
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/_base/window",
      "dojo/dom-construct",
      "dojo/topic",
      "../../app/scenes",
      "../../app/scenes/AbstractScene",
      "../../config",
      "../../config/properties",
      "../../config/services",
      "../action/RestoreDefaults",
      "../action/Save",
      "../api",
      "../config",
      "../widget/GlobalizationPreferences",
      "../../url"
],
   function(array, declare, lang, windowModule, domConstruct, topic, scenes, AbstractScene, config, properties, services, RestoreDefaults, Save, api, coreGlobalizationConfig, GlobalizationPreferences, url) {

      /**
       * Globalization scenes
       * 
       * @namespace ic-core.globalization.scenes
       */

      var _ = scenes, _c = coreGlobalizationConfig, _p = api, _t = properties;

      // This is our internal private interface
      var _i = {};

      var Preferences = declare("lconn.core.globalization.scenes.Preferences", AbstractScene, /** @lends ic-core.globalization.scenes.Preferences.prototype */
      {
         /**
          * Constructs the scene object
          * 
          * @class Globalization preferences scene
          * @extends ic-core.app.scenes.AbstractScene
          * @constructs
          * @author Claudio Procida <procidac@ie.ibm.com>
          */
         constructor : function(app) {
            this._sub = topic.subscribe("ic-core/action/completed", lang.hitch(this, this._actionCompleted));
         },
         end : function() {
            this.inherited(arguments);
            this._sub.remove();
         },
         render : function() {
            var _a = this.app, _s = _a.scene;
            var _m = _a.nls, _n = _m.globalization;
            _.applyConnectionsTemplate(_a, {
               cols : "C"
            });
            _.applyTitleBarTabs(_a, this.getTabs(), {
               a11y_navLabel : _n.a11y.titlebar_label,
               refreshPageAriaLabel : _n.lotusBar.refeshPageAriaLabel
            });
            _a.document.title = _n.windowtitle;
            _.applyHeader(_a, {
               heading : _n.heading,
               details : _c.languageEnabled ? _n.details : _n.details_nolanguage
            });
            dijit.setWaiState(windowModule.body(), 'label', _n.a11y.body_label);

            new GlobalizationPreferences({
               disableLanguage : !_c.languageEnabled, // Disable language picker
               // for now
               strings : _m.preferences,
               helpStrings : _m.help,
               actions : [
                     new Save(_a, _s),
                     new RestoreDefaults(_a, _s)
               ],
               bidi : _p.isBidiEnabled(),
               calendar : _p.getCalendar(),
               direction : _p.getTextDirection()
            }, domConstruct.create("div", {}, _s.content));
         },
         begin : function() {
            this.render();
         },
         getTabs : function() {
            // TODO: centralize logic for Settings tabs
            var _a = this.app, _n = _a.nls.globalization;
            var ret = [ {
               title : _n.titlebar.tab3,
               href : "javascript:;",
               selected : true
            }
            ];
            var _o = services.oauth;
            if (_o && _t["com.ibm.lconn.oauth.ui.enabled"] !== "false") {
               ret.unshift({
                  title : _n.titlebar.tab2,
                  // TODO: move to lconn.core.app.AbstractRoutes
                  href : url.getServiceUrl(_o).toString() + '/apps'
               });
            }
            var _u = services.news;
            if (_u && config.enableEmail) {
               ret.unshift({
                  title : _n.titlebar.tab1,
                  // TODO: move to lconn.core.app.AbstractRoutes
                  href : url.getServiceUrl(_u).toString()
               });
               if(window.ui && typeof window.ui._check_ui_enabled === 'function' && window.ui._check_ui_enabled()) {
                  ret.unshift({
                     title : _n.titlebar.tab0,
                     href : url.getServiceUrl(_u).toString() + '/defaulthomepage'
                  });
               }
           }
           return ret;
         },
         _actionCompleted : function(obj) {
            if (lang.isArray(obj.messages))
               array.forEach(obj.messages, lang.hitch(this, this._renderMessage));
            else
               this._renderMessage(obj.messages);
         }
      });

      return Preferences;
   });
