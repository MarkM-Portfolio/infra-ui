/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2019                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * This package provides methods setting text direction for various HTML control
 * (dynamic input fields, static labels ...)
 * 
 * @namespace lconn.core.globalization.bidiUtil
 */
(function() {
   dojo.provide('lconn.core.globalization.bidiUtil');
   dojo.require("lconn.core.globalization.config");
   dojo.require("lconn.core.globalization.api");
   dojo.require("dojox.string.BidiComplex");

   var w = {};

   // UCC characters
   w.LRM = '\u200E';
   w.RLM = '\u200F';
   w.LRE = "\u202A";
   w.RLE = "\u202B";
   w.PDF = "\u202C";
   
   w.dateRegEx1 = //new RegExp('\\d{2}/\\d{2}/\\d{4}');          //good for "12/34/5678"
   				new RegExp('(\\d{1}|\\d{2})/\\d{2}/\\d{4}');
   w.dateRegEx2 = new RegExp('\\d{2}\\\\\\d{2}\\\\\\d{4}');    //good for "12\34\5678"


   /**
    * This function enforces the text direction for all the HTML elements having
    * the class bidiAware It also handles Structured Text (STT) such as URL,
    * FILE PATH ...
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function enforceTextDirectionOnPage
    * @param {Node}
    *           [node] Root node for HTML elements. If not passed, the entire
    *           document will be scanned.
    */
   w.enforceTextDirectionOnPage = function(node) {

      if(node && node.domNode)
          node = node.domNode;
    
      if (this.isArabicUILanguage()) {
        this.applyNumShape(node);
      }

      if (lconn.core.globalization.config.areSettingsEnabled() && lconn.core.globalization.api.isBidiEnabled()) {
         var textDirection = lconn.core.globalization.api.getTextDirection();
         var str = "";var text = "";var ch = "";
         var i =0;

         // Handles Text Direction
         var t = node ? dojo.query(".bidiAware", node) : dojo.query(".bidiAware");
         for (i = 0; i < t.length; i++) {
            var element = t[i];
            if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA' || (element.tagName == 'DIV' && element.contentEditable == 'true')) {
               dojo.connect(element, "onkeyup", element, function() {
                  w.inputRTLProcessing(this, textDirection);
               });
               this.inputRTLProcessing(element, textDirection);
            }
            else if (element.tagName == 'DIV' || element.tagName == 'H1' || element.tagName == 'H2' || element.tagName == 'H3' || element.tagName == 'H4'
                  || element.tagName == 'B' || element.tagName == 'P' || element.tagName == 'SPAN') {
               element.style.direction = this.getTextDirection(element.textContent, textDirection);
               element.dir = element.style.direction;
               element.style.textAlign = "inherit";

            }
            else if (element.tagName == 'SELECT') {
               this.enforceTextDirectionForSelect(element, textDirection);
            }
            else {
               element.dir = element.style.direction = this.getTextDirection(element.value || element.text || element.outerText || element.innerHTML,
                  textDirection);
               if (element.tagName == 'A') {
                  var text = element.innerHTML;
                  var ch = text.charAt(text.length - 1);
                  if ((ch == w.LRM && element.dir === "rtl") || (ch == w.RLM && element.dir === "ltr")) {
                     element.innerHTML = text.substr(0, text.length - 1);
                  }
               }
            }
         }

         //Make sure URLs are LTR
         t = node ? dojo.query(".url", node) : dojo.query(".url");
         for (i = 0; i < t.length; i++) {
             var element = t[i];
             if (element.tagName == 'A') {
                 if(element.innerHTML.indexOf("@") == 0 || element.innerHTML.indexOf("http") == 0) {
                     element.dir = "ltr";
                 }
             }
         }

         // Handles STT (Structured Text)
         // Note: In the future HTML5 adds new field types: URL, email so we
         // could rely on these types instead of bidiSTT_URL and bidiSTT_EMAIL
         var urls = node ? dojo.query(".bidiSTT_URL", node) : dojo.query(".bidiSTT_URL");
         for (i = 0; i < urls.length; i++) {
            if (urls[i].tagName == 'INPUT' || urls[i].tagName == 'TEXTAREA') {
               dojox.string.BidiComplex.attachInput(urls[i], "URL");
            }
            else {
               str = dojox.string.BidiComplex.createDisplayString(urls[i].innerHTML, "URL");
               try {
                  urls[i].innerHTML = str;
               }
               catch (ignore) {
                  while (urls[i].firstChild)
                     urls[i].removeChild(urls[i].firstChild);
                  urls[i].appendChild(document.createTextNode(str));
               }
            }
         }
         
         //Structured text: file name with extension and size in brackets
         urls = node ? dojo.query(".bidiSTT_FILE_PATH_SIZE", node) : dojo.query(".bidiSTT_FILE_PATH_SIZE");
         for (i = 0; i < urls.length; i++) {
            if (urls[i].tagName == 'INPUT' || urls[i].tagName == 'TEXTAREA') {
               dojox.string.BidiComplex.attachInput(urls[i], "URL");
            }
            else {
               str = dojox.string.BidiComplex.createDisplayString(urls[i].innerHTML, "FILE_PATH_SIZE");
               try {
                  urls[i].innerHTML = str;
               }
               catch (ignore) {
                  while (urls[i].firstChild)
                     urls[i].removeChild(urls[i].firstChild);
                  urls[i].appendChild(document.createTextNode(str));
               }
            }
         }         

         var emails = node ? dojo.query(".bidiSTT_EMAIL", node) : dojo.query(".bidiSTT_EMAIL");
         for (i = 0; i < emails.length; i++) {
            if (emails[i].tagName == 'INPUT' || emails[i].tagName == 'TEXTAREA') {
               dojox.string.BidiComplex.attachInput(emails[i], "EMAIL");
            }
            else {
               emails[i].innerHTML = dojox.string.BidiComplex.createDisplayString(emails[i].innerHTML, "EMAIL");
            }
         }

         var at_uids = node ? dojo.query(".bidiSTT_AT_USER", node) : dojo.query(".bidiSTT_AT_USER");
         for (i = 0; i < at_uids.length; i++) {
            if (at_uids[i].tagName == 'INPUT' || at_uids[i].tagName == 'TEXTAREA') {
               dojox.string.BidiComplex.attachInput(at_uids[i], "AT_USER");
            }
            else {
               //change plain text and keep DOM structure
               str = dojox.string.BidiComplex.createDisplayString(at_uids[i].innerHTML, "AT_USER");
               while (at_uids[i].firstChild)
                   at_uids[i].removeChild(at_uids[i].firstChild);
               at_uids[i].appendChild(document.createTextNode(str));
            }
         }

         at_uids = node ? dojo.query(".bidiSTT_AT_USER1", node) : dojo.query(".bidiSTT_AT_USER1");
         for (i = 0; i < at_uids.length; i++) {
            if (at_uids[i].tagName == 'INPUT' || at_uids[i].tagName == 'TEXTAREA') {
               dojox.string.BidiComplex.attachInput(at_uids[i], "AT_USER");
            }
            else {               
               at_uids[i].innerHTML = w.enforceTextDirectionMultiLine(at_uids[i].innerHTML, "AT_USER");
            }
         }

         var myForm = (urls.length > 0 ? urls[0].form : (emails.length > 0 ? emails[0].form : null));
         if (myForm) {
            dojo.connect(myForm, "onsubmit", myForm, function() {
               w.stripSpecialCharacters(node);
            });
         }

         // Handles Input field of type file
         var f = node ? dojo.query(".bidiFileInput", node) : dojo.query(".bidiFileInput");
         for (i = 0; i < f.length; i++) {
            var element = f[i];
            dojo.connect(element, "onkeydown", element, function() {
               w.onFileKeyDown(this);
            });
            dojo.connect(element, "onchange", element, function() {
               w.processChange(this);
            });
            dojo.connect(element, "onfocus", element, function() {
               w.fileOnFocus(this);
            });
            dojo.connect(element, "onmousedown", element, function() {
               w.onFileMouseDown(this);
            });
            var fakeElement = dojo.byId("bidi_faked_" + element.id);
            if (fakeElement) {
               dojo.connect(fakeElement, "onfocus", fakeElement, function() {
                  w.onfocus(this);
               });
               dojo.connect(fakeElement, "onkeydown", fakeElement, function() {
                  w.onFakeKeyDown(event, this);
               });
               dojo.connect(fakeElement, "oncopy", fakeElement, function() {
                  w.processCopy(this);
               });
               dojo.connect(fakeElement, "onpaste", fakeElement, function() {
                  return false;
               });
               dojo.connect(fakeElement, "oncut", fakeElement, function() {
                  return false;
               });
            }
         }
      }
   };

   /**
    * This function use regular expression to detect the language of user input;
    * If user input is a right to left language like(Arabic and Hebrew), then
    * change the input style to right to left.
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function inputRTLProcessing
    * @param {String}
    *           [requiredElement] The DOM node to inspect.
    * @param {String}
    *           [txtDir] A string representing the direction of text.
    */
   w.inputRTLProcessing = function(requiredElement, txtDir) {
      if (lconn.core.globalization.config.areSettingsEnabled() && lconn.core.globalization.api.isBidiEnabled() && requiredElement != null
            && (requiredElement.value != "" || requiredElement.innerHTML != "")) {
         txtDir = this.getTextDirectionPref(txtDir);
         if (requiredElement.tagName == 'INPUT' || requiredElement.tagName == 'TEXTAREA'
               || (requiredElement.tagName == 'DIV' && requiredElement.contentEditable == 'true') && (requiredElement.value || requiredElement.innerHTML)) {
            if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.CONTEXTUAL) {
               if (this.isRTLValue(requiredElement.value || requiredElement.innerHTML)) {
                  requiredElement.dir = requiredElement.style.direction = "rtl";
               }
               else {
                  requiredElement.dir = requiredElement.style.direction = "ltr";
               }
            }
            else if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.LEFT_TO_RIGHT)
               requiredElement.dir = requiredElement.style.direction = "ltr";
            else if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.RIGHT_TO_LEFT)
               requiredElement.dir = requiredElement.style.direction = "rtl";
            if (dojo.hasClass(requiredElement, "lotusLeft") && requiredElement.style.direction === "rtl") {
               requiredElement.style.textAlign = "right";
            }
            else if (dojo.hasClass(requiredElement, "lotusRight") && requiredElement.style.direction === "ltr") {
               requiredElement.style.textAlign = "left";
            }
         }
      }
   };

   /**
    * This function enforces the text direction for a &lt;select&gt; HTML
    * element. Actually it enforces the text direction for all its options.
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function enforceTextDirectionForSelect
    * @param {String}
    *           [element] The DOM node used as a root, normally a &lt;select&gt;
    *           element.
    * @param {String}
    *           [txtDir] A string representing the direction of text.
    */
   w.enforceTextDirectionForSelect = function(element, txtDir) {
      if (lconn.core.globalization.config.areSettingsEnabled() && lconn.core.globalization.api.isBidiEnabled()) {
         var options = dojo.query("option", element);
         for (var i = 0; i < options.length; i++) {
            var option = options[i];
            option.text = this.enforceTextDirection(option.text, txtDir);
         }
      }
   };

   /**
    * This function enforces the text direction of a given multiline string
    * using Unicode control characters. Lines are assumed to be separated
    * by "\n" or "<br>".
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function enforceTextDirectionMultiLine
    * @param {String}
    *           [stringValue] The string to process.
    *           [sttType] Structured text type, if any.
    */
   w.enforceTextDirectionMultiLine = function(stringValue, sttType) {

      if (typeof (stringValue) != "string")
          return stringValue;

      var separator = "\n";
      if (stringValue.indexOf("<br>") > -1) {
          separator = "<br>";
      }
      if (stringValue.indexOf("<BR>") > -1) {
          separator = "<BR>";
      }

      var arr = stringValue.split(separator);
      var finalValue = ""; var str = "";
      for(var i = 0; i < arr.length; i++) {
          str = arr[i];
          str = this.enforceTextDirection(str);
          if(typeof(sttType) == 'string') 
              str = dojox.string.BidiComplex.createDisplayString(str, sttType);          
          if( i > 0)
              finalValue = finalValue + separator;
          finalValue = finalValue + str; 
      }

      return finalValue;
   };

   /**
    * This function enforces the text direction of a given string by adding
    * LRE/RLE PDF header and footer
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function enforceTextDirection
    * @param {String}
    *           [stringValue] The string to process.
    * @param {String}
    *           [txtDir] A string representing the direction of text.
    */
   w.enforceTextDirection = function(stringValue, txtDir) {
      txtDir = this.getTextDirectionPref(txtDir);
      var finalDir = this.getTextDirection(stringValue, txtDir);

      var finalValue = stringValue;
      if (finalDir == "ltr")
         finalValue = this.LRE + finalValue + this.PDF;
      else if (finalDir == "rtl")
         finalValue = this.RLE + finalValue + this.PDF;
      return finalValue;
   };

   /**
    * This function determines the text direction for a given string.
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function getTextDirection
    * @param {String}
    *           [stringValue] The string to analyze.
    * @param {String}
    *           [txtDir] A string representing the direction of text.
    */
   w.getTextDirection = function(stringValue, txtDir) {
      txtDir = this.getTextDirectionPref(txtDir);
      var finalDir = "";
      if (typeof (stringValue) != "undefined") { //  && stringValue != "") {
         if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.CONTEXTUAL) {
            if (this.isRTLValue(stringValue)) {
               finalDir = "rtl";
            }
            else {
               finalDir = "ltr";
            }
         }
         else if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.LEFT_TO_RIGHT)
            finalDir = "ltr";
         else if (txtDir == lconn.core.globalization.config.TEXT_DIRECTION.RIGHT_TO_LEFT)
            finalDir = "rtl";
      }
      return finalDir;
   };

   /**
    * This function gets the text direction preference
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function getTextDirectionPref
    * @param {String}
    *           [txtDir] A string representing the direction of text. If not
    *           provided, it will be obtained through the Globalization
    *           Preferences JS API.
    */
   w.getTextDirectionPref = function(txtDir) {
      var textDirPref = "";
      if (typeof (txtDir) != "undefined") {
         textDirPref = txtDir;
      }
      else {
         if (lconn.core.globalization.config.areSettingsEnabled() && lconn.core.globalization.api.isBidiEnabled()) {
            textDirPref = lconn.core.globalization.api.getTextDirection();
         }
      }
      return textDirPref;
   };

   /**
    * This function uses regular expressions to detect the language of user
    * input
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function isRTLValue
    * @param {String}
    *           stringValue The string to analyze.
    */
   w.isRTLValue = function(stringValue) {
      var i;
      for (i = 0; i < stringValue.length; i++) {
         if (this.isBidiChar(stringValue.charCodeAt(i)))
            return true;
         else if (this.isLatinChar(stringValue.charCodeAt(i)))
            return false;
      }
      return false;
   };

   /**
    * @memberof lconn.core.globalization.bidiUtil
    * @function isBidiChar
    * @param {String}
    *           c The character to analyze.
    */
   w.isBidiChar = function(c) {
      if (c >= 0x05d0 && c <= 0x05ff)
         return true;
      else if (c >= 0x0600 && c <= 0x065f)
         return true;
      else if (c >= 0x066a && c <= 0x06ef)
         return true;
      else if (c >= 0x06fa && c <= 0x07ff)
         return true;
      else if (c >= 0xfb1d && c <= 0xfdff)
         return true;
      else if (c >= 0xfe70 && c <= 0xfefc)
         return true;
      else
         return false;
   };

   /**
    * @memberof lconn.core.globalization.bidiUtil
    * @function isLatinChar
    * @param {String}
    *           c The character to analyze.
    */
   w.isLatinChar = function(c) {
      if ((c > 64 && c < 91) || (c > 96 && c < 123))
         return true;
      else
         return false;
   };

   /**
    * Function called on focus event for the fake input field
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function fakeOnFocus
    * @param {Node}
    *           obj The input field.
    */
   w.fakeOnFocus = function(obj) {
      this.setRelatedElements(obj);
   };

   /**
    * Function called on focus event for the real input field of type file
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function fileOnFocus
    * @param {Node}
    *           obj The input field.
    */
   w.fileOnFocus = function(obj) {
      this.setRelatedElements(obj);
      obj.relatedElement.value = dojox.string.BidiComplex.createDisplayString(obj.value, "FILE_PATH");
   };

   /**
    * Function called on change event for the real input field of type file
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function processChange
    * @param {Node}
    *           obj The input field.
    */
   w.processChange = function(obj) {
      obj.relatedElement.value = dojox.string.BidiComplex.createDisplayString(obj.value, "FILE_PATH");
      obj.relatedElement.focus();
   };

   /**
    * Function called on keydown event for the fake input field
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function onFakeKeyDown
    * @param {Event}
    *           event The event.
    * @param {Node}
    *           obj The input field.
    */
   w.onFakeKeyDown = function(event, obj) {
      this.setRelatedElements(obj);
      event = (event) ? event : ((window.event) ? window.event : "")
      var kCode = event.keyCode;
      if (event.altKey || event.ctrlKey || kCode == VK_SHIFT)
         return true;
      else if (!(kCode == VK_HOME || kCode == VK_END || kCode == VK_LEFT || kCode == VK_RIGHT)) {
         obj.relatedElement.focus();
         return false;
      }
      else
         return true;
   };

   /**
    * Function called on mouse down event for the real input field of type file
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function onFileMouseDown
    * @param {Node}
    *           obj The input field.
    */
   w.onFileMouseDown = function(obj) {
      this.setRelatedElements(obj);
      obj.relatedElement.focus();
      return false;
   };

   /**
    * Function called on key down event for the real input field of type file
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function onFileKeyDown
    * @param {Node}
    *           obj The input field.
    */
   w.onFileKeyDown = function(obj) {
      this.setRelatedElements(obj);
      obj.relatedElement.focus();
      return false;
   };

   /**
    * This Function fills the attribute relatedElement with reference to the
    * real (or fake) input field
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function setRelatedElements
    * @param {Node}
    *           obj The input field.
    */
   w.setRelatedElements = function(obj) {
      if (obj.relatedElement) {
         return;
      }
      var nodes = obj.parentNode.childNodes;
      var target;
      for (var i = 0; i < nodes.length; i++) {
         if (obj.id == "bidi_faked_" + nodes[i].id || nodes[i].id == "bidi_faked_" + obj.id) {
            target = nodes[i];
            break;
         }
      }
      obj.relatedElement = target;
      target.relatedElement = obj;
   };

   /**
    * This function handles the copy operation Basically we should remove the
    * LRM markers from the text contained in the clipboard
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function processCopy
    * @param {Node}
    *           obj The target node.
    */
   w.processCopy = function(obj) {
      var text = "";
      try {
         if (dojo.isIE) {
            var w = obj.document.parentWindow;
            var e = w.event;
            var range = obj.document.selection.createRange();
            text = range.text;
         }
         else
            text = obj.document.getSelection();
         var textToClipboard = dojox.string.BidiComplex.stripSpecialCharacters(text);
         if (window.clipboardData) {
            window.clipboardData.setData("Text", textToClipboard);
            e.returnValue = false;
         }
      }
      catch (ex) {
      }
   };

   /**
    * This function strips all the UCC markers we added in the STT input fields
    * 
    * @memberof lconn.core.globalization.bidiUtil
    * @function stripSpecialCharacters
    * @param {Node}
    *           node The input field.
    */
   w.stripSpecialCharacters = function(node) {
      if (typeof node === "string")
         return dojox.string.BidiComplex.stripSpecialCharacters(node);

      var urls = node ? dojo.query(".bidiSTT_URL", node) : dojo.query(".bidiSTT_URL");
      for (var i = 0; i < urls.length; i++) {
         if (urls[i].tagName == 'INPUT' || urls[i].tagName == 'TEXTAREA') {
            urls[i].value = dojox.string.BidiComplex.stripSpecialCharacters(urls[i].value);
         }
      }
      var emails = node ? dojo.query(".bidiSTT_EMAIL", node) : dojo.query(".bidiSTT_EMAIL");
      for (var i = 0; i < emails.length; i++) {
         if (emails[i].tagName == 'INPUT' || emails[i].tagName == 'TEXTAREA') {
            emails[i].value = dojox.string.BidiComplex.stripSpecialCharacters(emails[i].value);
         }
      }
   };

  /**
   * This function substitues placeholders in a given template and, for mirrored UI,
   * processes the result as a structured text.
   *
   * @memberof lconn.core.globalization.bidiUtil
   * @function substituteWithSTT
   * @param {String}
   *      the template.
   * @param {Array}
   *      the list of strings to substitute placeholders.
   */

   w.substituteWithSTT = function(template, args) {
       var isMirrored = this.isBidiChar(template.charCodeAt(0));
       var i;
       if (isMirrored) {
           for (i = 0; i < args.length; i++) {
              args[i] = this.RLM + dojox.string.BidiComplex.createDisplayString(args[i], "FILE_PATH") + this.RLM;
           }
       }
       var result = dojo.string.substitute(template, args);
       if (isMirrored)
           result = this.RLE + result + this.PDF;
       return result;
   };

   
    w.numShapeStr = function(str) {
      if(this.isArabicUILanguage()) {
          return this._numShapeStr(str);
	  } else { 
          return str;
      }
    };

    w._numShapeStr = function(str) {
      if (typeof str === "number")
          str = "" + str;
      if (typeof str !== "string")
          return str;
      var ch, i, s1 = "";
      for(i = 0; i < str.length; i++) {
          ch = str.charCodeAt(i);
          if (ch  >= 0x30 && ch <= 0x39) {
              ch = 0x660 - 0x30 + ch;
          }
          s1 = s1 + String.fromCharCode(ch);
      }
      return s1;
    };

    w.numUnShapeStr = function(str) {
      var ch, i, s1 = "";
      for(i = 0; i < str.length; i++) {
          ch = str.charCodeAt(i);
          if (ch  >= 0x660 && ch <= 0x669) {
              ch = 0x30 + ch - 0x660;
          }
          s1 = s1 + String.fromCharCode(ch);
      }
      return s1;
    };

    w.applyNumShape = function(node) {
        this.applyNumShapeEx(node, "numShape");
        this.applyNumShapeEx(node, "bidiSTT_FILE_PATH_SIZE");
        this.applyNumShapeEx(node, "lotusLikeCount");
    };
    
    w.applyNumShapeEx = function(node, className, isAR) {
        if (isAR === undefined) 
            isAR = this.isArabicUILanguage();
        if (!isAR)
            return;
            
        var cn = "." + className;
        var t = node ? dojo.query(cn, node) : dojo.query(cn);
        for (var i = 0; i < t.length; i++)
            this.numShapeNode(t[i], isAR);
    };

	w.numShapeNode = function(node, isAR) {
		if(!node)
			return;
        if (isAR === undefined) 
            isAR = this.isArabicUILanguage();
        if (!isAR)
            return;
		
		if(node.tagName == 'SELECT') {
			var options = dojo.query("option",node);
			for(var i = 0; i < options.length; i++) {
				this.numShapeNode(options[i], isAR);
			}
			return;
		}

		if(node.alt)
			node.alt = this._numShapeStr(node.alt);

		if(node.nodeName == "#text") {
			node.textContent = this._numShapeStr(node.textContent);
			return;
		}
		var str;var n1;
		var c = node.childNodes;
		for(var i = 0; i < c.length; i++) {
			if (c[i].nodeName == "#text") {
				str = this._numShapeStr(c[i].textContent);
				if (str != c[i].textContent) {
					n1 = document.createTextNode(str);
					node.removeChild(c[i]);
					if (i == c.length-1)
						node.appendChild(document.createTextNode(str));
						else 
						node.insertBefore(document.createTextNode(str), c[i+1]);
				}
			} else {
				this.numShapeNode(c[i], isAR);
			}
		}
	};

	w.isArabicUILanguage = function() {
		var language = lconn.core.locale.getLanguage();
		return (language.substring(0,2) === "ar");
	};

	w.createSttDisplayString = function (str, format) {
		if (lconn.core.globalization.config.areSettingsEnabled() && lconn.core.globalization.api.isBidiEnabled()) {
			return dojox.string.BidiComplex.createDisplayString(str, format);		
		} else {
			return str;
		}
	};
	
	w.enforceTextDirectionEx = function (str) {
		if (lconn.core.globalization.config.areSettingsEnabled() && lconn.core.globalization.api.isBidiEnabled()) {
			return this.enforceTextDirection(str);
		} else {
			return str;
		}	
	};
	
	w.arabicDateProcessing = function (str) {
		//convert dd/mm/yyyy into yyyy/mm/dd
		if (this.isArabicUILanguage()) {
			var arr = str.split("/");
			var res = arr.reverse().join("/");
			return res;
		} else {
			return str;
		}
	}
	
	w.arabicTotalDatesPeriod = function (str) {
		if (this.isArabicUILanguage()) {
			str = dojox.string.BidiComplex.stripSpecialCharacters(str);
			var arr = str.split(" - ");
			arr[0] = this.arabicDateProcessing(arr[0]);
			arr[1] = this.arabicDateProcessing(arr[1]);
			var res = this.RLM + arr[0] + this.RLM + " - " + this.RLM + arr[1];
			res = this._numShapeStr(res);
			return res;
		} else {
			return str;
		}
	}


   lconn.core.globalization.bidiUtil = w;

})();
