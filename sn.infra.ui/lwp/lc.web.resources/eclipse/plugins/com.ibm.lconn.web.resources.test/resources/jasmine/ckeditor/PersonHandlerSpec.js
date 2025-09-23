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

dojo.provide("lconn.test.jasmine.ckeditor.PersonHandlerSpec");

dojo.require("lconn.core.ckplugins.mentions.PersonHandler");
dojo.require("lconn.test.mocks.ckeditor");
dojo.require('lconn.core.globalization.bidiUtil');

(function(PersonHandler, lang, mocks) {
   var NAME = 'Amy Jones1', nameWithHtml = "<span></span> <a></a>Amy Jones", ITEM = {
      name : NAME,
      userid : 'd7d822c0-8396-102f-98c1-85b1e4fcc8a0'
   }, htmlItem = {
      name : nameWithHtml,
      userid : 'd7d822c0-8396-102f-98c1-85b1e4fcc8a0'
   }, ITEM_JSON = {
      displayName : ITEM.name,
      userId : ITEM.userid,
      type : 'PersonMentions',
      hasSymbol : true
   }, BIDI_ACT_CHAR = '@';

   describe('the lconn.core.ckplugins.mentions.PersonHandler handler', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(PersonHandler.getStore)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.setStore)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.getTextFromItem)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.formatData)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.decorateContent)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.bidiActivatorChar)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.addMicroFormat)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.remove)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.removeSymbol)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.getNameFromNode)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.getIdFromNode)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.isMentionNode)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.getMentionsAtRange)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.hasBizCard)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.isExternal)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.getUserId)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.getUserOrgId)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.addSymbol)).toBeTruthy();
         expect(lang.isFunction(PersonHandler.setNetwork)).toBeTruthy();
      });
      it('implements the expected properties', function() {
         expect(PersonHandler.activatorChar).toBe('@');
         expect(PersonHandler.templatePath).not.toBeNull();
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.getStore() method', function() {
      var _search;
      beforeEach(function() {
         _search = lconn.core.config.services.search;
         PersonHandler.setStore(null);
      });
      afterEach(function() {
         lconn.core.config.services.search = _search;
         _search = undefined;
      });
      it('returns an instance of HybridPeopleDataStoreOpenSocial when Search is installed', function() {
         lconn.core.config.services.search = "true";
         expect(PersonHandler.getStore()).not.toBeNull();
         expect(PersonHandler.getStore().declaredClass).toBe('lconn.core.HybridPeopleDataStoreOpenSocial');
      });
      it('returns an instance of PeopleDataStoreOpenSocial when Search is not installed', function() {
         delete lconn.core.config.services.search;
         expect(PersonHandler.getStore()).not.toBeNull();
         expect(PersonHandler.getStore().declaredClass).toBe('lconn.core.PeopleDataStoreOpenSocial');
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.getTextFromItem() method', function() {
      it('returns the name of the argument', function() {
         expect(PersonHandler.getTextFromItem({
            name : NAME
         })).toBe(NAME);
      });
      it('returns null if the argument is null', function() {
         expect(PersonHandler.getTextFromItem(null)).toBeNull();
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.formatData() method', function() {
      it('returns a well formed JSON object', function() {
         expect(PersonHandler.formatData(ITEM)).not.toBeNull();
         expect(PersonHandler.formatData(ITEM)).toBe(dojo.toJson(ITEM_JSON));
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.addMicroFormat() method', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         PersonHandler._node = {
            $ : dojo.create('a', {}, dojo.body())
         };
         PersonHandler._editor = {
            fire : function() {
               return true;
            },
            createRange : function() {
               return {
                  moveToPosition : function() {
                     return true;
                  }
               };
            },
            getSelection : function() {
               return {
                  selectRanges : function() {
                     return true;
                  }
               };
            }
         };
         PersonHandler.bidiActivatorChar = function() {
            return '@';
         }
      });
      afterEach(function() {
         delete PersonHandler._node;
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('creates the expected microformat', function() {
         PersonHandler.addMicroFormat(ITEM);
         expect(PersonHandler._node.$.tagName).toBe('SPAN');
         expect(PersonHandler._node.$.children[0].tagName).toBe('A');
         expect(PersonHandler._node.$.children[0].childNodes[0].nodeValue).toBe(BIDI_ACT_CHAR + NAME);
         expect(PersonHandler._node.$.children[1].tagName).toBe('SPAN');
         expect(PersonHandler._node.$.children[1].className).toBe('x-lconn-userid');
         expect(PersonHandler._node.$.children[1].style.display).toBe('none');
      });
      it('creates the expected microformat (user name containing HTML tags)', function() {
         PersonHandler.addMicroFormat(htmlItem);
         expect(PersonHandler._node.$.tagName).toBe('SPAN');
         expect(PersonHandler._node.$.children[0].tagName).toBe('A');
         expect(PersonHandler._node.$.children[0].childNodes[0].nodeValue).toBe(BIDI_ACT_CHAR + nameWithHtml);
         expect(PersonHandler._node.$.children[1].tagName).toBe('SPAN');
         expect(PersonHandler._node.$.children[1].className).toBe('x-lconn-userid');
         expect(PersonHandler._node.$.children[1].style.display).toBe('none');
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.remove() method', function() {
      var _CKEDITOR, _formatData;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         PersonHandler._node = {
            $ : dojo.create('a', {}, dojo.body())
         };
         PersonHandler.addMicroFormat(ITEM);
         _formatData = PersonHandler.formatData;
         PersonHandler.formatData = function(a, b) {
            return "";
         };
         PersonHandler.remove(PersonHandler._node, ITEM);
      });
      afterEach(function() {
         delete PersonHandler._node;
         PersonHandler.formatData = _formatData;
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('correctly removes the mention', function() {
         expect(PersonHandler._node.$.tagName).toBe('SPAN');
         expect(PersonHandler._node.$.children[0].tagName).toBe('A');
         expect(PersonHandler._node.$.children[0].childNodes[0].nodeValue).toBe(NAME);
         expect(PersonHandler._node.$.children[1].tagName).toBe('SPAN');
         expect(PersonHandler._node.$.children[1].className).toBe('x-lconn-userid');
         expect(PersonHandler._node.$.children[1].style.display).toBe('none');
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.getNameFromNode() method', function() {
      var testNode = {
         $ : dojo.create('span', {
            innerHTML : '<a class="fn" href="">@Amy Jones1</a><span class="x-lconn-userid">523cc6c0</span>',
            className : 'vcard'
         }),
         type : '1'
      };
      it("will correctly return the username when passed a mentions 'SPAN' node", function() {
         expect(PersonHandler.getNameFromNode(testNode.$)).toBe('@Amy Jones1');
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.getIdFromNode() method', function() {
      var testNode = {
         $ : dojo.create('span', {
            innerHTML : '<a class="fn" href="">@Amy Jones1</a><span class="x-lconn-userid">523cc6c0</span>',
            className : 'vcard'
         }),
         type : '1'
      };
      it("will correctly return the userID when passed a mentions 'SPAN' node", function() {
         expect(PersonHandler.getIdFromNode(testNode.$)).toBe('523cc6c0');
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.isMentionNode() method', function() {
      var testNode = {
         $ : dojo.create('span', {
            innerHTML : '<a class="fn" href="">@Amy Jones1</a><span class="x-lconn-userid">523cc6c0</span>',
            className : 'vcard'
         }),
         type : '1'
      };
      it('will return true in the case that a mentionsNode is passed in', function() {
         expect(PersonHandler.isMentionNode(testNode)).toBeTruthy();
      });
      var textNode = {
         $ : dojo.create('p', {
            innerHTML : 'this is just a random text node',
            className : 'sentence'
         }),
         type : '3'
      };
      it('will return false or undefined in the case that a non-mentions node is passed in', function() {
         expect(PersonHandler.isMentionNode(textNode)).toBeFalsy();
      });
   });
   describe('the lconn.core.ckplugins.mentions.PersonHandler.hasBizCard() method', function() {
      var testNode = dojo.create('span', {
         innerHTML : '<a class="fn" href="">@Amy Jones1</a><span class="x-lconn-userid">523cc6c0</span>',
         className : 'vcard'
      });
      it('will return true in the case that a mentionsNode is passed in', function() {
         expect(PersonHandler.hasBizCard(testNode)).toBeTruthy();
      });
      var badNode = dojo.create('span', {
         innerHTML : '<a class="fn" href="">@Amy Jones1</a>',
         className : 'vcard'
      });
      it('will return false or undefined in the case that a non-mentions node is passed in', function() {
         expect(PersonHandler.hasBizCard(badNode)).toBeFalsy();
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.getMentionsAtRange() method', function() {
      var range_with_mentions, range_without_mentions, range_with_mentions_collapsed, _CKEDITOR, containerWithMentions = {
         $ : dojo.create('p', {
            innerHTML : '<span class="vcard"><a class="fn" href="">@Amy Jones1</a><span class="x-lconn-userid">523cc6c0</span></span>',
            className : 'vcard',
         }),
         type : '1',
         getChild : function(i) {
            return {
               $ : range_with_mentions_collapsed.endContainer.$.childNodes[i]
            };
         }
      }, containerWithNOMentions = {
         $ : {
            innerHTML : '<br>',
            parentNode : {
               $ : dojo.create('div')
            }
         },
         type : '3',
         getChild : function() {
            return null;
         }
      }, endContainer = {
         $ : {
            innerHTML : '<br>',
            parentNode : {
               $ : dojo.create('div')
            }
         },
         type : '3',
         getChild : function() {
            return null;
         }
      };
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         // range with mentions
         range_with_mentions = {
            startContainer : containerWithMentions,
            endContainer : endContainer,
            collapsed : false,
            selectNodeContents : function() {},
            select : function() {},
            current : endContainer,
            getFirst : function() {
               if (this.current == this.endContainer) {
                  this.current = this.startContainer;
                  return this.startContainer;
               }
               this.current = this.endContainer;
               return null;
            }
         };
         // this range is collapsed because the endContainer and startContainer
         // are the same
         // but CKEditor says it is not, so we need to mimic that behaviour
         range_with_mentions_collapsed = {
            endContainer : containerWithMentions,
            startContainer : containerWithMentions,
            collapsed : false,
            selectNodeContents : function() {
               return;
            },
            select : function() {
               return;
            },
            current : endContainer,
            getFirst : function() {
               if (!this.current)
                  return
               if (this.current == this.endContainer) {
                  this.current = null;
                  return this.startContainer;
               }
               this.current = this.endContainer;
               return this.current;
            }
         };
         range_without_mentions = {
            endContainer : containerWithNOMentions,
            startContainer : containerWithNOMentions,
            collapsed : false,
            getFirst : function() {
               if (!this.current) {
                  return null;
               }
               if (this.current == this.endContainer) {
                  this.current = this.startContainer;
                  return this.startContainer;
               }
               this.current = this.endContainer;
               return null;
            }
         }
      });
      afterEach(function() {
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('correctly detects mentions in a range', function() {
         expect(PersonHandler.getMentionsAtRange(range_with_mentions_collapsed, CKEDITOR)).toContain({
            name : '@Amy Jones1',
            id : '523cc6c0',
            node : containerWithMentions.$
         });
         expect(PersonHandler.getMentionsAtRange(range_without_mentions, CKEDITOR).length).toBe(0);
         expect(PersonHandler.getMentionsAtRange(range_with_mentions, CKEDITOR)).toContain({
            name : '@Amy Jones1',
            id : '523cc6c0',
            node : containerWithMentions.$
         });
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.isExternal() method', function() {
      it('returns true when the user is a visitor', function() {
         expect(PersonHandler.isExternal({
            ext : {
               mode : 'EXTERNAL'
            }
         })).toBeTruthy();
      });
      it('returns false otherwhise', function() {
         expect(PersonHandler.isExternal({
            ext : {
               mode : 'INTERNAL'
            }
         })).toBeFalsy();
         expect(PersonHandler.isExternal({
            ext : {
               mode : null
            }
         })).toBeFalsy();
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.getUserId() method', function() {
      it('returns the user ID', function() {
         expect(PersonHandler.getUserId({
            userid : '4fda6cc0-0101-102e-88dd-f78755f7e0ed'
         })).toBe('4fda6cc0-0101-102e-88dd-f78755f7e0ed');
      });
      it('returns undefined when no item passed', function() {
         expect(PersonHandler.getUserId()).not.toBeDefined();
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.getUserOrgId() method', function() {
      it('returns the organization ID', function() {
         expect(PersonHandler.getUserOrgId({
            ext : {
               orgId : 'EXT_ID'
            }
         })).toBe('EXT_ID');
      });
      it('returns undefined when no item passed', function() {
         expect(PersonHandler.getUserOrgId()).not.toBeDefined();
      });
      it('returns undefined when no ext in the item', function() {
         expect(PersonHandler.getUserOrgId({
            userid : '4fda6cc0-0101-102e-88dd-f78755f7e0ed'
         })).not.toBeDefined();
      });
      it('returns undefined when no orgId in the ext', function() {
         expect(PersonHandler.getUserOrgId({
            ext : {}
         })).not.toBeDefined();
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.addSymbol() method', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
      });
      afterEach(function() {
         delete PersonHandler._node;
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('adds the symbol to the node', function() {
         var node = CKEDITOR.dom.element.createFromHtml('<div><a class="fn"></a></div>'), item = {
            name : 'Amy Jones1'
         };
         PersonHandler.addSymbol(node, item);
         expect(node.$.getElementsByTagName("a")[0].innerHTML.indexOf(PersonHandler.bidiActivatorChar())).toBe(0);
         expect(node.$.getAttribute("data-mentions")).toBeDefined();
         var value = dojo.fromJson(node.$.getAttribute("data-mentions"));
         expect(value.displayName).toBe(item.name);
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.remove() method', function() {
      it('calls removeSymbol', function() {
         var _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         var node = CKEDITOR.dom.element.createFromHtml('<div><a class="fn"></a></div>'),
            item = {
               name : 'Amy Jones1'
            };

         spyOn(PersonHandler, 'removeSymbol');
         PersonHandler.remove(node, item);
         expect(PersonHandler.removeSymbol).toHaveBeenCalledWith(node, item);

         delete PersonHandler._node;
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
   });

   describe('the lconn.core.ckplugins.mentions.PersonHandler.removeSymbol() method', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = lang.getObject('CKEDITOR');
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
      });
      afterEach(function() {
         delete PersonHandler._node;
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('removes the symbol from the node', function() {
         var node = CKEDITOR.dom.element.createFromHtml('<div><a class="fn"></a></div>'),
            item = {
               name : '1 \"\/>&lt;iframe src=\"data:text\/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==\">&lt;\/iframe>\u00a0'
            };
         PersonHandler.removeSymbol(node, item);
         expect(node.$.getElementsByTagName("a")[0].innerHTML.indexOf(PersonHandler.bidiActivatorChar())).toBe(-1);
         expect(node.$.getAttribute("data-mentions")).toBeDefined();
         var value = dojo.fromJson(node.$.getAttribute("data-mentions"));
         expect(value.displayName).toBe(item.name);
         expect(node.getText()).toBe(item.name);
      });
   });
}(lconn.core.ckplugins.mentions.PersonHandler, dojo, lconn.test.mocks.ckeditor));
