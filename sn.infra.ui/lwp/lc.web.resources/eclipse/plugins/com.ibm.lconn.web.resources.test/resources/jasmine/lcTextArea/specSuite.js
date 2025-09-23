/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Suite of Jasmine specs encompassing lcTextArea widgets and mixins
 * 
 * @module lconn.test.jasmine.lcTextArea.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('lconn.test.jasmine.lcTextArea.specSuite');
try {
   dojo.require('lconn.test.jasmine.lcTextArea.BasicTextBoxSpec');
   dojo.require('lconn.test.jasmine.lcTextArea.IMentionsSupportSpec');
   dojo.require('lconn.test.jasmine.lcTextArea.IMentionsSupportRTESpec');
   dojo.require('lconn.test.jasmine.lcTextArea.ITextBoxSupportSpec');
   dojo.require('lconn.test.jasmine.lcTextArea.ITextBoxUtilsSpec');
   dojo.require('lconn.test.jasmine.lcTextArea.MentionsProviderSpec');
   dojo.require('lconn.test.jasmine.lcTextArea.ITextBoxControlSpec');
   dojo.require('lconn.test.jasmine.lcTextArea.MentionsSpec');
} catch (e) {
   console.debug(e);
}
