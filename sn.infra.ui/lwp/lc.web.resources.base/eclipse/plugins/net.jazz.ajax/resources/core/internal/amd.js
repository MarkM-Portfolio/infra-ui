/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
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
(function() {
	var modules = {}, packages = {}, baseUrl = (typeof dojoConfig!=="undefined"?dojoConfig:djConfig).baseUrl;
	baseUrl = baseUrl.substring(0, baseUrl.length - 5);
	
	function resolveDependency(base, id) {
		if (id === 'require')
			return localRequire(base);
		if (id === 'exports')
			return getModule(base, true);
		if (id === 'module')
			return {id:base};
		return getModule(normalize(base, id));
	}
	
	function getModule(id, create) {
		if (!id)
			return null;
		if (!id.indexOf("css!")) {
			console.warn("The css! AMD plugin is unsupported in Connections: " + id.substring(4));
			return;
		}
		if (!id.indexOf("jazz/inverted!"))
			create = id = id.substring(14);
		var result = modules[id];
		if (result)
			return result;
		if (create)
			return modules[id] = {};
		if (id.indexOf("dojo/text!") === 0) {
			id = id.substring(id.indexOf("dojo/text!") + 10, id.lastIndexOf(".")).replace(/\./g, "/") + id.substring(id.lastIndexOf("."));
			return dojo.cache(id.substring(0, id.indexOf("/")), id.substring(id.indexOf("/") + 1));
		}
		if (id.indexOf("!") !== -1)
			id = id.substring(id.indexOf("!") + 1);
		var id_ = id.replace(/\//g, ".");
		try {
			net.jazz.ajax.xdloader.load_sync(id_);
		} catch(e) {
			console.error(e);
		}
		// Not all AMD modules can be referred with dot notation;
		// Use the modules registry as fallback
		result = modules[id] || dojo.getObject(id_);
		if (result)
			return modules[id] = result;
//		else 
//			console.error("Unresolved module with id: " + id);
	}
	
	function localRequire(base) {
		function require(required, callback, legacy) {
			if (typeof required == 'string' && !callback) {
				var normalized = normalize(base, required);
				if (legacy && modules[normalized] === undefined) {
					net.jazz.ajax.xdloader.load_sync(required);
				}
				return modules[normalized];
			}
			var i, module, fixed = [];
			for (i = 0; i < required.length; i++) {
				module = normalize(base, required[i]);
				if (!module)
					continue;
				//TODO for now, plain javascript modules use '.' instead of '/'
				if (module.indexOf("!") == -1)
					module = module.replace(/\//g,".");
				fixed[i] = module;
			}
			net.jazz.ajax.xdloader.batch_load_async(fixed, function(){
				var resolved = [];
				for (i = 0; i < required.length;i++)
					resolved[i] = (require(required[i]));
				callback && callback.apply(null, resolved);
			});
		};
		require.on = function ready(unused, callback) {
			callback(); //TODO should this wait until document onload?
		};
		require.toUrl = function toUrl(url) {
			return baseUrl + resolve(base, url);
		};
		require.idle = function (){return true;};
		return require;
	}
	
	function normalize(base, dependency) {
		var i, parts = dependency.split("!");
		for (i = 0; i < parts.length; i++)
			parts[i] = resolve(base, parts[i]);
		dependency = parts.join('!');
		if (!dependency.indexOf("dojo/has!")) {
			var has = modules["dojo/has"];
			dependency = dependency.substring(9);
			dependency = has.normalize(dependency, function(relative){
				return resolve(base, relative);
			});
		} else if (dependency == "dojo/domReady!")
			return;
		if (packages[dependency])
			dependency += "/main";
		return dependency;
	}
	
	function resolve(base, path) {
		if (path.charAt(0) != '.')
			return path;
		if (path.charAt(1) == '.')
			path = base + "/../" + path;
		else
			path = base + "/." + path;
		while (base != path)
			path = (base = path).replace(/\/[^\/]+\/\.\./, "");
		return path;
	}
	
	define = function(id, dependencies, callback) {
		if (typeof id !== 'string') {
			callback = dependencies;
			dependencies = id;
			id = __module || '';
		}
		if (!callback)
			return modules[id] = typeof dependencies === 'function' ?
				dependencies() : dependencies;
		var i, d, resolved = [];
		for (i = 0; i < dependencies.length; i++) {
			d = resolveDependency(id, dependencies[i]);
			resolved[i] = d;
		}
		modules[id] = callback.apply(null, resolved) || modules[id] || true;
	};
	define._modules = modules;
	define._packages = packages;
	
	require = localRequire("");
})();