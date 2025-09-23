/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.LotusTextInput");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.widget.LotusValidator");

dojo.declare("lconn.share.widget.LotusTextInput", [dijit._Widget, dijit._Templated, lconn.share.widget.LotusValidator], {

   /** Number of allowed UTF-8 bytes, < 1 means unlimited */
   maxBytes: 0,
   /** Default value (string) of the input */
   value: "",
   suffix: "",
   tabIndex: 0,
   
   _INPUT: "<input dojoAttachPoint=\"inputNode\" type=\"text\" class=\"lotusText\" id=\"${id}\" value=\"${value}\" tabindex=\"${tabIndex}\">",
   _TEXTAREA: "<textarea dojoAttachPoint=\"inputNode\" class=\"lotusText\" id=\"${id}\" tabindex=\"${tabIndex}\">${value}</textarea>",
   
   _strings: {
      /* WARN_LONG
       * TRIM_LONG
       * REQUIRED (optional) - if field is required
       * 
       */
   },

   postMixInProperties: function() {
      this.templateString = this.textarea ? this._TEXTAREA : this._INPUT;
   },
   
   getValue: function() {
      return this.inputNode.value + this.suffix;
   },
   
   setValue: function(s) {
      this.inputNode.value = s;
   },
   
   _getInput: function() {
      return this.inputNode;
   },
   
   focus: function() {
      var i = this.inputNode;
      if (i.style.display != "none")
         i.focus();
   },
   select: function() {
      var i = this.inputNode;
      if (i.style.display != "none")
         i.select();
   },
   
   attr: function(key, value) {
      return dojo.attr(this.inputNode, key, value);
   },
   
   _validate: function(errors) {
      var s = this._getInput().value;
      if (this.maxBytes > 0) {
         var suffixBytes = (this.suffix) ? lconn.share.util.text.lengthUtf8(this.suffix) : 0;
         if (lconn.share.util.text.lengthUtf8(s) > (this.maxBytes - suffixBytes)) {
            var d = document;
            var contents = [d.createTextNode(this._strings.WARN_LONG)];
            contents.push(d.createTextNode(" "));
            var a = d.createElement("a");
               a.href = "javascript:;";
               dijit.setWaiRole(a, "button");
               dojo.connect(a, "onclick", this, "trim");
               a.appendChild(d.createTextNode(this._strings.TRIM_LONG));
            contents.push(a);
            errors.push(contents);
         }
      }
      if (this.required && dojo.trim(s).length == 0)
         errors.push(this._strings.REQUIRED);
   },
   
   trim: function() {
      var el = this.inputNode;
      var text = lconn.share.util.text.trim(el.value);

      var suffixBytes = (this.suffix) ? lconn.share.util.text.lengthUtf8(this.suffix) : 0;
      var i = lconn.share.util.text.getCharIndexForUtf8Index(text, this.maxBytes - suffixBytes);
      if (i >= 0)
         text = text.substring(0, i);
      el.value = text;

      this.hideErrors();
      el.focus();
   }   
});
