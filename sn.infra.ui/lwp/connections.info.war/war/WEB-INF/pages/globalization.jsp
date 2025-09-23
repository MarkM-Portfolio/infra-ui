<%-- Copyright IBM Corp. 2011, 2014  All Rights Reserved. --%><%-- 

    This page shows Globalization preferences

=== DO NOT CHANGE ===
--%><%@ page contentType="text/html;charset=UTF-8" %><%--
--%><%@ page import="com.ibm.connections.directory.services.DSProviderFactory,
                     com.ibm.connections.directory.services.DSProvider,
                     com.ibm.connections.directory.services.data.DSObject,
                     com.ibm.lotus.connections.core.notify.impl.Notifications"%><%--
--%><%@ taglib prefix="c"        uri="http://java.sun.com/jsp/jstl/core" %><%--
--%><%@ taglib prefix="fn"       uri="http://java.sun.com/jsp/jstl/functions" %><%--
--%><%@ taglib prefix="fmt"      uri="http://java.sun.com/jsp/jstl/fmt" %><%--
--%><%@ taglib prefix="bidi"     uri="http://www.ibm.com/lconn/tags/bidiutil" %><%--
--%><%@ taglib prefix="lc-ui"    uri="http://www.ibm.com/lconn/tags/coreuiutil" %><%--
--%><%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" %><%--
--%><%@ taglib prefix="lc-nav"   uri="http://www.ibm.com/lconn/tags/corenav" %><%--
--%><lc-ui:serviceLink serviceName="webresources" var="urlWebResources" /><%--
--%><%--
=== DO NOT CHANGE ===

--%><%

Boolean emailSettingsEnabled = (Boolean)application.getAttribute("emailSettingsEnabled");
if (null == emailSettingsEnabled) {
   emailSettingsEnabled = Notifications.isEmailNotificationEnabled();
   application.setAttribute("emailSettingsEnabled", emailSettingsEnabled);
}

DSProvider dsProvider = DSProviderFactory.INSTANCE.getProfileProvider();
DSObject dsObject = dsProvider.searchUserByExactLoginUserIdMatch(request.getRemoteUser());
if (dsObject != null) {
   pageContext.setAttribute("hasUsername", true);
   pageContext.setAttribute("username", dsObject.get_name());
   pageContext.setAttribute("userid", dsObject.get_id());
   pageContext.setAttribute("isExternal", dsObject.is_user_external());
   if (emailSettingsEnabled)
      pageContext.setAttribute("email", dsObject.get_email());
}

response.setHeader("Cache-Control", "private,no-cache=\"set-cookie,set-cookie2\",no-store,s-maxage=0,must-revalidate,max-age=0");

%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html <lc-ui:htmlLanguage />>
<lc-ui:bundle basename="com.ibm.lconn.core.strings.globalization">
<head>
   <meta http-equiv="content-type" content="text/html;charset=UTF-8">
   <meta http-equiv="pragma" content="no-cache">
   <meta http-equiv="cache-control" content="no-cache">

   <title><fmt:message key="globalization.windowtitle" /></title>

   <lc-ui:stylesheets />
   <lc-ui:favicon />

   <script type="text/javascript">
      // TODO: check at application startup
      // javascript to check for high contrast/images off mode, and add body.lotusImagesOff if necessary
      function checkHighContrast() {
      //create test case element
      var vTestHC = document.createElement("div");
      vTestHC.style.border          = '1px solid';
      vTestHC.style.borderColor     = 'red green';
      vTestHC.style.position        = 'absolute';
      vTestHC.style.height          = '5px';
      vTestHC.style.top             = '-999px';

      vTestHC.style.backgroundImage = 'url(<lc-ui:blankGif />)';

      document.body.appendChild(vTestHC);
      
      //do the tests
      var vStyle = null;
      try{
         vStyle = document.defaultView.getComputedStyle(vTestHC, "");
      }catch(e){
         vStyle = vTestHC.currentStyle;
      }
      if (vStyle) {
         var vTestImg = vStyle.backgroundImage;
         if ((vStyle.borderTopColor==vStyle.borderRightColor) || (vTestImg != null && (vTestImg == "none" || vTestImg == "url(invalid-url:)" ))){
            document.getElementsByTagName("body")[0].className+=" lotusImagesOff";
         }
      }
      }
   </script>
</head>
</lc-ui:bundle>
<body class="lotusui lotusui30dojo lotusui30_body lotusui30_fonts lotusui30 <lc-ui:languageClassname />">
   <%-- The initial lotusFrame element will be hidden (and its ID and class removed) after the first scene loads.  Any content that should be
        visible must be placed inside the lotusBanner or lotusFooter sections or outside of the lotusFrame   
    --%>
   <div id="lotusFrame" class="lotusFrame lotusui30_layout">
      <div id="lotusBanner" class="lotusBanner lotusHidden" role="banner">
         <lc-nav:header appname="deploymentConfig" user="${username}" userId="${userid}" help="help_app_replace" login="login_app_replace" logout="logout_app_replace" />
      </div>
<lc-ui:bundle basename="com.ibm.lconn.core.strings.templates">
      <noscript>
         <style type="text/css">.lconnApplicationLoading {display: none;}</style>
         <div class="lotusErrorBox lotusError">
            <div class="lotusErrorContent" role="main">
               <img class="iconsMessages48 iconsMessages48-msgError48" src="<lc-ui:blankGif />" alt="">
               <div class="lotusErrorForm">
                  <h1><fmt:message key="javascript.disabled.title" /></h1>
                  <p><fmt:message key="javascript.disabled.0" /></p>
                  <p><fmt:message key="javascript.disabled.1" /></p>
               </div>
            </div>
         </div>
      </noscript>
      <div id="lconnApplicationLoading" class="lconnApplicationLoading"><fmt:message key="label.app.loading" /></div>
</lc-ui:bundle>
   <script type="text/javascript">
      var icUser = {
        id: "<lc-ui:escapeJavaScript value="${userid}"/>",
        displayName: "<lc-ui:escapeJavaScript value="${username}"/>",
<c:if test="${emailSettingsEnabled}">
        email: "<lc-ui:escapeJavaScript value="${email}"/>",
</c:if>
        isExternal: <lc-ui:escapeJavaScript value="${isExternal}"/>
      };
      document.getElementById("lotusFrame").style.display = "";
   </script>

   <%--lc-cache:script template="{staticLanguageRoot}/js/lconn/oauth/config.js" /--%>
   <lc-ui:dojo include="net.jazz.ajax.xdloader,ic-core.globalization.preferencesApp" />
   <div id="lotusFooter" class="lotusFooter lotusHidden" role="contentinfo">
      <lc-nav:footer appname="deploymentConfig" admin="${isAdmin}" />
   </div>
</body>
</html>
