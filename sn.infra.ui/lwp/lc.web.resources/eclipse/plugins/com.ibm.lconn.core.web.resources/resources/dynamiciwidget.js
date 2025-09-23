/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
   /**
    * @namespace lconn.core.dynamiciwidget
    * @author Clayton Coleman <claycole@us.ibm.com>
    * @author Xiaofeng Yu <yuxiaof@cn.ibm.com>
    * @author Qi Xi <xiqish@cn.ibm.com>
    */
   dojo.provide("lconn.core.dynamiciwidget");
   dojo.require("net.jazz.ajax.xdloader");
   dojo.require("lconn.core.util.LCDeferred");

   var excludes;

   function setBlankGif(img) {
      img.src = dijit._Widget.prototype._blankGif;
   }

   /**
    * This method creates a new class with <b>name</b> and implementation
    * module <b>impl</b>. The first time this method is invoked, it creates a
    * new Dojo class with that name. When the iWidget container invokes onLoad,
    * the implementation module is loaded in the background. The implementation
    * module is expected to update the definition of the class with additional
    * details (using dojo.extend). After the implementation module is loaded, we
    * check to see if onLoad was redefined and invoke it if different.
    * 
    * Subsequent calls to create() will reuse the already defined class, and
    * subsequent onLoad calls should be correct queued into the dynamic load.
    * 
    * The implementation module should call dojo.extend() to provide
    * implementation methods on the object:
    * 
    * dojo.extend(&lt;name&gt;, { onLoad: function() { // new implementation of
    * onLoad } // other implementation methods... });
    * 
    * As a convenience, the dynamic loader updates any lotusLoading IMG tags in
    * the contents to have the standard blank.gif location since it is difficult
    * to calculate that path in the iwidget definition.
    * 
    * To use this in an iWidget definition, set your iScope to:
    * 
    * iScope="(lconn.core.dynamiciwidget.create('lconn.communityblogs.Widget'))"
    * 
    * which will create the class lconn.communityblogs.Widget and attempt to
    * load the implementation module lconn.communityblogs.WidgetImpl.s
    * 
    * @function create
    * @memberof lconn.core.dynamiciwidget
    * @param {String}
    *           name The name of the class to create or use
    * @param {Object}
    *           [impl] (optional) If specified, load this module dynamically.
    *           Otherwise, use name+"Impl" as the module.
    * 
    * @returns The constructor of the appropriate class.
    */
   lconn.core.dynamiciwidget.create = function(name, impl) {
      var implClass = dojo.getObject(name);
      
      if (!implClass)
         implClass = dojo.declare(name, null, {
        	 
        	loadPromise: (function(){
        		var promise = new lconn.core.util.LCDeferred();
        		promise.resolve();
        
        		return promise;
        	})(),
        	
            /**
             * @ignore
             */
            onLoad: function() {
            	this.loadPromise = new lconn.core.util.LCDeferred();
            	
            	var context = this.iContext;
            	var contentsNode = context.getRootElement();
            	dojo.query("img.lotusLoading", contentsNode).forEach(setBlankGif);

            	var attrs = context.getiWidgetAttributes();
            	var module = impl || name+"Impl";
            	if(!excludes) {
            		excludes = [];
            		for(var i=0; i<window._js_modules.length; i++) {
            			var m = window._js_modules[i];
            			if(m.lastIndexOf(".js") != -1 && m.lastIndexOf(".js") == m.length-3)
            				m = m.substring(0, m.length-3);
            			excludes[i] = m;
            		}
            	}
            	net.jazz.ajax.xdloader.load_layer_async(module, [].concat(excludes), dojo.hitch(this, "_onModuleLoaded", this.onLoad));
            },

            /**
             * This method is invoked once the implementation class for this
             * widget has successfully loaded. If the implementation defines its
             * own onLoad method (if the onLoad method isn't the same as when we
             * began the load) then we invoke that method.
             * 
             * @ignore
             */
            _onModuleLoaded: function(originalOnLoad) {
               if (!this._isUnloaded && originalOnLoad != this.onLoad) {
                  this.onLoad();
                  this.loadPromise.resolve();
               }
            },

            /**
             * This method should be replaced when the implementation module is
             * mixed in to the prototype, which means if the module is loaded
             * we'll call the real onUnload. If the module has not been loaded,
             * then this means that onLoad is in progress and so _onLoad should
             * bail if it sees ._unloaded. If the module has not had onLoad
             * called, and onUnload has been called, it will then never load.
             * 
             * @ignore
             */
            onUnload: function() {
               this._isUnloaded = true;
            },
            
            /**
             * This method is for the purpose of supporting search, where 
             * implemented method in specific widgets will be invoked when load 
             * promise completes. The implemented method can be named 
             * "onsearch" or "onSearch", so this method will be assigned as 
             * null to direct CRE code to the real method if it's "onSearch".
             */
            onsearch: function() {
            	var _onsearch = this.onsearch;
            	this.loadPromise.then(dojo.hitch(this, function() {
            		if (this.onsearch != _onsearch) {
            			this.onsearch();
            		} else if (dojo.isFunction(this.onSearch)) {
            			this.onsearch = null;
            			this.onSearch();
            		}            		
            	}));
            },
            
            /**
             * This method is for the purpose of supporting view, where 
             * implemented method in specific widgets will be invoked when load 
             * promise completes. The implemented method can be named 
             * "onview" or "onView", so this method will be assigned as 
             * null to direct CRE code to the real method if it's "onView".
             */
            onview: function() {
				var _onview = this.onview;
              	this.loadPromise.then(dojo.hitch(this, function() {
              		if (this.onview != _onview) {
              			this.onview();
              		} else if (dojo.isFunction(this.onView)) {
              			this.onview = null;
              			this.onView();
              		}
              	}));
            },
            
            /**
             * This method is for the purpose of supporting fullpage, where 
             * implemented method in specific widgets will be invoked when load 
             * promise completes. The implemented method can be named 
             * "onfullpage" or "onFullpage", so this method will be assigned as 
             * null to direct CRE code to the real method if it's "onFullpage".
             */
            onfullpage: function() {
            	var _onfullpage = this.onfullpage;
              	this.loadPromise.then(dojo.hitch(this, function() {
              		if (this.onfullpage != _onfullpage) {
              			this.onfullpage();
              		} else if (dojo.isFunction(this.onFullpage)) {
              			this.onfullpage = null;
              			this.onFullpage();
              		}
              	}));
            },
            
            /**
             * This method is for the purpose of supporting edit, where 
             * implemented method in specific widgets will be invoked when load 
             * promise completes. The implemented method can be named 
             * "onedit" or "onEdit", so this method will be assigned as 
             * null to direct CRE code to the real method if it's "onEdit".
             */
            onedit: function() {
            	var _onedit = this.onedit;
              	this.loadPromise.then(dojo.hitch(this, function() {
              		if (this.onedit != _onedit) {
              			this.onedit();
              		} else if (dojo.isFunction(this.onEdit)) {
              			this.onedit = null;
              			this.onEdit();
              		}
              	}));
            }
            
         });
      
      return implClass;
   };
})();
