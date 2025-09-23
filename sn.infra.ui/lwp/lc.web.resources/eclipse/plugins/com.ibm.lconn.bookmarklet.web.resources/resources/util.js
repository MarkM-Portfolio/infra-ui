/* Copyright IBM Corp. 2006, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.util");

dojo.require("dijit.Dialog");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.bookmarklet.util", null, {
	tagrecs : null,
	
	
	showDialog: function(context){
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
	},
	
	setupTags : function(jsonTagsData){
		this.tagrecs = jsonTagsData || {};
		var html = "", showTagSections = false;
		dojo.byId("tagCandidatesHolder").innerHTML = html;
		html += "<style>.lotusTagCloud a{font-weight:normal !important;}</style>";
		if (this.tagrecs.popular && this.tagrecs.popular.length > 0){
			showTagSections = true;
			html += "<div id='popularTags' class='lotusTagCloud'><ul  aria-labelledby='popularTagsDesc' role='toolbar'><li><strong id='popularTagsDesc' style='white-space:nowrap;'>${tagspopular}</strong></li>";
			for(var i=0;i<this.tagrecs.popular.length;i++){
				var pupularTag = lconn.core.globalization.bidiUtil.enforceTextDirection(this.escapeJsToHtml(this.tagrecs.popular[i]));
				html += '<li><a role="button"  title="'+pupularTag
				+'" onkeyup=\'addtag(event,"popular",'+ i +')\' onmousedown=\'addtag(event,"popular",'+ i +')\' href="javascript:void(0);">' + pupularTag + '</a> </li>';
			}
			html += "</ul></div>";
		}
		if (this.tagrecs.recent && this.tagrecs.recent.length > 0){
			showTagSections = true;
			html += "<div id='recentTags' class='lotusTagCloud'><ul aria-labelledby='recentTagsDesc' role='toolbar'><li><strong id='recentTagsDesc' style='white-space:nowrap;'>${tagsrecent}</strong></li>";
			for(var i=0;i<this.tagrecs.recent.length;i++){
				var recentTag = lconn.core.globalization.bidiUtil.enforceTextDirection(this.escapeJsToHtml(this.tagrecs.recent[i]));
				html += '<li><a role="button"  title="'+recentTag
				+'" onkeyup=\'addtag(event,"recent",'+ i +')\' onmousedown=\'addtag(event,"recent",'+ i +')\' href="javascript:void(0);">' + recentTag + '</a> </li>';
			}
			html += "</ul></div>";
		}
		if (this.tagrecs.recommended && this.tagrecs.recommended.length > 0){
			showTagSections = true;
			html += "<div id='recommendedTags' class='lotusTagCloud'><ul aria-labelledby='recommendedTagsDesc' role='toolbar'><li><strong id='recommendedTagsDesc' style='white-space:nowrap;'>${tagsrecommended}</strong></li>";
			for(var i=0;i<this.tagrecs.recommended.length;i++){
				var recommendedTag = lconn.core.globalization.bidiUtil.enforceTextDirection(this.escapeJsToHtml(this.tagrecs.recommended[i]));
				html += '<li><a role="button"  title="'+recommendedTag
				+'" onkeyup=\'addtag(event,"recommended",'+ i +')\' onmousedown=\'addtag(event,"recommended",'+ i +')\' href="javascript:void(0);">' + recommendedTag+ '</a> </li>';
			}
			html += "</ul></div>";
		}
		if (showTagSections){
			var res = dojo.i18n.getLocalization("lconn.bookmarklet", "strings");
			html = dojo.string.substitute(html, res);
			dojo.byId("tagCandidatesHolder").innerHTML = html;
			dojo.byId("tagCandidatesHolder").style.display = "block";
		}
	},
	
	escapeJsToHtml: function(jstring){
		return jstring.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
	},
	/*
	 * Convert url parametets strings to object  
	 */
	parseQueryString: function(qs){
		var obj= {};
		var strs = qs.split("&");
		for(var i=0; i<strs.length; i++){
			var keyValue = strs[i].split("=");
			obj[keyValue[0]] = keyValue[1];
		}
		return obj;
	}
	
});

var util = new lconn.bookmarklet.util();
//window.alert = util.showDialog;
