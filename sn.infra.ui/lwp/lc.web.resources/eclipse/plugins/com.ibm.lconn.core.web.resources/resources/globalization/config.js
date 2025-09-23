/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {

dojo.provide("lconn.core.globalization.config");
dojo.require("lconn.core.config.properties");

var _TEXT_DIRECTION = {
      DEFAULT: 'default',
      LEFT_TO_RIGHT: 'ltr',
      RIGHT_TO_LEFT: 'rtl',
      CONTEXTUAL: 'contextual'
   },
   _CALENDAR = {
      GREGORIAN: 'gregorian',
      HEBREW: 'hebrew',
      HIJRI: 'hijri'
   },
   _SETTINGS = {
      BIDI_ENABLED: 'bidiEnabled',
      TEXT_DIRECTION: 'textDirection',
      CALENDAR: 'calendar'
   },
   _DEFAULTS = {};
   _DEFAULTS[_SETTINGS.BIDI_ENABLED] = false;
   _DEFAULTS[_SETTINGS.TEXT_DIRECTION] = _TEXT_DIRECTION.DEFAULT;
   _DEFAULTS[_SETTINGS.CALENDAR] = _CALENDAR.GREGORIAN;

/**
 * Globalization configuration object
 * @namespace lconn.core.globalization.config
 */
dojo.mixin(lconn.core.globalization.config, /** @lends lconn.core.globalization.config */ {
   /**
    * Name of extended property controlling enablement of globalization settings
    * @const
    */
   SETTINGS_ENABLED_PROPERTY_NAME: "com.ibm.lconn.core.web.globalization.settings.enabled",
   /**
    * @const
    */
   TEXT_DIRECTION: _TEXT_DIRECTION,
   /**
    * @const
    */
   CALENDAR: _CALENDAR,
   /**
    * @const
    */
   SETTINGS: _SETTINGS,
   /**
    * Globalization support is enabled by default. To disable it, set the extended property
    * <code>com.ibm.lconn.core.web.globalization.settings.enabled</code> to false in
    * <code>LotusConnections-config.xml</code>.
    * @function
    */
   areSettingsEnabled: function() {
      return lconn.core.config.properties[this.SETTINGS_ENABLED_PROPERTY_NAME] !== false;
   },
   /**
    * Currently always set to false
    */
   languageEnabled: false,
   /**
    * @memberof lconn.core.globalization.config
    */
   defaults: _DEFAULTS
});

})();
