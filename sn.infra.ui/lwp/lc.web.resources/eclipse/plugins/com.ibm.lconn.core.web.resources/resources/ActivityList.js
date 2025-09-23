/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('lconn.core.ActivityList');

dojo.deprecated("lconn.core.ActivityList", "Rename to an Activities specific bundle in 3.5, reduce size of code, and move into dynamic loading path", "3.5");

lconn.core.ActivityList = function(){
    var self = this;
    this.onLoad = function onLoad() {
       try{
        if(!dojo.exists("lconn.act.CommunityActivityList")){
            net.jazz.ajax.xdloader.load_async("lconn.act.CommunityActivityList", function() {
                if(dojo.exists("lconn.act.CommunityActivityList")){
                    lconn.act.CommunityActivityList(self);
                    self.loadActivityList();
                }
            });
        } else {
            lconn.act.CommunityActivityList(self);
            self.loadActivityList();
        }
       }catch(ex){
               new com.ibm.oneui.controls.MessageBox({
               type: com.ibm.oneui.controls.MessageBox.TYPE.WARNING,
               msg: "ActivityList  onLoad function exception: " + ex,
               canClose: false}, dojo.byId("lotusContent"));  
       }
    };
    
	this.onedit = function() {
        if(!dojo.exists("lconn.act.CommunityActivityList")){
            net.jazz.ajax.xdloader.load_async("lconn.act.CommunityActivityList", function() {
                if(dojo.exists("lconn.act.CommunityActivityList")){
                    lconn.act.CommunityActivityList(self);
                    self.loadEditPage();
                }
            });
        } else {
            lconn.act.CommunityActivityList(self);
            self.loadEditPage();
        }
    };
};

