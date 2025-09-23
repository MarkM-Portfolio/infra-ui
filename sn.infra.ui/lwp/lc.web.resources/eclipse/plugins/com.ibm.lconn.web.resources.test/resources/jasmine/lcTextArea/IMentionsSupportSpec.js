/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.lcTextArea.mixins.IMentionsSupport}
 * 
 * @module lconn.test.jasmine.lcTextArea.IMentionsSupportSpec
 */
dojo.provide("lconn.test.jasmine.lcTextArea.IMentionsSupportSpec");

dojo.require("lconn.core.lcTextArea.mixins.IMentionsSupport");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("dojo.string");

/**
 * Dummy test class that mixes in
 * lconn.core.lcTextArea.mixins.IMentionsSupport
 * 
 * @class lconn.test.jasmine.lcTextArea._DummyTextBox
 * @extends lconn.core.lcTextArea.mixins.IMentionsSupport
 * @private
 */
dojo.declare("lconn.test.jasmine.lcTextArea._DummyTextBox", lconn.core.lcTextArea.mixins.IMentionsSupport,
      /** @lends lconn.test.jasmine.lcTextArea._DummyTextBox.prototype */ {
   constructor : function(args) {
      dojo.safeMixin(this, args);
   }
});

/**
 * Mock object for MentionsHelper
 * 
 * @class lconn.test.jasmine.lcTextArea._MockHelper
 * @private
 */
dojo.declare("lconn.test.jasmine.lcTextArea._MockHelper", null,
      /** @lends lconn.test.jasmine.lcTextArea._MockHelper.prototype */ {
   constructor : function(text) {
      this.callbacks = [];
      this.text = text;
      this.cancelled = false;
   },
   plainTextChromeCancelMention : function(){
      this.cancelMention();
   },
   cancelMention : function(){
      this.cancelled = true;
   },
   getText : function() {
      return this.text;
   },
   setText : function(text) {
      this.text = text;
   },
   getTextAsJson : function() {
      return {textData: this.text};
   },
   setTypeaheadHeader : function(header) {
      this.header = header;
   },
   addCallback : function(handle, fn) {
      this.callbacks[handle] = fn;
   },
   setValue : function(value){
      var newValue = lconn.core.util.text.htmlify(value);
      this.setText(newValue);
   }
});

