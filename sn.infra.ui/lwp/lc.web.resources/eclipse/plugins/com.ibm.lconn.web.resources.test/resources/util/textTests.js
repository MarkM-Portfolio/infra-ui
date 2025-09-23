/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.util.textTests");

dojo.require("doh.runner");
dojo.require("lconn.core.util.text");

(function(text) {
   doh.register("lconn.test.util.textTests", [ {
      name : 'test interface',
      runTest : function() {
         doh.t(dojo.isFunction(text.trimToByteLength));
         doh.t(dojo.isFunction(text.getByteLength));
         doh.t(dojo.isFunction(text.possessive));
         doh.t(dojo.isFunction(text.getExtension));
         doh.t(dojo.isFunction(text.trimExtension));
         doh.t(dojo.isFunction(text.getFilename));
         doh.t(dojo.isFunction(text.trimToLength));
         doh.t(dojo.isFunction(text.trim));
         doh.t(dojo.isFunction(text.trimEnd));
         doh.t(dojo.isFunction(text.parseInt));
         doh.t(dojo.isFunction(text.parseFloat));
         doh.t(dojo.isFunction(text.formatSize));
         doh.t(dojo.isFunction(text.length));
         doh.t(dojo.isFunction(text.lengthUtf8));
         doh.t(dojo.isFunction(text.getCharIndexForUtf8Index));
         doh.t(dojo.isFunction(text.encodeHeaderUtf8));
         doh.t(dojo.isFunction(text.uniquifyStringList));
      }
   }, {
      name : 'test trimToByteLength()',
      runTest : function() {
         var str = "text";
         doh.is('t...', text.trimToByteLength(str, 4));
         doh.is('text', text.trimToByteLength(str, 8));
      }
   }, {
      name : 'test getByteLength()',
      runTest : function() {
         doh.is('4', text.getByteLength("text"));
      }
   }, {
      name : 'test possessive()',
      runTest : function() {
         doh.is("text's", text.possessive("text"));
         doh.is("'", text.possessive(""));
      }
   }, {
	  name : 'test getExtension()',
	  runTest : function() {
	     doh.is("", text.getExtension("text"));
	     doh.is('js', text.getExtension("text.js"));
	  }
   }, {
	  name : 'test trimExtension()',
	  runTest : function() {
		 doh.is('text', text.trimExtension("text.js"));
	  }
   }, {
      name : 'test getFilename()',
      runTest : function() {
         doh.is('text', text.getFilename("\\asdasd/filename\\text"));
         doh.is('', text.getFilename("\text\\"));
      }
   }, {
	  name : 'test trimToLength()',
	  runTest : function() {
	     var str = "text case number one";
	     doh.is('...', text.trimToLength(str, 2, 2));
	     doh.is('tex...', text.trimToLength(str, 6, 6));
	  }
   }, {
	  name : 'test trim()',
	  runTest : function() {
	     doh.is('text   text', text.trim("   text   text   "));
	  }
   }, {
	  name : 'test trimEnd()',
	  runTest : function() {
	     doh.is("   text   text", text.trimEnd("   text   text   "));
	  }
   }, {
	  name : 'test parseInt()',
	  runTest : function() {
	     doh.is('10', text.parseInt("10",undefined));
	     doh.is('0', text.parseInt("a",undefined));
	     doh.is('10', text.parseInt("10",2));
	  }
   }, {
	  name : 'test parseFloat()',
	  runTest : function() {
		 doh.is('10.01', text.parseFloat("10.01",undefined));
		 doh.is('0', text.parseFloat("a.01",undefined));
		 doh.is('10.01', text.parseFloat("10.01",2));
	  }
   }, {
      name : 'test formatSize()',
      runTest : function() {
         //doh.is('text', text.getFilename("\\asdasd/filename\\text"));
         //doh.is('', text.getFilename("\text\\"));
      }
   }, {
	  name : 'test length()',
	  runTest : function() {
	     doh.is('5', text.length("ŒŽ™ßЉ"));
	  }
   }, {
	  name : 'test lengthUtf8()',
	  runTest : function() {
	     doh.is('11', text.lengthUtf8("ŒŽ™ßЉ"));
	  }
   }, {
	  name : 'test getCharIndexForUtf8Index()',
	  runTest : function() {
	     doh.is('-1', text.getCharIndexForUtf8Index("ŒŽ™ßЉ", 11));
	     doh.is('2', text.getCharIndexForUtf8Index("ŒŽ™ßЉ", 4));
	  }
   }, {
	  name : 'test encodeHeaderUtf8()',
	  runTest : function() {
		 doh.is("=?UTF-8?Q?=C5=92=C5=BD=E2=84=A2=C3=9F=D0=89?=", text.encodeHeaderUtf8("ŒŽ™ßЉ"));
	  }
   }, {
      name : 'test uniquifyStringList()',
      runTest : function() {
         doh.is('0,1,2,3', text.uniquifyStringList(["a","d","s","ŒŽ™ßЉ"]));
      }
   }]);
}(lconn.core.util.text));
