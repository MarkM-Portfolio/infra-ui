/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/cache",
      "dojo/string",
      "dojo/text!ic-core/templates/bizcard.html",
      "dojo/text!ic-core/widget/mentions/templates/plaintext.html",
      "dojo/text!ic-core/widget/mentions/templates/microformat.html",
      "ic-core/util/text",
      "ic-ui/layout/people" // FIXME: core modules must not depend on coreui
],
   function(dojo, cache, string, templateBizcard, templatePlaintext, templateMicroformat, text, people) {

      describe("the interface of ic-core/util/text", function() {
         it("implements the expected methods", function() {
            expect(text.trimToByteLength).toEqual(jasmine.any(Function));
            expect(text.getByteLength).toEqual(jasmine.any(Function));
            expect(text.possessive).toEqual(jasmine.any(Function));
            expect(text.getExtension).toEqual(jasmine.any(Function));
            expect(text.trimExtension).toEqual(jasmine.any(Function));
            expect(text.getFilename).toEqual(jasmine.any(Function));
            expect(text.trimToLength).toEqual(jasmine.any(Function));
            expect(text.trim).toEqual(jasmine.any(Function));
            expect(text.trimEnd).toEqual(jasmine.any(Function));
            expect(text.parseInt).toEqual(jasmine.any(Function));
            expect(text.parseFloat).toEqual(jasmine.any(Function));
            expect(text.formatSize).toEqual(jasmine.any(Function));
            expect(text.length).toEqual(jasmine.any(Function));
            expect(text.lengthUtf8).toEqual(jasmine.any(Function));
            expect(text.getCharIndexForUtf8Index).toEqual(jasmine.any(Function));
            expect(text.encodeHeaderUtf8).toEqual(jasmine.any(Function));
            expect(text.uniquifyStringList).toEqual(jasmine.any(Function));
            expect(text.htmlify).toEqual(jasmine.any(Function));
            expect(text.htmlifyMentions).toEqual(jasmine.any(Function));
         });
      });

      describe("the method ic-core/util/text.trimToByteLength()", function() {
         it("trims the string correctly", function() {
            expect(text.trimToByteLength('text', 4)).toBe('t...');
            expect(text.trimToByteLength('text', 8)).toBe('text');
            expect(text.trimToByteLength('text', 0)).toBe('');
            expect(text.trimToByteLength('text', -1)).toBe('');
         });
      });

      describe("the method ic-core/util/text.getByteLength()", function() {
         it("returns the lengt of a string", function() {
            expect(text.getByteLength("text")).toBe(4);
         });
      });

      describe("the method ic-core/util/text.possessive()", function() {
         it("adds the 's to a string", function() {
            expect(text.possessive("text")).toBe("text's");
            expect(text.possessive("specs")).toBe("specs'");
            expect(text.possessive("")).toBe("'");
         });
      });

      describe("the method ic-core/util/text.getExtension()", function() {
         it("returns the extension of a file", function() {
            expect(text.getExtension("")).toBe("");
            expect(text.getExtension("text")).toBe("");
            expect(text.getExtension("text.js")).toBe("js");
         });
      });

      describe("the method ic-core/util/text.trimExtension()", function() {
         it("removes the extension from a file", function() {
            expect(text.trimExtension("")).toBe("");
            expect(text.trimExtension("text")).toBe('text');
            expect(text.trimExtension("text.js")).toBe('text');
         });
      });

      describe("the method ic-core/util/text.getFilename()", function() {
         it("return the name of a file", function() {
            expect(text.getFilename("")).toBe("");
            expect(text.getFilename("text")).toBe('text');
            expect(text.getFilename("\\asdasd/filename\\text")).toBe('text');
            expect(text.getFilename("\text\\")).toBe('');
         });
      });

      describe("the method ic-core/util/text.trimToLength()", function() {
         it("trims the string and adds '...' at the end", function() {
            expect(text.trimToLength("")).toBe("");
            var str = "text case number one";
            expect(text.trimToLength(str, 2, 2)).toBe('...');
            expect(text.trimToLength(str, 6, 6)).toBe('tex...');
         });
      });

      describe("the method ic-core/util/text.trim()", function() {
         it("removes blank spaces", function() {
            expect(text.trim("")).toBe("");
            expect(text.trim("text")).toBe('text');
            expect(text.trim("   text   text   ")).toBe('text   text');
         });
      });

      describe("the method ic-core/util/text.trimEnd()", function() {
         it("removes blank spaces at the end of the string", function() {
            expect(text.trimEnd("")).toBe("");
            expect(text.trimEnd("text")).toBe('text');
            expect(text.trimEnd("   text   text   ")).toBe('   text   text');
         });
      });

      describe("the method ic-core/util/text.parseInt()", function() {
         it("returns an Integer", function() {
            expect(text.parseInt("10")).toBe(10);
            expect(text.parseInt("aasda")).toBe(0);
            expect(text.parseInt("10", 2)).toBe(10);
            expect(text.parseInt(undefined, 2)).toBe(2);
         });
      });

      describe("the method ic-core/util/text.parseFloat()", function() {
         it("returns a Float", function() {
            expect(text.parseFloat("10.01")).toBe(10.01);
            expect(text.parseFloat("a.01")).toBe(0);
            expect(text.parseFloat("10.01", 2)).toBe(10.01);
            expect(text.parseFloat(undefined, 2)).toBe(2);
         });
      });

      describe("the method ic-core/util/text.length()", function() {
         it("returns the length of a string", function() {
            expect(text.length('\u0152\u017D\u2122\xDF\u0409')).toBe(5);
         });
      });

      describe("the method ic-core/util/text.lengthUtf8()", function() {
         it("returns the length of a string in UTF8", function() {
            expect(text.lengthUtf8('\u0152\u017D\u2122\xDF\u0409')).toBe(11);
         });
      });

      describe("the method ic-core/util/text.getCharIndexForUtf8Index()", function() {
         it("returns the char index for UTF8", function() {
            expect(text.getCharIndexForUtf8Index('\u0152\u017D\u2122\xDF\u0409', 11)).toBe(-1);
            expect(text.getCharIndexForUtf8Index('\u0152\u017D\u2122\u00DF\u0409', 4)).toBe(2);
         });
      });

      describe("the method ic-core/util/text.encodeHeaderUtf8()", function() {
         it("encodes a string to UTF8 to be inlcuded in the url", function() {
            expect(text.encodeHeaderUtf8('\u0152\u017D\u2122\xDF\u0409')).toBe("=?UTF-8?Q?=C5=92=C5=BD=E2=84=A2=C3=9F=D0=89?=");
         });
      });

      describe("the method ic-core/util/text.uniquifyStringList()", function() {
         it("returns the unique keys of an array", function() {
            expect(text.uniquifyStringList()).toEqual([]);
            expect(text.uniquifyStringList([])).toEqual([]);
            expect(text.uniquifyStringList([
                  "a",
                  "d",
                  "s",
                  '\u0152\u017D\u2122\xDF\u0409'
            ])).toEqual([
                  '0',
                  '1',
                  '2',
                  '3'
            ]);
         });
      });

      describe("the method formatSize()",
         function() {
            var TEN_KB = 10 * 1024, TEN_MB = 1024 * TEN_KB, TEN_GB = 1024 * TEN_MB, TEN_TB = 1024 * TEN_GB;
            var LESS_THAN_TEN_FLOAT_KB = 1.2345 * 1024, LESS_THAN_TEN_FLOAT_MB = 1024 * LESS_THAN_TEN_FLOAT_KB, LESS_THAN_TEN_FLOAT_GB = 1024 * LESS_THAN_TEN_FLOAT_MB, LESS_THAN_TEN_FLOAT_TB = 1024 * LESS_THAN_TEN_FLOAT_GB;
            var LESS_THAN_HUNDRED_FLOAT_KB = 12.3456 * 1024, LESS_THAN_HUNDRED_FLOAT_MB = 1024 * LESS_THAN_HUNDRED_FLOAT_KB, LESS_THAN_HUNDRED_FLOAT_GB = 1024 * LESS_THAN_HUNDRED_FLOAT_MB, LESS_THAN_HUNDRED_FLOAT_TB = 1024 * LESS_THAN_HUNDRED_FLOAT_GB;
            var MORE_THAN_HUNDRED_FLOAT_KB = 123.4567 * 1024, MORE_THAN_HUNDRED_FLOAT_MB = 1024 * MORE_THAN_HUNDRED_FLOAT_KB, MORE_THAN_HUNDRED_FLOAT_GB = 1024 * MORE_THAN_HUNDRED_FLOAT_MB, MORE_THAN_HUNDRED_FLOAT_TB = 1024 * MORE_THAN_HUNDRED_FLOAT_GB;
            var NLS = {
               "KB" : "${0} KB",
               "MB" : "${0} MB",
               "GB" : "${0} GB",
               "TB" : "${0} TB"
            };
            beforeEach(function() {
               text._SIZE = NLS;
            });
            it("returns the argument if passed undefined, null, or a string", function() {
               expect(text.formatSize(NLS, undefined)).toBeUndefined();
               expect(text.formatSize()).toBeUndefined();
               expect(text.formatSize(NLS, null)).toBeNull();
               expect(text.formatSize(null)).toBeNull();
               var STRING = "_string_";
               expect(text.formatSize(NLS, STRING)).toBe(STRING);
               expect(text.formatSize(STRING)).toBe(STRING);
            });
            it("throws if the _SIZE property is not set", function() {
               delete text._SIZE;
               expect(function() {
                  text.formatSize(0);
               }).toThrow();
            });
            it("correctly formats the first argument", function() {
               expect(text.formatSize(TEN_KB)).toBe("10 KB");
               expect(text.formatSize(TEN_MB)).toBe("10 MB");
               expect(text.formatSize(TEN_GB)).toBe("10 GB");
               expect(text.formatSize(TEN_TB)).toBe("10 TB");

               expect(text.formatSize(LESS_THAN_TEN_FLOAT_KB)).toBe("1 KB");
               expect(text.formatSize(LESS_THAN_TEN_FLOAT_MB)).toBe("1.23 MB");
               expect(text.formatSize(LESS_THAN_TEN_FLOAT_GB)).toBe("1.23 GB");
               expect(text.formatSize(LESS_THAN_TEN_FLOAT_TB)).toBe("1.23 TB");

               expect(text.formatSize(LESS_THAN_HUNDRED_FLOAT_KB)).toBe("12 KB");
               expect(text.formatSize(LESS_THAN_HUNDRED_FLOAT_MB)).toBe("12.3 MB");
               expect(text.formatSize(LESS_THAN_HUNDRED_FLOAT_GB)).toBe("12.3 GB");
               expect(text.formatSize(LESS_THAN_HUNDRED_FLOAT_TB)).toBe("12.3 TB");

               expect(text.formatSize(MORE_THAN_HUNDRED_FLOAT_KB)).toBe("123 KB");
               expect(text.formatSize(MORE_THAN_HUNDRED_FLOAT_MB)).toBe("123 MB");
               expect(text.formatSize(MORE_THAN_HUNDRED_FLOAT_GB)).toBe("123.4 GB");
               expect(text.formatSize(MORE_THAN_HUNDRED_FLOAT_TB)).toBe("123.4 TB");
            });
            it("correctly formats the second argument if passed NLS as first", function() {
               expect(text.formatSize(NLS, TEN_KB)).toBe("10 KB");
               expect(text.formatSize(NLS, TEN_MB)).toBe("10 MB");
               expect(text.formatSize(NLS, TEN_GB)).toBe("10 GB");
               expect(text.formatSize(NLS, TEN_TB)).toBe("10 TB");

               expect(text.formatSize(NLS, LESS_THAN_TEN_FLOAT_KB)).toBe("1 KB");
               expect(text.formatSize(NLS, LESS_THAN_TEN_FLOAT_MB)).toBe("1.23 MB");
               expect(text.formatSize(NLS, LESS_THAN_TEN_FLOAT_GB)).toBe("1.23 GB");
               expect(text.formatSize(NLS, LESS_THAN_TEN_FLOAT_TB)).toBe("1.23 TB");

               expect(text.formatSize(NLS, LESS_THAN_HUNDRED_FLOAT_KB)).toBe("12 KB");
               expect(text.formatSize(NLS, LESS_THAN_HUNDRED_FLOAT_MB)).toBe("12.3 MB");
               expect(text.formatSize(NLS, LESS_THAN_HUNDRED_FLOAT_GB)).toBe("12.3 GB");
               expect(text.formatSize(NLS, LESS_THAN_HUNDRED_FLOAT_TB)).toBe("12.3 TB");

               expect(text.formatSize(NLS, MORE_THAN_HUNDRED_FLOAT_KB)).toBe("123 KB");
               expect(text.formatSize(NLS, MORE_THAN_HUNDRED_FLOAT_MB)).toBe("123 MB");
               expect(text.formatSize(NLS, MORE_THAN_HUNDRED_FLOAT_GB)).toBe("123.4 GB");
               expect(text.formatSize(NLS, MORE_THAN_HUNDRED_FLOAT_TB)).toBe("123.4 TB");
            });
            it("returns 1 KB if number is less than 1024", function() {
               expect(text.formatSize(NLS, 123)).toBe("1 KB");
               expect(text.formatSize(123)).toBe("1 KB");
            });
            it("returns 0 KB if number is negative", function() {
               expect(text.formatSize(NLS, -1)).toBe("0 KB");
               expect(text.formatSize(-1)).toBe("0 KB");
            });
         });

      describe("the method ic-core/util/text.htmlify()",
         function() {
            var USER1 = {
               name : 'Amy Jones6',
               userid : 'fd581390-6718-47d4-8ebb-50fd7e99b950'
            }, USER2 = {
               name : 'Andreas Berzat',
               userid : '49176fe8-16c8-4c36-8e29-b146e2e36dd4'
            };
            it("correctly transforms newlines into <br>'s", function() {
               expect(text.htmlify('hello\n\n\r\nworld')).toBe('hello<br><br><br>world');
            });
            it("correctly transforms empty spaces into &nbsp; (non breaking spaces)", function() {
               expect(text.htmlify('hello      world :)   end', true)).toBe('hello &nbsp; &nbsp; &nbsp;world :) &nbsp; end');
            });
            it("correctly linkifies URLs", function() {
              expect(text.htmlify('ftp://ftp3.linux.ibm.com http://www.yahoo.com https://mail.google.com http://www.ibm.com mailto:admin@ibm.com'))
                .toBe('<a href="ftp://ftp3.linux.ibm.com">ftp://ftp3.linux.ibm.com</a> <a href="http://www.yahoo.com">http://www.yahoo.com</a> <a href="https://mail.google.com">https://mail.google.com</a> <a href="http://www.ibm.com">http://www.ibm.com</a> <a href="mailto:admin@ibm.com">mailto:admin@ibm.com</a>');
            });
            it("correctly linkifies URLs that appear twice", function() {
               expect(text.htmlify('http://www.ibm.com and http://www.ibm.com'))
                     .toBe('<a href="http://www.ibm.com">http://www.ibm.com</a> and <a href="http://www.ibm.com">http://www.ibm.com</a>');
            });
            it("correctly linkifies URLs followed by a line break", function() {
               expect(text.htmlify('http://www.ibm.com\n and http://www.ibm.com'))
                     .toBe('<a href="http://www.ibm.com">http://www.ibm.com</a><br> and <a href="http://www.ibm.com">http://www.ibm.com</a>');
            });
            it("correctly renders plain text mentions", function() {
               var m1 = string.substitute(templateBizcard, {
                  name : '@' + USER1.name,
                  userid : USER1.userid,
                  url : people.getProfileUrl({
                     userid : USER1.userid
                  }),
                  displayName : USER1.name,
                  hasSymbol: true
               }), m2 = string.substitute(templateBizcard, {
                  name : USER2.name,
                  userid : USER2.userid,
                  url : people.getProfileUrl({
                     userid : USER2.userid
                  }),
                  displayName : USER2.name,
                  hasSymbol: false
               });

               var p1 = string.substitute(templatePlaintext, {
                  name : USER1.name,
                  userid : USER1.userid,
                  notify : '|notify'
               }), p2 = string.substitute(templatePlaintext, {
                  name : USER2.name,
                  userid : USER2.userid,
                  notify : ''
               });

               expect(text.htmlify(p1)).toBe(dojo.trim(m1.replace(/<!--[\s\S]*?-->/g, "")));
               expect(text.htmlify(p2)).toBe(dojo.trim(m2.replace(/<!--[\s\S]*?-->/g, "")));
            });

            it("correctly calls 'htmlifyMentions' function", function() {
               spyOn(text, 'htmlifyMentions');
               text.htmlify("hello");
               expect(text.htmlifyMentions).toHaveBeenCalled();
            });

            it("correctly renders HTML mentions", function() {
               var m1 = string.substitute(templateBizcard, {
                  name : USER1.name,
                  userid : USER1.userid,
                  url : people.getProfileUrl({
                     userid : USER1.userid
                  }),
                  displayName : USER1.name,
                  hasSymbol: false
               }), m2 = string.substitute(templateBizcard, {
                  name : USER2.name,
                  userid : USER2.userid,
                  url : people.getProfileUrl({
                     userid : USER2.userid
                  }),
                  displayName : USER2.name,
                  hasSymbol: false
               });

               var p1 = string.substitute(templateMicroformat, {
                  name : USER1.name,
                  userid : USER1.userid
               }), p2 = string.substitute(templateMicroformat, {
                  name : USER2.name,
                  userid : USER2.userid
               });

               expect(text.htmlify(p1)).toBe(dojo.trim(m1.replace(/<!--[\s\S]*?-->/g, "")));
               expect(text.htmlify(p2)).toBe(dojo.trim(m2.replace(/<!--[\s\S]*?-->/g, "")));
            });
         });
   });
