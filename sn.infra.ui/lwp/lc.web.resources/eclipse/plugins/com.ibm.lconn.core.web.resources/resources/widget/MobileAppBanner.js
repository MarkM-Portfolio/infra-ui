/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2014, 2020                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
/**
 * Decorates a smart app banner to invite users to evaluate and download the native mobile app for their platform.
 * See https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html
 * Only supported on iOS < 7 and Android devices.
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @class lconn.core.widget.MobileAppBanner
 */

dojo.provide("lconn.core.widget.MobileAppBanner");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.string");
dojo.require("lconn.core.locale");
dojo.require("lconn.core.util.PreferenceCache");
dojo.requireLocalization("lconn.core", "strings");

(function(cache) {

// Later versions of iOS support the smart app banner
var SMART_APP_BANNER_SUPPORTED_IOS_VERSION = 6,
   PREF_NAME = "mobileAppBanner";

/*
 * Returns true if the banner is not hidden via preference: if the preference
 * is not set, or the hidden attribute is false, or the next time to show is
 * earlier than current date
 */
function isHidden() {
   var pref = cache.get(PREF_NAME);
   return !(!pref || !pref.hidden || (pref.showNext <= new Date().getTime()));
}
/*
 * Returns true if we're on Android. Does browser sniffing
 */
function isAndroid() {
   var uAgent = dojo.isFunction(dojo.getObject('getUserAgent')) ? getUserAgent() : navigator.userAgent.toLowerCase(); 
   return uAgent.indexOf("android") > -1;   //&& uAgent.indexOf("mobile");
}
/*
 * Returns true if the banner is enabled
 */
function isEnabled() {
   // Disabling the banner until the following:
   //  - icons are old IBM icons
   //  - URL templates still showing IBM Connections vs HCL Connections
   //  - We should converge on a smart banner or this banner, not a mix
   //  - this routine should be honoring customer setting in LCC to enable/disable the mobile banner
   // Do not enable until all is resolved.  We have customers complaining about even having this feature enabled.
   //   return (dojo.isIos < SMART_APP_BANNER_SUPPORTED_IOS_VERSION
   //         || isAndroid()) && !isHidden();
   return false;
}

var IOS_APP_ATTR_NAME = "apple-itunes-app",
   ANDROID_APP_ATTR_NAME = "google-play-app",
   IOS_APP_ID = "450533489",
   ANDROID_APP_ID = "com.ibm.lotus.connections.mobile",
   IOS_ICON_URL_TEMPLATE = "http://a1.mzstatic.com/us/r30/Purple/v4/9b/2a/ad/9b2aadc2-34c8-c6af-142a-a5a3502f5503/mzl.mojupiyz.175x175-75.jpg",
   ANDROID_ICON_URL_TEMPLATE = "https://lh5.ggpht.com/TmIAKR3Y_0i895u5_NNUoKfZHA6uQ9aClhyQKkbyKeWetyh0ETyD7SscX6deEM3jdcY=w170-rw",
   IOS_URL_TEMPLATE = "https://itunes.apple.com/${lang}/app/id${app_id}",
   ANDROID_URL_TEMPLATE = "https://play.google.com/store/apps/details?id=${app_id}";

var app_id;

/*
 * Returns the mobile app id. Reads it from the <meta> header on the page. Falls back to a hardcoded value.
 * Note: this function assumes the platform doesn't change until the page is reloaded
 */
function getAppId() {
   var el = dojo.query("meta[name=" + (dojo.isIos ? IOS_APP_ATTR_NAME : ANDROID_APP_ATTR_NAME) + "]")[0];
   if (el) {
      var attr = el.getAttribute('content', 0).split(',');
      dojo.map(attr, function(val) {
         val = dojo.trim(val).split('=');
         if (val[0] === 'app-id')
            app_id = val[1];
      });
      if (app_id) {
         // Memoize
         getAppId = function() { return app_id; };
         return app_id;
      }
   }
   return dojo.isIOS ? IOS_APP_ID : ANDROID_APP_ID;
}

/*
 * Builds a URL to the app on the app store
 */
function buildUrl() {
   var urlTemplate = dojo.isIos ? IOS_URL_TEMPLATE : ANDROID_URL_TEMPLATE;
   return dojo.string.substitute(urlTemplate, {
      lang: lconn.core.locale.getCountry() || lconn.core.locale.getLanguage(),
      app_id: getAppId()
   });
}

/*
 * Builds a URL to the icon of the app
 */
function buildIconUrl() {
   return dojo.isIos ? IOS_ICON_URL_TEMPLATE : ANDROID_ICON_URL_TEMPLATE;
}

/*
 * Returns a node to attach the widget. The banner is normally attached as a
 * sibling of the div.lotusFrame, immediately before it.
 */
function getSrcNodeRef() {
   var lotusFrame = dojo.query(".lotusFrame")[0];
   if (!lotusFrame)
      throw "This widget requires a lotusFrame element on the page";
   return dojo.create('div', {}, lotusFrame, "before");
}

var nls = dojo.i18n.getLocalization("lconn.core", "strings");

dojo.declare("lconn.core.widget.MobileAppBanner", [ dijit._Widget, dijit._Templated ], /** @lends lconn.core.widget.MobileAppBanner.prototype */ {
   templatePath : dojo.moduleUrl("lconn.core", "widget/templates/MobileAppBanner.html"),
   postMixInProperties: function() {
      this.strings = this.strings || {
         onStore : dojo.isIos ? nls.rs_mobileBanner_inAppStore : nls.rs_mobileBanner_inGooglePlay,
         title : nls.rs_mobileBanner_title,
         author : nls.rs_mobileBanner_author,
         view : nls.rs_mobileBanner_view,
         open : nls.rs_mobileBanner_open,
         hide : nls.rs_mobileBanner_hide
      };
      this.cssClass = dojo.isIos ? "ios" : "android";
      this.url = buildUrl();
      this.iconUrl = buildIconUrl();
      if (!this.srcNodeRef)
         this.srcNodeRef = getSrcNodeRef();
   },
   buildRendering : function() {
      if (isEnabled())
         this.inherited(arguments);
   },
   /**
    * Hides the banner, and sets a time in the future when the banner must be
    * displayed again (6 months)
    */
   hide: function() {
      dojo.addClass(this.domNode, "lotusHidden");
      cache.set(PREF_NAME, {
         hidden : true,
         showNext : new Date().getTime() + 6 * 30 * 3600 * 1000
      });
   }
});

/**
 * Returns true if the banner is enabled, i.e. when we're on an iOS<7 or Android device.
 * @function isEnabled()
 * @memberOf lconn.core.widget.MobileAppBanner
 * @returns True if the banner is enabled
 */
lconn.core.widget.MobileAppBanner.isEnabled = isEnabled;

/**
 * Returns true if the banner is not hidden via preference: if the preference
 * is not set, or the hidden attribute is false, or the next time to show is
 * earlier than current date
 * @function isHidden()
 * @memberOf lconn.core.widget.MobileAppBanner
 * @returns True if the banner is hidden
 */
lconn.core.widget.MobileAppBanner.isHidden = isHidden;

/**
 * Unhides the mobile app banner. The widget will display next time it's instantiated 
 * @function unhide()
 * @memberOf lconn.core.widget.MobileAppBanner
 */
lconn.core.widget.MobileAppBanner.unhide = function() {
   cache.unset(PREF_NAME);
};

}(lconn.core.util.PreferenceCache));
