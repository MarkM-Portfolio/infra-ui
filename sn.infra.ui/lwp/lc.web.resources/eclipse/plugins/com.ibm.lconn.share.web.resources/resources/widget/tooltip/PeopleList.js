/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.tooltip.PeopleList");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.widget.tooltip.DialogBase");

dojo.declare("lconn.share.widget.tooltip.PeopleList", lconn.share.widget.tooltip.DialogBase, {
   label: null,
   baseWidth: 150,
   maxWidth: 300,
   wrappingThreshold: 20,
   itemsPerColumn: dojo.getObject("lconn.share.config.services.recentShares.itemsPerColumn") || 7,
   ioArgs: {auth: {preventReload: true}, handleAs: "json", noStatus:true},
   
   postMixInProperties: function() {
      this.inherited(arguments); 
      this.subscribe("lconn/files/users/changed", "onUsersChanged");
   },
   
   onUsersChanged: function() {
      this.attr('href', this.attr('href'));
   },
   
   renderHtml: function(response, ioArgs) {
      var users = {};
      dojo.forEach(response.items, function(item) {
         users[item.id] = item;
      });
      var people = [];
      for (var id in users)
         people.push(users[id]);
      lconn.share.util.misc.sort(people, "name");
      var size = people.length;
      var itemsPerColumn = this.itemsPerColumn != -1 ? this.itemsPerColumn : size;
      var columns = Math.max(Math.ceil(size / itemsPerColumn),1);

      var d = document;
      var w = 0;
      var el = d.createElement("div");
         el.className = "lotusHelp";
         var div = d.createElement("div");
            div.className = "lotusInfoBox";
            if (this.header) {
               var h3 = d.createElement("h3");
                  h3.appendChild(d.createTextNode(this.header));
               div.appendChild(h3);
            }
            if (size > 0) {
               var table = d.createElement("table");
                  table.cellPadding = table.cellSpacing = 0;
                  dijit.setWaiRole(table, "presentation");
                  var tbody = d.createElement("tbody");
                     var tr = d.createElement("tr");
                     for (var col=0; col<columns; col++) {
                     	var hitLongName = false;
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
                                 var li = d.createElement("li");
                                    li.style[dojo._isBodyLtr() ? "paddingLeft" : "paddingRight"] = "10px";
                                    li.style.textIndent = "-10px";
                                    var a = d.createElement("a");
                                       lconn.share.util.html.breakString(people[i].name, d, a, 10);
                                       this.generateLinkToPerson(people[i], a, {forceUserFiles : true});
                                    li.appendChild(a);
                                 ul.appendChild(li);
                                 if (people[i].name.length > this.wrappingThreshold) hitLongName = true;
                              }
                           td.appendChild(ul);
                           if (hitLongName) {
                           	 td.style.width = this.maxWidth+"px";
                           	 w += this.maxWidth;
                           }else{
                           	td.style.width = this.baseWidth+"px";
                           	w += this.baseWidth;
                           }
                         tr.appendChild(td);
                     }
                     tbody.appendChild(tr);
                 table.appendChild(tbody);
               div.appendChild(table);
            }
            else{
               div.appendChild(d.createTextNode(this.nls.EMPTY));
               div.id = this.id + "_emptymsg";
               this.containerNode.setAttribute("aria-describedby", div.id);
            }
         el.appendChild(div);
      w == 0 ? el.style.width = this.baseWidth + "px" : el.style.width = w + "px";
      return el;
   }
});
