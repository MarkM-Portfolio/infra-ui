/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.layout");

dojo.require("com.ibm.oneui.util.aria.Toolbar");
dojo.require("dijit._base.wai");

(function(window, document) {
   var isHTML5 = false; // com.ibm.oneui.util.isHTML5();
   var BEFORE = "before", AFTER = "after", FIRST = "first", LAST = "last", ONLY = "only";
   var rid = 0;
   function getRandomId(prefix){return prefix+(++rid);}
   com.ibm.oneui.layout = {
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
         if (!nodes.banner)
            nodes.banner = dojo.create(isHTML5 ? "banner" : "div", {
               "class": "lotusBanner",
               role: "banner"
            }, el);
         nodes.titlebar = dojo.create("div", {
            "class": (opt.titlebar2 ? "lotusTitleBar2" : "lotusTitleBar")
         }, nodes.banner, AFTER);
         var m = nodes.main = (nodes.main || dojo.create("div", {
            "class": "lotusMain"
         }, nodes.titlebar, AFTER));
            nodes.colLeft = dojo.create("div", {
               "class": "lotusColLeft"
            }, m);
            nodes.colRight = dojo.create(isHTML5 ? "aside" : "div", {
               "class": "lotusColRight"
            }, m);
            // Not required for WAI-ARIA compliant browsers
            /* nodes.mainAnchor = dojo.create("a", {
               id: "lotusMainContent",
               name: "lotusMainContent"
            }, m); */
            nodes.content = dojo.create("div", {
               "class": "lotusContent",
               role: "main"
            }, m);
            // Create message container
            nodes.messages = dojo.create("div", {}, nodes.content);

         if (!nodes.footer)
            nodes.footer = dojo.create(isHTML5 ? "footer" : "div", {
               "class": "lotusFooter",
               role: "footer"
            }, el);
         return el;
      },
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
            nodes.banner = dojo.create(isHTML5 ? "header" : "div", {
               id: "lotusBanner",
               role: "banner"
            }, el);
               var b = dojo.create("div", {
                  className: "lotusBanner"
               }, nodes.banner);
                  var c = dojo.create("div", {
                     className: "lotusRightCorner"
                  }, b);
                     var d = dojo.create("div", {
                        className: "lotusInner"
                     }, c);
                        var e = dojo.create("div", {
                           className: "lotusLogo",
                           id: "lotusLogo"
                        }, d);
                           var f = dojo.create("span", {
                              className: "lotusAltText",
                              innerHTML: opt.logo_label
                           }, e);
         }
         var g = dojo.create("div", {
            className: "lotusLoginBox"
         }, nodes.banner, AFTER);
            var h = dojo.create("div", {
               className: "lotusLoginContent"
            }, g);
            if (opt.wide) {
               nodes.description = dojo.create("div", {
                  className: "lotusLoginDescription",
                  role: "main"
               }, h);
            }
            nodes.form = dojo.create("form", {
               className: "lotusForm2 lotusLoginForm"
            }, h);
            dijit.setWaiState(nodes.form, "live", "assertive");
      },
      /**
       * @param tabs an array of elements with these properties: title, href, selected (optional)
       */
      applyTitleBarTabs: function(el, nodes, tabs, opt) {
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
         var nodes = {};
         com.ibm.oneui.layout.applyTitleBar(el, nodes, opt);
         dojo.removeClass(el, "lotusTitleBar");
         dojo.addClass(el, "lotusTitleBar2 lotusTitleBar2Tabs");
         // Remove title
         dojo.destroy(nodes.title);
         // Add title
         com.ibm.oneui.layout.applyTitle(nodes.titlebarcontent, nodes, opt);
         // Add tabs
         var nav = dojo.create(isHTML5 ? "nav" : "div", {
            "role": "navigation", "id":"titleBarNavContent"
         }, opt.hasForm ? nodes.search_form : nodes.titlebarcontent, opt.hasForm ? BEFORE : LAST);
         dijit.setWaiState(nav, "label", opt.a11y_navLabel);
         if (tabs && tabs.length) {
            dojo.create("span", {
               "class": "lotusHidden",
               id: "refeshPageAriaLabel",
               innerHTML: opt.refreshPageAriaLabel
            }, nav);
            dojo.create("span", {
               id: "navAriaLabel",
               "class": "lotusHidden",
               innerHTML: opt.a11y_navLabel
            },nav);
            var ul = dojo.create("ul", {
               "class": "lotusNavTabs",
               role: "toolbar",
               "aria-labelledby": "titleBarNavContent"
            }, nav);
            dojo.forEach(tabs, function(tab) {
               var li = dojo.create("li", {
                  role: "presentation",
                  "class": (tab.selected ? "lotusSelected" : "")
               }, ul);
                  var div = dojo.create("div", {
                     "class": "lotusTabWrapper"
                  }, li);
                  if(!tab.selected){
                     var a = dojo.create("a", {
                        "class": "lotusTab",
                        "aria-describedby": "refeshPageAriaLabel navAriaLabel",
                        role: "button",
                        href: tab.href
                     }, div);
 
                  }else{
                     var a = dojo.create("a", {
                        "class": "lotusTab",
                        role: "button",
                        href: tab.href
                     }, div);
                  }
                        var span = dojo.create("span", {
                           "class": "lotusTabInner"
                        }, a);
                           if (tab.selected) {
                              dijit.setWaiState(a, "pressed", true);
                              dojo.create("strong", {
                                 innerHTML: tab.title
                              }, span);
                           } else
                              span.innerHTML = tab.title;
            });
            dojo.create("div", {
               "class": "lotusClear"
            }, nav);
            // Instantiate toolbar ARIA helper
            new com.ibm.oneui.util.aria.Toolbar(ul);
         }
     },
     applyTitle: function(el, nodes, opt) {
        /*
        <h2 class="lotusHeading"><img alt="" class="lotusIcon yourProductSprite yourProductSprite-iconPlaceholder24" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif"><span class="lotusText">Application Name</span></h2>
        */
         if (!opt || !opt.title) return;
         var options = {
               "class" : "lotusHeading"
            }
         if (id) {
            options.id = id;
         }
         var h = nodes.title = dojo.create("h2", options, el);
         if (opt.appIcon) {
            var a = dojo.create("img", {
               "class" : "lotusIcon " + opt.appIcon["class"],
               src : opt.appIcon.src
            }, h);
         }
         var s = dojo.create("span", {
            "class" : "lotusText",
            innerHTML : opt.title
         }, h);
         return h;
     },
     applyTitleBar: function(el, nodes, opt) {
        /*
     <div class="lotusTitleBar2"><div class="lotusWrapper"><div class="lotusInner"> 
        <div class="lotusTitleBarContent">
           <h2 class="lotusHeading"><img alt="" class="lotusIcon yourProductSprite yourProductSprite-iconPlaceholder24" src="../../css_OneUI-3.0.3_20120218-0300/images/blank.gif"><span class="lotusText">Application Name</span></h2>
        </div>
        <form class="lotusSearch" action="javascript:;" method="post" role="search" />
     </div></div></div>
        */
         var w = dojo.create("div", {
            "class" : "lotusWrapper"
         }, el);
         var i = dojo.create("div", {
            "class" : "lotusInner"
         }, w);
         var titleId = "titleBarNavContent";
         var c = nodes.titlebarcontent = dojo.create("div", {
            "class" : "lotusTitleBarContent",
            "role" : "region",
            "aria-labelledby" : titleId
         }, i);
         var h = com.ibm.oneui.layout.applyTitle(c, nodes, opt, titleId);
         if (opt.hasForm) {
            var f = nodes.search_form = dojo.create("form", {
               "class" : "lotusSearch",
               method : "POST",
               role : "search",
               action : "javascript:;"
            }, c);
         }
         return el;
      },
   
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
         var h = nodes.header = dojo.create(isHTML5 ? "header" : "div", {
           "class": "lotusHeader"
         }, el);
            nodes.heading = dojo.create("h1", {
               "class": "lotusHeading",
               innerHTML: opt.heading
            }, h);
            if (opt.details) {
               var d = nodes.details = dojo.create("div", {
                  "class": "lotusDetails"
               }, h);
                  var p = dojo.create("p", {
                     innerHTML: opt.details
                  }, d);
            }
         return el;
      },
      
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
            var ex = dojo.hasClass(i, "lotusTwistyOpen");
            dojo[ex ? 'removeClass' : 'addClass'](i, "lotusTwistyOpen");
            dojo[ex ? 'addClass' : 'removeClass'](i, "lotusTwistyClosed");
            dijit.setWaiState(a, 'expanded', ex);
            p.innerHTML = ex ? '\u25b2' : '\u25bc';
         }
         var s /* TODO: = nodes.sections[id]*/ = dojo.create(isHTML5 ? "section" : "div", {
            "class": "lotusSection2"
          }, el);
             var h = dojo.create(isHTML5 ? "header" : "div", {
                "class": "lotusSectionHeader"
             }, s);
                var d = dojo.create("div", {
                   "class": "lotusSectionInner"
                }, h);
                   var a = dojo.create("a", {
                      "class": "lotusArrow",
                      role: "button",
                      "aria-expanded": true,
                      "aria-controls": sid,
                      href: "javascript:;",
                      title: '' // TODO:
                   }, d);
                      var i = dojo.create("img", {
                         src: dojo.config.blankGif,
                         "class": "lotusSprite lotusTwistyOpen"
                      }, a);
                      // For HC:
                      var p = dojo.create("span", {
                         "class": "lotusAltText",
                         innerHTML: '\u25bc'
                      }, a);
                      dojo.connect(a, 'onclick', dojo.partial(toggleTwisty, a, i, p));
                   var b = dojo.create("h2", {
                      "class": "lotusHeading"
                   }, d);
                      var c = dojo.create("a", {
                         href: "javascript:;",
                         innerHTML: opt.title
                      }, b);
                   if (opt.hasTooltip) {
                      a = dojo.create("a", {
                         "class": "lotusIcon lotusActionIcon"
                      }, d);
                   }
             var b = dojo.create("div", {
                id: sid,
                "class": "lotusSectionBody"
             }, s);
                d = dojo.create("div", {
                   "class": "lotusChunk"
                }, b);
          return el;
      }
   };
})(window, document);
