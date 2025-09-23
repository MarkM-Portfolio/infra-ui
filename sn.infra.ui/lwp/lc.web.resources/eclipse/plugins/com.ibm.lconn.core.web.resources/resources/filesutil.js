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

dojo.provide("lconn.core.filesutil");
dojo.require("net.jazz.ajax.xdloader");

(function(utility) {

   /**
    * lconn.core.filesutil.changeVisibility
    * 
    * change one file's visibility.
    * 
    * This interface uses (@link lconn.core.filesutil#changeVisibility}
    * 
    * @param args  A hash object with the following properties:
    *    - file: Required. (@link lconn.share.bean.File} object;
    *    - visibility: Optional. A string presenting the visibility the file will be changed. Should be one of "private", "public". Defaults to "private".
    *    - callback: Optional. Callback function for the change visibility request.
    *                  When sucessful, accepts updated file entry as parameter;
    *                  When failed, accepts a js error object as parameter which contains error code and error message.
    *    - network: Optional. A util class which is in chare of I/O with server.
    *    
    * The wiki document for service of updating a document:
    *    https://w3.tap.ibm.com/w3ki08/display/qkrapi/Update+a+document
    */
   utility.changeVisibility = function(args) {
      net.jazz.ajax.xdloader.load_async("lconn.files.filesutil.FilesUtil", function() {
         lconn.files.filesutil.FilesUtil.changeVisibility(args);
      });
   };

   /**
    * lconn.core.filesutil.shareWithCommunity
    * 
    * share one file with one or more communities, or share files with one community
    * 
    * This interface uses (@link lconn.core.filesutil#shareWithCommunity}
    * 
    * @param args  A hash object with the following properties:
    *    - file: Required. one or an array of (@link lconn.share.bean.File} object;
    *    - community/communityIds: Required. A community id/A array which contains community ids.
    *    - visibility: Optional. A string presenting the visibility the file which will be shared with community. Should be one of "private", "public".
    *    - sharePermission: Optional. The permission which community memeber have on the file shared with community. Should be one of "view", "edit". Defaults to "view".
    *    - callback: Optional. Callback function for the request of share with community.
    *                  When sucessful, accepts updated file entry as parameter;
    *                  When failed, accepts a js error object as parameter which contains error code and error message.
    *    - network: Optional. A util class which is in chare of I/O with server.
    *    
    * The wiki document for service of sharing with community:
    *    https://w3.tap.ibm.com/w3ki08/display/qkrapi/Share%20a%20document%20with%20communities
    */
   utility.shareWithCommunity = function(args) {
      net.jazz.ajax.xdloader.load_async("lconn.files.filesutil.FilesUtil", function() {
         lconn.files.filesutil.FilesUtil.shareWithCommunity(args);
      });
   };
   
   /**
    * lconn.core.filesutil.checkFileExist
    * 
    * share one file with one or more communities, or share files with one community
    * 
    * This interface uses (@link lconn.core.filesutil#shareWithCommunity}
    * 
    * @param args  A hash object with the following properties:
    *    - name: Required. one or an array of (@link lconn.share.bean.File} object;
    *    - callback(existed): required. 
    */
   utility.checkFileExist = function(args) {
      net.jazz.ajax.xdloader.load_async("lconn.files.filesutil.FilesUtil", function() {
         lconn.files.filesutil.FilesUtil.checkFileExist(args);
      });
   };
   
   utility.loadConfig = function(args) {
      net.jazz.ajax.xdloader.load_async("lconn.files.filesutil.FilesUtil", function() {
         lconn.files.filesutil.FilesUtil.loadConfig(args);
      });
   };
   
   utility.getConfig = function(args) {
      net.jazz.ajax.xdloader.load_async("lconn.files.filesutil.FilesUtil", function() {
         lconn.files.filesutil.FilesUtil.getConfig(args);
      });
   };
}(lconn.core.filesutil));
