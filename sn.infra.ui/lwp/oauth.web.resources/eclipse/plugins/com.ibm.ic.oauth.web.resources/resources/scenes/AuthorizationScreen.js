/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/dom-construct",
   "dojo/_base/array",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom",
   "dojo/dom-attr",
   "dojo/on",
   "dojo/topic",
   "ic-core/SpinnerOverlay",
   "ic-ui/MessageBox",
   "ic-ui/layout",
//   "com/ibm/lconn/gadget/support/oauthRpcProvider",
   "ic-core/url",
   "ic-core/util/html",
   "../action/Authorize",
   "../action/Deny",
   "../scenes",
   "./AbstractScene",
   "../widget/RevokeInstructions"
], function (dojo, domConstruct, array, declare, lang, dom, domAttr, on, topic, SpinnerOverlay, MessageBox, layout, /*oauthRpcProvider,*/ url, html, AuthorizeModule, Deny, scenes, AbstractScene, RevokeInstructions) {

   var _ = scenes, $ = dom.byId;

   var AuthorizationScreen = declare("lconn.oauth.scenes.AuthorizationScreen", AbstractScene, /** @lends ic-oauth.scenes.AuthorizationScreen.prototype */ {
      revokeInstructions: null,
      /**
       * Authorization Screen scene
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @constructs
       * @extends ic-oauth.scenes.AbstractScene
       * @param {App} app Application instance
       */
      constructor: function(app) {
         this._subs = [topic.subscribe("ic-oauth/application/authorized", lang.hitch(this, this._applicationAuthorized)),
                       topic.subscribe("ic-oauth/application/denied", lang.hitch(this, this._applicationDenied)),
                       topic.subscribe("ic-oauth/action/completed", lang.hitch(this, this._actionCompleted))];
         this._connects = [];
         this._spinnerOverlay = new SpinnerOverlay({
            hasSpinner : true,
            overlaidNode : dom.byId("loadingSpan")
        }, dom.byId("loadingSpan"));
      },
      /**
       * Ends this scene
       */
      end: function() {
         this.inherited(arguments);
         array.forEach(this._subs, function(sub) { sub.remove(); });
         array.forEach(this._connects, function(conn) { conn.remove(); });
         this._spinnerOverlay.destroy();
         this._spinnerOverlay = null;
      },
      /**
       * Renders this scene
       */
      render: function() {
         var _a = this.app, _s = _a.scene;
         var _n = _a.nls.authorize;
         
         // Hide banner when in an iframe
         if (window.parent !== window.self) {
            _.hide($("authBanner"));
         }
         // Get a handle to the message container
         _s.messages = $("messageContainer");
         
         // TODO:
         //_.applyLoginTemplate(_a, {noBanner: window.parent !== window.self});
         
         // TODO: widgetize
         var clientName = $("clientName");
         if (clientName) {
            var clientInfo = this.clientInfo = _a.getClientInfo();
            if (clientInfo) {
               clientName.innerHTML = clientInfo.getName();
            }
         }
         
         var authRevokeNode = $("authRevokeInstructions");
         var r = this.revokeInstructions = new RevokeInstructions(null, authRevokeNode);
         r.update({
            url: _a.routes.getApplicationAccessUrl(),
            strings: {
               blurb: _n.revoke.description,
               link: _n.revoke.link,
               link_title: _n.revoke.link
            }
         });
         
         this._applyActions();
      },
      /**
       * Applies actions to the buttons (Authorize and Deny) in this scene.
       * @private
       */
      _applyActions: function() {
         var _a = this.app, _s = _a.scene;
         
         this.authBtn = $("authBtn");
         this.authAction = new AuthorizeModule(_a, _s, {});
         
         this.authBtn.value = this.authAction.getName();
         this._connects.push(on(this.authBtn, "click", lang.hitch(this, this._doAuthorize, this.clientInfo, {})));
         
         this.denyBtn = $("denyBtn");
         this.denyAction = new Deny(_a, _s, {});
         
         this.denyBtn.value = this.denyAction.getName();
         this._connects.push(on(this.denyBtn, "click", lang.hitch(this, this._doDeny, this.clientInfo, {})));
      },
      /**
       * Performs the authorization action.
       * @param {Object} item The client
       * @param {Object} opt Options
       * @param {Event} e Event
       * @private
       */
      _doAuthorize: function(item, opt, e) {
         this._disableActions();
         lang.hitch(this.authAction, this.authAction.execute, item, opt, e)();
      },
      /**
       * Performs the denial action.
       * @param {Object} item The client
       * @param {Object} opt Options
       * @param {Event} e Event
       * @private
       */
      _doDeny: function(item, opt, e) {
         this._disableActions();
         lang.hitch(this.denyAction, this.denyAction.execute, item, opt, e)();
      },
      /**
       * Disables this scene's actions.
       * @private
       */
      _disableActions: function() {
         this._spinnerOverlay.showSpinner();
         this._spinnerOverlay.loadingText_AP.style.display = "none";
         this._spinnerOverlay.root_AP.className = "SpinnerOverlay lconnOAuthLoading";
         dojo.removeAttr(this._spinnerOverlay.root_AP, "style");
         
         var disabled = "disabled";
         var btnDisabled = "lotusBtn lotusBtnDisabled";
         
         domAttr.set(this.authBtn, disabled, disabled);
         domAttr.set(this.denyBtn, disabled, disabled);
         this.authBtn.className = btnDisabled;
         this.denyBtn.className = btnDisabled;
      },
      /**
       * Kicks off this scene
       */
      begin: function() {
         this.initAutoOAuth();
         this.render();
      },
      /**
       * Initiates the auto authorization flow. Auto authorization bypasses the user's consent for trusted clients, e.g. the IBM Connections Embedded Experience gadget.
       */
      initAutoOAuth: function() {
         var autoParam = url.getRequestParameters(window.location.toString())._oauth_client_auto_authorize;
         if (autoParam === undefined) {
            return;
         }
         
//            var providerPromise = oauthRpcProvider();
//            providerPromise.then(function(){
//               var providerAPI = new cre$.oauth.Provider();
//               // If this point was reached, then auto-auth has failed
//               // Send signal programmatically so container shows iframe
//               if (autoParam === "true") {
//                  providerAPI.setStatus(cre$.oauth.Provider.StatusReturns.AUTO_AUTHORIZE_REJECTED);
//               }
//            });
      },
      /**
       * Handles the {@link event:ic-oauth/action/completed} event.
       * @param {Object} [obj] The event
       * @private
       */
      _actionCompleted: function(obj) {
         if (obj && obj.messages) {
            if (lang.isArray(obj.messages)) {
               array.forEach(obj.messages, lang.hitch(this, this._renderMessage));
            } else {
               this._renderMessage(obj.messages);
            }
         }
        
         this._spinnerOverlay.hideSpinner();
         var btnEnabled = "lotusBtn lotusBtnSpecial";
         
         dojo.removeAttr(this.authBtn, "disabled");
         dojo.removeAttr(this.denyBtn, "disabled");
         this.authBtn.className = btnEnabled;
         this.denyBtn.className = btnEnabled;
         
      },
      /**
       * Handles the {@link event:ic-oauth/application/authorized} event.
       * @param {Object} [obj] The event
       * @private
       */
      _applicationAuthorized: function(obj) {
         var _a = this.app, _n = _a.nls.authorize.granted;
         this._applyBlurb(_n);
         this._hideActions();
         
         // Submit form via OAuth provider JS API
         // TODO: wrap this
         if (lang.isFunction(lang.getObject('submitForm')) && dojo.exists('oauthFormData')) {
            setTimeout(lang.partial(lang.getObject('submitForm'), lang.getObject('oauthFormData')), lang.getObject("lconn.oauth.config.authorization.granted_message.duration")||3000);
         }
      },
      /**
       * Handles the {@link event:ic-oauth/application/denied} event.
       * @param {Object} [obj] The event
       * @private
       */
      _applicationDenied: function(obj) {
         var _a = this.app, _n = _a.nls.authorize.denied;
         this._applyBlurb(_n);
         this._hideInstructions();
         this._hideActions();
         
         setTimeout(lang.hitch(this, this._deferredDenial), lang.getObject("lconn.oauth.config.authorization.denied_message.duration")||3000);
      },
      /**
       * Triggers the denial action in a deferred fashion
       * @private
       */
      _deferredDenial: function() {
         return;
         
//            var providerPromise = oauthRpcProvider();
//            providerPromise.then(function(){
//               var providerAPI = new cre$.oauth.Provider();
//               providerAPI.setStatus(cre$.oauth.Provider.StatusReturns.AUTHORIZE_REJECTED);
//               
//               // Close window when in iframe
//               if (window.parent !== window.self) {
//                  try { window.close(); } catch (ignore) {}
//               }
//            });
      },
      /**
       * Applies the blurb to the authorization screen
       * @param {Object} nls The dictionary of strings
       * @private
       */
      _applyBlurb: function(nls) {
         var _a = this.app, d = _a.document;
         $("authTitle").innerHTML = nls.title;
         html.removeChildren($("authBlurb"));
         html.substitute(d, $("authBlurb"), nls.blurb, [function() {
               var b = domConstruct.create("strong");
               b.appendChild(d.createTextNode(_a.getClientInfo().getName()));
               return b;
            }]);
      },
      /**
       * Hides this screen's actions
       * @private
       */
      _hideActions: function() {
         _.hide($("btnContainer"));
      },
      /**
       * Hides this screen's instructions
       * @private
       */
      _hideInstructions: function() {
         _.hide($("authRevokeInstructions"));
      }
   });

   return AuthorizationScreen;
});
