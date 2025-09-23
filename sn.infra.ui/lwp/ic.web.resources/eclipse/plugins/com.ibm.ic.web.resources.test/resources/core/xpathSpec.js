/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/lang",
   "dojo/cache",
   "dojo/text!../templates/1.xml",
   "dojo/text!../templates/2.xml",
   "ic-core/xpath",
   "ic-core/xslt"
], function (lang, cache, template1, template2, xpath, xslt) {

   var PREFIXES = [ {
      prefix : 'atom',
      nameSpaceURI : 'http://www.w3.org/2005/Atom'
   }, {
      prefix : 'app',
      nameSpaceURI : 'http://www.w3.org/2007/app'
   }, {
      prefix : 'snx',
      nameSpaceURI : 'http://www.ibm.com/xmlns/prod/sn'
   }, {
      prefix : 'os',
      nameSpaceURI : 'http://a9.com/-/spec/opensearch/1.1/'
   }, {
      prefix : 'xhtml',
      nameSpaceURI : 'http://www.w3.org/1999/xhtml'
   }, {
      prefix : 'thr',
      nameSpaceURI : 'http://purl.org/syndication/thread/1.0'
   } ];

   describe('the interface of ic-core/xpath', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(xpath.selectNodes)).toBeTruthy();
         expect(lang.isFunction(xpath.selectSingleNode)).toBeTruthy();
         expect(lang.isFunction(xpath.selectText)).toBeTruthy();
         expect(lang.isFunction(xpath.setNodeValue)).toBeTruthy();
         expect(lang.isFunction(xpath.isIE11)).toBeTruthy();
         expect(lang.isFunction(xpath.loadDOMIE11)).toBeTruthy();
      });
   });

   describe('the method ic-core/xpath.selectNodes()', function() {
      var nodes, oXML;
      beforeEach(function(){
         oXML = xslt.loadXmlString(template1);
      });

      it('throws an error if XMLDocument is null', function() {
         expect(function(){xpath.selectNodes('/', null, PREFIXES, null);}).toThrow();
      });

      it('returns top level nodes', function() {
         nodes = xpath.selectNodes('/', oXML, PREFIXES, null);
         expect(nodes.length).toBe(1);
         expect(nodes[0]).not.toBeNull();
      });

      it('returns first level nodes with same namespace', function() {
         nodes = xpath.selectNodes('/atom:feed', oXML, PREFIXES, null);
         expect(nodes.length).toBe(1);
         expect(nodes[0]).not.toBeNull();
         expect(nodes[0].nodeName).toBe('feed');
         expect(nodes[0].prefix).toBeNull();
         expect(nodes[0].localName).toBe('feed');
      });

      it('returns second level nodes with same namespace', function() {
         nodes = xpath.selectNodes('/atom:feed/atom:link', oXML, PREFIXES, null);
         expect(nodes.length).toBe(4);
         var i;
         for (i = 0; i < 4; i++) {
            expect(nodes[i]).not.toBeNull();
            expect(nodes[i].nodeName).toBe('link');
            expect(nodes[i].prefix).toBeNull();
            expect(nodes[i].localName).toBe('link');
            expect(nodes[i].textContent).toBe('');
         }
      });

      it('returns second level nodes with different namespace', function() {
         nodes = xpath.selectNodes('/atom:feed/os:totalResults', oXML, PREFIXES, null);
         expect(nodes.length).toBe(1);
         expect(nodes[0]).not.toBeNull();
         expect(nodes[0].nodeName).toBe('os:totalResults');
         expect(nodes[0].prefix).toBe('os');
         expect(nodes[0].localName).toBe('totalResults');
         expect(nodes[0].textContent).toBe('0');

         nodes = xpath.selectNodes('/atom:feed/os:startIndex', oXML, PREFIXES, null);
         expect(nodes.length).toBe(1);
         expect(nodes[0]).not.toBeNull();
         expect(nodes[0].nodeName).toBe('os:startIndex');
         expect(nodes[0].prefix).toBe('os');
         expect(nodes[0].localName).toBe('startIndex');
         expect(nodes[0].textContent).toBe('1');
      });

      it('returns third level nodes with same namespace', function() {
         nodes = xpath.selectNodes('/atom:feed/atom:author/atom:name', oXML, PREFIXES, null);
         expect(nodes.length).toBe(1);
         expect(nodes[0]).not.toBeNull();
         expect(nodes[0].nodeName).toBe('name');
         expect(nodes[0].prefix).toBeNull();
         expect(nodes[0].localName).toBe('name');
         expect(nodes[0].textContent).toBe('Jorge Manso');
      });

      it('returns third level nodes with different namespace', function() {
         nodes = xpath.selectNodes('/atom:feed/atom:author/snx:userid', oXML, PREFIXES, null);
         expect(nodes.length).toBe(1);
         expect(nodes[0]).not.toBeNull();
         expect(nodes[0].nodeName).toBe('snx:userid');
         expect(nodes[0].prefix).toBe('snx');
         expect(nodes[0].localName).toBe('userid');
         expect(nodes[0].textContent).toBe('1a4d1cc0-8301-1032-9a44-89fbb6fdad64');

         nodes = xpath.selectNodes('/atom:feed/atom:author/snx:userState', oXML, PREFIXES, null);
         expect(nodes.length).toBe(1);
         expect(nodes[0]).not.toBeNull();
         expect(nodes[0].nodeName).toBe('snx:userState');
         expect(nodes[0].prefix).toBe('snx');
         expect(nodes[0].localName).toBe('userState');
         expect(nodes[0].textContent).toBe('active');
      });
   });

   describe('the method ic-core/xpath.selectSingleNode()', function() {
      var node, oXML;
      beforeEach(function(){
         oXML = xslt.loadXmlString(template1);
      });

      it('throws an error if XMLDocument is null', function() {
         expect(function(){xpath.selectSingleNode('/', null, PREFIXES, null);}).toThrow();
      });

      it('returns a first level node with same namespace', function() {
         node = xpath.selectSingleNode('/atom:feed', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('feed');
         expect(node.prefix).toBeNull();
         expect(node.localName).toBe('feed');
      });

      it('returns text from a first level node with same namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/text()', oXML, PREFIXES, null);
         // Can have at most whitespace
         expect(node.nodeValue).toMatch(/\s*/);
      });

      it('returns a second level node with same namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/atom:link', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('link');
         expect(node.prefix).toBeNull();
         expect(node.localName).toBe('link');
         expect(node.textContent).toBe('');
      });

      it('returns text of a second level node with same namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/atom:link/text()', oXML, PREFIXES, null);
         expect(node).toBeNull();
      });

      it('returns a second level node with different namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/os:totalResults', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('os:totalResults');
         expect(node.prefix).toBe('os');
         expect(node.localName).toBe('totalResults');
         expect(node.textContent).toBe('0');

         node = xpath.selectSingleNode('/atom:feed/os:startIndex', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('os:startIndex');
         expect(node.prefix).toBe('os');
         expect(node.localName).toBe('startIndex');
         expect(node.textContent).toBe('1');
      });

      it('returns text of a second level node with different namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/os:totalResults/text()', oXML, PREFIXES, null);
         expect(node.nodeValue).toBe('0');

         node = xpath.selectSingleNode('/atom:feed/os:startIndex/text()', oXML, PREFIXES, null);
         expect(node.nodeValue).toBe('1');
      });

      it('returns a third level node with same namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/atom:author/atom:name', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('name');
         expect(node.prefix).toBeNull();
         expect(node.localName).toBe('name');
         expect(node.textContent).toBe('Jorge Manso');
      });

      it('returns text of a third level node with same namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/atom:author/atom:name/text()', oXML, PREFIXES, null);
         expect(node.nodeValue).toBe('Jorge Manso');
      });

      it('returns a third level node with different namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/atom:author/snx:userid', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('snx:userid');
         expect(node.prefix).toBe('snx');
         expect(node.localName).toBe('userid');
         expect(node.textContent).toBe('1a4d1cc0-8301-1032-9a44-89fbb6fdad64');

         node = xpath.selectSingleNode('/atom:feed/atom:author/snx:userState', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('snx:userState');
         expect(node.prefix).toBe('snx');
         expect(node.localName).toBe('userState');
         expect(node.textContent).toBe('active');
      });

      it('returns text of a third level node with different namespace', function() {
         node = xpath.selectSingleNode('/atom:feed/atom:author/snx:userid/text()', oXML, PREFIXES, null);
         expect(node.nodeValue).toBe('1a4d1cc0-8301-1032-9a44-89fbb6fdad64');

         node = xpath.selectSingleNode('/atom:feed/atom:author/snx:userState/text()', oXML, PREFIXES, null);
         expect(node.nodeValue).toBe('active');
      });
   });

   describe('the method ic-core/xpath.selectText()', function() {
      var str, oXML;
      beforeEach(function(){
         oXML = xslt.loadXmlString(template1);
      }); 

      it('throws an error if XMLDocument is null', function() {
         expect(function(){xpath.selectSingleNode('/', null, PREFIXES, null);}).toThrow();
      });

      it('returns the top level node', function() {
         str = xpath.selectText('/text()', oXML, PREFIXES, null);
         expect(str).toBeNull();
      });

      it('returns a first level node with same namespace', function() {
         str = xpath.selectText('/atom:feed/text()', oXML, PREFIXES, null);
         // Can have at most whitespace
         expect(str).toMatch(/\s*/);
      });

      it('returns a second level node with same namespace', function() {
         str = xpath.selectText('/atom:feed/atom:link/text()', oXML, PREFIXES, null);
         expect(str).toBeNull();
      });

      it('returns a second level node with different namespace', function() {
         str = xpath.selectText('/atom:feed/os:totalResults/text()', oXML, PREFIXES, null);
         expect(str).toBe('0');

         str = xpath.selectText('/atom:feed/os:startIndex/text()', oXML, PREFIXES, null);
         expect(str).toBe('1');
      });

      it('returns a third level node with same namespace', function() {
         str = xpath.selectText('/atom:feed/atom:author/atom:name/text()', oXML, PREFIXES, null);
         expect(str).toBe('Jorge Manso');
      });

      it('returns a third level node with different namespace', function() {
         str = xpath.selectText('/atom:feed/atom:author/snx:userid/text()', oXML, PREFIXES, null);
         expect(str).toBe('1a4d1cc0-8301-1032-9a44-89fbb6fdad64');

         str = xpath.selectText('/atom:feed/atom:author/snx:userState/text()', oXML, PREFIXES, null);
         expect(str).toBe('active');
      });
   });

   describe('the method ic-core/xpath.setNodeValue()', function() {
      var node, oXML;
      beforeEach(function(){
         oXML = xslt.loadXmlString(template1);
      });

      it('throws an error if XMLDocument is null', function() {
         expect(function(){xpath.setNodeValue('/', null, 'bar', PREFIXES, null);}).toThrow();
      });

      it('sets the value of a first level node with same namespace', function() {
         xpath.setNodeValue('/atom:feed/@foo', oXML, 'bar', PREFIXES, null);

         node = xpath.selectSingleNode('/atom:feed/@foo', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('foo');
         expect(node.prefix).toBeNull();
         expect(node.localName).toBe('foo');
         expect(node.nodeType).toBe(2);
         expect(node.nodeValue).toBe('bar');
      });

      it('sets the value of a second level node with same namespace', function() {
         xpath.setNodeValue('/atom:feed/atom:link/@rel', oXML, 'bar', PREFIXES, null);

         node = xpath.selectSingleNode('/atom:feed/atom:link/@rel', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('rel');
         expect(node.prefix).toBeNull();
         expect(node.localName).toBe('rel');
         expect(node.nodeType).toBe(2);
         expect(node.nodeValue).toBe('bar');
      });

      it('sets the value of a second level node with different namespace', function() {
         xpath.setNodeValue('/atom:feed/os:totalResults', oXML, 'bar', PREFIXES, null);

         node = xpath.selectSingleNode('/atom:feed/os:totalResults', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('os:totalResults');
         expect(node.prefix).toBe('os');
         expect(node.localName).toBe('totalResults');
         expect(node.textContent).toBe('bar');

         xpath.setNodeValue('/atom:feed/os:startIndex', oXML, 'bar', PREFIXES, null);

         node = xpath.selectSingleNode('/atom:feed/os:startIndex', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('os:startIndex');
         expect(node.prefix).toBe('os');
         expect(node.localName).toBe('startIndex');
         expect(node.textContent).toBe('bar');
      });

      it('sets the value of a third level node with same namespace', function() {
         xpath.setNodeValue('/atom:feed/atom:author/atom:name', oXML, 'bar', PREFIXES, null);

         node = xpath.selectSingleNode('/atom:feed/atom:author/atom:name', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('name');
         expect(node.prefix).toBeNull();
         expect(node.localName).toBe('name');
         expect(node.textContent).toBe('bar');
      });

      it('sets the value of a third level node with different namespace', function() {
         xpath.setNodeValue('/atom:feed/atom:author/snx:userid', oXML, 'bar', PREFIXES, null);

         node = xpath.selectSingleNode('/atom:feed/atom:author/snx:userid', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('snx:userid');
         expect(node.prefix).toBe('snx');
         expect(node.localName).toBe('userid');
         expect(node.textContent).toBe('bar');

         xpath.setNodeValue('/atom:feed/atom:author/snx:userState', oXML, 'bar', PREFIXES, null);

         node = xpath.selectSingleNode('/atom:feed/atom:author/snx:userState', oXML, PREFIXES, null);
         expect(node).not.toBeNull();
         expect(node.nodeName).toBe('snx:userState');
         expect(node.prefix).toBe('snx');
         expect(node.localName).toBe('userState');
         expect(node.textContent).toBe('bar');
      });
   });

});
