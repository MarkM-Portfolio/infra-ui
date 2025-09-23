/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
        "dojo/dom-construct",
        "dojo/dom-geometry",
        "ic-core/config/services",
        "ic-ui/ckeditor/plugins/mentions/TypeAheadMenu",
        "../mocks/ckeditor"
], function(domConstruct, domGeom, services, TypeAhead, mocks) {
   var typeAhead = new TypeAhead(),
      _typeAhead;
   var testDiv = domConstruct.create('div');
   var tempPrevious = domConstruct.create('div', {
      innerHTML : '<p>Previous Button</p>',
      type : 1
   }, testDiv);
   var testNode1 = domConstruct.create('div', {
      innerHTML : '<a class="fn" href="">@Amy Jones1</a><span class="x-lconn-userid">523cc6c0</span>',
      className : 'dijitMenuItemSelected',
      type : 1
   }, testDiv);
   var testNode2 = domConstruct.create('div', {
      innerHTML : '<a class="fn" href="">@Amy Jones2</a><span class="x-lconn-userid">523cc6c0</span>',
      className : 'vcard',
      type : 1
   }, testDiv);
   var tempSearch = domConstruct.create('div', {
      innerHTML : '<p>Search Button</p>',
      type : 1
   }, testDiv);

   beforeEach(function() {
      _typeAhead = typeAhead;
      typeAhead.createMenu();
      typeAhead.menu.previousButton = tempPrevious;
      typeAhead.menu.searchButton = tempSearch;
   });

   afterEach(function() {
      // Restore
      typeAhead = _typeAhead;
   });

   describe('the lconn.core.ckplugins.mentions.TypeAheadMenu class', function() {
      it('implements the expected methods', function() {
         expect(typeAhead.search).toEqual(jasmine.any(Function));
         expect(typeAhead.createMenu).toEqual(jasmine.any(Function));
         expect(typeAhead.show).toEqual(jasmine.any(Function));
         expect(typeAhead.hide).toEqual(jasmine.any(Function));
         expect(typeAhead.focusPrevious).toEqual(jasmine.any(Function));
         expect(typeAhead.focusNext).toEqual(jasmine.any(Function));
         expect(typeAhead.getHighlightedOption).toEqual(jasmine.any(Function));
         expect(typeAhead.getCurrentValue).toEqual(jasmine.any(Function));
         expect(typeAhead.getSelectedItem).toEqual(jasmine.any(Function));
         expect(typeAhead.getTypeaheadLabel).toEqual(jasmine.any(Function));
         expect(typeAhead.noResultsFound).toEqual(jasmine.any(Function));
         expect(typeAhead.setTypeaheadHeader).toEqual(jasmine.any(Function));
      });
   });

   describe('the lconn.core.ckplugins.mentions.TypeAheadMenu.getHighlightedOption', function() {
      it('returns the item that is highlighted', function() {
         expect(typeAhead.getHighlightedOption()).toBeNull();
         typeAhead.menu._highlighted_option = testNode1;
         expect(typeAhead.getHighlightedOption()).toBe(testNode1);
      });
   });

   describe('the lconn.core.ckplugins.mentions.TypeAheadMenu.getTypeaheadLabel', function() {
      it('returns the label for the TA', function() {
         expect(typeAhead.getTypeaheadLabel()).toBe("type ahead list box");
      });
   });

   describe('the lconn.core.ckplugins.mentions.TypeAheadMenu.noResultsFound', function() {
      it('returns false if there are no items in the TA', function() {
         typeAhead.menu.items = [];
         expect(typeAhead.noResultsFound()).toBeTruthy();
         typeAhead.menu.items = ['a','b'];
         expect(typeAhead.noResultsFound()).toBeFalsy();
      });
   });

   describe('the lconn.core.ckplugins.mentions.TypeAheadMenu.setTypeaheadHeader', function() {
      it('correctly sets the header for the typeAhead', function() {
         typeAhead.setTypeaheadHeader('header message');
         expect(typeAhead.menu.HeaderMessage).not.toBeNull();
         expect(typeAhead.menu.HeaderMessage).toBe('header message');
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/TypeAheadMenu.createMenu', function() {
      it('correctly creates the typeAheadMenu object', function() {
         expect(typeAhead.menu).not.toBeNull();
         expect(typeAhead.menu.minChars).toBe(2);
         expect(typeAhead.menu.multipleValues).toBeFalsy();
         expect(typeAhead.menu.searchDelay).toBe(600);
         expect(typeAhead.menu["class"]).toContain("typeAhead");
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/TypeAheadMenu.focusPrevious', function() {
      it('will correctly highlight the previous node', function() {
         typeAhead.menu._highlighted_option = testNode2;
         typeAhead.focusPrevious(testNode2);
         expect(testNode1.className).not.toContain('dijitMenuItemSelected');
         expect(testNode1.className).toContain('dijitMenuItemHover');
      });
      it('will correctly highlight the searchButton if the previousNode is null', function() {
         typeAhead.menu._highlighted_option = null;
         typeAhead.focusPrevious(testNode1);
         expect(typeAhead.menu.searchButton.className).toContain('dijitMenuItemHover');
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/TypeAheadMenu.focusNext', function() {
      it('will correctly highlight the next node', function() {
         typeAhead.menu._highlighted_option = testNode1;
         typeAhead.focusNext(testNode1);
         expect(testNode2.className).not.toContain('dijitMenuItemSelected');
         expect(testNode2.className).toContain('dijitMenuItemHover');
      });

      it('will correctly highlight the first item in the list if there is no highlighted option', function() {
         typeAhead.menu.previousButton = tempPrevious;
         typeAhead.menu._highlighted_option = null;
         typeAhead.focusNext(testNode1);
         expect(testNode1.className).toContain('dijitMenuItemHover');
      });
   });

});
