/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Suite of Widget Jasmine specs
 * @module lconn.share.test.jasmine.widget.specSuite
 * @author Joshua Small <jmsmall@us.ibm.com>
 */

dojo.provide('lconn.share.test.widget.specSuite');
try {
   dojo.require('lconn.share.test.widget.FilePreviewSpec');
   dojo.require('lconn.share.test.widget.ThumbnailFactorySpec');
   dojo.require('lconn.share.test.widget.CommentsMentionsStreamRendererSpec');
   dojo.require('lconn.share.test.widget.ResizableSpec');
} catch (e) {
   console.debug(e);
}
