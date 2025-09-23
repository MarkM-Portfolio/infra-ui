/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.builder.cmis.acl");

dojo.require("lconn.share.util.dom");

/**
 * Takes an array of permission entries, and returns a cmis:acl document.
 * 
 * Each permission entry is an object with the following properties:
 *    principalId (required) - string id
 *    permissions (optional) - array of permission strings, defaults to empty array
 *    direct (optional) - boolean, defaults to false
 *    
 * Example:
 *    lconn.share.builder.cmis.acl([
 *       { principalId: "ablanks" },
 *       { principalId: "eblanks", permissions: ["cmis:read"] }
 *       { principalId: "mshani", permissions: ["cmis:read","cmis:write"], direct: true }
 *    ]);
 */
lconn.share.builder.cmis.acl = function(entries) {
   var lsud = lconn.share.util.dom;
   var CMIS = lsud.CMIS_NAMESPACE;
   
   var doc = lsud.newXMLDocument("acl", CMIS);
   var acl = doc.documentElement;
      dojo.forEach(entries, function(entry) {
         var permission = lsud.createElementNS(doc,"permission",CMIS);
            var principal = lsud.createElementNS(doc,"principal",CMIS);
               var principalId = lsud.createElementNS(doc,"principalId",CMIS);
                  principalId.appendChild(doc.createTextNode(entry.principalId));
               principal.appendChild(principalId);
            permission.appendChild(principal);

            dojo.forEach(entry.permissions, function(entryPermission) {
               var permissionInner = lsud.createElementNS(doc,"permission",CMIS);
                  permissionInner.appendChild(doc.createTextNode(entryPermission));
               permission.appendChild(permissionInner);               
            });

            var direct = lsud.createElementNS(doc,"direct",CMIS);
               direct.appendChild(doc.createTextNode(entry.direct ? "true":"false"));
            permission.appendChild(direct);               
         acl.appendChild(permission);
      });
   return doc;
};
