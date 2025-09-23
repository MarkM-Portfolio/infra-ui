/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * Unicode utilities
 * <p>
 * TODO: merge with {@link ic-core.unicode}
 * 
 * @namespace ic-ui.util.unicode
 */
define(/** @lends ic-ui.util.unicode */
{
   /**
    * Return the length of this string if it were converted to UTF-8
    * 
    * @param {String}
    *           s the string
    * @returns the length of this string if it were converted to UTF-8
    */
   lengthUtf8 : function(s) {
      var c, d, bytes = 0, i, length = s.length;
      for (i = 0; i < length; i++) {
         c = s.charCodeAt(i);
         if (c <= 127) {
            bytes++;
         }
         else if (c <= 2047) {
            bytes += 2;
         }
         else if (c <= 65535) {
            bytes += 3;
            // surrogate pairs in a character input stream are between D800
            // and DFFF -
            // they must be treated as 4 bytes in a UTF-8 stream
            d = c >> 11;
            if (d == 27) {
               bytes++;
               i++;
            }
         }
         else {
            bytes += 4;
         }
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
    *           s the string
    * @param {Number}
    *           max the maximum desired number of utf-8 bytes
    * @returns {Number} the first index in the string that exceeds the value of
    *          max
    */
   getCharIndexForUtf8Index : function(s, max) {
      var c, d, i, bytes = 0, length = s.length;
      for (i = 0; i < length; i++) {
         c = s.charCodeAt(i);
         if (c <= 127) {
            bytes++;
         }
         else if (c <= 2047) {
            bytes += 2;
         }
         else if (c <= 65535) {
            bytes += 3;
            // surrogate pairs in a character input stream are between D800
            // and DFFF -
            // they must be treated as 4 bytes in a UTF-8 stream
            d = c >> 11;
            if (d == 27) {
               bytes++;
               i++;
            }
         }
         else {
            bytes += 4;
         }
         if (bytes > max) {
            return i;
         }
      }
      return -1;
   }
});
