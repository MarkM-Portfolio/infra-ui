/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.ConfigurableBean");
dojo.require("lconn.core.uiextensions");

dojo.declare("lconn.share.bean.ConfigurableBean", null, {
   getConfiguration: function(opt){
      if(this.config)
         return this.config;
      var cfg = this.config = {};
      if(this.getExtConfiguration)
         dojo.mixin(cfg, this.getExtConfiguration(opt));
      return cfg;
   }
});

dojo.declare("lconn.share.bean.ConfigurableFile", lconn.share.bean.ConfigurableBean, {
   getExtConfiguration: function(opt){
      var extenders = lconn.core.uiextensions.get("lconn/files/config/file");
      var config = {};
      if (extenders)
         for (var i=0; i<extenders.length; i++)
            dojo.mixin(config, extenders[i](this, opt));
      return config;
   }
});

dojo.declare("lconn.share.bean.ConfigurableCollection", lconn.share.bean.ConfigurableBean, {
});
