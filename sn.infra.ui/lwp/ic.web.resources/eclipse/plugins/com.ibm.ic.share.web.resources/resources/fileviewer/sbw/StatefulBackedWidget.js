define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dojo/aspect",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom-style"
], function (declare, _WidgetBase, aspect, array, lang, query, domAttr, domClass, domConstruct, domStyle) {
    "use strict";

    var StatefulBackedWidget = declare([ _WidgetBase ], {
        constructor: function () {
            this._bindingsProcessed = false;
            this._bindings = [];

            aspect.after(this, "postCreate", lang.hitch(this, "_processBindings"));
        },

        add: function (binding) {
            if (this._bindingsProcessed) {
                this._processBinding(binding);
            } else {
                this._bindings.push(binding);
            }
        },

        modelChanged: function (binding) {
            binding._watchHandle.unwatch();
            this._processBinding(binding);
        },

        _processBindings: function () {
            array.forEach(this._bindings, this._processBinding, this);
            this._bindingsProcessed = true;
        },

        _processBinding: function (binding) {
            binding._watchHandle = binding.source.model.watch(binding.source.key,
                lang.hitch(this, "_onPropertyUpdated", binding));
            this._onPropertyUpdated(binding);
        },

        _onPropertyUpdated: function (binding) {
            var node, newValue;

            node = binding.target.node;

            if (typeof node === "string") {
                if (node === StatefulBackedWidget.DOM_NODE) {
                    node = this.domNode;
                } else {
                    node = query(node, this.domNode)[0];

                    if (!node) {
                        StatefulBackedWidget._warn("No node found for selector", binding.target.node);
                    }
                }
            }

            newValue = StatefulBackedWidget._getValue(binding);

            switch (binding.target.type) {
            case "class":
                if (!node) {
                    node = this.domNode;
                }

                if (!binding._previous) {
                    binding._previous = [];
                }

                array.forEach(binding._previous, function (previous) {
                    domClass.remove(node, previous);
                });

                domClass.add(node, newValue);

                if (array.indexOf(binding._previous, newValue) === -1) {
                    binding._previous.push(newValue);
                }

                break;

            case "style":
                if (!node) {
                    node = this.domNode;
                }

                if (!binding.target.style) {
                    StatefulBackedWidget._warn("Target missing style name", binding.target);
                    return;
                }

                domStyle.set(node, binding.target.style, newValue);

                if (binding.target.style.indexOf("-") > 0) {
                    domStyle.set(node, StatefulBackedWidget._toCamelCase(binding.target.style), newValue);
                }

                break;

            case "child":
                if (!newValue) {
                    return;
                }

                if (!node) {
                    StatefulBackedWidget._warn("No node found for target", binding.target);
                    return;
                }

                domConstruct.empty(node);

                if (typeof newValue.placeAt === "function") {
                    newValue.placeAt(node);
                } else {
                    node.appendChild(newValue);
                }

                break;

            case "attribute":
                if (!node) {
                    node = this.domNode;
                }

                if (!binding.target.attribute) {
                    StatefulBackedWidget._warn("Target missing attribute name", binding.target);
                    return;
                }

                domAttr.set(node, binding.target.attribute, newValue);
                break;

            default:
                if (!node) {
                    StatefulBackedWidget._warn("No node found for target", binding.target);
                    return;
                }

                domAttr.set(node, "innerHTML", newValue);
                break;
            }
        }
    });

    StatefulBackedWidget.DOM_NODE = "__domNode__";

    StatefulBackedWidget._warn = function (message, args) {
        console.warn(message, args);
    };

    StatefulBackedWidget._getValue = function (binding) {
        var value = binding.source.model.get(binding.source.key),
            transformed;

        if (binding.source.field) {
            value = lang.getObject(binding.source.field, false, value);
        }

        if (typeof binding.transform === "function") {
            transformed = binding.transform(value, binding);
        } else if (binding.transform) {
            transformed = binding.transform[value];
        }

        return transformed || value || "";
    };

    StatefulBackedWidget._toCamelCase = function (string) {
        var index = string.indexOf("-", 1),
            letter;

        while (index > 0 && index < string.length - 1) {
            letter = string.charAt(index + 1).toUpperCase();
            string = string.slice(0, index) + letter + string.slice(index + 2);

            index = string.indexOf("-");
        }

        return string;
    };

    return StatefulBackedWidget;
});
