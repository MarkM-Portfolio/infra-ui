/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.util.validation");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.message");

lconn.share.util.validation.TAG_LENGTH = 100;
lconn.share.util.validation.FILENAME_LENGTH = 252;
lconn.share.util.validation.COLLECTIONNAME_LENGTH = 256;
lconn.share.util.validation.COLLECTIONNAME_LENGTH_ON_LABEL = 252;
lconn.share.util.validation.DESCRIPTION_LENGTH = 2048;
lconn.share.util.validation.COMMENT_LENGTH = 50*1024;
lconn.share.util.validation.INVALID_FILENAME_CHARS = /[\\\/\:\*\?\<\>\|\"]/g;
lconn.share.util.validation.EMPTY_FILENAME = /^[.\s\u3000]*$/;

lconn.share.util.validation.validateTextLength = function(s, maxbytes) {
   if (!s)
      return true;

   var bytes = lconn.share.util.text.lengthUtf8(s);
         
   return (bytes <= maxbytes);
}

lconn.share.util.validation.addRequiredIndicator = function(el) {
   var d = document;
   var requiredIndicatorContainer = d.createElement("span");
   requiredIndicatorContainer.className = "lotusFormRequired";
   requiredIndicatorContainer.appendChild(d.createTextNode("*"));
   el.appendChild(requiredIndicatorContainer);
};

lconn.share.util.validation.addInlineErrorRow = function(row, field, id, contents) {
   if (arguments.length == 3) {
      contents = id;
      id = field;
      field = row;
      row = null;
   }

   var d = document;
   dojo.addClass(field, "lotusFormErrorField");
   
   var parent = field;
   var parentTd;
   while (parent && !(parent.nodeName.toLowerCase() == "tr" && dojo.hasClass(parent, "lotusFormFieldRow"))) {
      parentTd = parent;
      parent = parent.parentNode;
   }
   var row = parentTd.parentNode;
   
   var container;
   var alertNode;
   var existingTr = (row.previousSibling && dojo.hasClass(row.previousSibling, "_qkrErrorRow")) ? row.previousSibling : null;
   if (existingTr) {
      var td = dojo.query("TD._qkrErrorColumn", existingTr)[0];
      var ul = td.getElementsByTagName("UL")[0];
      if (!ul) {
         if (td.errorId == id)
            return;
         ul = d.createElement("ul");
         ul.className = "lotusList";
            var li = d.createElement("li");
               li.errorId = td.errorId;
               while (td.firstChild) {
                  var a = td.firstChild;
                  td.removeChild(a);
                  li.appendChild(a);
               }   
            ul.appendChild(li);
         td.appendChild(ul);
         td.errorId = null;
      }
      else if (dojo.some(td.getElementsByTagName("li"), function(a) {return a.errorId == id;})) {
         return;
      }
      var li = alertNode = d.createElement("li");
      ul.appendChild(li);
      ul.style.display = "";

      container = li;
   }
   else {
      var totalColumns = lconn.share.util.html.countCells(row);
      var position = lconn.share.util.html.countCells(row, parentTd);
      
      var tr = d.createElement("tr");
         tr.className = "_qkrErrorRow";
         if (position > 0) {
            var td = d.createElement("td");
               dojo.attr(td,"colSpan",position);
            tr.appendChild(td);
         }
         var td = alertNode = d.createElement("td");
            dojo.attr(td,"colSpan",totalColumns-position);
            td.className = "_qkrErrorColumn";
         tr.appendChild(td);
      row.parentNode.insertBefore(tr, row);
      
      container = td;
   }
   container.errorId = id;
   
   lconn.share.util.message.setMessage(container, contents, "error", {canClose: false});
      

}

lconn.share.util.validation.removeInlineErrorRow = function(row, field, id) {
   var errorRow = row.previousSibling;
   if (!errorRow || !dojo.hasClass(errorRow, "_qkrErrorRow"))
      return;

   if (dojo.hasClass(field, "lotusFormErrorField")) {
      if (id) {
         var items = errorRow.getElementsByTagName("LI");
         for (var i=0; i<items.length; i++) {
            var li = items[i];
            if (li.errorId == id) {
               var p = li.parentNode;
               p.removeChild(li);
               if (!p.firstChild)
                  p.style.display = "none";
               break;
            }
         }
         var td = dojo.query("TD._qkrErrorColumn",errorRow)[0];
         if (td && items.length == 1) {
            var li = items[0];
            td.errorId = li.errorId;
            while (td.firstChild) td.removeChild(td.firstChild);
            while (li.firstChild) {
               var el = li.firstChild;
               li.removeChild(el);
               td.appendChild(el);
            }
            return;
         }
         if (!(items.length == 0 && td && td.errorId == id))
            return;
      }
      dojo.removeClass(field, "lotusFormErrorField");
   }
   row.parentNode.removeChild(errorRow);
}

lconn.share.util.validation.setFormError = function(el, contents, opts) {
   opts = opts || {};
   var d = document;
   var nodeName = el.nodeName.toLowerCase();
   var div;
   var isWarning = opts.isWarning;
   var nls = opts.nls;
   if (nodeName == "div")
      div = el;
   else {
      var tbody = dojo.query("table.lotusFormTable:first-child > tbody", el)[0];
      if (!tbody)
         throw "Can't find tbody";
      var queryString = isWarning ? "table.lotusFormTable:first-child > tbody tr._qkrWarningRow td:first-child > div" : "table.lotusFormTable:first-child > tbody tr._qkrErrorRow td:first-child > div";
      div = dojo.query(queryString, tbody)[0];
      if (!div) {
         var firstRow = tbody.getElementsByTagName("tr")[0];
         var colspan = (firstRow ? lconn.share.util.html.countCells(firstRow) : 1);
         
         var tr = d.createElement("tr");
            tr.className = isWarning ? "_qkrWarningRow" : "_qkrErrorRow";
            var td = d.createElement("td");
               td.className = "_qkrErrorColumn";
               dojo.attr(td,"colSpan",colspan);
            tr.appendChild(td);
         if (firstRow) 
            tbody.insertBefore(tr, firstRow);
         else
            tbody.appendChild(tr);
      }
      var level = isWarning ?  "warning" : "error";
      lconn.share.util.message.setMessage(td, contents, level, {canClose: false});
   }
}

lconn.share.util.validation.removeFormErrors = function(form) {
   dojo.forEach(dojo.query("tr._qkrErrorRow", form), function(el) {el.style.display = "none";});
   dojo.forEach(dojo.query("tr._qkrWarningRow", form), function(el) {el.style.display = "none";});
   dojo.forEach(dojo.query("td._qkrErrorColumn", form), function(el) {el.parentNode.parentNode.removeChild(el.parentNode);});
   dojo.forEach(dojo.query(".lotusFormErrorField", form), function(el) {dojo.removeClass(el, "lotusFormErrorField");});
}