(function(TextBox, MockHelper) {

   var TEXT = "foobar";

   var textbox, textbox_without_helper;
   beforeEach(function() {
      textbox = new TextBox({
         _mentionsHelper: new MockHelper(TEXT)
      });
      textbox_without_helper = new TextBox();
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport mixin", function() {
      it("adds the expected methods", function() {
         expect(textbox.getTrackedMentions).toEqual(jasmine.any(Function));
         expect(textbox.getText).toEqual(jasmine.any(Function));
         expect(textbox.setText).toEqual(jasmine.any(Function));
         expect(textbox.addMentionsCallback).toEqual(jasmine.any(Function));
         expect(textbox.setTypeAheadHeader).toEqual(jasmine.any(Function));
         expect(textbox.setValue).toEqual(jasmine.any(Function));
         expect(textbox.getValue).toEqual(jasmine.any(Function));
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport.getTrackedMentions", function() {
      var mentionsData;
      it("returns the correct value", function() {
         mentionsData = textbox.getTrackedMentions();
         expect(mentionsData.textData).toBe(TEXT);
      });
      it("returns null if there is no mentions helper", function() {
         mentionsData = textbox_without_helper.getTrackedMentions();
         expect(mentionsData).toBeNull();
      });
   });
   
   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport.setTypeAheadHeader", function() {
      it("Properly sets the header in the case that there is a mentions helper", function() {
         textbox.setTypeAheadHeader(TEXT);
         expect(textbox._mentionsHelper.header).toBe(TEXT);
      });
   });
      
   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport.getText", function() {
      it("returns the correct value", function() {
         expect(textbox.getText()).toBe(TEXT);
      });

      it("returns null if the mixed in class doesn't have a mentions helper", function() {
         expect(function(){textbox_without_helper.getText()}).not.toThrow();
         expect(textbox_without_helper.getText()).toBeNull();
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport.setText", function() {
      it("correctly sets the value", function() {
         textbox.setText('foo');
         expect(textbox.getText()).toBe('foo');

         textbox.setText('     foo');
         expect(textbox.getText()).toBe('foo');

         textbox.setText('foo     ');
         expect(textbox.getText()).toBe('foo     ');
      });

      it("does nothing if the mixed in class doesn't have a mentions helper", function() {
         expect(function(){textbox_without_helper.setText('foo')}).not.toThrow();
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport.addMentionsCallback", function() {
      var fn1, fn2;
      beforeEach(function() {
         fn1 = function() {};
         fn2 = function() {};
      });
      it("correctly adds a callback", function() {
         textbox.addMentionsCallback('foo', fn1);
         textbox.addMentionsCallback('bar', fn2);

         expect(textbox._mentionsHelper.callbacks['foo']).toBe(fn1);
         expect(textbox._mentionsHelper.callbacks['bar']).toBe(fn2);
      });

      it("does nothing if the mixed in class doesn't have a mentions helper", function() {
         expect(function(){textbox_without_helper.addMentionsCallback('foo', fn1)}).not.toThrow();
         expect(function(){textbox_without_helper.addMentionsCallback('bar', fn2)}).not.toThrow();
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport.setValue", function() {

      var plainTextValue = "hello there this is plaintext!";
      var dualFormatValue = dojo.string.substitute('<span widgetid="mentionstextAreaNode_0_mentionsNode_0" class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_0" tabindex="-1" contenteditable="false"><a target="_blank" aria-describedby="semtagmenu" class="fn lotusPerson bidiAware" href="${0}/html/profileView.do?userid=8e88c240-f6df-1032-9bbc-d02a14283ea9" contenteditable="false">@Amy Jones332<span style="display: none;" class="x-lconn-userid">8e88c240-f6df-1032-9bbc-d02a14283ea9</span></a></span> and my pal @{{8f2158c0-f6df-1032-9be7-d02a14283ea9|Amy Jones375|notify}}',
            [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
      var randomHTMLValue = 'hello <b>testers</b> how do I look?';

      var htmlFormattedMention = dojo.string.substitute('<span widgetid="mentionstextAreaNode_0_mentionsNode_0" class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_0" tabindex="-1" contenteditable="false"><a target="_blank" aria-describedby="semtagmenu" class="fn lotusPerson bidiAware" href="${0}/html/profileView.do?userid=8e88c240-f6df-1032-9bbc-d02a14283ea9" contenteditable="false">@Amy Jones332<span style="display: none;" class="x-lconn-userid">8e88c240-f6df-1032-9bbc-d02a14283ea9</span></a></span>',
            [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
      var plainFormattedMention = dojo.string.substitute('<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones375","userId":"8f2158c0-f6df-1032-9be7-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="${0}/html/profileView.do?userid=8f2158c0-f6df-1032-9be7-d02a14283ea9">@Amy Jones375</a><span class="x-lconn-userid" style="display:none">8f2158c0-f6df-1032-9be7-d02a14283ea9</span></span>',
            [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
      var nonRenderedHTML = 'hello &lt;b&gt;testers&lt;/b&gt; how do I look?';
      var renderedHTML = 'hello <b>testers</b> how do I look?';

      it("Will cancel any active uncompleted mentions before moving forward", function() {
         textbox._mentionsHelper._isTracking = true;
         textbox.setValue(plainTextValue);
         expect(textbox._mentionsHelper.cancelled).toBe(true);
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(dualFormatValue)
         });
         textbox._mentionsHelper._isTracking = false;
         textbox.setValue(plainTextValue);
         expect(textbox._mentionsHelper.cancelled).toBe(false);
      });
      
      it("When plainTextOnly is true or false, plaintext will be set to BTB as-is", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(plainTextValue)
         });
         textbox.setValue(plainTextValue);
         expect(textbox.getText()).toBe(plainTextValue);
         textbox.setValue(plainTextValue, true);
         expect(textbox.getText()).toBe(plainTextValue);
      });

      it("When plainTextOnly is true, and data includes both HTML and microformat mentions; Only microformat is rendered", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(dualFormatValue)
         });
         textbox.setValue(dualFormatValue, true);
         expect(textbox.getText()).not.toContain(htmlFormattedMention);
         expect(textbox.getText()).toContain(plainFormattedMention);
      });

      it("When plainTextOnly is false, and data includes both HTML and microformat mentions; Both formats are rendered", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(dualFormatValue)
         });
         textbox.setValue(dualFormatValue);
         expect(textbox.getText()).toContain(htmlFormattedMention);
         expect(textbox.getText()).toContain(plainFormattedMention);
      });

      it("When plainTextOnly is true, the HTML entity is printed literally (e.g. <abc>def</abc> appears as <abc>def</abc>)", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(randomHTMLValue)
         });
         textbox.setValue(randomHTMLValue, true);
         expect(textbox.getText()).toContain(nonRenderedHTML);
         expect(textbox.getText()).not.toContain(renderedHTML);
      });
      it("value contains an arbitrary HTML entity, plainTextOnly is false, the HTML entity is rendered (e.g. <abc>def</abc> appears as def)", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(randomHTMLValue)
         });
         textbox.setValue(randomHTMLValue);
         expect(textbox.getText()).not.toContain(nonRenderedHTML);
         expect(textbox.getText()).toContain(renderedHTML);
      });
      it("will correctly format a textbox without the mentions plugin", function() {
         textbox_without_helper.textAreaNode = dojo.toDom('<div></div>');
         textbox_without_helper.setValue(randomHTMLValue, false);
         expect(textbox_without_helper.textAreaNode.innerHTML).toBe(randomHTMLValue);
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupport.getValue", function() {
      var plainTextValue = "hello there this is plaintext!";
      var mentionsFormatValue = dojo.string.substitute('<span widgetid="mentionstextAreaNode_0_mentionsNode_0" class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_0" tabindex="-1" contenteditable="false"><a target="_blank" aria-describedby="semtagmenu" class="fn lotusPerson bidiAware" href="${0}/html/profileView.do?userid=8e88c240-f6df-1032-9bbc-d02a14283ea9" contenteditable="false">@Amy Jones332<span style="display: none;" class="x-lconn-userid">8e88c240-f6df-1032-9bbc-d02a14283ea9</span></a></span>',
            [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
      var randomHTMLValue = 'hello <b>testers</b> how do I look?';

      var htmlFormattedMention = dojo.string.substitute('<span widgetid="mentionstextAreaNode_0_mentionsNode_0" class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_0" tabindex="-1" contenteditable="false"><a target="_blank" aria-describedby="semtagmenu" class="fn lotusPerson bidiAware" href="${0}/html/profileView.do?userid=8e88c240-f6df-1032-9bbc-d02a14283ea9" contenteditable="false">@Amy Jones332<span style="display: none;" class="x-lconn-userid">8e88c240-f6df-1032-9bbc-d02a14283ea9</span></a></span>',
            [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
      var plainFormattedMention = dojo.string.substitute('<span class="vcard" contenteditable="false"><a class="fn url" href="${0}/html/profileView.do?userid=8f2158c0-f6df-1032-9be7-d02a14283ea9">@Amy Jones375</a><span class="x-lconn-userid" style="display:none">8f2158c0-f6df-1032-9be7-d02a14283ea9</span></span>',
            [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
      var nonRenderedHTML = 'hello &lt;b&gt;testers&lt;/b&gt; how do I look?';
      var renderedHTML = 'hello <b>testers</b> how do I look?';

      it("Will cancel any active uncompleted mentions before moving forward", function() {
         textbox._mentionsHelper._isTracking = true;
         textbox.getValue(true);
         expect(textbox._mentionsHelper.cancelled).toBe(true);
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(renderedHTML)
         });
         textbox._mentionsHelper._isTracking = false;
         textbox.getValue(true);
         expect(textbox._mentionsHelper.cancelled).toBe(false);
      });
      
      it("When plainTextOnly is true or false, plaintext will be returned as-is", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(plainTextValue),
            textAreaNode: {
               innerHTML: plainTextValue
               }
         });
         expect(textbox.getValue()).toBe(plainTextValue);
         expect(textbox.getValue(true)).toBe(plainTextValue);
      });

      it("When plainTextOnly is true, and data includes a mentions; the microformat is rendered", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(mentionsFormatValue)
         });
         expect(textbox.getValue(true)).toContain(htmlFormattedMention);
      });
      
      it("When plainTextOnly is false, the text box data will be properly returned", function() {
         textbox_without_helper.textAreaNode = dojo.toDom('<div>' + plainTextValue + '</div>');
         expect(textbox_without_helper.getValue(false)).toBe(plainTextValue);
      });
      
      it("When there is no mentions helper present and plainTextOnly is true, null will be returned", function() {
         textbox_without_helper.textAreaNode = dojo.toDom('<div>' + plainTextValue + '</div>');
         expect(textbox_without_helper.getValue(true)).toBe(null);
      });

      it("When plainTextOnly is true, the HTML entity is printed literally (e.g. <abc>def</abc> appears as <abc>def</abc>)", function() {
         textbox = new TextBox({
            _mentionsHelper: new MockHelper(randomHTMLValue)
         });
         expect(textbox.getValue(true)).toContain(renderedHTML);
      });
   });
}(lconn.test.jasmine.lcTextArea._DummyTextBox, lconn.test.jasmine.lcTextArea._MockHelper));

