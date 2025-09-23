/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.FileRendererCore");

dojo.require("dojo.dnd.Source");
dojo.require("lconn.core.config.features");
dojo.require("lconn.core.svg.svgHelper");
dojo.require("lconn.share.widget.FileRendererCoreDndSource");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.configUtil");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.bean.File");
dojo.require("lconn.share.bean.StreamPermissions");
dojo.require("lconn.share.widget.StreamRenderer");
dojo.require("lconn.share.util.Html5Util");
dojo.require("lconn.share.widget.CustomizeAvatar");

dojo.declare("lconn.share.widget.FileRendererCore", [lconn.share.widget.StreamRenderer], {

   dnd: true,
   permissions: new lconn.share.bean.StreamPermissions(),
   _strings: {},
   useXslt: dojo.getObject("lconn.share.config.features.useXslt"),
   getItembyPosition: [],
   
   destroy: function() {
      this.actions = [];
      this.inherited(arguments);

      lconn.share.util.misc.destroy(this.dndSource);
      this.dndSource = null;
   },

   apiType: 'qcs',
   _buildItem: function(element, existingItem) {
      if (element instanceof lconn.share.bean.PartialFile) {
         dojo.mixin(existingItem, element);
         return existingItem;
      }
      return lconn.share.bean.File.createBean(element, {apiType: this.apiType});
   },

   attachDragSource: function(dndSourceEl, stream, data) {
      if (!this.dnd)
         return;
         
      if (!this.permissions.isAuthenticated())
         return;
      if (lconn.share.util.configUtil.isFilesEnableContinuousScrolling(this.app.authenticatedUser)) {
        this.getItembyPosition = this.itemByPosition;
      } else {
        this.getItembyPosition = this.initData(data);
      }
      
      if(this.dndSource && this.dndSource.node == dndSourceEl) {
         this.dndSource.sync();
         return;
      }

      lconn.share.util.misc.destroy(this.dndSource);
      this.dndSource = null;
      
      // Make file appear beside cursor, not below it
      dojo.dnd.manager().OFFSET_Y = -10;

      var source;
      dojo.dnd.manager().makeAvatar = this._createCustomizeAvatar;
      
      var dragCreator = dojo.hitch(this, function(item) {
         var file = item.data;
         var node = this._renderAvatar(file);
         
         return {
            node: node,
            type: item.type
         };
      });
      
      if (dndSourceEl) {
         source = this.dndSource = new lconn.share.widget.FileRendererCoreDndSource( dndSourceEl, {
            app: this.app,
            copyOnly: true,
            selfAccept: true,
            accept: ["file"],
            singular: true,
            withHandles: true,
            creator: dragCreator,
            getItem: dojo.hitch(this, function(id, resolveFileObject) {
               var currentItem = this.dndSource.map[id];
               if(!currentItem)
                  return;

               this.selectionUpdateItems(this.getItembyPosition);
               var file = this.getItembyPosition[currentItem.data];
               return {
                  data: resolveFileObject ? file : currentItem.data,
                  type: file ? (file.isFolder() ? ["folder"] : ["file"]) : currentItem.type
               };
            }),
            
            onDrop: dojo.hitch( this, function( source, nodes, isCopy) {
               try {
                  var trgNode = source.targetAnchor;
                  var trgItem = source.getItem( trgNode.id, true );
                  var trgBean = trgItem && trgItem.data || null;
                  
                  var srcItems = [];
                  dojo.forEach(nodes, dojo.hitch(this, function(n, i){
                     var srcNode = n;
                     var srcItem = source.getItem(srcNode.id, true);
                     var srcBean = srcItem && srcItem.data || null;
                     srcItems.push(srcBean);
                  }));
                  if(srcItems.length > 0 && trgBean && trgBean.isFolder()) {
                     if(typeof this._dropFile == "function")
                        this._dropFile(srcItems, trgBean);  // _dropFile function can be designed by current "this" object 
                  }
                  else
                     return;
               }
               catch(ex) {
                  // post some message on the screen via the MessageContainer dijit
                  dojo.publish("/dnd/cancel", [source]);
                  throw new Error("Exception: something went wrong during drag and drop operation: " + ex);
               }
            })
         }); 
      }
   },
   
   _createCustomizeAvatar: function() {
      return new lconn.share.widget.CustomizeAvatar(dojo.dnd.manager());
   },

   _renderAvatar: function(file) {
      var d = document;
      var fileType = file.isFolder()? null : file.getExtension();
         if (fileType) {
            var img = d.createElement("img");
            this.generateFileTypeImage(img, fileType, 16, file);
      }     
       
      var div = d.createElement("div");
      
      if(img)
         div.appendChild(img);
      
      var itemName = d.createElement("span");
      itemName.className = "DropAvatarItem";
      itemName.appendChild(d.createTextNode(lconn.share.util.text.trimToLength(lconn.share.util.html.formatFilename(file.getName()), 50)));
      
      div.appendChild(itemName);
      
      if(file.isFolder())
         dojo.place(this._getFolderIcon(file), div, "first");
      return div;
   },
   
   _getFolderIcon: function(file) {
      var blankGif = dojo.config.blankGif;
      if (lconn.share.util.configUtil.isFilesEnableNewFolderIcon(this.app.authenticatedUser)) {
    	 var div = document.createElement("div");
    	     div.className = "lconnSprite lconnSprite-iconFolderClose24";
    	 if (file.type == "community") {
        	div.className = "lconnSprite-iconFolderClose24 lconnSprite-iconFolderCommunity24";
        	lconn.core.svg.svgHelper.loadIcon(div, "communityFolder");
         } else if(file.isPrivate()) {
    	    div.className = "lconnSprite-iconFolderClose24 lconnSprite-iconFolderPrivate24";
    	    lconn.core.svg.svgHelper.loadIcon(div, "privateFolder");
    	 } else if(file.isPublic()) {
    	    div.className = "lconnSprite-iconFolderClose24 lconnSprite-iconFolderPublic24"; 
    	    lconn.core.svg.svgHelper.loadIcon(div, "publicFolder"); 
    	 } else if(file.isShared()) {
    	    div.className = "lconnSprite-iconFolderClose24 lconnSprite-iconFolderShared24";
    	    lconn.core.svg.svgHelper.loadIcon(div, "sharedFolder");
    	 } 
    	    return div;
      } else {
         if (file.type == "community")
    	    return '<img name="communityFolder" src="'+blankGif+'" class="lconnSprite-iconFolderClose24 lconnSprite-iconFolderCommunity24 dndFolderIcon">';
    	 else if(file.isPrivate())
    	    return '<img name="privateFolder" src="'+blankGif+'" class="lconnSprite-iconFolderClose24 lconnSprite-iconFolderPrivate24 dndFolderIcon">';
    	 else if(file.isPublic())
    	    return '<img name="publicFolder" src="'+blankGif+'" class="lconnSprite-iconFolderClose24 lconnSprite-iconFolderPublic24 dndFolderIcon">';
    	 else if(file.isShared())
    	    return '<img name="sharedFolder" src="'+blankGif+'" class="lconnSprite-iconFolderClose24 lconnSprite-iconFolderShared24 dndFolderIcon">';
    	 else
    	    return '<img name="closedFolder" src="'+blankGif+'" class="lconnSprite-iconFolderClose24 dndFolderIcon">'; 
      }
   },

   render: function(stream, el, data, item) {
      if (lconn.share.util.configUtil.isFilesEnableContinuousScrolling(this.app.authenticatedUser)) {
        stream = dojo.mixin({}, stream);
      }
      item = item || {};
      item.enableContinuousScrolling = (item.enableContinuousScrolling !== false) && lconn.share.util.configUtil.isFilesEnableContinuousScrolling(this.app.authenticatedUser);
      item.enableShareLink = (item.enableShareLink !== false) && lconn.share.util.configUtil.isFilesEnableShareLink(this.app.authenticatedUser);
      var start = new Date().getTime();

      this.cleanup();
      data._init = data._initXslt = false || item.dataInited;
      this.animations = [];
      this._render(stream, el, data, item);
      this.addDropPrompts(el, data);
      for (var i=0; i<this.animations.length; i++)
         this.animations[i].play();
         
      var end = new Date().getTime();
      if (!window['stats']) window.stats = {};
      if (!window.stats.jsRender) window.stats.jsRender = [];
      window.stats.jsRender.push(end - start);      
   },
   
   addDropPrompts: function(el, data){
      var items = this._getItems(data.xml);

      if (this.app.enableDnDPrompts && this.app.isPersonalFiles && lconn.share.util.Html5Util.allowHTML5()) {
         var displayDragZone = false;
         var navid = this.app.scene.activePivot.navigationId; 
         if (navid == "myfiles" || navid == "pinnedfiles") {
            displayDragZone = true;
         }
         if (this.app.scene && this.app.scene.collection && this.app.scene.collection.getPermissions().AddChild) {
            displayDragZone = true;
         }
         if (displayDragZone) {
            if (items.length == 0) {
               var d = document;
               var dropZone = d.createElement("div");
                  dojo.addClass(dropZone, "tallDropfilesPrompt");
                  dropZone.style.width  = "9999px";
                  var dropIcon = d.createElement("img");
                     dropIcon.src = dojo.config.blankGif;
                     dropIcon.alt= "";
                     dojo.addClass(dropIcon, "dropfilesIcon64");
               dropZone.appendChild(dropIcon);
               
               var dragH = d.createElement("p");
                  dragH.appendChild(d.createTextNode(this._appstrings.DRAG_DROP.TITLE));
                  dojo.addClass(dragH, "filesDnDTitle");
                  dragH.id = dijit.getUniqueId("fileDropTitle");
               var dragD = d.createElement("p");
                  var prompt = this._appstrings.DRAG_DROP.DESCRIPTION;
                  if (dojo.isFunction(this.scene.getPrompt)) {
                     var scenePrompt = this.scene.getPrompt();
                     if (dojo.exists("dnd.description", scenePrompt)) 
                        prompt = scenePrompt.dnd.description;
                  }
                  dragD.appendChild(d.createTextNode(prompt));
                  dojo.addClass(dragD, "filesDnDDesc");
               dropZone.appendChild(dragH);
               dropZone.appendChild(dragD);
               dijit.setWaiState(dropZone, "labelledby", dragH.id);
               dijit.setWaiRole(dropZone, "region");
               el.appendChild(dropZone);
            }
            
            dojo.body().addEventListener("dragover", dojo.hitch(this, "addDropHighlights"), false); 
            dojo.body().addEventListener("drop", dojo.hitch(this, "removeDropHighlights"), false);
            dojo.body().addEventListener("dragleave", dojo.hitch(this, "removeDropHighlights"), false);
         } else {
            dojo.body().addEventListener("dragover", dojo.hitch(this, "removeDropHighlights"), false);
         }
      }
   },
   
   addDropHighlights: function(e) {  
      e.stopPropagation();  
      e.preventDefault();
      
      //check if type of dragged item is file
      if (dojo.indexOf(e.dataTransfer.types, "Files") < 0)
         return;
      dojo.addClass(dojo.byId("body"), "filesDropAvatar");
      var lotusContent = dojo.byId("lotusContent");
      if (lotusContent.clientWidth < 770)
         dojo.addClass(dojo.byId("body"), "filesDropAvatarSmallScreen");
   },
   
   removeDropHighlights: function(e) {  
      e.stopPropagation();  
      e.preventDefault();
      dojo.removeClass(dojo.byId("body"), "filesDropAvatar");
      dojo.removeClass(dojo.byId("body"), "filesDropAvatarSmallScreen");
   },
   
   replaceItem: function(data, item, newentry) {
      var newitem = this._buildItem(newentry, item);
      
      data.itemByPosition[item._position] = newitem;
      data.itemById[item.getId()]         = newitem;
      
      newitem.author         = newitem.getAuthor();
      newitem.element        = item.element;
      newitem.elementExtra   = item.elementExtra;
      newitem.elementDetails = item.elementDetails;
      newitem.elementMenu    = item.elementMenu;
      newitem._isExpanded    = item._isExpanded;
      newitem._isRendered    = item._isRendered;
      newitem._isEcmFile     = item._isEcmFile;
      newitem._position      = item._position;
      newitem._ratingImage   = item._ratingImage;
      newitem._ratingText    = item._ratingText;
      newitem._recommender   = item._recommender;
      newitem._libraryType   = newitem.getLibraryType() || item.getLibraryType();
      
      this.selectionUpdateItem(newitem, item);
      
      return newitem;
   },

   xsltAction: function(act, position, e) {
      var r = this.getRenderer();
      r.initXsltData(this.data, this.streamNode);
      r[act](this, position, e);
   },
   
   hoverTime: function(stream, position, e) {
      var t = e.target;
      if (!t._time) {
         if (!t.title)
            t = t.parentNode;
         t.onmouseover = null;
         t._time = dojo.date.stamp.fromISOString(t.title);
         t.title = new lconn.share.util.DateFormat(t._time).format(this._appstrings.DATE.FULL);
      }
   },
   
   hoverDownload: function(stream, position, e) {
      var item = stream.data.itemByPosition[position];
      var el = item.element;
      if (el && !el._tooltip && this.renderDownloadWarning) {
         var t = e.target;
         t.onmouseover = null;

         var link = dojo.query(".lconnDownloadable", el)[0];
         if (link && link.nodeName.toLowerCase() == "a") {
            var w = el._tooltip = this.renderDownloadWarning(item.getName(), document, el.lastChild, link);
            w.onMouseEnter(e);
         }
      }
   },
   
   getActions: function(item) {
      return this.actions;
   },
   
   getUrlExpand: function(item) {
      var url;
      if (this.permissions.isAuthenticated())
         url = item.getUrlEdit();
      if (!url)
         url = item.getUrlEntry();
      
      var opts = {acls:true, includeNotification: true, includeTags: true, includePolicy: true};
      if (this.app && this.app.scene && this.app.scene.collection)
         opts.collectionId = this.app.scene.collection.getId();

      return lconn.share.util.uri.rewriteUri(url, opts);
   },

   getUrlEditTags: function(item) {
      return item.getUrlEdit();
   },

   decorateFileName: function(doc, h4, a) {
      this._configFileViewer(doc, h4, a);
   },

   _configFileViewer: function (doc, h4, a) {
      if (lconn.core.config.features("fileviewer-detailspage") && a && !doc.isFolder()) {
         this._attachFileNameAction(doc, a);
      } else if (a && a._fileNameClickHandle) {
         dojo.disconnect(a._fileNameClickHandle);
      }
   },
   
   _attachFileNameAction: function(doc, a) {
      if (this.fileNameAction === undefined) {
         this.fileNameAction = dojo.filter(this.getActions(doc), function(a) {return a.declaredClass == "lconn.files.action.PreviewFile";})[0] || null;
      }
      
      if (!this.fileNameAction) {
         return;
      }
      
      dojo.disconnect(a._fileNameClickHandle);
      a._fileNameClickHandle = dojo.connect(a, "click", dojo.hitch(this, function (e) {
         e.stopPropagation();
         e.preventDefault();
         
         this.fileNameAction.execute(doc, {});
      }));
   },
   
   generateLinkToFile: function(doc, a) {
      a.href = doc.getUrlAlternate();
      dojo.addClass(a, "lconnDownloadable");
   },
   
   generateLinkToPerson: function(user, a) {
   },
   
   generateLinkToTag: function(tag, a) {
   },
   
   generateFileTypeImage: function(img, ext, size) {
   },
   generateActionIcon: function(img, extension, size){
   },
   getLinkToUserTemplate: function(replacementVar) {
      return "javascript:;";
   },
   
   getShareMessage: function(doc, nls) {
      /*var shareCount = doc.getAllSharesCount();
      var visibility = doc.getVisibility();
      var msgShare, msgCount, altText, image;
      if (visibility == "private" && shareCount == 0) {
         altText = msgShare = nls.PRIVATE;
         image = "lconnSprite lconnSprite-iconPrivate16";
      }
      else {
         if (visibility == "public") {
            nls = nls.PUBLIC;
            altText = nls.BASE;
            image = "lconnSprite lconnSprite-iconPublic16";
         }
         else {
            nls = nls.SHARED;
            altText = nls.BASE;
            image = "lconnSprite lconnSprite-iconShared16";
         }
         if (shareCount > 1) {
            msgShare = nls.MANY;
            msgCount = dojo.string.substitute(nls.MANY_1,[dojo.number.format(shareCount)]);
         }
         else if (shareCount == 1) {
            msgShare = nls.ONE;
            msgCount = nls.ONE_1;
         }
         else
            msgShare = nls.BASE;
      }
      return {s: msgShare, c: msgCount, i: image, a: altText};*/
      return {/* s: "message describing share", c: "segment describing the count", i: "sprite classes", a: "alt text for sprite" */};
   },
      
   renderShareLink: function(el, msgShare, msgCount, altText, userId, fileId) {
      var d = document;
      if (msgShare && msgShare.nodeType == 1)
         el.appendChild(msgShare);
      else if (msgCount)
         el.appendChild(d.createTextNode(dojo.string.substitute(msgShare, [msgCount])));
      else
         el.appendChild(d.createTextNode(msgShare));
   },
   
   highlight: function(el) {
      this.animations.push(dojo.animateProperty(lconn.share.util.misc.animateBackground({
         duration: this.highlightDuration || 2000,
         rate: this.highlightRate || 100,
         node: el
      }, this.highlightColorStart || "#e0e0e0", this.highlightColorEnd || "white")));      
   }
});
