<%@ page session="false" contentType="text/html; charset=UTF-8" buffer="48kb" %>
<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- HCL Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright HCL Technologies Limited 2006, 2022                     --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>

<%--wscExemptBegin--%>
<%--wscExemptEnd--%>
<%@ page import="com.ibm.lconn.core.web.util.UIConfigHelper" %>

<%@ taglib prefix="c" 			uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" 			uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="bidi"		uri="http://www.ibm.com/lconn/tags/bidiutil" %>
<%@ taglib prefix="hu" 			uri="http://www.ibm.com/bookmarklet/tags/htmlutil" %>
<%@ taglib prefix="jscript"		uri="http://www.ibm.com/dogear/tags/jscript" %>
<%@ taglib prefix="coreui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" %>

<c:set var="isNewUI" value="<%=UIConfigHelper.INSTANCE.isCNX8UI(request)%>"/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%
 com.ibm.lconn.bookmarklet.bean.FormBean bean = (com.ibm.lconn.bookmarklet.bean.FormBean)request.getAttribute("form");
 bean.setVerbiage(com.ibm.lconn.bookmarklet.acf.ActiveContentFilter.INSTANCE.filterContent(bean.getVerbiage()));
 request.setAttribute("form", bean);
%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="${fn:replace(locale, '_', '-')}">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<title>
			<c:choose>
				<c:when test="${servletPath == '/postFeed'}"><fmt:message key="jsp.feed.posting.title" /></c:when>
				<c:when test="${form.linkId != null && showDogearOnly}">
					<fmt:message key = "jsp.posting.popup.edit" />	
				</c:when>
				<c:otherwise><fmt:message key="jsp.posting.title" /></c:otherwise>
			</c:choose></title>
		<%@ include file="../cnx8ui.jsp" %>
		<link rel="shortcut icon" href="<lc-cache:uri template="{webResourcesRoot}/web/com.ibm.oneui3.styles/imageLibrary/Branding/Other/ConnectionsBlue16.ico" />" type="image/x-icon">
	    <bidi:direction />
		<lc-ui:stylesheets />
		
 		<script language="javascript">
 			var djLocale = "${locale}".replace('_','-').toLowerCase();
 			if (djLocale == 'iw') djLocale = 'he';
 			if (djLocale == "pt") djLocale = "pt-pt";
 			
 			var cPath = "${pageContext.request.contextPath}";
 			var isPopupForm = false;
 			<c:if test="${servletPath != '/postFeed'}">
 			if (window.opener) isPopupForm = true;
 			</c:if>
 			var originalWidth = 500, originalHeight = 450, serviceIncreasement = 150;;
 			var currentWindowHeight = originalHeight;
 			var entriesSelectDisplayed = false;
 			var useRTE = <c:if test="${plaintext}">false</c:if><c:if test="${not plaintext}">true</c:if>;
 			var servletPath = "${servletPath}";
 			var isValidURL = true;
 		</script>
	<c:if test="${isNewUI}"> 
		<style>
		.lotusBookmarklet.cnx8-ui #bookmarkletForm .lotusDialogHeader {
		    background: transparent;
		}
		.lotusBookmarklet.cnx8-ui #bookmarkletForm .lotusDialogHeader h1#pageTitleField {
 		   margin: 0px 3px;
 		   font-family: Inter,sans-serif;
 		   font-style: normal;
 		   font-weight: 500 !important;
 		   font-size: 17px !important;
 		   line-height: 22px;
 		   color: #363636 !important;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab {
   			 padding: 0px 15px;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr#lotusTabContainer>td div.lotusTabContainer>ul#lotusTabs>li {
			border: none;
			text-align: center;
			margin-bottom: 3px;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr#lotusTabContainer>td div.lotusTabContainer>ul#lotusTabs {
			bottom: 0px !important;
			display: flex;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr#lotusTabContainer>td div.lotusTabContainer>ul#lotusTabs li.lotusSelected a {
		    color: #01539B !important;
   		    border-bottom: 3px solid #4984b8;
   		    font-size: 0.99em !important;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr#lotusTabContainer>td div.lotusTabContainer>ul#lotusTabs li a {
		    font-size: 0.99em !important;
		    color: #3D5466 !important;
		    line-height: 21px;
   		    letter-spacing: 0.021px !important;
		    padding: 10px 26px 6px 26px !important;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr#lotusTabContainer td {
		width: 100%;
		padding-top: 50px;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td {
			display: block;
			margin: 0px;
			padding: 3px;
			width: calc(100% - 40px);
			outline: none;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td table#blogsInputs tbody>tr>td {
 		   width: 100% !important;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td table#blogsInputs tbody>tr>td a {
   		  font-size: 12px !important;
   		  line-height: 14px;
  		  color: #01539B;
  		  height: 14px;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr.lotusFormTabContentFirst>td {
			 margin: 20px 0px 10px 0px;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr.lotusFormTabContentFirst>td div.lotusChunk {
			 margin-top: 17px;
		}
		.lotusBookmarklet.cnx8-ui table>tbody>tr.lotusFormTabContentFirst>td>div>label.labelForBookmark {
			margin-right: 36px;
			font-size: 0.95em;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td.lotusFormFooter {
			border-top: none;
			padding: 27px 0px 54px 0px !important;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td.lotusFormFooter input#submitBtn {
			background: #01539B !important;
			border-radius: 2px !important;
			border: 1px solid #01539B !important;
			color: #fff !important;
			width: 105px;
			font-weight: 400;
			height: 36px;
			box-shadow: none;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td.lotusFormFooter input#cancelBtn {
			background: transparent !important;
			border-radius: 2px !important;
			border: 1px solid #01539B !important;
			color: #01539B !important;
			height: 36px;
			width: 105px;
			box-shadow: none !important;
			outline: none;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr#lotusTabContainer>td div.lotusTabContainer>ul#lotusTabs>li.lotusSelected {
			bottom: -3px !important;
			    display: contents;
		}
		.lotusBookmarklet.cnx8-ui #bookmarkletForm .lotusDialogHeader {
			background: transparent;
			padding-bottom: 0px;
		}
		.lotusBookmarklet.cnx8-ui #bookmarkletForm table.lotusFixedTable.lotusDialogContent {
			padding: 10px 20px;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td {
			display: block;
			margin: 0px;
			padding: 3px;
			width: calc(100% - 40px);
		}
		.lotusBookmarklet.cnx8-ui #bookmarkletForm table#addBookmarksTab tbody>tr>td>label {
			font-family: Inter,sans-serif !important;
    			font-weight: 600;
  			font-size: 12px !important;
  			color: #3D5466;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody tr td input[type="text"], .lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody tr td input#ptags {
			height: 18px;
			border: 1px solid #93A2AD;
			border-radius: 2px;
			outline: none;
			width: 100% !important;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td>select {
			height: 60px;
			border: 1px solid #93A2AD !important;
			border-radius: 2px;
			outline: none;
			width: calc(100% + 30px);
			margin-bottom: 13px;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab tbody>tr>td>textarea {
			width: 100% !important;
			height: 45px;
			border: 1px solid #93A2AD;
			border-radius: 2px;
			outline: none;
		}
		.lotusBookmarklet.cnx8-ui table#addBookmarksTab label#ptags_label a#tagHelppIcon img {
			width: 30px;
			height: 20px;
			background-position: right top;
			background-size: 1.95em 1.15em;
			background-image: url("styles/images/tags-info-icon.svg") !important;
		}
		.lotusBookmarklet.cnx8-ui #bookmarkletForm table#addBookmarksTab {
		padding-top: 0px;
		}
		.lotusBookmarklet.cnx8-ui #addBookmarksTab .lotusFormFooter .lotusIndent10.lotusLeft {
		padding-left: 0px !important;
		}
		.lotusBookmarklet.cnx8-ui #bookmarkletForm table#addBookmarksTab .lotusFormField.lotusMeta {
		    font-size: 12px !important;
   		    line-height: 20px;
   		    letter-spacing: 0.018px !important;
    		    color: #3D5466 !important;
		}	
		body.lotusBookmarklet {
		display: contents;
		}
		#addBookmarksTab div.lotusFormError {
 		   font-family: Inter, sans-serif !important;
 		   font-size: 11px !important;
 		   color: red !important;
		}	
		.lotusBookmarklet.cnx8-ui #bookmarkletForm .lotusTabContainer {
   		  border-bottom: 1px solid #ccc !important;
   		  width: inherit;
		}
		tr#dogearFields {
   			 font-size: 14px !important;
    			line-height: 17px;
   			 letter-spacing: 0.0252px !important;
		}	
		</style>
	</c:if>
	</head>
	<body class="lotusui lotusui30_body lotusui30dojo lotusui30_fonts lotusui30 oneui30 lotusBookmarklet <c:if test="${isNewUI}">cnx8-ui</c:if> <c:if test="${language == 'ja'}">lotusJapanese</c:if>" <c:if test="${bidi}">dir="rtl"</c:if>>
	<!-- body class="lotusBookmarklet"-->
		<coreui:dojo include="lconn.bookmarklet.app">
			djConfig.parseEnabled = false;			
		</coreui:dojo>
		
		<script type="text/javascript">
	    (function(){
	     	var ciaa = com.ibm.ajax.auth;
	     	// Set checkAllStatusCodes to true, aviod handleAs value check in auth.js.
	     	ciaa.checkAllStatusCodes=true;
	  		ciaa.interceptDojoXhr(function(){return true;});
 			ciaa.setAuthenticationHandler(function(response, ioArgs, onauthenticated){
 				if(ioArgs.args.form=="bookmarkletForm"){
 					var paraObj = util.parseQueryString(ioArgs.query);
 					// Due to url length limitation. The bookmarklet will only keep the title and url after user login.
 					var redirectUrl = cPath + 
				 					servletPath +
				 					"?title=" + paraObj["title"]+
				 					"&url=" + paraObj["url"]+
				 					"&ver=" + paraObj["ver"]+
				 					"&showDogearOnly=" + paraObj["showDogearOnly"];
					lconn.core.auth.login(redirectUrl);
 				}
			});
	  	})();
	  	</script>
		
		<form role="main" aria-live="assertive" accept-charset="UTF-8" id="bookmarkletForm" class="lotusDialog lotusForm" method="post" action="<c:choose><c:when test="${servletPath == '/postFeed'}"><c:url value="/postFeed" /></c:when><c:otherwise><c:url value="/post" /></c:otherwise></c:choose>" id="edit" onsubmit="return setDojoData();">
	 		<div class="lotusDialogHeader">	
		 		<h1 class="lotusHeading" id="pageTitleField">
					<c:set var="legend_title">
						<c:choose>
							<c:when test="${servletPath == '/postFeed'}">
								<!--img id="pageTitleImg" alt="<fmt:message key = "jsp.feed.posting.popup.new" />" title="<fmt:message key = "jsp.feed.posting.popup.new" />" class="iconsComponents64 iconsComponents64-Places64" src="<lc-ui:blankGif />"/-->
								<fmt:message key = "jsp.feed.posting.popup.new" />
							</c:when>
							<c:when test="${form.linkId != null && showDogearOnly}">
								<fmt:message key = "jsp.posting.popup.edit" />	
							</c:when>
							<c:otherwise>
								<fmt:message key = "jsp.posting.popup.new" />	
							</c:otherwise>
						</c:choose>
					</c:set>
					<c:out value="${legend_title}" escapeXml="false"/>
				</h1>
			</div>
 			<!--[if IE]><fieldset style="border:0;padding-left:5px;padding-right:5px;padding-top:25px;"><![endif]-->
 			<!--[if !IE]><!--><fieldset style="border:0;"><!--<![endif]-->
			<legend style="display:none">
				<c:out value="${legend_title}" escapeXml="false"/>
			</legend>
			<c:if test="${form.linkId != null && (not addToCommunities) && (not addToActivities) && (not addToBlogs)}">
				<input type="hidden" name="link_id" id="link_id" value="<c:out value="${form.linkId}" />" />
			</c:if>
			<input type="hidden" name="closeme" value="true" />
			<c:if test="${not empty showDogearOnly}">
				<input type="hidden" name="showDogearOnly" value="<c:out value="${showDogearOnly}" />" />
			</c:if>
			<c:if test="${not empty inframe}">
				<input type="hidden" name="inframe" value="<c:out value="${inframe} " />" />
			</c:if>
			<input type="hidden" name="submit" value="save" />
			<c:if test="${addToCommunities || addToActivities || addToBlogs}">
			<input type="hidden" name="IsNotAddToDogear" id="IsNotAddToDogear" value="true">
				<c:if test="${addToCommunities}">
				<input type="hidden" name="IndividualService" id="IndividualService" value="communities">
				</c:if>
				<c:if test="${addToActivities}">
				<input type="hidden" name="IndividualService" id="IndividualService" value="activities">
				</c:if>
				<c:if test="${addToBlogs}">
				<input type="hidden" name="IndividualService" id="IndividualService" value="blogs">
				</c:if>
			</c:if>
			<c:if test="${plaintext}">
				<input name="plaintext" value="yes" type="hidden">
			</c:if>
			<div id="warningMessagesDiv"></div>
			<table id="addBookmarksTab" class="lotusFixedTable lotusDialogContent" cellpadding="0" cellspacing="0" border="0" summary="" role="presentation">
				<tbody>
					<!--[if IE]>
					<col width="15%">
					<col width="80%">
					<col width="5%">
					<![endif]-->
					<tr>
						<td width="15%"> </td>
						<td width="80%">
							<c:if test="${not empty conflictWithExistingBookmark}">
			<span class="lotusFormError" role="alert"><fmt:message key="jsp.update.dogear.existing" /></span></c:if>

						</td>
						<td width="5%" class="lotusFormFieldRow">
							
						</td>
					</tr>
					<tr>
						<td colspan=2>

						<c:if test="${version!='4.5' && version!='ignore'}">
							<script>
								var dogearUrl = "";
								if(location.href.indexOf("https")!=-1){
									dogearUrl = lconn.core.config.services.dogear.secureUrl;
								}else{
									dogearUrl = lconn.core.config.services.dogear.url;
								}
							</script>
							<div id="messageInfo" class="lotusMessage lotusWarning" role="alert">
								<img class="lconnSprite lconnSprite-iconWarning16" src="<lc-ui:blankGif />" alt="icon"/>
								<span>									
									<fmt:message key="jsp.warning.version.confict" >
										<fmt:param>
											<a href="javascirpt:;" onclick="window.open(dogearUrl+'/nav/toolbox');return false;"><fmt:message key="jsp.warning.version.here"/></a>
										</fmt:param>
									</fmt:message>
								</span>
								<a class='lotusDelete' title='<fmt:message key='jsp.posting.message.close'/>' role='button' href='javascript:;' onclick="dojo.byId('messageInfo').style.display='none';"><img src='<lc-ui:blankGif />' /></a>
							</div>
						</c:if>
						</td>
					</tr>
					<tr>
						<td width="15%" class="lotusFormLabel lotusFormFieldRow">
							<label for="title"><span class="lotusFormRequired">* </span><fmt:message key = "jsp.helpapi.bookmark.prop.title" /></label>
						</td>
						<td class="lotusFormFieldRow">
							<script>
							var _title = "<jscript:stringescape>${form.title}</jscript:stringescape>";
							_title = _title.replace(/\"/g, "&quot;");
							document.write('<input aria-required="true" class="lotusText bidiAware" onblur="fnValidateTitle()" type="text" value="'+_title+'" id="title" name="title" />');
							</script>
						</td>
						<td class="lotusFormFieldRow">
							
						</td>
					</tr>
					<tr>
						<td width="15%" class="lotusFormLabel lotusFormFieldRow">
							<label for="urlField"><span class="lotusFormRequired">* </span><fmt:message key = "jsp.helpapi.bookmark.prop.url" /></label>
						</td>
						<td class="lotusFormFieldRow">
							<input type="hidden" name="constantUrl" value="<c:out value="${form.url}"/>" />
							<script language="javascript">
							var _url = "<jscript:stringescape>${form.url}</jscript:stringescape>";
							_url = _url.replace(/\"/g, "&quot;");
							document.write('<input aria-required="true" onblur="fnValidateURL()" class="lotusText lotusLTR <c:if test="${bidi}">lotusAlignLeft</c:if> bidiSTT_URL" type="text" name="url" id="urlField" value="'+_url+'" />');
							document.write('<input type="hidden" name="constantUrl" value="'+_url+'" />'); 
							
							function fnValidateTitle(){
								if (dojo.trim(dojo.byId("title").value.replace(/[\s]/g, "")) == ""){
									if (dojo.byId("errorMsgFortitle") == null){
										dojo.byId("title").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").notitle, 'title'), dojo.byId("title"));
									}else {
										dojo.byId("errorMsgFortitle").style.display = "inline";
									}
								}else {
									if (dojo.byId("errorMsgFortitle") != null){
										dojo.byId("errorMsgFortitle").style.display = "none";
									}
								}
							}
							
							function fnValidateURL(){
								if(!isValidURL) return;
								var temURL = dojo.trim(dojo.byId("urlField").value);
								const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/g;
								if(temURL == ""){
									if (dojo.byId("errorMsgForurlField") == null){
										dojo.byId("urlField").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").nourl, 'urlField'), dojo.byId("urlField"));
									}else {
										dojo.byId("errorMsgForurlField").innerHTML = dojo.i18n.getLocalization("lconn.bookmarklet","strings").nourl;
										dojo.byId("errorMsgForurlField").style.display = "inline";
									}
								}else if(!temURL.match(urlRegex)){
									if (dojo.byId("errorMsgForurlField") == null){
										dojo.byId("urlField").parentNode.insertBefore(createErrorMessage("<jscript:stringescape><fmt:message key="jsp.url.invalid" /></jscript:stringescape>", 'urlField'), dojo.byId("urlField"));
									}else {
										dojo.byId("errorMsgForurlField").innerHTML = "<jscript:stringescape><fmt:message key="jsp.url.invalid" /></jscript:stringescape>";
										dojo.byId("errorMsgForurlField").style.display = "inline";
									}
								}else if(temURL.match(/^file:/)){
									if(! ( temURL.match(/^file:\/{3}\w/) || temURL.match(/^file:\/{2}\w/) ) ){
										if (dojo.byId("errorMsgForurlField") == null){
											dojo.byId("urlField").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").fileSchema, 'urlField'), dojo.byId("urlField"));
										}else {
											dojo.byId("errorMsgForurlField").innerHTML = dojo.i18n.getLocalization("lconn.bookmarklet","strings").fileSchema;
											dojo.byId("errorMsgForurlField").style.display = "inline";
										}
									}else {
										if (dojo.byId("errorMsgForurlField") != null){
											dojo.byId("errorMsgForurlField").style.display = "none";
										}
									}
								}else {
									if (dojo.byId("errorMsgForurlField") != null){
										dojo.byId("errorMsgForurlField").style.display = "none";
									}
								}
							}
							
							function evaluateURL(){
								lconn.core.globalization.bidiUtil.stripSpecialCharacters();
								var urlFieldValue = dojo.byId("urlField").value;
								if (urlFieldValue) {
									urlFieldValue = urlFieldValue.trim();
								}
								var args = {
									url: "${pageContext.request.contextPath}/evaluateURL",
									content: {url: urlFieldValue.indexOf("://") > -1?urlFieldValue:"http://" + urlFieldValue},
									handleAs: "json" ,
									sync: true,
									load: function(data){
												if (data.result == false) {
													isValidURL= false;
 												}else{
 												 	isValidURL= true;
 												}
											}, 
									error: function(err){console.log(err);} 
								}; 
								dojo.xhrGet(args);
								return isValidURL;
							}
							
							function fnValidateDesc(){
								var maxByteLen;
								var descLen = 0;
								if (useRTE){
									if ((typeof rteEditor) != "undefined"){
										descLen = utf8Length(rteEditor.getData());
									}
								}else{
									descLen = utf8Length(dojo.byId("rteDiv").value);
								}
								var descAddedTextLen = 0;
								var lenExceeded = false;
								
								<c:if test="${CommunitiesEnabled}">
								if (dojo.byId("communityUuid") && dojo.byId("communityUuid").value != ""){
									maxByteLen = 2048;
									if (useRTE){
										if ((typeof communitiesEditor) != "undefined"){
											descAddedTextLen = utf8Length(communitiesEditor.getData());
										}
									}else{
										descAddedTextLen = utf8Length(dojo.byId("rteDivForCommunities").value);
									}
									if (descLen + descAddedTextLen > maxByteLen){
										lenExceeded = true;
									}
								}
								</c:if>
								<c:if test="${ActivitiesEnabled}">
								if (dojo.byId("activityUuid") && dojo.byId("activityUuid").value != ""){
									maxByteLen = 16000;
									if (useRTE){
										if ((typeof activitiesEditor) != "undefined"){
											descAddedTextLen = utf8Length(activitiesEditor.getData());
										}
									}else{
										descAddedTextLen = utf8Length(dojo.byId("rteDivForActivities").value);
									}
									if (descLen + descAddedTextLen > maxByteLen){
										lenExceeded = true;
									}
								}
								</c:if>
								<c:if test="${BlogsEnabled}">
								if (dojo.byId("blogUuid") && dojo.byId("blogUuid").value != null){
									maxByteLen = 16000;
									if (useRTE){
										if ((typeof blogsEditor) != "undefined"){
											descAddedTextLen = utf8Length(blogsEditor.getData());
										}
									}else{
										descAddedTextLen = utf8Length(dojo.byId("rteDivForBlogs").value);
									}
									if (descLen + descAddedTextLen > maxByteLen){
										lenExceeded = true;
									}
								}
								</c:if>
								<c:if test="${DogearEnabled && canAccessStandAloneBookmarks}">
								if ((dojo.byId("noneDogear") && !dojo.byId("noneDogear").checked) || (dojo.byId("addtodogear") && dojo.byId("addtodogear").value == "true")) {
									maxByteLen = 16000;
									descAddedTextLen = 0;
									if (descLen + descAddedTextLen > maxByteLen){
										lenExceeded = true;
									}
								}
								</c:if>

								
								if (lenExceeded){
									if (dojo.byId("errorMsgForrteDiv") == null){
										dojo.byId("rteDiv").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").exceedDescLength, 'rteDiv'), dojo.byId("rteDiv"));
									}else {
										dojo.byId("errorMsgForrteDiv").style.display = "inline";
									}
									return false; // Validation failed
								}else {
									if (dojo.byId("errorMsgForrteDiv") != null){
										dojo.byId("errorMsgForrteDiv").style.display = "none";
									}
									return true; // Validation successful
								}
							}
							
							function utf8Length(str) {
								if (str == null) return 0;
								var utf8= unescape(encodeURIComponent(str));
								return utf8.length;
							}
							</script>
						</td>
						<td class="lotusFormFieldRow"> </td>
					</tr>
					<tr>
						<td width="15%" class="lotusFormLabel lotusFormFieldRow">
							<label for="ptags">
							<fmt:message key = "jsp.helpapi.bookmark.prop.tags" />
								<a href="#" id="tagHelpIcon">
									<img alt="<fmt:message key="jspf.menu.settings.help" />" title="<fmt:message key="jspf.menu.settings.help" />" class="lconnSprite lconnSprite-iconHelp16" src="<lc-ui:blankGif />"/>
									<span class="lotusAltText">?</span>
								</a>
								<script type="text/javascript">
									dojo.addOnLoad(function(){lconn.core.HelpLauncher.createHelpLink(dojo.byId("tagHelpIcon"), "", dojo.byId("helpTagsForm"), {HELP:dojo.i18n.getLocalization("lconn.bookmarklet","strings").txtHelpTags, CLOSE:dojo.i18n.getLocalization("lconn.bookmarklet","strings").txtHelpTagsClose});});
								</script>
							</label>
						</td>
						<td class="lotusFormFieldRow" id="lotusFormFieldRow"><div>
							<span dojoType="lconn.core.TypeAheadDataStore" jsId="tagTypeAheadStore" queryParam="prefix" url="<c:url value="/tagslike/proxy" />?service=dogear&format=json&limit=10" ></span>
							<script>
							var _tags = "<jscript:stringescape>${form.tagsDisplayed}</jscript:stringescape>";
							_tags = _tags.replace(/\"/g, "&quot;");
							document.write('<input class="lotusText" onLoadDeferred="initTypeahead" onblur="fnValidateTags()" dojoType="lconn.bookmarklet.DogearTypeAhead" type="text" token=" " name="tags" id="ptags" value="'+_tags+'" maxlength="255" autoComplete="false" store="tagTypeAheadStore" searchDelay="400" minChars="2" searchAttr="tag" nameAttr="tag" multipleValues="true"/>');
							</script>
							</div>
							<script type="text/javascript">
							dojo.addOnLoad(function(){
								TabController.getServiceEntriesProxyUrl = "<c:url value='/service/proxy' />";
							});

							function fnValidateTags(){
								if (dojo.byId("ptags").value != "" && dojo.byId("ptags").value.indexOf('&') != -1){
									if (dojo.byId("errorMsgForptags") == null){
										dojo.byId("ptags").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").invalidTagChar, 'ptags'), dojo.byId("ptags"));
									}else {
										dojo.byId("errorMsgForptags").style.display = "inline";
									}
									hasError = true;
								}else {
									if(!hasError)hasError = false;
									if (dojo.byId("errorMsgForptags") != null){
										dojo.byId("errorMsgForptags").style.display = "none";
									}
								}
							}

							</script>
							<div id="tagCandidatesHolder" style="display:none;" class="bookmarkletSection"></div>
						</td>
						<td class="lotusFormFieldRow"></td>
					</tr>
					<tr>
						<td width="15%" class="lotusFormLabel lotusFormFieldRow">
							<label for="rteDiv"><fmt:message key = "jsp.helpapi.bookmark.prop.desc" /></label>
						</td>
						<td class="lotusFormFieldRow" id="editorContainer">
							<script>
							var _verbiage = "<jscript:stringescape>${form.verbiage}</jscript:stringescape>";
							_verbiage = _verbiage.replace(/\"/g, "&quot;");
							<c:if test="${not plaintext}">
								document.write('<div style="border: 1px solid #CCCCCC;"><textarea id="rteDiv" style="display:none" onblur="fnValidateDesc()">'+_verbiage+'</textarea>');
							</c:if>
							<c:if test="${plaintext}">
								document.write('<textarea id="rteDiv" style="widht:98%;" rows="4" class="lotusText bidiAware" onblur="fnValidateDesc()">'+_verbiage+'</textarea>');
							</c:if>
							</script>
							<input type="hidden" id="verbiage" name="verbiage" />
							<c:if test="${not plaintext}"></div></c:if>
						</td>
						<td class="lotusFormFieldRow"> </td>
					</tr>
					<c:if test="${isNewUI}">
						<tr>
							<td><div style="padding-bottom: 20px;" class="lotusFormField lotusMeta" title="<fmt:message key = 'jsp.common.legend'/>"><fmt:message key = "jsp.common.required" /></div></td>
						</tr>
					</c:if>
					<c:choose>
						<c:when test="${not showDogearOnly}">
						<tr id="lotusTabContainer">
							<td colspan="3" style="padding:0px;">
								<div class="lotusTabContainer" <c:if test="${bidi}">align="right"</c:if>>
									<ul class="lotusTabs" id="lotusTabs" role="toolbar" aria-label="<fmt:message key="jsp.tabs.desc" />">
										<li <c:if test="${ (not canAccessStandAloneBookmarks) || (not DogearEnabled) || addToCommunities || addToActivities || addToBlogs }">style="display: none"</c:if>><a href="#" role="button" aria-controls="dogearFields" onclick="javascript: TabController.render(this, dojo.byId('dogearFields'));return false;" class="tabcontrol">
										<img role="presentation" class="otherFramework16 otherFramework16-menuCheckmark12 checked" src="<lc-ui:blankGif />" title="selected" alt="selected" /><span></span><fmt:message key="jsp.tab.dogear" /><img src="<lc-ui:blankGif />"/></a></li>
										<li <c:if test="${(not CommunitiesEnabled) || addToActivities || addToBlogs}">style="display: none;"</c:if>><a role="button" aria-controls="communitiesFields" href="#" onclick="javascript: TabController.render(this, dojo.byId('communitiesFields'), {container:dojo.byId('rteDivForCommunities'), id: 'editorWidgetForCommunities', height: '80px'}, 'communities', 'communityUuid');return false;" class="tabcontrol">
										<img role="presentation" class="otherFramework16 otherFramework16-menuCheckmark12 checked" src="<lc-ui:blankGif />" title="selected" alt="selected" style="display: none"/><span></span><fmt:message key="jsp.tab.communities" /><img src="<lc-ui:blankGif />"/></a></li>
										<li <c:if test="${(not ActivitiesEnabled) || addToCommunities || addToBlogs}">style="display: none;"</c:if>><a role="button" aria-controls="activitiesFields" href="#" onclick="javascript: TabController.render(this, dojo.byId('activitiesFields'), {container:dojo.byId('rteDivForActivities'), id: 'editorWidgetForActivities', height: '80px'}, 'activities', 'activityUuid');return false;" class="tabcontrol">
										<img role="presentation" class="otherFramework16 otherFramework16-menuCheckmark12 checked" src="<lc-ui:blankGif />" title="selected" alt="selected" style="display: none"/><span></span><fmt:message key="jsp.tab.activities" /><img src="<lc-ui:blankGif />"/></a></li>
										<li <c:if test="${(not BlogsEnabled) || addToCommunities || addToActivities}">style="display: none"</c:if>><a role="button" aria-controls="blogsFields" href="#" onclick="javascript: TabController.render(this, dojo.byId('blogsFields'), {container:dojo.byId('rteDivForBlogs'), id: 'editorWidgetForBlogs', height: '80px'}, 'blogs', 'blogUuid');return false;" class="tabcontrol">
										<img role="presentation" class="otherFramework16 otherFramework16-menuCheckmark12 checked" src="<lc-ui:blankGif />" title="selected" alt="selected" style="display: none"/><span></span><fmt:message key="jsp.tab.blogs" /><img src="<lc-ui:blankGif />"/></a></li>
									</ul>
								</div><!--end tab container-->
							</td>
							<script language="javascript">
							//dojo.require("lconn.core.aria.Toolbar");
							new lconn.core.aria.Toolbar("lotusTabs"); 
							</script>
						</tr>
						<c:if test="${canAccessStandAloneBookmarks}">
						<jsp:include page='dogear-fields.jspf' flush="true"/>
						</c:if>
						<jsp:include page='communities-fields.jspf' flush="true"/>
						<jsp:include page='activities-fields.jspf' flush="true"/>
						<jsp:include page='blogs-fields.jspf' flush="true"/>
						<c:if test="${not isNewUI}">
						<tr>
							<td><div style="padding-bottom: 20px;" class="lotusFormField lotusMeta" title="<fmt:message key = 'jsp.common.legend'/>"><fmt:message key = "jsp.common.required" /></div></td>
						</tr>
						</c:if>
						</c:when>
						<c:otherwise>
						<tr>
							<td width="15%" class="lotusFormLabel lotusFormFieldRow">
							</td>
							<td class="lotusFormFieldRow" role="group">
								<input type='hidden' id="addtodogear" name="addtodogear" value="true">
								<div><input type="radio" name="privateDogear" class="lotusCheckbox" id="publicDogear" checked="true" value="false" title="<fmt:message key="jsp.posting.public.hover" />"><label title="<fmt:message key="jsp.posting.public.hover" />" class="labelForBookmark" for="publicDogear"><fmt:message key="jsp.posting.public" /></label></div>
								<div><input type="radio" name="privateDogear" class="lotusCheckbox" id="privateDogear" <c:if test="${form.privateFlag}">checked="true"</c:if> value="true" title="<hu:encode><fmt:message key="jsp.posting.private.hover" /></hu:encode>" /><label title="<hu:encode><fmt:message key="jsp.posting.private.hover" /></hu:encode>" class="labelForBookmark" for="privateDogear"><fmt:message key="jsp.posting.private" /></label></div></td>
							<td class="lotusFormFieldRow"></td>
						</tr>
						<tr>
							<td><div style="padding-bottom: 20px;" class="lotusFormField lotusMeta" title="<fmt:message key = 'jsp.common.legend'/>"><fmt:message key = "jsp.common.required" /></div></td>
						</tr>
						</c:otherwise>
					</c:choose>
					<c:if test="${DogearEnabled && canAccessStandAloneBookmarks}">
						<script language="javascript">
						dojo.xhrGet(
							{
								url:"<c:url value="/tagslike/proxy" />",
								content:{url:"<jscript:stringescape>${form.url}</jscript:stringescape>", service:"tagrecs"},
								handleAs:"json",
								handle: function(data){util.setupTags(data);createAltTextForHCMode(${bidi});},
								error: function(err){console.log(err);}
							}
						);
						</script>
					</c:if>
					<tr>
						<td colspan="3" class="lotusFormFooter">
							<div id="submitWaiting" role="alert" class="lotusHidden lotusLeft" ><div class="lotusLoading"></div></div>
							<div class="lotusIndent10 lotusLeft">
							<input type="button" onclick="setDojoDataAndSubmit();" id="submitBtn" accesskey="S" value="<fmt:message key = "jsp.posting.save" />" aria-label="<fmt:message key="jsp.posting.save.label" />" class="lotusFormButton" />
							<c:choose>
								<c:when test="${inframe == 'true'}"> 
									<input type="button" id="cancelBtn" accesskey="C" onclick="javascript:location.href='<c:out value="${form.url}"/>'; return false;" value="<fmt:message key = "jsp.posting.cancel.title" />" class="lotusFormButton" />
								</c:when>
								<c:otherwise>
									<input type="button" id="cancelBtn" accesskey="C" onclick="javascript:window.close(); return false;" onmousedown="javascript:window.close(); return false;" value="<fmt:message key = "jsp.posting.cancel.title" />" aria-label="<fmt:message key="jsp.posting.cancel.label" />" class="lotusFormButton" />
								</c:otherwise>
							</c:choose>
							</div>
						<script type="text/javascript">
							dojo.addOnLoad(
								function(){
									lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
								}
							);
						</script>				
						</td>
					</tr>
				</tbody>
			</table>
			</fieldset>
		</form>
		<div style="display:none;" aria-hidden="true">
			<div id="helpPopular" style="z-index:1100; ">
				<jsp:include page='popular-help.jsp' flush="true"/>
			</div>
			<div id="helpRecent" style="z-index:1100;" >
				<jsp:include page='recent-help.jsp' flush="true"/>
			</div>
			<div id="helpRecommended"  style="z-index:1100;" >
				<jsp:include page='recommended-help.jsp' flush="true"/>
			</div>
			
			<div id="helpTagsForm" style="z-index:1100;" >
				<jsp:include page='tagsform-help.jspf' flush="true"/>
			</div> 
			<div id="helpTagsAll"  style="z-index:1100;" >
				<jsp:include page='all-help.jsp' flush="true"/>
			</div>
			<div id="helpTagsYours" style="z-index:1100;" >
				<jsp:include page='yours-help.jsp' flush="true"/>
			</div>
		</div>
		<!--End Tags Form Help Div -->
		
		<script type="text/javascript">
			function createAltTextForHCMode(isBidi) {
			}
			function createErrorMessage(msg, forObj){
				var divObj = document.createElement("div");
				divObj.setAttribute("id", "errorMsgFor" + forObj);
				divObj.setAttribute("role", "alert");
				dojo.addClass(divObj,"lotusFormError");
				divObj.innerHTML = msg;
				return divObj;
			}
			
			function submitAjax() {
				var xhrArgs = {
					url: cPath + servletPath + "Ajax",
					headers: {'X-Update-Nonce': 'true'},
					form: 'bookmarkletForm',
					handle: function(data){
						if(data == "success" || (data == "success.alreadyExist" && servletPath != "/postFeed")){
							self.close();
							if(window.opener){
								if (window.opener.document.getElementById('REFRESH_URL')){
									var pageURL = window.opener.document.getElementById('REFRESH_URL').href;
									var n = pageURL.indexOf("forceUpdate=");
									var newPageURL;
									if(n > 0) {
									   	newPageURL = pageURL.substring(0, n) +  "forceUpdate=" + new Date().getTime();
									} else {
									
									   if(pageURL.indexOf('?') >0) {
									  	 newPageURL = pageURL + "&forceUpdate=" + new Date().getTime();
									   } else {
									   	 newPageURL = pageURL + "?forceUpdate=" + new Date().getTime();
									   }
									}
									window.opener.location.href = newPageURL ;
								}
							}
						} else if(data == "success.alreadyExist") {
						    dojo.removeClass(dojo.byId("submitBtn"), "lotusBtnDisabled");
				            dojo.addClass(dojo.byId("submitWaiting"), "lotusHidden");
							
						    var msg = '';
							if(servletPath=="/postFeed") {
							   msg = dojo.i18n.getLocalization("lconn.bookmarklet","strings").feedAlreadyExist;
							} else {
							   msg = dojo.i18n.getLocalization("lconn.bookmarklet","strings").bookmarkAlreadyExist;
							}
						    lconn.share.util.message.setMessage(dojo.byId("warningMessagesDiv"), msg, "warning", 
							    {canClose:true, focusPostClose:dojo.body(), nls:dojo.i18n.getLocalization("lconn.core", "strings")});
						}else{
							document.documentElement.innerHTML = data;
						}
					}
				}
				dojo.xhrPost(xhrArgs);
				dojo.addClass(dojo.byId("submitBtn"), "lotusBtnDisabled");
				dojo.removeClass(dojo.byId("submitWaiting"), "lotusHidden");
			}
			function setDojoDataAndSubmit(){
				if (dojo.byId("noneDogear") && dojo.byId("noneDogear").checked){
					dojo.byId("addtodogear").value = "";
				}else{
					if (dojo.byId("addtodogear"))dojo.byId("addtodogear").value = "true";
				}
				var hasError = false;
				if (dojo.trim(dojo.byId("title").value.replace(/[\s]/g, "")) == ""){
					if (dojo.byId("errorMsgFortitle") == null){
						dojo.byId("title").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").notitle, 'title'), dojo.byId("title"));
					}else {
						dojo.byId("errorMsgFortitle").style.display = "inline";
					}
					hasError = true;
				}else {
					if(!hasError)hasError = false;
					if (dojo.byId("errorMsgFortitle") != null){
						dojo.byId("errorMsgFortitle").style.display = "none";
					}
				}
				if (dojo.byId("ptags").value != "" && dojo.byId("ptags").value.indexOf('&') != -1){
					if (dojo.byId("errorMsgForptags") == null){
						dojo.byId("ptags").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").invalidTagChar, 'ptags'), dojo.byId("ptags"));
					}else {
						dojo.byId("errorMsgForptags").style.display = "inline";
					}
					hasError = true;
				}else {
					if(!hasError)hasError = false;
					if (dojo.byId("errorMsgForptags") != null){
						dojo.byId("errorMsgForptags").style.display = "none";
					}
				}
				if (dojo.trim(dojo.byId("urlField").value) == "") {
					if (dojo.byId("errorMsgForurlField") == null){
						dojo.byId("urlField").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").nourl, 'urlField'), dojo.byId("urlField"));
					}else {
						dojo.byId("errorMsgForurlField").innerHTML = dojo.i18n.getLocalization("lconn.bookmarklet","strings").nourl;
						dojo.byId("errorMsgForurlField").style.display = "inline";
					}
					hasError = true;
				}else {
					if(!hasError)hasError = false;
					if (dojo.byId("errorMsgForurlField") != null){
						dojo.byId("errorMsgForurlField").style.display = "none";
					}
				}
				var temURL = dojo.trim(dojo.byId("urlField").value);
				if(temURL != "" && !evaluateURL()){
					if (dojo.byId("errorMsgForurlField") == null){
						dojo.byId("urlField").parentNode.insertBefore(createErrorMessage("<jscript:stringescape><fmt:message key="jsp.url.invalid" /></jscript:stringescape>", 'urlField'), dojo.byId("urlField"));
					}else {
						dojo.byId("errorMsgForurlField").innerHTML = "<jscript:stringescape><fmt:message key="jsp.url.invalid" /></jscript:stringescape>";
						dojo.byId("errorMsgForurlField").style.display = "inline";
					}
					hasError = true;
				}else if (temURL.match(/^file:/)) {
					if (! ( temURL.match(/^file:\/{3}\w/) || temURL.match(/^file:\/{2}\w/) ) ){
						if (dojo.byId("errorMsgForurlField") == null){
							dojo.byId("urlField").parentNode.insertBefore(createErrorMessage(dojo.i18n.getLocalization("lconn.bookmarklet","strings").fileSchema, 'urlField'), dojo.byId("urlField"));
						}else {
							dojo.byId("errorMsgForurlField").innerHTML = dojo.i18n.getLocalization("lconn.bookmarklet","strings").fileSchema;
							dojo.byId("errorMsgForurlField").style.display = "inline";
						}
						hasError = true;
					}else {
						if(!hasError)hasError = false;
						if (dojo.byId("errorMsgForurlField") != null){
							dojo.byId("errorMsgForurlField").style.display = "none";
						}
					}
				}else {
					if(!hasError)hasError = false;
					if(dojo.trim(dojo.byId("urlField").value)!= ""){
						if (dojo.byId("errorMsgForurlField") != null){
							dojo.byId("errorMsgForurlField").style.display = "none";
						}
					}
				}
				if (!fnValidateDesc()) hasError = true;
				var hasFeatureSelected = false;
				if (dojo.byId("addtodogear")){
					if (dojo.byId("addtodogear").value == 'true'){
						hasFeatureSelected = true;
					}
				}
				if (hasFeatureSelected == false){
					if (dojo.byId("deleteButton1")){
						if (dojo.byId("deleteButton1").checked) hasFeatureSelected = true;
					}
				}
				if (hasFeatureSelected == false){
					if (dojo.byId("blogUuid")){
						if (dojo.byId("blogUuid").value) hasFeatureSelected = true;
					}
				}
				if (hasFeatureSelected == false){
					if (dojo.byId("activityUuid")){
						if (dojo.byId("activityUuid").value) hasFeatureSelected = true;
					}
				}
				if (hasFeatureSelected == false){
					if (dojo.byId("communityUuid")){
						if (dojo.byId("communityUuid").value) hasFeatureSelected = true;
					}
				}
				if (hasFeatureSelected == false){
					if (dojo.byId("errorMsgForlotusTabContainer") == null){
						var msgText = "";
						if(servletPath=="/postFeed"){
							msgText = dojo.i18n.getLocalization("lconn.bookmarklet","strings").nothingFeedselected;
						}else{
						    <c:choose>
								<c:when test="${CommunitiesEnabled && (addToCommunities || ((not DogearEnabled)&& (not addToActivities) && (not addToBlogs))) }">
								msgText = dojo.i18n.getLocalization("lconn.bookmarklet","strings").nothingselected;
								</c:when>
								<c:when test="${ActivitiesEnabled && (addToActivities||((not CommunitiesEnabled) && (not DogearEnabled) && (not addToBlogs))) }">
								msgText = dojo.i18n.getLocalization("lconn.bookmarklet","strings").nothingselected_activity;
								</c:when>
								<c:when test="${BlogsEnabled && (addToBlogs || ((not ActivitiesEnabled) && (not CommunitiesEnabled) && (not DogearEnabled))) }">
								msgText = dojo.i18n.getLocalization("lconn.bookmarklet","strings").nothingselected_blogs;
								</c:when>
								<c:otherwise>
								msgText = dojo.i18n.getLocalization("lconn.bookmarklet","strings").nothingselected_all;
								</c:otherwise>
							</c:choose>
						}
						dojo.place(createErrorMessage(msgText, 'lotusTabContainer'), dojo.query("table", document.body)[0], "before");
						dojo.attr(dojo.byId("errorMsgForlotusTabContainer"), {"style":"padding-left:10px;padding-top:10px"});
					}else {
						dojo.byId("errorMsgForlotusTabContainer").style.display = "";
					}
					hasError = true;
				}else {
					if (dojo.byId("errorMsgForlotusTabContainer") != null){
						dojo.byId("errorMsgForlotusTabContainer").style.display = "none";
					}
					if(!hasError)hasError = false;
				}
				if (hasError) return false;
				if (useRTE){
					if((typeof rteEditor) != "undefined"){
						var rText = rteEditor.getData();					
						if(rText != null && dojo.byId('verbiage')){
							dojo.byId('verbiage').value = rText;
						}
					}
				}else{
					dojo.byId('verbiage').value = dojo.byId("rteDiv").value;
				}
				
				<c:if test="${CommunitiesEnabled}">
				if (useRTE){
					if((typeof communitiesEditor) != "undefined"){
						var rText = communitiesEditor.getData();					
						if(rText != null && dojo.byId('verbiageForCommunities')){
							dojo.byId('verbiageForCommunities').value = rText;
						}
					}
				}else {
					if (dojo.byId('verbiageForCommunities')){
						dojo.byId('verbiageForCommunities').value = dojo.byId('rteDivForCommunities').value;
					}
				}
				</c:if>
				<c:if test="${ActivitiesEnabled}">
				if(useRTE){
					if((typeof activitiesEditor) != "undefined"){
						var rText = activitiesEditor.getData();					
						if(rText != null && dojo.byId('verbiageForActivities')){
							dojo.byId('verbiageForActivities').value = rText;
						}
					}
				}else{
					if(dojo.byId('verbiageForActivities')){
						dojo.byId('verbiageForActivities').value = dojo.byId('rteDivForActivities').value;
					}
				}
				</c:if>
				<c:if test="${BlogsEnabled}">
				if (useRTE){
					if((typeof blogsEditor) != "undefined"){
						var rText = blogsEditor.getData();					
						if(rText != null && dojo.byId('verbiageForBlogs')){
							dojo.byId('verbiageForBlogs').value = rText;
						}
					}
				}else{
					if (dojo.byId('verbiageForBlogs')){
						dojo.byId('verbiageForBlogs').value = dojo.byId('rteDivForBlogs').value;
					}
				}
				</c:if>
				submitAjax();
			}
				function initStoreUrl(){
				<c:choose>
					<c:when test="${DogearEnabled && canAccessStandAloneBookmarks}">
					dijit.byId("ptags").store.url = "<c:url value="/tagslike/proxy" />&service=dogear&format=json&limit=10"
					</c:when>
					<c:when test="${BlogsEnabled}">
					dijit.byId("ptags").store.url = "<c:url value="/tagslike/proxy" />&service=blogs&limit=10"
					</c:when>
					<c:when test="${ActivitiesEnabled}">
					dijit.byId("ptags").store.url = "<c:url value="/tagslike/proxy" />&service=activities"
					</c:when>
					<c:when test="${CommunitiesEnabled}">
					dijit.byId("ptags").store.url = "<c:url value="/tagslike/proxy" />&service=communities&format=v2"
					</c:when>
					<c:otherwise></c:otherwise>
				</c:choose>
			}
				
				
		</script>
		
		<script language="javascript">
		dojo.addOnLoad(function(){
			TabController.resetAll();
			
			<c:choose>
			<c:when test="${DogearEnabled && canAccessStandAloneBookmarks && (not addToCommunities) && (not addToActivities) && (not addToBlogs)}">
			TabController.render(TabController.getElementsByClassName('A', 'tabcontrol')[0], dojo.byId('dogearFields'));
			</c:when>
			<c:when test="${CommunitiesEnabled && (addToCommunities || not canAccessStandAloneBookmarks || ((not DogearEnabled)&& (not addToActivities) && (not addToBlogs))) }">
			TabController.render(TabController.getElementsByClassName('A', 'tabcontrol')[1], dojo.byId('communitiesFields'),
												{container:dojo.byId('rteDivForCommunities'), id: 'editorWidgetForCommunities', height: '80px'}, 'communities', 'communityUuid');</c:when>
			<c:when test="${ActivitiesEnabled && (addToActivities||((not CommunitiesEnabled) && (not DogearEnabled) && (not addToBlogs))) }">
			TabController.render(TabController.getElementsByClassName('A', 'tabcontrol')[2], dojo.byId('activitiesFields'),
												{container:dojo.byId('rteDivForActivities'), id: 'editorWidgetForActivities', height: '80px'}, 'activities', 'activityUuid');</c:when>
			<c:when test="${BlogsEnabled && (addToBlogs || ((not ActivitiesEnabled) && (not CommunitiesEnabled) && (not DogearEnabled))) }">
			TabController.render(TabController.getElementsByClassName('A', 'tabcontrol')[3], dojo.byId('blogsFields'),
												{container:dojo.byId('rteDivForBlogs'), id: 'editorWidgetForBlogs', height: '80px'}, 'blogs', 'blogUuid');</c:when>
			</c:choose>
			<c:if test="${addToCommunities || addToActivities || addToBlogs}">
			TabController.Effect.fade(dojo.byId('lotusTabContainer'));
			var _tds = dojo.query("#lotusTabContainer td");
			if (_tds && _tds.length>0){TabController.Effect.fade(_tds[0]);}
			</c:if>
		});
		
		</script>
		
		<c:if test="${isCustomAuthenEnabled}"><script type="text/javascript" src="${customAuthenticationURL}"></script></c:if>

		<script language="javascript">
		dojo.addOnLoad(function(){
			var classNames = document.getElementsByTagName("body")[0].className.split(" ");
			for (var i in classNames) {
				if ("dijit_a11y"==classNames[i]) {
					document.getElementsByTagName("body")[0].className+=" lotusImagesOff";
				}
			}
			// For A11y
			if (!dojo.byId("IsNotAddToDogear")){
				dojo.byId("title").focus();
			}
		});
		
		function addtag(e, tagType, index){
			if (e) {
				var keyPressed = e.keyCode || e.which;
				if(e.type=="mousedown" || keyPressed===13 || keyPressed===32){
					var tagWidget = dijit.byId("ptags");
					var token = tagWidget.token;
					var inputTags = dojo.trim(dojo.byId("ptags").value).split(token);
					tagtext=unescape(window.util.tagrecs[tagType][index]);
					if (token != ' ') tagtext = " " + tagtext;
					inputTags.push(tagtext);
					dojo.byId("ptags").value = dojo.trim(inputTags.join(token));
				}
			}
		}
		</script>
	</body>
	<script language="javascript">
	function onCKEditorLoad() {
		CKEDITOR.config.toolbar=[
			['Bold','Italic','Underline','Strike','TextColor','NumberedList','BulletedList','BidiLtr','BidiRtl','Image','Link','Smiley']
		];
		rteEditor = CKEDITOR.replace(dojo.byId("rteDiv"), {<c:if test="${bidi}">contentsLangDirection : 'rtl'</c:if>});
	}
	window.onload = function(){
		setTimeout(function(){
				dojo.parser.parse('lotusFormFieldRow');
				if (dojo.isIE){
					dojo.connect(dijit.byId("ptags"), "_selectOption", dijit.byId("ptags"),  "_doSelect");
					dojo.connect(dijit.byId("ptags"), "_openResultList", function(){if(dojo.byId("ptags_dropdown"))dojo.style(dojo.byId("ptags_dropdown"), {left:dojo.coords(dijit.byId("ptags").domNode).x + "px", position: 'absolute', width: dojo.coords(dijit.byId("ptags").domNode).w + 'px'})});
					dojo.connect(dijit.byId("ptags"), "_openResultList", function(){if(dojo.byId("ptags_popup"))dojo.style(dojo.byId("ptags_popup"), {width: dojo.coords(dijit.byId("ptags").domNode).w + 'px'})});
				}
				if (useRTE)				 
					lconn.core.ckeditor.async(onCKEditorLoad);
			}, 50);
		};
	</script>
<script type="text/javascript">

require(['dojo/query', 'dojo/_base/window', 'dijit/Tooltip', 'dojo/ready', "dojo/request/notify", "ic-core/config/features", "dijit/registry"], function(query, win, Tooltip, ready, notify, has, registry){
    var timeOutId;
    ready(1200, function(){
    	if(has("common-tooltip")){
        var interval = setInterval(function() {

            query('*[title]').forEach(function(node, index, arr, ready){
            	if(!node.getAttribute("skipAutoTooltip")){
	                if(node.getAttribute("hastooltip")){
	                  var oldTooltip = registry.byId(node.getAttribute("hastooltip"));
	                  if(oldTooltip){
	                    oldTooltip.destroy();
	                  }
	                }
	                var tooltip = new Tooltip({
	                  connectId: [node],
	                  label: node.title,
	                  position: ["above", "below"]
	                });
	                node.setAttribute("hastooltip", tooltip.id);
            	}
            });
        },100);
        setTimeout(
            function( ) {
            clearInterval(interval);
                document.body.addEventListener('DOMNodeInserted', function(ev){
                  if (ev.target) {
                    if(ev.target.nodeType === 3){
                      return;
                    }
                    var widget;
                    try {
                        widget = registry.byNode(ev.target);
                    } catch (e) {
                      // ignoring. triggered by nodes which doesn't hold a widget
                    }
                    if (widget && dijit._MasterTooltip.prototype.isPrototypeOf(widget)) {
                      return;
                    }
                  }
                    if(timeOutId){
                      clearTimeout(timeOutId);
                    }
                    timeOutId = setTimeout(function(){
                      query('*[title]').forEach(function(node, index, arr, ready){
                    	  if(!node.getAttribute("skipAutoTooltip")){
							if(node.getAttribute("hastooltip")){
							  var oldTooltip = registry.byId(node.getAttribute("hastooltip"));
							  if(oldTooltip){
							    oldTooltip.destroy();
							  }
							}
							var tooltip = new Tooltip({
							  connectId: [node],
							  label: node.title,
							  position: ["above", "below"]
							});
							node.setAttribute("hastooltip", tooltip.id);
                    	  }
                      });
                    }, 500);
                }, true);
        }, 6000);
    	}
    });
});
</script>
</html>
