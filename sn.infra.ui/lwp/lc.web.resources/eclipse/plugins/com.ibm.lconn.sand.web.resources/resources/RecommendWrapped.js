/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.RecommendWrapped"); 

dojo.requireLocalization("lconn.sand", "ui");

dojo.declare("lconn.sand.RecommendWrapped",null,{
      
   userid: null,
   
   onLoad: function () {
      var rootElement = this.iContext.getElementById("_"+this.iContext.widgetId+"_root");    
      var userid = this.iContext.getUserProfile().getItemValue('userid');
      var lcSandStrings =  dojo.i18n.getLocalization("lconn.sand", "ui");

      var attributesItemSet = this.iContext.getiWidgetAttributes();
      var sandUIRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandUIRoot"));
      var sandBackEndRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandBackEndRoot"));        
      
      var sourceList = attributesItemSet.getItemValue("sourceList"); 
      
      var remoteUrl = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("ApiUrl"));     
        
      // Register Widget
      var pathToWidget = sandUIRoot + "js_src/lconn/sand";
      
      dojo.registerModulePath('lconn.sand', pathToWidget);  
      dojo.require("lconn.sand.sandAll");
      dojo.require("lconn.sand.RecommendWidget");
      

      var navContentLocation = attributesItemSet.getItemValue("navContentLocation");
   
      var mix = {
         remoteUrl: remoteUrl,
         sourceList: sourceList,
         blankIcon: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")),
         currentUserId: userid
         };

      var xhrErrorHandlerAsString = attributesItemSet.getItemValue("xhrErrorHandlerAsString");
      var errorHtmlContainerElemId = attributesItemSet.getItemValue("errorHtmlContainerElemId");
      if(errorHtmlContainerElemId) {
         mix.errorHtmlContainerElemId = errorHtmlContainerElemId;
      }
      else
         mix.errorHtmlContainerElemId = "_sand_recomComm_root";
     
      if(xhrErrorHandlerAsString) {
		mix.xhrErrorHandler = dojo.getObject(xhrErrorHandlerAsString);
      }
 
      this.recommendWidget = new lconn.sand.RecommendWidget(mix);
      
      // place Dojo widget inside our iWidget
      dojo.place(this.recommendWidget.domNode, rootElement, "last");

      this.recommendWidget.Recommend();
   },
   
   showMessage: function (msgDiv, msgHTML) {

      msgDiv.innerHTML = msgHTML;

      // hide divs (if any)
      if (arguments[2]) { // hide the Divs in the array 
         for (var i=0; i < arguments[2].length; i++) {
            arguments[2][i].style.display = 'none';
         }
      }
      msgDiv.style.display = "block";

   }  
});
