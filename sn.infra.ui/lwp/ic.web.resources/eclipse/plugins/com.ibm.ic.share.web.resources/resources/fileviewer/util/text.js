/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "dojo/has",
  "dojo/_base/lang",
  "dojo/sniff"
], function (has, lang) {

   var URL_REGEX = /(mailto:|((https?|s?ftp):\/\/))[^\s]*/gi,
      NEWLINE_REGEX = /\r?\n/g,
      SPACES_REGEX = / {2}/g;

   return {
      htmlify: function (str) {
         str = str || "";

         var match, u, l;
         while ((match = NEWLINE_REGEX.exec(str))) {
            u = match[0];
            l = '<br>';
            NEWLINE_REGEX.lastIndex += l.length - u.length;
            str = str.replace(u, l);
         }
         //fixes IE8 issue where \n is not recognizable by regex.
         if (has("ie") === 8 || window.mockIE8) {
            while(str.indexOf("\\n") > -1){
               str = str.replace("\\n", "<BR>");
            }
         }
         //check for, and convert any URLs to links
         //but ignore any @mentions links.
         while ((match = URL_REGEX.exec(str))) {
            u = match[0];
            l = '<a href="' + u + '">' + u + '</a>';
            URL_REGEX.lastIndex += l.length - u.length;
            str = str.replace(u, l);
         }

         // search for groups of spaces and replace the spaces 
         // by space + non-breaking spaces
         str = str.replace(SPACES_REGEX, ' &nbsp;');

         return str;
      },

      trim: function(str, maxLength) {
         str = lang.trim(str);
         if (maxLength !== undefined) {
            var i = this.getCharIndexForUtf8Index(str, maxLength);
            if (i != -1) {
               str = str.substring(0, i);
            }
         }

         return str;
      },

      getCharIndexForUtf8Index: function(s, byteIndex) {
         if (!s || typeof s != "string")
            return -1;
         var bytes = 0;
         var length = s.length;
         for (var i=0; i<length; i++) {
            var c = s.charAt(i);
            try {
               var encoded = encodeURIComponent(c);
               if (encoded.length > 2)
                  bytes += encoded.length / 3;
               else
                  bytes++;
               if (bytes > byteIndex)
                  return i;
            }
            catch(e) {
               //character was probably second half of GB18030 phase 2, for some reason the two parts of the character are 
               //distinct spots in the string, this breaks encodeURIComponent
               bytes +=2;
               if (bytes > byteIndex){
                  if ((i % 2) === 0) {
                     return ((bytes % 2) === 0) ? i : i - 1;
                  }
                  else {
                     return ((bytes % 2) === 0) ? i - 1 : i;
                  }
               }
            }
         }
         return -1;
      },

      breakString: function (str) {
         var first, half, before, after;

         if (!str) {
            return;
         }

         half = Math.ceil(str.length / 2);
         first = str.indexOf(" ");

         if (first <= 0 || first === str.length - 1) {
            return str; // No spaces
         }

         if (first >= half) {
            return str.replace(" ", "<br/>"); // Replace first space (which happens to be in the second half)
         }

         before = str.slice(0, half);
         after = str.slice(half);

         if ((half - before.lastIndexOf(" ")) < (after.indexOf(" ")) || after.indexOf(" ") < 0) {
            return before.replace(/ ([^ ]*)$/, "<br/>$1") + after; // Replace last space in first half
         }

         return before + after.replace(" ", "<br/>"); // Replace first space in second half
      }
   };
});
