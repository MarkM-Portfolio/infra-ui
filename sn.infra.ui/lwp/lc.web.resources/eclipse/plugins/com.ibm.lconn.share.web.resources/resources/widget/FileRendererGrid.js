/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.FileRendererGrid");

dojo.require("lconn.share.action.impl.FilePreviewDialog");
dojo.require("lconn.files.action.PreviewFile");
dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.xsl");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.widget.FileRendererCore");
dojo.require("lconn.share.widget.AbstractRendererSocial");
dojo.require("lconn.share.widget.FileRendererPostProcessor");
dojo.require("lconn.share.widget.Tagger");
dojo.require("lconn.share.widget.StreamRendererMultiSelection");
dojo.require("lconn.share.scenehelper");
dojo.require('lconn.files.widget.RecommendInfo');
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("lconn.share.previewConfig");
dojo.require("dojo.fx"); 
dojo.require('lconn.share.widget.FileThumbnail');

dojo.declare("lconn.share.widget.FileRendererGrid", [lconn.share.widget.FileRendererCore, lconn.share.widget.AbstractRendererSocial, lconn.share.widget.FileRendererPostProcessor, lconn.share.widget.StreamRendererMultiSelection], {
  
   showTags: true,
   showComments: true,
   showDownloads: true,
   showRecommendations: true,
   downloadFilesNodes: "<a><img alt=\"\"><span class=\"lotusAltText\"></span></a>",
   metas: [],
   //gridStrings: dojo.i18n.getLocalization("lconn.share","GridString"),
   play:null,
   fileThumbnailWidgets:[],

   constructor: function() {
      var metas = [];
      metas.push({
         id: "owner",
         isValid: dojo.hitch(this, function(file){
            var author = file.getAuthor();
            return this.displayOwner && author && author.name;
         }),
         render: dojo.hitch(this, function(app, file, d, el, opts){
            var a = el;
            this.generateLinkToPerson(file.getAuthor(), a);
            a.appendChild(d.createTextNode(file.getAuthor().name));
         })
      });
      metas.push({
         id: "modifier",
         isValid: dojo.hitch(this, function(file){
            var isChanged = (file.getUpdated().getTime() != file.getPublished().getTime()); 
            var modifier = isChanged? file.getModifier() : file.getAuthor();
            return !file.getConfiguration().hideListTime && modifier && modifier.name;
         }),
         render: dojo.hitch(this, function(app, file, d, el, opts){
            var d = document;
            var isChanged = (file.getUpdated().getTime() != file.getPublished().getTime()); 
            var modifier = isChanged? file.getModifier() : file.getAuthor();
            var nls = this._appstrings.DOCUMENTCONTENT;
            var dateStrings = isChanged ? nls.LABEL_UPDATED_OTHER : nls.LABEL_ADDED_OTHER;
            var df = new lconn.share.util.DateFormat(file.getUpdated());
            var text = df.formatByAge(dateStrings);
            lconn.share.util.html.substitute(d, el, text, {
               user: function() {
                  var a = d.createElement("a");
                     a.className = "lotusPerson";
                     a.appendChild(d.createTextNode(modifier.name));
                     this.generateLinkToPerson(modifier, a);
                  return a;
               }
            }, null, this);
            el.title = df.format(dateStrings.FULL);
         })
      });

      this.metas = metas;
   },

   _updateItem: function(stream, data, el, item, oldItem, position) {
      var retval = this.inherited(arguments);
      if(oldItem.element) {
         var div = oldItem.element.parentNode;
         this.attachDragSource(div, stream, data);
      }
      return retval;
   },

   /**
    * used for rendering of an item:
    * provides widget data object for an item
    * 
    * - can be overridden by sub class or consumer to provide own widget data
    * 
    * @param item
    * @param favorites
    * @returns object
    */
   constructWidgetData: function( item, favorites ) {
      var widgetData = {
            isSelectedstatus: item._isSelected,
            fileId: item.getId(),
            fileSync: item.isSyncable() && item.getLibraryType()=="personalFiles",
            fileName: lconn.share.util.html.formatFilename(item.getNameNls ? item.getNameNls() : item.getName()),
            fileType: lconn.share.util.text.getExtension(item.getName()),
            fileAuthor: item.getAuthor(),
            fileDatePublished: item.getPublished().toJSON(),
            fileModifier: item.getModifier(),
            fileDateModified: item.getUpdated().toJSON(),
            filePath: this.getUrlForPersonalFileInCommunity(item, this.app),
      };
      if (!this.app.isCommunityScene && item.getLibraryType() != "communityFiles" && item.getLibraryType() != "communityECMFiles") {
         widgetData.context = 'files';
      }else {
         widgetData.context = 'communityFiles';
      }

      //Here is the  filePinned  code
      var favoritesFiles = favorites ? favorites.files : null;
      if (favoritesFiles) {
         if (!this.app.isCommunityScene && item.getLibraryType() != "communityFiles" && item.getLibraryType() != "communityECMFiles") {
            widgetData.filePinned = favoritesFiles.isPinned(item.getId());
            var pinnedAction = new Object();
            pinnedAction.callback = favoritesFiles.gridOnToggle;
            pinnedAction.that = favoritesFiles;
            widgetData.pinnedAction = pinnedAction;
         }
      }

      if (item.isExternal() && ((this.app && this.app.isCommunityScene && !this.app.isExternalCommunity) || !this.app.isCommunityScene)) {
         widgetData.fileVisibilityLocking = "sharedExternally";
      }
      else if (item.isLocked()) {
         var lock = item.getLock();
         var userid = this.app.getAuthenticatedUserId();
         var lockByMe = userid == lock.getOwner().id;
         widgetData.fileVisibilityLocking = lockByMe ? "lockedByMe" : "locked";
      }else{
         widgetData.fileVisibilityLocking = lconn.files.scenes.share.getVisibility(item);
         widgetData.fileVisibilityLocking=widgetData.fileVisibilityLocking=="community" ? "sharedCommunity" : widgetData.fileVisibilityLocking;
      }

      widgetData = lconn.share.scenehelper.customizeViewObject(item, widgetData, 64);
      var url = item.getUrlThumbnail();
      if (url) {
         url = url + "&preventCache=" ;
         if (this.isVideo(item)) {
            widgetData.fileImagePath = url + new Date(item.getSystemLastModified()).getTime();
         }else {
            widgetData.fileImagePath = url + new Date(item.getUpdated()).getTime();
         }
      }
      widgetData.fileSystemLastModified = item.getSystemLastModified().toJSON();

      return widgetData;
   },

   /**
    * used for rendering of an item:
    * provides list of actions for an item for the widget data
    * 
    * - can be overridden by sub class or consumer to provide own list of actions
    * 
    * @param item
    * @param stream
    * @param data
    * @returns array of actions
    */
   getActionListForItem: function( item, stream, data ) {
      if ( !this.actions )
      {
         if (!this.app.isCommunityScene) {
            this.actions = lconn.files.actions.get("grid", this.app, this);
         }
         else {
            this.actions = lconn.files.actions.get("communityGrid", this.app, this);
        }
      }

      return this.previewGridActionButton(stream, data, item, this.actions, this);
   },

   /**
    * used for rendering of an item:
    * provide thumbnail widget instance for given widget data
    * 
    * - can be overridden by sub class or consumer to provide own thumbnail widget instance for given widget data
    * 
    * @param widgetData
    * @returns instance of {lconn.share.widget.AbstractThumbnail}
    */
   getItemThumbnailWidget: function( widgetData ) {
      return new lconn.share.widget.FileThumbnail({value: widgetData});
   },

   /**
    * Creates a node representing a grid item in the dom
    * - This node shall be responsible for the outer layout (size, margin, padding, border) of
    *   a grid item - see css rules with css class 'lconnFilesGridItem'
    * - It is assumed that the grid item's content does not provide any outer layout
    *   Especially, the corresponding css styling for 'thumbnail widget' has been 'switched off'
    *   by corresponding css rules.
    * 
    * @param parentNode - container node for grid items
    * @param itemContentNode - node representing the grid item's content
    */
   _addGridItem: function( parentNode, itemContentNode ) {
      var gridItemDiv = dojo.create( "div", null, parentNode );
         dojo.addClass( gridItemDiv, "lconnFilesGridItem" );
      gridItemDiv.appendChild( itemContentNode );
   },

   _render: function(stream, el, data, opt) {
      var opt = opt || {};
      var items = this._getItems(data.xml);
      var size = (data.paging) 
            ? Math.min(data.paging.size,items.length)
            : items.length;
      var d = document;
      var items = this.initData(data);
      
      var max = (data.paging) ? data.paging.size : size;
      var table = el.lastChild;
      if (table && (table._view != "grid" || table.nodeName.toLowerCase() != "table" 
          || (table.firstChild.childNodes.length != max * 2 && !opt.enableContinuousScrolling )
          || (opt.dataInited != undefined && opt.enableContinuousScrolling))) {
         dojo.empty(el);
         table = null;
      }

      var currentTableChildNodesLenth = 0;
      if (!table) {
        table = dojo.create("table",{role:"presentation"},el);
        if (dojo.isSafari) {
            table.width = el.clientWidth + "px";
        }
        table._view = "grid";
        dojo.connect(table, "onmousedown", dojo.hitch(this, "toggleByElement", stream));
        tbody = dojo.create("tbody",{},table);
        tr = dojo.create("tr",{},tbody);
        td = dojo.create("td",{role: "list"},tr);
        el.className = "lconnGridView";
        this.fileThumbnailWidgets = [];
        this.emptySelection();
        this.initItemByPosition(items);
      } else if (opt.enableContinuousScrolling ) {
        tbody = table.firstChild;
        tr = tbody.firstChild;
        td = tr.firstChild;
        this.fileThumbnailWidgets = this.fileThumbnailWidgets || [];
        currentTableChildNodesLenth = this.fileThumbnailWidgets.length;
        this.appendItemByPosition(items);
      }
      for (var i=0; items!=null&&i<items.length; i++) {
        if(items[i]._isSelected)
           this.appendSelection(items[i]);
      }
      if (size > 0) {
         this.actions = null;
         var fragment = d.createDocumentFragment();
         this.renderSorting(stream, fragment, data, opt);
         if (el.firstChild != table) {
            var old = el.replaceChild(fragment, el.firstChild);
            lconn.share.util.html.destroyWidgets(old);
         }else{
            el.insertBefore(fragment, el.firstChild); 
         };
         var dataList = new Array();
         this.favorites = ((this.app.isAuthenticated() && this.app.favorites) ? this.app.favorites : null);
         for (var itemIndex = 0; itemIndex < size; itemIndex++){
            var item = items[itemIndex];
            var gridData = this.constructWidgetData( item, this.favorites );
            gridData.actionListValue = this.getActionListForItem( item, stream, data );
            gridData._itemIndex = itemIndex;
            dataList.push(gridData);
         };

         // wrap all grid thumbnails in a div and add dojo DND hooks
         if (td.firstChild && opt.enableContinuousScrolling) {
           dndDiv = td.firstChild;
         } else {
           dndDiv = dojo.create("div", null, td, "first");
           dojo.addClass( dndDiv, "dojoDndSource dojoDndTarget dojoDndContainer");
         }
         

         dojo.forEach(dataList, dojo.hitch(this, function(widgetData, i){
            dojo.mixin(widgetData, {role: "listitem", index: i+1});
            var itemThumbnailWidget = this.getItemThumbnailWidget( widgetData );
            if (widgetData.isSelectedstatus) {
               itemThumbnailWidget._setSelectedAttr(true);
            }
            this.fileThumbnailWidgets.push(itemThumbnailWidget);
            this.addStateful(itemThumbnailWidget, items[widgetData._itemIndex]);
            
            // add dojo DND hooks to each thumbnail
            lconn.share.scenehelper.applyDndProperty(itemThumbnailWidget.domNode, widgetData._itemIndex + currentTableChildNodesLenth, items[widgetData._itemIndex]);

            this._addGridItem( dndDiv, itemThumbnailWidget.domNode );
         }));
         var favoritesFiles = this.favorites ? this.favorites.files : null;
         var favoritesFolders = this.favorites ? this.favorites.folders : null;
         if( favoritesFiles ) {
            if( !favoritesFiles.def.isCanceled() ) {
               favoritesFiles.def.resolve( this.fileThumbnailWidgets );
               favoritesFiles.def.cancel();
            }
         }
         if( favoritesFolders && favoritesFolders.def) {
             if( !favoritesFolders.def.isCanceled() ) {
            	 favoritesFolders.def.resolve( this.fileThumbnailWidgets );
            	 favoritesFolders.def.cancel();
             }
          }
         lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(stream.domNode);
         this.updatePaging(stream,el, data, opt);
         this.attachDragSource(dndDiv, stream, data);
      }
      else {
         this.renderEmpty(stream, el, data);
      }
   },

    renderItemGrid: function(stream, el, data, doc,actions) {
     var previewConfig = lconn.share.previewConfig;
     var fontHeight=previewConfig.gridViewTextHeight;
     var imgHeight= previewConfig.gridViewHeight;
     var imgWidth=previewConfig.gridViewWidth;
      var totalHeight=parseInt(imgHeight)+parseInt(fontHeight);
      var px="px";
      //create img div
      var that=this;
      var app = this.app;
      var titleDiv = dojo.create("div", {className: "grid-ics-tile"},el);
          titleDiv.style.width=imgWidth+px;
          titleDiv.style.height=totalHeight+px;
          doc.checkElement=titleDiv;
          this.selectionListeners.push(dojo.connect(titleDiv, "onclick", dojo.hitch(this, "onSelectItem", doc)));
          this.selectionListeners.push(dojo.connect(titleDiv, "onmouseenter", dojo.hitch(this, "onMouseEnter", doc,doc.getId())));
          this.selectionListeners.push(dojo.connect(titleDiv, "onmouseleave", dojo.hitch(this, "onMouseLeave", doc,doc.getId())));
          var wrapperDiv =dojo.create("div",{className:"grid-ics-wrapper"},titleDiv);
             var innerDiv =dojo.create("div",{className:"grid-ics-inner"},wrapperDiv);
                var frontDiv =dojo.create("div",{id:"grid-front"+doc.getId(),className:"grid-ics-tile-front"},innerDiv);
                frontDiv.style.width=imgWidth+px;
                frontDiv.style.height=totalHeight+px;
                   var titleImgDiv =dojo.create("div",{className:"grid-ics-tile-img"},frontDiv);
                   titleImgDiv.style.width=imgWidth+px;
                   titleImgDiv.style.height=imgHeight+px;
                   titleImgDiv.style.position="relative";
                   var name = lconn.share.util.html.formatFilename(doc.getName());
                   var fullName = name;
                   var fontName = name;
                   var url= doc.getUrlThumbnail();
                   var imgA = dojo.create("A", {href: "javascript:;"}, titleImgDiv);
                       imgA.setAttribute("role", "button");
                          var imgDiv = null;
                          var img =null;
                          if(url!=""){
                             imgDiv = dojo.create("div",{className: "grid-ics-tile-img"}, imgA);
                             img = dojo.create("img", {title: name,className:"grid-img",style:"max-height:"+imgHeight+px+";max-width:"+imgWidth+px,src:url}, imgDiv);
                             if(previewConfig.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
                                dojo.create("span",{className:"grid-ics-videoimg"},imgDiv);
                             }
                             dojo.connect(img, "onerror",function(event){
                                dojo.empty(imgDiv);
                                imgDiv.className="grid-ics-tile-img  grid-ics-tile-icon";
                                var errorimg = dojo.create("img", {title: name}, imgDiv);
                                that.generateFileTypeImage(errorimg, lconn.share.util.text.getExtension(doc.getName()), 64, doc);
                                if(previewConfig.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
                                   dojo.create("span",{className:"grid-ics-playimg"},imgDiv);
                                }
                               });
                          }else{
                             imgDiv = dojo.create("div",{className: "grid-ics-tile-img  grid-ics-tile-icon"}, imgA);
                             img = dojo.create("img", {title: name}, imgDiv);
                             this.generateFileTypeImage(img, lconn.share.util.text.getExtension(doc.getName()), 64, doc);
                             if((doc.getExtension()!="") && previewConfig.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1)
                             {
                                dojo.create("span",{className:"grid-ics-playimg"},imgDiv);
                             }
                          }
                         
                          var _frontDiv=dojo.create("div",{className:"grid-ics-tile-summary",style:"line-height:"+fontHeight+px},frontDiv);
                          _frontDiv.style.width=imgWidth+px;
                          _frontDiv.style.height=fontHeight+px;
                          var fontWidth=parseInt(imgWidth)-20;
                          var _fontDiv= null;
                          if(!dojo._isBodyLtr()){
                            fontName=this.trimToLength(name, 27);
                            _fontDiv=dojo.create("div",{className:"grid-ics-tile-summary-text",style:"line-height:"+fontHeight+px,dir:"ltr"},_frontDiv);
                          }else{
                            _fontDiv=dojo.create("div",{className:"grid-ics-tile-summary-text",style:"line-height:"+fontHeight+px},_frontDiv);
                          }
                          _fontDiv.style.width=fontWidth+px;
                          _fontDiv.style.height=fontHeight+px;
                             var span=dojo.create("span",{},_fontDiv); 
                             span.innerHTML=fontName;
                             var m = this.getShareMessage(doc, this._strings);
                             var d = document;
                             var img_t = d.createElement("img");
                             var img = img_t.cloneNode(true);
                             img.src = dojo.config.blankGif;
                             img.className = m.i;
                             img.title = img.alt = dojo.string.substitute(m.s,[m.c]);
                             img.style.marginTop = "1px";
                             var shareSpan=dojo.create("span",{className:"grid-span-right"},_frontDiv); 
                             shareSpan.style.top="5px";
                             if(this.applyShareLink){
                                this.applyShareLink(this.app,shareSpan,img,null,m.a,doc);
                             }
      //create back div
      var backDiv = dojo.create("div",{id:"grid-back"+doc.getId(),className:"grid-ics-tile-back"},innerDiv);
      dojo.create("span",{className:"grid-ics-tile-uncheck"},backDiv);
      backDiv.style.width=imgWidth+px;
      backDiv.style.height=totalHeight+px;
      var backH4="";
          if(dojo._isBodyLtr()){
              backH4 = dojo.create("h4",{className:"grid-h4-padding-left grid-ics-tile-summary-text"},backDiv);
          }else{
              backH4 = dojo.create("h4",{className:"grid-h4-padding-left grid-ics-tile-summary-text",dir:"ltr"},backDiv);
          }
          var backA=dojo.create("a",{className:"",href:doc.getUrlAlternate(),title:fullName},backH4);
          backA.innerHTML=dojo._isBodyLtr()?fullName:fontName;
             dojo.connect(backA, "onclick", function(evt){
                if (evt) dojo.stopEvent(evt);
                window.location=doc.getUrlAlternate();
              });
                var backCreateDiv = dojo.create("div",{className:"grid-div-pading-left"},backDiv);
                dojo.connect(backCreateDiv, "onclick", function(evt){
                   if(evt.target.href!=undefined){
                    if (evt) dojo.stopEvent(evt);
                    window.location=evt.target.href;
                   }
                });
                var metas = this.metas;
                      var opts = {
                          app: app,
                          file: doc,
                          renderer: this,
                          nls: dojo.mixin({}, this._appstrings, this._strings)
                            };
                         if(this.applyFileDescriptions){
                            this.applyFileDescriptions(app, doc, metas, d, backCreateDiv, opts);
                         }

                                dojo.create("div",{className:"grid-bottom"},backDiv);
                                this.renderGridButton(backDiv, stream, data, doc, actions,this);
                                dojo.create("span",{className:"grid-ics-tile-check"},wrapperDiv);
                                if (this.createFavoriteToggle) {
                                if (doc.getLibraryType() != "communityFiles" && doc.getLibraryType() != "communityECMFiles") {
                                    this.favorites = ((app.isAuthenticated() && app.favorites) ? app.favorites.files : null);
                                    var  pinnedA = this.favorites.createToggle(doc.getId());
                                    var  pinnedBackA = this.favorites.createToggle(doc.getId());

                                    var  pinnedDiv=null;
                                    var  pinnedBackDiv=null;
                                        pinnedDiv=dojo.create("div",{id:"grid-pinnedDiv"+"-"+doc.getId(),className:"grid-a-pinned "},wrapperDiv);
                                        pinnedBackDiv=dojo.create("div",{id:"grid-pinnedDiv2"+"-"+doc.getId(),className:"grid-a-back-pinned "},backDiv);

                                        pinnedDiv.appendChild(pinnedA);
                                        pinnedBackDiv.appendChild(pinnedBackA);

                                        this.selectionListeners.push(dojo.connect(pinnedDiv, "onclick", dojo.hitch(this, "onPinnedDivClick", this,doc)));
                                        this.selectionListeners.push(dojo.connect(pinnedBackDiv, "onclick", dojo.hitch(this, "onPinnedBackDivClick", this,doc)));
                                      }
                                }

                                var isSelected = doc._isSelected;
                                if(isSelected){
                                   doc.checkElement.className="grid-ics-tile grid-ics-is-selected ";
                                }
                               
   },

   generateLockIcon: function(d, el, doc, userid, opt){
   },

   renderUserFragment: function(stream, data, item, position, span) {
      var d = document;
      var isChanged = (item.getUpdated().getTime() != item.getPublished().getTime()); 
      var modifier = isChanged? item.getModifier() : item.getAuthor();
      var byMe = this.permissions.isAuthenticated() ? this.permissions.isAuthenticated(modifier.id) : false;
      var nls = this._appstrings.DOCUMENTCONTENT;
      var dateStrings = isChanged 
            ? (byMe ? nls.LABEL_UPDATED : nls.LABEL_UPDATED_OTHER)
            : (byMe ? nls.LABEL_ADDED : nls.LABEL_ADDED_OTHER);
      var df = new lconn.share.util.DateFormat(item.getUpdated());
      var text = df.formatByAge(dateStrings);
      lconn.share.util.html.substitute(d, span, text, {
         user: function() {
            var a = d.createElement("a");
               a.className = "lotusPerson";
               a.appendChild(d.createTextNode(modifier.name));
               this.generateLinkToPerson(modifier, a);
            return a;
         }
      }, null, this);
      span.title = df.format(dateStrings.FULL);
   },

   isSkipNode: function(node) {
      return node.className == "lotusTags" || node.className == "lotusRecommend";
   },

   getSorts: function(sortId, direction) {
      var nls = this._appstrings.COLUMN.FILE;
      var sorts = [
         {id: "name", name: nls.NAME, lowToHigh: true, tooltip: nls.NAME_L},
         {id: "modified", name: nls.MODIFIED, isDefault: true, tooltip: nls.MODIFIED_L}
      ];

      if (this.showDownloads)
         sorts.push({id: "downloads", name: nls.DOWNLOADS, tooltip: nls.DOWNLOADS_L});
         
      if (this.showComments)
         sorts.push({id: "comments", name: nls.COMMENTS, tooltip: nls.COMMENTS_L});
      
      if (this.showRecommendations)
         sorts.push({id: "recommendations", name: nls.RECOMMENDATIONS, tooltip: nls.RECOMMENDATIONS_L});

      return sorts;
   },

   buildXsltRecommendation: function(doc, a) {
      return new lconn.files.widget.RecommendInfo({_rendered:true, imgNode: a.firstChild, labelNode: a.lastChild}, a);
   },

   clickRecommendation: function(stream, position, e) {
      this._xsltRecommender(stream, position, "onClick", e);
   }, 

   hoverRecommendation: function(stream, position, e) {
      this._xsltRecommender(stream, position, "onMouseEnter", e);
   },

   buildRecommendation: function(doc, a) {
      return new lconn.files.widget.RecommendInfo({nls: this._appstrings.RECOMMEND, countOnly: true, timesRated: doc.getRatingCount(), large: true}, top);            
   },

   onSelectAll: function(data, checkbox, el) {
      if (!data || !data.itemByPosition)
         return;
      var items = data.itemByPosition;
      var isSelected = checkbox.checked; 
      var selection = [];
      dojo.forEach(items, function(item) {
      	if(isSelected){
      		item._isSelected=true;
         }else{
            item._isSelected=false;
         }
         if (isSelected)
            selection.push(item);
      });
      dojo.forEach(this.fileThumbnailWidgets,function(fileThumbnailWidget){
         if(isSelected){
            fileThumbnailWidget._setSelectedAttr(true);
         }
         else{
            fileThumbnailWidget._setSelectedAttr(false);
         }
      });
      this.selection = selection;
      this.selectionChanged(this.selection);
      this.updateSelectAllTitle();
   },

   onSelectItem: function(item,flag){
      if(!flag){
         var id = item.getId ? item.getId() : item.id;
         this.selection = dojo.filter( this.selection, function( s ) {
            if ( s == item )
               return false;
            var sId = s.getId ? s.getId() : s.id;
            if ( sId && id && sId == id )
               return false;
            return true;
         } );
         item._isSelected = false;
      }
      else{
         item._isSelected=true;
         this.selection.push(item);
      }
      if (this.selectAllElement)
         this.selectAllElement.checked = this.isAllSelected();
      this.selectionChanged(this.selection);
      this.updateSelectAllTitle();
   },

   onMouseEnter: function(item,id){
      if(dojo.isIE){
         var fadeout = dojo.fadeOut({ 
            node: "grid-front"+id, 
            duration: 1000 
             }); 
           dojo.connect(fadeout, "onEnd", function(){  
             var front=dojo.byId("grid-front"+id);
               front.style.display="none";
               item.checkElement.className=item.checkElement.className+"  grid-ics-hover";
               
             var back=dojo.byId("grid-back"+id);
             back.checkElement.className=item.checkElement.className+"  grid-ics-tile-back-show";
            });  
          fadeout.play(); 
          play=fadeout;
      }else{
         var front=dojo.byId("grid-front"+id);
         if(item.checkElement==null||item.checkElement==""){
            item.checkElement=front.parentNode.parentNode.parentNode;
         }
         item.checkElement.className=item.checkElement.className+"  grid-ics-hover";
      }
   },

   onMouseLeave: function(item,id){
      if(dojo.isIE){
         play.stop();
         var front=dojo.byId("grid-front"+id);
          front.style.display="block";
         var fadeIn = dojo.fadeIn({ 
            node: "grid-front"+id, 
            duration: 1000
         }); 
          dojo.connect(fadeIn, "onEnd", function(){  
             var back=dojo.byId("grid-back"+id);
             back.checkElement.className="grid-ics-tile-back";
           });  
         fadeIn.play(); 
      }else{
         var front=dojo.byId("grid-front"+id);
         if(item.checkElement==null||item.checkElement==""){
            item.checkElement=front.parentNode.parentNode.parentNode;
         }
         item.checkElement.className=item.checkElement.className.replace("grid-ics-hover"," ");
      }
   },

   onPinnedDivClick: function(_this,doc,evt){
     if (evt) dojo.stopEvent(evt);
     var pinnedA=dojo.byId("grid-pinnedDiv"+"-"+doc.getId()).firstChild;
     var pinnedBackA=dojo.byId("grid-pinnedDiv2"+"-"+doc.getId()).firstChild;
    
     dojo.publish(dojo.attr(pinnedA, "topic"), [pinnedA, evt]);
     if(pinnedBackA.firstChild.className.indexOf("lconnSprite-iconPinned16-on")>0){
         dojo.publish(dojo.attr(pinnedBackA, "topic"), [pinnedBackA, evt]);
     }
     dojo.byId("grid-pinnedDiv2"+"-"+doc.getId()).className="grid-pinned-show";
   },

   onPinnedBackDivClick: function(_this,doc,evt){
     if (evt) dojo.stopEvent(evt);
     var pinnedA=dojo.byId("grid-pinnedDiv"+"-"+doc.getId()).firstChild;
     dojo.publish(dojo.attr(pinnedA, "topic"), [pinnedA, evt]);
     dojo.byId("grid-pinnedDiv2"+"-"+doc.getId()).className="grid-pinned-hidden";
   },

   trimToLength: function(s, length) {
      var that=this;
      if (!s) return "";
      var ellipsis = "...";
      if (s.length > length)
         s =ellipsis+that.trimEnd(s.substring(0, length-ellipsis.length));
      return s;
   },

   addStateful: function(stateful, item) {
      var that =this;
      stateful.watch('selected', function(){
         that.onSelectItem(item,stateful.selected);
      });
   },

   trimEnd: function( s ) {
      if (!s) return "";
      s += "";
      s = /^(.*?)\s*$/.exec(s)[1];
      return s;
   },

   isVideo: function (item) {
      var ext = item.getExtension();
      var videoExts = lconn.share.previewConfig.validVideoExts;
     var arrayExts = videoExts.split(",");
     var videoIndex = dojo.indexOf(arrayExts, ext);
     return (videoIndex != -1) ? true : false;
   },

   getUrlForPersonalFileInCommunity: function(file, app, opt) {
     var routes = app.routes;
     var fileId = file.getId();

     var url = file.getUrlAlternate ? file.getUrlAlternate() : null;
     if (file.getLibraryType() == "communityECMFiles")
        url = url || file.getUrlVia ? file.getUrlVia() : null;
     url = url || routes.getFileSummaryUrl(null, fileId, {section: (opt) ? opt.section : null});
     if (this.app.restrictUserInComm && this.app.isCommunityScene && file.getLibraryType() != "communityFiles")
        url = routes.getFileSummaryUrl(null, fileId, {section: (opt) ? opt.section : null});

     return url;
   }
});
  