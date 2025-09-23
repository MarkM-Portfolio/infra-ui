/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo/parser",
      "dojo/Deferred",
      "dojo/promise/all",
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojo/dom-construct",
      "dijit/Editor"
], function(parser, Deferred, all, array, lang, domConstruct, Editor) {

   function waitForLoad() {
      // summary:
      // Returns Promise that fires when all widgets have finished
      // initializing

      var d = new Deferred();

      dojo.addOnLoad(function() {
         // Deferred fires when all widgets with an onLoadDeferred have
         // fired
         var widgets = array.filter(dijit.registry.toArray(), function(w) {
            return w.declaredClass === "dijit.Editor" && w.onLoadDeferred;
         }), deferreds = array.map(widgets, function(w) {
            return w.onLoadDeferred;
         });
         console.log("Waiting for " + widgets.length + " widgets: " + array.map(widgets, function(w) {
            return w.id;
         }).join(", "));
         new all(deferreds).then(function() {
            console.log("All widgets loaded.");
            d.resolve(widgets);
         });
      });

      return d.promise;
   }

   describe("dijit.Editor", function() {
      var d = domConstruct.create('div', {}, dojo.body());
      beforeEach(function() {
         d.appendChild(dojo.toDom('<div data-dojo-id="editor" data-dojo-type="dijit/Editor" data-dojo-props=\'"aria-label":"editor", name:"field"\'></div>'));
         parser.parse();
      });
      afterEach(function() {
         array.forEach(dijit.findWidgets(d), function(w) {
            w.destroyRecursive();
         });
         while (d.childNodes[0]) {
            d.removeChild(d.childNodes[0]);
         }
      });
      it("In some browsers, the editor will not yet be loaded. Testing that no error occurs when retrieving the value", function() {
         var editor = lang.getObject("editor");
         // In some browsers, the editor will not yet be
         // loaded.
         // Testing that no
         // error occurs
         // when retrieving the value.
         expect(editor.get("value")).toEqual("");
      });
      // wait for editors to load
      it("set value on unfocused editor", function(done) {
         waitForLoad().then(function() {
            var editor = lang.getObject("editor");
            editor.set("value", "hello");
            editor.focus();
            expect(editor.editNode.textContent || editor.editNode.innerText).toEqual("hello");
            expect(editor.get("value")).toEqual("hello");
            done();
         });
      });
      it("initial value of unloaded editor", function() {
         var tmpEditor = new Editor({});
         expect(tmpEditor.get("value") == null).toBeTruthy();
         expect(tmpEditor.isLoaded).toBeFalsy();
      });
      it("initial value of unloaded editor", function() {
         var tmpEditor = new Editor({});
         expect(tmpEditor.get("value") == null).toBeTruthy();
         expect(tmpEditor.value == null).toBeTruthy();
         expect(tmpEditor.isLoaded).toBeFalsy();
         tmpEditor.startup();
         expect(tmpEditor.get("value")).toEqual("");
         expect(tmpEditor.value).toEqual("");
         expect(tmpEditor.isLoaded).toBeFalsy();
      });

      it("get value of unloaded editor", function() {
         var tmpEditor = new Editor({
            value : "test editor value"
         });
         expect(tmpEditor.get("value")).toEqual("test editor value");
         expect(tmpEditor.value).toEqual("test editor value");
         expect(tmpEditor.isLoaded).toBeFalsy();
         tmpEditor.startup();
         expect(tmpEditor.get("value")).toEqual("test editor value");
         expect(tmpEditor.value).toEqual("test editor value");
         expect(tmpEditor.isLoaded).toBeFalsy();
      });
   });
});
