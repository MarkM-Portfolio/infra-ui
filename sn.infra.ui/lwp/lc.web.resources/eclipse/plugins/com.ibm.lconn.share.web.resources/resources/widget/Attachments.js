/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.Attachments');
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.bean.Attachment");
dojo.require("lconn.share.widget.Stream");
dojo.require("lconn.share.widget.StreamRenderer");

dojo.declare("lconn.share.widget.Attachments", [lconn.share.widget.Stream], {

   templatePath: dojo.moduleUrl("lconn.share", "widget/templates/AttachmentStream.html"),               
   additionalClasses: "",
   initialAttachments: dojo.getObject("lconn.share.config.services.attachments.pageSize") || 10,
   loadOnStartup: true,
   assumeNoEntries: false,
   
   _strings: {},
   msgNoData: null,

   onVisible: function() {
      if (!this._loaded) {
         this._loaded = true;
         if (this.assumeNoEntries)
            this.update({fromUrl: true});
         else
            this.update();
      }
   },

   postMixInProperties: function() {
      this.renderer = new lconn.share.widget.Attachments.AttachmentStreamRenderer({
         _strings: this._strings,
         _appstrings: this._appstrings,
         net: this.net,
         actions: this.actions,
         file: this.file,
         generateLinkToAttachment: this.generateLinkToAttachment,
         generateFileTypeImage: this.generateFileTypeImage
      });

      this.inherited(arguments);
   },

   postCreate: function() {
      this.inherited(arguments);
               
      if (this.uploadAction) {
         var el = this.actionsNode;
         var action = this.uploadAction;
         var item = this.file;
         var opt = {};
         if (this.uploadAction.isValid(item, opt)) {
            var d = document;
            var a = d.createElement("a");
               a.className = "lotusAction";
               var url = action.getUrlResource(item, opt);
               a.href = url || "javascript:;";
               dojo.connect(a, "onclick", dojo.hitch(action, action.execute, item, opt));                                 
               a.appendChild(d.createTextNode(action.getName(item, opt)));
               a.title = action.getTooltip(item, opt);
            el.appendChild(a);
            el.style.display = "";
         }
      }
      
      if (this.loadOnStartup) {
         this._loaded = true;
         if (this.assumeNoEntries)
            this.update({fromUrl: true});
         else
            this.update();
      }
   },

   onUpdate: function(data) {
      this._loaded = true;
      this.assumeNoEntries = false;
      this.inherited(arguments);
      if (data && data.paging && data.paging.total != -1)
         this.onCountChange(data.paging.total);
   },
   getAttachmentCount: function() {return this.attachmentCount;},
   onCountChange: function(count) {this.attachmentCount = count;},
   generateLinkToAttachment: function(item, a) {
      a.href = item.getUrlDownload();
      dojo.addClass(a, "lconnDownloadable");
   }
});

