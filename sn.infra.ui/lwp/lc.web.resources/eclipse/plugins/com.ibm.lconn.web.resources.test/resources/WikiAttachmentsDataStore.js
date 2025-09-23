/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/* Example datastore that can be used to convert a wikis/files compatible atom feed into a dojo datastore suitable for use with the mediagallery*/
dojo.provide("lconn.test.WikiAttachmentsDataStore");

dojo.require("dojox.main");
dojo.require("dojox.data.AtomReadStore");

dojo.declare("lconn.test.WikiAttachmentsDataStore",
      [ dojox.data.AtomReadStore ], {
         attrMap : {
            date : "updated",
            desc : "summary",
            link : "__nonlink", //name clash between attributes the media gallery requests and atom elements, remap to prevent incorrect use
            author: "__nonauthor"
         },

         getValue : function(item, attribute, defaultValue) {
            if(this.attrMap[attribute])
               attribute = this.attrMap[attribute];
            if (attribute !== "thumb" && attribute !== "large"){
               var rval = this.inherited(arguments);
               return (typeof rval == "object" && rval.text)? rval.text: rval;
            }
            
            this.getInherited(arguments).apply(this, [item, "link", defaultValue]);
            links = item._attribs["link"];
            
            if(!links)
               return defaultValue;
            
            var href = null;
            dojo.forEach(links, function(link){
               if(link.rel == "enclosure")
                  href = link.href
            });
            return href || defaultValue;
         }
      });
