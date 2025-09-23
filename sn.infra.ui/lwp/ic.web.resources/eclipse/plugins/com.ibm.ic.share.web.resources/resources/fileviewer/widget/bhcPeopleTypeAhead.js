/* Copyright IBM Corp. 2016  All Rights Reserved.              */

define([
  "dojo/_base/lang",
  "../config/globals",
  "dojo/aspect",
  "../util/url",
  "dojo/dom-class",
  "dojo/query",
  "dojo/i18n!../nls/FileViewerStrings",
  "dijit/focus"
], function (lang, globals, aspect, url, domClass, query, i18n, focusUtil) {
  "use strict";
  
  return {
    create: function (inputNode, args) {
      var typeaheadArgs = {
        id: inputNode.id + "people",
        minChars: 2,
        searchDelay: 400,
        multipleValues: false,
        url: url.rewrite(globals.services.getContactsUrl() + "/typeahead/people", {
          users: true,
          internal: false,
          communities: false,
          contacts: true,
          intent: args.file.isExternal ? "external" : "internal"
        })
      };
      
      lang.mixin(typeaheadArgs, args);
      
      var typeahead = new bhc.PeopleTypeAhead(typeaheadArgs, inputNode);
      
      aspect.before(typeahead, "onSelect", function (typeaheadItem) {
        var item = {
          userid: typeaheadItem.i.i.replace("u_", ""),
          name: typeaheadItem.i.f,
          email: typeaheadItem.i.e
        };
        return [item];
      });
      
      aspect.before(typeahead, "_onBlur", lang.hitch(this, function () {
        this.updateHintText(typeahead.focusNode, null, false, false);
      }));
      
      aspect.before(typeahead, "_onFocus", lang.hitch(this, function () {
        this.updateHintText(typeahead.focusNode, null, true, true);
      }));
      
      this._initHintText(typeahead);
      this._fixStyling(typeahead.domNode);
      
      return typeahead;
    },
    
    _initHintText: function(typeahead) {
      this.updateHintText(typeahead.focusNode, i18n.TYPEAHEAD_BOX.PERSON_SHADOW, false, false);
    },
    
    // Copied & modified from lconn.files.lotuslive.PeopleTypeAhead
    updateHintText: function(focusNode, hint, isFocused, shouldFocus) {
      if (hint){
         focusNode.title = this.hintText = hint;
      }

      if (this.hintText) {
         if(!isFocused && (focusNode.value === "" || !focusNode.hasInput)) {
            focusNode.hasInput = false;
            focusNode.style.color = "#666";
            focusNode.value = this.hintText || "";
         }
         else if (!focusNode.hasInput) {
            focusNode.hasInput = true;
            focusNode.style.color = "#000";
            focusNode.value = "";
            if (shouldFocus)
              focusUtil.focus(focusNode);
         }
      }
    },
    
    // We need some special styling due to the fact that the bhc typeahead does
    // not appear correct in the file viewer due to the off-white background color
    _fixStyling: function (typeaheadNode) {
      domClass.add(typeaheadNode, "bhcPeopleTypeAhead");
      
      var typeaheadInput = query(".typeaheadInput", typeaheadNode)[0];
      if (typeaheadInput) {
        domClass.remove(typeaheadInput, "typeaheadInput");
      }
    }
  };
});
