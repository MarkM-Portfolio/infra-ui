/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.BrowseGroupsSpec");

dojo.require("lconn.core.BrowseGroups");

(function(BrowseGroups) {
   var browseGroups = new BrowseGroups();
   browseGroups.browseGroupsList_W.items = [ 'a', 'b', 'c' ];
   var EVT_ON_TARGET_ITEM_0 = { // Click on element with item attribute
      target : {
         parentNode : {},
         getAttribute : function(name) {
            if (name === 'item')
               return '0'; // Note this must be a string
         },
         nodeType : 1
      }
   }, EVT_ON_TARGET_ITEM_1 = { // Click on child of element with item attribute
      target : {
         parentNode : {
            getAttribute : function(name) {
               if (name === 'item')
                  return '1';
            },
            nodeType : 1
         },
         getAttribute : function(name) {
            return null;
         },
         nodeType : 1
      }
   }, EVT_ON_TARGET_ITEM_2 = { // Click on element dangling
      target : {
         parentNode : null,
         getAttribute : function(name) {
            return null;
         },
         nodeType : 1
      }
   }, EVT_ON_TARGET_ITEM_3 = { // Click on text node of element with item attribute
      target : {
         parentNode : {
            getAttribute : function(name) {
               if (name === 'item')
                  return '2';
            },
            nodeType : 1
         },
         nodeType : 3
      }
   };

   describe('the lconn.core.BrowseGroups._selectOption', function() {
      it('calls onSelect() with the item represented by the target', function() {
         spyOn(browseGroups, 'onSelect');
         browseGroups._selectOption(EVT_ON_TARGET_ITEM_0);
         expect(browseGroups.onSelect).toHaveBeenCalledWith('a');
      });

      it('calls onSelect() with the correct item, even if the item is in the parentNode', function() {
         spyOn(browseGroups, 'onSelect');
         browseGroups._selectOption(EVT_ON_TARGET_ITEM_1);
         expect(browseGroups.onSelect).toHaveBeenCalledWith('b');
      });

      it('does not call onSelect(), in the event that no item is found in the target or a parent', function() {
         spyOn(browseGroups, 'onSelect');
         browseGroups._selectOption(EVT_ON_TARGET_ITEM_2);
         expect(browseGroups.onSelect).not.toHaveBeenCalled();
      });

      it('calls onSelect() with the item represented by the parent when the target is a text node', function() {
         spyOn(browseGroups, 'onSelect');
         browseGroups._selectOption(EVT_ON_TARGET_ITEM_3);
         expect(browseGroups.onSelect).toHaveBeenCalledWith('c');
      });
   });

}(lconn.core.BrowseGroups));
