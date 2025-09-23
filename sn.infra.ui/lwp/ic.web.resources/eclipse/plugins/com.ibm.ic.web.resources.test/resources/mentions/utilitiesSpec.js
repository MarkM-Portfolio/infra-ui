/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/dom-construct",
   "dojo/query",
   "ic-core/config",
   "ic-core/config/services",
   "ic-core/widget/mentions/utilities"
], function (domConstruct, query, config, services, utils) {
   
/**
 * Tests for the utilities used for the mentions feature.
 *
 * @module ic-test.mentions.utilitiesSpec
 */

   describe('the ic-core/widget/mentions/utilities module', function() {
      it('implements the expected methods', function() {
         expect(utils.isSmartCloud).toEqual(jasmine.any(Function));
         expect(utils.isProfilesEnabled).toEqual(jasmine.any(Function));
      });
   });

   describe('the ic-core/widget/mentions/utilities.isSmartCloud method', function() {
      var contextCloud, contextOnPremises;
      beforeEach(function() {
         contextCloud = {environment:"SmartCloud"};
         contextOnPremises = {environment:"OnPremises"};
      });
      it('correctly detects the SmartCloud environment', function() {
         expect(utils.isSmartCloud(contextCloud)).toBeTruthy();
         expect(utils.isSmartCloud(contextOnPremises)).toBeFalsy();
         expect(utils.isSmartCloud(null)).toBeFalsy();
      });
   });

   describe('the ic-core/widget/mentions/utilities.isProfilesEnabled method', function() {
      var _config_profiles;
      beforeEach(function() {
         _config_profiles = services.profiles;
      });
      afterEach(function() {
         services.profiles = _config_profiles;
      });
      it('returns true if Profiles is enabled', function() {
         services.profiles = {};
         expect(utils.isProfilesEnabled()).toBeTruthy();

         delete services.profiles;
         expect(utils.isProfilesEnabled()).toBeFalsy();
      });
   });

   describe("cleanup HTML of PersonHandler ", function() {
      it("removes bizcard and contenteditable attributes from one occurrence of Person mention HTML", function() {
         var testData = '<span contenteditable="false" class="vcard"> <a class="fn url hasHover" href="http://lcauto5.swg.usma.ibm.com/profiles/html/profileView.do?userid=8cbefec0-f6df-1032-9ad4-d02a14283ea9" icbizcard_ref="1" icbizcard_idx="5" aria-label="@Amy Jones100. Click here or press control-enter to view the business card">@Amy Jones100</a><span class="x-lconn-userid" style="display: none">8cbefec0-f6df-1032-9ad4-d02a14283ea9</span></span>';
         var preTest = domConstruct.toDom('<div>'+testData+'</div>');

         expect(query("span[contenteditable]", preTest).length).toEqual(1);
         expect(query("a.fn.url.hasHover", preTest).length).toEqual(1);
         expect(query("a[icbizcard_ref]", preTest).length).toEqual(1);
         expect(query("a[icbizcard_idx]", preTest).length).toEqual(1);
         expect(query("a[aria-label]", preTest).length).toEqual(1);

         var result = utils.cleanupHTML(testData);
         var domResult = domConstruct.toDom('<div>'+result+'</div>');

         expect(query("span[contenteditable]", domResult).length).toEqual(0);
         expect(query("a.fn.url.hasHover", domResult).length).toEqual(0);
         expect(query("a[icbizcard_ref]", domResult).length).toEqual(0);
         expect(query("a[icbizcard_idx]", domResult).length).toEqual(0);
         expect(query("a[aria-label]", domResult).length).toEqual(0);
      });

      it("removes bizcard and contenteditable attributes from multiple occurrences of Person mention HTML", function() {
         var i, testData = '', COUNT = 5;
         for (i = 0; i < COUNT; i++) {
            testData += '<span contenteditable="false" class="vcard"> <a class="fn url hasHover" href="http://lcauto5.swg.usma.ibm.com/profiles/html/profileView.do?userid=8cbefec0-f6df-1032-9ad4-d02a14283ea9" icbizcard_ref="1" icbizcard_idx="5" aria-label="@Amy Jones100. Click here or press control-enter to view the business card">@Amy Jones100</a><span class="x-lconn-userid" style="display: none">8cbefec0-f6df-1032-9ad4-d02a14283ea9</span></span>';
         }

         var preTest = domConstruct.toDom('<div>'+testData+'</div>');

         expect(query("span[contenteditable]", preTest).length).toEqual(COUNT);
         expect(query("a.fn.url.hasHover", preTest).length).toEqual(COUNT);
         expect(query("a[icbizcard_ref]", preTest).length).toEqual(COUNT);
         expect(query("a[icbizcard_idx]", preTest).length).toEqual(COUNT);
         expect(query("a[aria-label]", preTest).length).toEqual(COUNT);

         var result = utils.cleanupHTML(testData);
         var domResult = domConstruct.toDom('<div>'+result+'</div>');

         expect(query("span[contenteditable]", domResult).length).toEqual(0);
         expect(query("a.fn.url.hasHover", domResult).length).toEqual(0);
         expect(query("a[icbizcard_ref]", domResult).length).toEqual(0);
         expect(query("a[icbizcard_idx]", domResult).length).toEqual(0);
         expect(query("a[aria-label]", domResult).length).toEqual(0);
      });

      it("doesn't alter valid mention HTML", function() {
         var testData = '<span class="vcard"> <a class="fn url" href="http://lcauto5.swg.usma.ibm.com/profiles/html/profileView.do?userid=8cbefec0-f6df-1032-9ad4-d02a14283ea9">@Amy Jones100</a><span class="x-lconn-userid" style="display: none">8cbefec0-f6df-1032-9ad4-d02a14283ea9</span></span>';
         var result = utils.cleanupHTML(testData);
         expect(result).toEqual(testData);
      });
   });

});
