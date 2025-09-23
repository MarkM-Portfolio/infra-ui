/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

/**
 * Jasmine spec for {@link lconn.core.lcTextArea.mixins.Mentions}
 * 
 * @module lconn.core.lcTextArea.mixins.MentionsSpec
 */
dojo.provide("lconn.test.jasmine.lcTextArea.MentionsSpec");

dojo.require("lconn.core.lcTextArea.mixins.Mentions");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");

(function(mentions) {

   describe("the lconn.core.lcTextArea.mixins.Mentions", function() {
      it("implements the expected methods", function() {
         expect(mentions.formatGetValue).toEqual(jasmine.any(Function));
         expect(mentions.formatSetValue).toEqual(jasmine.any(Function));
         expect(mentions.getRTEPlainMention).toEqual(jasmine.any(Function));
         expect(mentions.getDataMentions).toEqual(jasmine.any(Function));
      });
   });

   var plainTextTest = 'hello there, this is plain test text';

   describe('the method lconn.core.lcTextArea.mixins.Mentions.formatGetValue()', function() {
      var plainTextTestP = '<p>hello there, this is plain test text</p>';
      var plainLinkTest = '<p>lets go to <a href="http://www.ibm.com" >www.ibm.com</a>&nbsp;later</p>';
      var plainLinkResult = 'lets go to www.ibm.com\u00a0later';
      var mentionsFormatTest = '<p>hello there&nbsp;<span contenteditable="false" class="vcard"><a class="fn url" href="http://lcauto33.swg.usma.ibm.com/profiles/html/profileView.do?userid=8f2158c0-f6df-1032-9bd5-d02a14283ea9">@Amy Jones357</a> <span class="x-lconn-userid" style="display: none">8f2158c0-f6df-1032-9bd5-d02a14283ea9</span></span>\u200b whats up?</p>';
      var mentionsFormatResult = 'hello there\u00a0@{{8f2158c0-f6df-1032-9bd5-d02a14283ea9|Amy Jones357|notify}} whats up?';
      var plainTextFormatTest = '<p>hello there\u00a0@{{8f2158c0-f6df-1032-9bd5-d02a14283ea9|Amy Jones357|notify}} whats up?</p>';
      var plainTextFormatResult = 'hello there\u00a0@{{8f2158c0-f6df-1032-9bd5-d02a14283ea9|Amy Jones357|notify}} whats up?';
      var lineBreakTest = '<p>hey there&nbsp;<span contenteditable="false" class="vcard"><a class="fn url" href="http://lcauto33.swg.usma.ibm.com/profiles/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">@Amy Jones404</a> <span class="x-lconn-userid" style="display: none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>\u200b</p><p>how</p><p>are</p><p><br></p><p>you?</p>';
      var lineBreakResult = 'hey there\u00a0@{{d7d911c0-f6df-1032-9c04-d02a14283ea9|Amy Jones404|notify}}\nhow\nare\n\nyou?';

      it('correctly returns plainText and links', function() {
         expect(mentions.formatGetValue(plainTextTestP)).toBe(plainTextTest);
         expect(mentions.formatGetValue(plainLinkTest)).toBe(plainLinkResult);
      });

      it('correctly updates mentions into the plainText microFormat', function() {
         expect(mentions.formatGetValue(mentionsFormatTest)).toBe(mentionsFormatResult);
      });

      it('correctly handles mentions already passed in as the plainText microFormat', function() {
         expect(mentions.formatGetValue(plainTextFormatTest)).toBe(plainTextFormatResult);
      });

      it('correctly handles and reformats any line breaks in the cke html', function() {
         expect(mentions.formatGetValue(lineBreakTest)).toBe(lineBreakResult);
      });

      it('correctly removes duplicated new lines', function() {
         expect(mentions.formatGetValue("<p>a<br></p><p>b<br></p><p>c<br></p>")).toBe('a\nb\nc');
      });

      it('correctly keeps <br> when they are valid new lines', function() {
         expect(mentions.formatGetValue("<p>a<br>b<br>c</p>")).toBe('a\nb\nc');
      });
   });

   describe('the method lconn.core.lcTextArea.mixins.Mentions.formatSetValue()', function() {
      var serviceURL = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles);
      var plainTextFormattedTest = 'hello there whats up &lt;span contenteditable=&quot;false&quot; class=&quot;vcard&quot;&gt; &lt;a class=&quot;fn url&quot; href=&quot;lcauto33.swg.usma.ibm.com/profiles/html/profileView.do?userid=8f2158c0-f6df-1032-9bd5-d02a14283ea9&quot;&gt;@Amy Jones357&lt;/a&gt; &lt;span class=&quot;x-lconn-userid&quot; style=&quot;display: none&quot;&gt;8f2158c0-f6df-1032-9bd5-d02a14283ea9&lt;/span&gt;&lt;/span&gt;';
      var plainTextFormattedTestRes = 'hello there whats up &lt;span contenteditable=&quot;false&quot; class=&quot;vcard&quot;&gt; &lt;a class=&quot;fn url&quot; href=&quot;lcauto33.swg.usma.ibm.com/profiles/html/profileView.do?userid=8f2158c0-f6df-1032-9bd5-d02a14283ea9&quot;&gt;@Amy Jones357&lt;/a&gt; &lt;span class=&quot;x-lconn-userid&quot; style=&quot;display: none&quot;&gt;8f2158c0-f6df-1032-9bd5-d02a14283ea9&lt;/span&gt;&lt;/span&gt;';
      var dualFormatTest = 'hello there\u00a0@{{8f2158c0-f6df-1032-9bd5-d02a14283ea9|Amy Jones357|notify}}  and <span contenteditable="false" class="vcard"> <a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=8cbefec0-f6df-1032-9aee-d02a14283ea9">@Amy Jones126</a> <span class="x-lconn-userid" style="display: none">8cbefec0-f6df-1032-9aee-d02a14283ea9</span></span>\u200b';
      var dualFormatResult = 'hello there&nbsp;<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones357","userId":"8f2158c0-f6df-1032-9bd5-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=8f2158c0-f6df-1032-9bd5-d02a14283ea9">@Amy Jones357</a><span class="x-lconn-userid" style="display:none">8f2158c0-f6df-1032-9bd5-d02a14283ea9</span></span>  and <span contenteditable="false" class="vcard"> <a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=8cbefec0-f6df-1032-9aee-d02a14283ea9">@Amy Jones126</a> <span class="x-lconn-userid" style="display: none">8cbefec0-f6df-1032-9aee-d02a14283ea9</span></span>\u200b';
      var dualPTFormatTest = 'hello there\u00a0@{{8f2158c0-f6df-1032-9bd5-d02a14283ea9|Amy Jones357|notify}}  and &lt;span contenteditable=&quot;false&quot; class=&quot;vcard&quot;&gt; &lt;a class=&quot;fn url&quot; href=&quot;"' + serviceURL + '/html/profileView.do?userid=8cbefec0-f6df-1032-9aee-d02a14283ea9&quot;&gt;@Amy Jones126&lt;/a&gt; &lt;span class=&quot;x-lconn-userid&quot; style=&quot;display: none&quot;&gt;8cbefec0-f6df-1032-9aee-d02a14283ea9&lt;/span&gt;&lt;/span&gt;\u200b&lt;br&gt;';
      var dualPTFormatResult = 'hello there\u00a0<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones357","userId":"8f2158c0-f6df-1032-9bd5-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=8f2158c0-f6df-1032-9bd5-d02a14283ea9">@Amy Jones357</a><span class="x-lconn-userid" style="display:none">8f2158c0-f6df-1032-9bd5-d02a14283ea9</span></span>  and &lt;span contenteditable=&quot;false&quot; class=&quot;vcard&quot;&gt; &lt;a class=&quot;fn url&quot; href=&quot;"' + serviceURL + '/html/profileView.do?userid=8cbefec0-f6df-1032-9aee-d02a14283ea9&quot;&gt;@Amy Jones126&lt;/a&gt; &lt;span class=&quot;x-lconn-userid&quot; style=&quot;display: none&quot;&gt;8cbefec0-f6df-1032-9aee-d02a14283ea9&lt;/span&gt;&lt;/span&gt;\u200b&lt;br&gt;';
      var dualPTFormatResultEncoded = 'hello there&nbsp;<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones357","userId":"8f2158c0-f6df-1032-9bd5-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=8f2158c0-f6df-1032-9bd5-d02a14283ea9">@Amy Jones357</a><span class="x-lconn-userid" style="display:none">8f2158c0-f6df-1032-9bd5-d02a14283ea9</span></span>  and &amp;lt;span contenteditable=&amp;quot;false&amp;quot; class=&amp;quot;vcard&amp;quot;&amp;gt; &amp;lt;a class=&amp;quot;fn url&amp;quot; href=&amp;quot;&quot;' + serviceURL + '/html/profileView.do?userid=8cbefec0-f6df-1032-9aee-d02a14283ea9&amp;quot;&amp;gt;@Amy Jones126&amp;lt;/a&amp;gt; &amp;lt;span class=&amp;quot;x-lconn-userid&amp;quot; style=&amp;quot;display: none&amp;quot;&amp;gt;8cbefec0-f6df-1032-9aee-d02a14283ea9&amp;lt;/span&amp;gt;&amp;lt;/span&amp;gt;\u200b&amp;lt;br&amp;gt;';
      var lineBreakTest = 'hey there\u00a0@{{d7d911c0-f6df-1032-9c04-d02a14283ea9|Amy Jones404|notify}} \nhow\nare\n\nyou<p>doing?</p>';
      var lineBreakResult = 'hey there\u00a0<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones404","userId":"d7d911c0-f6df-1032-9c04-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">@Amy Jones404</a><span class="x-lconn-userid" style="display:none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span> <br>how<br>are<br><br>you<p>doing?</p>';
      var lineBreakResultEncoded = 'hey there&nbsp;<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones404","userId":"d7d911c0-f6df-1032-9c04-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">@Amy Jones404</a><span class="x-lconn-userid" style="display:none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span> <br>how<br>are<br><br>you&lt;p&gt;doing?&lt;/p&gt;';
      var lineBreakTest2 = 'hey there <span contenteditable="false" class="vcard"><a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">@Amy Jones404</a> <span class="x-lconn-userid" style="display: none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>\u200b</p><p>how</p><p>are</p><p><br></p><p>you?';
      var lineBreakTest2Res = 'hey there <span contenteditable="false" class="vcard"><a class="fn url" href="' + serviceURL + '/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">@Amy Jones404</a> <span class="x-lconn-userid" style="display: none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>\u200b</p><p>how</p><p>are</p><p><br></p><p>you?';

      it('correctly returns plainText without alterations', function() {
         expect(mentions.formatSetValue(plainTextTest)).toBe(plainTextTest);
      });

      it('correctly updates the plainText microFormat', function() {
         expect(mentions.formatSetValue(plainTextFormattedTest, true)).toBe(plainTextFormattedTestRes);
      });

      it('correctly handles both forms of mentions together and updates them', function(){
         expect(mentions.formatSetValue(dualFormatTest)).toBe(dualFormatResult);
         expect(mentions.formatSetValue(dualPTFormatTest)).toBe(dualPTFormatResultEncoded);
         expect(mentions.formatSetValue(dualPTFormatTest, true)).toBe(dualPTFormatResult);
      });

      it('correctly handles any line breaks', function(){
         expect(mentions.formatSetValue(lineBreakTest, true)).toBe(lineBreakResult);
         expect(mentions.formatSetValue(lineBreakTest)).toBe(lineBreakResultEncoded);
         expect(mentions.formatSetValue(lineBreakTest2, true)).toBe(lineBreakTest2Res);
      });
   });

   describe("the method lconn.core.lcTextArea.mixins.Mentions.getDataMentions()", function() {
      it("returns the right information extracted from a mentions node", function() {
         var mentionsNode = dojo.toDom('<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones404","userId":"d7d911c0-f6df-1032-9c04-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="www.ibm.com/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">@Amy Jones404</a><span class="x-lconn-userid" style="display:none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>');
         var resObject = {displayName: "Amy Jones404", userId: "d7d911c0-f6df-1032-9c04-d02a14283ea9", type: "PersonMentions", hasSymbol: true};
         expect(mentions.getDataMentions(mentionsNode)).toEqual(resObject);
      });

      it("returns hasSymbol = false when the user has no '@' symbol", function() {
         var mentionsNoSymbol = dojo.toDom('<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones404","userId":"d7d911c0-f6df-1032-9c04-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="www.ibm.com/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">Amy Jones404</a><span class="x-lconn-userid" style="display:none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>');
         expect(mentions.getDataMentions(mentionsNoSymbol).hasSymbol).toBeFalsy();
      });
   });
   
   describe("the method lconn.core.lcTextArea.mixins.Mentions.getRTEPlainMention()", function() {
      it("returns the right information extracted from a mentions node", function() {
         var mentionsNode = dojo.toDom('<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones404","userId":"d7d911c0-f6df-1032-9c04-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="www.ibm.com/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">@Amy Jones404</a><span class="x-lconn-userid" style="display:none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>');
         expect(mentions.getRTEPlainMention(mentionsNode)).toBe("@{{d7d911c0-f6df-1032-9c04-d02a14283ea9|Amy Jones404|notify}}");
      });

      it("removes the notify from the output string when not '@' is present", function() {
         var mentionsNoSymbol = dojo.toDom('<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones404","userId":"d7d911c0-f6df-1032-9c04-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="www.ibm.com/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">Amy Jones404</a><span class="x-lconn-userid" style="display:none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>');
         expect(mentions.getRTEPlainMention(mentionsNoSymbol)).toBe("@{{d7d911c0-f6df-1032-9c04-d02a14283ea9|Amy Jones404}}");
      });
      
      it("returns no userId when there is no .x-lconn-userid", function() {
         var mentionsNoSymbol = dojo.toDom('<span class="vcard" type="MentionsNode" contenteditable="false" data-mentions=\'{"displayName":"Amy Jones404","userId":"d7d911c0-f6df-1032-9c04-d02a14283ea9","type":"PersonMentions","hasSymbol":"true"}\'><a class="fn url" href="www.ibm.com/html/profileView.do?userid=d7d911c0-f6df-1032-9c04-d02a14283ea9">Amy Jones404</a><span style="display:none">d7d911c0-f6df-1032-9c04-d02a14283ea9</span></span>');
         expect(mentions.getRTEPlainMention(mentionsNoSymbol)).toBe("@{{|Amy Jones404}}");
      });
   });

}(lconn.core.lcTextArea.mixins.Mentions));

