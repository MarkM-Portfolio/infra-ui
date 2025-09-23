/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.mentions.mentionsTypeaheadUtilsSpec");

dojo.require("lconn.core.widget.mentions.MentionsTypeaheadUtils");

(function(clazz) {
   var CHAR_CODE_AT = '@'.charCodeAt(0),
      CHAR_CODE_HASH = '#'.charCodeAt(0),
      CHAR_CODE_DOLLAR = '$'.charCodeAt(0);
   
   function getSelection(selStart, selEnd, startContainer, endContainer) {
      return {
         selection: {
            removeAllRanges: function() {},
            addRange: function() {}
         },
         range: {
            endContainer: endContainer,
            setStartAfter: function() {},
            setEndAfter: function() {}
         }
      }
   }
   
   describe("the method MentionsTypeaheadUtils.isTrackedKeyCode", function() {
      var m, t;
      beforeEach(function() {
         m = new clazz();
         m.textAreaNode = dojo.doc.createElement('div', {contentEditable: true});
         // Mock
         m.getSelection = getSelection;
         m.detectURL = function() {}

         t = dojo.doc.createTextNode("Let's create a smarter mentions control.")
         m.textAreaNode.appendChild(t);
      })
      it("returns true if char code matches a registered type", function() {
         m._registeredTypes = [{_activatorChar: "@"}];
         expect(m.isTrackedKeyCode({keyCode: CHAR_CODE_AT, charCode: CHAR_CODE_AT})).toBeTruthy();
         
         m._registeredTypes = [{_activatorChar: "$"}];
         expect(m.isTrackedKeyCode({keyCode: CHAR_CODE_DOLLAR, charCode: CHAR_CODE_DOLLAR})).toBeTruthy();
         
         m._registeredTypes = [{_activatorChar: "#"}];
         expect(m.isTrackedKeyCode({keyCode: CHAR_CODE_HASH, charCode: CHAR_CODE_HASH})).toBeTruthy();
      });
      it("returns false for other characters", function() {
         expect(m.isTrackedKeyCode({keyCode: dojo.keys.SPACE, charCode: dojo.keys.SPACE})).toBeFalsy();
         expect(m.isTrackedKeyCode({keyCode: dojo.keys.BACKSPACE})).toBeFalsy();
         expect(m.isTrackedKeyCode({keyCode: dojo.keys.ENTER})).toBeFalsy();
      });
   });
}(lconn.core.widget.mentions.MentionsTypeaheadUtils));
