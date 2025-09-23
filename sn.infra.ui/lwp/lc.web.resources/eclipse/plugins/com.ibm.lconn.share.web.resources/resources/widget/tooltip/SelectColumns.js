/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tooltip.SelectColumns");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.widget.tooltip.DialogBase");

dojo.declare("lconn.share.widget.tooltip.SelectColumns", lconn.share.widget.tooltip.DialogBase, {
   label: null,
   baseWidth: 200,
   itemsPerColumn: dojo.getObject("lconn.share.config.services.columnCustomize.itemsPerColumn") || 8,
   renderHtml: function() {
      var supportedColumns = this.supportedColumns || [];
      var selectedColumns = this.selectedColumns || {};
      var size = supportedColumns.length;
      var itemsPerColumn = this.itemsPerColumn != -1 ? this.itemsPerColumn : size;
      var columns = Math.max(Math.ceil(size / itemsPerColumn),1);

      var d = document;
      var el = d.createElement("div");
         el.className = "lotusHelp";
         var style = el.style;
         //TODO: remove when style fixes are made part of core OneUI
         style.position = "relative";style.width = "auto";style.top = "0";
         if (dojo.isIE) {
            var w = columns * this.baseWidth;
            el.style.width = w + "px";
         }
         if (this.minWidth)
            el.style.minWidth = this.minWidth + "px";

         var div = d.createElement("div");
            div.className = "lotusInfoBox";
            if (this.header) {
               var h3 = d.createElement("h3");
                  h3.appendChild(d.createTextNode(this.header));
               div.appendChild(h3);
            }
            if (size > 0) {
               var table = d.createElement("table");
                  if (dojo.isIE)
                     table.width = "100%";
                  table.cellPadding = table.cellSpacing = 0;
                  var tbody = d.createElement("tbody");
                     var tr = d.createElement("tr");
                     for (var col=0; col<columns; col++) {
                        var td = d.createElement("td");
                           td.style.verticalAlign = "top";
                           if (col != columns-1)
                              td.style[dojo._isBodyLtr() ? "paddingRight" : "paddingLeft"] = "10px";
                           var ul = d.createElement("ul");
                              ul.className = "lotusList";
                              for (var row=0; row<itemsPerColumn; row++) {
                                 var i = col*itemsPerColumn+row;
                                 if (i >= size)
                                    break;
                                 var column = supportedColumns[i];
                                 var li = ul.appendChild(d.createElement("li"));
                                    var input = d.createElement("input");
                                       input.type = "checkbox";
                                       input.id = this.id + "_col" + i;
                                       input.className = "lotusCheckbox";
                                       input.value = column.id;
                                       input.checked = input.defaultChecked = !!(selectedColumns[column.id]);
                                    li.appendChild(input);
                                    var label = li.appendChild(d.createElement("label"));
                                       label.title = column.tooltip;
                                       dojo.attr(label, "for", input.id);
                                       label.appendChild(d.createTextNode(column.fullName));
                              }
                           td.appendChild(ul);
                         tr.appendChild(td);
                     }
                     tbody.appendChild(tr);
                 table.appendChild(tbody);
               div.appendChild(table);
               var input = d.createElement("input");
                  input.type = "button";
                  input.value = this.nls.OK;
                  input.className = "lotusFormButton";
                  this.connect(input, "onclick", "saveColumns");
               div.appendChild(input);
               var input = d.createElement("input");
                  input.type = "button";
                  input.value = this.nls.DEFAULTS;
                  input.className = "lotusFormButton";
                  this.connect(input, "onclick", "resetColumns");
               div.appendChild(input);
            }
            else
               div.appendChild(d.createTextNode(this.nls.EMPTY));
         el.appendChild(div);
      return el;
   },
   updateColumns: function(selected) {
      this.selectedColumns = selected;
      dojo.query("input[type='checkbox']", this.domNode).forEach(function(e) {e.checked = e.defaultChecked = selected[e.value];}, this);
   },
   saveColumns: function(e) {
      if (e) dojo.stopEvent(e);
      var active = {};
      dojo.query("input[type='checkbox']", this.domNode).filter(function(e) {return e.checked;}).forEach(function(e) {active[e.value] = 1;});
      // preserve unsupported columns
      var sc = this.selectedColumns || {};
      for (var id in sc) {
         if (!dojo.some(this.supportedColumns, function(c) {return c.id == id;}))
            active[id] = 1;
      }
      this._launcher._closeMenu(true);
      this.onSelectionChange(active, this.selectedColumns);
   },
   resetColumns: function(e) {
      if (e) dojo.stopEvent(e);
      var active = {};
      dojo.query("input[type='checkbox']", this.domNode).filter(function(e) {return e.checked;}).forEach(function(e) {e.checked = e.defaultChecked = false;}, this);
      this._launcher._closeMenu(true);
      this.onSelectionChange(null, this.selectedColumns);
   },
   onSelectionChange: function(selected, old) {}
});
