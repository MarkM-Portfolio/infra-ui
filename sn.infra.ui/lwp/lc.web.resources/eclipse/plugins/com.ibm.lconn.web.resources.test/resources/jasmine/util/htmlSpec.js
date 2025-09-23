/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.util.htmlSpec");

dojo.require("lconn.core.util.html");
dojo.require("dojo.cache");

(function(htmlUtil) {

   describe("the interface of lconn.core.util.html", function() {
      it("implements the expected methods", function() {
         expect(htmlUtil.highlight).toEqual(jasmine.any(Function));
         expect(htmlUtil.encodeHtml).toEqual(jasmine.any(Function));
         expect(htmlUtil.decodeHtml).toEqual(jasmine.any(Function));
      });
   });

   describe("the method lconn.core.util.html.getDirectionCode()", function() {
      var _isBodyLtr;
      beforeEach(function() {
         _isBodyLtr = dojo._isBodyLtr;
      });
      afterEach(function() {
         dojo._isBodyLtr = _isBodyLtr;
      });
      it("returns empty string in LTR", function() {
         expect(htmlUtil.getDirectionCode()).toBe("");
      });
      it("returns \\u200F in RTL", function() {
         dojo._isBodyLtr = function() {
            return false;
         };
         expect(htmlUtil.getDirectionCode()).toBe("\u200F");
      });
   });

   describe("the method lconn.core.util.html.isEvent()", function() {
      it("returns true if the argument is event-like", function() {
         expect(htmlUtil.isEvent()).toBeFalsy();
         expect(htmlUtil.isEvent(null)).toBeFalsy();
         expect(htmlUtil.isEvent({})).toBeFalsy();

         expect(htmlUtil.isEvent({
            target : null
         })).toBeTruthy();
         expect(htmlUtil.isEvent({
            target : ''
         })).toBeTruthy();
         expect(htmlUtil.isEvent({
            bubbles : null
         })).toBeTruthy();
         expect(htmlUtil.isEvent({
            bubbles : true
         })).toBeTruthy();
      });
   });

   describe("the method lconn.core.util.html.encodeSpaces()", function() {
      it("encodes plain and unicode spaces", function() {
         expect(htmlUtil.encodeSpaces(null)).toBe(null);
         expect(htmlUtil.encodeSpaces('')).toBe('');
         expect(htmlUtil.encodeSpaces('RIP Leonard Nimoy')).toBe('RIP\u00a0Leonard\u00a0Nimoy');
         expect(htmlUtil.encodeSpaces('RIP  Leonard  Nimoy')).toBe('RIP\u00a0\u00a0Leonard\u00a0\u00a0Nimoy');
         expect(htmlUtil.encodeSpaces('RIP\u3000Leonard Nimoy')).toBe('RIP\u00a0Leonard\u00a0Nimoy');
         expect(htmlUtil.encodeSpaces('RIP \u3000Leonard\u3000\u3000Nimoy')).toBe('RIP\u00a0\u00a0Leonard\u00a0\u00a0Nimoy');
      });
   });

   describe("the method lconn.core.util.html.encodeMultiSpaces()", function() {
      it("encodes plain and unicode spaces", function() {
         expect(htmlUtil.encodeMultiSpaces(null)).toBe(null);
         expect(htmlUtil.encodeMultiSpaces('')).toBe('');
         expect(htmlUtil.encodeMultiSpaces('RIP Leonard Nimoy')).toBe('RIP Leonard Nimoy');
         expect(htmlUtil.encodeMultiSpaces('RIP  Leonard  Nimoy')).toBe('RIP \u00a0Leonard \u00a0Nimoy');
         expect(htmlUtil.encodeMultiSpaces('RIP\u3000Leonard Nimoy')).toBe('RIP\u3000Leonard Nimoy');
         expect(htmlUtil.encodeMultiSpaces('RIP \u3000Leonard\u3000 Nimoy')).toBe('RIP \u00a0Leonard \u00a0Nimoy');
      });
   });

   describe("the method lconn.core.util.html.highlight()", function() {
      it("correctly highlights matches", function() {
         expect(htmlUtil.highlight('Derek W. Carr', 'Derek Carr')).toBe('<b>Derek</b> W. <b>Carr</b>');
         expect(htmlUtil.highlight('Tracy L. Rankin', 'Rankin')).toBe('Tracy L. <b>Rankin</b>');
         expect(htmlUtil.highlight('Cecilia Bollini', 'Cecilia')).toBe('<b>Cecilia</b> Bollini');
         expect(htmlUtil.highlight('Jorge Manso Oliva', 'Jorge Manso Oliva')).toBe('<b>Jorge</b> <b>Manso</b> <b>Oliva</b>');
      });
      it("highlights with the tag of choice", function() {
         expect(htmlUtil.highlight('Cameron Bosnic', 'Cameron', false, 'strong')).toBe('<strong>Cameron</strong> Bosnic');
         expect(htmlUtil.highlight('Richa Verma', 'Verma', false, 'em')).toBe('Richa <em>Verma</em>');
      });
      it("returns the string if no matches are found", function() {
         expect(htmlUtil.highlight('Ryan A. Davis', 'Clayton')).toBe('Ryan A. Davis');
         expect(htmlUtil.highlight('Fang Lu', 'Bilikiss')).toBe('Fang Lu');
      });
      it("returns an encoded string if encoded is true", function() {
         expect(htmlUtil.highlight('<Functional Id>', 'Id', true)).toBe('&lt;Functional <b>Id</b>&gt;');
         expect(htmlUtil.highlight('Tom & Jerry', 'Tom', true)).toBe('<b>Tom</b> &amp; Jerry');
      });
   });

   describe("the method lconn.core.util.html.decodeHtml()", function() {
      it("correctly decodes HTML", function() {
         expect(htmlUtil.decodeHtml('&lt;b&gt;Bold&lt;/b&gt;')).toBe('<b>Bold</b>');
      });
      it("returns the empty string if no argument is passed", function() {
         expect(htmlUtil.decodeHtml()).toBe('');
      });
   });

   describe("the method lconn.core.util.html.encodeHtml()", function() {
      it("correctly encodes HTML", function() {
         expect(htmlUtil.encodeHtml('<b>Bold</b>')).toBe('&lt;b&gt;Bold&lt;/b&gt;');
      });
      it("returns the empty string if no argument is passed", function() {
         expect(htmlUtil.encodeHtml()).toBe('');
      });
   });

   describe("the method lconn.core.util.html.encodeHtmlAttribute()", function() {
      it("correctly encodes HTML attributes", function() {
         expect(htmlUtil.encodeHtmlAttribute('<b>Bold "Attributes"</b>')).toBe('&lt;b&gt;Bold &quot;Attributes&quot;&lt;/b&gt;');
      });
      it("returns the empty string if no argument is passed", function() {
         expect(htmlUtil.encodeHtmlAttribute()).toBe('');
      });
   });

   describe("the method lconn.core.util.html.createTextNode()",
      function() {
         var el;
         beforeEach(function() {
            el = dojo.create('div');
         });
         it("correctly splits sections with <br> tags", function() {
            htmlUtil.createTextNode(document, el, 'One\u000aTwo\u000aThree');
            expect(el.childNodes).not.toBeNull();
            expect(el.childNodes.length).toBe(5);
            expect(el.getElementsByTagName('br')).not.toBeNull();
            expect(el.getElementsByTagName('br').length).toBe(2);
         });
         it("correctly splits sections with spaces", function() {
            htmlUtil.createTextNode(document, el, 'One\u000aTwo\u000aThree', true);
            expect(el.childNodes).not.toBeNull();
            expect(el.childNodes.length).toBe(5);
            expect(el.getElementsByTagName('br')).not.toBeNull();
            expect(el.getElementsByTagName('br').length).toBe(0);
            var values = [
                  'One',
                  ' ',
                  'Two',
                  ' ',
                  'Three'
            ];
            for (var i = 0; i < values.length; i++) {
               expect(el.childNodes[i].nodeType).toBe(3);
               expect(el.childNodes[i].nodeValue).toBe(values[i]);
            }
         });
         it("correctly recognizes terminator characters in URLs",
            function() {
               htmlUtil
                     .createTextNode(document,
                        el,
                        'Regression test http://rb-tips3.de.bosch.com/BPDetail.dll?Page?LC=0&BP=H2----S8ED--CS- [PMR 09022,070,724] URLs ending with dash "-" are not working',
                        true);
               expect(el.childNodes).not.toBeNull();
               expect(el.childNodes.length).toBe(3);
               expect(el.getElementsByTagName('br')).not.toBeNull();
               expect(el.getElementsByTagName('br').length).toBe(0);
               var values = [
                     'Regression test ',
                     '<IGNORE>',
                     ' [PMR 09022,070,724] URLs ending with dash "-" are not working'
               ];

               expect(el.childNodes[0].nodeType).toBe(3);
               expect(el.childNodes[0].nodeValue).toBe(values[0]);
               expect(el.childNodes[1].nodeType).toBe(1);
               expect(el.childNodes[1].tagName).toBe('A');
               expect(el.childNodes[1].href).toBe('http://rb-tips3.de.bosch.com/BPDetail.dll?Page?LC=0&BP=H2----S8ED--CS-');
               expect(el.childNodes[2].nodeType).toBe(3);
               expect(el.childNodes[2].nodeValue).toBe(values[2]);
            });
      });

   describe("the method lconn.core.util.html.confirm()", function() {
      it("calls window.confirm()", function() {
         spyOn(window, 'confirm');
         htmlUtil.confirm('foo');
         expect(window.confirm).toHaveBeenCalledWith('foo');
      });
      it("calls the onsuccess argument when confirm() returns true", function() {
         var ret = true;
         spyOn(window, 'confirm').and.returnValue(ret);
         var onsuccess = jasmine.createSpy('onsuccess');
         var oncancel = jasmine.createSpy('oncancel');

         htmlUtil.confirm('foo', onsuccess, oncancel);
         expect(window.confirm).toHaveBeenCalledWith('foo');
         expect(onsuccess).toHaveBeenCalled();
      });
      it("calls the oncancel argument when confirm() returns false", function() {
         var ret = false;
         spyOn(window, 'confirm').and.returnValue(ret);
         var onsuccess = jasmine.createSpy('onsuccess');
         var oncancel = jasmine.createSpy('oncancel');

         htmlUtil.confirm('foo', onsuccess, oncancel);
         expect(window.confirm).toHaveBeenCalledWith('foo');
         expect(oncancel).toHaveBeenCalled();
      });
   });

   describe("the method lconn.core.util.html.alert()", function() {
      it("calls window.alert()", function() {
         spyOn(window, 'alert');
         htmlUtil.alert('foo');
         expect(window.alert).toHaveBeenCalledWith('foo');
      });
   });

   describe("the method lconn.core.util.html.substitute()", function() {
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
   });
}(lconn.core.util.html));
