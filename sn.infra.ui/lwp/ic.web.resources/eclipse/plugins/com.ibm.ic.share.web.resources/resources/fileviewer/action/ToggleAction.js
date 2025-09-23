/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./Action",
  "dojo/dom-class",
  "dojo/dom-attr"
], function (declare, Action, domClass, domAttr) {
  "use strict";

  return declare([Action], {
    checked: false,
    
    _toggle: function () {
      this.set("checked", !this.checked);
    },
    
    _setCheckedAttr: function (checked) {
      this.checked = checked;
      this._updateButton();
    },
    
    _updateButton: function () {
      var strings;
      if (this.checked) {
        domClass.add(this.domNode, "checked");
        strings = this.toggleStrings.checked;
      } else {
        domClass.remove(this.domNode, "checked");
        strings = this.toggleStrings.unchecked;
      }
      this._setTitle(strings.title);
      this.describedBy.innerHTML = strings.a11y;
      this.set(strings);
    },
    
    _makeToggleButton: function () {
      domAttr.set(this.describedBy, "aria-live", "polite");
      domClass.remove(this.describedBy, "lotusAccess");
      domClass.add(this.describedBy, "lotusOffScreen");
    }
  });
});
