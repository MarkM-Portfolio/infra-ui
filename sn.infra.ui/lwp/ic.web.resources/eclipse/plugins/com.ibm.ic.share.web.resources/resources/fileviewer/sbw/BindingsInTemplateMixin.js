define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/_base/array",
    "./transforms"
], function (declare, lang, query, domAttr, array, transforms) {
    var DATA_ATTR = "data-sbw-bind",
        BindingsInTemplateMixin,
        CASE_INSENSITIVE        = "i",
        UNCAPTURED_GROUP_OPEN   = "(?:",
        GROUP_CLOSE             = ")",
        OPTIONAL                = "?",
        START_OF_LINE           = "^",
        END_OF_LINE             = "$",
        KEY_PATTERN             = "([a-z_${][a-z0-9_$.{}]*)",
        ATTRIBUTE_PATTERN       = "([-a-z0-9{}_]+)",
        STYLE_NAME_PATTERN      = "([-a-z{}_]+)",
        CTOR_INDICTATOR         = "(\\(ctor\\))" + OPTIONAL,
        TRANSFORM_PATTERN       = "([a-z_${][a-z0-9_${}]*)",
        OPTIONAL_STYLE_NAME,
        OPTIONAL_ATTRIBUTE,
        OPTIONAL_TRANSFORM,
        PATTERN,
        KEY_GROUP               = 1,
        ATTRIBUTE_GROUP         = 2,
        STYLE_NAME_GROUP        = 3,
        CTOR_INDICATOR_GROUP    = 4,
        TRANSFORM_GROUP         = 5;

    OPTIONAL_STYLE_NAME = UNCAPTURED_GROUP_OPEN + "=" + STYLE_NAME_PATTERN + GROUP_CLOSE + OPTIONAL;
    OPTIONAL_ATTRIBUTE = UNCAPTURED_GROUP_OPEN + ":" + ATTRIBUTE_PATTERN + GROUP_CLOSE + OPTIONAL + OPTIONAL_STYLE_NAME;
    OPTIONAL_TRANSFORM = UNCAPTURED_GROUP_OPEN + "!" + CTOR_INDICTATOR + TRANSFORM_PATTERN + GROUP_CLOSE + OPTIONAL;

    PATTERN = START_OF_LINE + KEY_PATTERN + OPTIONAL_ATTRIBUTE + OPTIONAL_TRANSFORM + END_OF_LINE;

    BindingsInTemplateMixin = declare([], {
        postCreate: function () {
            this.inherited(arguments);

            if (domAttr.has(this.domNode, DATA_ATTR)) {
                this._parse(this.domNode);
            }

            query("[" + DATA_ATTR + "]", this.domNode).forEach(lang.hitch(this, "_parse"));
        },

        _parse: function (node) {
            array.forEach(domAttr.get(node, DATA_ATTR).replace(/\s/g, "").split(","), lang.hitch(this, function (string) {
                if (!string) {
                    return;
                }

                var binding = BindingsInTemplateMixin._parse(string, this, this.model, node);

                if (!binding) {
                    console.warn("Invalid binding string:", string);
                } else {
                    this.add(binding);
                }
            }));
        }
    });

    BindingsInTemplateMixin._parse = function (string, context, model, node) {
        var regex = new RegExp(PATTERN, CASE_INSENSITIVE),
            groups = regex.exec(string),
            binding,
            key,
            attribute,
            style,
            transform;

        if (!groups || !groups[KEY_GROUP]) {
            return;
        }

        binding = {
            source: {
                model: model
            },
            target: {
                node: node
            }
        };

        key = BindingsInTemplateMixin._resolve(groups[KEY_GROUP], context);

        if (key.indexOf(".") > -1) {
            binding.source.field = key.slice(key.indexOf(".") + 1);
            key = key.slice(0, key.indexOf("."));
        }

        binding.source.key = key;

        attribute = BindingsInTemplateMixin._resolve(groups[ATTRIBUTE_GROUP], context);
        style = BindingsInTemplateMixin._resolve(groups[STYLE_NAME_GROUP], context);

        if (attribute === "class") {
            binding.target.type = "class";
        } else if (attribute === "child") {
            binding.target.type = "child";
        } else if (attribute === "style") {
            binding.target.type = "style";
            binding.target.style = style;
        } else if (attribute) {
            binding.target.type = "attribute";
            binding.target.attribute = attribute;
        }

        transform = BindingsInTemplateMixin._resolve(groups[TRANSFORM_GROUP], context);

        if (transform) {
            binding.transform = lang.getObject(transform, false, context);

            if (groups[CTOR_INDICATOR_GROUP]) {
                binding.transform = transforms.ctor(binding.transform);
            } else if (!binding.transform && transforms[transform]) {
                binding.transform = transforms[transform]();
            } else if (typeof binding.transform === "function") {
                binding.transform = lang.hitch(context, binding.transform);
            }
        }

        return binding;
    };

    BindingsInTemplateMixin._resolve = function (string, context) {
        var pattern = "\\{([^{}]+)\\}",                     // when string is `{{{placeholder_name}}}`
            groups = (new RegExp(pattern)).exec(string);    // then groups[1] is `placeholder_name`

        while (groups) {
            string = string.replace(groups[0], lang.getObject(groups[1], false, context));
            groups = (new RegExp(pattern)).exec(string);
        }

        return string;
    };

    return BindingsInTemplateMixin;
});