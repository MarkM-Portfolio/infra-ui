define([
    "dojo/_base/lang"
], function (lang) {
    "use strict";

    return {
        keyDashValue: function () {
            return function (value, binding) {
                return binding.source.key + "-" + (value || "default");
            };
        },

        nls: function (nls) {
            return function (value) {
                return lang.getObject(("" + value).toUpperCase(), false, nls) || "";
            };
        },

        ctor: function (Constructor, key) {
            return function (value) {
                var args = {
                    value: value
                };

                args[key] = value;

                return new Constructor(args);
            };
        },

        px: function () {
            return function (value) {
                return value ? value + "px" : "0";
            };
        }
    };
});
