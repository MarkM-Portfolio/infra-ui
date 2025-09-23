/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/has",
	"dojo/number",
	"dojo/string"
], function (dojo, array, lang, windowModule, domConstruct, has, number, stringModule) {

	return lang.mixin(lang.getObject("com.ibm.social.incontext.util.text", true), {
	   possessive: function(s) {
	      if(s && s[s.length-1] != 's')
	         s += "'s";
	      else
	         s += "'";
	      return s;
	   },
	   getExtension: function(s) {
	      if (!s) return "";
	      var i = s.lastIndexOf(".");
	      if (i != -1)
	         return s.substring(i+1).toLowerCase();
	      return "";
	   },
	   trimExtension: function(s) {
	      if (!s) return "";
	      var i = s.lastIndexOf(".");
	      if (i != -1)
	         return s.substring(0,i);
	      return s;
	   },
	   getFilename: function(s) {
	      if (!s) return "";
	      var i = s.lastIndexOf("\\");
	      var j = s.lastIndexOf("/");
	      if (i == j)
	         return s;
	      i = Math.max(i,j);
	      return s.substring(i+1);
	   },
	   trimToLength: function(s, length, wordLength) {
	      if (!s) return "";
	      s = this.trimEnd(s);
	      var ellipsis = "...";
	      if (wordLength > 0) {
	         var words = s.split(/[\s\u3000]/);
	         for (var i=0; i<words.length; i++)
	            if (words[i].length > wordLength) {
	               var l = s.indexOf(words[i]) + wordLength;
	               if (l > length)
	                  break;
	               return this.trimEnd(s.substring(0, l-ellipsis.length)) + ellipsis;
	            }
	      }
	      if (s.length > length)
	         s = this.trimEnd(s.substring(0, length-ellipsis.length)) + ellipsis;
	      return s;
	   
	   },
	   trim: function( s ) {
	      if (!s) return "";
	      var e = /^[\s\u3000]*(.*?)[\s\u3000]*$/.exec(s+"");
	      return e ? e[1] : s;
	   },
	   trimEnd: function( s ) {
	      if (!s) return "";
	      s += "";
	      s = /^(.*?)[\s\u3000]*$/.exec(s)[1];
	      return s;
	   },   
	   parseInt: function(s,def) {
	      if (typeof def == "undefined")
	         def = 0;
	      if (!s)
	         return def;
	      var a = parseInt(s);
	      return isNaN(a) ? def : a;
	   },
	   parseFloat: function(s,def) {
	      if (typeof def == "undefined")
	         def = 0;
	      if (!s)
	         return def;
	      var a = parseFloat(s);
	      return isNaN(a) ? def : a;
	   },
	   formatSize: function() {
	      var nls, size;
	      if (arguments.length == 2) {
	         nls = arguments[0];
	         size = arguments[1];
	      }
	      else
	         size = arguments[0];
	      if (typeof size == "undefined" || size == null || typeof size == "string")
	         return size;
	      var nls = nls || this._SIZE;
	      if (!nls)
	         throw "Must pass nls to formatSize or set the com.ibm.social.incontext.util.text._SIZE property during init";
	      if (size > 10*1024*1024*1024)
	         return stringModule.substitute(nls.GB, [number.format(Math.floor(size*10/(1024*1024*1024))/10)]);
	      else if (size >= 1*1024*1024*1024)
	         return stringModule.substitute(nls.GB, [number.format(Math.floor(size*100/(1024*1024*1024))/100)]);
	      else if (size > 100*1024*1024)
	         return stringModule.substitute(nls.MB, [number.format(Math.floor(size/(1024*1024)))]);
	      else if (size > 10*1024*1024)
	         return stringModule.substitute(nls.MB, [number.format(Math.floor(size*10/(1024*1024))/10)]);
	      else if (size >= 1*1024*1024)
	         return stringModule.substitute(nls.MB, [number.format(Math.floor(size*100/(1024*1024))/100)]);
	      else if (size > 1*1024)
	         return stringModule.substitute(nls.KB, [number.format(Math.floor(size/1024))]);
	      return stringModule.substitute(nls.KB, [number.format(size > 0 ? 1 : 0)]);
	   },
	   
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
	   },
	   encodeHeaderUtf8: function(s) {
	      return "=?UTF-8?Q?"+encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, "=$1")+"?=";   
	   },
	   decodeSpecialHtmlChars: function(string) {
	      if (!string)
	         return "";
	      var textarea = windowModule.doc.createElement("textarea");
	      textarea.innerHTML = string.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	      return textarea.value;
	   },
	   base64Encode: function (dataStr) {
	      var Base64EncMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'];
	      if (!dataStr)
	         return '';
	
	      var data = this.getUTF8ByteArray(dataStr);
	
	      var dest = '';
	
	      var sidx = 0;
	      var didx = 0;
	      for (; sidx < data.length - 2; sidx += 3) {
	         dest += Base64EncMap[data[sidx] >>> 2 & 0x3f]; didx++;
	         dest += Base64EncMap[data[sidx + 1] >>> 4 & 0xf | data[sidx] << 4 & 0x3f]; didx++;
	         dest += Base64EncMap[data[sidx + 2] >>> 6 & 0x3 | data[sidx + 1] << 2 & 0x3f]; didx++;
	         dest += Base64EncMap[data[sidx + 2] & 0x3f]; didx++;
	      }
	
	      if (sidx < data.length) {
	         dest += Base64EncMap[data[sidx] >>> 2 & 0x3f]; didx++;
	         if (sidx < data.length - 1) {
	            dest += Base64EncMap[data[sidx + 1] >>> 4 & 0xf | data[sidx] << 4 & 0x3f]; didx++;
	            dest += Base64EncMap[data[sidx + 1] << 2 & 0x3f]; didx++;
	         } else {
	            dest += Base64EncMap[data[sidx] << 4 & 0x3f]; didx++;
	         }
	      }
	
	      var destlength = Math.floor(((data.length + 2) / 3) * 4 - 1);
	      if (destlength % 4 == 1)
	         destlength--;
	      else if (destlength % 4 == 3)
	         destlength++
	
	      for (; didx < destlength; didx++)
	         dest += '=';
	
	      return dest;
	   },
	      
	   getUTF8ByteArray: function(str){
	      if (!str) {
	         return [];
	      }
	
	      var data = []; 
	      for (var i = 0; i < str.length; i++)
	      {
	         var code = str.charCodeAt(i); // unicode char code, need to utf-8 encode
	
	         if (code >= 0 && code < 0x80) {
	            data[data.length] = code;
	         }
	         else if (code >= 0x80 && code < 0x800) {
	            data[data.length] = 0xC0 | ((code >>> 6) & 0x1F);
	            data[data.length] = 0x80 | (code & 0x3F); 
	         }
	         else if (code >= 0x800 && code < 0x10000) {
	            data[data.length] = 0xE0 | ((code >>> 12) & 0x0F);
	            data[data.length] = 0x80 | ((code >>> 6) & 0x3F);
	            data[data.length] = 0x80 | (code & 0x3F);
	         }
	         else if (code >= 0x10000 && code <= 0x10FFFF) {
	            data[data.length] = 0xF0 | ((code >>> 18) & 0x07); 
	            data[data.length] = 0x80 | ((code >>> 12) & 0x3F); 
	            data[data.length] = 0x80 | ((code >>> 6) & 0x3F); 
	            data[data.length] = 0x80 | (code & 0x3F);
	         }
	         else {
	            data[data.length] = -1;
	         }
	      }
	      return data;
	   },
	   
	   /**
	    * Write a string to the DOM such that there are the maximum number of sequential non-breakable (by the browser) characters is
	    * breakLength (defaults to 10).
	    */
	   breakString: function(/* String */ s, /* DOMDocument */ d, /* Parent element */ el, breakLength, replaceBr) {
	      if (!s)
	         return;
	      var minimumThreshold = 5;
	      
	      var text = function (el, s) {
	         if (!s) return;
	         if (replaceBr) {
	            var br = /\n/g;
	            if (br.test(s)) {
	               var index;
	               while ((index = s.indexOf("\n")) != -1) {                        
	                  if (index > 0)
	                     el.appendChild(d.createTextNode(s.substring(0, index)));
	                  domConstruct.create("br", { }, el);
	                  s = s.substring(index+1);
	               }
	               if (s)
	                  el.appendChild(d.createTextNode(s));
	            }
	            else
	               el.appendChild(d.createTextNode(s));
	            }
	         else {
	            el.appendChild(d.createTextNode(s));
	         }
	      }     
	      
	      breakLength = breakLength || 10;
	      var b = new RegExp("[^\\s]{"+(breakLength+1)+",}", "g");
	      var lastWordRe = /\s*(\S*)$/;
	      var r;
	      var start=0,end, tmp, lastWord, breakCount, lastBreak, i, startIndex, modulus, insertBreak, str, code, endIndex;
	      var breakChar = (has("ie") || has("webkit")) ? "" : "\u200B";
	      while (r = b.exec(s)) {
	         end = b.lastIndex;
	         tmp = s.substring(start, end);
	         lastWord = lastWordRe.exec(tmp)[1];
	         text(el, s.substring(start, end - lastWord.length));
	         // Analyze the long word
	         // If the number of characters left over is less than the threshhold
	         // Reduce the last segment so that there are at least [threshhold] characters left
	         breakCount = Math.floor(lastWord.length / breakLength); lastBreak = 0;
	         modulus = lastWord.length % breakLength; 
	         if (modulus && modulus < minimumThreshold) {
	            breakCount--;
	            lastBreak =  breakLength - (minimumThreshold - (lastWord.length % breakLength));
	         }
	         // First insert breaks in all whole segments
	         var startIndex = 0;
	         var wideCharAdjustment = 0;
	         for (i = 0; i < breakCount; i++) {
	            // Take previous adjustment into account when calculating end index
	            endIndex = startIndex + breakLength - wideCharAdjustment;
	                                    
	            // Reset wide character adjustment
	            wideCharAdjustment = 0;
	
	            // Determine if wide character adjustment is needed at the end of this segment
	            code = lastWord.charCodeAt(endIndex - 1);
	            if (code >= 55296 && code < 56192)
	               wideCharAdjustment=1;
	            
	            // Determine if break should be inserted   
	            insertBreak = !(i === breakCount-1 && !lastBreak && !modulus);
	                           
	            str = lastWord.substring(startIndex, endIndex + wideCharAdjustment);            
	            text(el, str + (insertBreak ? breakChar : ""));
	            if (!breakChar && insertBreak) el.appendChild(d.createElement("wbr"));
	            startIndex += str.length;
	         }
	         // If the last segment is too short, insert a shortened second to last segment
	         if (lastBreak) {
	            startIndex = lastWord.length - minimumThreshold - lastBreak;
	            endIndex = startIndex + lastBreak;
	            startIndex += wideCharAdjustment; // Take into consideration previous adjustment
	            
	            // Reset wide character adjustment
	            wideCharAdjustment = 0;
	            
	            // Determine if wide character adjustment is needed at the end of this segment
	            code = lastWord.charCodeAt(endIndex-1); 
	            if (code >= 55296 && code < 56192)
	               wideCharAdjustment=1;
	                                       
	            str = lastWord.substring(startIndex,endIndex + wideCharAdjustment);
	            text(el,str+breakChar);
	            if (!breakChar) el.appendChild(d.createElement("wbr"));
	         }
	         // Finally insert the last segment 
	         if (modulus) {
	            if (lastBreak)
	               text(el, lastWord.substring(lastWord.length - minimumThreshold + wideCharAdjustment, lastWord.length));
	            else
	               text(el, lastWord.substring(lastWord.length - modulus + wideCharAdjustment, lastWord.length));
	         }         
	         start = end;
	     }
	     text(el, s.substring(end));
	   },
	    /* Use this function over breakString when you have an element that contains child nodes that are both text nodes and other html elements. 
	    * This function will break the textNodes using breakString but keep the HTML elements intact. */
	   breakStringHTML: function(el, len) {
	      var scope = this;
	      var stack = [];
	      stack.push(el);
	      if (!len)
	         len = 10;
	      while(stack.length) {
	         var node = stack.pop();         
	         //Make a copy of the original child nodes
	         var children = [];
	            array.forEach(node.childNodes, function(child) {
	            children.push(child);
	         });      
	         //Loop through the child nodes.  If it's a text node, call break string.
	         array.forEach(children, function(child) {
	            if (child.nodeType == 3) {
	               var span = domConstruct.create("span");
	               scope.breakString(child.nodeValue, windowModule.doc, span, len);
	               //We want to add the new text nodes back to the DOM, not the span element that contains them.
	               //First, make a copy of the span's children
	               var spanChildren = [];
	               array.forEach(span.childNodes, function(spanChild) {
	                  spanChildren.push(spanChild);
	               });
	               //Now add the new text nodes to the DOM and remove the original text node.
	               array.forEach(spanChildren, function(txtNode) {
	                  child.parentNode.insertBefore(txtNode, child);
	               });
	              child.parentNode.removeChild(child);
	              
	            } 
	            else if ((child.nodeType == 1) && (child.childNodes.length > 0)) {
	               stack.push(child);    
	            }
	         });
	      }
	   }
	});

	
});

