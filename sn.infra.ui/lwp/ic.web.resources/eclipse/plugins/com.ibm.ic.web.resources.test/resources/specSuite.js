/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Suite of AMD Jasmine specs
 * 
 * @module ic-test.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

define([
      "./main",
      "./action/specSuite",
      "./app/specSuite",
      "./ajax/authSpec",
      "./bizCard/specSuite",
      "./ckeditor/specSuite",
      "./core/specSuite",
      "./dijit/specSuite",
      "./dojo/specSuite",
      "./dojox/specSuite",
      "./globalization/specSuite",
      "./layout/specSuite",
      "./lcTextArea/specSuite",
      "./mentions/specSuite",
      "./personcard/specSuite",
      "./ui/specSuite",
      "./util/specSuite",
      "./widget/specSuite",
      "ic-gadget-test/specSuite", // TODO: move to own Jasmine suite
      "ic-highway-test/specSuite", // TODO: move to own Jasmine suite
      "ic-mm-test/specSuite", // TODO: move to own Jasmine suite
      "ic-oauth-test/specSuite" // TODO: move to own Jasmine suite
], function() {
   return; // Play nice to JSLint
});
