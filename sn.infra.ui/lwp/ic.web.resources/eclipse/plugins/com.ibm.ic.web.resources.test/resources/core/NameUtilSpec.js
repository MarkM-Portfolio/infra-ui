/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([ "ic-core/NameUtil"
],
   function(NameUtil) {
      describe('the ic-core/NameUtil helper',
         function() {
            it('implements the expected methods', function() {
               expect(NameUtil.getHTML).toEqual(jasmine.any(Function));
            });

            it('the method getHTML() returns a personcard microformat - userid',
               function() {
                  expect(NameUtil.getHTML(undefined, undefined, '3ea66ddb-870b-42cd-89f6-340d90dbf31e'))
                        .toEqual('<span><span class="vcard"><span class="fn person lotusPerson bidiAware">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
            it('the method getHTML() returns a personcard microformat - email, userid',
               function() {
                  expect(NameUtil.getHTML(undefined, 'aberzat@renovations.com', '3ea66ddb-870b-42cd-89f6-340d90dbf31e'))
                        .toEqual('<span><span class="vcard"><span class="fn person lotusPerson bidiAware">aberzat@renovations.com</span><span class="email" style="display: none;">aberzat@renovations.com</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
            it('the method getHTML() returns a personcard microformat - name, userid',
               function() {
                  expect(NameUtil.getHTML('Andreas Berzat', undefined, '3ea66ddb-870b-42cd-89f6-340d90dbf31e'))
                        .toEqual('<span><span class="vcard"><span class="fn person lotusPerson bidiAware">Andreas Berzat</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
            it('the method getHTML() returns a personcard microformat - name, email, userid',
               function() {
                  expect(NameUtil.getHTML('Andreas Berzat', 'aberzat@renovations.com', '3ea66ddb-870b-42cd-89f6-340d90dbf31e'))
                        .toEqual('<span><span class="vcard"><span class="fn person lotusPerson bidiAware">Andreas Berzat</span><span class="email" style="display: none;">aberzat@renovations.com</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
            it('the method getHTML() returns a personcard microformat - name, email, userid, id',
               function() {
                  expect(NameUtil.getHTML('Andreas Berzat', 'aberzat@renovations.com', '3ea66ddb-870b-42cd-89f6-340d90dbf31e', 'foo'))
                        .toEqual('<span id="foo"><span class="vcard"><span class="fn person lotusPerson bidiAware">Andreas Berzat</span><span class="email" style="display: none;">aberzat@renovations.com</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
            it('the method getHTML() returns a personcard microformat - name, email, userid, id, isHTML',
               function() {
                  expect(NameUtil.getHTML('Andreas Berzat', 'aberzat@renovations.com', '3ea66ddb-870b-42cd-89f6-340d90dbf31e', 'foo', true))
                        .toEqual('<span id="foo"><span class="vcard"><span class="fn person lotusPerson bidiAware">Andreas Berzat</span><span class="email" style="display: none;">aberzat@renovations.com</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
            it('the method getHTML() returns a personcard microformat - name contains HTML, isHTML is false',
               function() {
                  expect(NameUtil.getHTML('<iframe></iframe>Andreas <b>B</b>erzat', 'aberzat@renovations.com', '3ea66ddb-870b-42cd-89f6-340d90dbf31e', 'foo'))
                        .toEqual('<span id="foo"><span class="vcard"><span class="fn person lotusPerson bidiAware">&lt;iframe&gt;&lt;/iframe&gt;Andreas &lt;b&gt;B&lt;/b&gt;erzat</span><span class="email" style="display: none;">aberzat@renovations.com</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
            it('the method getHTML() returns a personcard microformat - name contains HTML, isHTML is true',
               function() {
                  expect(NameUtil.getHTML('<iframe></iframe>Andreas <b>B</b>erzat',
                     'aberzat@renovations.com',
                     '3ea66ddb-870b-42cd-89f6-340d90dbf31e',
                     'foo',
                     true))
                        .toEqual('<span id="foo"><span class="vcard"><span class="fn person lotusPerson bidiAware"><iframe></iframe>Andreas <b>B</b>erzat</span><span class="email" style="display: none;">aberzat@renovations.com</span><span class="x-lconn-userid" style="display: none;">3ea66ddb-870b-42cd-89f6-340d90dbf31e</span></span></span>');
               });
         });
   });
