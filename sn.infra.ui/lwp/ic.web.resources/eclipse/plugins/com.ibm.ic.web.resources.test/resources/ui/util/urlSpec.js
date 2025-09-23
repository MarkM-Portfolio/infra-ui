/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-ui/util/Url"
],
   function(_Url) {

      /**
       * Jasmine spec for ic-ui.util.urlSpec util
       * 
       * @module ic-test.urlSpec
       * @author Angele Demeurant <dangele@ie.ibm.com>
       */
      /**
       * Jasmine spec for com.ibm.oneui.util.url
       * 
       * @module com.ibm.oneui.test.jasmine.util.urlSpec
       * @author Angele Demeurant <dangele@ie.ibm.com>
       */
      describe("ic-ui.util.urlSpec",
         function() {
            var resourceUrl = "https://lcauto84.swg.usma.ibm.com/homepage/web/gettingStarted/", resourceUrlParam = "https://lcauto84.swg.usma.ibm.com/homepage/web/gettingStarted/?lang=en", resourceUrlParams = "https://lcauto84.swg.usma.ibm.com/homepage/web/gettingStarted/?lang=en&id=10";

            describe("The interface", function() {
               it("check if methods are existing", function() {
                  var url = new com.ibm.oneui.util.Url(resourceUrl);
                  expect(url.getQuery).toEqual(jasmine.any(Function));
                  expect(url.getQueryString).toEqual(jasmine.any(Function));
                  expect(url.toString).toEqual(jasmine.any(Function));
               });
            });
            describe("The getQuery method", function() {
               it("check if return value is an empty object with a url containing no parameter", function() {
                  var url = new com.ibm.oneui.util.Url(resourceUrl);
                  expect(url.getQuery(resourceUrl)).toEqual({});
               });
               it("check if return value contains an object with a url containing one parameter", function() {
                  var lang = {
                     lang : "en"
                  };
                  var urlP = new com.ibm.oneui.util.Url(resourceUrlParam);
                  expect(urlP.getQuery(resourceUrlParam)).toEqual(lang);
               });
               it("check if return value contains two objects with a url containing two parameters", function() {
                  var lang = {
                     lang : "en",
                     id : "10"
                  };
                  var urlPs = new com.ibm.oneui.util.Url(resourceUrlParams);
                  expect(urlPs.getQuery(resourceUrlParams)).toEqual(lang);
               });
            });
            describe("The getQueryString method", function() {
               it("check if return value is empty with a url containing no parameter", function() {
                  var url = new com.ibm.oneui.util.Url(resourceUrl);
                  expect(url.getQueryString(resourceUrl)).toEqual(null);
               });
               it("check if return value contains a query string with a url containing one parameter", function() {
                  var urlP = new com.ibm.oneui.util.Url(resourceUrlParam);
                  expect(urlP.getQueryString(resourceUrlParam)).toEqual("lang=en");
               });
               it("check if return value contains two query string with a url containing two parameters", function() {
                  var urlPs = new com.ibm.oneui.util.Url(resourceUrlParams);
                  expect(urlPs.getQueryString(resourceUrlParams)).toEqual("lang=en&id=10");
               });
            });
            describe("The toString method", function() {
               it("check if return value contains a string with a url containing no parameter", function() {
                  var url = new com.ibm.oneui.util.Url(resourceUrl);
                  expect(url.toString(resourceUrl)).toEqual(resourceUrl);
               });
               it("check if return value contains a string with a url containing one parameter", function() {
                  var urlP = new com.ibm.oneui.util.Url(resourceUrlParam);
                  expect(urlP.toString(resourceUrlParam)).toEqual(resourceUrlParam);
               });

               it("check if return value contains a string with a url containing two parameters", function() {
                  var urlPs = new com.ibm.oneui.util.Url(resourceUrlParams);
                  expect(urlPs.toString(resourceUrlParams)).toEqual(resourceUrlParams);
               });
            });

         });
   });
