/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare"
], function (declare) {

	/**
	 * Object for working with OS Gadget userPrefs.
	 * For UI editing of UserPrefs @see com.ibm.lconn.gadget.util.userPrefHelper
	 * @name com.ibm.lconn.gadget.util.userPrefHelper
	 * @class 
	 */
	
	//
	// Helper code for dealing with Gadget user prefs. 
	// No UI in this code.  Use userPrefUI derived from this class
	// for displaying editing experience.
	//
	
	var userPrefHelper = declare("com.ibm.lconn.gadget.util.userPrefHelper", null, {
	
	/**
	 * Serializes User Pref object to string suitable for putting in Post body.
	 * @param {Object} userPrefs - userPrefs to serialize
	 * @name serializeToString
	 * @function
	 * @memberOf com.ibm.lconn.gadget.util.userPrefHelp
	 */
	
		serializeToString: function(userPrefs)
		{
			var postBody = "";
			for (var name in userPrefs) {
				if (userPrefs.hasOwnProperty(name)) {
					postBody += name + "=" + userPrefs[name];
					postBody += ",";
				}
			}
			// Remove trailing comma
			if (postBody != "") {
				postBody = postBody.substr(0, postBody.length - 1);
			}
			postBody = window.escape(postBody);
			return(postBody);
		},
	
		/**
		 * Deserializes User Pref string to User Pref object.
		 * @param {String} userPrefString - userPrefs string to deserialize
		 * @name deserializeToString
		 * @function
		 * @memberOf com.ibm.lconn.gadget.util.userPrefHelp
		 */
		deserializeFromString: function(userPrefString) {
			var result = {};
			if (typeof(userPrefString) != "undefined") {
				// Find patterns of a=b
				// deal with strings like "clockFormat=0,dateFormat=dd, mm d, yyyy
				// TBD is there a single regular expression that captures what we do here??
				var pName = this._getUserPrefName(userPrefString);
				while (pName != "") {
					userPrefString = userPrefString.substring(pName.length + 1);
					pValue = this._getUserPrefValue(userPrefString);
					userPrefString = userPrefString.substring(pValue.length + 1);
					result[pName] = pValue;
					pName = this._getUserPrefName(userPrefString);
				}
			}
			return(result);
			
		},
	
		/**
		 * Checks to see if userPrefs has all required values.
		 * @param {Object} userPrefs
		 * @param {Object} userPrefValues
		 * @returns {Bool} true iff all required userprefs have values
		 * @name hasAllRequired
		 * @function
		 * @memberOf com.ibm.lconn.gadget.util.userPrefHelp
		 */
		hasAllRequired: function(userPrefs, userPrefValues) {
			var result = true;
			for (var name in userPrefs) {
				if (userPrefs.hasOwnProperty(name)) {
					var up = userPrefs[name];
					switch(up.dataType.toUpperCase()) {
						case "STRING":
						case "LIST":
							if(up.required == true && userPrefValues[name] == "") {
								result = false;
							}
							break;
						default: // Other types have value by default (bool, enum)
							break;
					}
				}
			}
			return(result);
			
		},
		
		/**
		 * Returns userPref object set to default values
		 * @param {Object} userPrefsDefaults - default values 
		 * @returns {Object} userPrefs object set to default values in 'userPrefDefaults'
		 * @name getFromDefaults
		 * @function
		 * @memberOf com.ibm.lconn.gadget.util.userPrefHelp
		 */
		// Returns userpref object set to default values
		//
		getFromDefaults: function(userPrefsDefaults) {
			var userPrefs = {};
			for (var name in userPrefsDefaults) {
				if (userPrefsDefaults.hasOwnProperty(name)) {
					switch(userPrefsDefaults[name].dataType.toUpperCase()) {
						case "ENUM":
						case "STRING":
						case "BOOL":
							userPrefs[name] = userPrefsDefaults[name].defaultValue;
							break;
						default:
							break;
					}
				}
			}
			return(userPrefs);
		},
		
		/**
		 * Checks if userPrefs object is editable
		 * @param {Object} userPrefs 
		 * @returns {Bool} true iff userPrefs is editable
		 * @name isEditable
		 * @function
		 * @memberOf com.ibm.lconn.gadget.util.userPrefHelp
		 */
		isEditable: function(userPrefs) {
			var result = false;
		
			for (var name in userPrefs) {
				if (userPrefs.hasOwnProperty(name)) {
					switch(userPrefs[name].dataType.toUpperCase()) {
						case "ENUM":
						case "STRING":
						case "BOOL":
						case "LIST":
							result = true;
							break;
						default:
							break;
					}
				}
			}
			
			return(result);
		},
		
		/**
		 * Extracts the user pref name from beginning of serialized prefs and returns it.
		 * @param str {String} serialized userPrefs 
		 * @returns {String} name, or empty string if none.
		 * @name _getUserPrefName
		 * @function
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.userPrefHelp
		 */
		_getUserPrefName: function(str) {
			var result="";
			
			for (var i=0; i<str.length; i++)
			{
				var c = str.charAt(i);
				if (c == '=') {
					break;
				}
				else {
					result += c;
				}
			}
			return(result);
		},
	
		/**
		 * Extracts the user pref value from beginning of serialized prefs and returns it.
		 * @param str {String} serialized userPrefs 
		 * @returns {String} value, or empty string if none.
		 * @name _getUserPrefValue
		 * @function
		 * @private
		 * @memberOf com.ibm.lconn.gadget.util.userPrefHelp
		 */
	
		// Extracts the user pref value from beginning of serialized prefs and returns it
		//
		_getUserPrefValue: function(str) {
			// Eat characters until we get to a comma followed by a character, or end of string.
			var result = "";
			
			for (var i=0; i<str.length; i++)
			{
				var c = str.charAt(i);
				if (c == ',') {
					if (str.charAt(i+1) != ' ') {
						break;
					}
				}
				else {
					result += c;
				}
			}
			return(result);
		}
		
		
	});
	return userPrefHelper;
});
