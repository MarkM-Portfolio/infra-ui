/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define([
   "../widget/ToolbarDivider",
   "./DownloadAction",
   "./DownloadPDFAction",
   "./TogglePanelAction",
   "./CloseAction",
   "./EditDocAction",
   "./RoundtripEditAction",
   "./ViewDocAction",
   "./LikeAction",
   "./CopyLinkAction",
   "./TrashFileAction",
   "./CopyFileAction",
   "./TransferFileAction",
   "./ToggleSyncAction",
   "./ToggleFollowAction",
   "./RefreshAction",
   "./ToggleLockAction",
   "./ToggleFavoriteAction",
   "./CreateFromTemplateAction",
   "./UploadNewVersionAction",
   "./LogInAction",
   "./FlagAction",
   "./PrimaryExtensionAction",
   "./TearOffAction"
], function (ToolbarDivider, DownloadAction, DownloadPDFAction, TogglePanelAction, CloseAction, EditDocAction,
   RoundtripEditAction, ViewDocAction, LikeAction, CopyLinkAction, TrashFileAction, CopyFileAction, TransferFileAction,
   ToggleSyncAction, ToggleFollowAction, RefreshAction, ToggleLockAction, ToggleFavoriteAction, CreateFromTemplateAction,
   UploadNewVersionAction, LogInAction, FlagAction, PrimaryExtensionAction, TearOffAction) {

   "use strict";

   return [
      PrimaryExtensionAction, LogInAction, ViewDocAction, EditDocAction, UploadNewVersionAction, RoundtripEditAction,
      ToggleFavoriteAction, LikeAction, CopyLinkAction, DownloadAction, DownloadPDFAction, ToggleSyncAction, ToggleFollowAction,
      ToggleLockAction, CopyFileAction, TransferFileAction, CreateFromTemplateAction, RefreshAction, TrashFileAction, FlagAction,
      ToolbarDivider, TogglePanelAction, TearOffAction, CloseAction
   ];
});
