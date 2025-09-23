/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.PeopleFinderDataStore");

dojo.require("lconn.core.PeopleDataStore");

dojo.declare("lconn.core.PeopleFinderDataStore", lconn.core.PeopleDataStore, {
   // {
   // query: query-string or query-object,
   // queryOptions: object,
   // onBegin: Function,
   // onItem: Function,
   // onComplete: Function,
   // onError: Function,
   // scope: object,
   // start: int
   // count: int
   // sort: array
   // searchDirectory: bool
   // }
   fetch : function(keywordArgs) {
      var params = {
         pageSize : keywordArgs && keywordArgs.count ? keywordArgs.count : 15,
         highlight : false,
         query : keywordArgs && keywordArgs.query,
         searchOnlyNameAndEmail : true
      };
      var cache;

      this.searchDirectory = keywordArgs && keywordArgs.queryOptions && keywordArgs.queryOptions.searchDirectory;
      if (this.searchDirectory)
         cache = this.dirCache;
      else
         cache = this.cache;

      // If we don't test cache.hasOwnProperty(keywordArgs.query), then
      // cache["sort"] will return true because sort() is a function on arrays!
      // #DJOS7S8PNY
      if (keywordArgs && keywordArgs.query && cache[keywordArgs.query] && cache.hasOwnProperty(keywordArgs.query)) {
         // This class doesn't use the count parameter - make count=the number
         // of items, to prevent "more choices" from showing
         keywordArgs.count = cache.length;
         keywordArgs.onComplete(this.convertPeopleFinderResults(cache[keywordArgs.query.toLowerCase()]), keywordArgs);
         return keywordArgs;
      }

      if (this.queryParam && keywordArgs && keywordArgs.query)
         params[this.queryParam] = keywordArgs.query;
      if (this.searchDirectory)
         params.usedirectory = 'yes';

      this.networkGet({
         url : this.url,
         content : params,
         handleAs : "json-comment-optional",
         timeout : 60000,
         // contentType: "application/x-www-form-urlencoded;charset=UTF-8",
         load : dojo.hitch(this, function(data) {
            // TODO: Keep cache in check?
            var cache, resList;
            if (this.searchDirectory)
               cache = this.dirCache;
            else
               cache = this.cache;

            resList = data.persons ? data.persons : data.items;

            // This class doesn't use the count parameter - make count=the
            // number of items, to prevent "more choices" from showing
            keywordArgs.count = data.numResultsInCurrentPage;
            cache[keywordArgs.query.toLowerCase()] = resList;
            if (keywordArgs.onComplete)
               keywordArgs.onComplete(this.convertPeopleFinderResults(resList), keywordArgs);
         }),
         error : function(e, ioargs) {
            console.log("There was an error: " + e.message);
            // Make sure the failed xhr does not cause a redirect since we are
            // within a widget on the page.
            ioargs.xhr.abort();
         }
      });

      return keywordArgs;
   },

   // convertPeopleFinderResults converts the new format results into the old
   // format people type ahead results
   // New format:
   // {
   // "id": "11a71a40-b788-102f-9fb2-ceff629df3bf",
   // "name": "Frank <B>Ad<\/B>ams",
   // "userType": "EMPLOYEE",
   // "jobResponsibility": "Investigator",
   // "email": "fadams@renovations.com",
   // "score": 17.476652
   // }
   //
   // old format:
   // {
   // "userid":"11a71a40-b788-102f-9fb2-ceff629df3bf",
   // "type":"0",
   // "member":"fadams@renovations.com",
   // "name":"Frank Adams",
   // "param":"11a71a40-b788-102f-9fb2-ceff629df3bf\u0002Frank Adams"
   // }
   convertPeopleFinderResults : function(newRes) {
      if (!newRes || !newRes.length || newRes.length === 0) {
         return newRes;
      }
      var oldFormatRes = new Array();
      for (var i = 0; i < newRes.length; i++) {
         oldFormatRes.push(this.convertPeopleFinderResult(newRes[i]));
      }
      return oldFormatRes;
   },

   convertPeopleFinderResult : function(item) {
      var newItem = {};
      var userType = item.userType == 'VISITOR' ? 'EXTERNAL' : item.userType;
      newItem["userid"] = item.id;
      newItem["type"] = "0";
      newItem["name"] = item.name;
      newItem["param"] = item.id + "\u0002" + item.name;
      newItem["member"] = item.email;
      newItem["ext"] = {
         mode : userType
      };
      return newItem;
   }

});
