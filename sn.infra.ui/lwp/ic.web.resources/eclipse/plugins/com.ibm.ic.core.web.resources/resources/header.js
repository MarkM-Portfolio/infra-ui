/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2010, 2020                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/dom-style",
      "dojo/_base/lang",
      "dojo/has",
      "dojo/dom-attr",
      "dojo/dom-construct",
      "dojo/dom-class",
      "dojo/Deferred",
      "dojo/dom",
      "dojo/_base/declare",
      "dojo/i18n",
      "dojo/query",
      "dojo/string",
      "dijit/TooltipDialog",
      "dojo/i18n!dijit/nls/loading",
      "./theme",
      "dojo/i18n!./nls/strings",
      "ic-ui/layout/people",
      "./LanguageSelector",
      "./header/apps",
      "ic-ui/MessageBox",
      "./globalization/bidiUtil",
      "./config/features",
      "./url",
      "./widget/MenuLauncher",
      "./auth",
      "dojo/touch"
],
   function(dojo, domStyle, lang, has, domAttr, domConstruct, domClass, Deferred, dom, declare, i18n, query, string, TooltipDialog, i18nloading, theme, i18nstrings, people, LanguageSelector, apps, MessageBox, bidiUtil, features, url, MenuLauncher) {

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
       * @namespace ic-core.header
       */
      var header = lang.mixin(lang.getObject("lconn.core.header", true), /** @lends ic-core.header */
      {
         initMenu : function(a, type) {
            a._init = true;

            var id = domAttr.get(a, "_lconn_menuid");
            a.removeAttribute('_lconn_menuid');

            var launcher = new HeaderMenuLauncher({
               menuHref : domAttr.get(a, "src"),
               menuId : id,
               dialogTitle : domAttr.get(a, "aria-label"),
               focusNode : a,
               errorMessageText : domAttr.get(a, "errormessage")
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
            if(has("ui-language-setting")){
               return;
            }
            var properties = {
               path : "\/"
            };

            var timeout = cookieTimeout == -1 ? 0 : (cookieTimeout / 86400);
            if (timeout > 0)
               properties.expires = timeout;

            var domain = cookieDomain;
            if (domain && domain != ".") {
               var uri = url.parse(window.location.href);
               var host = uri.host;
               properties.domain = domain + host.substring(host.indexOf('.'), host.length);
            }

            node = dom.byId(node);
            if (!node) {
               console.log("language selector node not present in header or footer");
               return;
            }

            require(['ic-core/LanguageSelector'], function(LanguageSelector) {
               var next = node.nextSibling;
               while (next) {
                  if (next.nodeType == 1)
                     domClass.remove(next, "lotusFirst");
                  next = next.nextSibling;
               }
               node.innerHTML = "<a id='headerLanguageSelectorMenu' href='javascript:;' role='button' aria-haspopup='true'></a>";
               node.style.display = "";

               new LanguageSelector(node.firstChild, languages, cookieName, properties);
            });
         },
         /**
          * Decorates the banner with extra elements available to authenticated
          * users. Used by Blogs, Bookmarks and Forums to decorate the banner
          * for authenticated users after the anonymous landing page loads.
          * 
          * @param {Object}
          *           user The user object.
          */
         decorateUser : function(user, urls, strings) {
            // Do nothing if the user is not set
            if (!user || !user.id || !user.displayName)
               return;

            // Add user picture to banner
            var hun = query("#headerUserName img")[0];
            if (hun) {
               var img = people.createImage({
                  userid : user.id,
                  name : user.displayName
               }, 26);
               if (img)
                  domConstruct.place(img, hun, "replace");
               else {
                  // Graceful degradation when there's no profile provider in
                  // place
                  domClass.add(hun, "otherPeople24 otherPeople24-NoPhotoPerson24");
                  hun.src = dojo.config.blankGif;
               }
            }
            var lp = dom.byId("lotusPerson");
            if (lp) {
               domClass.remove(lp, "lotusHidden");
               // FIXME: gen4 styles sets more specific rule with display:block
               domStyle.set(lp, "display", "");
            }
            domAttr.set("headerUserName", "src", string.substitute(urls.user_jsp, {
               username : user.displayName,
               userId : user.id
            }));

            // FIXME: the sharebox attach point should not be in the DOM for
            // anonymous users
            var hs = dom.byId("headerSharebox");
            if (hs) {
               domClass.remove(hs, "lotusHidden");
               // FIXME: gen4 styles sets more specific rule with display:block
               domStyle.set(hs, "display", "");
            }

            var ll = dom.byId("logoutLink");
            if (ll) {
               ll.replaceChild(document.createTextNode(strings.logout), ll.firstChild);
               // This is tricky, extract to function
               ll.href = urls.logout
               domClass.add(ll, "lotusHidden");
               // FIXME: gen4 styles sets more specific rule with display:block
               ll.style.display = "none";
            }

            query("li", dom.byId("headerMenuContainer")).forEach(function(el) {
               if (el.previousSibling)
                  domClass.remove(el, "lotusFirst");
            });

            var lbcl = dom.byId("lotusBannerCommunitiesLink");
            if (lbcl) {
               var menu = dijit.byId(domAttr.get(lbcl, "aria-owns"));
               var href = urls.communities_jsp;
               if (menu)
                  menu.set("href", href);
               else
                  domAttr.set(lbcl, "src", href);
            }
            apps.updateBannerByRoles();
         },
         switchTheme : theme.switchTheme
      });

      /* This is required to give the lconn.core.header.Menu class module scope */ 
      var Menu;

      /**
       * This class will dynamically define the menu class. Some components
       * defer loading the dialog function because of size, so this method will
       * not statically include dijit.Dialog. Instead, components should either
       * define dijit.Dialog as an explicit dependency in their dojo build
       * scripts (if not already required by another class) or override
       * lconn.core.header.MenuLauncher.prototype._requireDialog
       * 
       * @class ic-core.header.MenuLauncher
       * @extends ic-core.widget.MenuLauncher
       */
      var HeaderMenuLauncher = declare("lconn.core.header.MenuLauncher", MenuLauncher, /** @lends ic-core.header.MenuLauncher.prototype */
      {
         activeParent : 0, // the parent node will have the "lotusHover" class
         // added
         _initMenuFinal : function() {
            if (!lang.getObject("lconn.core.header.Menu")) {
               Menu = declare("lconn.core.header.Menu", TooltipDialog, {
                  autofocus : false,
                  "class" : "lotusNavMenu",
                  isFailed : false,
                  postCreate : function() {
                     this.inherited(arguments);
                     dijit.setWaiState(this.containerNode, "label", this.dialogTitle);

                     if (!this.errorMessageText) {
                        // try to use dojo default string
                        var defaultNls = i18nloading;
                        if (defaultNls)
                           this.errorMessageText = defaultNls["errorState"];
                     }

                     this._strings = i18nstrings;
                     dijit.setWaiRole(this, "dialog");
                  },
                  _attachTemplateNodes : function() {
                     this.inherited(arguments);
                     // connect the hover events so that hide/show can also
                     // apply when the user mouses over the popup
                     this.connect(this.domNode, "onmouseover", "onMouseOver");
                     this.connect(this.domNode, "onmouseout", "onMouseOut");
                     this.connect(this.domNode, "onclick", "onMenuClick");
                     this.connect(this.domNode, "onclose", "onClose");
                                          
                     // Connect touch events
                     this.connect(this.domNode, "touchend", "onMenuClick"); 
                     console.log("Added touchend listener to onMenuClick");
                  },
                  onClose : function() {
                     this.inherited(arguments);
                     if (this.domNode) {
                        dojo.removeAttr(this.domNode.parentNode, "style");
                     }
                  },
                  orient : function(/* DomNode */node, /* String */aroundCorner, /* String */corner) {
                     // summary: configure widget to be displayed in given
                     // position relative to the button
                     this.domNode.className = this["class"] + " dijitTooltipAB" + (corner.charAt(1) == 'L' ? "Left" : "Right");// +"
                     // dijitTooltip"+(corner.charAt(0)=='T'
                     // ?
                     // "Below"
                     // :
                     // "Above");
                     // set the margin of wrapper node according to its
                     // contained node
                     var mb = dojo.marginBox(this.domNode);
                     var mbSet = false;
                     // if failed, wrapper node will adjust margin by itself
                     if (!this.isFailed) {
                        var popup = domAttr.get(this.domNode.parentNode, "dijitpopupparent");
                        if (popup) {
                           var popupParentNode = dom.byId(popup);
                           if (popupParentNode) {
                              var extContentStyle = domAttr.get(popupParentNode, "external-content-style");
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
                        // If we are not worried about social mail menus, let
                        // the menu determine its own height/width.
                        // Removing the height/width parameters fixes issues
                        // with IE mega menu width/height
                        domStyle.set(this.domNode, "height", "");
                        domStyle.set(this.domNode, "width", "");
                        domStyle.set(this.domNode.parentNode, "height", "");
                        domStyle.set(this.domNode.parentNode, "width", "");
                        // dojo.marginBox(node, {w: mb.w, h: mb.h});
                     }
                  },
                  onMenuClick : function(e) {
                     var el = e.target;
                     for (var i = 0; el && i < 5; i++) {
                        if (el.nodeName.toLowerCase() == "a") {
                           // Internet Explorer is not properly clearing the
                           // :hover state when the link is clicked - by
                           // setting visibility here we seem to be able to
                           // reset the state. The setTimeout was necessary
                           // to force the reflow. Doing measurement style
                           // reflow did not reset :hover. Also, note that
                           // no mouseout is fired on the element when the click
                           // hides the menu div - this is probably
                           // related to the underlying issue.
                           if (has("ie") < 9) {
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
                     domClass.add(this.domNode, "lotusNavMenuError");

                     if (this.errorMessageText) {
                        // override default error message
                        var messageBox = this.messageBox = new MessageBox({
                           canClose : false,
                           _strings : {
                              icon_alt : this._strings.rs_messagebox_warning_icon_alt,
                              a11y_label : this._strings.rs_messagebox_warning_a11y_label
                           },
                           type : MessageBox.TYPE.WARNING,
                           msg : this.errorMessageText
                        }, domConstruct.create("div"));
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
            this.menu = new Menu({
               widthAdjust : 8,
               href : this.menuHref,
               dialogTitle : this.dialogTitle,
               id : this.menuId || undefined,
               errorMessageText : this.errorMessageText
            });

            var onloadfn = domAttr.get(this.focusNode, "onmenuloaded");
            if (onloadfn)
               this.connect(this.menu, "onLoad", lang.getObject(onloadfn));
         },
         /**
          * Provided so that some callers can load in a deferred manner.
          */
         _initMenu : function() {
            return this._whenDialog().then(lang.hitch(this, this._initMenuFinal), function() {
               debugger;
            });
         },
         _whenDialog : function() {
            var dfd = this._dlgDfd;
            if (!dfd) {
               dfd = this._dlgDfd = new Deferred();
               require([ "dijit/Dialog"
               ], function() {
                  dfd.resolve();
               });
            }
            return dfd;
         }
      });

      return header;
   });
