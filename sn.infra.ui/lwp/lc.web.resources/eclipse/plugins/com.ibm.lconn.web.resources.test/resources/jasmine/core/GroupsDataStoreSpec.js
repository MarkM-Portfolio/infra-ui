/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

dojo.provide("lconn.test.jasmine.core.GroupsDataStoreSpec");
dojo.require("lconn.core.GroupsDataStore");

(function(domConstruct, GroupsDataStore) {

   describe('the lconn.core.GroupsDataStore class', function() {
      var store;
      beforeEach(function() {
         store = new GroupsDataStore({}, domConstruct.create('div'));
      });

      it('the interface implements the expected methods', function() {
         expect(store.fetch).toBeDefined();
         expect(store.getValue).toBeDefined();
         expect(store.setBrowsingChildGroups).toBeDefined();
         expect(store.setGroupTypeahead).toBeDefined();
         expect(store.setOrgId).toBeDefined();
      });

      it('the getValue() method returns the attribute of the item if available', function() {
         expect(store.getValue({
            'name' : 'Admin Group'
         }, 'name', 'Stakeholders Group')).toEqual('Admin Group');
      });
      it('the getValue() method returns the default value if attribute of the item not available', function() {
         expect(store.getValue(null, 'name', 'Stakeholders Group')).toEqual('Stakeholders Group');
         expect(store.getValue({
            'name' : 'Admin Group'
         }, 'foo', 'Stakeholders Group')).toEqual('Stakeholders Group');
      });
   });
}(dojo, lconn.core.GroupsDataStore));
