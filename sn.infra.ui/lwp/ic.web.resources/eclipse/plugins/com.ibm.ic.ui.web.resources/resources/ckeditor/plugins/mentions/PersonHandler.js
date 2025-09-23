/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/text!ic-core/widget/mentions/templates/mention.html",
      "dojo/json",
      "dojo/_base/lang",
      "dojo/string",
      "dojo/on",
      "dojo/query",
      "dojo/_base/array",
      "dojo/has",
      "dojo/dom-class",
      "dojo/dom-geometry",
      "../../../layout/people",
      "ic-core/HybridPeopleDataStoreOpenSocial",
      "ic-core/PeopleDataStoreOpenSocial",
      "./_Handler",
      "ic-core/config",
      "ic-core/config/services",
      "ic-core/locale",
      "ic-core/url",
      "ic-core/globalization/bidiUtil",
      "dojo/i18n!../../../nls/mentions",
      'dojox/html/entities',
      "ic-core/util/text"
],
   function(dojo, template, JSON, lang, string, on, query, array, has, domClass, domGeom, people, HybridPeopleDataStoreOpenSocial, PeopleDataStoreOpenSocial, _Handler, config, services, locale, urlModule, bidiUtil, strings, entities,textUtils) {

      var typeaheadDataStore = null,
         network = null;

      function addCard(node) {
         if (lang.exists('SemTagSvc') && lang.isFunction(SemTagSvc.parseDom)) {
            SemTagSvc.parseDom(0, node);
         }
      }

      function addToList(list, node) {
         list.push({
            name : this.getNameFromNode(node),
            id : this.getIdFromNode(node),
            node : node
         });
      }

      /**
       * Handler for mentions to people
       * 
       * @namespace ic-ui.ckeditor.plugins.mentions.PersonHandler
       * @extends ic-ui.ckeditor.plugins.mentions._Handler
       */
      var PersonHandler = /** @lends ic-ui.ckeditor.plugins.mentions.PersonHandler */
      {
         /**
          * Activator character
          * 
          * @type {Char}
          */
         activatorChar : '@',// ['@', String.fromCharCode(65312)],

         /**
          * Returns a string with the activator char surrounded by the LTR
          * characters if we are in RTL
          * 
          * @returns string with the bidi version of the activator char
          */
         bidiActivatorChar : function() {
            var isRTLMention = bidiUtil.isRTLValue(this._buffer[0] || "");
            // Connections is in an RTL language (ie: Arabic) && the mention is
            // in LTR language (ie: English) = enforceTextDirection
            return !domGeom.isBodyLtr() && !isRTLMention ? bidiUtil.enforceTextDirection(this.activatorChar, 'ltr') : this.activatorChar;
         },

         /**
          * Person Class Name
          * 
          * @type {String}
          */
         className : 'PersonMentionsNode',

         /**
          * ARIA labels for various states of composition
          * 
          * @type Object
          */
         ariaLabels : {
            compose : strings.person.compose,
            completed : strings.person.completed,
            cancelled : strings.person.cancelled,
            removed : strings.person.deleted
         },

         /**
          * Template path for mention microformat
          * 
          * @type {String}
          */
         templateString : template.replace(/\r\n|\n|\r|\t/gim, ''),

         /**
          * Returns the data store for people lookup
          */
         getStore : function() {
            if (!typeaheadDataStore) {
               if (network) {
                  this.network = network;
               }
               var osParams = {
                  filterBy : "displayName",
                  count : 15
               }, _typeaheadFeed, _extendedTypeAheadFeed;

               if (services.search) {
                  _typeaheadFeed = urlModule.getServiceUrl(services.search) + (this.network && this.network.oauth ? '/oauth' : '/anonymous')
                        + '/people/typeahead';
                  _extendedTypeAheadFeed = urlModule.getServiceUrl(services.opensocial) + (this.network && this.network.oauth ? '/oauth' : '/anonymous')
                        + '/rest/people/@public/@all';

                  typeaheadDataStore = new HybridPeopleDataStoreOpenSocial({
                     url : _typeaheadFeed,
                     queryParam : 'query',
                     extendedTypeAheadUrl : _extendedTypeAheadFeed,
                     extendedQueryParam : "filterValue",
                     openSocialParameters : osParams,
                     network : this.network
                  });
               }
               else {
                  _typeaheadFeed = urlModule.getServiceUrl(services.opensocial) + (this.network && this.network.oauth ? '/oauth' : '/anonymous')
                        + '/rest/people/@public/@all';
                  typeaheadDataStore = new PeopleDataStoreOpenSocial({
                     url : _typeaheadFeed,
                     queryParam : "filterValue",
                     openSocialParameters : osParams,
                     network : this.network
                  });
               }
            }
            return typeaheadDataStore;
         },

         /**
          * Replaces the default dataStore
          * 
          * @param {Object}
          *           store
          */
         setStore : function(store) {
            typeaheadDataStore = store;
         },

         /**
          * Sets the network passed by the consumer
          * 
          * @param {Object}
          *           network
          */
         setNetwork : function(newNetwork) {
            network = newNetwork;
         },

         /**
          * Returns text from the item
          * 
          * @param {Object}
          *           item The selected item
          */
         getTextFromItem : function(item) {
            return item ? item.name : null;
         },

         /**
          * Adds the bizcard tooltip when mentions data is pasted into the
          * editor
          * 
          * @param {Object}
          *           node The current node
          * @param {Boolean}
          *           true if we are pasting and need to check wether the node
          *           contains a valid node with a bizcard
          */
         decorateContent : function(node, checkBizCard) {
            var anchorNode = query("a.fn", node)[0];
            // Paste || IE8
            if ((checkBizCard && !this.hasBizCard(node)) || has('ie') == 8) {
               // attach business cards
               var nameFromDOM = has('ie') == 8 ? anchorNode.innerText : anchorNode.textContent;
               var name = {
                  clean : lang.trim(nameFromDOM).replace(this.activatorChar, ''),
                  removeAtChar : nameFromDOM.indexOf(this.activatorChar) == -1
               };
               var store = this.getStore();
               // retrieve the userid from the data store
               store.fetch({
                  queryOptions : {
                     ignoreCase : true,
                     deep : true
                  },
                  query : name.clean,
                  onComplete : lang.hitch(this, function(node, name, editor, results) {
                     var editorRef; // = this._editor;
                     this._node = new CKEDITOR.dom.element();
                     this._node.$ = node;
                     var item = array.filter(results, function(current) {
                        return current.name == name.clean;
                     })[0];
                     if (!!item && lang.isFunction(this.addMicroFormat)) {
                        editorRef = this._editor;
                        this._editor = editor;
                        this.addMicroFormat(item, name.removeAtChar);
                        var range = this._editor.createRange();
                        range.moveToPosition(this._node, CKEDITOR.POSITION_AFTER_END);
                        range = range + 1;
                        this._editor.getSelection().selectRanges([range]);
                        this._editor = editorRef;
                     }
                  }, node, name, this._editor),
                  onError : function() {
                     return;
                  }
               });
            }
            // Undo/Redo
            else {
               this._editor.fire('lockSnapshot');
               domClass.remove(anchorNode, "hasHover");
               addCard(node);
               this._editor.fire('unlockSnapshot');
               var range = this._editor.createRange();
               range.moveToPosition(mentionsNode, CKEDITOR.POSITION_AFTER_END);
               this._editor.getSelection().selectRanges([range]);
            }
         },

         /**
          * Returns a string representation of the mentioned item
          * 
          * @param {Object}
          *           item The item
          * @param {boolean}
          *           noNotify: [optional] suppress notification
          */
         formatData : function(item, noNotify) {
            // FIXME: some attributes are required by
            // lconn.news.microblogging.sharebox.data.MentionsDataFormatter
            var data = {
               displayName : item.name,
               userId : item.userid,
               // Legacy attribute
               type : 'PersonMentions',
               hasSymbol : !noNotify
            };
            return JSON.stringify(data);
         },

         /**
          * Adds the microformat to the node. This implementation adds the
          * bizcard microformat.
          * 
          * @param {Object}
          *           item The item
          */
         removeSingleQuote: function(item){
         	 if(item.name.indexOf("'") > -1){
        		 item.name = item.name.replace("'","&#39;");
        	 }
         	 return item;
          },
          
         addMicroFormat : function(item, removeAtChar) {
            var url = people.getProfileUrl({
               name : item.name,
               userid : item.userid
            });
            var htmlNode = string.substitute(this.templateString, {
               name : removeAtChar ? entities.encode(item.name) : this.bidiActivatorChar() + entities.encode(item.name),
               userid : item.userid,
               url : url,
               dataMention : lang.isFunction(this.formatData) ? this.formatData(this.removeSingleQuote(item)) : ''
            });
            var mentionsNode = CKEDITOR.dom.element.createFromHtml(htmlNode);

            this._editor.fire('lockSnapshot');
            mentionsNode.replace(this._node);
            // Add bizcard
            addCard(mentionsNode.$);
            this._editor.fire('unlockSnapshot');

            this._node = mentionsNode;
            // Resets they cursor to be behind the @mention fix for defects 144915, 127778, and 156468
            
            if(this.detectIE() != false)
            {
            	var range = this._editor.createRange();
            	range.moveToPosition(mentionsNode, CKEDITOR.POSITION_AFTER_END);
            	this._editor.getSelection().selectRanges([range]);
            }
         
         },

         /**
          * DEPRECATED: Removes the microformat from the node. This implementation removes the
          * bizcard microformat.
          * 
          * @param {DOMNode}
          *           node The node
          * @param {Object}
          *           item The item
          */
         remove : function(node, item) {
            dojo.deprecated("mentions.remove", "Use removeSymbol instead.", "6");
            this.removeSymbol(node, item);
         },

         /**
          * Removes the microformat from the node. This implementation removes
          * the bizcard microformat.
          * 
          * @param {DOMNode}
          *           node The node
          * @param {Object}
          *           item The item
          */
         removeSymbol : function(node, item) {
            var auxNode = query("a.fn", node.$)[0];
            if (auxNode) {
               auxNode.innerHTML = entities.encode(item.name);
               node.setAttribute("data-mentions", this.formatData(item, true));
            }
         },

         /**
          * Adds the microformat to the node. This implementation adds the
          * bizcard microformat.
          * 
          * @param {DOMNode}
          *           node The node
          * @param {Object}
          *           item The item
          */
         addSymbol : function(node, item) {
            var auxNode = query("a.fn", node.$)[0];
            if (auxNode && auxNode.innerHTML.indexOf(this.bidiActivatorChar()) != 0) {
               auxNode.innerHTML = this.bidiActivatorChar() + entities.encode(item.name);
               node.setAttribute("data-mentions", this.formatData(item, false));
            }
         },

         /**
          * Returns String with the name of the user in the node
          * 
          * @param {CKEDITOR.dom.element}
          * @returns string with the name
          */
         getNameFromNode : function(node) {
            if (node.className == 'vcard' && node.childNodes.length > 0) {
               return query('a.fn', node)[0].innerHTML;
            }
            if (node.parentElement.className == 'vcard') {
               // if you are inside the vcard
               return query('a.fn', node.parentElement)[0].innerHTML;
            }
            return false;
         },

         /**
          * Returns String with the id of the user in the node
          * 
          * @param {CKEDITOR.dom.element}
          *           node the node
          * @returns string with the id
          */
         getIdFromNode : function(node) {
            if (node.className == 'vcard') {
               return query('span.x-lconn-userid', node)[0].innerHTML;
            }
            if (node.parentElement.className == 'vcard') {
               // if you are inside the vcard
               return query('span.x-lconn-userid', node.parentElement)[0].innerHTML;
            }
            return false;
         },

         /**
          * Returns true if the node represents a mention
          * 
          * @param {CKEDITOR.dom.element}
          *           node the node
          * @returns string with the id
          */
         isMentionNode : function(node) {
            return node && ((node.$ && node.$.className == 'vcard') || (node.className && node.className == 'vcard'));
         },

         /**
          * Returns array if the range contains a mention of this type and
          * select the mention with range
          * 
          * @param {CKEDITOR.dom.range}
          *           range The current selection range
          * @returns array if the range contains a mention of this type
          */
         getMentionsAtRange : function(range, editor) {
            var listOfMentions = [];
            // IE needs these workarounds when deleting one mention only
            if (has('ie') && range.collapsed) {
               if (has('ie') == 8 && this.isMentionNode(range.endContainer)) {
                  addToList.call(this, listOfMentions, range.endContainer.$);
               }
               else if (range.endContainer.getText() == '\u200b' && this.isMentionNode(range.endContainer.getPrevious())){
                  addToList.call(this, listOfMentions, range.endContainer.getPrevious().$);
               }
            }
            // General use case...
            else {
               var walker = new CKEDITOR.dom.walker(range), node;
               while (node = walker.previous()) {
                  if (this.isMentionNode(node)) {
                     addToList.call(this, listOfMentions, node.$);
                  }
               }
            }

            return listOfMentions;
         },

         /**
          * Returns true if the node contains a SPAN with a bizCard
          * 
          * @param {Object}
          *           node to check
          * @returns true if the node contains a bizCard
          */
         hasBizCard : function(domValue) {
            return domValue && !!query("span.x-lconn-userid", domValue)[0];
         },

         /**
          * Returns true if the user is EXTERNAL (Visitor)
          * 
          * @param {Object}
          *           item with the info about the user
          * @returns true if the user is external
          */
         isExternal : function(item) {
            return item && item.ext && item.ext.mode == 'EXTERNAL';
         },

         /**
          * Returns the internal ID of the user
          * 
          * @param {Object}
          *           item with the info about the user
          * @returns user if
          */
         getUserId : function(item) {
            return item && item.userid;
         },

         /**
          * Returns the Org ID of the user
          * 
          * @param {Object}
          *           item with the info about the user
          * @returns organization id
          */
         getUserOrgId : function(item) {
            return item && item.ext && item.ext.orgId;
         },
         
         /**
          * Returns IE version
          * 
          * @returns IE version or false if it's not IE
          */
         detectIE : function(){
        	var ua = window.navigator.userAgent;
        	var msie = ua.indexOf('MSIE ');
        	if (msie > 0) {
        	// IE 10 or older => return version number
        		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        	}
        	var trident = ua.indexOf('Trident/');
        	if (trident > 0) {
        	// IE 11 => return version number
        		var rv = ua.indexOf('rv:');
        		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        	}

        	var edge = ua.indexOf('Edge/');
        	if (edge > 0) {
        		// Edge (IE 12+) => return version number
        		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        	}
        	// other browser
        	return false;
         }
      };
      // Mixin base handler logic
      lang.mixin(PersonHandler, _Handler);

      return PersonHandler;
   });
