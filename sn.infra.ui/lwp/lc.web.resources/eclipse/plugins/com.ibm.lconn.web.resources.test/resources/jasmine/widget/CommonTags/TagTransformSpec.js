/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.widget.CommonTags.TagTransformSpec");

dojo.require("lconn.core.CommonTags.TagWidget");

(function(TagTransform) {

   var DATA1 = [
         {
            id : 0,
            name : 'bar',
            displayName : 'BAR',
            frequency : 1
         },
         {
            id : 1,
            name : 'foo',
            displayName : 'FOO',
            frequency : 2
         },
         {
            id : 2,
            name : 'baz',
            displayName : 'BAZ',
            frequency : 2
         }
   ];

   var DATA1_SORTED_BY_NAME = [
         {
            id : 0,
            name : 'bar',
            displayName : 'BAR',
            frequency : 1
         },
         {
            id : 2,
            name : 'baz',
            displayName : 'BAZ',
            frequency : 2
         },
         {
            id : 1,
            name : 'foo',
            displayName : 'FOO',
            frequency : 2
         }
   ];

   var DATA1_SORTED_BY_FREQUENCY = [
         {
            id : 2,
            name : 'baz',
            displayName : 'BAZ',
            frequency : 2
         },
         {
            id : 1,
            name : 'foo',
            displayName : 'FOO',
            frequency : 2
         },
         {
            id : 0,
            name : 'bar',
            displayName : 'BAR',
            frequency : 1
         }
   ];

   var DATA1_SORTED_BY_NAME_WITH_INTENSITY_BIN = [
         {
            id : 0,
            name : 'bar',
            displayName : 'BAR',
            frequency : 1,
            intensityBin : 1
         },
         {
            id : 2,
            name : 'baz',
            displayName : 'BAZ',
            frequency : 2,
            intensityBin : 5
         },
         {
            id : 1,
            name : 'foo',
            displayName : 'FOO',
            frequency : 2,
            intensityBin : 5
         }
   ];

   /*
    * This dataset is associated to defect 137266: when two tags have the same
    * name but different frequencies, and there's at least another tag, the
    * getListTags() method throws an exception "Cannot read property 'name' of
    * undefined" or the _genNormalTagsHtml() method throws "Cannot read property
    * 'frequency' of undefined"
    */
   var DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY = [
         {
            "name" : "\u30A4\u30F3\u30D5\u30E9\u30BD\u30EA\u30E5\u30FC\u30B7\u30E7\u30F3\u672C\u90E8",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u30A4\u30F3\u30D5\u30E9sol",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u306A\u305C\u306A\u305C",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u30EC\u30D3\u30E5\u30FC",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u52E4\u52D9",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u4E8B\u696D\u8A08\u753B",
            "frequency" : 3,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 39
         },
         {
            "name" : "\u53CE\u652F",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u53CE\u652F\u691C\u8A0E",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u8CAC\u4EFB\u8005\u4F1A\u8B70",
            "frequency" : 3,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 39
         },
         {
            "name" : "\u5168\u4F53\u4F1A\u8B70",
            "frequency" : 2,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 23
         },
         {
            "name" : "\u54C1\u8CEA",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u54C1\u8CEA\u4F1A\u8B70",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "\u4E88\u7B97",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "comcat",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "ga8",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "gcg",
            "frequency" : 11,
            "bin" : 5,
            "intensityBin" : 5,
            "visibility" : 100
         },
         {
            "name" : "glink",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "gwp",
            "frequency" : 4,
            "bin" : 3,
            "intensityBin" : 3,
            "visibility" : 52
         },
         {
            "name" : "gwp",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "ibm",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "incident",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "infra",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "internal",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "isbu",
            "frequency" : 4,
            "bin" : 3,
            "intensityBin" : 3,
            "visibility" : 52
         },
         {
            "name" : "isbu-g",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "isg",
            "frequency" : 2,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 23
         },
         {
            "name" : "itpj",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "list",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "lotuslive",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "map",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "ml",
            "frequency" : 2,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 23
         },
         {
            "name" : "montly",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "panasonic",
            "frequency" : 3,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 39
         },
         {
            "name" : "project",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "project",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "rca",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "report",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "sc4sb",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "sce",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "scn",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "supg",
            "frequency" : 2,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 23
         },
         {
            "name" : "system",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "tada",
            "frequency" : 2,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 23
         },
         {
            "name" : "uat",
            "frequency" : 2,
            "bin" : 2,
            "intensityBin" : 2,
            "visibility" : 23
         },
         {
            "name" : "voc",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "ws",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "ws-sol",
            "frequency" : 1,
            "bin" : 1,
            "intensityBin" : 1,
            "visibility" : 1
         },
         {
            "name" : "wsg",
            "frequency" : 6,
            "bin" : 4,
            "intensityBin" : 4,
            "visibility" : 70
         },
         {
            "name" : "wssol",
            "frequency" : 8,
            "bin" : 5,
            "intensityBin" : 5,
            "visibility" : 84
         },
         {
            "name" : "wssolg",
            "frequency" : 5,
            "bin" : 4,
            "intensityBin" : 4,
            "visibility" : 62
         }
   ], LIST_TAGS_DUPLICATE_TAGS_DIFFERENT_FREQUENCY = [
         {
            id : undefined,
            name : 'gcg',
            displayName : undefined,
            frequency : 11
         },
         {
            id : undefined,
            name : 'wssol',
            displayName : undefined,
            frequency : 8
         },
         {
            id : undefined,
            name : 'wsg',
            displayName : undefined,
            frequency : 6
         },
         {
            id : undefined,
            name : 'wssolg',
            displayName : undefined,
            frequency : 5
         },
         {
            id : undefined,
            name : 'isbu',
            displayName : undefined,
            frequency : 4
         },
         {
            id : undefined,
            name : 'panasonic',
            displayName : undefined,
            frequency : 3
         },
         {
            id : undefined,
            name : '\u4E8B\u696D\u8A08\u753B',
            displayName : undefined,
            frequency : 3
         },
         {
            id : undefined,
            name : '\u8CAC\u4EFB\u8005\u4F1A\u8B70',
            displayName : undefined,
            frequency : 3
         },
         {
            id : undefined,
            name : 'isg',
            displayName : undefined,
            frequency : 2
         }
   ], DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY_SORTED_BY_NAME = [
         {
            id : undefined,
            name : 'comcat',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'ga8',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'gcg',
            displayName : undefined,
            frequency : 11
         },
         {
            id : undefined,
            name : 'glink',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'gwp',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'gwp',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'ibm',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'incident',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'infra',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'internal',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'isbu',
            displayName : undefined,
            frequency : 4
         },
         {
            id : undefined,
            name : 'isbu-g',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'isg',
            displayName : undefined,
            frequency : 2
         },
         {
            id : undefined,
            name : 'itpj',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'list',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'lotuslive',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'map',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'ml',
            displayName : undefined,
            frequency : 2
         },
         {
            id : undefined,
            name : 'montly',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'panasonic',
            displayName : undefined,
            frequency : 3
         },
         {
            id : undefined,
            name : 'project',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'project',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'rca',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'report',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'sc4sb',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'sce',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'scn',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'supg',
            displayName : undefined,
            frequency : 2
         },
         {
            id : undefined,
            name : 'system',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'tada',
            displayName : undefined,
            frequency : 2
         },
         {
            id : undefined,
            name : 'uat',
            displayName : undefined,
            frequency : 2
         },
         {
            id : undefined,
            name : 'voc',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'ws',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'ws-sol',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : 'wsg',
            displayName : undefined,
            frequency : 6
         },
         {
            id : undefined,
            name : 'wssol',
            displayName : undefined,
            frequency : 8
         },
         {
            id : undefined,
            name : 'wssolg',
            displayName : undefined,
            frequency : 5
         },
         {
            id : undefined,
            name : '\u306A\u305C\u306A\u305C',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u30A4\u30F3\u30D5\u30E9sol',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u30A4\u30F3\u30D5\u30E9\u30BD\u30EA\u30E5\u30FC\u30B7\u30E7\u30F3\u672C\u90E8',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u30EC\u30D3\u30E5\u30FC',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u4E88\u7B97',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u4E8B\u696D\u8A08\u753B',
            displayName : undefined,
            frequency : 3
         },
         {
            id : undefined,
            name : '\u5168\u4F53\u4F1A\u8B70',
            displayName : undefined,
            frequency : 2
         },
         {
            id : undefined,
            name : '\u52E4\u52D9',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u53CE\u652F',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u53CE\u652F\u691C\u8A0E',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u54C1\u8CEA',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u54C1\u8CEA\u4F1A\u8B70',
            displayName : undefined,
            frequency : 1
         },
         {
            id : undefined,
            name : '\u8CAC\u4EFB\u8005\u4F1A\u8B70',
            displayName : undefined,
            frequency : 3
         }
   ];

   describe("TagTransform", function() {
      describe("the getListTags() method", function() {
         it("returns an empty array when input is null or empty", function() {
            expect(TagTransform.getListTags(null)).toEqual([]);
            expect(TagTransform.getListTags([])).toEqual([]);
         });
         it("sorts tags according to frequency", function() {
            expect(TagTransform.getListTags(DATA1)).toEqual(DATA1_SORTED_BY_FREQUENCY);
         });
         it("doesn't fail for a data set with duplicate tags with different frequencies", function() {
            expect(function() {
               TagTransform.getListTags(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY);
            }).not.toThrow();
         });
         it("returns an array without gaps for a data set with duplicate tags with different frequencies", function() {
            expect(TagTransform.getListTags(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY)).toEqual(LIST_TAGS_DUPLICATE_TAGS_DIFFERENT_FREQUENCY);
            expect(TagTransform.getListTags(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY, null)).toEqual(LIST_TAGS_DUPLICATE_TAGS_DIFFERENT_FREQUENCY);
         });
      });
      describe("the getCloudTags() method", function() {
         it("returns an empty array when input is null or empty", function() {
            expect(TagTransform.getCloudTags(null)).toEqual([]);
            expect(TagTransform.getCloudTags([])).toEqual([]);
         });
         it("returns tags sorted by name with intensity bin", function() {
            expect(TagTransform.getCloudTags(DATA1)).toEqual(DATA1_SORTED_BY_NAME_WITH_INTENSITY_BIN);
         });
      });
      describe("the sortByName() method", function() {
         it("returns an empty array when input is null or empty", function() {
            expect(TagTransform.sortByName(null).tags).toEqual([]);
            expect(TagTransform.sortByName([]).tags).toEqual([]);
         });
         it("sorts tags according to frequency", function() {
            expect(TagTransform.sortByName(DATA1).tags).toEqual(DATA1_SORTED_BY_NAME);
         });
         it("doesn't fail for a data set with duplicate tags with different frequencies", function() {
            expect(function() {
               TagTransform.sortByName(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY);
            }).not.toThrow();
         });
         it("returns an array without gaps for a data set with duplicate tags with different frequencies",
            function() {
               expect(TagTransform.sortByName(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY).tags).toEqual(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY_SORTED_BY_NAME);
               expect(TagTransform.sortByName(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY, null).tags)
                     .toEqual(DATA_DUPLICATE_TAGS_DIFFERENT_FREQUENCY_SORTED_BY_NAME);
            });
      });
      // FIXME: the name of this method makes no sense
      describe("the existsInArray() method", function() {
         var FOO = {
            name : 'foo'
         }, BAR = {
            name : 'bar'
         }, ARRAY1 = [
               {
                  name : 'bar'
               },
               {
                  name : 'baz'
               }
         ], ARRAY2 = ARRAY1.concat({
            name : 'foo'
         });
         it("returns false when array is empty", function() {
            expect(TagTransform.existsInArray(FOO, [])).toBeFalsy();
         });
         it("returns false when item is null or undefined", function() {
            expect(TagTransform.existsInArray(null, ARRAY1)).toBeFalsy();
            expect(TagTransform.existsInArray(undefined, ARRAY1)).toBeFalsy();
         });
         it("returns false when item is not in the array", function() {
            expect(TagTransform.existsInArray(FOO, ARRAY1)).toBeFalsy();
         });
         it("returns true when item is in the array", function() {
            expect(TagTransform.existsInArray(FOO, ARRAY2)).toBeTruthy();
            expect(TagTransform.existsInArray(BAR, ARRAY2)).toBeTruthy();
         });
      });
      // FIXME: the name of this method makes no sense
      describe("the existsInRelatedTags() method", function() {
         it("returns false when array is empty", function() {
            expect(TagTransform.existsInRelatedTags(1, [])).toBeFalsy();
         });
         it("returns false when item is null or undefined", function() {
            expect(TagTransform.existsInRelatedTags(null, [
                  1,
                  2,
                  3
            ])).toBeFalsy();
            expect(TagTransform.existsInRelatedTags(undefined, [
                  1,
                  2,
                  3
            ])).toBeFalsy();
         });
         it("returns true when item is in the array", function() {
            expect(TagTransform.existsInRelatedTags(1, [
                  1,
                  2,
                  3
            ])).toBeTruthy();
            expect(TagTransform.existsInRelatedTags(2, [
                  1,
                  2,
                  3
            ])).toBeTruthy();
         });
      });
      // FIXME: this method will be removed
      describe("the sortNumber() method", function() {
         it("returns the difference between two numbers", function() {
            expect(TagTransform.sortNumber(2, 3)).toBe(-1);
            expect(TagTransform.sortNumber(4, 3)).toBe(1);
            expect(TagTransform.sortNumber(5, 5)).toBe(0);
         });
         it("doesn't validate its input", function() {
            expect(isNaN(TagTransform.sortNumber())).toBeTruthy();
            expect(isNaN(TagTransform.sortNumber(null))).toBeTruthy();
            expect(isNaN(TagTransform.sortNumber(1))).toBeTruthy();
            expect(isNaN(TagTransform.sortNumber(1, 'a'))).toBeTruthy();
         });
      });
   });

}(lconn.core.CommonTags.TagTransform));
