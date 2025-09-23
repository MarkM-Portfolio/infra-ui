/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "dojo/_base/array",
   "dojo/dom-class",
   "dojo/dom-geometry",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-construct",
   "dojo/on",
   "dojo/string",
   "dojo/text!./templates/GlobalizationPreferences.html",
   "dijit/_Templated",
   "dijit/_Widget",
   "dojox/lang/functional/object",
   "ic-core/HelpLauncher",
   "ic-core/config",
   "ic-core/config/language",
   "ic-core/globalization/config",
   "ic-core/locale"
], function (array, domClass, domGeometry, declare, lang, domConstruct, on, string, template, _Templated, _Widget, df, HelpLauncher, config, languageConfig, globalizationConfig, locale) {

   var LANGUAGE = "language",
      BIDI = "bidi",
      DIRECTION = "direction",
      CALENDAR = "calendar",
      BEFORE = "before",
      FIRST = "first";

   var CONDITIONAL_FIELDS = [LANGUAGE];
   var FIELDS_WITH_TOOLTIPS = [LANGUAGE, BIDI, DIRECTION];
   var SELECT_FIELDS = [LANGUAGE, DIRECTION, CALENDAR];

   var gc = globalizationConfig, def = gc.defaults;

   function node(o, n) {
      return o[n+"Node"];
   }

   function c(n) {
      return n.substr(0,1).toUpperCase() + n.substr(1);
   }

   function getDefaultDirection(s) {
      return domGeometry.isBodyLtr() ? s.direction.options.default_ltr : s.direction.options.default_rtl;
   }

   function resetOptions(n) {
      var sel = node(this, n), opts = sel.options;
      array.forEach(opts, function(opt, i) {
         if (opt.defaultSelected)
            sel.selectedIndex = i;
      });
   }

   function disableField(n) {
      var fld = this[n+"Field"], disabled = this["disable"+c(n)];
      if (disabled) {
         domClass.add(fld, "lotusHidden");
      }
   }

   function setOptions(s, n) {
      var sel = node(this, n), opts = getOptions.call(this, s, n), idx = 0;
      array.forEach(opts, function(opt, i) {
         if (opt.selected)
            idx = i;
         sel.options[sel.options.length] = new Option(opt.label, opt.value, opt.selected);
      });
      sel.selectedIndex = idx;
   }

   function getOptions(s, n) {
      switch (n) {
         case LANGUAGE:
            var l = languageConfig.languages, arr = [],
               keys = df.keys(l);
            array.forEach(keys, function(key) {
               // FIXME: should accept a language value, not use the current locale
               var selected = key === locale.getLocale(), lk = l[key];
               arr.push({label: selected ? string.substitute(s.language.selected, [lk]) : lk, value: key, selected: selected});
            });
            return arr;
         case DIRECTION:
            var arr = [
               {label: getDefaultDirection(s), value: gc.TEXT_DIRECTION.DEFAULT},
               {label: s.direction.options.ltr, value: gc.TEXT_DIRECTION.LEFT_TO_RIGHT},
               {label: s.direction.options.rtl, value: gc.TEXT_DIRECTION.RIGHT_TO_LEFT},
               {label: s.direction.options.contextual, value: gc.TEXT_DIRECTION.CONTEXTUAL}
            ];
            array.forEach(arr, lang.hitch(this, function(opt) { opt.selected = opt.value === this.direction; }));
            return arr;
         case CALENDAR:
            var arr = [
               {label: s.calendar.options.gregorian, value: gc.CALENDAR.GREGORIAN},
               {label: s.calendar.options.hebrew, value: gc.CALENDAR.HEBREW},
               {label: s.calendar.options.hijri, value: gc.CALENDAR.HIJRI}
            ];
            array.forEach(arr, lang.hitch(this, function(opt) { opt.selected = opt.value === this.calendar; }));
            return arr;
      }
   }

   function valueOfSelect(n) {
      var el = node(this, n);
      return el.value || el.options[el.selectedIndex].value;
   }

   function setSelectValue(n, val) {
      var el = node(this, n);
      for (var i=0;i<el.options.length;i++)
         if (el.options[i].value === val) {
            if (i !== el.selectedIndex) {
               // FIXME: we can't optimistically assume the dirty state is
               // cleared as it depends on many fields
               // if (el.options[i].defaultSelected) {
               // resetDirty.call(this);
               // }
               // else {
               setDirty.call(this);
               // }
            }
            el.selectedIndex = i;
            return;
         }
   }

   function enableSelect(n, yorn) {
      var el = node(this, n);
      el.disabled = !yorn;
   }

   function setChecked(n, yorn, makeDef) {
      var el = node(this, n);
      if (el.checked ^ yorn)
         setDirty.call(this);
      el.checked = yorn;
      if (makeDef) el.defaultChecked = yorn;
   }

   function resetChecked(n) {
      var el = node(this, n);
      el.checked = el.defaultChecked;
      this._onBidiChange();
   }

   function enableCancel() {
      domClass[this.dirty ? 'remove' : 'add'](this.cancelButton, 'lotusBtnDisabled');
      this.cancelButton.disabled = !this.dirty;
   }

   function setDirty() {
      this.dirty = true;
      enableCancel.call(this);
   }

   function resetDirty() {
      this.dirty = false;
      enableCancel.call(this);
   }

   function applyActions() {
      array.forEach(this.actions, lang.hitch(this, function(action) {
         var a = domConstruct.create("input", {
            type: "button",
            className: "lotusBtn",
            title: action.getTooltip(),
            value: action.getName()
         }, this.cancelButton, BEFORE);
         var opt = {}; // TODO:
         on(a, "click", lang.hitch(action, action.execute, this, opt));
      }));
   }

   function setValues() {
      this.setBidi(this.bidi, true);
      this.setTextDirection(this.direction);
      this.setCalendar(this.calendar);
   }

   function restoreValues() {
      this.bidi = def.bidiEnabled;
      this.direction = def.textDirection;
      this.calendar = def.calendar;
      setValues.call(this);
   }

   /**
    * Globalization widgets
    * @namespace ic-core.globalization.widget
    */

   /**
    * Globalization preferences widget
    * @class ic-core.globalization.widget.GlobalizationPreferences
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var GlobalizationPreferences = declare("lconn.core.globalization.widget.GlobalizationPreferences", [_Widget, _Templated],
      /** @lends ic-core.globalization.widget.GlobalizationPreferences.prototype */ {
      templateString: template,
      /** Strings used for this widget */
      strings: {},
      /** Strings used for the help launcher */
      helpStrings: {},
      /** Actions to be rendered within this form */
      actions: null,
      /** If true, disables the language picker */
      disableLanguage: false,
      /** Makes calendar preference independent from bidi support */
      isCalendarIndependent: true,

      /** Value of bidi enabled preference */
      bidi: true,
      /** Value of text direction preference */
      direction: gc.TEXT_DIRECTION.DEFAULT,
      /** Value of calendar preference */
      calendar: gc.CALENDAR.GREGORIAN,

      postCreate: function() {
         // Instantiate comboboxes with data stores
         var _s = this.strings, _h = this.helpStrings;

         // Conditional disable
         array.forEach(CONDITIONAL_FIELDS, lang.hitch(this, disableField));

         // Instantiate dropdowns
         array.forEach(SELECT_FIELDS, lang.hitch(this, setOptions, _s));

         // Instantiate help tooltips
         array.forEach(FIELDS_WITH_TOOLTIPS, lang.hitch(this, function(n) {
            HelpLauncher.createHelpLink(this[n + "HelpNode"], null, _s[n].tooltip, {CLOSE: _h.close, HELP: _h.help});
            // Inject invisible span to differentiate help button labels otherwise read all as 'Help'
            domConstruct.create('span', {'class': 'lotusAccess', innerHTML: _s[n].label}, this[n + "HelpNode"], FIRST);
         }));

         setValues.call(this);

         applyActions.call(this);

         resetDirty.call(this);

         this.subscribe("ic-core/globalization/restored", lang.hitch(this, restoreValues));
      },
      /**
       * Returns a JSON object representing the preferences controlled by the widget
       * @returns a JSON object representing the preferences controlled by the widget
       */
      getPreferences: function() {
         var prefs = {};
         prefs[gc.SETTINGS.BIDI_ENABLED] = this.getBidi();
         prefs[gc.SETTINGS.TEXT_DIRECTION] = this.getTextDirection();
         prefs[gc.SETTINGS.CALENDAR] = this.getCalendar();
         return prefs;
      },
      /**
       * Returns the value of language preference
       * @returns the value of language preference
       */
      getLanguage: function() {
         return valueOfSelect.call(this, LANGUAGE);
      },
      /**
       * Returns the value of text direction preference
       * @returns the value of text direction preference
       */
      getTextDirection: function() {
         return valueOfSelect.call(this, DIRECTION);
      },
      /**
       * Sets the value of text direction preference
       * @param {String} dir The value of text direction preference
       */
      setTextDirection: function(dir) {
         setSelectValue.call(this, DIRECTION, dir);
      },
      /**
       * Returns the value of calendar preference
       * @returns the value of calendar preference
       */
      getCalendar: function() {
         return valueOfSelect.call(this, CALENDAR);
      },
      /**
       * Sets the value of calendar preference
       * @param {String} dir The value of calendar preference
       */
      setCalendar: function(calendar) {
         setSelectValue.call(this, CALENDAR, calendar);
      },
      /**
       * Returns the value of bidi enabled preference
       * @returns the value of bidi enabled preference
       */
      getBidi: function() {
         return node(this, BIDI).checked;
      },
      /**
       * Sets the value of bidi enabled preference
       * @param {boolean} yorn The value of bidi enabled preference
       * @param {boolean} makeDef Set to true to make the value default
       */
      setBidi: function(yorn, makeDef) {
         setChecked.call(this, BIDI, yorn, makeDef);
         this._onBidiChange();
      },
      /**
       * Returns true when the widget has unsaved changes
       * @returns true when the widget has unsaved changes
       */
      isDirty: function() { return this.dirty; },
      /**
       * Called when the selection of one of the dropdown controls changes
       * @private
       */
      _onSelChange: function() {
         setDirty.call(this);
      },
      /**
       * Called when the value of the bidi enabled preference changes
       * @private
       */
      _onBidiChange: function() {
         var n = node(this, BIDI), yorn = n.checked;
         if (n.defaultChecked ^ yorn)
            setDirty.call(this);
         enableSelect.call(this, DIRECTION, yorn);
         if (!this.isCalendarIndependent)
            enableSelect.call(this, CALENDAR, yorn);
      },
      /**
       * Called when the user cancels their changes i.e. resets the widget
       * @private
       */
      _onCancel: function() {
         array.forEach(SELECT_FIELDS, lang.hitch(this, resetOptions));
         resetChecked.call(this, BIDI);
         resetDirty.call(this);
      }
   });

   return GlobalizationPreferences;
});
