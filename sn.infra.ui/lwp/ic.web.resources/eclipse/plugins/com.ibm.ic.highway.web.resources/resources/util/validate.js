/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/array",
      "dojo/_base/lang"
], function(dojo, array, lang) {

   lang.setObject("lconn.highway.util.validate", "ValidateValue", function(settingDetails, newValue) {
      console.log('validating : ' + newValue);

      // there are 3 things we may want to return (value is the potentially
      // normalised value)
      var validationResult = {
         success : true,
         value : newValue,
         message : ""
      }

      // Note : if we haven't been given enough information we default to it
      // being ok - the server will validate anyway
      if ((settingDetails == null) || (newValue == null) || (settingDetails.validation == null) || (settingDetails.validation.type == null)
            || (settingDetails.validation.type == "") || (settingDetails.validation.details == null)) {
         return validationResult;
      }

      switch (settingDetails.validation.type) {
         case "regex":
            return lconn.highway.util.validate.validateRegex(newValue, settingDetails.validation.details, validationResult);
            break;
         case "enum":
            return lconn.highway.util.validate.validateEnum(newValue, settingDetails.validation.details, validationResult);
            break;
         case "person":
            return lconn.highway.util.validate.validatePerson(newValue, validationResult);
            break;
         case "integer":
            return lconn.highway.util.validate.validateInteger(newValue, validationResult);
            break;
         case "boolean":
            return lconn.highway.util.validate.validateBoolean(newValue, validationResult);
            break;
         case "date":
            return lconn.highway.util.validate.validateDate(newValue, validationResult);
            break;
         case "url":
            return lconn.highway.util.validate.validateUrl(newValue, validationResult);
            break;
         case "email":
            return lconn.highway.util.validate.validateEmail(newValue, validationResult);
            break;
         case "text":
            // no check;
            break;
         case "file":
            // no check, but the validation details can be used to select the
            // type of file to be uploaded
            break;
         default:
            console.error("Unrecognised validation mechanism");
            break;
      }
      return validationResult;
   });

   lang.setObject("lconn.highway.util.validate", "validateRegex", function(newValue, regex, validationResult) {
      console.log('validating regex : ' + newValue);
      if (regex.pattern != null) {
         if (regex.modifier != null) {
            var pattern = new RegExp(regex.pattern, regex.modifier);
         }
         else {
            var pattern = new RegExp(regex.pattern);
         }
         if (!pattern.test(newValue)) {
            validationResult.success = false;
            validationResult.message = i18nstrings.validationNotCorrect;
         }
      }
      return validationResult; // this is our default for badly specified
      // validation requirements
   });

   lang.setObject("lconn.highway.util.validate", "validateEnum", function(newValue, details, validationResult) {
      console.log('validating enum : ' + newValue);

      // just to be flexible we'll handle an array or property list - an array
      // is the normal mechanism for
      // now, but a property list allows us to have the localised version as the
      // value of the property
      if (lang.isArray(details)) {
         var success = (array.indexOf(details, newValue) >= 0);
      }
      else {
         var success = details[newValue] != null;
      }

      // generate a helpful message ! Localisation won't matter when generating
      // the message here as if/when we
      // support it, it will be presented as a combo box, so this validation
      // should never fail
      if (!success) {
         var message = i18nstrings.validationNotInList;

         if (lang.isArray(details)) {
            for (var i = 0, len = details.length; i < len; i++) {
               if (i == 0) {
                  message += " ";
                  first = false;
               }
               else {
                  message += ', ';
               }
               message += details[i];
            }
         }
         else {
            var first = true;
            for (item in details) {
               if (first) {
                  message += " ";
                  first = false;
               }
               else {
                  message += ", ";
               }
               message += item;
            }
         }

         validationResult.success = false;
         validationResult.message = message;
      }

      return validationResult;
   });

   lang.setObject("lconn.highway.util.validate", "validatePerson", function(newValue, validationResult) {
      console.log('validating person : ' + newValue);

      return true;
   });

   lang.setObject("lconn.highway.util.validate", "validateInteger", function(newValue, validationResult) {
      console.log('validating integer : ' + newValue);

      // first trim it
      newValue = newValue.replace(/\s+/g, '');
      validationResult.value = newValue;

      var regex = /^[0-9]{1,20}$/;
      if (!regex.test(newValue)) {
         validationResult.success = false;
         validationResult.message = i18nstrings.validationNotAnInteger;
      }
      return validationResult;
   });

   lang.setObject("lconn.highway.util.validate", "validateBoolean", function(newValue, validationResult) {
      console.log('validating boolean : ' + newValue);
      var lcase = newValue.toLowerCase();
      if ((lcase != "true") && (lcase != "false")) {
         validationResult.success = false;
         validationResult.message = i18nstrings.validationNotABoolean;
      }
      return validationResult;
   });

   lang.setObject("lconn.highway.util.validate", "validateDate", function(newValue, validationResult) {
      console.log('validating date : ' + newValue);

      return true;
   });

   lang.setObject("lconn.highway.util.validate", "validateUrl", function(newValue, validationResult) {

      // TODO : Review this regex
      var regex = /^(https?:)([0-9]{1,4})?(\/\/)([\da-z\.-]+)\.([\da-z-]+)$/i;

      if (!regex.test(newValue)) {
         validationResult.success = false;
         validationResult.message = i18nstrings.validationNotAUrl;
      }
      return validationResult;
   });

   lang.setObject("lconn.highway.util.validate", "validateEmail", function(newValue, validationResult) {

      // TODO : Review this regex - it's more relaxed than normal (no checking
      // for a 6 character max on the final ".com" for example)
      var regex = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)$/i;
      if (!regex.test(newValue)) {
         validationResult.success = false;
         validationResult.message = i18nstrings.validationNotAnEmail;
      }
      return validationResult;
   });

   return lconn.highway.util.validate;
});
