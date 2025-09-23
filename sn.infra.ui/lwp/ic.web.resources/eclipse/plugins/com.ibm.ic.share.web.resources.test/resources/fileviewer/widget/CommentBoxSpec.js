/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dojo/Stateful",
  "dojo/_base/array",
  "ic-share/fileviewer/widget/CommentBox",
  "ic-share/fileviewer/config/globals",
  "dojo/dom-class",
  "dojo/Deferred"
], function (declare, _WidgetBase, Stateful, array, CommentBox, globals, domClass, Deferred) {
  "use strict";

  var MockBasicTextBox = declare([_WidgetBase], {
    _mentionsHelper: {},
    addMentionsCallback: function () {},
    resetBox: function () {},
    
    postCreate: function () {
      this.textAreaNode = this.domNode;
    },
    
    setText: function (text) {
      this.text = text;
    },
    
    getText: function () {
      return this.text;
    },
    
    getTrackedMentions: function () {
      return {
        textData: [{type: "text", value: this.text}]
      };
    }
  });
  
  var MockMentionsDataFormatter = declare([], {
    formatData: function (mentionsData) {
      return mentionsData.textData[0].value;
    }
  });
  
  function createMention(user) {
    return {
      getUserId: function () {
        return user.id;
      },
      removeSymbol: function () {}
    };
  }
  
  describe("ic-share/fileviewer/widget/CommentBox", function () {
    var commentBox, file;

    beforeEach(function () {
      globals.TextBoxWidget = MockBasicTextBox;
      globals.MentionsDataFormatter = MockMentionsDataFormatter;
      file = new Stateful({isExternal: true});
      commentBox = new CommentBox({file: file});
    });
    
    describe("_disableActionTabbing", function () {
      it("should let you disable tabbing to actions on the file", function () {
        commentBox._disableActionTabbing();
        var actions = commentBox._getActions();
        array.forEach(actions, function (action) {
          expect(action.tabIndex).toBe(-1);
        });
      });
    });

    describe("_enableActionTabbing", function () {
      it("should let you enable tabbing to actions on the file", function () {
        var actions = commentBox._getActions();
        array.forEach(actions, function (action) {
          action.tabIndex = -1;
        });
        commentBox._enableActionTabbing();
        array.forEach(actions, function (action) {
          expect(action.tabIndex).toBe(0);
        });
      });
    });
    
    describe("_updateWarning", function () {
      var warning = "The following people that you mentioned cannot";
      var createUser = function (name) {
        return {
          value: name
        };
      };
      
      var getWarningText = function() {
        return commentBox._warningBox.domNode.innerHTML;
      };
      
      it("should not render a message if there are no invalid mentions", function () {
        commentBox._updateWarning();
        expect(getWarningText().indexOf(warning) !== -1).toBe(false);
      });
      
      it("should render the mention warning for the given user", function () {
        commentBox._invalidMentions.push(createUser("Vivian Hanley"));
        commentBox._updateWarning();
        expect(getWarningText().indexOf(warning) !== -1).toBe(true);
        expect(getWarningText().indexOf("Vivian Hanley") !== -1).toBe(true);
      });
      
      it("should render the mention warning for all given users", function () {
        commentBox._invalidMentions.push(createUser("Vivian Hanley"));
        commentBox._invalidMentions.push(createUser("Amadou Alain"));
        commentBox._updateWarning();
        expect(getWarningText().indexOf(warning) !== -1).toBe(true);
        expect(getWarningText().indexOf("Vivian Hanley") !== -1).toBe(true);
        expect(getWarningText().indexOf("Amadou Alain") !== -1).toBe(true);
      });
    });
    
    describe("active", function () {
      it("should add the 'active' class to the domNode", function () {
        commentBox.activate();
        expect(domClass.contains(commentBox.domNode, "active")).toBe(true);
      });
    });
    
    describe("reset", function () {
      it("should remove the 'active' class to the domNode", function () {
        domClass.add(commentBox.domNode, "active");
        commentBox.reset();
        expect(domClass.contains(commentBox.domNode, "active")).toBe(false);
      });
    });
    
    describe("setValue", function () {
      it("should set the value on the textbox", function () {
        var text = "text string";
        commentBox.setValue(text);
        expect(commentBox.getValue()).toBe(text);
      });
    });
    
    describe("_onCreateMention", function () {
      beforeEach(function () {
        spyOn(commentBox._accessChecker, "checkAccess").andReturn(new Deferred());
      });
      
      it("should check access on the mention", function () {
        var mention = createMention({id: "81e18b48-1378-4850-b758-7212d0f6f479"});
        commentBox._onCreateMention(mention);
        expect(commentBox._accessChecker.checkAccess).toHaveBeenCalled();
      });
      
      it("should not check access on the mention if in the process of setting an existing mention", function () {
        commentBox._isSettingContent = true;
        
        var mention = createMention({id: "81e18b48-1378-4850-b758-7212d0f6f479"});
        commentBox._onCreateMention(mention);
        expect(commentBox._accessChecker.checkAccess).not.toHaveBeenCalled();
      });
    });
    
    describe("_onRemoveMention", function () {
      var mention1 = createMention({id: "1"});
      var mention2 = createMention({id: "2"});
      
      beforeEach(function () {
        spyOn(commentBox, "_updateWarning");
      });
      
      it("should update the warning if the user was a tracked invalid mention", function () {
        commentBox._invalidMentions.push(mention1);
        commentBox._onRemoveMention(mention1);
        expect(commentBox._updateWarning).toHaveBeenCalled();
      });
      
      it("should not update the warning if the user was not a tracked invalid mention", function () {
        commentBox._invalidMentions.push(mention1);
        commentBox._onRemoveMention(mention2);
        expect(commentBox._updateWarning).not.toHaveBeenCalled();
      });
    });
    
    describe("_handleAccessCheckResult", function () {
      var mention = createMention({id: "1"});
      beforeEach(function () {
        spyOn(commentBox, "_updateWarning");
      });
      
      it("should update the warning if the user does not have access", function () {
        commentBox._handleAccessCheckResult(mention, false);
        expect(commentBox._updateWarning).toHaveBeenCalled();
      });
      
      it("should not update the warning if the user does not have access", function () {
        commentBox._handleAccessCheckResult(mention, true);
        expect(commentBox._updateWarning).not.toHaveBeenCalled();
      });
    });
    
    describe("_save", function () {
      it("should emit a 'save' event", function () {
        spyOn(commentBox, "emit");
        commentBox._save();
        expect(commentBox.emit).toHaveBeenCalled();
        expect(commentBox.emit.mostRecentCall.args[0]).toBe("save");
      });
    });
    
    describe("_cancel", function () {
      it("should emit a 'cancel' event", function () {
        spyOn(commentBox, "emit");
        commentBox._cancel();
        expect(commentBox.emit).toHaveBeenCalled();
        expect(commentBox.emit.mostRecentCall.args[0]).toBe("cancel");
      });
    });
  });
});
