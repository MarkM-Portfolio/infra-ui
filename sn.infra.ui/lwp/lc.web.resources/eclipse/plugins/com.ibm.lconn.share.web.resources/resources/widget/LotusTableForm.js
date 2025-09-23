/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.LotusTableForm");
dojo.require("lconn.share.widget.LotusForm");

dojo.declare("lconn.share.widget.LotusTableForm", lconn.share.widget.LotusForm, {
   
   baseClass: "lotusForm",
   width1: "150px",
      
   buildRendering: function() {
      var d = document;
      var el = this.domNode = this.formNode = this.srcNodeRef;
         if (this.baseClass) dojo.addClass(el, this.baseClass);

         el.method = "POST";
         if (this.isMultipart) {
            el.enctype = "multipart/form-data";
            el.setAttribute("encoding", "multipart/form-data");
         }
         var hitchArgs = [this, this.protectedSave].concat(this.saveArguments || []);
         dojo.connect(el, "onsubmit", dojo.hitch.apply(dojo, hitchArgs));

         var table = el.appendChild(d.createElement("table"));
            table.cellpadding = table.cellspacing = 0;
            table.className = "lotusFormTable";
            var tbody = this.containerNode = table.appendChild(d.createElement("tbody"));
         
         var fields = this.fields || [];
         this.fields = [];
         dojo.forEach(fields, function(f) {this.addField.apply(this, f);}, this);
            
         var title = this.title || this.header;
         if (title) {
            var tr = tbody.appendChild(d.createElement("tr"));
            var td = tr.appendChild(d.createElement("td"));
            td.colSpan = 3;
            var h1 = td.appendChild(d.createElement("h2"));
               if (this.titleImgSrc) {
                  var img = d.createElement("img");
                     img.style.verticalAlign = "bottom";
                     img.src = this.titleImgSrc;
                     img.alt = this.titleImgAlt || "";
                  h1.appendChild(img);
                  h1.appendChild(d.createTextNode(" "));
               }
               h1.appendChild(d.createTextNode(title));
         }
            
         if (!this.hideButtons) {
            var tr = this.buttonRowNode = tbody.appendChild(d.createElement("tr"));
            var td = this.buttonDivNode = tr.appendChild(d.createElement("td"));
               td.colSpan = 3;
               td.className = "lotusFormFooter";
               dijit.setWaiRole(td, "toolbar");
               if (this.showProgressBar) {
                  var divp = this.progressNode = d.createElement("div");
                     divp.style.display = "none";
                     divp.className = "lotusRight qkrStatus";
                     var divw = d.createElement("div");
                     divp.appendChild(divw);
                     var progress = this.progress = new dijit.ProgressBar({},divw);
                  td.appendChild(divp);
               }
               else {
                  this.createProgressNode(d, td);
               }
               var input = this.saveNode = d.createElement("input");
                  input.className = "lotusFormButton";
                  input.type = "submit";
                  input.value = this.btnOk || this._strings.OK;
               td.appendChild(input);
               if (!this.hideCancel) {
            	  var cancelInput = d.createElement("input");
                     cancelInput.className = "lotusFormButton";
                     cancelInput.type = "button";
                     cancelInput.value = this._strings.CANCEL;
                     dojo.connect(cancelInput, "onclick", this, "cancel");
                     dijit.setWaiRole(cancelInput, "button");
                  td.appendChild(cancelInput);
               }
         }
   },
   
   addRow: function(label, required, helpTopic, id) {
      var d = document;
      if (!id)
         id = this.id + "_field" + this._i++;
      var tr = d.createElement("tr");
         tr.className = "lotusFormFieldRow";
         var td = tr.appendChild(d.createElement("td"));
            td.className = "lotusFormLabel lotusNowrap";
            td.style.width = this.width1;
            if (label) {
               if (required) {
                  var span = td.appendChild(d.createElement("span"));
                     span.className = "lotusFormRequired";
                     span.appendChild(d.createTextNode("*"));
               }
               var l = td.appendChild(d.createElement("label"));
                  l.appendChild(d.createTextNode(label));
                  dojo.attr(l, "for", id);
            }
         var td = tr.appendChild(d.createElement("td"));
         var tdh = tr.appendChild(d.createElement("td"));
            if (helpTopic && this.createHelpLink)
               this.createHelpLink(tdh, helpTopic, {"label": label});
            
      var tbody = this.containerNode;
      var brow = this.buttonRowNode;
      if (brow)
         tbody.insertBefore(tr, brow);
      else
         tbody.appendChild(tr);
      return {tr: tr, td: td, id: id};
   },
   
   _addField: function(label, required, helpTopic, fConstructor, args) {
      var r = this.addRow(label, required, helpTopic);
      args.id = r.id;
      args.form = this;
      args.required = required;
      args._row = r.tr;
      args.hideErrors = this._hideParentFormError;
      var field = new fConstructor(args, r.td.appendChild(document.createElement("span")));
      var fields = this.fields;
      fields.push(field);
      if (field.name)
         this.byName[field.name] = field;
      return field;
   },
   
   hideErrors: function() {
      lconn.share.util.validation.removeFormErrors(this.formNode);
   },
   setFormError: function(/*String, Node, or Array of nodes*/contents, /* Optional error object */error) {
      if (error && error.message && error.message != error.code) {
         var d = document;
         var details = d.createElement("span");
            details.className = "qkrErrorDetailsText";
            details.appendChild(d.createElement("br"));
            details.appendChild(d.createTextNode(error.message));
            details.style.display = "none";

         var detailsLink = d.createElement("a");
            detailsLink.appendChild(d.createTextNode(this._strings.ERROR_DETAILS_LINK || "..."));
            detailsLink.className = "qkrErrorDetailsLink";
            detailsLink.href="javascript:;";
            detailsLink.title = this._strings.ERROR_DETAILS_TOOLTIP || "";
            detailsLink.onclick = function() {
            	details.style.display = "";
            	detailsLink.style.display = "none";
            };

         if (typeof contents == "string")
            contents = d.createTextNode(contents);
         if (!dojo.isArray(contents))
            contents = [contents];

         contents.push(d.createTextNode(" "));
         contents.push(detailsLink);
         contents.push(details);
      }

      lconn.share.util.validation.setFormError(this.formNode, contents);
   },


   setFieldErrors: function(field, c) {
      field = this.get(field);
      if (field) {
         var tr = field._row;
         var input = (field._getInput) ? field._getInput() : null;
         lconn.share.util.validation.removeInlineErrorRow(tr, input, null);   
         for (var i=0; i<c.length; i++)
            lconn.share.util.validation.addInlineErrorRow(tr, input, i, c[i]);
      }
   },   
   hideFieldErrors: function(field, type) {
      field = this.get(field);
      if (field) {
         var tr = field._row;
         var input = (field._getInput) ? field._getInput() : null;
         lconn.share.util.validation.removeInlineErrorRow(tr, input, null);
      }
   }
});
