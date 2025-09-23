/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/number",
	"ic-ee/widget/Stream",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/html",
	"ic-incontext/util/text"
], function (dojo, declare, windowModule, domClass, domConstruct, domStyle, number, Stream, DateFormat, html, text) {

	var VersionStreamRenderer = declare("com.ibm.social.ee.widget.VersionStreamRenderer", com.ibm.social.ee.widget.StreamRenderer, {
	
	   _strings: {},
	   minimalPaging: true,
	   maxTruncateLength: 35,
	   truncateString: "..",
	   
	   /* If true, the version change summary will be shown */
	   displayVersionSummary: true,
	   
	   /* If null, create date will not be linked */
	   generateVersionLink: null,
	   
	   /* If null, user names will not be linked */
	   generateUserLink: null,
	   
	   /* If null, no View action will be shown */
	   generateViewLink: null,
	   
	   /* If null, no Download action will be shown */
	   generateDownloadLink: null,
	   
	   /* If null, no Restore action will be shown */
	   generateRevertLink: null,
	   
	   render: function(stream, el, data) {
	      this.cleanup();
	      data.itemById = {};
	      this.baseUrl = stream.baseUrl;
	      html.removeChildren(el);
	
	      // Create a table to hold our version data
	      //if (data.xml.getElementsByTagName("entry").length > 0) {
	      var d = windowModule.doc;
	      var table = domConstruct.create("table", {className: "lotusTable lotusClear"}, el);
	         table.cellSpacing = table.cellPadding = 0;
	         var tbody = domConstruct.create("tbody", null, table);
	
	      arguments[1] = tbody;
	
	      this.inherited(arguments);
	      this.onRenderComplete();
	   },
	   onRenderComplete: function() {
	   },
	   renderItem: function(stream, el, data, item, position, isFirst, isLast, existingTr, existingExtra) {
	      var ds = data.dataStore;
	      var firstPage = (data.paging.page == 1);
	      var previousItem;
	      if (data.itemByPosition.length > 0) {
	         previousItem = data.itemByPosition[data.itemByPosition.length - 1];
	      }
	      data.itemByPosition.push(item);
	      data.itemById[ds.getValue(item, "id")] = item;
	      item._position = position;
	
	      var d = windowModule.doc;      
	      var df = new DateFormat(ds.getValue(item, "created"));
	      var versionCreated = df.formatByAge(this._strings.DATE.RELATIVE_TIME, d);      
	      var description = ds.getValue(item, "changeSummary");
	      this.renderFullItem(el, ds, item, d, df, versionCreated, position, description, isFirst, firstPage, previousItem, stream);
	   },
	   
	   renderFullItem: function(el, ds, item, d, df, versionCreated, position, description, isFirst, firstPage, previousItem, stream) {
	      var a, div, version = item;
	      
	      //Create row
	      var tr = domConstruct.create("tr", {className: "topRow"}, el);
	      this._setRowBackground(tr, position, true);      
	      
	         //Add version number column
	         var td = domConstruct.create("td", { className: "lotusNowrap lotusFirstCell lotusAlignRight", style: { verticalAlign: "top" } }, tr);
	            if (description) domStyle.set(td, { paddingBottom: "0px" });
	            td.appendChild(d.createTextNode(number.format(ds.getValue(item, "versionLabel"))));     
	         
	         // Add download icon
	         td = domConstruct.create("td", { className: "lotusNowrap" }, tr);
	            if (description) domStyle.set(td, { paddingBottom: "0px" });
	            if (this.generateDownloadIconLink) {
	               a = domConstruct.create("a", { }, td);
	                  this.generateDownloadIconLink(a, version);
	            }
	            else {
	               td.appendChild(d.createTextNode(" "));
	            }
	        
	         //Add download link
	         td = domConstruct.create("td", null, tr);
	            if (description) domStyle.set(td, { paddingBottom: "0px" });
	            domClass.add(td, "lotusNowrap");
	            domClass.add(td, "lotusActions");
	            if (this.generateDownloadLink) {
	               a = domConstruct.create("a", {}, td);
	                  this.generateDownloadLink(a, version);
	            }
	            else {
	               td.appendChild(d.createTextNode(" "));
	            }
	         
	         //Add version date column
	         td = domConstruct.create("td", { className: "lotusNowrap" }, tr);
	            if (description) domStyle.set(td, { paddingBottom: "0px" });
	            if (this.generateVersionLink) {
	            	a = domConstruct.create("a", {title: df.toTimestamp(), role: "button"}, td);
	               	this.generateVersionLink(ds, version, a);
	               	a.appendChild(d.createTextNode(versionCreated));
	            } 
	            else {
	               td.title = df.toTimestamp();               
	               td.appendChild(d.createTextNode(versionCreated));
	            }
	         
	         //Add author section
	         td = domConstruct.create("td", null, tr);
	            if (description) domStyle.set(td, { paddingBottom: "0px" });         
	            var author = ds.getValue(item, "author");
					if (this.generateUserLink) {
	               var div = domConstruct.create("div", null, td);
	                  this.generateUserLink(div, author);
	         	}  
	         	else {
	            	td.appendChild(d.createTextNode(author.name));
	         	}
	         
	         // Add file size
	         td = domConstruct.create("td", {className: "lotusNowrap lastColumn"}, tr);
	            if (description) domStyle.set(td, { paddingBottom: "0px" });
	            var size = text.formatSize(ds.getValue(item, "size"));
	            td.appendChild(d.createTextNode(size));
	                 
	         //Add description (aka changeSummary)
	         if (description)
	         {
	            tr = domConstruct.create("tr", null, el);
	               td = domConstruct.create("td", { colSpan: "2", className: "lotusFirstCell lotusDetails", style: { paddingTop: "0px" }}, tr);
	                  td.appendChild(d.createTextNode(" "));
	               td = domConstruct.create("td", { colSpan: "5", className: "lastColumn lotusDetails", style: { paddingTop: "0px"}}, tr);
	                  div = domConstruct.create("div", null, td);
	                     domClass.add(div, "qkrWide");
	                     var innerDiv = domConstruct.create("div", null, div);
	                     domClass.add(innerDiv, "qkrWideInner");
	                     if(description) {
	                        innerDiv.title=description;
	                        text.breakString(description,d,innerDiv);
	                     }
	                     else {
	                        innerDiv.appendChild(d.createTextNode(" "));
	                     }
	         }
	         
	         tr = domConstruct.create("tr", null, el);
	            td = domConstruct.create("td", { colSpan:"7"}, tr);
	               td.appendChild(d.createTextNode(" "));
	   },
	
	   _setRowBackground: function(trNode, position, headerRow) {
	    if (position % 2 == 1) 
	         domClass.add(trNode,"lotusAltRow");
	      if ((position === 0) || !headerRow)
	         domClass.add(trNode, "lotusFirst");
	      else
	         domClass.add(trNode, "lotusBorderTop");
	   },   
	   
	   renderEmpty: function(stream, el, data) {
	      var d = windowModule.doc;
	      html.removeChildren(el);
	      
	      this.renderTypes(stream, el, data);
	      
	      var div = domConstruct.create("DIV", {className: "qkrEmpty"}, el);
	         div.appendChild(d.createTextNode(stream.msgNoData || "Empty"));
	   },
	   removeItem: function(stream, el, data, item) {
	      stream.resetData();
	
	      var ds = data.dataStore;
	      var length = data.itemByPosition.length;
	      var position = item._position;
	
	      for (var i = position + 1;i < length; i++)
	         data.itemByPosition[i]._position--;
	      data.itemByPosition.splice(position,1);
	      delete data.itemById[ds.getValue(item, "id")];            
	
	      this._getVersionTbody(el).removeChild(this._getVersionTR(item));
	
	      if(position === 0 && data.itemByPosition.length > 0)
	         domClass.add(this._getVersionTR(data.itemByPosition[0]), "lotusFirst");
	         
	      item.element = null;
	   },
	   _getVersionTbody: function(el) {
	      //TODO this may not be implemented correctly, recheck logic when backend implemented
	      var tbody = el.firstChild.firstChild;
	      if(tbody)
	         return tbody;
	
	      var d = document;
	      if(!el.firstChild) {
	         var table = domConstruct.create("table", null, el);
	            table.className = "lotusTable lotusClear";
	            table.cellSpacing = 0;
	            table.cellPadding = 0;
	      }
	      tbody = domConstruct.create("tbody", null, el.firstChild);
	      return tbody;
	   },
	   _getVersionTR: function(item) {
	      //TODO this may not be implemented correctly, recheck logic when backend implemented
	      if(item && item.element && item.element.parentNode && item.element.parentNode.nodeName == "tr")
	         return item.element.parentNode;
	      else
	         return null;
	   },
	   addRenderErrorMessage: function(div, stream, error) {
	   	var d = windowModule.doc;
		   if(error.code == "AccessDenied")
		   	div.appendChild(d.createTextNode(stream._strings.ERROR));
		   else
		   	this.inherited(arguments);
	   }
	   
	});
	
	return VersionStreamRenderer;
});
