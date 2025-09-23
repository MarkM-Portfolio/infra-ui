define([
	"dojo",
	"dojo/_base/lang",
	"dojo/html",
	"dojo/_base/declare",
	"dojo/i18n",
	"dojo/i18n!ic-core/nls/tagger",
	"dojo/dom-attr",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/has",
	"dojo/string",
	"dojo/text!ic-core/widget/templates/Tagger.html",
	"dojo/topic",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-core/unicode"
], function (dojo, lang, html, declare, i18n, i18ntagger, domAttr, array, domClass, domConstruct, has, string, template, topic, _Templated, _Widget, unicode) {

	/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */
	
	/*djo.require("lconn.share.util.uri");
	djo.require("lconn.share.util.text");
	djo.require("lconn.share.util.dom");
	djo.require("lconn.share.util.html");
	djo.require("lconn.share.util.misc");
	djo.require("lconn.share.util.validation");
	djo.require("lconn.share.bean.File");
	djo.require("lconn.share.widget.TagTypeAhead");*/
	
	/**
	 * Tagger widget
	 * @class ic-core.widget.Tagger
	 * @extends dijit._Widget
	 * @extends dijit._Templated
	 */
	var Tagger = declare("lconn.core.widget.Tagger", [_Widget, _Templated], /** @lends ic-core.widget.Tagger.prototype */ {
	   
	   tags: null,
	   editable: false,
	   
	   _strings: i18ntagger,
	   
	   highlightNew: "#FFFF75",
	   highlightTags: {},
	   
	   size: 30,
	   additionalClasses: "",
	   maxTagLength: 10,
	   
	   templateString: template,
	   
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
		  if (!dojo._isBodyLtr()) 
			  domConstruct.place(document.createTextNode("\u200F"), "before", this.separatorTemplateNode.firstChild);
		  
	  	  this.renderTags();
	   },
	   
	   renderAddLabel: function() {
		  var multipleTags = this.tags.length > 0;
		  this.labelNode.style.display = multipleTags ? "" : "none";
		  var strings = this._strings;
		  html.set(this.addNode, multipleTags ? strings.addRemoveLabel : strings.addLabel);
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
		   if (!dojo._isBodyLtr()) a.appendChild(document.createTextNode("\u200F"));
		   var links = this.links;
		   if (links && links.tag) 
			   links.tag(a, tag);
		   return a;
	   },
	   
	   renderDeleteTag: function(node) {
		   if (!node._tag)
			   return;
		   var a = node.lastChild;
		   if (a._del) {
			   a.style.display = "";
			   return;
		   }
	       a = this.deleteTemplateNode.cloneNode(true);
	       this.connect(a, "onclick", "deleteTag");
	       a._del = true;
	       a.style.display = "";
	       node.appendChild(a);
	   },
	   
	   hideDeleteTag: function(node) {
		   if (!node._tag)
			   return;
		   var a = node.lastChild;
		   if (a._del)
			   a.style.display = "none";
	   },
	   
	   deleteTag: function(e) {
		   e.preventDefault(), e.stopPropagation();
		   
		   dijit.focus(this.inputNode);
		   
		   var node = e.currentTarget;
		   var tagNode = node.parentNode;
		   var tag = tagNode._tag;
		   var nextNode = tagNode.nextSibling;
		   if (nextNode && nextNode._sep)
			   domConstruct.destroy(nextNode);
		   domConstruct.destroy(tagNode);
		   
		   this.tags = array.filter(this.tags, function(t) {return t != tag;});
	   },
	
	   clearErrors: function() {
		   var errorNode = this.errorNode;
		   errorNode.style.display = "";
		   domConstruct.empty(errorNode);
		   dijit.setWaiRole(errorNode, "");
		   domClass.remove(this.inputNode, "lotusFormErrorField");
	   },
	   
	   setErrors: function(errors) {
		   var d = document;
		   var errorNode = this.errorNode;
		   domConstruct.empty(errorNode);
		   
		   for (var i=0,l=errors.length; i<l; i++) {
			   var error = errors[i];
			   var div = d.createElement("div");
			   html.set(div, error.message);
			   
			   var fix = error.fix;
			   if (fix) {
				   div.appendChild(d.createTextNode(" "));
		         
			   	   var a = d.createElement("a");
			   	   a.href = "javascript:;";
			   	   this.connect(a, "onclick", fix.action);
			   	   html.set(a, fix.text);
			   	   dijit.setWaiRole(a, "button");
			   	   domConstruct.place(a, div);
			   }
			   domConstruct.place(div, errorNode);
		   }
		   errorNode.style.display = "";
		   dijit.setWaiRole(errorNode, "alert");
	   },
	
	   /**
	    * Consumers may connect to this method to see tag notifications.
	    */
	   onTagChange: function(addedTags,deletedTags) {},
	   
	   edit: function(e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      if (!this.editable)
	         return;
	
	      array.forEach(this.tagsNode.childNodes, lang.hitch(this, "renderDeleteTag"));
	      
	      var input = this.inputNode;
	      domAttr.set(input, "value", "");
	      this.clearErrors();
	      this.addNode.style.display = "none";
	      this.formNode.style.display = "inline";
	      this.labelNode.style.display = "";
	      
	      if (has("ie")) // IE8 compat mode also requires timeout
	          setTimeout(lang.hitch(dijit, "focus", input),0);
	       else 
	          dijit.focus(input);
	   }, 
	   
	   cancelEdit: function(e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      if (!this.editable) return;
	      if (this.saving) {
	    	  //TODO: Cancel submission
	    	  ;
	    	  this.saving = false;
	    	  return;
	      }
	      
		  this.renderAddLabel();
		  
		  var addNode = this.addNode;
	      this.clearErrors();
	      this.formNode.style.display = "none";
	      array.forEach(this.tagsNode.childNodes, lang.hitch(this, "hideDeleteTag"));
	      addNode.style.display = "";
	
	      var input = this.inputNode;
	      domAttr.set(input, "value", "");
	      
	      dijit.focus(addNode);
	   },
	   
	   SPLIT_TAGS: /[,\s\u3000]+/,
	   splitTags: function(tagsText) {
	      tagsText = (tagsText.toLowerCase() || "").replace(/["']/g, "");
	      var tags = tagsText.split(this.SPLIT_TAGS);
	      var tagNames = {};
	      return array.filter(tags,
	         function(s) { 
	            if (s.length > 0 && !tagNames[s]) {
	               tagNames[s] = 1;
	               return true;
	            } 
	            return false;
	         }
	      );
	   },
	   
	   getInputValue: function() {
	      var inputTags = this.splitTags(domAttr.get(this.inputNode, "value"));
	      var tags = this.tags;
	      var existingTags = {};
	      var tagCount = tags.length;
	      var newTags = [];
	      for (var i=0,l=tagCount; i<l; i++)
	    	  existingTags[tags[i]] = 1;
	      for (var i=0,l=inputTags.length; i<l; i++) {
	    	  var tag = inputTags[i];
	    	  if (!existingTags[tag]) {
		    	  existingTags[tag] = 1;
		    	  newTags.push(tag);
	    	  }
	      }
	      return newTags;
	   },
	   
	   submit: function(e) {
	      if (e) e.preventDefault(), e.stopPropagation();
	      if (this.saving) return; // Prevent duplicate saves
	      this.saving = true;
	
	      this.clearErrors();
	      var newTags = this.getInputValue();
	      if (newTags.length > 0) {
		      var errors = this.getInputErrors(newTags);
		      if (errors) {
		    	  this.setErrors(errors);
		    	  this.saving = false;
		    	  return;
		      }
		      
		      //TODO: execute operation
		      
		      this.tags = this.tags.concat(newTags);
		      this.renderTags(newTags);
		      this.saving = false;
		      this.cancelEdit();
		      
	      }
	      else {
		      this.saving = false;
	          this.cancelEdit();
	      }
	   },
	   
	   getInputErrors: function(tags) {
	      tags = tags || this.getInputValue();
		      
	      var isValid = true;
	      var strings = this._strings;
	      
	      var fixLength = {text: strings.TRIM_TAG, action: lang.hitch(this, "trimTags")};
	      
	      var errors = [];
	      array.forEach(tags, function(tag, i) {
	         if (unicode.lengthUtf8(tag) > this.maxTagLength) {
	        	 errors.push({
	            	message: string.substitute(strings.WARN_LONG_TAG, [tag]), //FIXME: trim to length 30
	            	fix: fixLength
	            });
	        	 isValid = false;
	         }
	      }, this);
	
	      if (!isValid) {
	         if (errors.length > 1) {
	        	fixLength.text = strings.TRIM_TAGS;
	        	errors = [{message: strings.WARN_LONG_TAGS, fix: fixLength}];
	         }
	      }
	      return isValid ? null : errors;
	   },
	   
	   trimTags: function() {
		  var tags = this.getInputValue();
		  tags = array.map(tags, function(tag) {
			  var i = unicode.getCharIndexForUtf8Index(tag, this.maxTagLength)
		       if (i != -1)
		           tag = tag.substring(0, i);
		       return tag;
		  }, this);
		  domAttr.set(this.inputNode, "value", tags.join(" "));
	      this.clearErrors();
	   }
	});
	return Tagger;
});
