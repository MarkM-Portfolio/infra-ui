/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "../util/dom",
  "./AtomBean",
  "./ModeratedBean"
], function (declare, dom, AtomBean, ModeratedBean) {

  return declare([AtomBean, ModeratedBean], {
    constructor: function () {
      this.moderatedBeanType = "comment";
    },
    _contentSetter: function (value) {
      this.content = value;
      return this._dirtyPromise;
    }
  });
});
