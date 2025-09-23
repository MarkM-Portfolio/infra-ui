/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/kernel",
      "dojo/i18n",
      "dojo/dom-construct",
      "dojo/dom-class",
      "dojo/dom-attr",
      "dojo/string",
      "dojo/text!./templates/tagWidget.html",
      "dojo/i18n!../nls/strings",
      "dojo/_base/lang",
      "dojo/_base/array",
      "dojo/has",
      "dojo/query",
      "dojo/topic",
      "dijit/_Templated",
      "dijit/_Widget",
      "./AjaxCall",
      "./CommonTagsTypeAhead",
      "./FeedConverter",
      "./TagDialog",
      "../TypeAheadDataStore",
      "../aria/Listbox",
      "../globalization/bidiUtil",
      "../util/html"
],
   function(dojo, declare, kernel, i18n, domConstruct, domClass, domAttr, string, template, i18nstrings, lang, array, has, query, topic, _Templated, _Widget, AjaxCall, CommonTagsTypeAhead, FeedConverter, TagDialog, TypeAheadDataStore, Listbox, bidiUtil, html) {

      kernel.deprecated("ic-core/CommonTags/TagWidget", "Use ic-ui/TagCloud instead", "6.0");

      /**
       * Common tag cloud widget FIXME: this widget must be simplified and made
       * more modular
       * 
       * @class ic-core.CommonTags.TagWidget
       * @extends dijit._Widget
       * @extends dijit._Templated
       * @author Bilikiss O Adebiyi <adebiyi@us.ibm.com>
       */
      function _h(el) {
         if (el)
            domClass.add(el, "lotusHidden");
      }
      function _u(el) {
         if (el)
            domClass.remove(el, "lotusHidden");
      }
      function _v(el) {
         if (el)
            return domClass.contains(el, "lotusHidden");
         return false;
      }
      function clearSearchArea(id) {
         var searchArea = dijit.byId(id + 'commonTagsTypeAhead');
         if (searchArea && searchArea.domNode.hasInput) {
            searchArea.domNode.value = '';
            searchArea.updateHintText();
         }
      }

      var TagWidget = declare("lconn.core.CommonTags.TagWidget", [
            _Widget,
            _Templated
      ], /** @lends ic-core.CommonTags.TagWidget.prototype */
      {

         // //////////////////////////////////////////////////////////
         forRecentTags : false,

         loadOnStartup : true,

         tags : null,

         selectedTags : '',

         redirectUrl : '',

         urlParameters : null,

         tagTemplate : '',

         tagUrl : '',

         tagStore : null,

         ajaxCall : null,

         handleAs : "xml",

         feedConverter : null,

         _isRelated : false,

         disableRelated : false,

         multiSelected : true,

         typeAheadFeedUrl : '',

         typeAheadTemplate : '',

         tagDialogEnabled : false,

         tagsTypeaheadEnabled : true,

         redirectWhenClickTag : true,

         tagListCount : null, // how many results to show in the list view

         templateString : template,

         _selectedTagsArr : null,

         // which view should show? list or cloud.
         _viewType : 'cloud',
         _showVis : null,
         _dialog : null,
         _showRelatedTags : false,

         // //////////////////////////////////////////////////////////" +

         postMixInProperties : function() {
            this.inherited(arguments);
            this.nls = i18nstrings;
            if (!this.id)
               this.id = dijit.getUniqueId("lconnTagWidget");

            // Return the unicode control char for &rlm; when in RTL-mode
            // This character is inserted in front of neutral characters, like
            // "X" or ","
            // when they should be displayed in RTL mode (for example, when they
            // are used as item
            // separators or filter close links
            this._dirCode = dojo._isBodyLtr() ? "" : "\u200F";
         },

         postCreate : function() {
            this.inherited(arguments);
            if (this.forRecentTags) {
               this._noTags.innerHTML = this.nls.rs_tagCloudNoRecentTags;
            }

            this.ajaxCall = this.createAjaxCall();
            this.feedConverter = this.createFeedConverter();

            if (this.tagsTypeaheadEnabled) {
               this._createTypeAhead();
            }

            this.subscribe("com/ibm/lconn/tags/widget/reload", this.reload);
            this.subscribe("ic-core/CommonTags/AddTag", this._addSelectedTag);
            this.subscribe("ic-core/CommonTags/RemoveTag", this._removeSelectedTag);

            if (this.loadOnStartup)
               this.load();
         },

         destroy : function() {
            this.inherited(arguments);
            this.destroyRelatedHelpers();
            this.destroyNormalHelpers();
         },

         destroyRelatedHelpers : function() {
            if (this.relatedHelper)
               this.relatedHelper.destroy();
            this.relatedHelper = null;
         },
         destroyNormalHelpers : function() {
            if (this.listHelper)
               this.listHelper.destroy();
            this.listHelper = null;

            if (this.cloudHelper)
               this.cloudHelper.destroy();
            this.cloudHelper = null;

            if (this.selectedTagsListHelper)
               this.selectedTagsListHelper.destroy();
            this.selectedTagsListHelper = null;
         },

         createAjaxCall : function() {
            if (this.ajaxCall == null) {
               this.ajaxCall = new AjaxCall();
               this.ajaxCall.TAG_URL = this.tagUrl;
               this.ajaxCall.REDIRECT_URL = this.redirectUrl;
               this.ajaxCall.TAG_TEMPLATE = this.tagTemplate;
               this.ajaxCall.URL_PARAMETERS = this.urlParameters;

               if (this.handleAs == 'xml' || this.handleAs == 'json')
                  this.ajaxCall.HANDLE_AS = this.handleAs;
               else
                  this.ajaxCall.HANDLE_AS = 'xml';// default to xml
            }
            return this.ajaxCall;
         },

         createFeedConverter : function() {
            if (this.feedConverter == null)
               this.feedConverter = new FeedConverter();
            return this.feedConverter;
         },

         load : function() {
            this.reload(true);
         },
         reload : function(isFirstLoad, urlParameters) {
            if (urlParameters != null)
               this.ajaxCall.URL_PARAMETERS = urlParameters;

            isFirstLoad = !!isFirstLoad;

            // Related Tags
            this.prepareData();

            this.checkIfRelated();

            if (this._isRelated == true)
               this.ajaxCall.getTags(lang.hitch(this, this.ajaxCallBack), isFirstLoad, this.selectedTags);
            else
               this.ajaxCall.getTags(lang.hitch(this, this.ajaxCallBack), isFirstLoad);
         },

         // used to update parameters based on activity outside the scope of the
         // tag widget
         reloadTags : function(urlParameters) {
            this.ajaxCall.URL_PARAMETERS = urlParameters;
            this.reload(false);
         },

         ajaxCallBack : function(data) {
            if (!data || data instanceof Error) {
               this._noTags.innerHTML = this.nls.rs_tagCloudError;
               _h(this._loadTags);
               _u(this._noTags);
               return;
            }
            if (this.ajaxCall.HANDLE_AS == 'json')
               this.tags = data;
            else
               this.tags = this.feedConverter.parseFeed(data);
            this.updateView();
         },

         checkIfRelated : function() {
            if (this.selectedTags != '' && this.selectedTags != 'undefined' && this.selectedTags != null)
               this._isRelated = true;
            else
               this._isRelated = false;
         },

         updateView : function() {
            this.prepareData();

            this.checkIfRelated();

            if (this._isRelated == true) {
               // generate seletected tags html.
               this._genSelectedTagsHtml();

               // generate tag cloud and list html.
               if (!this.disableRelated)
                  this._genRelatedTagsHtml();

               this._show();
            }
            else {
               // generate tag cloud and list html.
               this._genNormalTagsHtml();
               this._show();
            }

            this._setFocus();
         },

         prepareData : function() {
            // caculate and sort filter tags array.
            this._selectedTagsArr = [];
            if (this.selectedTags != null && string.trim(this.selectedTags) != '') {
               var arr = this.selectedTags.split(' ');
               for (var i = 0; i < arr.length; i++) {
                  var tagName = string.trim(arr[i]);
                  if (tagName == '')
                     continue;
                  // push into _selectedTagsArray.
                  this._selectedTagsArr.push(tagName);
               }
            }
            this._selectedTagsArr = this._selectedTagsArr.sort();
            this.selectedTags = this._selectedTagsArr.join(' ');
         },

         _genRelatedTagsHtml : function() {
            this.destroyRelatedHelpers();
            this._relatedTags.innerHTML = '';
            this._showRelatedTags = false;
            if (this.tags != null) {
               var length = this.tags.length;
               for (var j = 0; j < length; j++) {
                  var tag = this.tags[j];

                  if (this.existsInRelated(tag)) {
                     continue;
                  }

                  var li = document.createElement('li');
                  dijit.setWaiRole(li, "presentation");
                  var a = document.createElement('a');
                  dijit.setWaiRole(a, "option");
                  a.href = "javascript:;";
                  var tagDisplayName = (tag.displayName) ? tag.displayName : tag.name;
                  this.renderTag(a, tag);

                  var span = document.createElement('span');
                  span.className = 'lotusSymbol';
                  span.innerHTML = '+';
                  domConstruct.place(span, a);
                  a = html.breakString(bidiUtil.enforceTextDirection(tagDisplayName), document, a, 10);
                  domConstruct.place(a, li);

                  /* Add whitespace to give wrapping hint */
                  domConstruct.place(document.createTextNode(this._dirCode + " "), li);

                  domConstruct.place(li, this._relatedTags);
                  this._showRelatedTags = true;
               }
            }
            this.listHelper = new Listbox(this._relatedTags);
         },

         _genNormalTagsHtml : function() {
            this.destroyNormalHelpers();
            this._tagCloudTable.innerHTML = '';
            this._tagList.innerHTML = '';
            if (this.tags != null) {
               var cloudTags = lconn.core.CommonTags.TagTransform.getPopularTags(this.tags, 50);
               lconn.core.CommonTags.TagTransform.addIntensityBin(cloudTags);
               var tagTableUL = document.createElement('ul');
               dijit.setWaiRole(tagTableUL, "listbox");
               domAttr.set(tagTableUL, "aria-label", this.nls.rs_tagsLabel);
               tagTableUL.style.listStyleType = "disc";
               tagTableUL.tabIndex = "-1";
               for (var i = 0; i < cloudTags.length; i++) {
                  var tag = cloudTags[i];
                  var li = document.createElement('li');
                  dijit.setWaiRole(li, "presentation");
                  var a = document.createElement('a');
                  a.href = 'javascript:;';
                  a.className = 'lotusF' + (tag.intensityBin || 3);
                  var tagDisplayName = (tag.displayName) ? tag.displayName : tag.name;
                  this.renderTag(a, tag);
                  dijit.setWaiRole(a, "option");
                  a = html.breakString(bidiUtil.enforceTextDirection(tagDisplayName), document, a, 10);
                  domConstruct.place(a, li);

                  /* Add whitespace to give wrapping hint */
                  domConstruct.place(document.createTextNode(this._dirCode + " "), li);

                  domConstruct.place(li, tagTableUL);
               }
               domConstruct.place(tagTableUL, this._tagCloudTable);

               this.cloudHelper = new Listbox(tagTableUL);

               var listTags = lconn.core.CommonTags.TagTransform.getListTags(this.tags, this.tagListCount);
               var length = listTags.length;
               for (var j = 0; j < length; j++) {
                  tag = listTags[j];
                  var li = document.createElement('li');
                  dijit.setWaiRole(li, "presentation");
                  li.className = 'lotusAlignLeft';

                  var span = document.createElement('span');
                  span.className = "lotusRight";
                  span.innerHTML = tag.frequency;
                  li.appendChild(span);

                  var a = document.createElement('a');
                  dijit.setWaiRole(a, "option");
                  domClass.add(a, "lotusLeft");
                  a.href = 'javascript:;';
                  var tagDisplayName = (tag.displayName) ? tag.displayName : tag.name;
                  this.renderTag(a, tag);
                  html.breakString(bidiUtil.enforceTextDirection(tagDisplayName), document, a, 10);
                  li.appendChild(a);

                  /* Add whitespace to give wrapping hint */
                  li.appendChild(document.createTextNode(this._dirCode + " "));

                  domConstruct.place(li, this._tagList);
               }
               this.listHelper = new Listbox(this._tagList);
            }
         },

         renderTag : function(a, tag) {
            a.title = string.substitute(this.nls.rs_relatedTagTitle, [
                  bidiUtil.enforceTextDirection(tag.displayName || tag.name),
                  tag.frequency
            ]);
            this.connect(a, "click", lang.hitch(this, "_addSelectedTagFromEvent", tag.name));
         },

         existsInRelated : function(tag) {
            return (lconn.core.CommonTags.TagTransform.existsInRelatedTags(tag.name, this._selectedTagsArr));
         },

         _genSelectedTagsHtml : function() {
            var el = this._selectedTags;
            el.innerHTML = '';
            for (var i = 0; i < this._selectedTagsArr.length; i++) {
               var selectedTag = this._selectedTagsArr[i];
               var tagDisplayName = selectedTag;
               // some widgets save the selected tag as ID, we need to convert
               // to display name, if exists
               var tag = this.findTag(selectedTag);
               if (tag) {
                  tagDisplayName = (tag.displayName) ? tag.displayName : tag.name;
               }
               var li = document.createElement('li');
               li.className = "lotusAlignLeft";
               dijit.setWaiRole(li, "presentation");

               var span = document.createElement('span');
               domClass.add(span, "lotusLeft");
               html.breakString(bidiUtil.enforceTextDirection(tagDisplayName), document, span, 10);
               li.appendChild(span);

               var a = document.createElement('a');
               a.href = "javascript:;";
               a.className = "lotusDelete lotusRight";
               a.title = string.substitute(this.nls.rs_removeTagTitle, [ tagDisplayName
               ]);
               this.connect(a, "click", lang.hitch(this, "_removeSelectedTagFromEvent", selectedTag));
               domAttr.set(a, "role", "option");

               // Add a single character to make the line height match the tag
               // text
               a.appendChild(document.createTextNode("\u00a0"));

               var img = document.createElement('img');
               img.alt = "";
               img.src = this._blankGif;
               dijit.setWaiRole(img, "presentation");
               a.appendChild(img);

               var span = document.createElement('span');
               span.className = "lotusAltText";
               span.appendChild(document.createTextNode("X"));
               a.appendChild(span);
               li.appendChild(a);

               el.appendChild(li);
            }
            this.selectedTagsListHelper = new Listbox(el);
         },

         findTag : function(selectedTag) {
            if (selectedTag && this.tags) {
               var length = this.tags.length;
               for (var i = 0; i < length; i++) {
                  var currentTag = this.tags[i];
                  if (currentTag.name === selectedTag) {
                     return currentTag;
                  }
               }
            }
            return null;
         },

         _addSelectedTagFromEvent : function(tag, event) {
            try {
               if (event)
                  event.preventDefault(), event.stopPropagation();
            }
            catch (e) {
            }

            // Request focus in the related tags section
            this._focusHint = {
               related : true
            };

            this._addSelectedTag(tag);
         },

         _show : function() {
            _h(this._loadTags);

            if ((this.tags == null || this.tags.length == 0) && (this.selectedTags == null || string.trim(this.selectedTags) == '')) {
               if (this.forRecentTags) {
                  _u(this._tagSearchText);
               }
               else {
                  _h(this._tagSearchText);
               }
               _u(this._noTags);
               _h(this._hasTags);
               _h(this._normalTagsSection);
            }
            else {
               _h(this._noTags);
               _u(this._hasTags);

               // Hide the form by default unless the user clicked the "Find a
               // tag" link
               if (!this._openedSearchForm) {
                  _h(this._tagSearchForm);
                  _u(this._tagSearchText);
               }

               if (this._isRelated == true) {
                  _h(this._normalTagsSection);
                  _u(this._selectedTagsSection);
                  this._showSearchForm(null, true);
                  if (this._showRelatedTags && !this.disableRelated) {
                     _u(this._relatedTagsSection);
                  }
                  else {
                     _h(this._relatedTagsSection);
                  }
               }
               else {
                  _h(this._selectedTagsSection);
                  _h(this._relatedTagsSection);
                  _u(this._normalTagsSection);

                  if (this._viewType == 'cloud') {
                     _h(this._tagListLink);
                     _h(this._tagListView);
                     _h(this._tagListAll);

                     _u(this._tagCloudLink);
                     _u(this._tagCloudView);
                     if (this.tagDialogEnabled)
                        _u(this._tagCloudAll);
                  }
                  else {
                     _h(this._tagCloudLink);
                     _h(this._tagCloudAll);
                     _h(this._tagCloudView);
                     _u(this._tagListLink);
                     _u(this._tagListView);
                     if (this.tagDialogEnabled)
                        _u(this._tagListAll);
                  }
               }
            }
         },

         _createTypeAhead : function() {
            var tempp = dijit.byId(this.id + 'commonTagsTypeAhead');
            if (tempp != null)
               tempp.destroy();

            this.tagStore = this.tagStore || new TypeAheadDataStore({
               url : this.typeAheadFeedUrl,
               queryParam : this.typeAheadTemplate
            }, this.domNode);

            var args = {
               minChars : 2,
               searchDelay : 400,
               multipleValues : true,
               store : this.tagStore,
               // 'class': 'fieldNode',
               token : " ",
               'name' : this.id + 'commonTagsTypeAhead',
               'id' : this.id + 'commonTagsTypeAhead'
            };
            var tagsTypeAhead = new CommonTagsTypeAhead(args, this._typeAheadDom);
         },

         // ///////////////////////////////
         // Event Consuming Functions
         // //////////////////////////////
         // Enforcing text direction
         _onKeyUp : function(/* Event */evt) {
            bidiUtil.inputRTLProcessing(this._typeAheadDom);
         },

         // show or hide the tag menu by click.
         _toggleSubs : function() {
            if (_v(this._tagMenu)) {
               new dojo.fx.Toggler({
                  node : this._tagMenu,
                  showDuration : 500,
                  showFunc : dojo.fx.wipeOut
               }).show();
               this._toggleBar.className = "lotusSprite lotusArrow lotusTwistyClosed";
            }
            else {
               new dojo.fx.Toggler({
                  node : this._tagMenu,
                  showDuration : 500,
                  showFunc : dojo.fx.wipeIn
               }).show();
               this._toggleBar.className = "lotusSprite lotusArrow lotusTwistyOpen";
            }
         },

         _showSearchForm : function(/* Event */e, selected) {
            var el = dijit.byId(this.id + 'commonTagsTypeAhead');

            _h(this._tagSearchText);
            _u(this._tagSearchForm);

            if (el) {
               // Set hint text if the typeahead has that capability
               if (el.updateHintText)
                  el.updateHintText(selected ? this.nls.rs_searchInputTagSelected : this.nls.rs_searchInputDefault);

               // Only auto-focus if we clicked the link to show the form
               if (e) {
                  this._openedSearchForm = true;
                  e.preventDefault(), e.stopPropagation();
                  el.focus();
               }

               if (el.onSelect) // onSelect works in Dojo 1.4.1
                  this.connect(el, "onSelect", lang.hitch(this, "_searchTag", null));
               else if (el._doSelect) // _doSelect works in Dojo 1.2.3
                  this.connect(el, "_doSelect", lang.hitch(this, "_searchTag", null));
            }
         },

         _popupHelp : function(event) {
            event.preventDefault(), event.stopPropagation();
            var tagEvt = {
               tagWidget : this,
               event : event
            };
            topic.publish("/tagWidget/help/show", tagEvt);
         },

         _showCloud : function() {
            this._viewType = 'cloud';
            this._show();
            if (this.cloudHelper && this.cloudHelper.focus)
               this.cloudHelper.focus();
            else
               dijit.focus(this._showCloudSpan);
         },

         _showList : function() {
            this._viewType = 'list';
            this._show();
            if (this.listHelper && this.listHelper.focus)
               this.listHelper.focus();
            else
               dijit.focus(this._showListSpan);
         },

         _loading : function() {
         // this._tagItems.innerHTML = '<img alt="" src="'+this._blankGif+'"
         // class="lotusLoading" />';
         },

         // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         // event that needs ajax call
         // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         _showAllTags : function(event) {
            if (event)
               event.preventDefault(), event.stopPropagation();
            if (this._dialog == null) {
               var tagDialogArgs = {
                  ajaxCall : this.ajaxCall,
                  feedConverter : this.feedConverter,
                  tagWidget : this
               };
               this._dialog = new TagDialog(tagDialogArgs);
            }
            this._dialog.show();
         },

         _searchTag : function(event, item) {
            try {
               if (event)
                  event.preventDefault(), event.stopPropagation();
            }
            catch (e) {
            }

            if (item)
               if (typeof item == "string")
                  var tag = item;
               else if (typeof item.name == "string")
                  var tag = item.name;

            if (this.tagsTypeaheadEnabled) {
               var typeahead = dijit.byId(this.id + 'commonTagsTypeAhead');
               if (!typeahead)
                  return;
               var input = typeahead.domNode;
               if (!input)
                  return;

               // Get the actual input value, not the typeahead value
               // This lets us capture the user typing in a tag and hitting
               // enter without selecting something from the typeahead
               if (!tag) {
                  if (input.hasInput == false)
                     return;
                  var tag = input.value;
               }

               if (!tag)
                  return;

               input.value = "";
            }
            else {
               var tag = this._typeAheadDom.value;
               if (!tag) {
                  return;
               }
               this._typeAheadDom.value = "";
            }
            this._addSelectedTag(tag);
         },

         _addSelectedTag : function(tag) {
            if (!tag)
               return;
            tag = tag.replace(new RegExp(' ', 'gm'), ',');
            var newTags = tag.split(',');
            var allSelected = [];

            if (this.multiSelected == true) {
               allSelected = this._selectedTagsArr || [];
               for (var p = 0; p < newTags.length; p++) {
                  if (!newTags[p] || lconn.core.CommonTags.TagTransform.existsInRelatedTags(newTags[p], allSelected)) {
                     continue;
                  }
                  allSelected.push(newTags[p]);
               }
            }
            else {
               for (var p = 0; p < newTags.length; p++) {
                  if (!newTags[p]) {
                     continue;
                  }
                  allSelected.push(newTags[p]);
               }
            }

            if (allSelected.length > 0) {
               this._selectedTagsArr = allSelected;
               this.selectedTags = this._selectedTagsArr.join(' ');

               if (this.redirectWhenClickTag == false) {
                  this.reload(false);
               }
               else {
                  this.ajaxCall.redirect(this.selectedTags);
                  clearSearchArea(this.id);
               }
            }
            else {
               this.updateView();
            }
         },

         _removeSelectedTagFromEvent : function(tag, event) {
            try {
               if (event)
                  event.preventDefault(), event.stopPropagation();
            }
            catch (e) {
            }

            // Request focus in the selected tags section at the same index as
            // the item we removed
            var tags = this._selectedTagsArr || [];
            this._focusHint = {
               selected : array.indexOf(tags, tag)
            };

            this._removeSelectedTag(tag);
         },

         _removeSelectedTag : function(tag) {
            var length = this._selectedTagsArr.length;
            for (var i = 0; i < length; i++) {
               if (tag == this._selectedTagsArr[i]) {
                  this._selectedTagsArr.splice(i, 1);
                  break;
               }
            }
            this.selectedTags = this._selectedTagsArr.join(' ');

            if (this.redirectWhenClickTag == false)
               this.reload(false);
            else
               this.ajaxCall.redirect(this.selectedTags);
         },

         _setFocus : function() {
            // redirectWhenClickTag:true - Clicking tag will redirect to a new
            // page.
            // _focusHint - If null, focus hasn't been requested
            if (this.redirectWhenClickTag || !this._focusHint)
               return;

            var hint = this._focusHint;
            this._focusHint = null;

            var focusNode = null;

            // Set the focus on the first related tag.
            if (hint.related && this._relatedTags) {
               focusNode = query('a', this._relatedTags)[0];
            }
            else if (hint.selected >= 0 && this._selectedTagsArr.length) {
               var links = query('a', this._selectedTags);
               focusNode = links[hint.selected] || links[links.length - 1];
            }

            // If we don't have a focus node, try to focus the search input
            if (!focusNode && _v(this._tagSearchForm))
               focusNode = query('input', this._tagSearchForm)[0];

            // If we don't have a focus node, try to focus the search link
            if (!focusNode && _v(this._tagSearchText))
               focusNode = query('a', this._tagSearchText)[0];

            if (focusNode)
               dijit.focus(focusNode);
         },

         // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         // //////// Utility Functions
         // ///////
         // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         // Accepts an array of tags and overwrites selectedTags and
         // selectedTagsArr
         setSelectedTags : function(tagArray) {
            if (tagArray != null && tagArray != 'undefined') {
               this._selectedTagsArr = tagArray;
               this.selectedTags = this._selectedTagsArr.join(' ');
            }
         },

         setSingleTag : function(tag) {
            console.log("setting tag " + tag);
         }
      });

      /**
       * @class ic-core.CommonTags._TagTransform
       * @private
       */
      var _TagTransform = declare("lconn.core.CommonTags._TagTransform", null, /** @lends ic-core.CommonTags._TagTransform.prototype */
      {

         /*
          * Keep the order of the original array. Get the top frequency tags
          * from the array.
          */
         getPopularTags : function(tags, limit) {
            if (tags == null || tags.length == 0)
               return [];
            if (tags.length <= limit) {
               // Size is ok
               // We MUST do slice() to create a new array and make sure
               // for(i in tags)
               // works correctly
               return tags.slice(0);
            }

            var frequencies = [];
            for (var i = 0; i < tags.length; i++) {
               frequencies.push(tags[i].frequency);
            }
            frequencies = frequencies.sort(function(a, b) {
               return a - b;
            }).slice(frequencies.length - limit);

            // Calculate the minimum frequency
            var minFrequency = frequencies[0];

            // Calculate how many of the minimum frequency we'll allow
            var minAllowed = 0;
            while (frequencies[minAllowed] == minFrequency)
               minAllowed++;

            var rtn = [];
            var minUsed = 0;
            for (var i = 0; i < tags.length; i++) {
               if (tags[i].frequency > minFrequency) {
                  rtn.push(tags[i]);
               }
               else if (tags[i].frequency == minFrequency && minUsed < minAllowed) {
                  rtn.push(tags[i]);
                  minUsed++;
               }
            }

            return rtn;
         },

         getCloudTags : function(tags) {
            if (tags == null || tags.length == 0)
               return [];
            var sortedResult = this.sortByName(tags);
            this.addIntensityBin(sortedResult.tags);
            return sortedResult.tags;
         },

         addIntensityBin : function(tags) {
            if (tags == null || tags.length == 0)
               return [];

            var length = tags.length;
            var min = tags[0].frequency;
            var max = tags[0].frequency;
            for (var i = 0; i < length; i++) {
               var frequency = tags[i].frequency;
               if (frequency < min)
                  min = frequency;
               if (frequency > max)
                  max = frequency;
            }

            var range = 0;
            if (min != max) {
               min = Math.log(1 + min);
               max = Math.log(1 + max);
               range = max - min;
            }

            var minSize = 1;
            var maxSize = 5;
            for (var i = 0; i < length; i++) {
               var tag = tags[i];
               // Special case... if all tags have the same weight, make them
               // average-size
               if (range == 0)
                  tag.intensityBin = Math.floor((maxSize + minSize) / 2);
               else
                  tag.intensityBin = minSize + Math.floor((maxSize - minSize) * ((Math.log(1 + tag.frequency) - min) / range));
            }

            return tags;
         },

         getListTags : function(tags, dynamicCount) {
            if (tags == null || tags.length == 0)
               return [];
            if (dynamicCount) // get tags for list view
               var topCounts = this.getTopCounts(tags, dynamicCount);
            else
               var topCounts = this.getTopCounts(tags);

            var tagsSortedByName = this.sortByName(tags).tags;
            var newTags = [];
            for (var i = 0; i < topCounts.length; i++) {
               for (var j = 0; j < tagsSortedByName.length; j++) {
                  if (tagsSortedByName[j].frequency == topCounts[i]) {
                     if (this.existsInArray(tagsSortedByName[j], newTags) == false) {
                        newTags.push(tagsSortedByName[j]);
                        break;
                     }
                  }
               }
            }
            return newTags;
         },

         existsInArray : function(tag, tagArray) {
            return array.some(tagArray, function(item) {
               return tag && item && item.name === tag.name;
            });
         },

         existsInRelatedTags : function(tag, tagArray) {
            return array.indexOf(tagArray, tag) !== -1;
         },

         sortByName : function(tags) {
            var namesArray = [];
            var idMap = {};
            var frequencyMap = {};
            var displayNameMap = {};
            var max = -1;
            var min = -1;
            var returnTags = [];
            if (tags && tags.length) {
               for (var i = 0; i < tags.length; i++) {
                  namesArray.push(tags[i].name);
                  idMap[tags[i].name] = tags[i].id;
                  frequencyMap[tags[i].name] = tags[i].frequency;
                  displayNameMap[tags[i].name] = tags[i].displayName;
               }
               namesArray = namesArray.sort();
               for (var i = 0; i < namesArray.length; i++) {
                  var name = namesArray[i];
                  var id = idMap[namesArray[i]];
                  var frequency = frequencyMap[namesArray[i]];
                  var displayName = displayNameMap[namesArray[i]];
                  returnTags[i] = {
                     id : id,
                     name : name,
                     displayName : displayName,
                     frequency : frequency
                  };
                  if (max == -1)
                     max = frequency;
                  if (min == -1)
                     min = frequency;

                  max = Math.max(max, frequency);
                  min = Math.min(min, frequency);
               }
            }
            return {
               tags : returnTags,
               maxCount : max,
               minCount : min
            };
         },

         getTopCounts : function(tags, count) {
            var countArray = [];
            for (var i = 0; i < tags.length; i++) {
               countArray.push(tags[i].frequency);
            }
            countArray = countArray.sort(this.sortNumber).reverse();
            if (count != null && count != 'undefined') {
               if (count <= countArray.length)
                  return countArray.slice(0, count);
               else
                  return countArray;

            }
            else {
               return countArray.slice(0, 10);
            }
         },

         sortNumber : function(a, b) {
            return a - b;
         },

         /**
          * Write a string to the DOM such that there are the maximum number of
          * sequential non-breakable (by the browser) characters is breakLength
          * (defaults to 10). TODO: use lconn.core.util.text
          */
         breakString : function(s, d, el, breakLength) {
            if (!s)
               return el;
            breakLength = breakLength || 10;
            var b = new RegExp("[^\\s]{" + (breakLength + 1) + "}", "g");
            var r;
            var start = 0, end;
            if (has("ie") || has("safari"))
               while (r = b.exec(s)) {
                  end = --b.lastIndex;
                  el.appendChild(d.createTextNode(s.substring(start, end)));
                  el.appendChild(d.createElement("wbr"));
                  start = end;
               }
            else
               while (r = b.exec(s)) {
                  end = --b.lastIndex;
                  el.appendChild(d.createTextNode(s.substring(start, end) + "\u200B"));
                  start = end;
               }
            el.appendChild(d.createTextNode(s.substring(end)));
            return el;
         }
      });

      lconn.core.CommonTags.TagTransform = new _TagTransform();

      return TagWidget;
   });
