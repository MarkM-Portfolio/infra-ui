/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('lconn.core.HTMLUtil');

/**
 * A set of HTML manipulation utilities
 * 
 * @namespace lconn.core.HTMLUtil
 */

/**
 * Creates a child text node on an element and sets its value
 * 
 * @param {Node}
 *           el The node
 * @param {String}
 *           str The value of the text node
 * @memberof lconn.core.HTMLUtil
 */
lconn.core.HTMLUtil.setInnerTextNode = function(el, str) {
   el.innerHTML = '';
   el.appendChild(document.createTextNode(str));
};

/**
 * Escapes text for safe use as innerHTML. Equivalent to {@see #escapeText} with
 * `inline` set to `true`
 * 
 * @param {String}
 *           str The text
 * @memberof lconn.core.HTMLUtil
 */
lconn.core.HTMLUtil.escapeInlineText = function(str) {
   return lconn.core.HTMLUtil.escapeText(str, true);
};

/**
 * Escapes text for safe use as innerHTML
 * 
 * @param {String}
 *           str The text
 * @param {Boolean}
 *           [inline] Escape single or double quotes and slashes
 * @memberof lconn.core.HTMLUtil
 */
lconn.core.HTMLUtil.escapeText = function(str, inline) {
   if (!str || str === '') {
      return '';
   }

   var escapeBuffer = document.getElementById("escapeBufferDiv");

   if (!escapeBuffer) {
      var tmp = document.createElement("div");
      tmp.id = 'escapeBufferDiv';
      tmp.style.display = 'none';
      document.body.appendChild(tmp);
      escapeBuffer = tmp;
   }

   // escapeBuffer.innerHTML = '';
   escapeBuffer.appendChild(document.createTextNode(str));
   var escaped = escapeBuffer.innerHTML;
   escapeBuffer.innerHTML = '';

   if (inline) {
      escaped = lconn.core.HTMLUtil.escape_q(escaped);
   }

   return escaped;
};

/**
 * Escapes single or double quotes and slashes
 * 
 * @param {String}
 *           str The text
 * @memberof lconn.core.HTMLUtil
 */
lconn.core.HTMLUtil.escape_q = function(str) {
   if (!str || str === '') {
      return '';
   }

   var t = '';
   for (var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      if (c == '"') {
         t += "&#34;";
      }
      else if (c == "'") {
         t += "&#39;";
      }
      else if (c == '\\') {
         t += "&#92;&#92;";
      }
      else {
         t += c;
      }
   }
   return t;
};
