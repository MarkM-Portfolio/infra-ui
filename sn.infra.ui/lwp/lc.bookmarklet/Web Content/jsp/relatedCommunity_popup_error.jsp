<%@ page session="false" contentType="text/html; charset=UTF-8" buffer="48kb" %>
<%--wscExemptBegin--%>
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
<%--wscExemptEnd--%>
<%@ taglib prefix="c"			uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"			uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt"			uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="bidi"		uri="http://www.ibm.com/lconn/tags/bidiutil" %>
<%@ taglib prefix="lc-ui"		uri="http://www.ibm.com/lconn/tags/coreuiutil" %>
<lc-ui:setupErrorPage />
<%@ page import="org.apache.commons.lang.StringEscapeUtils" %>
<%@ page import="com.ibm.lconn.bookmarklet.acf.ActiveContentFilter" %>
<%@ page isErrorPage="true" contentType="text/html; charset=UTF-8" %>

<c:set var="appName" value="bookmarklet" />

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
		<lc-ui:dojo include="lconn.bookmarklet.app">
			djConfig.parseEnabled = false;
		</lc-ui:dojo>
		
	</head>
	
	<lc-ui:bundle basename="com.ibm.lconn.core.strings.templates" useServiceName="true">
	<fmt:message var="defaultActionText" key="error.back" scope="page" />
	<fmt:message var="defaultErrorMessage" key="error.message" scope="page" />
	<fmt:message var="defaultErrorTitle" key="error.title" scope="page"/>
	<fmt:message var="defaultErrorDetails" key="error.details" scope="page"/>
	<fmt:message var="defaultErrorInfo" key="error.details.info" scope="page"/>
	</lc-ui:bundle>
	
	<body class="lotusui lotusui30_body lotusui30_fonts lotusui30 oneui30 <lc-ui:languageClassname />" onload="window.loadTime = new Date();">
		<jsp:include page="/nav/templates/dialogHeader.jsp" />
		<form action="<c:url value="/relatedCommunity/post" />" accept-charset="UTF-8" method="GET">
			<input type="hidden" name="uuid" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("uuid"))) %>" />
 			<input type="hidden" name="baseUrl" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("baseUrl"))) %>" />
 			<input type="hidden" name="type" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("type"))) %>" />
			<input type="hidden" name="name" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("name"))) %>" />	
			<input type="hidden" name="description" value="<%=StringEscapeUtils.escapeHtml(ActiveContentFilter.INSTANCE.filterContent(request.getParameter("description"))) %>" />
		</form>		
		
		<div id="lotusFrame" class="lotusui30_layout" style="">
            <div class="lotusErrorBox lotusError">
              <div class="lotusErrorContent" role="main">
                <img class="iconsMessages48 iconsMessages48-msgError48" src="<lc-ui:blankGif />" alt="<fmt:message key="jsp.discussThis.error"/>"/>
                <div class="lotusErrorForm">        
                  <h1><c:out value="${defaultErrorTitle}"/></h1>
                  <fmt:message key="jsp.relatedCommunity.error.property.community" var="communityStr"/>
                  <p><c:choose>
                        <c:when test="${not empty disabledCommunities or not empty errorCommunities}">
                            <c:if test="${not empty disabledCommunities}">
                                <c:set var="param1" value=""/><c:set var="param2" value=""/>
                                <c:forEach var="item" items="${disabledCommunities}" varStatus="status">
                                    <c:if test="${not status.last}">
                                        <c:if test="${status.first}"><c:set var="param1" value="${item} ${communityStr}"/></c:if>
                                        <c:if test="${not status.first}"><c:set var="param1" value="${param1}, ${item} ${communityStr}"/></c:if>
                                    </c:if>
                                    <c:if test="${status.last}">
                                        <c:set var="param2" value="${item} ${communityStr}"/>
                                    </c:if>                                    
                                </c:forEach>
                                <c:if test="${empty param1}">
                                    <fmt:message key="jsp.relatedCommunity.error.addDuplicated">
                                        <fmt:param value="${param2}"/>
                                    </fmt:message>
                                </c:if>
                                <c:if test="${not empty param1}">
                                    <fmt:message key="jsp.relatedCommunity.error.addDuplicateds">
                                        <fmt:param value="${param1}"/><fmt:param value="${param2}"/>
                                    </fmt:message>
                                </c:if>
                            </c:if>
                            <c:if test="${not empty errorCommunities}">     
                                <c:set var="param1" value=""/><c:set var="param2" value=""/>
                                <c:forEach var="item" items="${errorCommunities}" varStatus="status">
                                    <c:if test="${not status.last}">
                                        <c:if test="${status.first}"><c:set var="param1" value="${item} ${communityStr}"/></c:if>
                                        <c:if test="${not status.first}"><c:set var="param1" value="${param1}, ${item} ${communityStr}"/></c:if>
                                    </c:if>
                                    <c:if test="${status.last}">
                                        <c:set var="param2" value="${item} ${communityStr}"/>
                                    </c:if>                                    
                                </c:forEach>
                                <c:if test="${empty param1}">
                                    <fmt:message key="jsp.relatedCommunity.error.serverError">
                                        <fmt:param value="${param2}"/>
                                    </fmt:message>
                                </c:if>
                                <c:if test="${not empty param1}">
                                    <fmt:message key="jsp.relatedCommunity.error.serverErrors">
                                        <fmt:param value="${param1}"/><fmt:param value="${param2}"/>
                                    </fmt:message>
                                </c:if>                  
                            </c:if>
                        </c:when>
				        <c:otherwise>
				            <c:out value="${defaultErrorMessage}"/>
				        </c:otherwise>
				     </c:choose>
				  </p>
                  <div class="lotusBtnContainer">
                    <span class="lotusBtn lotusBtnAction"><a href="javascript:;" onclick="javascript:document.forms[0].submit();" role="button"><c:out value="${defaultActionText}" /></a></span>
                  </div>
           
        
		          <%--  
		          This section is used to output error information in the event a serious problem occurs.  The information in this section is shown to the
		          user so that they can copy and paste the error to an administrator.  
		          --%>
		          <c:if test="${not empty exception}">
		            <div class="lotusBtnContainer">
		              <a href="javascript:;" onclick="showErrorDetails(this);" role="button">
		                 <c:out value="${defaultErrorDetails}"/>
		              </a>
		            </div>
		            <p id="lconnErrorDetails" style="display:none;" class="lotusErrorDetails">
		              <label for="lconnErrorText"><c:out value="${defaultErrorInfo}"/></label>
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
						        <c:forEach var="e" items="${exception.stackTrace}">
						         	<c:out value="${e}"/><br/>
					        	</c:forEach>
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
	    </body>
</html>
