/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.FilenameField");

dojo.require("lconn.share.widget.LotusTextInput");

dojo.declare("lconn.share.widget.FilenameField", [lconn.share.widget.LotusTextInput], {

   INVALID_FILENAME_CHARS: /[\\\/\:\*\?\<\>\|\"]/g,
   EMPTY_FILENAME: /^[.\s\u3000]*$/,
   
   hasExtension: false,
   maxBytes: 252,
   /** Default value (string) of the input */
   value: "",
   
   _strings: {
      /* LotusTextInput +
       * WARN_INVALID_CHARS
       * FIX_INVALID_CHARS
       */
   },

   _validate: function(errors) {
      this.inherited(arguments);
      var s = this._getInput().value;
      var d = document;
      // filenames cannot be only unicode spaces
      if (this.required && this.EMPTY_FILENAME.exec(s) && dojo.indexOf(errors, this._strings.REQUIRED) == -1)
         errors.push(this._strings.REQUIRED);
      
      if (s.match(this.INVALID_FILENAME_CHARS)) {
         var contents = [d.createTextNode(this._strings.WARN_INVALID_CHARS)];
         contents.push(d.createTextNode(" "));
         var a = d.createElement("a");
            a.href = "javascript:;";
            dojo.connect(a, "onclick", this, "fixInvalidChars");
            a.appendChild(d.createTextNode(this._strings.FIX_INVALID_CHARS));
         contents.push(a);
         errors.push(contents);
      }      
   },
   
   trim: function() {
      if (!this.hasExtension)
         return this.inherited(arguments);
      
      this.hideErrors();
      throw "Not implemented";
   },
   
   fixInvalidChars: function() {
      var el = this.inputNode;
      el.value = el.value.replace(this.INVALID_FILENAME_CHARS, "_");
      this.hideErrors();
      el.focus();
   }
});
