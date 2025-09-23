/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define(["require", "./_base/kernel"],
	function(require, dojo) {
		var SUFFIX = "." + dojo.locale.replace(/-/, "_");
		
		function getBundleName(moduleName, bundleName, locale){
			locale = locale ? locale.toLowerCase() : dojo.locale;
			moduleName = moduleName.replace(/\./g, "/");
			bundleName = bundleName.replace(/\./g, "/");
			return (/root/i.test(locale)) ?
				(moduleName + "/nls/" + bundleName) :
				(moduleName + "/nls/" + locale + "/" + bundleName);
		}
		
		function hasBundle(pack, name, locale){
			locale = locale ? locale.toLowerCase() : dojo.locale;
			var base = pack + '.nls.' + name,
				amdModuleName = 'dojo/i18n!' + base.replace(/\./g, '/');
			return findLocalization(base, '.' + locale.replace(/-/, '_')) || define._modules[amdModuleName];
		}
		
		dojo.i18n = {
			normalizeLocale: function(locale) {
				var result = locale ? locale.toLowerCase() : dojo.locale;
				return result == "root" ? "ROOT" : result;
			},
			// Some components still call this API:
			_preloadLocalizations: function(){
				dojo.deprecated("Connections doesn't support the 'dojo-preload-i18n-Api', we're providing this stub as a convenience.", "5.0");
			},
			getLocalization: function(pack, name, locale) {
				return findLocalization(pack + ".nls." + name, locale ? "." + locale.replace(/-/, "_") : SUFFIX)
					|| getAMDLocalization(pack, name);
			},
			requireLocalization: function(pack, name, locale){
				dojo.deprecated("dojo.requireLocalization()", "Deprecated. Use dojo/i18n! plugin plugin instead.", "2.0");
				locale = locale ? locale.toLowerCase() : dojo.locale;
				var load = !hasBundle(pack, name, locale);
				if (load) {
					net.jazz.ajax.xdloader.load_sync(pack + ".nls." + locale + "." + name, true);
				}
			}
		};
		function findLocalization(base, suffix) {
			var localization, bundle = dojo.getObject(base), elements = suffix.substr(1).split('_');
			for(var i = elements.length; i > 0; i--){
				var loc = elements.slice(0, i).join('_');
				if (bundle && dojo.exists(loc, bundle)) {
					localization = bundle[loc];
					break;
				}
			}
			if (!localization && bundle && bundle.ROOT)
				localization = bundle.ROOT;
			return localization;
		}
		function getAMDLocalization(pack, name) {
			pack = pack.replace(/\./g, "/");
			var i = name.lastIndexOf('/') + 1;
			return require("dojo/i18n!" + pack + "/" + name.substring(0, i) + "nls/" + name.substring(i));
		}
		dojo.requireLocalization = dojo.i18n.requireLocalization;
		dojo.getLocalization = dojo.i18n.getLocalization;
		return {
			normalizeLocale: dojo.i18n.normalizeLocale,
			getLocalization: getAMDLocalization
		};
	}
);
