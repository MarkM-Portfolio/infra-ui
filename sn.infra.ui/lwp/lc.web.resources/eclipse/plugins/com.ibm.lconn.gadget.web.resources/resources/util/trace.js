/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.util.trace');

/**
 * Defines a set of logging utilities for other code. CRE defines some utilities
 * here so we want to leave this is a container specific class to take advantage of those
 */
com.ibm.lconn.gadget.util.trace = (function() {
	
	var api = {},
		global = dojo.global,
		mApply = null,
		mConsole = null;
	
	if (!global.console) {
		mConsole = { log: function(){} };
	} else {
		mConsole = console;
	}
	
	/*
	 * Magic call back to console
	 */
	if (dojo.isFunction(mConsole.log) && mConsole.log.apply) {
		mApply = function(method) {
			return dojo.hitch(mConsole, mConsole[method]);
		}
	} else /* Handle IE weirdness */ {
		mApply = function(method) {
			return function() {
				mConsole[method](Array.prototype.slice.call(arguments));
			};
		};
	}
	
	dojo.forEach(['log', 'debug', 'warn', 'error'], function(method) {
		if (global.console && (method !== 'debug' || dojo.config.isDebug === true)) { // only debug if debugging is enabled
			api[method] = (mConsole[method]) ? mApply(method) : mApply('log');
		} else {
			api[method] = function() {};
		}
	});	
	
	/**
	 * Enter tracing method.
	 * @memberOf com.ibm.lconn.gadget.util.trace
	 * @name entering
	 * @function
	 * @param cls {String} [required] The JS class object name
	 * @param methodName {String} [required] The name of the object / singleton method
	 * @param args {Object} {Array}
	 * @returns {Void}
	 */
	api.entering = function(cls, methodName, args) {
		if (!args) {
			api.debug('ENTER: ' + cls + '.' + methodName);
		} else {
			// TODO
			api.debug('ENTER: ' + cls + '.' + methodName);
		}
	};
		
	/**
	 * Exit tracing method.
	 * @memberOf com.ibm.lconn.gadget.util.trace
	 * @name exiting
	 * @function
	 * @param cls {String} [required] The JS class object name
	 * @param methodName {String} [required] The name of the object / singleton method
	 * @param retVal {Object} [optional] The return value of the method if it has one
	 * @returns {Void}
	 */
	api.exiting = function(cls, methodName, retVal) {
		if (!retVal) {
			api.debug('EXITING: ' + cls + '.' + methodName);
		} else {
			// TODO
			api.debug('EXITING: ' + cls + '.' + methodName);
		}
	};
	
	/**
	 * Exit tracing method when error occurs
	 * @memberOf com.ibm.lconn.gadget.util.trace
	 * @name throwing
	 * @function
	 * @param cls {String} [required] The JS class object name
	 * @param methodName {String} [required] The name of the object / singleton method
	 * @param error {Object} [optional] The error to be thown
	 * @returns {Void}
	 */
	api.throwing = function(cls, methodName, error) {
		if (!error) {
			api.debug('THOWING: ' + cls + '.' + methodName);
		} else {
			api.debug('THOWING: ' + cls + '.' + methodName + ' -- ERROR: ' + dojo.toJson(error));
		}
	};
	
	return api;
})();
