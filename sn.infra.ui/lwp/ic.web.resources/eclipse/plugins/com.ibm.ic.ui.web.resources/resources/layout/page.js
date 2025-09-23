/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/lang",
      "dojo/data/ItemFileReadStore",
      "dojo/dom",
      "dojo/dom-class",
      "dijit/tree/ForestStoreModel",
      "ic-layout/widget/NavigationTree"
], function(dojo, lang, ItemFileReadStore, dom, domClass, ForestStoreModel, NavigationTree) {

   return lang.mixin(lang.getObject("com.ibm.lconn.layout.page"), {
      scrollToY : function(y) {
         var x = dojo._isBodyLtr() ? 0 : document.body.clientWidth;
         window.scrollTo(x, y);
      },
      actions : {
         buckets : {},
         add : function(bucketName, action, prepend) {
            bucketName = bucketName || null;
            var bucket = this.buckets[bucketName] = this.buckets[bucketName] || [];

            if (prepend) {
               bucket.unshift(action);
            }
            else {
               bucket.push(action);
            }
         }
      },

      /*
       * data: { },
       */

      communityInfo : null,
      setCommunityInfo : function(communityInfo) {
         if (communityInfo && !communityInfo.id) {
            throw "Community id is required";
         }
         this.communityInfo = communityInfo;

         // Update nav
         // Update breadcrumb
      },

      search : {
         init : function(f, id) {
            if (this.widget) {
               return;
            }
            var w = this.widget = new com.ibm.social.layout.widget.Search(f(), dom.byId(id || "globalSearch"));
            w.connect(w, "onSearch", function(value, scope) {
               alert("search for '" + value + "' in scope '" + scope.label + "'");
            });
            w.connect(w, "onSelect", function(value) {
               alert("selected '" + value + "'");
            });
         }
      },

      navigation : {
         show : function() {
            dom.byId("lotusMenu").style.display = "";
         },
         hide : function() {
            dom.byId("lotusMenu").style.display = "none";
         },
         init : function(opts) {
            if (this._tree) {
               this._tree.destroyRecursive();
               this._tree = null;
            }

            opts = opts || {};
            opts.model = opts.model || this._model || new ForestStoreModel({
               store : new ItemFileReadStore({
                  data : []
               })
            });

            this._tree = new NavigationTree(opts, dom.byId("lotusMenuTree"));
            this.show();
            return this._tree;
         },
         getTree : function() {
            return this._tree;
         },
         setModel : function(model) {
            this._model = model;
            if (this._tree) {
               this._tree.set("model", model);
            }
         }
      },

      showLoading : function() {
         domClass.add(document.body, "lconnHideContent");
         domClass.remove(document.body, "lconnHideLoading");
      },
      showContent : function() {
         domClass.add(document.body, "lconnHideLoading");
         domClass.remove(document.body, "lconnHideContent");
      },

      _deferreds : {},

      showWhen : function(conditions, id) {
         this.when(conditions, function() {
            dom.byId(id).style.display = "";
         });
      },
      ready : function(condition) {
         var map = this._deferreds;
         var dfd = map[condition];
         if (!dfd) {
            dfd = map[condition] = new dojo.Deferred();
         }
         dfd.callback(true);
      },
      when : function(conditions, callback, errback) {
         if (!lang.isArray(conditions)) {
            conditions = [ conditions
            ];
         }
         var defer = [], map = this._deferreds, i, l, condition, deferred, existing;
         for (i = 0, l = conditions.length; i < l; i++) {
            condition = conditions[i];
            if (condition instanceof dojo.Deferred) {
               deferred = condition;
            }
            else if (typeof condition == "string") {
               existing = map[condition];
               if (existing) {
                  deferred = existing;
               }
               else if (condition.charAt(0) == "!") {
                  deferred = map[condition] = new dojo.Deferred();
               }
               else {
                  existing = this.data[condition];
                  if (existing instanceof dojo.Deferred) {
                     deferred = existing;
                  }
                  else {
                     deferred = map[condition] = new dojo.Deferred();
                     deferred.callback(existing);
                  }
               }
            }
            if (deferred) {
               defer.push(deferred);
            }
         }
         var dfdlist = new dojo.DeferredList(defer);
         if (errback) {
            dfdlist.addCallback(callback).addErrback(errback);
         }
         else {
            dfdlist.addBoth(callback);
         }
         return dfdlist;
      }
   });
});
