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

function showDialog(context){
	var div = document.createElement("div");
	div.className = "lotusDialogWrapper";
	div.id = "dogear_alert_dialog";
	var html = "";
	html += '<div class="dijitDialogTitleBar" dojoattachpoint="titleBar">';
	html += '<span class="closeText" title="Cancel" dojoattachpoint="closeText">x</span>';
	html += '</span>';
	html += '</div>';
	html += '<div class="dijitDialogPaneContent" dojoattachpoint="containerNode">';
	html += '<div class="lotusDialogBorder" style="width: 300px;">';
	html += '<form class="lotusDialog lotusForm">';
	html += '<h1 style="padding-right:12px;padding-left:12px">';
	html += '<a class="lotusRight" href="javascript:dijit.byId(' + "'dogear_alert_dialog'" + ').onCancel();">';
	html += '<img class="otherFramework32 otherFramework32-ClosePopup32" src="' + dojo.config.blankGif + '"/>';
	html += '</a>';
	html += dojo.i18n.getLocalization("lconn.bookmarklet","strings", dojo.locale).alertDialogTitle;
	html += '</h1>';
	html += '<div>';
	html += '<div class="lotusDialogContent" id="dialogContent">';
	html += context;
	html += '</div>';
	html += '</div>';
	html += '<div class="lotusDialogFooter">';
	html += '<input class="lotusFormButton" type="button" value="' + dojo.i18n.getLocalization("lconn.bookmarklet","strings", dojo.locale).alertDialogOK + '" onclick="dijit.byId(' + "'dogear_alert_dialog'" + ').onCancel()"/>';
	html += '</div>';
	html += '</form>';
	html += '</div>';
	html += '</div>';
	div.innerHTML = html;
	document.body.appendChild(div);
	var dialog = new dijit.Dialog(null, div);
	dialog.onCancel = function(){
		this.hide();
		this.destroy();
	}
	dialog.show();
}
window.alert = showDialog;
var tagrecs;
function setupTags(jsonTagsData){
	tagrecs = jsonTagsData;
	var html = "", showTagSections = false;
	dojo.byId("tagCandidatesHolder").innerHTML = html;
	html += "<style>.lotusTagCloud a{font-weight:normal !important;}</style>";
	if (tagrecs.popular && tagrecs.popular.length > 0){
		showTagSections = true;
		html += "<div id='popularTags' class='lotusTagCloud'><ul  aria-labelledby='popularTagsDesc' role='toolbar'><strong id='popularTagsDesc' style='white-space:nowrap;'>${tagspopular}</strong>";
		for(var i=0;i<tagrecs.popular.length;i++){
			html += "<li><a role='button' title='"+tagrecs.popular[i]+"' onclick=\"addtag('" + tagrecs.popular[i] + "')\" href='javascript:void(0);'>" + tagrecs.popular[i]+ "</a> </li>";
		}
		html += "</ul></div>";
	}
	if (tagrecs.recent && tagrecs.recent.length > 0){
		showTagSections = true;
		html += "<div id='recentTags' class='lotusTagCloud'><ul aria-labelledby='recentTagsDesc' role='toolbar'><strong id='recentTagsDesc' style='white-space:nowrap;'>${tagsrecent}</strong>";
		for(var i=0;i<tagrecs.recent.length;i++){
			html += "<li><a role='button'  title='"+tagrecs.recent[i]+"' onclick=\"addtag('" + tagrecs.recent[i] + "')\" href='javascript:void(0);'>" + tagrecs.recent[i]+ "</a> </li>";
		}
		html += "</ul></div>";
	}
	if (tagrecs.recommended && tagrecs.recommended.length > 0){
		showTagSections = true;
		html += "<div id='recommendedTags' class='lotusTagCloud'><ul aria-labelledby='recommendedTagsDesc' role='toolbar'><strong id='recommendedTagsDesc' style='white-space:nowrap;'>${tagsrecommended}</strong>";
		for(var i=0;i<tagrecs.recommended.length;i++){
			html += "<li><a role='button'  title='"+tagrecs.recommended[i]+"' onclick=\"addtag('" + tagrecs.recommended[i] + "')\" href='javascript:void(0);'>" + tagrecs.recommended[i]+ "</a> </li>";
		}
		html += "</ul></div>";
	}
	if (showTagSections){
		var res = dojo.i18n.getLocalization("lconn.bookmarklet", "strings");
		html = dojo.string.substitute(html, res);
		dojo.byId("tagCandidatesHolder").innerHTML = html;
		dojo.byId("tagCandidatesHolder").style.display = "block";
	}
}


function createAltTextForHCMode(isBidi) {
}
