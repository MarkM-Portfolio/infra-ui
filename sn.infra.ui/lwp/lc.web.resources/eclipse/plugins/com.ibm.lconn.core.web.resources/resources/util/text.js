/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.util.text");

dojo.require("dojo.number");
dojo.require("dojo.cache");
dojo.require("dojo.string");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.lconn.layout.people");

(function(people) {

    var URL_REGEX = /(mailto:|(([A-Za-z]{3,9}):\/\/))([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?[^ |^ <|>|"]+/gi;
    var NEWLINE_REGEX = /\r?\n/g, SPACES_REGEX = / {2}/g, TEXT_MENTION_REGEX = /@\{{2}([^|]+)\|([^|]+)(\|notify)?\}{2}/g, HTML_MENTION_REGEX = /<span class="?vcard"?>\s*(?:<br\/?>)*\s*<span class="?fn"?>([^<>]+)<\/span>\s*(?:<br\/?>)*\s*<span class="?x-lconn-userid"?>([^<>]+)<\/span>\s*(?:<br\/?>)*\s*<\/span>/gi;

   var templates = {
      templatePath : dojo.moduleUrl('lconn.core', 'templates/bizcard.html')
   };

   var ONE_KB = 1024, ONE_MB = 1024 * ONE_KB, ONE_GB = 1024 * ONE_MB, ONE_TB = 1024 * ONE_GB;

   /**
    * @namespace lconn.core.util.text
    */
   lconn.core.util.text = /** @lends lconn.core.util.text */ {
      CODE_MAP : [
            [
                  0x0080,
                  1
            ], // 0x0000 - 0x0080, 1 byte
            [
                  0x0800,
                  2
            ], // 0x0080 - 0x0800, 2 bytes
            [
                  0xD800,
                  3
            ], // 0x0800 - 0xD800, 3 bytes
            [
                  0xDC00,
                  4,
                  0xDC00,
                  0xDFFF,
                  2
            ]
      // 0xD800 - 0xDC00, 2 bytes, should be followed by a character within
      // 0xDC00, 0xDFFF, another 2 bytes, so 4 bytes
      ],

      /**
       * Trims a string to a string returnValue whose byte length is not greater
       * than length, and returns it
       *
       * @param {String}
       *           str The string to trim
       * @param {Number}
       *           length The maximum length
       * @returns {String} the trimmed string
       */
      trimToByteLength : function(str, length) {
         var ellipsis = "...";
         length = length - ellipsis.length;
         var codeMap = lconn.core.util.text.CODE_MAP;
         if (length <= 0)
            return "";
         var i = 0, lastValid = 0, len = str.length;
         var realLen = 0;
         while (i < len) {
            if (realLen >= length)
               return str.substring(0, lastValid) + ellipsis;
            var code = str.charCodeAt(i);
            if (code < codeMap[0][0]) {
               realLen += codeMap[0][1];
            }
            else if (code < codeMap[1][0]) {
               realLen += codeMap[1][1];
            }
            else if (code < codeMap[2][0]) {
               realLen += codeMap[2][1];
            }
            else {
               if (i < codeMap[3][0]) {
                  if (i + 1 < len) {
                     var b = str.charCodeAt(i + 1);
                     if (b >= codeMap[3][2] && b <= codeMap[3][3]) {
                        realLen += codeMap[3][1];
                        i++;
                     }
                     else {
                        realLen += codeMap[3][4]; // invalid character
                     }
                  }
                  else {
                     // last character is invalid
                     realLen += codeMap[3][4];
                  }
               }
            }
            i++;

            if (realLen == length)
               return str.substring(0, i) + ellipsis;
            else if (realLen > length)
               return str.substring(0, lastValid) + ellipsis;
            lastValid = i;

         }
         return str;
      },

      /**
       * Returns the byte length of a string
       *
       * @param {String}
       *           str The string to measure
       * @returns {Number} the byte length of a string
       */
      getByteLength : function(str) {
         var codeMap = lconn.core.util.text.CODE_MAP;
         var i = 0, len = str.length;
         var realLen = 0;
         while (i < len) {
            var code = str.charCodeAt(i);
            if (code < codeMap[0][0]) {
               realLen += codeMap[0][1];
            }
            else if (code < codeMap[1][0]) {
               realLen += codeMap[1][1];
            }
            else if (code < codeMap[2][0]) {
               realLen += codeMap[2][1];
            }
            else {
               if (i < codeMap[3][0]) {
                  if (i + 1 < len) {
                     var b = str.charCodeAt(i + 1);
                     if (b >= codeMap[3][2] && b <= codeMap[3][3]) {
                        realLen += codeMap[3][1];
                        i++;
                     }
                     else {
                        realLen += codeMap[3][4]; // invalid character
                     }
                  }
                  else {
                     // last character is invalid
                     realLen += codeMap[3][4];
                  }
               }
            }
            i++;
         }
         return realLen;
      },

      /**
       * Returns the English possessive form of a noun
       *
       * @param {String}
       *           s The noun
       * @returns {String} the possessive form of the noun
       */
      possessive : function(s) {
         if (s && s[s.length - 1] != 's')
            s += "'s";
         else
            s += "'";
         return s;
      },

      /**
       * Returns the extension of a filename
       *
       * @param {String}
       *           s The filename
       * @returns {String} the extension of a filename
       */
      getExtension : function(s) {
         if (!s)
            return "";
         var i = s.lastIndexOf(".");
         if (i != -1)
            return s.substring(i + 1).toLowerCase();
         return "";
      },

      /**
       * Trims the extension from a filename
       *
       * @param {String}
       *           s The filename
       * @returns {String} the filename trimmed of the extension
       */
      trimExtension : function(s) {
         if (!s)
            return "";
         var i = s.lastIndexOf(".");
         if (i != -1)
            return s.substring(0, i);
         return s;
      },

      /**
       * Returns the filename from a path
       *
       * @param {String}
       *           s The path
       * @returns {String} the filename
       */
      getFilename : function(s) {
         if (!s)
            return "";
         var i = s.lastIndexOf("\\");
         var j = s.lastIndexOf("/");
         if (i == j)
            return s;
         i = Math.max(i, j);
         return s.substring(i + 1);
      },
      trimToLength : function(s, length, wordLength) {
         if (!s)
            return "";
         s = lconn.core.util.text.trimEnd(s);
         var ellipsis = "...";
         if (wordLength > 0) {
            var words = s.split(/[\s\u3000]/);
            for (var i = 0; i < words.length; i++)
               if (words[i].length > wordLength) {
                  var l = s.indexOf(words[i]) + wordLength;
                  if (l > length)
                     break;
                  return lconn.core.util.text.trimEnd(s.substring(0, l - ellipsis.length)) + ellipsis;
               }
         }
         if (s.length > length)
            s = lconn.core.util.text.trimEnd(s.substring(0, length - ellipsis.length)) + ellipsis;
         return s;
      },

      /**
       * Trims the a string
       *
       * @param {String}
       *           s The string to trim
       * @returns {String} The trimmed string
       */
      trim : function(s) {
         if (!s)
            return "";
         var e = /^[\s\u3000]*(.*?)[\s\u3000]*$/.exec(s + "");
         return e ? e[1] : s;
      },

      /**
       * Trims the end of a string
       *
       * @param {String}
       *           s The string to trim
       * @returns {String} The right trimmed string
       */
      trimEnd : function(s) {
         if (!s)
            return "";
         s += "";
         s = /^(.*?)[\s\u3000]*$/.exec(s)[1];
         return s;
      },

      /**
       * Parses a string to an integer with optional fallback return value
       *
       * @param {String}
       *           s The string to parse
       * @param {Number}
       *           [def] The default return value
       * @returns {Number} The parsed integer
       */
      parseInt : function(s, def) {
         if (typeof def == "undefined")
            def = 0;
         if (!s)
            return def;
         var a = parseInt(s);
         return isNaN(a) ? def : a;
      },

      /**
       * Parses a string to a float with optional fallback return value
       *
       * @param {String}
       *           s The string to parse
       * @param {Number}
       *           [def] The default return value
       * @returns {Double} The parsed float
       */
      parseFloat : function(s, def) {
         if (typeof def == "undefined")
            def = 0;
         if (!s)
            return def;
         var a = parseFloat(s);
         return isNaN(a) ? def : a;
      },

      /**
       * Formats a size in bytes. This method can accept one or two arguments.
       * If only one argument is provided, it will be used as size to format. If
       * two arguments are provided, the first will be used as a string bundle
       * for sizes, and the second will be used as the size to format.
       * <p>
       * The nls argument should contain at least the following strings:
       * <dl>
       * <dd>nls.KB</dd>
       * <dd>String to format size in KB</dd>
       * <dd>nls.MB</dd>
       * <dd>String to format size in MB</dd>
       * <dd>nls.GB</dd>
       * <dd>String to format size in GB</dd>
       * </dl>
       *
       * @param {Object|Number}
       *           nls A string bundle for templates. If the second argument is
       *           omitted, it will be interpreted as the size to format.
       * @param {Number}
       *           [size] The size to format.
       * @returns {String} A formatted size
       */
      formatSize : function() {
         var nls, size;
         if (arguments.length == 2) {
            nls = arguments[0];
            size = arguments[1];
         }
         else
            size = arguments[0];
         if (size === undefined || size === null || typeof size == "string")
            return size;
         var nls = nls || lconn.core.util.text._SIZE;
         if (!nls)
            throw "Must pass nls to formatSize or set the lconn.core.util.text._SIZE property during init";

         if (size > 10 * ONE_TB && nls.TB)
            return dojo.string.substitute(nls.TB, [ dojo.number.format(Math.floor(size * 10 / ONE_TB) / 10)
            ]);
         else if (size >= 1 * ONE_TB && nls.TB)
            return dojo.string.substitute(nls.TB, [ dojo.number.format(Math.floor(size * 100 / ONE_TB) / 100)
            ]);
         else if (size > 10 * ONE_GB)
            return dojo.string.substitute(nls.GB, [ dojo.number.format(Math.floor(size * 10 / ONE_GB) / 10)
            ]);
         else if (size >= 1 * ONE_GB)
            return dojo.string.substitute(nls.GB, [ dojo.number.format(Math.floor(size * 100 / ONE_GB) / 100)
            ]);
         else if (size > 100 * ONE_MB)
            return dojo.string.substitute(nls.MB, [ dojo.number.format(Math.floor(size / ONE_MB))
            ]);
         else if (size > 10 * ONE_MB)
            return dojo.string.substitute(nls.MB, [ dojo.number.format(Math.floor(size * 10 / ONE_MB) / 10)
            ]);
         else if (size >= 1 * ONE_MB)
            return dojo.string.substitute(nls.MB, [ dojo.number.format(Math.floor(size * 100 / ONE_MB) / 100)
            ]);
         else if (size > 1 * 1024)
            return dojo.string.substitute(nls.KB, [ dojo.number.format(Math.floor(size / 1024))
            ]);
         return dojo.string.substitute(nls.KB, [ dojo.number.format(size > 0 ? 1 : 0)
         ]);
      },

      /**
       * Return the length of a string, the javascript self-contained attribute
       * "string.length" seems have bug on some special UTF-8 characters.
       *
       * @param {String}
       *           s The string to measure
       * @returns {Number} the length of the string
       */
      length : function(s) {
         var ret = 0;

         var t = encodeURIComponent(s);
         var idx1 = 0, idx2 = 0;
         while (true) {
            idx2 = t.indexOf('%', idx1);
            if (idx2 == -1) {
               ret += (t.length - idx1);
               break;
            }
            else {
               ret += (idx2 - idx1);

               var topByte = parseInt(t.substr(idx2 + 1, 2), 16);
               if (topByte < 0xC0) {
                  ret += 1;
                  idx1 = idx2 + 3;
               }
               else if (topByte >= 0xC0 && topByte < 0xE0) {
                  ret += 1;
                  idx1 = idx2 + 6;
               }
               else if (topByte >= 0xE0 && topByte < 0xF0) {
                  ret += 1;
                  idx1 = idx2 + 9;
               }
               else if (topByte >= 0xF0 && topByte < 0xF8) {
                  ret += 1;
                  idx1 = idx2 + 12;
               }
               else if (topByte >= 0xF8 && topByte < 0xFC) {
                  ret += 1;
                  idx1 = idx2 + 15;
               }
               else if (topByte >= 0xFC) {
                  ret += 1;
                  idx1 = idx2 + 18;
               }
            }
         }

         return ret;
      },

      /**
       * Returns the length of this string if it were converted to UTF-8
       *
       * @param {String}
       *           s The string to measure
       * @returns {Number} the length of the string in UTF-8
       */
      lengthUtf8 : function(s) {
         var bytes = 0;
         var length = s.length;
         for (var i = 0; i < length; i++) {
            var c = s.charCodeAt(i);
            if (c <= 127)
               bytes++;
            else if (c <= 2047)
               bytes += 2;
            else if (c <= 65535) {
               bytes += 3;
               // surrogate pairs in a character input stream are between D800
               // and DFFF -
               // they must be treated as 4 bytes in a UTF-8 stream
               if ((c >> 11) == 27) {
                  bytes++;
                  i++;
               }
            }
            else
               bytes += 4;
         }
         return bytes;
      },

      /**
       * Return the first index in the string that exceeds the maximum number of
       * UTF-8 bytes into the string. Used to trim a string to below a certain
       * length in UTF-8 bytes.
       * <p>
       * For instance, the string below:
       *
       * <pre>
       *   Bytes:
       *   |--| |-------| |-----------------| |--|
       *   0x30 0xC2 0x80 0xF0 0x90 0x80 0x80 0x32
       * </pre>
       *
       * would return
       *
       * <pre>
       *        max   result
       *         0     0
       *         1     1     The first character is one byte, so the index 1 is the end of the string
       *         2     1     The second byte is halfway through the second character, so we cannot include it
       *         3     3
       *         4     3
       *         5     3
       *         6     3
       *         7     4
       *         8    -1     All characters in the string are included
       * </pre>
       *
       * @param {String}
       *           s The string
       * @param {Number}
       *           max The maximum length in bytes
       * @returns {Number} the index of the first character exceeding the
       *          maximum length in bytes
       */
      getCharIndexForUtf8Index : function(s, max) {
         var bytes = 0;
         var length = s.length;
         for (var i = 0; i < length; i++) {
            var c = s.charCodeAt(i);
            if (c <= 127)
               bytes++;
            else if (c <= 2047)
               bytes += 2;
            else if (c <= 65535) {
               bytes += 3;
               // surrogate pairs in a character input stream are between D800
               // and DFFF -
               // they must be treated as 4 bytes in a UTF-8 stream
               if ((c >> 11) == 27) {
                  bytes++;
                  i++;
               }
            }
            else
               bytes += 4;
            if (bytes > max)
               return i;
         }
         return -1;
      },

      /**
       * Encodes a header in UTF-8
       *
       * @param {String}
       *           s The string to encode
       * @returns {String} the encoded header
       */
      encodeHeaderUtf8 : function(s) {
         return "=?UTF-8?Q?" + encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, "=$1") + "?=";
      },

      /**
       * Extracts a unique list of strings from the input list
       *
       * @param {Array.
       *           <String>} slist A list of strings
       * @returns {Array.<String>} The unique strings
       */
      uniquifyStringList : function(slist) {
         var sset = {}, sResList = [];

         if (slist && slist.length > 0) {
            // skip empty attray
            for ( var s in slist)
               sset[s] = 1;

            // get keys
            for ( var s in sset)
               sResList.push(s);
         }

         return sResList;
      },

      /**
       * Performs common operations on plain text comments e.g. creates
       * hyperlinks for URLs, replaces plain text mentions and mention
       * microformats with clickable links to the user's profile, etc.
       *
       * @param {String}
       *           str The string to htmlify
       * @param {boolean}
       *           replaceSpaces replace groups of spaces by non-breaking spaces
       *           (except the last space)
       * @returns {String} A htmlified string
       */
      htmlify : function(str, replaceSpaces) {
         var match;
         // htmlify New Lines
         str = str.replace(NEWLINE_REGEX, '<br>');
         // fixes IE8 issue where \n is not recognizable by regex.
         if (dojo.isIE == 8) {
            while (str.indexOf("\\n") > -1) {
               str = str.replace("\\n", "<BR>");
            }
         }
         // check for, and convert any URLs to links
         // but ignore any @mentions links.
         str = str.replace(URL_REGEX, function(url) {
            var mentionURL = people.getProfileUrl('', '');
            //com.ibm.lconn.layout.people.getProfileUrl('', '')

            if (url.indexOf(mentionURL) == -1) {
               return '<a href="' + url + '">' + url + '</a>';
            }

            return url;
         });

         // if requested, search for groups of spaces and replace the spaces
         // by space + non-breaking spaces
         if (replaceSpaces) {
            str = str.replace(SPACES_REGEX, ' &nbsp;');
         }

         str = this.htmlifyMentions(str);
         return str;
      },

      htmlifyMentions : function(str) {
         var match;
         dojo.forEach([
               TEXT_MENTION_REGEX,
               HTML_MENTION_REGEX
         ], function(regex) {
            while (match = regex.exec(str)) {
               var u = match[0], name, userid, displayName, shouldNotify = true;
               if (regex == TEXT_MENTION_REGEX) {
                  // match[3] = should notify value @{{name|uid|notify}}
                  shouldNotify = !!match[3];
                  displayName = match[2];
                  name = shouldNotify ? '@' + displayName : displayName, userid = match[1]
               }
               // HTML_MENTION_REGEX
               else {
                  name = match[1];
                  shouldNotify = name.indexOf('@') == 0;
                  displayName = shouldNotify ? name.substring(1, name.length) : name;
                  userid = match[2]
               }
               var href = com.ibm.lconn.layout.people.getProfileUrl({
                  name : displayName,
                  userid : userid
               });
               var l = dojo.string.substitute(dojo.cache('lconn.core', 'templates/bizcard.html'), {
                  url : href,
                  name : name,
                  userid : userid,
                  displayName : displayName,
                  hasSymbol : shouldNotify
               });
               // if debug=true bizCard HTML comments were causing blank space.
               // use regex and trim to remove
               if (dojo.config.isDebug) {
                  l = dojo.trim(l.replace(/<!--[\s\S]*?-->/g, ""));
               }
               regex.lastIndex += l.length - u.length;
               str = str.replace(u, l);
            }
         });
         return str;
      }

   };

})(com.ibm.lconn.layout.people);
