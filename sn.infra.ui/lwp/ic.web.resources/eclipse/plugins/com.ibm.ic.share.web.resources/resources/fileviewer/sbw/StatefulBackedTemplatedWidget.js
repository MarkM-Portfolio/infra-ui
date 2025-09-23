define([
    "dojo/_base/declare",
    "./StatefulBackedWidget",
    "dijit/_TemplatedMixin",
    "./BindingsInTemplateMixin"
], function (declare, StatefulBackedWidget, _TemplatedMixin, BindingsInTemplateMixin) {
    "use strict";
    return declare([ StatefulBackedWidget, _TemplatedMixin, BindingsInTemplateMixin ], {});
});