/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Connections Application toolkit spec suite for Jasmine.
 * <p>
 * This test suite encompasses all Connections Application Toolkit test cases.
 * 
 * @module lconn.test.jasmine.app.specSuite
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.test.jasmine.app.specSuite");

try {
   dojo.require("lconn.test.jasmine.app.scenes.specSuite");
   dojo.require("lconn.test.jasmine.app._DeclarativeLayoutMixinSpec");
   dojo.require("lconn.test.jasmine.app._ImmersiveSpec");
   dojo.require("lconn.test.jasmine.app.AbstractAppSpec");
   dojo.require("lconn.test.jasmine.app.AbstractRoutesSpec");
//   dojo.require("lconn.test.jasmine.app.HistorifulSpec");
//   dojo.require("lconn.test.jasmine.app.ImmersiveSpec");
//   dojo.require("lconn.test.jasmine.app.AbstractRoutesSpec");
//   dojo.require("lconn.test.jasmine.app.historySpec");
   dojo.require("lconn.test.jasmine.app.scenesSpec");
}
catch (e) {
   console.debug(e);
}
