/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

(function() {
   dojo.provide("lconn.share.test.util.Html5utilSpec");
   dojo.require("lconn.share.util.Html5Util");
   
   var conUtil = lconn.share.util.Html5Util ;
   describe("lconn.share.test.util.Html5Util.allowHTML5", function(){

      if(dojo.isIE){
         if(dojo.isIE<10){
            it("should return false", function() {
               expect(conUtil.allowHTML5()).toBeFalsy();
            });
         }else{
            it("should return true", function() {
               expect(conUtil.allowHTML5()).toBeTruthy();
            });
         }
      }else if(dojo.isFF){
         if(dojo.isFF<11){
            it("should return false", function() {
               expect(conUtil.allowHTML5()).toBeFalsy();
            });
         }else{
            it("should return true", function() {
               expect(conUtil.allowHTML5()).toBeTruthy();
            });
         }
      }else if(dojo.isChrome){
         // to do chrome and safari test
         if(dojo.isChrome < 3){
            it("should return false", function() {
               expect(conUtil.allowHTML5()).toBeFalsy();
            });
         }else{
            it("should return true", function() {
               expect(conUtil.allowHTML5()).toBeTruthy();
            });
         }
      }else if(dojo.isSafari){
         if(dojo.isSafari<7){
            it("should return false", function() {
               expect(conUtil.allowHTML5()).toBeFalsy();
            });
         }else{
            it("should return true", function() {
               expect(conUtil.allowHTML5()).toBeTruthy();
            });
         }
      }
   });
}());
