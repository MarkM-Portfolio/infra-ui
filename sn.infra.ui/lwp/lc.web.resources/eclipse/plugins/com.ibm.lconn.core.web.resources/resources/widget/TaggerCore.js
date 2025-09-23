/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.TaggerCore");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.requireLocalization("lconn.core", "tagger");

dojo.declare("lconn.core.widget.TaggerCore", [dijit._Widget, dijit._Templated], {
   
   tags: null,
   editable: false,
   
   _strings: dojo.i18n.getLocalization("lconn.core", "tagger"),
   
   size: 30,
   additionalClasses: "",
   
   templatePath: dojo.moduleUrl("lconn.core", "widget/templates/Tagger.html"),
   
   postMixInProperties: function() {
	  this.tags.sort();
   },
   
   buildRendering: function() {
	  this.inherited(arguments);

	  var addNode = this.addNode;
	  this.editable = this.editable && !!addNode && !!this.formNode;
	  if (this.editable) {
		  this.renderAddLabel();
    	  addNode.style.display = "";
	  }
	  
  	  this.renderTags();
   },
   
   renderAddLabel: function() {
	  var multipleTags = this.tags.length > 0;
	  this.labelNode.style.display = multipleTags ? "" : "none";
	  var strings = this._strings;
	  dojo.html.set(this.addNode, multipleTags ? strings.addRemoveLabel : strings.addLabel);
   },
   
   renderTags: function(newTags) {
	   var tags = newTags || this.tags;
	   var separatorTemplateNode = this.separatorTemplateNode;
	   var tagsNode = this.tagsNode;
	   
	   for (var i=0,l=tags.length; i<l; i++) {
		   if (tagsNode.firstChild) {
			   var separator = separatorTemplateNode.cloneNode(true);
			   separator._sep = true;
			   separator.style.display = "";
			   tagsNode.appendChild(separator);
		   }
		   var tag = tags[i];
		   var tagNode = tagsNode.appendChild(this.renderTag(tag))
		   tagNode._tag = tag;
	   }
   },
   
   renderTag: function(tag) {
	   var node = this.tagTemplateNode.cloneNode(true);
	   var a = node.firstChild;
	   dojo.html.set(a, tag);
       // Force the close link to display on the correct side
	   if (dojo._isBodyLtr()) a.appendChild(document.createTextNode("\u200F"));
	   var links = this.links;
	   if (links && links.tag) 
		   links.tag(a, tag);
	   return a;
   },

   edit: function(e) {
	  console.log("edit invoked on TaggerCore");
      if (e) dojo.stopEvent(e);
      if (!this.editable)
         return;
      
      dojo.empty(this.addNode);
      var img = document.createElement("img");
      img.src = this._blankGif;
      img.alt = img.title = "Loading...";
      img.className = "lotusLoading";
      this.addNode.appendChild(img);
      
      var baseClass = lconn.core.widget.TaggerCore;
      var deferred = baseClass._defer;
      if (!deferred) {
    	  deferred = baseClass._defer = new dojo.Deferred();
    	  setTimeout(function() { var d=dojo; d.require("lconn.core.widget.TaggerExtend"); baseClass._defer = null; deferred.callback(); }, 2000);
      }
      deferred.addCallback(this, "edit");
   },
   
   cancelEdit: function() {
	  // stub 
   },
   submit: function() {
	  // stub
   }
});
