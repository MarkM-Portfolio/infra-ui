/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for people layout API
 * 
 * @module ic-test.layout.peopleSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
        'dojo/_base/window',
        'dojo/dom-class',
        'dojo/dom-construct',
        'ic-ui/layout/people'
], function(win, domClass, domConstruct, peopleLayout) {
   var USER = {
      name : 'Andreas Berzat',
      userid : '49176fe8-16c8-4c36-8e29-b146e2e36dd4'
   }, INACTIVE_USER = {
      name : 'Dina Maroni',
      userid : 'fd581390-6718-47d4-8ebb-50fd7e99b950',
      state : 'inactive'
   };

   describe("the interface of ic-ui/layout/people", function() {
      it("implements the expected methods", function() {
         expect(peopleLayout.createLink).toEqual(jasmine.any(Function));
         expect(peopleLayout.createImage).toEqual(jasmine.any(Function));
         expect(peopleLayout.getProfileUrl).toEqual(jasmine.any(Function));
         expect(peopleLayout.getImageUrl).toEqual(jasmine.any(Function));
         expect(peopleLayout.isImageEnabled).toEqual(jasmine.any(Function));
      });
   });

   describe("the ic-ui/layout/people::createLink() method", function() {
      it("returns a bizcard microformat linking to Profiles when passing the user as first argument", function() {
         var link = peopleLayout.createLink(USER);

         expect(link.tagName).toBe('A');
         expect(link.className).toBe('fn lotusPerson bidiAware');
         expect(link.childNodes.length).toBe(2);
         expect(link.childNodes[0].nodeValue).toBe(USER.name);
         expect(link.childNodes[1].tagName).toBe('SPAN');
         expect(link.childNodes[1].className).toBe('x-lconn-userid');
         expect(link.childNodes[1].innerHTML).toBe(USER.userid);
      });

      it("returns a bizcard microformat linking to Profiles when passing the user as first argument, and a hyperlink node as third argument", function() {
         var parent = dojo.create('a');
         var link = peopleLayout.createLink(USER, null, parent);

         expect(link).toBe(parent);
         expect(link.tagName).toBe('A');
         expect(link.className).toBe('fn vcard lotusPerson bidiAware');
         expect(link.childNodes.length).toBe(2);
         expect(link.childNodes[0].nodeValue).toBe(USER.name);
         expect(link.childNodes[1].tagName).toBe('SPAN');
         expect(link.childNodes[1].className).toBe('x-lconn-userid');
         expect(link.childNodes[1].innerHTML).toBe(USER.userid);
      });

      it("returns a bizcard microformat linking to Profiles when passing the user as first argument, a text node as second argument, and a hyperlink node as third argument",
         function() {
            var parent = domConstruct.create('a');
            var child = win.doc.createTextNode('Susan Adams44');
            var link = peopleLayout.createLink(USER, child, parent);

            expect(link).toBe(parent);
            expect(link.tagName).toBe('A');
            expect(link.className).toBe('fn vcard lotusPerson bidiAware');
            expect(link.childNodes.length).toBe(2);
            expect(link.childNodes[0]).toBe(child);
            expect(link.childNodes[0].nodeValue).toBe(child.nodeValue);
            expect(link.childNodes[1].tagName).toBe('SPAN');
            expect(link.childNodes[1].className).toBe('x-lconn-userid');
            expect(link.childNodes[1].innerHTML).toBe(USER.userid);
         });

      it("returns a bizcard microformat linking to Profiles when passing the user as first argument, and a text node as second argument", function() {
         var child = win.doc.createTextNode('Susan Adams44');
         var link = peopleLayout.createLink(USER, child);

         expect(link.tagName).toBe('A');
         expect(link.className).toBe('fn lotusPerson bidiAware');
         expect(link.childNodes.length).toBe(2);
         expect(link.childNodes[0]).toBe(child);
         expect(link.childNodes[0].nodeValue).toBe(child.nodeValue);
         expect(link.childNodes[1].tagName).toBe('SPAN');
         expect(link.childNodes[1].className).toBe('x-lconn-userid');
         expect(link.childNodes[1].innerHTML).toBe(USER.userid);
      });

      it("sets the expected class when the user is active", function() {
         var link = peopleLayout.createLink(USER);

         expect(domClass.contains(link, "lotusPerson")).toBeTruthy();
         expect(domClass.contains(link, "lotusPersonInactive")).toBeFalsy();
      });

      it("sets the expected class when the user is inactive", function() {
         var link = peopleLayout.createLink(INACTIVE_USER);

         expect(domClass.contains(link, "lotusPerson")).toBeFalsy();
         expect(domClass.contains(link, "lotusPersonInactive")).toBeTruthy();
      });
   });
});
