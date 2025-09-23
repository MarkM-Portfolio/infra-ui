/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "./DownloadAction",
   "./TogglePanelAction",
   "./CloseAction",
   "./EditDocAction",
   "./ViewDocAction"
], function (DownloadAction, TogglePanelAction, CloseAction, EditDocAction, ViewDocAction) {
   "use strict";

   return [ ViewDocAction, EditDocAction, DownloadAction, TogglePanelAction, CloseAction ];
});
