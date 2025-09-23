/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.LotusValidator");

dojo.declare("lconn.share.widget.LotusValidator", null, {
   /**
   * Implement this method to retrieve a node to validate on
   * _getInput: function(s, errors) {}
   */
   hideErrors: function() {
      var el = this._getInput();
      dojo.removeClass(el, "lotusFormErrorField");
   },

   setFieldErrors: function(errors) {
      var el = this._getInput();
      dojo.addClass(el, "lotusFormErrorField");
   },

   validate: function() {
      var errors = [];
      
      this._validate(errors);
      
      var valid = errors.length == 0;
      if (valid)
         this.hideErrors();
      else
         this.setFieldErrors(errors);
         
      return valid;
   }
   /**
    * Implement this method to do actual validation
    * _validate: function(errors) {}
    */
});
