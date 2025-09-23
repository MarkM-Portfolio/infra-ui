/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.TagSlider");
dojo.require("dojo.cookie");

//Documentation: https://w3.webahead.ibm.com/w3ki/display/conndev/Common+Slider
lconn.core.TagSlider.showTagVis = function(minVisThreshold, tagElemId) 
{
	if (!dojo.byId(tagElemId)) 
	{
		// no tags on page
		return;
	}
		
	var listOfLiElements = dojo.byId(tagElemId).getElementsByTagName('li');
	for (var i = 0; i < listOfLiElements.length; i++)
	{
		var currentLiElement = listOfLiElements[i];
		var currentValueMatch = currentLiElement.className.match(/^f\d+-(\d+)/); //[f1-11,11]
		if (currentValueMatch)
		{
			var currentValue = currentValueMatch[1];
			currentLiElement.style.display = (currentValue >= minVisThreshold) ? "inline" : "none";
		}
	}
}

lconn.core.TagSlider.updateTagVis = function(minVisThreshold, tagElemId) 
{
	//lconn.core.TagSlider.sliderUtilSetCookie("sliderVis_lconnTagSliderHandle", minVisThreshold);
	dojo.cookie("sliderVis_lconnTagSliderHandle", minVisThreshold);
	lconn.core.TagSlider.showTagVis(minVisThreshold, tagElemId);
}

lconn.core.TagSlider.sliderUtilGetPosition = function(name) 
{
	//var defaultSliderVisVal = lconn.core.TagSlider.sliderUtilGetCookie(name);
	var defaultSliderVisVal = dojo.cookie(name);
	if (defaultSliderVisVal == null || defaultSliderVisVal < 0) {
		defaultSliderVisVal = 0;
	} else if (defaultSliderVisVal > 100) {
		defaultSliderVisVal = 100;
	}
			
	return defaultSliderVisVal;
}

/**
lconn.core.TagSlider.sliderUtilGetCookie = function(name) 
{
	var cookie = document.cookie.match(new RegExp('(^|;)\\s*' + escape(name) + '=([^;\\s]*)'));
    return (cookie ? unescape(cookie[2]) : null);	
}

lconn.core.TagSlider.sliderUtilSetCookie = function(name, value) 
{
	if( typeof('value') != 'undefined' && value != null){
	var date = new Date( );
	date.setTime( date.getTime( ) + ( 1000 * 60 * 60 * 24 * 7));
	document.cookie = name + "=" + value + "; expires=" + date.toGMTString( ) + "; path=/";
	}
}
*/
