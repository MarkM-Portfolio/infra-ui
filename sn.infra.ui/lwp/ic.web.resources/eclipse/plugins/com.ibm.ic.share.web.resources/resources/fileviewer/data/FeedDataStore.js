/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "../network/request",
   "dojo/Deferred",
   "dojo/DeferredList",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/query",
   "dojo/string",
   "../util/dom",
   "./util/DomBuilder",
   "./sources/fileLockSource",
   "./sources/MyFileSyncSource",
   "../util/network",
   "dojo/i18n!../nls/FileViewerStrings",
   "../config/globals",
   "dojo/topic",
   "../dialog/ConfirmationDialog"
], function (declare, request, Deferred, DeferredList, lang, array, query, string, dom, DomBuilder,
      fileLockSource, MyFileSyncSource, networkUtil, i18n, globals, topic, ConfirmationDialog) {
   "use strict";
   var errorDialogOpen = false;

   return declare([], {
      _pageSize: 10,
      _page: 1,
      _hasNext: true,
      _feedHandleAs: "xml",
      _domBuilder: new DomBuilder(),
      _total: 0,
      _response: undefined,
      EntryClass: undefined,

      constructor: function (args) {
         lang.mixin(this, args);

         this._loadedItems = {};
      },

      _getPostBody: function (item) {
         return this._domBuilder.getPostBody(item);
      },

      _getPutBody: function (item) {
         return this._getPostBody(item);
      },

      fetch: function (args) {
         return this._loadPage(args);
      },

      refresh: function (args) {
         this._page = 1;
         this._hasNext = true;
         this._loadedItems = {};
         return this.fetch(args);
      },

      next: function () {
         if (!this._hasNext) {
            return new Deferred().reject();
         }

         this._page += 1;
         return this._loadPage();
      },

      _loadPage: function (args) {
         args = args || {};
         return this._request(this.url, {
            handleAs: this._feedHandleAs,
            withCredentials: true,
            query: this._getFeedQuery(args),
            preventCache: true,
            _args: args
         }).then(
            lang.hitch(this, this._handleFeedResponse),
            lang.hitch(this, this._handleError)
         );
      },

      _handleFeedResponse: function (response) {
         this.setResponse(response);
         this._hasNext = this._getHasNext(response);
         this._total = this._getTotal(response) || 0;
         var items = this._getItems(response);
         items = this._removeDuplicates(items);
         
         array.forEach(items, function (item) {
            item.unmarkDirty();
         }, this);
         return items;
      },

      _getItems: function (response) {
         var entries = array.map(this._getEntries(response), function (entry) {
            var itemArgs;
            if (this._feedHandleAs === "xml") {
               itemArgs = {xml: entry};
            } else {
               itemArgs = entry;
            }
            return this.newItem(itemArgs);
         }, this);

         return entries;
      },

      _removeDuplicates: function (items) {
         var itemId, i;

         for (i = items.length - 1; i >= 0; i--) {
            itemId = items[i].get("id");
            if (this._loadedItems[itemId]) {
               items.splice(i, 1);
            } else {
               this._loadedItems[itemId] = true;
            }
         }

         return items;
      },
      
      setResponse: function (response) {
       	 this._response = response;
      },
      
      getResponse: function () {
    	  return this._response;
      },
      
      _getHasNext: function (response) {
         return !!dom.getLinkAttrByRel(response, "next", "href");
      },

      hasNext: function () {
         return this._hasNext;
      },

      _getTotal: function (response) {
         if (this._feedHandleAs === "xml") {
            return dom.getChildTextNS(response, "totalResults", dom.NS.OPENSEARCH);
         } else {
            return response.totalSize;
         }
      },

      getTotal: function () {
         return this._total;
      },

      _getEntries: function (response) {
         return query("entry", response);
      },

      _getFeedQuery: function () {
         return {};
      },

      newItem: function (args) {
         return this._newItem(args);
      },

      _newItem: function (args) {
         args = lang.mixin(args, this._getNewItemProperties());

         var item = new this.EntryClass(args);
         item.create = lang.hitch(this, this.createItem, item);
         item.update = lang.hitch(this, this.updateItem, item);
         item.remove = lang.hitch(this, this.deleteItem, item);
         item.load = lang.hitch(this, this.loadItem, item);
         return item;
      },

      _getNewItemProperties: function () {
         return {};
      },

      createItem: function (item, args) {
         args = args || {};
         return this._request(this._getCreateUrl(item, args), {
            method: "POST",
            handleAs: "xml",
            data: this._getPostBody(item, args),
            headers: {"Content-Type": "application/atom+xml;charset=UTF-8"},
            query: this._getCreateQuery(item, args),
            _args: args
         }).then(lang.hitch(this, function (response) {
            this._updateItemFromResponse(item, response);
         }), lang.hitch(this, this._handleError));
      },

      _getCreateUrl: function (item, args) {
         return this.url;
      },

      _getCreateQuery: function (item, args) {
         return {};
      },

      deleteItem: function (item, args) {
         args = args || {};
         return this._request(this._getDeleteUrl(item, args), {
            method:  "POST",
            headers: {
               "Content-Type": "x-www-form-urlencoded;charset=UTF-8",
               "X-Method-Override": "DELETE"
            },
            _args: args
         }).then(null, lang.hitch(this, this._handleError));
      },

      _getDeleteUrl: function (item, args) {
         return item.get("entryUrl");
      },

      updateItem: function (item, args) {
         args = args || {};

         var errorHandler, deferreds = [], deferredList, i;

         errorHandler = lang.hitch(this, "_onError", item);
         deferreds.push(fileLockSource.save(item, errorHandler));
         deferreds.push(MyFileSyncSource.save(item, errorHandler));

         for(i = 0;i < deferreds.length;i++){
           if (!deferreds[i]) {
             deferreds[i] = new Deferred();
             deferreds[i].resolve();
           }
         }
         deferredList = new DeferredList(deferreds);

         return deferredList.then(lang.hitch(this, "_sendGenericSave", item, args, errorHandler), errorHandler);
      },

      _sendGenericSave: function (item, args, errorHandler) {
         return this._request(this._getUpdateUrl(item, args), {
            method: "POST",
            handleAs: "xml",
            data: this._getPutBody(item),
            headers: {
               "Content-Type": "application/atom+xml;charset=UTF-8",
               "X-Method-Override": "PUT"
            },
            query: this._getUpdateQuery(item, args),
            _args: args
         }).then(lang.hitch(this, function (response) {
            if (args.updateFromResponse !== false) {
              this._updateItemFromResponse(item, response);
            }
            return response;
         }), errorHandler);
      },

      _onError: function (item, error) {
         item.cancelChanges();
         return this._handleError(error);
      },

      _getUpdateUrl: function (item, args) {
         return item.get("entryUrl");
      },

      _getUpdateQuery: function (item, args) {
         return {};
      },

      loadItem: function (item, args) {
         args = args || {};
         return this._requestItem(item, args).then(lang.hitch(this, function (response) {
            this._updateItemFromResponse(item, response);
         }), lang.hitch(this, this._handleError));
      },

      _requestItem: function (item, args) {
         return this._request(this._getLoadUrl(item, args), {
            handleAs: "xml",
            _args: args
         });
      },

      _getLoadUrl: function (item, args) {
         return item.get("entryUrl");
      },

      _updateItemFromResponse: function (item, response) {
        if (!lang.isArray(item)) {
          item.set("xml", response);
          item.unmarkDirty();
        }
      },

      _request: function (url, options) {
         return request(url, options);
      },

      _handleError: function (response) {
         if(response.status == 401 && !errorDialogOpen) {
            this.timeOutDialog();
         }
         if (response.status == 404 && !errorDialogOpen) {
           this.fileNotFoundDialog();
         }
         var promise = new Deferred();
         promise.reject(networkUtil.parseError(response));
         return promise;
      },
      
      fileNotFoundDialog: function() {
         var dialogStrings = i18n.NOTFOUND_FILE_DIALOG ||
                {DIALOG_TITLE: "Error", PROMPT: "The file you have requested has been deleted or moved.", CANCEL: "OK"};
         this.dialog = new ConfirmationDialog({strings: dialogStrings, hideOk: true});
         this.dialog.on("clicked", lang.hitch(this, "_closeFile"));
         this.dialog.on("close", lang.hitch(this, "_closeFile"));
         this.dialog.placeAt(document.body);
         this.dialog.startup();
         this.dialog.show();
         errorDialogOpen = true;
       },
       
       _closeFile: function() {
          topic.publish("ic-fileviewer/dirty");
          topic.publish("ic-fileviewer/close");
          errorDialogOpen = false;
        },
      
     timeOutDialog: function() {
        var lconnDialogUtil = lang.getObject("lconn.core.DialogUtil");
        if (lconnDialogUtil) {
           var strings = i18n.LOST_AUTHENTICATION_DIALOG;
           var prompt = string.substitute(strings.PROMPT, {lineBreaks: "<br/><br/>"});
            lconnDialogUtil.prompt(strings.DIALOG_TITLE, prompt, strings.OK, strings.CANCEL, function (okSelected) {
               if (okSelected) {
                  globals.login();
               }
               errorDialogOpen = false;
            });
            errorDialogOpen = true;
         }
     }
   });
});
