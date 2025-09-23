/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.unit.as.EntryPost.PrettyJSON");

/**
 * Helps with the format of the JSON data.
 * @author Tao Shang
 */

dojo.declare("com.ibm.social.test.unit.as.EntryPost.PrettyJSON", null, {
	
	//string of the json data
	json : "",
	
	//indent level 
	level : 0,
	
	
	/* 
	 * Count the number of the attributes in the object
	 * @param obj - the json object to format
	 */
	_length : function(obj){
		var i = 0;
		for(p in obj) i++;
		return i;
	},

	/*
	 * Append spaces for indent
	 * @param  level - the indent level
	 */
	_indent : function(level){
		var dent = "";
		while (level-->0) {
			dent += "  ";
		}
		return dent;
	},
	
	/*
	 * Append the key and value with indent  recursively 
	 * @param data - the rest data to format
	 */
	_append : function(data){
		this.json += "{\n";
		this.level++;
		var len = this._length(data);
		var i = 0;
		for (key in data) {
			i++;
			this.json += this._indent(this.level) + "\"" + key + "\":";
			if (typeof data[key] == "object") {
				if(data[key] instanceof  Array) {
					this._appendArray(data[key]);
				} else {
					this._append(data[key]);
				}
			} else {
				this.json += "\"" + data[key] + "\"";
			}
			if (i<len) {
				this.json += ",";
			}
			this.json += "\n";
		}
		this.level--;
		this.json += this._indent(this.level) + "}";
	},
	
	
	/*
	 * Append the object in an array
	 * @param data - json array to format
	 */
	_appendArray : function (data){
		this.level++;
		this.json+= "[\n";
		this.level++;
		this.json += this._indent(this.level);
		for(var i =0; i < data._length; i++ ){
			this._append(data[0]);
			if (i<data._length-1) {
				this.json += ",";
			}
			this.json += "\n";
			
		}
		this.level--;
		this.json += this._indent(this.level)+ "]";
		this.level--;
	
	},
	
	
	/*
	 * Format the json data
	 * @param data - the json data to format
	 */
	format : function(data){
		this.json = "";
		this.level = 0;
		this._append(data);

		return this.json;
	}
	
	
	
});