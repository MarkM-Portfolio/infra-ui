/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


;if(!dojo._hasResource["lconn.bar"]){
dojo._hasResource["lconn.bar"]=true;
(function(){
dojo.provide("lconn.bar");
console.log("hello from lconn.bar");
});
}


;if(!dojo._hasResource["lconn.foo"]){
dojo._hasResource["lconn.foo"]=true;
(function(){
dojo.provide("lconn.foo");


var a=1,b=2,_1=3;
lconn.foo={three_hundred:"sparta",bar:function(a,b,c){
console.log("this is %s!",this.three_hundred.toUpperCase());
}};
});
}


window['_js_modules']=(window['_js_modules']||[]).concat(["lconn.foo"]);
