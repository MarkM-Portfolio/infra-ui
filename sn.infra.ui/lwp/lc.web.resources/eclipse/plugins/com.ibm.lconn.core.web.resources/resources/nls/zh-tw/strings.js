/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
({
   'rs_close' : "關閉",
   'rs_loading' : "載入中...",
   'rs_at' : "於",

   'rs_searchDirectory' : "此人未列出， 請使用完整搜尋...",
   'rs_searchGroupDirectory' : "未列出群組？ 請使用完整搜尋...",
   'rs_searchPersonAndGroupDirectory' : "未列出人員或群組？ 請使用完整搜尋...",
   'rs_searchCommunityDirectory' : "未列出社群？ 請使用完整搜尋...",

   'rs_shadowText_searchDirectory' : "鍵入以尋找人員",
   'rs_shadowText_searchGroupDirectory' : "鍵入以尋找群組",
   'rs_shadowText_searchPersonAndGroupDirectory' : "鍵入以尋找人員或群組",
   'rs_shadowText_searchCommunityDirectory' : "鍵入以尋找社群",

   'rs_listItem' : "清單項目",
   'rs_noResults' : "沒有 '${0}' 的任何結果",
   'rs_today' : "今天",
   'rs_tomorrow' : "明天",
   'rs_yesterday' : "昨天",

   /* Activity List Widget */
   'rs_activityFeedLink' : "這些活動的資訊來源",
   'rs_externalText' : "此活動可以有來自組織外部的成員。",
   'rs_moveActivitySuccess' : '已順利將 \"${activityTitle}\" 移至 \"${destCommName}\" 子社群。',
   // copy 'rs_moreInfo' and 'rs_hideInfo' from activity's strings.js
   'rs_moreInfo' : '顯示此活動的詳細相關資訊',
   'rs_hideInfo' : '隱藏額外資訊',
   'rs_more' : "其他",
   'rs_hide' : "隱藏",
   'rs_edit' : "編輯",
   'rs_restore' : "還原",
   'rs_deleteEntry' : "刪除",
   'rs_prioritize' : "優先順序",
   'rs_markComplete' : "標示完成",
   'rs_markIncomplete' : "還原",
   'rs_linkMore' : "... [較多]",
   'rs_linkLess' : "... [較少]",
   'rs_actUpdatedByDate' : "更新者：${0}，更新日期：${1}",// Updated by (author name) (date)
   'rs_actUpdatedBy' : "更新者：${0}",// Updated by (author name)
   'rs_actDue' : "${0} 到期",// Due (date)
   'rs_actTags' : "標籤： ",
   'rs_actTagsDelim' : ", ",
   'rs_startFromTemplate' : "從此範本開始建立活動",
   'rs_favoriteTemplate' : "標示為我的最愛範本",
   'rs_normalTemplate' : "標示為一般範本",
   'rs_tunedOutPri' : "關閉",
   'rs_pagepos' : "${0} - ${1}/${2}", // pagination - e.g. 1 - 10 of 100
   'rs_navPrevLabel' : "前一個",
   'rs_navNextLabel' : "下一個",
   'rs_noActivities' : "沒有針對此社群開始的活動。",
   'rs_feedError' : "無法載入資訊來源。",
   'rs_highPri' : "高優先順序",
   'rs_medPri' : "中優先順序",
   'rs_normalPri' : "正常優先順序（預設值）",
   'rs_tuneOut' : "標示為已關閉",
   'rs_startActivity' : "開始建立活動",
   'rs_startFirstActivity' : "建立您的第一個活動",
   'rs_navNextLabel' : "下一個",
   'rs_viewAll' : "檢視全部",
   'rs_activityWidgetTitle' : "活動",
   'rs_activityWidgetBriefDescription' : "追蹤社群目標。建立待辦事項並共用資源。",
   'rs_activityWidgetDescription' : "社群活動可以用來分工合作，並追蹤社群專案或計劃的進度。",
   'rs_completedActivityLink' : "顯示已完成的活動",
   'rs_activitiesUnavailable' : "無法使用「活動」服務。",
   'rs_errorPersists' : "如果問題持續存在，請與系統管理者聯絡。",
   'rs_shared' : "共用",
   'rs_removeActFromComm' : "從社群移除",
   'rs_externalLabel' : "外部",

   // for ActivityForm
   'rs_templateOptions' : "範本選項",
   'rs_template' : "範本",
   'rs_tagsLabel' : "標籤",
   'rs_peopleLabel' : "人員",
   'rs_aboutThisTemplate' : "關於此範本",
   'rs_activity' : "活動",
   'rs_copyOf' : "${0} 的複本",// copy of (activity name)
   'rs_activityFormGoal' : "活動目標",
   'rs_noTemplate' : "無",
   'rs_copyActivityMembers' : "使用活動的成員",
   'rs_copyTemplateMembers' : "使用範本的成員",

   /* Forum Widget */
   'rs_noTopics' : "此社群還沒有主題。",
   'rs_noTopicsLoggedIn' : "提出問題、想法，或只是分享您的觀點。",
   'rs_postedBy' : "最新張貼者",
   'rs_topics' : "主題",
   'rs_noTopicsShort' : "無主題",
   'rs_topic' : "主題",
   'rs_replies' : "回覆",
   'rs_noReplies' : "無回覆",
   'rs_reply' : "回覆",
   'rs_startTopic' : "開始建立主題",
   'rs_startFirstTopic' : "開始第一個主題",
   'rs_ok' : "確定",
   'rs_locked' : "[已鎖定]",
   'rs_manageForumSetting' : "管理討論區設定",
   'rs_forumSettingCommunityOverviewPage' : "社群概觀頁面：",
   'rs_defaultForumList' : "依預設顯示討論區清單",
   'rs_defaultTopicList' : "依預設顯示主題清單",
   'rs_forumSettingApplicationView' : "討論區應用程式預設視圖：",
   'rs_forumSettingNote' : "附註：依預設，如果只有一個討論區，則顯示主題。",
   'rs_forumSettingSubmit' : "提交",
   'rs_forumSettingSave' : "儲存",
   'rs_forumSettingSaveAndClose' : "儲存並關閉",
   'rs_forumSettingConfirm' : "已儲存「討論區」的變更。",
   'rs_forumSettingError' : "發生錯誤。 請與管理員聯絡。",
   'rs_formSettingHideMessage' : "隱藏此訊息",
   'rs_forumSettingCancel' : "取消",
   'rs_forumAnsweredQuestion' : "已回答的問題",
   'rs_forumUnAnsweredQuestion' : "未回答的問題",
   'rs_forumSortBy' : "排序方式：",
   'rs_forumSortByDate' : "日期",
   'rs_forumSortByReplies' : "回覆",
   'rs_forumSortByTopic' : "主題",
   'rs_forumSortByTopicsAndReplies' : "主題及回覆",
   'rs_sortByReplies' : "依回覆排序",
   'rs_sortbyTopicsAndReplies' : "依主題及回覆排序",
   'rs_forumOpenQuestions' : "未決問題",
   'rs_feedOpenQuestions' : "這些未決問題的資訊來源",
   'rs_feedAnsweredQuestions' : "這些已回答問題的資訊來源",
   'rs_forumMessages' : "${0} 則訊息",
   'rs_forumLastAddedPost' : "${0} 的最新貼文",
   'rs_forumTopics' : "${0} 個主題",
   /* End discussion forum */

   /* Editor plugins -- some for a possible one we haven't implemented yet */
   'rs_createPersonLink' : "建立人員鏈結",
   'rs_quote' : "引用",
   'rs_labelColon' : "標籤： ",
   'rs_personColon' : "人員： ",
   'rs_personLink' : "人員鏈結",
   'rs_replace' : "取代",
   'rs_inactivePerson' : "${0}（非作用中）", // person's name (inactive)
   'rs_PersonPicture' : "${0} 的照片", // person name's picture

   /*Visitor mode -- external user name decoration use cases */
   'rs_PersonExternalLabel' : "外部使用者", // A label for the visitor model use cases.
   'rs_PersonExternal' : "${0}（外部使用者）", //'{0}' is the person's name. This will be used for the user profile name and profile photo tooltip
   'rs_PersonPictureExternal' : "${0} 的照片（外部使用者）", // Alt text for the external user's profile photo
   'rs_personExternalDesc' : "此使用者可以存取與外部共用的檔案及社群。",
   /* End editor plugins */

   /* Notification Form */
   'rs_notifyOthers' : "通知其他人員",
   'rs_messageColon' : "訊息： ",
   'rs_notifyColon' : "通知： ",
   'rs_notificationConfirm' : "已順利傳送通知訊息。 ",
   'rs_notificationFail' : "未傳送通知訊息。 稍後再試一次，如果問題持續存在，請與系統管理者聯絡。",
   'rs_pickCommunity' : "從社群清單中挑選",
   'rs_typeName' : "輸入名稱",
   'rs_typeToFilter' : "鍵入以過濾此清單",
   /* End Notification Form */

   /* FilteringCheckbox */
   'rs_filterListPrompt' : "鍵入以過濾此清單",
   'rs_filterGroupLabel' : "選取群組",
   'rs_noResults' : "找不到結果",
   // ${0} will be replaced with a number
   'rs_numResults' : "顯示 ${0} 個結果（共 ${1} 個）",

   /* PeopleFilterList */
   'rs_removeFilter' : "移除",

   /* Language Selector */
   'rs_browser_setting' : "瀏覽器設定",
   'rs_customLangaugeLinkLabel' : "自訂語言",

   /* Paging controls */
   // 0 and 1 are page numbers
   'rs_jumpPage' : "跳至頁面 ${0}/${1}",
   "rs_jumpPageLabel" : "跳至頁",
   'rs_pageNumLabel' : "頁碼",
   'rs_pageLabel' : "頁面：",

   /* Common Tags Widget */
   'rs_tagCloudNavigationLabel' : '標籤',
   'rs_tagCloudToggleHint' : "按一下以隱藏或顯示",
   'rs_tagCloudHelpAlt' : "取得標籤說明",
   'rs_tagCloudNoTags' : "無標籤",
   'rs_tagCloudNoRecentTags' : "無最近標籤",
   'rs_tagCloudNoTagsProfiles' : "搜尋目錄。 這裡將會顯示與搜尋所傳回的人員資訊相關聯的標籤。",
   'rs_tagLoadingTags' : "載入內容",
   'rs_tagCloudSelectedTags' : "選取的標籤",
   'rs_tagCloudSeachDesc' : "尋找標籤",
   'rs_tagCloudSeach' : "搜尋",
   'rs_tagCloudRelatedTags' : "相關標籤",
   'rs_tagCloudRelatedTagsDescription' : "新增相關標籤，以進一步精簡搜尋",
   'rs_tagCloudError' : '發生錯誤',

   'rs_viewAsCloud' : "雲",
   'rs_viewAsCloudTitle' : "將標籤列示為標籤雲",
   'rs_viewAsCloudDescription' : "將標籤檢視為標籤雲",
   'rs_viewAsList' : "清單",
   'rs_viewAsListTitle' : "將標籤列示為標籤的循序清單",
   'rs_viewAsListDescription' : "將標籤檢視為標籤的循序清單",
   'rs_tagCloudViewAll' : "瀏覽",
   'rs_tagCloudViewAllTitle' : "瀏覽所有標籤",

   'rs_normalTags' : "作用中標籤",

   'rs_removeTag' : "從所選過濾器標籤移除標籤",
   'rs_clearAll' : "清除全部",
   'rs_searchInputDefault' : "鍵入以尋找標籤",
   'rs_searchInputTagSelected' : "輸入其他標籤",
   'rs_relatedTagTitle' : "顯示標籤 ${0} 的搜尋結果，計數 ${1}",
   'rs_removeTagTitle' : "從已選取的過濾標籤中移除標籤 ${0}",
   'rs_addTagTitle' : "依計數為 ${1} 的標籤 ${0} 過濾",

   'rs_tagDialogCloseTile' : "關閉",
   'rs_tagDialogTitle' : "所有標籤",
   'rs_tagDialogPageInfo' : "${0} - ${1}（共 ${2} 個標籤）",

   /* Group Selection (Picker) Widget */
   'rs_group_browse_groups' : "瀏覽群組",
   'rs_group_browse_groups_dialog_title' : "瀏覽群組",
   'rs_group_browse_find_groups' : "尋找群組",
   'rs_group_browse_add_button' : "新增",
   'rs_group_browse_cancel_button' : "取消",
   'rs_group_browse_enter_string' : "鍵入以尋找群組",
   'rs_group_browse_group_typeahead_label' : "輸入群組名稱：",
   'rs_group_browse_group_name' : "群組名稱：",
   'rs_group_browse_results_label' : "選取符合的群組：",
   'rs_group_browse_parent_group_label' : "您位於：",
   'rs_group_browse_next_page' : "下一頁",
   'rs_group_browse_previous' : "前一個",
   'rs_group_browse_next' : "下一個",
   'rs_group_browse_paging' : "分頁",
   'rs_group_browse_previous_page' : "上一頁",
   'rs_group_browse_group_selected' : "選取的群組：",
   'rs_group_browse_group_no_groups' : "此群組未含任何群組",
   'rs_group_browse_page_info' : "${0} - ${1}/${2}",
   'rs_group_browse_page_info_alt' : "比對群組 ${0} 至 ${1}（共 ${2} 個）",
   'rs_group_browse_remove_selection' : '移除巢狀群組選擇：${0}',
   'rs_group_browse_paging' : "分頁",
   'rs_member_groups' : "群組",
   'rs_member_members' : "成員",
   'rs_member_no_results' : "找不到結果",
   'rs_member_remove_group' : "移除${0}",
   'rs_member_add_to_community' : "按一下以新增成員",
   'rs_member_remove_name' : "按一下以移除成員",
   'rs_group_add_to_community' : "按一下以新增群組",
   'rs_group_remove_name' : "按一下以移除群組",
   'rs_group_name' : "群組名稱",
   'rs_group_role' : "群組角色",

   'rs_warning' : "警告",
   'rs_a11y_warning' : "警告：",

   'rs_messagebox_close_btn_title' : "關閉",
   'rs_messagebox_close_btn_alt' : "關閉",
   'rs_messagebox_error_icon_alt' : "錯誤",
   'rs_messagebox_error_a11y_label' : "錯誤：",
   'rs_messagebox_warning_icon_alt' : "警告",
   'rs_messagebox_warning_a11y_label' : "警告：",
   'rs_messagebox_info_icon_alt' : "資訊",
   'rs_messagebox_info_a11y_label' : "資訊：",
   'rs_messagebox_success_icon_alt' : "順利完成",
   'rs_messagebox_success_a11y_label' : "成功：",

   /* Document Picker CK Plugin */
   'rs_docpicker_title' : "插入檔案鏈結",
   'rs_docpicker_label' : "Connections 檔案鏈結",
   // '{0}' is a filename
   'rs_docpicker_download_title' : "下載 ${0}",
   'rs_docpicker_viewdetails_text' : "檢視詳細資料",
   // '{0}' is a filename
   'rs_docpicker_viewdetails_title' : "檢視 ${0} 的詳細資料",

   /* AttachedFileList widget */
   'rs_attachedfile_remove_alt' : "移除",
   'rs_attachedfile_filename' : "影像 ${0}",

   'rs_feedreader_warning' : "警告：此鏈結適用於資訊來源讀取器，可能在您的瀏覽器中會不正確顯示。 按一下「確定」以繼續，或按一下「取消」回到頁面。",

   'rs_search' : "搜尋",
   'rs_all_connections' : "所有 Connections",
   'rs_advanced' : "進階",
   'rs_select_scope' : "選取搜尋範圍",

   'rs_icfixlayout' : {
      button_label : "重新格式化",
      dialog_title : "重新格式化內容",
      warning : "警告",
      reformat_save : "重新格式化並儲存",
      save_as_is : "依現狀儲存",
      cancel : "取消",
      warn_layout : "您的內容超出了最大顯示寬度。  是否要自動重新格式化以適合可用空間？",
      remember_decision : "記住我的決策"
   },

   //The following error messages are used by icdocpicker when private files are shared with a Community.
   'rs_sharefile_constraint_violation' : "共用選取的檔案時發生錯誤。",
   'rs_sharefile_access_denied' : "此檔案已刪除或者不再與您共用。",
   'rs_sharefile_invalid_request' : "共用選取的檔案時發生錯誤。",
   'rs_sharefile_sharing_intent_restriction' : "只能在組織內部共用此檔案。",
   'rs_sharefile_error_title' : "錯誤",

   /* Strings for the native mobile app banners */
   'rs_mobileBanner_title' : 'HCL Connections',
   'rs_mobileBanner_inAppStore' : '在 App Store',
   'rs_mobileBanner_inGooglePlay' : '在 Google Play',
   'rs_mobileBanner_author' : 'HCL Software',
   'rs_mobileBanner_open' : '公開',
   'rs_mobileBanner_view' : '檢視',
   'rs_mobileBanner_hide' : '隱藏',

   'rs_empty_column_placeholder' : '將應用程式拖曳到這裡。',
   'rs_widget_loading_error_title' : '無法顯示小組件',
   'rs_widget_loading_error_message' : '稍後再試一次，如果問題持續存在，請與系統管理者聯絡。',
   'rs_widgets_loading_error_title' : '無法在此社群中顯示小組件',
   'rs_widget_misplacement_warning' : '此直欄裝不下此應用程式。 社群擁有者可以將它移至其他直欄，或者將它從頁面中移除。',

   'rs_widget_title_change_fail_message' : {
      title_too_long : '輸入的標題太長。',
      empty_new_title : '輸入的標題不能是空的。',
      default_message : '無法變更此 \'${0}\' 應用程式的標題。'
   },

   /* Strings for change title dialog */
   'rs_widget_title_change_label' : '標題：  ',
   'rs_widget_title_change_direction' : '變更此 \'${0}\' 應用程式的標題。',
   'rs_widget_title_change_title' : '變更標題',

   /* Strings for Visitor Model Invite dialog */
	'rs_vmmainContentTitle' : "邀請或新增成員",
	'rs_vmmainContentDesc' : "邀請成員可讓成員決定是否要加入社群。新增成員會自動將成員納入。",
	'rs_vmtypeAheadLabel' : "姓名或電子郵件：",
	'rs_vmgroupTypeAheadLabel' : "名稱： ",
	'rs_vmtypeAheadRoleLabel' : " 成為",
	'rs_vmgroupTypeAheadRoleLabel' : " 為成員",
	'rs_vmtaNoResults' : "找不到結果。",
	'rs_vmtaHeader' : "標頭",
	'rs_vmaddUser' : "新增",
	'rs_vmradioSectionTitle' : "成員選項：",
	'rs_vmradioOne' : "傳送邀請以加入社群",
	'rs_vmradioTwo' : "自動新增使用者至社群",
	'rs_vmtwistyA' : "新增選用訊息",
	'rs_vmtwistyB' : "移除其他文字",
	'rs_vmmessage' : "訊息：",
	'rs_vmtextAreaStartText' : "寫些內容...",
	'rs_vmcheckboxLabel' : "傳送副本給我",
	'rs_vmsave' : "儲存",
	'rs_vminvite' : "邀請",
	'rs_vmcancel' : "取消",
	'rs_userContentTitle' : "輸入資訊",
	'rs_vmaddUser' : "建立使用者",
	'rs_vmback'	 : "上一頁",
	'rs_vmvisitor'	 : "訪客"
})
