/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

//Main build script for CSS
var buildTimerStart = (new Date()).getTime();

load("jslib/logger.js");
load("jslib/fileUtil.js");
load("jslib/buildUtil.js");

//*****************************************************************************
//Convert arguments to keyword arguments.
var kwArgs = _makeBuildOptions(arguments);

//Set logging level.
logger.level = kwArgs["log"];

css();

var buildTime = ((new Date().getTime() - buildTimerStart) / 1000);
logger.info("Build time: " + buildTime + " seconds");
//*****************************************************************************

//********* Start release *********
function css(){
   logger.info("Optimize CSS in directory: " + kwArgs.dir);
   buildUtil.optimizeCss(kwArgs.dir, kwArgs.optimize);
}
//********* End release *********

//********* Start _makeBuildOptions *********
function _makeBuildOptions(/*Array*/scriptArgs){
   var kwArgs = {};

   //Parse the command line arguments
   var kwArgs = buildUtil.convertArrayToObject(scriptArgs);

   //Set up some compound values
   kwArgs.releaseDir += kwArgs["releaseName"];
   if (kwArgs.action)
      kwArgs.action = kwArgs.action.split(",");
   if (kwArgs.localeList)
      kwArgs.localeList = kwArgs.localeList.split(",");
   kwArgs.optimize = kwArgs.optimize || "comments"
   return kwArgs;
}
//********* End _makeBuildOptions *********
