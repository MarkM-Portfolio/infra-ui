/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
   ], function() {

   /**
    * Mock for {@link ic-ui.DialogUtil}
    * @namespace ic-test.mocks.DialogUtil
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var DialogUtil = {}, _callback;

   DialogUtil.alert = function(title, message, callback) {
      return;
   };

   DialogUtil.prompt = function(title, message, submit, cancel, callback, dialogCss) {
      _callback = callback;
   };

   DialogUtil.popupForm = function(title, node, submit, cancel, onSubmit, onCancel) {
      return;
   };

   DialogUtil.submit = function() {
      _callback(true);
   };

   DialogUtil.cancel = function() {
      _callback(false);
   };

   return DialogUtil;
});

