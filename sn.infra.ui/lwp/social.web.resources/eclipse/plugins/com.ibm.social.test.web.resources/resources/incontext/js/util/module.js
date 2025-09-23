/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.incontext.js.util.module");

dojo.require("doh.runner");
dojo.require("com.ibm.social.incontext.util.text")

doh.register("com.ibm.social.incontext.util.text.test",
   [
      {
			name: "breakString-part1",
			runTest: function() {
				
				function validateResult(n, str) {
				   var breakChar = (dojo.isIE || dojo.isWebKit) ? "" : "\u200B";
				   if (breakChar) {
				   	var tmp = str.split("|").join(breakChar);
                  console.log("tmp = ", tmp);
                  console.log("innerHTML = ", n.innerHTML);
				   	doh.assertEqual(encodeURIComponent(tmp), encodeURIComponent(n.innerHTML));
				   }	
				   else {
				   	var tmp = str.split("|").join(dojo.isIE ? "<WBR>" : "<wbr>");
				   	console.log("tmp = ", tmp);
				   	console.log("innerHTML = ", n.innerHTML);
				   	doh.assertEqual(encodeURIComponent(tmp), encodeURIComponent(n.innerHTML));
				   }
				}				
				
			   var testStrings = [
"This is a test string with twodifferentlong words and 1234567890123456",
"This is a test  12345678901234567890 ... to be continued.",
"This is a test  123456789012345678901234567890 ... to be continued.",
"aaa bbb ccc     abcdefghijkl1111mnopqrstuvwxyz dddeee fff ggg",
"This is a test  12345678901234567890 ... to be continued 1.",
"This is a test  123456789012345678901 ... to be continued 12.",
"This is a test  1234567890123456789012 ... to be continued 123.",
"This is a test  12345678901234567890123 ... to be continued 124.",
"This is a test  123456789012345678901234 ... to be continued.",
"This is a test  1234567890123456789012345 ... to be continued.",
"This is a test  12345678901234567890123456 ... to be continued.",
"This is a test  123456789012345678901234567 ... to be continued.",
"This is a test  1234567890123456789012345678 ... to be continued.",
"This is a test  12345678901234567890123456789 ... to be continued.",
"1234567890123456789012",
"abcdefghijkl1111mnopqrst",
"123456789012345678901234567 123456789012345678901234",
"abc 1234567890123456789012345678 bbb 1234567890123456789012",
"abc 123456789012345678901234567 bbb 123456789012345678901234567 ccc",
"12345678901234567890123456789 1234567890123456789012345678 123456789012345678901234567 12345678901234567890123",
"12345678901234567890123456789 1234567890123456789012345678 12345678901234567890123456789012 12345678901234567890123456789",
"啊☆€㐁ᠠﭖꀀༀ䨭抎駡U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛕𪛖",
"This is a test  啊☆€㐁ᠠﭖꀀༀ䨭抎駡U郂𠀀𠀁𠀂𠀃𠀄𪛔 ... to be continued.",
"This is a test  啊☆€㐁ᠠﭖꀀༀ䨭抎駡U郂𠀀𠀁𠀂𠀃𠀄𪛔抎駡U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛖 ... to be continued.",
"aaa bbb ccc     啊☆€㐁ᠠﭖꀀ𠀃𠀃𠀃𠀃𠀃U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛕駡U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛕 dddeee fff ggg",
"aaa bbb ccc     啊☆€㐁ᠠﭖꀀ𠀃𠀃𠀃𠀃𠀃U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛕駡U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛕啊☆€㐁ᠠﭖꀀ𠀃𠀃𠀃𠀃𠀃U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛕駡U郂𠀀𠀁𠀂𠀃𠀄𪛔𪛕 dddeee fff ggg",
"This is a test  𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃 ... to be continued 1.",
"This is a test  𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃 ... to be continued 12.",
"This is a test  𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃 ... to be continued 123.",
"This is a test  𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃 ... to be continued 124.",
"This is a test  𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃𠀃 ... to be continued.",
"interesting customer discussion of Connections highlighting requested improvements to usability especially around rich text content"
];

var validationStrings = [
"This is a test string with twodiffere|ntlong words and 1234567890|123456",
"This is a test  1234567890|1234567890 ... to be continued.",
"This is a test  1234567890|1234567890|1234567890 ... to be continued.",
"aaa bbb ccc     abcdefghij|kl1111mnop|qrstuvwxyz dddeee fff ggg",
"This is a test  1234567890|1234567890 ... to be continued 1.",
"This is a test  1234567890|123456|78901 ... to be continued 12.",
"This is a test  1234567890|1234567|89012 ... to be continued 123.",
"This is a test  1234567890|12345678|90123 ... to be continued 124.",
"This is a test  1234567890|123456789|01234 ... to be continued.",
"This is a test  1234567890|1234567890|12345 ... to be continued.",
"This is a test  1234567890|1234567890|123456 ... to be continued.",
"This is a test  1234567890|1234567890|1234567 ... to be continued.",
"This is a test  1234567890|1234567890|12345678 ... to be continued.",
"This is a test  1234567890|1234567890|123456789 ... to be continued.",
"1234567890|1234567|89012",
"abcdefghij|kl1111mno|pqrst",
"1234567890|1234567890|1234567 1234567890|123456789|01234",
"abc 1234567890|1234567890|12345678 bbb 1234567890|1234567|89012",
"abc 1234567890|1234567890|1234567 bbb 1234567890|1234567890|1234567 ccc",
"1234567890|1234567890|123456789 1234567890|1234567890|12345678 1234567890|1234567890|1234567 1234567890|12345678|90123",
"1234567890|1234567890|123456789 1234567890|1234567890|12345678 1234567890|1234567890|1234567|89012 1234567890|1234567890|123456789",
"啊☆€㐁ᠠﭖꀀༀ䨭抎|駡U郂𠀀𠀁𠀂𠀃|𠀄𪛔𪛕𪛖",
"This is a test  啊☆€㐁ᠠﭖꀀༀ䨭抎|駡U郂𠀀𠀁𠀂𠀃|𠀄𪛔 ... to be continued.",
"This is a test  啊☆€㐁ᠠﭖꀀༀ䨭抎|駡U郂𠀀𠀁𠀂𠀃|𠀄𪛔抎駡U郂𠀀|𠀁𠀂𠀃𠀄|𪛔𪛖 ... to be continued.",
"aaa bbb ccc     啊☆€㐁ᠠﭖꀀ𠀃𠀃|𠀃𠀃𠀃U郂𠀀|𠀁𠀂𠀃𠀄𪛔|𪛕駡U郂𠀀𠀁|𠀂𠀃𠀄𪛔𪛕 dddeee fff ggg",
"aaa bbb ccc     啊☆€㐁ᠠﭖꀀ𠀃𠀃|𠀃𠀃𠀃U郂𠀀|𠀁𠀂𠀃𠀄𪛔|𪛕駡U郂𠀀𠀁|𠀂𠀃𠀄𪛔𪛕|啊☆€㐁ᠠﭖꀀ𠀃𠀃|𠀃𠀃𠀃U郂𠀀|𠀁𠀂𠀃𠀄𪛔|𪛕駡U郂𠀀𠀁|𠀂𠀃𠀄𪛔𪛕 dddeee fff ggg",
"This is a test  𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃 ... to be continued 1.",
"This is a test  𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃|𠀃𠀃 ... to be continued 12.",
"This is a test  𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃 ... to be continued 123.",
"This is a test  𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃 ... to be continued 124.",
"This is a test  𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃𠀃|𠀃𠀃𠀃𠀃 ... to be continued.",
"intere|sting customer discussion of Connec|tions highlig|hting requested improve|ments to usability especially around rich text content"
];
			   for (var i = 0; i < testStrings.length; i++) {
               var temp = dojo.create("span", { style: { display: "none" } }, dojo.body());
			      com.ibm.social.incontext.util.text.breakString(testStrings[i], dojo.doc, temp);
			      validateResult(temp, validationStrings[i]);
/*	            dojo.destroy(temp);*/
   		   }
			}
      }
   ]
);
