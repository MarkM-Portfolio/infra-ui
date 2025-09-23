/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.ReadOnlyTagger");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.html");

dojo.requireLocalization("lconn.core", "tagger");

dojo.declare("lconn.core.widget.ReadOnlyTagger", [dijit._Widget, dijit._Templated], {
   
   tags: null,
   
   _strings: dojo.i18n.getLocalization("lconn.core", "tagger"),
   
   size: 30,
   additionalClasses: "",
   
   templatePath: dojo.moduleUrl("lconn.core", "widget/templates/ReadOnlyTagger.html"),
   
   postMixInProperties: function() {
	  this.tags.sort();
   },
   
   buildRendering: function() {
	  this.inherited(arguments);

	  var addNode = this.addNode;
  	  this.renderTags();
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
   }
});
