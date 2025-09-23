/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define([
      "dojo",
      "dojo/i18n",
      "dojo/i18n!../enabler/nls/modelMessages",
      "dojo/_base/lang",
      "dojo/_base/declare",
      "dojo/string",
      "../enabler/debug",
      "../enabler/services/ConfigService",
      "../enabler/services/ModelRestServiceRequest",
      "../enabler/utilities",
      "../enabler/xpath"
],
   function(dojo, i18n, i18nmodelMessages, langModule, declare, string, debug, ConfigService, ModelRestServiceRequest, utilities, xpathModule) {

      // dojo.//require( "com.ibm.mashups.enabler.model" ); //FIXME: Not
      // provided with this distribution?
      // deferred
      declare("com.ibm.mm.enabler.DeferredImpl", com.ibm.mashups.enabler.Deferred, {
         constructor : function() {

            // finished callback
            this.finishedCallback2 = null;
            this.finishedCallbackParameters2 = null;

            // error callback (internal)
            this.errorCallback = null;
            this.errorCallbackParameters = null;

            // finish callback (internal)
            this.finishedCallback = null;
            this.finishedCallbackParameters = null;
         },

         addErrorCallback : function(callback, parameters) {
            this.errorCallback = callback;
            this.errorCallbackParameters = parameters;
         },

         addFinishedCallback : function(callback, parameters) {
            this.finishedCallback = callback;
            this.finishedCallbackParameters = parameters;
         },

         setFinishedCallback : function(callback, parameters) {
            this.finishedCallback2 = callback;
            this.finishedCallbackParameters2 = parameters;
         },

         /* abstract */
         start : function(sync) {}
      });

      // deferred find
      declare("com.ibm.mm.enabler.DeferredFindImpl", com.ibm.mm.enabler.DeferredImpl, {
         constructor : function(model, uri) {
            this.model = model;
            this.uri = uri;
         },

         // defaults to synchronous
         start : function(sync) {
            var mode = (sync || typeof (sync) == 'undefined') ? true : false;
            return this.model._find(this.uri, this, mode);
         }
      });

      // deferred getParent
      declare("com.ibm.mm.enabler.DeferredGetParentImpl", com.ibm.mm.enabler.DeferredImpl, {
         constructor : function(model, uri) {
            this.model = model;
            this.uri = uri;
         },
         start : function(sync) {
            var mode = (sync || typeof (sync) == 'undefined') ? true : false;
            return this.model._getParent(this.uri, this, mode);
         }
      });

      // deferred getRoot
      declare("com.ibm.mm.enabler.DeferredGetRootImpl", com.ibm.mm.enabler.DeferredImpl, {
         constructor : function(model) {
            this.model = model;
         },

         start : function(sync) {
            var mode = (sync || typeof (sync) == 'undefined') ? true : false;
            return this.model._getRoot(this, mode);
         }
      });

      // deferred getSharedRoot
      declare("com.ibm.mm.enabler.DeferredGetSharedRootImpl", com.ibm.mm.enabler.DeferredImpl, {
         constructor : function(model) {
            this.model = model;
         },

         start : function(sync) {
            var mode = (sync || typeof (sync) == 'undefined') ? true : false;
            return this.model._getSharedRoot(this, mode);
         }
      });

      // deferred commit
      declare("com.ibm.mm.enabler.DeferredCommitImpl", [
            com.ibm.mashups.enabler.DeferredOperation,
            com.ibm.mm.enabler.DeferredImpl
      ], {
         constructor : function(model) {
            this.model = model;

            // operation callback
            this.operationCallback = null;
            this.operationCallbackParameters = null;
         },

         setOperationCallback : function(callback, parameters) {
            this.operationCallback = callback;
            this.operationCallbackParameters = parameters;
         },

         start : function(sync) {
            var mode = (sync || typeof (sync) == 'undefined') ? true : false;
            return this.model._commit(this, mode);
         }
      });

      // deferred iterator
      declare("com.ibm.mm.enabler.DeferredIteratorImpl", [
            com.ibm.mashups.enabler.DeferredIterator,
            com.ibm.mm.enabler.DeferredImpl
      ], {
         constructor : function() {
            // foreach callback
            this.foreachCallback = null;
            this.foreachCallbackParameters = null;
         },

         setForeachCallback : function(callback, parameters) {
            this.foreachCallback = callback;
            this.foreachCallbackParameters = parameters;
         },

         addForeachCallback : function(callback, parameters) {
            this.foreachCallback = callback;
            this.foreachCallbackParameters = parameters;
         }
      });

      // identifiable implementation for the new notation 'id:'
      declare("com.ibm.mm.enabler.IdentifiableImpl", com.ibm.mashups.enabler.Identifiable, {
         constructor : function(node) {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([ nsf.NS_ATOM
            ]);
            this.ATOM_ID = "atom:id";
         },

         getID : function() {
            var result = null;
            var nodes = xpathModule.evaluateXPath(this.ATOM_ID, this.xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               var id = com.ibm.mm.enabler.dom.textContent(nodes[0]);

               // check for associative id
               var aPos = id.indexOf("@");
               if (aPos != -1) {
                  id = id.slice(0, aPos);
               }

               // remove model scope from id
               var idPos = id.indexOf("id:");
               result = id.slice(idPos + 3);
            }
            else {
               throw new Error(string.substitute(me.modelMessages.E_ELEMENT_NOT_FOUND_2, [
                     this.ATOM_ID,
                     this.toString()
               ]));
            }
            return result;
         },

         setID : function(id) {
            var nodes = xpathModule.evaluateXPath(this.ATOM_ID, this.xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               var currentId = com.ibm.mm.enabler.dom.textContent(nodes[0]);

               // associative id (including '@')
               var aPos = currentId.indexOf("@");
               var association = (aPos != -1) ? currentId.slice(aPos) : "";

               // model schema
               var mPos = currentId.indexOf("id:");
               var model = (mPos > 0) ? currentId.slice(0, mPos) : "";

               // remove model scope and add 'id:' from input id if necessary
               var idPos = id.indexOf("id:");
               var value = (idPos >= 0) ? id.slice(idPos) : "id:" + id;

               com.ibm.mm.enabler.dom.textContent(nodes[0], model + value + association);
            }
            else {
               throw new Error(string.substitute(me.modelMessages.E_ELEMENT_NOT_FOUND_2, [
                     this.ATOM_ID,
                     this.toString()
               ]));
            }
         }
      });

      // localized implementation
      declare("com.ibm.mm.enabler.LocalizedImpl", com.ibm.mashups.enabler.Localized, {
         constructor : function(node) {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.li_ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL,
                  nsf.NS_BASE,
                  nsf.NS_XML
            ]);
            this.NLS_TITLE = "atom:content/*/model:title/base:nls-string";
            this.NLS_DESCRIPTION = "atom:content/*/model:description/base:nls-string";
         },

         getLocales : function() {
            var result = [];
            var nodes = xpathModule.evaluateXPath(this.NLS_TITLE, this.xmlData, this.li_ns);
            if (nodes) {
               var i = nodes.length;
               if (nodes.length > 0) {
                  while (--i >= 0) {
                     if (nodes[i].getAttribute("xml:lang") !== null) {
                        result.push(nodes[i].getAttribute("xml:lang"));
                     }
                  }
               }
            }
            return result;
         },

         getTitle : function(locale) {
            var result = null;
            locale.replace(/-/g, "_");
            var titles = xpathModule.evaluateXPath(this.NLS_TITLE, this.xmlData, this.li_ns);
            // iterate the localized titles (selecting the correct title via
            // xpath doesnt seem to work)
            var i = titles.length;
            while (--i >= 0) {
               var lang = titles[i].getAttribute("xml:lang");
               if (lang !== null && lang.replace(/-/g, "_") == locale) {
                  result = com.ibm.mm.enabler.dom.textContent(titles[i]);
                  break;
               }
            }
            return result;
         },

         getDescription : function(locale) {
            var result = null;
            locale.replace(/-/g, "_");
            var descriptions = xpathModule.evaluateXPath(this.NLS_DESCRIPTION, this.xmlData, this.li_ns);
            // iterate the localized titles (selecting the correct title via
            // xpath doesnt seem to work)
            var i = descriptions.length;
            while (--i >= 0) {
               var lang = descriptions[i].getAttribute("xml:lang");
               if (lang !== null && lang.replace(/-/g, "_") == locale) {
                  result = com.ibm.mm.enabler.dom.textContent(descriptions[i]);
                  break;
               }
            }
            return result;
         },

         setTitle : function(title, locale) {
            locale.replace(/-/g, "_");
            var titles = xpathModule.evaluateXPath(this.NLS_TITLE, this.xmlData, this.li_ns);
            // iterate the localized titles (selecting the correct title via
            // xpath doesnt seem to work)
            var localeExists = false;
            var i = titles.length;
            while (--i >= 0) {
               var lang = titles[i].getAttribute("xml:lang");
               if (lang !== null && lang.replace(/-/g, "_") == locale) {
                  com.ibm.mm.enabler.dom.textContent(titles[i], title);
                  localeExists = true;
                  break;
               }
            }

            // create locale
            if (!localeExists) {
               var titleBase = xpathModule.evaluateXPath("atom:content/*/model:title", this.xmlData, this.li_ns);
               if (titleBase && titleBase.length > 0) {
                  var xmlDom = this.xmlData.ownerDocument;
                  var node = com.ibm.mm.enabler.dom.createElement(xmlDom, "base:nls-string", this.li_ns.base);
                  node.setAttribute("xml:lang", locale);
                  com.ibm.mm.enabler.dom.textContent(node, title);
                  titleBase[0].appendChild(node);
               }
               else {
                  throw new Error(string.substitute(me.modelMessages.E_ELEMENT_NOT_FOUND_2, [
                        "atom:content/*/model:title",
                        this.toString()
                  ]));
               }
            }
         },

         setDescription : function(descr, locale) {
            locale.replace(/-/g, "_");
            var descriptions = xpathModule.evaluateXPath(this.NLS_DESCRIPTION, this.xmlData, this.li_ns);
            // iterate the localized titles (selecting the correct title via
            // xpath doesnt seem to work)
            var localeExists = false;
            var i = descriptions.length;
            while (--i >= 0) {
               var lang = descriptions[i].getAttribute("xml:lang");
               if (lang !== null && lang.replace(/-/g, "_") == locale) {
                  com.ibm.mm.enabler.dom.textContent(descriptions[i], descr);
                  localeExists = true;
                  break;
               }
            }

            // create locale
            if (!localeExists) {
               var descriptionBase = xpathModule.evaluateXPath("atom:content/*/model:description", this.xmlData, this.li_ns);
               if (descriptionBase && descriptionBase.length > 0) {
                  var xmlDom = this.xmlData.ownerDocument;
                  var node = com.ibm.mm.enabler.dom.createElement(xmlDom, "base:nls-string", this.li_ns.base);
                  node.setAttribute("xml:lang", locale);
                  com.ibm.mm.enabler.dom.textContent(node, descr);
                  descriptionBase[0].appendChild(node);
               }
               else {
                  throw new Error(string.substitute(me.modelMessages.E_ELEMENT_NOT_FOUND_2, [
                        "atom:content/*/model:title",
                        this.toString()
                  ]));
               }
            }
         }
      });

      // iterator
      declare("com.ibm.mm.enabler.catalog.CatalogCategoryIteratorImpl", com.ibm.mm.enabler.DeferredIteratorImpl, {
         constructor : function(parentNode, model, baseUrl) {
            this.parentNode = parentNode;
            this.model = model;
            this.nodeIds = [];
            this.cursor = 0;
            this.cursorStart = 0;
            this.internalCursor = 0;
            this._size = 9999; // assume a high size until we know the real
            // size
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([ nsf.NS_ATOM
            ]);
            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
            }
         },

         start : function(sync) {
            while (this._hasNext(this, sync)) {
               if (this._next(this, sync)) {
                  continue;
               }
               else {
                  break;
               }
            }
         },

         hasNext : function() {
            return this._hasNext(null, true);
         },

         next : function() {
            return this._next(null, true);
         },

         _hasNext : function(deferred, sync) {
            if (this.nodeIds.length <= this.internalCursor + 1 && !(this.nodeIds.length == this._size)) {
               this._loadAhead(deferred, sync);
            }
            return this.internalCursor < this.nodeIds.length;
         },

         _next : function(deferred, sync) {
            if (this._hasNext(deferred, sync)) {
               this.cursor++;
               return this.model.loadedNodes[this.nodeIds[this.internalCursor++]];
            }
            else {
               return null;
            }
         },

         size : function() {
            return this._size;
         },

         setCursorPosition : function(position) {
            this.internalCursor = 0;
            this.cursor = position;
            this.cursorStart = position;
            this.nodeIds = []; // clear array
         },

         getCursorPosition : function() {
            return this.cursor;
         },

         _loadAhead : function(deferred, sync) {
            debug.entry("com.ibm.mm.enabler.catalog.CatalogCategoryIteratorImpl._loadAhead", sync ? "sync" : "async");
            var strategy = this.model.strategy;

            if (this.parentNode.getID() != "CATROOT") {
               this.size = 0;
               return;
            }

            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", "catalog:collection");
            myUrl.addParameter("rep", "full");

            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
            var me = this;
            var tempSize = 0;
            serviceReq.read(function(type, data, xhr, args) {
               var expr = "atom:feed/atom:entry";
               var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
               tempSize = nodes.length;
               for (var i = 0; i < nodes.length; ++i) {
                  var node = new com.ibm.mm.enabler.catalog.CatalogCategoryNodeImpl(nodes[i]);
                  node.setParentModel(me.model);
                  me.nodeIds[i] = node.getID();
                  me.model._cacheNode(node);
                  // callback handling
                  if (deferred) {
                     if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                        if (deferred.foreachCallback) {
                           deferred.foreachCallback(me.model.loadedNodes[node.getID()], deferred.foreachCallbackParameters);
                        }
                     }
                     else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                        if (deferred.errorCallback) {
                           deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                        }
                     }
                  }
               }
               if (deferred) {
                  // internal callback handling
                  if (deferred.finishedCallback) {
                     deferred.finishedCallback(null, deferred.finishedCallbackParameters);
                  }
                  // public callback handling
                  if (deferred.finishedCallback2) {
                     deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
                  }
               }
            });
            this._size = this.cursor + tempSize;
            debug.exit("com.ibm.mm.enabler.catalog.CatalogCategoryIteratorImpl._loadAhead");
         }
      });

      // catalog entry model
      declare("com.ibm.mm.enabler.model.CatalogEntryModelImpl", [
            com.ibm.mashups.enabler.model.CatalogEntryModel,
            com.ibm.mashups.enabler.ListModel,
            com.ibm.mm.enabler.DeferredIteratorImpl
      ], {
         constructor : function(category, parentModel, baseUrl) {
            this.category = category;
            this.parentModel = parentModel;
            this.strategy = parentModel.strategy;
            this.loadedNodes = {};
            this.createdNodes = {};
            this.deletedNodes = {};
            this.initialContents = {};
            this.nodeIds = [];
            this.cursor = 0;
            this.length = null;
            this.startElem = null;
            this.num = null;
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.cemi_ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL,
                  nsf.NS_APP
            ]);
            this.cid = 0;
            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
            }
         },

         find : function(uri) {
            return new com.ibm.mm.enabler.DeferredFindImpl(this, uri);
         },

         _find : function(uri, deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.CatalogEntryModelImpl._find", uri, sync ? "sync" : "async");
            if (this.category.getID() == "CATROOT") {
               return null;
            }
            if (uri in this.deletedNodes) {
               if (deferred) {
                  // internal callback handling
                  if (deferred.errorCallback) {
                     deferred.errorCallback(com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.errorCallbackParameters);
                  }
                  // public callback handling
                  if (deferred.finishedCallback2) {
                     deferred.finishedCallback2(null, com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.finishedCallbackParameters2);
                  }
               }
               return null;
            }
            if (uri in this.loadedNodes) {
               // fetch node from cache
               if (deferred) {
                  // internal callback handling
                  if (deferred.finishedCallback) {
                     deferred.finishedCallback(this.loadedNodes[uri], deferred.finishedCallbackParameters);
                  }
                  // public callback handling
                  if (deferred.finishedCallback2) {
                     deferred.finishedCallback2(this.loadedNodes[uri], com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK, deferred.finishedCallbackParameters2);
                  }
               }
               else {
                  return this.loadedNodes[uri];
               }
            }
            else {
               // prepare xhr
               var myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", "catalog:" + "id:" + utilities.encodeModelID4Uri(uri) + "@" + "id:"
                     + utilities.encodeModelID4Uri(this.category.getID()));
               myUrl.addParameter("rep", "full");
               var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               var entry = null;
               var me = this;
               var result = {};
               serviceReq.read(function(type, data, xhr, args) {
                  // obtain node
                  var expr = "atom:feed/atom:entry";
                  var nodes = xpathModule.evaluateXPath(expr, data, me.cemi_ns);
                  if (nodes && nodes.length > 0) {
                     me._cacheNode(new com.ibm.mm.enabler.catalog.CatalogEntryNodeImpl(nodes[0]));
                  }
                  // handle callback
                  if (deferred) {
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(me.loadedNodes[uri] || null, xhr.status, deferred.finishedCallbackParameters2);
                     }
                     // internal callback handling
                     if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                        if (deferred.finishedCallback) {
                           deferred.finishedCallback(me.loadedNodes[uri], deferred.finishedCallbackParameters);
                        }
                     }
                     else {
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                  }
                  // handle error in sync call
                  if (sync && type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                     // do not expose HTTP_NOT_FOUND; simply return null in this
                     // case
                     if (xhr.status != com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND) {
                        result.status = xhr.status;
                     }
                  }
               });

               if (result.status) {
                  throw new Error(string.substitute(me.modelMessages.E_CATNODE_NOTFOUND_1, [
                        uri,
                        result.status
                  ]));
               }
            }
            debug.exit("com.ibm.mm.enabler.model.CatalogEntryModelImpl._find");
            return this.loadedNodes[uri];
         },

         _cacheNode : function(node) {
            var id = node.getID();
            if (!(id in this.loadedNodes)) {
               this.loadedNodes[id] = node;
               this.initialContents[id] = node.toString();
            }
            return this.loadedNodes[id];
         },

         setStrategy : function(strategy) {
            if (strategy instanceof Array) {
               // evaluate the first strategy only
               this.strategy = strategy[0];
            }
            else {
               // backwards compatibility
               this.strategy = strategy;
            }
         },

         iterator : function() {
            return this;
         },

         start : function(sync) {
            while (this._hasNext(this, sync)) {
               if (this._next(this, sync)) {
                  continue;
               }
               else {
                  break;
               }
            }
         },

         hasNext : function() {
            return this._hasNext(null, true);
         },

         _hasNext : function(deferred, sync) {
            if (this.startElem === null || this.cursor < this.startElem || (this.cursor >= (this.startElem + this.num) && (this.length > this.cursor))) {
               this._loadAhead(deferred, sync);
            }
            return (this.length > this.cursor);
         },

         next : function() {
            return this._next(null, true);
         },

         _next : function(deferred, sync) {
            return this._hasNext(deferred, sync) ? this.loadedNodes[this.nodeIds[this.cursor++]] : null;
         },

         size : function() {
            return this.length;
         },

         setCursorPosition : function(position) {
            this.cursor = position;
         },

         getCursorPosition : function() {
            return this.cursor;
         },

         _loadAhead : function(deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.CatalogEntryModelImpl._loadAhead", sync ? "sync" : "async");
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", "catalog:collection@" + "id:" + utilities.encodeModelID4Uri(this.category.getID()));
            myUrl.addParameter("rep", "full");
            if (this.strategy) {
               myUrl.addParameter("start", this.getCursorPosition());
               myUrl.addParameter("num", this.strategy.getInterval());
            }
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                  // info on retrieved chunk
                  me.startElem = me.getCursorPosition();
                  var count = xpathModule.evaluateXPath("atom:feed/app:collection", data, me.cemi_ns);
                  if (count && count.length > 0) {
                     me.length = count[0].getAttribute("thr:count");
                  }
                  var nodes = xpathModule.evaluateXPath("atom:feed/atom:entry", data, me.cemi_ns);
                  if (nodes) {
                     me.num = nodes.length; // strategy length
                     for (var i = 0; i < nodes.length; i++) {
                        node = new com.ibm.mm.enabler.catalog.CatalogEntryNodeImpl(nodes[i]);
                        var id = node.getID();
                        me.nodeIds[me.startElem + i] = id;
                        me._cacheNode(node);
                        // callback handling
                        if (deferred && deferred.foreachCallback) {
                           deferred.foreachCallback(me.loadedNodes[id], deferred.foreachCallbackParameters);
                        }
                     }
                     if (deferred) {
                        // internal callback handling
                        if (deferred.finishedCallback) {
                           deferred.finishedCallback(null, deferred.finishedCallbackParameters);
                        }
                        // public callback handling
                        if (deferred.finishedCallback2) {
                           deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
                        }
                     }
                  }
               }
               else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                  if (deferred) {
                     // internal callback handling
                     if (deferred.errorCallback) {
                        deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                     }
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
                     }
                  }
               }
            });
            debug.exit("com.ibm.mm.enabler.model.CatalogEntryModelImpl._loadAhead");
         },

         create : function(context) {
            debug.entry("com.ibm.mm.enabler.model.CatalogEntryModelImpl.create");
            var clientId;
            if (context && context.cid) {
               // use cid specified with context
               clientId = context.cid;
            }
            else {
               // use generated cid
               clientId = "" + this.cid++;
            }
            var entry = com.ibm.mm.enabler.model.Utils.createNode("atom:entry", this.cemi_ns.atom);
            var idElement = com.ibm.mm.enabler.model.Utils.createNode("atom:id", this.cemi_ns.atom);
            com.ibm.mm.enabler.dom.textContent(idElement, "cid:" + clientId + "@" + "id:" + this.category.getID());
            entry.appendChild(idElement);
            var contentElement = com.ibm.mm.enabler.model.Utils.createNode("atom:content", this.cemi_ns.atom);
            entry.appendChild(contentElement);
            var catalogEntryElement = com.ibm.mm.enabler.model.Utils.createNode("model:catalog-entry", this.cemi_ns.model);
            contentElement.appendChild(catalogEntryElement);
            catalogEntryElement.appendChild(com.ibm.mm.enabler.model.Utils.createNode("model:title", this.cemi_ns.model));
            catalogEntryElement.appendChild(com.ibm.mm.enabler.model.Utils.createNode("model:description", this.cemi_ns.model));
            catalogEntryElement.appendChild(com.ibm.mm.enabler.model.Utils.createLinkNode("", "definition", this.cemi_ns.atom));
            catalogEntryElement.appendChild(com.ibm.mm.enabler.model.Utils.createLinkNode("", "icon", this.cemi_ns.atom));
            debug.exit("com.ibm.mm.enabler.model.CatalogEntryModelImpl.create");
            return new com.ibm.mm.enabler.catalog.CatalogEntryNodeImpl(entry);
         },

         insert : function(node, nextNode) {
            debug.entry("com.ibm.mm.enabler.model.CatalogEntryModelImpl.insert", node.getID());
            var id = node.getID();
            // check if the node is inserted or moved
            if (!(id in this.loadedNodes)) {
               // cache node
               this.loadedNodes[id] = node;
               // mark as created
               this.createdNodes[id] = null;
            }
            debug.exit("com.ibm.mm.enabler.model.CatalogEntryModelImpl.insert");
         },

         remove : function(node) {
            debug.entry("com.ibm.mm.enabler.model.CatalogEntryModelImpl.remove", node);
            var id = (node instanceof com.ibm.mm.enabler.catalog.CatalogEntryNodeImpl) ? node.getID() : node;
            // mark node as deleted
            if (!(id in this.deletedNodes)) {
               this.deletedNodes[id] = null;
            }
            // remove cache entry
            if (id in this.loadedNodes) {
               delete this.loadedNodes[id];
            }
            debug.exit("com.ibm.mm.enabler.model.CatalogEntryModelImpl.remove");
         },

         // internal commit
         _commit : function(deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.CatalogEntryModelImpl._commit", sync ? "sync" : "async");
            var serviceReq;
            var myUrl, urlId;
            var me = this;

            for (id in this.loadedNodes) {
               var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
               var entry = com.ibm.mm.enabler.model.Utils.createFeed("catalog:" + id, "HCL Lotus Mashups Catalog Feed", this.loadedNodes[id], nsf
                     .getNameSpaces([ nsf.NS_ATOM
                     ]));
               myUrl = new utilities.HttpUrl(this.url);

               if (id in this.createdNodes) {
                  // handle created nodes
                  urlId = "collection@" + "id:" + utilities.encodeModelID4Uri(this.category.getID());
                  myUrl.addParameter("uri", "catalog:" + urlId);
                  // HTTP POST created nodes
                  this.parentModel._acquire();
                  serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                  serviceReq.create(entry, function(type, data, xhr, args) {
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(me.loadedNodes[id],
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_CREATE,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     me.parentModel._release(deferred, xhr.status);
                  });
               }
               else {
                  // skip unmodified nodes
                  if (this.initialContents[id] === this.loadedNodes[id].toString()) {
                     continue;
                  }
                  // handle modified nodes
                  urlId = utilities.encodeModelID4Uri(node.getID()) + "@" + "id:" + utilities.encodeModelID4Uri(this.category.getID());
                  myUrl.addParameter("uri", "catalog:" + urlId);
                  // HTTP PUT modified nodes
                  myUrl.addParameter("update", "replace");
                  this.parentModel._acquire();
                  serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                  serviceReq.update(entry, function(type, data, xhr, args) {
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(me.loadedNodes[id],
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_CREATE,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     me.parentModel._release(deferred, xhr.status);
                  });
                  // mark new contents
                  this.initialContents[id] = this.loadedNodes[id].toString();
               }
               // unmark created nodes
               this.createdNodes = {};
            }

            // HTTP DELETE deleted nodes
            for (id in this.deletedNodes) {
               myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", "catalog:" + "id:" + utilities.encodeModelID4Uri(id) + "@" + "id:"
                     + utilities.encodeModelID4Uri(this.category.getID()));
               myUrl.addParameter("category", "id:" + this.category.getID());
               this.parentModel._acquire();
               serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               serviceReq.remove(function(type, data, xhr, args) {
                  if (deferred) {
                     // public callback handling
                     if (deferred.operationCallback) {
                        deferred.operationCallback(id,
                           com.ibm.mashups.enabler.DeferredOperation.OPERATION_CREATE,
                           xhr.status,
                           deferred.operationCallbackParameters);
                     }
                     if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                        if (deferred.errorCallback) {
                           deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                        }
                     }
                  }
                  me.parentModel._release(deferred, xhr.status);
               });
            }
            // unmark deleted nodes
            this.deletedNodes = {};

            debug.exit("com.ibm.mm.enabler.model.CatalogEntryModelImpl._commit");
         }
      });

      // catalog category model
      declare("com.ibm.mm.enabler.model.CatalogCategoryModelImpl",
         com.ibm.mashups.enabler.model.CatalogCategoryModel,
         {
            constructor : function(baseUrl) {
               this.root = null;
               this.loadedNodes = {};
               this.createdNodes = {};
               this.deletedNodes = {};
               this.initialContents = {};
               this.entryModels = {};
               this.baseUrl = "";
               this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                     + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
               var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
               this.ns = nsf.getNameSpaces([
                     nsf.NS_ATOM,
                     nsf.NS_MODEL
               ]);
               if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
                  this.url = baseUrl + this.url;
                  this.baseUrl = baseUrl;
               }
            },

            getCatalogEntryModel : function(category) {
               if (!(category in this.entryModels)) {
                  this.entryModels[category] = new com.ibm.mm.enabler.model.CatalogEntryModelImpl(category, this, this.baseUrl);
               }
               return this.entryModels[category];
            },

            _cacheNode : function(node) {
               var id = node.getID();
               if (!(id in this.loadedNodes)) {
                  this.loadedNodes[id] = node;
                  this.initialContents[id] = node.toString();
               }
               return this.loadedNodes[id];
            },

            find : function(uri) {
               return new com.ibm.mm.enabler.DeferredFindImpl(this, uri);
            },

            _find : function(uri, deferred, sync) {
               debug.entry("com.ibm.mm.enabler.model.CatalogCategoryModelImpl._find", uri, sync ? "sync" : "async");
               // check if node is deleted in controller scope
               if (uri in this.deletedNodes) {
                  if (deferred) {
                     // internal callback handling
                     if (deferred.errorCallback) {
                        deferred.errorCallback(com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.errorCallbackParameters);
                     }
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(null, com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.finishedCallbackParameters2);
                     }
                  }
                  return null;
               }

               // check if node is already cached
               if (uri in this.loadedNodes) {
                  // fetch node from cache
                  if (deferred) {
                     // internal callback handling
                     if (deferred.finishedCallback) {
                        deferred.finishedCallback(this.loadedNodes[uri], deferred.finishedCallbackParameters);
                     }
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(this.loadedNodes[uri],
                           com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK,
                           deferred.finishedCallbackParameters2);
                     }
                  }
               }
               else {
                  // prepare xhr
                  var myUrl = new utilities.HttpUrl(this.url);

                  myUrl.addParameter("uri", "catalog:" + utilities.encodeModelID4Uri(uri));
                  myUrl.addParameter("rep", "full");
                  var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                  var entry = null;
                  var me = this;
                  var result = {};
                  serviceReq.read(function(type, data, xhr, args) {
                     // obtain node
                     var expr = "atom:feed/atom:entry";
                     var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
                     if (nodes && nodes.length > 0) {
                        var entry = new com.ibm.mm.enabler.catalog.CatalogCategoryNodeImpl(nodes[0]);
                        if (entry !== null) {
                           entry.setParentModel(me);
                           if (!(uri in me.loadedNodes)) {
                              me.loadedNodes[uri] = entry;
                              me.initialContents[uri] = entry.toString();
                           }
                        }
                     }
                     // handle callback
                     if (deferred) {
                        // public callback handling
                        if (deferred.finishedCallback2) {
                           deferred.finishedCallback2(me.loadedNodes[uri] || null, xhr.status, deferred.finishedCallbackParameters2);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                           if (deferred.finishedCallback) {
                              deferred.finishedCallback(me.loadedNodes[uri], deferred.finishedCallbackParameters);
                           }
                        }
                        else {
                           if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                              if (deferred.errorCallback) {
                                 deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                              }
                           }
                        }
                     }
                     // handle error in sync call
                     if (sync && type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                        // do not expose HTTP_NOT_FOUND; simply return null in
                        // this case
                        if (xhr.status != com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND) {
                           result.status = xhr.status;
                        }
                     }
                  });
                  if (result.status) {
                     throw new Error(string.substitute(me.modelMessages.E_CCATNODE_NOTFOUND_1, [
                           uri,
                           result.status
                     ]));
                  }

               }
               debug.exit("com.ibm.mm.enabler.model.CatalogCategoryModelImpl._find");
               return this.loadedNodes[uri];
            },

            setStrategy : function(strategy) {
               if (strategy instanceof Array) {
                  // evaluate the first strategy only
                  this.strategy = strategy[0];
               }
               else {
                  // backwards compatibility
                  this.strategy = strategy;
               }
            },

            create : function(context) {
               debug.entry("com.ibm.mm.enabler.model.CatalogCategoryModelImpl.create");
               if (context && context.category) {
                  var entry = com.ibm.mm.enabler.model.Utils.createNode("atom:entry", this.ns.atom);
                  var idElement = com.ibm.mm.enabler.model.Utils.createNode("atom:id", this.ns.atom);
                  com.ibm.mm.enabler.dom.textContent(idElement, "catalog:id:" + context.category);
                  entry.appendChild(idElement);
                  entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:title", this.ns.atom));
                  entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:summary", this.ns.atom));
                  entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:published", this.ns.atom));
                  entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:updated", this.ns.atom));
                  var contentElement = com.ibm.mm.enabler.model.Utils.createNode("atom:content", this.ns.atom);
                  entry.appendChild(contentElement);
                  var catalogCategoryElement = com.ibm.mm.enabler.model.Utils.createNode("model:catalog-category", this.ns.model);
                  contentElement.appendChild(catalogCategoryElement);
                  catalogCategoryElement.appendChild(com.ibm.mm.enabler.model.Utils.createNode("model:title", this.ns.model));
                  catalogCategoryElement.appendChild(com.ibm.mm.enabler.model.Utils.createNode("model:description", this.ns.model));
                  debug.exit("com.ibm.mm.enabler.model.CatalogCategoryModelImpl.create");
                  return new com.ibm.mm.enabler.catalog.CatalogCategoryNodeImpl(entry);
               }
               return null;
            },

            commit : function() {
               return new com.ibm.mm.enabler.DeferredCommitImpl(this);
            },

            _commit : function(deferred, sync) {
               debug.entry("com.ibm.mm.enabler.model.CatalogCategoryModelImpl._commit", sync ? "sync" : "async");
               // initialize callback handling
               this.statusCode = com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK;
               this.requestCount = 0;
               this._acquire();
               var serviceReq;
               var myUrl;
               var me = this;

               // commit category model changes
               for (id in this.loadedNodes) {
                  var time = new Date();
                  var entry = '<?xml version="1.0" encoding="UTF-8"?>\n'
                        + '<atom:feed xmlns:atom="http://www.w3.org/2005/Atom" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:thr="http://purl.org/syndication/thread/1.0" xmlns:model="http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/preference-model">\n'
                        + '<atom:title>HCL Lotus Mashups Catalog Feed</atom:title>\n' + '<atom:updated>' + time.toGMTString() + '</atom:updated>\n'
                        + '<atom:id>catalog:' + id + '</atom:id>\n' + this.loadedNodes[id] + '</atom:feed>';
                  myUrl = new utilities.HttpUrl(this.url);
                  myUrl.addParameter("uri", "catalog:" + id);
                  if (id in this.createdNodes) {
                     // HTTP POST created nodes
                     this._acquire();
                     serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                     serviceReq.create(entry, function(type, data, xhr, args) {
                        if (deferred) {
                           // public callback handling
                           if (deferred.operationCallback) {
                              deferred.operationCallback(me.loadedNodes[id],
                                 com.ibm.mashups.enabler.DeferredOperation.OPERATION_CREATE,
                                 xhr.status,
                                 deferred.operationCallbackParameters);
                           }
                           // internal callback handling
                           if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                              if (deferred.errorCallback) {
                                 deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                              }
                           }
                        }
                        me._release(deferred, xhr.status);
                     });
                  }
                  else {
                     // skip unmodified nodes
                     if (this.initialContents[id] === this.loadedNodes[id].toString()) {
                        continue;
                     }
                     // HTTP PUT modified nodes
                     myUrl.addParameter("update", "replace");
                     this._acquire();
                     serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                     serviceReq.update(entry, function(type, data, xhr, args) {
                        if (deferred) {
                           // public callback handling
                           if (deferred.operationCallback) {
                              deferred.operationCallback(me.loadedNodes[id],
                                 com.ibm.mashups.enabler.DeferredOperation.OPERATION_MODIFY,
                                 xhr.status,
                                 deferred.operationCallbackParameters);
                           }
                           // internal callback handling
                           if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                              if (deferred.errorCallback) {
                                 deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                              }
                           }
                        }
                        me._release(deferred, xhr.status);
                     });
                  }
               }

               // HTTP DELETE deleted nodes
               for (id in this.deletedNodes) {
                  myUrl = new utilities.HttpUrl(this.url);
                  myUrl.addParameter("uri", "catalog:" + id);
                  this._acquire();
                  serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                  serviceReq.remove(function(type, data, xhr, args) {
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(id,
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_DELETE,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     me._release(deferred, xhr.status);
                  });
               }

               // commit the entry model changes
               for (id in this.entryModels) {
                  this.entryModels[id]._commit(deferred, sync);
               }

               // the finishedCallback must trigger only after releasing the
               // initial 'acquire'
               this._release(deferred, 0);

               // internal callback handling
               if (deferred && deferred.finishedCallback) {
                  deferred.finishedCallback(null, deferred.finishedCallbackParameters);
               }
               debug.exit("com.ibm.mm.enabler.model.CatalogCategoryModelImpl._commit");
            },

            // acquire semaphore
            _acquire : function() {
               this.requestCount++;
            },

            // release semaphore
            _release : function(deferred, statusCode) {
               // set overall status Code
               this.statusCode = Math.max(parseInt(statusCode, 10), this.statusCode);
               // check for full release
               this.requestCount--;
               if (this.requestCount <= 0) {
                  if (deferred && deferred.finishedCallback2) {
                     deferred.finishedCallback2(null, this.statusCode, deferred.finishedCallbackParameters2);
                  }
               }
            },

            getRoot : function() {
               return new com.ibm.mm.enabler.DeferredGetRootImpl(this);
            },

            _getRoot : function(deferred, sync) {
               if (this.root === null) {
                  var node = com.ibm.mm.enabler.model.Utils.createNode("atom:entry", this.ns.atom);
                  node.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:id", this.ns.atom));
                  this.root = new com.ibm.mm.enabler.catalog.CatalogCategoryNodeImpl(node);
                  this.root.setParentModel(this);
                  this.root.setID("CATROOT");
               }
               return this.root;
            },

            hasChildren : function(node) {
               // TODO: implement
               return false;
            },

            getChildren : function(node) {
               return new com.ibm.mm.enabler.catalog.CatalogCategoryIteratorImpl(node, this, this.baseUrl);
            },

            getParent : function(uri) {
               return new com.ibm.mm.enabler.DeferredGetParentImpl(this, uri);
            },

            _getParent : function(node, deferred, sync) {
               if (node.getID() == "CATROOT") {
                  return null;
               }
               else {
                  return this.getRoot();
               }
            },

            insert : function(node) {
               // cache and mark as created
               this.loadedNodes[node.getID()] = node;
               this.createdNodes[node.getID()] = null;
            },

            remove : function(node) {
               debug.entry("com.ibm.mm.enabler.model.CatalogCategoryModelImpl.remove");
               var id = (node instanceof com.ibm.mm.enabler.catalog.CatalogCategoryNodeImpl) ? node.getID() : node;
               // mark node as deleted
               if (!(id in this.deletedNodes)) {
                  this.deletedNodes[id] = null;
               }
               // remove cache entry
               if (id in this.loadedNodes) {
                  delete this.loadedNodes[id];
               }
               debug.exit("com.ibm.mm.enabler.model.CatalogCategoryModelImpl.remove");
            }
         });

      // catalog category node
      declare("com.ibm.mm.enabler.catalog.CatalogCategoryNodeImpl", [
            com.ibm.mashups.enabler.catalog.CatalogCategoryNode,
            com.ibm.mm.enabler.IdentifiableImpl,
            com.ibm.mm.enabler.LocalizedImpl
      ], {
         constructor : function(node) {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL,
                  nsf.NS_BASE,
                  nsf.NS_XML
            ]);
            this.xmlData = node;
            this.parentModel = null;
         },

         getParentModel : function() {
            return this.parentModel;
         },

         setParentModel : function(parentModel) {
            this.parentModel = parentModel;
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         }

      });

      declare("com.ibm.mm.enabler.catalog.CatalogEntryNodeImpl", [
            com.ibm.mm.enabler.IdentifiableImpl,
            com.ibm.mm.enabler.LocalizedImpl
      ], {
         constructor : function(node) {
            this.xmlData = node;
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ceni_ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_XML,
                  nsf.NS_MODEL,
                  nsf.NS_BASE
            ]);
         },

         // still to be supported? may use getParent(node) instead...
         getCategory : function() {
            var expr = "atom:category";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);
            var result = null;
            if (nodes && nodes.length > 0) {
               result = nodes[0].getAttribute("term");
            }
            return result;
         },

         setCategory : function(category) {
            var expr = "atom:category";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);

            if (nodes && nodes.length > 0) {
               nodes[0].setAttribute("term", category);
            }
         },

         getDefinitionURL : function() {
            return this._getURL("definition");
         },

         setDefinitionURL : function(aUrl) {
            this._setURL("definition", aUrl);
         },

         getIconURL : function() {
            return this._getURL("icon");
         },

         setIconURL : function(aUrl) {
            this._setURL("icon", aUrl);
         },

         getMetadataNames : function() {
            var expr = "atom:content/model:catalog-entry/model:metadata[@name]";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);

            var result = [];
            if (nodes) {
               for (var i = 0; i < nodes.length; ++i) {
                  result.push(nodes[i].getAttribute("name"));
               }
            }
            return result;
         },

         getMetadata : function(name) {
            var expr = "atom:content/model:catalog-entry/model:metadata[@name='" + name + "']/model:value";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);
            if ((nodes === null) || (nodes.length <= 0)) {
               expr = "atom:content/model:catalog-entry/model:metadata[@name='" + name + "']";
               nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);
               return (nodes && nodes.length > 0) ? com.ibm.mm.enabler.dom.textContent(nodes[0]) : null;
            }

            return nodes[0].getAttribute("value");
         },

         setMetadata : function(name, value) {
            var expr = "atom:content/model:catalog-entry/model:metadata[@name='" + name + "']";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);
            var result = null;
            if (nodes && nodes.length > 0) {
               // update existing meta data
               result = com.ibm.mm.enabler.dom.textContent(nodes[0]);
               com.ibm.mm.enabler.dom.textContent(nodes[0], value);
            }
            else {
               // create new meta data
               var content = xpathModule.evaluateXPath("atom:content", this.xmlData, this.ceni_ns);
               if (content && content.length > 0) {
                  var metadata = com.ibm.mm.enabler.dom.createElement(this.xmlData.ownerDocument, "model:metadata", this.ceni_ns.model);
                  metadata.setAttribute("name", name);
                  com.ibm.mm.enabler.dom.textContent(metadata, value);
                  content[0].appendChild(metadata);
               }
            }
            return result;
         },

         removeMetadata : function(name) {
            var expr = "atom:content/model:catalog-entry/model:metadata[@name='" + name + "']";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);
            if (nodes && nodes.length > 0) {
               var parent = nodes[0].parentNode;
               parent.removeChild(nodes[0]);
            }
         },

         _getURL : function(/* String */rel) {
            var result = null;
            var expr = "atom:content/model:catalog-entry/atom:link[@rel='" + rel + "']";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);
            if (nodes && nodes.length > 0) {
               result = nodes[0].getAttribute("href");
            }
            return result;
         },

         _setURL : function(/* String */rel, /* String */href) {
            var expr = "atom:content/model:catalog-entry/atom:link[@rel='" + rel + "']";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ceni_ns);
            if (nodes && nodes.length > 0) {
               nodes[0].setAttribute("href", href);
            }
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         }
      });

      // navigation model iterator
      declare("com.ibm.mm.enabler.navigation.NavigationModelIteratorImpl", [
            com.ibm.mashups.enabler.Iterator,
            com.ibm.mm.enabler.DeferredIteratorImpl
      ], {
         constructor : function(parentNode, model, baseUrl) {
            this.parentNode = parentNode;
            this.model = model;
            this.strategy = model.strategy;
            this.entryIds = [];
            this.cursor = 0;
            this.size = null;
            this.startElem = null;
            this.num = null;
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_APP,
                  nsf.NS_MODEL,
                  nsf.NS_THR
            ]);
            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
            }
         },

         start : function(sync) {
            while (this._hasNext(this, sync)) {
               if (this._next(this, sync)) {
                  continue;
               }
               else {
                  break;
               }
            }
         },

         hasNext : function() {
            return this._hasNext(null, true);
         },

         _hasNext : function(deferred, sync) {
            if (this.startElem === null || this.cursor < this.startElem || (this.cursor >= (this.startElem + this.num) && (this.size > this.cursor))) {
               this._loadAhead(this.parentNode.getID(), deferred, sync);
            }
            return (this.size > this.cursor);
         },

         next : function() {
            return this._next(null, true);
         },

         _next : function(deferred, sync) {
            return this._hasNext(deferred, sync) ? this.model.loadedNodes[this.entryIds[this.cursor++]] : null;
         },

         size : function() {
            return this.size;
         },

         setCursorPosition : function(position) {
            this.cursor = position;
         },

         getCursorPosition : function() {
            return this.cursor;
         },

         _loadAhead : function(uri, deferred, sync) {
            debug.entry("com.ibm.mm.enabler.navigation.NavigationModelIteratorImpl._loadAhead", sync ? "sync" : "async");
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", "nm:" + "id:" + uri);
            myUrl.addParameter("levels", "2");
            if (this.strategy) {
               // assumes the first node is the addressed node itself and sets
               // start to cursor+1
               myUrl.addParameter("start", this.getCursorPosition() + 1);
               myUrl.addParameter("num", this.strategy.getInterval());
            }
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                  // info on retrieved chunk
                  me.startElem = me.getCursorPosition();
                  var count = xpathModule.evaluateXPath("atom:feed/app:collection", data, me.ns);
                  if (count && count.length > 0) {
                     me.size = count[0].getAttribute("thr:count") - 1; // node
                     // itself
                     // does
                     // not
                     // count
                     // towards
                     // children
                  }
                  // navigation node entries
                  var nodes = xpathModule.evaluateXPath("atom:feed/atom:entry/thr:in-reply-to[@ref='nm:" + "id:" + uri + "']/..", data, me.ns);
                  if (nodes) {
                     me.num = nodes.length;
                     for (var i = 0; i < nodes.length; i++) {
                        var node = com.ibm.mm.enabler.model.NavigationNodeFactory.createNavigationNode(nodes[i]);
                        var id = node.getID();
                        me.entryIds[me.startElem + i] = id;
                        // cache node
                        me.model._cacheNode(node);
                        // callback handling
                        if (deferred && deferred.foreachCallback) {
                           deferred.foreachCallback(me.model.loadedNodes[id], deferred.foreachCallbackParameters);
                        }
                     }
                     if (deferred) {
                        if (deferred.finishedCallback) {
                           deferred.finishedCallback(null, deferred.finishedCallbackParameters);
                        }
                        if (deferred.finishedCallback2) {
                           deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
                        }
                     }
                  }
               }
               else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                  if (deferred && deferred.errorCallback) {
                     deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                  }
                  if (deferred.finishedCallback2) {
                     deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
                  }
               }
            });
            debug.exit("com.ibm.mm.enabler.navigation.NavigationModelIteratorImpl._loadAhead");
         }
      });

      // navigation model
      declare("com.ibm.mm.enabler.model.NavigationModelImpl", com.ibm.mashups.enabler.model.NavigationModel, {
         constructor : function(baseUrl) {
            this.root = null;
            this.sharedRoot = null;
            this.loadedNodes = {};
            this.createdNodes = {};
            this.deletedNodes = {};
            this.initialContents = {};
            this.layoutModels = {};
            this.strategy = null;
            this.cid = 0;
            this.baseUrl = "";
            this._node = null;
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_THR,
                  nsf.NS_MODEL,
                  nsf.NS_BASE,
                  nsf.NS_XML,
                  nsf.NS_PORTAL
            ]);
            this.modelMessages = i18nmodelMessages;
            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
               this.baseUrl = baseUrl;
            }
         },

         setStrategy : function(strategy) {
            if (strategy instanceof Array) {
               // evaluate the first strategy only
               this.strategy = strategy[0];
            }
            else {
               // backwards compatibility
               this.strategy = strategy;
            }
         },

         find : function(uri) {
            return new com.ibm.mm.enabler.DeferredFindImpl(this, uri);
         },

         getRoot : function() {
            return new com.ibm.mm.enabler.DeferredGetRootImpl(this);
         },

         _getRoot : function(deferred, sync) {
            if (this.root === null) {
               this.root = this._find("collection", deferred, sync);
            }
            if (deferred && deferred.finishedCallback) {
               deferred.finishedCallback(this.root, deferred.finishedCallbackParameters);
            }
            else {
               return this.root;
            }
         },

         getSharedRoot : function() {
            return new com.ibm.mm.enabler.DeferredGetSharedRootImpl(this);
         },

         _getSharedRoot : function(deferred, sync) {
            if (this.sharedRoot === null) {
               this.sharedRoot = this._find("shared", deferred, sync);
            }
            if (deferred && deferred.finishedCallback) {
               deferred.finishedCallback(this.sharedRoot, deferred.finishedCallbackParameters);
            }
            else {
               return this.sharedRoot;
            }
         },

         hasChildren : function(node) {
            if (!node) {
               throw new Error(this.modelMessages.E_NODE_ISNULL_0);
            }
            var nodeID;
            if (typeof (node) == "string") {
               nodeID = node;
            }
            else {
               nodeID = node.getID();
            }
            this._find(nodeID, null, true);

            // check for 'replies' link
            var hasChildren = false;
            var nodes = xpathModule.evaluateXPath("atom:link[@rel='replies']", this.loadedNodes[nodeID].xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               if (nodes[0].getAttribute("thr:count") !== "0") {
                  hasChildren = true;
               }
            }
            return hasChildren;
         },

         getChildren : function(node) {
            if (!node) {
               throw new Error(this.modelMessages.E_NODE_ISNULL_0);
            }
            return new com.ibm.mm.enabler.navigation.NavigationModelIteratorImpl(node, this, this.baseUrl);
         },

         getParent : function(uri) {
            return new com.ibm.mm.enabler.DeferredGetParentImpl(this, uri);
         },

         _getParent : function(nodeId, deferred, sync) {
            if (!nodeId) {
               throw new Error(this.modelMessages.E_NODE_ISNULL_0);
            }
            var parent = null;
            var node = this._find(nodeId, null, true);
            if (node !== null) {
               // check node for 'in-reply-to' link
               var refs = xpathModule.evaluateXPath("thr:in-reply-to[@ref]", node.xmlData, this.ns);
               if (refs && refs.length > 0) {
                  var parentId = refs[0].getAttribute("ref");
                  var pos = parentId.indexOf("oid:");
                  if (pos < 0) {
                     pos = parentId.indexOf("id:");
                  }
                  parent = this._find(parentId.slice(pos + 3), deferred, sync);
               }
            }
            return parent;
         },

         // internal
         _setParent : function(node, parentNode) {
            if (node !== null && parentNode !== null) {
               var thr = xpathModule.evaluateXPath("thr:in-reply-to", node.xmlData, this.ns);
               if (thr && thr.length > 0) {
                  thr[0].setAttribute("ref", "nm:" + "id:" + parentNode.getID());
               }
               else {
                  thr = com.ibm.mm.enabler.model.Utils.createNode("thr:in-reply-to", this.ns.thr);
                  thr.setAttribute("ref", "nm:" + "id:" + parentNode.getID());
                  node.xmlData.appendChild(thr);
               }
            }
         },

         // internal
         _setNext : function(node, nextNode) {
            if (node !== null) {
               var next = xpathModule.evaluateXPath("atom:link[@rel='next']", node.xmlData, this.ns);
               if (next && next.length > 0) {
                  if (nextNode !== null) {
                     // update next link
                     next[0].setAttribute("href", "?uri=nm:" + "id:" + nextNode.getID());
                  }
                  else {
                     // remove next link
                     var parent = next[0].parentNode;
                     parent.removeChild(next[0]);
                  }
               }
               else if (nextNode !== null) {
                  // create next link
                  next = com.ibm.mm.enabler.model.Utils.createNode("atom:link", this.ns.atom);
                  next.setAttribute("href", "?uri=nm:" + "id:" + nextNode.getID());
                  next.setAttribute("rel", "next");
                  next.setAttribute("type", "application/atom+xml");
                  node.xmlData.appendChild(next);
               }
            }
         },

         insert : function(node, parentNode, nextNode) {
            debug.entry("com.ibm.mm.enabler.model.NavigationModelImpl.insert");
            if (!node) {
               throw new Error(this.modelMessages.E_NODE_ISNULL_0);
            }
            var id = node.getID();
            // check if the node is inserted or moved
            if (!(id in this.loadedNodes)) {
               // cache node
               this.loadedNodes[id] = node;
               // mark as created
               this.createdNodes[id] = null;
            }
            else {
               // set next link of old previous node
               var oldParent = this.getParent(node.getID()).start();
               if (oldParent !== null) {
                  var children = this.getChildren(oldParent);
                  var prev = null;
                  while (children.hasNext()) {
                     var current = children.next();
                     if (current.getID() == id && prev !== null) {
                        this._setNext(prev, children.hasNext() ? children.next() : null);
                        // set new contents
                        this.initialContents[prev.getID()] = prev.toString();
                        break;
                     }
                     prev = current;
                  }
               }
            }

            // set next link of new previous node
            if (parentNode) {
               var children = this.getChildren(parentNode);
               var prev = null;
               var nextID = nextNode ? nextNode.getID() : null;
               while (children.hasNext()) {
                  var current = children.next();
                  if (current.getID() == nextID) {
                     break;
                  }
                  prev = current;
               }
               if (prev) {
                  this._setNext(prev, node);
                  // set new contents
                  this.initialContents[prev.getID()] = prev.toString();
               }
            }

            // set next and parent link of node itself
            this._setParent(node, parentNode);
            this._setNext(node, nextNode);
            debug.exit("com.ibm.mm.enabler.model.NavigationModelImpl.insert");
         },

         remove : function(id) {
            debug.entry("com.ibm.mm.enabler.model.NavigationModelImpl.remove");
            if (!id) {
               throw new Error(this.modelMessages.E_NODE_ISNULL_0);
            }
            // mark node as deleted
            this.deletedNodes[id] = null;
            // remove cache entry
            if (id in this.loadedNodes) {
               delete this.loadedNodes[id];
            }
            debug.exit("com.ibm.mm.enabler.model.NavigationModelImpl.remove");
         },

         getLayoutModel : function(nodeId) {
            if (!nodeId) {
               throw new Error(this.modelMessages.E_NODE_ISNULL_0);
            }
            // check for cached layout model
            if (!(nodeId in this.layoutModels)) {
               this.layoutModels[nodeId] = new com.ibm.mm.enabler.model.LayoutModelImpl(nodeId);
            }
            return this.layoutModels[nodeId];
         },

         create : function(context) {
            var clientId;
            if (context && context.cid) {
               // use cid specified with context
               clientId = context.cid;
            }
            else {
               // use generated cid
               clientId = "" + this.cid++;
            }
            var entry = com.ibm.mm.enabler.model.Utils.createNode("atom:entry", this.ns.atom);
            entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:id", this.ns.atom));
            entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:title", this.ns.atom));
            var updated = com.ibm.mm.enabler.model.Utils.createNode("atom:updated", this.ns.atom);
            var time = new Date();
            com.ibm.mm.enabler.dom.textContent(updated, time.toGMTString());
            entry.appendChild(updated);
            entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:subtitle", this.ns.atom));
            var content = com.ibm.mm.enabler.model.Utils.createNode("atom:content", this.ns.atom);
            var navigationNode = com.ibm.mm.enabler.model.Utils.createNode("model:navigation-node", this.ns.model);
            content.appendChild(navigationNode);
            navigationNode.appendChild(com.ibm.mm.enabler.model.Utils.createNode("model:title", this.ns.model));
            navigationNode.appendChild(com.ibm.mm.enabler.model.Utils.createNode("model:description", this.ns.model));
            entry.appendChild(content);
            // note that the link tag, respectively the thr:in-reply-to tag will
            // be generated when the node is inserted into the model topology
            var node = new com.ibm.mm.enabler.navigation.NavigationNodeImpl(entry);
            node.setID(clientId);
            return node;
         },

         commit : function() {
            return new com.ibm.mm.enabler.DeferredCommitImpl(this);
         },

         _commit : function(deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.NavigationModelImpl._commit", sync ? "sync" : "async");
            // initialize callback handling
            this.statusCode = com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK;
            this.requestCount = 0;
            this._acquire();
            var serviceReq;
            var myUrl;
            var me = this;
            // commit navigation model
            for (id in this.loadedNodes) {
               myUrl = new utilities.HttpUrl(this.url);
               var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
               if (id in this.createdNodes) {
                  var entry = com.ibm.mm.enabler.model.Utils.createFeed("nm:cid:" + id, "HCL Lotus Mashups Navigation Feed", this.loadedNodes[id], nsf
                        .getNameSpaces([
                              nsf.NS_XHTML,
                              nsf.NS_ATOM,
                              nsf.NS_APP,
                              nsf.NS_THR,
                              nsf.NS_BASE,
                              nsf.NS_MODEL,
                              nsf.NS_NM
                        ]));
                  // HTTP POST created nodes
                  myUrl.addParameter("uri", "nm:collection");
                  this._acquire();
                  serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                  serviceReq.create(entry, function(type, data, xhr, args) {
                     var expr = "atom:feed/atom:entry";
                     var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
                     if (nodes) {
                        var navNodeExpr = "atom:content/model:navigation-node";
                        var navNode = xpathModule.evaluateXPath(navNodeExpr, nodes[0], me.ns);
                        node = new com.ibm.mm.enabler.navigation.NavigationNodeImpl(nodes[0]);
                        me.loadedNodes[node.getID()] = node;
                     }
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(node,
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_CREATE,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                           if (deferred.finishedCallback) {
                              deferred.finishedCallback(node, deferred.finishedCallbackParameters);
                           }
                        }
                        else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     me._release(deferred, xhr.status);
                  });
               }
               else {
                  // skip unmodified nodes
                  if (this.initialContents[id] === this.loadedNodes[id].toString()) {
                     continue;
                  }
                  var entry = com.ibm.mm.enabler.model.Utils.createFeed("nm:id:" + id, "HCL Lotus Mashups Navigation Feed", this.loadedNodes[id], nsf
                        .getNameSpaces([
                              nsf.NS_XHTML,
                              nsf.NS_ATOM,
                              nsf.NS_APP,
                              nsf.NS_THR,
                              nsf.NS_BASE,
                              nsf.NS_MODEL,
                              nsf.NS_NM
                        ]));
                  // HTTP PUT updated nodes
                  myUrl.addParameter("uri", "nm:id:" + id);
                  this._acquire();
                  serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                  serviceReq.update(entry, function(type, data, xhr, args) {
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(me.loadedNodes[id],
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_MODIFY,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     me._release(deferred, xhr.status);
                  });
                  // mark new contents
                  this.initialContents[id] = this.loadedNodes[id].toString();
               }
            }
            // unmark created nodes
            this.createdNodes = {};

            // HTTP DELETE deleted nodes
            for (id in this.deletedNodes) {
               myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", "nm:" + "id:" + id);
               this._acquire();
               serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               serviceReq.remove(function(type, data, xhr, args) {
                  if (deferred) {
                     // public callback handling
                     if (deferred.operationCallback) {
                        deferred.operationCallback(id,
                           com.ibm.mashups.enabler.DeferredOperation.OPERATION_DELETE,
                           xhr.status,
                           deferred.operationCallbackParameters);
                     }
                     // internal callback handling
                     if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                        if (deferred.errorCallback) {
                           deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                        }
                     }
                  }
                  me._release(deferred, xhr.status);
               });
               // remove any changed layoutModels for this deleted navigation
               if (id in this.layoutModels) {
                  delete this.layoutModels[id];
               }
            }
            // unmark deleted nodes
            this.deletedNodes = {};

            // commit layout models
            for (id in this.layoutModels) {
               this.layoutModels[id]._commit(deferred, sync, this);
            }

            // the finishedCallback must trigger only after releasing the
            // initial 'acquire'
            this._release(deferred, 0);

            debug.exit("com.ibm.mm.enabler.model.NavigationModelImpl._commit");
         },

         // acquire semaphore
         _acquire : function() {
            this.requestCount++;
         },

         // release semaphore
         _release : function(deferred, statusCode) {
            // set overall status Code
            this.statusCode = Math.max(parseInt(statusCode, 10), this.statusCode);
            // check for full release
            this.requestCount--;
            if (this.requestCount <= 0) {
               if (deferred && deferred.finishedCallback2) {
                  deferred.finishedCallback2(null, this.statusCode, deferred.finishedCallbackParameters2);
               }
            }
         },

         _find : function(uri, deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.NavigationModelImpl._find", uri, sync ? "sync" : "async");
            if (!uri) {
               throw new Error(this.modelMessages.E_NODE_ISNULL_0);
            }
            if (uri in this.deletedNodes) {
               // node deleted in model scope
               if (deferred) {
                  // internal callback handling
                  if (deferred.errorCallback) {
                     deferred.errorCallback(com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.errorCallbackParameters);
                  }
                  // public callback handling
                  if (deferred.finishedCallBack2) {
                     deferred.finishedCallBack2(null, com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.finishedCallbackParameters2);
                  }
               }
               return null;
            }
            if (uri in this.loadedNodes) {
               // fetch node from cache
               if (deferred) {
                  // internal callback handling
                  if (deferred.finishedCallback) {
                     deferred.finishedCallback(this.loadedNodes[uri], deferred.finishedCallbackParameters);
                  }
                  // public callback handling
                  if (deferred.finishedCallBack2) {
                     deferred.finishedCallBack2(this.loadedNodes[uri], com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK, deferred.finishedCallbackParameters2);
                  }
               }
               else {
                  return this.loadedNodes[uri];
               }
            }
            var myUrl = new utilities.HttpUrl(this.url);
            // if uri equals "collection", leave out "id:"
            myUrl.addParameter("uri", "nm:" + (uri == "collection" ? "" : "id:") + uri);
            myUrl.addParameter("levels", "1");
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
            var me = this;
            var result = {};
            serviceReq.read(function(type, data, xhr, args) {
               var expr = "atom:feed/atom:entry";
               var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
               if (nodes) {
                  var node = com.ibm.mm.enabler.model.NavigationNodeFactory.createNavigationNode(nodes[0]);
                  me._node = me._cacheNode(node);
                  if (deferred) {
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(me._node || null, xhr.status, deferred.finishedCallbackParameters2);
                     }
                     // internal callback handling
                     if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                        if (deferred.finishedCallback) {
                           deferred.finishedCallback(me._node, deferred.finishedCallbackParameters);
                        }
                     }
                     else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                        if (deferred.errorCallback) {
                           deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                        }
                     }
                  }
               }
               else {
                  throw new Error(string.substitute(me.modelMessages.E_LOAD_NAVNODE_1, [ uri
                  ]));
               }
               // handle error in sync call
               if (sync && type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                  // do not expose HTTP_NOT_FOUND; simply return null in this
                  // case
                  if (xhr.status != com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND) {
                     result.status = xhr.status;
                  }
               }
            });
            if (result.status) {
               throw new Error(string.substitute(me.modelMessages.E_NAVNODE_NOTFOUND_1, [
                     uri,
                     result.status
               ]));
            }
            debug.exit("com.ibm.mm.enabler.model.NavigationModelImpl._find");
            return this._node;
         },

         _cacheNode : function(node) {
            var id = node.getID();
            if (!(id in this.loadedNodes)) {
               this.loadedNodes[id] = node;
               this.initialContents[id] = node.toString();
            }
            return this.loadedNodes[id];
         }
      });

      // layout model
      declare("com.ibm.mm.enabler.model.LayoutModelImpl", com.ibm.mashups.enabler.model.LayoutModel, {
         constructor : function(uri, baseUrl) {
            this.uri = uri;
            // TODO only one single fragment node supported in v1
            this.root = null;
            this.baseUrl = "";
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            // TODO check if model ns is required
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_THR,
                  nsf.NS_MODEL
            ]);
            this.modelMessages = i18nmodelMessages;
            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
               this.baseUrl = baseUrl;
            }
            this.initialContents = {};
            this.initialLayout = {};
            // load fragment
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", "fragment:" + "id:" + uri);
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var fragmentMediaLink;
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                  var nodes = xpathModule.evaluateXPath("atom:feed/atom:entry", data, me.ns);
                  if (nodes && nodes.length > 0) {
                     me.root = new com.ibm.mm.enabler.layout.LayoutFragmentImpl(nodes[0], this.baseUrl);

                     var xmlResult = xpathModule.evaluateXPath("atom:feed/atom:entry/atom:link[@model:rel='media']", data, me.ns);
                     if (xmlResult && xmlResult.length > 0) {
                        fragmentMediaLink = xmlResult[0].getAttribute("href");
                     }
                  }
               }
            });

            // if no media can be found, no media link is to be loaded
            if (this.root !== null) {
               var myUrl2;
               if (!fragmentMediaLink) {
                  fragmentMediaLink = "fragment-media:" + "id:/" + uri + "/index.html";
                  myUrl2 = new utilities.HttpUrl(this.url);
                  myUrl2.addParameter("uri", fragmentMediaLink);
               }
               else {
                  myUrl2 = new utilities.HttpUrl(fragmentMediaLink);
               }

               var serviceReq2 = new ModelRestServiceRequest(myUrl2, null, null, true, true);
               var saveRoot = this.root;
               serviceReq2.read(function(type2, data2, xhr2, args2) {
                  if (type2 == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                     if (saveRoot) {
                        saveRoot.setFragment(data2);
                     }
                  }
               });
            }
            // mark if a fragment is to be created or updated
            this.m_create = (this.root === null) ? true : false;
            if (this.root) {
               this.initialLayout[this.uri] = this.root.toString();
               this.initialContents[this.uri] = this.root.getFragment();
            }
         },

         getRoot : function() {
            return new com.ibm.mm.enabler.DeferredGetRootImpl(this);
         },

         _getRoot : function(deferred, sync) {
            if (deferred) {
               // internal callback handling
               if (deferred.finishedCallback) {
                  deferred.finishedCallback(this.root, deferred.finishedCallbackParameters);
               }
               // public callback handling
               if (deferred.finishedCallback2) {
                  deferred.finishedCallback2(this.root, com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK, deferred.finishedCallbackParameters2);
               }
            }
            return this.root;
         },

         hasChildren : function(node) {
            return false;
         },

         getChildren : function(node) {
            throw new Error(this.modelMessages.E_UNSUPPORTED_OP_0);
         },

         getParent : function(node) {
            throw new Error(this.modelMessages.E_UNSUPPORTED_OP_0);
         },

         insert : function(node, parentNode, nextNode) {
            // parent and next ignored in v1
            this.root = node;
         },

         _commit : function(deferred, sync, parentModel) {
            debug.entry("com.ibm.mm.enabler.model.LayoutModelImpl._commit", sync ? "sync" : "async");
            if (this.root) {
               var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
               var entry = com.ibm.mm.enabler.model.Utils.createFeed("fragment:id:" + this.uri, "HCL Lotus Mashups Fragment Feed", this.root.toString(), nsf
                     .getNameSpaces([
                           nsf.NS_ATOM,
                           nsf.NS_XHTML,
                           nsf.NS_MODEL,
                           nsf.NS_XSI
                     ]));
               // prepare xhr
               var myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", "fragment:" + "id:" + this.uri);
               var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               var myUrl2 = new utilities.HttpUrl(this.url);
               myUrl2.addParameter("uri", "fragment-media:" + "id:" + this.uri + "/index.html");
               var serviceReq2 = new ModelRestServiceRequest(myUrl2, null, null, false, sync);
               var fragment = this.root.getFragment();
               var me = this;
               if (this.m_create) {
                  // HTTP POST created nodes
                  parentModel._acquire();
                  serviceReq.create(entry, function(type, data, xhr, args) {
                     // callback handling
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(this.root,
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_CREATE,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     if (fragment !== null) {
                        serviceReq2.create(fragment, function(type, data, xhr, args) {
                           parentModel._release(deferred, xhr.status);
                        });
                     }
                     else {
                        parentModel._release(deferred, xhr.status);
                     }
                  });
               }
               else {
                  if (me.initialLayout[this.uri] != this.root.toString()) {
                     // HTTP PUT updated layout node
                     parentModel._acquire();
                     serviceReq.update(entry, function(type, data, xhr, args) {
                        // callback handling
                        if (deferred) {
                           // public callback handling
                           if (deferred.operationCallback) {
                              deferred.operationCallback(this.root,
                                 com.ibm.mashups.enabler.DeferredOperation.OPERATION_MODIFY,
                                 xhr.status,
                                 deferred.operationCallbackParameters);
                           }
                           // internal callback handling
                           if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                              if (deferred.errorCallback) {
                                 deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                              }
                           }
                        }
                        parentModel._release(deferred, xhr.status);
                     });
                     this.initialLayout[this.uri] = entry.toString();
                  }
                  if (fragment !== null && me.initialContents[me.uri] != fragment) {
                     // HTTP PUT updated fragment
                     parentModel._acquire();
                     serviceReq2.update(fragment, function(type, data, xhr, args) {
                        parentModel._release(deferred, xhr.status);
                     });
                     this.initialContents[this.uri] = fragment;
                  }
               }
            }

            // unmark fragment to create
            this.m_create = false;
            debug.exit("com.ibm.mm.enabler.model.LayoutModelImpl._commit");
         },

         remove : function(node) {
            this.root = null;
         },

         create : function(context) {
            var entry = com.ibm.mm.enabler.model.Utils.createNode("atom:entry", this.ns.atom);
            // use same id as for associated layout node
            var id = com.ibm.mm.enabler.model.Utils.createNode("atom:id", this.ns.atom);
            com.ibm.mm.enabler.dom.textContent(id, "fragment:" + "id:" + this.uri);
            entry.appendChild(id);
            entry.appendChild(com.ibm.mm.enabler.model.Utils.createNode("atom:content", this.ns.atom));
            return new com.ibm.mm.enabler.layout.LayoutFragmentImpl(entry);
         }
      });

      // meta data
      declare("com.ibm.mm.enabler.MetaDataImpl", com.ibm.mashups.enabler.MetaData, {
         constructor : function(node) {
            // TODO: handle the case where a node object instead of xml data is
            // passed in
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.mdi_ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL
            ]);
            this.metadata = {};
         },

         getMetaDataNames : function() {
            var result = [];

            // workaround bug 2229
            for (name in this.metadata) {
               result.push(name);
            }
            return result;
            // end workaround bug 2229

            var md = xpathModule.evaluateXPath("atom:content/model:metadata[@name]", this.xmlData, this.mdi_ns);
            if (md) {
               for (var i = 0; i < md.length; ++i) {
                  result.push(md[i].getAttribute("name"));
               }
            }
            return result;
         },

         getMetaData : function(name) {
            // workaround bug 2229
            return this.metadata[name];
            // end workaround bug 2229

            result = null;
            var md = xpathModule.evaluateXPath("atom:content/*/model:metadata[@name='" + name + "']/model:value", this.xmlData, this.mdi_ns);
            if (md && md.length > 0) {
               result = md[0].getAttribute("value");
            }
            return result;
         },

         setMetaData : function(name, value) {
            // workaround bug 2229
            this.metadata[name] = value;
            // end workaround bug 2229

            return;
            var nodes = xpathModule.evaluateXPath("atom:content/*/model:metadata", this.xmlData, this.mdi_ns);
            if (nodes && nodes.length > 0) {
               com.ibm.mm.enabler.dom.textContent(nodes[0], value);
            }
            else {
               var mdBase = xpathModule.evaluateXPath("atom:content/*", this.xmlData, this.mdi_ns);
               if (mdBase && mdBase.length > 0) {
                  var xmlDom = this.xmlData.ownerDocument;
                  var nameNode = com.ibm.mm.enabler.dom.createElement(xmlDom, "model:metadata", this.mdi_ns.model);
                  nameNode.setAttribute("name", name);
                  var valueNode = com.ibm.mm.enabler.dom.createElement(xmlDom, "model:value", this.mdi_ns.model);
                  valueNode.setAttribute("xsi:type", "xsd:string");
                  valueNode.setAttribute("value", value);
                  mdBase[0].appendChild(nameNode);
                  nameNode.appendChild(valueNode);
               }
            }
         }
      });

      // navigation node
      declare("com.ibm.mm.enabler.navigation.NavigationNodeImpl", [
            com.ibm.mashups.enabler.navigation.NavigationNode,
            com.ibm.mm.enabler.IdentifiableImpl,
            com.ibm.mm.enabler.LocalizedImpl,
            com.ibm.mm.enabler.MetaDataImpl
      ], {
         constructor : function(node) {
            this.xmlData = node;
         },

         getTheme : function() {
            var result = null;
            var nodes = xpathModule.evaluateXPath("atom:link[@rel='theme']", this.xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               result = nodes[0].getAttribute("title");
            }
            return result;

         },

         setTheme : function(theme) {
            var result = this.getTheme();
            var nodes = xpathModule.evaluateXPath("atom:link[@rel='theme']", this.xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               nodes[0].setAttribute("title", theme);
            }
            else {
               // create theme element
               var tn = com.ibm.mm.enabler.dom.createElement(this.xmlData.ownerDocument, "atom:link", this.ns.atom);
               tn.setAttribute("rel", "theme");
               tn.setAttribute("title", theme);
               this.xmlData.appendChild(tn);
            }
            return result;
         },

         getCommunity : function() {
            var result = null;
            var nodes = xpathModule.evaluateXPath("atom:link[@rel='community']", this.xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               result = nodes[0].getAttribute("title");
               // return "id:"+result;
               return result;
            }
            return null;
         },

         setCommunity : function(/* String */communityID) {
            var result = null;
            var nodes = xpathModule.evaluateXPath("atom:link[@rel='community']", this.xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               nodes[0].setAttribute("title", communityID);
            }
            else {
               // create community element
               var tn = com.ibm.mm.enabler.dom.createElement(this.xmlData.ownerDocument, "atom:link", this.ns.atom);
               tn.setAttribute("rel", "community");
               tn.setAttribute("title", communityID);
               this.xmlData.appendChild(tn);
            }
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         }
      });

      // shared navigation node
      declare("com.ibm.mm.enabler.navigation.SharedNavigationNodeImpl", [
            com.ibm.mashups.enabler.navigation.SharedNavigationNode,
            com.ibm.mm.enabler.navigation.NavigationNodeImpl
      ], {
         constructor : function(node) {
            this.xmlData = node;
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         }
      });

      // shared navigation root
      declare("com.ibm.mm.enabler.navigation.SharedNavigationRootImpl", [
            com.ibm.mashups.enabler.navigation.SharedNavigationRoot,
            com.ibm.mm.enabler.navigation.NavigationNodeImpl
      ], {
         constructor : function(node) {
            this.xmlData = node;
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         }
      });

      // layout node
      declare("com.ibm.mm.enabler.layout.LayoutNodeImpl", [
            com.ibm.mashups.enabler.layout.LayoutNode,
            com.ibm.mm.enabler.IdentifiableImpl
      ], {
         constructor : function(node) {
            this.xmlData = node;
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL,
                  nsf.NS_BASE,
                  nsf.NS_XSI,
                  nsf.NS_XML
            ]);
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         },

         getMetadataNames : function() {
            var expr = "atom:content/model:fragment/model:metadata[@name]";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ns);

            var result = [];
            if (nodes) {
               for (var i = 0; i < nodes.length; ++i) {
                  result.push(nodes[i].getAttribute("name"));
               }
            }
            return result;
         },

         getMetaData : function(name) {
            var expr = "atom:content/model:fragment/model:metadata[@name='" + name + "']/model:value";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ns);
            if ((nodes === null) || (nodes.length <= 0)) {
               expr = "atom:content/model:fragment/model:metadata[@name='" + name + "']";
               nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ns);
               return (nodes && nodes.length > 0) ? com.ibm.mm.enabler.dom.textContent(nodes[0]) : null;
            }

            return nodes[0].getAttribute("value");
         },

         setMetaData : function(name, value) {
            var result = null;
            var content = xpathModule.evaluateXPath("atom:content", this.xmlData, this.ns);
            var fragment = null;

            if (content && content.length > 0) {
               var nodes = xpathModule.evaluateXPath("atom:content/model:fragment", this.xmlData, this.ns);

               if (nodes && nodes.length > 0) {
                  fragment = nodes[0];
               }
               else {
                  fragment = com.ibm.mm.enabler.dom.createElement(this.xmlData.ownerDocument, "model:fragment", this.ns.model);
                  content[0].appendChild(fragment);
               }

               var metadata = null;
               nodes = xpathModule.evaluateXPath("atom:content/model:fragment/model:metadata[@name='" + name + "']", this.xmlData, this.ns);

               if (nodes && nodes.length > 0) {
                  metadata = nodes[0];
               }
               else {
                  metadata = com.ibm.mm.enabler.dom.createElement(this.xmlData.ownerDocument, "model:metadata", this.ns.model);
                  metadata.setAttribute("name", name);
                  fragment.appendChild(metadata);
               }

               var valueNode = null;
               nodes = xpathModule.evaluateXPath("atom:content/model:fragment/model:metadata[@name='" + name + "']/model:value", this.xmlData, this.ns);

               if (nodes && nodes.length > 0) {
                  valueNode = nodes[0];
                  result = valueNode.getAttribute("value");
               }
               else {
                  valueNode = com.ibm.mm.enabler.dom.createElement(this.xmlData.ownerDocument, "model:value", this.ns.model);
                  metadata.appendChild(valueNode);
               }

               if (valueNode !== null) {
                  valueNode.setAttribute("xsi:type", "xsd:string");
                  valueNode.setAttribute("value", value);
               }
            }

            return result;
         },

         removeMetaData : function(name) {
            var expr = "atom:content/model:fragment/model:metadata[@name='" + name + "']";
            var nodes = xpathModule.evaluateXPath(expr, this.xmlData, this.ns);
            if (nodes && nodes.length > 0) {
               var parent = nodes[0].parentNode;
               parent.removeChild(nodes[0]);
            }
         }
      });

      // layout fragment
      declare("com.ibm.mm.enabler.layout.LayoutFragmentImpl", [
            com.ibm.mm.enabler.layout.LayoutNodeImpl,
            com.ibm.mm.enabler.LocalizedImpl
      ], {
         constructor : function() {
            this.fragment = "";
         },

         getFragment : function() {
            return this.fragment;
         },

         setFragment : function(fragment) {
            this.fragment = fragment;
         }
      });

      // // preference model
      // dojo.declare("com.ibm.mm.enabler.model.PreferenceModelImpl",
      // com.ibm.mashups.enabler.model.PreferenceModel,
      // {
      // constructor:function (user, baseUrl) {
      // this.user = user;
      // this.prefix = "pref:";
      // this.root = null;
      // this.loadedNodes = {};
      // this.createdNodes = {};
      // this.deletedNodes = {};
      // this.baseUrl = "";
      // this.url =
      // com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
      // +
      // com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
      // this.ns = { "atom" : "http://www.w3.org/2005/Atom",
      // "model":
      // "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/preference-model",
      // "thr" : "http://purl.org/syndication/thread/1.0" };
      // this.modelMessages = dojo.i18n.getLocalization("com.ibm.mm.enabler",
      // "modelMessages");
      // if ((typeof(baseUrl)!= "undefined") && (baseUrl !== null)) {
      // this.url = baseUrl + this.url;
      // this.baseUrl = baseUrl;
      // }
      // },
      //
      // getPreferenceSetModel: function (node) {
      // // create preferences set of the single level node
      // return new com.ibm.mm.enabler.model.PreferenceSetModelImpl(node,
      // baseUrl);
      // },
      //
      // getHierarchyPreferenceSetModel: function (node, callbackObject) {
      // // load the preference sets for all levels up to 'ADMIN'-level
      // var i = 0;
      // var levels = [];
      // levels[i++] = node;
      // var current = node;
      // while (current.getLevel() != "ADMIN") {
      // var parent =
      // com.ibm.mm.enabler.xpath.evaluateXPath("thr:in-reply-to[@ref]",
      // current.xmlData, this.ns);
      // if (parent && parent.length>0) {
      // var ref = parent[0].getAttribute("ref");
      // var pos = ref.indexOf("id:");
      // var id = ref.slice(pos);
      // current = this.find(id).start();
      // if (current !== null) {
      // levels[i++] = current;
      // } else {
      // // parent not found
      // break;
      // }
      // } else {
      // // parent not specified
      // break;
      // }
      // }
      //
      // // create empty preferences
      // var xmlDom = com.ibm.mm.enabler.dom.createDocument();
      // var aggregation = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "atom:entry", this.ns.atom);
      // var content = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "atom:content", this.ns.atom);
      // var preferenceSet = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-set", this.ns.model);
      // preferenceSet.setAttribute("level", node.getLevel());
      // aggregation.appendChild(content);
      // content.appendChild(preferenceSet);
      //
      // // inject all the existing preference levels, starting with topmost
      // level
      // var source;
      // for (var j=levels.length; j>0; j--) {
      // // beginning at topmost tag <model:preference-set>
      // if (callbackObject) {
      // source =
      // this._createPreferenceSetFromItems(callbackObject._preLevelItemsHook(levels[j-1].getLevel()));
      // if (source) {
      // this._merge(source.firstChild, preferenceSet);
      // }
      // }
      // source =
      // com.ibm.mm.enabler.xpath.evaluateXPath("atom:content/model:preference-set",
      // levels[j-1].xmlData, this.ns);
      // if (source && source.length>0) {
      // this._merge(source[0].firstChild, preferenceSet);
      // }
      // }
      //
      // // create preferences set of the aggregation
      // var aggregationPS = new
      // com.ibm.mm.enabler.preference.PreferenceSetImpl(aggregation);
      // return new
      // com.ibm.mm.enabler.model.PreferenceSetModelImpl(aggregationPS, basUrl);
      // },
      //
      // _createPreferenceSetFromItems: function(items) {
      // if (!items){
      // return null;
      // }
      // var name;
      // var value;
      // var xmlDom = com.ibm.mm.enabler.dom.createDocument();
      // var prefSet = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-set" , this.ns.model);
      // var entry = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-entry" , this.ns.model);
      // for (name in items) {
      // var item = items[name];
      // entry = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-entry" , this.ns.model);
      // entry.setAttribute("name", name);
      // entry.setAttribute("read-only", "" + item.readOnly);
      // prefSet.appendChild(entry);
      // value = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-value", this.ns.model);
      // value.setAttribute("value", item.value);
      // entry.appendChild(value);
      // }
      // return prefSet;
      // },
      //
      // _merge: function(sourceXml, targetXml) {
      // if (sourceXml) {
      // if (sourceXml.tagName) {
      // var tag = sourceXml.tagName;
      // var xmlDom = com.ibm.mm.enabler.dom.createDocument();
      // var target = null;
      // var entry;
      // // handle tag <model:preference-entry>
      // if (tag == "model:preference-entry") {
      // // read only (defaults to 'false')
      // var readonly = false;
      // name = sourceXml.getAttribute("name");
      // result = com.ibm.mm.enabler.xpath.evaluateXPath(tag + "[@name='" + name
      // + "']", targetXml, this.ns);
      // if (result && result.length>0) {
      // target = result[0];
      // // obtain 'read only' information from target
      // readonly = target.getAttribute("read-only") == "true" ? true : false;
      // } else {
      // entry = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-entry" , this.ns.model);
      // entry.setAttribute("name", name);
      // targetXml.appendChild(entry);
      // target = entry;
      // // inject read-only information
      // if (sourceXml.getAttribute("read-only") == "true") {
      // entry.setAttribute("read-only", "true");
      // }
      // }
      //
      // // overwrite higher level preference only if target is not read only
      // if (!readonly) {
      // while (target.firstChild) {
      // target.removeChild(target.firstChild);
      // }
      // this._merge(sourceXml.firstChild, target);
      // }
      // }
      //
      // // handle tag <model:preference-set>
      // if (tag == "model:preference-set") {
      // result = com.ibm.mm.enabler.xpath.evaluateXPath(tag, targetXml,
      // this.ns);
      // if (result && result.length>0) {
      // target = result[0];
      // } else {
      // entry = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-set" , this.ns.model);
      // targetXml.appendChild(entry);
      // target = entry;
      // }
      // this._merge(sourceXml.firstChild, target);
      // }
      //
      // // handle tag <model:preference-value>
      // if (tag == "model:preference-value") {
      // value = sourceXml.getAttribute("value");
      // result = com.ibm.mm.enabler.xpath.evaluateXPath(tag + "[@value='" +
      // value + "']", targetXml, this.ns);
      // if (!(result && result.length > 0)) {
      // entry = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-value", this.ns.model);
      // entry.setAttribute("value", value);
      // targetXml.appendChild(entry);
      // }
      // }
      // }
      //
      // // handle next sibling
      // if (sourceXml.nextSibling) {
      // this._merge(sourceXml.nextSibling, targetXml);
      // }
      // }
      // },
      //
      // find: function (uri) {
      // return new com.ibm.mm.enabler.DeferredFindImpl(this, uri);
      // },
      //
      // _find: function (uri, deferred, sync) {
      // return this._load(uri, deferred, sync);
      // },
      //
      // getRoot: function () {
      // return new com.ibm.mm.enabler.DeferredGetRootImpl(this);
      // },
      //
      // _getRoot: function (deferred, sync) {
      // // TODO
      // },
      //
      // hasChildren: function (node) {
      // // TODO
      // },
      //
      // getChildren: function (node) {
      // // TODO
      // },
      //
      // getParent: function (node) {
      // return new com.ibm.mm.enabler.DeferredGetParentImpl(this, node);
      // },
      //
      // _getParent: function (node, deferred, sync) {
      // var id = (node instanceof
      // com.ibm.mm.enabler.preference.PreferenceSetImpl) ? node.getID() : node;
      // var resolved = this._load(id, null, true); // deleted nodes are
      // resolved to null in _load()
      // if (resolved) {
      // var reply =
      // com.ibm.mm.enabler.xpath.evaluateXPath("thr:in-reply-to[@ref]",
      // resolved.xmlData, this.ns);
      // var parent = null;
      // if (reply && reply.length > 0) {
      // parent = reply[0].getAttribute("ref");
      // } else {
      // return null;
      // }
      // return this._load(parent, deferred, sync);
      // } else {
      // throw new
      // Error(dojo.string.substitute(this.modelMessages.E_NODE_NOTFOUND_1,[id]));
      // }
      // },
      //
      // _load: function(uri, deferred, sync) {
      // // return null, if node is deleted in controller scope
      // if (uri in this.deletedNodes) {
      // // handle callback
      // if (deferred && deferred.finishedCallback) {
      // if (deferred.errorCallback) {
      // deferred.errorCallback(null, deferred.errorCallbackParameters);
      // }
      // }
      // return null;
      // }
      // if (uri in this.loadedNodes) {
      // // fetch node from cache
      // if (deferred && deferred.finishedCallback) {
      // deferred.finishedCallback(this.loadedNodes[uri],
      // deferred.finishedCallbackParameters);
      // }
      // } else {
      // // request node from server
      // var myUrl = new com.ibm.mm.enabler.utilities.HttpUrl(this.url);
      // myUrl.addParameter("uri", this.prefix + uri);
      // myUrl.addParameter("user", this.user);
      // myUrl.addParameter("level", "user,instance,admin");
      // var serviceReq = new
      // com.ibm.mm.enabler.services.ModelRestServiceRequest(myUrl, null, null,
      // false, sync);
      // var me = this;
      // serviceReq.read(
      // function (type, data, xhr, args) {
      // var expr = "atom:feed/atom:entry[atom:id]";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, data, me.ns);
      // if (nodes) {
      // // load all levels
      // var i = nodes.length;
      // while (i-->0) {
      // var currentId = com.ibm.mm.enabler.xpath.evaluateXPath("atom:id",
      // nodes[i], me.ns);
      // if (currentId) {
      // var currentUri = com.ibm.mm.enabler.dom.textContent(currentId[0]);
      // var SCHEMA_PREF = "pref:";
      // var pos = currentUri.indexOf(SCHEMA_PREF);
      // if (pos >=0) {
      // currentUri = currentUri.slice(SCHEMA_PREF.length);
      // }
      // me.loadedNodes[currentUri] = new
      // com.ibm.mm.enabler.PreferenceSetImpl(nodes[i]);
      // }
      // }
      //
      // // handle callback
      // if (deferred && deferred.finishedCallback) {
      // if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_LOAD) {
      // deferred.finishedCallback(me.loadedNodes[uri],
      // deferred.finishedCallbackParameters);
      // } else if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR) {
      // if (deferred.errorCallback) {
      // deferred.errorCallback(null, deferred.errorCallbackParameters);
      // }
      // }
      // }
      // }
      // }
      // );
      // }
      // return this.loadedNodes[uri];
      // },
      //
      // remove: function (node) {
      // var id = (node instanceof
      // com.ibm.mm.enabler.preference.PreferenceSetImpl) ? node.getID() : node;
      // // mark node as deleted
      // if (!(id in this.deletedNodes)) {
      // this.deletedNodes[id] = null;
      // }
      // // mark cache entry
      // if (id in this.loadedNodes) {
      // delete this.loadedNodes[id];
      // }
      // },
      //
      // commit: function () {
      // return new com.ibm.mm.enabler.DeferredCommitImpl(this);
      // },
      //
      // _commit: function (deferred, sync) {
      // var serviceReq;
      // var myUrl;
      // var me = this;
      // for (id in this.loadedNodes) {
      // var time = new Date();
      // var entry = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      // '<atom:feed xmlns:atom="http://www.w3.org/2005/Atom"
      // xmlns:xhtml="http://www.w3.org/1999/xhtml"
      // xmlns:thr="http://purl.org/syndication/thread/1.0"
      // xmlns:model="http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/preference-model">\n'
      // +
      // '<atom:title>HCL MashupMaker Preference Feed</atom:title>\n' +
      // '<atom:subtitle>HCL MashupMaker Preference Feed</atom:subtitle>\n' +
      // '<atom:updated>' + time.toGMTString() + '</atom:updated>\n' +
      // '<atom:author>\n' +
      // '<atom:name>HCL</atom:name>\n' +
      // '<atom:uri>http://www.ibm.com</atom:uri>\n' +
      // '<atom:email>mashupmaker@ibm.com</atom:email>\n' +
      // '</atom:author>\n' +
      // '<atom:id>pref:' + id + '</atom:id>\n' +
      // this.loadedNodes[id] +
      // '</atom:feed>';
      // myUrl = new com.ibm.mm.enabler.utilities.HttpUrl(this.url);
      // myUrl.addParameter("uri", "pref:" + id);
      // if (id in this.createdNodes) {
      // // HTTP POST created nodes
      // serviceReq = new
      // com.ibm.mm.enabler.services.ModelRestServiceRequest(myUrl, null, null,
      // false, sync);
      // serviceReq.create(entry,
      // function (type, data, xhr, args) {
      // if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR) {
      // if (deferred && deferred.errorCallback) {
      // deferred.errorCallback(me.loadedNodes[id],
      // deferred.errorCallbackParameters);
      // }
      // }
      // }
      // );
      // } else {
      // // HTTP PUT modified nodes
      // myUrl.addParameter("update", "replace");
      // serviceReq = new
      // com.ibm.mm.enabler.services.ModelRestServiceRequest(myUrl, null, null,
      // false, sync);
      // serviceReq.update(entry,
      // function (type, data, xhr, args) {
      // if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR) {
      // if (deferred.errorCallback) {
      // deferred.errorCallback(me.loadedNodes[id],
      // deferred.errorCallbackParameters);
      // }
      // }
      // }
      // );
      // }
      // }
      // // HTTP DELETE deleted nodes
      // for (id in this.deletedNodes) {
      // myUrl = new com.ibm.mm.enabler.utilities.HttpUrl(this.url);
      // myUrl.addParameter("uri", "pref:" + id);
      // serviceReq = new
      // com.ibm.mm.enabler.services.ModelRestServiceRequest(myUrl, null, null,
      // false, sync);
      // serviceReq.remove(
      // function (type, data, xhr, args) {
      // if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR) {
      // if (deferred && deferred.errorCallback) {
      // deferred.errorCallback(me.loadedNodes[id],
      // deferred.errorCallbackParameters);
      // }
      // }
      // }
      // );
      // }
      // // handle callback
      // if (deferred && deferred.finishedCallback) {
      // deferred.finishedCallback(null, deferred.finishedCallbackParameters);
      // }
      // },
      //
      // create: function (context) {
      // var xmlDom = com.ibm.mm.enabler.dom.createDocument();
      // var entry = com.ibm.mm.enabler.dom.createElement(xmlDom, "atom:entry" ,
      // this.ns.atom);
      // var id = com.ibm.mm.enabler.dom.createElement(xmlDom, "atom:id" ,
      // this.ns.atom);
      // com.ibm.mm.enabler.dom.textContent(id, "pref:" + context.id);
      // var title = com.ibm.mm.enabler.dom.createElement(xmlDom, "atom:title" ,
      // this.ns.atom);
      // com.ibm.mm.enabler.dom.textContent(title, "Preference Entry");
      // var updated = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "atom:updated" , this.ns.atom);
      // var time = new Date();
      // com.ibm.mm.enabler.dom.textContent(updated, time.toGMTString());
      // var content = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "atom:content" , this.ns.atom);
      // content.setAttribute("type", "application/xml");
      // entry.appendChild(id);
      // entry.appendChild(title);
      // entry.appendChild(updated);
      // entry.appendChild(content);
      // var ps = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-set" , this.ns.model);
      // content.appendChild(ps);
      // return new com.ibm.mm.enabler.preference.PreferenceSetImpl(entry);
      // },
      //
      // insert: function (node, parent) {
      // var level = "ADMIN";
      // if (parent) {
      // // parent
      // var xmlDom = com.ibm.mm.enabler.dom.createDocument();
      // var inreplyto = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "thr:in-reply-to" , this.ns.thr);
      // inreplyto.setAttribute("ref", "pref:" + "id:"+parent.getID());
      // inreplyto.setAttribute("href", "?uri=pref:" + "id:"+parent.getID());
      // inreplyto.setAttribute("type", "application/atom+xml");
      // node.xmlData.appendChild(inreplyto);
      // // obtain level
      // if (parent.getLevel() == "ADMIN") {
      // level = "INSTANCE";
      // } else if (parent.getLevel() == "INSTANCE") {
      // level = "USER";
      // }
      // }
      // // set level
      // var expr = "atom:content/model:preference-set";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, node.xmlData,
      // this.ns);
      // if (nodes && nodes.length>0) {
      // nodes[0].setAttribute("level", level);
      // }
      // // cache and mark as created
      // this.loadedNodes[node.getID()] = node;
      // this.createdNodes[node.getID()] = null;
      // }
      // }
      // );
      //
      // // preference set model
      // dojo.declare("com.ibm.mm.enabler.model.PreferenceSetModelImpl",
      // [com.ibm.mashups.enabler.model.PreferenceSetModel,
      // com.ibm.mm.enabler.DeferredIteratorImpl],
      // {
      // constructor:function (node, baseUrl) {
      // this.xmlData = node.xmlData;
      // this.prefix = "pref:";
      // this.entries = [];
      // this.cursor = 0;
      // this.url =
      // com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
      // +
      // com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
      // this.ns = { "atom" : "http://www.w3.org/2005/Atom",
      // "model" :
      // "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/preference-model" };
      // this.modelMessages = dojo.i18n.getLocalization("com.ibm.mm.enabler",
      // "modelMessages");
      // if ((typeof(baseUrl)!= "undefined") && (baseUrl !== null)) {
      // this.url = baseUrl + this.url;
      // this.baseUrl = baseUrl;
      // }
      // },
      //
      // getPreference: function (name) {
      // var result = null;
      // var expr =
      // "atom:content/model:preference-set/model:preference-entry[@name='" +
      // name + "']";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // if (nodes && nodes.length>0) {
      // var set =
      // com.ibm.mm.enabler.xpath.evaluateXPath("model:preference-set",
      // nodes[0], this.ns);
      // if (set && set.length>0) {
      // result = new
      // com.ibm.mm.enabler.preference.PreferenceSetNodeImpl(nodes[0], name);
      // } else {
      // result = new com.ibm.mm.enabler.preference.PreferenceNodeImpl(nodes[0],
      // name);
      // }
      // }
      // return result;
      // },
      //
      // start: function(sync) {
      // while (this._hasNext(this, sync)) {
      // if (this._next(this, sync)) {
      // continue;
      // } else {
      // break;
      // }
      // }
      // },
      //
      // hasNext: function () {
      // return this._hasNext(null, true);
      // },
      //
      // next: function () {
      // return this._next(null, true);
      // },
      //
      // _hasNext: function (deferred, sync) {
      // if (this.entries[this.cursor] === null && this.cursor === 0) {
      // this._loadAhead(deferred, sync);
      // }
      // return (this.entries.length > this.cursor);
      // },
      //
      // _next: function (deferred, sync) {
      // if (this._hasNext(deferred, sync)) {
      // return this.entries[this.cursor++];
      // } else {
      // return null;
      // }
      // },
      //
      // size: function () {
      // return hasNext() ? entries.length : 0;
      // },
      //
      // setCursorPosition: function (position) {
      // this.internalCursor = 0;
      // this.cursor = position;
      // this.cursorStart = position;
      // this.entries = [];
      // },
      //
      // getCursorPosition: function () {
      // return this.cursor;
      // },
      //
      // create: function (context) {
      // var result = null;
      // var node = null;
      // var xmlDom = com.ibm.mm.enabler.dom.createDocument();
      // if (context) {
      // // create entry with name
      // if (context.name) {
      // node = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-entry" , this.ns.model);
      // node.setAttribute("name", context.name);
      // // create set if applicable
      // if (context.type) {
      // if (context.type == "PreferenceSetNode") {
      // set = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-set" , this.ns.model);
      // node.appendChild(set);
      // result = new com.ibm.mm.enabler.preference.PreferenceSetNodeImpl(node);
      // } else if (context.type == "PreferenceNode") {
      // result = new com.ibm.mm.enabler.preference.PreferenceNodeImpl(node);
      // } else {
      // throw new
      // Error(dojo.string.substitute(this.modelMessages.TYPE_NOTSUPPORT_1,[context.type]));
      // }
      // } else {
      // throw new Error(this.modelMessages.E_NO_PREFTYPE_0);
      // }
      // } else {
      // throw new Error(this.modelMessages.E_NO_PREFNAME_0);
      // }
      // } else {
      // throw new Error(this.modelMessages.E_CREATPREF_NO_CONTEXT_0);
      // }
      // return result;
      // },
      //
      // insert: function (node, before) {
      // var nodes =
      // com.ibm.mm.enabler.xpath.evaluateXPath("atom:content/model:preference-set",
      // this.xmlData, this.ns);
      // if (nodes && nodes.length>0) {
      // if (before) {
      // nodes[0].insertBefore(node.xmlData, before);
      // } else {
      // nodes[0].appendChild(node.xmlData);
      // }
      // }
      // // set internal xpath
      // node.xpath = node.getName();
      // return node;
      // },
      //
      // remove: function (node) {
      // var expr = "atom:content/model:preference-set";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // if (nodes && nodes.length>0) {
      // nodes[0].removeChild(node.xmlData);
      // }
      // },
      //
      // _loadAhead: function(deferred, sync) {
      // var nodes =
      // com.ibm.mm.enabler.xpath.evaluateXPath("atom:content/model:preference-set/model:preference-entry",
      // this.xmlData, this.ns);
      // if (nodes) {
      // for (var i=0; i<nodes.length; i++) {
      // var set =
      // com.ibm.mm.enabler.xpath.evaluateXPath("model:preference-set",
      // nodes[i], this.ns);
      // var pref = null;
      // if (set && set.length>0) {
      // pref = new
      // com.ibm.mm.enabler.preference.PreferenceSetNodeImpl(nodes[i],
      // nodes[i].getAttribute("name"));
      // } else {
      // pref = new com.ibm.mm.enabler.preference.PreferenceNodeImpl(nodes[i],
      // nodes[i].getAttribute("name"));
      // }
      // this.entries[i] = pref;
      //
      // // callback handling
      // if (deferred) {
      // if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_LOAD) {
      // if (deferred.foreachCallback) {
      // deferred.foreachCallback(pref, deferred.foreachCallbackParameters);
      // }
      // } else if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR) {
      // if (deferred.errorCallback) {
      // deferred.errorCallback(null, deferred.errorCallbackParameters);
      // }
      // }
      // }
      // }
      // if (deferred && deferred.finishedCallback) {
      // deferred.finishedCallback(null, deferred.finishedCallbackParameters);
      // }
      // }
      // },
      //
      // toString: function() {
      // return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
      // }
      // }
      // );
      //
      // // preference locator
      // dojo.declare("com.ibm.mm.enabler.preference.PreferenceLocatorImpl",
      // [com.ibm.mashups.enabler.preference.PreferenceLocator],
      // {
      // constructor:function (node) {
      // this.xmlData = node;
      // this.url =
      // com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
      // +
      // com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
      // },
      //
      // findByName: function (name) {
      // return new Deferred();
      // }
      // }
      // );
      //
      // // preference set
      // dojo.declare("com.ibm.mm.enabler.preference.PreferenceSetImpl",
      // [com.ibm.mashups.enabler.preference.PreferenceSet,
      // com.ibm.mm.enabler.IdentifiableImpl],
      // {
      // constructor:function (node) {
      // this.xmlData = node;
      // this.ns = { "atom" : "http://www.w3.org/2005/Atom",
      // "model" :
      // "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/preference-model" };
      // },
      //
      // getLevel: function () {
      // var expr = "atom:content/model:preference-set";
      // var entry = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // return (entry && entry.length>0) ? entry[0].getAttribute("level") :
      // null;
      // },
      //
      // toString: function() {
      // return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
      // }
      // }
      // );
      //
      // // generic preference node
      // dojo.declare("com.ibm.mm.enabler.preference.GenericPreferenceNodeImpl",
      // com.ibm.mashups.enabler.preference.GenericPreferenceNode,
      // {
      // constructor:function (node, xpath) {
      // this.xmlData = node;
      // this.xpath = xpath;
      // },
      //
      // getName: function() {
      // return this.xmlData.getAttribute("name");
      // },
      //
      // isReadOnly: function() {
      // return this.xmlData.getAttribute("read-only") == "true" ? true : false;
      // },
      //
      // setReadOnly: function(readOnly) {
      // this.xmlData.setAttribute("read-only", readOnly ? "true" : "false");
      // },
      //
      // toString: function() {
      // return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
      // }
      // }
      // );
      //
      // // preference set node
      // dojo.declare("com.ibm.mm.enabler.preference.PreferenceSetNodeImpl",
      // [com.ibm.mashups.enabler.preference.PreferenceSetNode,
      // com.ibm.mm.enabler.preference.GenericPreferenceNodeImpl,
      // com.ibm.mm.enabler.DeferredIteratorImpl],
      // {
      // constructor:function (node) {
      // this.xmlData = node;
      // this.entries = [];
      // this.cursor = 0;
      // this.ns = { "atom" : "http://www.w3.org/2005/Atom",
      // "thr" : "http://purl.org/syndication/thread/1.0",
      // "model" :
      // "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/model-elements",
      // "portal" :
      // "http://www.ibm.com/xmlns/prod/websphere/portal/v6.0.1/portal-model" };
      // },
      //
      // getPreference: function(name) {
      // var result = null;
      // var expr = "model:preference-set/model:preference-entry[@name='" + name
      // + "']";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // if (nodes && nodes.length>0) {
      // var set =
      // com.ibm.mm.enabler.xpath.evaluateXPath("model:preference-set",
      // nodes[0], this.ns);
      // if (set && set.length>0) {
      // result = new
      // com.ibm.mm.enabler.preference.PreferenceSetNodeImpl(nodes[0],
      // this.xpath + "/" + name);
      //
      // } else {
      // result = new com.ibm.mm.enabler.preference.PreferenceNodeImpl(nodes[0],
      // this.xpath + "/" + name);
      // }
      // }
      // return result;
      // },
      //
      // start: function(sync) {
      // while (this._hasNext(this, sync)) {
      // if (this._next(this, sync)) {
      // continue;
      // } else {
      // break;
      // }
      // }
      // },
      //
      // hasNext: function () {
      // return this._hasNext(null, true);
      // },
      //
      // next: function () {
      // return this._next(null, true);
      // },
      //
      // _hasNext: function (deferred, sync) {
      // if (this.entries[this.cursor] === null && this.cursor === 0) {
      // this._loadAhead(deferred, sync);
      // }
      // return (this.entries.length > this.cursor);
      // },
      //
      // _next: function (deferred, sync) {
      // if (this._hasNext(deferred, sync)) {
      // return this.entries[this.cursor++];
      // } else {
      // return null;
      // }
      // },
      //
      // size: function () {
      // return hasNext() ? entries.length : 0;
      // },
      //
      // setCursorPosition: function (position) {
      // this.internalCursor = 0;
      // this.cursor = position;
      // this.cursorStart = position;
      // this.entries = [];
      // },
      //
      // getCursorPosition: function () {
      // return this.cursor;
      // },
      //
      // insert: function (node, before) {
      // var nodes =
      // com.ibm.mm.enabler.xpath.evaluateXPath("model:preference-set",
      // this.xmlData, this.ns);
      // if (nodes && nodes.length>0) {
      // if (before) {
      // nodes[0].insertBefore(node.xmlData, before);
      // } else {
      // nodes[0].appendChild(node.xmlData);
      // }
      // }
      // // set internal xpath
      // node.xpath = this.xpath + "/" + node.getName();
      // return node;
      // },
      //
      // remove: function (node) {
      // var expr = "model:preference-set";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // if (nodes && nodes.length>0) {
      // nodes[0].removeChild(node.xmlData);
      // }
      // },
      //
      // _loadAhead: function(deferred, sync) {
      // var nodes =
      // com.ibm.mm.enabler.xpath.evaluateXPath("model:preference-set/model:preference-entry",
      // this.xmlData, this.ns);
      // if (nodes) {
      // for (var i=0; i<nodes.length; i++) {
      // var set =
      // com.ibm.mm.enabler.xpath.evaluateXPath("model:preference-set",
      // nodes[i], this.ns);
      // var pref = null;
      // if (set && set.length>0) {
      // pref = new
      // com.ibm.mm.enabler.preference.PreferenceSetNodeImpl(nodes[i],
      // this.xpath + "/" + nodes[i].getAttribute("name"));
      // } else {
      // pref = new com.ibm.mm.enabler.preference.PreferenceNodeImpl(nodes[i],
      // this.xpath + "/" + nodes[i].getAttribute("name"));
      // }
      // this.entries[i] = pref;
      //
      // // callback handling
      // if (deferred) {
      // if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_LOAD) {
      // if (deferred.foreachCallback) {
      // deferred.foreachCallback(pref, deferred.foreachCallbackParameters);
      // }
      // } else if (type ==
      // com.ibm.mm.enabler.services.ModelRestServiceRequest.XHR_STATUS_ERROR) {
      // if (deferred.errorCallback) {
      // deferred.errorCallback(null, deferred.errorCallbackParameters);
      // }
      // }
      // }
      // }
      // if (deferred && deferred.finishedCallback) {
      // deferred.finishedCallback(null, deferred.finishedCallbackParameters);
      // }
      // }
      // }
      // }
      // );
      //
      // // preference node
      // dojo.declare("com.ibm.mm.enabler.preference.PreferenceNodeImpl",
      // [com.ibm.mashups.enabler.preference.PreferenceNode,
      // com.ibm.mm.enabler.preference.GenericPreferenceNodeImpl],
      // {
      // constructor:function (node) {
      // this.xmlData = node;
      // this.ns = { "atom" : "http://www.w3.org/2005/Atom",
      // "model" :
      // "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/preference-model" };
      // this.modelMessages = dojo.i18n.getLocalization("com.ibm.mm.enabler",
      // "modelMessages");
      // },
      //
      // getValue: function() {
      // var result = null;
      // var expr = "model:preference-value[@value]";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // if (nodes && nodes.length > 0) {
      // result = nodes[0].getAttribute("value");
      // }
      // return result;
      // },
      //
      // getValues: function() {
      // var result = [];
      // var expr = "model:preference-value[@value]";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // if (nodes && nodes.length > 0) {
      // for (i=0; i<nodes.length; i++) {
      // result.push(nodes[i].getAttribute("value"));
      // }
      // }
      // return result;
      // },
      //
      // setValue: function(value) {
      // this.setValues([value]);
      // },
      //
      // setValues: function(values) {
      // if (this.isReadOnly() === true) {
      // throw new Error(this.modelMessages.E_READONLY_PREF_1);
      // }
      //
      // // clean up values
      // while (this.xmlData.firstChild) {
      // this.xmlData.removeChild(this.xmlData.firstChild);
      // }
      //
      // // set new values
      // for (var i = 0; i<values.length; i++) {
      // var expr = "model:preference-value[@value='" + values[i] + "']";
      // var nodes = com.ibm.mm.enabler.xpath.evaluateXPath(expr, this.xmlData,
      // this.ns);
      // if (!nodes || nodes.length === 0) {
      // var xmlDom = com.ibm.mm.enabler.dom.createDocument();
      // var entry = com.ibm.mm.enabler.dom.createElement(xmlDom,
      // "model:preference-value" , this.ns.model);
      // entry.setAttribute("value", values[i]);
      // this.xmlData.appendChild(entry);
      // }
      // }
      // }
      // }
      // );

      // theme model
      declare("com.ibm.mm.enabler.model.ThemeModelImpl", [
            com.ibm.mashups.enabler.model.ThemeModel,
            com.ibm.mm.enabler.DeferredIteratorImpl
      ], {
         constructor : function(baseUrl) {
            this.prefix = "theme:";
            this.loadedNodes = {};
            this.skinModels = {};
            this.entries = [];
            this.cursor = 0;
            this.size = null;
            this.start = null;
            this.num = null;
            this.strategy = null;
            this.baseUrl = "";
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL,
                  nsf.NS_APP,
                  nsf.NS_THR
            ]);
            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
               this.baseUrl = baseUrl;
            }
         },

         find : function(uri) {
            return new com.ibm.mm.enabler.DeferredFindImpl(this, uri);
         },

         _find : function(uri, deferred, sync) {
            return this._load(uri, deferred, sync);
         },

         start : function(sync) {
            while (this._hasNext(this, sync)) {
               if (this._next(this, sync)) {
                  continue;
               }
               else {
                  break;
               }
            }
         },

         hasNext : function() {
            return this._hasNext(null, true);
         },

         _hasNext : function(deferred, sync) {
            if (this.start === null || this.cursor < this.start || (this.cursor >= (this.start + this.num) && (this.size > this.cursor))) {
               this._loadAhead(deferred, sync);
            }
            return (this.size > this.cursor);
         },

         next : function() {
            return this._next(null, true);
         },

         _next : function(deferred, sync) {
            return this._hasNext(deferred, sync) ? this.loadedNodes[this.entries[this.cursor++]] : null;
         },

         size : function() {
            return this.size;
         },

         setCursorPosition : function(position) {
            this.cursor = position;
         },

         getCursorPosition : function() {
            return this.cursor;
         },

         getSkinModel : function(theme) {
            // either use input string as uri or input object to extract uri
            // from
            var id = (theme instanceof com.ibm.mm.enabler.theme.ThemeImpl) ? "id:" + theme.getID() : theme;

            // _load checks if node is deleted in model scope
            if (this._load(id, null, true) === null) {
               return new com.ibm.mm.enabler.model.SkinModelImpl(id, this.baseUrl);
            }

            // cache skin model
            if (!(id in this.skinModels)) {
               this.skinModels[id] = new com.ibm.mm.enabler.model.SkinModelImpl(id, this.baseUrl);
            }
            return this.skinModels[id];
         },

         setStrategy : function(strategy) {
            if (strategy instanceof Array) {
               // evaluate the first strategy only
               this.strategy = strategy[0];
            }
            else {
               // backwards compatibility
               this.strategy = strategy;
            }
         },

         _load : function(uri, deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.ThemeModelImpl._load", uri, sync ? "sync" : "async");
            if (uri in this.loadedNodes) {
               // fetch node from cache
               if (deferred) {
                  // internal callback handling
                  if (deferred.finishedCallback) {
                     deferred.finishedCallback(this.loadedNodes[uri], deferred.finishedCallbackParameters);
                  }
                  // public callback handling
                  if (deferred.finishedCallback2) {
                     deferred.finishedCallback2(this.loadedNodes[uri], com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK, deferred.finishedCallbackParameters2);
                  }
               }
            }
            else {
               // request node from server
               var myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", this.prefix + uri);
               var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               var me = this;
               serviceReq.read(function(type, data, xhr, args) {
                  if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                     var expr = "atom:feed/atom:entry[atom:id='" + me.prefix + uri + "']";
                     var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
                     if (nodes && nodes.length > 0) {
                        me.loadedNodes[uri] = new com.ibm.mm.enabler.theme.ThemeImpl(nodes[0]);
                        // internal callback handling
                        if (deferred && deferred.finishedCallback) {
                           deferred.finishedCallback(me.loadedNodes[uri], deferred.finishedCallbackParameters);
                        }
                     }
                  }
                  else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                     // internal callback handling
                     if (deferred && deferred.errorCallback) {
                        deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                     }
                  }
                  // public callback handling
                  if (deferred && deferred.finishedCallback2) {
                     deferred.finishedCallback2(me.loadedNodes[uri] || null, xhr.status, deferred.finishedCallbackParameters2);
                  }
               });
            }
            debug.exit("com.ibm.mm.enabler.model.ThemeModelImpl._load");
            return this.loadedNodes[uri];
         },

         _loadAhead : function(deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.ThemeModelImpl._loadAhead", sync ? "sync" : "async");
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.prefix + "id:collection");
            if (this.strategy) {
               myUrl.addParameter("start", this.getCursorPosition());
               myUrl.addParameter("num", this.strategy.getInterval());
            }
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                  // info on retrieved chunk
                  me.start = me.getCursorPosition();
                  var count = xpathModule.evaluateXPath("atom:feed/app:collection", data, me.ns);
                  if (count && count.length > 0) {
                     me.size = count[0].getAttribute("thr:count");
                  }
                  me.num = me.strategy ? me.strategy.getInterval() : me.size;

                  // theme entries
                  var nodes = xpathModule.evaluateXPath("atom:feed/atom:entry", data, me.ns);
                  if (nodes) {
                     for (var i = 0; i < nodes.length; i++) {
                        var node = new com.ibm.mm.enabler.theme.ThemeImpl(nodes[i]);
                        var id = node.getID();
                        me.entries[me.start + i] = id;
                        me.loadedNodes[id] = node;

                        // callback handling
                        if (deferred && deferred.foreachCallback) {
                           deferred.foreachCallback(node, deferred.foreachCallbackParameters);
                        }
                     }
                     // internal callback handling
                     if (deferred.finishedCallback) {
                        deferred.finishedCallback(null, deferred.finishedCallbackParameters);
                     }
                  }
               }
               else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                  // internal callback handling
                  if (deferred && deferred.errorCallback) {
                     deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                  }
               }
               // public callback handling
               if (deferred && deferred.finishedCallback2) {
                  deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
               }
            });
            debug.exit("com.ibm.mm.enabler.model.ThemeModelImpl._loadAhead");
         }
      });

      // skin model
      declare("com.ibm.mm.enabler.model.SkinModelImpl", [
            com.ibm.mashups.enabler.model.SkinModel,
            com.ibm.mm.enabler.DeferredIteratorImpl
      ], {
         constructor : function(uri, baseUrl) {
            this.prefix = "theme:";
            this.theme = uri;
            this.loadedNodes = {};
            this.entries = [];
            this.cursor = 0;
            this.size = null;
            this.start = null;
            this.num = null;
            this.strategy = null;
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL,
                  nsf.NS_APP,
                  nsf.NS_THR
            ]);
            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
            }
         },

         find : function(uri) {
            return new com.ibm.mm.enabler.DeferredFindImpl(this, uri);
         },

         _find : function(uri, deferred, sync) {
            return this._load(uri, deferred, sync);
         },

         start : function(sync) {
            while (this._hasNext(this, sync)) {
               if (this._next(this, sync)) {
                  continue;
               }
               else {
                  break;
               }
            }
         },

         hasNext : function() {
            return this._hasNext(null, true);
         },

         _hasNext : function(deferred, sync) {
            if (this.start === null || this.cursor < this.start || (this.cursor >= (this.start + this.num) && (this.size > this.cursor))) {
               this._loadAhead(deferred, sync);
            }
            return (this.size > this.cursor);
         },

         next : function() {
            return this._next(null, true);
         },

         _next : function(deferred, sync) {
            return this._hasNext(deferred, sync) ? this.entries[this.cursor++] : null;
         },

         size : function() {
            return this.size;
         },

         setCursorPosition : function(position) {
            this.cursor = position;
         },

         getCursorPosition : function() {
            return this.cursor;
         },

         setStrategy : function(strategy) {
            if (strategy instanceof Array) {
               // evaluate the first strategy only
               this.strategy = strategy[0];
            }
            else {
               // backwards compatibility
               this.strategy = strategy;
            }
         },

         _load : function(uri, deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.ThemeModelImpl._load", uri, sync ? "sync" : "async");
            if (uri in this.loadedNodes) {
               // fetch node from cache
               if (deferred) {
                  // internal callback handling
                  if (deferred.finishedCallback) {
                     deferred.finishedCallback(this.loadedNodes[uri], deferred.finishedCallbackParameters);
                  }
                  // public callback handling
                  if (deferred.finishedCallback2) {
                     deferred.finishedCallback2(this.loadedNodes[uri], com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK, deferred.finishedCallbackParameters2);
                  }
               }
            }
            else {
               // request node from server
               var myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", this.prefix + uri + "@" + this.theme);
               var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               var me = this;
               serviceReq.read(function(type, data, xhr, args) {
                  if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                     var expr = "atom:feed/atom:entry[atom:id='" + me.prefix + uri + "@" + me.theme + "']";
                     var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
                     if (nodes && nodes.length > 0) {
                        me.loadedNodes[uri] = new com.ibm.mm.enabler.theme.SkinImpl(nodes[0]);
                        // internal callback handling
                        if (deferred && deferred.finishedCallback) {
                           deferred.finishedCallback(me.loadedNodes[uri], deferred.finishedCallbackParameters);
                        }
                     }
                  }
                  else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                     // internal callback handling
                     if (deferred && deferred.errorCallback) {
                        deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                     }
                  }
                  // public callback handling
                  if (deferred && deferred.finishedCallback2) {
                     deferred.finishedCallback2(me.loadedNodes[uri] || null, xhr.status, deferred.finishedCallbackParameters2);
                  }
               });
            }
            debug.exit("com.ibm.mm.enabler.model.ThemeModelImpl._load");
            return this.loadedNodes[uri];
         },

         _loadAhead : function(deferred, sync) {
            debug.entry("com.ibm.mm.enabler.model.SkinModelImpl._loadAhead", sync ? "sync" : "async");
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.prefix + "id:collection" + "@" + this.theme);
            if (this.strategy) {
               myUrl.addParameter("start", this.getCursorPosition());
               myUrl.addParameter("num", this.strategy.getInterval());
            }
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                  // info on retrieved chunk
                  me.start = me.getCursorPosition();
                  var count = xpathModule.evaluateXPath("atom:feed/app:collection", data, me.ns);
                  if (count && count.length > 0) {
                     me.size = count[0].getAttribute("thr:count");
                  }
                  me.num = me.strategy ? me.strategy.getInterval() : me.size;

                  // theme entries
                  var nodes = xpathModule.evaluateXPath("atom:feed/atom:entry", data, me.ns);
                  if (nodes) {
                     for (var i = 0; i < nodes.length; i++) {
                        var node = new com.ibm.mm.enabler.theme.SkinImpl(nodes[i]);
                        me.entries[me.start + i] = node;
                        me.loadedNodes[node.getID()] = node;

                        // callback handling
                        if (deferred && deferred.foreachCallback) {
                           deferred.foreachCallback(node, deferred.foreachCallbackParameters);
                        }
                     }
                     // internal callback handling
                     if (deferred && deferred.finishedCallback) {
                        deferred.finishedCallback(null, deferred.finishedCallbackParameters);
                     }
                  }
               }
               else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                  // internal callback handling
                  if (deferred && deferred.errorCallback) {
                     deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                  }
               }
               // public callback handling
               if (deferred && deferred.finishedCallback2) {
                  deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
               }
            });
            debug.exit("com.ibm.mm.enabler.model.SkinModelImpl._loadAhead");
         }
      });

      // theme
      declare("com.ibm.mm.enabler.theme.ThemeImpl", [
            com.ibm.mashups.enabler.theme.Theme,
            com.ibm.mm.enabler.IdentifiableImpl,
            com.ibm.mm.enabler.LocalizedImpl
      ], {
         constructor : function(node) {
            this.xmlData = node;
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL
            ]);
         },

         getName : function() {
            var nodes = xpathModule.evaluateXPath("atom:title", this.xmlData, this.ns);
            return (nodes && nodes.length > 0) ? com.ibm.mm.enabler.dom.textContent(nodes[0]) : null;
         },

         getBaseUrl : function() {
            var nodes = xpathModule.evaluateXPath("atom:content/model:theme/model:link[@model:rel='baseUrl']", this.xmlData, this.ns);
            return (nodes && nodes.length > 0) ? nodes[0].getAttribute("model:href") : null;
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         }
      });

      // skin
      declare("com.ibm.mm.enabler.theme.SkinImpl", [
            com.ibm.mashups.enabler.theme.Skin,
            com.ibm.mm.enabler.IdentifiableImpl,
            com.ibm.mm.enabler.LocalizedImpl
      ], {
         constructor : function(node) {
            this.xmlData = node;
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL
            ]);
         },

         getName : function() {
            var nodes = xpathModule.evaluateXPath("atom:title", this.xmlData, this.ns);
            return (nodes && nodes.length > 0) ? com.ibm.mm.enabler.dom.textContent(nodes[0]) : null;
         },

         getBaseUrl : function() {
            var nodes = xpathModule.evaluateXPath("atom:content/model:skin/model:link[@model:rel='baseUrl']", this.xmlData, this.ns);
            return (nodes && nodes.length > 0) ? nodes[0].getAttribute("model:href") : null;
         },

         getPreviewUrl : function() {
            var nodes = xpathModule.evaluateXPath("atom:content/model:skin/model:link[@model:rel='previewUrl']", this.xmlData, this.ns);
            return (nodes && nodes.length > 0) ? nodes[0].getAttribute("model:href") : null;
         },

         toString : function() {
            return com.ibm.mm.enabler.dom.innerXML(this.xmlData);
         }
      });

      // community model
      declare("com.ibm.mm.enabler.model.CommunityModelImpl",
         com.ibm.mashups.enabler.ListModel,
         {
            constructor : function(baseUrl) {
               this.root = null;
               this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                     + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
               this.prefix = "community:";
               this.loadedNodes = {};
               this.createdNodes = {};
               this.deletedNodes = {};
               this.entries = [];
               this.cursor = 0;
               this.start = null;
               this.num = null;
               this.size = 9999; // assume a high size until we know the real
               // size
               var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
               this.ns = nsf.getNameSpaces([
                     nsf.NS_ATOM,
                     nsf.NS_MODEL
               ]);
               this.modelMessages = i18nmodelMessages;
               this.um = com.ibm.mashups.enabler.model.Factory.getUserModel();
               if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
                  this.url = baseUrl + this.url;
               }
            },

            find : function(id) {
               return new com.ibm.mm.enabler.DeferredFindImpl(this, id);
            },

            _find : function(id, deferred, sync) {
               debug.entry("com.ibm.mm.enabler.model.CommunityModelImpl._find", id, sync ? "sync" : "async");
               if (id in this.deletedNodes) {
                  // handle callback
                  if (deferred) {
                     // internal callback handling
                     if (deferred.errorCallback) {
                        deferred.errorCallback(com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.errorCallbackParameters);
                     }
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(null, com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND, deferred.finishedCallbackParameters2);
                     }
                  }
                  return null;
               }

               if (id in this.loadedNodes) {
                  // fetch node from cache
                  if (deferred) {
                     // internal callback handling
                     if (deferred.finishedCallback) {
                        deferred.finishedCallback(this.loadedNodes[id], deferred.finishedCallbackParameters);
                     }
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred
                              .finishedCallback2(this.loadedNodes[id], com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK, deferred.finishedCallbackParameters2);
                     }
                  }
                  return this.loadedNodes[id];
               }

               var myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", this.prefix + "id:" + id + "&mode=full");
               var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               var entry = null;
               var me = this;
               var result = {};
               serviceReq.read(function(type, data, xhr, args) {
                  var expr = "atom:feed/atom:entry";
                  var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
                  var newentry = new com.ibm.mm.enabler.community.CommunityImpl(nodes[0], me.um);
                  me.newid = newentry.getID();
                  me.loadedNodes[me.newid] = newentry;

                  // handle callback
                  if (deferred) {
                     // internal callback handling
                     if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                        if (deferred.finishedCallback) {
                           deferred.finishedCallback(me.entry, deferred.finishedCallbackParameters);
                        }
                     }
                     else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                        if (deferred.errorCallback) {
                           deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                        }
                     }
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(me.loadedNodes[me.newid] || null, xhr.status, deferred.finishedCallbackParameters2);
                     }
                  }
                  // handle error in sync call
                  if (sync && type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                     // do not expose HTTP_NOT_FOUND; simply return null in this
                     // case
                     if (xhr.status != com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_NOT_FOUND) {
                        result.status = xhr.status;
                     }
                  }
               });
               if (result.status) {
                  throw new Error(string.substitute(me.modelMessages.E_COMNODE_NOTFOUND_1, [
                        id,
                        result.status
                  ]));
               }
               debug.exit("com.ibm.mm.enabler.model.CommunityModelImpl._find");
               return this.loadedNodes[this.newid];
            },

            create : function(context) {
               if (!context || !context.linkedResource) {
                  throw new Error(this.modelMessages.E_NODE_ISNULL_0);
               }
               var linkedNode = context.linkedResource;
               var newcommunity = new com.ibm.mm.enabler.community.CommunityImpl(null);
               newcommunity.setLinkedResource(linkedNode);
               return newcommunity;
            },

            insert : function(node, nextNode) {
               this.createdNodes[node.getLinkedResource().getID()] = node;
            },

            commit : function() {
               return new com.ibm.mm.enabler.DeferredCommitImpl(this).start(); // TODO:
               // make
               // fully
               // deferred
            },

            _commit : function(deferred, sync) {
               debug.entry("com.ibm.mm.enabler.model.CommunityModelImpl._commit", sync ? "sync" : "async");
               // initialize callback handling
               this.statusCode = com.ibm.mm.enabler.model.HttpStatusCodes.HTTP_OK;
               this.requestCount = 0;
               this._acquire();
               // HTTP PUT modified nodes
               for (communityID in this.loadedNodes) {
                  var community = this.loadedNodes[communityID];
                  if (community.isModified()) {
                     var participants = community.getParticipants();
                     var time = new Date();
                     var userFeed = '<?xml version="1.0" encoding="UTF-8"?>\n'
                           + '<atom:feed xmlns:atom="http://www.w3.org/2005/Atom" xmlns:model="http://www.ibm.com/xmlns/prod/lotus/mashups/v0.1/community-model">\n'
                           + '<atom:title>HCL Lotus Mashups Community Feed</atom:title>\n' + '<atom:id>' + 'community:' + 'id:' + community.getID()
                           + '</atom:id>\n' + '<atom:updated>' + time.toGMTString() + '</atom:updated>\n';
                     for (var i = 0; i < participants.length; i++) {
                        if (participants[i] !== undefined) {
                           userFeed += '<atom:entry>\n' + '<atom:content type="application/xml">\n' + '<model:participant id="'
                                 + participants[i].getUser().getID() + '" access-level="' + participants[i].getAccessLevelString() + '" entity-type="'
                                 + participants[i].getUser().getEntityType() + '"/>\n' + '</atom:content>\n' + '</atom:entry>\n';
                        }
                     }
                     userFeed += '</atom:feed>';

                     var myUrl = new utilities.HttpUrl(this.url);
                     myUrl.addParameter("uri", this.prefix + "id:" + community.getID() + "&mode=full&update=replace");
                     var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
                     var me = this;
                     var categories = null;
                     this._acquire();
                     serviceReq.update(userFeed, function(type, data, xhr, args) {
                        // public callback handling
                        if (deferred && deferred.operationCallback) {
                           deferred.operationCallback(community,
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_MODIFY,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           // internal callback handling
                           if (deferred && deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                        me._release(deferred, xhr.status);
                     });
                     community.setModified(false);
                  }
               }

               // HTTP POST created nodes
               for (id in this.createdNodes) {
                  var pageId = id;
                  var entry = '<atom:entry>\n' + '  <atom:id>community:cid:unused</atom:id>\n' + '  <model:linked-resource ref="nm:id:' + pageId
                        + '" href="?uri=nm:id:' + pageId + '" model:type="page"/>\n' + '</atom:entry>\n';
                  var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
                  var communityEntry = com.ibm.mm.enabler.model.Utils.createFeed("community:cid:unused", "HCL Lotus Mashups Community Feed", entry, nsf
                        .getNameSpaces([
                              nsf.NS_ATOM,
                              nsf.NS_XHTML,
                              nsf.NS_COMMUNITY,
                              nsf.NS_THR,
                              nsf.NS_MODEL,
                              nsf.NS_APP
                        ]));
                  var myUrl = new utilities.HttpUrl(this.url);
                  myUrl.addParameter("uri", this.prefix + "collection&mode=full");
                  var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
                  var me = this;
                  var categories = null;
                  this._acquire();
                  serviceReq.create(communityEntry, function(type, data, xhr, args) {
                     var expr = "atom:feed/atom:entry";
                     var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
                     var newentry = new com.ibm.mm.enabler.community.CommunityImpl(nodes[0], me.um);
                     me.newid = newentry.getID();
                     me.loadedNodes[me.newid] = newentry;
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(newentry,
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_CREATE,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                           if (deferred.finishedCallback) {
                              deferred.finishedCallback(newentry, deferred.finishedCallbackParameters);
                           }
                        }
                        else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     me._release(deferred, xhr.status);
                  });
                  var oldCommunity = this.createdNodes[id];
                  var linkedNode = oldCommunity.getLinkedResource();
                  var pos = me.newid.indexOf(":"); // strip off "id:"
                  var id = me.newid.slice(pos + 1);
                  linkedNode.setCommunity(id);
               }
               this.createdNodes = {};

               // HTTP DELETE deleted nodes
               for (id in this.deletedNodes) {
                  var myUrl = new utilities.HttpUrl(this.url);
                  myUrl.addParameter("uri", this.prefix + "id:" + id);
                  var me = this;
                  var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
                  this._acquire();
                  serviceReq.remove(function(type, data, xhr, args) {
                     if (deferred) {
                        // public callback handling
                        if (deferred.operationCallback) {
                           deferred.operationCallback(newentry,
                              com.ibm.mashups.enabler.DeferredOperation.OPERATION_DELETE,
                              xhr.status,
                              deferred.operationCallbackParameters);
                        }
                        // internal callback handling
                        if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                     me._release(deferred, xhr.status);
                  });
               }
               this.deletedNodes = {};

               // the finishedCallback must trigger only after releasing the
               // initial 'acquire'
               this._release(deferred, 0);

               // finished callback
               if (deferred && deferred.finishedCallback) {
                  deferred.finishedCallback(null, deferred.finishedCallbackParameters);
               }
               debug.exit("com.ibm.mm.enabler.model.CommunityModelImpl._commit");
            },

            // acquire semaphore
            _acquire : function() {
               this.requestCount++;
            },

            // release semaphore
            _release : function(deferred, statusCode) {
               // set overall status Code
               this.statusCode = Math.max(parseInt(statusCode, 10), this.statusCode);
               // check for full release
               this.requestCount--;
               if (this.requestCount <= 0) {
                  if (deferred && deferred.finishedCallback2) {
                     deferred.finishedCallback2(null, this.statusCode, deferred.finishedCallbackParameters2);
                  }
               }
            },

            remove : function(node) {
               debug.entry("com.ibm.mm.enabler.model.CommunityModelImpl.remove", node.getID());
               var id = node.getID();
               // mark node as deleted
               if (!(id in this.deletedNodes)) {
                  this.deletedNodes[id] = null;
               }
               // mark cache entry
               if (id in this.loadedNodes) {
                  delete this.loadedNodes[id];
               }
               debug.exit("com.ibm.mm.enabler.model.CommunityModelImpl.remove", node.getID());
            },

            start : function(sync) {
               while (this._hasNext(this, sync)) {
                  if (this._next(this, sync)) {
                     continue;
                  }
                  else {
                     break;
                  }
               }
            },

            hasNext : function() {
               return this._hasNext(null, true);
            },

            _hasNext : function(deferred, sync) {
               if (this.start === null || this.cursor < this.start || (this.cursor >= (this.start + this.num) && (this.size > this.cursor))) {
                  this._loadAhead(deferred, sync);
               }
               return (this.size > this.cursor);
            },

            next : function() {
               return this._next(null, true);
            },

            _next : function(deferred, sync) {
               return this._hasNext(deferred, sync) ? this.loadedNodes[this.entries[this.cursor++]] : null;
            },

            size : function() {
               return this.size;
            },

            setCursorPosition : function(position) {
               this.cursor = position;
            },

            getCursorPosition : function() {
               return this.cursor;
            },

            _loadAhead : function(deferred, sync) {
               debug.entry("com.ibm.mm.enabler.model.CommunityModelImpl._loadAhead", sync ? "sync" : "async");
               var myUrl = new utilities.HttpUrl(this.url);
               myUrl.addParameter("uri", "community:collection");
               myUrl.addParameter("mode", "full");

               var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, sync);
               var me = this;
               var entries = this.entries;
               var tempSize = 0;
               var model = this.model;

               serviceReq.read(function(type, data, xhr, args) {
                  var expr = "atom:feed/atom:entry";
                  var nodes = xpathModule.evaluateXPath(expr, data, me.ns);
                  tempSize = nodes.length;
                  me.start = me.getCursorPosition();
                  for (var i = 0; i < nodes.length; ++i) {
                     var node = new com.ibm.mm.enabler.community.CommunityImpl(nodes[i], me.um);
                     me.entries[i] = node.getID();
                     me.loadedNodes[node.getID()] = node;
                     me.num = me.size;
                     // callback handling
                     if (deferred) {
                        if (type == ModelRestServiceRequest.XHR_STATUS_LOAD) {
                           if (deferred.foreachCallback) {
                              deferred.foreachCallback(node, deferred.foreachCallbackParameters);
                           }
                        }
                        else if (type == ModelRestServiceRequest.XHR_STATUS_ERROR) {
                           if (deferred.errorCallback) {
                              deferred.errorCallback(xhr.status, deferred.errorCallbackParameters);
                           }
                        }
                     }
                  }
                  if (deferred) {
                     // public callback handling
                     if (deferred.finishedCallback2) {
                        deferred.finishedCallback2(null, xhr.status, deferred.finishedCallbackParameters2);
                     }
                     // internal callback handling
                     if (deferred.finishedCallback) {
                        deferred.finishedCallback(null, deferred.finishedCallbackParameters);
                     }
                  }
               });
               this.size = this.cursor + tempSize;
               debug.exit("com.ibm.mm.enabler.model.CommunityModelImpl._loadAhead");
            }
         });

      // Community
      declare("com.ibm.mm.enabler.community.CommunityImpl", com.ibm.mm.enabler.IdentifiableImpl, {
         constructor : function(data, usermodel, baseUrl) {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_THR,
                  nsf.NS_NM,
                  nsf.NS_MODEL,
                  nsf.NS_BASE,
                  nsf.NS_APP,
                  nsf.NS_XML
            ]);
            this.baseUrl = "";
            this.url = com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
                  + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE);
            this.modified = false;
            this.xmlData = data;
            if (data === null) {
               // Creating a new community
               return;
            }

            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
               this.baseUrl = baseUrl;
            }
            this.entries = xpathModule.evaluateXPath("atom:content/model:community/model:participant", this.xmlData, this.ns);
            this.um = usermodel;

            this.participants = {};
            for (var i = 0; i < this.entries.length; i++) {
               var participantXml = this.entries[i];
               var entityId = participantXml.getAttribute("id");
               var entityType = participantXml.getAttribute("entity-type");

               this.participants[entityId] = new com.ibm.mm.enabler.community.ParticipantImpl();
               // Defer user lookup
               this.participants[entityId].setUserID(entityId);
               this.participants[entityId].setType(entityType);
               this.participants[entityId].setUserModel(this.um);

               var access = participantXml.getAttribute("access-level");
               var intAccess = com.ibm.mashups.enabler.AccessLevel.VIEW;
               if (access == "personalize") {
                  intAccess = com.ibm.mashups.enabler.AccessLevel.PERSONALIZE;
               }
               if (access == "edit") {
                  intAccess = com.ibm.mashups.enabler.AccessLevel.EDIT;
               }
               this.participants[entityId].setAccessLevel(intAccess);
            }

            var expr = "atom:content/model:community/model:owner";
            var results = xpathModule.evaluateXPath(expr, this.xmlData, this.ns);
            this.ownerId = com.ibm.mm.enabler.dom.textContent(results[0]);
         },

         getParticipants : function() {
            var results = [];
            for (participantID in this.participants) {
               results.push(this.participants[participantID]);
            }
            return results;
         },

         addParticipant : function(/* Entity */user, /* AccessLevel */accessLevel) {
            var users = [];
            users[0] = users;
            addParticipants(users, accessLevel);
         },

         addParticipants : function(/* Entity[] */users, /* AccessLevel */accessLevel) {
            for (var i = 0; i < users.length; i++) {
               var newParticipant = new com.ibm.mm.enabler.community.ParticipantImpl();
               newParticipant.setUser(users[i]);
               newParticipant.setAccessLevel(accessLevel);
               this.participants[users[i].getID()] = newParticipant;
            }
            this.modified = true;
         },

         removeParticipant : function(/* Entity */user) {
            var users = [];
            user[0] = user;
            removeParticipants(users);
         },

         removeParticipants : function(/* Entity[] */users) {
            for (var i = 0; i < users.length; i++) {
               delete this.participants[users[i].getID()];
            }
            this.modified = true;
         },

         isMember : function(/* Entity[] */user) {
            if (this.participants[user.getID()] !== undefined) {
               return true;
            }
            return false;
         },

         getOwner : function() {
            if (this.owner === undefined || this.owner === null) {
               if (this.ownerId != "null") {
                  this.owner = this.um.find(this.ownerId);
               }
               else {
                  this.owner = this.um.findCurrentUser();
               }
            }
            return this.owner;
         },

         getLinkedResource : function() {
            return this.linkedResource;
         },

         setLinkedResource : function(/* Node */node) {
            this.linkedResource = node;
            this.modified = true;
         },

         isModified : function() {
            return this.modified;
         },

         setModified : function(/* boolean */ismodified) {
            this.modified = ismodified;
         }
      });

      // why do we need this here ?
      com.ibm.mashups.enabler.AccessLevel = {
         VIEW : 0,
         PERSONALIZE : 1,
         EDIT : 2
      };

      declare("com.ibm.mm.enabler.community.ParticipantImpl", com.ibm.mashups.enabler.community.Participant, {
         constructor : function() {},

         // Setters for deferred entity lookup
         setUserID : function(userID) {
            this.userID = userID;
         },
         setType : function(entityType) {
            this.entityType = entityType;
         },
         setUserModel : function(um) {
            this.um = um;
         },

         setUser : function(/* Entity */user) {
            this.user = user;
         },

         getUser : function() {
            if (this.user === undefined || this.userAgent === null) {
               if (this.entityType == "user") {
                  this.user = this.um.find(this.userID);
               }
               else {
                  this.user = this.um.findGroupByID(this.userID);
               }
            }

            return this.user;
         },

         setAccessLevel : function(/* int */accessLevel) {
            this.accessLevel = accessLevel;
         },

         getAccessLevelString : function() {
            if (this.accessLevel == com.ibm.mashups.enabler.AccessLevel.VIEW) {
               return "view";
            }
            else if (this.accessLevel == com.ibm.mashups.enabler.AccessLevel.PERSONALIZE) {
               return "personalize";
            }
            else if (this.accessLevel == com.ibm.mashups.enabler.AccessLevel.EDIT) {
               return "edit";
            }
            else {
               return "undefined";
            }
         },

         getAccessLevel : function() {
            return this.accessLevel;
         }
      });
      // config object for user model
      com.ibm.mm.enabler.model.UserModel.iConfig = {

         url : com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTEXT_ROOT_MAIN)
               + com.ibm.mm.enabler.services.CONFIG_SERVICE.getValue(com.ibm.mm.enabler.services.CONFIG_SERVICE.CONTENTHANDLER_PRIVATE),
         currentUserUri : "um:currentuser:profile",
         userUri : "um:users:profiles",
         groupUri : "um:groups:profiles",
         userAttributesUri : "um:attributes:users",
         groupAttributesUri : "um:attributes:groups",
         xpathSingleEntry : "/atom:feed/atom:entry",
         xpathMultipleEntry : "/atom:feed/atom:entry"
      /*
       * optionally we can provide getID or any other method here to override
       * things - this is a temporary solution
       */
      };
      // User Model
      declare("com.ibm.mm.enabler.model.UserModelImpl", com.ibm.mashups.enabler.ListModel, {
         constructor : function(baseUrl) {
            this.root = null;
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_UM
            ]);
            this.currentUser = null;

            // merge the configuration parameters defined in 'iConfig' with this
            // class.
            langModule.mixin(this, com.ibm.mm.enabler.model.UserModel.iConfig);

            if ((typeof (baseUrl) != "undefined") && (baseUrl !== null)) {
               this.url = baseUrl + this.url;
            }
         },

         find : function(/* String */id) {
            debug.entry("com.ibm.mm.enabler.model.UserModelImpl.find", id);
            if (this.currentUser !== null && this.currentUser.getID() == id) {
               return this.currentUser;
            }

            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.userUri + ":" + id + "&expandRefs=true");
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var me = this;
            me.entry = null;
            serviceReq.read(function(type, data, xhr, args) {
               var userXmls = xpathModule.evaluateXPath(me.xpathSingleEntry, data, me.ns);
               if (userXmls[0] !== null) {
                  var user = new com.ibm.mm.enabler.user.UserImpl(userXmls[0]);
                  me.entry = user;
               }
            });
            debug.exit("com.ibm.mm.enabler.model.UserModelImpl.find");
            return me.entry;
         },

         findUsersByAttribute : function(/* String */attributeName, /* String */attributeValue) {
            debug.entry("com.ibm.mm.enabler.model.UserModelImpl.findUsersByAttribute", attributeName, attributeValue);
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.userUri + "&expandRefs=true&searchAttributes=" + attributeName + "=" + encodeURIComponent(attributeValue));
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var entry = null;
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               var userXmls = xpathModule.evaluateXPath(me.xpathMultipleEntry, data, me.ns);
               var users = [];
               for (var i = 0; i < userXmls.length; i++) {
                  var user = new com.ibm.mm.enabler.user.UserImpl(userXmls[i]);
                  users.push(user);
               }
               me.entry = users;
            });
            debug.exit("com.ibm.mm.enabler.model.UserModelImpl.findUsersByAttribute");
            return me.entry;
         },

         findGroupByID : function(/* String */id) {
            debug.entry("com.ibm.mm.enabler.model.UserModelImpl.findGroupByID", id);
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.groupUri + ":" + id + "&expandRefs=true");
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var me = this;
            me.entry = null;
            serviceReq.read(function(type, data, xhr, args) {
               var groupXmls = xpathModule.evaluateXPath(me.xpathSingleEntry, data, me.ns);
               if (groupXmls[0] !== null) {
                  var group = new com.ibm.mm.enabler.user.GroupImpl(groupXmls[0]);
                  me.entry = group;
               }
            });
            debug.exit("com.ibm.mm.enabler.model.UserModelImpl.findGroupByID");
            return me.entry;
         },

         findGroupsByAttribute : function(/* String */attributeName, /* String */attributeValue) {
            debug.entry("com.ibm.mm.enabler.model.UserModelImpl.findGroupByID", attributeName, attributeValue);
            var myUrl = new utilities.HttpUrl(this.url);
            // myUrl.addParameter("uri",
            // "um:groups:profiles&expandRefs=true&searchAttributes="+attributeName+"="+attributeValue);
            myUrl.addParameter("uri", this.groupUri + "&expandRefs=true&searchAttributes=" + attributeName + "=" + encodeURIComponent(attributeValue));
            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var entry = null;
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               var groupXmls = xpathModule.evaluateXPath(me.xpathMultipleEntry, data, me.ns);
               var groups = [];
               for (var i = 0; i < groupXmls.length; i++) {
                  var group = new com.ibm.mm.enabler.user.GroupImpl(groupXmls[i]);
                  groups.push(group);
               }
               me.entry = groups;
            });
            debug.exit("com.ibm.mm.enabler.model.UserModelImpl.findGroupByID");
            return me.entry;
         },

         findCurrentUser : function() {
            debug.entry("com.ibm.mm.enabler.model.UserModelImpl.findCurrentUser");
            if (this.currentUser !== null) {
               return this.currentUser;
            }

            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.currentUserUri + "&expandRefs=true");

            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               var userXmls = xpathModule.evaluateXPath(me.xpathSingleEntry, data, me.ns);
               if (userXmls[0] !== null) {
                  var user = new com.ibm.mm.enabler.user.UserImpl(userXmls[0]);
                  me.currentUser = user;
               }
            });
            debug.exit("com.ibm.mm.enabler.model.UserModelImpl.findCurrentUser");
            return me.currentUser;
         },

         findGroupAttributes : function() {
            debug.entry("com.ibm.mm.enabler.model.UserModelImpl.findGroupAttributes");
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.groupAttributesUri + "&expandRefs=true");

            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var entry = null;
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               var attributeXmls = xpathModule.evaluateXPath(me.xpathMultipleEntry, data, me.ns);
               var attributes = [];
               for (var i = 0; i < attributeXmls.length; i++) {
                  var attribute = new com.ibm.mm.enabler.user.AttributeImpl(attributeXmls[i]);
                  attributes.push(attribute);
               }
               me.entry = attributes;
            });
            debug.exit("com.ibm.mm.enabler.model.UserModelImpl.findGroupAttributes");
            return me.entry;
         },

         findUserAttributes : function() {
            debug.entry("com.ibm.mm.enabler.model.UserModelImpl.findUserAttributes");
            var myUrl = new utilities.HttpUrl(this.url);
            myUrl.addParameter("uri", this.userAttributesUri + "&expandRefs=true");

            var serviceReq = new ModelRestServiceRequest(myUrl, null, null, false, true);
            var entry = null;
            var me = this;
            serviceReq.read(function(type, data, xhr, args) {
               var attributeXmls = xpathModule.evaluateXPath(me.xpathMultipleEntry, data, me.ns);
               var attributes = [];
               for (var i = 0; i < attributeXmls.length; i++) {
                  var attribute = new com.ibm.mm.enabler.user.AttributeImpl(attributeXmls[i]);
                  attributes.push(attribute);
               }
               me.entry = attributes;
            });
            debug.exit("com.ibm.mm.enabler.model.UserModelImpl.findUserAttributes");
            return me.entry;
         }
      });

      // Entity
      declare("com.ibm.mm.enabler.user.EntityImpl", com.ibm.mm.enabler.IdentifiableImpl, {
      // UserImpl and GroupImpl provide their own getLoginName(), getCN(), and
      // getID()
      });

      // User
      declare("com.ibm.mm.enabler.user.UserImpl", com.ibm.mm.enabler.user.EntityImpl, {
         constructor : function(data) {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_UM
            ]);
            this.xmlData = data;
         },

         getAttribute : function(attName) {
            if (typeof attName == "undefined" || attName === null) {
               return null;
            }
            var expr = "atom:content/um:profile/um:attribute[@name='" + attName + "']/um:attributeValue";
            var xmlResult = xpathModule.evaluateXPath(expr, this.xmlData, this.ns);
            if (xmlResult.length === 0) {
               return null;
            }
            var attValue = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            return attValue;
         },

         getAttributeNames : function() {
            if (typeof this.attNames != "undefined" && this.attNames !== null) {
               return this.attNames;
            }
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute", this.xmlData, this.ns);
            if (xmlResult.length === 0) {
               return null;
            }
            this.attNames = [];
            for (var i = 0; i < xmlResult.length; i++) {
               var aNode = xmlResult[i];
               var aName = aNode.getAttribute("name");
               if (typeof aName != "undefined" && aName !== null && aName !== "") {
                  this.attNames.push(aName);
               }
            }
            return this.attNames;
         },

         getID : function() {
            var nodes = xpathModule.evaluateXPath("atom:id", this.xmlData, this.ns);
            if ((nodes === null) || (nodes.length === 0)) {
               return null;
            }

            var fullID = com.ibm.mm.enabler.dom.textContent(nodes[0]);
            if ((fullID === null) || (fullID.length === 0)) {
               return null;
            }
            if (com.ibm.mm.enabler.model.UserModel.iConfig.getID) {
               return com.ibm.mm.enabler.model.UserModel.iConfig.getID(fullID);
            }
            // strip off extra details
            var pos = fullID.indexOf("profiles:");
            var id = fullID.slice(pos + "profiles:".length);
            pos = id.indexOf("%");
            id = id.slice(0, pos);
            return id;
         },

         getLoginName : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='principalName']/um:attributeValue", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return null;
            }
            var principalName = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            return principalName;

         },

         getSN : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='sn']/um:attributeValue", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return null;
            }
            var sn = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            return sn;
         },

         getCN : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='cn']/um:attributeValue", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return null;
            }
            var cn = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            return cn;
         },

         // TODO: add email to feed
         getEmail : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='email']/um:attributeValue", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='mail']/um:attributeValue", this.xmlData, this.ns);
               if ((xmlResult === null) || (xmlResult.length === 0)) {
                  return null;
               }
            }
            var email = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            return email;
         },

         getDisplayName : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='displayName']/um:attributeValue", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return this.getCN();
            }
            var displayName = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            if ((displayName === null) || (displayName.length === 0)) {
               displayName = this.getCN();
            }

            return displayName;
         },

         getEntityType : function() {
            return "user";
         }
      });

      // Group
      declare("com.ibm.mm.enabler.user.GroupImpl", com.ibm.mm.enabler.user.EntityImpl, {
         constructor : function(data) {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_UM
            ]);
            this.xmlData = data;
         },

         getID : function() {
            var nodes = xpathModule.evaluateXPath("atom:id", this.xmlData, this.ns);
            if ((nodes === null) || (nodes.length === 0)) {
               return null;
            }

            var fullID = com.ibm.mm.enabler.dom.textContent(nodes[0]);
            if ((fullID === null) || (fullID.length === 0)) {
               return null;
            }

            if (com.ibm.mm.enabler.model.UserModel.iConfig.getID) {
               return com.ibm.mm.enabler.model.UserModel.iConfig.getID(fullID);
            }
            // strip off extra details
            var pos = fullID.indexOf("profiles:");
            var id = fullID.slice(pos + "profiles:".length);
            pos = id.indexOf("%");
            id = id.slice(0, pos);
            return id;
         },

         getCN : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='cn']/um:attributeValue", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return null;
            }
            var cn = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            return cn;
         },

         getDisplayName : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:profile/um:attribute[@name='displayName']/um:attributeValue", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return this.getCN();
            }
            var displayName = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            if ((displayName === null) || (displayName.length === 0)) {
               displayName = this.getCN();
            }

            return displayName;
         },

         getEntityType : function() {
            return "group";
         }
      });

      // Attribute
      declare("com.ibm.mm.enabler.user.AttributeImpl", null, {
         constructor : function(data) {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_UM
            ]);
            this.xmlData = data;
         },

         getName : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:title", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return null;
            }

            var name = com.ibm.mm.enabler.dom.textContent(xmlResult[0]);
            return name;
         },

         getType : function() {
            var xmlResult = xpathModule.evaluateXPath("atom:content/um:attribute", this.xmlData, this.ns);
            if ((xmlResult === null) || (xmlResult.length === 0)) {
               return null;
            }
            return xmlResult[0].getAttribute("type");
         }
      });

      // public factory; all getters create a new instance of the respective
      // model
      declare("com.ibm.mm.enabler.model.FactoryImpl", null, {
         constructor : function() {},

         getCatalogCategoryModel : function() {
            return new com.ibm.mm.enabler.model.CatalogCategoryModelImpl();
         },

         getNavigationModel : function() {
            return new com.ibm.mm.enabler.model.NavigationModelImpl();
         },

         getThemeModel : function() {
            return new com.ibm.mm.enabler.model.ThemeModelImpl();
         },

         // getPreferenceModel: function(user) {
         // return new com.ibm.mm.enabler.model.PreferenceModelImpl(user);
         // },

         getCommunityModel : function() {
            return new com.ibm.mm.enabler.model.CommunityModelImpl();
         },

         getUserModel : function() {
            return new com.ibm.mm.enabler.model.UserModelImpl();
         }
      });

      // internal factory
      declare("com.ibm.mm.enabler.model.ExtendedFactoryImpl", null, {
         constructor : function() {},

         getCatalogCategoryModel : function(baseUrl) {
            return new com.ibm.mm.enabler.model.CatalogCategoryModelImpl(baseUrl);
         },

         getNavigationModel : function(baseUrl) {
            return new com.ibm.mm.enabler.model.NavigationModelImpl(baseUrl);
         },

         getThemeModel : function(baseUrl) {
            return new com.ibm.mm.enabler.model.ThemeModelImpl(baseUrl);
         },

         // getPreferenceModel: function(user, baseUrl) {
         // return new com.ibm.mm.enabler.model.PreferenceModelImpl(user,
         // baseUrl);
         // },

         getCommunityModel : function(baseUrl) {
            return new com.ibm.mm.enabler.model.CommunityModelImpl(baseUrl);
         },

         getUserModel : function(baseUrl) {
            return new com.ibm.mm.enabler.model.UserModelImpl(baseUrl);
         }
      });

      // internal factory
      declare("com.ibm.mm.enabler.model.NavigationNodeFactoryImpl", null, {
         constructor : function() {
            var nsf = com.ibm.mm.enabler.model.NameSpaceFactory;
            this.ns = nsf.getNameSpaces([
                  nsf.NS_ATOM,
                  nsf.NS_MODEL
            ]);
         },

         createNavigationNode : function(xmlData) {
            var result = null;
            var navNodeExpr = "atom:content/model:navigation-node";
            var navNode = xpathModule.evaluateXPath(navNodeExpr, xmlData, this.ns);
            var type;
            if (navNode && (navNode.length > 0)) {
               type = navNode[0].getAttribute("type");
            }
            if (type) {
               if (type == "shared-node") {
                  result = new com.ibm.mm.enabler.navigation.SharedNavigationNodeImpl(xmlData);
               }
               else if (type == "shared-root") {
                  result = new com.ibm.mm.enabler.navigation.SharedNavigationRootImpl(xmlData);
               }
            }
            if (!result) {
               result = new com.ibm.mm.enabler.navigation.NavigationNodeImpl(xmlData);
            }
            return result;
         }
      });

      // internal factory
      declare("com.ibm.mm.enabler.model.NameSpaceFactoryImpl", null, {
         constructor : function() {
            // name space prefixes
            this.NS_APP = "app";
            this.NS_ATOM = "atom";
            this.NS_BASE = "base";
            this.NS_CATALOG = "catalog";
            this.NS_COMMUNITY = "community";
            this.NS_MODEL = "model";
            this.NS_NM = "nm";
            this.NS_PORTAL = "portal";
            this.NS_THR = "thr";
            this.NS_UM = "um";
            this.NS_XHTML = "xhtml";
            this.NS_XML = "xml";
            this.NS_XSI = "xsi";
            // name space URIs
            this.namespaces = {};
            this.namespaces[this.NS_APP] = "http://www.w3.org/2007/app";
            this.namespaces[this.NS_ATOM] = "http://www.w3.org/2005/Atom";
            this.namespaces[this.NS_BASE] = "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/base";
            this.namespaces[this.NS_CATALOG] = "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/catalog-model";
            this.namespaces[this.NS_COMMUNITY] = "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/community-model";
            this.namespaces[this.NS_MODEL] = "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/model-elements";
            this.namespaces[this.NS_NM] = "http://www.ibm.com/xmlns/prod/lotus/mashups/v1.0/navigation-model";
            this.namespaces[this.NS_PORTAL] = "http://www.ibm.com/xmlns/prod/websphere/portal/v6.0.1/portal-model";
            this.namespaces[this.NS_THR] = "http://purl.org/syndication/thread/1.0";
            this.namespaces[this.NS_UM] = "http://www.ibm.com/xmlns/prod/websphere/um.xsd";
            this.namespaces[this.NS_XHTML] = "http://www.w3.org/1999/xhtml";
            this.namespaces[this.NS_XML] = "http://www.w3.org/2001/XMLSchema";
            this.namespaces[this.NS_XSI] = "http://www.w3.org/2001/XMLSchema-datatypes";
         },

         /**
          * Returns an object with a property for each element in the passed in
          * array and the corresponding name space uri as value
          *
          * @param {Array}
          *           prefixes
          */
         getNameSpaces : function(prefixes) {
            var result = {};
            var len = prefixes.length;
            for (i = 0; i < len; i++) {
               var name = prefixes[i];
               result[name] = this.namespaces[name];

            }
            return result;
         },

         /**
          * Returns the name space uri that corresponds to the passed in prefix
          */
         getNameSpaceUri : function(prefix) {
            return this.namespaces[prefix];
         }
      });

      // internal factory
      declare("com.ibm.mm.enabler.model.HttpStatusCodesImpl", null, {
         constructor : function() {
            this.HTTP_CONTINUE = "100";
            this.HTTP_SWITCHING_PROTOCOLS = "101";
            this.HTTP_OK = "200";
            this.HTTP_CREATED = "201";
            this.HTTP_NOT_FOUND = "404";
            this.HTTP_REQUEST_TIMEOUT = "408";
            this.HTTP_INTERNAL_SERVER_ERROR = "500";
            this.HTTP_SERVICE_UNAVAILABLE = "503";
         }
      });

      // internal
      declare("com.ibm.mm.enabler.model.UtilsImpl", null, {
         constructor : function() {
            this.xmlDom = com.ibm.mm.enabler.dom.createDocument();
         },

         createNode : function(name, ns) {
            return com.ibm.mm.enabler.dom.createElement(this.xmlDom, name, ns);
         },

         createLinkNode : function(href, rel, ns) {
            var linkNode = this.createNode("atom:link", ns);
            linkNode.setAttribute("href", href);
            linkNode.setAttribute("rel", rel);
            return linkNode;
         },

         createFeed : function(id, title, entry, namespaces) {
            var ns = "";
            for (prefix in namespaces) {
               ns += "xmlns:" + prefix + "=\"" + namespaces[prefix] + "\" ";
            }
            var time = new Date();
            var feed = '<?xml version="1.0" encoding="UTF-8"?>\n' + '<atom:feed ' + ns + ' >\n' + '<atom:title>' + title + '</atom:title>\n' + '<atom:id>' + id
                  + '</atom:id>\n' + '<atom:updated>' + time.toGMTString() + '</atom:updated>\n' + entry + '</atom:feed>';
            return feed;
         }
      });

      // public factory
      com.ibm.mashups.enabler.model.Factory = new com.ibm.mm.enabler.model.FactoryImpl();

      // internal factories
      com.ibm.mm.enabler.model.HttpStatusCodes = new com.ibm.mm.enabler.model.HttpStatusCodesImpl();
      com.ibm.mm.enabler.model.Utils = new com.ibm.mm.enabler.model.UtilsImpl();
      com.ibm.mm.enabler.model.NameSpaceFactory = new com.ibm.mm.enabler.model.NameSpaceFactoryImpl();
      com.ibm.mm.enabler.model.Factory = new com.ibm.mm.enabler.model.ExtendedFactoryImpl();
      com.ibm.mm.enabler.model.NavigationNodeFactory = new com.ibm.mm.enabler.model.NavigationNodeFactoryImpl();

      return com.ibm.mm.enabler.model.UserModel.iConfig;
   });
