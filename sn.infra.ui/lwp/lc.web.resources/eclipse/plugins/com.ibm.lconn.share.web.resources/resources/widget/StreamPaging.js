/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.StreamPaging");

dojo.require("lconn.share.util.uri");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");

dojo.declare("lconn.share.widget.StreamPaging", null, {
   checkForMore: false,

   apiParams: {
   	  sI: 'sI',
   	  page: 'page',
   	  pageSize: 'pageSize',
   	  zeroItem: 1
   },
   
   constructor: function(opt) {
      dojo.mixin(this, opt);
      
      if(this.apiType == 'cmis')
         this.apiParams = {sI: "skipCount", pageSize: "maxItems", zeroItem: 0};
   },
   detect: function(url,data,type) {
      var pN = this.apiParams;

      var uri,p,pageSize=-1,startIndex=-1;
      if (url) {
         uri = lconn.share.util.uri.parseUri(url);
         p = uri.queryParameters;
         pageSize = lconn.share.util.text.parseInt(p[pN.pageSize],-1);
         if (pN.page && p[pN.page])
            startIndex = (lconn.share.util.text.parseInt(p[pN.page],1) - 1) * pageSize;
         else if (pN.sI && p[pN.sI])
            startIndex = lconn.share.util.text.parseInt(p[pN.sI],1) - pN.zeroItem;
      }
      
      var itemsInFeed,totalItems,previousUrl,nextUrl;
      if (type == "json") {
         itemsInFeed = (data.items) ? data.items.length : 0;
         totalItems = -1;
         if (typeof data.totalItems == "number")
            totalItems = data.totalItems;
         else if (typeof data.totalSize == "number")
            totalItems = data.totalSize;
         previousUrl = data.previousUrl;
         nextUrl = data.nextUrl;
      }
      else {
         var qud = lconn.share.util.dom;
         itemsInFeed = dojo.filter(qud.getElementsByTagNameNS(data, "entry", qud.ATOM_NAMESPACE),function(e) {return e.parentNode == data;}).length;

         if(this.apiType == "cmis")
            totalItems = lconn.share.util.text.parseInt(qud.getChildElementTextContentNS(data, "numItems", qud.CMISRA_NAMESPACE), -1);
         else
            totalItems = lconn.share.util.text.parseInt(qud.getChildElementTextContentNS(data, "totalResults", qud.OPENSEARCH_NAMESPACE), -1);

         previousUrl = qud.getChildElementAttributeMatchingNS(data, "link", qud.ATOM_NAMESPACE, "rel", null, "previous", "href", null);
         nextUrl = qud.getChildElementAttributeMatchingNS(data, "link", qud.ATOM_NAMESPACE, "rel", null, "next", "href", null);

         this.displayTotal = lconn.share.util.text.parseInt(qud.getChildElementMatchingAttributeTextContentNS(data, "rank", lconn.share.util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/item"), 0);
      }
      
      // If we don't know our startIndex, but we know our pageSize and our previous url, calculate it
      if (startIndex == -1 && pageSize != -1 && previousUrl) {
         var previousUri = lconn.share.util.uri.parseUri(previousUrl);
         var previousParams = previousUri.queryParameters;
         if (pN.page && previousParams[pN.page])
            startIndex = lconn.share.util.text.parseInt(previousParams[pN.page],1) * pageSize;
         else if (pN.sI && previousParams[pN.sI])
            startIndex = lconn.share.util.text.parseInt(previousParams[pN.sI],1) - pN.zeroItem + pageSize;
      }
      if (nextUrl && !previousUrl)
         startIndex = 0;
      
      // In CMIS, if we don't have a skipCount to use, we can assume we're at the beginning
      if(startIndex == -1 && this.apiType == "cmis")
         startIndex = 0;

      this.next = nextUrl;
      this.previous = previousUrl;
      this.items = itemsInFeed;
      
      if (data) {
         if (totalItems != -1) {
            this.mode = "index";
            this.total = (startIndex == 0 && itemsInFeed < pageSize) ? itemsInFeed : totalItems;
            this.startIndex = startIndex;
            this.uri = uri;
         }
         else if (startIndex == 0 && pageSize != -1) {
            this.mode = "index";
            this.total = (itemsInFeed < pageSize) ? itemsInFeed : -1;
            this.startIndex = 0;
            this.uri = uri;
         }
         else if (startIndex != -1 && pageSize != -1) {
            this.mode = "index";
            this.total = (itemsInFeed <= pageSize) ? itemsInFeed + startIndex : -1;
            this.startIndex = startIndex;
            this.uri = uri;
         }
   
         if (!this.mode) {
            if (previousUrl || nextUrl) {
               this.mode = "url";
               this.startIndex = -1;
               this.total = -1;
            }
            else {
               this.mode = "index";
               this.total = (itemsInFeed < pageSize) ? (startIndex+itemsInFeed) : -1;
               this.startIndex = startIndex;
               this.uri = uri;
            }
         }
         if (!this.mode) {
            this.mode = "unpaged";
            this.startIndex = 0;
            this.total = -1;
         }

         this.hasMore = (this.total != -1 && this.startIndex != -1 && (this.startIndex + itemsInFeed) < this.total) || this.next || (this.total == -1 &&itemsInFeed == pageSize);
         this.pastEnd = (itemsInFeed == 0 && (this.total > 0 || this.startIndex > 0));

         if (pageSize == -1)
            pageSize = itemsInFeed;
         else if (this.checkForMore && pageSize > 0)
            pageSize = pageSize - 1;         
         this.size = pageSize;
      }
      else {
         if (pageSize != -1) {
            if (this.checkForMore)
               pageSize = pageSize - 1;         

            this.mode = "index";
            this.startIndex = startIndex;
            this.size = pageSize;
            this.parameters = p;
         }
         else {
            this.mode = "unpaged";
            this.startIndex = 0;
            this.size = -1;
         }
         this.total = -1;
         this.visible = 0;
      }
   },
   
   _setParams: function(p, paramValues) {
      var pV = paramValues || {};

      // Get the names of our supported parameter options
      var pN = this.apiParams;

      // Clear existing values
      delete p.sI;
      delete p.page;
      if(pN.sI) delete p[pN.sI];
      if(pN.page) delete p[pN.page];

      if(pN.sI && pV.sI)
         p[pN.sI] = pV.sI;
      else if(pN.page && pV.page)
         p[pN.page] = pV.page;

      // Only reset pageSize if a new one was provided
      if(pN.pageSize && pV.pageSize) {
         delete p.pageSize;
         p[pN.pageSize] = pV.pageSize;
      }
   },
   
   getPageUrl: function(page, pageSize) {
      if (page < 1)
         return null;
      if (this.mode == "index") {
         var baseQuery = this.uri.queryParameters;
         var p = dojo.clone(baseQuery);

         var paramValues = {page:page};
         if (typeof page != "undefined")
            paramValues.sI = this.size*(page-1) + this.apiParams.zeroItem;

         if (typeof pageSize != "undefined")
            paramValues.pageSize = pageSize + (this.checkForMore ? 1 : 0);
         else
            paramValues.pageSize = this.size + (this.checkForMore ? 1 : 0); 

         this._setParams(p, paramValues);

         this.uri.queryParameters = p;
         var url = lconn.share.util.uri.writeUri(this.uri);
         this.uri.queryParameters = baseQuery;
         return url;
      }
      return null;
   },
   
   getNextUrl: function() {
      if (this.mode == "url")
         return this.next;
      if (this.mode == "index") {
         var baseQuery = this.uri.queryParameters;
         var p = dojo.clone(baseQuery);

         this._setParams(p, {sI: this.startIndex+this.size + this.apiParams.zeroItem, page: this.getNextPage()});

         this.uri.queryParameters = p;
         var url = lconn.share.util.uri.writeUri(this.uri);
         this.uri.queryParameters = baseQuery;
         return url;
      }
      return null;
   },
   getNextPage: function() {
      if (this.mode == "index") {
         var page = Math.floor(this.startIndex / this.size) + 1;
         return page+1;
      }
      return -1;
   },
   
   getPreviousUrl: function() {
      if (this.mode == "url")
         return this.previous;
      if (this.mode == "index") {
         var baseQuery = this.uri.queryParameters;
         var p = dojo.clone(baseQuery);

         if (this.startIndex < 1)
            return null;

         this._setParams(p, {sI: this.apiParams.zeroItem + Math.max(this.startIndex-this.size,0), page: this.getPreviousPage()});

         this.uri.queryParameters = p;
         var url = lconn.share.util.uri.writeUri(this.uri);
         this.uri.queryParameters = baseQuery;
         return url;
      }
      return null;
   },
   getPreviousPage: function() {
      if (this.mode == "index") {
         var page = Math.floor(this.startIndex / this.size) + 1;
         return (page > 1) ? page-1 : -1;
      }
      return -1;
   },
   
   getLastPageUrl: function() {
      if (this.mode == "url")
         return this.next;
      if (this.mode == "index") {
         var startIndex, page;
         if (this.total != -1) {
            page = Math.floor((this.total - (this.total % this.size)) / this.size);
            startIndex = (page-1) * this.size;
         }
         else {
            page = 1 + Math.floor(this.startIndex / this.size);
            startIndex = this.startIndex - this.size;
         }
               
         var baseQuery = this.uri.queryParameters;
         var p = dojo.clone(baseQuery);

         this._setParams(p, {sI: Math.max(startIndex,0) + this.apiParams.zeroItem, page: page});

         this.uri.queryParameters = p;
         var url = lconn.share.util.uri.writeUri(this.uri);
         this.uri.queryParameters = baseQuery;
         return url;
      }
      return null;
   },
   getLastPage: function() {
      if (this.mode == "index") {
         var page;
         return (this.total != -1)
               ? Math.ceil(this.total / this.size)
               : Math.floor(this.startIndex / this.size); // one less than the current page
      }
      return -1;
   },
   
   isPastEnd: function() {
      return this.pastEnd;
   },
   hasNext: function() {
      return this.hasMore;
   },
   hasPrevious: function() {
      if (this.mode == "url")
         return (this.previous && this.previous != null);
      return (this.startIndex > 0);
   },
   isFullPage: function() {
      return (this.size > 0 && this.size == this.items);
   }
});
