/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Suite of mentions Jasmine specs
 * @module lconn.test.jasmine.mentions.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

dojo.provide('lconn.test.jasmine.mentions.specSuite');
try {
   dojo.require('lconn.test.jasmine.mentions.MentionsDataFormatterSpec');
   dojo.require('lconn.test.jasmine.mentions.MentionsHelperSpec');
   dojo.require('lconn.test.jasmine.mentions.MentionsKeyHandlersSpec');
   dojo.require('lconn.test.jasmine.mentions.MentionsNodeSpec');
   dojo.require('lconn.test.jasmine.mentions.mentionsTypeaheadUtilsSpec');
   dojo.require('lconn.test.jasmine.mentions.MentionsUtilsSpec');
   dojo.require('lconn.test.jasmine.mentions.PersonMentionsNodeSpec');
   dojo.require('lconn.test.jasmine.mentions.TagMentionsNodeSpec');
   dojo.require('lconn.test.jasmine.mentions.TagMentionsTypeSpec');
   dojo.require('lconn.test.jasmine.mentions.URLMentionsNodeSpec');
   dojo.require('lconn.test.jasmine.mentions.URLPreviewMixinSpec');
   dojo.require('lconn.test.jasmine.mentions.utilitiesSpec');
   dojo.require('lconn.test.jasmine.mentions.PersonMentionsTypeSpec');
} catch (e) {
   console.debug(e);
}
