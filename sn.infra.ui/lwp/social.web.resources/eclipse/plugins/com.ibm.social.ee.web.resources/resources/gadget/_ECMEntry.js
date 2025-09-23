/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._ECMEntry");
dojo.require("dojo.string");
dojo.require("com.ibm.social.ee.data.ECMCommentsFeedDataStore");
dojo.require("com.ibm.social.ee.data.ECMRecommendationsDataStore");
dojo.require("com.ibm.social.incontext.util.url");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.ee.util.misc");

dojo.require("com.ibm.social.ee.gadget._ECMEEGadgetWidget");
dojo.require("com.ibm.social.ee.gadget._WidgetTabsMixin");
dojo.require("com.ibm.social.ee.gadget._HistoryMixin");
dojo.require("com.ibm.social.ee.gadget._GadgetMessageMixin");
dojo.require("com.ibm.social.ee.config");
dojo.require("com.ibm.social.ee.track.ecmfile");
dojo.require("com.ibm.social.ee.bean.ECMAbstractDoc");

/**
 * Do not create an instance of this file.  Instead create an instance of it's subclasses.
 */

(function(){

   var uu = com.ibm.social.incontext.util.url;
   var ut = com.ibm.social.incontext.util.text;
   var g = com.ibm.social.ee.gadget;

   dojo.declare("com.ibm.social.ee.gadget._ECMEntry", 
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
      _ecmStrings: dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").ecm_file,
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
         if (com.ibm.social.ee.util.misc.isImage(ext)) {
            this.initPreviewLink();
            dojo.addClass(this.previewCtnr, "lotusFirst");
         }
         else {
            dojo.addClass(this.downloadCtnr, "lotusFirst");
         }
         this.initDownloadLink();
         this.fileSize.appendChild(dojo.doc.createTextNode(ut.formatSize(this.value("size"))));
         this.initSwitchEELink();
      },
      getMissingErrorNode: function() { 
         if(!this.missingErrorNode) {
            this.missingErrorNode =  dojo.create("div", null, this.gadgetBody, "first");
         }
         return this.missingErrorNode;
      },
      onMissingItem: function () { dojo.publish("com/ibm/social/ee/event/scrollTop", null);},      
      getReadMoreStrings: function() {
         var strings = this.nls.file;
            strings = dojo.mixin({ }, strings);
            dojo.mixin(strings, this._ecmStrings);
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
          dojo.publish("social/ee/ecm/load", [data, this.network, this.routes.oauth]);
       },
       
       notifyDownload: function() {
          var data = { item: this.data, ds: this.ds, authUser: this.authUser, community: this.context.communityid }; 
          dojo.publish("social/ee/ecm/download", [data, this.network, this.routes.oauth]);
       },
         
      // Initialize file title
      setTitle: function () {
         var _nls = this.nls;
         var title = this.getTitle();
         dojo.attr(this.titleNode, "href", this.value("urlLandingPage"));
         ut.breakString(title, dojo.doc, this.titleNode);
         var strings = this.getReadMoreStrings();
         this.titleNode.title = dojo.string.substitute(strings.tooltip, {"name": title});
         this.titleNode.setAttribute("aria-label", dojo.string.substitute(strings.tooltip, {"name": title}));
      },
      setDescription: function () {
        var d = dojo.doc;
         var desc = this.value("description");
         if(desc != "") {
            ut.breakString(desc, dojo.doc, this.contentArea);
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
         downloadLink.title = dojo.string.substitute(this.nls.file.download_tooltip, [ut.formatSize(this.value("size"))]);
         dojo.connect(downloadLink, "onclick", dojo.hitch(this, function(e) {
            var dfd = this.navigateToUrl(false, downloadLink.href, this.checkExists, e);
            dfd.addCallback(dojo.hitch(this, function() {
               this.notifyDownload();
            }));
         }));
      },
      // Initialize the preview link
      initPreviewLink: function () {
         var launchPreviewLink = this.prevLink;
         launchPreviewLink.href = this.routes.getImagePreviewLink(this.value("id"), this.nls.file.PREVIEW.TITLE, this.getPreviewLink(this.value("urlDownload")));
         dojo.connect(launchPreviewLink, "onclick", dojo.hitch(this, "navigateToUrl", true, launchPreviewLink.href, this.checkExists));
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
 	        load: dojo.hitch(this, function(e) {
 	           var bean = new com.ibm.social.ee.bean.ECMAbstractDoc(e.documentElement);
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
         dojo.addClass(this.fileIcon, "lconn-ftype16-" + ext);
      },
      setLockStatus: function() {
         var lockOwner = this.value("lockOwner");
         var authUser = this.authUser;
         if (lockOwner) {
            var img = dojo.create("img", {alt: "", role: "presentation", src: this._blankGif}, this.lockCtnr);
            if (authUser && lockOwner.id == authUser.id) {
               img.className = "lconnSprite lconnSprite-iconCheckedOutMe";
               this.lockCtnr.appendChild(dojo.doc.createTextNode(this.nls.ecm_file.checkedout_you));
            }
            else {
               img.className = "lconnSprite lconnSprite-iconCheckedOut";
               this.lockCtnr.appendChild(dojo.doc.createTextNode(dojo.string.substitute(this.nls.ecm_file.checkedout_other, {user: lockOwner.name})));
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