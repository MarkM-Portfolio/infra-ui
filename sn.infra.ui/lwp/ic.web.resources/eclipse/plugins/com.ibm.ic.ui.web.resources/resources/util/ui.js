/* Copyright IBM Corp. 2005, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
define([
        "dojo/_base/array",
        "dojo/dom-style"
], function(array, domStyle) {

   function isNode(o) {
      return o && o.nodeType && o.cloneNode;
   }

   var ui = {
      findMaxStringDisplayWidth : function(stringList, testNode, minWidth) {
         if (!isNode(testNode)) {
            return -1;
         }
         var tester = document.createElement("div");
         domStyle.set(tester, "position", "absolute");
         domStyle.set(tester, "left", "-10000px");
         testNode.appendChild(tester);
         var width = minWidth || -1;
         array.forEach(stringList, function(sample) {
            var sampleDiv = document.createElement("div");
            domStyle.set(sampleDiv, "float", "right");
            sampleDiv.innerHTML = sample;
            tester.appendChild(sampleDiv);
            width = sampleDiv.clientWidth > width ? sampleDiv.clientWidth : width;
            tester.removeChild(sampleDiv);
            sampleDiv = null;
         });
         testNode.removeChild(tester);
         return width;
      },

      convertToEms : function(testNode, pixels) {
         return pixels / com.ibm.oneui.util.ui.measureEm(testNode);
      },

      measureEm : function(testNode) {
         var measure = document.createElement('div');
         measure.style.height = '100em';
         testNode.appendChild(measure);
         var size = measure.offsetHeight / 100;
         testNode.removeChild(measure);
         return size;
      },

      convertToExs : function(testNode, pixels) {
         return pixels / com.ibm.oneui.util.ui.measureEx(testNode);
      },

      measureEx : function(testNode) {
         var measure = document.createElement('div');
         measure.style.height = '100ex';
         testNode.appendChild(measure);
         var size = measure.offsetHeight / 100;
         testNode.removeChild(measure);
         return size;
      }
   };

   return ui;
});
