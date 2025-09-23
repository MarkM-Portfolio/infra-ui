/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "ic-core/util/widgetPlacementConfig",
   "dojo/text!./widgetPlacementConfig.xml",
   "dojox/xml/parser"
], function (widgetPlacementConfig, xml, parser) {
   "use strict";

   var DUMMY_DOCUMENT = "<foo></foo>",
      PAGE_NO_INSTANCES = '<page pageId="communityOverview"></page>';

   function setConfigXML(xml) {
      window.WidgetPlacementConfig = {
         widgetConfigXMLDocument: parser.parse(xml)
      };
   }

   describe("widgetPlacementConfig utility", function () {
      var _WidgetPlacementConfig;

      beforeEach(function () {
         _WidgetPlacementConfig = window.WidgetPlacementConfig;
         setConfigXML(xml);

         jasmine.addMatchers({
            toBeEmpty: function () {
               return {
                  compare: function (actual) {
                     var result = {
                        pass: actual.length === 0
                     };

                     if (result.pass) {
                        result.message = "Expected " + actual + " not to have length 0";
                     } else {
                        result.message = "Expected " + actual + " to have length 0, but found length " + actual.length;
                     }

                     return result;
                  }
               };
            }
         });
      });

      afterEach(function () {
         window.WidgetPlacementConfig = _WidgetPlacementConfig;
      });

      describe("getDefinitions()", function () {
         it("should return the list of all definitions", function () {
            var defs = widgetPlacementConfig.getDefinitions();
            expect(defs.length).toBe(25);
         });

         it("should return an empty list if the config document has no definitions", function () {
            setConfigXML(DUMMY_DOCUMENT);

            var instances = widgetPlacementConfig.getDefinitions();
            expect(instances).toBeEmpty();
         });
      });

      describe("getDefinitionsById()", function () {
         it("should return the definition for a single widget", function () {
            var def = widgetPlacementConfig.getDefinitionById("RelatedCommunities");
            expect(def.getAttribute("description")).toEqual("relatedCommunitiesDescription");
         });

         it("should return undefined for a definition with an invalid ID", function () {
            var def = widgetPlacementConfig.getDefinitionById("RelatedLibraries");
            expect(def).not.toBeDefined();
         });

         it("should return undefined if the ID is missing", function () {
            var def = widgetPlacementConfig.getDefinitionById();
            expect(def).not.toBeDefined();
         });

         it("should return undefined if the config document has no definitions", function () {
            setConfigXML(DUMMY_DOCUMENT);

            var def = widgetPlacementConfig.getDefinitionById("RelatedCommunities");
            expect(def).not.toBeDefined();
         });
      });

      describe("getInstances()", function () {
         it("should return the list of all instances", function () {
            var instances = widgetPlacementConfig.getInstances();
            expect(instances.length).toBe(30);
         });

         it("should return the list of instances for a single page", function () {
            var instances = widgetPlacementConfig.getInstances("communityOverview");
            expect(instances.length).toBe(21);
         });

         it("should return an empty list for an invalid page", function () {
            var instances = widgetPlacementConfig.getInstances("community17");
            expect(instances).toBeEmpty();
         });

         it("should return an empty list if the config document has no instances", function () {
            setConfigXML(DUMMY_DOCUMENT);

            var instances = widgetPlacementConfig.getInstances();
            expect(instances).toBeEmpty();
         });

         it("should return an empty list for a page if the config document has no pages", function () {
            setConfigXML(PAGE_NO_INSTANCES);

            var instances = widgetPlacementConfig.getInstances("communityOverview");
            expect(instances).toBeEmpty();
         });
      });

      describe("getInstancesByDefId()", function () {
         it("should return widget instances for a given definition ID", function () {
            expect(widgetPlacementConfig.getInstancesByDefId("Library").length).toBe(2);
            expect(widgetPlacementConfig.getInstancesByDefId("StatusUpdates").length).toBe(1);
            expect(widgetPlacementConfig.getInstancesByDefId("sand_recomComm").length).toBe(9);
         });

         it("should filter widget instances for a defintion ID for a given page", function () {
            expect(widgetPlacementConfig.getInstancesByDefId("sand_recomComm", "follow").length).toBe(1);
         });

         it("should return an empty list for an invalid definition ID", function () {
            expect(widgetPlacementConfig.getInstancesByDefId("RelatedLibraries")).toBeEmpty();
         });

         it("should return an empty list for an invalid page ID", function () {
            expect(widgetPlacementConfig.getInstancesByDefId("sand_recomComm", "follow123")).toBeEmpty();
         });

         it("should return an empty list if the definition ID is missing", function () {
            expect(widgetPlacementConfig.getInstancesByDefId()).toBeEmpty();
         });

         it("should return an empty list if the config document has no instances", function () {
            setConfigXML(DUMMY_DOCUMENT);
            expect(widgetPlacementConfig.getInstancesByDefId("Library")).toBeEmpty();
         });
      });

      describe("getInstancesByInstId()", function () {
         it("should return a widget instance for a given instance ID", function () {
            var id = "Wed3df3e4b8d7_436a_b4fa_443c81db3dea";
            expect(widgetPlacementConfig.getInstanceByInstId(id).getAttribute("defIdRef")).toBe("Activities");
         });

         it("should return undefined for an invalid instance ID", function () {
            var id = "abc123";
            expect(widgetPlacementConfig.getInstanceByInstId(id)).not.toBeDefined();
         });

         it("should return undefined if the instance ID is missing", function () {
            expect(widgetPlacementConfig.getInstanceByInstId()).not.toBeDefined();
         });

         it("should return undefined if the config document has no instances", function () {
            setConfigXML(DUMMY_DOCUMENT);

            var id = "Wed3df3e4b8d7_436a_b4fa_443c81db3dea";
            expect(widgetPlacementConfig.getInstanceByInstId(id)).not.toBeDefined();
         });
      });

      describe("when the config is missing", function () {
         function addTests() {
            it("should return an empty definitions list", function () {
               expect(widgetPlacementConfig.getDefinitions()).toBeEmpty();
            });

            it("should return undefined when fetching a definition by ID", function () {
               expect(widgetPlacementConfig.getDefinitionById("Library")).not.toBeDefined();
            });

            it("should return an empty instances list", function () {
               expect(widgetPlacementConfig.getInstances()).toBeEmpty();
            });

            it("should return an empty instances list for a definition ID", function () {
               expect(widgetPlacementConfig.getInstancesByDefId("Library")).toBeEmpty();
            });

            it("should return undefined when fetching an instance by ID", function () {
               var id = "Wed3df3e4b8d7_436a_b4fa_443c81db3dea";
               expect(widgetPlacementConfig.getInstanceByInstId(id)).not.toBeDefined();
            });
         }

         describe("because the global variable is missing", function () {
            beforeEach(function () {
               window.WidgetPlacementConfig = undefined;
            });

            addTests();
         });

         describe("because the global variable does not contain an XML document field", function () {
            beforeEach(function () {
               window.WidgetPlacementConfig = {};
            });

            addTests();
         });
      });
   });
});
