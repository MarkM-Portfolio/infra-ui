/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/array",
   "dojo/i18n!ic-ui/nls/MessageBox",
   "dojo/_base/lang",
   "dojo/dom",
   "dojo/i18n",
   "dojo/dom-class",
   "dojo/on",
   "ic-ui/MessageBox",
   "ic-ui/layout",
   "ic-core/util/html"
], function (dojo, array, i18nMessageBox, lang, dom, i18n, domClass, on, MessageBox, layout, html) {

   var AFTER = "after", BEFORE = "before";
   var _l = layout, _m = i18nMessageBox;

   function _hasCol(col, cols) { return cols.toUpperCase().indexOf(col.toUpperCase()) !== -1; }
   function _h(el) { if (el) domClass.add(el, "lotusHidden"); }
   function _u(el) { if (el) domClass.remove(el, "lotusHidden"); }
   function _c(a, obj, href, method) {
      a.href = href;
      if (!a._registered) {
         var tgt = a.getAttribute("target");
      if (method)
         on(a, "click", lang.hitch(obj, method));
      else if (method === false || (tgt && tgt.toUpperCase() != "_SELF"))
            a.ignore = true;
         a._registered = true;
      }
   }
   function _applyConnectionsLinks(a) {
      if (a.href) {
         if (/login_app_replace$/.test(a.href))
         _c(a, this, this.getUrl(), this.login);
      else if (/logout_app_replace$/.test(a.href))
         _c(a, this, this.routes.getHomeUrl(), lang.partial(this.logout, this.routes.getHomeUrl()));
      else if (/help_app_replace$/.test(a.href))
         _c(a, this, "javascript:;", this.activateHelp);
      else if (!a.getAttribute("onclick"))
            _c(a, this, a.href);
      }
   }

   /**
    * Application Scenes toolkit
    * @namespace ic-core.app.scenes
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var scenes = /** @lends ic-core.app.scenes */ {
      /**
       * Renders the Connections template
       * @param {App} app Application instance
       * @param {Object} [opt] Options
       */
      applyConnectionsTemplate: function(app, opt) {
         var d = app.document;
         var _s = app.scene;
         var _n = {};
         opt = opt || {};
         // Hide loading screen
         _h(dom.byId("lconnApplicationLoading"));
         // Show header and footer
         _u(_n.banner = dom.byId("lotusBanner"));
         _u(_n.footer = dom.byId("lotusFooter"));
         _l.applyBasicTemplate(_s.frame = dom.byId("lotusFrame"), _n, opt);
         // Apply Connections templated links
         array.forEach([_n.banner, _n.footer], function(el) {
            if(!el._appliedConnectionsLinks) {
               array.forEach(el.getElementsByTagName("A"), _applyConnectionsLinks, app);
               el._appliedConnectionsLinks = true;
            }
         });
         // Mix nodes into scene
         lang.mixin(_s, _n);
         if (opt.cols) {
            if (!_hasCol("L", opt.cols))
               _h(_s.colLeft);
            if (!_hasCol("R", opt.cols))
               _h(_s.colRight);
         }
      },
      /**
       * Renders the login template
       * @param {App} app Application instance
       * @param {Object} [opt] Options
       */
      applyLoginTemplate: function(app, opt) {
         var d = app.document;
         var _s = app.scene;
         var _n = {};
         // Hide loading screen
         _h(dom.byId("lconnApplicationLoading"));
         _.applyLoginTemplate(_s.frame = dom.byId("lconnLogin"), _n, opt);
         // Mix nodes into scene
         lang.mixin(_s, _n);
      },
      /**
       * Renders the titlebar
       * @param {App} app Application instance
       * @param {Object} [opt] Options
       */
      applyTitleBar: function(app, opt) {
         var _s = app.scene;
         if (!_s.titlebar)
            throw "Must apply Connections template first";
         var _n = {};
        _l.applyTitleBar(_s.titlebar, _n, {title: opt.title, appIcon: opt.appIcon});
      },
      /**
       * Renders the titlebar with tabs
       * @param {App} app Application instance
       * @param {Array} tabs The tabs
       * @param {Object} [opt] Options
       */
      applyTitleBarTabs: function(app, tabs, opt) {
         var _s = app.scene;
         var _nls = app.nls.applications
         if (!_s.titlebar)
            throw "Must apply Connections template first";
         var _n = {};
        _l.applyTitleBarTabs(_s.titlebar, _n, tabs, opt, _nls);
      },
      /**
       * Renders the header
       * @param {App} app Application instance
       * @param {Object} [opt] Options
       */
      applyHeader: function(app, opt) {
         var _s = app.scene;
         var _n = {main: _s.main};
         _l.applyHeader(_s.content, _n, {heading: opt.heading, details: opt.details});
         _s.header = _n.header;
      },
      /**
       * Renders a message
       * @param {App} app Application instance
       * @param {Object} m The message object
       */
      renderMessage: function(app, m) {
         var _n = app.nls, _s = app.scene;
         var _t = MessageBox.TYPE.INFO, _l = (_n.messagebox||{}).info || _m.INFO;
         if (m.error) {
            _t = MessageBox.TYPE.ERROR;
            _l = (_n.messagebox||{}).error || _m.ERROR;
         } else if (m.warning) {
            _t = MessageBox.TYPE.WARNING;
            _l = (_n.messagebox||{}).warning || _m.WARNING;
         } else if (m.success) {
            _t = MessageBox.TYPE.SUCCESS;
            _l = (_n.messagebox||{}).success || _m.SUCCESS;
         }
         this.clearMessages(app);
         new MessageBox({
            _strings: _l,
            msg: m.message,
            type: _t
         }, _s && _s.messages);
      },
      /**
       * Clears messages
       * @param {App} app Application instance
       */
      clearMessages: function(app) {
         var _s = app.scene;
         if (_s && _s.messages) {
            html.removeChildren(_s.messages);
         }
      },
      /**
       * Applies a generic OneUI warning message
       * @param {App} app Application instance
       * @param {String} msg Warning message
       */
      applyGenericWarning: function(app, msg) {
         this.renderMessage(app, {warning:true, message:msg||app.nls.warning||"Uh oh!"});
      },
      /**
       * Applies a generic OneUI error message
       * @param {App} app Application instance
       * @param {String} msg Error message
       */
      applyGenericError: function(app, msg) {
         this.renderMessage(app, {error:true, message:msg||app.nls.error||"It wasn't me!"});
      },
      /**
       * Unhides an element
       * @function
       * @param {Node} el Element
       */
      show: _u,
      /**
       * Hides an element
       * @function
       * @param {Node} el Element
       */
      hide: _h
   };

   return scenes;
});
