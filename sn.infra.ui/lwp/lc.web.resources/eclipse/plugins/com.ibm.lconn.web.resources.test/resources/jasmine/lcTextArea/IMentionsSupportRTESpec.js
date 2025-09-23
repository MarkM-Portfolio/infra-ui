/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for {@link lconn.core.lcTextArea.mixins.IMentionsSupportRTE}
 * 
 * @module lconn.test.jasmine.lcTextArea.IMentionsSupportRTESpec
 */
dojo.provide("lconn.test.jasmine.lcTextArea.IMentionsSupportRTESpec");

dojo.require("lconn.core.lcTextArea.mixins.IMentionsSupportRTE");
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("dojo.string");
dojo.require("dojo.cache");

/**
 * Dummy test class that mixes in
 * lconn.core.lcTextArea.mixins.IMentionsSupportRTE
 * 
 * @class lconn.test.jasmine.lcTextArea._DummyRTE
 * @extends lconn.core.lcTextArea.mixins.IMentionsSupportRTE
 * @private
 */
dojo.declare("lconn.test.jasmine.lcTextArea._DummyRTE", lconn.core.lcTextArea.mixins.IMentionsSupportRTE,
/** @lends lconn.test.jasmine.lcTextArea._DummyRTE.prototype */
{
   constructor : function(args) {
      dojo.safeMixin(this, args);
   }
});

/**
 * Mock RTE
 * 
 * @class lconn.test.jasmine.lcTextArea._MockRTE
 * @private
 */
