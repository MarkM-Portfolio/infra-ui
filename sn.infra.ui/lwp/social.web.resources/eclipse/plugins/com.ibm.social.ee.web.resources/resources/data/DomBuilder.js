/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.data.DomBuilder");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.text");

(function (){
var du = com.ibm.social.incontext.util.dom;
var tu = com.ibm.social.incontext.util.text;
dojo.declare("com.ibm.social.ee.data.DomBuilder", null, {
   
   getPostViewDefBody: function(args) {
      var i, titleKeyElement, titleElement, doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE]);
      var entry = doc.documentElement;
      if (args.title) {
         titleElement = du.createElementNS(doc,"title",du.ATOM_NAMESPACE);
            titleElement.setAttribute("type","text");
            titleElement.appendChild(doc.createTextNode(args.title));
         entry.appendChild(titleElement);
      }
      if (args.titleKey) {
         titleKeyElement = du.createElementNS(doc,"titleKey",du.DOCUMENTS_ATOM_NAMESPACE);
            titleKeyElement.appendChild(doc.createTextNode(args.titleKey));
         entry.appendChild(titleKeyElement);
      }
      if(args.description && typeof args.description == "string") {
         var summary = du.createElementNS(doc,"summary",du.ATOM_NAMESPACE);
            summary.setAttribute("type","text");
            summary.appendChild(doc.createTextNode(args.description));
         entry.appendChild(summary);
      }
      if(args.descriptionKey && typeof args.descriptionKey == "string") {
         var summaryKey = du.createElementNS(doc,"summaryKey",du.DOCUMENTS_ATOM_NAMESPACE);
            summaryKey.setAttribute("type","text");
            summaryKey.appendChild(doc.createTextNode(args.descriptionKey));
         entry.appendChild(summaryKey);
      }
      if (args.category) {
         var category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
            category.setAttribute("term", args.category);
            category.setAttribute("label", args.category);
            category.setAttribute("scheme", "tag:ibm.com,2006:td/type");
         entry.appendChild(category);
      }
      if (args.propertySheetTypeId) {
         var propertySheetTypeIdElement = du.createElementNS(doc,"propertySheetTypeId",du.DOCUMENTS_ATOM_NAMESPACE);
            propertySheetTypeIdElement.appendChild(doc.createTextNode(args.propertySheetTypeId));
         entry.appendChild(propertySheetTypeIdElement);
      }
      if (args.sortOrder) {
         var sortOrderElement = du.createElementNS(doc,"sortOrder",du.DOCUMENTS_ATOM_NAMESPACE);
            sortOrderElement.appendChild(doc.createTextNode(args.sortOrder));
         entry.appendChild(sortOrderElement);
      }
      if (args.sortId) {
         var sortIdElement = du.createElementNS(doc,"sortId",du.DOCUMENTS_ATOM_NAMESPACE);
            sortIdElement.appendChild(doc.createTextNode(args.sortId));
         entry.appendChild(sortIdElement);
      }

      if (args.columns || args.conditions) {
         var content = du.createElementNS(doc,"content",du.ATOM_NAMESPACE);
            content.setAttribute("type","application/xml");
            var viewContent = du.createElementNS(doc, "viewContent", du.DOCUMENTS_ATOM_NAMESPACE);
               if (args.columns) {
                  var viewColumns = du.createElementNS(doc, "columns", du.DOCUMENTS_ATOM_NAMESPACE);
                  for (i = 0; i < args.columns.length; i++) {
                     var columnDef = args.columns[i];
                     var column = du.createElementNS(doc, "column", du.DOCUMENTS_ATOM_NAMESPACE);
                        if (columnDef.getColumnId && columnDef.getColumnId()) {
                           var columnIdElement = du.createElementNS(doc, "columnId", du.DOCUMENTS_ATOM_NAMESPACE);
                              columnIdElement.appendChild(doc.createTextNode(columnDef.getColumnId()));
                           column.appendChild(columnIdElement);
                        }
                        if (columnDef.getTitle()) {
                           titleElement = du.createElementNS(doc, "title", du.DOCUMENTS_ATOM_NAMESPACE);
                              titleElement.appendChild(doc.createTextNode(columnDef.getTitle()));
                           column.appendChild(titleElement);
                        }

                        if (columnDef.getTitleKey()) {
                           titleKeyElement = du.createElementNS(doc, "titleKey", du.DOCUMENTS_ATOM_NAMESPACE);
                              titleKeyElement.appendChild(doc.createTextNode(columnDef.getTitleKey()));
                           column.appendChild(titleKeyElement);
                        }

                        if(columnDef.getWidth()) {
                           var widthElement = du.createElementNS(doc, "width", du.DOCUMENTS_ATOM_NAMESPACE);
                              widthElement.appendChild(doc.createTextNode(columnDef.getWidth()));
                           column.appendChild(widthElement);
                        }
                        var fieldElement = du.createElementNS(doc, "field", du.DOCUMENTS_ATOM_NAMESPACE);
                           if (columnDef.getStandardField())
                              fieldElement.setAttribute("standardField", columnDef.getStandardField());
                           else if (columnDef.getPropSheetFieldId())
                              fieldElement.setAttribute("propSheetFieldId", columnDef.getPropSheetFieldId());
                        column.appendChild(fieldElement);
                     viewColumns.appendChild(column);
                  }
                  viewContent.appendChild(viewColumns);
               }

               if (args.conditions) {
                  var viewFilter = du.createElementNS(doc, "filter", du.DOCUMENTS_ATOM_NAMESPACE);
                     var predicate = du.createElementNS(doc, "predicate", du.DOCUMENTS_ATOM_NAMESPACE);
                        if (args.conditions.conditionalOperator) {
                           predicate.setAttribute("conditionalOperator", args.conditions.conditionalOperator);
                        } else {
                           predicate.setAttribute("conditionalOperator", "and");
                        }
                        for (i = 0; i < args.conditions.length; i++) {
                           var filterCondition = args.conditions[i];
                           if (filterCondition.getValue()) {
                              var condition = du.createElementNS(doc, "condition", du.DOCUMENTS_ATOM_NAMESPACE);
                                 condition.setAttribute("dataOperator", filterCondition.getOp());
                                 var leftAttribute = du.createElementNS(doc, "leftAttribute", du.DOCUMENTS_ATOM_NAMESPACE);
                                 if (filterCondition.isStdField())
                                    leftAttribute.setAttribute("standardField", filterCondition.getFieldId());
                                 else
                                    leftAttribute.setAttribute("propSheetFieldId", filterCondition.getFieldId());
                                 condition.appendChild(leftAttribute);
                                 var rightValue = du.createElementNS(doc, "rightValue", du.DOCUMENTS_ATOM_NAMESPACE);
                                    rightValue.setAttribute("value", filterCondition.getValue());
                                 condition.appendChild(rightValue);
                              predicate.appendChild(condition);
                           }
                        }
                     if (predicate.childNodes && predicate.childNodes.length > 0)
                        viewFilter.appendChild(predicate);
                  if (viewFilter.childNodes && viewFilter.childNodes.length > 0)
                     viewContent.appendChild(viewFilter);
               }
            content.appendChild(viewContent);
      }
      if(content !== null)
         entry.appendChild(content);

      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);
   },
   getPostACLBody: function (args) {
      var doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE,du.SNX_NAMESPACE]);
      var entry = doc.documentElement;
      if (args.category) {
         var category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
            category.setAttribute("term", args.category);
            category.setAttribute("label", args.category);
            category.setAttribute("scheme", "tag:ibm.com,2006:td/type");
         entry.appendChild(category);
      }
      if (args.sharedWhat) {
         var sWhat = du.createElementNS(doc,"sharedWhat",du.DOCUMENTS_ATOM_NAMESPACE);
            sWhat.appendChild(doc.createTextNode(args.sharedWhat));
         entry.appendChild(sWhat);
      }
      if (args.sharedWith && args.sharedWith.length > 0) {
         for (var i = 0; i < args.sharedWith.length; i++) {
            if (args.sharedWith[i].users && args.sharedWith[i].users.length > 0 && args.sharedWith[i].sharePermission && args.sharedWith[i].sharePermission !== "") {
               var sWith = du.createElementNS(doc,"sharedWith",du.DOCUMENTS_ATOM_NAMESPACE);
               for (var j = 0; j < args.sharedWith[i].users.length; j++) {
                  var user = du.createElementNS(doc, "user", du.DOCUMENTS_ATOM_NAMESPACE);
                     var uri = du.createElementNS(doc, "userid", du.SNX_NAMESPACE);
                        uri.appendChild(doc.createTextNode(encodeURIComponent(args.sharedWith[i].users[j].id)));
                     user.appendChild(uri);
                  sWith.appendChild(user);
               }
               var sharePerm = du.createElementNS(doc,"sharePermission",du.DOCUMENTS_ATOM_NAMESPACE);
                  sharePerm.appendChild(doc.createTextNode(args.sharedWith[i].sharePermission));
               sWith.appendChild(sharePerm);
               entry.appendChild(sWith);
            }
         }
      }
      if (args.sharePermission) {
         var sPermission = du.createElementNS(doc,"sharePermission",du.DOCUMENTS_ATOM_NAMESPACE);
            sPermission.appendChild(doc.createTextNode(args.sharePermission));
         entry.appendChild(sPermission);
      }
      if(typeof args.description == "string" && args.description !== null) {
         var summary = du.createElementNS(doc,"summary",du.ATOM_NAMESPACE);
            summary.setAttribute("type","text");
            summary.appendChild(doc.createTextNode(args.description));
         entry.appendChild(summary);
      }

      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);
   },
   propertyMapToFormContents: function(propSheets, formValues) {
      if (propSheets && formValues) {
         var cnt = 0;
         if(propSheets) {
            for (var pstId in propSheets) {
               var pst = propSheets[pstId];
               if(pst) {
                  for(var fid in pst) {
                     formValues["snxFid_" + cnt] = fid;
                     formValues["snxPstId_" + cnt] = pstId;
                     var value = pst[fid].value;
                     if(dojo.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                           formValues["snxValue_" + cnt + "_" + i] = value[i];
                        }
                     }
                     else {
                        formValues["snxValue_" + cnt + "_0"] = value;
                     }
                     cnt++;
                  }
               }
               formValues.snxPstfCount = cnt;
            }
         }
      }
   },
   getCheckInPostBody: function (args) {
      var doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE]);
      var entry = doc.documentElement;

      if (args.atomId) {
         var atomId = du.createElementNS(doc,"id",du.ATOM_NAMESPACE);
            atomId.appendChild(doc.createTextNode(args.atomId));
         entry.appendChild(atomId);
      }

      var locked = du.createElementNS(doc, "locked",du.DOCUMENTS_ATOM_NAMESPACE);
      locked.appendChild(doc.createTextNode("false"));
      entry.appendChild(locked);

      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);
   },
   getPostBody: function (args) {   
      var field, titleElement, doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE,du.SNX_NAMESPACE,du.THREAD_ATOM_NAMESPACE]);
      var entry = doc.documentElement;
      if (args.category) {
         var category = du.createElementNS(doc,"category",du.ATOM_NAMESPACE);
            category.setAttribute("term", args.category);
            category.setAttribute("label", args.category);
            category.setAttribute("scheme", "tag:ibm.com,2006:td/type");
         entry.appendChild(category);
      }
      if (args.atomId) {
         var atomId = du.createElementNS(doc,"id",du.ATOM_NAMESPACE);
            atomId.appendChild(doc.createTextNode(args.atomId));
         entry.appendChild(atomId);
      }
      if (args.name) {
         var label = du.createElementNS(doc, "label", du.DOCUMENTS_ATOM_NAMESPACE);
            label.appendChild(doc.createTextNode(args.name));
         entry.appendChild(label);
         if (!args.title) {
            titleElement = du.createElementNS(doc,"title",du.ATOM_NAMESPACE);
               titleElement.appendChild(doc.createTextNode(args.name));
            entry.appendChild(titleElement);
         }
      }
      if(args.title) {
         titleElement = du.createElementNS(doc,"title",du.ATOM_NAMESPACE);
            titleElement.appendChild(doc.createTextNode(args.title));
         entry.appendChild(titleElement);
      }
      if(args.visibility) {
         var visibility = du.createElementNS(doc,"visibility",du.DOCUMENTS_ATOM_NAMESPACE);
            visibility.appendChild(doc.createTextNode((args.visibility == "public") ? "public" : "private"));
         entry.appendChild(visibility);
      }
      if (args.viralShareAllowed === true || args.viralShareAllowed === false) {
         var propagate = du.createElementNS(doc,"propagation",du.DOCUMENTS_ATOM_NAMESPACE);
            propagate.appendChild(doc.createTextNode(args.viralShareAllowed ? "true" : "false"));
         entry.appendChild(propagate);
      }

      if(typeof args.description == "string" && args.description !== null) {
         var summary = du.createElementNS(doc,"summary",du.ATOM_NAMESPACE);
            summary.setAttribute("type","text");
            summary.appendChild(doc.createTextNode(args.description));
         entry.appendChild(summary);
      }

      if (args.changeSummary) {
         var change = du.createElementNS(doc,"changeSummary",du.DOCUMENTS_ATOM_NAMESPACE);
            change.appendChild(doc.createTextNode(args.changeSummary));
         entry.appendChild(change);
      }

      if (args.contents && args.mimeType) {
         var content = du.createElementNS(doc,"content",du.ATOM_NAMESPACE);
            content.setAttribute("type",args.mimeType);
            content.appendChild(doc.createTextNode(args.contents));
         entry.appendChild(content);
      }

      if (args.versionUuid) {
         var versionUuid = du.createElementNS(doc,"versionUuid",du.DOCUMENTS_ATOM_NAMESPACE);
            versionUuid.appendChild(doc.createTextNode(args.versionUuid));
         entry.appendChild(versionUuid);
      }
      if (args.documentUuid) {
         var docUuid = du.createElementNS(doc,"documentUuid",du.DOCUMENTS_ATOM_NAMESPACE);
            docUuid.appendChild(doc.createTextNode(args.documentUuid));
         entry.appendChild(docUuid);
      }
      if (args.locked === true || args.locked === false) {
         var locked = du.createElementNS(doc,"locked",du.DOCUMENTS_ATOM_NAMESPACE);
            locked.appendChild(doc.createTextNode(args.locked ? "true" : "false"));
         entry.appendChild(locked);
      }
	  if (typeof args.replyTo != 'undefined' && args.replyTo) {
	     var replyTo = du.createElementNS(doc,"in-reply-to",du.THREAD_ATOM_NAMESPACE);
		 replyTo.setAttribute("ref", args.replyTo);
		 entry.appendChild(replyTo);
	  }

      if (args.snxFields) {
         for (var pstId in args.snxFields) {
            var pst = args.snxFields[pstId];
            if (pst) {
               for(var fid in pst) {
                  if (pst[fid]) {
                     var value = pst[fid].value;
                     if ((value || value === "" || (value && tu.trim(value) === "")) && pst[fid].dataType) {                     
                        if(typeof value != "string" && typeof value != "number") {
                           for (var i = 0; i < value.length; i++) {
                              field = du.createElementNS(doc, "field", du.SNX_NAMESPACE);
                                 field.setAttribute("fid", fid);
                                 field.setAttribute("pstId",pstId);
                                 field.setAttribute("type", pst[fid].dataType);
                                 field.appendChild(doc.createTextNode(value[i]));
                              entry.appendChild(field);
                           }
                        }
                        else {
                           field = du.createElementNS(doc, "field", du.SNX_NAMESPACE);
                              field.setAttribute("fid", fid);
                              field.setAttribute("pstId",pstId);
                              field.setAttribute("type", pst[fid].dataType);
                              field.appendChild(doc.createTextNode(value));
                           entry.appendChild(field);
                        }
                     }
                  }
               }
            }
         }
      }

      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);
   },
   getPostNotificationBody: function (args) {
      var doc = du.newXMLDocument("entry",du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE]);
      var entry = doc.documentElement;
      var notificationsElement = du.createElementNS(doc,"notifications",du.DOCUMENTS_ATOM_NAMESPACE);
         if(args.notifications) {
            if(args.notifications.comment) {
               var commentElement = du.createElementNS(doc,"comment",du.DOCUMENTS_ATOM_NAMESPACE);
                  commentElement.appendChild(doc.createTextNode(args.notifications.comment));
               notificationsElement.appendChild(commentElement);
            }

            if(args.notifications.media) {
               var mediaElement = du.createElementNS(doc,"media",du.DOCUMENTS_ATOM_NAMESPACE);
                     mediaElement.appendChild(doc.createTextNode(args.notifications.media));
               notificationsElement.appendChild(mediaElement);
            }
         }
      entry.appendChild(notificationsElement);

      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);
   },
   // builds the body for a flag item request
   getFlagItemPostBody: function(args) {
      var atom = du.NAMESPACES.ATOM;
      var snx = du.NAMESPACES.SNX;
      var doc = du.newXMLDocument("entry", atom, [ snx ]);
      var entry = doc.documentElement;
             
      var e = du.createElementNS(doc, "in-ref-to", snx);
         e.setAttribute("rel", "http://www.ibm.com/xmlns/prod/sn/report-item");
         e.setAttribute("ref", args.flagRef);
         e.setAttribute("ref-item-type", args.flagRefitemType);      
      entry.appendChild(e);
      
      var d = du.createElementNS(doc, "content", atom);
      d.setAttribute("type", "text");
         d.appendChild(doc.createTextNode(args.flagReason));      
      entry.appendChild(d);
      
      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);   
   },
   
   getFollowUserPostBody: function(uid) {
      var atom = du.NAMESPACES.ATOM;
      var doc = du.newXMLDocument("entry", atom, []);
      var entry = doc.documentElement;
             
      var e = du.createElementNS(doc, "category", atom);
         e.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/source");
         e.setAttribute("term", "profiles");         
      entry.appendChild(e);
      
      e = du.createElementNS(doc, "category", atom);
         e.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/resource-type");
         e.setAttribute("term", "profile");         
      entry.appendChild(e);

      e = du.createElementNS(doc, "category", atom);
         e.setAttribute("scheme", "http://www.ibm.com/xmlns/prod/sn/resource-id");
         e.setAttribute("term", uid);         
      entry.appendChild(e);
        
      var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
      return tu.trim(postBody);
   }

});

})();