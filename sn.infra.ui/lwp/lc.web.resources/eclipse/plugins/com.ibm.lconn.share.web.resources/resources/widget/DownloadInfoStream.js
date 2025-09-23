/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide('lconn.share.widget.DownloadInfoStream');
dojo.require("lconn.share.widget.Stream");
dojo.require("lconn.share.widget.StreamRenderer");
dojo.require("lconn.share.util.misc");

dojo.declare("lconn.share.widget.DownloadInfoStreamRenderer", [lconn.share.widget.StreamRenderer], {

   minimalPaging: true,
   
   initData: function(data) {
      lconn.share.util.misc.sort(data.json.items, "name");
      return this.inherited(arguments);
   },
   
   render: function(stream, el, data) {
      var isVersioningEnabled = dojo.getObject("lconn.share.config.features.versioning");
      this.nlsVersion = isVersioningEnabled ? this._appstrings.DOWNLOAD_INFO.VERSION : this._appstrings.DATE.COMPACT;
      this.currentVersion = this.file.getDocumentVersionId() || this.file.getVersionId();
      this.renderAsTable.apply(this, arguments);
   },
   
   decorateTable: function(table) {
      table.style.width = "auto";
   },
   
   renderItem: function(stream, el, data, item, position, isFirst, isLast) {
      var d = document;

      var nlsVersion = this.nlsVersion;
      var currentVersion = this.currentVersion;
      var time = lconn.share.util.misc.date.convertAtomDate(item.time);

      var date = lconn.share.util.date.formatByAge(time, nlsVersion, this._appstrings.DATE);
      var version = dojo.string.substitute(date, [dojo.number.format(item.versionNumber)]);
      
      var tr = d.createElement("tr");
         var td = d.createElement("td");
            td.className = "lotusFirstCell";
            var a = d.createElement("a");
               a.className = "lotusPerson";
               a.appendChild(d.createTextNode(item.name));
               this.generateLinkToPerson(item, a);
            td.appendChild(a);
         tr.appendChild(td);
         var td = d.createElement("td");
            td.className = "lotusAlignRight";
            td.appendChild(d.createTextNode(version));
            if (currentVersion != item.versionId)
               td.className += " lotusInactive";
            td.title = lconn.share.util.date.toTimestamp(time, this._appstrings.DATE);
         tr.appendChild(td);
      el.appendChild(tr);
   }
});
