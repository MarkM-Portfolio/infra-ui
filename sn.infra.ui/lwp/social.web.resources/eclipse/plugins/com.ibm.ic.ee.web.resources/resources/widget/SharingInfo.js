/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/topic",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/on",
	"dojo/keys",
	"dojo/string",
	"dojo/text!ic-ee/widget/templates/SharingInfo.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/focus",
	"ic-ee/util/validation",
	"ic-ee/widget/InlineContainer",
	"ic-incontext/typeahead/CommunitySearchQCSAdapter",
	"ic-incontext/typeahead/UserSearchQCSAdapter",
	"ic-incontext/util/html",
	"ic-incontext/util/misc",
	"ic-incontext/util/text",
	"ic-incontext/widget/MessageContainer"
], function (dojo, topic, array, declare, lang, windowModule, domAttr, domClass, domConstruct, on, keys, string, template, _Templated, _Widget, focusUtils, validationModule, InlineContainer, CommunitySearchQCSAdapter, UserSearchQCSAdapter, html, misc, text, MessageContainer) {

	(function () {
	var util = com.ibm.social.incontext.util;
	var validation = validationModule;
	var SharingInfo = declare("com.ibm.social.ee.widget.SharingInfo", [_Widget, _Templated], {
	   templateString: template,   
	   pageSize: 100,
	   maxPageSize: 500,
	   nls: { },
	   communitiesEnabled: true,  
	   filesUrl: null,
	   communitiesTypeAheadUrl: null,
	   owner: null,
	   authUser: null,
	   net: null, 
	   isPublic: false,
	   canShare: false,
	   errorOccurred: false,
	   SEARCH_BOX_WIDTH: "150px",
	   postCreate: function () {
	      this.generateUserLink(this.ownerNode, this.owner);
	      var dsConst = lang.getObject(this.dsConstructor);
	      var dsParams = { net: this.net, url: this.url };
	      this.ds = new dsConst(dsParams);
	      dsConst = lang.getObject(this.shareFileDsConstructor);
	      dsParams = { net: this.net, url: this.shareFileUrl };
	      this.shareFileDs = new dsConst(dsParams);
	      dsConst = lang.getObject(this.entryDsConstructor);
	      dsParams = { net: this.net, url: this.entryUrl };
	      this.entryDs = new dsConst(dsParams);
	      
	      if (this.canShare) {
	         this.addShareLink.style.display = "";
	         this.addShareRow.style.display = "";
	      }
	      
	     this.loadInfo();
	      
	      this.setupTypeAhead();  
	      this.setupInlineContainer();      
	      this.setupMessageContainer();  
	      this.onDisplayChange();
	      this.scrollToBottom();  
	   },
	
	   scrollToBottom: function () {
	      window.setTimeout(function() {
	         topic.publish("com/ibm/social/ee/event/scrollBottom", '');
	      }, 0);      
	   },
	   
	   setupTypeAhead: function () {     
	      this.peopleAdapter = new UserSearchQCSAdapter(this.filesUrl, this.net);
	      this.peopleSearch = this.peopleAdapter.createTypeAhead(this.personInput, { id: this.id + "_personInput", name: "personInput" }, {activeOnly: true});
	      this.peopleAdapter.connectOnSelect(this.peopleSearch, this, "personSelected");
	      this.peopleSearch.domNode.style.width=this.SEARCH_BOX_WIDTH;
	      on(this.peopleSearch, "PopupOpened", lang.hitch(this, "onDisplayChange"));
	      on(this.peopleSearch, "PopupClosed", lang.hitch(this, "onDisplayChange"));     
	      
	      on(this.sourceChooser, "keypress", lang.hitch(this, this._handleTab));
	    	  
	      
	      if (this.communitiesEnabled) {
	         this.communityAdapter = new CommunitySearchQCSAdapter(this.communitiesTypeAheadUrl, this.net);
	         var searchOpts = { };
	         if (!this.canMakePublic) {
	            searchOpts.communityType = "private";
	         }
	         this.communitySearch = this.communityAdapter.createTypeAhead(this.communityInput, { 
	            id: this.id + "_communityInput", 
	            name: "communityInput", 
	            searchOpts: searchOpts
	         });
	         this.communityAdapter.connectOnSelect(this.communitySearch, this, "communitySelected");
	         this.communitySearch.domNode.style.width=this.SEARCH_BOX_WIDTH;
	         this.communitySearch.domNode.style.display = "none";
	         on(this.communitySearch, "PopupOpened", lang.hitch(this, "onDisplayChange"));
	         on(this.communitySearch, "PopupClosed", lang.hitch(this, "onDisplayChange")); 
	      }
	      else {
	         this.communitySource.style.display = "none";
	      }
	   },
	   
	   setupInlineContainer: function () {
	      var ariaDiv = domConstruct.create("div", { className: "lotusOffScreen", waiRole: "alert" }, this.domNode);       
	      this.readers = new InlineContainer({
	         msgRemoveAlt: this.nls.REMOVE_ITEM_ALT,
	         msgEmpty: this.nls.NO_MEMBERS,
	         addedText: this.nls.A11Y_READER_ADDED,
	         removedText: this.nls.A11Y_READER_REMOVED,
	         ariaDiv: ariaDiv         
	      }, this.readersContainer);
	      on(this.readers, "Empty", lang.hitch(this, function() { this.readersRole.style.display = "none"; this.onDisplayChange(); }));
	      on(this.readers, "NotEmpty", lang.hitch(this, function() { this.readersRole.style.display = ""; this.onDisplayChange(); }));
	      on(this.readers, "Add", lang.hitch(this, "onDisplayChange"));
	      on(this.readers, "Remove", lang.hitch(this, "updateMakePublicWarning"));
	      on(this.readers, "Remove", lang.hitch(this, "onDisplayChange"));
	      on(this.readers, "Add", lang.hitch(this, "scrollToBottom"));
	   },
	   
	   setupMessageContainer: function () {
	      this.mc = new MessageContainer({items: [], nls: this.messageNls}, 
	               this.messageContainerNode);
	   },
	   
	   personSelected: function (p) {
	      var person = this.peopleAdapter.getSelected(this.peopleSearch, arguments);
	      
	      this.peopleSearch.set("value", "");
	      
		  this.clearShareFormError();
	      
	      if(person) {
	    	  
	    	  if (this.isPersonSelfInvalid(person)) {
	    		  this.setShareFormError(this.nls.SELF_REFERENCE_ERROR);
	    		  return;
	    	  }
	    	  
	    	  if (this.isPersonOwnerInvalid(person)) {
	    		  this.setShareFormError(this.nls.OWNER_REFERENCE_ERROR);
	    		  return;
	    	  }
	      
	    	  var id = person.id;
	    	  if (!id && person.email) {
	    		  id = person.email.toLowerCase();       
	    	  }
	      
	    	  var item = {id: id, name: person.name, person: person, role: "reader"};
	    	  this.readers.add(item);
	    	  this.onDisplayChange();
	      }
	   },
	   
	   isPersonSelfInvalid: function (person) {
	      return (this.authUser && person && person.id == this.authUser.id);
	   },
	   
	   isPersonOwnerInvalid: function (person) {
	      return (this.owner && person && person.id == this.owner.id);
	   },
	   
	   communitySelected: function (community) {
	      this.communitySearch.set("value", "");
	      this.clearShareFormError();
	      
	      var item = {
	         id: community.id,
	         name: text.trimToLength(community.title, 25),
	         community: community,
	         role: "reader"
	      };
	      this.readers.add(item);
	      if (community.communityType != "private")
	         this.updateMakePublicWarning();      
	      this.onDisplayChange();
	   },
	   
	   updateMakePublicWarning: function() {
	      if (!this.isPublic) {
	         var items = this.readers.getItems();
	         var item = array.filter(items, function(i) {return i.community && i.community.communityType != "private";})[0];
	         if (item)
	            this.mc.update([{warning: true, message: string.substitute(this.nls.SHARE_COMMUNITY_WARN, [item.community.title])}]);
	         else
	            this.mc.update();
	         this.onDisplayChange();
	      }
	   },   
	   
	   setShareFormError: function (msg) {
	      this.clearShareFormError();
	      this.formError.appendChild(windowModule.doc.createTextNode(msg));
	      this.formError.style.display = "";
	      this.onDisplayChange();
	   },
	  
	   clearShareFormError: function () {
	      domConstruct.empty(this.formError);
	      this.formError.style.display = "none";
	      this.onDisplayChange();
	   },
	      
	   loadInfo: function () {
	   	domConstruct.empty(this.loadingDiv);
	   	html.showLoading(this.loadingDiv);
	      this.ds.fetch ({
	         count: this.pageSize,
	         onComplete: lang.hitch(this, this.dataLoaded),
	         onError: lang.hitch(this, this.errorHandler)
	      });
	   },
	   
	   dataLoaded: function (items, request) {
	      var ds = this.ds;
	      var externalContributors = [];
	      var internalContributors = [];
	      var externalReaders = [];
	      var internalReaders = [];
	      var communityCount = 0;
	      array.forEach(items, function(item) {         
	         var isExternal = false; // sharingIntentEnabled && item.orgId && item.orgId != file.getOrgId(); TODO: This condition should be checked when working on a LotusLive back-end
	         var type = ds.getValue(item, "type");
	         var permission = ds.getValue(item, "permission");
	         var sharePermission = ds.getValue(item, "sharePermission");
	         var collectionCount = ds.getValue(item, "collectionType");
	         if ((type == "user" && permission == "Edit") || 
	               (type == "collection" && sharePermission == "Edit")) {//collection item - file should use sharePermission
	            if (isExternal)
	               externalContributors.push(item);
	            else
	               internalContributors.push(item);
	         }
	         else {
	            if (isExternal)
	               externalReaders.push(item);
	            else
	               internalReaders.push(item);
	         }        
	         if (item.collectionType == "community") {
	            item.name = item.title;
	         	communityCount++;
	         }
	      });
	      util.misc.sort(internalReaders, ["type", -1], "name");
	      // util.misc.sort(externalReaders, ["type", -1], "name");
	      util.misc.sort(internalContributors, ["type", -1], "name");
	      // util.misc.sort(externalContributors, ["type", -1], "name");
	
	      this.renderSharings(this.fileReadersNode, internalReaders, true);
	      this.renderSharings(this.fileEditorsNode, internalContributors, false);
	
	      if (this.showMoreRow) {
	         domConstruct.destroy(this.showMoreRow);
	         this.showMoreRow = null;
	      }
	      
	      if (ds.hasMoreResults && this.pageSize < this.maxPageSize) {
	         var d = windowModule.doc;
	         var tr = this.showMoreRow = d.createElement("tr");
	            var th = d.createElement("th");
	            tr.appendChild(th);
	            var td = d.createElement("td");
	               var a = d.createElement("a");
	                  a.href = "javascript:;";
	                  a.appendChild(d.createTextNode(this.nls.SHOW_MORE));
	                  on(a, "click", lang.hitch(this, "showMore"));
	                  a.setRole("role", "button");
	               td.appendChild(a);
	            tr.appendChild(td);
	         this.shareTableBody.appendChild(tr);
	      }
	      this.loadingDiv.style.display = "none";
	      this.sharingInfoData.style.display = "";
	      this.dataComplete();
	      this.onDataLoaded();
	   },
	   dataComplete: function() {
		   topic.publish("com/ibm/social/ee/data/loaded", '');
	   },
	   renderSharings: function (el, items, showPublic) {
	      domConstruct.empty(el);
	      var ds = this.ds;
	      var delimiter = util.html.getDirectionCode() + ", ";
	      var d = windowModule.doc;
	      if (showPublic && this.isPublic) {
	         var publicString = this.nls.READER_IF_PUBLIC;
	         if (this.orgName && this.filesStrings) {
	            publicString = string.substitute(this.filesStrings.READER_IF_PUBLIC, {company: this.orgName});
	         }
	         el.appendChild(d.createTextNode(publicString));
	      }
	      
	      array.forEach(items, function(item) {
	         if (el.lastChild)
	            el.appendChild(d.createTextNode(delimiter));
	         var type = ds.getValue(item, "type");
	         if (type == "user") {
	            var span = domConstruct.create("span", {className: "vcard"}, el);
	            this.generateUserLink(span, { name: ds.getValue(item, "name"), id: ds.getValue(item, "id"), state: ds.getValue(item, "userState") });
	         }
	         else { 
	            var span = domConstruct.create("span", { }, el);
	            this.generateCommunityLink(span, { name: ds.getValue(item, "title"), id: ds.getValue(item, "externalContainerId") });
	         }
	      }, this);
	      
	      if (!el.firstChild)
	         el.appendChild(d.createTextNode(this.nls.EMPTY_READERS));
	      
	   },
	  
	   errorHandler: function (error) {
	      this.errorOccurred = true;
	      this.loadingDiv.style.display = "none";
		   this.sharingInfoData.style.display = "none";	  
	      var message = this.nls.ERROR;
	      if (error && error.code == "ItemNotFound")
	         message = this.nls.ERROR_NOT_FOUND;
	      else if (error && error.code == "AccessDenied")
	         message = this.nls.ERROR_ACCESS_DENIED;
	      this.errorNode.innerHTML = message;
	      domClass.add(this.errorNode, "lconnEmpty")
	      this.errorNode.style.display = "";
	      this.onDataLoaded();
	      
	   },
	   
	   onDataLoaded: function () {},
	   
	   generateUserLink: function (div, user) {},
	   
	   generateCommunityLink: function(div, community) {},
	   
	   showMore: function () {
	      this.pageSize = Math.min(this.pageSize * 3, this.maxPageSize);
	      this.loadInfo();
	   },
	   resetShareForm: function () {
	      this.mc.update();
	      this.clearShareFormError();
	      this.clearMessageError();
	      this.readers.removeAll();
	      this.peopleSearch.set("value", "");
	      this.communitySearch.set("value", "");
	      this.txtArea.value = "";
	      this.txtArea.style.display = "none";
	      this.msgLink.style.display = "";      
	      this.sourceChooser.value = "person";
	      this.sourceChanged(false);
	   },
	   focusSourceChooser: function(){
	       focusUtils.focus(this.sourceChooser);
	   },
	   showSharing: function() {
	      if(this.errorOccurred) {
	    	  this.hideSharing();
	    	  return;
	      }
	      this.resetShareForm();
	      this.shareSect.style.display = "";
	      this.onDisplayChange();
	      this.focusSourceChooser();
	      this.scrollToBottom();
	   },
	   hideSharing: function() {
	      this.resetShareForm();
	      this.shareSect.style.display = "none";
	      this.onDisplayChange();
	      focusUtils.focus(this.addShareLink);
	   },
	   shareFile: function() {
	      if(domClass.contains(this.shareSubmit, "submitEnabled")) {
	         this.disableShareBtn();
	         if (this.validateShare()) {
	            var ds = this.shareFileDs;         
	            var shareInfo = {  
	               users: this.readers.getItems(),
	               isPublic: this.isPublic,
	               fileId: this.file.id
	            };
	            if (this.txtArea.style.display != "none" && this.txtArea.value.length) {
	               shareInfo.shareMessage = this.txtArea.value;
	            }         
	            ds.newItem(shareInfo);
	            topic.publish("com/ibm/social/ee/file/beforeShare", '');
	            ds.save({ 
	               scope: this,
	               onComplete: this.shareFileComplete,
	               onError: this.shareFileError
	            });
	         } else {
	            this.enableShareBtn();
	         }
	      }
	   },
	   enableShareBtn: function() {
	      this.shareSubmit.setAttribute("aria-disabled", false);
	      domClass.add(this.shareSubmit, "submitEnabled");
	      domClass.remove(this.shareSubmit, "submitDisabled");
	   },
	   disableShareBtn: function() {
	      this.shareSubmit.setAttribute("aria-disabled", true);
	      domClass.add(this.shareSubmit, "submitDisabled");
	      domClass.remove(this.shareSubmit, "submitEnabled");
	   },
	   shareFileComplete: function() {
	      this.entryDs.fetch ({
	         scope: this,
	         onComplete: function (items) {
	            var file = items[0];
	            this.isPublic = (this.entryDs.getValue(file, "visibility") == "public");
	            topic.publish("com/ibm/social/ee/file/shared", this.entryDs.getValue(file, "modified"));
	            this.loadInfo();
	            this.hideSharing();
	            var self = this;
	            this.mc.update([{ success: true, message: this.nls.INFO_SUCCESS, canClose: true, onClose: function() { self.onDisplayChange(); } }]);
	            this.onDisplayChange();
	            focusUtils.focus(this.addShareLink);
	            self.enableShareBtn();
	         }
	      });
	   },
	   shareFileError: function(error) {
	      var msg = this.nls.ERROR;
	      var isSuccess = false;
	      if (error && error.code) {
	         var code = error.code;
	         if (code == "ShareQuotaExceeded")
	            msg = this.nls.MAX_SHARES_ERROR;
	         else if (code == "RestrictionViolation")
	            msg = this.app.nls.VISIBILITY_RESTRICTION_ERROR_SHARE;
	         else if (code == "ItemNotFound")
	            msg = this.nls.NOT_FOUND_ERROR;
	         else if (code == "AccessDenied" || code == "Unauthorized")
	            msg = this.nls.ACCESS_DENIED_ERROR;
	         else if(code == "cancel")
	            msg = this.nls.CANCEL_ERROR;
	         else if (code == "timeout")
	            msg = this.nls.TIMEOUT_ERROR;
	         else if (code == "unauthenticated")
	            msg = this.nls.NOT_LOGGED_IN_ERROR;
	         else if(code == "ItemExists") {
	            //treat as success to mimic Files behavior
	            this.shareFileComplete();
	            isSuccess = true;
	         }
	      }
	      if(!isSuccess) {
	         this.mc.update([{error: true, message: msg }]);
	         this.onDisplayChange();
	         this.enableShareBtn();
	      }
	   },
	   validateShare: function () {
	      if (this.validateUsers() && this.validateShareMessage())
	         return true;
	      else
	         return false;
	   },
	   validateUsers: function () {
	      if (this.readers.getItems().length == 0) {
	         this.setShareFormError(this.nls.SELECT_USER_ERROR);
	         return false;
	      }
	      return true;
	   },   
	   validateShareMessage: function () {
	      this.clearMessageError();
	      var msg = this.txtArea.value;
	      if (msg && msg.length) {
	         var d = windowModule.doc;
	         if (!validation.validateTextLength(msg, validation.DESCRIPTION_LENGTH)) {
	            var contents = [d.createTextNode(this.nls.WARN_LONG_MESSAGE)];
	            contents.push(d.createTextNode(" "));
	            var a = d.createElement("a");
	               a.href = "javascript:;";
	               on(a, "click", lang.hitch(this, "trimShareMessage"));
	               a.appendChild(d.createTextNode(this.nls.TRIM_LONG_MESSAGE));
	            contents.push(a);            
	            this.setMessageError(contents);
	            return false;            
	         }         
	      }
	      return true;
	   },
	   setMessageError: function (content) {
	      this.clearMessageError();
	      array.forEach(content, function(n) { this.messageError.appendChild(n); }, this);
	      this.messageError.style.display = "";
	      this.onDisplayChange();
	   },
	   clearMessageError: function () {
	      domConstruct.empty(this.messageError);
	      this.messageError.style.display = "none";
	      this.onDisplayChange();
	   },
	   showTxtArea: function() {
	      this.txtArea.style.display = "";
	      this.msgLink.style.display = "none";
	      this.onDisplayChange();
	      this.txtArea.focus();
	      this.scrollToBottom();
	   },
	   onDisplayChange: function() {      
	
	   },   
	
	   _handleTab: function (evt) {
		   
		   // shift tab should not be caught here
		   if(evt.shiftKey)
			   return;
		   
		   var charOrCode = evt.charCode || evt.keyCode;	       		 
		   
		   switch(charOrCode){
		   		case keys.TAB:{
		   			evt.preventDefault(), evt.stopPropagation();
		   			this.sourceChanged();
		   			if(this.sourceChooser.value == "person")
		   				focusUtils.focus(this.peopleSearch.domNode);
		   			else
		   				focusUtils.focus(this.communitySearch.domNode);
		   		}
		   }
	   },
	   
	   sourceChanged: function(focus) {
	      if (this.sourceChooser.value == "person") {
	         
	    	 this.peopleSearch.domNode.style.display = "";
	         domAttr.set(this.peopleSearch.domNode, "tabindex", "0");
	         this.peopleSearch.domNode.setAttribute("aria-hidden", "false");
	         
	         this.communitySearch.domNode.style.display = "none";
	         domAttr.set(this.communitySearch.domNode, "tabindex", "-1");
	         this.communitySearch.domNode.setAttribute("aria-hidden", "true");
	         
	         this.peopleSearch.set("value", "");
	      }
	      else {
	         
	    	 this.peopleSearch.domNode.style.display = "none";
	    	 domAttr.set(this.peopleSearch.domNode, "tabindex", "-1");
	    	 this.peopleSearch.domNode.setAttribute("aria-hidden", "true");
	         
	         this.communitySearch.domNode.style.display = "";
	         domAttr.set(this.communitySearch.domNode, "tabindex", "0");
	         this.communitySearch.domNode.setAttribute("aria-hidden", "false");
	         
	         this.communitySearch.set("value", "");
	      }
	   },
	   trimShareMessage: function() {     
	      var el = this.txtArea;
	      if (el && el.style.display != "none") {
	         var i = util.text.getCharIndexForUtf8Index(el.value, validation.DESCRIPTION_LENGTH);
	         if (i != -1)
	            el.value = el.value.substring(0, i);
	         this.clearMessageError();
	      }
	   } 
	});
	
	})();
	return SharingInfo;
});
