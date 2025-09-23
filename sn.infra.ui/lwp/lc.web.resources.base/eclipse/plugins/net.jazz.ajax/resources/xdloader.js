/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

/**
 * @namespace net
 */
/**
 * @namespace net.jazz
 */
/**
 * @namespace net.jazz.ajax
 */
/**
 * @namespace net.jazz.ajax.xdloader
 */
(function() {
var loader = dojo.provide("net.jazz.ajax.xdloader");
dojo.require("net.jazz.ajax._xdbootstrap");

if (window.djConfig)
    djConfig.skipIeDomLoaded = true;
var net_jazz_ajax = net.jazz.ajax;
var config = net_jazz_ajax.config;
var MODULES_LOADED = '_js_modules';
window[MODULES_LOADED] = window[MODULES_LOADED] || config.loaded || [];
var URL_REWRITER = '_js_url_rewriter';
window[URL_REWRITER] = typeof window[URL_REWRITER] === 'function' ? window[URL_REWRITER] : function(url) { return url; };

/*
 * Dictionary of module paths, used with dojo.registerModulePath()
 */
loader._modulePaths = (window.djConfig || {}).modulePaths || {};

var baseUri = new dojo._Url(config.base);
var server = (baseUri.scheme && baseUri.authority) ? (baseUri.scheme + "://" + baseUri.authority) : "";
var baseURL = window[URL_REWRITER](config.base);
var webURL = baseURL + "/web/";
var loadURL = webURL + "_xdloader";
var incrementalURL = webURL + "_js";
var baseParams = config.params;
var etag = config.etag;

var onDeck;
var pendingLayers = [];
var tailJob; //null, or the last batch of loads that hasn't yet finished
var headElement = document.getElementsByTagName("head")[0];
//headElement element may not exist, particularly in html
//html 4 or tag soup cases where the page does not
//have a headElement tag in it. Use html element, since that will exist.
//Seems to be an issue mostly with Opera 9 and to lesser extent Safari 2
if (!headElement)
    headElement = document.getElementsByTagName("html")[0];

function LoadJob(skipStart) {
        var _modules = [], _excludes;
        var _scripts;
        var i = 0;
        var _callbacks = [];
        var self = this;
        var appendURL;
        
        this.add = function(modules, callback) {
            _modules = _modules.concat(modules);
            _callbacks.push([callback, modules]);
        }
        
        this.addLayer = function(modules, excludes, callback) {
            _modules = [].concat(modules);
            _excludes = excludes || [];
//            for (var i=0,l=_excludes.length; i<l; i++)
//                _excludes[i] += ".js";
            _callbacks.push([callback, modules]);
        }
        
        function createUrl(filteredModules) {
            var loads = _excludes || window[MODULES_LOADED];
            var script = incrementalURL + "?include=" + filteredModules.sort().join("~")
                + (loads.length > 0 ? ("&exclude=" + loads.sort().join("~") + "~") : "") 
                + (etag ? ("&etag="+encodeURIComponent(etag)) : "")
                + (baseParams ? ("&" + baseParams) : "");
            
            return script;
        }
        
        this.start = function() {
            if (onDeck == self)
                onDeck = null;
            tailJob = self;

            var module, filteredModules = [], requested = {};
            while (module = _modules.shift())
                if (!dojo.exists(module)) {
                    if (requested[module])
                        continue;
                    requested[module] = 1;
                    filteredModules.push(module);
                }
            if (filteredModules.length == 0) {
                finish();
                return;
            }

            var script = createUrl(filteredModules);
            
            var element = document.createElement("script");
            element.type = "text/javascript";
            element.src = script;
            var _onload = element.onload = function _onload() {
                if (element) {
                    element.onload = element.onreadystatechange = null;
                    element = null;
                    finish();
                }
            }
            element.onreadystatechange = function () {
                if ("loaded" === element.readyState || "complete" === element.readyState)
                    _onload();
            };
            headElement.appendChild(element);
        }
        
        this.loaded = function(modules, scripts) {
            _scripts = scripts;
            addScriptTags();
        }

        function addScriptTags() {
            if (i < _scripts.length) {
                var element = document.createElement("script");
                element.type = "text/javascript";
                var src = _scripts[i++];
                if (src.charAt(0) == '/')
                    src = server + src;
                element.src = src;
                var _onload = element.onload = function _onload() {
                    if (element) {
                        element.onload = element.onreadystatechange = null;
                        //element.parentNode.removeChild(element); // clean up dom maybe?
                        element = null;
                        addScriptTags();
                    }
                }
                element.onreadystatechange = function () {
                    if ("loaded" === element.readyState || "complete" === element.readyState)
                        _onload();
                };
                headElement.appendChild(element);
            } else
                finish();
        }
                
        function finish() {
            if (tailJob == self)
                tailJob = null;
            for (var k = 0; k < _callbacks.length; k++) 
                _callbacks[k][0](dojo.map(_callbacks[k][1], dojo.getObject));
            if (self.next)
                self.next.start();
        }

        function onError(error) {
            console.error(error);
        }

        if (skipStart)
            return;

        if (tailJob) {
            //If some job is in progress, link this one to it
            var lastJob = tailJob;
            while (lastJob.next)
                lastJob = lastJob.next;
            lastJob.next = this;
        }
        else
            //Otherwise, start this one pretty soon
            setTimeout(this.start);
}

function LoadJobSync(modules, messageBundle) {
   var _modules = modules, _excludes;
   var module;
   var _scripts;
   var i = 0;
   var self = this;
   var rootBundle = false;
   
   function createUrl(filteredModules) {
      if (filteredModules && filteredModules.length == 1) {
         var bundle = module = filteredModules[0];
//         if (messageBundle) {
//            var script = incrementalURL + "?include=" + filteredModules[0]
//               + "&render=messageBundle";
//         } else {
               var modulePath = webURL;
               for (var i in loader._modulePaths) {
                  if (loader._modulePaths.hasOwnProperty(i)) {
                     if (module.indexOf(i + ".") === 0) {
                        modulePath = loader._modulePaths[i];
                        bundle = bundle.substring(i.length);
                        break;
                     }
                  }
               }
               var script = modulePath + bundle.replace(/\./g, "/").replace(/\/ROOT\//, '/') + ".js";
//         }
      } else {
         var loads = _excludes || window[MODULES_LOADED];
         var script = incrementalURL + "?include=" + filteredModules.sort().join("~")
             + (loads.length > 0 ? ("&exclude=" + loads.sort().join("~") + "~") : "") 
             + (etag ? ("&etag="+encodeURIComponent(etag)) : "")
             + (baseParams ? ("&" + baseParams) : "");
      }
      return script;
   }
   
   this.start = function() {
      if (onDeck == self)
          onDeck = null;
      tailJob = self;

      var module, filteredModules = [], requested = {};
      while (module = _modules.shift())
          if (!dojo.exists(module)) {
              if (requested[module])
                  continue;
              requested[module] = 1;
              filteredModules.push(module);
          }
      if (filteredModules.length == 0) {
          finish();
          return;
      }

      _scripts = createUrl(filteredModules);
      fetchAndEval();
   }
   
   function finish() {
       if (tailJob == self)
           tailJob = null;
       if (self.next)
           self.next.start();
   }
   
   function onError(module, error) {
      if (messageBundle && !rootBundle) {
         var bundle = module.substring(module.lastIndexOf('.') + 1),
            pack = module.substring(0, module.indexOf('.nls.')),
            locale = module.substring(module.indexOf('.nls.') + 5, module.lastIndexOf('.'));
         var loc = locale.split('-').slice(0, -1).join('_');
         if (!loc) {
            loc = 'ROOT';
            rootBundle = true;
         }
         var module = pack + '.nls.' + loc + '.' + bundle;
         _modules.push(module);
         self.start(self, null);
      }
      console.error(error);
   }

   var _pending;
   var _code;
   
   function fetchAndEval() {
      _code = [];
      dojo.xhrGet({
         url: _scripts,
         headers: {Accept: "text/javascript"},
         load: receiveCode,
         error: dojo.partial(onError, module),
         sync: true,
         failOk: true
      });
   }
   
   function receiveCode(response) {
      var preamble;
      if (messageBundle) {
         rootBundle = false;
         var bundle = module.substring(module.lastIndexOf('.') + 1),
            pack = module.substring(0, module.indexOf('.nls.')),
            locale = module.substring(module.indexOf('.nls.') + 5, module.lastIndexOf('.')).replace(/\-/g, '_'),
            base = pack + '.nls.' + bundle;
         preamble = 'dojo.provide("' + base + '")._built=true;\n'
            + 'dojo.provide("' + base + '.' + locale + '");\n'
            + base + '.' + locale + '=';
      } else {
         preamble = 'var __module = "' + module.replace(/\./g, '/') + '";\n';
      }
      response = preamble + response;
      if (window.execScript)
         // 121548: Problems with OpenSocial gadgets in the Jazz dashboard using IE7
         // workaround for: http://trac.dojotoolkit.org/ticket/744
         window.execScript(response);
      else
         dojo["eval"](response);
      finish();
   }
   this.start(messageBundle);

}

loader.loaded = function(/* Array<String> */modules, /* Array<String> */stylesheets, /* Array<String> */scripts) {
    // summary:
    //      Invoked by Javascript from the loader servlet.  Used for cross domain
    //      loads.
    // description:
    //      Cross domain Javascript must invoke methods via script to pass data.
    //      This function registers the new modules as being available (to 
    //      prevent other modules from attempting to load), adds any stylesheets
    //      to the page, and then informs the current load job that the script
    //      is available.
    //      retrieve the script resources the loader describes.

    window[MODULES_LOADED] = window[MODULES_LOADED].concat(modules);

    if (!tailJob) {
        // the loader must always have a load job - in the event no load job is 
        // defined we assume that this is an initial load (loader.js is included
        // with the loader servlet.
        tailJob = new LoadJob(true);
        tailJob.add(modules, function() {});
    }
    
    var styleURL = stylesheets[0];
    
    if (styleURL && !config.skipStyles) {
        if (styleURL.charAt(0) == '/')
            styleURL = server + styleURL; 
        if (document.all && document.styleSheets.length > 31) {
            var styleSheet;
            for (var i = 0; i < document.styleSheets.length; i++) {
                //djConfig.isDebug && console.debug("stylesheet ["+i+"] has "+document.styleSheets[i].imports.length+" imports");
                if (document.styleSheets[i].imports.length < 32) {
                    styleSheet = document.styleSheets[i];
                    break;
                }
            }
            if (styleSheet !== null) {
                //djConfig.isDebug && console.debug("stylesheet ["+i+"] has "+document.styleSheets[i].imports.length+" imports");
                styleSheet.addImport(styleURL); 
            } else
                throw new Error("No stylesheet is available to add an import to");
        } else {
            var styleElement = document.createElement("link");
            styleElement.rel = "stylesheet";
            styleElement.type = "text/css";
            styleElement.href = styleURL;                           
            headElement.appendChild(styleElement);
            //djConfig.isDebug && console.debug("Created new stylesheet. Number of current stylesheets is "+document.styleSheets.length);
        }
    }
    
    tailJob.loaded(modules, scripts);
}

loader.load_async = function(/*String*/module, /*Function*/callback, /*Boolean*/concurrent) {
    // summary:
    //      Asynchronously loads the specified module and all of the modules
    //      it depends on that are not already loaded.
    // description: 
    //      In order to provide a responsive user interface, the Jazz web UI
    //      attempts to load the minimal amount of code necessary to satisfy a
    //      particular use case, and attempts to minimize the number of server
    //      round trips.  The 'load_async' method requests a set of modules using
    //      the following algorithm:
    //
    //      1) Include the specified module and all of the modules it
    //         transitively depends on.
    //      2) From the set of modules determined by step 1, subtract any
    //         modules that are alrady loaded.
    //      3) Makes an XHR request to load the modules
    //      4) Calls the callback function
    //
    // module: 
    //      The id of a module.
    // callback: 
    //      The callback function to be called once the module has been loaded.
    // examples:
    //      load_async("com.ibm.team.workitem.web.WorkItemPage", function() {...});
    // since:
    //      0.7
    loader.batch_load_async([module], callback, concurrent);
};

//FIXME: prototype
//window.require = function(module, callback) {
//  if (!dojo.isArray(module))
//      module = [module];
//  loader.batch_load_async(module, callback);
//}

loader.batch_load_async = function(/*Array*/modules, /*Function*/ callback, /*Boolean*/concurrent){
    // summary:
    //      Asynchronously loads the specified array of modules and all of the modules
    //      they depend on that are not already loaded.
    // description:
    //      In order to provide a responsive user interface, the Jazz web UI
    //      attempts to load the minimal amount of code necessary to satisfy a
    //      particular use case, and attempts to minimize the number of server
    //      round trips.  The 'batch_load_async' method requests a set of modules using
    //      the following algorithm:
    //
    //      1) Include the specified array of modules and all of their modules that they
    //         transitively depends on.
    //      2) From the set of modules determined by step 1, subtract any
    //         modules that are alrady loaded.
    //      3) Makes an XHR request to load the modules
    //      4) Calls the callback function
    //
    // module: 
    //      The id of a module.
    // callback: 
    //      The callback function to be called once the modules have been loaded.
    // examples:
    //      batch_load_async(["com.ibm.team.dashboard.web.Viewlet1","com.ibm.team.dashboard.web.Viewlet2"], function() {...});
    
//  if (!dojo.isArray(modules))
//      throw new Error("modules argument must be an Array");   
//  if (!dojo.isFunction(callback))
//      throw new Error("cb argument must be a Function");
    var module, missing = [], loaded = [];
    while (module = modules.shift())
        if (!dojo.exists(module))
            missing.push(module);
        else
            loaded.push(module);
    if (missing.length == 0)
        callback.apply(null, loaded);
    else if(concurrent)
       new LoadJob().add(missing, callback);
    else {
        if (!onDeck)
            onDeck = new LoadJob();
        onDeck.add(missing, callback);
    }
};

loader.load_layer_async = function(/*Array*/modules, /*Array*/excludes, /*Function*/ callback) {
    if (!dojo.isArray(modules))
        modules = [modules];
    if (!dojo.isArray(excludes))
        excludes = [excludes];
    var load = new LoadJob();
    load.addLayer(modules, excludes, callback);
};

loader.load_sync = function(/*String*/module, /*Boolean*/messageBundle) {
   // summary:
   //      Synchronously loads the specified module and all of the modules
   //      it depends on that are not already loaded.
   // description: 
   //      In order to provide a responsive user interface, the Jazz web UI
   //      attempts to load the minimal amount of code necessary to satisfy a
   //      particular use case, and attempts to minimize the number of server
   //      round trips.  The 'load_sync' method requests a set of modules using
   //      the following algorithm:
   //
   //      1) Include the specified module and all of the modules it
   //         transitively depends on.
   //      2) From the set of modules determined by step 1, subtract any
   //         modules that are alrady loaded.
   //
   //      Note: 'load_sync' results in a synchonous XHR request; this can
   //      result in the browser appearing to lock up over high-latency
   //      connections.
   // module: 
   //      The id of a module.
   // messageBundle: 
   //      True if the module is a message bundle.
   // examples:
   //      load_sync("com.ibm.team.workitem.web.WorkItemPage");
   if (dojo.exists(module))
       return;
   new LoadJobSync([module], messageBundle);
};

//TODO: replace dojo.require

//TODO: switch to jazz.code.loader
dojo.provide("jazz.core.loader"); jazz.core.loader = loader;

})();