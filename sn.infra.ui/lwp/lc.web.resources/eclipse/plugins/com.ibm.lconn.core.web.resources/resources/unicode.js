/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.unicode");
lconn.core.unicode = {
   /**
    * Return the length of this string if it were converted to UTF-8
    */
   lengthUtf8: function(s) {
      var bytes = 0;
      var length = s.length;
      for (var i=0; i<length; i++) {
         var c = s.charCodeAt(i);
         if (c <= 127)
            bytes++;
         else if (c <= 2047)
            bytes += 2;
         else if (c <= 65535) {
            bytes += 3;
            // surrogate pairs in a character input stream are between D800 and DFFF - 
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
    * Return the first index in the string that exceeds the maximum number of UTF-8 bytes 
    * into the string.  Used to trim a string to below a certain length in UTF-8 bytes.
    * 
    * For instance, the string below:
    * 
    *   Bytes:
    *   |--| |-------| |-----------------| |--|
    *   0x30 0xC2 0x80 0xF0 0x90 0x80 0x80 0x32
    * 
    * would return
    * 
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
    */
   getCharIndexForUtf8Index: function(s, max) {
      var bytes = 0;
      var length = s.length;
      for (var i=0; i<length; i++) {
         var c = s.charCodeAt(i);
         if (c <= 127)
            bytes++;
         else if (c <= 2047)
            bytes += 2;
         else if (c <= 65535) {
            bytes += 3;
            // surrogate pairs in a character input stream are between D800 and DFFF - 
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
   }
};
