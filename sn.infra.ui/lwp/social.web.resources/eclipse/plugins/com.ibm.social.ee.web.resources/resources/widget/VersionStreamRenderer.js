/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.VersionStreamRenderer");

dojo.require("com.ibm.social.incontext.util.html");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.ee.widget.Stream");

dojo.declare("com.ibm.social.ee.widget.VersionStreamRenderer", [com.ibm.social.ee.widget.StreamRenderer], {

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
      com.ibm.social.incontext.util.html.removeChildren(el);

      // Create a table to hold our version data
      //if (data.xml.getElementsByTagName("entry").length > 0) {
      var d = dojo.doc;
      var table = dojo.create("table", {className: "lotusTable lotusClear"}, el);
         table.cellSpacing = table.cellPadding = 0;
         var tbody = dojo.create("tbody", null, table);

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

      var d = dojo.doc;      
      var df = new com.ibm.social.incontext.util.DateFormat(ds.getValue(item, "created"));
      var versionCreated = df.formatByAge(this._strings.DATE.RELATIVE_TIME, d);      
      var description = ds.getValue(item, "changeSummary");
      this.renderFullItem(el, ds, item, d, df, versionCreated, position, description, isFirst, firstPage, previousItem, stream);
   },
   
   renderFullItem: function(el, ds, item, d, df, versionCreated, position, description, isFirst, firstPage, previousItem, stream) {
      var a, div, version = item;
      
      //Create row
      var tr = dojo.create("tr", {className: "topRow"}, el);
      this._setRowBackground(tr, position, true);      
      
         //Add version number column
         var td = dojo.create("td", { className: "lotusNowrap lotusFirstCell lotusAlignRight", style: { verticalAlign: "top" } }, tr);
            if (description) dojo.style(td, { paddingBottom: "0px" });
            td.appendChild(d.createTextNode(dojo.number.format(ds.getValue(item, "versionLabel"))));     
         
         // Add download icon
         td = dojo.create("td", { className: "lotusNowrap" }, tr);
            if (description) dojo.style(td, { paddingBottom: "0px" });
            if (this.generateDownloadIconLink) {
               a = dojo.create("a", { }, td);
                  this.generateDownloadIconLink(a, version);
            }
            else {
               td.appendChild(d.createTextNode(" "));
            }
        
         //Add download link
         td = dojo.create("td", null, tr);
            if (description) dojo.style(td, { paddingBottom: "0px" });
            dojo.addClass(td, "lotusNowrap");
            dojo.addClass(td, "lotusActions");
            if (this.generateDownloadLink) {
               a = dojo.create("a", {}, td);
                  this.generateDownloadLink(a, version);
            }
            else {
               td.appendChild(d.createTextNode(" "));
            }
         
         //Add version date column
         td = dojo.create("td", { className: "lotusNowrap" }, tr);
            if (description) dojo.style(td, { paddingBottom: "0px" });
            if (this.generateVersionLink) {
            	a = dojo.create("a", {title: df.toTimestamp(), role: "button"}, td);
               	this.generateVersionLink(ds, version, a);
               	a.appendChild(d.createTextNode(versionCreated));
            } 
            else {
               td.title = df.toTimestamp();               
               td.appendChild(d.createTextNode(versionCreated));
            }
         
         //Add author section
         td = dojo.create("td", null, tr);
            if (description) dojo.style(td, { paddingBottom: "0px" });         
            var author = ds.getValue(item, "author");
				if (this.generateUserLink) {
               var div = dojo.create("div", null, td);
                  this.generateUserLink(div, author);
         	}  
         	else {
            	td.appendChild(d.createTextNode(author.name));
         	}
         
         // Add file size
         td = dojo.create("td", {className: "lotusNowrap lastColumn"}, tr);
            if (description) dojo.style(td, { paddingBottom: "0px" });
            var size = com.ibm.social.incontext.util.text.formatSize(ds.getValue(item, "size"));
            td.appendChild(d.createTextNode(size));
                 
         //Add description (aka changeSummary)
         if (description)
         {
            tr = dojo.create("tr", null, el);
               td = dojo.create("td", { colSpan: "2", className: "lotusFirstCell lotusDetails", style: { paddingTop: "0px" }}, tr);
                  td.appendChild(d.createTextNode(" "));
               td = dojo.create("td", { colSpan: "5", className: "lastColumn lotusDetails", style: { paddingTop: "0px"}}, tr);
                  div = dojo.create("div", null, td);
                     dojo.addClass(div, "qkrWide");
                     var innerDiv = dojo.create("div", null, div);
                     dojo.addClass(innerDiv, "qkrWideInner");
                     if(description) {
                        innerDiv.title=description;
                        com.ibm.social.incontext.util.text.breakString(description,d,innerDiv);
                     }
                     else {
                        innerDiv.appendChild(d.createTextNode(" "));
                     }
         }
         
         tr = dojo.create("tr", null, el);
            td = dojo.create("td", { colSpan:"7"}, tr);
               td.appendChild(d.createTextNode(" "));
   },

   _setRowBackground: function(trNode, position, headerRow) {
    if (position % 2 == 1) 
         dojo.addClass(trNode,"lotusAltRow");
      if ((position === 0) || !headerRow)
         dojo.addClass(trNode, "lotusFirst");
      else
         dojo.addClass(trNode, "lotusBorderTop");
   },   
   
   renderEmpty: function(stream, el, data) {
      var d = dojo.doc;
      com.ibm.social.incontext.util.html.removeChildren(el);
      
      this.renderTypes(stream, el, data);
      
      var div = dojo.create("DIV", {className: "qkrEmpty"}, el);
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
         dojo.addClass(this._getVersionTR(data.itemByPosition[0]), "lotusFirst");
         
      item.element = null;
   },
   _getVersionTbody: function(el) {
      //TODO this may not be implemented correctly, recheck logic when backend implemented
      var tbody = el.firstChild.firstChild;
      if(tbody)
         return tbody;

      var d = document;
      if(!el.firstChild) {
         var table = dojo.create("table", null, el);
            table.className = "lotusTable lotusClear";
            table.cellSpacing = 0;
            table.cellPadding = 0;
      }
      tbody = dojo.create("tbody", null, el.firstChild);
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
   	var d = dojo.doc;
	   if(error.code == "AccessDenied")
	   	div.appendChild(d.createTextNode(stream._strings.ERROR));
	   else
	   	this.inherited(arguments);
   }
   
});
