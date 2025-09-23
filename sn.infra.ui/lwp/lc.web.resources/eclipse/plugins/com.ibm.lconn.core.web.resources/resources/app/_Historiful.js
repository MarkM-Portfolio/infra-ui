/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Adds history tracking to application instances
 * @mixin lconn.core.app._Historiful
 */
dojo.provide('lconn.core.app._Historiful');
dojo.require('lconn.core.app.history');

(function(window, document) {
   var c = [], s = [], h = lconn.core.app.history;
   // TODO: validate the hyperlink is a valid route
   function i(a) {
      return true;
   }
   function n(t) {
      while (t) {
         if (t.nodeName === "A") return t;
         t = t.parentNode;
      }
   }
   function onClick(e) {
      console.log('_Historiful.onClick');
      console.dir(arguments);
      var a;
      if (e && e.target) {
         a = n(e.target);
         if (i(a)) {
            dojo.stopEvent(e);
            this.navigate(a.href);
         }
      }
   }
   function onChange() {
      console.log('_Historiful.onChange');
      console.dir(arguments);
   }
   dojo.declare('lconn.core.app._Historiful', null, /** @lends lconn.core.app._Historiful.prototype */ {
      constructor: function() {
         console.log('_Historiful.constructor');
         c.push(dojo.connect(document, 'onclick', dojo.hitch(this, onClick)));
         s.push(dojo.subscribe(lconn.core.app.history.TOPIC, dojo.hitch(this, onChange)));
      },
      /** Overridden */
      navigate: function(href) {
         h.push(href, {}); // TODO: state should include everything that's not in the URL
         var scene = this.resolveScene();
         if (this.scene)
            this.scene.end(scene);
         this.scene = scene;
         scene.begin();
      },
      /** app.quit ??? */
      quit: function() {
         console.log('_Historiful.quit');
         dojo.map(c, dojo.disconnect);
         dojo.map(s, dojo.unsubscribe);
      }
   });
// Create a closure on window and document so we're safe in case custom code tampers with them
}(window, document));
