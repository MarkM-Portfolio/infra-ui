/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.data.table");

dojo.require("dojox.data.CsvStore");

/**
   @author <a href="mailto:litong01@us.ibm.com">Tong Li</a>      
   @class com.ibm.mm.data.table 
   @name com.ibm.mm.data.table
*/ 
dojo.declare("com.ibm.mm.data.table", dojox.data.CsvStore, 
/** @lends com.ibm.mm.data.table */
{

	/*
	 * Extend CsvStore to support CSV like data
	 */
	constructor: function(/* Object */ keywordParameters){
	// summary: initializer
	// keywordParameters: {url: String}
	// keywordParameters: {data: String}
	// keywordParameters: {label: String} The column label for the column to use for the label returned by getLabel.
	// keywordParameters: {csvlike: String} support CSV like data

		if (this._isCSVLike(keywordParameters['data'])){
			keywordParameters['data'] = this._CSVLike2CSV(keywordParameters['data']);
		}
		
		//below code copied from dojox.data.CsvStore as super class's constructor is always
		//called before subclass's constructor automatically
		this._attributes = [];			// e.g. ["Title", "Year", "Producer"]
		this._attributeIndexes = {};	// e.g. {Title: 0, Year: 1, Producer: 2}
 		this._dataArray = [];			// e.g. [[<Item0>],[<Item1>],[<Item2>]]
 		this._arrayOfAllItems = [];		// e.g. [{_csvId:0,_csvStore:store},...]
		this._loadFinished = false;
		if(keywordParameters.url){
			this.url = keywordParameters.url;
		}
		this._csvData = keywordParameters.data;
		if(keywordParameters.label){
			this.label = keywordParameters.label;
		}else if(this.label === ""){
			this.label = undefined;
		}
		this._storeProp = "_csvStore";	// Property name for the store reference on every item.
		this._idProp = "_csvId"; 		// Property name for the Item Id on every item.
		this._features = {	
			'dojo.data.api.Read': true,
			'dojo.data.api.Identity': true 
		};
		this._loadInProgress = false;	//Got to track the initial load to prevent duelling loads of the dataset.
		this._queuedFetches = [];
	},
	
	_isCSVLike: function(csvlike){
		
		var data = dojo.clone(csvlike);
		
		if (dojo.isString(data) && data != null && data.length > 0){
			data = data.replace(/\n/g, "");
			var rows = data.split('|');
			if (!rows || rows.length < 2){
				return false;
			}
			
			var columnList = this._splitterCSVLikeRow(rows[0]);
			if (!columnList || columnList.length <= 0) return false;
	
			var columnLength = columnList.length;
			for (var i=1; i<rows.length; i++){
				if (rows[i] == "") {
					break;
				}
	
				var rowList = this._splitterCSVLikeRow(rows[i]);
				if (!rowList || rowList.length != columnLength) return false;
			}
	
			return true;			
		}

		return false;
	},
	
	/*
	 * Split CSV like row to cells, note CSV like cell may contain separator , | "
	 */
	_splitterCSVLikeRow: function(dataString){
		var cells = dataString.split(",");

		//handle case where cell contains ,
		var len = cells.length;
		var i, j;
		for (var m=0; m<len; m++){
			i = j = -1;
			for (var k=0; k<cells.length; k++){
				if (i == -1 && cells[k].charAt(0) == '"' && cells[k].charAt(cells[k].length - 1) != '"' ){
					i = k;
					continue;
				}
				if (i>0 && cells[k].charAt(cells[k].length - 1) == '"' && cells[k].charAt(0) != '"' ){
					j = k;
					break;
				}
			}
			
			if (i >0 && j >0){
				var str = cells[i];
				for (var k=i+1; k<j+1; k++){
					str = str + "," + cells[k];
				}

				var temp = [];
				for (var k=0; k<i; k++){
					temp.push(cells[k]);
				}
				temp.push(str);
				for (var k=j+1; k<cells.length; k++){
					temp.push(cells[k]);
				}
				cells = temp;
			}else {
				break;
			}
			
		}

		return cells;		
	},
	
	/*
	 * Convert CSV like data to CSV data
	 */
	_CSVLike2CSV: function(/* String */csvlike){
		/*
		 * There are two differences between CSV data and CSV like data
		 * 1. add CSV like data's type information to CSV column row
		 * 2. replace row separator '|' with '\n'
		 */
		
		var typeArray = ['string'];/*add possible CSV like data's type term here*/

		function _inArray(item, arrayData){
			for (var i=0; i<arrayData.length; i++){
				if (item.toUpperCase() == arrayData[i].toUpperCase()) return true;
			}
			return false;
		}
		
		function _addTypeInfo(columnList, typeList){
			if (!typeList){
				typeList = [];
				for (var i=0; i<columnList.length; i++){
					typeList.push('text');
				}
			}

			if (columnList.length != typeList.length){
				throw('Illegal CSV like data');
			}

			for (var i=0; i<columnList.length; i++){
				columnList[i] = columnList[i] + '<' + typeList[i] + '>';
			}
			
			return columnList;
		}
		
		var data = dojo.clone(csvlike);
		
		if (dojo.isString(data) && data != null && data.length > 0){

			data = data.replace(/\n/g, "");
			var rows = data.split('|');
			var csv = [];

			if (rows.length >= 2){
				var columnList = this._splitterCSVLikeRow(rows[0]);
				var typeList = this._splitterCSVLikeRow(rows[1]);
				
				var isTypeRow = true;
				for (var i=0; i<typeList.length; i++){
					if (!_inArray(typeList[i], typeArray)){
						isTypeRow = false;
						break;
					}
				}
				
				if (isTypeRow){
					columnList = _addTypeInfo(columnList, typeList);
					csv.push(columnList.join(","));
					for (var i=2; i<rows.length; i++){
						csv.push(rows[i]);
					}
				} else {
					columnList = _addTypeInfo(columnList, null/*add default text type*/);
					csv.push(columnList.join(","));
					for (var i=1; i<rows.length; i++){
						csv.push(rows[i]);
					}
				}
				
			} else{
				//only has column name row, no real data
				var columnList = this._splitterCSVLikeRow(rows[0]);
				columnList = _addTypeInfo(columnList, null/*add default text type*/);
				csv.push(columnList.join(","));
			}
			
			return csv.join("\n");
		} else {
			throw('Illegal CSV like data');
		}

	},
	
	/**
	* overwrite the attribute this._attributes and this._attributeIndexes
	* this is to make sure that the the Csv store handles the data types correctly.<b>
	* will also add this._attributeTypes for a given attribute. 
	*/
	_processData: function(/* String */ data){
		this._getArrayOfArraysFromCsvFileContents(data);
		this._processAttributeTypes();
		this._arrayOfAllItems = [];
		for(var i=0; i<this._dataArray.length; i++){
			this._arrayOfAllItems.push(this._createItemFromIdentity(i));
		}
		this._loadFinished = true;
		this._loadInProgress = false;
	},

	_processAttributeTypes: function() {
		var _newAttributes = [];
		this._attributeTypes = {};
		var anAttribute, startPos, newAttributeName;		
		var myRE = /^(\w|\s)+<(\w|(.\w)+)+>$/;
		for (index=0; index<this._attributes.length; index++) {
			anAttribute = this._attributes[index];
			if (anAttribute.match(myRE)) {
				startPos = anAttribute.indexOf("<");				
				newAttributeName = anAttribute.substring(0, startPos);
				_newAttributes[_newAttributes.length] = newAttributeName;
				this._attributeTypes[newAttributeName] = anAttribute.substring(startPos+1, anAttribute.length - 1);
				this._attributeIndexes[newAttributeName] = this._attributeIndexes[anAttribute];
				delete this._attributeIndexes[anAttribute];
			}
			else { 
				_newAttributes[_newAttributes.length] = anAttribute;
				this._attributeTypes[anAttribute] = "text";
			}
		}
		this._attributes = _newAttributes;		
	},

    /** 
    * summary:
    * Returns data type of the given *item*
    *
    * @param {Object} item The item to access attributes on.
    * @returns {String}
    */
    getValueType: function(/* Object */ item, /* String */ attribute) {
    	return this._attributeTypes[attribute];
    },
        
    /**
    * This method will serialize the data object to a format that can be persisted. If this table has not been loaded, that is,
    * if that the fetch method has not been called, then the serialize method may not serialize the entire data set. We probaby have to
    * escape the double quotes.
    * @returns {Object} a serialized data object. For most of the data this should return a human readable string.
    */
    serialize: function () {
    	var theString = "";
    	//add all the attributes
    	var anAttrName, anItem, aValue;
    	for (index=0; index<this._attributes.length; index++) {
    		anAttrName = this._attributes[index]
    		theString += anAttrName + "<" + this._attributeTypes[anAttrName] + ">,";
    	}
		
		theString += "\n";		
		if (this._dataArray != null) {		
			for (index=0; index<this._dataArray.length;index++) {
				anItem = this._dataArray[index];
				if (anItem != null) {
					for (index0=0; index0<anItem.length;index0++) {
						aValue = anItem[index0];
						if (aValue.indexOf(",") >= 0) {
							theString += "\"" + aValue + "\",";
						}
						else {
							theString += aValue + ",";
						}
					}
					theString += "\n";
				}
			}    	
		}
		return theString;
    }
});
