/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/json",
      "dojo/query",
      "dojo/request",
      "dojo/topic"
], function(dojo, declare, lang, JSON, query, request, topic) {

   /**
    * The implementation class of the com.ibm.mashups.livetext.serviceModel.
    * 
    * @class com.ibm.mm.livetext.serviceImpl
    * @name com.ibm.mm.livetext.serviceImpl
    * @augments com.ibm.mashups.livetext.service
    */
   var serviceImpl = declare("com.ibm.mm.livetext.serviceImpl", null,
   /** @lends com.ibm.mm.livetext.serviceImpl */
   {
      _tagTypes : null,
      tagChanged : "/com/ibm/mashups/livetext/livetextchanged",
      tagStatusChange : "/com/ibm/mashups/livetext/livetextchanged",
      tagContentChanged : "/com/ibm/mashups/livetext/livetextcontentchanged",
      entryAdded : "/com/ibm/mashups/livetext/configentryadded",
      entryRemoved : "/com/ibm/mashups/livetext/configentryremoved",

      /**
       * Initiate the tag service. This should be only called once after a page
       * is completed loaded. Load the livetext configuration by calling
       * loadTags method.<b> Subscribe to two event topics and prepare to catch
       * events fired by other components. Publish the content changed event and
       * start the entire document parsing.
       * 
       * @returns
       */
      init : function() {
         this._loadTags();
         topic.subscribe(this.tagChanged, lang.hitch(this, "onTagChanged"));
         topic.subscribe(this.tagContentChanged, lang.hitch(this, "onTagContentChanged"));
         topic.subscribe(this.entryAdded, lang.hitch(this, "onAddConfigEntry"));
         topic.subscribe(this.entryRemoved, lang.hitch(this, "onRemoveConfigEntry"));
         topic.publish(this.tagContentChanged, document, true);
      },

      /**
       * The core method to query the match tags according to the matching
       * condition defined as CSS3 selection expression. If the type of the tag
       * is defined to query the enclosed tag, then simply do one dojo query and
       * return all the nodes.<b> If the type of the tag is defined to query
       * tags excluding the enclosed tags, then two query will be performed, the
       * offset of the two query results will be returned. The first query gets
       * all the tags, the second query gets the tags which has nested tag
       * inside, then the difference of the two results will be returned.
       * 
       * @param {DOMNode}
       *           node the root node which will be parsed.
       * @param {Object}
       *           tagType a tag type which maps to one of the configuration
       *           entries.
       * @returns {Array} list of the matching tags.
       */
      _getNodes : function(node, tagType) {
         if (tagType.processEnclosedTags) {
            return query(tagType.match, node);
         }
         else {
            var a = query(tagType.match + ' ' + tagType.match, node);
            var b = query(tagType.match, node);
            var anItem, bIndex;
            while (a.length > 0) {
               anItem = a[0];
               bIndex = 0;
               while (bIndex < b.length) {
                  if (anItem == b[bIndex]) {
                     a.splice(0, 1);
                     b.splice(bIndex, 1);
                     break;
                  }
                  else {
                     bIndex++;
                  }
               }
            }
            return b;
         }
      },

      /**
       * The event handler when a tag and/or its content get changed.
       * 
       * @param {DOMNode}
       *           node the root node which will be parsed.
       * @param {Boolean}
       *           continueAfterException a flag indicate if the process should
       *           continue when error occurrs.
       * @param {Function}
       *           preProcessCallback the callback function which will be called
       *           before nodes being processed.
       * @param {Function}
       *           postProcessCallback the callback function which will be
       *           called after nodes being processed.
       * @returns
       */
      onTagChanged : function(node, continueAfterException, preProcessCallback, postProcessCallback) {
         var tag = null, nextTag = null, tags = null;
         for (var index = 0; index < this._tagTypes.length; index++) {
            tag = this._tagTypes[index];
            this._processTypeTag(node, tag, continueAfterException, preProcessCallback, postProcessCallback, true);
         }
      },

      /**
       * The event handler when a tag content gets changed. The passed in DOM
       * node will not be processed. Only its child nodes will be processed.
       * 
       * @param {DOMNode}
       *           node the root node which will be parsed.
       * @param {Boolean}
       *           continueAfterException a flag indicate if the process should
       *           continue when error occurrs.
       * @param {Function}
       *           preProcessCallback the callback function which will be called
       *           before nodes being processed.
       * @param {Function}
       *           postProcessCallback the callback function which will be
       *           called after nodes being processed.
       * @returns
       */
      onTagContentChanged : function(node, continueAfterException, preProcessCallback, postProcessCallback) {
         var tag = null, nextTag = null, tags = null;
         for (var index = 0; index < this._tagTypes.length; index++) {
            tag = this._tagTypes[index];
            this._processTypeTag(node, tag, continueAfterException, preProcessCallback, postProcessCallback, false);
         }
      },

      /**
       * Once a type of tags have been found, each of the same type of tags will
       * be processed by that type of the tag processor class defined in the
       * configuration. If that type of the tag processor class has not been
       * loaded, then the tag processor will be loaded and a new instance of
       * that class will be created. After tag processor is created, this method
       * will check if the passed in node should be included according to the
       * includeRoot parameter.<b> If the passed in node should be included,
       * then the check the node against the matching condition. If condition is
       * met, then the node will be included in the list of the tags being
       * processed individually. Otherwise, only the matching tags will be
       * processed.<b> Before each tag is being processed, the
       * preProcessCallBack function will be called. All the tags found will be
       * passed into this callback function The loop in the middle of the method
       * go through each tag in the list, using the tag processor to process
       * each individual tag.<b> After entire tags in the list get processed,
       * the postProcessCallback function get called with exceptions which might
       * have occurred.<b>
       * 
       * @param {DOMNode}
       *           node the root node which will be parsed.
       * @param {Object}
       *           tag the tag type entry object from the configration.
       * @param {Boolean}
       *           continueAfterException a flag indicate if the process should
       *           continue when error occurrs.
       * @param {Function}
       *           preProcessCallback the callback function which will be called
       *           before nodes being processed.
       * @param {Function}
       *           postProcessCallback the callback function which will be
       *           called after nodes being processed.
       * @param {Boolean}
       *           includeRoot the flag indicate if the passed in node should be
       *           included in the process. This flag is used to differiate the
       *           event tag changed from tag content changed.
       * @returns
       */
      _processTypeTag : function(node, tag, continueAfterException, preProcessCallback, postProcessCallback, includeRoot) {
         var tags = [];
         if (includeRoot && this._checkRoot(node, tag)) {
            tags[0] = node;
         }

         tags = tags.concat(this._getNodes(node, tag));

         var tagsforcallbackfunc = [];
         tagsforcallbackfunc = tagsforcallbackfunc.concat(tags);

         if (tagsforcallbackfunc.length > 0) {
            if (tag.loaded == null) {
               this._loadTagHandler(tag);
            }
            var errors = [];
            if (lang.isFunction(preProcessCallback)) {
               try {
                  preProcessCallback(node, tagsforcallbackfunc);
               }
               catch (error) {
                  if (dojo.config.isDebug) {
                     console.debug(error)
                  }
               }
            }

            for (var index0 = 0; index0 < tags.length; index0++) {
               try {
                  tag.tagHandler.processTag(tags[index0]);
               }
               catch (error) {
                  errors[errors.length] = error;
                  if (continueAfterException)
                     break;
               }
            }

            if (lang.isFunction(postProcessCallback)) {
               try {
                  postProcessCallback(node, tagsforcallbackfunc, errors);
               }
               catch (error) {
                  if (dojo.config.isDebug) {
                     console.debug(error)
                  }
               }
            }
         }
      },

      /**
       * The method to check individual node to see if the passed in node meet a
       * given tag matching condition. If it does, then a value of true will be
       * returned, otherwise a value of false will be returned.
       * 
       * @param {DOMNode}
       *           node the DOM node to check with
       * @param {Object}
       *           tag the tag type object
       * @returns {Boolean} the value which indicate if the node meet the
       *          matching condition.
       */
      _checkRoot : function(node, tag) {
         var shouldInclude = false;
         if (node != null && node.nodeType) {
            var copyOfNode = node.cloneNode(false);
            var copyNodeParent = document.createElement("div");
            copyNodeParent.appendChild(copyOfNode);
            var result = this._getNodes(copyNodeParent, tag);
            if (result != null && result.length > 0) {
               shouldInclude = true;
            }
            delete copyOfNode;
            delete copyNodeParent;
            delete result;
         }
         return shouldInclude;
      },

      /**
       * This method will load the livetext framework configuration. It will
       * first check if a livetextCfg global variable exists, if it does, then
       * it assume that the global variable is the list of the tag configuration
       * entries. This is to improve the performance and assume that the
       * bootstrap will create a such javascript object.<b> If it does not
       * exist, then it will load from a configuration file. The configuration
       * file is assumed at the same location where this file is located. The
       * format of this file is defined as the following &nbsp;&nbsp;&nbsp;[<br/>
       * &nbsp;&nbsp;&nbsp;{"match":"*.iWidgetSkin[skin]","processEnclosedTags":true,'waitOnPreTag':true,<br/>
       * &nbsp;&nbsp;&nbsp;&nbsp;"module":"tagservices",
       * "path":"../../tagservices", "baseClass":"tagservices.skins"},<br/>
       * &nbsp;&nbsp;&nbsp;{"match":"*.mm_iWidget","processEnclosedTags":false,'waitOnPreTag':false,<br/>
       * &nbsp;&nbsp;&nbsp;&nbsp;"module":"tagservices",
       * "path":"../../tagservices", "baseClass":"tagservices.widgets"}<br/>
       * &nbsp;&nbsp;&nbsp;]
       * <p />
       * match, the value of the match is the CSS3 selection expression which
       * presents a tag (livetext) matching condition.<b> processEnclosedTags,
       * the boolean value to indicate if the enclosed same tag should be
       * presented in this query. a value of true will cause all the tags to be
       * processed. a value of false will make the outmost tags to be processed.<b>
       * waitOnPreTag, this is not used for 1.1, it is for the future release.
       * module, the string value to indicate a javascript module which the tag
       * processor should be loaded against. path, the string value to indicate
       * the processor javascript resources.<b> baseClass, the javascript class
       * for the tag processor.
       * 
       * @returns
       */
      _loadTags : function() {
         if (this._tagTypes == null) {
            var thisObj = this;
            if (typeof livetextCfg != "undefined") {
               // if we have the livetext configuration exists as a global
               // variable which is loaded by the bootstrap,
               // then we will simply use it. otherwise, we load from the
               // configuration file.
               this._tagTypes = livetextCfg;
            }
            else {
               request(require.toUrl("ic-mm/livetext/tagservice.entries.cfg"), {
                  method : "GET",
                  handleAs : "text",
                  sync : true
               }).then(function(result) {
                  thisObj._tagTypes = JSON.parse(result);
               }, function(data) {
                  console.dir(data);
               });
            }
         }
      },

      /**
       * @param {com.ibm.mashups.livetext.configEntry}
       *           entry The entry that should be added to the configuration.
       * @returns
       * @throws The
       *            sermantic tag service exception.
       */
      onAddConfigEntry : function(/* com.ibm.mashups.livetext.configEntry */entry) {
      /* not implemented */
      },

      /**
       * @param {com.ibm.mashups.livetext.configEntry}
       *           entry The entry that should be removed from the
       *           configuration.
       * @returns
       * @throws The
       *            sermantic tag service exception.
       */
      onRemoveConfigEntry : function(/* com.ibm.mashups.livetext.configEntry */entry) {
      /* not implemented */
      },

      /**
       * This method is to provide a fall back for backfoward compatibility. If
       * a component is still using the SemTagSvc.parseDom method, this method
       * will still ensure the correctness of that component but it is strongly
       * recommended to use the event model.
       * 
       * @param {Object}
       *           event Not used.
       * @param {DOMNode}
       *           node The dom node to be processed.
       * @deprecated this methid has been deprecated. Use the publish event to
       *             invoke the process of the tags.
       * @returns
       */
      parseDom : function(aEvent, node) {
         topic.publish(this.tagChanged, node);
      },

      /**
       * This method will register the tag processor module, then load the
       * processor module and create an instance of base class.<b> After the
       * tag processor is created, the flag on the tag type object will be set
       * to true. This ensures that each tag processor will only have one
       * instance and the module will be loaded only once.
       * 
       * @param {Object}
       *           tag, the tag configuration entry.<b>
       * @returns
       */
      _loadTagHandler : function(tag) {
         dojo.registerModulePath(tag.module, tag.path);
         // this is to fix the stupid build tool.
         dojo.eval("dojo.r" + "equire('" + tag.baseClass + "')");
         var jsonStr = "{create:function(){return new " + tag.baseClass + "()}}";
         var classCreator = JSON.parse(jsonStr);
         tag.tagHandler = classCreator.create();
         tag.loaded = true;
      }
   });

   return serviceImpl;
});
