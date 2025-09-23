/* Copyright IBM Corp. 2005, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
(function() {
dojo.provide("com.ibm.oneui.util.ui");

com.ibm.oneui.util.ui = {
   findMaxStringDisplayWidth: function(stringList, testNode, minWidth){
      if(!isNode(testNode)) {
         return -1;
      }
      var tester = document.createElement("div");
      dojo.style(tester,"position","absolute");
      dojo.style(tester,"left","-10000px");
      testNode.appendChild(tester);
      var width = minWidth || -1;
      dojo.forEach(stringList, function(sample){
         var sampleDiv = document.createElement("div");
         dojo.style(sampleDiv,"float","right");
         sampleDiv.innerHTML = sample;
         tester.appendChild(sampleDiv);
         width = sampleDiv.clientWidth > width ? sampleDiv.clientWidth : width;
         tester.removeChild(sampleDiv);
         sampleDiv = null;
      });
      testNode.removeChild(tester);
      return width;
   },
   
   convertToEms: function(testNode, pixels) {
      return pixels / com.ibm.oneui.util.ui.measureEm(testNode);
   },
   
   measureEm: function(testNode) {
      var measure = document.createElement('div');
      measure.style.height = '100em';
      testNode.appendChild(measure);
      var size= measure.offsetHeight/100;
      testNode.removeChild(measure);
      return size;
   },
   
   convertToExs: function(testNode, pixels) {
      return pixels / com.ibm.oneui.util.ui.measureEx(testNode);
   },
   
   measureEx: function(testNode) {
      var measure = document.createElement('div');
      measure.style.height = '100ex';
      testNode.appendChild(measure);
      var size= measure.offsetHeight/100;
      testNode.removeChild(measure);
      return size;
   }
}

function isNode(o){
   return o && o.nodeType && o.cloneNode;
}        
})();
