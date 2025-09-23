<%@ page session="false" contentType="text/html; charset=UTF-8" buffer="48kb" %>
<%--wscExemptBegin--%>
<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- IBM Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright IBM Corp. 2006, 2016                                    --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>
<%--wscExemptEnd--%>
<%@ taglib prefix="c" 			uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" 			uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 		uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="bidi"		uri="http://www.ibm.com/lconn/tags/bidiutil" %>
<%@ taglib prefix="lc-ui"    uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<lc-ui:setupErrorPage />
<%@ page import="org.apache.commons.lang.StringEscapeUtils,
					com.ibm.lconn.bookmarklet.acf.ActiveContentFilter,
					com.ibm.lconn.core.web.util.services.ServiceReferenceUtil" %>
<%@ page isErrorPage="true" contentType="text/html; charset=UTF-8" %>

<!DOCTYPE html SYSTEM "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<title><c:choose><c:when test="${servletPath == '/postFeed'}"><fmt:message key="jsp.feed.posting.title" /></c:when><c:otherwise><fmt:message key="jsp.posting.title" /></c:otherwise></c:choose></title>
		<%@ include file="../cnx8ui.jsp" %>
		<bidi:direction />
		<lc-ui:stylesheets />
 		<script language="javascript">
 			var djLocale = "${locale}".replace('_','-').toLowerCase();
 			if (djLocale == 'iw') djLocale = 'he';
 			if (djLocale == "pt") djLocale = "pt-pt";
 			var djConfig = {
 				parseOnLoad: false,
 				locale: djLocale,
 				baseUrl: "${pageContext.request.contextPath}/static/dojo_1.4/<%=com.ibm.lconn.core.versionstamp.VersionStamp.INSTANCE.getVersionStamp()%>/dojo/"
 			}
 			var cPath = "${pageContext.request.contextPath}";
 		</script>

		<script language="javascript" src="${pageContext.request.contextPath}/static/dojo_1.4/<%=com.ibm.lconn.core.versionstamp.VersionStamp.INSTANCE.getVersionStamp()%>/dojo/dojo.js"></script>
		<script language="javascript" src="${pageContext.request.contextPath}/static/dojo_1.4/<%=com.ibm.lconn.core.versionstamp.VersionStamp.INSTANCE.getVersionStamp()%>/lconn/dogearcore.js"></script>
 		
	</head>
	<fmt:message key="jsp.bookmark.duplicate" var="duplicateMsg"/>
	<lc-ui:bundle basename="com.ibm.lconn.core.strings.templates" useServiceName="true">
	
	<c:choose>
		<c:when test="${servletPath == '/postFeed'}">
			<c:set var="defaultAction" value="${pageContext.request.contextPath}/postFeed" />
		</c:when>
		<c:otherwise>
			<c:set var="defaultAction" value="${pageContext.request.contextPath}/post" />
		</c:otherwise>
	</c:choose>
	<fmt:message var="defaultActionText" key="error.back" scope="page" />

	<body class="lotusui lotusui30_body lotusui30_fonts lotusui30 oneui30 <lc-ui:languageClassname />" onload="window.loadTime = new Date();">
	<div role="main">
		<form action="<c:choose><c:when test="${servletPath == '/postFeed'}"><c:url value="/postFeed" /></c:when><c:otherwise><c:url value="/post" /></c:otherwise></c:choose>" accept-charset="UTF-8" method="POST">
			
			<input type="hidden" name="title" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("title"))) %>" />	
			<input type="hidden" name="url" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("url"))) %>" />
			<input type="hidden" name="verbiage" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("verbiage"))) %>" />
			<input type="hidden" name="tags" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("tags"))) %>" />
			<% 
			 String individual = request.getParameter("IndividualService");
			 if (!"".equals(individual) && individual != null){
				 if (ServiceReferenceUtil.Service.BLOGS.equals(individual)){
				 	%>
				 	<input type="hidden" name="addToBlogs" value="true" />
				 	<%
				 }
				 if (ServiceReferenceUtil.Service.COMMUNITIES.equals(individual)){
				 	%>
				 	<input type="hidden" name="addToCommunities" value="true" />
				 	<%
				 }
				 if (ServiceReferenceUtil.Service.ACTIVITIES.equals(individual)){
				 	%>
				 	<input type="hidden" name="addToActivities" value="true" />
				 	<%
				 }
			 }
			 String showDogearOnly = StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("showDogearOnly")));
			 if(!"".equals(showDogearOnly) && showDogearOnly != null){
				 request.setAttribute("showDogearOnly", showDogearOnly);
				 %>
				 <input type="hidden" name="showDogearOnly" value="<c:out value='${showDogearOnly}' />" />
				 <%
			 }
			%>
		</form>
		
		
		
		<div id="lotusFrame" class="lotusui30_layout" style="">
    <div class="lotusErrorBox lotusError">
      <div class="lotusErrorContent">
        <img class="iconsMessages48 iconsMessages48-msgError48" src="<lc-ui:blankGif />" alt="error"/>
        <div class="lotusErrorForm">
        
        
          <h1><fmt:message key="error.title" /></h1>
          <p><c:choose><c:when test="${duplicateBookmark}">${duplicateMsg}</c:when>
						<c:otherwise>
						<fmt:message key="error.message" /></c:otherwise></c:choose></p>
          
                  
         
          <c:choose>
            <c:when test="${not empty errorActions}">
              <div class="lotusBtnContainer">
                <c:forEach var="action" items="${errorActions}" >            
                  <span class="lotusBtn lotusBtnAction"><a href="<c:out value="${action[0]}"/>"><c:out value="${action[1]}" /></a></span>
                </c:forEach>
                <c:if test="${not empty defaultAction}">
                   <span class="lotusBtn lotusBtnAction"><a href="<c:out value="${defaultAction}"/>"><c:out value="${defaultActionText}" /></a></span>
                </c:if>
              </div>
            </c:when>
            <c:when test="${not empty defaultAction}">
              <div class="lotusBtnContainer">
                <span class="lotusBtn lotusBtnAction"><a href="javascript:;" onclick="javascript:document.forms[0].submit();"><c:out value="${defaultActionText}" /></a></span>
              </div>
            </c:when>
          </c:choose>
        
          <%--  
          This section is used to output error information in the event a serious problem occurs.  The information in this section is shown to the
          user so that they can copy and paste the error to an administrator.  
          --%>
          <c:if test="${not empty exception}">
            <div class="lotusBtnContainer">
              <a href="javascript:;" onclick="showErrorDetails(this);">
                 <fmt:message key="error.details" />
              </a>
            </div>
            <p id="lconnErrorDetails" style="display:none;" class="lotusErrorDetails">
              <label for="lconnErrorText"><fmt:message key="error.details.info" /></label>
              <textarea id="lconnErrorText" readonly="readonly" class="lotusText" wrap="off">
              <c:if test="${exception != null}">
							<% 
								java.lang.Throwable temp = (Throwable) request.getAttribute("exception");
								if (temp instanceof java.lang.reflect.InvocationTargetException) {
									temp =  temp.getCause();
									request.setAttribute("exception", temp);
								}
							%>
							<c:out value="${exception}"/> at approximately <%= new java.util.Date().toString() %><br/>
									<%-- RTC 171365 - security risk: should not show stack trace
					        <c:forEach var="e" items="${exception.stackTrace}">
					         	<c:out value="${e}"/><br/>
				        	</c:forEach>
									--%>
					     </c:if>
              </textarea>
            </p>
            <script type="text/javascript">
               function showErrorDetails(self) {
                  var details = document.getElementById('lconnErrorDetails');
                  var input = document.getElementById('lconnErrorText'); 
         
                  
                  self.parentNode.style.display='none';
                  details.style.display=''; 
                  input.focus(); 
                  input.select();     
               }
            </script>
          </c:if>
        </div>
      </div>
    </div>
  </div>
  </div>
	</body>
	</lc-ui:bundle>
</html>
