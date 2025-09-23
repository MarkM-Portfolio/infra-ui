<%--
 ***************************************************************** 
                                                                   
 IBM Confidential                                                  
                                                                   
 OCO Source Materials                                              
                                                                   
 Copyright IBM Corp. 2009, 2012                                    
                                                                   
 The source code for this program is not published or otherwise    
 divested of its trade secrets, irrespective of what has been      
 deposited with the U.S. Copyright Office.                         
                                                                   
 ***************************************************************** 

--%><%--
--%><%@ page contentType="text/html;charset=UTF-8" 
%><%@ page import="com.ibm.connections.directory.services.DSProviderFactory,
                     com.ibm.connections.directory.services.DSProvider,
                     com.ibm.connections.directory.services.data.DSObject,
                     com.ibm.lotus.connections.core.notify.impl.Notifications,
                     com.ibm.lconn.widgets.service.WidgetInfoService,
                     com.ibm.lconn.widgets.model.WidgetDefinition,
                     com.ibm.lconn.core.web.util.services.ServiceReferenceUtil,
                     com.ibm.lconn.core.versionstamp.VersionStamp,
                     com.ibm.lconn.widgets.model.InvalidRequestException,
                     com.ibm.json.java.JSONObject,
                     java.io.IOException,
                     java.net.URL,
                     java.util.Map,
                     java.util.HashMap"
%><%@ taglib prefix="lc-cache" uri="http://www.ibm.com/connections/core/cache" 
%><%@ taglib prefix="lc-ui" uri="http://www.ibm.com/lconn/tags/coreuiutil" 
%><%@ taglib prefix="lc-nav" uri="http://www.ibm.com/lconn/tags/corenav" 
%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" 
%><% 
DSProvider dsProvider = DSProviderFactory.INSTANCE.getProfileProvider();
DSObject dsObject = dsProvider.searchUserByExactLoginUserIdMatch(request.getRemoteUser());
if (dsObject != null) {
   pageContext.setAttribute("hasUsername", true);
   pageContext.setAttribute("username", dsObject.get_name());
   pageContext.setAttribute("userid", dsObject.get_id());
}

if (null == application.getAttribute("emailSettingsEnabled")) {
   application.setAttribute("emailSettingsEnabled", Notifications.isEmailNotificationEnabled());
}

String path = request.getPathInfo();
if (path != null) {
  String[] pathSegments = path.split("/");
  if (pathSegments.length >= 3) {
    String resourceType = pathSegments[1];
    String widgetId = pathSegments[2];
    try {
      WidgetInfoService.setResourceType(resourceType);
      WidgetDefinition wd = WidgetInfoService.getWidgetDefinition(widgetId);

      String widgetDefUrl = wd.getUrl();
      Map<String, String> map = new HashMap<String, String>();
      map.put("version", VersionStamp.INSTANCE.getVersionStamp());
      widgetDefUrl = ServiceReferenceUtil.replaceAllSvcRefsVariables(map, widgetDefUrl, request.isSecure());

      String widgetDefId = wd.getWidgetDefId();

      String widgetBundleRefId = wd.getBundleRefId();

      String widgetDefAttrs = request.getParameter("widgetAttrs");
      if (widgetDefAttrs != null) {
         JSONObject jsonObject = JSONObject.parse(widgetDefAttrs);
         widgetDefAttrs = jsonObject.toString();
      }
      
      pageContext.setAttribute("widgetDefAttrs", widgetDefAttrs);
      pageContext.setAttribute("widgetDefUrl", widgetDefUrl);
      pageContext.setAttribute("widgetDefId", widgetDefId);
      pageContext.setAttribute("widgetBundleRefId", widgetBundleRefId);
    }
    catch(Exception e) {
      response.sendError(response.SC_BAD_REQUEST);
    }
  }
}
else {
  response.sendError(response.SC_BAD_REQUEST);
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
   <lc-ui:stylesheets />
</head>
<body id="body" class="lotusui lotusui30dojo lotusui30 lotusui30_fonts lotusui30_body lotusui30_layout <lc-ui:languageClassname />">
   <div id="lotusFrame" class="lotusFrame _qkrInitial">
      <div id="lotusBanner" class="lotusBanner lotusHidden" role="banner">
         <lc-nav:header appname="common" user="${username}" userId="${userid}" help="help_app_replace" login="login_app_replace" logout="logout_app_replace" />
      </div>
      <div class="lotusTitleBar lotusHidden" id="lotusTitleBar"></div>

      <lc-ui:dojo include="lconn.core.WidgetLauncher" />
     
      <div id="lotusMain" class="lotusMain lotusHidden">
         <div id="lotusContent" class="lotusContent" role="main">
            <div id="widgetContainer"></div>
         </div>
      </div>
      
      <lc-ui:bundle basename="com.ibm.lconn.core.strings.templates" >
      <noscript>
         <style type="text/css">.lconnApplicationLoading {display: none;}</style>
         <div class="lotusErrorBox lotusError">
            <div class="lotusErrorContent">
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

      <div id="lotusFooter" class="lotusFooter lotusHidden" role="contentinfo">
         <lc-nav:footer appname="common" />
      </div>
   </body>

   <script type="text/javascript">
      dojo.require("lconn.core.WidgetLauncher");

      dojo.addOnLoad(function() {
         lconn.core.WidgetLauncher.start({
            widgetAttrs: <%= pageContext.getAttribute("widgetDefAttrs") %>,
            widgetDefUrl: '<%=pageContext.getAttribute("widgetDefUrl")%>',
            widgetDefId: '<%=pageContext.getAttribute("widgetDefId")%>',
            bundleRefId: '<%=pageContext.getAttribute("widgetBundleRefId")%>'
          }, dojo.byId("widgetContainer"));
      });
   </script>

</html>