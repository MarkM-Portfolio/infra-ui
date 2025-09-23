/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.enabler.services.ConfigService");

dojo.require("com.ibm.mm.enabler.debug");

dojo.declare("com.ibm.mm.enabler.services.ConfigService", null, {
   PROXY_URL : "com.ibm.mashups.proxy.url",

   HUB_URL : "com.ibm.mashups.hub.url",

   CONTEXT_ROOT_MAIN : "com.ibm.mashups.contextroot",
   CONTEXT_ROOT_THEME_TEMP : "com.ibm.mashups.contextroot.theme.temp",
   CONTEXT_ROOT_BUILDER : "com.ibm.mashups.contextroot.builder",
   CONTEXT_ROOT_ENABLER : "com.ibm.mashups.contextroot.enabler",

   CONTENTHANDLER_PUBLIC : "com.ibm.mashups.contenthandler.public",
   CONTENTHANDLER_PRIVATE : "com.ibm.mashups.contenthandler.private",

   THEMES_FEEDS_EXPIRATION : "themes.feed.expiration",

   AVAILABLE_LOCALES : "available.locales",
   TUNNEL_MODE : "tunnel.mode",

   CLIENT_IS_DEBUG : "isDebug",

   CLIENT_ALLOW_PUBLISH_LOGGING : "allowPublishLogging",
   CLIENT_ALLOW_PUBLISH_TRACING : "allowPublishTracing",
   CLIENT_LOAD_SERVICES : "loadServices",
   CLIENT_POPUP_CONSOLE : "popupConsole",

   CLIENT_DEFAULT_THEME_ID : "com.ibm.mashups.theme.defaultThemeId",
   CLIENT_PAGE_SOURCE_READ_ONLY : "pageSourceReadOnly",
   CLIENT_AUTO_ACCEPT_SHARED_GROUPNAME : "autoAcceptSharedGroupName",
   CLIENT_USER_ID_KEY : "userIdKey",
   CLIENT_GROUP_CN_KEY : "groupCNKey",

   /**
    * @deprecated
    */
   getPreferenceValue : function( /* string */name) {
      return this.getValue(name);
   },

   getValue : function( /* string */name) {
      // summary: type here the summary
      // description: type here the description
      // name: a constant defined in this class

      com.ibm.mm.enabler.debug.entry("ConfigService.getValue", name);

      var value = (dojo.getObject("ibmConfig")||{})[name];

      com.ibm.mm.enabler.debug.exit("ConfigService.getValue", value);
      return value;
   }
});

com.ibm.mm.enabler.services.CONFIG_SERVICE = new com.ibm.mm.enabler.services.ConfigService();
