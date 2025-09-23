/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
dojo.provide('lconn.foo');
dojo.require('lconn.bar');
// there can be anything really here
var a = 1, b = 2, averylongvariablename = 3;
lconn.foo = {
	three_hundred: 'sparta',
	bar: function(a, b, c) {
		console.log('this is %s!', this.three_hundred.toUpperCase());
	}
};
});