define([
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/on",
      "dojo/topic",
      "ic-core/app/history"
], function(array, declare, lang, on, topic, history) {

   /* Copyright IBM Corp. 2013, 2015 All Rights Reserved. */

   /**
    * Adds history tracking to application instances
    * 
    * @mixin ic-core.app._Historiful
    */
   var c = [], s = [], h = history;
   // TODO: validate the hyperlink is a valid route
   function i(a) {
      return true;
   }
   function n(t) {
      while (t) {
         if (t.nodeName === "A")
            return t;
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
            e.preventDefault(), e.stopPropagation();
            this.navigate(a.href);
         }
      }
   }
   function onChange() {
      console.log('_Historiful.onChange');
      console.dir(arguments);
   }
   var _Historiful = declare('core.app._Historiful', null, /** @lends ic-core.app._Historiful.prototype */
   {
      constructor : function() {
         console.log('_Historiful.constructor');
         c.push(on(document, "click", lang.hitch(this, onClick)));
         s.push(topic.subscribe(history.TOPIC, lang.hitch(this, onChange)));
      },
      /** Overridden */
      navigate : function(href) {
         h.push(href, {}); // TODO: state should include everything that's not
                           // in the URL
         var scene = this.resolveScene();
         if (this.scene)
            this.scene.end(scene);
         this.scene = scene;
         scene.begin();
      },
      /** app.quit ??? */
      quit : function() {
         console.log('_Historiful.quit');
         array.map(c, dojo.disconnect);
         array.map(s, dojo.unsubscribe);
      }
   });
   return _Historiful;
});
