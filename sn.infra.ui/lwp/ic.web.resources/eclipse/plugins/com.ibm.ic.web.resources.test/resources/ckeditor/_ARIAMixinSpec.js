/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo/_base/lang",
      "ic-ui/ckeditor/plugins/mentions/_ARIAMixin",
      "../mocks/ckeditor"
], function(lang, ARIAMixin, mocks) {

   /**
    * CKEditor framework specs
    * 
    * @namespace ic-test.ckeditor
    */

   /**
    * ARIA mixin specs
    * 
    * @module ic-test.ckeditor._ARIAMixinSpec
    */

   var TEXT = 'Hello';

   var DummyHandler = lang.mixin({
      idx : 0
   }, ARIAMixin);

   describe('the ic-ui/ckeditor/plugins/mentions/_ARIAMixin mixin', function() {
      var handler;
      beforeEach(function() {
         handler = lang.clone(DummyHandler);
      });
      afterEach(function() {
         handler.removeLabel();
         handler = undefined;
      });
      describe('the interface', function() {
         var _CKEDITOR;
         beforeEach(function() {
            _CKEDITOR = lang.getObject('CKEDITOR');
            lang.setObject('CKEDITOR', mocks.CKEDITOR);
         });
         afterEach(function() {
            lang.setObject('CKEDITOR', _CKEDITOR);
         });
         it('implements the expected methods', function() {
            expect(handler.addLabel).toEqual(jasmine.any(Function));
            expect(handler.setLabel).toEqual(jasmine.any(Function));
            expect(handler.removeLabel).toEqual(jasmine.any(Function));
            expect(handler.getLabel).toEqual(jasmine.any(Function));
         });
      });

      describe('the getLabel() method', function() {
         var _CKEDITOR, EL;
         beforeEach(function() {
            _CKEDITOR = lang.getObject('CKEDITOR');
            lang.setObject('CKEDITOR', mocks.CKEDITOR);
            EL = new CKEDITOR.dom.element('span', document);
         });
         afterEach(function() {
            lang.setObject('CKEDITOR', _CKEDITOR);
         });
         it('returns null if no label was added', function() {
            expect(handler.getLabel()).toBeNull();
         });
         it('returns the label if a label was added', function() {
            handler.addLabel(CKEDITOR, EL, TEXT);
            var label = handler.getLabel();
            expect(label).not.toBeNull();
            expect(label.nodeType).toBe(1);
            expect(label.getAttribute('aria-label')).toBe(TEXT);
            expect(label.innerHTML).toBe(TEXT);
         });
      });

      describe('the setLabel() method', function() {
         var _CKEDITOR, EL;
         beforeEach(function() {
            _CKEDITOR = lang.getObject('CKEDITOR');
            lang.setObject('CKEDITOR', mocks.CKEDITOR);
            EL = new CKEDITOR.dom.element('span', document);
         });
         afterEach(function() {
            lang.setObject('CKEDITOR', _CKEDITOR);
            handler.removeLabel();
         });
         it('does nothing if no label was created', function() {
            handler.addLabel(CKEDITOR, EL, TEXT);
            var label = handler.getLabel();
            handler.removeLabel();
            handler.deleteLabel();
            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe('');
            expect(handler.getLabel()).toBeNull();

            handler.setLabel('foo');

            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe('');
            expect(handler.getLabel()).toBeNull();
         });
         it('sets the label if one was created', function() {
            handler.addLabel(CKEDITOR, EL, TEXT);
            var label = handler.getLabel();
            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe(TEXT);

            handler.setLabel('foo');

            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe('foo');
         });
      });

      describe('the addLabel() method', function() {
         var _CKEDITOR, EL;
         beforeEach(function() {
            _CKEDITOR = lang.getObject('CKEDITOR');
            lang.setObject('CKEDITOR', mocks.CKEDITOR);
            EL = new CKEDITOR.dom.element('span', document);
            handler.deleteLabel();
         });
         afterEach(function() {
            lang.setObject('CKEDITOR', _CKEDITOR);
            handler.removeLabel();
         });
         it('creates a label if none was created', function() {
            var label = handler.getLabel();
            expect(label).toBeNull();

            handler.addLabel(CKEDITOR, EL, TEXT);
            label = handler.getLabel();

            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe(TEXT);
         });
         it('updates the label if one was created already', function() {
            handler.addLabel(CKEDITOR, EL, TEXT);
            var label = handler.getLabel();
            expect(label).not.toBeNull();

            handler.addLabel(CKEDITOR, EL, 'foo');

            expect(handler.getLabel()).toBe(label);
            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe('foo');
         });
      });

      describe('the removeLabel() method', function() {
         var _CKEDITOR, EL;
         beforeEach(function() {
            _CKEDITOR = lang.getObject('CKEDITOR');
            lang.setObject('CKEDITOR', mocks.CKEDITOR);
            EL = new CKEDITOR.dom.element('span', document);
            handler.removeLabel();
            handler.deleteLabel();
         });
         afterEach(function() {
            lang.setObject('CKEDITOR', _CKEDITOR);
            handler.removeLabel();
         });
         it('removes and deletes the label if one was created', function() {
            handler.addLabel(CKEDITOR, EL, TEXT);
            var label = handler.getLabel();
            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe(TEXT);

            handler.removeLabel();

            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe('');
         });
         it('does nothing if none exists', function() {
            handler.addLabel(CKEDITOR, EL, TEXT);
            var label = handler.getLabel();
            handler.removeLabel();
            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe('');
            expect(handler.getLabel()).not.toBeNull();

            handler.removeLabel();

            expect(label).not.toBeNull();
            expect(label.innerHTML).toBe('');
            expect(handler.getLabel()).not.toBeNull();
         });
      });
   });
});
