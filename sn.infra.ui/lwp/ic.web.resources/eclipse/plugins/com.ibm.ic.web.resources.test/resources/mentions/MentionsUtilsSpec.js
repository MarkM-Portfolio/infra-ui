/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link ic-core.widget.mentions.MentionsUtils}
 * 
 * @module ic-test.mentions.MentionsUtilsSpec
 */
define([
      "dojo/dom-construct",
      "dojo/query",
      "ic-core/widget/mentions/MentionsUtils"
],
   function(domConstruct, query, MentionsUtils) {

      var utils, noop = function() {
         return;
      };
      describe("the core.widget.mentions.MentionsUtils class",
         function() {
            beforeEach(function() {
               utils = new MentionsUtils();
               utils.activatorChar = '@';
               // UT are always LTR so bidiActivatorChar doesn't change
               utils.bidiActivatorChar = function() {
                  return '@';
               };
            });
            var htmlEx = '<div class="lotusText lotusMentionsDiv bidiAware" contenteditable="true" id="mentionstextAreaNode_0" aria-labelledby="mentionstextAreaNode_0" data-notopenee="true" data-commentinput="true" role="textbox" aria-multiline="true" style="color: rgb(0, 0, 0); -webkit-user-select: auto;">'
                  + 'sadsad '
                  + '<span class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_0" tabindex="-1" widgetid="mentionstextAreaNode_0_mentionsNode_0" contenteditable="false">'
                  + '<a href="https://dubxpcvm3078.mul.ie.ibm.com:9444/profiles/html/profileView.do?userid=50730340-0101-102e-88e8-f78755f7e0ed" class="fn lotusPerson bidiAware hasHover" icbizcard_ref="1" icbizcard_idx="14" aria-label="@Amy Jones13. Click here or press control-enter to view the business card" target="_blank" contenteditable="false">@Amy Jones13'
                  + '<span class="x-lconn-userid" style="display: none;">50730340-0101-102e-88e8-f78755f7e0ed</span>'
                  + '</a>'
                  + '</span>'
                  + ' asdsad '
                  + '<span class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_1" tabindex="-1" widgetid="mentionstextAreaNode_0_mentionsNode_1" contenteditable="false">'
                  + '<a href="https://dubxpcvm3078.mul.ie.ibm.com:9444/profiles/html/profileView.do?userid=51a43040-0101-102e-8950-f78755f7e0ed" class="fn lotusPerson bidiAware hasHover" icbizcard_ref="1" icbizcard_idx="15" aria-label="@Amy Jones119. Click here or press control-enter to view the business card" target="_blank" contenteditable="false">Amy Jones119'
                  + '<span class="x-lconn-userid" style="display: none;">51a43040-0101-102e-8950-f78755f7e0ed</span>'
                  + '</a>'
                  + '</span>'
                  + ' asda '
                  + '</div>';
            var domNode = domConstruct.toDom(htmlEx);

            describe("the interface", function() {
               it("implements the expected methods", function() {
                  expect(utils.setAriaLabel).toEqual(jasmine.any(Function));
                  expect(utils.compositionEnd).toEqual(jasmine.any(Function));
                  expect(utils.completeMention).toEqual(jasmine.any(Function));
               });
            });

            describe("the core.widget.mentions.MentionsUtils.setAriaLabel method", function() {
               it("sets the ariaLabel", function() {
                  utils.setAriaLabel("aria label added for amy jones x");
                  expect(utils.ariaLabel.innerHTML).toBe('aria label added for amy jones x');
               });
            });

            describe("the core.widget.mentions.MentionsUtils.removeSelection method", function() {
               var foo;
               var SEL = {
                  selection : {
                     collapseToStart : noop,
                     removeAllRanges : noop,
                     addRange : noop
                  },
                  range : {
                     startContainer : {},
                     extractContents : function() {
                        return {
                           childNodes : []
                        };
                     }
                  }
               };
               beforeEach(function() {
                  foo = utils;
                  utils.getSelection = function() {
                     return SEL;
                  };
               });
               afterEach(function() {
                  utils = foo;
               });
               it("calls the collapseToStart() method", function() {
                  spyOn(SEL.selection, 'collapseToStart');
                  utils.removeSelection();
                  expect(SEL.selection.collapseToStart).toHaveBeenCalled();
               });
            });

            describe("the lconn.core.widget.mentions.MentionsUtils.getNodeText method",
               function() {
                  it("returns the text from the input node in plain mode", function() {
                     expect(utils.getNodeText(domNode)).toBe('sadsad @Amy Jones13 asdsad Amy Jones119 asda ');
                  });
                  it("returns the text from the input node in plain mode with mentions formatted @{{uid|name|notify}}",
                     function() {
                        expect(utils.getNodeText(domNode, true))
                              .toBe('sadsad @{{50730340-0101-102e-88e8-f78755f7e0ed|Amy Jones13|notify}} asdsad @{{51a43040-0101-102e-8950-f78755f7e0ed|Amy Jones119}} asda ');
                     });
               });

            describe("the lconn.core.widget.mentions.MentionsUtils.getPlainMention method", function() {
               var nodeToTest = query('.vcard', domNode)[0];

               it("returns the mention with the following structure @{{uid|name|notify}}", function() {
                  expect(utils.getPlainMention(nodeToTest)).toBe('@{{50730340-0101-102e-88e8-f78755f7e0ed|Amy Jones13|notify}}');
               });
            });

            describe("the lconn.core.widget.mentions.MentionsUtils.compositionEnd method", function() {
               it("expects function to not be null", function() {
                  expect(utils.compositionEnd).not.toBeNull();
               });
            });

            describe("the lconn.core.widget.mentions.MentionsUtils.completeMention method", function() {
               it("expects function to not be null", function() {
                  expect(utils.completeMention).not.toBeNull();
               });
            });
         });
   });
