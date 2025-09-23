/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/array", // array.forEach
   "dojo/_base/lang", // lang.partial
   "dojo/dom-class", // domClass.add, domClass.remove, domClass.contains
   "dojo/dom-construct", // domConstruct.create, domConstruct.destroy
   "dojo/on",
   "dijit/_base/wai",
   // "ic-ui/config",
   "./aria/Toolbar"
], function (dojo, array, lang, domClass, domConstruct, on, wai, /* config, */ Toolbar) {

   /**
    * Layout utilities
    * 
    * @namespace ic-ui.layout
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var isHTML5 = false; // config.isHTML5();
   var BEFORE = "before", AFTER = "after"/*, FIRST = "first"*/, LAST = "last"/*, ONLY = "only"*/;
   var rid = 0;
   function getRandomId(prefix){return prefix+(++rid);}
   return /** @lends ic-ui.layout */ {
      /**
       * Applies the basic ICS UI template
       * 
       * @param {Node}
       *           el the parent element
       * @param {Object}
       *           nodes container for nodes, will be populated with nodes
       *           created
       * @param {Object}
       *           [opt] options for rendering
       */
      applyBasicTemplate: function(el, nodes, opt) {
        
         nodes = nodes || {};
         opt = opt || {};
         /*
         <div class="lotusMain">
            <div class="lotusColLeft">
            </div><!--end colLeft-->
            <!-- aside is an HTML5 element. Use div if you are using HTML4. -->
            <aside class="lotusColRight">
            </aside><!--end colRight-->
            <a id="lotusMainContent" name="lotusMainContent"></a>
            <div class="lotusContent" role="main">
               <!-- Insert your content here -->
            </div><!--end content-->
         </div><!--end main-->
         */
         if (!nodes.banner) {
            nodes.banner = domConstruct.create(isHTML5 ? "banner" : "div", {
               "class": "lotusBanner",
               role: "banner"
            }, el);
         }
         nodes.titlebar = domConstruct.create("div", {
            "class": (opt.titlebar2 ? "lotusTitleBar2" : "lotusTitleBar")
         }, nodes.banner, AFTER);
         if (this.check_ui_enabled()) {
            var m = nodes.main = (nodes.main || domConstruct.create("div", {
            "class": "lotusMain modifiedLotusMain"
            }, nodes.titlebar, AFTER));
         }
         else{
            var m = nodes.main = (nodes.main || domConstruct.create("div", {
            "class": "lotusMain"
         }, nodes.titlebar, AFTER));}
            nodes.colLeft = domConstruct.create("div", {
               "class": "lotusColLeft"
            }, m);
            nodes.colRight = domConstruct.create(isHTML5 ? "aside" : "div", {
               "class": "lotusColRight"
            }, m);
            // Not required for WAI-ARIA compliant browsers
            /* nodes.mainAnchor = dojo.create("a", {
               id: "lotusMainContent",
               name: "lotusMainContent"
            }, m); */
            nodes.content = domConstruct.create("div", {
               "class": "lotusContent",
               role: "main"
            }, m);
            // Create message container
            nodes.messages = domConstruct.create("div", {}, nodes.content);

         if (!nodes.footer) {
            nodes.footer = domConstruct.create(isHTML5 ? "footer" : "div", {
               "class": "lotusFooter",
               role: "footer"
            }, el);
         }
         return el;
      },
      check_ui_enabled: function() {
			if (typeof dojo.cookie('cnx8-ui') == 'undefined') {
			return 0;
			}
			return parseInt(dojo.cookie('cnx8-ui')) == 1;
		},
      /**
       * Applies the login template
       * 
       * @param {Node}
       *           el the parent element
       * @param {Object}
       *           nodes container for nodes, will be populated with nodes
       *           created
       * @param {Object}
       *           [opt] options for rendering
       */
      applyLoginTemplate: function(el, nodes, opt) {
         /*
         <header|div id="authBanner" role="banner">
            <div class="lotusBanner">
               <div class="lotusRightCorner">
                  <div class="lotusInner">
                     <div class="lotusLogo" id="lotusLogo">
                        <span class="lotusAltText">${product.name}</span>
                     </div>
                  </div>
               </div>
            </div>
         </header|div>
         <div class="lotusLoginBox">
            <div class="lotusLoginContent">
               <div class="lotusDescription" role="main"/>
               <form class="lotusForm2 lotusLoginForm" aria-live="assertive"/>
            </div>
         </div>
         <footer|div role="contentinfo">
            <table class="lotusLegal lotusLoginBoxWide" role="presentation"><tr><td class="lotusLicense">${legal.mumbo.jumbo}</td></tr></table>
         </footer|div>
          */
         nodes = nodes || {};
         opt = opt || {};
         if (!nodes.banner && !opt.noBanner) {
            nodes.banner = domConstruct.create(isHTML5 ? "header" : "div", {
               id: "lotusBanner",
               role: "banner"
            }, el);
               var b = domConstruct.create("div", {
                  className: "lotusBanner"
               }, nodes.banner);
                  var c = domConstruct.create("div", {
                     className: "lotusRightCorner"
                  }, b);
                     var d = domConstruct.create("div", {
                        className: "lotusInner"
                     }, c);
                        var e = domConstruct.create("div", {
                           className: "lotusLogo",
                           id: "lotusLogo"
                        }, d);
                           domConstruct.create("span", {
                              className: "lotusAltText",
                              innerHTML: opt.logo_label
                           }, e);
         }
         var g = domConstruct.create("div", {
            className: "lotusLoginBox"
         }, nodes.banner, AFTER);
            var h = domConstruct.create("div", {
               className: "lotusLoginContent"
            }, g);
            if (opt.wide) {
               nodes.description = domConstruct.create("div", {
                  className: "lotusLoginDescription",
                  role: "main"
               }, h);
            }
            nodes.form = domConstruct.create("form", {
               className: "lotusForm2 lotusLoginForm"
            }, h);
            wai.setWaiState(nodes.form, "live", "assertive");
      },

      /**
       * Applies the titlebar with tabs
       * 
       * @param {Node}
       *           el the parent element
       * @param {Object}
       *           nodes container for nodes, will be populated with nodes
       *           created
       * @param {Array}
       *           tabs an array of elements with these properties: title, href,
       *           selected (optional)
       * @param {Object}
       *           [opt] options for rendering
       */
      applyTitleBarTabs: function(el, nodes, tabs, opt, nls) {
        /*
      <div class="lotusTitleBar2 lotusTitleBar2Tabs"><div class="lotusWrapper"><div class="lotusInner">
         <div class="lotusTitleBarContent">
            <nav aria-label="[Tabs navigation]" role="navigation">
               <ul class="lotusNavTabs" role="toolbar">
                  <!--put class="lotusSelected" on the li element of the selected tab-->
                  <li role="presentation"><div class="lotusTabWrapper"><a class="lotusTab" href="javascript:;" role="button"><span class="lotusTabInner">Tab1</span></a></div></li>
                  <li role="presentation"><div class="lotusTabWrapper"><a class="lotusTab" href="javascript:;" role="button"><span class="lotusTabInner">Tab2</span></a></div></li>
                  <li class="lotusSelected" role="presentation"><div class="lotusTabWrapper"><a class="lotusTab" href="javascript:;" role="button" aria-pressed="true"><span class="lotusTabInner"><strong>Tab3</strong></span></a></div></li>
               </ul>
               <div class="lotusClear"></div>
            </nav>
         </div>
         <form class="lotusSearch" action="javascript:;" method="post" role="search" />
      </div></div></div><!--end titleBar-->
         */      
         opt = opt || {};
         nodes = nodes || {};
         this.applyTitleBar(el, nodes, opt, nls);
         domClass.remove(el, "lotusTitleBar");
         if (this.check_ui_enabled()) {
         domClass.add(el, "lotusTitleBar2 lotusTitleBar2Tabs modifiedLotusTitleBar2");
         }
         else
         {
            domClass.add(el, "lotusTitleBar2 lotusTitleBar2Tabs");
         }
         // Remove title
         domConstruct.destroy(nodes.title);
         // Add title
         this.applyTitle(nodes.titlebarcontent, nodes, opt);
         // Add tabs
         var nav = domConstruct.create(isHTML5 ? "nav" : "div", {
            "role": "navigation", "id":"titleBarNavContent"
         }, opt.hasForm ? nodes.search_form : nodes.titlebarcontent, opt.hasForm ? BEFORE : LAST);
         wai.setWaiState(nav, "label", opt.a11y_navLabel);
         if (tabs && tabs.length) {
            if (this.check_ui_enabled()) {
            var ul = domConstruct.create("ul", {
               "class": "lotusNavTabs modifiedNavTabs",
               role: "toolbar",
               "aria-labelledby": "titleBarNavContent"
            }, nav);}
            else
            {
               var ul = domConstruct.create("ul", {
                  "class": "lotusNavTabs",
                  role: "toolbar",
                  "aria-labelledby": "titleBarNavContent"
               }, nav);
            }
            array.forEach(tabs, function(tab) {
               var li = domConstruct.create("li", {
                  role: "presentation",
                  "class": (tab.selected ? "lotusSelected" : "")
               }, ul);
                  var div = domConstruct.create("div", {
                     "class": "lotusTabWrapper"
                  }, li);
                     var a = domConstruct.create("a", {
                        "class": "lotusTab",
                        role: "button",
                        href: tab.href
                     }, div);
                        
                        var span = domConstruct.create("span", {
                           "class": "lotusTabInner"
                        }, a);
                           if (tab.selected) {
                              wai.setWaiState(a, "pressed", true);
                              domConstruct.create("strong", {
                                 innerHTML: tab.title
                              }, span);
                           } else {
                              span.innerHTML = tab.title;
                           }
            });
            domConstruct.create("div", {
               "class": "lotusClear"
            }, nav);
            // Instantiate toolbar ARIA helper
            return new Toolbar(ul);
         }
     },

     /**
      * Applies the title
      * 
      * @param {Node}
      *           el the parent element
      * @param {Object}
      *           nodes container for nodes, will be populated with nodes
      *           created
      * @param {Object}
      *           [opt] options for rendering
      */
     applyTitle: function(el, nodes, opt, id) {
        /*
        <h2 class="lotusHeading"><img alt="" class="lotusIcon yourProductSprite yourProductSprite-iconPlaceholder24" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif"><span class="lotusText">Application Name</span></h2>
        */
         if (!opt || !opt.title) {
            return;
         }
         var options = {
               "class" : "lotusHeading"
            }
         if (id) {
            options.id = id;
         }
         var h = nodes.title = domConstruct.create("h2", options, el);
         if (opt.appIcon) {
            domConstruct.create("img", {
               "class" : "lotusIcon " + opt.appIcon["class"],
               src : opt.appIcon.src
            }, h);
         }
         domConstruct.create("span", {
            "class" : "lotusText",
            innerHTML : opt.title
         }, h);
         return h;
     },

     /**
      * Applies the titlebar
      * 
      * @param {Node}
      *           el the parent element
      * @param {Object}
      *           nodes container for nodes, will be populated with nodes
      *           created
      * @param {Object}
      *           [opt] options for rendering
      */
     applyTitleBar: function(el, nodes, opt, nls) {
        /*
     <div class="lotusTitleBar2"><div class="lotusWrapper"><div class="lotusInner"> 
        <div class="lotusTitleBarContent">
           <h2 class="lotusHeading"><img alt="" class="lotusIcon yourProductSprite yourProductSprite-iconPlaceholder24" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif"><span class="lotusText">Application Name</span></h2>
        </div>
        <form class="lotusSearch" action="javascript:;" method="post" role="search" />
     </div></div></div>
        */
     if (this.check_ui_enabled()) {
         var w = domConstruct.create("div", {
            "class" : "lotusWrapper modifiedLotusWrapper"
         }, el);

         var myProfileNls = nls.newsNav.tab1;
         var settingsNls = nls.newsNav.tab2;
         var configService = lconn.core.config.services;
         var profilesBaseFull = window.location.protocol.replace(":", "") === "https" ? configService.profiles.secureUrl : configService.profiles.url;
         var newsBaseFull = window.location.protocol.replace(":", "") === "https" ? configService.news.secureUrl : configService.news.url;
         var newsDefaultPageUrl = newsBaseFull + '/defaulthomepage'

         try{
            function addNewsNav(){
               var tertiaryNav = document.getElementById('tertiary_level_nav');
               tertiaryNav.innerHTML = "<li><a href=" + profilesBaseFull + ">" + myProfileNls + "</a></li><li class='lotusSelected'><a href=" + newsDefaultPageUrl + ">" + settingsNls + "</a></li>";
            }
            setTimeout(addNewsNav, 1000);
         } catch (e) {
            console.log('Unable to add element', e);
         }
      }
      else{
         var w = domConstruct.create("div", {
            "class" : "lotusWrapper"
         }, el);
      }
      if (this.check_ui_enabled()) {
         var i = domConstruct.create("div", {
            "class" : "lotusInner modifiedLotusInner"
         }, w);
      }
      else
      {
         var i = domConstruct.create("div", {
            "class" : "lotusInner"
         }, w);
      }
      var titleId = "titleBarNavContent";
      if (this.check_ui_enabled()) {
         var c = nodes.titlebarcontent = domConstruct.create("div", {
         "class" : "lotusTitleBarContent modifiedLotusTitleBarContent",
         "role" : "region",
         "aria-labelledby" : titleId
         }, i);
      }
      else{
         var c = nodes.titlebarcontent = domConstruct.create("div", {
            "class" : "lotusTitleBarContent",
            "role" : "region",
            "aria-labelledby" : titleId
         }, i);
      }
         this.applyTitle(c, nodes, opt, titleId);
         if (opt.hasForm) {
            nodes.search_form = domConstruct.create("form", {
               "class" : "lotusSearch",
               method : "POST",
               role : "search",
               action : "javascript:;"
            }, c);
         }
         return el;
      },

      /**
       * Applies the header
       * 
       * @param {Node}
       *           el the parent element
       * @param {Object}
       *           nodes container for nodes, will be populated with nodes
       *           created
       * @param {Object}
       *           [opt] options for rendering
       */
      applyHeader: function(el, nodes, opt) {
         nodes = nodes || {};
         opt = opt || {};
         /*
         <!-- Simple header: -->
         <!-- header is an HTML5 element. Use div if you are using HTML4. -->
         <header class="lotusHeader"><h1 class="lotusHeading">Page Title</h1></header><!--end header-->

         <!-- Header with filters: -->
         <!-- header is an HTML5 element. Use div if you are using HTML4. -->
         <header class="lotusHeader">
            <h1 class="lotusHeading">Bookmarks for <a href="javascript:;" class="lotusPerson">Gail Chao</a></h1>
            <div class="lotusFilters2">By <ul class="lotusInlinelist"><li><a href="javascript:;" role="button" class="lotusFilter" title="Remove">Gail Chao<img alt="Remove" class="lotusDelete" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif" /><span class="lotusAltText">X</span></a></li></ul> with tags: <ul class="lotusInlinelist"><li><a href="javascript:;" role="button" class="lotusFilter" title="Remove">connections<img alt="Remove" class="lotusDelete" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif" /><span class="lotusAltText">X</span></a></li><li><a href="javascript:;" role="button" class="lotusFilter" title="Remove">design<img alt="Remove" class="lotusDelete" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif" /><span class="lotusAltText">X</span></a></li></ul> <span class="lotusDivider" role="presentation">|</span><a href="javascript:;" role="button" class="lotusAction">Add to watchlist</a><a class="lotusIcon" href="javascript:;" role="button" aria-haspopup="true" aria-owns="popupIdGoesHere">&nbsp;<img class="yourProductSprite yourProductSprite-Help12" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif" alt="Help" /><span class="lotusAltText">Help</span></a></div><!--end filters-->
         </header><!--end header-->

         <!-- Header with image: -->
         <!-- header is an HTML5 element. Use div if you are using HTML4. -->
         <header class="lotusHeader">
         <table class="lotusLayout" role="presentation"><tr>
         <td>
            <!-- Replace the blank.gif with the URL to fetch your person images -->
            <img class="yourProductSprite yourProductSprite-NoPhotoPerson64" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif" alt="Gail Chao" /></td>
         <td>
            <h1 class="lotusHeading">Bookmarks for <a href="javascript:;" class="lotusPerson">Gail Chao</a></h1>

            <div class="lotusDetails">
            <p>Details go here...</p>
            </div>
         </td>
         </tr></table>
         </header><!--end header-->

         */
         var h = nodes.header = domConstruct.create(isHTML5 ? "header" : "div", {
           "class": "lotusHeader"
         }, el);
            nodes.heading = domConstruct.create("h1", {
               "class": "lotusHeading",
               innerHTML: opt.heading
            }, h);
            if (opt.details) {
               var d = nodes.details = domConstruct.create("div", {
                  "class": "lotusDetails"
               }, h);
                  domConstruct.create("p", {
                     innerHTML: opt.details
                  }, d);
            }
         return el;
      },

      /**
       * Applies a section
       * 
       * @param {Node}
       *           el the parent element
       * @param {Object}
       *           nodes container for nodes, will be populated with nodes
       *           created
       * @param {Object}
       *           [opt] options for rendering
       */
      applySection: function(el, nodes, opt) {
         nodes = nodes || {};
         opt = opt || {};
         /*

         <!-- section is an HTML5 element. Use div if you are using HTML4. -->
         <section class="lotusSection2" style="width: 300px;">
            <!-- header is an HTML5 element. Use div if you are using HTML4. -->
            <header class="lotusSectionHeader">
               <div class="lotusInner">
                  <a class="lotusArrow" role="button" aria-expanded="true" aria-controls="sectionBodyID" href="javascript:;" title="Collapse section">
                     <img class="lotusTwistyOpen" src="../../css/images/blank.gif" alt="" aria-label="Collapse section">
                     <span class="lotusAltText">▼</span>
                  </a>
                  <h2 class="lotusHeading">
                     <a href="javascript:;">Section Header</a>
                  </h2>
                  <a class="lotusIcon lotusActionIcon" href="javascript:;" role="button" aria-haspopup="true" aria-owns="[menuID]">
                     <img src="../../css/images/blank.gif" alt="">
                     <span class="lotusAltText">Actions</span>
                  </a>
               </div>
            </header>
            <div id="sectionBodyID" class="lotusSectionBody">
               <div class="lotusChunk">Data goes here....</div>
            </div>
         </section><!--end section-->

         */
         var sid = getRandomId('section');
         function toggleTwisty(a, i, p) {
            var ex = domClass.contains(i, "lotusTwistyOpen");
            dojo[ex ? 'removeClass' : 'addClass'](i, "lotusTwistyOpen");
            dojo[ex ? 'addClass' : 'removeClass'](i, "lotusTwistyClosed");
            wai.setWaiState(a, 'expanded', ex);
            p.innerHTML = ex ? '\u25b2' : '\u25bc';
         }
         var s /* TODO: = nodes.sections[id]*/ = domConstruct.create(isHTML5 ? "section" : "div", {
            "class": "lotusSection2"
          }, el);
             var h = domConstruct.create(isHTML5 ? "header" : "div", {
                "class": "lotusSectionHeader"
             }, s);
                var d = domConstruct.create("div", {
                   "class": "lotusSectionInner"
                }, h);
                   var a = domConstruct.create("a", {
                      "class": "lotusArrow",
                      role: "button",
                      "aria-expanded": true,
                      "aria-controls": sid,
                      href: "javascript:;",
                      title: '' // TODO:
                   }, d);
                      var i = domConstruct.create("img", {
                         src: dojo.config.blankGif,
                         "class": "lotusSprite lotusTwistyOpen"
                      }, a);
                      // For HC:
                      var p = domConstruct.create("span", {
                         "class": "lotusAltText",
                         innerHTML: '\u25bc'
                      }, a);
                      on(a, "click", lang.partial(toggleTwisty, a, i, p));
                   var b = domConstruct.create("h2", {
                      "class": "lotusHeading"
                   }, d);
                      domConstruct.create("a", {
                         href: "javascript:;",
                         innerHTML: opt.title
                      }, b);
                   if (opt.hasTooltip) {
                      domConstruct.create("a", {
                         "class": "lotusIcon lotusActionIcon"
                      }, d);
                   }
             b = domConstruct.create("div", {
                id: sid,
                "class": "lotusSectionBody"
             }, s);
                d = domConstruct.create("div", {
                   "class": "lotusChunk"
                }, b);
          return el;
      }
   };
});
