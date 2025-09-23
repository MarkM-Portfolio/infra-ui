/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.AttachmentStreamRenderer");

dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.DateFormat");
dojo.require("lconn.share.bean.Attachment");
dojo.require("dojo.fx");
dojo.require("lconn.share.widget.StreamRenderer");

dojo.declare("lconn.share.widget.AttachmentStreamRenderer", [lconn.share.widget.StreamRenderer], {

   methods: {},
   actions: [],
   minimalPaging: true,
   _strings: {},
   
   getDelegate: function(type, def, qualifier) {
      var view = this.view || "summary";
      var name = type + view.substring(0,1).toUpperCase()+view.substring(1);
      if (qualifier) {
         var qualifiedName = name+qualifier.substring(0,1).toUpperCase()+qualifier.substring(1);
         if (typeof this[qualifiedName] == "function")
            return this[qualifiedName];
      }
      if (typeof this[name] == "function")
         return this[name];
      else {
         var f = this.methods[type];
         if (f)
            f = f[view] || def;
         else
            f = def;
         if (typeof f == "string")
            return this[f];
         else if (typeof f == "function")
            return f;
      }
      return null;
   },
   
   hasDelegate: function(type, qualifier) {
      return typeof this.getDelegate(type, null, null, qualifier) == "function";
   },
   
   delegate: function(type, args, def, qualifier) {
      var f = this.getDelegate(type, def, qualifier);
      if (f)
         return f.apply(this, args);
   },
   
   allowMultipleExpand: function(stream) {
      return this.delegate("allowMultipleExpand", arguments, lconn.share.widget.AttachmentStreamRenderer.superclass.allowMultipleExpand);
   },
   
   destroy: function() {
      this.destroyWidgets();
      this.actions = [];
      
   },
   
   destroyWidgets: function() {
      this.delegate("destroy", arguments);
      dojo.forEach(this.widgets || [], function(widget) {widget.destroy()});
      this.widgets = [];
   },
   
   getSorts: function() {
      return this.delegate("getSorts", arguments, lconn.share.widget.AttachmentStreamRenderer.superclass.getSorts);
   },
   
   render: function(stream, el, data, item) {
      this.destroyWidgets();
      data.itemById = {};
      this.delegate("render", arguments, lconn.share.widget.AttachmentStreamRenderer.superclass.render);
   },

   renderSummary: function(stream, el, data) {
      var listNode=el.parentNode;
      var d = document;
      lconn.share.util.html.removeChildren(el);
      if (data.xml.getElementsByTagName("entry").length > 0) {
         var table = d.createElement("TABLE");
         dijit.setWaiRole(table, "presentation");
         table.className = "lotusTable lotusClear";
         table.cellSpacing = table.cellPadding = 0;
         var tbody = d.createElement("TBODY");
         table.appendChild(tbody);
         el.appendChild(table);
         arguments[1] = tbody;
      }
      lconn.share.widget.AttachmentStreamRenderer.superclass.render.apply(this, arguments);
      var addAttchNode = dojo.byId("addAttachmentDiv");
      this.setAddAttachmentLink(addAttchNode);      
   },
   
   renderSorting: function(stream, el, data) {
   },
   
   renderItem: function(stream, el, data, item, position) {
      var qualifier = "Attachment";
      item = new lconn.share.bean.Attachment(item);
      data.itemByPosition.push(item);
      data.itemById[item.getId()] = item;
      arguments[3] = item;
      item._position = position;
      item._qualifier = qualifier;
      
      this.delegate("renderItem", arguments, null, qualifier);
   },

   updateItem: function(stream, data, el, item) {
      if (this.hasDelegate("updateItem")) {
         if (data.itemByPosition && typeof item == "number")
            item = data.itemByPosition[item];
         if (item && item.getUrlEntry) {
            this.net.getXml({
               url: item.getUrlEntry(),
               handle: dojo.hitch(this, this.updateItemComplete, stream, data, el, item),
               timeout: stream.timeoutRetrieve*1000
            });            
         }
      }
   },

   updateItemComplete: function(stream, data, el, oldItem, response, ioArgs) {
      if (response instanceof Error) {
      } 
      else if (response.documentElement && lconn.share.util.dom.isNamedNS(response.documentElement, "entry", lconn.share.util.dom.NAMESPACES.ATOM)) {
         var qualifier = "attachment";
         var item = response.documentElement;
         item = new lconn.share.bean.Attachment(item);
         //var category = lconn.share.util.dom.getChildElementAttribute(item, "category", "term");
         var position = oldItem._position;
         data.itemByPosition[position] = item;
         data.itemById[item.getId()] = item;
         item._position = position;
         item._qualifier = qualifier;          
         this.delegate("updateItem", [stream, data, el, doc, oldItem, position], null, qualifier);
      }
   },  
     
   renderItemSummaryAttachment: function(stream, el, data, doc, position, isFirst, isLast, existingTr, existingExtra) {     
      var widgetCaller = stream;
      var d = document;    
      var tr = d.createElement("tr");
      if (position == 0) 
        dojo.addClass(tr,"lotusFirst");
      //if (position % 2 == 1) 
      //  dojo.addClass(tr,"lotusAltRow");
      if (this.currentAttachmentId && this.currentAttachmentId == doc.getId())
        dojo.addClass(tr, "lotusSelected");    
      
      var td = d.createElement("td");
      td.style.whiteSpace="nowrap";
      var img = d.createElement("img");
      this.generateFileTypeImage(img, lconn.share.util.text.getExtension(doc.getName()), 16, doc);
      td.appendChild(img);
      td.appendChild(d.createTextNode(" "));
	 
      var a = d.createElement("a");    
      var name = doc.getName();
      if (name.length > 50) {
         name = name.substring(0,50) + "...";
         a.alt=doc.getName();
         a.title=doc.getName();
      }
      a.appendChild(d.createTextNode(name));
      a.href = doc.getUrlDownload();
      dojo.addClass(a, "lconnDownloadable");
      td.appendChild(a);
      tr.appendChild(td);
      
      var td = d.createElement("td");
      td.style.whiteSpace="nowrap";
      var df = new lconn.share.util.DateFormat(doc.getUpdated());
      var attachmentCreated = df.formatByAge(this._strings.DATE.RELATIVE_TIME);
      if (this.generateAttachmentLink) {
         var a = d.createElement("a");
         this.generateAttachmentLink(attachment, a);
         a.title = df.toTimestamp();
         a.appendChild(d.createTextNode(attachmentCreated));
         td.appendChild(a);
      } 
      else {
         td.title = df.toTimestamp();
         td.appendChild(d.createTextNode(attachmentCreated));
      }
      tr.appendChild(td);
      
      var td = d.createElement("td");
      td.style.whiteSpace="nowrap";
      td.appendChild(d.createTextNode(lconn.share.util.text.formatSize(doc.getSize())));
      tr.appendChild(td);               
         
      if (this.canEdit){
         var td = d.createElement("td");
         td.className = "";
         var a = d.createElement("a");
         a.appendChild(d.createTextNode(this._strings.DELETE));
         a.href = "javascript:;";
         //dojo.connect(a, "onclick", dojo.hitch(widgetCaller, widgetCaller.deleteFile, doc.getName(), doc.getUrlEntry()));
         this.setDeleteAttachmentLink(a,doc);
         td.appendChild(a);
         tr.appendChild(td);           
         
         var replace = this.getEditAttachmentObj(doc.getUrlEntry());
         var td = d.createElement("td");
         td.className = "";
         var a = d.createElement("a");
         a.appendChild(d.createTextNode(this._strings.EDIT));
         a.href = "javascript:;";
         dojo.connect(a, "onclick", dojo.hitch(replace, replace.execute, doc));         
         td.appendChild(a);
         tr.appendChild(td);
         this.setReplaceSuccessEvent(replace);         
      } 

      var td = d.createElement("td");
      td.style.width="70%";
      td.appendChild(d.createTextNode(doc.getDescription() || "\u00A0"));
      tr.appendChild(td);
            
      el.appendChild(tr);          
	},   
  
	generateLinkToAttachment: function(doc, a) {
	   a.href = doc.getUrlDownload();
       dojo.addClass(a, "lconnDownloadable");
	},
   
	generateFileTypeImage: function(img, ext, size) {
	}     
});
