/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/util/html",
  "ic-share/fileviewer/util/history",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "dojo/_base/array",
  "ic-share/fileviewer/config/globals"
], function(htmlUtil, historyUtil, domConstruct, lang, array, globals) {

   describe("the method fileviewer/util/html::substitute()", function() {
      var formatter = {
         formatString : function(str) {
            return str.toUpperCase();
         }
      };
      var transform = function(value, key) {
         switch (key) {
            case 'product':
               return "&quot;" + value + "&quot;";
            case 'version':
               return "(v." + value + ")";
         }
      };

      it("correctly substitutes one placeholder", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections is a great ${product}', {
            product : 'product'
         });
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('product');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections is a great product');
      });

      it("correctly substitutes two placeholders", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product}', {
            version : '5.0',
            product : 'product'
         });
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('5.0');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('product');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections 5.0 is a great product');
      });

      it("correctly substitutes two placeholders, with functions", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product}', {
            version : function() {
               return '5.0';
            },
            product : function() {
               return 'product';
            }
         });
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('5.0');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('product');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections 5.0 is a great product');
      });

      it("correctly substitutes two placeholders, with transform", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product}', {
            version : '5.0',
            product : 'product'
         }, transform);
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('(v.5.0)');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('&quot;product&quot;');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         // Escaped entities!
         expect(el.innerHTML).toEqual('Connections (v.5.0) is a great &amp;quot;product&amp;quot;');
      });

      it("correctly substitutes two placeholders, with formatter", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product:formatString}', {
            version : '5.0',
            product : 'product'
         }, null, formatter);
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('5.0');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('PRODUCT');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections 5.0 is a great PRODUCT');
      });

      it("correctly substitutes two placeholders, with functions and transform", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product}', {
            version : function() {
               return '5.0';
            },
            product : function() {
               return 'product';
            }
         }, transform);
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('(v.5.0)');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('&quot;product&quot;');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         // Escaped entities!
         expect(el.innerHTML).toEqual('Connections (v.5.0) is a great &amp;quot;product&amp;quot;');
      });

      it("correctly substitutes two placeholders, with transform and formatter", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product:formatString}', {
            version : '5.0',
            product : 'product'
         }, transform, formatter);
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('(v.5.0)');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('&quot;PRODUCT&quot;');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections (v.5.0) is a great &amp;quot;PRODUCT&amp;quot;');
      });

      it("correctly substitutes two placeholders, with functions and formatter", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product:formatString}', {
            version : function() {
               return '5.0';
            },
            product : function() {
               return 'product';
            }
         }, null, formatter);
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('5.0');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('PRODUCT');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections 5.0 is a great PRODUCT');
      });

      it("correctly substitutes two placeholders, with functions, transform and formatter", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections ${version} is a great ${product:formatString}', {
            version : function() {
               return '5.0';
            },
            product : function() {
               return 'product';
            }
         }, transform, formatter);
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to
         // <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('(v.5.0)');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('&quot;PRODUCT&quot;');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections (v.5.0) is a great &amp;quot;PRODUCT&amp;quot;');
      });

      it("correctly substitutes two placeholders, with custom regex", function() {
         var el = dojo.create('div');
         htmlUtil.substitute(document, el, 'Connections {version} is a great {product}', {
            version : '5.0',
            product : 'product'
         }, null, null, /\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g);
         expect(el.childNodes).not.toBeNull();
         // Presence of placeholders causes several text nodes to be appended to <code>el</code>.
         // If a template has N placeholders, there will be 2*N+1 text nodes.
         var i = 0;
         expect(el.childNodes[i++].nodeValue).toEqual('Connections ');
         expect(el.childNodes[i++].nodeValue).toEqual('5.0');
         expect(el.childNodes[i++].nodeValue).toEqual(' is a great ');
         expect(el.childNodes[i++].nodeValue).toEqual('product');
         expect(el.childNodes[i++].nodeValue).toEqual('');
         expect(el.childNodes.length).toBe(i);
         expect(el.innerHTML).toEqual('Connections 5.0 is a great product');
      });
   });
   
   describe("the method fileviewer/util/html::createTextNode()", function() {
     
     it("should create a single text node attached to 'node'", function () {
       var node = document.createDocumentFragment(),
         text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
         		"incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
         		"ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate " +
         		"velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidat";
       htmlUtil.createTextNode(document, node, text);
       expect(node.childNodes[0].data).toEqual(text);
     });
     
     xit("should create 2 textNodes and one link attached to 'node'", function () {
       var compareString = "",
         node = document.createDocumentFragment(),
         text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
            "incididunt ut labore et dolore www.magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
            "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate " +
            "velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidat";
       htmlUtil.createTextNode(document, node, text);
       compareString += node.childNodes[0].data;
       compareString += node.childNodes[1].innerHTML;
       compareString += node.childNodes[2].data;
       

       expect(compareString).toEqual(text);
     });
   });
   
   describe("the method fileviewer/util/html::processLink()", function () {
     var createLink = function (url) {
       return domConstruct.create("a", {href: url, innerHTML: "Test Link"});
     };
     
     var testLinkTarget = function (differentPageUrls, samePageUrls) {
       array.forEach(differentPageUrls, function (url, i) {
         var link = createLink(url);
         it("should add attribute target=_blank for url " + url, function () {
           htmlUtil.processLink(link);
           expect(link.hasAttribute("target")).toBe(true);
         });
       });
       
       array.forEach(samePageUrls, function (url, i) {
         var link = createLink(url);
         it("should not add attribute target=_blank for url " + url, function () {
           htmlUtil.processLink(link);
           expect(link.hasAttribute("target")).toBe(false);
         });
       });
     };
     
     beforeEach(function () {
       globals.coreServices = {
         communities: {
           url: "http://docs.rtp.raleigh.ibm.com/communities"
         }
       };
       htmlUtil._getWidgetDefId = function (id) {
         if (id === "Wd9fdf451e24b_4845_a029_64426ddc108a") {
           return "Files";
         }
         return id;
       };
     });
     
     describe("when in community files", function () {
       beforeEach(function () {
         historyUtil.backgroundPageUrl = "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a";
       });
       
       var differentPageUrls = [
         "http://docs.rtp.raleigh.ibm.com/profiles/html/profileView.do?userid=a8cff540-bf3f-1034-9cca-e653d3a7c698",
         "http://docs.rtp.raleigh.ibm.com/files/basic/api/document/e7c98ac8-c7bd-4715-a12c-f3f4b86aad08/feed?category=comment",
         "http://docs.rtp.raleigh.ibm.com/files/app",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=Members",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=W259dea2a5960_4e94_919c_3086654a455b",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=d7e1bd12-d184-4628-a8e9-7ac65ee20fb4"
       ];
       
       var samePageUrls = [
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a&tag=asdfasd&pivot=all",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all"
       ];
       
       testLinkTarget(differentPageUrls, samePageUrls);
     });
     
     describe("when on the community overview page", function () {
       beforeEach(function () {
         historyUtil.backgroundPageUrl = "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff";
       });
       
       var differentPageUrls = [
         "http://docs.rtp.raleigh.ibm.com/profiles/html/profileView.do?userid=a8cff540-bf3f-1034-9cca-e653d3a7c698",
         "http://docs.rtp.raleigh.ibm.com/files/basic/api/document/e7c98ac8-c7bd-4715-a12c-f3f4b86aad08/feed?category=comment",
         "http://docs.rtp.raleigh.ibm.com/files/app",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=Members",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=W259dea2a5960_4e94_919c_3086654a455b",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=d7e1bd12-d184-4628-a8e9-7ac65ee20fb4"
       ];
       
       var samePageUrls = [
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a&tag=asdfasd&pivot=all",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all"
       ];
       
       testLinkTarget(differentPageUrls, samePageUrls);
     });
     
     describe("when in another community widget", function () {
       beforeEach(function () {
         historyUtil.backgroundPageUrl = "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Members";
       });
       
       var differentPageUrls = [
         "http://docs.rtp.raleigh.ibm.com/profiles/html/profileView.do?userid=a8cff540-bf3f-1034-9cca-e653d3a7c698",
         "http://docs.rtp.raleigh.ibm.com/files/basic/api/document/e7c98ac8-c7bd-4715-a12c-f3f4b86aad08/feed?category=comment",
         "http://docs.rtp.raleigh.ibm.com/files/app",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=Members",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=W259dea2a5960_4e94_919c_3086654a455b",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=d7e1bd12-d184-4628-a8e9-7ac65ee20fb4",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a&tag=asdfasd&pivot=all",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a"
       ];
       
       var samePageUrls = [
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all"
       ];
       
       testLinkTarget(differentPageUrls, samePageUrls);
     });
     
     describe("when in the Files app", function () {
       beforeEach(function () {
         historyUtil.backgroundPageUrl = "http://docs.rtp.raleigh.ibm.com/files/app#/person/a8cff540-bf3f-1034-9cca-e653d3a7c698";
       });
       
       var differentPageUrls = [
         "http://docs.rtp.raleigh.ibm.com/profiles/html/profileView.do?userid=a8cff540-bf3f-1034-9cca-e653d3a7c698",
         "http://docs.rtp.raleigh.ibm.com/files/basic/api/document/e7c98ac8-c7bd-4715-a12c-f3f4b86aad08/feed?category=comment",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=Members",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=W259dea2a5960_4e94_919c_3086654a455b",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=d7e1bd12-d184-4628-a8e9-7ac65ee20fb4",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a&tag=asdfasd&pivot=all",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff"
       ];
       
       var samePageUrls = [
         "http://docs.rtp.raleigh.ibm.com/files/app#/person/a8cff540-bf3f-1034-9cca-e653d3a7c698?tag=asdf",
         "http://docs.rtp.raleigh.ibm.com/files/app#/pinnedfiles",
         "http://docs.rtp.raleigh.ibm.com/files/app#/file/ff107c09-8519-43f2-9d4a-2f37aa9551ff"
       ];
       
       testLinkTarget(differentPageUrls, samePageUrls);
     });
     
     describe("when in another application", function () {
       beforeEach(function () {
         historyUtil.backgroundPageUrl = "http://docs.rtp.raleigh.ibm.com/wikis/home?lang=en#!/wiki/W7781db36dcb5_418d_a34a_4dc49e6fa630";
       });
       
       var differentPageUrls = [
         "http://docs.rtp.raleigh.ibm.com/profiles/html/profileView.do?userid=a8cff540-bf3f-1034-9cca-e653d3a7c698",
         "http://docs.rtp.raleigh.ibm.com/files/basic/api/document/e7c98ac8-c7bd-4715-a12c-f3f4b86aad08/feed?category=comment",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=Members",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/community/updates?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff&filter=all#fullpageWidgetId=W259dea2a5960_4e94_919c_3086654a455b",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communitystart?communityUuid=d7e1bd12-d184-4628-a8e9-7ac65ee20fb4",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a&tag=asdfasd&pivot=all",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff#fullpageWidgetId=Wd9fdf451e24b_4845_a029_64426ddc108a",
         "http://docs.rtp.raleigh.ibm.com/communities/service/html/communityoverview?communityUuid=6ebba948-e12e-4da4-a858-eef4f3b8a8ff",
         "http://docs.rtp.raleigh.ibm.com/files/app#/person/a8cff540-bf3f-1034-9cca-e653d3a7c698?tag=asdf",
         "http://docs.rtp.raleigh.ibm.com/files/app#/pinnedfiles",
         "http://docs.rtp.raleigh.ibm.com/files/app#/file/ff107c09-8519-43f2-9d4a-2f37aa9551ff"
       ];
       
       var samePageUrls = [
         "http://docs.rtp.raleigh.ibm.com/wikis/home?lang=en#!/wiki/W7781db36dcb5_418d_a34a_4dc49e6fa630",
         "http://docs.rtp.raleigh.ibm.com/wikis/home?lang=en#!/wiki/W7781db36dcb5_418d_a34a_4dc49e6fa630/page/asdfasdf"
       ];
       
       testLinkTarget(differentPageUrls, samePageUrls);
     });
   });
});
