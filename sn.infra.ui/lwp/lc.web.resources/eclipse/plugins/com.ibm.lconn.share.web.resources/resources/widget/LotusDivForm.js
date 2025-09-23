/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.require("lconn.core.aria.Toolbar"); 
dojo.provide("lconn.share.widget.LotusDivForm");
dojo.require("lconn.share.widget.LotusForm");

dojo.declare("lconn.share.widget.LotusDivForm", lconn.share.widget.LotusForm, {
   
   baseClass: "lotusForm2",
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
         
         var title = this.title || this.header;
         if (title) {
            var div = el.appendChild(d.createElement("div"));
            div.className = "lotusFormTitle";
            dojo.attr(div, "aria-live", "assertive");
            var h1 = div.appendChild(d.createElement("h2"));
            h1.appendChild(d.createTextNode(title));
            if (this.description) {
               var divm = div.appendChild(d.createElement("div"));
               divm.className = "lotusMeta";
               divm.appendChild(d.createTextNode(this.description));
            } 
         }

         var body = this.containerNode = el.appendChild(d.createElement("div"));
            body.className = "lotusFormBody";
            
         var fields = this.fields || [];
         this.fields = [];
         dojo.forEach(fields, function(f) {this.addField.apply(this, f);}, this);
            
         if (!this.hideButtons) {
            var div = this.buttonRowNode = el.appendChild(d.createElement("div"));
               div.className = "lotusFormFooter";
               dijit.setWaiRole(div, "toolbar");
               if (this.showProgressBar) {
                  var divp = this.progressNode = d.createElement("div");
                     divp.style.display = "none";
                     divp.className = "lotusRight qkrStatus";
                     var divw = d.createElement("div");
                     divp.appendChild(divw);
                     var progress = this.progress = new dijit.ProgressBar({},divw);
                  div.appendChild(divp);
               }
               else {
                  this.createProgressNode(d, div);
               }
               var input = this.saveNode = d.createElement("input");
                  input.className = "lotusFormButton";
                  dijit.setWaiRole(input, "button");
                  input.type = "submit";
                  input.value = this.btnOk || this._strings.OK;
               div.appendChild(input);
               var span = this.buttonDivNode = d.createElement("span");
                  this.buildExtraButtons(d, span);
               div.appendChild(span);
               if (!this.hideCancel) {
                  var cancelInput = d.createElement("input");
                     cancelInput.className = "lotusFormButton";
                     dijit.setWaiRole(cancelInput, "button"); 
                     cancelInput.type = "button";
                     cancelInput.value = this._strings.CANCEL;
                     dojo.connect(cancelInput, "onclick", this, "cancel");
                     dijit.setWaiRole(cancelInput, "button");
                  div.appendChild(cancelInput);
               }
               new lconn.core.aria.Toolbar(div);
         }
   },
   
   buildExtraButtons: function(d, span) {},
   
   addRow: function(label, required, helpTopic, id) {
      var d = document;
      if (!id)
         id = this.id + "_field" + this._i++;
      var div = d.createElement("div");
      div.className = "lotusFormField";
         if (label) {
            if (required) {
               var span = div.appendChild(d.createElement("span"));
                  span.className = "lotusFormRequired";
                  span.appendChild(d.createTextNode("*"));
            }
            var l = div.appendChild(d.createElement("label"));
               l.appendChild(d.createTextNode(label));
               dojo.attr(l, "for", id);
         }
         if (helpTopic && this.createHelpLink)
            this.createHelpLink(div, helpTopic, {"label": label});
         var divp = div.appendChild(d.createElement("div"));
            
      var body = this.containerNode;
      body.appendChild(div);
      return {row: div, contents: divp, id: id};
   },
   
   _addField: function(label, required, helpTopic, fConstructor, args) {
      var r = this.addRow(label, required, helpTopic);
      args.id = r.id;
      args.form = this;
      args.required = required;
      args._row = r.row;
      args.hideErrors = this._hideParentFormError;
      var field = new fConstructor(args, r.contents.appendChild(document.createElement("span")));
      var fields = this.fields;
      fields.push(field);
      if (field.name)
         this.byName[field.name] = field;
      return field;
   },
   
   hideErrors: function() {
   },
   setFormError: function(/*String, Node, or Array of nodes*/contents, /* Optional error object */error) {
   },
   setFieldErrors: function(field, c) {
   },   
   hideFieldErrors: function(field, type) {
   }
});
