/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/FileState.html",
  "../sbw/StatefulBackedTemplatedWidget",
  "dojo/i18n!../nls/FileViewerStrings",
  "../config/globals",
  "../util/DateFormat",
  "dojo/dom-construct",
  "../util/html",
  "dojo/_base/lang",
  "../util/ibmDocs"
], function (declare, template, StatefulBackedTemplatedWidget, i18n, globals, DateFormat, domConstruct, html, lang, ibmDocs) {
  "use strict";

  return declare([ StatefulBackedTemplatedWidget ], {
    templateString: template,

    postMixInProperties: function () {
      this.nls = i18n.FILE_STATE;
      this.model = this.file;
    },

    _getStateNode: function () {
      var node = domConstruct.create("span");
      node.appendChild(this._getLockMessageNode());
      
      if (!ibmDocs.isUploadNewVersionEnabled()) {
        html.appendText(node, " " + this._getDocsFileMessage());
      }
      
      return node;
    },
    
    _getLockMessageNode: function () {
      var lock, dateFormatter, lockNls, node;
      
      node = domConstruct.create("span");
      
      if (!this.file.get("isLocked")) {
        return node;
      }
      
      lock = this.file.get("lock");
      lockNls = lock.user.id === globals.currentUser.id ? this.nls.LOCKED_BY_YOU : this.nls.LOCKED_BY_OTHER;
      dateFormatter = new DateFormat(lock.date);
      
      html.substitute(document, node, dateFormatter.formatByAge(lockNls), {
        user: function () {
          return html.generateLinkToUser(lock.user);
        }
      });
      
      return node;
    },
    
    _getDocsFileMessage: function () {
      return this.file.get("isDocsFile") && this.file.get("permissions").canEdit() ? this.nls.DOCS_FILE : "";
    }
  });
});
