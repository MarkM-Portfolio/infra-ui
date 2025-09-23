/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "../util/dom",
  "./AtomBean"
], function (declare, dom, AtomBean) {

  return declare([AtomBean], {
    _xmlSetter: function (xml) {
      this.inherited(arguments);

      this.set({
        sharedWith: dom.getAllUsers(xml, "user", dom.NS.TD, dom.getFirstTag(xml, "sharedWith", dom.NS.TD)),
        sharePermission: dom.getChildTextNS(xml, "sharePermission", dom.NS.TD)
      });
    }
  });
});