dojo.declare("lconn.test.jasmine.lcTextArea._MockRTE", null,
/** @lends lconn.test.jasmine.lcTextArea._MockRTE.prototype */
{
   constructor : function(args) {
      this.callbacks = [];
      dojo.safeMixin(this, args);
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

(function(DummyRTE, MockRTE) {

   // Preload template
   var templates = {
      templatePath : dojo.moduleUrl('lconn.test', 'jasmine/lcTextArea/templates/DummyRTE.html')
   };

   var HTML = dojo.cache('lconn.test', 'jasmine/lcTextArea/templates/DummyRTE.html'), TRACKED_MENTIONS = {
      textData : [
            {
               type : 'text',
               value : ' Hello world! I feel like mentioning someone in my team. First of all, '
            },
            {
               displayName : 'Amy Jones2',
               userid : '54f2a0c3-5451-47b1-8160-4248bce21727'
            },
            {
               type : 'text',
               value : ' for her countless hours spent debugging customer problems, then cheers to '
            },
            {
               displayName : 'Bill User10',
               userid : '63b49463-e7de-49aa-88ea-fa6e0750edcc'
            },
            {
               type : 'text',
               value : ' for resolving once for all the issues by writing an extensive suite of unit tests. Finally, I\'d like to spend a word to commend the efforts by '
            },
            {
               displayName : '%Susan% &Adams43&^',
               userid : '1b7dd5f0-1767-4594-86b1-4263169711db'
            },
            {
               type : 'text',
               value : ' who, by the way, cannot be notified of this mention cause she left the team in anger.'
            }
      ]
   };

   var plainTextValue = "hello there this is plaintext!";
   var randomHTMLValue = 'hello <b>testers</b> how do I look?';
   var nonRenderedHTML = 'hello &lt;b&gt;testers&lt;/b&gt; how do I look?';
   var renderedHTML = 'hello <b>testers</b> how do I look?';
   var plainFormattedMention = dojo.string.substitute('<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones375","userId":"8f2158c0-f6df-1032-9be7-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="${0}/html/profileView.do?userid=8f2158c0-f6df-1032-9be7-d02a14283ea9">@Amy Jones375</a><span class="x-lconn-userid" style="display:none">8f2158c0-f6df-1032-9be7-d02a14283ea9</span></span>',
         [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
   var htmlFormattedMention = dojo.string.substitute('<span widgetid="mentionstextAreaNode_0_mentionsNode_0" class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_0" tabindex="-1" contenteditable="false"><a target="_blank" aria-describedby="semtagmenu" class="fn lotusPerson bidiAware" href="${0}/html/profileView.do?userid=8e88c240-f6df-1032-9bbc-d02a14283ea9" contenteditable="false">@Amy Jones332</a><span style="display: none;" class="x-lconn-userid">8e88c240-f6df-1032-9bbc-d02a14283ea9</span></span>',
         [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()]);
   
   var textbox, textbox_without_rte;
   beforeEach(function() {
      textbox = new DummyRTE({
         getText : function(){
            return this._editor.html.replace(/<p>(.*)<\/p>/, '$1');
         },
         _editor : new MockRTE({
            cancelled : false,
            html : HTML,
            plugins : {
               mentions : {
                  setTypeaheadHeader : function(string) {
                     this.header = string;
                  },
                  cancelActiveMentions : function(editor) {
                     editor.cancelled = true;
                  }
               }
            },
            document : {
               $ : {
                  querySelectorAll : function(query) {
                     return dojo.query(query, dojo.toDom(textbox._editor.html));
                  }
               },
               getBody : function() {
                  return {
                     getHtml : function() {
                        return textbox._editor.html;
                     },
                     setHtml : function(value) {
                        textbox._editor.html = '<p>' + value + '</p>';
                     }
                  };
               }
            },
            getData : function() {
               return this.html;
            },
            setData : function(value) {
               this.html = value;
            }
         })
      });
      textbox_without_rte = new DummyRTE();
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupportRTE mixin", function() {
      it("adds the expected methods", function() {
         expect(textbox.getTrackedMentions).toEqual(jasmine.any(Function));
         expect(textbox.cancelActiveMentions).toEqual(jasmine.any(Function));
         expect(textbox.formatForPlaintext).toEqual(jasmine.any(Function));
         expect(textbox.setValue).toEqual(jasmine.any(Function));
         expect(textbox.getValue).toEqual(jasmine.any(Function));
      });
   });

   describe("the lconn.core.lcTextArea.mixins.cancelActiveMentions() method", function() {
      it("if mentions is plugged in, it will call cancel", function() {
         textbox.cancelActiveMentions();
         expect(textbox._editor.cancelled).toBeTruthy();
      });
      it("if mentions is not plugged in, it will do nothing", function() {
         textbox._editor.plugins = null;
         textbox.cancelActiveMentions();
         expect(textbox._editor.cancelled).toBeFalsy();
      });
   });

   describe("the lconn.core.lcTextArea.mixins.formatForPlaintext() method", function() {
      it("will correctly update the text and return the proper output", function() {
         var startingHTML = '<P>Hi there <B>amy jones</B> how are you doing?';
         var endingOutput = '&lt;P&gt;Hi there &lt;B&gt;amy jones&lt;/B&gt; how are you doing?';
         expect(textbox.formatForPlaintext(startingHTML)).toBe(endingOutput);
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupportRTE.getTrackedMentions() method", function() {
      it("returns the expected value", function() {
         expect(textbox.getTrackedMentions()).toEqual(TRACKED_MENTIONS);
      });

      it("replaces <P> elements with newline elements", function() {
         var startingText = '<P>Hi there this is line 1</P><P>And this should be line 2!</P>';
         var endingText = 'Hi there this is line 1\\nAnd this should be line 2!\\n';
         var i, temp, endString = '';
         textbox._editor.html = startingText;
         var mentionsData = textbox.getTrackedMentions();
         for (i = 0; i < mentionsData.textData.length; i++) {
            temp = dojo.toJson(mentionsData.textData[i].value);
            endString += temp.substring(1, temp.length - 1);
         }
         expect(endString).toBe(endingText);
      });
      
      it("replaces <BR> elements with newline elements", function() {
         var startingText = 'Hi there this is line 1<BR>And this should be line 2!';
         var endingText = 'Hi there this is line 1\\nAnd this should be line 2!';
         var i, temp, endString = '';
         textbox._editor.html = startingText;
         var mentionsData = textbox.getTrackedMentions();
         for (i = 0; i < mentionsData.textData.length; i++) {
            temp = dojo.toJson(mentionsData.textData[i].value);
            endString += temp.substring(1, temp.length - 1);
         }
         expect(endString).toBe(endingText);
      });

      it("replaces the &nbsp; with spaces", function() {
         textbox._editor.html = '<p>Hi &nbsp; &nbsp;there</p>';
         expect(textbox.getTrackedMentions().textData[0].value).toEqual('Hi    there');
      });
      
      it("replaces <BR> inside <P> with newline elements", function() {
         var startingText = '<p>line1<br />line2</p><p>line3<br>line4</p>';
         var endingText = 'line1\\nline2\\nline3\\nline4\\n';
         var i, temp, endString = '';
         textbox._editor.html = startingText;
         var mentionsData = textbox.getTrackedMentions();
         for (i = 0; i < mentionsData.textData.length; i++) {
            temp = dojo.toJson(mentionsData.textData[i].value);
            endString += temp.substring(1, temp.length - 1);
         }
         expect(endString).toBe(endingText);
      });

      it("returns null if the mixed in class doesn't have a mentions helper", function() {
         expect(function() {
            textbox_without_rte.getTrackedMentions()
         }).not.toThrow();
         expect(textbox_without_rte.getTrackedMentions()).toBeNull();
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupportRTE.getValue() method", function() {
      it("returns the expected result when passed HTML, even if plainTextOnly is false", function() {
         textbox._editor.html = renderedHTML;
         expect(textbox.getValue()).toEqual(renderedHTML);
      });

      it("Will cancel any active uncompleted mentions before moving forward", function() {
         spyOn(textbox._editor.plugins.mentions, 'cancelActiveMentions');
         textbox.getValue(true);
         expect(textbox._editor.plugins.mentions.cancelActiveMentions).toHaveBeenCalled();
      });
      
      it("When plainTextOnly is true or false, plaintext will be returned as-is", function() {
         textbox._editor.html = plainTextValue;
         expect(textbox.getValue()).toBe(plainTextValue);
         expect(textbox.getValue(true)).toBe(plainTextValue);
      });

      it("When plainTextOnly is true, and data includes a mentions; the microformat is rendered", function() {
         textbox._editor.html = htmlFormattedMention;
         var res = textbox.getValue(true);
         expect(res).not.toContain(htmlFormattedMention);
         expect(res).toContain('@{{8e88c240-f6df-1032-9bbc-d02a14283ea9|Amy Jones332|notify}}');
      });
      
      it("When plainTextOnly is false, the text box data will be properly returned", function() {
         textbox._editor.html = htmlFormattedMention;
         var res = textbox.getValue(false);
         expect(res).toContain(htmlFormattedMention);
         expect(res).not.toBe('@{{8e88c240-f6df-1032-9bbc-d02a14283ea9|Amy Jones332|notify}}');
      });
      
      it("When there is no mentions plugin present and plainTextOnly is true, not null will be returned", function() {
         var plugins = textbox._editor.plugins;
         textbox._editor.plugins = {};
         expect(textbox.getValue(true)).not.toBeNull();
         textbox._editor.plugins = plugins;
      });

      it("When plainTextOnly is true, the HTML entity is printed literally (e.g. <abc>def</abc> appears as <abc>def</abc>)", function() {
         textbox._editor.html = renderedHTML;
         expect(textbox.getValue(true)).toContain(renderedHTML);
      });
   });

   describe("the lconn.core.lcTextArea.mixins.IMentionsSupportRTE.setValue() method", function() {
      var inputString = '<div> Hello world! I feel like mentioning someone in my team. First of all, <span class="vcard" data-mentions=\'{displayName:"Amy Jones2",userid:"54f2a0c3-5451-47b1-8160-4248bce21727"}\'> <a class="fn url" href="">@Amy Jones2</a> <span class="x-lconn-userid" style="display:none">54f2a0c3-5451-47b1-8160-4248bce21727</span> </span> for her countless hours spent debugging customer problems, then cheers to <span class="vcard" data-mentions=\'{displayName:"Bill User10",userid:"63b49463-e7de-49aa-88ea-fa6e0750edcc"}\'> <a class="fn url" href="">@Bill User10</a> <span class="x-lconn-userid" style="display:none">63b49463-e7de-49aa-88ea-fa6e0750edcc</span> </span> for resolving once for all the issues by writing an extensive suite of unit tests. Finally, I\'d like to spend a word to commend the efforts by <span class="vcard" data-mentions=\'{displayName:"%Susan% &Adams43&^",userid:"1b7dd5f0-1767-4594-86b1-4263169711db"}\'> <a class="fn url" href="">%Susan% &Adams43&^</a> <span class="x-lconn-userid" style="display:none">1b7dd5f0-1767-4594-86b1-4263169711db</span> </span> who, by the way, cannot be notified of this mention cause she left the team in anger.</div>';
      var dualFormatValue = dojo.string.substitute('<span widgetid="mentionstextAreaNode_0_mentionsNode_0" class="vcard" type="PersonMentionsNode" id="mentionstextAreaNode_0_mentionsNode_0" tabindex="-1" contenteditable="false"><a target="_blank" aria-describedby="semtagmenu" class="fn lotusPerson bidiAware" href="${0}/html/profileView.do?userid=8e88c240-f6df-1032-9bbc-d02a14283ea9" contenteditable="false">@Amy Jones332</a><span style="display: none;" class="x-lconn-userid">8e88c240-f6df-1032-9bbc-d02a14283ea9</span></span> and my pal @{{8f2158c0-f6df-1032-9be7-d02a14283ea9|Amy Jones375|notify}}',
            [lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).toString()])
      var encodedHTML = '&lt;div&gt; Hello world! I feel like mentioning someone in my team. First of all, <span class="vcard" data-mentions=\'{displayName:"Amy Jones2",userid:"54f2a0c3-5451-47b1-8160-4248bce21727"}\'> <a class="fn url" href="">@Amy Jones2</a> <span class="x-lconn-userid" style="display:none">54f2a0c3-5451-47b1-8160-4248bce21727</span> </span> for her countless hours spent debugging customer problems, then cheers to <span class="vcard" data-mentions=\'{displayName:"Bill User10",userid:"63b49463-e7de-49aa-88ea-fa6e0750edcc"}\'> <a class="fn url" href="">@Bill User10</a> <span class="x-lconn-userid" style="display:none">63b49463-e7de-49aa-88ea-fa6e0750edcc</span> </span> for resolving once for all the issues by writing an extensive suite of unit tests. Finally, I\'d like to spend a word to commend the efforts by <span class="vcard" data-mentions=\'{displayName:"%Susan% &Adams43&^",userid:"1b7dd5f0-1767-4594-86b1-4263169711db"}\'> <a class="fn url" href="">%Susan% &Adams43&^</a> <span class="x-lconn-userid" style="display:none">1b7dd5f0-1767-4594-86b1-4263169711db</span> </span> who, by the way, cannot be notified of this mention cause she left the team in anger.&lt;/div&gt;';
      var renderedPlainText = '&lt;div&gt; Hello world! I feel like mentioning someone in my team. First of all, &lt;span class=&quot;vcard&quot; data-mentions=\'{displayName:&quot;Amy Jones2&quot;,userid:&quot;54f2a0c3-5451-47b1-8160-4248bce21727&quot;}\'&gt; &lt;a class=&quot;fn url&quot; href=&quot;&quot;&gt;@Amy Jones2&lt;/a&gt; &lt;span class=&quot;x-lconn-userid&quot; style=&quot;display:none&quot;&gt;54f2a0c3-5451-47b1-8160-4248bce21727&lt;/span&gt; &lt;/span&gt; for her countless hours spent debugging customer problems, then cheers to &lt;span class=&quot;vcard&quot; data-mentions=\'{displayName:&quot;Bill User10&quot;,userid:&quot;63b49463-e7de-49aa-88ea-fa6e0750edcc&quot;}\'&gt; &lt;a class=&quot;fn url&quot; href=&quot;&quot;&gt;@Bill User10&lt;/a&gt; &lt;span class=&quot;x-lconn-userid&quot; style=&quot;display:none&quot;&gt;63b49463-e7de-49aa-88ea-fa6e0750edcc&lt;/span&gt; &lt;/span&gt; for resolving once for all the issues by writing an extensive suite of unit tests. Finally, I\'d like to spend a word to commend the efforts by &lt;span class=&quot;vcard&quot; data-mentions=\'{displayName:&quot;%Susan% &amp;Adams43&amp;^&quot;,userid:&quot;1b7dd5f0-1767-4594-86b1-4263169711db&quot;}\'&gt; &lt;a class=&quot;fn url&quot; href=&quot;&quot;&gt;%Susan% &amp;Adams43&amp;^&lt;/a&gt; &lt;span class=&quot;x-lconn-userid&quot; style=&quot;display:none&quot;&gt;1b7dd5f0-1767-4594-86b1-4263169711db&lt;/span&gt; &lt;/span&gt; who, by the way, cannot be notified of this mention cause she left the team in anger.&lt;/div&gt;';

      it("correctly sets the expected value into the text box", function() {
         var testText = "going once, going twice, sold";
         textbox.setValue(testText, false);
         expect(textbox._editor.getData()).toEqual('<p>' + testText + '</p>');
         textbox.setValue(testText, true);
         expect(textbox._editor.getData()).toEqual('<p>' + testText + '</p>');
      });

      it("correctly sets the expected value into the text box even when passed HTML", function() {
         textbox.setValue(inputString, false);
         expect(textbox._editor.getData()).toEqual('<p>' + encodedHTML + '</p>');
         textbox.setValue(inputString, true);
         expect(textbox._editor.getData()).toEqual('<p>' + renderedPlainText + '</p>');
      });

      it("Will call cancelActiveMentions to cancel any active uncompleted mentions before moving forward", function() {
         spyOn(textbox._editor.plugins.mentions, 'cancelActiveMentions');
         textbox.setValue(plainTextValue);
         expect(textbox._editor.plugins.mentions.cancelActiveMentions).toHaveBeenCalled();
      });

      it("When plainTextOnly is true or false, plaintext will be set to BTB as-is", function() {
         textbox.setValue(plainTextValue);
         expect(textbox.getText()).toBe(plainTextValue);
         textbox.setValue(plainTextValue, true);
         expect(textbox.getText()).toBe(plainTextValue);
      });

      it("When plainTextOnly is true, and data includes both HTML and microformat mentions; Only microformat is rendered", function() {
         textbox.setValue(dualFormatValue, true);
         expect(textbox.getText()).not.toContain(htmlFormattedMention);
         expect(textbox.getText()).toContain(plainFormattedMention);
      });

      it("When plainTextOnly is false, and data includes both HTML and microformat mentions; Both formats are rendered", function() {
         textbox.setValue(dualFormatValue);
         expect(textbox.getText()).toContain(htmlFormattedMention);
         expect(textbox.getText()).toContain(plainFormattedMention);
      });

      it("When plainTextOnly is true, the HTML entity is printed literally (e.g. <abc>def</abc> appears as <abc>def</abc>)", function() {
         textbox.setValue(randomHTMLValue, true);
         expect(textbox.getText()).toContain(nonRenderedHTML);
         expect(textbox.getText()).not.toContain(renderedHTML);
      });
      it("value contains an arbitrary HTML entity, plainTextOnly is false, the HTML entity is rendered (e.g. <abc>def</abc> appears as def)", function() {
         textbox.setValue(randomHTMLValue);
         expect(textbox.getText()).not.toContain(renderedHTML);
         expect(textbox.getText()).toContain(nonRenderedHTML);
      });
      it("will correctly format a textbox without the mentions plugin", function() {
         var plugins = textbox._editor.plugins;
         textbox._editor.plugins = {};
         textbox.setValue(randomHTMLValue);
         expect(textbox.getText()).toBe(nonRenderedHTML);
         textbox._editor.plugins = plugins;
      });

   });

}(lconn.test.jasmine.lcTextArea._DummyRTE, lconn.test.jasmine.lcTextArea._MockRTE));
