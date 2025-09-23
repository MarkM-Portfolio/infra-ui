/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.test.jasmine.ckeditor._ARIAMixinSpec");

dojo.require("lconn.core.ckplugins.mentions._ARIAMixin");
dojo.require("lconn.test.mocks.ckeditor");

(function(ARIAMixin, mocks) {

   var TEXT = 'Hello';

   var DummyHandler = dojo.safeMixin({
      idx : 0
   }, ARIAMixin);

   var handler;
   beforeEach(function() {
      handler = dojo.clone(DummyHandler);
   });
   afterEach(function() {
      handler.removeLabel();
      handler = undefined;
   });
   describe('the lconn.core.ckplugins.mentions._ARIAMixin mixin', function() {
      var _CKEDITOR;
      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
      });
      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('implements the expected methods', function() {
         expect(handler.addLabel).toEqual(jasmine.any(Function));
         expect(handler.setLabel).toEqual(jasmine.any(Function));
         expect(handler.removeLabel).toEqual(jasmine.any(Function));
         expect(handler.getLabel).toEqual(jasmine.any(Function));
      });
   });

   describe('the lconn.core.ckplugins.mentions._ARIAMixin.getLabel() method', function() {
      var _CKEDITOR, EL;
      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         EL = new CKEDITOR.dom.element('span', document);
      });
      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
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

   describe('the lconn.core.ckplugins.mentions._ARIAMixin.setLabel() method', function() {
      var _CKEDITOR, EL;
      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         EL = new CKEDITOR.dom.element('span', document);
      });
      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
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

   describe('the lconn.core.ckplugins.mentions._ARIAMixin.addLabel() method', function() {
      var _CKEDITOR, EL;
      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         EL = new CKEDITOR.dom.element('span', document);
         handler.deleteLabel();
      });
      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
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

   describe('the lconn.core.ckplugins.mentions._ARIAMixin.removeLabel() method', function() {
      var _CKEDITOR, EL;
      beforeEach(function() {
         _CKEDITOR = dojo.getObject('CKEDITOR');
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         EL = new CKEDITOR.dom.element('span', document);
         handler.removeLabel();
         handler.deleteLabel();
      });
      afterEach(function() {
         dojo.setObject('CKEDITOR', _CKEDITOR);
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
}(lconn.core.ckplugins.mentions._ARIAMixin, lconn.test.mocks.ckeditor));
