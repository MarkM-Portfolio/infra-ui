/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/topic",
      "ic-core/globalization/widget/GlobalizationPreferences"
], function(topic, GlobalizationPreferences) {
   var STRINGS = {
      calendar : {
         label : "Calendar",
         options : {}
      },
      direction : {
         label : "Text Direction",
         options : {}
      },
      language : {
         label : "Language",
         selected : ''
      },
      bidi : {
         label : "Bidi",
         help : "Help Bidi"
      },
      cancel : {
         label : "Cancel"
      }
   };
   describe("the GlobalizationPreferences widget", function() {
      var widget;
      beforeEach(function() {
         widget = new GlobalizationPreferences({
            strings : STRINGS
         });
      });
      it("implements the expected methods", function() {
         expect(widget.getPreferences).toEqual(jasmine.any(Function));
         expect(widget.getLanguage).toEqual(jasmine.any(Function));
         expect(widget.getTextDirection).toEqual(jasmine.any(Function));
         expect(widget.setTextDirection).toEqual(jasmine.any(Function));
         expect(widget.getCalendar).toEqual(jasmine.any(Function));
         expect(widget.setCalendar).toEqual(jasmine.any(Function));
         expect(widget.getBidi).toEqual(jasmine.any(Function));
         expect(widget.setBidi).toEqual(jasmine.any(Function));
         expect(widget.isDirty).toEqual(jasmine.any(Function));
      });
      it("implements the expected properties", function() {
         expect(widget.actions).toBeDefined();
         expect(widget.bidi).toBeDefined();
         expect(widget.disableLanguage).toBeDefined();
         expect(widget.isCalendarIndependent).toBeDefined();
      });
      it("reacts to the 'ic-core/globalization/restored' topic", function() {
         widget.setCalendar('hijri');
         widget.setTextDirection('rtl');
         expect(widget.isDirty()).toBeTruthy();

         topic.publish("ic-core/globalization/restored");

         expect(widget.getCalendar()).not.toBe('hijri');
         expect(widget.getTextDirection()).not.toBe('rtl');
         expect(widget.isDirty()).toBeTruthy();
      });
      describe("the setCalendar() method", function() {
         it("updates the value of the calendar dropdown", function() {
            widget.setCalendar('gregorian');
            var index = widget.calendarNode.selectedIndex;
            widget.setCalendar('hebrew');
            expect(widget.calendarNode.selectedIndex).not.toBe(index);
         });
         it("updates the calendar", function() {
            widget.setCalendar('gregorian');
            expect(widget.getCalendar()).toBe('gregorian');
            widget.setCalendar('hebrew');
            expect(widget.getCalendar()).toBe('hebrew');
            widget.setCalendar('hijri');
            expect(widget.getCalendar()).toBe('hijri');
         });
         it("makes the widget dirty", function() {
            widget.setCalendar('hebrew');
            expect(widget.isDirty()).toBeTruthy();
         });
      });
      describe("the setTextDirection() method", function() {
         it("updates the value of the text direction dropdown", function() {
            widget.setTextDirection('ltr');
            var index = widget.directionNode.selectedIndex;
            widget.setTextDirection('contextual');
            expect(widget.directionNode.selectedIndex).not.toBe(index);
         });
         it("updates the text direction", function() {
            widget.setTextDirection('ltr');
            expect(widget.getTextDirection()).toBe('ltr');
            widget.setTextDirection('rtl');
            expect(widget.getTextDirection()).toBe('rtl');
            widget.setTextDirection('contextual');
            expect(widget.getTextDirection()).toBe('contextual');
         });
         it("makes the widget dirty", function() {
            widget.setTextDirection('contextual');
            expect(widget.isDirty()).toBeTruthy();
         });
      });
      // describe("the setLanguage() method", function() {
      // it("updates the value of the language dropdown", function() {
      // widget.setLanguage('fr');
      // var index = widget.languageNode.selectedIndex;
      // widget.setLanguage('it');
      // expect(widget.languageNode.selectedIndex).not.toBe(index);
      // });
      // it("updates the language", function() {
      // widget.setLanguage('fr');
      // expect(widget.getLanguage()).toBe('fr');
      // widget.setLanguage('it');
      // expect(widget.getLanguage()).toBe('it');
      // widget.setLanguage('es');
      // expect(widget.getLanguage()).toBe('es');
      // });
      // it("makes the widget dirty", function() {
      // widget.setLanguage('es');
      // expect(widget.isDirty()).toBeTruthy();
      // });
      // });
      describe("the setBidi() method", function() {
         it("updates the state of the bidi checkbox", function() {
            widget.setBidi(true);
            expect(widget.bidiNode.checked).toBeTruthy();
            widget.setBidi(false);
            expect(widget.bidiNode.checked).toBeFalsy();
         });
         it("updates the bidi value", function() {
            widget.setBidi(true);
            expect(widget.getBidi()).toBeTruthy();
            widget.setBidi(false);
            expect(widget.getBidi()).toBeFalsy();
         });
         it("makes the widget dirty", function() {
            widget.setBidi(true);
            widget.setBidi(false);
            expect(widget.isDirty()).toBeTruthy();
         });
      });
      describe("the isCalendarIndependent property", function() {
         var widget_calendar_dependent;
         beforeEach(function() {
            widget_calendar_dependent = new GlobalizationPreferences({
               strings : STRINGS,
               isCalendarIndependent : false
            });
         });
         it("controls the conditional enablement of the calendar", function() {
            widget_calendar_dependent.setBidi(true);
            expect(widget_calendar_dependent.calendarNode.disabled).toBeFalsy();
            widget_calendar_dependent.setBidi(false);
            expect(widget_calendar_dependent.calendarNode.disabled).toBeTruthy();
         });
      });
      describe("the getPreferences() method", function() {
         it("returns a JSON representation of the widget state", function() {
            widget.setBidi(true);
            widget.setCalendar('gregorian');
            widget.setTextDirection('ltr');
            expect(widget.getPreferences()).toEqual({
               'bidiEnabled' : true,
               'calendar' : 'gregorian',
               'textDirection' : 'ltr'
            });

            widget.setBidi(false);
            widget.setCalendar('hebrew');
            widget.setTextDirection('rtl');
            expect(widget.getPreferences()).toEqual({
               'bidiEnabled' : false,
               'calendar' : 'hebrew',
               'textDirection' : 'rtl'
            });
         });
      });
      describe("the isDirty() method", function() {
         it("is aware of the widget's initial state", function() {
            var w1 = new GlobalizationPreferences({
               strings : STRINGS,
               bidi : false,
               direction : 'rtl',
               calendar : 'hijri'
            });
            w1.setBidi(false);
            w1.setTextDirection('rtl');
            w1.setCalendar('hijri');
            expect(w1.isDirty()).toBeFalsy();

            w1.setBidi(true);
            w1.setTextDirection('contextual');
            w1.setCalendar('hebrew');
            expect(w1.isDirty()).toBeTruthy();

//            w1.setBidi(false);
//            w1.setTextDirection('rtl');
//            w1.setCalendar('hijri');
//            expect(w1.isDirty()).toBeFalsy();
         });
      });
   });
});
