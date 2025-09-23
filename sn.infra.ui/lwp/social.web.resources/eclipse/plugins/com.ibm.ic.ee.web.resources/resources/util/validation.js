/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/window",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/config",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/dom-class",
	"dojo/query",
	"dojo/string",
	"dijit/focus",
	"ic-incontext/util/html",
	"ic-incontext/util/text"
], function (dojo, windowModule, array, lang, config, domConstruct, domAttr, i18nsocialEEStrings, domClass, query, string, focusUtils, html, text) {

	(function () {   
	var util = com.ibm.social.incontext.util;
	var validation = com.ibm.social.ee.util.validation = {
	   
	   TAG_LENGTH: 100,
	   VIEWNAME_LENGTH: 180,
	   COLUMNNAME_LENGTH: 252,
	   DESCRIPTION_LENGTH: 2048,
	   IE_VALID_DRIVE: /[a-zA-Z]\:\\/i,
	   SPLIT_TAGS: /[,\s]+/,
	   
	   nls: i18nsocialEEStrings,
	   
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   validateTextLength: function(s, maxbytes) {
	      if (!s)
	         return true;
	      var bytes = util.text.lengthUtf8(s);
	            
	      return (bytes <= maxbytes);
	   },
	   
	   addRequiredIndicator: function(el) {
	      var d = windowModule.doc;
	      var ri = domConstruct.create("span", {className: "lotusFormRequired"}, el);
	         ri.appendChild(d.createTextNode("*"));
	   },
	   
	   _addInlineErrorRow: function(row, fields, id, contents, destroyExisting) {
	      if (!lang.isArray(fields))
	        fields = [fields];
	      var field = fields[0];
	      var d = windowModule.doc;
	      var parent = field;
	      var fieldErrorId = field ? field.id + "Error" : null;
	      var parentTd;
	      while (parent && !(parent.nodeName == "TR" && domClass.contains(parent, "lotusFormFieldRow"))) {
	         parentTd = parent;
	         parent = parent.parentNode;
	      }
	      var row = parentTd.parentNode;
	      
	      var container;
	      var existingTr = (row.previousSibling && domClass.contains(row.previousSibling, "_qkrErrorRow")) ? row.previousSibling : null;
	      if (existingTr && destroyExisting) {
	         validation.removeInlineErrorRow(row, destroyExisting, id, true);
	         existingTr = null;
	      }
	      for (var i = 0; i < fields.length; i++) {
	         domClass.add(fields[i], "lotusFormErrorField");
	         fields[i].setAttribute("aria-invalid", "true");
	         if(fieldErrorId)
	            fields[i].setAttribute("aria-describedby", fieldErrorId);
	      }
	      if (existingTr) {
	         var td = query("TD.lotusFormError",existingTr)[0];
	         var ul = td.getElementsByTagName("UL")[0];
	         if (!ul) {
	            if (domAttr.get(td, "errorId") == id)
	               return;
	            ul = domConstruct.create("ul");
	               var li = domConstruct.create("li", {errorId: domAttr.get(td, "errorId")}, ul);
	                  while (td.firstChild) {
	                     var a = td.firstChild;
	                     td.removeChild(a);
	                     li.appendChild(a);
	                  }
	            td.appendChild(ul);
	            domAttr.set(td, "errorId", null);
	         }
	         else if (array.some(td.getElementsByTagName("li"), function(a) {return domAttr.get(a, "errorId") == id;})) {
	            return;
	         }
	         var li = domConstruct.create("li",{errorId: id}, ul);
	   
	         container = li;
	      }
	      else {
	         var totalColumns = validation.countCells(row);
	         var position = validation.countCells(row, parentTd);
	         
	         var tr = domConstruct.create("tr", {className: "_qkrErrorRow"});
	            if (position > 0) {
	               var td = domConstruct.create("td", null, tr);
	               domAttr.set(td, "colSpan", position);            
	            }
	            var td = domConstruct.create("td", {className: "lotusFormError"}, tr);
	               domAttr.set(td, "colSpan", totalColumns-position);
	         row.parentNode.insertBefore(tr, row);
	         
	         container = td;
	      }
	      domAttr.set(container, "errorId", id);
	      if (field && field.id) {
	         container = domConstruct.create("div", {"id": fieldErrorId}, container);
	      }
	      if (lang.isArray(contents)) {
	         for (var i=0; i<contents.length; i++) {
	            if (typeof contents[i] == "string") {
	               container.appendChild(d.createTextNode(contents[i]));
	            }
	            else
	               container.appendChild(contents[i]); 
	               
	            if (i > 0 && i < contents.length - 1)
	               container.appendChild(d.createTextNode(" "));                         
	         }
	      }
	      else if (typeof contents == "string")
	         container.appendChild(d.createTextNode(contents));
	      else
	         container.appendChild(contents);
	      container.setAttribute("role", "alert");
	   },
	   
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   addInlineErrorRow: function(row, fields, id, contents, destroyExisting) {
	      var d = windowModule.doc;
	      var updatedContents = [];
	      //Create image
	      var img = domConstruct.create("img", {alt: validation.nls.MESSAGE.ERROR, src: config.blankGif, className: "lotusIconMsgError"});
	         
	      if (lang.isArray(contents))
	         updatedContents = contents;
	      else if(typeof contents == "string")
	         updatedContents.push(d.createTextNode(contents));
	      else
	         updatedContents.push(contents);
	         
	      updatedContents.unshift(d.createTextNode("\u00a0"));
	      updatedContents.unshift(img);
	         
	      return validation._addInlineErrorRow(row, fields, id, updatedContents, destroyExisting);      
	   },
	   
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   removeInlineErrorRow: function(row, fields, id, dontTimeout) {
	      if (!lang.isArray(fields))
	        fields = [fields];
	      var field = fields[0];
	      var hasFormErrorField = false;
	      for (var i = 0; i < fields.length; i++) {
	         if (domClass.contains(fields[i], "lotusFormErrorField"))
	            hasFormErrorField = true;
	      }
	      if (hasFormErrorField) {
	         if (id) {
	            var errorRow = row.previousSibling;
	            var items = errorRow.getElementsByTagName("LI");
	            for (var i=0; i<items.length; i++) {
	               var li = items[i];
	               if (domAttr.get(li, "errorId") == id) {
	                  li.parentNode.removeChild(li);
	                  break;
	               }
	            }
	            var td = query("TD.lotusFormError",errorRow)[0];
	            if (items.length == 1) {
	               var li = items[0];
	               domConstruct.empty(td);
	               while (li.firstChild) {
	                  var el = li.firstChild;
	                  li.removeChild(el);
	                  td.appendChild(el);
	                  domAttr.set(td, "errorId", domAttr.get(li, "errorId"));               
	               }
	            }
	            else if (items.length == 0 && domAttr.get(td, "errorId") == id) {
	               validation._removeErrorRow(row, fields, id, dontTimeout);
	            }
	         }
	         else {
	            validation._removeErrorRow(row, fields, id, dontTimeout);
	         }
	      }
	      else if (row.previousSibling && domClass.contains(row.previousSibling, "_qkrErrorRow")) {
	         row.parentNode.removeChild(row.previousSibling);
	      }
	   },
	   
	   _removeErrorRow: function(row, fields, id, dontTimeout) {
	      //HACK removing this element from the dom is stopping the event chain when on change and onsubmit are both being called.  Delaying the action for 500 millis so the next event can run.
	      var func = lang.hitch(this, validation.removeInlineErrorRow, row, fields, id, true);
	      if (dontTimeout) {
	         for (var i = 0; i < fields.length; i++) {
	            var field = fields[i];
	            if (domClass.contains(field, "lotusFormErrorField")) {
	                fields[i].setAttribute("aria-invalid", "false");
	                domClass.remove(field, "lotusFormErrorField");
	                fields[i].removeAttribute("aria-describedby");
	            }
	         }
	         if (domClass.contains(row.previousSibling, "_qkrErrorRow"))
	            row.parentNode.removeChild(row.previousSibling);  
	      }
	      else
	         setTimeout(func, 500); 
	   },
	   
	   focusOnNonRequiredError: function(row, valid) {
	      if (!valid) {
	         var errorRow = row.previousSibling;
	         var items = errorRow.getElementsByTagName("LI");
	         var id;
	         if (items && items.length > 0) {
	            id = domAttr.get(items[0], "errorId");
	         }
	         else {
	            var td = query("TD.lotusFormError",errorRow)[0];
	            id = domAttr.get(td, "errorId");
	         }   
	         if (id != "empty") {
	            var firstErr = query(".lotusFormErrorField", row)[0];   
	            setTimeout(function(){focusUtils.focus(firstErr);}, 10); //TODO hack to get focus to work right w/ onchange
	         }
	      }
	   },
	   
	   countCells: function(tr,td) {
	      var count = 0;
	      for (var i=0; i<tr.cells.length; i++) {
	         //make sure we don't include any hidden spacer tds
	         if(tr.cells[i].style.display != "none") {
	            if (td == tr.cells[i])
	               break;
	            var colSpan = domAttr.get(tr.cells[i], "colSpan");
	            if (colSpan)
	               count += Math.max(parseInt(colSpan), 1);
	            else
	               count++;
	         }
	      }
	      return count;
	   },
	   
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   setFormError: function(form, contents, additionalInfo, dialog, connectObj) {
	      var tbodies = query("table.lotusFormTable > tbody", form);
	      var co = connectObj ? connectObj : dojo;
	      if (tbodies.length > 0) {
	         var tbody;
	            tbody = tbodies[0];
	         var d = windowModule.doc;
	         var div = query("tr.lotusFormErrorSummary:first-child > div", tbody)[0];
	         if (!div) {
	            var firstRow = tbody.getElementsByTagName("tr")[0];
	            var colspan = (firstRow ? validation.countCells(firstRow) : 1);
	         
	            var tr = domConstruct.create("tr", {className: "lotusFormErrorSummary"});
	               var td = domConstruct.create("td", {className: "lotusFormError"}, tr);
	                  domAttr.set(td, "colSpan", colspan);
	                  div = domConstruct.create("div", {}, td);
	                  div.style.paddingBottom = "5px";
	                  var img = domConstruct.create("img", {alt: validation.nls.MESSAGE.ERROR, src: config.blankGif, className: "lotusIconMsgError"}, div);
	            if (firstRow) 
	               tbody.insertBefore(tr, firstRow);
	            else
	               tbody.appendChild(tr);
	         }
	         else
	            util.html.removeChildren(div);
	   
	         if (lang.isArray(contents))
	            for (var i=0; i<contents.length; i++)
	               div.appendChild(contents[i]);
	         else if (typeof contents == "string")
	            div.appendChild(d.createTextNode(contents));
	         else
	            div.appendChild(contents);
	   
	         if (additionalInfo) {
	            var aMore = domConstruct.create("A", {className: "lotusIndent10", href: "javascript:;"}, div);
	               aMore.appendChild(d.createTextNode(validation.nls.MESSAGE.MORE_DETAILS));
	            var aHide = domConstruct.create("A", {className: "lotusIndent10", href: "javascript:;"}, div);
	               aHide.appendChild(d.createTextNode(validation.nls.MESSAGE.HIDE_DETAILS));
	               aHide.style.display = "none";
	   
	            var infoDiv = domConstruct.create("div", null, div);
	               infoDiv.style.display = "none";
	               if (typeof additionalInfo == "string")
	                  infoDiv.appendChild(d.createTextNode(additionalInfo));
	               else
	                  infoDiv.appendChild(additionalInfo)
	   
	            co.connect(aMore, "onclick", function() {
	               infoDiv.style.display="";
	               aMore.style.display="none";
	               aHide.style.display="";
	               dialog._position();
	               aHide.focus();
	            });
	            co.connect(aHide, "onclick", function() {
	               infoDiv.style.display="none";
	               aMore.style.display="";
	               aHide.style.display="none";
	               dialog._position();
	               aMore.focus();
	            });
	         }
	         div.setAttribute("role", "alert");
	      }
	   },
	   
	   setFormWarning: function(form, contents, additionalInfo, dialog, connectObj) {
	      var co = connectObj ? connectObj : dojo;
	      var tbodies = query("table.lotusFormTable > tbody", form);
	      if (tbodies.length > 0) {
	         var tbody;
	            tbody = tbodies[tbodies.length-1]; //dojo seems to be retrieving these in reverse order
	         var d = windowModule.doc;
	         var div = query("tr.lotusFormWarningSummary:first-child > div", tbody)[0];
	         if (!div) {
	            var firstRow = tbody.getElementsByTagName("tr")[0];
	            var colspan = (firstRow ? validation.countCells(firstRow) : 1);
	         
	            var tr = domConstruct.create("tr", {className: "lotusFormWarningSummary lotusWarning"});
	               tr.style.backgroundImage = "none";
	               var td = domConstruct.create("td", null, tr);
	                  domAttr.set(td, "colSpan", colspan);
	                  div = domConstruct.create("div", {className: "lotusMessage lotusWarning"}, td);
	                  div.style.backgroundImage = "none";
	                  var img = domConstruct.create("img", {alt: validation.nls.MESSAGE.WARNING, src: config.blankGif, className: "qkrSprite-lw-oneUI qkrSprite-lw-oneUI-msgWarning16"}, div);
	            if (firstRow) 
	               tbody.insertBefore(tr, firstRow);
	            else
	               tbody.appendChild(tr);
	         }
	         else
	            util.html.removeChildren(div);
	   
	         if (lang.isArray(contents))
	            for (var i=0; i<contents.length; i++)
	               div.appendChild(contents[i]);
	         else if (typeof contents == "string")
	            div.appendChild(d.createTextNode(contents));
	         else
	            div.appendChild(contents);
	   
	         if (additionalInfo) {
	            var aMore = domConstruct.create("A", {className: "lotusIndent10", href: "javascript:;"}, div);
	               aMore.appendChild(d.createTextNode(validation.nls.MESSAGE.MORE_DETAILS));
	            var aHide = domConstruct.create("A", {className: "lotusIndent10", href: "javascript:;"}, div);
	               aHide.appendChild(d.createTextNode(validation.nls.MESSAGE.HIDE_DETAILS));
	               aHide.style.display="none";
	   
	            var infoDiv = domConstruct.create("div", null, div);
	               infoDiv.style.display = "none";
	               if (typeof additionalInfo == "string")
	                  infoDiv.appendChild(d.createTextNode(additionalInfo));
	               else
	                  infoDiv.appendChild(additionalInfo);
	   
	            co.connect(aMore, "onclick", function() {
	               infoDiv.style.display="";
	               aMore.style.display="none";
	               aHide.style.display="";
	               dialog._position();
	            });
	            co.connect(aHide, "onclick", function() {
	               infoDiv.style.display="none";
	               aMore.style.display="";
	               aHide.style.display="none";
	               dialog._position();
	            });
	         }
	         div.setAttribute("role", "alert");
	      }
	   },
	   
	   // Developer Note:
	   // This method is publicly documented.  Do not modify without documenting changes if necessary 
	   // and ensuring backwards compatibility.
	   removeFormErrors: function(form) {
	      array.forEach(query("tr.lotusFormErrorSummary", form), function(el) {el.parentNode.removeChild(el);});
	      array.forEach(query("td.lotusFormError", form), function(el) {el.parentNode.parentNode.removeChild(el.parentNode);});
	      array.forEach(query(".lotusFormErrorField", form), function(el) {domClass.remove(el, "lotusFormErrorField");});
	   },
	   
	   removeFormWarnings: function(form) {
	      array.forEach(query("tr.lotusWarning", form), function(el) {el.parentNode.removeChild(el);});
	      array.forEach(query("td.lotusWarning", form), function(el) {el.parentNode.parentNode.removeChild(el.parentNode);});
	   },
	   
	   splitTags: function(tagsText) {
	      tagsText = (tagsText.toLowerCase() || "").replace(/["']/g, "");
	      var tags = tagsText.split(validation.SPLIT_TAGS);
	      var tagNames = {};
	      return array.filter(tags,
	         function(s) { 
	            if (s.length > 0 && !tagNames[s]) {
	               tagNames[s] = 1;
	               return true;
	            } 
	            else {
	               return false;
	            }
	         }
	      );
	   },
	   
	   //Removes unwanted characters from tags text
	   cleanTags: function(tagsText) {
	      var tags =  validation.splitTags(tagsText);
	      return (tags.length > 0) ? tags.join(' ') : "";
	   },
	   
	   validateField: function(el, checkRequired, maxLength, invalidRegex, invalidChars, msgs, connectObj, handlers) {
	      var d = windowModule.doc;
	      var co = connectObj ? connectObj : dojo;
	      var valid = true;
	   
	      var value = el.value;
	      if (lang.isArray(el)){
	         // we are verifying a value that is different from what the value in the element is
	         value = el[0];
	         el = el[1];
	      }
	         
	      value = util.text.trim(value);
	      
	      var row = el.parentNode.parentNode;
	      if(row.tagName.toLowerCase() == "td")
	         row = row.parentNode;
	   
	      if (value.length < 1) {
	         if (checkRequired) {
	            // todo: can we clean up addInlineError row so we don't have to pass el.parentNode.parentNode and el?
	            validation.addInlineErrorRow(row, el, "empty", msgs.warnEmpty);
	            valid = false;
	         }
	      }
	      else
	         validation.removeInlineErrorRow(row, el, "empty");
	   
	      if (maxLength) {
	         if (!validation.validateTextLength(value, maxLength)) {
	            var contents = [d.createTextNode(msgs.warnLong)];
	            var a = domConstruct.create("a", {href: "javascript:;"});
	               var trimHandler = (handlers && handlers.trim) ? handlers.trim : lang.hitch(this, "trimField", el, maxLength);
	               co.connect(a, "onclick", trimHandler);
	               a.appendChild(d.createTextNode(msgs.trim));
	            contents.push(a);
	            
	            validation.addInlineErrorRow(row, el, "length", contents);
	            valid = false;
	         }
	         else
	            validation.removeInlineErrorRow(row, el, "length");
	      }
	   
	      if (invalidRegex && invalidChars) {
	         invalidRegex.lastIndex = 0;
	         if (invalidRegex.exec(value)) {             
	            var contents = [d.createTextNode(string.substitute(msgs.warnInvalid, [invalidChars]))];
	            contents.push(domConstruct.create("br"));
	            var a = domConstruct.create("a", {href: "javascript:;"});
	               var fixHandler = (handlers && handlers.fix) ? handlers.fix : lang.hitch(this, "fixChars", el, invalidRegex);
	               connectObj.connect(a, "onclick", fixHandler);
	               a.appendChild(d.createTextNode(msgs.fixInvalid));
	            contents.push(a);
	            
	            validation.addInlineErrorRow(row, el, "chars", contents);
	            valid = false;        
	         }
	         else if (msgs.invalids && (value == "." || value == "..")) {
	            validation.addInlineErrorRow(row, el, "chars", msgs.invalids);
	            valid = false;
	         }
	         else
	            validation.removeInlineErrorRow(row, el, "chars");
	      }
	   
	      if (!valid && handlers && handlers.error && typeof handlers.error == "function")
	         handlers.error();
	   
	      validation.focusOnNonRequiredError(row, valid);
	      row = null;
	      return valid;
	   },
	   
	   fixChars: function(el, invalidRegex) {
	      el.value = el.value.replace(invalidRegex, "_");
	      validation.removeInlineErrorRow(el.parentNode.parentNode, el, "chars");
	   },
	   
	   trimField: function(el, maxLength) {
	      var value = util.text.trim(el.value);
	      var i = util.text.getCharIndexForUtf8Index(value, maxLength);
	      if (i != -1) {
	         el.value = value.substring(0, i);
	      }
	      validation.removeInlineErrorRow(el.parentNode.parentNode, el, "length");
	   },
	   
	   validateTags: function(tagsCombo, msgs, connectObj) {
	      var valid = true;
	      var co = connectObj ? connectObj : dojo;
	      var d = windowModule.doc;
	      var el = tagsCombo.textbox;
	      var tags = validation.splitTags(el.value);
	      var contents = [];
	      var maxLength = validation.TAG_LENGTH; 
	      array.forEach(tags, function(tag, i) {
	         if (!validation.validateTextLength(tag, maxLength)) {
	            contents.push(d.createTextNode(string.substitute(msgs.warnLongTags, [util.text.trimToLength(tag, 10)])));
	            valid = false;
	         }
	      });
	   
	      tagsCombo.staticClass = "lotusText";
	      validation.removeInlineErrorRow(el.parentNode.parentNode, el, "length");
	      
	      if (!valid) {
	         var multiple = contents.length > 1;
	   
	         if (multiple)
	            contents = [d.createTextNode(msgs.warnLongTags)];
	            
	         contents.push(d.createTextNode(" "));
	         
	         var a = domConstruct.create("a", {href: "javascript:;"});
	            co.connect(a, "onclick", lang.hitch(this, "trimTags", tagsCombo, maxLength));
	            a.appendChild(d.createTextNode(multiple ? msgs.trimTags : msgs.trimTag));
	         contents.push(a);
	   
	         tagsCombo.staticClass = "lotusText lotusFormErrorField";
	         validation.addInlineErrorRow(el.parentNode.parentNode, el, "length", contents);
	         validation.focusOnNonRequiredError(el.parentNode.parentNode, valid);
	      }
	      el = null;
	   
	      return valid;
	   },
	   
	   trimTags: function(tagsCombo, maxLength) {
	         var el = tagsCombo.textbox;
	         var tags = validation.splitTags(el.value);
	         tags = array.map(tags, function(tag) {
	            var i = util.text.getCharIndexForUtf8Index(tag, validation.TAG_LENGTH);
	            if (i != -1)
	               tag = tag.substring(0, i);
	            return tag;
	         });
	         el.value = tags.join(" ");
	         tagsCombo.staticClass = "lotusText";
	         validation.removeInlineErrorRow(el.parentNode.parentNode, el, "length");
	         el = null;
	   }
	};
	
	})();
	return com.ibm.social.ee.util.validation;
});
