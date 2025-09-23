/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "ic-core/app/scenes/AbstractScene",
   "../scenes"
], function (declare, AbstractCoreScene, scenes) {

   /**
    * Base abstract OAuth scene
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @class
    * @name ic-oauth.scenes.AbstractScene
    * @extends ic-core.app.scenes.AbstractScene
    */
   var AbstractScene = declare("lconn.oauth.scenes.AbstractScene", AbstractCoreScene, /** @lends ic-oauth.scenes.AbstractScene.prototype */ {
      // TODO:
   });

   return AbstractScene;
});