dojo.declare("lconn.share.widget.Attachments.AttachmentStreamRenderer", [lconn.share.widget.StreamRenderer], {
   minimalPaging: true,
   renderSorting: function() {
   },
   
   decorateTable: function(table) {
      table.style.width = "auto";
   },
   
   render: function(stream, el, data, item) {
      this.animations = [];
      this.renderAsTable.apply(this, arguments);
      for (var i=0; i<this.animations.length; i++)
         this.animations[i].play();
   },
         
   renderItem: function(stream, el, data, item, position, isFirst, isLast) {
      item = new lconn.share.bean.Attachment(item);
      item.permissions = this.file.getPermissions();
      data.itemByPosition.push(item);
      data.itemById[item.getId()] = item;
      item._position = position;
      
      this.renderItemAttachment(stream, el, data, item, position, isFirst, isLast);
   },

   renderItemAttachment: function(stream, el, data, item, position, isFirst, isLast, existingTr, existingTrd) {
      var d = document;
            
      var td_t = d.createElement("td");
      var a_t = d.createElement("a");
      var span_t = d.createElement("span");
      var img_t = d.createElement("img");
      var div_t = d.createElement("div");
                              
      var tr = (existingTr) ? existingTr : d.createElement("tr");
         //if (position % 2 == 1)
         //   dojo.addClass(tr, "lotusAltRow");
      
         if (isFirst) dojo.addClass(tr, "lotusFirst");
         var td = td_t.cloneNode(true);
            td.className = "lotusFirstCell";
            var a = a_t.cloneNode(true);
               a.tabIndex = -1;
               var img = img_t.cloneNode(true);
                  this.generateFileTypeImage(img, lconn.share.util.text.getExtension(item.getName()), 16);
               a.appendChild(img);
               this.generateLinkToAttachment(item, a);
            td.appendChild(a);
         tr.appendChild(td);
         
         var td = td_t.cloneNode(true);
            td.className = "lotusNowrap";
            //var h4 = d.createElement("h5");
               var a = td.appendChild(a_t.cloneNode(true));
                  var name = lconn.share.util.html.formatFilename(item.getName());
                  lconn.share.util.html.breakString(name, d, a, 15);
                  a.className = "entry-title";
                  a.rel = "bookmark";
                  a.title = name;
                  this.generateLinkToAttachment(item, a);
             //  h4.appendChild(a);
            //td.appendChild(a);
         tr.appendChild(td);
         
         var td = td_t.cloneNode(true);
            var span = new lconn.share.util.DateFormat(item.getUpdated()).formatByAgeToHtml(stream._appstrings.DATE.RELATIVE,d);
            td.appendChild(span);
         tr.appendChild(td);

         var td = td_t.cloneNode(true);
            td.className = "lotusNowrap";
            td.appendChild(d.createTextNode(lconn.share.util.text.formatSize(item.getSize())));
         tr.appendChild(td);

         var td = td_t.cloneNode(true);
            this.renderActionList(td, stream, data, item);
         tr.appendChild(td);
      el.appendChild(tr);  
         
      if (this.highlightItems && this.highlightItems[item.getId()]) {
         this.highlight(tr);
         this.highlight(tri);
         delete this.highlightItems[item.getId()];
      }
         
      item.element = tr;
   },

   getSorts: function(sortId, direction, stream) {
      return null;
   },
   
   renderDivider: function(d,el) {
      var span = d.createElement("span");
         span.className = "lotusDivider";
         span.appendChild(d.createTextNode("|"));
         dijit.setWaiState(span, "hidden", true);
         dijit.setWaiRole(span, "img");
      el.appendChild(span);
   },
   
   renderActionList: function(el, stream, data, item) {
      var d = document;
      
      var opt = {permissions: this.permissions};

      var actions = this.getActions(item) || [];
      
      var li_t = d.createElement("li");
      var a_t = d.createElement("a");

      var ul = d.createElement("ul");
         ul.className = "lotusActions lotusInlinelist";
         for (var i=0; i<actions.length; i++) {
            var action = actions[i];
            if (action.isValid(item, opt)) {
               if (action.getSubActions) {
                  var parentAction = action;
                  var subActions = action.getSubActions(item, opt);
                  var li = parentAction.li = li_t.createNode(true);
                     if (!ul.firstChild)
                        li.className = "lotusFirst";
                     li.appendChild(d.createTextNode(action.getLabel(item, opt)));
                     li.appendChild(d.createTextNode(" "));
                     for (var j=0; j<subActions.length; j++) {
                        var action = subActions[j];
                        var a = a_t.cloneNode(true);
                           var url = action.getUrlResource(item, opt);
                           a.href = url || "javascript:;";
                           dojo.connect(a, "onclick", dojo.hitch(action, action.execute, item, opt));                                 
                           a.appendChild(d.createTextNode(action.getName(item, opt)));
                           a.title = action.getTooltip(item, opt);
                        li.appendChild(a);
                        li.appendChild(d.createTextNode(" "));
                     }
                     if (parentAction.addExtra)
                        parentAction.addExtra(item, parentAction.li);
                  ul.appendChild(li); 
               }
               else {
                  var li = li_t.cloneNode(true);
                     if (!ul.firstChild)
                        li.className = "lotusFirst";
                     var a = a_t.cloneNode(true);
                        var url = action.getUrlResource(item, opt);
                        a.href = url || "javascript:;";
                        dojo.connect(a, "onclick", dojo.hitch(action, action.execute, item, opt));
                        a.appendChild(d.createTextNode(action.getName(item, opt)));
                        a.title = action.getTooltip(item, opt);
                     li.appendChild(a);
                  ul.appendChild(li);
               }
            }
         }
      if (ul.firstChild)
         el.appendChild(ul);
   },
   
   getActions: function(item) {
      return this.actions;
   },
   
   generateLinkToAttachment: function(item, a) {
   },
   
   generateFileTypeImage: function(img, ext, size) {
   },
   
   highlight: function(el) {
      this.animations.push(dojo.animateProperty(lconn.share.util.misc.animateBackground({
         duration: this.highlightDuration || 2000,
         rate: this.highlightRate || 100,
         node: el
      }, this.highlightColorStart || "#FFFFDD", this.highlightColorEnd || "white")));      
   }
});
