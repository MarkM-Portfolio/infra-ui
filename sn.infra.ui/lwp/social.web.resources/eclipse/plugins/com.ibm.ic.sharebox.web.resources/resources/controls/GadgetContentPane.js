/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/topic",
	"dojo/_base/declare",
	"dojo/_base/kernel",
	"dojo/_base/config",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/on",
	"dojo/query",
	"dojo/io-query",
	"dojo/text!ic-sharebox/controls/templates/GadgetContentPane.html",
	"dijit/_Templated",
	"dijit/layout/ContentPane",
	"ic-incontext/util/html"
], function (dojo, topic, declare, kernel, config, lang, windowModule, domAttr, domStyle, on, query, ioQuery, template, _Templated, ContentPane, html) {

	var GadgetContentPane = declare("com.ibm.social.sharebox.controls.GadgetContentPane", [ContentPane, _Templated], {
	   templateString: template,
	   title: null,
	   gadgetId: null,
	   gadgetXmlUrl: null,
	   actionId: null,
	   isDirty: false,
	   loadingGifUrl: null,
	   blankGifUrl: null,
	   // Make this a no-op
	   _setContentAttr: function() {},
	
	   createGadget: function(container, context, inline) {
	     html.showLoading(this.loadingDiv);
	      var renderParams = {width: "500px", height: "auto", userPrefs: context};
	      var lang = domAttr.get(windowModule.doc.documentElement, "lang");
	      var dir = domAttr.get(windowModule.doc.documentElement, "dir");
	      var country = "";
	      if (netJazzAjaxConfig){
	         if (netJazzAjaxConfig.params && (netJazzAjaxConfig.params.length>1)) {
	            var p = ioQuery.queryToObject(netJazzAjaxConfig.params);
	            if (p.country)
	               country = p.country;
	            if (p.lang)
	               lang = p.lang;
	         }
	      }
	      
	      if (config.isDebug) {
	          lang.mixin(renderParams.userPrefs, {"debug": "true" });
	      }
	      lang.mixin(renderParams.userPrefs, {"loadingGifUrl": this.loadingGifUrl});
	      lang.mixin(renderParams.userPrefs, {"blankGifUrl": this.blankGifUrl});
	      lang.mixin(renderParams.userPrefs, {"highContrast": html.isHighContrast()});
	      this.renderHandler = container.loadWidget({definitionUrl: this.gadgetXmlUrl,
	          placement: this.gadgetNode,
	          componentType: "gadget",
	          instanceData: {
	               renderType: (inline ? "inline" : "default"),
	               renderParams: renderParams,
	               viewParams: {
	                   lang: lang,
	                   country: country, 
	                   dir: dir,
	                   locale: kernel.locale
	                },
	                callback: lang.hitch(this, function(inline) {
	                 if(!inline) {
	                    var iframes = query("iframe", this.domNode);
	                    if(iframes.length > 0) {
	                      //dojo.attr(iframes[0], "aria-live", "off");
	                      iframes[0].setAttribute("role", "presentation");
	                    }
	                    var resizeTopic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(this.gadgetNode.id, com.ibm.lconn.gadget.container.Topics.GadgetWindow.AFTER_ADJUST_HEIGHT);
	                    function publishResizeEvent() {
	                       topic.publish("com/ibm/social/sharebox/pane/resized");
	                    }
	                    topic.subscribe(resizeTopic, publishResizeEvent);
	                    on(this, "Show", lang.hitch(null, publishResizeEvent));
	                 }
	                 this.hideLoading();
	                }, inline)
	          }});
	   },
	   hideLoading: function() {
	     domStyle.set(this.loadingDiv, "display", "none");
	     domStyle.set(this.gadgetDiv, "display", "");
	   },
	   
	   getGadgetId: function() {
	      return this.gadgetId;
	   },
	   destroy: function () {
	      if (this.renderHandler) {
	        this.renderHandler.unload();
	          delete this.renderHandler;
	      }
	      this.inherited(arguments);
	   }
	});
	
	return GadgetContentPane;
});
