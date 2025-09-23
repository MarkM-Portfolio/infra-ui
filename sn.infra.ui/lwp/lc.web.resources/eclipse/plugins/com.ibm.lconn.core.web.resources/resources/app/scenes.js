/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.app.scenes");

dojo.require("lconn.core.util.html");

dojo.require("com.ibm.oneui.layout");
dojo.require("com.ibm.oneui.controls.MessageBox");
dojo.requireLocalization("com.ibm.oneui.controls", "MessageBox");

(function(window, document) {
   var AFTER = "after", BEFORE = "before";
   var _l = com.ibm.oneui.layout, _m = dojo.i18n.getLocalization("com.ibm.oneui.controls", "MessageBox");

   function _hasCol(col, cols) { return cols.toUpperCase().indexOf(col.toUpperCase()) !== -1; }
   function _h(el) { if (el) dojo.addClass(el, "lotusHidden"); }
   function _u(el) { if (el) dojo.removeClass(el, "lotusHidden"); }
   function _c(a, obj, href, method) {
      a.href = href;
      if (!a._registered) {
         var tgt = a.getAttribute("target");
         if (method)
            dojo.connect(a, "onclick", obj, method);
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
            _c(a, this, this.routes.getHomeUrl(), dojo.partial(this.logout, this.routes.getHomeUrl()));
         else if (/help_app_replace$/.test(a.href))
            _c(a, this, "javascript:;", this.activateHelp);
         else if (!a.getAttribute("onclick")) 
            _c(a, this, a.href);
      }
   }
   
   /**
    * Application Scenes toolkit
    * @namespace lconn.core.app.scenes
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   lconn.core.app.scenes = /** @lends lconn.core.app.scenes */ {
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
         _h(dojo.byId("lconnApplicationLoading"));
         // Show header and footer
         _u(_n.banner = dojo.byId("lotusBanner"));
         _u(_n.footer = dojo.byId("lotusFooter"));
         _l.applyBasicTemplate(_s.frame = dojo.byId("lotusFrame"), _n, opt);
         // Apply Connections templated links
         dojo.forEach([_n.banner, _n.footer], function(el) {
            if(!el._appliedConnectionsLinks) {
               dojo.forEach(el.getElementsByTagName("A"), _applyConnectionsLinks, app);
               el._appliedConnectionsLinks = true;
            }
         });
         // Mix nodes into scene
         dojo.mixin(_s, _n);
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
         _h(dojo.byId("lconnApplicationLoading"));
         _.applyLoginTemplate(_s.frame = dojo.byId("lconnLogin"), _n, opt);
         // Mix nodes into scene
         dojo.mixin(_s, _n);
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
         if (!_s.titlebar)
            throw "Must apply Connections template first";
         var _n = {};      
        _l.applyTitleBarTabs(_s.titlebar, _n, tabs, opt);
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
         var _t = com.ibm.oneui.controls.MessageBox.TYPE.INFO, _l = (_n.messagebox||{}).info || _m.INFO;
         if (m.error) {
            _t = com.ibm.oneui.controls.MessageBox.TYPE.ERROR;
            _l = (_n.messagebox||{}).error || _m.ERROR;
         } else if (m.warning) {
            _t = com.ibm.oneui.controls.MessageBox.TYPE.WARNING;
            _l = (_n.messagebox||{}).warning || _m.WARNING;
         } else if (m.success) {
            _t = com.ibm.oneui.controls.MessageBox.TYPE.SUCCESS;
            _l = (_n.messagebox||{}).success || _m.SUCCESS;
         }
         this.clearMessages(app);
         new com.ibm.oneui.controls.MessageBox({
            _strings: _l,
            msg: m.message,
            type: _t
         }, _s.messages);
      },
      /**
       * Clears messages
       * @param {App} app Application instance
       */
      clearMessages: function(app) {
         var _s = app.scene;
         lconn.core.util.html.removeChildren(_s.messages);
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
}(window, document));
