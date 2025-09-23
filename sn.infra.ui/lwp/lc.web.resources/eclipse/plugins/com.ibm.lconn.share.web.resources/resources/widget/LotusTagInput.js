/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.LotusTagInput");
dojo.require("lconn.share.widget.TagTypeAhead");
dojo.require("lconn.share.widget.LotusValidator");
dojo.require("lconn.share.util.text");

dojo.declare("lconn.share.widget.LotusTagInput", [lconn.share.widget.TagTypeAhead, lconn.share.widget.LotusValidator], {

   multipleValues: true,
   token: ' ',
   hideEmptyResults: true,
   autoSelectChars: [],
   
   maxBytes: 100, // limit defined in platform
   
   _getInput: function() {
      return this.domNode;
   },
   getTags: function() {
      return lconn.share.bean.File.splitTags(this.domNode.value);
   },
   
   // Override standard method on ValidationTextBox
   _refreshState: function() {},
   _setValueAttr: function() {},
   
   _validate: function(errors) {
      var d = document;
      var s = this._getInput().value;
      var tags = lconn.share.bean.File.splitTags(s);
      var contents = [];
      var tagMsg = this._strings.WARN_LONG;
      dojo.forEach(tags, function(tag) {
         var l = lconn.share.util.text.lengthUtf8(tag);
         if (l > this.maxBytes)
            contents.push(d.createTextNode(dojo.string.substitute(tagMsg, [lconn.share.util.text.trimToLength(tag, 10)])));
      }, this);
      
      if (contents.length > 0) {
         var multiple = contents.length > 1;

         if (multiple)
            contents = [d.createTextNode(this._strings.WARN_LONG_MANY)];
            
         contents.push(d.createTextNode(" "));
         
         var a = d.createElement("a");
            a.href = "javascript:;";
            dijit.setWaiRole(a, "button");
            dojo.connect(a, "onclick", this, "trim");
            a.appendChild(d.createTextNode(multiple ? this._strings.TRIM_MANY : this._strings.TRIM));
         contents.push(a);

         //this.tagsCombo.staticClass = "lotusText lotusFormErrorField";
         errors.push(contents);
      }
   },
   
   trim: function() {
      var el = this.domNode;
      var tags = lconn.share.bean.File.splitTags(el.value);
      tags = dojo.map(tags, function(tag) {
         var i = lconn.share.util.text.getCharIndexForUtf8Index(tag, this.maxBytes);
         if (i != -1)
            tag = tag.substring(0, i);
         return tag;
      }, this);
      el.value = tags.join(" ");

      this.hideErrors();
      this.focus();
   }   
});
