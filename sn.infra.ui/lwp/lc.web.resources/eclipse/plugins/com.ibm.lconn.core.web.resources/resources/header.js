/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2010, 2021                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {

   dojo.provide("lconn.core.header");
   dojo.require("lconn.core.theme");
   dojo.require("lconn.core.widget.MenuLauncher");
   dojo.require("com.ibm.lconn.layout.people");
   dojo.require("com.ibm.oneui.controls.MessageBox");
   dojo.require("lconn.core.globalization.bidiUtil");
   dojo.require("lconn.core.config.features");
   dojo.require("lconn.core.auth");
   
   /**
    * We defer initializing the dojo widgets for the menu until a menu is
    * focused or hovered. These methods assume that all parameters needed to
    * declare a header menu are statically defined on the link. The only
    * required attribute is 'src' which is the URL to access to load the
    * contents of the menu (see dijit.Dialog and the href parameter for more
    * information on how header menus are loaded).
    * <p>
    * Example:
    * 
    * <pre>
    * &lt;a onmouseover=&quot;lconn.core.header.menuMouseover(this);&quot; 
    *    onclick=&quot;lconn.core.header.menuClick(this);&quot; 
    *    onfocus=&quot;lconn.core.header.menuFocus(this);&quot; 
    *    src=&quot;/url/to/apps/menu&quot;
    *    href=&quot;javascript:;&quot;&gt;Apps  ▼&lt;/a&gt;
    * </pre>
    * 
    * @namespace lconn.core.header
    */
   dojo.mixin(dojo.getObject("lconn.core.header", true), /** @lends lconn.core.header */
   {
      initMenu : function(a, type) {
         a._init = true;

         var id = dojo.attr(a, "_lconn_menuid");
         a.removeAttribute('_lconn_menuid');

         var launcher = new lconn.core.header.MenuLauncher({
            menuHref : dojo.attr(a, "src"),
            menuId : id,
            dialogTitle : dojo.attr(a, "aria-label"),
            focusNode : a,
            errorMessageText : dojo.attr(a, "errormessage")
         }, a.parentNode);
         launcher[type]();
      },
      menuFocus : function(a) {
         if (!a._init)
            this.initMenu(a, "onFocus");
      },
      menuClick : function(a) {
         if (!a._init)
            this.initMenu(a, "onClick");
      },
      menuMouseover : function(a) {
         if (!a._init)
            this.initMenu(a, "onMouseEnter");
      },
      enableLanguageSelector : function(node, languages, cookieName, cookieDomain, cookieTimeout) {
         // use dj.require to ensure that LanguageSelector and lconn.core.url
         // are
         // not forcibly loaded
         
         var has = lconn.core.config.features;
         if(has("ui-language-setting")){
          return;  
         }
         
         var dj = dojo;

         var properties = {
            path : "\/"
         };

         var timeout = cookieTimeout == -1 ? 0 : (cookieTimeout / 86400);
         if (timeout > 0)
            properties.expires = timeout;

         var domain = cookieDomain;
         if (domain && domain != ".") {
            properties.domain = domain;
         }

         node = dojo.byId(node);
         if (!node) {
            console.log("language selector node not present in header or footer");
            return;
         }

         try {
            dj.require("lconn.core.LanguageSelector");

            var next = node.nextSibling;
            while (next) {
               if (next.nodeType == 1)
                  dojo.removeClass(next, "lotusFirst");
               next = next.nextSibling;
            }
            node.innerHTML = "<a id='headerLanguageSelectorMenu' href='javascript:;' role='button' aria-haspopup='true'></a>";
            node.style.display = "";

            new lconn.core.LanguageSelector(node.firstChild, languages, cookieName, properties);
         }
         catch (e) {
            console.error("lconn/core/LanguageSelector.js unavailable ");
            console.error(e);
         }
      },
      /**
       * Decorates the banner with extra elements available to authenticated
       * users. Used by Blogs, Bookmarks and Forums to decorate the banner for
       * authenticated users after the anonymous landing page loads.
       * 
       * @param {Object}
       *           user The user object.
       */
      decorateUser : function(user, urls, strings) {
         // Do nothing if the user is not set
         if (!user || !user.id || !user.displayName)
            return;

         // Add user picture to banner
         var hun = dojo.query("#headerUserName img")[0];
         if (hun) {
            var img = com.ibm.lconn.layout.people.createImage({
               userid : user.id,
               name : user.displayName
            }, 26);
            if (img)
               dojo.place(img, hun, "replace");
            else {
               // Graceful degradation when there's no profile provider in place
               dojo.addClass(hun, "otherPeople24 otherPeople24-NoPhotoPerson24");
               hun.src = dojo.config.blankGif;
            }
         }
         var lp = dojo.byId("lotusPerson");
         if (lp) {
            dojo.removeClass(lp, "lotusHidden");
            // FIXME: gen4 styles sets more specific rule with display:block
            dojo.style(lp, "display", "");
         }
         dojo.attr("headerUserName", "src", dojo.string.substitute(urls.user_jsp, {
            username : user.displayName,
            userId : user.id
         }));

         // FIXME: the sharebox attach point should not be in the DOM for
         // anonymous
         // users
         var hs = dojo.byId("headerSharebox");
         if (hs) {
            dojo.removeClass(hs, "lotusHidden");
            // FIXME: gen4 styles sets more specific rule with display:block
            dojo.style(hs, "display", "");
         }

         var ll = dojo.byId("logoutLink");
         if (ll) {
            ll.replaceChild(document.createTextNode(strings.logout), ll.firstChild);
            // This is tricky, extract to function
            ll.href = urls.logout;
            dojo.addClass(ll, "lotusHidden");
            // FIXME: gen4 styles sets more specific rule with display:block
            ll.style.display = "none";
         }

         dojo.query("li", dojo.byId("headerMenuContainer")).forEach(function(el) {
            if (el.previousSibling)
               dojo.removeClass(el, "lotusFirst");
         });

         var lbcl = dojo.byId("lotusBannerCommunitiesLink");
         if (lbcl) {
            var menu = dijit.byId(dojo.attr(lbcl, "aria-owns"));
            var href = urls.communities_jsp;
            if (menu)
               menu.attr("href", href);
            else
               dojo.attr(lbcl, "src", href);
         }
         lconn.core.header.apps.updateBannerByRoles();
      },
      switchTheme : lconn.core.theme.switchTheme
   });

   /**
    * This class will dynamically define the menu class. Some components defer
    * loading the dialog function because of size, so this method will not
    * statically include dijit.Dialog. Instead, components should either define
    * dijit.Dialog as an explicit dependency in their dojo build scripts (if not
    * already required by another class) or override
    * lconn.core.header.MenuLauncher.prototype._requireDialog
    * 
    * @class lconn.core.header.MenuLauncher
    * @extends lconn.core.widget.MenuLauncher
    */
   dojo.declare("lconn.core.header.MenuLauncher", lconn.core.widget.MenuLauncher, /** @lends lconn.core.header.MenuLauncher.prototype */
   {
      activeParent : 0, // the parent node will have the "lotusHover" class
                        // added

      _initMenuFinal : function() {
         if (!dojo.getObject("lconn.core.header.Menu")) {
            var d = dojo;
            d.provide("lconn.core.header.Menu");
            dojo.declare("lconn.core.header.Menu", dijit.TooltipDialog, {
               autofocus : false,
               "class" : "lotusNavMenu",
               isFailed : false,
               postCreate : function() {
                  this.inherited(arguments);
                  dijit.setWaiState(this.containerNode, "label", this.dialogTitle);

                  if (!this.errorMessageText) {
                     // try to use dojo default string
                     var defaultNls = dojo.i18n.getLocalization("dijit", "loading");
                     if (defaultNls)
                        this.errorMessageText = defaultNls["errorState"];
                  }

                  this._strings = dojo.i18n.getLocalization('lconn.core', 'strings');
                  dijit.setWaiRole(this, "dialog");
               },
               _attachTemplateNodes : function() {
                  this.inherited(arguments);

                  // connect the hover events so that hide/show can also apply
                  // when
                  // the user mouses over the popup
                  this.connect(this.domNode, "onmouseover", "onMouseOver");
                  this.connect(this.domNode, "onmouseout", "onMouseOut");
                  this.connect(this.domNode, "onclick", "onMenuClick");
                  this.connect(this.domNode, "onclose", "onClose");
                  
                  // Connect touch events
                  this.connect(this.domNode, "touchend", "onMenuClick"); 
                  console.log("Added touchend listener to onMenuClick (deprecated)");
               },
               onClose : function() {
                  this.inherited(arguments);
                  if (this.domNode) {
                     dojo.removeAttr(this.domNode.parentNode, "style");
                  }
               },
               orient : function(/* DomNode */node, /* String */aroundCorner, /* String */corner) {
                  // summary: configure widget to be displayed in given position
                  // relative to the button
                  this.domNode.className = this["class"] + " dijitTooltipAB" + (corner.charAt(1) == 'L' ? "Left" : "Right");// +"
                  // dijitTooltip"+(corner.charAt(0)=='T'
                  // ?
                  // "Below"
                  // :
                  // "Above");
                  // set the margin of wrapper node according to its contained
                  // node
                  var mb = dojo.marginBox(this.domNode);
                  var mbSet = false;
                  // if failed, wrapper node will adjust margin by itself
                  if (!this.isFailed) {
                     var popup = dojo.attr(this.domNode.parentNode, "dijitpopupparent");
                     if (popup) {
                        var popupParentNode = dojo.byId(popup);
                        if (popupParentNode) {
                           var extContentStyle = dojo.attr(popupParentNode, "external-content-style");
                           if (extContentStyle) {
                              var heightStyle = "";
                              var widthStyle = "";
                              var pairs = extContentStyle.split(";");
                              for (var i = 0; i < pairs.length; i++) {
                                 var keyValue = pairs[i].split(":");
                                 if (keyValue[0] && keyValue[1]) {
                                    if (keyValue[0] == "height")
                                       heightStyle = keyValue[1];
                                    if (keyValue[0] == "width")
                                       widthStyle = keyValue[1];
                                 }
                              }
                              if (heightStyle == "auto" && widthStyle == "auto") {
                                 // do not set h/w in such case
                                 mbSet = true;
                              }
                              else if (heightStyle == "auto") {
                                 dojo.marginBox(node, {
                                    w : mb.w
                                 });
                                 mbSet = true;
                              }
                              else if (widthStyle == "auto") {
                                 dojo.marginBox(node, {
                                    h : mb.h
                                 });
                                 mbSet = true;
                              }
                           }
                        }
                     }
                  }
                  if (!mbSet) {
                     // If we are not worried about social mail menus, let the
                     // menu
                     // determine its own height/width.
                     // Removing the height/width parameters fixes issues with
                     // IE
                     // mega menu width/height
                     dojo.style(this.domNode, "height", "");
                     dojo.style(this.domNode, "width", "");
                     dojo.style(this.domNode.parentNode, "height", "");
                     dojo.style(this.domNode.parentNode, "width", "");
                     // dojo.marginBox(node, {w: mb.w, h: mb.h});
                  }
               },
               onMenuClick : function(e) {
                  var el = e.target;
                  for (var i = 0; el && i < 5; i++) {
                     if (el.nodeName.toLowerCase() == "a") {
                        // Internet Explorer is not properly clearing the :hover
                        // state when the link is clicked - by
                        // setting visibility here we seem to be able to reset
                        // the
                        // state. The setTimeout was necessary
                        // to force the reflow. Doing measurement style reflow
                        // did
                        // not reset :hover. Also, note that
                        // no mouseout is fired on the element when the click
                        // hides
                        // the menu div - this is probably
                        // related to the underlying issue.
                        if (dojo.isIE < 9) {
                           var style = el.style;
                           style.visibility = "hidden";
                           setTimeout(function() {
                              style.visibility = "";
                           }, 1);
                        }
                        
                        // Support Touch selection on the header navbar menu dropdown
                        if (e.type.toLowerCase() == "touchend") {
                            // Processing for the touchend event
                            if (el.href == "javascript:;" && el.id == "logoutLink") {
                                // Detected touchend on Logout, call lconn.core.auth.logout() to service the request
                                lconn.core.auth.logout();                        
                            } else {
                                // Set window.location.href to href associated with the menu selection
                                // so the display will be redirected to the new location
                                window.location.href = el.href;
                            }
                        }
                        
                        // Cancel (hide) the menu dropdown
                        this.onCancel();
                        return;
                     }
                     else {
                        el = el.parentNode;
                     }
                  }
               },
               _onError : function(type, err, consoleText) {
                  this.inherited(arguments);
                  this.isFailed = true;
               },
               onDownloadError : function(error) {
                  dojo.addClass(this.domNode, "lotusNavMenuError");

                  if (this.errorMessageText) {
                     // override default error message
                     var messageBox = this.messageBox = new com.ibm.oneui.controls.MessageBox({
                        canClose : false,
                        _strings : {
                           icon_alt : this._strings.rs_messagebox_warning_icon_alt,
                           a11y_label : this._strings.rs_messagebox_warning_a11y_label
                        },
                        type : com.ibm.oneui.controls.MessageBox.TYPE.WARNING,
                        msg : this.errorMessageText
                     }, dojo.create("div"));
                     this.errorMessage = messageBox.domNode;
                  }

                  return this.inherited(arguments);
               },
               uninitialize : function() {
                  if (this._beingDestroyed && this.messageBox) {
                     this.messageBox.destroy();
                  }
                  this.inherited(arguments);
               }
            });
         }
         this.menu = new lconn.core.header.Menu({
            widthAdjust : 8,
            href : this.menuHref,
            dialogTitle : this.dialogTitle,
            id : this.menuId || undefined,
            errorMessageText : this.errorMessageText
         });

         var onloadfn = dojo.attr(this.focusNode, "onmenuloaded");
         if (onloadfn)
            this.connect(this.menu, "onLoad", dojo.getObject(onloadfn));
      },
      /**
       * Provided so that some callers can load in a deferred manner.
       */
      _initMenu : function() {
         return this._whenDialog().addCallback(this, "_initMenuFinal");
      },
      _whenDialog : function() {
         var dfd = this._dlgDfd;
         if (!dfd) {
            var d = dojo;
            d.require("dijit.Dialog"); // Use the indirect load so that the
                                       // static
            // build scripts do not include dijit.Dialog
            // automatically.
            dfd = this._dlgDfd = new dojo.Deferred();
            dfd.callback();
         }
         return dfd;
      }
   });

})();
