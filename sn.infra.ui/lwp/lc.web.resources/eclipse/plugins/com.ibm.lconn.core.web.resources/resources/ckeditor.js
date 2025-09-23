/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * CKEditor loader for Connections applications
 * <p>
 * This helper exposes convenient methods to load CKEditor in a static or dynamic way, add extra plugins or custom Connections plugins.
 * @namespace lconn.core.ckeditor
 * @author Eamon Phelan <eaphelan@ie.ibm.com>
 */
(function() {
   dojo.provide("lconn.core.ckeditor");
   dojo.require("com.ibm.oneui.ckeditor.editor.dojoconfig");
   dojo.require("lconn.core.config.ckeditorLite");
   dojo.require("lconn.core.url");
   dojo.require("lconn.core.help");
   dojo.require("lconn.core.locale");
   dojo.require("lconn.core.theme");
   dojo.require("lconn.core.config.services");
   dojo.require("lconn.core.ckplugins.icdocpicker");
   dojo.require("lconn.core.ckplugins.icpublishBinaryData");
   dojo.require("lconn.core.ckplugins.mentions");
   dojo.require("lconn.core.ckplugins.urlDetect");
   dojo.require("net.jazz.ajax.xdloader");
   dojo.require("lconn.core.globalization.api");
   dojo.require("lconn.core.globalization.config");
   
   var xdl = net.jazz.ajax.xdloader,
      customConfig = [],
      customPlugins = [],
      defaultPlugins = ['lconn.core.ckplugins.icdocpicker',
                           'lconn.core.ckplugins.icpublishBinaryData',
                           'lconn.core.ckplugins.mentions'],
      defaultPluginsLite = ['lconn.core.ckplugins.mentions',
                            'lconn.core.ckplugins.urlDetect'];

   //override function getUrl() in ckeditor_base.js
   window.CKEDITOR_GETURL = function(resource) {
      if (!CKEDITOR || !CKEDITOR.basePath || !CKEDITOR.timestamp)
         return null;

      var u = lconn.core.url.parse(resource);
      if (!u.scheme && resource.indexOf('/') !== 0)
         resource = CKEDITOR.basePath + resource;

      // Set timestamp and versionstamp, except for directories.
      if (resource.charAt(resource.length - 1) != '/')
         resource = rewrite(resource);

      return resource;
   };

   function rewrite(url) {
      return lconn.core.url.rewrite(url, {
         t: CKEDITOR.timestamp,
         etag: dojo.getObject('ibmConfig.versionStamp')
      });
   }

   function addExtraPlugin(name, opts) {
      /// if no opts param passed, use the global CKEDITOR.config
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

   function addPlugin(p, opts) {
      var o = dojo.getObject(p);
      if (dojo.isFunction(o.isEnabled) && !o.isEnabled()) {
         if (dojo.config.isDebug)
            console.info("lconn.core.ckeditor: registered plugin '" + p + "' is not enabled.");
         return;
      }
      if (dojo.isFunction(o.addPlugin))
         o.addPlugin();
      else
         console.warn("lconn.core.ckeditor: registered plugin '" + p + "' does not implement an addPlugin() method.");
      lconn.core.ckeditor.addCustomConfig(function(opts) {
         addExtraPlugin(o.getName(), opts);
         if (dojo.isFunction(o.addCustomConfig) ) {
            o.addCustomConfig(opts);
         }
      });
   }

   /**
    * Adds extra font options for Asian languages, according to the table below
    * https://w3.tap.ibm.com/w3ki07/display/GIG/GIG085+How+do+I+create+Cascading+Style+Sheet+%28CSS%29+resources+for+different+languages
    * <pre>
    * +---------------------+--------------------------------------------------------------+------------------------+------------------------------------------------------------+
    * | Language            | Windows                                                      | Linux (RHEL)           | Mac OS X                                                   |
    * +---------------------+--------------------------------------------------------------+------------------------+------------------------------------------------------------+
    * | Japanese            | "MS UI Gothic"(All),"MS PGothic"(All), Meiryo (Vista/7 only) | "Sazanami Gothic"      | "Hiragino Kaku Gothic Pro"                                 |
    * | Korean              | Gulim (All), Dotum (All), "Malgun Gothic" (Vista/7 only)     | "Baekmuk Gulim"        | AppleGothic (without a space between "Apple" and "Gothic") |
    * | Simplified Chinese  | SimSun                                                       | "AR PL ShanHeiSun Uni" | STHeiti                                                    |
    * | Traditional Chinese | PMingLiU                                                     | "AR PL ZenKai Uni"     | "Apple LiGothic"                                           |
    * +---------------------+--------------------------------------------------------------+------------------------+------------------------------------------------------------+
    * </pre>
    */
   function addLanguageSpecificFonts() {
      var fonts = '', fallback = ',Arial,Helvetica,sans-serif';
      // Japanese
      if (lconn.core.locale.getLanguage() === "ja")
         fonts += ";MS Gothic/'MS UI Gothic','MS PGothic',Meiryo,'Sazanami Gothic','Hiragino Kaku Gothic Pro'" + fallback;
      // Korean
      else if (lconn.core.locale.getLanguage() === "ko")
         fonts += ";Gulim/Gulim,Dotum,'Malgun Gothic','Baekmuk Gulim',AppleGothic" + fallback;
      else if (lconn.core.locale.getLanguage() === "zh") {
         // Traditional Chinese
         if (lconn.core.locale.getCountry() === "tw")
            fonts += ";PMingLiU/PMingLiU,'AR PL ZenKai Uni','Apple LiGothic'" + fallback;
         // Simplified Chinese
         else
            fonts += ";SimSun/SimSun,'AR PL ShanHeiSun Uni',STHeiti" + fallback;
      }
      // TODO: Arabic, Hebrew
      CKEDITOR.config.font_names += fonts;
   }

   function applyConfig(opts) {
      (opts.lite ? lconn.core.config.ckeditorLite : com.ibm.oneui.ckeditor.editor.dojoconfig).execCustomConfig();
      CKEDITOR.editorConfig(opts);
      var localArgs = {
            customConfig : "",
            language : dojo.config.locale,
            ibmHelpDocumentationUrl : lconn.core.ckeditor.getHelpUrl,
            contentsCss : lconn.core.ckeditor.getContentCss(opts.lite)
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

      if (lconn.core.theme.isHikariTheme()) {
          localArgs.skin = 'ibmdesign';
      } else {
          localArgs.skin = 'oneui3';
      }
      // BASIC version
      if (opts.lite) {
         // autogrow plugin loaded by default. removing it if not required
         localArgs.removePlugins = opts.autoGrow ? opts.removePlugins : 'autogrow';
         if (lconn.core.globalization.api.isBidiEnabled()) {
             var txtDir = lconn.core.globalization.api.getTextDirection();
             if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.LEFT_TO_RIGHT)
               opts.contentsLangDirection = "ltr";
             else if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.RIGHT_TO_LEFT)
               opts.contentsLangDirection = "rtl";
             else
               opts.contentsLangDirection = document.dir;
         }
      }
      // FULL version
      else {
         localMenus = {
            link : {
              buttonClass: 'cke_button_link',
              commands: ['link', 'linkToFiles']
           },
           embedPreview  : {
              buttonClass: 'cke_button_embedPreview',
              commands: []
           }
         };
         dojo.mixin(opts.menus, localMenus);
      }
      // failsafe for dojo.mixin or it wont mix the classes
      if (!opts.on) {
         opts.on = {};
      }
      dojo.mixin(opts.on, localOn);
      dojo.mixin(opts, localArgs);

      addLanguageSpecificFonts();
      dojo.forEach(customConfig, function(customConfigMethod){
         customConfigMethod(opts);
      });
      // Comsumers can pass the customConfig in the input params
      if (dojo.isFunction(opts.customConfigMethod)) {
         opts.customConfigMethod(opts);
      }
      customConfig = [];
   }

   lconn.core.ckeditor = /** @lends lconn.core.ckeditor */ {
         /**
          * This function is used for 3rd party to hook when a custom config is applied. No-op by default. 
          */
      cbCustomConfigApplied: function (opts) {
         return opts;
      },

      /**
       * Applies the connections custom config.js to the global CK config,
       * ensures config.js isn't loaded by editor instances
       */
      
      applyCustomConfig: function(opts) {
         var userPlugins = opts.customPlugins ? dojo._toArray(opts.customPlugins) : customPlugins;
         var plugins = userPlugins.concat(opts.lite ? defaultPluginsLite : defaultPlugins);

         if (opts.disableURLDetect) {
            plugins.splice(dojo.indexOf(plugins, 'lconn.core.ckplugins.urlDetect'), 1)
         }
         dojo.forEach(plugins, function(plugin){
            dojo.require(plugin);
            addPlugin(plugin, opts);
         });
         applyConfig(opts);
         lconn.core.ckeditor.cbCustomConfigApplied(opts);
      },

      /**
       * Adds to global CKEditor configuration, it will be applied when CKEditor is available.
       * @param {Function} f A function that will be executed once CKEditor is loaded
       */
      addCustomConfig: function(f) {
         customConfig.push(f);
      },

      /**
       * Add custom CKEditor plugins, they will be loaded when CKEditor is available.
       * <p>
       * Callers should pass a Dojo class name. The class must be a singleton and must
       * implement the addPlugin() and getName() methods.
       * @param {String} p A Dojo module name that represents a Connections CKEditor plugin
       */
      addCustomPlugin: function(p) {
         dojo.deprecated("Add the plugins as an input param (array) when creating the instance of the editor, ie: lconn.core.ckeditor.replace(location, {customPlugins: ['plugin1','plugin2']})", "6.0");
         customPlugins.push(p);
      },

      /**
       * Adds a prefedined CKEditor plugin that is not part of the default configuration.
       * <p>
       * Callers should pass a plugin name. Refer to CKEditor documentation for a list of supported plugins.
       * @param {String} p The name of a native CKEditor plugin
       * @param {Object} opt The obkect with the customized options
       */
      addExtraPlugin: function(n, opts) {
         addExtraPlugin(n, opts);
      },

      /**
       * Invokes CKEDITOR.replace(...) in an asynchronous fashion, only when CKEditor is loaded.
       *
       * Use addCustomConfig to register configuration applied when the editor is loaded.
       */
      replace: function() {
         lconn.core.ckeditor.async("replace", dojo._toArray(arguments));
      },

      /**
       * Invokes CKEDITOR.appendTo(...) in an asynchronous fashion, only when CKEditor is loaded.
       *
       * Use addCustomConfig to register configuration applied when the editor is loaded.
       */
      appendTo: function() {
         lconn.core.ckeditor.async("appendTo", dojo._toArray(arguments));
      },

      /**
       * Loads CKEditor in an asynchronous fashion, and executes a callback when loaded.
       * <p>
       * Callers can pass either a function that will be called with the CKEDITOR object as an argument, or the name of a method of the CKEDITOR object.
       * @param {Function|String} method A function or the name of a method of the CKEDITOR object
       * @param {Arguments} args Arguments for the callback
       */
      async: function(method, args) {
         var localArgs = args && args[1] || {};

         xdl.load_layer_async("lconn.core.ckeditorstatic", ["lconn.core.ckeditor"], dojo.hitch(localArgs, function() {
            lconn.core.ckeditor.applyCustomConfig(this);
            if (typeof method == "function") {
               method(CKEDITOR);
            }
            else {
               CKEDITOR[method].apply(this, args);
            }
         }));
      },

      /**
       * Returns the help topic URL for the rich text editor.
       * @param {String} [topic] An optional help topic
       */
      getHelpUrl: function(topic) {
         var topicPath = "/topic/" + (topic || "com.ibm.lotus.connections.common.help/eucommon_ckeditor.html");
         return lconn.core.help.getProductHelpUrl(topicPath);
      },
      
      getContentCss: function(liteMode)
      {
          // Get all stylesheets in the header
          var as = dojo.query("head link[rel=stylesheet]"),
          // Obtain their href
             hr = dojo.map(as, function(lnk){ return lnk.href }),
          // Filter out ckeditor resources (dialogs, toolbar)
             st = dojo.filter(hr, function(href){ return href.indexOf('ckeditor') > 0;});
          
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
})();
