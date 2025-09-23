/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

var esprima = require('esprima'),
	escodegen = require('escodegen'),
	through = require('through2')

	function prettyPrint(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				if (typeof obj[i] === 'object') {
					console.log(i + ':')
					print(obj[i])
				} else {
					console.log(i + ':' + obj[i])
				}
			}
		}
	}

var RESERVED = [{
	match: 'int',
	replacement: '_int'
}, {
	match: 'short',
	replacement: '_short'
}]

function parse(obj, ind) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			if (typeof obj[i] === 'object') {
				parse(obj[i], (ind || '') + '\t')
			} else {
				if (i === 'name') {
					RESERVED.forEach(function(el) {
						if (obj[i] === el.match) obj[i] = el.replacement
					})
				}
			}
		}
	}
}

module.exports = function(options) {
	options || (options = {})

	return through.obj(function(file, encoding, callback) {
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		try {
			var code = String(file.contents),
				tree = esprima.parse(code, options.esprima || {})
			parse(tree);
			// tree.body.unshift(esprima.parse('/*\n AngularJS v1.3.0\n (c) 2010-2014 Google, Inc. http://angularjs.org\n License: MIT\n*/'))
			// tree.body.push(esprima.parse('//# sourceMappingURL=angular.min.js.map'))
			file.contents = new Buffer((function() {
				return escodegen.generate(tree)
			}()))
			this.push(file)

		} catch (e) {
			console.warn('Error caught from esprima.parse: ' + e)
			this.push(file)
		}

		return callback()
	})
}
