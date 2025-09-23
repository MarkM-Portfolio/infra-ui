define([
	"dojo",
	"dojo/_base/declare",
	"dojo/html",
	"dojo/i18n",
	"dojo/i18n!ic-core/nls/tagger",
	"dojo/text!ic-core/widget/templates/ReadOnlyTagger.html",
	"dijit/_Templated",
	"dijit/_Widget"
], function (dojo, declare, html, i18n, i18ntagger, template, _Templated, _Widget) {

	/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */
	
	var ReadOnlyTagger = declare("lconn.core.widget.ReadOnlyTagger", [_Widget, _Templated], {
	   
	   tags: null,
	   
	   _strings: i18ntagger,
	   
	   size: 30,
	   additionalClasses: "",
	   
	   templateString: template,
	   
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
		   html.set(a, tag);
	       // Force the close link to display on the correct side
		   if (dojo._isBodyLtr()) a.appendChild(document.createTextNode("\u200F"));
		   var links = this.links;
		   if (links && links.tag) 
			   links.tag(a, tag);
		   return a;
	   }
	});
	return ReadOnlyTagger;
});
