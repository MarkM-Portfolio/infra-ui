define([
   "dojo/_base/declare",
   "dojo/Stateful",
   "dojo/_base/lang"
], function (declare, Stateful, lang) {
   return declare([ Stateful ], {
      constructor: function () {
         this.watch("text", lang.hitch(this, function () {
            this._setValue("loading", false);
            this._setValue("error", false);
         }));

         this.watch("loading", lang.hitch(this, function () {
            if (this.get("loading")) {
               this._setValue("error", false);
            }
         }));

         this.watch("error", lang.hitch(this, function () {
            if (this.get("error")) {
               this._setValue("loading", false);
            }
         }));
      },

      _setValue: function (key, value) {
         if (this.get(key) !== value) {
            this.set(key, value);
         }
      }
   });
});