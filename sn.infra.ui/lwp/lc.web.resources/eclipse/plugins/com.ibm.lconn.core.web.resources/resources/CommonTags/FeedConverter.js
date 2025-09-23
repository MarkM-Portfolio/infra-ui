/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.require("lconn.core.xpath");

dojo.provide("lconn.core.CommonTags.FeedConverter");

/***
This is a super class for Feed Conversion. It provides a basic implementation, each service should implement generateTagObject method.
***/

dojo.declare("lconn.core.CommonTags.FeedConverter", null,{

tagList: null,

categoriesTagName: "app:categories",

PREFIXES:  [ {
    prefix : 'atom',
    nameSpaceURI : 'http://www.w3.org/2005/Atom'
 }, {
    prefix : 'app',
    nameSpaceURI : 'http://www.w3.org/2007/app'
 }, {
    prefix : 'ibmsc',
    nameSpaceURI : "http://www.ibm.com/search/content/2010"
 } ],

 ////////////////////////////////////////////////////////////

//parseFeed
//Given an atom document with node name categories, will iterate through all the child nodes with node name category
//and call generateTagObject, generateTagObject returns a tag which parseFeed adds to a list of tags
//
//////////////////////////////////////////////////////////
parseFeed: function(feedObject){
	this.tagList = new Array();	
	
	// xpath is broken on IE11 so resorting to this workaround
	if (lconn.core.xpath.isIE11()) {

		// this code is parsing two different search response formats RTC #191582
		var categoryNodes = feedObject.documentElement.childNodes;
		if(!categoryNodes)
			return;
		if(feedObject.documentElement.localName=="categories"||categoryNodes[0].localName == "category" || categoryNodes[0].baseName == "category"){
			for (var i=0; i < categoryNodes.length; i++) {
				if(categoryNodes[i].localName == 'category' || categoryNodes[i].baseName == 'category'){
					var tag = this.generateTagObject(categoryNodes[i]);	
					this.tagList.push(tag);	
				}
			}
		}else if(categoryNodes[1].localName == "title" || categoryNodes[1].baseName == "title"){
			for(var i=0; i < categoryNodes.length; i++){
				if(categoryNodes[i].nodeName == 'ibmsc:facets'){
					var facetChildren = categoryNodes[i].childNodes[1].childNodes;
					for (var j=0;j <facetChildren.length; j++) {
						if (facetChildren[j].nodeName =='ibmsc:facetValue') {
							var tag = this.generateTagObjectFromFacet(facetChildren[j]);	
							this.tagList.push(tag);	
						}
					}
				}
			}
		}		
	} else {
			// this code is parsing two different search response formats RTC #191582
		var categoryNodes = lconn.core.xpath.selectNodes('/app:categories/atom:category', feedObject, this.PREFIXES, null);
		if (categoryNodes.length > 0) {
			for (var i=0; i < categoryNodes.length; i++) {
				var tag = this.generateTagObject(categoryNodes[i]);	
				this.tagList.push(tag);	
			}
		} else {
			var facetNodes = lconn.core.xpath.selectNodes('/atom:feed/ibmsc:facets/ibmsc:facet/ibmsc:facetValue', feedObject, this.PREFIXES, null);
			for (var i=0; i < facetNodes.length; i++) {
				var tag = this.generateTagObjectFromFacet(facetNodes[i]);	
				this.tagList.push(tag);	
			}
		}
	}
	
	return this.tagList;
},

////////////////////////////////////////////////////////////

//generateTagObject
//Given a category element, it creates an object with name, frequency and intensityBin properties
//
//////////////////////////////////////////////////////////
generateTagObject: function(categoryElement){
    var tagObject = new Object;
	tagObject.name = categoryElement.getAttribute("term");
	var frequency = categoryElement.getAttribute("snx:frequency");
	if(frequency)
	tagObject.frequency = parseInt(frequency);
	var intensityBin = categoryElement.getAttribute("snx:intensityBin");
	if(intensityBin)
	tagObject.intensityBin = parseInt(intensityBin);
	return tagObject;
},	
////////////////////////////////////////////////////////////

//generateTagObjectFromFacet
//Given a facet element, it creates an object with name, frequency and intensityBin properties
//
//////////////////////////////////////////////////////////
generateTagObjectFromFacet: function(facetElement){
    var tagObject = new Object;
	tagObject.name = facetElement.getAttribute("label");
	var weight = facetElement.getAttribute("weight");
	if(weight) {
		tagObject.frequency = parseInt(weight);
		tagObject.intensityBin = parseInt(weight);
	}
	return tagObject;
}

});
