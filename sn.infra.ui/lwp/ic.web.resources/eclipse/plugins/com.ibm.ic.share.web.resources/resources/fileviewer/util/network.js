/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
], function () {

  return {
    parseError: function (error) {
      var status = error.response.status,
         errorCode;

      if (status === 401) {
         errorCode = "Unauthenticated";
      } else if (status === 403) {
         errorCode = "AccessDenied";
      } else if (status === 404) {
         errorCode = "ItemNotFound";
      } else if (status === 409) {
         errorCode = "Conflict";
      }

      error.code = errorCode || "Unknown";

      return error;
    },
    
    getErrorMessage: function (error, errorStrings) {
      if (error.isDocsError) {
        return this.getDocsErrorMessage(error, errorStrings);
      }
      
      var message = "";
      switch (error.code) {
      case "Unauthenticated":
        message = errorStrings.UNAUTHENTICATED;
        break;
      case "AccessDenied":
        message = errorStrings.ACCESS_DENIED;
        break;
      case "ItemNotFound":
        message = errorStrings.NOT_FOUND;
        break;
      case "Conflict":
        message = errorStrings.CONFLICT;
        break;
      }
      
      if (!message) {
        message = errorStrings.DEFAULT;
      }
      
      return message;
    },
    
    getDocsErrorMessage: function (error, errorStrings) {
      var message = "";
      switch (error.code) {
      case "AccessDenied":
        message = errorStrings.ACCESS_DENIED;
        break;
      case "ItemNotFound":
        message = errorStrings.NOT_FOUND;
        break;
      case "CannotReachRepository":
        message = errorStrings.CANNOT_REACH_REPOSITORY;
        break;
      case "QuotaViolation":
        message = errorStrings.QUOTA_VIOLATION;
        break;
      case "ConversionUnavailable":
        message = errorStrings.CONVERSION_UNAVAILABLE;
        break;
      case "DocumentTooLarge":
        message = errorStrings.TOO_LARGE;
        break;
      case "ConversionTimeout":
        message = errorStrings.CONVERSION_TIMEOUT;
        break;
      case "ServerBusy":
        message = errorStrings.SERVER_BUSY;
        break;
      }
      
      if (!message) {
        message = errorStrings.DEFAULT;
      }
      
      return message;
    }
  };
});
