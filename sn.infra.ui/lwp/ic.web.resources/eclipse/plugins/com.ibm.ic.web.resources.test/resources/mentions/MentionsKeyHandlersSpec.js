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
      "dojo",
      "dojo/_base/array",
      "dojo/dom-attr",
      "ic-core/widget/mentions/MentionsKeyHandlers"
], function(dojo, array, domAttr, MentionsKeyHandlers) {

   /**
    * Jasmine spec for {@link ic-core.widget.mentions.MentionsKeyHandlers}
    * 
    * @module ic-test.mentions.MentionsKeyHandlersSpec
    */
   describe("the ic-core/widget/mentions/MentionsKeyHandlers class", function() {
      var m;
      beforeEach(function() {
         m = new MentionsKeyHandlers();
      });

      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(m.hasNoKeyModifiers).toEqual(jasmine.any(Function));
            expect(m.canActivate).toEqual(jasmine.any(Function));
            expect(m.handleActivatorKey).toEqual(jasmine.any(Function));
            expect(m.isLeftArrow).toEqual(jasmine.any(Function));
            expect(m.moveToPrevious).toEqual(jasmine.any(Function));
            expect(m.moveToNext).toEqual(jasmine.any(Function));
            expect(m.handleLeftArrowMain).toEqual(jasmine.any(Function));
            expect(m.isRightArrow).toEqual(jasmine.any(Function));
            expect(m.handleRightArrowMain).toEqual(jasmine.any(Function));
            expect(m.isEscape).toEqual(jasmine.any(Function));
            expect(m.handleEscape).toEqual(jasmine.any(Function));
            expect(m.isTab).toEqual(jasmine.any(Function));
            expect(m.handleTab).toEqual(jasmine.any(Function));
            expect(m.isBoldHotkey).toEqual(jasmine.any(Function));
            expect(m.isItalicsHotkey).toEqual(jasmine.any(Function));
            expect(m.isUnderlineHotkey).toEqual(jasmine.any(Function));
            expect(m.isPasteHotkey).toEqual(jasmine.any(Function));
            expect(m.handlePrePaste).toEqual(jasmine.any(Function));
            expect(m.isBackspace).toEqual(jasmine.any(Function));
            expect(m.handleBackspace).toEqual(jasmine.any(Function));
            expect(m.isDelete).toEqual(jasmine.any(Function));
            expect(m.isSpace).toEqual(jasmine.any(Function));
            expect(m.isCtrlEnter).toEqual(jasmine.any(Function));
            expect(m.isEnter).toEqual(jasmine.any(Function));
            expect(m.isTrackedKey).toEqual(jasmine.any(Function));
            expect(m.isUpDownArrow).toEqual(jasmine.any(Function));
            expect(m.handleUpDownArrow).toEqual(jasmine.any(Function));
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.hasNoKeyModifiers() method", function() {
         var e = {
            shiftKey : true,
            ctrlKey : true,
            altKey : true,
            metaKey : true
         };
         var ee = {
            shiftKey : false,
            ctrlKey : false,
            altKey : false,
            metaKey : false
         };
         it("returns the value if a modifier key is entered", function() {
            expect(m.hasNoKeyModifiers(e)).toBeFalsy();
         });

         it("returns the value if a modifier key isn't entered", function() {
            expect(m.hasNoKeyModifiers(ee)).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.canActivate() method", function() {
         it("returns false because the preChar is not in an activateable state", function() {
            var preChar = "hey";
            expect(m.canActivate(preChar)).toBeFalsy();
         });

         it("returns true because the preChar is not in an activateable state", function() {
            var preChar = " hey";
            expect(m.canActivate(preChar)).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isLeftArrow() method", function() {
         it("returns the left arrow keyCode", function() {
            expect(m.isLeftArrow({
               keyCode : dojo.keys.LEFT_ARROW,
               charCode : 0
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isRightArrow() method", function() {
         it("returns the right arrow keyCode", function() {
            expect(m.isRightArrow({
               keyCode : dojo.keys.RIGHT_ARROW,
               charCode : 0
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isEscape() method", function() {
         it("returns the escape keyCode", function() {
            expect(m.isEscape({
               keyCode : dojo.keys.ESCAPE,
               charCode : 0
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isTab() method", function() {
         it("returns the tab keyCode", function() {
            expect(m.isTab({
               keyCode : dojo.keys.TAB,
               charCode : 0
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isBoldHotkey() method", function() {
         it("returns the bold hotkey keyCode", function() {
            expect(m.isBoldHotkey({
               keyCode : 66
            })).toBeFalsy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isItalicsHotkey() method", function() {
         it("returns the italics hotkey keyCode", function() {
            expect(m.isItalicsHotkey({
               keyCode : 73
            })).toBeFalsy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isUnderlineHotkey() method", function() {
         it("returns the underline hotkey keyCode", function() {
            expect(m.isUnderlineHotkey({
               keyCode : 85
            })).toBeFalsy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isBackspace() method", function() {
         it("returns the backspace keyCode", function() {
            expect(m.isBackspace({
               keyCode : dojo.keys.BACKSPACE,
               charCode : 0
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isDelete() method", function() {
         it("returns the delete keyCode", function() {
            expect(m.isDelete({
               keyCode : dojo.keys.DELETE,
               charCode : 0
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isSpace() method", function() {
         it("returns the space keyCode", function() {
            expect(m.isSpace({
               keyCode : dojo.keys.SPACE
            })).toBeFalsy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isCtrlEnter() method", function() {
         it("returns the ctrl+enter keyCode", function() {
            expect(m.isCtrlEnter({
               keyCode : 10
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isEnter() method", function() {
         it("returns the enter keyCode", function() {
            expect(m.isEnter({
               keyCode : dojo.keys.ENTER,
               charCode : 0
            })).toBeTruthy();
         });
      });

      describe("the ic-core/widget/mentions/MentionsKeyHandlers.isUpDownArrow() method", function() {
         it("returns the up arrow keyCode", function() {
            expect(m.isUpDownArrow({
               keyCode : dojo.keys.UP_ARROW,
               charCode : 0
            })).toBeTruthy();
         });

         it("returns the down arrow keyCode", function() {
            expect(m.isUpDownArrow({
               keyCode : dojo.keys.DOWN_ARROW,
               charCode : 0
            })).toBeTruthy();
         });
      });
   });
});
