/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/on",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/string",
	"dojo/_base/window",
	"dojo/topic",
	"ic-ee/gadget/_ECMEEGadgetWidget",
	"ic-ee/bean/ECMAbstractDoc",
	"ic-ee/config",
	"ic-ee/data/ECMCommentsFeedDataStore",
	"ic-ee/gadget/_GadgetMessageMixin",
	"ic-ee/gadget/_HistoryMixin",
	"ic-ee/gadget/_WidgetTabsMixin",
	"ic-ee/util/misc",
	"ic-incontext/util/text",
	"ic-incontext/util/url"
], function (dojo, declare, domAttr, on, lang, domClass, domConstruct, string, windowModule, topic, _ECMEEGadgetWidget, ECMAbstractDoc, config, ECMCommentsFeedDataStore, _GadgetMessageMixin, _HistoryMixin, _WidgetTabsMixin, misc, text, urlModule) {

	/**
	 * Do not create an instance of this file.  Instead create an instance of it's subclasses.
	 */
	
	(function(){
	
	   var uu = urlModule;
	   var ut = text;
	   var g = com.ibm.social.ee.gadget;
	
	   var _ECMEntry = declare("com.ibm.social.ee.gadget._ECMEntry", 
	     [g._ECMEEGadgetWidget, 
	      g._WidgetTabsMixin,
	      g._HistoryMixin,
	      g._PreviewImageMixin,
	      g._GadgetMessageMixin], {
	      /* These functions and variables should be implemented and defined by the subclasses */
	      templatePath: null,
	      initialTab: null,
	      shouldUpdateRollup: false,
	      getAddtlParams: function() {},
	      widgetTabs: {},
	      initSwitchEELink: function() {},
	      noLoadDataOnInit: true, // Prevent postCreate parent from initializing gadget.  We want to have control over when to initialize.
	      _ecmStrings: i18nsocialEEStrings.ecm_file,
	      loadData: function(args) {
	         this.inherited(arguments, [{addtlParams: this.getAddtlParams()}]);
	      },
	      dataLoaded: function (item, ioArgs) {
	   	     // We expect that this.data and this.ds are already passed in from initial request.  We only override in toggle scenario.
	         this.initializeUI();
	         this.onLoaded();
	      },
	      initializeUI: function () {
	         this.inherited(arguments);
	         this.setTitle();
	         this.initTabContainer();
	         this.initializeHistoryTab();
	         this.initializeMetadata();
	         this.setDescription();
	         this.shouldUpdateRollup = this._isEventDifferentVersion();
	       //  this.setLockStatus(); // UX does not want lock indicator showing up for now.
	      },
	      initComplete: function() {},
	      initializeMetadata: function() {
	         var ext = ut.getExtension(this.getTitle());
	         this.setFileTypeIcon(ext);
	         if (misc.isImage(ext)) {
	            this.initPreviewLink();
	            domClass.add(this.previewCtnr, "lotusFirst");
	         }
	         else {
	            domClass.add(this.downloadCtnr, "lotusFirst");
	         }
	         this.initDownloadLink();
	         this.fileSize.appendChild(windowModule.doc.createTextNode(ut.formatSize(this.value("size"))));
	         this.initSwitchEELink();
	      },
	      getMissingErrorNode: function() { 
	         if(!this.missingErrorNode) {
	            this.missingErrorNode =  domConstruct.create("div", null, this.gadgetBody, "first");
	         }
	         return this.missingErrorNode;
	      },
	      onMissingItem: function () { topic.publish("com/ibm/social/ee/event/scrollTop", '');},      
	      getReadMoreStrings: function() {
	         var strings = this.nls.file;
	            strings = lang.mixin({ }, strings);
	            lang.mixin(strings, this._ecmStrings);
	            return strings;
	      },
	      // Tabs
	      getTabInitializers: function() { return { history: "initializeHistory" }; },
	      getTabStylePrefix: function() { return "file-ee"; },
	      getTabContainerId: function () { return this.tabContainerNode; },
	      getTitle: function() { return this.value("name"); }, 
	      getItemUrl: function () { return this.value("urlAlternate"); },
	       // History
	       getHistoryTab: function() { return this.historyTab; },
	       getHistoryContainer: function() { return this.historyTabBody; },
	       getId: function() {
	          return this.context.id;
	       },
	       // Gadget lifecycle    
	       notifyLoaded: function() {
	          var data = { item: this.data, ds: this.ds, authUser: this.authUser, community: this.context.communityid }; 
	          topic.publish("social/ee/ecm/load", data, this.network, this.routes.oauth);
	       },
	       
	       notifyDownload: function() {
	          var data = { item: this.data, ds: this.ds, authUser: this.authUser, community: this.context.communityid }; 
	          topic.publish("social/ee/ecm/download", data, this.network, this.routes.oauth);
	       },
	         
	      // Initialize file title
	      setTitle: function () {
	         var _nls = this.nls;
	         var title = this.getTitle();
	         domAttr.set(this.titleNode, "href", this.value("urlLandingPage"));
	         ut.breakString(title, windowModule.doc, this.titleNode);
	         var strings = this.getReadMoreStrings();
	         this.titleNode.title = string.substitute(strings.tooltip, {"name": title});
	         this.titleNode.setAttribute("aria-label", string.substitute(strings.tooltip, {"name": title}));
	      },
	      setDescription: function () {
	        var d = windowModule.doc;
	         var desc = this.value("description");
	         if(desc != "") {
	            ut.breakString(desc, windowModule.doc, this.contentArea);
	            this.contentArea.style.display = "";
	         }
	      },
	      _getDownloadLink: function (url) {
	         return this.routes.oauth ? this.network.rewriteUrl(url) : url;
	      },
	      // Initialize the download link
	      initDownloadLink: function() {
	         var downloadLink = this.downloadLink;
	         downloadLink.href = this._getDownloadLink(this.value("urlDownload"));
	         downloadLink.title = string.substitute(this.nls.file.download_tooltip, [ut.formatSize(this.value("size"))]);
	         on(downloadLink, "click", lang.hitch(this, function(e) {
	            var dfd = this.navigateToUrl(false, downloadLink.href, this.checkExists, e);
	            dfd.addCallback(lang.hitch(this, function() {
	               this.notifyDownload();
	            }));
	         }));
	      },
	      // Initialize the preview link
	      initPreviewLink: function () {
	         var launchPreviewLink = this.prevLink;
	         launchPreviewLink.href = this.routes.getImagePreviewLink(this.value("id"), this.nls.file.PREVIEW.TITLE, this.getPreviewLink(this.value("urlDownload")));
	         on(launchPreviewLink, "click", lang.hitch(this, "navigateToUrl", true, launchPreviewLink.href, this.checkExists));
	         this.previewCtnr.style.display = "";
	      },
	      getEntryUrl: function() {
	         return this.routes.getEntryUrl();
	      },
	      checkExists: function(scope, callback) {
	         var reqOpts = {
	 	        handleAs: "xml",
	 	        url: scope.getEntryUrl(),
	 	        preventCache: true,
	 	        load: lang.hitch(this, function(e) {
	 	           var bean = new ECMAbstractDoc(e.documentElement);
	 	           callback(bean);
	 	        }),
	 	        error: function() {
	 	           callback(null);
	 	        }
	         };
	         scope.network.get(reqOpts);
	      },
	      getPreviewLink: function(url) {
	         // We need to strip the oauth piece for preview link only
	         return this.routes.oauth ? url.split("oauth/").join("") : url;  
	      },
	      setFileTypeIcon: function(ext) {
	         domClass.add(this.fileIcon, "lconn-ftype16-" + ext);
	      },
	      setLockStatus: function() {
	         var lockOwner = this.value("lockOwner");
	         var authUser = this.authUser;
	         if (lockOwner) {
	            var img = domConstruct.create("img", {alt: "", role: "presentation", src: this._blankGif}, this.lockCtnr);
	            if (authUser && lockOwner.id == authUser.id) {
	               img.className = "lconnSprite lconnSprite-iconCheckedOutMe";
	               this.lockCtnr.appendChild(windowModule.doc.createTextNode(this.nls.ecm_file.checkedout_you));
	            }
	            else {
	               img.className = "lconnSprite lconnSprite-iconCheckedOut";
	               this.lockCtnr.appendChild(windowModule.doc.createTextNode(string.substitute(this.nls.ecm_file.checkedout_other, {user: lockOwner.name})));
	            }   
	            this.lockCtnr.style.display = "";   
	         }
	      },
	      //Make sure the doc/draft we are showing isn't a different id than what the event gave us
	      _isEventDifferentVersion: function () {
	   	     var currentId = this.getCurrentId();
	   	     currentId = this.currentId = currentId.substring(1, (currentId.length - 1)); //remove brackets
	   	     return (this.context.rollupUrl.indexOf(currentId) == -1);
	      },
	      //Override function in History.js to make sure we query by the right draft id
	      getRollupUrl: function() {
	         var rollupUrl = this.context.rollupUrl;
	   	     if (this.shouldUpdateRollup) {
	   	        var search = "filterValue=";
	   	        var index = rollupUrl.indexOf(search);
	            rollupUrl = rollupUrl.slice(0, index + search.length) + this.currentId;
	   	     }
	         return rollupUrl;
	      },
	      getCurrentId: function() {
	         return this.value("id");   
	      },
	      getMissingErrorMessage: function() {
	         return this.getReadMoreStrings().error_404;   
	      },
	      _getCommunityId : function(_context) {
	         if (_context) {
	            var u = _context.activityUrl;
	            if (!!u) {
	               var i1 = u.indexOf("communityUuid=");
	               if (i1 > 0) {
	                  var i2 = u.indexOf("&", i1);
	                  if (i2 > 0) {
	                     return u.substring(i1, i2);
	                  } else {
	                     return u.substring(i1);
	                  }
	               }
	            }
	         }
	         return null;
	      },
	      getVisibilityCheckerArgs: function() {
	         return {
	            communityId: this._getCommunityId(this.context),
	            ds: this.ds,
	            file: this.data,
	            net: this.network,
	            routes: this.routes
	         };
	      },
	      loadPublishedDocWidget: function() {},
	      loadDraftWidget: function() {}
	   });   
	})();
	return _ECMEntry;
});
