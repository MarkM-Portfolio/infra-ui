/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.scenes.AuthorizationScreen");

dojo.require("com.ibm.oneui.layout");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.require("lconn.core.util.html");
dojo.require("lconn.core.SpinnerOverlay");

dojo.require("lconn.oauth.action.Authorize");
dojo.require("lconn.oauth.action.Deny");
dojo.require("lconn.oauth.scenes");
dojo.require("lconn.oauth.scenes.AbstractScene");
dojo.require("lconn.oauth.widget.RevokeInstructions");

dojo.require("com.ibm.lconn.gadget.support.oauthRpcProvider");

(function(window, document) {

   var _ = lconn.oauth.scenes, $ = dojo.byId;

   dojo.declare("lconn.oauth.scenes.AuthorizationScreen", lconn.oauth.scenes.AbstractScene, /** @lends lconn.oauth.scenes.AuthorizationScreen.prototype */ {
      revokeInstructions: null,
      /**
       * Authorization Screen scene
       * @author Claudio Procida <procidac@ie.ibm.com>
       * @constructs
       * @extends lconn.oauth.scenes.AbstractScene
       * @param {App} app Application instance
       */
      constructor: function(app) {
         this._subs = [dojo.subscribe("lconn/oauth/application/authorized", this, this._applicationAuthorized),
                       dojo.subscribe("lconn/oauth/application/denied", this, this._applicationDenied),
                       dojo.subscribe("lconn/oauth/action/completed", this, this._actionCompleted)];
         this._connects = [];
         this._spinnerOverlay = new lconn.core.SpinnerOverlay({
            hasSpinner : true,
            overlaidNode : dojo.byId("loadingSpan")
        }, dojo.byId("loadingSpan"));
      },
      /**
       * Ends this scene
       */
      end: function() {
         this.inherited(arguments);
         dojo.forEach(this._subs, function(sub) { dojo.unsubscribe(sub); });
         dojo.forEach(this._connects, function(conn) { dojo.disconnect(conn); });
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
         var r = this.revokeInstructions = new lconn.oauth.widget.RevokeInstructions(null, authRevokeNode);
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
         this.authAction = new lconn.oauth.action.Authorize(_a, _s, {});
         
         this.authBtn.value = this.authAction.getName();
         this._connects.push(dojo.connect(this.authBtn, "onclick", dojo.hitch(this, this._doAuthorize, this.clientInfo, {})));
         
         this.denyBtn = $("denyBtn");
         this.denyAction = new lconn.oauth.action.Deny(_a, _s, {});
         
         this.denyBtn.value = this.denyAction.getName();
         this._connects.push(dojo.connect(this.denyBtn, "onclick", dojo.hitch(this, this._doDeny, this.clientInfo, {})));
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
         dojo.hitch(this.authAction, this.authAction.execute, item, opt, e)();
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
         dojo.hitch(this.denyAction, this.denyAction.execute, item, opt, e)();
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
         
         dojo.attr(this.authBtn, disabled, disabled);
         dojo.attr(this.denyBtn, disabled, disabled);
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
         var autoParam = lconn.core.url.getRequestParameters(window.location.toString())._oauth_client_auto_authorize;
         if (autoParam === undefined) {
            return;
         }
         
         var providerPromise = com.ibm.lconn.gadget.support.oauthRpcProvider();
         providerPromise.then(function(){
            var providerAPI = new cre$.oauth.Provider();
            // If this point was reached, then auto-auth has failed
            // Send signal programmatically so container shows iframe
            if (autoParam === "true") {
               providerAPI.setStatus(cre$.oauth.Provider.StatusReturns.AUTO_AUTHORIZE_REJECTED);
            }
         });
      },
      /**
       * Handles the {@link event:lconn/oauth/action/completed} event.
       * @param {Object} [obj] The event
       * @private
       */
      _actionCompleted: function(obj) {
         if (obj && obj.messages) {
            if (dojo.isArray(obj.messages)) {
               dojo.forEach(obj.messages, dojo.hitch(this, this._renderMessage));
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
       * Handles the {@link event:lconn/oauth/application/authorized} event.
       * @param {Object} [obj] The event
       * @private
       */
      _applicationAuthorized: function(obj) {
         var _a = this.app, _n = _a.nls.authorize.granted;
         this._applyBlurb(_n);
         this._hideActions();
         
         // Submit form via OAuth provider JS API
         // TODO: wrap this
         if (dojo.isFunction(dojo.getObject('submitForm')) && dojo.exists('oauthFormData')) {
            setTimeout(dojo.partial(dojo.getObject('submitForm'), dojo.getObject('oauthFormData')), dojo.getObject("lconn.oauth.config.authorization.granted_message.duration")||3000);
         }
      },
      /**
       * Handles the {@link event:lconn/oauth/application/denied} event.
       * @param {Object} [obj] The event
       * @private
       */
      _applicationDenied: function(obj) {
         var _a = this.app, _n = _a.nls.authorize.denied;
         this._applyBlurb(_n);
         this._hideInstructions();
         this._hideActions();
         
         setTimeout(dojo.hitch(this, this._deferredDenial), dojo.getObject("lconn.oauth.config.authorization.denied_message.duration")||3000);
      },
      /**
       * Triggers the denial action in a deferred fashion
       * @private
       */
      _deferredDenial: function() {
         
         var providerPromise = com.ibm.lconn.gadget.support.oauthRpcProvider();
         providerPromise.then(function(){
            var providerAPI = new cre$.oauth.Provider();
            providerAPI.setStatus(cre$.oauth.Provider.StatusReturns.AUTHORIZE_REJECTED);
            
            // Close window when in iframe
            if (window.parent !== window.self) {
               try { window.close(); } catch (ignore) {}
            }
         });
      },
      /**
       * Applies the blurb to the authorization screen
       * @param {Object} nls The dictionary of strings
       * @private
       */
      _applyBlurb: function(nls) {
         var _a = this.app, d = _a.document;
         $("authTitle").innerHTML = nls.title;
         lconn.core.util.html.removeChildren($("authBlurb"));
         lconn.core.util.html.substitute(d, $("authBlurb"), nls.blurb, [function() {
               var b = dojo.create("strong");
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
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
