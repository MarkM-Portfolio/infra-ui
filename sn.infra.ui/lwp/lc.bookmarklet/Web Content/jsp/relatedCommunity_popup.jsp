<%@ page session="false" contentType="text/html; charset=UTF-8" buffer="48kb" %>
<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- IBM Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright IBM Corp. 2012, 2015                                    --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>


<%@ taglib prefix="c" 			uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" 			uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="bidi"		uri="http://www.ibm.com/lconn/tags/bidiutil" %>
<%@ taglib prefix="hu" 			uri="http://www.ibm.com/bookmarklet/tags/htmlutil" %>
<%@ taglib prefix="jscript"		uri="http://www.ibm.com/dogear/tags/jscript" %>
<%@ taglib prefix="coreui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" %>
<%@ page import="org.apache.commons.lang.StringEscapeUtils" %>
<%@ page import="com.ibm.lconn.bookmarklet.acf.ActiveContentFilter" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		  
<%-- checkVersion should be set true, if version check is needed. --%>
<c:set var="checkVersion" value="%{'false'}" /> 
<c:set var="appName" value="bookmarklet" />
		  
<html xmlns="http://www.w3.org/1999/xhtml" lang="<%= request.getLocale()%>">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<title><fmt:message key="jsp.feed.relatedCommunity.posting.title" /></title>
		<%@ include file="../cnx8ui.jsp" %>
		<link rel="shortcut icon" href="<lc-cache:uri template="{webResourcesRoot}/web/com.ibm.oneui3.styles/imageLibrary/Branding/Other/ConnectionsBlue16.ico" />" type="image/x-icon">
	    <bidi:direction />
		<lc-ui:stylesheets />
	</head>
	<body class="lotusui lotusui30_body lotusui30_fonts lotusui30 oneui30 <c:if test="${language == 'ja'}">lotusJapanese</c:if>" <c:if test="${bidi}">dir="rtl"</c:if>>
		<coreui:dojo include="lconn.bookmarklet.app">
			djConfig.parseEnabled = false;			
		</coreui:dojo>
		<jsp:include page="/nav/templates/dialogHeader.jsp" />
		<form role="application" accept-charset="UTF-8" id="communityForm" class="lotusForm" method="post" action="<c:url value="/relatedCommunity/post" />" onsubmit="return RCController.validateInputs();" aria-labelledby="pageTitleField">
 			<fieldset style="border:0;">
 			<legend class="lotusHidden"><fmt:message key="jsp.relatedCommunity.legend.communityInformation" /></legend>
 			<input type="hidden" name="uuid" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("uuid"))) %>" />
 			<input type="hidden" name="baseUrl" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("baseUrl"))) %>" />
 			<input type="hidden" name="type" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("type"))) %>" />
 			
			<table class="lotusFormTable" cellpadding="5" cellspacing="0" border="0" summary="" role="presentation">
				<tbody>
				    <tr>
				        <td width="90%" colspan="3">
				            <h1 class="lotusBorderBottom" id="pageTitleField"><fmt:message key="jsp.feed.relatedCommunity.posting.title" /></h1>
				        </td>
				    </tr>
				    <c:if test="${checkVersion=='true'}" >
				    <tr>
				        <td width="5%"></td>
				        <td width="90%">
							<script>
								var commUrl = "";
								if(location.href.indexOf("https")!=-1){
									commUrl = lconn.core.config.services.communities.secureUrl;
								}else{
									commUrl = lconn.core.config.services.communities.url;
								}
							</script>
							<div id="messageInfo" class="lotusMessage2 lotusWarning" role="alert">
								<img class="lotusIcon lotusIconMsgWarning" src="<lc-ui:blankGif />" alt="<fmt:message key="jsp.warning"/>"/>
								<span class="lotusAltText"><fmt:message key="jsp.warningColon"/></span>
								<div class="lotusMessageBody">									
									<fmt:message key="jsp.warning.version.confict2">
										<fmt:param>
											<fmt:message key="jsp.relatedCommunity.title" />
										</fmt:param>
										<fmt:param>
											<a href="javascirpt:;" onclick="window.open(commUrl+'/service/html/tools');return false;"><fmt:message key="jsp.warning.version.here"/></a>
										</fmt:param>
									</fmt:message>
								</div>
								<a class='lotusDelete' title='<fmt:message key='jsp.posting.message.close'/>' role='button' href='javascript:;' onclick="dojo.byId('messageInfo').style.display='none';">
									<img src='<lc-ui:blankGif />' alt='<fmt:message key='jsp.posting.message.close'/>' />
									<span class="lotusAltText">X</span>
								</a>
							</div>
				        </td>
				        <td width="5%"></td>
				    </tr>
				    </c:if>
				    
				    <tr>
				        <td width="5%"></td>
				        <td width="90%">
				            <div><fmt:message key="jsp.feed.relatedCommunity.posting.description" /></div>
				            <div id="messageNode" role="alert" class="lotusMessage2 lotusInfo" style="display:none">
						        <img alt="<fmt:message key="jsp.information"/>" class="lotusIcon lotusIconMsgInfo" src="<lc-ui:blankGif />">
						        <span class="lotusAltText"><fmt:message key="jsp.informationColon"/></span>
						        <div id="messageText" class="lotusMessageBody"></div>
						        <a class='lotusDelete' title='<fmt:message key='jsp.posting.message.close'/>' role='button' href='javascript:;' onclick="dojo.byId('messageNode').style.display='none';">
						        	<img src='<lc-ui:blankGif />' alt='<fmt:message key='jsp.posting.message.close'/>' />
						        	<span class="lotusAltText">X</span>
						        </a>
						    </div>
				        </td>
				        <td width="5%"></td>
				    </tr>
				    
					<tr>
						<td width="5%"></td>
						<td width="90%" class="lotusFormFieldRow">
						    <div><label for="nameField"><span class="lotusFormRequired" title="<fmt:message key="jsp.common.requireField"/>">*</span><fmt:message key = "jsp.helpapi.bookmark.prop.title" /></label></div>
						    <script>
							var _name = "<jscript:stringescape>${name}</jscript:stringescape>";
							_name = _name.replace(/\"/g, "&quot;");
							document.write('<input aria-required="true" class="lotusText" type="text" value="'+_name+'" id="nameField" name="name" />');
							</script>	
						</td>
						<td width="5%"></td>
					</tr>
					<tr>
						<td width="5%"></td>
						<td width="90%" class="lotusFormFieldRow">
						    <div>
						    <label for="urlField"><span class="lotusFormRequired" title="<fmt:message key="jsp.common.requireField"/>">*</span><fmt:message key = "jsp.helpapi.bookmark.prop.url" /></label>
						    </div>
						    <script language="javascript">
							var _url = "<jscript:stringescape>${communityUrl}</jscript:stringescape>";
							_url = _url.replace(/\"/g, "&quot;");
							document.write('<textarea name="communityUrl" aria-required="true" id="urlField" class="lotusText lotusLTR <c:if test="${bidi}">lotusAlignLeft</c:if>" rows="2" style="overflow: auto;">'+_url+'</textarea>');
							</script>	
						</td>
						<td width="5%"></td>
					</tr>
					<tr>
						<td width="5%"></td>
						<td width="90%" class="lotusFormFieldRow">
						    <div>
						    <label for="descField"><fmt:message key = "jsp.helpapi.bookmark.prop.relatedCommunityDesc" /></label>
						    </div>
						    <script language="javascript">
							var _description = "<jscript:stringescape>${description}</jscript:stringescape>";
							_description = _description.replace(/\"/g, "&quot;");
							document.write('<textarea id="descField" name="description" style="widht:98%;" rows="4" class="lotusText">'+_description+'</textarea>');
							</script>	
						</td>
						<td width="5%"></td>
					</tr>					
					<tr>
						<td width="5%"></td>
						<td width="90%" class="lotusFormFieldRow">
						    <img id="communitiesProcessing" title="processing" alt="processing" src="<c:url value="/images/progressIndicator.gif" />"/>
							<label style="display:none" id="nocommunitiesLabel" role="alert" tabindex="0"><fmt:message key="jspf.communities.nocommunities" /></label>
							<div style="display:none" id="communitiesSelectField">
								<label for="communityUuid"><span class="lotusFormRequired" title="<fmt:message key="jsp.common.requireField"/>">*</span><fmt:message key="jspf.relatedCommunities.select.tip" /></label>
								<br />							
								<select style="height:60px;" class="lotusText" id="communityUuid" size="3" multiple="true" name="communityUuid" aria-required="true">
								</select>
								<br />
								<a href="#" role="button" onclick="javascript: RCController.resetSelectedItems(); return false;"><fmt:message key="jspf.communities.clear" /></a>
						    </div>	
						</td>
						<td width="5%"></td>
					</tr>
					
					<tr>
						<td width="5%"></td>
						<td width="90%" class="lotusFormFieldRow">
						    <div class="lotusFormField lotusMeta" title="<fmt:message key="jsp.common.legend"/>"><fmt:message key="jsp.common.required"/></div>
						</td>
						<td width="5%"></td>
					</tr>
					
					<tr>
					    <td width="5%"></td>
						<td class="lotusAlignRight">
						    <input type="submit" id="submitBtn" accesskey="S" value="<fmt:message key = "jsp.posting.save" />" class="lotusFormButton" />
							<input type="button" id="cancelBtn" accesskey="C" onclick="javascript:window.close(); return false;" value="<fmt:message key = "jsp.posting.cancel.title" />" class="lotusFormButton" />
						</td>
						<td width="5%"></td>
					</tr>					
				</tbody>
			</table>
			</fieldset>
		</form>		
		<script type="text/javascript">
		//dojo.require("com.ibm.ajax.auth");
		dojo.addOnLoad(function() {
			//change html's lang attribute
			dojo.attr(dojo.query("html")[0],"lang",djConfig.locale);
			
			var ciaa = com.ibm.ajax.auth;
			ciaa.interceptDojoXhr(function(){return true;});
			ciaa.setAuthenticationHandler(function(response, ioArgs, onauthenticated){
				location.reload();
			});
			
			var args = {
			cPath: '${pageContext.request.contextPath}',
			hasCommunity: '${hasCommunity}',
			isPrivate: '${isPrivate}',
			communityServiceUrl: '<c:url value="/service/proxy?service=ownerCommunities" />'
			};
			RCController.init(args);
		});
		</script>
	</body>
</html>
