/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// JavaScript Document to determine location to place popup
var gvMenu=false;
var gvHideSubWindow = true;
function showMenu(pMenu,e,subsShow,bidir){

	hideMenu(e);//before we pop up this menu, hide any open menus
	var vSrc = (e.target) ? e.target : e.srcElement; /*gets event target, depending on browser*/
	var vMenu=document.getElementById(pMenu);
	//sets the menu position
	//normal position is a tad offset from the element that triggered the menu
	
	// to get the position for the drop down menu in case of RTL and LTR
	var menuLeftOffset;
	if( typeof( bidir) != "undefined" && bidir != null && bidir =='rtl') {
		menuLeftOffset = (vMenu.offsetWidth > 0)? vMenu.offsetWidth : 175; // assume default value for menu if offsetWidth is zero. 		
		menuLeftOffset = 24 - menuLeftOffset;
	}else{
		menuLeftOffset = vSrc.offsetWidth - 24	;
	}
	
	var vTop = (menuGetOffsetTop(vSrc,0) + vSrc.offsetHeight - 10);	
	var vLeft = (menuGetOffsetLeft(vSrc,0) + menuLeftOffset);
	
	
	//check to make sure position is not offscreen and adjust, if it is
	if (document.documentElement){ //IE 6.0+
		var vBody = document.documentElement;		
	}else{
		var vBody = document.body;
	}	
	if (window.innerHeight){
		var vHeight = window.innerHeight;
		var vWidth = window.innerWidth;
	}else{
		var vHeight = vBody.clientHeight;
		var vWidth = vBody.clientWidth;
	}
	if ((vTop + vMenu.offsetHeight) > vBody.offsetHeight) vTop -= vMenu.offsetHeight;	
	if ((vLeft + vMenu.offsetWidth) > vBody.offsetWidth) vLeft -= vMenu.offsetWidth;
	//check to make sure our adjustments didn't result in values less than 0 and reset to 0 if they did.
	if (vTop < 0) vTop=0;
	if (vLeft < 0) vLeft=0;

	//check if showing subs div
	if(subsShow){
        vLeft -= 200;
		}		
    

	//set the style
	vMenu.style.top = vTop + "px";
		if(subsShow){
			vLeft = vLeft - 10;
		}
	vMenu.style.left = vLeft  + "px";
	vMenu.style.display="block";
	gvMenu=vMenu;
	e.cancelBubble=true;
   
}



function menuGetOffsetTop(pElem,pOTOP){
	//this function is called recursively until we get to the body element.  Not needed for absolutely positioned items.
	var offset = 0;
	var curElem = pElem;
	while (curElem){
		offset += curElem.offsetTop;
   		curElem = curElem.offsetParent;
   		if (curElem) offset -= curElem.scrollTop;
   	}
	return offset;
}

function menuGetOffsetLeft(pElem,pOLEFT){
	//this function is called recursively until we get to the body element. Not needed for absolutely positioned items.
	var offset = 0;
	var curElem = pElem;
	while (curElem){
		offset += curElem.offsetLeft;
   		curElem = curElem.offsetParent;
   		if (curElem) offset -= curElem.scrollLeft;
   	}
	return offset;
}

function handleClick(event){
    if(gvHideSubWindow){
	hideMenu(event);
}      
}


function hideMenu(e){
	if (!gvMenu) return;
	gvMenu.style.display="none";
	gvMenu=false;
}
