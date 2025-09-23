/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define(["dojo/request/iframe"], function(iframe) {
	function _iframe(url, opts, callback) {
		iframe(url, opts).then(callback);
	}
	return _iframe;
});
