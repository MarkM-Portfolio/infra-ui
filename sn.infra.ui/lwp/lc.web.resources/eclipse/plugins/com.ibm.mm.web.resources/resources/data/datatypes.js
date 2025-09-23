/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.data.datatypes");

/**
 @author <a href="mailto:litong01@us.ibm.com">Tong Li</a>
 @author <a href="mailto:bizheng@cn.ibm.com">Zheng Bi</a>
 @class com.ibm.mm.data.datatypes
 @name com.ibm.mm.data.datatypes
 */

dojo.require("dojo.i18n");
dojo.requireLocalization("com.ibm.mm.data", "dataTypeStrings", null, "ROOT,de,en,es,fr,it,ja,ko,pt-br,zh,zh-tw");

dojo.declare("com.ibm.mm.data.datatypes", null, /** @lends com.ibm.mm.data.datatypes */ {

    _alltypes: {
        'text': 1,
        'url': 1,
        'html': 1,
        'image': 1,
        'number': 1,
        'countrycode': 1,
        'languagecode': 1,
        'currency': 1,
        'boolean': 1,
        'date': 1,
        'time': 1,
        'timestamp': 1,
        'email': 1,
        'postalcode': 1,
        'phone': 1,
        'address': 1,
        'person': 1,
        'table': 1,
		'atom': 1,
		'xml': 1,
		'json': 1,
		'modeldata': 1
    },

	_simpleTypes: {
		'text': 1,
        'url': 1,
        'html': 1,
        'image': 1,
        'number': 1,
        'countrycode': 1,
        'languagecode': 1,
        'currency': 1,
        'boolean': 1,
        'date': 1,
        'time': 1,
        'timestamp': 1,
        'email': 1,
        'postalcode': 1,
        'phone': 1,
        'address': 1,
        'person': 1
	},

	_complexTypes: {
		'table': 1,
		'atom': 1,
		'xml': 1,
		'json': 1,
		'modeldata': 1
	},

	specialTypes: {
		'mashupdata':1
	},

    _mappings: {
        text: {
            'url': 1,
	        'html': 1,
	        'number': 1,
	        'countrycode': 1,
	        'languagecode': 1,
	        'currency': 1,
	        'boolean': 1,
	        'date': 1,
	        'time': 1,
	        'timestamp': 1,
	        'email': 1,
	        'postalcode': 1,
	        'phone': 1,
	        'address': 1,
	        'person': 1
        },

        'url': {},
        'html': {},
        'image': {},
        'number': {},
        'countrycode': {},
        'languagecode': {},
        'currency': {},
        'boolean': {},
        'date': {
            'timestamp': 1
        },
        'time': {
            'timestamp': 1
        },
        'timestamp': {
            'date': 1,
            'time': 1
        },
        'email': {},
        'postalcode': {},
        'phone': {},
        'address': {},
        'person': {},
        'json': {}
    },


    _SIMPLE_DATA_TYPE: 1,
    _COMBINED_DATA_TYPE: 2,
    _COMPLEX_DATA_TYPE: 3,

	resourceBundle:null,


    constructor: function(/* String */datatypecfg){
   		this.resourceBundle = dojo.i18n.getLocalization("com.ibm.mm.data", "dataTypeStrings");
    },

    addDataType: function(/* String */typename, /* String */typeCat){
		//Check type name
		if(typename === null || typeof typename == undefined) {
			return;
		}
        this._alltypes.typename = 1;
		//Check the type category
		if (typeCat === null || typeof typeCat == undefined || typeCat == this._SIMPLE_DATA_TYPE) {
			this._simpleTypes.typename = 1;
		} else {
			hthis._complexTypes.typename = 1;
		}
    },

    removeDataType: function(/* String */typename) {
        delete this._alltypes[typename];
    },

    addDataMapping: function(/* String */typename1, /* String */ typename2) {
        if (this._mappings.typename1 === null) {
            this._mappings.typename1 = {};
        }
        this._mappings[typename1][typename2] = 1;
    },

    removeDataMapping: function(/* String */typename1, /* String */ typename2) {
        if (this._mappings[typename1] !== null) {
            if (this._mappings[typename1][typename2] !== null) {
                delete this._mappings[typename1][typename2];
            }
        }
    },

    getAllTypes: function() {
        return dojo.clone(this._alltypes);
    },

    /**
	* The method to return if two types should be considered as a match.
	* It may need more work to include the combined data type mapping mechanism.
	*
	* @param {String} typename1 The first data type name(handle event)
	* @param {String} typename2 The second data type name.(publish event)<b>
	* @returns {Boolean}
	*/
	doesTypeMatch:function(/* String */ typename1, /* String */ typename2) {
		var doesItMatch = false;
		//null type does not match to any thing.
		if (typename1 === null || typename2 === null) {
		    return doesItMatch;
		}
		//date type is case-insensitive
		typename1 = typename1.toLowerCase();
		typename2 = typename2.toLowerCase();
		//if two types are same or either type is any, then they are considered as a match.
		if (typename1 == typename2 || typename1.toLowerCase() == 'any' || typename2.toLowerCase() == 'any') {
			doesItMatch = true;
		} else {
			//check the type of the "payload type"
			var typeOfName1 = this.checkDataType(typename1);
			switch(typeOfName1) {
				//typename1 is simple data type
				case this._SIMPLE_DATA_TYPE:
					var typeOfName2 = this.checkDataType(typename2);
					switch(typeOfName2) {
						 //Two simple data types, use the mapping to decide whether they match or not
						case this._SIMPLE_DATA_TYPE:
							if (this._mappings[typename1][typename2] == 1) {
							    doesItMatch = true;
						    }
							break;
						//Simple data type VS combine data type, compare the main type. (url.text's main type is :url)
						case this._COMBINED_DATA_TYPE:
							var mainTypeOfType2 = this.getMainType(typename2);
							if (typename1 == mainTypeOfType2 || this._mappings[typename1][mainTypeOfType2] == 1) { //url can handle url.text
								doesItMatch = true;
							}
							break;
						default:
							break;
					}//end of switch(typeOfName2) {
					break;
				//For comebined type and complex data type as received data type, currently, consider match only when type names are exactly same
				//we can add more logic here in future
				case this._COMBINED_DATA_TYPE:
				case this._COMPLEX_DATA_TYPE:
				default:
					break;
			}// enf of switch(typeOfName1)
		}
		return doesItMatch;
	},
	
	/**
	* The method to return if two types should be considered as a match with a much more flex rule 
	* on combined type: only cares about the mail type, which mean
	*
	* @param {String} typename1 The first data type name(handle event)
	* @param {String} typename2 The second data type name.(publish event)<b>
	* @returns {Boolean}
	*/
	doesTypeFlexMatch:function(/* String */ typename1, /* String */ typename2) {
		var doesItMatch = false;
		//null type does not match to any thing.
		if (typename1 === null || typename2 === null) {
		    return doesItMatch;
		}
		//date type is case-insensitive
		typename1 = typename1.toLowerCase();
		typename2 = typename2.toLowerCase();
		//if two types are same or either type is any, then they are considered as a match.
		if (typename1 == typename2 || typename1.toLowerCase() == 'any' || typename2.toLowerCase() == 'any') {
			doesItMatch = true;
		} else {
			//check the type of the "payload type"
			var typeOfName1 = this.checkDataType(typename1);
			switch(typeOfName1) {
				//typename1 is simple data type
				case this._SIMPLE_DATA_TYPE:
					var typeOfName2 = this.checkDataType(typename2);
					switch(typeOfName2) {
						 //Two simple data types, use the mapping to decide whether they match or not
						case this._SIMPLE_DATA_TYPE:
							if (this._mappings[typename1][typename2] == 1) {
							    doesItMatch = true;
						    }
							break;
						//Simple data type VS combine data type, compare the main type. (url.text's main type is :url)
						case this._COMBINED_DATA_TYPE:
							var mainTypeOfType2 = this.getMainType(typename2);
							if (typename1 == mainTypeOfType2 || this._mappings[typename1][mainTypeOfType2] == 1 ) { //url can handle url.text
								doesItMatch = true;
							}
							break;
						default:
							break;
					}//end of switch(typeOfName2) {
					break;
				//For comebined type and complex data type as received data type, currently, consider match only when type names are exactly same
				//we can add more logic here in future
				case this._COMBINED_DATA_TYPE:
					var typeOfName2 = this.checkDataType(typename2);
					var mainTypeOfType1 = this.getMainType(typename1);
					switch(typeOfName2) {
						 //Two simple data types, use the mapping to decide whether they match or not
						case this._SIMPLE_DATA_TYPE:
							if (mainTypeOfType1 == typename2 || this._mappings[mainTypeOfType1][typename2] == 1) {
							    doesItMatch = true;
						    }
							break;
						//Simple data type VS combine data type, compare the main type. (url.text's main type is :url)
						case this._COMBINED_DATA_TYPE:
							var mainTypeOfType2 = this.getMainType(typename2);
							if (mainTypeOfType1 == mainTypeOfType2 || this._mappings[mainTypeOfType1][mainTypeOfType2] == 1 ) { //url can handle url.text
								doesItMatch = true;
							}
							break;
						default:
							break;
					}//end of switch(typeOfName2) {
				case this._COMPLEX_DATA_TYPE:
				default:
					break;
			}// enf of switch(typeOfName1)
		}
		return doesItMatch;
	},
	
	/**
	 * The method to return the mail type of a combined data type. If it's not combined data type,
	 * For example:
	 * url.text will return url
	 *
	 * @param {String} typename
	 */
    getMainType: function(/* String */ typename){
        var dotPosition = typename.indexOf('.');
		if(dotPosition < 0 ) {
			return typename;
		} else {
       	    return typename.substring(0, dotPosition);
       	}
    },

    checkDataType: function(/* String */ typename){
        //Check if the type name is the format like url.text
		var typename = typename.toLowerCase();
		var types = typename.split('.');
        if (types.length == 1) { // Not combine data type
            if (this._simpleTypes[typename] == 1) {
                return this._SIMPLE_DATA_TYPE;
            } else {
                return this._COMPLEX_DATA_TYPE;
            }
        } else if(types.length == 2 || types.length == 3) {  // type like: url.text || text.countrycode || url.text.countrycode
            var prefixType = types[0];
            var suffixType = types[types.length - 1];
			//In v1.1, only support url as prefix and
            //if (this._alltypes[prefixType] == 1 && this._alltypes[suffixType] == 1)
			if (prefixType == "url" || suffixType == "languagecode" || suffixType == "countrycode") {
                return this._COMBINED_DATA_TYPE;
            } else {
                return this._COMPLEX_DATA_TYPE;
            }
        } else {
			return this._COMPLEX_DATA_TYPE;
		}
    },

    getTypeLabel: function(/* String */typename, /* String */ locale) {
    	var typename = typename.toLowerCase();
		var shownType = typename;
		var result = this.checkDataType(typename);

       	if (result==this._COMBINED_DATA_TYPE){
			var dotPosition = typename.indexOf('.');
			var main = typename.substring(0, dotPosition);
			var mainType = this.getSimpleTypeLabel(main,locale);
			var sub = typename.substring(dotPosition+1,typename.length);
			var subType = this.getSimpleTypeLabel(sub,locale);
			shownType = mainType+' ('+subType+')';
    	} else {
		    shownType = this.getSimpleTypeLabel(typename,locale);
		}
		return shownType;
    },

	/**
	 * Get the display name of the simple or complex data type. The rule here is
	 * 1. For the simple type predefined, return the display name for this locale
	 * 2. For user defined or complex data type, if it's composed with English characters, return the date type with first letter capitalized
	 * 3. Otherwise, return the original data type
	 * @param {String} typename
	 * @param {String} locale
	 */
	getSimpleTypeLabel: function(/* String */typename, /* String */ locale){
		var label;
		if(this.resourceBundle[typename]!=null) {
			label=this.resourceBundle[typename];
		} else {
			label = typename.charAt(0).toUpperCase() + typename.substring(1);
		}
		return label;
	}
});
