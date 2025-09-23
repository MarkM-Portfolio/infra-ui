/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2014                                    */
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
 * This is a redressing of jazz.core.loader from RTC SDK
 */
(function() {

var loader = dojo.provide("net.jazz.ajax.loader");

var SERVICE_BASE_URL = net.jazz.ajax._contextRoot + "/web/",
    SUFFIX_LOADER = "_loader",
    SUFFIX_JS = "_js/",
    SUFFIX_CSS = "_style/",
    URL_LIMIT = 2047 - SERVICE_BASE_URL.length - SUFFIX_CSS.length,
    onDeck, //The current batch of async loads
    tailJob; //null, or the last batch of loads that hasn't yet finished

function LoadJob(synchronous, modules) {
        var _modules = synchronous ? modules : [];
        var _scripts, _css;
        var i = 0;
        var _callbacks = [];
        var self = this;
        var head = dojo.doc.getElementsByTagName("head")[0];
        var appendURL;
        var _loaded;
        
        this.add = function(modules, callback) {
            _modules = _modules.concat(modules);
            _callbacks.push(callback);
        };
        
        this.start = function() {
            onDeck = null;
            tailJob = self;
            
            var module, filteredModules = [];
            while (module = _modules.shift())
                if (!dojo.exists(module) && !filteredModules[module]) {
                    filteredModules.push(module);
                    filteredModules[module] = true;
                }
            if (filteredModules.length == 0) {
                finish();
                return;
            }
            var request = {
                exclude : loader._loaded.sort().join("~"),
                include : filteredModules.sort().join("~"),
                ss : loader._serverStartup
            };

            if (net.jazz.ajax._isGadgetAdapter)
                request.context = "gadgetAdapter";
            else
                request._proxyURL = net.jazz.ajax._contextRoot;
            
            if (dojo.config.isDebug)
                request.debug = dojo.config.isDebug;
            if (request.debug != true) {
                request.locale = dojo.config.locale;
                var queryPart = "?" + dojo.objectToQuery(request);
                if (queryPart.length < URL_LIMIT) {
                    _scripts = [SERVICE_BASE_URL + SUFFIX_JS + queryPart];
                    _css = [SERVICE_BASE_URL + SUFFIX_CSS + queryPart];
                    addCSS();
                    if (synchronous)
                        fetchAndEval();
                    else
                        addScriptTags();
                    return;
                }
            }
            dojo.xhrPost({
                load: onResponse,
                url: SERVICE_BASE_URL + SUFFIX_LOADER,
                handleAs: "json",
                content: request,
                sync : synchronous,
                failOk: true,
                error: onError
            });
        };
        
        function finish() {
            if (dojo.config.isDebug == true)
                loader._loaded = loader._loaded.concat(_loaded);
            if (tailJob == self)
                tailJob = null;
            if (!loader._serverRestarted)
                for (var k = 0; k < _callbacks.length; k++) 
                    _callbacks[k]();
            if (self.next)
                self.next.start();
        }
        
        function onError(error) {
            try {
                var s = dojo.fromJson(error.responseText).error;
                alert(s);
            } catch (e) {
                alert(error);
            }
            finish();
        }
        
        function onResponse(response) {
            _loaded = response.loaded;
            _css = response.css;
            _scripts = response.script;
            addCSS();
            if (djConfig.isDebug && !synchronous)
                addScriptTags();
            else {
                appendURL = djConfig.isDebug === true && !dojo.isIE;
                fetchAndEval();
            }
        }
        
        function addCSS() {
            var styleURL = _css[0];
            
            if (dojo.isIE && document.styleSheets.length > 30) {
                var styleSheet;
                for (var i = 0; i < document.styleSheets.length; i++) {
                    //djConfig.isDebug && console.debug("stylesheet ["+i+"] has "+document.styleSheets[i].imports.length+" imports");
                    if (document.styleSheets[i].imports.length < 31) {
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
                head.appendChild(styleElement);
                //djConfig.isDebug && console.debug("Created new stylesheet. Number of current stylesheets is "+document.styleSheets.length);
            }
        }
        
        function addScriptTags() {
            if (i < _scripts.length) {
                var element = dojo.doc.createElement("script");
                element.type = "text/javascript";
                element.src = _scripts[i++];
                var _onload = function () {
                    if (element) {
                        element.onerror = element.onload = element.onreadystatechange = null;
                        element = null;
                        addScriptTags();
                    }
                };
                element.onload = _onload;
                element.onerror = element.onreadystatechange = function () {
                    if (!element.readyState || "loaded" === element.readyState || "complete" === element.readyState)
                        _onload();
                };
                head.appendChild(element);
            } else
                finish();
        }
        
        var _pending;
        var _code;
        
        function fetchAndEval() {
            _pending = _scripts.length;
            if (_pending == 0)
                return finish();
            _code = [];
            for (var i = 0; i < _scripts.length; i++) {
                dojo.xhrGet({
                    url: _scripts[i],
                    headers: {Accept: "text/javascript"},
                    load: dojo.hitch({index : i}, receiveCode),
                    error: onError,
                    sync: synchronous
                });
            }
        }
        
        function receiveCode(response) {
            _pending--;
            var i = this.index;
            _code[i] = response;
            if (appendURL)
                _code[i] = response + "\r\n//@ sourceURL=" + _scripts[i];
            if (_pending > 0)
                return;
            for (i = 0; i < _code.length; i++)
                if (window.execScript)
                    // 121548: Problems with OpenSocial gadgets in the Jazz dashboard using IE7
                    // workaround for: http://trac.dojotoolkit.org/ticket/744
                    window.execScript(_code[i]);
                else
                    dojo["eval"](_code[i]);
            finish();
        }
        
        if (synchronous)
            this.start();
        else if (tailJob)
            //If some job is in progress, link this one to it
            tailJob.next = this;
        else
            //Otherwise, start this one pretty soon
            setTimeout(this.start);
}

function enqueue(modules, callback) {
    if (!onDeck)
        onDeck = new LoadJob();
    onDeck.add(modules, callback);
}

loader.load_async = function(/*String*/module, /*Function*/callback) {
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
    loader.batch_load_async([module], callback);
};

loader.batch_load_async = function(/*Array*/modules, /*Function*/ callback){
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
    
    if (!dojo.isArray(modules))
        throw new Error("modules argument must be an Array");   
    if (!dojo.isFunction(callback))
        throw new Error("cb argument must be a Function");
    var module, filteredModules = [];
    while (module = modules.shift())
        if (!dojo.exists(module))
            filteredModules.push(module);
    if (filteredModules.length == 0)
        callback();
    else
        enqueue(filteredModules, callback);
};

var showWarning = true;
loader.load_sync = function(/*String*/module) {
    if (dojo.config.isDebug && showWarning) {
        showWarning = false;
        alert("WARNING: load_sync has been deprecated for 3 years and is being removed");
    }
    dojo.deprecated(
            "net.jazz.ajax.loader.load_sync()",
            "Use load_async.  Synchronous loading of resources is problematic and should not be used.");
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
    // examples:
    //      load_sync("com.ibm.team.workitem.web.WorkItemPage");
    if (dojo.exists(module))
        return;
    new LoadJob(true, [module]);
};

loader._serverRestarted = false;

/*
loader._waitForCSS = function(styleSheet, lastRuleCount){
    try {
        var cssRules = document.createStyleSheet ? styleSheet.rules : styleSheet.cssRules;
        if (cssRules.length > lastRuleCount) {
            setTimeout(function() {
                net.jazz.ajax.loader._waitForCSS(styleSheet, cssRules.length);
            }, 200);
        }
    }
    catch (exc) {
        setTimeout(function() {
            net.jazz.ajax.loader._waitForCSS(styleSheet, -1);
        }, 200);
    }
}

loader._getLastStylesheet = function() {
    var styleSheet = null;
    if (!document.createStyleSheet) {
        styleSheet = document.styleSheets[document.styleSheets.length - 1];
    } else {
        if (document.styleSheets.length > 31) {
            for (var i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].imports.length < 32) {
                    styleSheet = document.styleSheets[i];
                    break;
                }
            }
        }
        else {
            styleSheet = document.styleSheets[document.styleSheets.length - 1];
        }
    }
    return styleSheet;  
}
*/

})();