/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for File Thumbnail widget
 * 
 * @module ic-share-test.widget.FileThumbnailSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

define([ "ic-share/widget/FileThumbnail"
], function(FileThumbnail) {
   describe('the FileThumbnail widget', function() {
      var widget;
      beforeEach(function() {
         widget = new FileThumbnail();
      });
      describe('interface', function() {
         it('[INCOMPLETE] implements the expected methods', function() {
            expect(widget.pinToggle).toEqual(jasmine.any(Function));
            // TODO: complete
         });

         it('[INCOMPLETE] has the expected properties', function() {
            expect(widget.isSelected).toBeDefined();
            // TODO: complete
         });
      });
   });
});
