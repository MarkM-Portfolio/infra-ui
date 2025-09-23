/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Mock app for Globalization preferences
 * 
 * @namespace ic-test.mocks.globalization.app
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

define(function() {
   return /** @lends ic-test.mocks.globalization.app */ {
      routes : {
         getPreferencesSettingsServiceUrl : function() {
            return '';
         }
      },
      nls : {
         'save' : {
            'success' : 'Your globalization settings have been updated',
            'action' : 'Save',
            'error' : 'An error occurred. Please try again later.',
            'action_tooltip' : 'Save globalization settings'
         },
         'restore_defaults' : {
            'success' : 'Your globalization settings have been restored to their original default values',
            'action' : 'Restore Defaults',
            'error' : 'An error occurred. Please try again later.',
            'action_tooltip' : 'Restore globalization settings to their original default values'
         }
      }
   };
});
