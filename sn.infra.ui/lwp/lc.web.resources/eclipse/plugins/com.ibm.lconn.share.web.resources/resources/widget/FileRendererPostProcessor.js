/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.FileRendererPostProcessor");

dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.DateFormat");

dojo.declare("lconn.share.widget.FileRendererPostProcessor", null, {
   postProcessDownloadLink: function(rows, alternateRows, app, download){
     var d = dojo.doc;
     var length = rows.length;
     var increment = alternateRows ? 2 : 1;
     for (var i=0; i<length; i += increment) {
        var tr = rows[i];
        if(!tr)
           continue;
        var iconCell = tr.childNodes[0];
        if(!iconCell) continue;
        var link = iconCell.firstChild;
        var downloadUrl = link.href;
        var version = link.getAttribute("version");
        var malwarescanstate = link.getAttribute("malwarescanstate");
        if (!version) continue;
        var file = {
              getUrlDownload: dojo.partial(function(url){return url;}, downloadUrl),
              getLatestVersionLabel: dojo.partial(function(v){return v;}, version),
              getMalwareScanState: dojo.partial(function(m){return m;}, malwarescanstate)
        }
        var opt = {"app": app};
        link.href = "javascript:;";
        dojo.connect(link, "onclick", dojo.partial(download, file, opt));
     }
   },
   
   postProcessTimestamps: function(rows, nlsDate, sByCls, alternateRows, setTitle) {
      var d = document;
      var length = rows.length;
      
      var qud = lconn.share.util.date;
      
      var today = new Date();
      today.setHours(0);today.setMinutes(0);today.setSeconds(0);today.setMilliseconds(0);
      var year = today.getFullYear();
      today = today.getTime();
      var millisInDay = 86400000;
      var yesterday = today - millisInDay;
      var week = today - 6*millisInDay;
      var fromIsoString = dojo.date.stamp.fromISOString;
      
      var increment = alternateRows ? 2 : 1;
      for (var i=0; i<length; i += increment) {
         var tr = rows[i];
         if(!tr)
            continue;
         var metaCell = tr.childNodes[1];
         if(!metaCell)
            continue;
         var metaDiv = metaCell.childNodes[1];
         if(!metaDiv)
            continue;
         var span = metaDiv.childNodes[0];
         if(!span)
            continue;
         var modified = span.title;
         var date = fromIsoString(modified);
         if (!date)
            continue;
         var datestamp = date.getTime();

         var a = span.firstChild;
         if (a)
            a.parentNode.removeChild(a);
         var cls = span.className;
         var nlsBundle = sByCls[cls];
         var text;
         if (datestamp > today)
            text = nlsBundle.TODAY;
         else if (datestamp > yesterday)
            text = nlsBundle.YESTERDAY;
         else if (datestamp > week)
            text = nlsBundle.DAY;
         else if (date.getFullYear() == year)
            text = nlsBundle.MONTH;
         else
            text = nlsBundle.YEAR;
         text = qud.format(date, text, nlsDate);
         lconn.share.util.html.substitute(d, span, text, {
            user: function() {
               return a;
            }
         });
         
         if(setTitle)
            span.title = qud.format(date, nlsBundle.FULL, nlsDate);
      }
   },
   
   getUserFragmentXsltStrings: function() {
      var s = this.RENDER_USERDATE_XSLT;
      if (!s) {
         var nls = this._appstrings.DOCUMENTCONTENT;
         s = this.RENDER_USERDATE_XSLT = {
            _added_other: nls.LABEL_ADDED_OTHER,
            _added_self: nls.LABEL_ADDED,
            _added_to_other: nls.LABEL_ADDED_TO_OTHER,
            _added_to_self: nls.LABEL_ADDED_TO,
            _updated_other: nls.LABEL_UPDATED_OTHER,
            _updated_self: nls.LABEL_UPDATED,
            _shared_self: nls.LABEL_SHARED,
            _shared_other: nls.LABEL_SHARED_BY
         };          
      }
      return s;
   }

});
