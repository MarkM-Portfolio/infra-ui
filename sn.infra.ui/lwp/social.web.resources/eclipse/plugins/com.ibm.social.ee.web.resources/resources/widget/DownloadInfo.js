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

dojo.provide("com.ibm.social.ee.widget.DownloadInfo");

dojo.require("com.ibm.social.incontext.util.uri");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.atom");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.ee.widget.Stream");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("com.ibm.social.ee.widget.DownloadInfo",[com.ibm.social.ee.widget.Stream], {

   templatePath: dojo.moduleUrl("com.ibm.social.ee","widget/templates/DownloadInfo.html"),
   additionalClasses: "",
   url: null,

   loadOnStartup: true,
   pageSize: 100,

   category: "version", 

   _strings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").DOWNLOAD_INFO,
   

   postMixInProperties: function() {
      this.msgNoData = this._strings.FILE.EMPTY;
      
      this.pagingSize = this.pageSize;
      var dsConstructor = dojo.getObject(this.dsConstructor);
      this.data = { dataStore: new dsConstructor({ url: this.url, net: this.net}),
         paging: new com.ibm.social.ee.widget.StreamPaging({pageSize: this.pagingSize}), itemByPosition: [] };

      this.renderer = new com.ibm.social.ee.widget.DownloadInfoRenderer({
         _strings: this._strings,
         generateUserLink: this.generateUserLink
      });
      this.inherited(arguments);
   },

   postCreate: function() {
      this.inherited(arguments);
      this.domNode.style.overflow="auto";
      this.refresh();
   },
   onVisible: function() {
      if (!this._loaded) {
         this._loaded = true;
         this.refresh();
      }
   }
});

dojo.declare("com.ibm.social.ee.widget.DownloadInfoRenderer",[com.ibm.social.ee.widget.StreamRenderer], {
   
   minimalPaging: true,
   
   renderEmpty: function(stream, el, data) {
      var d = dojo.doc;
      dojo.empty(el);
      
      var div = dojo.create("div", {className: "qkrEmpty"}, el);
         var msg;
         if (stream.msgNoData) {        
            msg = stream.msgNoData;
         }
         div.appendChild(d.createTextNode(msg || "Empty"));
   },
   render: function(stream, el, data) {
      data.itemById = {};
      this.baseUrl = stream.baseUrl;
      dojo.empty(el);

      var d = dojo.doc;
      var table = dojo.create("table", {className: "lotusTable", style: "width: auto"}, el);
         var tbody = dojo.create("tbody", null, table);

      arguments[1] = tbody;

      this.inherited(arguments, [stream, tbody, data]);
   },
   
   renderItem: function(stream, el, data, item, position, isFirst, isLast, existingTr, existingExtra) {
      var ds = data.dataStore;
      var d = dojo.doc;      
      var df = new com.ibm.social.incontext.util.DateFormat(ds.getValue(item, "time"));
      df.version = function () { return ds.getValue(item, "versionNumber"); };
      var versionCreated = df.formatByAge(this._strings.VERSION, d); 
      
      //Create row
      var tr = dojo.create("tr", null, el);      
         //Add Person column
         var td = dojo.create("td", { className: "lotusFirstCell" }, tr);           
            if (this.generateUserLink) {
               var div = dojo.create("div", null, td);
                  this.generateUserLink(div, item);
            }
            else
               td.appendChild(d.createTextNode(ds.getValue(item, "name")));
         // Add version download info
         td = dojo.create("td", { className: "lotusAlignRight", title: df.toTimestamp() }, tr);
             if (ds.getValue(item, "versionId") != stream.currentVersionId)
                dojo.addClass(td, "lotusInactive");
             td.appendChild(d.createTextNode(versionCreated));        
  }  
});