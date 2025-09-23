/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2020                         */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

/**
 * CKEditor dynamic loader for Connections applications
 * <p>
 * This helper exposes convenient methods to load CKEditor in a static or
 * dynamic way, add extra plugins or custom Connections plugins.
 *
 * @namespace ic-ui.ckeditor.dynamic
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
        "dojo",
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/_base/config",
        "dojo/_base/kernel",
        "dojo/query",
        "dojo/when",
        "dojo/Deferred",
        "ic-core/url",
        "ic-core/help",
        "ic-core/locale",
        "ic-core/config/services",
        "ic-core/theme",
        "ic-ui/ckeditor/editor/dojoconfig",
        "ic-ui/ckeditor/liteconfig",
        "ic-core/globalization/api",
        "ic-core/globalization/config"
], function(dojo, array, lang, config, kernel, query, when, Deferred, url, help, locale, services, theme, dojoconfig, liteconfig, g11n_api, g11n_config) {

   var pluginsLoaded = false,
      customConfig = [],
      customPlugins = [],
      defaultPlugins = [ "ic-ui/ckeditor/plugins/docpicker",
                         "ic-ui/ckeditor/plugins/publishBinaryData",
                         "ic-ui/ckeditor/plugins/mentions"],
      defaultPluginsLite = ['ic-ui/ckeditor/plugins/mentions',
                            'ic-ui/ckeditor/plugins/urlDetect'];

   // override function getUrl() in ckeditor_base.js
   window.CKEDITOR_GETURL = function(resource) {
      if (!CKEDITOR || !CKEDITOR.basePath || !CKEDITOR.timestamp) {
         return null;
      }

      var u = url.parse(resource);
      if (!u.scheme && resource.indexOf('/') !== 0) {
         resource = CKEDITOR.basePath + resource;
      }

      // Set timestamp and versionstamp, except for directories.
      if (resource.charAt(resource.length - 1) != '/') {
         resource = rewrite(resource);
      }

      return resource;
   };

   function rewrite(url_) {
      return url.rewrite(url_, {
         t : CKEDITOR.timestamp,
         etag : lang.getObject('ibmConfig.versionStamp')
      });
   }

   function addExtraPlugin(name, opts) {
      // / if no opts param passed, use the global CKEDITOR.config
      var ep = opts ? opts.extraPlugins || '' : CKEDITOR.config.extraPlugins,
         epl = ep ? ep.split(',') : [];

      // add the plugin only if it has not been added already
      if (ep.indexOf(name) == -1) {
         epl.push(name);
         if (opts) {
            opts.extraPlugins = epl.join(',');
         }
         else {
            CKEDITOR.config.extraPlugins = epl.join(',');
         }
      }
   }

   function addPlugin(o, opts) {
      var p = o.getName();
      if (lang.isFunction(o.isEnabled) && !o.isEnabled()) {
         if (config.isDebug)
            console.info("ic-ui/ckeditor/dynamic: registered plugin '" + p + "' is not enabled.");
         return;
      }
      if (lang.isFunction(o.addPlugin)) {
         o.addPlugin();
      }
      else {
         console.warn("ic-ui/ckeditor/dynamic: registered plugin '" + p + "' does not implement an addPlugin() method.");
      }
      dynamic.addCustomConfig(function(opts) {
         addExtraPlugin(p, opts);
         if (lang.isFunction(o.addCustomConfig)) {
            o.addCustomConfig(opts);
         }
      });
   }

   /**
    * Adds extra font options for Asian languages, according to the table below
    * https://w3.tap.ibm.com/w3ki07/display/GIG/GIG085+How+do+I+create+Cascading+Style+Sheet+%28CSS%29+resources+for+different+languages
    *
    * <pre>
    * +---------------------+--------------------------------------------------------------+------------------------+------------------------------------------------------------+
    * | Language            | Windows                                                      | Linux (RHEL)           | Mac OS X                                                   |
    * +---------------------+--------------------------------------------------------------+------------------------+------------------------------------------------------------+
    * | Japanese            | &quot;MS UI Gothic&quot;(All),&quot;MS PGothic&quot;(All), Meiryo (Vista/7 only) | &quot;Sazanami Gothic&quot;      | &quot;Hiragino Kaku Gothic Pro&quot;                                 |
    * | Korean              | Gulim (All), Dotum (All), &quot;Malgun Gothic&quot; (Vista/7 only)     | &quot;Baekmuk Gulim&quot;        | AppleGothic (without a space between &quot;Apple&quot; and &quot;Gothic&quot;) |
    * | Simplified Chinese  | SimSun                                                       | &quot;AR PL ShanHeiSun Uni&quot; | STHeiti                                                    |
    * | Traditional Chinese | PMingLiU                                                     | &quot;AR PL ZenKai Uni&quot;     | &quot;Apple LiGothic&quot;                                           |
    * +---------------------+--------------------------------------------------------------+------------------------+------------------------------------------------------------+
    * </pre>
    */
   function addLanguageSpecificFonts() {
      var fonts = '', fallback = ',Arial,Helvetica,sans-serif';
      // Japanese
      if (locale.getLanguage() === "ja") {
         fonts += ";MS Gothic/'MS UI Gothic','MS PGothic',Meiryo,'Sazanami Gothic','Hiragino Kaku Gothic Pro'" + fallback;
      }
      // Korean
      else if (locale.getLanguage() === "ko") {
         fonts += ";Gulim/Gulim,Dotum,'Malgun Gothic','Baekmuk Gulim',AppleGothic" + fallback;
      }
      else if (locale.getLanguage() === "zh") {
         // Traditional Chinese
         if (locale.getCountry() === "tw") {
            fonts += ";PMingLiU/PMingLiU,'AR PL ZenKai Uni','Apple LiGothic'" + fallback;
         }
         // Simplified Chinese
         else {
            fonts += ";SimSun/SimSun,'AR PL ShanHeiSun Uni',STHeiti" + fallback;
         }
      }
      // TODO: Arabic, Hebrew
      CKEDITOR.config.font_names += fonts;
   }

   function getHelpUrl(topic) {
      var topicPath = "/user/" + (topic || "common/eucommon_ckeditor.html");
      return help.getProductHelpUrl(topicPath);
   }

   function applyConfig(opts) {
      var configLoader = opts.lite ? liteconfig : dojoconfig;
      configLoader.execCustomConfig();
      CKEDITOR.editorConfig(opts);
      var localArgs = {
            customConfig : "",
            language : config.locale,
            ibmHelpDocumentationUrl : dynamic.getHelpUrl,
            contentsCss : dynamic.getContentCss(opts.lite),
         },
         localOn = {
               mode: function(ev) {
                  if (ev.editor.mode === "wysiwyg") {
                     var ckeBody = ev.editor.document.getBody();
                     ['lconnRTE', 'lotusui30', 'lotusui30_body', 'lotusui30dojo', 'lotusui30_fonts'].forEach(function(className){
                        ckeBody.addClass(className);
                     });
                     if (opts.lite) {
                        ckeBody.setAttribute('role', 'application');
                        ckeBody.setAttribute('aria-label', opts.title || 'text area');
                     }
                  }
               }
         }, localMenus;

      switch (theme.getCurrentThemeId()) {
         case 'gen3':   // SC Only
         case 'gen4':
            localArgs.skin = 'oneui3';
            break;
         default:       // hikari
            localArgs.skin = 'ibmdesign';
      }
      // BASIC version
      if (opts.lite) {
         // autogrow plugin loaded by default. removing it if not required
         localArgs.removePlugins = opts.autoGrow ? opts.removePlugins : 'autogrow';
         if (g11n_api.isBidiEnabled()) {
             var txtDir = g11n_api.getTextDirection();
             if (txtDir == g11n_config.TEXT_DIRECTION.LEFT_TO_RIGHT) {
               opts.contentsLangDirection = "ltr";
         }
             else if (txtDir == g11n_config.TEXT_DIRECTION.RIGHT_TO_LEFT) {
               opts.contentsLangDirection = "rtl";
         }
             else {
               opts.contentsLangDirection = document.dir;
             }
         }
      }
      // FULL version
      else {
         localMenus = {
             link : {
               buttonClass: 'cke_button_link',
               commands: ['link', 'linkToFiles']
            }
         };
         lang.mixin(opts.menus, localMenus);
      }
      // failsafe for dojo.mixin or it wont mix the classes
      if (!opts.on) {
         opts.on = {};
      }
      lang.mixin(opts.on, localOn);
      lang.mixin(opts, localArgs);

      addLanguageSpecificFonts();
      array.forEach(customConfig, function(customConfigMethod){
         customConfigMethod(opts);
      });
      // Comsumers can pass the customConfig in the input params
      if (lang.isFunction(opts.customConfigMethod)) {
         opts.customConfigMethod(opts);
      }
      customConfig = [];
   }

   var dynamic = /** @lends ic-core.ckeditor */
   {
      /**
       * Applies the connections custom config.js to the global CK config,
       * ensures config.js isn't loaded by editor instances
       */
      applyCustomConfig : function(opts) {
         var userPlugins = opts.customPlugins || customPlugins;
         var plugins = userPlugins.concat(opts.lite ? defaultPluginsLite : defaultPlugins);
         var deferred = new Deferred();

         if (opts.disableURLDetect) {
            plugins.splice(array.indexOf(plugins, 'lconn.core.ckplugins.urlDetect'), 1)
         }

         require(plugins, function() {
            array.forEach(arguments, function(plugin) {
               addPlugin(plugin, opts);
            });
            applyConfig(opts);
            deferred.resolve('loaded');
         });

         return deferred.promise;
      },

      /**
       * Adds to global CKEditor configuration, it will be applied when CKEditor
       * is available.
       *
       * @param {Function}
       *           f A function that will be executed once CKEditor is loaded
       */
      addCustomConfig : function(f) {
         kernel.deprecated("dynamic.addCustomConfig","Add the custom confiurations as an input param (function) when creating the instance of the editor, ie: ckeditor.replace(location, {customConfigMethod: function(opts){...}})", "6.0");
         customConfig.push(f);
      },

      /**
       * Add custom CKEditor plugins, they will be loaded when CKEditor is
       * available.
       * <p>
       * Callers should pass a Dojo class name. The class must be a singleton
       * and must implement the addPlugin() and getName() methods.
       *
       * @param {String}
       *           p A Dojo module name that represents a Connections CKEditor
       *           plugin
       */
      addCustomPlugin : function(p) {
         kernel.deprecated("dynamic.addCustomPlugin","Add the plugins as an input param (array) when creating the instance of the editor, ie: ckeditor.replace(location, {customPlugins: ['plugin1','plugin2']})", "6.0");
         customPlugins.push(p);
      },

      /**
       * Adds a prefedined CKEditor plugin that is not part of the default
       * configuration.
       * <p>
       * Callers should pass a plugin name. Refer to CKEditor documentation for
       * a list of supported plugins.
       *
       * @param {String}
       *           p The name of a native CKEditor plugin
       */
      addExtraPlugin : function(n, opts) {
         addExtraPlugin(n, opts);
      },

      /**
       * Invokes CKEDITOR.replace(...) in an asynchronous fashion, only when
       * CKEditor is loaded. Use addCustomConfig to register configuration
       * applied when the editor is loaded.
       */
      replace : function() {
         this.async("replace", dojo._toArray(arguments));
      },

      /**
       * Invokes CKEDITOR.appendTo(...) in an asynchronous fashion, only when
       * CKEditor is loaded. Use addCustomConfig to register configuration
       * applied when the editor is loaded.
       */
      appendTo : function() {
         this.async("appendTo", dojo._toArray(arguments));
      },

      /**
       * Loads CKEditor in an asynchronous fashion, and executes a callback when
       * loaded.
       * <p>
       * Callers can pass either a function that will be called with the
       * CKEDITOR object as an argument, or the name of a method of the CKEDITOR
       * object.
       *
       * @param {Function|String}
       *           method A function or the name of a method of the CKEDITOR
       *           object
       * @param {Arguments}
       *           args Arguments for the callback
       */
      async : function(method, args) {
         var localArgs = args && args[1] || {};

         require(["ic-ui/ckeditor/static"], lang.hitch(localArgs, function() {
            when(dynamic.applyCustomConfig(this), function(){
               if (typeof method == "function") {
                  method(CKEDITOR);
               }
               else {
                  CKEDITOR[method].apply(this, args);
               }
            });

         }));
      },

      /**
       * Returns the help topic URL for the rich text editor.
       *
       * @param {String}
       *           [topic] An optional help topic
       */
      getHelpUrl : getHelpUrl,

      getContentCss: function(liteMode)
      {
          // Get all stylesheets in the header
          var as = query("head link[rel=stylesheet]"),
          // Obtain their href
          hr = array.map(as, function(lnk) {
             return lnk.href;
          }),
          // Filter out ckeditor resources (dialogs, toolbar)
          st = array.filter(hr, function(href) {
        	  return href.indexOf('ckeditor') > 0;
          });

          if(document.getElementById('lotusSpritesStylesheet'))
          {
        	  st.push(document.getElementById('lotusSpritesStylesheet').getAttribute('href'));
          }

          if(document.getElementById('lotusThemeStylesheet'))
          {
        	  st.push(document.getElementById('lotusThemeStylesheet').getAttribute('href'));
          }

          // Append ckeditor content stylesheet
          return st.concat(rewrite(CKEDITOR.basePath + (liteMode ? 'contentsLite.css' : 'contents.css')));
       }
   };

   return dynamic;
});
